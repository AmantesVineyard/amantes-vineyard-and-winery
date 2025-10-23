import heroAboutImage from "@/assets/hero-3gen-about.png";

const HeroAbout = () => {
  return (
    <section id="about" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroAboutImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-wine-cream/60" />
      </div>

      {/* Organic Bottom Border SVG - Rolling Hills */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg 
          viewBox="0 0 1440 140" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          {/* Decorative leaf elements on top */}
          <g opacity="0.9">
            <ellipse cx="390" cy="8" rx="8" ry="12" fill="hsl(var(--wine-cream))" />
            <ellipse cx="420" cy="12" rx="6" ry="10" fill="hsl(var(--wine-cream))" />
            <ellipse cx="270" cy="15" rx="5" ry="8" fill="hsl(var(--wine-cream))" opacity="0.8" />
            <ellipse cx="285" cy="18" rx="4" ry="7" fill="hsl(var(--wine-cream))" opacity="0.7" />
            <ellipse cx="1320" cy="10" rx="7" ry="11" fill="hsl(var(--wine-cream))" />
            <ellipse cx="1340" cy="14" rx="5" ry="9" fill="hsl(var(--wine-cream))" opacity="0.8" />
          </g>
          
          {/* Thin dark wavy line */}
          <path 
            d="M0,25 Q180,15 360,22 T720,20 T1080,24 T1440,22" 
            stroke="hsl(var(--wine-brown))"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          
          {/* Back hill layer */}
          <path 
            d="M0,65 Q360,25 720,55 T1440,50 L1440,140 L0,140 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="0.4"
          />
          {/* Middle hill layer */}
          <path 
            d="M0,75 Q240,40 480,65 T960,60 T1440,70 L1440,140 L0,140 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="0.7"
          />
          {/* Front hill layer */}
          <path 
            d="M0,80 Q180,50 360,75 T720,70 T1080,80 T1440,75 L1440,140 L0,140 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="1"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight drop-shadow-lg">
            Three Generations<br />of Persian<br />Winemaking
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
