import { sql, eq, asc, desc } from "drizzle-orm";
import { db } from "@/db";
import { sourceDocuments, sourcePages, sourceEvidence } from "@/db/schema";

export async function listSourceDocuments() {
  const docs = await db.query.sourceDocuments.findMany({
    orderBy: [desc(sourceDocuments.createdAt)],
  });
  const counts = (await db.execute(sql`
    SELECT sd.id::text, COUNT(DISTINCT sp.id)::int AS page_count_actual,
           COUNT(se.id)::int AS evidence_count
      FROM source_documents sd
      LEFT JOIN source_pages sp ON sp.source_document_id = sd.id
      LEFT JOIN source_evidence se ON se.source_page_id = sp.id
     GROUP BY sd.id
  `)) as unknown as Array<{ id: string; page_count_actual: number; evidence_count: number }>;
  const byId = new Map(counts.map((c) => [c.id, c]));
  return docs.map((d) => ({
    ...d,
    pageCountActual: byId.get(d.id)?.page_count_actual ?? 0,
    evidenceCount: byId.get(d.id)?.evidence_count ?? 0,
  }));
}

export async function getSourceDocumentDetail(id: string) {
  const doc = await db.query.sourceDocuments.findFirst({
    where: eq(sourceDocuments.id, id),
  });
  if (!doc) return null;
  const pages = await db.query.sourcePages.findMany({
    where: eq(sourcePages.sourceDocumentId, id),
    orderBy: [asc(sourcePages.physicalPageNumber)],
    with: { evidence: true },
  });
  return { ...doc, pages };
}

export async function getSourcePageDetail(id: string) {
  const page = await db.query.sourcePages.findFirst({
    where: eq(sourcePages.id, id),
    with: { document: true, evidence: true },
  });
  if (!page) return null;

  // Resolve evidence entity names for display.
  const enriched = await Promise.all(
    page.evidence.map(async (ev) => ({
      ...ev,
      entityName: await resolveEntityName(ev.entityType, ev.entityId),
    }))
  );
  return { ...page, evidence: enriched };
}

/** All evidence rows pointing at one entity, with page + document context. */
export async function getEvidenceForEntity(entityType: string, entityId: string) {
  return db.query.sourceEvidence.findMany({
    where: sql`${sourceEvidence.entityType} = ${entityType} AND ${sourceEvidence.entityId} = ${entityId}`,
    with: { page: { with: { document: true } } },
    orderBy: [asc(sourceEvidence.createdAt)],
  });
}

export async function resolveEntityName(
  entityType: string,
  entityId: string
): Promise<string | null> {
  const table: Record<string, { table: string; column: string }> = {
    organization: { table: "organizations", column: "canonical_name" },
    brand: { table: "brands", column: "brand_name" },
    contact: { table: "contacts", column: "full_name" },
    location: { table: "locations", column: "city" },
    category: { table: "categories", column: "name" },
  };
  const t = table[entityType];
  if (!t) return null;
  const rows = (await db.execute(
    sql`SELECT ${sql.raw(t.column)}::text AS name FROM ${sql.raw(t.table)} WHERE id = ${entityId}`
  )) as unknown as Array<{ name: string | null }>;
  return rows[0]?.name ?? null;
}
