import Navigation from "@/components/Navigation";
import HanukkahBanner from "@/components/HanukkahBanner";
import Footer from "@/components/Footer";
import GrapevineSVG from "@/components/GrapevineSVG";
import heroContactImage from "@/assets/hero-contact-2.png";
import heroWaveBorder from "@/assets/hero-wave-border.svg";
import { Phone, Mail, MapPin } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import { useParallax } from "@/hooks/use-parallax";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/StructuredData";

const Contact = () => {
  const parallaxOffset = useParallax(0.5);
  return (
    <>
      <SEO 
        title="Contact Amantes Vineyard | Temecula Kosher Winery"
        description="Contact Amantes Vineyard for wine tastings, events, and inquiries. Visit Temecula's only kosher vineyard. Call +1 (866) 657-3411 or email info@amantesvineyard.com."
        canonical="/contact"
        keywords="contact Amantes Vineyard, Temecula winery phone, kosher wine tasting, wine events Temecula"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" }
      ]} />
      
      <div className="min-h-screen bg-wine-cream">
        <a href="#contact-info" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-wine-deep text-white px-4 py-2 z-50">
          Skip to contact information
        </a>
        <Navigation transparent />
        
        {/* Hero Section */}
        <header className="relative h-screen w-full overflow-hidden">
          {/* Background Image - positioned lower */}
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale"
            style={{ 
              backgroundImage: `url(${heroContactImage})`,
              backgroundPosition: 'center 60%',
              transform: `translateY(${parallaxOffset}px)`
            }}
            role="img"
            aria-label="Amantes Vineyard vintage telephone representing customer service"
          />

          {/* Organic Bottom Border SVG */}
          <div className="absolute bottom-0 left-0 right-0 z-10 animate-fade-in" aria-hidden="true">
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
        </header>

        {/* Contact Information Section */}
        <main id="contact-info" className="py-20 relative">
          <h1 className="sr-only">Contact Amantes Vineyard and Winery</h1>
          
          {/* Decorative Vines Around Content */}
          <div className="absolute left-4 top-10 w-16 h-96 pointer-events-none hidden md:block" aria-hidden="true">
            <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-60" />
          </div>
          <div className="absolute right-4 top-20 w-16 h-96 pointer-events-none hidden md:block" aria-hidden="true">
            <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-60" />
          </div>
          <div className="absolute left-8 top-[500px] w-20 h-80 pointer-events-none hidden lg:block" aria-hidden="true">
            <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-40" />
          </div>
          <div className="absolute right-8 top-[650px] w-20 h-80 pointer-events-none hidden lg:block" aria-hidden="true">
            <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-40" />
          </div>
          
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Introduction */}
            <section className="text-center mb-16" aria-labelledby="get-in-touch">
              <h2 id="get-in-touch" className="text-4xl md:text-5xl font-serif text-wine-deep mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-wine-slate/80 leading-relaxed max-w-2xl mx-auto">
                We'd love to hear from you. Whether you have questions about our wines, 
                want to schedule a tasting, or are interested in hosting an event, 
                we're here to help.
              </p>
            </section>

            {/* Contact Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" aria-label="Contact methods">
              <article className="text-center p-8 bg-white/50 border border-wine-bronze/20">
                <Phone className="w-12 h-12 text-wine-bronze mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-serif text-wine-deep mb-3">
                  Phone
                </h3>
                <a 
                  href="tel:+18666573411" 
                  className="text-wine-slate/80 hover:text-wine-bronze transition-colors"
                  aria-label="Call Amantes Vineyard at 1-866-657-3411"
                >
                  +1 (866) 657-3411
                </a>
              </article>
              
              <article className="text-center p-8 bg-white/50 border border-wine-bronze/20">
                <Mail className="w-12 h-12 text-wine-bronze mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-serif text-wine-deep mb-3">
                  Email
                </h3>
                <a 
                  href="mailto:info@amantesvineyard.com" 
                  className="text-wine-slate/80 hover:text-wine-bronze transition-colors break-all"
                  aria-label="Email Amantes Vineyard"
                >
                  info@amantesvineyard.com
                </a>
              </article>
              
              <article className="text-center p-8 bg-white/50 border border-wine-bronze/20">
                <MapPin className="w-12 h-12 text-wine-bronze mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-serif text-wine-deep mb-3">
                  Location
                </h3>
                <address className="text-wine-slate/80 not-italic">
                  Temecula Valley<br />
                  California
                </address>
              </article>
            </section>

            {/* Contact Form */}
            <section className="bg-white border border-wine-bronze/30 p-8 md:p-12" aria-labelledby="contact-form-heading">
              <h3 id="contact-form-heading" className="text-3xl font-serif text-wine-deep mb-8 text-center">
                Send Us a Message
              </h3>
              
              <form className="space-y-6" aria-label="Contact form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-wine-deep mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-wine-bronze/30 focus:border-wine-bronze focus:outline-none focus:ring-2 focus:ring-wine-bronze/20 transition-colors bg-wine-cream"
                      required
                      aria-required="true"
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
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-wine-bronze/30 focus:border-wine-bronze focus:outline-none focus:ring-2 focus:ring-wine-bronze/20 transition-colors bg-wine-cream"
                      required
                      aria-required="true"
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
                    aria-required="true"
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
                    aria-required="true"
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
            </section>

          </div>
        </main>

        <HanukkahBanner />
        <Footer />
      </div>
    </>
  );
};

export default Contact;
