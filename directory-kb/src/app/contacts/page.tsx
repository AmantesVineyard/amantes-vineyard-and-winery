import Link from "next/link";
import { listContacts } from "@/services/contact-service";
import { PageHeader, VerificationBadge, Pagination, EmptyState } from "@/components/shared";
import { SearchForm } from "@/components/search-form";
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

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;
  const result = await listContacts({ q, page: page ? Number(page) : 1 });

  const hrefFor = (p: number) =>
    `/contacts?${new URLSearchParams({ ...(q ? { q } : {}), page: String(p) })}`;

  return (
    <div>
      <PageHeader
        title="Contacts"
        subtitle={`${result.total.toLocaleString()} people across the directory`}
      />
      <div className="mb-3 max-w-md">
        <SearchForm placeholder="Search names, titles, emails…" />
      </div>

      {result.rows.length === 0 ? (
        <EmptyState>No contacts found.</EmptyState>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Verification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.rows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.fullName}</TableCell>
                  <TableCell>{c.title ?? "—"}</TableCell>
                  <TableCell>
                    <Link
                      href={`/organizations/${c.organizationId}`}
                      className="hover:text-primary"
                    >
                      {c.organization.canonicalName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {c.email ? (
                      <a href={`mailto:${c.email}`} className="text-primary hover:underline">
                        {c.email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>{c.phone ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{c.contactType}</Badge>
                  </TableCell>
                  <TableCell>
                    <VerificationBadge status={c.verificationStatus} />
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
