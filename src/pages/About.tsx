import Navigation from "@/components/Navigation";
import HeroAbout from "@/components/HeroAbout";
import Footer from "@/components/Footer";
import generationsImage from "@/assets/about-images-gens.png";
import GrapevineSVG from "@/components/GrapevineSVG";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, WebPageSchema, FAQSchema } from "@/components/StructuredData";

const aboutFAQs = [
  {
    question: "What makes Amantes Vineyard unique?",
    answer: "Amantes Vineyard is Temecula's only kosher vineyard and winery, combining 2,500 years of Persian Jewish winemaking tradition with modern California viticulture. Our wines are produced under strict rabbinical supervision and aged in French oak barrels."
  },
  {
    question: "Who founded Amantes Vineyard?",
    answer: "Amantes Vineyard was founded by Dr. Joseph Nassir in 2019. Dr. Nassir learned the ancient craft of kosher winemaking from his grandfather in Iran, continuing a four-generation family tradition."
  },
  {
    question: "Where is Amantes Vineyard located?",
    answer: "Amantes Vineyard is located in the beautiful Temecula Valley wine region of Southern California, known for its ideal Mediterranean climate and exceptional grape-growing conditions."
  }
];

const About = () => {
  return (
    <>
      <SEO 
        title="About Amantes Vineyard | Persian Jewish Winemaking Heritage"
        description="Learn about Amantes Vineyard's 3 generations of Persian Jewish winemaking tradition. From ancient Persia to Temecula Valley, discover our kosher winery story."
        canonical="/about"
        keywords="about Amantes Vineyard, Persian Jewish winemaking, kosher winery history, Temecula vineyard story, Nassir family winery, kosher wine heritage"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "About", url: "/about" }
      ]} />
      <WebPageSchema 
        name="About Amantes Vineyard"
        description="Learn about our Persian Jewish winemaking heritage and the story of Temecula's only kosher vineyard."
        url="/about"
      />
      <FAQSchema faqs={aboutFAQs} />
      
      <div className="min-h-screen bg-wine-cream">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-wine-deep text-white px-4 py-2 z-50">
          Skip to main content
        </a>
        <Navigation />
        <HeroAbout />
        
        {/* Content Sections */}
        <main id="main-content">
          <article className="py-20 px-4 pb-32 relative" itemScope itemType="https://schema.org/Article">
            <meta itemProp="author" content="Amantes Vineyard and Winery" />
            <meta itemProp="datePublished" content="2024-01-01" />
            
            {/* Decorative Vines Around Content */}
            <div className="absolute left-4 top-10 w-16 h-96 pointer-events-none hidden md:block" aria-hidden="true">
              <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-60" />
            </div>
            <div className="absolute right-4 top-32 w-16 h-96 pointer-events-none hidden md:block" aria-hidden="true">
              <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-60" />
            </div>
            <div className="absolute left-8 top-[600px] w-20 h-80 pointer-events-none hidden lg:block" aria-hidden="true">
              <GrapevineSVG side="left" className="!w-full !h-full !relative opacity-40" />
            </div>
            <div className="absolute right-8 top-[800px] w-20 h-80 pointer-events-none hidden lg:block" aria-hidden="true">
              <GrapevineSVG side="right" className="!w-full !h-full !relative opacity-40" />
            </div>
            
            <div className="container mx-auto max-w-4xl">
              {/* Introduction */}
              <section className="mb-16" aria-labelledby="legacy-heading">
                <h1 id="legacy-heading" className="text-4xl md:text-5xl font-serif text-wine-deep mb-8" itemProp="headline">
                  A Legacy Rooted in Heritage and Heart
                </h1>
                <div className="space-y-6 text-wine-slate leading-relaxed" itemProp="articleBody">
                  <p>
                    <strong>Amantes Vineyard & Winery</strong> is nestled in the rolling hills of <strong>Temecula Valley, California</strong>, where warm, sunny days and cool evening breezes create the perfect balance for cultivating exceptional grapes. This rare microclimate gives rise to naturally semi-sweet wines — crafted without blending, preserving the pure essence of each varietal.
                  </p>
                  <p>
                    Our boutique winery embraces the art of single-varietal winemaking, ensuring every bottle reflects the land's authentic character and the deep passion behind our process. Every French Oak barrel in our cellar — all <em>Kosher for Passover</em> — rests under precise temperature and humidity control, carefully monitored to achieve perfection in both taste and aroma.
                  </p>
                </div>
              </section>

              {/* Persian-Jewish Legacy */}
              <section className="mb-16" aria-labelledby="persian-legacy-heading">
                <h2 id="persian-legacy-heading" className="text-4xl md:text-5xl font-serif text-wine-deep mb-8">
                  The Persian-Jewish Winemaking Legacy
                </h2>
                <div className="space-y-6 text-wine-slate leading-relaxed">
                  <figure className="float-left mr-6 mb-8">
                    <img 
                      src={generationsImage} 
                      alt="Four generations of the Nassir family winemakers spanning from Persia to California" 
                      className="w-48 md:w-60 rounded-lg"
                      loading="lazy"
                      width="240"
                      height="320"
                    />
                    <figcaption className="text-sm text-wine-slate/60 mt-2 text-center">Four generations of winemaking tradition</figcaption>
                  </figure>
                  <p>
                    The story of Amantes begins over <strong>2,500 years ago</strong>, when King Cyrus the Great liberated the Jewish people from Babylon. From that moment, Persian Jews embraced winemaking as both an art and a sacred ritual, producing <strong>kosher wine</strong> for Shabbat and holidays — a symbol of joy, faith, and gratitude.
                  </p>
                  <p>
                    Among those guardians of tradition was the <strong>Nassir family</strong>, whose patriarch Nissan ben Yosef lived in the late 1800s in Kashan and Isfahan, Persia (modern-day Iran). By day, he was a textile merchant; by night, a passionate winemaker. With his brothers and children, Nissan would crush grapes by hand, fermenting them in clay barrels nearly as tall as he was — an ancient technique that produced wines of natural semi-sweetness and a distinctive amber hue.
                  </p>
                  <p>
                    His son, Yosef ben Nissan, continued the family craft with the same devotion. Even during the turbulent 1970s and 1980s in Iran, when winemaking nearly vanished, the Nassir family's passion endured — an ember waiting to reignite.
                  </p>
                </div>
              </section>

              {/* Revival */}
              <section className="mb-16" aria-labelledby="revival-heading">
                <h2 id="revival-heading" className="text-4xl md:text-5xl font-serif text-wine-deep mb-8">
                  From Persia to Temecula — A Revival
                </h2>
                <div className="space-y-6 text-wine-slate leading-relaxed">
                  <p>
                    That spark found new life in <strong>Dr. Joseph (Yosef ben Nissan) Nassir</strong>, who, after a career in medicine, rekindled his family's winemaking legacy. In <time dateTime="2019">2019</time>, he purchased a vineyard in <strong>Temecula Valley</strong>, dedicating it to producing fine kosher boutique wines that honor both Jewish tradition and Persian craftsmanship.
                  </p>
                  <p>
                    Today, <strong>Amantes Vineyard & Winery</strong> represents the perfect harmony of old-world tradition and California innovation. Guided by values of <em>Tikkun Olam</em> — repairing the world — our sustainable winemaking practices ensure that every step, from soil to bottle, reflects respect for creation and community.
                  </p>
                </div>
              </section>

              {/* Temecula Renaissance */}
              <section className="mb-16" aria-labelledby="renaissance-heading">
                <h2 id="renaissance-heading" className="text-4xl md:text-5xl font-serif text-wine-deep mb-8">
                  The Temecula Wine Country Renaissance
                </h2>
                <div className="space-y-6 text-wine-slate leading-relaxed">
                  <p>
                    Over the past decade, <strong>Temecula Valley Wine Country</strong> has flourished, standing proudly alongside California's renowned regions like Napa and Sonoma. Amantes contributes to this renaissance — blending heritage, artistry, and purpose to create wines that are not just tasted, but felt.
                  </p>
                  <p>
                    From our hillside vines to your Shabbat table, every glass tells a story — of perseverance, heritage, and the sweetness of coming home.
                  </p>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mb-16" aria-labelledby="about-faq">
                <h2 id="about-faq" className="text-3xl font-serif text-wine-deep mb-8">Common Questions About Amantes</h2>
                <div className="space-y-6">
                  {aboutFAQs.map((faq, index) => (
                    <article key={index} className="bg-white p-6 border border-wine-bronze/20">
                      <h3 className="text-lg font-serif text-wine-deep mb-3">{faq.question}</h3>
                      <p className="text-wine-slate/80 leading-relaxed">{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </section>

              {/* Closing */}
              <aside className="text-center">
                <p className="text-2xl md:text-3xl font-serif text-wine-bronze italic">
                  L'Chaim — To life, to legacy, and to love.
                </p>
              </aside>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;