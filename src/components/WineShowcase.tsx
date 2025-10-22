import wineBottle1 from "@/assets/wine-bottle-1.jpg";
import wineBottle2 from "@/assets/wine-bottle-2.jpg";
import { ArrowRight } from "lucide-react";

const wines = [
  {
    id: 1,
    image: wineBottle1,
    category: "Pinot Noir",
    name: "Sangiovese Sierra Folia",
    description: "Blueberries are organic grown combined with little wild plums of all colors we pick ourselves along the Snake River that separate Oregon from Idaho.",
    position: "left"
  },
  {
    id: 2,
    image: wineBottle1,
    category: "Nebbiolo",
    name: "Castello di Neive",
    description: "The generous mid-palate has mouth-filling textual layers with hints of toast and vibrancy to the fruit. The gentle acid balance opens the palate finishing with soft lingering flavours.",
    position: "right"
  },
  {
    id: 3,
    image: wineBottle2,
    category: "Chardonnay",
    name: "Domaine Prieuré-Roch Blanc",
    description: "A light yellow in color with a creamy bubbling and an elegant and persistent sparkling. The nose is fragrant and expressive with fruity and floral notes.",
    position: "left"
  }
];

const WineShowcase = () => {
  return (
    <section id="wines" className="py-24 bg-wine-deep">
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
                  className="relative w-64 h-96 object-contain transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Wine Details */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="text-sm tracking-[0.3em] text-wine-bronze uppercase mb-4 font-sans">
                {wine.category}
              </p>
              
              <h2 className="text-4xl lg:text-5xl font-serif text-wine-cream mb-6 leading-tight">
                {wine.name}
              </h2>
              
              <p className="text-lg text-wine-cream/70 mb-8 leading-relaxed max-w-xl">
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
