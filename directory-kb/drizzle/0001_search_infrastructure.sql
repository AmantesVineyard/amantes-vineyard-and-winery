-- Extensions required for fuzzy + semantic search.
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS vector;
--> statement-breakpoint

-- Full-text search vectors (stored generated columns so they stay in sync
-- without triggers and can be indexed with GIN).
ALTER TABLE organizations ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(canonical_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(website, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(notes, '')), 'D')
  ) STORED;
--> statement-breakpoint
CREATE INDEX organizations_search_vector_idx ON organizations USING gin (search_vector);
--> statement-breakpoint

ALTER TABLE brands ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(brand_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C')
  ) STORED;
--> statement-breakpoint
CREATE INDEX brands_search_vector_idx ON brands USING gin (search_vector);
--> statement-breakpoint

ALTER TABLE contacts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(full_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(title, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(email, '')), 'B')
  ) STORED;
--> statement-breakpoint
CREATE INDEX contacts_search_vector_idx ON contacts USING gin (search_vector);
--> statement-breakpoint

ALTER TABLE categories ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C')
  ) STORED;
--> statement-breakpoint
CREATE INDEX categories_search_vector_idx ON categories USING gin (search_vector);
--> statement-breakpoint

-- Trigram indexes for fuzzy name matching / duplicate detection.
CREATE INDEX organizations_name_trgm_idx ON organizations USING gin (canonical_name gin_trgm_ops);
--> statement-breakpoint
CREATE INDEX organization_aliases_alias_trgm_idx ON organization_aliases USING gin (alias gin_trgm_ops);
--> statement-breakpoint
CREATE INDEX brands_name_trgm_idx ON brands USING gin (brand_name gin_trgm_ops);
--> statement-breakpoint
CREATE INDEX contacts_name_trgm_idx ON contacts USING gin (full_name gin_trgm_ops);
--> statement-breakpoint
CREATE INDEX locations_city_trgm_idx ON locations USING gin (city gin_trgm_ops);
--> statement-breakpoint

-- ANN index for future semantic search. Embeddings are not generated yet;
-- an empty HNSW index is cheap and ready for Phase 2.
CREATE INDEX entity_embeddings_hnsw_idx ON entity_embeddings
  USING hnsw (embedding vector_cosine_ops);
