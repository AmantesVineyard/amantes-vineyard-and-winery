import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GrapevineSVG from "@/components/GrapevineSVG";
import wineHannuka from "@/assets/wine-hannuka.png";
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

const wines = [
  {
    id: 1,
    image: wineHannuka,
    category: "Special Collection",
    name: "Hanukkah Gift Collection",
    description: "Limited Time 🕎 Hanukkah 🕎 Offer! Celebrate the Festival of Lights with Temecula's ONE & ONLY kosher vineyard! Only available while supplies last.",
    position: "left",
    link: "https://amantesvineyard.orderport.net/product-details/0014/Hanukkah-Gift-Collection"
  },
  {
    id: 2,
    image: wineTem,
    category: "Merlot",
    name: "Toi et Moi 2022 Merlot",
    description: "Our Temecula Valley Merlot is a handcrafted Kosher Reserve showcasing rich, velvety flavors with notes of dark cherry and plum. Smooth tannins and a lingering finish make this an exceptional choice for any occasion.",
    position: "right",
    link: "https://amantesvineyard.orderport.net/product-details/0003/Toi-et-Moi-2022-Merlot"
  },
  {
    id: 3,
    image: wineLeparlay,
    category: "Merlot",
    name: "LeParlay 2022 Merlot",
    description: "A sophisticated Merlot that embodies the perfect balance of fruit and oak. Rich flavors and smooth texture make this wine ideal for special occasions and memorable moments.",
    position: "left",
    link: "https://amantesvineyard.orderport.net/product-details/0004/LeParlay-2022-Merlot"
  },
  {
    id: 4,
    image: wine3gf2021,
    category: "Merlot",
    name: "3Girlfriends 2021 Merlot",
    description: "Named in honor of three special friendships, this Merlot delivers complex flavors with a smooth, elegant finish. Perfect for sharing with those who matter most.",
    position: "right",
    link: "https://amantesvineyard.orderport.net/product-details/0005/3Girlfriends-2021-Merlot"
  },
  {
    id: 5,
    image: wine3gf2020,
    category: "Merlot - Limited Reserve",
    name: "3Girlfriends 2020 Merlot Limited Reserve",
    description: "Our premium Limited Reserve showcases the finest expression of our craft. This exceptional vintage offers deep complexity, refined tannins, and a luxurious finish that lingers beautifully.",
    position: "left",
    link: "https://amantesvineyard.orderport.net/product-details/0001/3Girlfriends-2020-Merlot-Limited-Reserve"
  }
];

const Wines = () => {
  const parallaxOffset = useParallax(0.5);

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
        url: wine.link,
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

                  <a 
                    href={wine.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-wine-bronze hover:text-wine-gold transition-colors duration-300 group"
                    aria-label={`Shop ${wine.name} kosher wine`}
                  >
                    <span className="tracking-wider uppercase text-sm font-semibold">Discover This Wine</span>
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
