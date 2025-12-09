import Navigation from "@/components/Navigation";
import HanukkahBanner from "@/components/HanukkahBanner";
import Footer from "@/components/Footer";
import { ExternalLink, Wine, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-buy-wine.png";
import { useParallax } from "@/hooks/use-parallax";
import GrapevineSVG from "@/components/GrapevineSVG";
import heroWaveBorder from "@/assets/hero-wave-border.svg";
import AnimatedText from "@/components/AnimatedText";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/StructuredData";

const BuyWine = () => {
  const parallaxOffset = useParallax(0.5);
  
  return (
    <>
      <SEO 
        title="Buy Kosher Wine Online | Amantes Vineyard Shop"
        description="Order premium kosher wines from Amantes Vineyard. Shop our Merlot collection with direct shipping. Temecula's only kosher winery delivers to your door."
        canonical="/buy-wine"
        keywords="buy kosher wine online, order kosher Merlot, kosher wine delivery, Amantes Vineyard shop, Temecula wine shipping"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Buy Wine", url: "/buy-wine" }
      ]} />
      
      <div className="min-h-screen bg-wine-cream">
        <a href="#shop-wines" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-wine-deep text-white px-4 py-2 z-50">
          Skip to wine shop
        </a>
        <Navigation />
        
        {/* Hero Section */}
        <header className="relative h-screen w-full overflow-hidden">
          {/* Background Image with Parallax */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
            style={{ 
              backgroundImage: `url(${heroImage})`,
              transform: `translateY(${parallaxOffset}px)`
            }}
            role="img"
            aria-label="Premium kosher wine bottles from Amantes Vineyard collection"
          />

          {/* Organic Bottom Border SVG */}
          <div className="absolute bottom-0 left-0 right-0 z-10 animate-fade-in" aria-hidden="true">
            <img 
              src={heroWaveBorder}
              alt=""
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <p className="text-sm tracking-[0.3em] text-wine-bronze uppercase mb-4 drop-shadow-lg">
                Our Collection
              </p>
              <AnimatedText 
                text="Buy Our Wines"
                className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-6"
                style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}
              />
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
                Discover our selection of premium kosher wines, crafted with tradition and passion in Temecula Valley
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main id="shop-wines" className="py-20 relative">
          <h1 className="sr-only">Shop Amantes Vineyard Kosher Wines</h1>
          
          {/* Decorative Vines Around Content */}
          <div className="absolute left-4 top-10 w-16 h-96 pointer-events-none hidden md:block" aria-hidden="true">
            <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-60" />
          </div>
          <div className="absolute right-4 top-20 w-16 h-96 pointer-events-none hidden md:block" aria-hidden="true">
            <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-60" />
          </div>
          <div className="absolute left-8 top-[500px] w-20 h-80 pointer-events-none hidden lg:block" aria-hidden="true">
            <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-40" />
          </div>
          <div className="absolute right-8 top-[650px] w-20 h-80 pointer-events-none hidden lg:block" aria-hidden="true">
            <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-40" />
          </div>
          
          <div className="container mx-auto px-4">
            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" aria-label="Wine shop features">
              <article className="text-center p-8 bg-white/50 border border-wine-bronze/20">
                <Wine className="w-12 h-12 text-wine-bronze mx-auto mb-4" aria-hidden="true" />
                <h2 className="text-xl font-serif text-wine-deep mb-3">
                  Premium Selection
                </h2>
                <p className="text-wine-slate/80">
                  Handcrafted kosher wines from our estate vineyards
                </p>
              </article>
              
              <article className="text-center p-8 bg-white/50 border border-wine-bronze/20">
                <ShieldCheck className="w-12 h-12 text-wine-bronze mx-auto mb-4" aria-hidden="true" />
                <h2 className="text-xl font-serif text-wine-deep mb-3">
                  Certified Kosher
                </h2>
                <p className="text-wine-slate/80">
                  Temecula's only kosher vineyard and winery
                </p>
              </article>
              
              <article className="text-center p-8 bg-white/50 border border-wine-bronze/20">
                <Truck className="w-12 h-12 text-wine-bronze mx-auto mb-4" aria-hidden="true" />
                <h2 className="text-xl font-serif text-wine-deep mb-3">
                  Direct Shipping
                </h2>
                <p className="text-wine-slate/80">
                  Convenient delivery straight to your door
                </p>
              </article>
            </section>

            {/* Call to Action */}
            <section className="max-w-4xl mx-auto text-center bg-white border border-wine-bronze/30 p-12" aria-labelledby="browse-collection">
              <h2 id="browse-collection" className="text-3xl lg:text-4xl font-serif text-wine-deep mb-6">
                Browse Our Wine Collection
              </h2>
              <p className="text-lg text-wine-slate/80 mb-8 leading-relaxed">
                Experience the finest kosher wines from Amantes Vineyard. 
                Our online store powered by Orderport makes it easy to explore our collection 
                and have your favorite wines delivered to your home.
              </p>
              
              <a
                href="https://amantesvineyard.orderport.net/wines/Our-Wines"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button 
                  size="lg"
                  className="bg-wine-bronze hover:bg-wine-gold text-white px-12 py-6 text-base tracking-wider uppercase group"
                >
                  <span>Shop Our Wines</span>
                  <ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </a>
              
              <p className="text-sm text-wine-slate/60 mt-6">
                You'll be redirected to our secure Orderport store
              </p>
            </section>

            {/* Additional Info */}
            <section className="mt-20 max-w-3xl mx-auto" aria-labelledby="why-choose">
              <h3 id="why-choose" className="text-2xl font-serif text-wine-deep text-center mb-8">
                Why Choose Amantes Vineyard?
              </h3>
              <div className="space-y-6 text-wine-slate/80">
                <p className="leading-relaxed">
                  As Temecula's one and only kosher vineyard, we take pride in producing exceptional wines 
                  that honor both tradition and quality. Each bottle represents our commitment to sustainable 
                  viticulture and time-honored winemaking practices.
                </p>
                <p className="leading-relaxed">
                  Our wines are perfect for celebrations, special occasions, or simply enjoying with good company. 
                  Whether you're a wine enthusiast or new to kosher wines, our collection offers something for every palate.
                </p>
              </div>
            </section>
          </div>
        </main>

        <HanukkahBanner />
        <Footer />
      </div>
    </>
  );
};

export default BuyWine;
