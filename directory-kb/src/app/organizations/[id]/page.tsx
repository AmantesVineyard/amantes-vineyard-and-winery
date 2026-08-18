import Link from "next/link";
import { notFound } from "next/navigation";
import { Globe, Phone, Mail, MapPin, AlertTriangle } from "lucide-react";
import { getOrganizationDetail } from "@/services/organization-service";
import { getEvidenceForEntity } from "@/services/source-service";
import { findDuplicates } from "@/services/duplicate-service";
import {
  PageHeader,
  TypeBadge,
  VerificationBadge,
  ExternalLink,
  EmptyState,
  ConfidenceMeter,
} from "@/components/shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

const RELATIONSHIP_LABELS: Record<string, string> = {
  parent_company: "Parent company of",
  subsidiary: "Subsidiary of",
  distributes_for: "Distributes for",
  supplier_to: "Supplier to",
  custom_crush_for: "Custom crush for",
  affiliated_with: "Affiliated with",
  member_of: "Member of",
  acquired_by: "Acquired by",
  related_to: "Related to",
};

export default async function OrganizationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { id } = await params;
  const { tab } = await searchParams;
  const org = await getOrganizationDetail(id);
  if (!org) notFound();

  const [evidence, duplicates] = await Promise.all([
    getEvidenceForEntity("organization", id),
    findDuplicates({
      name: org.canonicalName,
      website: org.website,
      phone: org.mainPhone,
      city: (org.locations.find((l) => l.isPrimary) ?? org.locations[0])?.city,
      excludeOrganizationId: id,
    }),
  ]);

  const primaryLocation = org.locations.find((l) => l.isPrimary) ?? org.locations[0];

  return (
    <div>
      {org.mergedInto && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <AlertTriangle className="h-4 w-4" />
          This record was merged into{" "}
          <Link href={`/organizations/${org.mergedInto.id}`} className="font-medium underline">
            {org.mergedInto.canonicalName}
          </Link>
          . It is kept as a tombstone for provenance.
        </div>
      )}

      <PageHeader
        title={
          <span className="flex flex-wrap items-center gap-2">
            {org.canonicalName}
            <TypeBadge type={org.organizationType} />
            <VerificationBadge status={org.verificationStatus} />
          </span>
        }
        subtitle={
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {org.website && (
              <span className="inline-flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                <ExternalLink href={org.website}>
                  {org.website.replace(/^https?:\/\/(www\.)?/, "")}
                </ExternalLink>
              </span>
            )}
            {org.mainPhone && (
              <span className="inline-flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> {org.mainPhone}
              </span>
            )}
            {org.email && (
              <span className="inline-flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" /> {org.email}
              </span>
            )}
            {primaryLocation && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {[primaryLocation.city, primaryLocation.stateProvince, primaryLocation.country]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            )}
          </span>
        }
      />

      {duplicates.length > 0 && (
        <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <span className="font-medium">Possible duplicates: </span>
          {duplicates.map((d, i) => (
            <span key={d.organizationId}>
              {i > 0 && ", "}
              <Link href={`/organizations/${d.organizationId}`} className="underline">
                {d.canonicalName}
              </Link>{" "}
              <span className="text-amber-700">({Math.round(d.score * 100)}%)</span>
            </span>
          ))}
        </div>
      )}

      <Tabs defaultValue={tab ?? "overview"}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contacts">Contacts ({org.contacts.length})</TabsTrigger>
          <TabsTrigger value="brands">Brands ({org.brands.length})</TabsTrigger>
          <TabsTrigger value="categories">
            Categories ({org.organizationCategories.length})
          </TabsTrigger>
          <TabsTrigger value="relationships">
            Relationships ({org.relationshipsFrom.length + org.relationshipsTo.length})
          </TabsTrigger>
          <TabsTrigger value="sources">Sources ({evidence.length})</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardContent className="p-4">
                <h3 className="mb-2 text-sm font-semibold">Description</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {org.description ?? "No description recorded."}
                </p>
                <h3 className="mb-2 mt-5 text-sm font-semibold">
                  Aliases &amp; alternate names
                </h3>
                {org.aliases.length === 0 ? (
                  <p className="text-sm text-muted-foreground">None recorded.</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {org.aliases.map((a) => (
                      <Badge key={a.id} variant="secondary">
                        {a.alias}
                        <span className="ml-1.5 text-[10px] uppercase text-muted-foreground">
                          {a.aliasType}
                        </span>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="mb-2 text-sm font-semibold">
                  Locations ({org.locations.length})
                </h3>
                {org.locations.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No locations recorded.</p>
                ) : (
                  <ul className="space-y-3">
                    {org.locations.map((l) => (
                      <li key={l.id} className="text-sm">
                        <div className="flex items-center gap-1.5 font-medium">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          {l.locationType}
                          {l.isPrimary && <Badge variant="info">primary</Badge>}
                        </div>
                        <div className="mt-0.5 text-muted-foreground">
                          {[l.addressLine1, l.addressLine2].filter(Boolean).join(", ")}
                          {l.addressLine1 && <br />}
                          {[l.city, l.stateProvince, l.postalCode].filter(Boolean).join(", ")}
                          <br />
                          {l.country}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          {org.contacts.length === 0 ? (
            <EmptyState>No contacts recorded for this organization.</EmptyState>
          ) : (
            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Verification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {org.contacts.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.fullName}</TableCell>
                      <TableCell>{c.title ?? "—"}</TableCell>
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
        </TabsContent>

        <TabsContent value="brands">
          {org.brands.length === 0 ? (
            <EmptyState>No brands recorded for this organization.</EmptyState>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {org.brands.map((b) => (
                <Link key={b.id} href={`/brands/${b.id}`}>
                  <Card className="h-full transition-colors hover:border-primary/40">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">{b.brandName}</span>
                        <VerificationBadge status={b.verificationStatus} />
                      </div>
                      {b.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {b.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="categories">
          {org.organizationCategories.length === 0 ? (
            <EmptyState>No Buyer&apos;s Guide categories assigned.</EmptyState>
          ) : (
            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {org.organizationCategories.map((oc) => (
                    <TableRow key={oc.categoryId}>
                      <TableCell>
                        <Link
                          href={`/categories/${oc.categoryId}`}
                          className="font-medium hover:text-primary"
                        >
                          {oc.category.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {oc.category.parent ? (
                          <Link
                            href={`/categories/${oc.category.parent.id}`}
                            className="hover:text-primary"
                          >
                            {oc.category.parent.name}
                          </Link>
                        ) : (
                          "Top level"
                        )}
                      </TableCell>
                      <TableCell>{oc.relationshipType ?? "—"}</TableCell>
                      <TableCell>
                        <ConfidenceMeter value={oc.confidence} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="relationships">
          {org.relationshipsFrom.length + org.relationshipsTo.length === 0 ? (
            <EmptyState>No relationships to other organizations recorded.</EmptyState>
          ) : (
            <div className="rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {org.relationshipsFrom.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <Badge variant="outline">
                          {RELATIONSHIP_LABELS[r.relationshipType] ?? r.relationshipType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/organizations/${r.toOrganizationId}`}
                          className="font-medium hover:text-primary"
                        >
                          {r.toOrganization.canonicalName}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{r.notes ?? "—"}</TableCell>
                      <TableCell>
                        <ConfidenceMeter value={r.confidence} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {org.relationshipsTo.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <Badge variant="secondary">
                          ← {RELATIONSHIP_LABELS[r.relationshipType] ?? r.relationshipType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/organizations/${r.fromOrganizationId}`}
                          className="font-medium hover:text-primary"
                        >
                          {r.fromOrganization.canonicalName}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{r.notes ?? "—"}</TableCell>
                      <TableCell>
                        <ConfidenceMeter value={r.confidence} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sources">
          {evidence.length === 0 ? (
            <EmptyState>
              No source evidence recorded. Records without provenance should be treated as
              unverified.
            </EmptyState>
          ) : (
            <div className="space-y-3">
              {evidence.map((ev) => (
                <Card key={ev.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <Link
                        href={`/sources/${ev.page.document.id}`}
                        className="font-medium hover:text-primary"
                      >
                        {ev.page.document.title}
                        {ev.page.document.edition && ` (${ev.page.document.edition})`}
                      </Link>
                      <Badge variant="outline">
                        page {ev.page.printedPageNumber ?? ev.page.physicalPageNumber}
                      </Badge>
                      {ev.page.section && <Badge variant="secondary">{ev.page.section}</Badge>}
                      <span className="ml-auto flex items-center gap-2">
                        <ConfidenceMeter value={ev.extractionConfidence} />
                        <VerificationBadge status={ev.verificationStatus} />
                      </span>
                    </div>
                    {ev.evidenceText && (
                      <blockquote className="mt-2 border-l-2 border-primary/30 pl-3 font-mono text-xs text-muted-foreground">
                        {ev.evidenceText}
                      </blockquote>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardContent className="p-4">
              {org.notes ? (
                <p className="whitespace-pre-wrap text-sm">{org.notes}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No internal notes.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
