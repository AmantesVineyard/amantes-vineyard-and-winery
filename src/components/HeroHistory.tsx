import heroHistoryImage from "@/assets/hero-history.png";
import { useParallax } from "@/hooks/use-parallax";
import heroWaveBorder from "@/assets/hero-wave-border.svg";
import AnimatedText from "./AnimatedText";

const HeroHistory = () => {
  const parallaxOffset = useParallax(0.5);
  
  return (
    <section id="history" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-100"
        style={{ 
          backgroundImage: `url(${heroHistoryImage})`,
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
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">          
          <AnimatedText 
            text="A History of Jewish Wine in Persia... Cyrus to Temecula"
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight"
            style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroHistory;
