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
          viewBox="0 0 1440 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          {/* Shadow/depth layer */}
          <path 
            d="M0,90 C80,110 160,85 240,95 C320,105 400,80 480,90 C560,100 640,75 720,85 C800,95 880,70 960,80 C1040,90 1120,65 1200,75 C1280,85 1360,70 1440,80 L1440,200 L0,200 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="0.3"
          />
          {/* Main organic border - multiple curves for natural look */}
          <path 
            d="M0,85 C60,105 100,90 160,98 C220,106 280,85 340,93 C400,101 460,80 520,88 C580,96 640,75 700,83 C760,91 820,70 880,78 C940,86 1000,65 1060,73 C1120,81 1180,65 1240,73 C1300,81 1360,70 1440,78 L1440,200 L0,200 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="1"
          />
          {/* Texture layer with subtle variations */}
          <path 
            d="M0,92 Q40,87 80,90 T160,93 T240,88 T320,94 T400,89 T480,95 T560,90 T640,96 T720,91 T800,97 T880,92 T960,98 T1040,93 T1120,99 T1200,94 T1280,100 T1360,95 T1440,100 L1440,200 L0,200 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="0.7"
          />
          {/* Top detail layer for extra texture */}
          <path 
            d="M0,88 Q30,83 60,86 T120,89 T180,84 T240,90 T300,85 T360,91 T420,86 T480,92 T540,87 T600,93 T660,88 T720,94 T780,89 T840,95 T900,90 T960,96 T1020,91 T1080,97 T1140,92 T1200,98 T1260,93 T1320,99 T1380,94 T1440,99 L1440,200 L0,200 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="0.5"
          />
          {/* Decorative trees/plants along the border - varied heights */}
          <g opacity="0.7">
            {[90, 180, 290, 410, 530, 650, 770, 890, 1010, 1130, 1250, 1360].map((x, i) => {
              const height = 68 + (i % 3) * 8 + ((i % 2) * 5);
              const treeHeight = 12 + (i % 3) * 3;
              return (
                <g key={i} transform={`translate(${x}, ${height})`}>
                  {/* Tree trunk */}
                  <rect x="-1.5" y="0" width="3" height={treeHeight} fill="hsl(var(--wine-brown))" opacity="0.6"/>
                  {/* Tree foliage - cypress-like shape */}
                  <ellipse cx="0" cy="-4" rx="6" ry="10" fill="hsl(var(--wine-bronze))" opacity="0.5"/>
                  <ellipse cx="0" cy="-8" rx="5" ry="8" fill="hsl(var(--wine-bronze))" opacity="0.6"/>
                  <ellipse cx="0" cy="-12" rx="3" ry="5" fill="hsl(var(--wine-bronze))" opacity="0.5"/>
                </g>
              );
            })}
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
