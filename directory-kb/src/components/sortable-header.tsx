"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export function SortableHeader({ field, children }: { field: string; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const currentSort = params.get("sort") ?? "name";
  const currentOrder = params.get("order") ?? "asc";
  const active = currentSort === field;

  function toggle() {
    const next = new URLSearchParams(params.toString());
    next.set("sort", field);
    next.set("order", active && currentOrder === "asc" ? "desc" : "asc");
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`);
  }

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-1 font-medium hover:text-foreground"
    >
      {children}
      {active ? (
        currentOrder === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )
      ) : (
        <ArrowUpDown className="h-3 w-3 opacity-40" />
      )}
    </button>
  );
}
