import heroImage from "@/assets/hero-home.png";
import { useParallax } from "@/hooks/use-parallax";
import heroWaveBorder from "@/assets/hero-wave-border.svg";
import hanukkahBanner from "@/assets/hanukkah-banner.png";

const Hero = () => {
  const parallaxOffset = useParallax(0.5);
  
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-100"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${parallaxOffset}px)`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />


      {/* Organic Bottom Border SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-10 animate-fade-in">
        <img 
          src={heroWaveBorder}
          alt=""
          className="w-full h-auto drop-shadow-2xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center md:items-start justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto animate-fade-in md:pt-[240px]" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight drop-shadow-2xl mb-8">
            Temecula's only kosher vineyard
          </h1>
          <a 
            href="https://amantesvineyard.orderport.net/product-details/0014/Hanukkah-Gift-Collection"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:scale-105 transition-transform duration-300 mt-[88px] md:mt-[143px] bg-wine-bronze/75 hover:bg-wine-gold/75 px-8 py-4 rounded-2xl shadow-2xl border-2 border-white"
          >
            <p className="text-wine-cream text-lg md:text-xl font-semibold text-center">
              Hanukkah Gift Collection: 3 Bottles for the Price of 2. Shop Now
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
