/** DB-backed tests over seeded fixtures (read-only). */
import { describe, expect, it } from "vitest";
import { listOrganizations } from "./organization-service";
import { organizationFiltersSchema } from "@/lib/validation";
import { getCategoryTree } from "./category-service";

function filters(input: Record<string, string>) {
  return organizationFiltersSchema.parse(input);
}

describe("listOrganizations filters", () => {
  it("filters by type", async () => {
    const result = await listOrganizations(filters({ type: "winery" }));
    expect(result.rows.length).toBeGreaterThan(0);
    expect(result.rows.every((r) => r.organizationType === "winery")).toBe(true);
  });

  it("filters by state via locations", async () => {
    const result = await listOrganizations(filters({ state: "OR" }));
    expect(result.rows.map((r) => r.canonicalName)).toContain("Pacific Process Systems Inc");
  });

  it("combines structured filters: California wineries in Temecula", async () => {
    const result = await listOrganizations(
      filters({ type: "winery", state: "CA", city: "Temecula" })
    );
    expect(result.rows.length).toBeGreaterThanOrEqual(2);
    expect(result.rows.every((r) => r.organizationType === "winery")).toBe(true);
    expect(result.rows.every((r) => r.city === "Temecula")).toBe(true);
  });

  it("text search matches aliases", async () => {
    const result = await listOrganizations(filters({ q: "VFS" }));
    // "VFS Co" only exists in staging, not canonical — should not match.
    expect(result.rows.map((r) => r.canonicalName)).not.toContain(
      "Vintners Filtration Supply Co"
    );
    const bySierra = await listOrganizations(filters({ q: "Sierra Sol Cellars LLC" }));
    expect(bySierra.rows.map((r) => r.canonicalName)).toContain("Sierra Sol Cellars");
  });

  it("filters by verification status", async () => {
    const result = await listOrganizations(filters({ verificationStatus: "human_verified" }));
    expect(result.rows.every((r) => r.verificationStatus === "human_verified")).toBe(true);
  });

  it("category filter includes organizations in descendant categories", async () => {
    const tree = await getCategoryTree();
    const vendors = tree.find((n) => n.name === "Winery Vendors");
    expect(vendors).toBeDefined();
    // Pacific Process is assigned to leaf categories under Winery Vendors.
    const result = await listOrganizations(filters({ categoryId: vendors!.id }));
    expect(result.rows.map((r) => r.canonicalName)).toContain("Pacific Process Systems Inc");
  });

  it("paginates", async () => {
    const page1 = await listOrganizations(filters({ pageSize: "2", page: "1" }));
    const page2 = await listOrganizations(filters({ pageSize: "2", page: "2" }));
    expect(page1.rows).toHaveLength(2);
    expect(page1.rows[0].id).not.toBe(page2.rows[0]?.id);
    expect(page1.total).toBeGreaterThan(2);
  });
});

describe("category tree", () => {
  it("builds the hierarchy with rolled-up counts", async () => {
    const tree = await getCategoryTree();
    const vendors = tree.find((n) => n.name === "Winery Vendors")!;
    const equipment = vendors.children.find((n) => n.name === "Wine Equipment")!;
    const heatEx = equipment.children.find(
      (n) => n.name === "Heat Exchangers & Cold Stabilization Equipment"
    )!;
    expect(heatEx.directCount).toBeGreaterThanOrEqual(1);
    // Roll-up: parent totals must be >= any child's total and count distinct orgs.
    expect(equipment.totalCount).toBeGreaterThanOrEqual(heatEx.totalCount);
    expect(vendors.totalCount).toBeGreaterThanOrEqual(equipment.totalCount);
  });
});
