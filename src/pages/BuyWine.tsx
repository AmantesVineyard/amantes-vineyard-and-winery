import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, Wine, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-buy-wine.png";
import { useParallax } from "@/hooks/use-parallax";
import GrapevineSVG from "@/components/GrapevineSVG";

const BuyWine = () => {
  const parallaxOffset = useParallax(0.5);
  
  return (
    <div className="min-h-screen bg-wine-cream">
      <Navigation />
      
      {/* Decorative Grapevines */}
      <GrapevineSVG side="left" />
      <GrapevineSVG side="right" />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${parallaxOffset}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-wine-cream/80" />
        </div>

        {/* Organic Bottom Border SVG - Rolling Hills */}
        <div className="absolute bottom-0 left-0 right-0 z-10 animate-fade-in">
          <svg 
            viewBox="0 0 1440 140" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-2xl"
            preserveAspectRatio="none"
          >
            {/* Decorative leaf elements on top */}
            <g opacity="0.9">
              <ellipse cx="390" cy="8" rx="8" ry="12" fill="hsl(var(--wine-cream))" />
              <ellipse cx="420" cy="12" rx="6" ry="10" fill="hsl(var(--wine-cream))" />
              <ellipse cx="270" cy="15" rx="5" ry="8" fill="hsl(var(--wine-cream))" opacity="0.8" />
              <ellipse cx="285" cy="18" rx="4" ry="7" fill="hsl(var(--wine-cream))" opacity="0.7" />
              <ellipse cx="1320" cy="10" rx="7" ry="11" fill="hsl(var(--wine-cream))" />
              <ellipse cx="1340" cy="14" rx="5" ry="9" fill="hsl(var(--wine-cream))" opacity="0.8" />
            </g>
            
            {/* Thin dark wavy line */}
            <path 
              d="M0,25 Q180,15 360,22 T720,20 T1080,24 T1440,22" 
              stroke="hsl(var(--wine-brown))"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            
            {/* Back hill layer */}
            <path 
              d="M0,65 Q360,25 720,55 T1440,50 L1440,140 L0,140 Z" 
              fill="hsl(var(--wine-cream))"
              opacity="0.4"
            />
            {/* Middle hill layer */}
            <path 
              d="M0,75 Q240,40 480,65 T960,60 T1440,70 L1440,140 L0,140 Z" 
              fill="hsl(var(--wine-cream))"
              opacity="0.7"
            />
            {/* Front hill layer */}
            <path 
              d="M0,80 Q180,50 360,75 T720,70 T1080,80 T1440,75 L1440,140 L0,140 Z" 
              fill="hsl(var(--wine-cream))"
              opacity="1"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <p className="text-sm tracking-[0.3em] text-wine-bronze uppercase mb-4 drop-shadow-lg">
              Our Collection
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight drop-shadow-2xl mb-6">
              Buy Our Wines
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Discover our selection of premium kosher wines, crafted with tradition and passion in Temecula Valley
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white/50 border border-wine-bronze/20">
              <Wine className="w-12 h-12 text-wine-bronze mx-auto mb-4" />
              <h3 className="text-xl font-serif text-wine-deep mb-3">
                Premium Selection
              </h3>
              <p className="text-wine-slate/80">
                Handcrafted kosher wines from our estate vineyards
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/50 border border-wine-bronze/20">
              <ShieldCheck className="w-12 h-12 text-wine-bronze mx-auto mb-4" />
              <h3 className="text-xl font-serif text-wine-deep mb-3">
                Certified Kosher
              </h3>
              <p className="text-wine-slate/80">
                Temecula's only kosher vineyard and winery
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/50 border border-wine-bronze/20">
              <Truck className="w-12 h-12 text-wine-bronze mx-auto mb-4" />
              <h3 className="text-xl font-serif text-wine-deep mb-3">
                Direct Shipping
              </h3>
              <p className="text-wine-slate/80">
                Convenient delivery straight to your door
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="max-w-4xl mx-auto text-center bg-white border border-wine-bronze/30 p-12">
            <h2 className="text-3xl lg:text-4xl font-serif text-wine-deep mb-6">
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
                <ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            
            <p className="text-sm text-wine-slate/60 mt-6">
              You'll be redirected to our secure Orderport store
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-serif text-wine-deep text-center mb-8">
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BuyWine;
