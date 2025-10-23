import Navigation from "@/components/Navigation";
import HeroHistory from "@/components/HeroHistory";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const History = () => {
  return (
    <div className="min-h-screen bg-wine-cream">
      <Navigation />
      <HeroHistory />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Table of Contents */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-wine-burgundy mb-6">Table of Contents</h2>
          <ul className="space-y-2 text-wine-brown">
            <li><a href="#origins" className="hover:text-wine-burgundy transition-colors">The Origins of Persian Winemaking (5400 BCE)</a></li>
            <li><a href="#jewish-arrival" className="hover:text-wine-burgundy transition-colors">Jewish Arrival in Ancient Persia (586 BCE)</a></li>
            <li><a href="#purim-connection" className="hover:text-wine-burgundy transition-colors">Wine in the Book of Esther and Purim</a></li>
            <li><a href="#shiraz" className="hover:text-wine-burgundy transition-colors">Jewish Winemakers in Shiraz: The Wine Capital</a></li>
            <li><a href="#pahlavi-era" className="hover:text-wine-burgundy transition-colors">The Golden Age: Jewish Wine Under the Shah</a></li>
            <li><a href="#revolution" className="hover:text-wine-burgundy transition-colors">The 1979 Revolution and End of Iranian Wine</a></li>
            <li><a href="#california-revival" className="hover:text-wine-burgundy transition-colors">Persian Jewish Winemaking Revival in California</a></li>
            <li><a href="#faqs" className="hover:text-wine-burgundy transition-colors">FAQs About Jewish Winemaking in Persia</a></li>
          </ul>
        </section>

        {/* Origins Section */}
        <section id="origins" className="mb-16">
          <h2 className="text-4xl font-serif text-wine-burgundy mb-8">The Ancient Origins of Persian Winemaking: 7,000 Years of Wine History</h2>
          
          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Where Wine Began: The Zagros Mountains (5400-5000 BCE)</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            Archaeological evidence proves that Persian wine history dates back over 7,000 years, making Iran one of the world's oldest wine-producing regions. Excavations at Hajji Firuz Tepe in the Zagros Mountains of ancient Persia uncovered Neolithic pottery jars containing tartaric acid residue—chemical proof of grape wine production dating to 5400-5000 BCE.
          </p>
          <p className="text-wine-brown mb-6 leading-relaxed">
            Additional discoveries at Godin Tepe revealed wine vessels from 3100-2900 BCE, confirming that ancient Persia was a cradle of viticulture and winemaking civilization.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Key Historical Facts:</h4>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li><strong>5400 BCE:</strong> Earliest evidence of Persian winemaking</li>
              <li><strong>Location:</strong> Zagros Mountains, western Persia (modern Iran)</li>
              <li><strong>Significance:</strong> Among the world's oldest wine production sites</li>
              <li><strong>Cultural Impact:</strong> Wine became central to Zoroastrian rituals and Persian culture</li>
            </ul>
          </div>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Wine in Ancient Persian Culture and Zoroastrianism</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            In ancient Persia, wine held profound cultural and religious significance. The Persian words for wine—"may" (می), "mul" (مل), and "bâdah" (باده)—appear throughout Persian literature, poetry, and religious texts.
          </p>
          <p className="text-wine-brown mb-6 leading-relaxed">
            Zoroastrian tradition viewed wine as "liquid gold" and "the moving fire of the radiant sun." Wine played a ritual function in Zoroastrian liberation ceremonies, where it symbolically substituted for blood in sacred offerings.
          </p>
        </section>

        {/* Jewish Arrival Section */}
        <section id="jewish-arrival" className="mb-16">
          <h2 className="text-4xl font-serif text-wine-burgundy mb-8">Jewish History in Ancient Persia: The Babylonian Exile (586 BCE)</h2>
          
          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">When Did Jews Arrive in Persia?</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            Jewish settlement in Persia began in 586 BCE during the Babylonian Exile, when Nebuchadnezzar II destroyed the First Temple in Jerusalem and exiled thousands of Jews to Babylonia and the Persian territories.
          </p>
          <p className="text-wine-brown mb-6 leading-relaxed">
            In 538 BCE, the Persian King Cyrus the Great issued his famous decree allowing Jews to return to Jerusalem to rebuild the Temple. However, many Jewish families chose to remain in Persia, establishing communities that would endure for 2,700 years—one of the longest continuous Jewish diaspora communities in history.
          </p>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Biblical References to Persian Jewish Life</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            The Hebrew Bible provides extensive documentation of Jewish life in ancient Persia:
          </p>
          <ul className="list-disc list-inside space-y-2 text-wine-brown mb-6">
            <li><strong>Book of Esther:</strong> Set in the Persian capital of Susa during the Achaemenid Empire</li>
            <li><strong>Book of Daniel:</strong> Documents Jewish life under Persian rule</li>
            <li><strong>Books of Ezra and Nehemiah:</strong> Detail the return to Jerusalem and ongoing Persian Jewish community</li>
            <li><strong>Book of Isaiah:</strong> Prophecies about Persian King Cyrus</li>
          </ul>
          <p className="text-wine-brown mb-6 leading-relaxed">
            These texts reveal that Jews weren't merely tolerated in ancient Persia—they thrived, holding positions in the royal court and integrating into Persian economic life.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Major Persian Jewish Communities:</h4>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li><strong>Susa (Shushan)</strong> - Ancient Persian capital</li>
              <li><strong>Shiraz</strong> - Wine production center</li>
              <li><strong>Isfahan</strong> - Commercial hub</li>
              <li><strong>Hamadan (Ecbatana)</strong> - Ancient Median capital</li>
              <li><strong>Kermanshah</strong> - Wine manufacturing center</li>
            </ul>
          </div>
        </section>

        {/* Purim Connection Section */}
        <section id="purim-connection" className="mb-16">
          <h2 className="text-4xl font-serif text-wine-burgundy mb-8">Wine in the Book of Esther: The Purim Connection to Persian Wine</h2>
          
          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Why Do Jews Drink Wine on Purim?</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            The holiday of Purim is inseparable from Persian wine history. The Book of Esther (Megillat Esther) mentions wine and feasting in nearly every chapter:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-wine-brown mb-6">
            <li>King Ahasuerus's 180-day feast (Esther 1:3-8) - Wine served "according to the law"</li>
            <li>Vashti's refusal at a wine-soaked banquet (Esther 1:10-12)</li>
            <li>Esther's first wine banquet for the king and Haman (Esther 5:4-8)</li>
            <li>Esther's second wine banquet where Haman's plot is revealed (Esther 7:1-10)</li>
          </ol>
          <p className="text-wine-brown mb-6 leading-relaxed">
            After the Jewish people's salvation from Haman's genocidal decree, Mordechai commanded annual celebration with "days of feasting and drinking" (Esther 9:22). This isn't merely permission—it's a biblical commandment directly connected to Persian wine culture.
          </p>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Persian Jewish Wine Traditions and Purim</h3>
          <p className="text-wine-brown mb-6 leading-relaxed">
            The Talmudic requirement to drink wine on Purim stems directly from this Persian Jewish experience. Rabbis have debated for centuries exactly how much wine should be consumed, but the commandment itself is unambiguous—wine is central to Purim observance because wine was central to the Persian Jewish experience described in the Megillah.
          </p>
        </section>

        {/* Shiraz Section */}
        <section id="shiraz" className="mb-16">
          <h2 className="text-4xl font-serif text-wine-burgundy mb-8">Jewish Winemakers in Shiraz: The Wine Capital of Persia</h2>
          
          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Shiraz: From Ancient Wine Capital to Jewish Manufacturing Center</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            By the 9th century CE, the city of Shiraz had established a global reputation for producing the world's finest wines. The city gave its name to wines celebrated across Europe and the Middle East, with European merchants actively exporting Shiraz wine throughout the 17th-19th centuries.
          </p>
          <p className="text-wine-brown mb-6 leading-relaxed">
            By the 12th century, Shiraz was home to 10,000 Jews, and historical records indicate that the majority were manufacturing wine for European markets. This wasn't coincidental—it was economic necessity and opportunity.
          </p>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Why Jewish Winemakers Dominated Persian Wine Production</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            Under various Islamic dynasties that prohibited Muslims from alcohol production, Jewish winemakers became essential to Persia's wine industry:
          </p>
          <ul className="list-disc list-inside space-y-2 text-wine-brown mb-6">
            <li><strong>Economic opportunity:</strong> Wine production was one of the few trades not restricted to Jews</li>
            <li><strong>Religious exemption:</strong> Jews weren't bound by Islamic prohibitions on alcohol</li>
            <li><strong>Market demand:</strong> Muslims and non-Muslims alike purchased wine from Jewish producers</li>
            <li><strong>Expertise:</strong> Generational knowledge passed down through Jewish families</li>
            <li><strong>Community tradition:</strong> Every Jewish family made wine for Shabbat and holidays</li>
          </ul>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Traditional Jewish Wine Production in Persia:</h4>
            <p className="text-wine-brown mb-3">From ancient times through 1979, Jewish families in Iran followed annual winemaking rituals:</p>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li>Purchasing fresh grapes seasonally</li>
              <li>Family wine production for household use</li>
              <li>Wine for Shabbat kiddush (blessing)</li>
              <li>Holiday wines for Passover, Purim, and celebrations</li>
              <li>Wine for lifecycle events (weddings, brit milah ceremonies)</li>
            </ul>
          </div>

          <p className="text-wine-brown mb-4 leading-relaxed">
            Beyond home production, prominent Jewish families operated commercial wine factories in:
          </p>
          <ul className="list-disc list-inside space-y-2 text-wine-brown mb-6">
            <li><strong>Shiraz</strong> - The historic wine capital</li>
            <li><strong>Kermanshah</strong> - Major manufacturing center</li>
            <li><strong>Ahwaz</strong> - Industrial wine production</li>
            <li><strong>Isfahan</strong> - Wine and spirits production</li>
          </ul>
          <p className="text-wine-brown mb-6 leading-relaxed">
            These same families later expanded into brewing, creating the popular "Shams" beer brand that became widely consumed throughout mid-20th century Iran.
          </p>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Jewish Wine Merchants and the Persian Economy</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            Jewish wine merchants didn't only serve the Jewish community. Historical accounts document that Jewish winemakers sold wine to Muslim residents and visitors in Shiraz's Jewish quarter (mahalleh). Wine was openly traded despite Islamic prohibitions because:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-wine-brown mb-6">
            <li>Jews were legally permitted to produce and sell wine</li>
            <li>Persian culture maintained wine drinking traditions predating Islam</li>
            <li>Economic demand existed across religious communities</li>
            <li>Regional wine production was embedded in Persian cultural identity</li>
          </ol>
          <p className="text-wine-brown mb-6 leading-relaxed">
            One documented example describes a Jewish doctor in villages near Shiraz who prescribed small doses of homemade wine as pain relief for patients—demonstrating how deeply Jewish winemaking was integrated into Persian society.
          </p>
        </section>

        {/* Pahlavi Era Section */}
        <section id="pahlavi-era" className="mb-16">
          <h2 className="text-4xl font-serif text-wine-burgundy mb-8">The Golden Age: Jewish Wine Production Under the Pahlavi Dynasty (1925-1979)</h2>
          
          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">The Pahlavi Reforms and Jewish Emancipation</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            When Reza Shah Pahlavi established his dynasty in 1925, he implemented sweeping modernization reforms that transformed Iran into a secular, Western-oriented state. These changes dramatically improved life for Iran's Jewish minority:
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Key Pahlavi-Era Reforms Affecting Jewish Winemakers:</h4>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li>Weakened Shi'a clerical power and influence</li>
              <li>Abolished religious minority restrictions</li>
              <li>Eliminated the concept of "ritual impurity" (najasat) of non-Muslims</li>
              <li>Promoted Iranian nationalism over Islamic identity</li>
              <li>Encouraged economic development and entrepreneurship</li>
              <li>Protected Jewish businesses and property rights</li>
            </ul>
          </div>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">The Most Prosperous Era for Iranian Jews</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            The reign of Mohammad Reza Shah Pahlavi (1941-1979) marked the "Golden Age" of Iranian Jewry:
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Jewish Economic Success Statistics (1970s):</h4>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li>Only 10% of Iranian Jews classified as impoverished</li>
              <li>80% achieved middle-class status</li>
              <li>10% reached wealthy status</li>
              <li>600 of Iran's 10,000 physicians were Jewish</li>
              <li>80 of 4,000 university lecturers were Jewish</li>
              <li>2 of 18 Iranian Academy of Sciences members were Jewish</li>
            </ul>
          </div>

          <p className="text-wine-brown mb-6 leading-relaxed">
            Despite comprising less than 0.25% of Iran's population, Jews played disproportionate roles in medicine, academia, commerce, and cultural life.
          </p>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Jewish Wine Industry Expansion (1925-1979)</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            During the Pahlavi era, Jewish wine production reached its zenith:
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Commercial Wine Production:</h4>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li>Up to 300 wineries operated throughout Iran before 1979</li>
              <li>Jewish families owned and operated major wine factories</li>
              <li>Commercial brands served domestic and export markets</li>
              <li>Modern winemaking techniques merged with traditional methods</li>
              <li>Jewish brewers created popular beer brands (Shams Beer)</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Home Winemaking Traditions:</h4>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li>Every Jewish household maintained winemaking traditions</li>
              <li>Seasonal grape purchases from local vineyards</li>
              <li>Family recipes passed through generations</li>
              <li>Wine production for religious observance and celebrations</li>
            </ul>
          </div>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Jewish Population Centers and Wine Production (1979)</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            On the eve of the Islamic Revolution, Iran's Jewish population was concentrated in traditional winemaking regions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-wine-brown mb-6">
            <li><strong>Tehran:</strong> 60,000 Jews (capital city)</li>
            <li><strong>Shiraz:</strong> 8,000 Jews (historic wine capital)</li>
            <li><strong>Kermanshah:</strong> 4,000 Jews (major wine factory location)</li>
            <li><strong>Isfahan:</strong> 3,000 Jews (commercial center)</li>
            <li><strong>Khuzestan cities:</strong> Including Ahwaz (wine factories)</li>
          </ul>
          <p className="text-wine-brown mb-6 leading-relaxed">
            This geographic distribution aligned with historic wine production centers, demonstrating the deep connection between Jewish communities and Persian wine regions.
          </p>
        </section>

        {/* Revolution Section */}
        <section id="revolution" className="mb-16">
          <h2 className="text-4xl font-serif text-wine-burgundy mb-8">The 1979 Islamic Revolution: End of Jewish Winemaking in Iran</h2>
          
          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">How the Islamic Revolution Destroyed Iran's Wine Industry</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            On February 11, 1979, Ayatollah Khomeini established the Islamic Republic of Iran, fundamentally transforming the country and ending thousands of years of Persian wine tradition.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Immediate Impact on Jewish Winemakers:</h4>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li>All 300 Iranian wineries forced to close</li>
              <li>Jewish-owned wine factories confiscated or destroyed</li>
              <li>Alcoholic beverage businesses seized by the regime</li>
              <li>Wine production criminalized under Islamic law</li>
              <li>Jewish winemaking families fled the country</li>
              <li>Generational expertise and traditions severed</li>
            </ul>
          </div>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Why Jewish Winemakers Were Targeted</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            The new Islamic regime viewed Jews and other religious minorities as supporters of the Shah's secular government. Jewish winemakers faced particular scrutiny because:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-wine-brown mb-6">
            <li>Economic success under the Shah marked them as regime beneficiaries</li>
            <li>Wine production violated Islamic law and symbolized Western influence</li>
            <li>Property wealth made them targets for confiscation</li>
            <li>Professional prominence created resentment among revolutionary factions</li>
          </ol>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Documented Consequences for Iranian Jews:</h4>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li>Over 12 Iranian Jews executed (many for ties to the Shah's court)</li>
              <li>Tens of thousands fled Iran (primarily to Israel, USA, and California)</li>
              <li>Vast amounts of property abandoned or confiscated</li>
              <li>Jewish population declined from 80,000 (1979) to approximately 9,000-12,000 (2012)</li>
              <li>Complete loss of commercial wine industry</li>
            </ul>
          </div>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">The End of 7,000 Years of Persian Wine Tradition</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            The Islamic Revolution didn't just end Jewish winemaking—it terminated 7,000 years of continuous Persian wine culture:
          </p>
          <ul className="list-disc list-inside space-y-2 text-wine-brown mb-6">
            <li>Historic vineyards converted to table grape production</li>
            <li>Ancient winemaking knowledge lost</li>
            <li>Commercial wine industry eliminated entirely</li>
            <li>Cultural heritage criminalized</li>
            <li>Persian wine legacy survives only in exile communities</li>
          </ul>
          <p className="text-wine-brown mb-6 leading-relaxed">
            Today, wine production remains illegal in Iran. The punishment for producing or consuming alcohol includes physical punishment, fines, and imprisonment. The country that invented wine now prohibits it entirely.
          </p>
        </section>

        {/* California Revival Section */}
        <section id="california-revival" className="mb-16">
          <h2 className="text-4xl font-serif text-wine-burgundy mb-8">Persian Jewish Winemaking Revival: From Iran to California</h2>
          
          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Why California Became the New Home for Persian Jewish Winemakers</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            After the 1979 revolution, California became home to the largest Iranian Jewish population outside Israel, with approximately 600,000 Iranian immigrants in Los Angeles alone. This community includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-wine-brown mb-6">
            <li>Iranian Jewish Women's Organization (founded 1976)</li>
            <li>Iranian American Jewish Federation (established 1980)</li>
            <li>Multiple Persian Jewish community centers and synagogues</li>
            <li>Preservation of Persian Jewish cultural traditions</li>
          </ul>
          <p className="text-wine-brown mb-6 leading-relaxed">
            Within this diaspora community, a remarkable renaissance has occurred: Iranian Jewish winemakers are reviving ancient Persian wine traditions in California's premier wine regions.
          </p>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Modern Iranian Jewish Wineries in California</h3>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">
              <a href="https://www.jamshidwine.com/" target="_blank" rel="noopener noreferrer" className="hover:text-wine-bronze transition-colors">
                Jamshid Winery
              </a> - Santa Ynez Valley, California
            </h4>
            <p className="text-wine-brown mb-3">
              Founded by Dr. Jamshid Maddahi, a Los Angeles cardiologist and UCLA medical school professor, Jamshid Winery explicitly connects to Persian Jewish heritage:
            </p>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li>Named after the legendary Persian King Jamshid</li>
              <li>Located in California's Santa Ynez Valley</li>
              <li>Produces kosher and non-kosher wines</li>
              <li>Celebrates 7,000 years of Persian wine tradition</li>
              <li>Mission: Inspire younger Iranian Jews to embrace winemaking heritage</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Other Iranian-Founded California Wineries:</h4>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li><strong><a href="https://www.maysara.com/" target="_blank" rel="noopener noreferrer" className="hover:text-wine-burgundy transition-colors">Maysara Winery</a></strong> (Willamette Valley, Oregon) - Momtazi family</li>
              <li><strong><a href="https://azarivineyards.com/" target="_blank" rel="noopener noreferrer" className="hover:text-wine-burgundy transition-colors">Azari Vineyards</a></strong> (Petaluma Gap, California) - Kamal and Parichehr Azari</li>
              <li><strong><a href="https://fazelicellars.com/" target="_blank" rel="noopener noreferrer" className="hover:text-wine-burgundy transition-colors">Fazeli Cellars</a></strong> (Temecula, California) - Bizhan Fazeli</li>
            </ul>
          </div>

          <h3 className="text-2xl font-serif text-wine-burgundy mb-4">Continuing the Legacy: Persian Jewish Wine Traditions Today</h3>
          <p className="text-wine-brown mb-4 leading-relaxed">
            These California Persian Jewish wineries aren't just making wine—they're preserving cultural memory:
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Traditional Elements Preserved:</h4>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li>Family winemaking knowledge passed from Iranian elders</li>
              <li>Wine for Shabbat, Purim, Passover, and celebrations</li>
              <li>Kosher production methods for religious observance</li>
              <li>Persian cultural identity expressed through viticulture</li>
              <li>Education of younger generations about heritage</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-xl font-serif text-wine-burgundy mb-3">Modern Adaptations:</h4>
            <ul className="list-disc list-inside space-y-2 text-wine-brown">
              <li>California terroir and grape varieties</li>
              <li>Contemporary winemaking technology</li>
              <li>American wine market adaptation</li>
              <li>Fusion of Persian tradition with New World techniques</li>
            </ul>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="mb-16">
          <h2 className="text-4xl font-serif text-wine-burgundy mb-8">FAQs: Jewish Winemaking in Ancient Persia and Iran</h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg shadow-md px-6 border-none">
              <AccordionTrigger className="text-xl font-serif text-wine-burgundy hover:no-underline py-6">
                How long have Jews been making wine in Persia?
              </AccordionTrigger>
              <AccordionContent className="text-wine-brown leading-relaxed pb-6">
                Jews have made wine in Persia for approximately 2,700 years, since the Babylonian Exile in 586 BCE. However, Persian wine production predates Jewish arrival by thousands of years, with archaeological evidence dating to 5400-5000 BCE. Jewish winemakers became prominent in Persia by the 9th century CE, particularly in Shiraz.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg shadow-md px-6 border-none">
              <AccordionTrigger className="text-xl font-serif text-wine-burgundy hover:no-underline py-6">
                What is the connection between Shiraz wine and the Iranian city?
              </AccordionTrigger>
              <AccordionContent className="text-wine-brown leading-relaxed pb-6">
                The city of Shiraz in Iran was historically the wine capital of Persia and gave its name to wines celebrated globally by the 9th century. However, the modern "Shiraz" grape variety used in Australia and elsewhere is actually the Syrah grape from France, with no proven genetic connection to ancient Persian grapes. The naming may reflect historical trade routes and European merchants' exposure to wines from the city of Shiraz.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg shadow-md px-6 border-none">
              <AccordionTrigger className="text-xl font-serif text-wine-burgundy hover:no-underline py-6">
                Why were Jews the main winemakers in Iran?
              </AccordionTrigger>
              <AccordionContent className="text-wine-brown leading-relaxed pb-6">
                Under Islamic rule in Persia, Muslims were prohibited from producing alcohol. Jews, not bound by Islamic law, were permitted to make wine for their religious observance and could legally sell wine commercially. This created both religious freedom and economic opportunity, making wine production one of the few trades openly available to Jewish communities throughout Islamic Persia.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg shadow-md px-6 border-none">
              <AccordionTrigger className="text-xl font-serif text-wine-burgundy hover:no-underline py-6">
                How many wineries existed in Iran before 1979?
              </AccordionTrigger>
              <AccordionContent className="text-wine-brown leading-relaxed pb-6">
                Historical sources indicate that up to 300 commercial wineries operated in Iran before the 1979 Islamic Revolution. These included Jewish-owned wine factories in Kermanshah, Ahwaz, Shiraz, and other cities. All were shut down, confiscated, or destroyed when the Islamic Republic criminalized alcohol production.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg shadow-md px-6 border-none">
              <AccordionTrigger className="text-xl font-serif text-wine-burgundy hover:no-underline py-6">
                What happened to Jewish winemakers after the Iranian Revolution?
              </AccordionTrigger>
              <AccordionContent className="text-wine-brown leading-relaxed pb-6">
                After the 1979 Islamic Revolution, all Jewish-owned wine businesses were confiscated or destroyed. Tens of thousands of Iranian Jews fled the country, with many settling in Israel, Los Angeles, and other diaspora communities. The Jewish population of Iran declined from 80,000 (1979) to fewer than 10,000 today. Jewish winemaking traditions that had continued for 2,700 years were severed in Iran but are now being revived in California.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg shadow-md px-6 border-none">
              <AccordionTrigger className="text-xl font-serif text-wine-burgundy hover:no-underline py-6">
                Is wine production legal in Iran today?
              </AccordionTrigger>
              <AccordionContent className="text-wine-brown leading-relaxed pb-6">
                No. Wine production and consumption are illegal in Iran today under Islamic law. Punishments include physical punishment, fines, and imprisonment. While underground production exists, the commercial wine industry that thrived for 7,000 years has been completely eliminated. Former vineyards now grow table grapes instead of wine grapes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white rounded-lg shadow-md px-6 border-none">
              <AccordionTrigger className="text-xl font-serif text-wine-burgundy hover:no-underline py-6">
                Where can I find Persian Jewish wines today?
              </AccordionTrigger>
              <AccordionContent className="text-wine-brown leading-relaxed pb-6">
                <p className="mb-3">
                  Persian Jewish winemaking traditions are being revived in California by Iranian Jewish families. Notable wineries include:
                </p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Jamshid Winery (Santa Ynez Valley, CA)</li>
                  <li>Maysara Winery (Willamette Valley, OR)</li>
                  <li>Azari Vineyards (Petaluma Gap, CA)</li>
                  <li>Fazeli Cellars (Temecula, CA)</li>
                </ul>
                <p>
                  These wineries produce kosher and non-kosher wines while honoring ancient Persian Jewish winemaking heritage.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-white rounded-lg shadow-md px-6 border-none">
              <AccordionTrigger className="text-xl font-serif text-wine-burgundy hover:no-underline py-6">
                What role does wine play in Jewish Purim celebrations?
              </AccordionTrigger>
              <AccordionContent className="text-wine-brown leading-relaxed pb-6">
                Wine is central to Purim because the entire story of Esther takes place during wine banquets in the Persian court. The Talmud commands Jews to drink wine on Purim to commemorate the salvation of the Jewish people from Haman's plot. This commandment directly reflects the Persian Jewish wine culture documented in the Book of Esther.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-white rounded-lg shadow-md px-6 border-none">
              <AccordionTrigger className="text-xl font-serif text-wine-burgundy hover:no-underline py-6">
                Can I visit a Persian Jewish winery?
              </AccordionTrigger>
              <AccordionContent className="text-wine-brown leading-relaxed pb-6">
                Yes! Several California wineries founded by Iranian Jewish families welcome visitors. Contact wineries like Jamshid Winery in Santa Ynez Valley to learn about tours, tastings, and the story of Persian Jewish winemaking traditions continued in California after the 1979 revolution.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA Section */}
        <section className="bg-wine-burgundy text-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-serif mb-4">Experience Living History: Visit Amantes Vineyard</h2>
          <p className="text-lg mb-6 leading-relaxed">
            At Amantes Vineyard in Temecula, California, we honor the ancient legacy of Jewish winemaking in Persia while producing exceptional kosher wines for modern celebrations. Our winemaking connects to a 7,000-year tradition that survived empires, exiles, and revolutions.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-lg"><strong>Location:</strong> Temecula Wine Country, Southern California</p>
            <p className="text-lg"><strong>Specialties:</strong> Kosher sparkling wines, Jewish heritage wines</p>
            <p className="text-lg"><strong>Events:</strong> Celebrate Shabbat, Purim, Passover with authentic wines</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default History;
