import { sql } from "drizzle-orm";
import { db } from "@/db";

export interface DashboardMetrics {
  totalOrganizations: number;
  wineries: number;
  vendors: number;
  distributors: number;
  brands: number;
  contacts: number;
  categories: number;
  pendingReview: number;
  byType: Array<{ type: string; label: string; count: number }>;
  byState: Array<{ state: string; count: number }>;
  byVerification: Array<{ status: string; count: number }>;
  topCategories: Array<{ id: string; name: string; count: number }>;
  recentBatches: Array<{
    id: string;
    label: string | null;
    importedAt: Date;
    status: string;
    recordCount: number;
    successCount: number;
    warningCount: number;
    failureCount: number;
  }>;
  sourceDocuments: number;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const totalsRows = (await db.execute(sql`
    SELECT
      (SELECT COUNT(*) FROM organizations WHERE merged_into_id IS NULL)::int AS orgs,
      (SELECT COUNT(*) FROM organizations WHERE merged_into_id IS NULL AND organization_type = 'winery')::int AS wineries,
      (SELECT COUNT(*) FROM organizations WHERE merged_into_id IS NULL AND organization_type = 'vendor')::int AS vendors,
      (SELECT COUNT(*) FROM organizations WHERE merged_into_id IS NULL AND organization_type = 'distributor')::int AS distributors,
      (SELECT COUNT(*) FROM brands)::int AS brands,
      (SELECT COUNT(*) FROM contacts)::int AS contacts,
      (SELECT COUNT(*) FROM categories)::int AS categories,
      (SELECT COUNT(*) FROM staging_records WHERE review_status = 'pending')::int AS pending_review,
      (SELECT COUNT(*) FROM source_documents)::int AS source_documents
  `)) as unknown as Array<{
    orgs: number;
    wineries: number;
    vendors: number;
    distributors: number;
    brands: number;
    contacts: number;
    categories: number;
    pending_review: number;
    source_documents: number;
  }>;
  const totals = totalsRows[0];

  const byType = (await db.execute(sql`
    SELECT o.organization_type AS type, t.label, COUNT(*)::int AS count
      FROM organizations o
      JOIN organization_types t ON t.code = o.organization_type
     WHERE o.merged_into_id IS NULL
     GROUP BY 1, 2 ORDER BY count DESC
  `)) as unknown as Array<{ type: string; label: string; count: number }>;

  const byState = (await db.execute(sql`
    SELECT l.state_province AS state, COUNT(DISTINCT o.id)::int AS count
      FROM organizations o
      JOIN locations l ON l.organization_id = o.id
     WHERE o.merged_into_id IS NULL AND l.state_province IS NOT NULL
     GROUP BY 1 ORDER BY count DESC LIMIT 12
  `)) as unknown as Array<{ state: string; count: number }>;

  const byVerification = (await db.execute(sql`
    SELECT verification_status::text AS status, COUNT(*)::int AS count
      FROM organizations WHERE merged_into_id IS NULL
     GROUP BY 1 ORDER BY count DESC
  `)) as unknown as Array<{ status: string; count: number }>;

  const topCategories = (await db.execute(sql`
    SELECT c.id::text, c.name, COUNT(DISTINCT oc.organization_id)::int AS count
      FROM categories c
      JOIN organization_categories oc ON oc.category_id = c.id
      JOIN organizations o ON o.id = oc.organization_id AND o.merged_into_id IS NULL
     GROUP BY 1, 2 ORDER BY count DESC LIMIT 10
  `)) as unknown as Array<{ id: string; name: string; count: number }>;

  const recentBatches = (await db.execute(sql`
    SELECT id::text, label, imported_at, status::text,
           record_count, success_count, warning_count, failure_count
      FROM import_batches ORDER BY imported_at DESC LIMIT 5
  `)) as unknown as Array<{
    id: string;
    label: string | null;
    imported_at: Date;
    status: string;
    record_count: number;
    success_count: number;
    warning_count: number;
    failure_count: number;
  }>;

  return {
    totalOrganizations: totals.orgs,
    wineries: totals.wineries,
    vendors: totals.vendors,
    distributors: totals.distributors,
    brands: totals.brands,
    contacts: totals.contacts,
    categories: totals.categories,
    pendingReview: totals.pending_review,
    sourceDocuments: totals.source_documents,
    byType,
    byState,
    byVerification,
    topCategories,
    recentBatches: recentBatches.map((b) => ({
      id: b.id,
      label: b.label,
      importedAt: b.imported_at,
      status: b.status,
      recordCount: b.record_count,
      successCount: b.success_count,
      warningCount: b.warning_count,
      failureCount: b.failure_count,
    })),
  };
}
