import wineMerlot from "@/assets/wine-bottle-merlot.png";
import wineCabernet from "@/assets/wine-bottle-cab.png";
import winePinot from "@/assets/wine-bottle-pn.png";
import { ArrowRight } from "lucide-react";
import GrapevineSVG from "@/components/GrapevineSVG";

const wines = [
  {
    id: 1,
    image: wineMerlot,
    category: "Merlot",
    name: "Amantes 2025 Merlot",
    description: "Our Temecula Valley Merlot is a handcrafted Kosher Reserve showcasing rich, velvety flavors with notes of dark cherry and plum. Smooth tannins and a lingering finish make this an exceptional choice for any occasion.",
    position: "left"
  },
  {
    id: 2,
    image: wineCabernet,
    category: "Cabernet Sauvignon",
    name: "Amantes 2025 Cabernet Sauvignon",
    description: "Bold and structured, our Cabernet Sauvignon features layers of blackcurrant, oak, and spice. This full-bodied wine from Temecula Valley delivers complexity and depth with every sip.",
    position: "right"
  },
  {
    id: 3,
    image: winePinot,
    category: "Pinot Noir",
    name: "Amantes 2025 Pinot Noir",
    description: "Elegant and refined, our Pinot Noir offers delicate notes of red berries, earth, and subtle oak. Silky smooth with balanced acidity, this wine embodies the essence of California craftsmanship.",
    position: "left"
  }
];

const WineShowcase = () => {
  return (
    <section id="wines" className="py-24 bg-wine-cream relative">
      {/* Decorative Vines Around Wine Showcase */}
      <div className="absolute left-4 top-20 w-16 h-[500px] pointer-events-none hidden md:block">
        <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-60" />
      </div>
      <div className="absolute right-4 top-40 w-16 h-[500px] pointer-events-none hidden md:block">
        <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-60" />
      </div>
      <div className="absolute left-8 top-[600px] w-20 h-96 pointer-events-none hidden lg:block">
        <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-40" />
      </div>
      <div className="absolute right-8 top-[800px] w-20 h-96 pointer-events-none hidden lg:block">
        <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-40" />
      </div>
      
      <div className="container mx-auto px-4">
        {wines.map((wine, index) => (
          <div 
            key={wine.id}
            className={`flex flex-col ${wine.position === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 mb-32 last:mb-0`}
          >
            {/* Wine Bottle Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-wine-bronze/20 blur-3xl transform group-hover:scale-110 transition-transform duration-700" />
                <img 
                  src={wine.image}
                  alt={wine.name}
                  className="relative w-80 aspect-[2/3] object-contain transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

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

              <a 
                href="#shop"
                className="inline-flex items-center gap-2 text-wine-bronze hover:text-wine-gold transition-colors duration-300 group"
              >
                <span className="tracking-wider uppercase text-sm font-semibold">Browse Wines</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WineShowcase;
