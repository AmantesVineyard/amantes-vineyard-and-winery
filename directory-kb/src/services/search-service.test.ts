/**
 * DB-backed tests. Require a migrated + seeded database (npm run db:migrate &&
 * npm run db:seed). They only read seeded fixtures.
 */
import { describe, expect, it } from "vitest";
import { searchProvider } from "./search-service";

describe("global search (lexical)", () => {
  it("finds organizations by full-text search on name", async () => {
    const hits = await searchProvider.globalSearch("Sierra Sol");
    const org = hits.find((h) => h.entityType === "organization");
    expect(org?.title).toBe("Sierra Sol Cellars");
  });

  it("finds organizations by description terms", async () => {
    const hits = await searchProvider.globalSearch("plate-and-frame heat exchangers");
    expect(
      hits.some((h) => h.entityType === "organization" && h.title.includes("Pacific Process"))
    ).toBe(true);
  });

  it("tolerates misspellings via trigram matching", async () => {
    const hits = await searchProvider.globalSearch("Siera Sol Celars");
    expect(hits.some((h) => h.title === "Sierra Sol Cellars")).toBe(true);
  });

  it("matches aliases", async () => {
    const hits = await searchProvider.globalSearch("Pacific Process");
    const aliasHit = hits.find((h) => h.entityType === "organization");
    expect(aliasHit?.title).toBe("Pacific Process Systems Inc");
  });

  it("finds brands and points at the brand page", async () => {
    const hits = await searchProvider.globalSearch("Cielo Rojo");
    const brand = hits.find((h) => h.entityType === "brand");
    expect(brand?.title).toBe("Cielo Rojo");
    expect(brand?.href).toMatch(/^\/brands\//);
  });

  it("finds contacts", async () => {
    const hits = await searchProvider.globalSearch("Maria Delgado");
    const contact = hits.find((h) => h.entityType === "contact");
    expect(contact?.title).toBe("Maria Delgado");
  });

  it("finds categories", async () => {
    const hits = await searchProvider.globalSearch("cold stabilization");
    expect(hits.some((h) => h.entityType === "category")).toBe(true);
  });

  it("finds organizations by city", async () => {
    const hits = await searchProvider.globalSearch("Temecula");
    const orgTitles = hits.map((h) => h.title);
    expect(orgTitles).toContain("Sierra Sol Cellars");
  });

  it("returns empty for empty query", async () => {
    expect(await searchProvider.globalSearch("   ")).toEqual([]);
  });
});
