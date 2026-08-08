import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GrapevineSVG from "@/components/GrapevineSVG";
import wineTem from "@/assets/wine-tem.png";
import wineLeparlay from "@/assets/wine-leparlay.png";
import wine3gf2021 from "@/assets/wine-3gf-2021.png";
import wine3gf2020 from "@/assets/wine-3gf-2020.png";
import heroImage from "@/assets/hero-wines.png";
import waveBorder from "@/assets/hero-wave-border.svg";
import { useParallax } from "@/hooks/use-parallax";
import AnimatedText from "@/components/AnimatedText";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, WineProductSchema } from "@/components/StructuredData";
import { useElevintCatalog, sortForDisplay } from "@/hooks/use-elevint-catalog";

/**
 * Hand-written copy and in-repo photography for wines that have them. Anything
 * not listed here still appears, using its catalog details — so adding a wine in
 * EleVint puts it on this page without a code change.
 */
const CURATED: Record<string, { description: string; image?: string; category?: string }> = {
  "Toi et Moi 2022 Merlot": {
    image: wineTem,
    category: "Merlot",
    description: "Our Temecula Valley Merlot is a handcrafted Kosher Reserve showcasing rich, velvety flavors with notes of dark cherry and plum. Smooth tannins and a lingering finish make this an exceptional choice for any occasion.",
  },
  "LeParlay 2022 Merlot": {
    image: wineLeparlay,
    category: "Merlot",
    description: "A sophisticated Merlot that embodies the perfect balance of fruit and oak. Rich flavors and smooth texture make this wine ideal for special occasions and memorable moments.",
  },
  "3Girlfriends 2021 Merlot": {
    image: wine3gf2021,
    category: "Merlot",
    description: "Named in honor of three special friendships, this Merlot delivers complex flavors with a smooth, elegant finish. Perfect for sharing with those who matter most.",
  },
  "3Girlfriends 2020 Merlot Limited Reserve": {
    image: wine3gf2020,
    category: "Merlot - Limited Reserve",
    description: "Our premium Limited Reserve showcases the finest expression of our craft. This exceptional vintage offers deep complexity, refined tannins, and a luxurious finish that lingers beautifully.",
  },
};

/** Shown until the catalog responds, so the page never paints empty. */
const FALLBACK = [
  "Toi et Moi 2022 Merlot",
  "LeParlay 2022 Merlot",
  "3Girlfriends 2021 Merlot",
  "3Girlfriends 2020 Merlot Limited Reserve",
];

interface DisplayWine {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  position: "left" | "right";
}

function describe(name: string, varietal?: string, vintage?: number): string {
  const curated = CURATED[name]?.description;
  if (curated) return curated;
  const style = varietal ?? "wine";
  return `A kosher ${style.toLowerCase()}${vintage ? ` from our ${vintage} harvest` : ""}, grown and produced at our Temecula Valley estate under strict kosher supervision.`;
}

const Wines = () => {
  const parallaxOffset = useParallax(0.5);
  // The range, pricing, photography and purchase links all come from the live
  // EleVint catalog; hand-written copy above overrides where it exists.
  const { all, buyUrl, loaded } = useElevintCatalog();

  const catalog = sortForDisplay(all());
  const wines: DisplayWine[] =
    catalog.length > 0
      ? catalog.map((w, i) => ({
          id: w.id,
          name: w.name,
          category: CURATED[w.name]?.category ?? w.varietal ?? w.type ?? "Kosher Wine",
          description: describe(w.name, w.varietal, w.vintage),
          image: CURATED[w.name]?.image ?? w.image ?? "",
          price: w.price ?? null,
          position: i % 2 === 0 ? "right" : "left",
        }))
      : FALLBACK.map((name, i) => ({
          id: name,
          name,
          category: CURATED[name]?.category ?? "Merlot",
          description: CURATED[name]!.description,
          image: CURATED[name]?.image ?? "",
          price: null,
          position: i % 2 === 0 ? "right" : "left",
        }));

  return (
    <>
      <SEO 
        title="Kosher Wines Collection | Amantes Vineyard Temecula"
        description="Shop our premium kosher wine collection. Handcrafted Merlot wines from Temecula's only kosher vineyard. 3Girlfriends, Toi et Moi, LeParlay and limited reserves."
        canonical="/wines"
        keywords="kosher Merlot, buy kosher wine, Temecula kosher wines, 3Girlfriends Merlot, kosher wine collection, premium kosher wines"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Wines", url: "/wines" }
      ]} />
      <WineProductSchema wines={wines.map(wine => ({
        name: wine.name,
        description: wine.description,
        image: wine.image,
        url: `https://love.amantesvineyard.com/wines`,
        category: wine.category
      }))} />
      
      <div className="min-h-screen flex flex-col bg-wine-cream">
        <a href="#wines-collection" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-wine-deep text-white px-4 py-2 z-50">
          Skip to wine collection
        </a>
        <Navigation transparent logoSrc="" />
        
        {/* Hero Section */}
        <header className="relative h-screen overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              transform: `translateY(${parallaxOffset}px)`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
            role="img"
            aria-label="Amantes Vineyard wine cellar with premium kosher wines"
          >
            <div className="absolute inset-0 bg-wine-deep/40" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <AnimatedText 
              text="Wines"
              className="text-6xl md:text-7xl lg:text-8xl font-serif text-wine-cream mb-6"
              style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 z-20" aria-hidden="true">
            <img src={waveBorder} alt="" className="w-full h-auto" />
          </div>
        </header>

        {/* Wines Showcase Section */}
        <main id="wines-collection" className="py-24 bg-wine-cream relative">
          <h1 className="sr-only">Amantes Vineyard Kosher Wine Collection</h1>
          
          {/* Decorative Vines */}
          <div className="absolute left-4 top-20 w-16 h-[500px] pointer-events-none hidden md:block" aria-hidden="true">
            <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-60" />
          </div>
          <div className="absolute right-4 top-40 w-16 h-[500px] pointer-events-none hidden md:block" aria-hidden="true">
            <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-60" />
          </div>
          <div className="absolute left-8 top-[600px] w-20 h-96 pointer-events-none hidden lg:block" aria-hidden="true">
            <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-40" />
          </div>
          <div className="absolute right-8 top-[800px] w-20 h-96 pointer-events-none hidden lg:block" aria-hidden="true">
            <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-40" />
          </div>
          
          <div className="container mx-auto px-8 lg:px-16">
            {wines.map((wine) => (
              <article 
                key={wine.id}
                className={`flex flex-col ${wine.position === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 mb-32 last:mb-0`}
              >
                {/* Wine Bottle Image */}
                <figure className="w-full lg:w-1/2 flex justify-center">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-wine-bronze/20 blur-3xl transform group-hover:scale-110 transition-transform duration-700" aria-hidden="true" />
                    <img 
                      src={wine.image}
                      alt={`${wine.name} - ${wine.category} kosher wine from Amantes Vineyard`}
                      className="relative w-80 aspect-[2/3] object-contain transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </figure>

                {/* Wine Details */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <p className="text-sm tracking-[0.3em] text-wine-bronze uppercase mb-4 font-sans">
                    {wine.category}
                  </p>
                  
                  <h2 className="text-4xl lg:text-5xl font-serif text-wine-deep mb-6 leading-tight">
                    {wine.name}
                  </h2>
                  
                  <p className="text-lg text-wine-slate/80 mb-8 leading-relaxed max-w-xl">
                    {wine.description}
                  </p>

                  {wine.price != null && (
                    <p className="text-2xl font-serif text-wine-deep mb-6">
                      ${wine.price.toFixed(2)}
                    </p>
                  )}

                  <a
                    href={buyUrl(wine.name) ?? "/buy-wine"}
                    className="inline-flex items-center gap-2 text-wine-bronze hover:text-wine-gold transition-colors duration-300 group"
                    aria-label={`Buy ${wine.name} kosher wine`}
                  >
                    <span className="tracking-wider uppercase text-sm font-semibold">
                      {buyUrl(wine.name) ? "Add to Cart" : "Discover This Wine"}
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Wines;
