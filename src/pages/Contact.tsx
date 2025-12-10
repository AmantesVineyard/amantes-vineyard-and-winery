import Navigation from "@/components/Navigation";
import HanukkahBanner from "@/components/HanukkahBanner";
import Footer from "@/components/Footer";
import GrapevineSVG from "@/components/GrapevineSVG";
import heroContactImage from "@/assets/hero-contact-2.png";
import heroWaveBorder from "@/assets/hero-wave-border.svg";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import { useParallax } from "@/hooks/use-parallax";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, WebPageSchema, FAQSchema } from "@/components/StructuredData";
import { Helmet } from "react-helmet-async";

const contactFAQs = [
  {
    question: "What are Amantes Vineyard's hours of operation?",
    answer: "Amantes Vineyard is open Monday through Friday from 10:00 AM to 5:00 PM, and weekends from 10:00 AM to 6:00 PM. We recommend calling ahead to schedule wine tastings."
  },
  {
    question: "How can I schedule a wine tasting at Amantes Vineyard?",
    answer: "You can schedule a wine tasting by calling us at +1 (866) 657-3411 or emailing info@amantesvineyard.com. We offer private tastings and group events at our Temecula Valley location."
  },
  {
    question: "Does Amantes Vineyard ship wine?",
    answer: "Yes! We offer direct shipping through our online store. Visit our Buy Wine page to order premium kosher wines delivered to your door. Shipping availability varies by state."
  }
];

// LocalBusiness Contact Page Schema
const ContactPageSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Amantes Vineyard",
    "description": "Contact information for Amantes Vineyard and Winery in Temecula, California",
    "url": "https://amantesvineyard.com/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Amantes Vineyard and Winery",
      "telephone": "+1-866-657-3411",
      "email": "info@amantesvineyard.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "40420 Calle Concion",
        "addressLocality": "Temecula",
        "addressRegion": "CA",
        "postalCode": "92592",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 33.4936,
        "longitude": -117.1484
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "10:00",
          "closes": "17:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "10:00",
          "closes": "18:00"
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

const Contact = () => {
  const parallaxOffset = useParallax(0.5);
  return (
    <>
      <SEO 
        title="Contact Amantes Vineyard | Temecula Kosher Winery"
        description="Contact Amantes Vineyard for wine tastings, events, and inquiries. Visit Temecula's only kosher vineyard. Call +1 (866) 657-3411 or email info@amantesvineyard.com."
        canonical="/contact"
        keywords="contact Amantes Vineyard, Temecula winery phone, kosher wine tasting, wine events Temecula, visit Amantes winery"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" }
      ]} />
      <WebPageSchema 
        name="Contact Us"
        description="Get in touch with Amantes Vineyard for wine tastings, events, and inquiries."
        url="/contact"
      />
      <ContactPageSchema />
      <FAQSchema faqs={contactFAQs} />
      
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
              text="Contact Us"
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
                Get in Touch With Amantes Vineyard
              </h2>
              <p className="text-lg text-wine-slate/80 leading-relaxed max-w-2xl mx-auto">
                We'd love to hear from you. Whether you have questions about our <strong>kosher wines</strong>, 
                want to schedule a <strong>wine tasting in Temecula</strong>, or are interested in hosting a private event, 
                our team is here to help.
              </p>
            </section>

            {/* Contact Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" aria-label="Contact methods">
              <article className="text-center p-6 bg-white/50 border border-wine-bronze/20">
                <Phone className="w-10 h-10 text-wine-bronze mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-lg font-serif text-wine-deep mb-2">
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
              
              <article className="text-center p-6 bg-white/50 border border-wine-bronze/20">
                <Mail className="w-10 h-10 text-wine-bronze mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-lg font-serif text-wine-deep mb-2">
                  Email
                </h3>
                <a 
                  href="mailto:info@amantesvineyard.com" 
                  className="text-wine-slate/80 hover:text-wine-bronze transition-colors text-sm"
                  aria-label="Email Amantes Vineyard"
                >
                  info@amantesvineyard.com
                </a>
              </article>
              
              <article className="text-center p-6 bg-white/50 border border-wine-bronze/20">
                <MapPin className="w-10 h-10 text-wine-bronze mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-lg font-serif text-wine-deep mb-2">
                  Location
                </h3>
                <address className="text-wine-slate/80 not-italic text-sm">
                  Temecula Valley<br />
                  California 92592
                </address>
              </article>

              <article className="text-center p-6 bg-white/50 border border-wine-bronze/20">
                <Clock className="w-10 h-10 text-wine-bronze mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-lg font-serif text-wine-deep mb-2">
                  Hours
                </h3>
                <p className="text-wine-slate/80 text-sm">
                  Mon-Fri: 10am-5pm<br />
                  Sat-Sun: 10am-6pm
                </p>
              </article>
            </section>

            {/* Contact Form */}
            <section className="bg-white border border-wine-bronze/30 p-8 md:p-12 mb-16" aria-labelledby="contact-form-heading">
              <h3 id="contact-form-heading" className="text-3xl font-serif text-wine-deep mb-8 text-center">
                Send Us a Message
              </h3>
              
              <form className="space-y-6" aria-label="Contact form" action="mailto:info@amantesvineyard.com" method="POST" encType="text/plain">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-wine-deep mb-2 font-medium">
                      Name <span className="text-red-500" aria-hidden="true">*</span>
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
                      Email <span className="text-red-500" aria-hidden="true">*</span>
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
                    Subject <span className="text-red-500" aria-hidden="true">*</span>
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
                    Message <span className="text-red-500" aria-hidden="true">*</span>
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

            {/* FAQ Section */}
            <section aria-labelledby="contact-faq">
              <h3 id="contact-faq" className="text-2xl font-serif text-wine-deep mb-6 text-center">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {contactFAQs.map((faq, index) => (
                  <article key={index} className="bg-white p-6 border border-wine-bronze/20">
                    <h4 className="text-lg font-serif text-wine-deep mb-2">{faq.question}</h4>
                    <p className="text-wine-slate/80 leading-relaxed">{faq.answer}</p>
                  </article>
                ))}
              </div>
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