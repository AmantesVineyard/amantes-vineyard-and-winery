import heroTeamImage from "@/assets/hero-team-7.png";
import { useParallax } from "@/hooks/use-parallax";
import heroWaveBorder from "@/assets/hero-wave-border.svg";

const HeroTeam = () => {
  const parallaxOffset = useParallax(0.5);
  
  return (
    <section id="team" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
        style={{ 
          backgroundImage: `url(${heroTeamImage})`,
          transform: `translateY(${parallaxOffset}px)`
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
        <div className="text-center px-4 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight drop-shadow-2xl">
            Winemaking Team
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mt-4 drop-shadow-lg">
            Our family makes great wine
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroTeam;
