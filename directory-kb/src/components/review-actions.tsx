"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Pencil, Link2, GitMerge, X, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StagingOrganizationPayload } from "@/lib/validation";

interface DuplicateOption {
  id: string;
  name: string;
  score: number;
}

interface OrgOption {
  id: string;
  canonicalName: string;
  organizationType: string;
}

export function ReviewActions({
  recordId,
  payload,
  duplicates,
  hasValidationErrors,
}: {
  recordId: string;
  payload: StagingOrganizationPayload;
  duplicates: DuplicateOption[];
  hasValidationErrors: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editJson, setEditJson] = useState(() => JSON.stringify(payload, null, 2));

  const [targetOpen, setTargetOpen] = useState<"link" | "merge" | null>(null);
  const [targetOrg, setTargetOrg] = useState<OrgOption | null>(null);
  const [orgQuery, setOrgQuery] = useState("");
  const [orgOptions, setOrgOptions] = useState<OrgOption[]>([]);

  async function submit(body: unknown) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/import/staging/${recordId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Action failed");
        return;
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusy(false);
    }
  }

  async function searchOrgs(q: string) {
    setOrgQuery(q);
    if (!q.trim()) {
      setOrgOptions([]);
      return;
    }
    const res = await fetch(`/api/organizations?lookup=${encodeURIComponent(q)}`);
    const json = await res.json();
    setOrgOptions(json.data ?? []);
  }

  function openTargetDialog(mode: "link" | "merge", preselected?: DuplicateOption) {
    setTargetOpen(mode);
    setOrgQuery("");
    setOrgOptions([]);
    setTargetOrg(
      preselected
        ? { id: preselected.id, canonicalName: preselected.name, organizationType: "" }
        : null
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Review actions</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
            {error}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => submit({ action: "approve" })}
            disabled={busy || hasValidationErrors}
            title={
              hasValidationErrors
                ? "Fix validation errors via Edit & approve"
                : "Create a new canonical organization"
            }
          >
            {busy ? <Loader2 className="animate-spin" /> : <Check />} Approve
          </Button>
          <Button variant="secondary" onClick={() => setEditOpen(true)} disabled={busy}>
            <Pencil /> Edit &amp; approve
          </Button>
          <Button variant="outline" onClick={() => openTargetDialog("link")} disabled={busy}>
            <Link2 /> Link to existing
          </Button>
          <Button variant="outline" onClick={() => openTargetDialog("merge")} disabled={busy}>
            <GitMerge /> Merge
          </Button>
          <Button
            variant="destructive"
            onClick={() => submit({ action: "reject" })}
            disabled={busy}
          >
            <X /> Reject
          </Button>
        </div>
        {duplicates.length > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            Tip: for a detected duplicate, use <em>Link to existing</em> to attach this
            listing&apos;s evidence to the match, or <em>Merge</em> to combine records. Merges
            preserve aliases and all source evidence.
          </p>
        )}
      </CardContent>

      {/* Edit & approve */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit &amp; approve</DialogTitle>
            <DialogDescription>
              Correct the extracted payload before it becomes a canonical organization. The
              original raw extraction stays preserved on the staging record.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={editJson}
            onChange={(e) => setEditJson(e.target.value)}
            className="max-h-96 min-h-64 font-mono text-xs"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={busy}
              onClick={() => {
                try {
                  const parsed = JSON.parse(editJson);
                  setEditOpen(false);
                  submit({ action: "edit_approve", payload: parsed });
                } catch {
                  setError("Payload is not valid JSON");
                }
              }}
            >
              Approve edited record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link / merge target picker */}
      <Dialog open={targetOpen !== null} onOpenChange={(o) => !o && setTargetOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {targetOpen === "link" ? "Link to existing organization" : "Merge into existing organization"}
            </DialogTitle>
            <DialogDescription>
              {targetOpen === "link"
                ? "Attach this listing's evidence and name to an existing organization without creating a new record."
                : "Materialize this record, then merge it into the selected organization. The existing organization's verified data wins; aliases and source evidence are preserved. This cannot be undone from the UI."}
            </DialogDescription>
          </DialogHeader>

          {duplicates.length > 0 && (
            <div>
              <Label className="mb-1.5 block text-xs uppercase text-muted-foreground">
                Detected duplicates
              </Label>
              <div className="flex flex-wrap gap-1.5">
                {duplicates.map((d) => (
                  <button
                    key={d.id}
                    onClick={() =>
                      setTargetOrg({ id: d.id, canonicalName: d.name, organizationType: "" })
                    }
                    className={`rounded-md border px-2.5 py-1 text-sm transition-colors ${
                      targetOrg?.id === d.id
                        ? "border-primary bg-primary/10"
                        : "hover:bg-accent"
                    }`}
                  >
                    {d.name} ({Math.round(d.score * 100)}%)
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label className="mb-1.5 block text-xs uppercase text-muted-foreground">
              Or search all organizations
            </Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={orgQuery}
                onChange={(e) => searchOrgs(e.target.value)}
                placeholder="Type an organization name…"
                className="pl-8"
              />
            </div>
            {orgOptions.length > 0 && (
              <ul className="mt-1 max-h-40 overflow-y-auto rounded-md border">
                {orgOptions.map((o) => (
                  <li key={o.id}>
                    <button
                      onClick={() => {
                        setTargetOrg(o);
                        setOrgOptions([]);
                        setOrgQuery(o.canonicalName);
                      }}
                      className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-accent"
                    >
                      {o.canonicalName}
                      <span className="text-xs text-muted-foreground">{o.organizationType}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {targetOrg && (
            <div className="rounded-md bg-muted px-3 py-2 text-sm">
              Selected: <span className="font-medium">{targetOrg.canonicalName}</span>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setTargetOpen(null)}>
              Cancel
            </Button>
            <Button
              disabled={busy || !targetOrg}
              variant={targetOpen === "merge" ? "destructive" : "default"}
              onClick={() => {
                if (!targetOrg) return;
                const mode = targetOpen;
                setTargetOpen(null);
                if (mode === "link") {
                  submit({ action: "link", organization_id: targetOrg.id });
                } else {
                  submit({ action: "merge", organization_id: targetOrg.id, confirm: true });
                }
              }}
            >
              {targetOpen === "link" ? "Link record" : "Confirm merge"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
