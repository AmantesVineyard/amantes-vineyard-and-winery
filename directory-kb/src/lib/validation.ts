import { z } from "zod";

export const verificationStatusSchema = z.enum([
  "unreviewed",
  "auto_verified",
  "human_verified",
  "rejected",
]);

export const organizationFiltersSchema = z.object({
  q: z.string().trim().max(200).optional(),
  type: z.string().max(64).optional(),
  state: z.string().max(64).optional(),
  country: z.string().max(64).optional(),
  city: z.string().max(128).optional(),
  categoryId: z.string().uuid().optional(),
  brandId: z.string().uuid().optional(),
  verificationStatus: verificationStatusSchema.optional(),
  sort: z
    .enum(["name", "type", "city", "state", "updated", "relevance"])
    .default("name"),
  order: z.enum(["asc", "desc"]).default("asc"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(200).default(50),
});
export type OrganizationFilters = z.infer<typeof organizationFiltersSchema>;

export const globalSearchSchema = z.object({
  q: z.string().trim().min(1).max(200),
  limit: z.coerce.number().int().min(1).max(50).default(8),
});

// ---------------------------------------------------------------------------
// Staging / import payloads — the contract a future extraction pipeline
// produces. Deliberately vendor-neutral JSON.
// ---------------------------------------------------------------------------

export const stagingLocationSchema = z.object({
  location_type: z.string().default("business"),
  address_line_1: z.string().nullish(),
  address_line_2: z.string().nullish(),
  city: z.string().nullish(),
  state_province: z.string().nullish(),
  postal_code: z.string().nullish(),
  country: z.string().default("USA"),
  is_primary: z.boolean().default(false),
});

export const stagingContactSchema = z.object({
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  full_name: z.string().min(1),
  title: z.string().nullish(),
  email: z.string().nullish(),
  phone: z.string().nullish(),
  contact_type: z.string().default("general"),
});

export const stagingOrganizationSchema = z.object({
  name: z.string().min(1),
  organization_type: z.string().default("other"),
  description: z.string().nullish(),
  website: z.string().nullish(),
  phone: z.string().nullish(),
  email: z.string().nullish(),
  aliases: z.array(z.string()).default([]),
  brands: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  locations: z.array(stagingLocationSchema).default([]),
  contacts: z.array(stagingContactSchema).default([]),
  evidence_text: z.string().nullish(),
  bounding_box: z.record(z.string(), z.unknown()).nullish(),
});
export type StagingOrganizationPayload = z.infer<typeof stagingOrganizationSchema>;

export const stagingRecordInputSchema = z.object({
  proposed_entity_type: z.literal("organization").default("organization"),
  source_page_number: z.number().int().positive().nullish(),
  extraction_confidence: z.number().min(0).max(1).nullish(),
  // Deliberately loose at batch level: a malformed payload must not reject the
  // whole batch — it lands in staging carrying its validation errors instead.
  payload: z.record(z.string(), z.unknown()),
});

export const importBatchInputSchema = z.object({
  source_document_id: z.string().uuid().nullish(),
  label: z.string().nullish(),
  importer_version: z.string().default("manual"),
  records: z.array(stagingRecordInputSchema).min(1),
});
export type ImportBatchInput = z.infer<typeof importBatchInputSchema>;

// ---------------------------------------------------------------------------
// Review actions
// ---------------------------------------------------------------------------

export const reviewActionSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("approve"),
    reviewed_by: z.string().default("reviewer"),
    notes: z.string().nullish(),
  }),
  z.object({
    action: z.literal("edit_approve"),
    reviewed_by: z.string().default("reviewer"),
    notes: z.string().nullish(),
    payload: stagingOrganizationSchema,
  }),
  z.object({
    action: z.literal("link"),
    reviewed_by: z.string().default("reviewer"),
    notes: z.string().nullish(),
    organization_id: z.string().uuid(),
  }),
  z.object({
    action: z.literal("merge"),
    reviewed_by: z.string().default("reviewer"),
    notes: z.string().nullish(),
    organization_id: z.string().uuid(),
    confirm: z.literal(true),
  }),
  z.object({
    action: z.literal("reject"),
    reviewed_by: z.string().default("reviewer"),
    notes: z.string().nullish(),
  }),
]);
export type ReviewAction = z.infer<typeof reviewActionSchema>;

export const mergeOrganizationsSchema = z.object({
  winner_id: z.string().uuid(),
  loser_id: z.string().uuid(),
  confirm: z.literal(true),
  merged_by: z.string().default("reviewer"),
});
