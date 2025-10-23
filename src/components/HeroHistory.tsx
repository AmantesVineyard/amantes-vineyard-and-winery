import heroHistoryImage from "@/assets/hero-history.png";
import { useParallax } from "@/hooks/use-parallax";

const HeroHistory = () => {
  const parallaxOffset = useParallax(0.5);
  
  return (
    <section id="history" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
        style={{ 
          backgroundImage: `url(${heroHistoryImage})`,
          transform: `translateY(${parallaxOffset}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-wine-cream/80" />
      </div>

      {/* Organic Bottom Border SVG with Animation */}
      <div className="absolute bottom-0 left-0 right-0 z-10 animate-fade-in">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,120 L0,120 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="1"
            className="transition-all duration-700"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight drop-shadow-2xl">
            A History of Jewish Wine in Persia...<br />Cyrus to Temecula
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroHistory;
