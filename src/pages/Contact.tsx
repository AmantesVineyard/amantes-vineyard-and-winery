import Navigation from "@/components/Navigation";
import HanukkahBanner from "@/components/HanukkahBanner";
import Footer from "@/components/Footer";
import GrapevineSVG from "@/components/GrapevineSVG";
import heroContactImage from "@/assets/hero-contact-2.png";
import heroWaveBorder from "@/assets/hero-wave-border.svg";
import { Phone, Mail, MapPin } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import { useParallax } from "@/hooks/use-parallax";

const Contact = () => {
  const parallaxOffset = useParallax(0.5);
  return (
    <div className="min-h-screen bg-wine-cream">
      <Navigation transparent />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image - positioned lower */}
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ 
            backgroundImage: `url(${heroContactImage})`,
            backgroundPosition: 'center 60%',
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
          <AnimatedText 
            text="Contact"
            className="text-6xl md:text-7xl lg:text-8xl font-serif text-white leading-tight"
            style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}
          />
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 relative">
        {/* Decorative Vines Around Content */}
        <div className="absolute left-4 top-10 w-16 h-96 pointer-events-none hidden md:block">
          <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-60" />
        </div>
        <div className="absolute right-4 top-20 w-16 h-96 pointer-events-none hidden md:block">
          <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-60" />
        </div>
        <div className="absolute left-8 top-[500px] w-20 h-80 pointer-events-none hidden lg:block">
          <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-40" />
        </div>
        <div className="absolute right-8 top-[650px] w-20 h-80 pointer-events-none hidden lg:block">
          <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-40" />
        </div>
        
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-wine-deep mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-wine-slate/80 leading-relaxed max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have questions about our wines, 
              want to schedule a tasting, or are interested in hosting an event, 
              we're here to help.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white/50 border border-wine-bronze/20">
              <Phone className="w-12 h-12 text-wine-bronze mx-auto mb-4" />
              <h3 className="text-xl font-serif text-wine-deep mb-3">
                Phone
              </h3>
              <a 
                href="tel:+1234567890" 
                className="text-wine-slate/80 hover:text-wine-bronze transition-colors"
              >
                (123) 456-7890
              </a>
            </div>
            
            <div className="text-center p-8 bg-white/50 border border-wine-bronze/20">
              <Mail className="w-12 h-12 text-wine-bronze mx-auto mb-4" />
              <h3 className="text-xl font-serif text-wine-deep mb-3">
                Email
              </h3>
              <a 
                href="mailto:info@amantesvineyard.com" 
                className="text-wine-slate/80 hover:text-wine-bronze transition-colors break-all"
              >
                info@amantesvineyard.com
              </a>
            </div>
            
            <div className="text-center p-8 bg-white/50 border border-wine-bronze/20">
              <MapPin className="w-12 h-12 text-wine-bronze mx-auto mb-4" />
              <h3 className="text-xl font-serif text-wine-deep mb-3">
                Location
              </h3>
              <p className="text-wine-slate/80">
                Temecula Valley<br />
                California
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-wine-bronze/30 p-8 md:p-12">
            <h3 className="text-3xl font-serif text-wine-deep mb-8 text-center">
              Send Us a Message
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-wine-deep mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-wine-bronze/30 focus:border-wine-bronze focus:outline-none focus:ring-2 focus:ring-wine-bronze/20 transition-colors bg-wine-cream"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-wine-deep mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-wine-bronze/30 focus:border-wine-bronze focus:outline-none focus:ring-2 focus:ring-wine-bronze/20 transition-colors bg-wine-cream"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-wine-deep mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-wine-bronze/30 focus:border-wine-bronze focus:outline-none focus:ring-2 focus:ring-wine-bronze/20 transition-colors bg-wine-cream"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-wine-deep mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-wine-bronze/30 focus:border-wine-bronze focus:outline-none focus:ring-2 focus:ring-wine-bronze/20 transition-colors resize-none bg-wine-cream"
                  required
                ></textarea>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-wine-bronze hover:bg-wine-gold text-white px-12 py-4 text-base tracking-wider uppercase transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      <HanukkahBanner />
      <Footer />
    </div>
  );
};

export default Contact;
