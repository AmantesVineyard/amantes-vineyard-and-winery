import Link from "next/link";
import {
  Building2,
  Wine,
  Users,
  FolderTree,
  Inbox,
  BookOpen,
  Grape,
  Truck,
} from "lucide-react";
import { getDashboardMetrics } from "@/services/dashboard-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader, ReviewStatusBadge } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

function Stat({
  label,
  value,
  icon: Icon,
  href,
}: {
  label: string;
  value: number;
  icon: typeof Building2;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="transition-colors hover:border-primary/40">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold tabular-nums leading-tight">
              {value.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default async function DashboardPage() {
  const m = await getDashboardMetrics();
  const maxState = Math.max(1, ...m.byState.map((s) => s.count));

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Wine Business Directory / Buyer's Guide knowledge base"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <Stat label="Organizations" value={m.totalOrganizations} icon={Building2} href="/organizations" />
        <Stat label="Wineries" value={m.wineries} icon={Grape} href="/organizations?type=winery" />
        <Stat label="Vendors" value={m.vendors} icon={Truck} href="/organizations?type=vendor" />
        <Stat label="Brands" value={m.brands} icon={Wine} href="/brands" />
        <Stat label="Contacts" value={m.contacts} icon={Users} href="/contacts" />
        <Stat label="Awaiting review" value={m.pendingReview} icon={Inbox} href="/import" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" /> Organizations by type
            </CardTitle>
          </CardHeader>
          <CardContent>
            {m.byType.length === 0 ? (
              <p className="text-sm text-muted-foreground">No organizations yet.</p>
            ) : (
              <ul className="space-y-1.5">
                {m.byType.map((t) => (
                  <li key={t.type} className="flex items-center justify-between text-sm">
                    <Link href={`/organizations?type=${t.type}`} className="hover:text-primary">
                      {t.label}
                    </Link>
                    <span className="tabular-nums text-muted-foreground">{t.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <FolderTree className="h-4 w-4 text-muted-foreground" /> Top categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            {m.topCategories.length === 0 ? (
              <p className="text-sm text-muted-foreground">No category assignments yet.</p>
            ) : (
              <ul className="space-y-1.5">
                {m.topCategories.map((c) => (
                  <li key={c.id} className="flex items-center justify-between text-sm">
                    <Link href={`/categories/${c.id}`} className="truncate pr-2 hover:text-primary">
                      {c.name}
                    </Link>
                    <span className="tabular-nums text-muted-foreground">{c.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Geographic distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {m.byState.length === 0 ? (
              <p className="text-sm text-muted-foreground">No locations yet.</p>
            ) : (
              <ul className="space-y-1.5">
                {m.byState.map((s) => (
                  <li key={s.state} className="flex items-center gap-2 text-sm">
                    <Link
                      href={`/organizations?state=${encodeURIComponent(s.state)}`}
                      className="w-10 shrink-0 hover:text-primary"
                    >
                      {s.state}
                    </Link>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full bg-primary/70"
                        style={{ width: `${(s.count / maxState) * 100}%` }}
                      />
                    </span>
                    <span className="w-8 text-right tabular-nums text-muted-foreground">
                      {s.count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Verification status</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {m.byVerification.map((v) => (
                <li key={v.status} className="flex items-center justify-between text-sm">
                  <Link
                    href={`/organizations?verificationStatus=${v.status}`}
                    className="hover:text-primary"
                  >
                    {v.status.replace("_", " ")}
                  </Link>
                  <span className="tabular-nums text-muted-foreground">{v.count}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" /> Recent imports
            </CardTitle>
          </CardHeader>
          <CardContent>
            {m.recentBatches.length === 0 ? (
              <p className="text-sm text-muted-foreground">No import batches yet.</p>
            ) : (
              <ul className="divide-y">
                {m.recentBatches.map((b) => (
                  <li key={b.id} className="flex flex-wrap items-center gap-2 py-2 text-sm">
                    <Link href={`/import?batchId=${b.id}`} className="font-medium hover:text-primary">
                      {b.label ?? b.id.slice(0, 8)}
                    </Link>
                    <ReviewStatusBadge status={b.status} />
                    <span className="ml-auto text-xs text-muted-foreground">
                      {b.recordCount} records · <Badge variant="success">{b.successCount} ok</Badge>{" "}
                      {b.warningCount > 0 && <Badge variant="warning">{b.warningCount} warn</Badge>}{" "}
                      {b.failureCount > 0 && <Badge variant="destructive">{b.failureCount} failed</Badge>}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
