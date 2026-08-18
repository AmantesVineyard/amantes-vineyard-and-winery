import Link from "next/link";
import { notFound } from "next/navigation";
import { getSourceDocumentDetail } from "@/services/source-service";
import { PageHeader, EmptyState } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function SourceDocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getSourceDocumentDetail(id);
  if (!doc) notFound();

  return (
    <div>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/sources" className="hover:text-primary">
          Sources
        </Link>{" "}
        / <span className="text-foreground">{doc.title}</span>
      </nav>
      <PageHeader
        title={
          <span className="flex items-center gap-2">
            {doc.title}
            {doc.edition && <Badge variant="secondary">{doc.edition}</Badge>}
          </span>
        }
        subtitle={
          <>
            {doc.publisher ?? "Unknown publisher"} · {doc.sourceType}
            {doc.pageCount && ` · ${doc.pageCount} pages`}
            {doc.importedAt &&
              ` · imported ${new Date(doc.importedAt).toLocaleDateString()}`}
          </>
        }
      />

      {doc.pages.length === 0 ? (
        <EmptyState>No pages captured for this document yet.</EmptyState>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Page</TableHead>
                <TableHead className="w-24">Printed</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Subsection</TableHead>
                <TableHead className="text-right">Evidence records</TableHead>
                <TableHead>Raw text</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doc.pages.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium tabular-nums">
                    <Link href={`/sources/pages/${p.id}`} className="hover:text-primary">
                      {p.physicalPageNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="tabular-nums">{p.printedPageNumber ?? "—"}</TableCell>
                  <TableCell>{p.section ?? "—"}</TableCell>
                  <TableCell>{p.subsection ?? "—"}</TableCell>
                  <TableCell className="text-right tabular-nums">{p.evidence.length}</TableCell>
                  <TableCell className="max-w-72">
                    {p.rawExtractedText ? (
                      <span className="block truncate font-mono text-xs text-muted-foreground">
                        {p.rawExtractedText}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">not captured</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
