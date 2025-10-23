import heroImage from "@/assets/hero-banner.png";
import { useParallax } from "@/hooks/use-parallax";

const Hero = () => {
  const parallaxOffset = useParallax(0.5);
  
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${parallaxOffset}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-wine-cream/80" />
      </div>

      {/* Organic Bottom Border SVG with Animation and Texture */}
      <div className="absolute bottom-0 left-0 right-0 z-10 animate-fade-in">
        <svg 
          viewBox="0 0 1440 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          {/* Main wavy border with texture */}
          <path 
            d="M0,80 C120,100 180,60 300,80 C420,100 480,60 600,75 C720,90 780,55 900,70 C1020,85 1080,50 1200,65 C1320,80 1380,55 1440,70 L1440,180 L0,180 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="1"
            className="transition-all duration-700"
          />
          {/* Texture layer - subtle variations */}
          <path 
            d="M0,85 Q60,78 120,82 T240,80 T360,85 T480,78 T600,83 T720,77 T840,82 T960,79 T1080,84 T1200,78 T1320,83 T1440,80 L1440,180 L0,180 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="0.6"
            className="transition-all duration-700"
          />
          {/* Decorative trees/plants along the border */}
          <g opacity="0.8">
            {[150, 380, 580, 820, 1050, 1280].map((x, i) => (
              <g key={i} transform={`translate(${x}, ${65 + (i % 2) * 5})`}>
                {/* Tree trunk */}
                <rect x="-2" y="0" width="4" height="15" fill="hsl(var(--wine-brown))" opacity="0.7"/>
                {/* Tree foliage */}
                <ellipse cx="0" cy="-5" rx="8" ry="12" fill="hsl(var(--wine-bronze))" opacity="0.6"/>
                <ellipse cx="-5" cy="-2" rx="6" ry="9" fill="hsl(var(--wine-bronze))" opacity="0.5"/>
                <ellipse cx="5" cy="-2" rx="6" ry="9" fill="hsl(var(--wine-bronze))" opacity="0.5"/>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight drop-shadow-2xl">
            Temecula's only kosher vineyard
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
