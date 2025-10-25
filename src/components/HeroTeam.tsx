import heroTeamImage from "@/assets/hero-team3.png";
import { useParallax } from "@/hooks/use-parallax";
import heroWaveBorder from "@/assets/hero-wave-border.svg";

const HeroTeam = () => {
  const parallaxOffset = useParallax(0.5);
  
  return (
    <section id="team" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-100"
        style={{ 
          backgroundImage: `url(${heroTeamImage})`,
          transform: `translateY(${parallaxOffset}px)`,
          backgroundPosition: 'center center',
          backgroundSize: window.innerWidth < 768 && window.innerHeight > window.innerWidth ? '150%' : 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Organic Bottom Border SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-10 animate-fade-in">
        <img 
          src={heroWaveBorder}
          alt=""
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(4.7px 1.7px 7px rgba(0, 0, 0, 0.75))' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center" style={{ marginTop: '140px' }}>
        <div className="text-center px-4 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>          
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight"
            style={{ filter: 'drop-shadow(4.7px 1.7px 7px rgba(0, 0, 0, 0.75))' }}
          >
            Winemaking Team
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroTeam;
