import Link from "next/link";
import { listOrganizations, getFilterOptions } from "@/services/organization-service";
import { organizationFiltersSchema } from "@/lib/validation";
import { OrgFilters } from "@/components/org-filters";
import { SortableHeader } from "@/components/sortable-header";
import {
  PageHeader,
  TypeBadge,
  VerificationBadge,
  Pagination,
  EmptyState,
  ExternalLink,
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

export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = Object.fromEntries(
    Object.entries(await searchParams).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
  );
  const filters = organizationFiltersSchema.parse(raw);
  const [result, options] = await Promise.all([listOrganizations(filters), getFilterOptions()]);

  const hrefFor = (page: number) => {
    const p = new URLSearchParams(
      Object.entries(raw).filter(([, v]) => v !== undefined) as [string, string][]
    );
    p.set("page", String(page));
    return `/organizations?${p.toString()}`;
  };

  return (
    <div>
      <PageHeader
        title="Organizations"
        subtitle={`${result.total.toLocaleString()} organizations in the directory`}
      />
      <OrgFilters options={options} />

      {result.rows.length === 0 ? (
        <EmptyState>No organizations match the current filters.</EmptyState>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <SortableHeader field="name">Organization</SortableHeader>
                </TableHead>
                <TableHead>
                  <SortableHeader field="type">Type</SortableHeader>
                </TableHead>
                <TableHead>
                  <SortableHeader field="city">City</SortableHeader>
                </TableHead>
                <TableHead>
                  <SortableHeader field="state">State</SortableHeader>
                </TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead className="text-right">Brands</TableHead>
                <TableHead className="text-right">Contacts</TableHead>
                <TableHead>Verification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.rows.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="max-w-64">
                    <Link
                      href={`/organizations/${org.id}`}
                      className="block truncate font-medium text-foreground hover:text-primary"
                    >
                      {org.canonicalName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={org.organizationType} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{org.city ?? "—"}</TableCell>
                  <TableCell>{org.stateProvince ?? "—"}</TableCell>
                  <TableCell className="max-w-44">
                    {org.website ? (
                      <ExternalLink href={org.website} className="block truncate text-xs">
                        {org.website.replace(/^https?:\/\/(www\.)?/, "")}
                      </ExternalLink>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="max-w-56">
                    <div className="flex flex-wrap gap-1">
                      {org.categories.slice(0, 2).map((c) => (
                        <Badge key={c} variant="secondary" className="max-w-40 truncate">
                          {c}
                        </Badge>
                      ))}
                      {org.categories.length > 2 && (
                        <Badge variant="muted">+{org.categories.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{org.brandCount}</TableCell>
                  <TableCell className="text-right tabular-nums">{org.contactCount}</TableCell>
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
        page={result.page}
        pageSize={result.pageSize}
        total={result.total}
        hrefFor={hrefFor}
      />
    </div>
  );
}
