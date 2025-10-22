import heroImage from "@/assets/vineyard-hero.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/60 via-wine-deep/40 to-wine-deep/80" />
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
            fill="hsl(var(--wine-deep))"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          {/* Decorative Element */}
          <div className="mb-8 flex justify-center">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path 
                d="M30 5 L35 15 L45 10 L40 20 L50 25 L40 30 L45 40 L35 35 L30 45 L25 35 L15 40 L20 30 L10 25 L20 20 L15 10 L25 15 Z" 
                stroke="hsl(var(--wine-bronze))" 
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          <h2 className="text-sm md:text-base tracking-[0.3em] text-wine-bronze uppercase mb-6 font-sans">
            Quality Wine from
          </h2>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-wine-cream mb-8 leading-tight">
            Organically Grown Grapes
          </h1>
          
          <p className="text-lg md:text-xl text-wine-cream/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Experience the finest selection of wines crafted with passion and tradition in the heart of the valley
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#wines"
              className="px-8 py-4 bg-wine-bronze text-wine-deep font-semibold tracking-wider hover:bg-wine-gold transition-all duration-300 uppercase text-sm"
            >
              Explore Wines
            </a>
            <a 
              href="#experiences"
              className="px-8 py-4 border-2 border-wine-bronze text-wine-bronze hover:bg-wine-bronze hover:text-wine-deep transition-all duration-300 uppercase text-sm tracking-wider font-semibold"
            >
              Book a Tour
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
