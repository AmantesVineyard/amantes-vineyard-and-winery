import Navigation from "@/components/Navigation";
import HeroAbout from "@/components/HeroAbout";
import Footer from "@/components/Footer";
import generationsImage from "@/assets/about-images-gens.png";

const About = () => {
  return (
    <div className="min-h-screen bg-wine-cream">
      <Navigation />
      <HeroAbout />
      
      {/* Content Sections */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Introduction */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-wine-deep mb-8">
              A Legacy Rooted in Heritage and Heart
            </h2>
            <div className="space-y-6 text-wine-slate leading-relaxed">
              <p>
                Amantes Vineyard & Winery is nestled in the rolling hills of Temecula Valley, California, where warm, sunny days and cool evening breezes create the perfect balance for cultivating exceptional grapes. This rare microclimate gives rise to naturally semi-sweet wines — crafted without blending, preserving the pure essence of each varietal.
              </p>
              <p>
                Our boutique winery embraces the art of single-varietal winemaking, ensuring every bottle reflects the land's authentic character and the deep passion behind our process. Every French Oak barrel in our cellar — all Kosher for Passover — rests under precise temperature and humidity control, carefully monitored to achieve perfection in both taste and aroma.
              </p>
            </div>
          </div>

          {/* Persian-Jewish Legacy */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-wine-deep mb-8">
              The Persian-Jewish Winemaking Legacy
            </h2>
            <div className="space-y-6 text-wine-slate leading-relaxed">
              <img 
                src={generationsImage} 
                alt="Four generations of the Nassir family winemakers" 
                className="float-left mr-6 mb-8 w-48 md:w-60 rounded-lg"
              />
              <p>
                The story of Amantes begins over 2,500 years ago, when King Cyrus the Great liberated the Jewish people from Babylon. From that moment, Persian Jews embraced winemaking as both an art and a sacred ritual, producing kosher wine for Shabbat and holidays — a symbol of joy, faith, and gratitude.
              </p>
              <p>
                Among those guardians of tradition was the Nassir family, whose patriarch Nissan ben Yosef lived in the late 1800s in Kashan and Isfahan, Persia (modern-day Iran). By day, he was a textile merchant; by night, a passionate winemaker. With his brothers and children, Nissan would crush grapes by hand, fermenting them in clay barrels nearly as tall as he was — an ancient technique that produced wines of natural semi-sweetness and a distinctive amber hue.
              </p>
              <p>
                His son, Yosef ben Nissan, continued the family craft with the same devotion. Even during the turbulent 1970s and 1980s in Iran, when winemaking nearly vanished, the Nassir family's passion endured — an ember waiting to reignite.
              </p>
            </div>
          </div>

          {/* Revival */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-wine-deep mb-8">
              From Persia to Temecula — A Revival
            </h2>
            <div className="space-y-6 text-wine-slate leading-relaxed">
              <p>
                That spark found new life in Dr. Joseph (Yosef ben Nissan) Nassir, who, after a career in medicine, rekindled his family's winemaking legacy. In 2019, he purchased a vineyard in Temecula Valley, dedicating it to producing fine kosher boutique wines that honor both Jewish tradition and Persian craftsmanship.
              </p>
              <p>
                Today, Amantes Vineyard & Winery represents the perfect harmony of old-world tradition and California innovation. Guided by values of Tikkun Olam — repairing the world — our sustainable winemaking practices ensure that every step, from soil to bottle, reflects respect for creation and community.
              </p>
            </div>
          </div>

          {/* Temecula Renaissance */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-wine-deep mb-8">
              The Temecula Renaissance
            </h2>
            <div className="space-y-6 text-wine-slate leading-relaxed">
              <p>
                Over the past decade, Temecula Valley Wine Country has flourished, standing proudly alongside California's renowned regions like Napa and Sonoma. Amantes contributes to this renaissance — blending heritage, artistry, and purpose to create wines that are not just tasted, but felt.
              </p>
              <p>
                From our hillside vines to your Shabbat table, every glass tells a story — of perseverance, heritage, and the sweetness of coming home.
              </p>
            </div>
          </div>

          {/* Closing */}
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-serif text-wine-bronze italic">
              L'Chaim — To life, to legacy, and to love.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
