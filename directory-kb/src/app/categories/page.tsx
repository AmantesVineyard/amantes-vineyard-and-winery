import { getCategoryTree } from "@/services/category-service";
import { CategoryTree } from "@/components/category-tree";
import { PageHeader, EmptyState } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const tree = await getCategoryTree();

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Buyer's Guide category hierarchy. Counts include organizations in subcategories."
      />
      {tree.length === 0 ? (
        <EmptyState>No categories defined yet.</EmptyState>
      ) : (
        <Card className="max-w-3xl">
          <CardContent className="p-3">
            <CategoryTree tree={tree} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
