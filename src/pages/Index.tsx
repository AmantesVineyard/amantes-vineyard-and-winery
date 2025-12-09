import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WineShowcase from "@/components/WineShowcase";
import Experience from "@/components/Experience";
import HanukkahBanner from "@/components/HanukkahBanner";
import Footer from "@/components/Footer";
import GrapevineSVG from "@/components/GrapevineSVG";
import SEO from "@/components/SEO";
import { WinerySchema, OrganizationSchema } from "@/components/StructuredData";

const Index = () => {
  return (
    <>
      <SEO 
        title="Amantes Vineyard - Temecula's Only Kosher Winery | Premium Kosher Wines"
        description="Discover Temecula's only kosher vineyard. Experience 3 generations of Persian Jewish winemaking tradition. Premium kosher Merlot and boutique wines in California wine country."
        canonical="/"
        keywords="kosher winery Temecula, kosher vineyard California, Persian Jewish wine, kosher Merlot, Amantes Vineyard, boutique kosher wines, Temecula wine country"
      />
      <WinerySchema />
      <OrganizationSchema />
      
      <div className="min-h-screen bg-wine-cream overflow-x-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-wine-deep text-white px-4 py-2 z-50">
          Skip to main content
        </a>
        <Navigation />
        <Hero />
        <main id="main-content">
          <WineShowcase />
          {/* <Experience /> */}
          <HanukkahBanner />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
