"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Wine,
  FolderTree,
  Users,
  Inbox,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GlobalSearch } from "@/components/global-search";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/organizations", label: "Organizations", icon: Building2 },
  { href: "/brands", label: "Brands", icon: Wine },
  { href: "/categories", label: "Categories", icon: FolderTree },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/import", label: "Import Review", icon: Inbox },
  { href: "/sources", label: "Sources", icon: BookOpen },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-0.5 px-2">
      {NAV.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-white"
                : "text-sidebar-muted hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col bg-sidebar lg:flex">
        <div className="flex h-14 items-center gap-2 px-4">
          <Wine className="h-5 w-5 text-white" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">Wine Directory KB</div>
            <div className="text-[11px] text-sidebar-muted">Buyer&apos;s Guide 2026</div>
          </div>
        </div>
        {nav}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-sidebar pt-4">
            <button
              className="absolute right-3 top-3 text-sidebar-muted"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4 px-4 text-sm font-semibold text-white">Wine Directory KB</div>
            {nav}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-56">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <GlobalSearch />
        </header>
        <main className="flex-1 px-4 py-5 lg:px-6">{children}</main>
      </div>
    </div>
  );
}
