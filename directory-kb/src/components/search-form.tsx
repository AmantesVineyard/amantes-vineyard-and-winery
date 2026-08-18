"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export function SearchForm({ placeholder }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  useEffect(() => setQ(params.get("q") ?? ""), [params]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const next = new URLSearchParams(params.toString());
        if (q) next.set("q", q);
        else next.delete("q");
        next.delete("page");
        router.push(`${pathname}?${next.toString()}`);
      }}
    >
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder ?? "Search…"}
        className="bg-background"
      />
    </form>
  );
}
