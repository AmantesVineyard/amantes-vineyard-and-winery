CREATE TYPE "public"."import_batch_status" AS ENUM('pending', 'processing', 'completed', 'completed_with_warnings', 'failed');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('pending', 'approved', 'edited_approved', 'linked', 'merged', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('unreviewed', 'auto_verified', 'human_verified', 'rejected');--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand_name" text NOT NULL,
	"owning_organization_id" uuid,
	"website" text,
	"description" text,
	"verification_status" "verification_status" DEFAULT 'unreviewed' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"parent_category_id" uuid,
	"description" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"first_name" text,
	"last_name" text,
	"full_name" text NOT NULL,
	"title" text,
	"email" text,
	"phone" text,
	"contact_type" varchar(64) DEFAULT 'general' NOT NULL,
	"verification_status" "verification_status" DEFAULT 'unreviewed' NOT NULL,
	"notes" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "entity_embeddings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" varchar(64) NOT NULL,
	"entity_id" uuid NOT NULL,
	"content_hash" varchar(64) NOT NULL,
	"embedding_model" varchar(128) NOT NULL,
	"embedding" vector(1536),
	"source_text" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "import_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_document_id" uuid,
	"label" text,
	"importer_version" varchar(64),
	"imported_at" timestamp with time zone DEFAULT now() NOT NULL,
	"record_count" integer DEFAULT 0 NOT NULL,
	"success_count" integer DEFAULT 0 NOT NULL,
	"warning_count" integer DEFAULT 0 NOT NULL,
	"failure_count" integer DEFAULT 0 NOT NULL,
	"status" "import_batch_status" DEFAULT 'pending' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"location_type" varchar(64) DEFAULT 'business' NOT NULL,
	"address_line_1" text,
	"address_line_2" text,
	"city" text,
	"state_province" text,
	"postal_code" text,
	"country" text DEFAULT 'USA' NOT NULL,
	"latitude" double precision,
	"longitude" double precision,
	"is_primary" boolean DEFAULT false NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_aliases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"alias" text NOT NULL,
	"alias_type" varchar(64) DEFAULT 'alternate' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_categories" (
	"organization_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"relationship_type" varchar(64),
	"confidence" real,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "organization_categories_organization_id_category_id_pk" PRIMARY KEY("organization_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "organization_relationships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_organization_id" uuid NOT NULL,
	"relationship_type" varchar(64) NOT NULL,
	"to_organization_id" uuid NOT NULL,
	"notes" text,
	"confidence" real,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_types" (
	"code" varchar(64) PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"description" text,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"canonical_name" text NOT NULL,
	"organization_type" varchar(64) NOT NULL,
	"description" text,
	"website" text,
	"website_domain" text,
	"main_phone" text,
	"phone_normalized" text,
	"email" text,
	"status" varchar(32) DEFAULT 'active' NOT NULL,
	"verification_status" "verification_status" DEFAULT 'unreviewed' NOT NULL,
	"notes" text,
	"merged_into_id" uuid,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "source_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"edition" varchar(32),
	"publisher" text,
	"source_type" varchar(64) DEFAULT 'print_directory' NOT NULL,
	"filename" text,
	"page_count" integer,
	"imported_at" timestamp with time zone,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "source_evidence" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_page_id" uuid NOT NULL,
	"entity_type" varchar(64) NOT NULL,
	"entity_id" uuid NOT NULL,
	"evidence_text" text,
	"bounding_box" jsonb,
	"extraction_confidence" real,
	"verification_status" "verification_status" DEFAULT 'unreviewed' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "source_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_document_id" uuid NOT NULL,
	"physical_page_number" integer NOT NULL,
	"printed_page_number" varchar(32),
	"section" text,
	"subsection" text,
	"page_image_reference" text,
	"raw_extracted_text" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "staging_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"import_batch_id" uuid NOT NULL,
	"source_page_id" uuid,
	"proposed_entity_type" varchar(64) NOT NULL,
	"raw_payload" jsonb NOT NULL,
	"normalized_payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"extraction_confidence" real,
	"duplicate_candidates" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"review_status" "review_status" DEFAULT 'pending' NOT NULL,
	"validation_errors" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"resolved_entity_type" varchar(64),
	"resolved_entity_id" uuid,
	"reviewed_by" text,
	"reviewed_at" timestamp with time zone,
	"review_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "brands" ADD CONSTRAINT "brands_owning_organization_id_organizations_id_fk" FOREIGN KEY ("owning_organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_batches" ADD CONSTRAINT "import_batches_source_document_id_source_documents_id_fk" FOREIGN KEY ("source_document_id") REFERENCES "public"."source_documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_aliases" ADD CONSTRAINT "organization_aliases_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_categories" ADD CONSTRAINT "organization_categories_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_categories" ADD CONSTRAINT "organization_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_relationships" ADD CONSTRAINT "organization_relationships_from_organization_id_organizations_id_fk" FOREIGN KEY ("from_organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_relationships" ADD CONSTRAINT "organization_relationships_to_organization_id_organizations_id_fk" FOREIGN KEY ("to_organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_organization_type_organization_types_code_fk" FOREIGN KEY ("organization_type") REFERENCES "public"."organization_types"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_evidence" ADD CONSTRAINT "source_evidence_source_page_id_source_pages_id_fk" FOREIGN KEY ("source_page_id") REFERENCES "public"."source_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_pages" ADD CONSTRAINT "source_pages_source_document_id_source_documents_id_fk" FOREIGN KEY ("source_document_id") REFERENCES "public"."source_documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staging_records" ADD CONSTRAINT "staging_records_import_batch_id_import_batches_id_fk" FOREIGN KEY ("import_batch_id") REFERENCES "public"."import_batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staging_records" ADD CONSTRAINT "staging_records_source_page_id_source_pages_id_fk" FOREIGN KEY ("source_page_id") REFERENCES "public"."source_pages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "brands_owning_org_idx" ON "brands" USING btree ("owning_organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_unique" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_category_id");--> statement-breakpoint
CREATE INDEX "contacts_org_idx" ON "contacts" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "contacts_email_idx" ON "contacts" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "entity_embeddings_entity_model_unique" ON "entity_embeddings" USING btree ("entity_type","entity_id","embedding_model");--> statement-breakpoint
CREATE INDEX "import_batches_document_idx" ON "import_batches" USING btree ("source_document_id");--> statement-breakpoint
CREATE INDEX "locations_org_idx" ON "locations" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "locations_city_idx" ON "locations" USING btree ("city");--> statement-breakpoint
CREATE INDEX "locations_state_idx" ON "locations" USING btree ("state_province");--> statement-breakpoint
CREATE INDEX "locations_country_idx" ON "locations" USING btree ("country");--> statement-breakpoint
CREATE INDEX "locations_postal_idx" ON "locations" USING btree ("postal_code");--> statement-breakpoint
CREATE INDEX "organization_aliases_org_idx" ON "organization_aliases" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "organization_aliases_unique" ON "organization_aliases" USING btree ("organization_id","alias","alias_type");--> statement-breakpoint
CREATE INDEX "organization_categories_category_idx" ON "organization_categories" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "organization_relationships_from_idx" ON "organization_relationships" USING btree ("from_organization_id");--> statement-breakpoint
CREATE INDEX "organization_relationships_to_idx" ON "organization_relationships" USING btree ("to_organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "organization_relationships_unique" ON "organization_relationships" USING btree ("from_organization_id","relationship_type","to_organization_id");--> statement-breakpoint
CREATE INDEX "organizations_type_idx" ON "organizations" USING btree ("organization_type");--> statement-breakpoint
CREATE INDEX "organizations_status_idx" ON "organizations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "organizations_domain_idx" ON "organizations" USING btree ("website_domain");--> statement-breakpoint
CREATE INDEX "organizations_phone_idx" ON "organizations" USING btree ("phone_normalized");--> statement-breakpoint
CREATE INDEX "organizations_merged_into_idx" ON "organizations" USING btree ("merged_into_id");--> statement-breakpoint
CREATE INDEX "source_evidence_page_idx" ON "source_evidence" USING btree ("source_page_id");--> statement-breakpoint
CREATE INDEX "source_evidence_entity_idx" ON "source_evidence" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "source_pages_document_idx" ON "source_pages" USING btree ("source_document_id");--> statement-breakpoint
CREATE UNIQUE INDEX "source_pages_doc_page_unique" ON "source_pages" USING btree ("source_document_id","physical_page_number");--> statement-breakpoint
CREATE INDEX "staging_records_batch_idx" ON "staging_records" USING btree ("import_batch_id");--> statement-breakpoint
CREATE INDEX "staging_records_status_idx" ON "staging_records" USING btree ("review_status");--> statement-breakpoint
CREATE INDEX "staging_records_page_idx" ON "staging_records" USING btree ("source_page_id");