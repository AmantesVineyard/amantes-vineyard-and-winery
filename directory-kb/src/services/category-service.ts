import { sql, eq } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema";

export interface CategoryTreeNode {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentCategoryId: string | null;
  sortOrder: number;
  /** Organizations linked directly to this category. */
  directCount: number;
  /** Organizations linked to this category or any descendant (deduplicated). */
  totalCount: number;
  children: CategoryTreeNode[];
}

/** Full category tree with per-node direct and rolled-up organization counts. */
export async function getCategoryTree(): Promise<CategoryTreeNode[]> {
  const rows = (await db.execute(sql`
    SELECT c.id::text, c.name, c.slug, c.description,
           c.parent_category_id::text, c.sort_order,
           COALESCE(direct.n, 0)::int AS direct_count,
           COALESCE(total.n, 0)::int AS total_count
      FROM categories c
      LEFT JOIN LATERAL (
        SELECT COUNT(DISTINCT oc.organization_id) AS n
          FROM organization_categories oc
          JOIN organizations o ON o.id = oc.organization_id AND o.merged_into_id IS NULL
         WHERE oc.category_id = c.id
      ) direct ON true
      LEFT JOIN LATERAL (
        WITH RECURSIVE subtree AS (
          SELECT c.id AS cat_id
          UNION ALL
          SELECT ch.id FROM categories ch JOIN subtree s ON ch.parent_category_id = s.cat_id
        )
        SELECT COUNT(DISTINCT oc.organization_id) AS n
          FROM organization_categories oc
          JOIN organizations o ON o.id = oc.organization_id AND o.merged_into_id IS NULL
         WHERE oc.category_id IN (SELECT cat_id FROM subtree)
      ) total ON true
     ORDER BY c.sort_order, c.name
  `)) as unknown as Array<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    parent_category_id: string | null;
    sort_order: number;
    direct_count: number;
    total_count: number;
  }>;

  const nodes = new Map<string, CategoryTreeNode>();
  for (const r of rows) {
    nodes.set(r.id, {
      id: r.id,
      name: r.name,
      slug: r.slug,
      description: r.description,
      parentCategoryId: r.parent_category_id,
      sortOrder: r.sort_order,
      directCount: r.direct_count,
      totalCount: r.total_count,
      children: [],
    });
  }
  const roots: CategoryTreeNode[] = [];
  for (const node of nodes.values()) {
    const parent = node.parentCategoryId ? nodes.get(node.parentCategoryId) : undefined;
    if (parent) parent.children.push(node);
    else roots.push(node);
  }
  return roots;
}

export async function getCategoryDetail(id: string) {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, id),
    with: { parent: true, children: true },
  });
  if (!category) return null;

  // Breadcrumb path from root to this node.
  const path = (await db.execute(sql`
    WITH RECURSIVE ancestry AS (
      SELECT id, name, slug, parent_category_id, 0 AS depth
        FROM categories WHERE id = ${id}
      UNION ALL
      SELECT c.id, c.name, c.slug, c.parent_category_id, a.depth + 1
        FROM categories c JOIN ancestry a ON c.id = a.parent_category_id
    )
    SELECT id::text, name, slug FROM ancestry ORDER BY depth DESC
  `)) as unknown as Array<{ id: string; name: string; slug: string }>;

  return { ...category, path };
}
