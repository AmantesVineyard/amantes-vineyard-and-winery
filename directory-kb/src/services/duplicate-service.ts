import { sql, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  organizations,
  organizationAliases,
  brands,
  contacts,
  locations,
  organizationCategories,
  organizationRelationships,
} from "@/db/schema";
import { normalizeDomain, normalizeOrgName, normalizePhone } from "@/lib/normalize";

export interface DuplicateCandidate {
  organizationId: string;
  canonicalName: string;
  organizationType: string;
  city: string | null;
  stateProvince: string | null;
  score: number;
  signals: string[];
}

export interface DuplicateProbe {
  name: string;
  website?: string | null;
  phone?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  excludeOrganizationId?: string | null;
}

/**
 * Find likely duplicate organizations for a candidate record.
 * Blends several signals; each contributes to a 0..1-ish score:
 *   - trigram similarity of canonical name and aliases (normalized)
 *   - exact website domain match (strong)
 *   - exact normalized phone match (strong)
 *   - same city/state (weak corroboration, never sufficient alone)
 * Ambiguous matches are surfaced for human review — never auto-merged.
 */
export async function findDuplicates(
  probe: DuplicateProbe,
  limit = 5
): Promise<DuplicateCandidate[]> {
  const normName = normalizeOrgName(probe.name);
  const domain = normalizeDomain(probe.website);
  const phone = normalizePhone(probe.phone);
  if (!normName && !domain && !phone) return [];

  const rows = (await db.execute(sql`
    WITH name_matches AS (
      SELECT o.id,
             GREATEST(
               similarity(lower(o.canonical_name), ${probe.name.toLowerCase()}),
               similarity(lower(o.canonical_name), ${normName})
             ) AS name_score
        FROM organizations o
       WHERE o.merged_into_id IS NULL
         AND (lower(o.canonical_name) % ${probe.name.toLowerCase()}
              OR lower(o.canonical_name) % ${normName})
    ),
    alias_matches AS (
      SELECT a.organization_id AS id,
             MAX(similarity(lower(a.alias), ${probe.name.toLowerCase()})) AS alias_score
        FROM organization_aliases a
        JOIN organizations o ON o.id = a.organization_id AND o.merged_into_id IS NULL
       WHERE lower(a.alias) % ${probe.name.toLowerCase()}
       GROUP BY a.organization_id
    ),
    domain_matches AS (
      SELECT o.id, 1.0 AS domain_score
        FROM organizations o
       WHERE o.merged_into_id IS NULL
         AND ${domain}::text IS NOT NULL AND o.website_domain = ${domain}
    ),
    phone_matches AS (
      SELECT o.id, 1.0 AS phone_score
        FROM organizations o
       WHERE o.merged_into_id IS NULL
         AND ${phone}::text IS NOT NULL AND o.phone_normalized = ${phone}
      UNION
      SELECT c.organization_id, 0.8
        FROM contacts c
        JOIN organizations o ON o.id = c.organization_id AND o.merged_into_id IS NULL
       WHERE ${phone}::text IS NOT NULL
         AND regexp_replace(COALESCE(c.phone, ''), '\\D', '', 'g') = ${phone}
    ),
    candidates AS (
      SELECT COALESCE(n.id, a.id, d.id, p.id) AS id,
             COALESCE(n.name_score, 0) AS name_score,
             COALESCE(a.alias_score, 0) AS alias_score,
             COALESCE(d.domain_score, 0) AS domain_score,
             COALESCE(MAX(p.phone_score), 0) AS phone_score
        FROM name_matches n
        FULL OUTER JOIN alias_matches a ON a.id = n.id
        FULL OUTER JOIN domain_matches d ON d.id = COALESCE(n.id, a.id)
        FULL OUTER JOIN phone_matches p ON p.id = COALESCE(n.id, a.id, d.id)
       GROUP BY 1, 2, 3, 4
    )
    SELECT c.id::text, o.canonical_name, o.organization_type,
           pl.city, pl.state_province,
           c.name_score::float8, c.alias_score::float8,
           c.domain_score::float8, c.phone_score::float8
      FROM candidates c
      JOIN organizations o ON o.id = c.id
      LEFT JOIN LATERAL (
        SELECT l.city, l.state_province FROM locations l
         WHERE l.organization_id = o.id
         ORDER BY l.is_primary DESC LIMIT 1
      ) pl ON true
     WHERE c.id IS DISTINCT FROM ${probe.excludeOrganizationId ?? null}
  `)) as unknown as Array<{
    id: string;
    canonical_name: string;
    organization_type: string;
    city: string | null;
    state_province: string | null;
    name_score: number;
    alias_score: number;
    domain_score: number;
    phone_score: number;
  }>;

  const candidates = rows
    .map((r) => {
      const signals: string[] = [];
      if (r.name_score >= 0.35) signals.push(`name similarity ${r.name_score.toFixed(2)}`);
      if (r.alias_score >= 0.35) signals.push(`alias similarity ${r.alias_score.toFixed(2)}`);
      if (r.domain_score > 0) signals.push("same website domain");
      if (r.phone_score > 0) signals.push("matching phone");
      const cityMatches =
        !!probe.city && !!r.city && probe.city.toLowerCase() === r.city.toLowerCase();
      if (cityMatches) signals.push("same city");

      let score =
        Math.max(r.name_score, r.alias_score) * 0.6 +
        r.domain_score * 0.3 +
        r.phone_score * 0.15;
      if (cityMatches) score += 0.05;

      return {
        organizationId: r.id,
        canonicalName: r.canonical_name,
        organizationType: r.organization_type,
        city: r.city,
        stateProvince: r.state_province,
        score: Math.min(1, Number(score.toFixed(3))),
        signals,
      };
    })
    .filter((c) => c.signals.length > 0 && c.score >= 0.3)
    .sort((a, b) => b.score - a.score);

  return candidates.slice(0, limit);
}

/**
 * Merge `loserId` into `winnerId` without destroying anything:
 *   - loser's name becomes an alias of the winner (alias_type "merged_name")
 *   - aliases, brands, contacts, locations, category links and relationships
 *     are re-pointed at the winner
 *   - source evidence keeps its original entity_id rows AND gains re-pointed
 *     copies referencing the winner, so provenance survives from both sides
 *   - the loser row is kept with merged_into_id set (tombstone), never deleted
 */
export async function mergeOrganizations(opts: {
  winnerId: string;
  loserId: string;
  mergedBy: string;
}) {
  const { winnerId, loserId, mergedBy } = opts;
  if (winnerId === loserId) throw new Error("Cannot merge an organization into itself");

  return db.transaction(async (tx) => {
    const [winner] = await tx
      .select()
      .from(organizations)
      .where(eq(organizations.id, winnerId));
    const [loser] = await tx
      .select()
      .from(organizations)
      .where(eq(organizations.id, loserId));
    if (!winner || !loser) throw new Error("Organization not found");
    if (loser.mergedIntoId) throw new Error("Organization is already merged");

    // Preserve the loser's canonical name as an alias.
    await tx
      .insert(organizationAliases)
      .values({
        organizationId: winnerId,
        alias: loser.canonicalName,
        aliasType: "merged_name",
      })
      .onConflictDoNothing();

    // Move aliases (skipping ones the winner already has).
    const loserAliases = await tx
      .select()
      .from(organizationAliases)
      .where(eq(organizationAliases.organizationId, loserId));
    for (const a of loserAliases) {
      await tx
        .insert(organizationAliases)
        .values({ organizationId: winnerId, alias: a.alias, aliasType: a.aliasType })
        .onConflictDoNothing();
    }
    await tx.delete(organizationAliases).where(eq(organizationAliases.organizationId, loserId));

    // Re-point children.
    await tx
      .update(brands)
      .set({ owningOrganizationId: winnerId })
      .where(eq(brands.owningOrganizationId, loserId));
    await tx
      .update(contacts)
      .set({ organizationId: winnerId })
      .where(eq(contacts.organizationId, loserId));
    await tx
      .update(locations)
      .set({ organizationId: winnerId, isPrimary: false })
      .where(eq(locations.organizationId, loserId));

    // Category links (PK collision-safe).
    const loserCats = await tx
      .select()
      .from(organizationCategories)
      .where(eq(organizationCategories.organizationId, loserId));
    for (const oc of loserCats) {
      await tx
        .insert(organizationCategories)
        .values({ ...oc, organizationId: winnerId })
        .onConflictDoNothing();
    }
    await tx
      .delete(organizationCategories)
      .where(eq(organizationCategories.organizationId, loserId));

    // Relationships: re-point unless it would self-reference.
    const relsFrom = await tx
      .select()
      .from(organizationRelationships)
      .where(eq(organizationRelationships.fromOrganizationId, loserId));
    for (const r of relsFrom) {
      if (r.toOrganizationId !== winnerId) {
        await tx
          .insert(organizationRelationships)
          .values({ ...r, id: undefined, fromOrganizationId: winnerId })
          .onConflictDoNothing();
      }
    }
    const relsTo = await tx
      .select()
      .from(organizationRelationships)
      .where(eq(organizationRelationships.toOrganizationId, loserId));
    for (const r of relsTo) {
      if (r.fromOrganizationId !== winnerId) {
        await tx
          .insert(organizationRelationships)
          .values({ ...r, id: undefined, toOrganizationId: winnerId })
          .onConflictDoNothing();
      }
    }
    await tx
      .delete(organizationRelationships)
      .where(eq(organizationRelationships.fromOrganizationId, loserId));
    await tx
      .delete(organizationRelationships)
      .where(eq(organizationRelationships.toOrganizationId, loserId));

    // Source evidence: keep original rows (they document the loser record's
    // extraction) and add winner-scoped copies so the winner's Sources tab
    // shows everything.
    await tx.execute(sql`
      INSERT INTO source_evidence
        (source_page_id, entity_type, entity_id, evidence_text, bounding_box,
         extraction_confidence, verification_status, metadata)
      SELECT source_page_id, entity_type, ${winnerId}::uuid, evidence_text, bounding_box,
             extraction_confidence, verification_status,
             metadata || jsonb_build_object('merged_from', ${loserId}::text)
        FROM source_evidence
       WHERE entity_type = 'organization' AND entity_id = ${loserId}::uuid
    `);

    // Fill winner gaps from the loser (never overwrite winner values).
    await tx
      .update(organizations)
      .set({
        description: winner.description ?? loser.description,
        website: winner.website ?? loser.website,
        websiteDomain: winner.websiteDomain ?? loser.websiteDomain,
        mainPhone: winner.mainPhone ?? loser.mainPhone,
        phoneNormalized: winner.phoneNormalized ?? loser.phoneNormalized,
        email: winner.email ?? loser.email,
        updatedAt: new Date(),
      })
      .where(eq(organizations.id, winnerId));

    // Tombstone the loser.
    await tx
      .update(organizations)
      .set({
        mergedIntoId: winnerId,
        status: "merged",
        metadata: sql`${organizations.metadata} || jsonb_build_object('merged_by', ${mergedBy}::text, 'merged_at', now()::text)`,
        updatedAt: new Date(),
      })
      .where(eq(organizations.id, loserId));

    return { winnerId, loserId };
  });
}
