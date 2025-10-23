import heroAboutImage from "@/assets/hero-about.png";

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

      {/* Organic Bottom Border SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path 
            d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,120 L0,120 Z" 
            fill="hsl(var(--wine-cream))"
            opacity="1"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight drop-shadow-lg">
            Four Generations of Persian Winemaking
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
