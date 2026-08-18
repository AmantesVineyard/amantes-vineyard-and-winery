import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

const VERIFICATION_VARIANTS: Record<
  string,
  { variant: "success" | "info" | "muted" | "destructive"; label: string }
> = {
  human_verified: { variant: "success", label: "Human verified" },
  auto_verified: { variant: "info", label: "Auto verified" },
  unreviewed: { variant: "muted", label: "Unreviewed" },
  rejected: { variant: "destructive", label: "Rejected" },
};

export function VerificationBadge({ status }: { status: string }) {
  const v = VERIFICATION_VARIANTS[status] ?? { variant: "muted" as const, label: status };
  return <Badge variant={v.variant}>{v.label}</Badge>;
}

export const TYPE_LABELS: Record<string, string> = {
  winery: "Winery",
  vendor: "Vendor",
  distributor: "Distributor",
  grower: "Grower",
  association: "Association",
  education: "Education",
  service_provider: "Service Provider",
  custom_crush: "Custom Crush",
  other: "Other",
};

export function TypeBadge({ type }: { type: string }) {
  return <Badge variant="outline">{TYPE_LABELS[type] ?? type}</Badge>;
}

export function ReviewStatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: "success" | "info" | "muted" | "destructive" | "warning"; label: string }> = {
    pending: { variant: "warning", label: "Pending" },
    approved: { variant: "success", label: "Approved" },
    edited_approved: { variant: "success", label: "Edited + approved" },
    linked: { variant: "info", label: "Linked" },
    merged: { variant: "info", label: "Merged" },
    rejected: { variant: "destructive", label: "Rejected" },
  };
  const v = map[status] ?? { variant: "muted" as const, label: status };
  return <Badge variant={v.variant}>{v.label}</Badge>;
}

export function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const url = /^[a-z][a-z0-9+.-]*:\/\//i.test(href) ? href : `https://${href}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("text-primary hover:underline", className)}
    >
      {children}
    </a>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

export function Pagination({
  page,
  pageSize,
  total,
  hrefFor,
}: {
  page: number;
  pageSize: number;
  total: number;
  hrefFor: (page: number) => string;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);
  return (
    <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
      <div>
        {start}–{end} of {total.toLocaleString()}
      </div>
      <div className="flex items-center gap-1">
        {page > 1 && (
          <Link href={hrefFor(page - 1)} className="rounded-md border px-2.5 py-1 hover:bg-accent">
            Previous
          </Link>
        )}
        <span className="px-2">
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <Link href={hrefFor(page + 1)} className="rounded-md border px-2.5 py-1 hover:bg-accent">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}

export function ConfidenceMeter({ value }: { value: number | null | undefined }) {
  if (value === null || value === undefined) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }
  const pct = Math.round(value * 100);
  const color = pct >= 85 ? "bg-green-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500";
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <span className={cn("block h-full", color)} style={{ width: `${pct}%` }} />
      </span>
      <span className="text-xs tabular-nums text-muted-foreground">{pct}%</span>
    </span>
  );
}
