/**
 * DB-backed workflow tests. They create their own fixtures (prefixed
 * "TESTONLY") and remove them afterwards, leaving seed data intact.
 */
import { afterAll, describe, expect, it } from "vitest";
import { eq, sql, inArray } from "drizzle-orm";
import { db } from "@/db";
import {
  organizations,
  organizationAliases,
  sourceEvidence,
  importBatches,
  brands,
} from "@/db/schema";
import { createImportBatch, reviewStagingRecord, listStagingRecords } from "./import-service";
import { findDuplicates, mergeOrganizations } from "./duplicate-service";

const createdBatchIds: string[] = [];

afterAll(async () => {
  // staging_records cascade with their batch
  if (createdBatchIds.length > 0) {
    await db.delete(importBatches).where(inArray(importBatches.id, createdBatchIds));
  }
  const testOrgs = await db
    .select({ id: organizations.id })
    .from(organizations)
    .where(sql`${organizations.canonicalName} LIKE 'TESTONLY%'`);
  const ids = testOrgs.map((o) => o.id);
  if (ids.length > 0) {
    await db
      .delete(sourceEvidence)
      .where(
        sql`${sourceEvidence.entityType} = 'organization' AND ${sourceEvidence.entityId} IN ${ids}`
      );
    // Clear merge tombstone pointers first to satisfy self-references.
    await db
      .update(organizations)
      .set({ mergedIntoId: null })
      .where(inArray(organizations.id, ids));
    await db.delete(organizations).where(inArray(organizations.id, ids));
  }
});

function orgPayload(name: string, overrides: Record<string, unknown> = {}) {
  return {
    name,
    organization_type: "winery",
    description: "TESTONLY synthetic record",
    website: null,
    phone: null,
    email: null,
    aliases: [],
    brands: [],
    categories: [],
    locations: [],
    contacts: [],
    evidence_text: `TESTONLY listing for ${name}`,
    bounding_box: null,
    ...overrides,
  };
}

describe("import → staging → review workflow", () => {
  it("stages records without creating canonical entities", async () => {
    const batch = await createImportBatch({
      source_document_id: null,
      label: "TESTONLY batch",
      importer_version: "test-0",
      records: [
        {
          proposed_entity_type: "organization",
          source_page_number: null,
          extraction_confidence: 0.8,
          payload: orgPayload("TESTONLY Staging Winery"),
        },
      ],
    });
    createdBatchIds.push(batch.id);
    expect(batch.recordCount).toBe(1);

    const canonical = await db
      .select()
      .from(organizations)
      .where(eq(organizations.canonicalName, "TESTONLY Staging Winery"));
    expect(canonical).toHaveLength(0);

    const staged = await listStagingRecords({ batchId: batch.id });
    expect(staged.rows).toHaveLength(1);
    expect(staged.rows[0].reviewStatus).toBe("pending");
  });

  it("approve materializes the org with brands, aliases and marks record resolved", async () => {
    const batch = await createImportBatch({
      source_document_id: null,
      label: "TESTONLY approve batch",
      importer_version: "test-0",
      records: [
        {
          proposed_entity_type: "organization",
          source_page_number: null,
          extraction_confidence: 0.9,
          payload: orgPayload("TESTONLY Approved Winery", {
            aliases: ["TESTONLY AW"],
            brands: ["TESTONLY Brand One"],
          }),
        },
      ],
    });
    createdBatchIds.push(batch.id);
    const staged = (await listStagingRecords({ batchId: batch.id })).rows[0];

    const reviewed = await reviewStagingRecord(staged.id, {
      action: "approve",
      reviewed_by: "test-suite",
      notes: null,
    });
    expect(reviewed?.reviewStatus).toBe("approved");
    expect(reviewed?.resolvedEntityId).toBeTruthy();

    const [org] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, reviewed!.resolvedEntityId!));
    expect(org.canonicalName).toBe("TESTONLY Approved Winery");
    expect(org.verificationStatus).toBe("human_verified");

    const orgAliases = await db
      .select()
      .from(organizationAliases)
      .where(eq(organizationAliases.organizationId, org.id));
    expect(orgAliases.map((a) => a.alias)).toContain("TESTONLY AW");

    const orgBrands = await db
      .select()
      .from(brands)
      .where(eq(brands.owningOrganizationId, org.id));
    expect(orgBrands.map((b) => b.brandName)).toContain("TESTONLY Brand One");
    // cleanup brands now (org cleanup happens in afterAll)
    await db.delete(brands).where(eq(brands.owningOrganizationId, org.id));
  });

  it("rejects double review of the same record", async () => {
    const batch = await createImportBatch({
      source_document_id: null,
      label: "TESTONLY double review",
      importer_version: "test-0",
      records: [
        {
          proposed_entity_type: "organization",
          source_page_number: null,
          extraction_confidence: 0.5,
          payload: orgPayload("TESTONLY Rejected Winery"),
        },
      ],
    });
    createdBatchIds.push(batch.id);
    const staged = (await listStagingRecords({ batchId: batch.id })).rows[0];
    await reviewStagingRecord(staged.id, { action: "reject", reviewed_by: "t", notes: null });
    await expect(
      reviewStagingRecord(staged.id, { action: "reject", reviewed_by: "t", notes: null })
    ).rejects.toThrow(/already reviewed/i);
  });
});

describe("duplicate detection", () => {
  it("detects the seeded OCR-variant duplicate pair", async () => {
    const dupes = await findDuplicates({
      name: "Rancho Bela Vista Wnery",
      phone: "(555) 210-8890",
      city: "Temecula",
    });
    const names = dupes.map((d) => d.canonicalName);
    expect(names).toContain("Rancho Bella Vista Winery");
    expect(dupes[0].signals.length).toBeGreaterThan(0);
  });

  it("matches on website domain even with different names", async () => {
    const dupes = await findDuplicates({
      name: "Completely Different Name Co",
      website: "https://pacificprocess.example.com/contact",
    });
    expect(dupes.map((d) => d.canonicalName)).toContain("Pacific Process Systems Inc");
    expect(dupes.find((d) => d.canonicalName === "Pacific Process Systems Inc")?.signals).toContain(
      "same website domain"
    );
  });

  it("does not flag unrelated organizations", async () => {
    const dupes = await findDuplicates({ name: "Zzyzx Unrelated Widgets" });
    expect(dupes).toHaveLength(0);
  });
});

describe("merge preserves history", () => {
  it("keeps aliases, evidence and a tombstone", async () => {
    const [winner] = await db
      .insert(organizations)
      .values({
        canonicalName: "TESTONLY Merge Winner",
        organizationType: "winery",
        verificationStatus: "human_verified",
      })
      .returning();
    const [loser] = await db
      .insert(organizations)
      .values({
        canonicalName: "TESTONLY Merge Loser LLC",
        organizationType: "winery",
        website: "https://mergeloser.example.com",
      })
      .returning();
    await db.insert(organizationAliases).values({
      organizationId: loser.id,
      alias: "TESTONLY Loser Alias",
      aliasType: "alternate",
    });

    await mergeOrganizations({ winnerId: winner.id, loserId: loser.id, mergedBy: "test" });

    const aliases = await db
      .select()
      .from(organizationAliases)
      .where(eq(organizationAliases.organizationId, winner.id));
    const aliasNames = aliases.map((a) => a.alias);
    expect(aliasNames).toContain("TESTONLY Merge Loser LLC"); // loser's name preserved
    expect(aliasNames).toContain("TESTONLY Loser Alias"); // loser's aliases moved

    const [loserAfter] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, loser.id));
    expect(loserAfter.mergedIntoId).toBe(winner.id); // tombstone, not deleted
    expect(loserAfter.status).toBe("merged");

    const [winnerAfter] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, winner.id));
    // gap-fill: winner had no website, loser's carries over
    expect(winnerAfter.website).toBe("https://mergeloser.example.com");
    // winner's own values never overwritten
    expect(winnerAfter.canonicalName).toBe("TESTONLY Merge Winner");

    // merged orgs disappear from listings/search
    const { listOrganizations } = await import("./organization-service");
    const { organizationFiltersSchema } = await import("@/lib/validation");
    const listed = await listOrganizations(
      organizationFiltersSchema.parse({ q: "TESTONLY Merge Loser" })
    );
    expect(listed.rows.map((r) => r.id)).not.toContain(loser.id);
  });

  it("refuses to merge an organization into itself", async () => {
    const [org] = await db
      .insert(organizations)
      .values({ canonicalName: "TESTONLY SelfMerge", organizationType: "other" })
      .returning();
    await expect(
      mergeOrganizations({ winnerId: org.id, loserId: org.id, mergedBy: "test" })
    ).rejects.toThrow(/itself/);
  });
});
