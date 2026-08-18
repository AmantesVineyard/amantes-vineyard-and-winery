import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  real,
  doublePrecision,
  timestamp,
  boolean,
  jsonb,
  index,
  uniqueIndex,
  primaryKey,
  vector,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Lookup values kept as plain text + lookup table (extensible without ALTER TYPE)
// ---------------------------------------------------------------------------

export const organizationTypes = pgTable("organization_types", {
  code: varchar("code", { length: 64 }).primaryKey(),
  label: text("label").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const verificationStatusEnum = pgEnum("verification_status", [
  "unreviewed",
  "auto_verified",
  "human_verified",
  "rejected",
]);

export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "approved",
  "edited_approved",
  "linked",
  "merged",
  "rejected",
]);

export const importBatchStatusEnum = pgEnum("import_batch_status", [
  "pending",
  "processing",
  "completed",
  "completed_with_warnings",
  "failed",
]);

// ---------------------------------------------------------------------------
// Core entities
// ---------------------------------------------------------------------------

export const organizations = pgTable(
  "organizations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    canonicalName: text("canonical_name").notNull(),
    organizationType: varchar("organization_type", { length: 64 })
      .notNull()
      .references(() => organizationTypes.code),
    description: text("description"),
    website: text("website"),
    websiteDomain: text("website_domain"),
    mainPhone: text("main_phone"),
    phoneNormalized: text("phone_normalized"),
    email: text("email"),
    status: varchar("status", { length: 32 }).notNull().default("active"),
    verificationStatus: verificationStatusEnum("verification_status")
      .notNull()
      .default("unreviewed"),
    notes: text("notes"),
    mergedIntoId: uuid("merged_into_id"),
    metadata: jsonb("metadata").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("organizations_type_idx").on(t.organizationType),
    index("organizations_status_idx").on(t.status),
    index("organizations_domain_idx").on(t.websiteDomain),
    index("organizations_phone_idx").on(t.phoneNormalized),
    index("organizations_merged_into_idx").on(t.mergedIntoId),
  ]
);

export const organizationAliases = pgTable(
  "organization_aliases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    alias: text("alias").notNull(),
    aliasType: varchar("alias_type", { length: 64 }).notNull().default("alternate"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("organization_aliases_org_idx").on(t.organizationId),
    uniqueIndex("organization_aliases_unique").on(t.organizationId, t.alias, t.aliasType),
  ]
);

export const brands = pgTable(
  "brands",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    brandName: text("brand_name").notNull(),
    owningOrganizationId: uuid("owning_organization_id").references(
      () => organizations.id,
      { onDelete: "set null" }
    ),
    website: text("website"),
    description: text("description"),
    verificationStatus: verificationStatusEnum("verification_status")
      .notNull()
      .default("unreviewed"),
    metadata: jsonb("metadata").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("brands_owning_org_idx").on(t.owningOrganizationId)]
);

export const contacts = pgTable(
  "contacts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    firstName: text("first_name"),
    lastName: text("last_name"),
    fullName: text("full_name").notNull(),
    title: text("title"),
    email: text("email"),
    phone: text("phone"),
    contactType: varchar("contact_type", { length: 64 }).notNull().default("general"),
    verificationStatus: verificationStatusEnum("verification_status")
      .notNull()
      .default("unreviewed"),
    notes: text("notes"),
    metadata: jsonb("metadata").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("contacts_org_idx").on(t.organizationId), index("contacts_email_idx").on(t.email)]
);

export const locations = pgTable(
  "locations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    locationType: varchar("location_type", { length: 64 }).notNull().default("business"),
    addressLine1: text("address_line_1"),
    addressLine2: text("address_line_2"),
    city: text("city"),
    stateProvince: text("state_province"),
    postalCode: text("postal_code"),
    country: text("country").notNull().default("USA"),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    isPrimary: boolean("is_primary").notNull().default(false),
    metadata: jsonb("metadata").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("locations_org_idx").on(t.organizationId),
    index("locations_city_idx").on(t.city),
    index("locations_state_idx").on(t.stateProvince),
    index("locations_country_idx").on(t.country),
    index("locations_postal_idx").on(t.postalCode),
  ]
);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    parentCategoryId: uuid("parent_category_id"),
    description: text("description"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("categories_slug_unique").on(t.slug),
    index("categories_parent_idx").on(t.parentCategoryId),
  ]
);

export const organizationCategories = pgTable(
  "organization_categories",
  {
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    relationshipType: varchar("relationship_type", { length: 64 }),
    confidence: real("confidence"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.organizationId, t.categoryId] }),
    index("organization_categories_category_idx").on(t.categoryId),
  ]
);

export const organizationRelationships = pgTable(
  "organization_relationships",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fromOrganizationId: uuid("from_organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    relationshipType: varchar("relationship_type", { length: 64 }).notNull(),
    toOrganizationId: uuid("to_organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    notes: text("notes"),
    confidence: real("confidence"),
    metadata: jsonb("metadata").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("organization_relationships_from_idx").on(t.fromOrganizationId),
    index("organization_relationships_to_idx").on(t.toOrganizationId),
    uniqueIndex("organization_relationships_unique").on(
      t.fromOrganizationId,
      t.relationshipType,
      t.toOrganizationId
    ),
  ]
);

// ---------------------------------------------------------------------------
// Source provenance
// ---------------------------------------------------------------------------

export const sourceDocuments = pgTable("source_documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  edition: varchar("edition", { length: 32 }),
  publisher: text("publisher"),
  sourceType: varchar("source_type", { length: 64 }).notNull().default("print_directory"),
  filename: text("filename"),
  pageCount: integer("page_count"),
  importedAt: timestamp("imported_at", { withTimezone: true }),
  metadata: jsonb("metadata").notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const sourcePages = pgTable(
  "source_pages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceDocumentId: uuid("source_document_id")
      .notNull()
      .references(() => sourceDocuments.id, { onDelete: "cascade" }),
    physicalPageNumber: integer("physical_page_number").notNull(),
    printedPageNumber: varchar("printed_page_number", { length: 32 }),
    section: text("section"),
    subsection: text("subsection"),
    pageImageReference: text("page_image_reference"),
    rawExtractedText: text("raw_extracted_text"),
    metadata: jsonb("metadata").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("source_pages_document_idx").on(t.sourceDocumentId),
    uniqueIndex("source_pages_doc_page_unique").on(t.sourceDocumentId, t.physicalPageNumber),
  ]
);

export const sourceEvidence = pgTable(
  "source_evidence",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourcePageId: uuid("source_page_id")
      .notNull()
      .references(() => sourcePages.id, { onDelete: "cascade" }),
    entityType: varchar("entity_type", { length: 64 }).notNull(),
    entityId: uuid("entity_id").notNull(),
    evidenceText: text("evidence_text"),
    boundingBox: jsonb("bounding_box"),
    extractionConfidence: real("extraction_confidence"),
    verificationStatus: verificationStatusEnum("verification_status")
      .notNull()
      .default("unreviewed"),
    metadata: jsonb("metadata").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("source_evidence_page_idx").on(t.sourcePageId),
    index("source_evidence_entity_idx").on(t.entityType, t.entityId),
  ]
);

// ---------------------------------------------------------------------------
// Import / staging framework
// ---------------------------------------------------------------------------

export const importBatches = pgTable(
  "import_batches",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceDocumentId: uuid("source_document_id").references(() => sourceDocuments.id, {
      onDelete: "set null",
    }),
    label: text("label"),
    importerVersion: varchar("importer_version", { length: 64 }),
    importedAt: timestamp("imported_at", { withTimezone: true }).notNull().defaultNow(),
    recordCount: integer("record_count").notNull().default(0),
    successCount: integer("success_count").notNull().default(0),
    warningCount: integer("warning_count").notNull().default(0),
    failureCount: integer("failure_count").notNull().default(0),
    status: importBatchStatusEnum("status").notNull().default("pending"),
    metadata: jsonb("metadata").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("import_batches_document_idx").on(t.sourceDocumentId)]
);

export const stagingRecords = pgTable(
  "staging_records",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    importBatchId: uuid("import_batch_id")
      .notNull()
      .references(() => importBatches.id, { onDelete: "cascade" }),
    sourcePageId: uuid("source_page_id").references(() => sourcePages.id, {
      onDelete: "set null",
    }),
    proposedEntityType: varchar("proposed_entity_type", { length: 64 }).notNull(),
    rawPayload: jsonb("raw_payload").notNull(),
    normalizedPayload: jsonb("normalized_payload").notNull().default({}),
    extractionConfidence: real("extraction_confidence"),
    duplicateCandidates: jsonb("duplicate_candidates").notNull().default([]),
    reviewStatus: reviewStatusEnum("review_status").notNull().default("pending"),
    validationErrors: jsonb("validation_errors").notNull().default([]),
    resolvedEntityType: varchar("resolved_entity_type", { length: 64 }),
    resolvedEntityId: uuid("resolved_entity_id"),
    reviewedBy: text("reviewed_by"),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    reviewNotes: text("review_notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("staging_records_batch_idx").on(t.importBatchId),
    index("staging_records_status_idx").on(t.reviewStatus),
    index("staging_records_page_idx").on(t.sourcePageId),
  ]
);

// ---------------------------------------------------------------------------
// Embeddings (populated in a later phase — schema ready, no vectors generated)
// ---------------------------------------------------------------------------

export const entityEmbeddings = pgTable(
  "entity_embeddings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    entityType: varchar("entity_type", { length: 64 }).notNull(),
    entityId: uuid("entity_id").notNull(),
    contentHash: varchar("content_hash", { length: 64 }).notNull(),
    embeddingModel: varchar("embedding_model", { length: 128 }).notNull(),
    embedding: vector("embedding", { dimensions: 1536 }),
    sourceText: text("source_text"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("entity_embeddings_entity_model_unique").on(
      t.entityType,
      t.entityId,
      t.embeddingModel
    ),
  ]
);

// ---------------------------------------------------------------------------
// Relations (Drizzle query API)
// ---------------------------------------------------------------------------

export const organizationsRelations = relations(organizations, ({ one, many }) => ({
  type: one(organizationTypes, {
    fields: [organizations.organizationType],
    references: [organizationTypes.code],
  }),
  aliases: many(organizationAliases),
  brands: many(brands),
  contacts: many(contacts),
  locations: many(locations),
  organizationCategories: many(organizationCategories),
  relationshipsFrom: many(organizationRelationships, { relationName: "from" }),
  relationshipsTo: many(organizationRelationships, { relationName: "to" }),
  mergedInto: one(organizations, {
    fields: [organizations.mergedIntoId],
    references: [organizations.id],
    relationName: "merge",
  }),
}));

export const organizationAliasesRelations = relations(organizationAliases, ({ one }) => ({
  organization: one(organizations, {
    fields: [organizationAliases.organizationId],
    references: [organizations.id],
  }),
}));

export const brandsRelations = relations(brands, ({ one }) => ({
  owningOrganization: one(organizations, {
    fields: [brands.owningOrganizationId],
    references: [organizations.id],
  }),
}));

export const contactsRelations = relations(contacts, ({ one }) => ({
  organization: one(organizations, {
    fields: [contacts.organizationId],
    references: [organizations.id],
  }),
}));

export const locationsRelations = relations(locations, ({ one }) => ({
  organization: one(organizations, {
    fields: [locations.organizationId],
    references: [organizations.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentCategoryId],
    references: [categories.id],
    relationName: "parent_child",
  }),
  children: many(categories, { relationName: "parent_child" }),
  organizationCategories: many(organizationCategories),
}));

export const organizationCategoriesRelations = relations(
  organizationCategories,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationCategories.organizationId],
      references: [organizations.id],
    }),
    category: one(categories, {
      fields: [organizationCategories.categoryId],
      references: [categories.id],
    }),
  })
);

export const organizationRelationshipsRelations = relations(
  organizationRelationships,
  ({ one }) => ({
    fromOrganization: one(organizations, {
      fields: [organizationRelationships.fromOrganizationId],
      references: [organizations.id],
      relationName: "from",
    }),
    toOrganization: one(organizations, {
      fields: [organizationRelationships.toOrganizationId],
      references: [organizations.id],
      relationName: "to",
    }),
  })
);

export const sourceDocumentsRelations = relations(sourceDocuments, ({ many }) => ({
  pages: many(sourcePages),
  importBatches: many(importBatches),
}));

export const sourcePagesRelations = relations(sourcePages, ({ one, many }) => ({
  document: one(sourceDocuments, {
    fields: [sourcePages.sourceDocumentId],
    references: [sourceDocuments.id],
  }),
  evidence: many(sourceEvidence),
}));

export const sourceEvidenceRelations = relations(sourceEvidence, ({ one }) => ({
  page: one(sourcePages, {
    fields: [sourceEvidence.sourcePageId],
    references: [sourcePages.id],
  }),
}));

export const importBatchesRelations = relations(importBatches, ({ one, many }) => ({
  sourceDocument: one(sourceDocuments, {
    fields: [importBatches.sourceDocumentId],
    references: [sourceDocuments.id],
  }),
  stagingRecords: many(stagingRecords),
}));

export const stagingRecordsRelations = relations(stagingRecords, ({ one }) => ({
  batch: one(importBatches, {
    fields: [stagingRecords.importBatchId],
    references: [importBatches.id],
  }),
  sourcePage: one(sourcePages, {
    fields: [stagingRecords.sourcePageId],
    references: [sourcePages.id],
  }),
}));

// ---------------------------------------------------------------------------
// Convenience type exports
// ---------------------------------------------------------------------------

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type OrganizationAlias = typeof organizationAliases.$inferSelect;
export type Brand = typeof brands.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type Location = typeof locations.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type OrganizationRelationship = typeof organizationRelationships.$inferSelect;
export type SourceDocument = typeof sourceDocuments.$inferSelect;
export type SourcePage = typeof sourcePages.$inferSelect;
export type SourceEvidence = typeof sourceEvidence.$inferSelect;
export type ImportBatch = typeof importBatches.$inferSelect;
export type StagingRecord = typeof stagingRecords.$inferSelect;
export type EntityEmbedding = typeof entityEmbeddings.$inferSelect;
