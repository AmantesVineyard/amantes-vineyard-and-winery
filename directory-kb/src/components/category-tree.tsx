"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, FolderTree, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryTreeNode } from "@/services/category-service";

function TreeNode({ node, depth }: { node: CategoryTreeNode; depth: number }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = node.children.length > 0;

  return (
    <li>
      <div
        className={cn(
          "group flex items-center gap-1 rounded-md py-1.5 pr-2 hover:bg-accent",
        )}
        style={{ paddingLeft: `${depth * 20 + 4}px` }}
      >
        {hasChildren ? (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Collapse" : "Expand"}
            className="rounded p-0.5 text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className={cn("h-4 w-4 transition-transform", open && "rotate-90")} />
          </button>
        ) : (
          <span className="w-5" />
        )}
        {depth === 0 ? (
          <FolderTree className="h-4 w-4 shrink-0 text-primary" />
        ) : (
          <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <Link
          href={`/categories/${node.id}`}
          className="min-w-0 flex-1 truncate text-sm font-medium hover:text-primary"
        >
          {node.name}
        </Link>
        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
          {node.totalCount}
        </span>
      </div>
      {hasChildren && open && (
        <ul>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function CategoryTree({ tree }: { tree: CategoryTreeNode[] }) {
  return (
    <ul className="space-y-0.5">
      {tree.map((node) => (
        <TreeNode key={node.id} node={node} depth={0} />
      ))}
    </ul>
  );
}
