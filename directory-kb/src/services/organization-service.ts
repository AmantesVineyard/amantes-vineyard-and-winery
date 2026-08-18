import { sql, eq, and, isNull, or, ilike, asc } from "drizzle-orm";
import { db } from "@/db";
import {
  organizations,
  organizationTypes,
  locations,
} from "@/db/schema";
import type { OrganizationFilters } from "@/lib/validation";

export interface OrganizationListRow {
  id: string;
  canonicalName: string;
  organizationType: string;
  website: string | null;
  city: string | null;
  stateProvince: string | null;
  country: string | null;
  verificationStatus: string;
  categories: string[];
  brandCount: number;
  contactCount: number;
}

export interface OrganizationListResult {
  rows: OrganizationListRow[];
  total: number;
  page: number;
  pageSize: number;
}

export async function listOrganizations(
  filters: OrganizationFilters
): Promise<OrganizationListResult> {
  const conditions: ReturnType<typeof sql>[] = [sql`o.merged_into_id IS NULL`];

  if (filters.q) {
    conditions.push(sql`(
      o.search_vector @@ websearch_to_tsquery('english', ${filters.q})
      OR o.canonical_name % ${filters.q}
      OR o.canonical_name ILIKE '%' || ${filters.q} || '%'
      OR EXISTS (SELECT 1 FROM organization_aliases a
                  WHERE a.organization_id = o.id
                    AND (a.alias % ${filters.q} OR a.alias ILIKE '%' || ${filters.q} || '%'))
    )`);
  }
  if (filters.type) conditions.push(sql`o.organization_type = ${filters.type}`);
  if (filters.verificationStatus)
    conditions.push(sql`o.verification_status = ${filters.verificationStatus}`);
  if (filters.state)
    conditions.push(
      sql`EXISTS (SELECT 1 FROM locations l WHERE l.organization_id = o.id AND l.state_province = ${filters.state})`
    );
  if (filters.country)
    conditions.push(
      sql`EXISTS (SELECT 1 FROM locations l WHERE l.organization_id = o.id AND l.country = ${filters.country})`
    );
  if (filters.city)
    conditions.push(
      sql`EXISTS (SELECT 1 FROM locations l WHERE l.organization_id = o.id AND l.city ILIKE ${filters.city})`
    );
  if (filters.categoryId)
    conditions.push(sql`EXISTS (
      WITH RECURSIVE cat_tree AS (
        SELECT id FROM categories WHERE id = ${filters.categoryId}
        UNION ALL
        SELECT c.id FROM categories c JOIN cat_tree t ON c.parent_category_id = t.id
      )
      SELECT 1 FROM organization_categories oc
       WHERE oc.organization_id = o.id AND oc.category_id IN (SELECT id FROM cat_tree)
    )`);
  if (filters.brandId)
    conditions.push(
      sql`EXISTS (SELECT 1 FROM brands b WHERE b.owning_organization_id = o.id AND b.id = ${filters.brandId})`
    );

  const where = sql.join(conditions, sql` AND `);

  const orderBy = (() => {
    const dir = filters.order === "desc" ? sql`DESC` : sql`ASC`;
    switch (filters.sort) {
      case "type":
        return sql`o.organization_type ${dir}, o.canonical_name ASC`;
      case "city":
        return sql`pl.city ${dir} NULLS LAST, o.canonical_name ASC`;
      case "state":
        return sql`pl.state_province ${dir} NULLS LAST, o.canonical_name ASC`;
      case "updated":
        return sql`o.updated_at ${dir}`;
      case "relevance":
        return filters.q
          ? sql`ts_rank(o.search_vector, websearch_to_tsquery('english', ${filters.q})) DESC, similarity(o.canonical_name, ${filters.q}) DESC`
          : sql`o.canonical_name ASC`;
      default:
        return sql`o.canonical_name ${dir}`;
    }
  })();

  const offset = (filters.page - 1) * filters.pageSize;

  const rows = (await db.execute(sql`
    SELECT o.id::text, o.canonical_name, o.organization_type, o.website,
           o.verification_status,
           pl.city, pl.state_province, pl.country,
           COALESCE(cats.names, '{}') AS categories,
           COALESCE(bc.n, 0)::int AS brand_count,
           COALESCE(cc.n, 0)::int AS contact_count,
           COUNT(*) OVER ()::int AS total
      FROM organizations o
      LEFT JOIN LATERAL (
        SELECT l.city, l.state_province, l.country
          FROM locations l
         WHERE l.organization_id = o.id
         ORDER BY l.is_primary DESC, l.created_at ASC
         LIMIT 1
      ) pl ON true
      LEFT JOIN LATERAL (
        SELECT array_agg(c.name ORDER BY c.name) AS names
          FROM organization_categories oc JOIN categories c ON c.id = oc.category_id
         WHERE oc.organization_id = o.id
      ) cats ON true
      LEFT JOIN LATERAL (
        SELECT COUNT(*) AS n FROM brands b WHERE b.owning_organization_id = o.id
      ) bc ON true
      LEFT JOIN LATERAL (
        SELECT COUNT(*) AS n FROM contacts c WHERE c.organization_id = o.id
      ) cc ON true
     WHERE ${where}
     ORDER BY ${orderBy}
     LIMIT ${filters.pageSize} OFFSET ${offset}
  `)) as unknown as Array<{
    id: string;
    canonical_name: string;
    organization_type: string;
    website: string | null;
    verification_status: string;
    city: string | null;
    state_province: string | null;
    country: string | null;
    categories: string[];
    brand_count: number;
    contact_count: number;
    total: number;
  }>;

  return {
    rows: rows.map((r) => ({
      id: r.id,
      canonicalName: r.canonical_name,
      organizationType: r.organization_type,
      website: r.website,
      city: r.city,
      stateProvince: r.state_province,
      country: r.country,
      verificationStatus: r.verification_status,
      categories: r.categories ?? [],
      brandCount: r.brand_count,
      contactCount: r.contact_count,
    })),
    total: rows[0]?.total ?? 0,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

export async function getOrganizationDetail(id: string) {
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.id, id),
    with: {
      type: true,
      aliases: true,
      brands: true,
      contacts: true,
      locations: true,
      organizationCategories: { with: { category: { with: { parent: true } } } },
      relationshipsFrom: { with: { toOrganization: true } },
      relationshipsTo: { with: { fromOrganization: true } },
    },
  });
  if (!org) return null;

  // If this record was merged away, surface where it went.
  const mergedInto = org.mergedIntoId
    ? await db.query.organizations.findFirst({
        where: eq(organizations.id, org.mergedIntoId),
        columns: { id: true, canonicalName: true },
      })
    : null;

  return { ...org, mergedInto };
}

/** Distinct filter option values, for dropdowns. */
export async function getFilterOptions() {
  const [types, states, countries] = await Promise.all([
    db.select().from(organizationTypes).orderBy(asc(organizationTypes.sortOrder)),
    db
      .selectDistinct({ state: locations.stateProvince })
      .from(locations)
      .where(sql`${locations.stateProvince} IS NOT NULL`)
      .orderBy(asc(locations.stateProvince)),
    db
      .selectDistinct({ country: locations.country })
      .from(locations)
      .orderBy(asc(locations.country)),
  ]);
  return {
    types,
    states: states.map((s) => s.state).filter((s): s is string => !!s),
    countries: countries.map((c) => c.country).filter((c): c is string => !!c),
  };
}

/** Lightweight org lookup used by the review UI's "link to existing" picker. */
export async function searchOrganizationsByName(q: string, limit = 10) {
  if (!q.trim()) return [];
  return db
    .select({
      id: organizations.id,
      canonicalName: organizations.canonicalName,
      organizationType: organizations.organizationType,
    })
    .from(organizations)
    .where(
      and(
        isNull(organizations.mergedIntoId),
        or(
          ilike(organizations.canonicalName, `%${q}%`),
          sql`${organizations.canonicalName} % ${q}`
        )
      )
    )
    .orderBy(sql`similarity(${organizations.canonicalName}, ${q}) DESC`)
    .limit(limit);
}
