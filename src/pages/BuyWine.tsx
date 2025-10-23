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

        {/* Organic Bottom Border SVG with Animation and Texture */}
        <div className="absolute bottom-0 left-0 right-0 z-10 animate-fade-in">
          <svg 
            viewBox="0 0 1440 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-2xl"
            preserveAspectRatio="none"
          >
            {/* Shadow/depth layer */}
            <path 
              d="M0,90 C80,110 160,85 240,95 C320,105 400,80 480,90 C560,100 640,75 720,85 C800,95 880,70 960,80 C1040,90 1120,65 1200,75 C1280,85 1360,70 1440,80 L1440,200 L0,200 Z" 
              fill="hsl(var(--wine-cream))"
              opacity="0.3"
            />
            {/* Main organic border - multiple curves for natural look */}
            <path 
              d="M0,85 C60,105 100,90 160,98 C220,106 280,85 340,93 C400,101 460,80 520,88 C580,96 640,75 700,83 C760,91 820,70 880,78 C940,86 1000,65 1060,73 C1120,81 1180,65 1240,73 C1300,81 1360,70 1440,78 L1440,200 L0,200 Z" 
              fill="hsl(var(--wine-cream))"
              opacity="1"
            />
            {/* Texture layer with subtle variations */}
            <path 
              d="M0,92 Q40,87 80,90 T160,93 T240,88 T320,94 T400,89 T480,95 T560,90 T640,96 T720,91 T800,97 T880,92 T960,98 T1040,93 T1120,99 T1200,94 T1280,100 T1360,95 T1440,100 L1440,200 L0,200 Z" 
              fill="hsl(var(--wine-cream))"
              opacity="0.7"
            />
            {/* Top detail layer for extra texture */}
            <path 
              d="M0,88 Q30,83 60,86 T120,89 T180,84 T240,90 T300,85 T360,91 T420,86 T480,92 T540,87 T600,93 T660,88 T720,94 T780,89 T840,95 T900,90 T960,96 T1020,91 T1080,97 T1140,92 T1200,98 T1260,93 T1320,99 T1380,94 T1440,99 L1440,200 L0,200 Z" 
              fill="hsl(var(--wine-cream))"
              opacity="0.5"
            />
            {/* Decorative trees/plants along the border - varied heights */}
            <g opacity="0.7">
              {[90, 180, 290, 410, 530, 650, 770, 890, 1010, 1130, 1250, 1360].map((x, i) => {
                const height = 68 + (i % 3) * 8 + ((i % 2) * 5);
                const treeHeight = 12 + (i % 3) * 3;
                return (
                  <g key={i} transform={`translate(${x}, ${height})`}>
                    {/* Tree trunk */}
                    <rect x="-1.5" y="0" width="3" height={treeHeight} fill="hsl(var(--wine-brown))" opacity="0.6"/>
                    {/* Tree foliage - cypress-like shape */}
                    <ellipse cx="0" cy="-4" rx="6" ry="10" fill="hsl(var(--wine-bronze))" opacity="0.5"/>
                    <ellipse cx="0" cy="-8" rx="5" ry="8" fill="hsl(var(--wine-bronze))" opacity="0.6"/>
                    <ellipse cx="0" cy="-12" rx="3" ry="5" fill="hsl(var(--wine-bronze))" opacity="0.5"/>
                  </g>
                );
              })}
            </g>
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
