import { describe, expect, it } from "vitest";
import { normalizeDomain, normalizeOrgName, normalizePhone, slugify } from "./normalize";

describe("normalizeDomain", () => {
  it("extracts registrable domain from URLs", () => {
    expect(normalizeDomain("https://www.sierrasolcellars.example.com/about")).toBe(
      "sierrasolcellars.example.com"
    );
    expect(normalizeDomain("http://Example.COM")).toBe("example.com");
  });
  it("handles bare domains", () => {
    expect(normalizeDomain("example.org")).toBe("example.org");
    expect(normalizeDomain("www.example.org")).toBe("example.org");
  });
  it("returns null for empty/garbage", () => {
    expect(normalizeDomain(null)).toBeNull();
    expect(normalizeDomain("")).toBeNull();
    expect(normalizeDomain("   ")).toBeNull();
  });
});

describe("normalizePhone", () => {
  it("strips formatting", () => {
    expect(normalizePhone("(555) 210-4477")).toBe("5552104477");
  });
  it("strips US country code", () => {
    expect(normalizePhone("+1 555 210 4477")).toBe("5552104477");
    expect(normalizePhone("1-555-210-4477")).toBe("5552104477");
  });
  it("returns null when no digits", () => {
    expect(normalizePhone("n/a")).toBeNull();
    expect(normalizePhone(null)).toBeNull();
  });
});

describe("normalizeOrgName", () => {
  it("strips corporate suffixes and punctuation", () => {
    expect(normalizeOrgName("ABC Winery, LLC")).toBe("abc winery");
    expect(normalizeOrgName("ABC Winery & Vineyards Inc.")).toBe("abc winery vineyards");
  });
  it("treats variants as equal after normalization", () => {
    expect(normalizeOrgName("The ABC Winery Co.")).toBe(normalizeOrgName("ABC WINERY"));
  });
});

describe("slugify", () => {
  it("produces url-safe slugs", () => {
    expect(slugify("Heat Exchangers & Cold Stabilization Equipment")).toBe(
      "heat-exchangers-and-cold-stabilization-equipment"
    );
  });
});
