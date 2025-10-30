import homeTeam from "@/assets/home-team.png";
import homeOurWines from "@/assets/home-ourwines.png";
import homeHistory from "@/assets/home-history.png";
import homeAbout from "@/assets/home-about.png";
import { ArrowRight } from "lucide-react";
import GrapevineSVG from "@/components/GrapevineSVG";

const wines = [
  {
    id: 1,
    image: homeTeam,
    category: "Team",
    name: "Winemaking Team",
    description: "Meet the passionate winemakers behind Amantes Vineyard: three generations of Persian-Jewish craftsmen who brought their family's winemaking legacy from the ancient lands of Persia to Temecula Valley. Led by Dr. Nasir and his team, we combine centuries of tradition with innovative techniques to create wines that honor our heritage and delight modern palates.",
    position: "left",
    link: "/team"
  },
  {
    id: 2,
    image: homeOurWines,
    category: "Our Wines",
    name: "Our Wines",
    description: "Every bottle from Amantes Vineyard tells a story steeped in tradition and crafted with precision. Our collection of kosher wines—from bold reds to crisp whites—reflects three generations of Persian winemaking expertise, grown in California's premium wine country and produced under strict kosher supervision. Each vintage honors ancient methods while embracing modern excellence.",
    position: "right",
    link: "/wines"
  },
  {
    id: 3,
    image: homeHistory,
    category: "History",
    name: "History",
    description: "From the ancient vineyards of Persia where Jewish winemakers perfected their craft under Cyrus the Great, to the sun-drenched hills of Temecula, discover the remarkable 2,500-year journey that brought kosher winemaking tradition to Southern California. This is the story of resilience, faith, and the timeless art of transforming grapes into sacred wine.",
    position: "left",
    link: "/history"
  },
  {
    id: 4,
    image: homeAbout,
    category: "About",
    name: "About Us",
    description: "Amantes Vineyard is Temecula's only kosher winery, where three generations of Persian winemaking tradition meet California's premier wine country. Founded on the principles of quality, authenticity, and deep respect for Jewish law, we're committed to producing exceptional mevushal wines that bring people together in celebration, remembrance, and joy.",
    position: "right",
    link: "/about"
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
                  className="relative w-full max-w-lg h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Wine Details */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="text-sm tracking-[0.3em] text-wine-bronze uppercase mb-4 font-sans">
                {wine.category} {wine.category !== "Team" && wine.category !== "Our Wines" && wine.category !== "History" && wine.category !== "About" && <span className="text-wine-slate/60">- Coming Soon</span>}
              </p>
              
              <h2 className="text-4xl lg:text-5xl font-serif text-wine-deep mb-6 leading-tight">
                {wine.name}
              </h2>
              
              <p className="text-lg text-wine-slate/80 mb-8 leading-relaxed max-w-xl">
                {wine.description}
              </p>

              <a 
                href={wine.link || "/buy-wine"}
                className="inline-flex items-center gap-2 text-wine-bronze hover:text-wine-gold transition-colors duration-300 group"
              >
                <span className="tracking-wider uppercase text-sm font-semibold">
                  {wine.link === "/team" ? "Meet the Team" : wine.link === "/wines" ? "Explore Our Wines" : wine.link === "/history" ? "Discover Our Story" : wine.link === "/about" ? "Learn More" : "Browse Wines"}
                </span>
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
