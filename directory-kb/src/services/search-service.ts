import { sql } from "drizzle-orm";
import { db } from "@/db";

/**
 * Search service abstraction.
 *
 * `SearchProvider` is the seam where semantic/vector search plugs in later:
 * a future `HybridSearchProvider` can wrap `PostgresSearchProvider` and blend
 * pgvector cosine scores with the lexical scores below without any UI change.
 * Nothing in the app depends on the concrete provider.
 */

export type SearchEntityType =
  | "organization"
  | "brand"
  | "contact"
  | "category"
  | "location";

export interface SearchHit {
  entityType: SearchEntityType;
  entityId: string;
  /** Organization the hit belongs to (for contacts, brands, locations). */
  organizationId: string | null;
  title: string;
  subtitle: string | null;
  /** Which field matched, e.g. "name", "alias", "website", "city". */
  matchedField: string;
  score: number;
  href: string;
}

export interface SearchProvider {
  globalSearch(query: string, limitPerType?: number): Promise<SearchHit[]>;
}

interface RawHit {
  entity_type: SearchEntityType;
  entity_id: string;
  organization_id: string | null;
  title: string;
  subtitle: string | null;
  matched_field: string;
  score: number;
}

function hrefFor(hit: RawHit): string {
  switch (hit.entity_type) {
    case "organization":
      return `/organizations/${hit.entity_id}`;
    case "brand":
      return `/brands/${hit.entity_id}`;
    case "contact":
      return hit.organization_id
        ? `/organizations/${hit.organization_id}?tab=contacts`
        : "/contacts";
    case "category":
      return `/categories/${hit.entity_id}`;
    case "location":
      return hit.organization_id ? `/organizations/${hit.organization_id}` : "/organizations";
  }
}

/**
 * Lexical search over PostgreSQL: full-text (websearch_to_tsquery, ranked)
 * unioned with trigram similarity so misspellings and partial names still hit.
 */
export class PostgresSearchProvider implements SearchProvider {
  async globalSearch(query: string, limitPerType = 8): Promise<SearchHit[]> {
    const q = query.trim();
    if (!q) return [];

    const rows = await db.execute(sql`
      WITH params AS (
        SELECT websearch_to_tsquery('english', ${q}) AS tsq, ${q}::text AS raw
      ),
      org_hits AS (
        (SELECT 'organization' AS entity_type, o.id AS entity_id, o.id AS organization_id,
                o.canonical_name AS title,
                o.organization_type AS subtitle,
                'name/description' AS matched_field,
                ts_rank(o.search_vector, p.tsq)::float8 + 1.0 AS score
           FROM organizations o, params p
          WHERE o.merged_into_id IS NULL AND o.search_vector @@ p.tsq
          ORDER BY score DESC LIMIT ${limitPerType})
        UNION ALL
        (SELECT 'organization', o.id, o.id, o.canonical_name, o.organization_type,
                'name (fuzzy)', similarity(o.canonical_name, p.raw)::float8
           FROM organizations o, params p
          WHERE o.merged_into_id IS NULL AND o.canonical_name % p.raw
          ORDER BY similarity(o.canonical_name, p.raw) DESC LIMIT ${limitPerType})
        UNION ALL
        (SELECT 'organization', a.organization_id, a.organization_id,
                o.canonical_name, 'alias: ' || a.alias,
                'alias', similarity(a.alias, p.raw)::float8
           FROM organization_aliases a
           JOIN organizations o ON o.id = a.organization_id AND o.merged_into_id IS NULL,
                params p
          WHERE a.alias % p.raw OR a.alias ILIKE '%' || p.raw || '%'
          ORDER BY similarity(a.alias, p.raw) DESC LIMIT ${limitPerType})
        UNION ALL
        (SELECT 'organization', o.id, o.id, o.canonical_name, o.website,
                'website', 0.9::float8
           FROM organizations o, params p
          WHERE o.merged_into_id IS NULL
            AND (o.website ILIKE '%' || p.raw || '%' OR o.website_domain = lower(p.raw))
          LIMIT ${limitPerType})
        UNION ALL
        (SELECT 'location', l.id, l.organization_id, o.canonical_name,
                l.city || COALESCE(', ' || l.state_province, ''),
                'city', similarity(l.city, p.raw)::float8
           FROM locations l
           JOIN organizations o ON o.id = l.organization_id AND o.merged_into_id IS NULL,
                params p
          WHERE l.city IS NOT NULL AND (l.city % p.raw OR l.city ILIKE p.raw || '%')
          ORDER BY similarity(l.city, p.raw) DESC LIMIT ${limitPerType})
      ),
      brand_hits AS (
        (SELECT 'brand' AS entity_type, b.id, b.owning_organization_id,
                b.brand_name AS title, o.canonical_name AS subtitle,
                'brand' AS matched_field,
                GREATEST(ts_rank(b.search_vector, p.tsq)::float8 + 1.0,
                         similarity(b.brand_name, p.raw)::float8) AS score
           FROM brands b
           LEFT JOIN organizations o ON o.id = b.owning_organization_id,
                params p
          WHERE b.search_vector @@ p.tsq OR b.brand_name % p.raw
          ORDER BY score DESC LIMIT ${limitPerType})
      ),
      contact_hits AS (
        (SELECT 'contact' AS entity_type, c.id, c.organization_id,
                c.full_name AS title,
                COALESCE(c.title || ' · ', '') || o.canonical_name AS subtitle,
                'contact' AS matched_field,
                GREATEST(ts_rank(c.search_vector, p.tsq)::float8 + 1.0,
                         similarity(c.full_name, p.raw)::float8) AS score
           FROM contacts c
           JOIN organizations o ON o.id = c.organization_id,
                params p
          WHERE c.search_vector @@ p.tsq OR c.full_name % p.raw
             OR c.email ILIKE '%' || p.raw || '%'
          ORDER BY score DESC LIMIT ${limitPerType})
      ),
      category_hits AS (
        (SELECT 'category' AS entity_type, cat.id, NULL::uuid,
                cat.name AS title,
                parent.name AS subtitle,
                'category' AS matched_field,
                GREATEST(ts_rank(cat.search_vector, p.tsq)::float8 + 1.0,
                         similarity(cat.name, p.raw)::float8) AS score
           FROM categories cat
           LEFT JOIN categories parent ON parent.id = cat.parent_category_id,
                params p
          WHERE cat.search_vector @@ p.tsq OR cat.name % p.raw
          ORDER BY score DESC LIMIT ${limitPerType})
      )
      SELECT DISTINCT ON (entity_type, entity_id)
             entity_type, entity_id::text, organization_id::text,
             title, subtitle, matched_field, score
        FROM (
          SELECT * FROM org_hits
          UNION ALL SELECT * FROM brand_hits
          UNION ALL SELECT * FROM contact_hits
          UNION ALL SELECT * FROM category_hits
        ) all_hits
       ORDER BY entity_type, entity_id, score DESC
    `);

    const hits = (rows as unknown as RawHit[])
      .map((r) => ({
        entityType: r.entity_type,
        entityId: r.entity_id,
        organizationId: r.organization_id,
        title: r.title,
        subtitle: r.subtitle,
        matchedField: r.matched_field,
        score: Number(r.score),
        href: hrefFor(r),
      }))
      .sort((a, b) => b.score - a.score);

    // Collapse location hits into their organization when the org already hit.
    const seenOrgs = new Set(
      hits.filter((h) => h.entityType === "organization").map((h) => h.entityId)
    );
    return hits.filter(
      (h) => !(h.entityType === "location" && h.organizationId && seenOrgs.has(h.organizationId))
    );
  }
}

export const searchProvider: SearchProvider = new PostgresSearchProvider();
