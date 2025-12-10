import homeTeam from "@/assets/home-team.png";
import homeOurWines from "@/assets/home-ourwines.png";
import homeHistory from "@/assets/home-history.png";
import homeAbout from "@/assets/home-about.png";
import { ArrowRight } from "lucide-react";
import GrapevineSVG from "@/components/GrapevineSVG";
import { useParallax } from "@/hooks/use-parallax";

const sections = [
  {
    id: 1,
    image: homeTeam,
    imageAlt: "Three generations of Persian Jewish winemakers at Amantes Vineyard",
    category: "Our Team",
    name: "Meet Our Winemaking Team",
    description: "Meet the passionate winemakers behind Amantes Vineyard: three generations of Persian-Jewish craftsmen who brought their family's winemaking legacy from the ancient lands of Persia to Temecula Valley. Led by Dr. Joseph Nassir and his team, we combine centuries of tradition with innovative techniques to create wines that honor our heritage and delight modern palates.",
    position: "left",
    link: "/team",
    linkText: "Meet the Team"
  },
  {
    id: 2,
    image: homeOurWines,
    imageAlt: "Premium kosher Merlot wine bottles from Amantes Vineyard collection",
    category: "Wine Collection",
    name: "Our Kosher Wine Collection",
    description: "Every bottle from Amantes Vineyard tells a story steeped in tradition and crafted with precision. Our collection of kosher wines—featuring our acclaimed Merlot varietals—reflects three generations of Persian winemaking expertise, grown in California's premium wine country and produced under strict kosher supervision. Each vintage honors ancient methods while embracing modern excellence.",
    position: "right",
    link: "/wines",
    linkText: "Explore Our Wines"
  },
  {
    id: 3,
    image: homeHistory,
    imageAlt: "Ancient Persian winemaking tradition spanning 2,500 years of Jewish heritage",
    category: "Our Heritage",
    name: "2,500 Years of Winemaking History",
    description: "From the ancient vineyards of Persia where Jewish winemakers perfected their craft under Cyrus the Great, to the sun-drenched hills of Temecula, discover the remarkable 2,500-year journey that brought kosher winemaking tradition to Southern California. This is the story of resilience, faith, and the timeless art of transforming grapes into sacred wine.",
    position: "left",
    link: "/history",
    linkText: "Discover Our Story"
  },
  {
    id: 4,
    image: homeAbout,
    imageAlt: "Amantes Vineyard estate in Temecula Valley California wine country",
    category: "About Us",
    name: "About Amantes Vineyard & Winery",
    description: "Amantes Vineyard is Temecula's only kosher winery, where three generations of Persian winemaking tradition meet California's premier wine country. Founded on the principles of quality, authenticity, and deep respect for Jewish law, we're committed to producing exceptional mevushal wines that bring people together in celebration, remembrance, and joy.",
    position: "right",
    link: "/about",
    linkText: "Learn More About Us"
  }
];

const WineShowcase = () => {
  const parallax1 = useParallax(0.3);
  const parallax2 = useParallax(0.4);
  const parallax3 = useParallax(0.5);
  const parallax4 = useParallax(0.6);

  return (
    <section id="wines" className="py-24 bg-wine-cream relative overflow-hidden" aria-labelledby="showcase-heading">
      <h2 id="showcase-heading" className="sr-only">Explore Amantes Vineyard</h2>
      
      {/* Decorative Vines Around Wine Showcase */}
      <div 
        className="absolute left-4 top-20 w-16 h-[500px] pointer-events-none hidden md:block"
        style={{ transform: `translateY(${parallax1}px)` }}
        aria-hidden="true"
      >
        <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-60" />
      </div>
      <div 
        className="absolute right-4 top-40 w-16 h-[500px] pointer-events-none hidden md:block"
        style={{ transform: `translateY(${parallax2}px)` }}
        aria-hidden="true"
      >
        <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-60" />
      </div>
      <div 
        className="absolute left-8 top-[600px] w-20 h-96 pointer-events-none hidden lg:block"
        style={{ transform: `translateY(${parallax3}px)` }}
        aria-hidden="true"
      >
        <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-40" />
      </div>
      <div 
        className="absolute right-8 top-[800px] w-20 h-96 pointer-events-none hidden lg:block"
        style={{ transform: `translateY(${parallax4}px)` }}
        aria-hidden="true"
      >
        <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-40" />
      </div>
      
      <div className="container mx-auto px-8 lg:px-16">
        {sections.map((section) => (
          <article 
            key={section.id}
            className={`flex flex-col ${section.position === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 mb-32 last:mb-0`}
          >
            {/* Image */}
            <figure className="w-full lg:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-wine-bronze/20 blur-3xl transform group-hover:scale-110 transition-transform duration-700" aria-hidden="true" />
                <img 
                  src={section.image}
                  alt={section.imageAlt}
                  className="relative w-full max-w-lg h-auto object-contain transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width="512"
                  height="384"
                />
              </div>
            </figure>

            {/* Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="text-sm tracking-[0.3em] text-wine-bronze uppercase mb-4 font-sans">
                {section.category}
              </p>
              
              <h3 className="text-4xl lg:text-5xl font-serif text-wine-deep mb-6 leading-tight">
                {section.name}
              </h3>
              
              <p className="text-lg text-wine-slate/80 mb-8 leading-relaxed max-w-xl">
                {section.description}
              </p>

              <a 
                href={section.link}
                className="inline-flex items-center gap-2 text-wine-bronze hover:text-wine-gold transition-colors duration-300 group"
                aria-label={`${section.linkText} - ${section.name}`}
              >
                <span className="tracking-wider uppercase text-sm font-semibold">
                  {section.linkText}
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WineShowcase;