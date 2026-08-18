import Link from "next/link";
import { notFound } from "next/navigation";
import { Globe, MapPin } from "lucide-react";
import { getBrandDetail } from "@/services/brand-service";
import {
  PageHeader,
  VerificationBadge,
  ExternalLink,
  EmptyState,
  ConfidenceMeter,
  TypeBadge,
} from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brand = await getBrandDetail(id);
  if (!brand) notFound();

  const org = brand.owningOrganization;
  const primaryLocation = org?.locations.find((l) => l.isPrimary) ?? org?.locations[0];

  return (
    <div>
      <PageHeader
        title={
          <span className="flex flex-wrap items-center gap-2">
            {brand.brandName}
            <Badge variant="outline">Brand</Badge>
            <VerificationBadge status={brand.verificationStatus} />
          </span>
        }
        subtitle={
          brand.website && (
            <span className="inline-flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              <ExternalLink href={brand.website}>
                {brand.website.replace(/^https?:\/\/(www\.)?/, "")}
              </ExternalLink>
            </span>
          )
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {brand.description ?? "No description recorded."}
            </p>

            <h3 className="mb-2 mt-5 text-sm font-semibold">Source evidence</h3>
            {brand.evidence.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No source evidence recorded for this brand.
              </p>
            ) : (
              <ul className="space-y-2">
                {brand.evidence.map((ev) => (
                  <li key={ev.id} className="rounded-md border p-3 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
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
                      <span className="ml-auto">
                        <ConfidenceMeter value={ev.extractionConfidence} />
                      </span>
                    </div>
                    {ev.evidenceText && (
                      <blockquote className="mt-1.5 border-l-2 border-primary/30 pl-2 font-mono text-xs text-muted-foreground">
                        {ev.evidenceText}
                      </blockquote>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Owning organization</CardTitle>
            </CardHeader>
            <CardContent>
              {org ? (
                <div className="text-sm">
                  <Link
                    href={`/organizations/${org.id}`}
                    className="flex items-center gap-2 font-medium hover:text-primary"
                  >
                    {org.canonicalName}
                    <TypeBadge type={org.organizationType} />
                  </Link>
                  {primaryLocation && (
                    <div className="mt-1 flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {[primaryLocation.city, primaryLocation.stateProvince]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Owner not yet identified. This brand exists independently until entity
                  resolution links it to an organization.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                Related brands {org && `from ${org.canonicalName}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {brand.siblingBrands.length === 0 ? (
                <EmptyState>No related brands.</EmptyState>
              ) : (
                <ul className="space-y-1">
                  {brand.siblingBrands.map((b) => (
                    <li key={b.id}>
                      <Link
                        href={`/brands/${b.id}`}
                        className="text-sm font-medium hover:text-primary"
                      >
                        {b.brandName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
