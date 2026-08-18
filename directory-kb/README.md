# Wine Directory Knowledge Base

Internal knowledge base for the **Wine Business Directory / Buyer's Guide** —
a normalized, provenance-tracked relational database of wineries, vendors,
distributors, growers, associations and related organizations, with an
information-dense UI for browsing, searching and reviewing imported records.

This application lives alongside (and independent of) the Amantes Vineyard
marketing site at the repository root.

## Stack

- **Next.js 15** (App Router) + **TypeScript** + **React 19**
- **PostgreSQL 16** with `pg_trgm` (fuzzy matching), `unaccent`, and `pgvector`
  (reserved for Phase 2 semantic search)
- **Drizzle ORM** + drizzle-kit migrations
- **Tailwind CSS 4** + shadcn/ui-style components
- **Zod** validation, **Vitest** tests

## Getting started

```sh
cd directory-kb
npm install

# 1. Point DATABASE_URL at a PostgreSQL 16+ database
cp .env.example .env

# The database role needs the extensions available (created by migrations if
# permitted; otherwise create once as a superuser):
#   CREATE EXTENSION pg_trgm; CREATE EXTENSION unaccent; CREATE EXTENSION vector;

# 2. Apply migrations, load synthetic dev data
npm run db:migrate
npm run db:seed

# 3. Run
npm run dev        # http://localhost:3000
```

Quality gates:

```sh
npm run typecheck
npm run lint
npm test           # requires a migrated + seeded database
npm run build
```

## Architecture

```
src/
  db/            Drizzle schema, connection, seed
  lib/           validation (Zod), normalization, API helpers
  services/      ALL business logic (search, orgs, categories, brands,
                 contacts, sources, imports, duplicates/merge, dashboard)
  app/api/       thin JSON route handlers over services (external consumers)
  app/…          server components calling services directly; client
                 components only for interactivity (filters, review actions)
  components/    UI components (components/ui = shadcn-style primitives)
drizzle/         SQL migrations (0000 schema, 0001 search infrastructure)
```

Key design decisions:

- **Structured facts live in PostgreSQL**, not embeddings. Search is
  full-text (`tsvector` generated columns, GIN) unioned with trigram fuzzy
  matching. `SearchProvider` in `services/search-service.ts` is the seam
  where a hybrid lexical+vector provider plugs in later without UI changes.
- **Source provenance is first-class**: `source_documents → source_pages →
  source_evidence(entity_type, entity_id)` lets every entity point back to
  the directory page (and bounding box) it came from. Canonical organizations
  survive across annual editions; evidence stays edition-specific.
- **Imports never write canonical data directly.** Extraction output (JSON)
  is POSTed to `/api/import/batches`, validated, scored against existing
  records for duplicates, and parked in `staging_records`. Humans approve /
  edit / link / merge / reject from the Import Review UI. Merges are
  non-destructive: losers become tombstones, names become aliases, evidence
  is preserved.
- **Organization types are a lookup table** (not a hard enum) so new types
  don't require migrations.

## Import contract (Phase 2 integration point)

`POST /api/import/batches` accepts vendor-neutral JSON:

```jsonc
{
  "source_document_id": "…uuid…",     // optional
  "label": "OCR run 2026-09-01",
  "importer_version": "extractor-1.0",
  "records": [
    {
      "proposed_entity_type": "organization",
      "source_page_number": 887,       // physical page in the source document
      "extraction_confidence": 0.87,
      "payload": {
        "name": "…", "organization_type": "vendor",
        "website": "…", "phone": "…", "email": "…",
        "aliases": [], "brands": [], "categories": [],
        "locations": [{ "city": "…", "state_province": "…", "is_primary": true }],
        "contacts": [{ "full_name": "…", "title": "…" }],
        "evidence_text": "verbatim listing text",
        "bounding_box": { "x": 0, "y": 0, "width": 0, "height": 0 }
      }
    }
  ]
}
```

Malformed records do not fail the batch — they land in staging carrying
their validation errors for review.

## Seed data

`npm run db:seed` loads **clearly-labeled synthetic records** (no content
transcribed from the physical directory): a winery with three brands, a
multi-category vendor with two locations, a custom crush provider, an
association, a distributor, a deliberate duplicate pair, source pages from
two editions (2025/2026), and a pending import batch with a valid record, an
OCR-degraded near-duplicate, and an invalid fragment.
