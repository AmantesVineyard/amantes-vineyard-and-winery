import heroAboutImage from "@/assets/hero-3gen-about.webp";
import heroWaveBorder from "@/assets/hero-wave-border.svg";
import { useParallax } from "@/hooks/use-parallax";
import AnimatedText from "./AnimatedText";

const HeroAbout = () => {
  const parallaxOffset = useParallax(0.5);
  return (
    <section id="about" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100"
        style={{ 
          backgroundImage: `url(${heroAboutImage})`,
          transform: `translateY(${parallaxOffset}px)`
        }}
      />

      {/* Organic Bottom Border SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
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
            text="Three Generations of Persian Winemaking"
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight"
            style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
