import Link from "next/link";
import { listImportBatches, listStagingRecords } from "@/services/import-service";
import {
  PageHeader,
  ReviewStatusBadge,
  Pagination,
  EmptyState,
  ConfidenceMeter,
} from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

interface StagedOrgPayload {
  name?: string;
  organization_type?: string;
}

export default async function ImportPage({
  searchParams,
}: {
  searchParams: Promise<{ batchId?: string; status?: string; page?: string }>;
}) {
  const { batchId, status, page } = await searchParams;
  const [batches, staging] = await Promise.all([
    listImportBatches(),
    listStagingRecords({
      batchId,
      status: status ?? (batchId ? undefined : "pending"),
      page: page ? Number(page) : 1,
    }),
  ]);

  const activeStatus = status ?? (batchId ? "all" : "pending");
  const statusHref = (s: string) => {
    const p = new URLSearchParams();
    if (batchId) p.set("batchId", batchId);
    if (s !== "all") p.set("status", s);
    const qs = p.toString();
    return `/import${qs ? `?${qs}` : ""}`;
  };

  return (
    <div>
      <PageHeader
        title="Import Review"
        subtitle="Staged records from extraction batches await human review before becoming canonical."
      />

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-sm">Import batches</CardTitle>
        </CardHeader>
        <CardContent>
          {batches.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No batches yet. POST structured JSON to <code>/api/import/batches</code> or run{" "}
              <code>npm run db:seed</code>.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch</TableHead>
                    <TableHead>Source document</TableHead>
                    <TableHead>Importer</TableHead>
                    <TableHead>Imported</TableHead>
                    <TableHead className="text-right">Records</TableHead>
                    <TableHead className="text-right">OK / Warn / Fail</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.map((b) => (
                    <TableRow key={b.id} className={batchId === b.id ? "bg-accent/50" : ""}>
                      <TableCell>
                        <Link
                          href={`/import?batchId=${b.id}`}
                          className="font-medium hover:text-primary"
                        >
                          {b.label ?? b.id.slice(0, 8)}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {b.sourceDocument
                          ? `${b.sourceDocument.title}${b.sourceDocument.edition ? ` (${b.sourceDocument.edition})` : ""}`
                          : "—"}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{b.importerVersion}</TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {new Date(b.importedAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{b.recordCount}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        <span className="text-green-700">{b.successCount}</span> /{" "}
                        <span className="text-amber-700">{b.warningCount}</span> /{" "}
                        <span className="text-red-700">{b.failureCount}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={b.status === "completed" ? "success" : "warning"}>
                          {b.status.replaceAll("_", " ")}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        {["pending", "approved", "linked", "merged", "rejected", "all"].map((s) => (
          <Link
            key={s}
            href={statusHref(s)}
            className={`rounded-md px-2.5 py-1 text-sm font-medium transition-colors ${
              activeStatus === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {s}
          </Link>
        ))}
        {batchId && (
          <Link href="/import" className="ml-2 text-sm text-primary hover:underline">
            Clear batch filter
          </Link>
        )}
      </div>

      {staging.rows.length === 0 ? (
        <EmptyState>No staged records in this view.</EmptyState>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Proposed type</TableHead>
                <TableHead>Source page</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead className="text-right">Duplicates</TableHead>
                <TableHead className="text-right">Validation</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staging.rows.map((r) => {
                const payload = r.rawPayload as StagedOrgPayload;
                const dupes = (r.duplicateCandidates as unknown[]) ?? [];
                const errors = (r.validationErrors as unknown[]) ?? [];
                return (
                  <TableRow key={r.id}>
                    <TableCell>
                      <Link
                        href={`/import/review/${r.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {payload?.name ?? "(unnamed record)"}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {payload?.organization_type ?? r.proposedEntityType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {r.sourcePage
                        ? `p. ${r.sourcePage.physicalPageNumber} · ${r.sourcePage.document.title}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <ConfidenceMeter value={r.extractionConfidence} />
                    </TableCell>
                    <TableCell className="text-right">
                      {dupes.length > 0 ? (
                        <Badge variant="warning">{dupes.length}</Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {errors.length > 0 ? (
                        <Badge variant="destructive">{errors.length} errors</Badge>
                      ) : (
                        <Badge variant="success">valid</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <ReviewStatusBadge status={r.reviewStatus} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <Pagination
        page={staging.page}
        pageSize={staging.pageSize}
        total={staging.total}
        hrefFor={(p) => {
          const params = new URLSearchParams();
          if (batchId) params.set("batchId", batchId);
          if (status) params.set("status", status);
          params.set("page", String(p));
          return `/import?${params.toString()}`;
        }}
      />
    </div>
  );
}
