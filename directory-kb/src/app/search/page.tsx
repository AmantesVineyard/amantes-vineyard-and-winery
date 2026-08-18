import Link from "next/link";
import { searchProvider } from "@/services/search-service";
import { PageHeader, EmptyState } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const hits = q ? await searchProvider.globalSearch(q, 20) : [];

  return (
    <div>
      <PageHeader
        title="Search results"
        subtitle={q ? `${hits.length} results for “${q}”` : "Enter a query in the search bar."}
      />
      {q && hits.length === 0 ? (
        <EmptyState>
          Nothing matched “{q}”. Fuzzy matching covers misspellings — try a shorter or
          different term.
        </EmptyState>
      ) : (
        <div className="max-w-3xl space-y-2">
          {hits.map((hit) => (
            <Link
              key={`${hit.entityType}-${hit.entityId}-${hit.matchedField}`}
              href={hit.href}
              className="block"
            >
              <Card className="transition-colors hover:border-primary/40">
                <CardContent className="flex items-center gap-3 p-3">
                  <Badge variant="outline" className="w-24 shrink-0 justify-center uppercase">
                    {hit.entityType}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{hit.title}</div>
                    {hit.subtitle && (
                      <div className="truncate text-sm text-muted-foreground">{hit.subtitle}</div>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    matched {hit.matchedField}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
