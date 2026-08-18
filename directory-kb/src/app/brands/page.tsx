import Link from "next/link";
import { listBrands } from "@/services/brand-service";
import { PageHeader, VerificationBadge, Pagination, EmptyState, ExternalLink } from "@/components/shared";
import { SearchForm } from "@/components/search-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const result = await listBrands({ q, page: page ? Number(page) : 1 });

  const hrefFor = (p: number) =>
    `/brands?${new URLSearchParams({ ...(q ? { q } : {}), page: String(p) })}`;

  return (
    <div>
      <PageHeader
        title="Brands"
        subtitle={`${result.total.toLocaleString()} wine brands tracked`}
      />
      <div className="mb-3 max-w-md">
        <SearchForm placeholder="Search brands…" />
      </div>

      {result.rows.length === 0 ? (
        <EmptyState>No brands found.</EmptyState>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Owning organization</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Verification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.rows.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <Link href={`/brands/${b.id}`} className="font-medium hover:text-primary">
                      {b.brandName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {b.owningOrganization ? (
                      <Link
                        href={`/organizations/${b.owningOrganization.id}`}
                        className="hover:text-primary"
                      >
                        {b.owningOrganization.canonicalName}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {b.website ? (
                      <ExternalLink href={b.website} className="text-xs">
                        {b.website.replace(/^https?:\/\/(www\.)?/, "")}
                      </ExternalLink>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <VerificationBadge status={b.verificationStatus} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Pagination page={result.page} pageSize={result.pageSize} total={result.total} hrefFor={hrefFor} />
    </div>
  );
}
