import heroImage from "@/assets/hero-home.png";
import { useParallax } from "@/hooks/use-parallax";
import heroWaveBorder from "@/assets/hero-wave-border.svg";

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
            Temecula's only kosher vineyard
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
