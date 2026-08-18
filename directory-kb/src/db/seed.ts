/**
 * Development seed data.
 *
 * ALL RECORDS BELOW ARE SYNTHETIC — invented for UI development and testing.
 * They are NOT transcribed from the Wine Business Directory or any other
 * copyrighted publication. Every organization, contact, phone number, email
 * and address is fictional (names marked with "Demo"/"Sample" metadata).
 */
import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import * as schema from "./schema";
import { normalizeDomain, normalizePhone, slugify } from "../lib/normalize";
import { createImportBatch } from "../services/import-service";

const connectionString =
  process.env.DATABASE_URL ?? "postgresql://winekb:winekb@localhost:5432/wine_directory";

async function main() {
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client, { schema });

  console.log("Clearing existing data…");
  await db.execute(sql`
    TRUNCATE staging_records, import_batches, source_evidence, source_pages,
             source_documents, organization_relationships, organization_categories,
             organization_aliases, entity_embeddings, brands, contacts, locations,
             organizations, categories, organization_types
    RESTART IDENTITY CASCADE
  `);

  // -------------------------------------------------------------------------
  // Organization types (lookup table)
  // -------------------------------------------------------------------------
  console.log("Seeding organization types…");
  await db.insert(schema.organizationTypes).values([
    { code: "winery", label: "Winery", sortOrder: 1 },
    { code: "vendor", label: "Vendor", sortOrder: 2 },
    { code: "distributor", label: "Distributor", sortOrder: 3 },
    { code: "grower", label: "Grower", sortOrder: 4 },
    { code: "association", label: "Association", sortOrder: 5 },
    { code: "education", label: "Education", sortOrder: 6 },
    { code: "service_provider", label: "Service Provider", sortOrder: 7 },
    { code: "custom_crush", label: "Custom Crush", sortOrder: 8 },
    { code: "other", label: "Other", sortOrder: 99 },
  ]);

  // -------------------------------------------------------------------------
  // Category hierarchy (Buyer's Guide style)
  // -------------------------------------------------------------------------
  console.log("Seeding categories…");
  async function category(name: string, parentId: string | null, sortOrder = 0, description?: string) {
    const [row] = await db
      .insert(schema.categories)
      .values({ name, slug: slugify(name), parentCategoryId: parentId, sortOrder, description })
      .returning();
    return row;
  }

  const catVendors = await category("Winery Vendors", null, 1, "Suppliers of equipment and products to wineries.");
  const catEquipment = await category("Wine Equipment", catVendors.id, 1);
  const catHeatExchangers = await category(
    "Heat Exchangers & Cold Stabilization Equipment",
    catEquipment.id,
    1,
    "Plate-and-frame and tubular heat exchangers, glycol chillers, cold stabilization systems."
  );
  const catBottling = await category("Bottling & Packaging Equipment", catEquipment.id, 2);
  const catFiltration = await category("Filtration Equipment", catEquipment.id, 3);
  const catServices = await category("Winery Services", null, 2, "Service providers for wineries.");
  const catCustomCrush = await category("Custom Crush Wine Services", catServices.id, 1);
  const catLabServices = await category("Wine Lab & Analysis Services", catServices.id, 2);
  const catWineries = await category("Wineries & Growers", null, 3, "Producing wineries and vineyards.");
  const catCaWineries = await category("California Wineries", catWineries.id, 1);
  const catAssociations = await category("Industry Associations", null, 4);

  // -------------------------------------------------------------------------
  // Source document: the 2026 directory + a 2025 edition to prove multi-year
  // -------------------------------------------------------------------------
  console.log("Seeding source documents and pages…");
  const [doc2026] = await db
    .insert(schema.sourceDocuments)
    .values({
      title: "Wine Business Directory / Buyer's Guide",
      edition: "2026",
      publisher: "Wine Business Media (placeholder)",
      sourceType: "print_directory",
      filename: null,
      pageCount: 1180,
      importedAt: new Date("2026-08-01T00:00:00Z"),
      metadata: { note: "Physical directory awaiting professional scan. Seed pages are synthetic." },
    })
    .returning();

  const [doc2025] = await db
    .insert(schema.sourceDocuments)
    .values({
      title: "Wine Business Directory / Buyer's Guide",
      edition: "2025",
      publisher: "Wine Business Media (placeholder)",
      sourceType: "print_directory",
      pageCount: 1145,
      importedAt: new Date("2025-08-01T00:00:00Z"),
      metadata: { note: "Prior edition, demonstrates cross-edition provenance. Synthetic." },
    })
    .returning();

  async function page(
    docId: string,
    physical: number,
    printed: string,
    section: string,
    subsection: string | null,
    rawText: string | null
  ) {
    const [row] = await db
      .insert(schema.sourcePages)
      .values({
        sourceDocumentId: docId,
        physicalPageNumber: physical,
        printedPageNumber: printed,
        section,
        subsection,
        rawExtractedText: rawText,
        metadata: { synthetic: true },
      })
      .returning();
    return row;
  }

  const pWineries412 = await page(
    doc2026.id, 412, "W-38", "North American Wineries", "California — Riverside County",
    "[SYNTHETIC SAMPLE] Sierra Sol Cellars — Temecula, CA. Estate winery. Brands: Sierra Sol, Cielo Rojo, Luna de Oro. (555) 210-4477 · sierrasolcellars.example.com"
  );
  const pWineries413 = await page(
    doc2026.id, 413, "W-39", "North American Wineries", "California — Riverside County",
    "[SYNTHETIC SAMPLE] Rancho Bella Vista Winery — Temecula, CA. Tasting room open daily. (555) 210-8890"
  );
  const pVendors887 = await page(
    doc2026.id, 887, "BG-112", "Buyer's Guide", "Wine Equipment — Heat Exchangers",
    "[SYNTHETIC SAMPLE] Pacific Process Systems Inc — Sacramento, CA. Plate-and-frame heat exchangers, glycol chillers, cold stabilization. pacificprocess.example.com"
  );
  const pVendors912 = await page(
    doc2026.id, 912, "BG-137", "Buyer's Guide", "Winery Services — Custom Crush",
    "[SYNTHETIC SAMPLE] Coastal Crush Partners LLC — Paso Robles & Lodi, CA. Full-service custom crush, 5k–200k case programs."
  );
  const pAssoc1050 = await page(
    doc2026.id, 1050, "A-12", "Associations", null,
    "[SYNTHETIC SAMPLE] Temecula Valley Winegrowers Association — Temecula, CA."
  );
  const pOld398 = await page(
    doc2025.id, 398, "W-36", "North American Wineries", "California — Riverside County",
    "[SYNTHETIC SAMPLE — 2025 edition] Sierra Sol Cellars — Temecula, CA. Brands: Sierra Sol, Cielo Rojo."
  );

  // -------------------------------------------------------------------------
  // Organizations
  // -------------------------------------------------------------------------
  console.log("Seeding organizations…");

  async function org(v: {
    name: string;
    type: string;
    description?: string;
    website?: string;
    phone?: string;
    email?: string;
    verification?: "unreviewed" | "auto_verified" | "human_verified";
    notes?: string;
  }) {
    const [row] = await db
      .insert(schema.organizations)
      .values({
        canonicalName: v.name,
        organizationType: v.type,
        description: v.description,
        website: v.website,
        websiteDomain: normalizeDomain(v.website),
        mainPhone: v.phone,
        phoneNormalized: normalizePhone(v.phone),
        email: v.email,
        verificationStatus: v.verification ?? "unreviewed",
        notes: v.notes,
        metadata: { synthetic: true },
      })
      .returning();
    return row;
  }

  // 1. Winery with multiple brands, multiple contacts
  const sierraSol = await org({
    name: "Sierra Sol Cellars",
    type: "winery",
    description:
      "Synthetic demo record: estate winery in the Temecula Valley producing small-lot reds and whites under three labels.",
    website: "https://www.sierrasolcellars.example.com",
    phone: "(555) 210-4477",
    email: "info@sierrasolcellars.example.com",
    verification: "human_verified",
    notes: "Flagship demo record. Appears in both 2025 and 2026 editions.",
  });
  await db.insert(schema.organizationAliases).values([
    { organizationId: sierraSol.id, alias: "Sierra Sol Cellars LLC", aliasType: "legal_name" },
    { organizationId: sierraSol.id, alias: "Sierra Sol", aliasType: "abbreviation" },
  ]);

  // 2. Vendor in several categories, multiple locations
  const pacificProcess = await org({
    name: "Pacific Process Systems Inc",
    type: "vendor",
    description:
      "Synthetic demo record: manufacturer of plate-and-frame heat exchangers, glycol chilling systems and cold stabilization equipment for wineries; also supplies inline filtration skids.",
    website: "https://pacificprocess.example.com",
    phone: "(555) 640-2211",
    email: "sales@pacificprocess.example.com",
    verification: "human_verified",
  });
  await db.insert(schema.organizationAliases).values([
    { organizationId: pacificProcess.id, alias: "Pacific Process", aliasType: "abbreviation" },
  ]);

  // 3. Custom crush provider (company with multiple locations)
  const coastalCrush = await org({
    name: "Coastal Crush Partners LLC",
    type: "custom_crush",
    description:
      "Synthetic demo record: full-service custom crush facilities in Paso Robles and Lodi, from 5,000 to 200,000 case programs.",
    website: "https://coastalcrush.example.com",
    phone: "(555) 774-9080",
    verification: "auto_verified",
  });

  // 4. Association
  const tvwa = await org({
    name: "Temecula Valley Winegrowers Association",
    type: "association",
    description:
      "Synthetic demo record: regional association of wineries and growers in the Temecula Valley AVA.",
    website: "https://temeculawinegrowers.example.org",
    verification: "auto_verified",
  });

  // 5. Distributor related to the winery
  const goldenState = await org({
    name: "Golden State Wine Distributors",
    type: "distributor",
    description: "Synthetic demo record: California-focused fine wine distributor.",
    website: "https://gswdist.example.com",
    phone: "(555) 318-6600",
    verification: "unreviewed",
  });

  // 6. Second winery (duplicate-pair target seed data references)
  const ranchoBella = await org({
    name: "Rancho Bella Vista Winery",
    type: "winery",
    description: "Synthetic demo record: family winery with daily tastings in Temecula.",
    website: "https://ranchobellavista.example.com",
    phone: "(555) 210-8890",
    verification: "auto_verified",
  });

  // 7. Deliberate potential duplicate of Rancho Bella Vista (OCR-style variant)
  const ranchoBellaDupe = await org({
    name: "Rancho Bella Vista Winery & Vineyards",
    type: "winery",
    description:
      "Synthetic demo record: likely duplicate of Rancho Bella Vista Winery (OCR variant with different suffix). Left unmerged to demonstrate duplicate review.",
    phone: "555-210-8890",
    verification: "unreviewed",
    notes: "Potential duplicate — needs human review. Do not auto-merge.",
  });

  // -------------------------------------------------------------------------
  // Locations
  // -------------------------------------------------------------------------
  console.log("Seeding locations…");
  await db.insert(schema.locations).values([
    {
      organizationId: sierraSol.id,
      locationType: "winery",
      addressLine1: "41200 Vino Camino Rd",
      city: "Temecula",
      stateProvince: "CA",
      postalCode: "92591",
      country: "USA",
      isPrimary: true,
      metadata: { synthetic: true },
    },
    {
      organizationId: pacificProcess.id,
      locationType: "headquarters",
      addressLine1: "2200 Industrial Blvd",
      city: "Sacramento",
      stateProvince: "CA",
      postalCode: "95814",
      country: "USA",
      isPrimary: true,
      metadata: { synthetic: true },
    },
    {
      organizationId: pacificProcess.id,
      locationType: "warehouse",
      addressLine1: "88 Depot St",
      city: "Portland",
      stateProvince: "OR",
      postalCode: "97201",
      country: "USA",
      isPrimary: false,
      metadata: { synthetic: true },
    },
    {
      organizationId: coastalCrush.id,
      locationType: "facility",
      addressLine1: "3455 Crush Way",
      city: "Paso Robles",
      stateProvince: "CA",
      postalCode: "93446",
      country: "USA",
      isPrimary: true,
      metadata: { synthetic: true },
    },
    {
      organizationId: coastalCrush.id,
      locationType: "facility",
      addressLine1: "901 Vintners Loop",
      city: "Lodi",
      stateProvince: "CA",
      postalCode: "95240",
      country: "USA",
      isPrimary: false,
      metadata: { synthetic: true },
    },
    {
      organizationId: tvwa.id,
      locationType: "office",
      addressLine1: "28690 Mercedes St",
      city: "Temecula",
      stateProvince: "CA",
      postalCode: "92590",
      country: "USA",
      isPrimary: true,
      metadata: { synthetic: true },
    },
    {
      organizationId: goldenState.id,
      locationType: "headquarters",
      addressLine1: "550 Harbor Dr",
      city: "Oakland",
      stateProvince: "CA",
      postalCode: "94607",
      country: "USA",
      isPrimary: true,
      metadata: { synthetic: true },
    },
    {
      organizationId: ranchoBella.id,
      locationType: "winery",
      addressLine1: "39000 Rancho California Rd",
      city: "Temecula",
      stateProvince: "CA",
      postalCode: "92591",
      country: "USA",
      isPrimary: true,
      metadata: { synthetic: true },
    },
    {
      organizationId: ranchoBellaDupe.id,
      locationType: "winery",
      addressLine1: "39000 Rancho California Road",
      city: "Temecula",
      stateProvince: "CA",
      postalCode: "92591",
      country: "USA",
      isPrimary: true,
      metadata: { synthetic: true },
    },
  ]);

  // -------------------------------------------------------------------------
  // Brands (winery with multiple brands + one unassigned brand)
  // -------------------------------------------------------------------------
  console.log("Seeding brands…");
  const [brandSierraSol] = await db
    .insert(schema.brands)
    .values({
      brandName: "Sierra Sol",
      owningOrganizationId: sierraSol.id,
      description: "Synthetic demo: flagship estate label.",
      verificationStatus: "human_verified",
      metadata: { synthetic: true },
    })
    .returning();
  const [brandCielo] = await db
    .insert(schema.brands)
    .values({
      brandName: "Cielo Rojo",
      owningOrganizationId: sierraSol.id,
      description: "Synthetic demo: Rhône-style red blend program.",
      verificationStatus: "auto_verified",
      metadata: { synthetic: true },
    })
    .returning();
  await db.insert(schema.brands).values([
    {
      brandName: "Luna de Oro",
      owningOrganizationId: sierraSol.id,
      description: "Synthetic demo: dessert wine label.",
      verificationStatus: "unreviewed",
      metadata: { synthetic: true },
    },
    {
      brandName: "Vista Cellars",
      owningOrganizationId: null,
      description:
        "Synthetic demo: brand seen in a listing whose owning organization has not been confidently identified yet.",
      verificationStatus: "unreviewed",
      metadata: { synthetic: true },
    },
  ]);

  // -------------------------------------------------------------------------
  // Contacts
  // -------------------------------------------------------------------------
  console.log("Seeding contacts…");
  await db.insert(schema.contacts).values([
    {
      organizationId: sierraSol.id,
      firstName: "Maria",
      lastName: "Delgado",
      fullName: "Maria Delgado",
      title: "Winemaker",
      email: "maria@sierrasolcellars.example.com",
      phone: "(555) 210-4478",
      contactType: "winemaking",
      verificationStatus: "human_verified",
      metadata: { synthetic: true },
    },
    {
      organizationId: sierraSol.id,
      firstName: "James",
      lastName: "Okafor",
      fullName: "James Okafor",
      title: "General Manager",
      email: "james@sierrasolcellars.example.com",
      contactType: "management",
      verificationStatus: "auto_verified",
      metadata: { synthetic: true },
    },
    {
      organizationId: sierraSol.id,
      firstName: "Priya",
      lastName: "Nair",
      fullName: "Priya Nair",
      title: "DTC & Wine Club Manager",
      email: "priya@sierrasolcellars.example.com",
      contactType: "sales",
      verificationStatus: "unreviewed",
      metadata: { synthetic: true },
    },
    {
      organizationId: pacificProcess.id,
      firstName: "Tom",
      lastName: "Reyes",
      fullName: "Tom Reyes",
      title: "West Coast Sales Engineer",
      email: "treyes@pacificprocess.example.com",
      phone: "(555) 640-2299",
      contactType: "sales",
      verificationStatus: "auto_verified",
      metadata: { synthetic: true },
    },
    {
      organizationId: coastalCrush.id,
      firstName: "Elena",
      lastName: "Fontaine",
      fullName: "Elena Fontaine",
      title: "Client Programs Director",
      email: "elena@coastalcrush.example.com",
      contactType: "operations",
      verificationStatus: "unreviewed",
      metadata: { synthetic: true },
    },
  ]);

  // -------------------------------------------------------------------------
  // Category assignments
  // -------------------------------------------------------------------------
  console.log("Seeding category assignments…");
  await db.insert(schema.organizationCategories).values([
    { organizationId: pacificProcess.id, categoryId: catHeatExchangers.id, relationshipType: "listed_under", confidence: 0.98 },
    { organizationId: pacificProcess.id, categoryId: catFiltration.id, relationshipType: "listed_under", confidence: 0.91 },
    { organizationId: pacificProcess.id, categoryId: catBottling.id, relationshipType: "cross_reference", confidence: 0.62 },
    { organizationId: coastalCrush.id, categoryId: catCustomCrush.id, relationshipType: "listed_under", confidence: 0.99 },
    { organizationId: coastalCrush.id, categoryId: catLabServices.id, relationshipType: "cross_reference", confidence: 0.55 },
    { organizationId: sierraSol.id, categoryId: catCaWineries.id, relationshipType: "listed_under", confidence: 1.0 },
    { organizationId: ranchoBella.id, categoryId: catCaWineries.id, relationshipType: "listed_under", confidence: 0.97 },
    { organizationId: ranchoBellaDupe.id, categoryId: catCaWineries.id, relationshipType: "listed_under", confidence: 0.44 },
    { organizationId: tvwa.id, categoryId: catAssociations.id, relationshipType: "listed_under", confidence: 1.0 },
  ]);

  // -------------------------------------------------------------------------
  // Relationships
  // -------------------------------------------------------------------------
  console.log("Seeding relationships…");
  await db.insert(schema.organizationRelationships).values([
    {
      fromOrganizationId: goldenState.id,
      relationshipType: "distributes_for",
      toOrganizationId: sierraSol.id,
      notes: "Synthetic demo: statewide distribution agreement.",
      confidence: 0.9,
      metadata: { synthetic: true },
    },
    {
      fromOrganizationId: sierraSol.id,
      relationshipType: "member_of",
      toOrganizationId: tvwa.id,
      confidence: 1.0,
      metadata: { synthetic: true },
    },
    {
      fromOrganizationId: ranchoBella.id,
      relationshipType: "member_of",
      toOrganizationId: tvwa.id,
      confidence: 0.85,
      metadata: { synthetic: true },
    },
    {
      fromOrganizationId: coastalCrush.id,
      relationshipType: "custom_crush_for",
      toOrganizationId: sierraSol.id,
      notes: "Synthetic demo: overflow production for the Cielo Rojo label.",
      confidence: 0.7,
      metadata: { synthetic: true },
    },
    {
      fromOrganizationId: pacificProcess.id,
      relationshipType: "supplier_to",
      toOrganizationId: coastalCrush.id,
      notes: "Synthetic demo: installed glycol and cold stab systems at Paso Robles facility.",
      confidence: 0.75,
      metadata: { synthetic: true },
    },
  ]);

  // -------------------------------------------------------------------------
  // Source evidence (multiple pages, cross-edition for Sierra Sol)
  // -------------------------------------------------------------------------
  console.log("Seeding source evidence…");
  await db.insert(schema.sourceEvidence).values([
    {
      sourcePageId: pWineries412.id,
      entityType: "organization",
      entityId: sierraSol.id,
      evidenceText:
        "[SYNTHETIC] Sierra Sol Cellars — Temecula, CA. Estate winery. Brands: Sierra Sol, Cielo Rojo, Luna de Oro.",
      boundingBox: { x: 120, y: 340, width: 460, height: 96, page_dpi: 300 },
      extractionConfidence: 0.97,
      verificationStatus: "human_verified",
    },
    {
      sourcePageId: pOld398.id,
      entityType: "organization",
      entityId: sierraSol.id,
      evidenceText: "[SYNTHETIC — 2025 edition] Sierra Sol Cellars — Temecula, CA.",
      extractionConfidence: 0.94,
      verificationStatus: "human_verified",
      metadata: { note: "Same canonical org, prior edition — provenance is edition-specific." },
    },
    {
      sourcePageId: pWineries412.id,
      entityType: "brand",
      entityId: brandSierraSol.id,
      evidenceText: "[SYNTHETIC] Brands: Sierra Sol …",
      extractionConfidence: 0.92,
      verificationStatus: "auto_verified",
    },
    {
      sourcePageId: pWineries412.id,
      entityType: "brand",
      entityId: brandCielo.id,
      evidenceText: "[SYNTHETIC] Brands: … Cielo Rojo …",
      extractionConfidence: 0.88,
      verificationStatus: "unreviewed",
    },
    {
      sourcePageId: pVendors887.id,
      entityType: "organization",
      entityId: pacificProcess.id,
      evidenceText:
        "[SYNTHETIC] Pacific Process Systems Inc — plate-and-frame heat exchangers, glycol chillers, cold stabilization.",
      boundingBox: { x: 96, y: 512, width: 470, height: 84, page_dpi: 300 },
      extractionConfidence: 0.95,
      verificationStatus: "human_verified",
    },
    {
      sourcePageId: pVendors912.id,
      entityType: "organization",
      entityId: coastalCrush.id,
      evidenceText:
        "[SYNTHETIC] Coastal Crush Partners LLC — Paso Robles & Lodi, CA. Full-service custom crush.",
      extractionConfidence: 0.9,
      verificationStatus: "auto_verified",
    },
    {
      sourcePageId: pAssoc1050.id,
      entityType: "organization",
      entityId: tvwa.id,
      evidenceText: "[SYNTHETIC] Temecula Valley Winegrowers Association — Temecula, CA.",
      extractionConfidence: 0.96,
      verificationStatus: "auto_verified",
    },
    {
      sourcePageId: pWineries413.id,
      entityType: "organization",
      entityId: ranchoBella.id,
      evidenceText: "[SYNTHETIC] Rancho Bella Vista Winery — Temecula, CA. Tasting room open daily.",
      extractionConfidence: 0.93,
      verificationStatus: "auto_verified",
    },
    {
      sourcePageId: pWineries413.id,
      entityType: "organization",
      entityId: ranchoBellaDupe.id,
      evidenceText:
        "[SYNTHETIC] Rancho Bella Vista Winery & Vineyards (low-quality OCR region — same listing?)",
      extractionConfidence: 0.41,
      verificationStatus: "unreviewed",
    },
  ]);

  // -------------------------------------------------------------------------
  // Import batch with staged records awaiting review (exercises the queue)
  // -------------------------------------------------------------------------
  console.log("Seeding import batch + staging records…");
  await createImportBatch({
    source_document_id: doc2026.id,
    label: "Demo extraction — Buyer's Guide sample pages",
    importer_version: "seed-demo-0.1.0",
    records: [
      {
        proposed_entity_type: "organization",
        source_page_number: 887,
        extraction_confidence: 0.87,
        payload: {
          name: "Vintners Filtration Supply Co",
          organization_type: "vendor",
          description:
            "[SYNTHETIC] Crossflow and lenticular filtration systems for small and mid-size wineries.",
          website: "https://vintnersfiltration.example.com",
          phone: "(555) 402-7788",
          email: null,
          aliases: ["VFS Co"],
          brands: [],
          categories: ["Filtration Equipment"],
          locations: [
            {
              location_type: "headquarters",
              address_line_1: "77 Cellar Row",
              address_line_2: null,
              city: "Napa",
              state_province: "CA",
              postal_code: "94558",
              country: "USA",
              is_primary: true,
            },
          ],
          contacts: [
            {
              first_name: "Dana",
              last_name: "Whitfield",
              full_name: "Dana Whitfield",
              title: "Owner",
              email: "dana@vintnersfiltration.example.com",
              phone: null,
              contact_type: "management",
            },
          ],
          evidence_text:
            "[SYNTHETIC] Vintners Filtration Supply Co — Napa, CA. Crossflow & lenticular filtration.",
          bounding_box: { x: 100, y: 220, width: 440, height: 70 },
        },
      },
      {
        // Deliberate near-duplicate of the existing Rancho Bella Vista Winery
        proposed_entity_type: "organization",
        source_page_number: 413,
        extraction_confidence: 0.58,
        payload: {
          name: "Rancho Bela Vista Wnery",
          organization_type: "winery",
          description: "[SYNTHETIC] OCR-degraded listing — likely duplicate of an existing record.",
          website: null,
          phone: "(555) 210-8890",
          email: null,
          aliases: [],
          brands: [],
          categories: ["California Wineries"],
          locations: [
            {
              location_type: "winery",
              address_line_1: "39000 Rancho California Rd",
              address_line_2: null,
              city: "Temecula",
              state_province: "CA",
              postal_code: "92591",
              country: "USA",
              is_primary: true,
            },
          ],
          contacts: [],
          evidence_text: "[SYNTHETIC] Rancho Bela Vista Wnery — Temecula CA (OCR noise)",
          bounding_box: null,
        },
      },
      {
        // Record with a validation problem (missing name) to exercise error path
        proposed_entity_type: "organization",
        source_page_number: 912,
        extraction_confidence: 0.31,
        payload: {
          name: "",
          organization_type: "other",
          description: "[SYNTHETIC] Extraction fragment with no usable name.",
          website: null,
          phone: null,
          email: null,
          aliases: [],
          brands: [],
          categories: [],
          locations: [],
          contacts: [],
          evidence_text: "[SYNTHETIC] …ine services since 19…",
          bounding_box: null,
        },
      },
    ],
  });

  console.log("Seed complete.");
  await client.end();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
