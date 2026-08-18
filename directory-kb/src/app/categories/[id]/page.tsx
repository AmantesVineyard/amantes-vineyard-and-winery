import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Folder } from "lucide-react";
import { getCategoryDetail } from "@/services/category-service";
import { listOrganizations } from "@/services/organization-service";
import { organizationFiltersSchema } from "@/lib/validation";
import {
  PageHeader,
  TypeBadge,
  VerificationBadge,
  Pagination,
  EmptyState,
} from "@/components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;
  const category = await getCategoryDetail(id);
  if (!category) notFound();

  const filters = organizationFiltersSchema.parse({
    categoryId: id,
    page: page ?? "1",
  });
  const orgs = await listOrganizations(filters);

  return (
    <div>
      <nav className="mb-2 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/categories" className="hover:text-primary">
          Categories
        </Link>
        {category.path.map((p, i) => (
          <span key={p.id} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" />
            {i === category.path.length - 1 ? (
              <span className="font-medium text-foreground">{p.name}</span>
            ) : (
              <Link href={`/categories/${p.id}`} className="hover:text-primary">
                {p.name}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <PageHeader
        title={category.name}
        subtitle={
          category.description ??
          `${orgs.total.toLocaleString()} organizations in this category (including subcategories)`
        }
      />

      {category.children.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {category.children
            .slice()
            .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
            .map((child) => (
              <Link
                key={child.id}
                href={`/categories/${child.id}`}
                className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/40"
              >
                <Folder className="h-3.5 w-3.5 text-muted-foreground" />
                {child.name}
              </Link>
            ))}
        </div>
      )}

      {orgs.rows.length === 0 ? (
        <EmptyState>No organizations assigned to this category yet.</EmptyState>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Verification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orgs.rows.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <Link
                      href={`/organizations/${org.id}`}
                      className="font-medium hover:text-primary"
                    >
                      {org.canonicalName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={org.organizationType} />
                  </TableCell>
                  <TableCell>{org.city ?? "—"}</TableCell>
                  <TableCell>{org.stateProvince ?? "—"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {org.categories.slice(0, 3).map((c) => (
                        <Badge key={c} variant="secondary">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <VerificationBadge status={org.verificationStatus} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Pagination
        page={orgs.page}
        pageSize={orgs.pageSize}
        total={orgs.total}
        hrefFor={(p) => `/categories/${id}?page=${p}`}
      />
    </div>
  );
}
