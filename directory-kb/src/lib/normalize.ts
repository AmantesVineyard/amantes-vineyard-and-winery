/**
 * Normalization helpers used for entity resolution and duplicate detection.
 * These never mutate stored display values — they produce match keys only.
 */

/** Extract a bare registrable domain from a URL or domain-ish string. */
export function normalizeDomain(input: string | null | undefined): string | null {
  if (!input) return null;
  let value = input.trim().toLowerCase();
  if (!value) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//.test(value)) value = `https://${value}`;
  try {
    const host = new URL(value).hostname;
    return host.replace(/^www\./, "") || null;
  } catch {
    return null;
  }
}

/** Digits-only phone with US country code stripped. */
export function normalizePhone(input: string | null | undefined): string | null {
  if (!input) return null;
  const digits = input.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

const ORG_NOISE_WORDS = new Set([
  "llc", "inc", "co", "corp", "corporation", "company", "ltd", "lp", "llp",
  "the", "and", "of",
]);

/**
 * Normalize an organization name for fuzzy comparison: lowercase, strip
 * punctuation and corporate suffixes ("ABC Winery, LLC" -> "abc winery").
 */
export function normalizeOrgName(input: string | null | undefined): string {
  if (!input) return "";
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !ORG_NOISE_WORDS.has(w))
    .join(" ");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}
