"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { TYPE_LABELS } from "@/components/shared";

const ALL = "__all__";

export interface FilterOptions {
  types: Array<{ code: string; label: string }>;
  states: string[];
  countries: string[];
}

export function OrgFilters({ options }: { options: FilterOptions }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  function apply(patch: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "" || v === ALL) next.delete(k);
      else next.set(k, v);
    }
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`);
  }

  const hasFilters = ["q", "type", "state", "country", "city", "verificationStatus"].some(
    (k) => params.get(k)
  );

  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          apply({ q, sort: q ? "relevance" : null });
        }}
        className="min-w-52 flex-1"
      >
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search names, aliases, descriptions…"
          className="bg-background"
        />
      </form>

      <Select
        value={params.get("type") ?? ALL}
        onValueChange={(v) => apply({ type: v })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All types</SelectItem>
          {options.types.map((t) => (
            <SelectItem key={t.code} value={t.code}>
              {t.label ?? TYPE_LABELS[t.code] ?? t.code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={params.get("state") ?? ALL}
        onValueChange={(v) => apply({ state: v })}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All states</SelectItem>
          {options.states.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={params.get("country") ?? ALL}
        onValueChange={(v) => apply({ country: v })}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All countries</SelectItem>
          {options.countries.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={params.get("verificationStatus") ?? ALL}
        onValueChange={(v) => apply({ verificationStatus: v })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Verification" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>Any verification</SelectItem>
          <SelectItem value="human_verified">Human verified</SelectItem>
          <SelectItem value="auto_verified">Auto verified</SelectItem>
          <SelectItem value="unreviewed">Unreviewed</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={() => router.push(pathname)}>
          <X className="h-3.5 w-3.5" /> Clear
        </Button>
      )}
    </div>
  );
}
