import Link from "next/link";
import { notFound } from "next/navigation";
import { getSourcePageDetail } from "@/services/source-service";
import {
  PageHeader,
  EmptyState,
  ConfidenceMeter,
  VerificationBadge,
} from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

function entityHref(entityType: string, entityId: string) {
  switch (entityType) {
    case "organization":
      return `/organizations/${entityId}`;
    case "brand":
      return `/brands/${entityId}`;
    case "category":
      return `/categories/${entityId}`;
    default:
      return null;
  }
}

export default async function SourcePagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await getSourcePageDetail(id);
  if (!page) notFound();

  return (
    <div>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/sources" className="hover:text-primary">
          Sources
        </Link>{" "}
        /{" "}
        <Link href={`/sources/${page.document.id}`} className="hover:text-primary">
          {page.document.title}
        </Link>{" "}
        / <span className="text-foreground">Page {page.physicalPageNumber}</span>
      </nav>
      <PageHeader
        title={`Page ${page.physicalPageNumber}`}
        subtitle={
          <>
            {page.printedPageNumber && `Printed page ${page.printedPageNumber} · `}
            {[page.section, page.subsection].filter(Boolean).join(" → ") || "No section"}
            {page.pageImageReference && ` · image: ${page.pageImageReference}`}
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Raw extracted text</CardTitle>
          </CardHeader>
          <CardContent>
            {page.rawExtractedText ? (
              <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-md bg-muted p-3 font-mono text-xs">
                {page.rawExtractedText}
              </pre>
            ) : (
              <p className="text-sm text-muted-foreground">
                Raw text not captured for this page (arrives with the Phase 2 extraction
                pipeline).
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Evidence extracted from this page ({page.evidence.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {page.evidence.length === 0 ? (
              <EmptyState>No entity evidence linked to this page.</EmptyState>
            ) : (
              <ul className="space-y-2">
                {page.evidence.map((ev) => {
                  const href = entityHref(ev.entityType, ev.entityId);
                  return (
                    <li key={ev.id} className="rounded-md border p-3 text-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="uppercase">
                          {ev.entityType}
                        </Badge>
                        {href ? (
                          <Link href={href} className="font-medium hover:text-primary">
                            {ev.entityName ?? ev.entityId.slice(0, 8)}
                          </Link>
                        ) : (
                          <span className="font-medium">
                            {ev.entityName ?? ev.entityId.slice(0, 8)}
                          </span>
                        )}
                        <span className="ml-auto flex items-center gap-2">
                          <ConfidenceMeter value={ev.extractionConfidence} />
                          <VerificationBadge status={ev.verificationStatus} />
                        </span>
                      </div>
                      {ev.evidenceText && (
                        <blockquote className="mt-1.5 border-l-2 border-primary/30 pl-2 font-mono text-xs text-muted-foreground">
                          {ev.evidenceText}
                        </blockquote>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
