import { useEffect, useState } from "react";

/**
 * Live catalog from EleVint.
 *
 * Wine copy and photography stay curated in this site; price, availability and
 * the purchase link come from the winery's real catalog so they can't drift out
 * of date. Products are matched to page content by name.
 */

const ELEVINT_ORIGIN = "https://shop.elevint.co";
const WINERY_SLUG = "amantes-vineyard";

export interface CatalogWine {
  id: string;
  variantId: string | null;
  name: string;
  price: number;
  vintage?: number;
  varietal?: string;
  /** Bottle photography, served from our own CDN. */
  image?: string;
  /** Red | White | Rosé | Sparkling */
  type?: string;
}

/** Sparkling first, then whites, then reds — a tasting-order progression. */
const TYPE_ORDER: Record<string, number> = {
  sparkling: 0,
  white: 1,
  'rosé': 2,
  rose: 2,
  red: 3,
};

/**
 * Presentation order for the full range: by style, then ascending price, so the
 * list builds toward the flagship reserve rather than opening on it.
 */
export function sortForDisplay(wines: CatalogWine[]): CatalogWine[] {
  return [...wines].sort((a, b) => {
    const ta = TYPE_ORDER[(a.type ?? '').toLowerCase()] ?? 9;
    const tb = TYPE_ORDER[(b.type ?? '').toLowerCase()] ?? 9;
    if (ta !== tb) return ta - tb;
    if (a.price !== b.price) return a.price - b.price;
    return a.name.localeCompare(b.name);
  });
}

/** Normalise for matching: case, punctuation and spacing shouldn't break a join. */
function key(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function useElevintCatalog() {
  const [byName, setByName] = useState<Map<string, CatalogWine>>(new Map());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(
          `${ELEVINT_ORIGIN}/api/wines?winery=${encodeURIComponent(WINERY_SLUG)}`
        );
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (cancelled) return;

        const map = new Map<string, CatalogWine>();
        for (const w of (data.wines ?? []) as CatalogWine[]) {
          map.set(key(w.name), w);
        }
        setByName(map);
      } catch {
        // Offline or unreachable: the page still renders its curated content,
        // simply without live pricing.
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /** Live catalog entry for a wine shown on the page, if we have one. */
  const lookup = (name: string): CatalogWine | undefined => byName.get(key(name));

  /**
   * Link that adds the wine to the EleVint cart and lands the customer in
   * checkout. Navigating (rather than fetching) keeps the cart cookie
   * first-party, which browsers require.
   */
  const buyUrl = (name: string): string | null => {
    const match = lookup(name);
    if (!match?.variantId) return null;
    return `${ELEVINT_ORIGIN}/cart/add?variantId=${encodeURIComponent(
      match.variantId
    )}&winery=${WINERY_SLUG}&redirect=checkout`;
  };

  /** All catalog wines, for pages that list the full range. */
  const all = (): CatalogWine[] => [...byName.values()];

  return { lookup, buyUrl, all, loaded };
}
