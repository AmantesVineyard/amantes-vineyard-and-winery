import { sql, eq, desc, asc } from "drizzle-orm";
import { db, type Db } from "@/db";
import {
  importBatches,
  stagingRecords,
  organizations,
  organizationAliases,
  brands,
  contacts,
  locations,
  categories,
  organizationCategories,
  sourcePages,
  sourceEvidence,
  organizationTypes,
} from "@/db/schema";
import {
  importBatchInputSchema,
  stagingOrganizationSchema,
  type ImportBatchInput,
  type StagingOrganizationPayload,
  type ReviewAction,
} from "@/lib/validation";
import { normalizeDomain, normalizeOrgName, normalizePhone, slugify } from "@/lib/normalize";
import { findDuplicates, mergeOrganizations } from "./duplicate-service";

type Tx = Parameters<Parameters<Db["transaction"]>[0]>[0];

// ---------------------------------------------------------------------------
// Batch ingestion: JSON in → staging rows with validation + duplicate probes.
// Nothing becomes canonical here; that only happens through review actions.
// ---------------------------------------------------------------------------

export async function createImportBatch(input: ImportBatchInput) {
  const parsed = importBatchInputSchema.parse(input);

  const [batch] = await db
    .insert(importBatches)
    .values({
      sourceDocumentId: parsed.source_document_id ?? null,
      label: parsed.label ?? null,
      importerVersion: parsed.importer_version,
      recordCount: parsed.records.length,
      status: "processing",
    })
    .returning();

  let success = 0;
  let warnings = 0;
  let failures = 0;

  for (const record of parsed.records) {
    const validation = stagingOrganizationSchema.safeParse(record.payload);
    const validationErrors = validation.success
      ? []
      : validation.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);

    let sourcePageId: string | null = null;
    if (record.source_page_number && parsed.source_document_id) {
      const page = await db.query.sourcePages.findFirst({
        where: sql`${sourcePages.sourceDocumentId} = ${parsed.source_document_id}
                   AND ${sourcePages.physicalPageNumber} = ${record.source_page_number}`,
      });
      sourcePageId = page?.id ?? null;
      if (!page) validationErrors.push(`source page ${record.source_page_number} not found`);
    }

    const payload = validation.success ? validation.data : null;
    const duplicates = payload
      ? await findDuplicates({
          name: payload.name,
          website: payload.website,
          phone: payload.phone,
          city: payload.locations.find((l) => l.is_primary)?.city ?? payload.locations[0]?.city,
        })
      : [];

    const normalized = payload
      ? {
          name: payload.name.trim(),
          name_normalized: normalizeOrgName(payload.name),
          website_domain: normalizeDomain(payload.website),
          phone_normalized: normalizePhone(payload.phone),
        }
      : {};

    await db.insert(stagingRecords).values({
      importBatchId: batch.id,
      sourcePageId,
      proposedEntityType: record.proposed_entity_type,
      rawPayload: record.payload,
      normalizedPayload: normalized,
      extractionConfidence: record.extraction_confidence ?? null,
      duplicateCandidates: duplicates,
      validationErrors,
      reviewStatus: "pending",
    });

    if (validationErrors.length > 0) failures += 1;
    else if (duplicates.length > 0) warnings += 1;
    else success += 1;
  }

  const [updated] = await db
    .update(importBatches)
    .set({
      successCount: success,
      warningCount: warnings,
      failureCount: failures,
      status: failures > 0 ? "completed_with_warnings" : "completed",
    })
    .where(eq(importBatches.id, batch.id))
    .returning();

  return updated;
}

export async function listImportBatches() {
  return db.query.importBatches.findMany({
    with: { sourceDocument: { columns: { id: true, title: true, edition: true } } },
    orderBy: [desc(importBatches.importedAt)],
  });
}

export async function listStagingRecords(opts: {
  batchId?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) {
  const page = opts.page ?? 1;
  const pageSize = opts.pageSize ?? 25;
  const conditions = [sql`true`];
  if (opts.batchId) conditions.push(sql`${stagingRecords.importBatchId} = ${opts.batchId}`);
  if (opts.status) conditions.push(sql`${stagingRecords.reviewStatus} = ${opts.status}`);
  const where = sql.join(conditions, sql` AND `);

  const [rows, [{ count }]] = await Promise.all([
    db.query.stagingRecords.findMany({
      where,
      with: {
        batch: { columns: { id: true, label: true, importerVersion: true } },
        sourcePage: { with: { document: { columns: { title: true, edition: true } } } },
      },
      orderBy: [asc(stagingRecords.createdAt)],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }),
    db.select({ count: sql<number>`COUNT(*)::int` }).from(stagingRecords).where(where),
  ]);
  return { rows, total: count, page, pageSize };
}

export async function getStagingRecord(id: string) {
  const record = await db.query.stagingRecords.findFirst({
    where: eq(stagingRecords.id, id),
    with: {
      batch: true,
      sourcePage: { with: { document: true } },
    },
  });
  if (!record) return null;

  // Refresh duplicate candidates with live data and hydrate matched orgs.
  const parsed = stagingOrganizationSchema.safeParse(record.rawPayload);
  const duplicates = parsed.success
    ? await findDuplicates({
        name: parsed.data.name,
        website: parsed.data.website,
        phone: parsed.data.phone,
        city:
          parsed.data.locations.find((l) => l.is_primary)?.city ??
          parsed.data.locations[0]?.city,
      })
    : [];

  return { ...record, liveDuplicates: duplicates };
}

// ---------------------------------------------------------------------------
// Review actions
// ---------------------------------------------------------------------------

/**
 * Materialize a staged organization payload as canonical rows, attaching
 * source evidence for every created entity. Machine confidence is carried
 * through; human approval marks the org row human_verified.
 */
async function materializeOrganization(
  tx: Tx,
  payload: StagingOrganizationPayload,
  opts: {
    sourcePageId: string | null;
    extractionConfidence: number | null;
    humanVerified: boolean;
  }
) {
  const orgType = await tx.query.organizationTypes.findFirst({
    where: eq(organizationTypes.code, payload.organization_type),
  });

  const [org] = await tx
    .insert(organizations)
    .values({
      canonicalName: payload.name.trim(),
      organizationType: orgType ? payload.organization_type : "other",
      description: payload.description ?? null,
      website: payload.website ?? null,
      websiteDomain: normalizeDomain(payload.website),
      mainPhone: payload.phone ?? null,
      phoneNormalized: normalizePhone(payload.phone),
      email: payload.email ?? null,
      verificationStatus: opts.humanVerified ? "human_verified" : "unreviewed",
    })
    .returning();

  const evidenceRows: Array<{ entityType: string; entityId: string; text: string | null }> = [
    { entityType: "organization", entityId: org.id, text: payload.evidence_text ?? null },
  ];

  for (const alias of payload.aliases) {
    await tx
      .insert(organizationAliases)
      .values({ organizationId: org.id, alias, aliasType: "alternate" })
      .onConflictDoNothing();
  }

  for (const brandName of payload.brands) {
    const [brand] = await tx
      .insert(brands)
      .values({
        brandName,
        owningOrganizationId: org.id,
        verificationStatus: opts.humanVerified ? "human_verified" : "unreviewed",
      })
      .returning();
    evidenceRows.push({ entityType: "brand", entityId: brand.id, text: brandName });
  }

  for (const c of payload.contacts) {
    const [contact] = await tx
      .insert(contacts)
      .values({
        organizationId: org.id,
        firstName: c.first_name ?? null,
        lastName: c.last_name ?? null,
        fullName: c.full_name,
        title: c.title ?? null,
        email: c.email ?? null,
        phone: c.phone ?? null,
        contactType: c.contact_type,
        verificationStatus: opts.humanVerified ? "human_verified" : "unreviewed",
      })
      .returning();
    evidenceRows.push({ entityType: "contact", entityId: contact.id, text: c.full_name });
  }

  for (const l of payload.locations) {
    const [location] = await tx
      .insert(locations)
      .values({
        organizationId: org.id,
        locationType: l.location_type,
        addressLine1: l.address_line_1 ?? null,
        addressLine2: l.address_line_2 ?? null,
        city: l.city ?? null,
        stateProvince: l.state_province ?? null,
        postalCode: l.postal_code ?? null,
        country: l.country,
        isPrimary: l.is_primary,
      })
      .returning();
    evidenceRows.push({
      entityType: "location",
      entityId: location.id,
      text: [l.address_line_1, l.city, l.state_province].filter(Boolean).join(", ") || null,
    });
  }

  // Categories are matched by slug/name; unknown categories are NOT invented —
  // they are recorded in metadata for later curation.
  const unmatchedCategories: string[] = [];
  for (const catName of payload.categories) {
    const cat = await tx.query.categories.findFirst({
      where: sql`${categories.slug} = ${slugify(catName)} OR lower(${categories.name}) = ${catName.toLowerCase()}`,
    });
    if (cat) {
      await tx
        .insert(organizationCategories)
        .values({
          organizationId: org.id,
          categoryId: cat.id,
          relationshipType: "listed_under",
          confidence: opts.extractionConfidence,
        })
        .onConflictDoNothing();
    } else {
      unmatchedCategories.push(catName);
    }
  }
  if (unmatchedCategories.length > 0) {
    await tx
      .update(organizations)
      .set({
        metadata: sql`${organizations.metadata} || jsonb_build_object('unmatched_categories', ${JSON.stringify(unmatchedCategories)}::jsonb)`,
      })
      .where(eq(organizations.id, org.id));
  }

  if (opts.sourcePageId) {
    for (const ev of evidenceRows) {
      await tx.insert(sourceEvidence).values({
        sourcePageId: opts.sourcePageId,
        entityType: ev.entityType,
        entityId: ev.entityId,
        evidenceText: ev.text,
        extractionConfidence: opts.extractionConfidence,
        verificationStatus: opts.humanVerified ? "human_verified" : "unreviewed",
      });
    }
  }

  return org;
}

export async function reviewStagingRecord(id: string, action: ReviewAction) {
  const record = await db.query.stagingRecords.findFirst({
    where: eq(stagingRecords.id, id),
  });
  if (!record) throw new Error("Staging record not found");
  if (record.reviewStatus !== "pending")
    throw new Error(`Record already reviewed (${record.reviewStatus})`);

  const reviewFields = {
    reviewedBy: action.reviewed_by,
    reviewedAt: new Date(),
    reviewNotes: action.notes ?? null,
    updatedAt: new Date(),
  };

  switch (action.action) {
    case "reject": {
      const [updated] = await db
        .update(stagingRecords)
        .set({ ...reviewFields, reviewStatus: "rejected" })
        .where(eq(stagingRecords.id, id))
        .returning();
      return updated;
    }

    case "approve":
    case "edit_approve": {
      const payload =
        action.action === "edit_approve"
          ? action.payload
          : stagingOrganizationSchema.parse(record.rawPayload);

      return db.transaction(async (tx) => {
        const org = await materializeOrganization(tx, payload, {
          sourcePageId: record.sourcePageId,
          extractionConfidence: record.extractionConfidence,
          humanVerified: true,
        });
        const [updated] = await tx
          .update(stagingRecords)
          .set({
            ...reviewFields,
            reviewStatus: action.action === "approve" ? "approved" : "edited_approved",
            resolvedEntityType: "organization",
            resolvedEntityId: org.id,
          })
          .where(eq(stagingRecords.id, id))
          .returning();
        return updated;
      });
    }

    case "link": {
      // Attach the staged record's evidence to an existing organization
      // without altering the organization's verified fields.
      const payload = stagingOrganizationSchema.safeParse(record.rawPayload);
      return db.transaction(async (tx) => {
        const [org] = await tx
          .select()
          .from(organizations)
          .where(eq(organizations.id, action.organization_id));
        if (!org) throw new Error("Target organization not found");

        if (record.sourcePageId) {
          await tx.insert(sourceEvidence).values({
            sourcePageId: record.sourcePageId,
            entityType: "organization",
            entityId: org.id,
            evidenceText: payload.success ? payload.data.evidence_text ?? payload.data.name : null,
            extractionConfidence: record.extractionConfidence,
            verificationStatus: "human_verified",
          });
        }
        // Record the staged name as an alias if it differs.
        if (payload.success && payload.data.name.trim() !== org.canonicalName) {
          await tx
            .insert(organizationAliases)
            .values({
              organizationId: org.id,
              alias: payload.data.name.trim(),
              aliasType: "directory_listing",
            })
            .onConflictDoNothing();
        }
        const [updated] = await tx
          .update(stagingRecords)
          .set({
            ...reviewFields,
            reviewStatus: "linked",
            resolvedEntityType: "organization",
            resolvedEntityId: org.id,
          })
          .where(eq(stagingRecords.id, id))
          .returning();
        return updated;
      });
    }

    case "merge": {
      // Materialize the staged record, then merge it into the chosen existing
      // organization (existing record wins; staged data fills gaps and its
      // name/evidence are preserved). Requires explicit confirm: true.
      const payload = stagingOrganizationSchema.parse(record.rawPayload);
      const org = await db.transaction(async (tx) =>
        materializeOrganization(tx, payload, {
          sourcePageId: record.sourcePageId,
          extractionConfidence: record.extractionConfidence,
          humanVerified: false,
        })
      );
      await mergeOrganizations({
        winnerId: action.organization_id,
        loserId: org.id,
        mergedBy: action.reviewed_by,
      });
      const [updated] = await db
        .update(stagingRecords)
        .set({
          ...reviewFields,
          reviewStatus: "merged",
          resolvedEntityType: "organization",
          resolvedEntityId: action.organization_id,
        })
        .where(eq(stagingRecords.id, id))
        .returning();
      return updated;
    }
  }
}
