import heroAboutImage from "@/assets/hero-3gen-about.png";
import heroWaveBorder from "@/assets/hero-wave-border.svg";

const HeroAbout = () => {
  return (
    <section id="about" className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url(${heroAboutImage})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Organic Bottom Border SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <img 
          src={heroWaveBorder}
          alt=""
          className="w-full h-auto drop-shadow-2xl"
        />
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
