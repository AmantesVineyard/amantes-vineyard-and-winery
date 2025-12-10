import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WineShowcase from "@/components/WineShowcase";
import Experience from "@/components/Experience";
import HanukkahBanner from "@/components/HanukkahBanner";
import Footer from "@/components/Footer";
import GrapevineSVG from "@/components/GrapevineSVG";
import SEO from "@/components/SEO";
import { WinerySchema, OrganizationSchema, WebSiteSchema, NavigationSchema, FAQSchema } from "@/components/StructuredData";
import { ArrowRight } from "lucide-react";

// Homepage FAQs for rich snippets
const homepageFAQs = [
  {
    question: "Is Amantes Vineyard the only kosher winery in Temecula?",
    answer: "Yes, Amantes Vineyard and Winery is Temecula's one and only kosher vineyard and winery. We produce premium kosher wines under strict rabbinical supervision, making us unique in the Temecula Valley wine region."
  },
  {
    question: "What types of kosher wine does Amantes Vineyard produce?",
    answer: "Amantes Vineyard specializes in premium kosher Merlot wines, including our 3Girlfriends Limited Reserve, Toi et Moi Merlot, and LeParlay Merlot. All our wines are mevushal and certified kosher."
  },
  {
    question: "Can I visit Amantes Vineyard for wine tasting?",
    answer: "Yes! Amantes Vineyard welcomes visitors for wine tastings in beautiful Temecula Valley wine country. Contact us at +1 (866) 657-3411 or email info@amantesvineyard.com to schedule your visit."
  },
  {
    question: "What is the history behind Amantes Vineyard?",
    answer: "Amantes Vineyard continues a 2,500-year Persian Jewish winemaking tradition. Founded by Dr. Joseph Nassir, our winery represents four generations of family winemaking expertise, from ancient Persia to California's Temecula Valley."
  }
];

const Index = () => {
  return (
    <>
      <SEO 
        title="Amantes Vineyard - Temecula's Only Kosher Winery | Premium Kosher Wines"
        description="Discover Temecula's only kosher vineyard. Experience 3 generations of Persian Jewish winemaking tradition. Premium kosher Merlot and boutique wines in California wine country."
        canonical="/"
        keywords="kosher winery Temecula, kosher vineyard California, Persian Jewish wine, kosher Merlot, Amantes Vineyard, boutique kosher wines, Temecula wine country, mevushal wine, kosher wine shop, Jewish winery"
      />
      <WebSiteSchema />
      <WinerySchema />
      <OrganizationSchema />
      <NavigationSchema />
      <FAQSchema faqs={homepageFAQs} />
      
      <div className="min-h-screen bg-wine-cream overflow-x-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-wine-deep text-white px-4 py-2 z-50">
          Skip to main content
        </a>
        <Navigation />
        <Hero />
        <main id="main-content">
          {/* Introduction Section - Improves HTML to content ratio */}
          <section className="py-16 bg-wine-cream" aria-labelledby="intro-heading">
            <div className="container mx-auto px-8 lg:px-16 max-w-4xl text-center">
              <h1 id="intro-heading" className="text-4xl md:text-5xl font-serif text-wine-deep mb-8">
                Welcome to Amantes Vineyard & Winery
              </h1>
              <p className="text-lg text-wine-slate/80 leading-relaxed mb-6">
                Nestled in the heart of <strong>Temecula Valley Wine Country</strong>, Amantes Vineyard is proud to be the region's <em>one and only kosher vineyard and winery</em>. Our premium kosher wines are crafted with passion, precision, and a deep respect for three generations of Persian Jewish winemaking tradition.
              </p>
              <p className="text-lg text-wine-slate/80 leading-relaxed mb-8">
                Every bottle from Amantes tells a story—of ancient heritage, family devotion, and the sacred art of transforming sun-kissed California grapes into wines worthy of your most cherished celebrations. From Shabbat dinners to holiday gatherings, our kosher Merlot collection brings tradition and taste together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="/wines"
                  className="inline-flex items-center gap-2 bg-wine-bronze hover:bg-wine-gold text-white px-8 py-3 transition-colors duration-300"
                >
                  <span className="tracking-wider uppercase text-sm font-semibold">Explore Our Wines</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a 
                  href="/about"
                  className="inline-flex items-center gap-2 border-2 border-wine-bronze text-wine-bronze hover:bg-wine-bronze hover:text-white px-8 py-3 transition-colors duration-300"
                >
                  <span className="tracking-wider uppercase text-sm font-semibold">Our Story</span>
                </a>
              </div>
            </div>
          </section>

          <WineShowcase />
          
          {/* Why Choose Kosher Wine Section */}
          <section className="py-20 bg-white" aria-labelledby="why-kosher">
            <div className="container mx-auto px-8 lg:px-16 max-w-5xl">
              <h2 id="why-kosher" className="text-3xl md:text-4xl font-serif text-wine-deep mb-8 text-center">
                Why Choose Amantes Kosher Wines?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <article className="text-center p-6">
                  <h3 className="text-xl font-serif text-wine-deep mb-4">Certified Kosher</h3>
                  <p className="text-wine-slate/80">
                    All wines produced under strict rabbinical supervision. Our mevushal wines maintain their kosher status regardless of who handles them.
                  </p>
                </article>
                <article className="text-center p-6">
                  <h3 className="text-xl font-serif text-wine-deep mb-4">Premium Quality</h3>
                  <p className="text-wine-slate/80">
                    Handcrafted in small batches using estate-grown grapes from Temecula's unique microclimate. French oak barrel aging for exceptional flavor.
                  </p>
                </article>
                <article className="text-center p-6">
                  <h3 className="text-xl font-serif text-wine-deep mb-4">Heritage & Tradition</h3>
                  <p className="text-wine-slate/80">
                    Four generations of Persian Jewish winemaking expertise. A 2,500-year legacy from ancient Persia to California wine country.
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* FAQ Section for SEO */}
          <section className="py-16 bg-wine-cream" aria-labelledby="faq-heading">
            <div className="container mx-auto px-8 lg:px-16 max-w-4xl">
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-serif text-wine-deep mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {homepageFAQs.map((faq, index) => (
                  <article key={index} className="bg-white p-6 border border-wine-bronze/20">
                    <h3 className="text-lg font-serif text-wine-deep mb-3">{faq.question}</h3>
                    <p className="text-wine-slate/80 leading-relaxed">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <HanukkahBanner />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;