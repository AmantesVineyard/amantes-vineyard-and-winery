import Link from "next/link";
import { BookOpen } from "lucide-react";
import { listSourceDocuments } from "@/services/source-service";
import { PageHeader, EmptyState } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function SourcesPage() {
  const docs = await listSourceDocuments();

  return (
    <div>
      <PageHeader
        title="Sources"
        subtitle="Every fact in the knowledge base traces back to a source document page."
      />
      {docs.length === 0 ? (
        <EmptyState>No source documents registered.</EmptyState>
      ) : (
        <div className="grid max-w-4xl gap-3">
          {docs.map((doc) => (
            <Link key={doc.id} href={`/sources/${doc.id}`}>
              <Card className="transition-colors hover:border-primary/40">
                <CardContent className="flex flex-wrap items-center gap-3 p-4">
                  <div className="rounded-md bg-primary/10 p-2 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">
                      {doc.title}
                      {doc.edition && (
                        <Badge variant="secondary" className="ml-2">
                          {doc.edition}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {doc.publisher ?? "Unknown publisher"} · {doc.sourceType}
                      {doc.filename && ` · ${doc.filename}`}
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>
                      {doc.pageCountActual} pages captured
                      {doc.pageCount ? ` of ${doc.pageCount}` : ""}
                    </div>
                    <div>{doc.evidenceCount} evidence records</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
