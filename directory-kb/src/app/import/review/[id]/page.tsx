import Link from "next/link";
import { notFound } from "next/navigation";
import { getStagingRecord } from "@/services/import-service";
import {
  PageHeader,
  ReviewStatusBadge,
  ConfidenceMeter,
  EmptyState,
} from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewActions } from "@/components/review-actions";
import type { StagingOrganizationPayload } from "@/lib/validation";

export const dynamic = "force-dynamic";

export default async function ReviewRecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await getStagingRecord(id);
  if (!record) notFound();

  const payload = record.rawPayload as Partial<StagingOrganizationPayload>;
  const errors = (record.validationErrors as string[]) ?? [];
  const matchedExisting = record.resolvedEntityId;

  return (
    <div>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/import" className="hover:text-primary">
          Import Review
        </Link>{" "}
        / <span className="text-foreground">{payload?.name ?? "Record"}</span>
      </nav>
      <PageHeader
        title={
          <span className="flex flex-wrap items-center gap-2">
            {payload?.name ?? "(unnamed record)"}
            <ReviewStatusBadge status={record.reviewStatus} />
          </span>
        }
        subtitle={
          <>
            Batch{" "}
            <Link href={`/import?batchId=${record.importBatchId}`} className="text-primary">
              {record.batch.label ?? record.importBatchId.slice(0, 8)}
            </Link>{" "}
            · importer {record.batch.importerVersion ?? "unknown"}
          </>
        }
      />

      {matchedExisting && (
        <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-900">
          Resolved to{" "}
          <Link
            href={`/organizations/${matchedExisting}`}
            className="font-medium underline"
          >
            existing organization record
          </Link>
          {record.reviewedBy && ` by ${record.reviewedBy}`}
          {record.reviewedAt && ` on ${new Date(record.reviewedAt).toLocaleString()}`}.
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Extracted candidate record</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <dl className="grid grid-cols-[8rem_1fr] gap-y-1.5">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium">{payload?.name ?? "—"}</dd>
                <dt className="text-muted-foreground">Type</dt>
                <dd>{payload?.organization_type ?? "—"}</dd>
                <dt className="text-muted-foreground">Website</dt>
                <dd>{payload?.website ?? "—"}</dd>
                <dt className="text-muted-foreground">Phone</dt>
                <dd>{payload?.phone ?? "—"}</dd>
                <dt className="text-muted-foreground">Email</dt>
                <dd>{payload?.email ?? "—"}</dd>
                <dt className="text-muted-foreground">Description</dt>
                <dd>{payload?.description ?? "—"}</dd>
                <dt className="text-muted-foreground">Brands</dt>
                <dd>
                  {payload?.brands?.length ? (
                    <span className="flex flex-wrap gap-1">
                      {payload.brands.map((b) => (
                        <Badge key={b} variant="secondary">
                          {b}
                        </Badge>
                      ))}
                    </span>
                  ) : (
                    "—"
                  )}
                </dd>
                <dt className="text-muted-foreground">Categories</dt>
                <dd>
                  {payload?.categories?.length ? (
                    <span className="flex flex-wrap gap-1">
                      {payload.categories.map((c) => (
                        <Badge key={c} variant="outline">
                          {c}
                        </Badge>
                      ))}
                    </span>
                  ) : (
                    "—"
                  )}
                </dd>
                <dt className="text-muted-foreground">Locations</dt>
                <dd>
                  {payload?.locations?.length
                    ? payload.locations
                        .map((l) =>
                          [l.address_line_1, l.city, l.state_province].filter(Boolean).join(", ")
                        )
                        .join(" | ")
                    : "—"}
                </dd>
                <dt className="text-muted-foreground">Contacts</dt>
                <dd>
                  {payload?.contacts?.length
                    ? payload.contacts
                        .map((c) => `${c.full_name}${c.title ? ` (${c.title})` : ""}`)
                        .join(", ")
                    : "—"}
                </dd>
                <dt className="text-muted-foreground">Confidence</dt>
                <dd>
                  <ConfidenceMeter value={record.extractionConfidence} />
                </dd>
              </dl>

              {errors.length > 0 && (
                <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-2.5 text-red-900">
                  <div className="mb-1 font-medium">Validation errors</div>
                  <ul className="list-inside list-disc text-xs">
                    {errors.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Raw extracted payload</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="max-h-80 overflow-auto rounded-md bg-muted p-3 font-mono text-xs">
                {JSON.stringify(record.rawPayload, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Source page</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              {record.sourcePage ? (
                <>
                  <Link
                    href={`/sources/pages/${record.sourcePage.id}`}
                    className="font-medium hover:text-primary"
                  >
                    {record.sourcePage.document.title}
                    {record.sourcePage.document.edition &&
                      ` (${record.sourcePage.document.edition})`}{" "}
                    — page {record.sourcePage.physicalPageNumber}
                  </Link>
                  <div className="mt-1 text-muted-foreground">
                    {[record.sourcePage.section, record.sourcePage.subsection]
                      .filter(Boolean)
                      .join(" → ")}
                  </div>
                  {record.sourcePage.rawExtractedText && (
                    <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-md bg-muted p-2.5 font-mono text-xs">
                      {record.sourcePage.rawExtractedText}
                    </pre>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground">No source page linked.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                Possible duplicates ({record.liveDuplicates.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {record.liveDuplicates.length === 0 ? (
                <EmptyState>No duplicate candidates detected.</EmptyState>
              ) : (
                <ul className="space-y-2">
                  {record.liveDuplicates.map((d) => (
                    <li key={d.organizationId} className="rounded-md border p-3 text-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/organizations/${d.organizationId}`}
                          className="font-medium hover:text-primary"
                        >
                          {d.canonicalName}
                        </Link>
                        <Badge variant="outline">{d.organizationType}</Badge>
                        {d.city && (
                          <span className="text-muted-foreground">
                            {d.city}
                            {d.stateProvince && `, ${d.stateProvince}`}
                          </span>
                        )}
                        <span className="ml-auto font-medium tabular-nums">
                          {Math.round(d.score * 100)}%
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {d.signals.map((s) => (
                          <Badge key={s} variant="muted">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {record.reviewStatus === "pending" && (
            <ReviewActions
              recordId={record.id}
              payload={record.rawPayload as StagingOrganizationPayload}
              duplicates={record.liveDuplicates.map((d) => ({
                id: d.organizationId,
                name: d.canonicalName,
                score: d.score,
              }))}
              hasValidationErrors={errors.length > 0}
            />
          )}
        </div>
      </div>
    </div>
  );
}
