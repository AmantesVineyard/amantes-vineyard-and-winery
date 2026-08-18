"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Building2, Wine, Users, FolderTree, MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Hit {
  entityType: string;
  entityId: string;
  title: string;
  subtitle: string | null;
  matchedField: string;
  href: string;
}

const TYPE_ICONS: Record<string, typeof Building2> = {
  organization: Building2,
  brand: Wine,
  contact: Users,
  category: FolderTree,
  location: MapPin,
};

export function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setHits([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`, {
          signal: controller.signal,
        });
        const json = await res.json();
        setHits(json.data ?? []);
      } catch {
        // aborted or network error — keep previous results
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {loading && (
          <Loader2 className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) {
              setOpen(false);
              router.push(`/search?q=${encodeURIComponent(query)}`);
            }
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search organizations, brands, contacts, categories…"
          className="h-9 w-full rounded-md border bg-muted/40 pl-8 pr-8 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:bg-background"
        />
      </div>
      {open && query.trim() && (
        <div className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover shadow-lg">
          {hits.length === 0 && !loading ? (
            <div className="px-3 py-4 text-sm text-muted-foreground">No matches</div>
          ) : (
            <ul className="max-h-96 overflow-y-auto py-1">
              {hits.map((hit) => {
                const Icon = TYPE_ICONS[hit.entityType] ?? Building2;
                return (
                  <li key={`${hit.entityType}-${hit.entityId}-${hit.matchedField}`}>
                    <Link
                      href={hit.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-accent"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{hit.title}</span>
                        {hit.subtitle && (
                          <span className="block truncate text-xs text-muted-foreground">
                            {hit.subtitle}
                          </span>
                        )}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground"
                        )}
                      >
                        {hit.entityType}
                      </span>
                    </Link>
                  </li>
                );
              })}
              <li className="border-t">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm text-primary hover:bg-accent"
                >
                  View all results for “{query}”
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
