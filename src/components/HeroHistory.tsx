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

      {/* Organic Bottom Border SVG - Rolling Hills */}
      <div className="absolute bottom-0 left-0 right-0 z-10 animate-fade-in">
        <svg 
          viewBox="0 0 1440 160" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hillGradientHistory" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--wine-cream))', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--wine-cream))', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Decorative leaf elements on top - very subtle */}
          <g opacity="0.6">
            <ellipse cx="390" cy="5" rx="6" ry="10" fill="hsl(var(--wine-cream))" />
            <ellipse cx="415" cy="8" rx="5" ry="8" fill="hsl(var(--wine-cream))" />
            <ellipse cx="1330" cy="6" rx="5" ry="9" fill="hsl(var(--wine-cream))" />
          </g>
          
          {/* Thin dark wavy line - very subtle */}
          <path 
            d="M0,20 C240,15 480,25 720,18 C960,25 1200,15 1440,20" 
            stroke="hsl(var(--wine-brown))"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
          
          {/* Smooth rolling hills - gentle curves */}
          <path 
            d="M0,45 C360,35 540,60 720,50 C900,40 1080,55 1440,48 L1440,160 L0,160 Z" 
            fill="url(#hillGradientHistory)"
          />
          <path 
            d="M0,65 C300,55 600,75 900,65 C1200,55 1350,70 1440,68 L1440,160 L0,160 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="0.85"
          />
          <path 
            d="M0,80 C240,70 480,88 720,78 C960,88 1200,75 1440,82 L1440,160 L0,160 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="0.95"
          />
          <path 
            d="M0,95 C360,88 720,100 1080,92 C1260,98 1350,90 1440,95 L1440,160 L0,160 Z" 
            fill="hsl(var(--wine-cream))"
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
