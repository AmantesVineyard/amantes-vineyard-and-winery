import Navigation from "@/components/Navigation";
import HeroTeam from "@/components/HeroTeam";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import GrapevineSVG from "@/components/GrapevineSVG";
import logoBlue from "@/assets/amantes-logo-blue-2.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, WebPageSchema, PersonSchema } from "@/components/StructuredData";

const teamMembers = [
  {
    name: "Dr. Joseph Nassir",
    hebrewName: "(Yosef ben Nissan)",
    title: "Founder, President, CEO and Director of Winemaking Operations",
    description: "A first-generation Persian American doctor, philanthropist and champion of Jewish values, Dr. Nassir has devoted his life to the advancement of goodness and charity in the world. For the last three-plus decades as an Internist, Dr. Nassir has poured his entire heart into helping his patients lead healthy lives. Through his steadfast dedication to G-d, family and country, Dr. Nassir has now brought his passion for helping his patients into his lifelong dream (and four generation old tradition) of winemaking.\n\nDr. Nassir was taught the ancient craft of kosher winemaking by his grandfather, also Yosef ben Nissan, in Iran, who was taught by his father before him. Wine plays an integral part of everyday Jewish life. For Dr. Nassir, the sacred process of making kosher wine, handed down from generation to generation, has played an equally important role. \"It's always been in our blood. You could say that in the Nassir family, we bleed Merlot!\" When G-d provided the blessing for Yosef to realize his dream, he grabbed it tightly with both hands, bezrat HaShem, never to let go!",
    quote: "\"L'Chaim! To Life!\" ~ Dr. Joseph Nassir"
  },
  {
    name: "Aaron Wyrick",
    title: "General Manager",
    description: "Officially joining the team in March of 2023, after designing the corporate image, company website and first-run wine labels, Aaron assumed the extensive role of general manager.\n\nWhile having no direct experience in the trenches of the winemaking industry, Aaron brings over 25 years of experience building and running small to mid-size companies. Additionally, Aaron spent several years in Lake County, California, working with some of the industry's most notable brands. Designing and running pre-press for Calistoga Press, Aaron was fortunate to work with labels from Fetzer to Coppola and Robert Mondavi to name a few.\n\nAaron's duties have grown faster than the grapes on the vines. Responsible for business management, marketing, legal, distribution, compliance and relationship development... these are only his \"desk jobs\". On any given workday, Aaron can be found driving a forklift, whacking weeds, mowing lawns or replacing drip-heads in the vineyard. \"It's a labor of love... and my honor to do all I can to help my dearest friend see his dream come true!\"."
  },
  {
    name: "Rabbi Yossi Berkowitz",
    title: "Mashgiach (Supervising Rabbi)",
    description: "Rabbi Yossi Berkowitz was born and raised in California and has dedicated his life to Jewish education, outreach, and community building. His rabbinical journey took him across the globe, with studies in Los Angeles, Jerusalem, Brooklyn, Moscow, and Melbourne, Australia. He received his rabbinical ordination from the esteemed Smicha Academy in 1998.\n\nIn 1999, Rabbi Berkowitz married Yiska, originally from Vancouver, Canada. Together, they returned to California in 2000, where Rabbi Berkowitz served as the Youth and Outreach Director for Chabad of West Orange County in Huntington Beach. In 2005, he and Yiska founded Chabad of South Huntington Beach, where they continue to lead a vibrant and inclusive Jewish community.\n\nBeyond his congregational responsibilities, Rabbi Berkowitz has served as a Chaplain for the California Department of Corrections since 2005, providing spiritual support and guidance to those in need. He is also the rabbinical supervisor for Amantes Vineyard and Winery, a position he has held since its inception in 2019."
  },
  {
    name: "Eli Benzaken",
    title: "Building and Construction Director",
    description: "Born in Tzfat, Israel, Eli served with distinction in the Israel Defense Forces from 1976 to 1979 before making his home in the United States in 1983. A proud father of two, Eli is a deeply valued member of the Amantes Vineyard family. With decades of experience in craftsmanship, Eli is the go-to expert for building, repairing, and problem-solving of all kinds.\n\nFrom winemaking to construction and equipment maintenance, his hands-on expertise touches every corner of the vineyard. Cherished for his unwavering dedication and tireless work ethic—Eli embodies the spirit of resilience and reliability at Amantes."
  }
];

const Team = () => {
  return (
    <>
      <SEO 
        title="Meet Our Team | Amantes Vineyard Winemakers & Staff"
        description="Meet the passionate team behind Amantes Vineyard. Dr. Joseph Nassir, founder with 4 generations of Persian Jewish winemaking heritage, leads our dedicated staff."
        canonical="/team"
        keywords="Amantes Vineyard team, Dr Joseph Nassir, kosher winemaker, Persian Jewish winemaking, Temecula winery staff, Rabbi Berkowitz mashgiach"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Team", url: "/team" }
      ]} />
      <WebPageSchema 
        name="Our Team"
        description="Meet the passionate winemakers and staff behind Amantes Vineyard."
        url="/team"
      />
      <PersonSchema people={teamMembers.map(member => ({
        name: member.name,
        jobTitle: member.title,
        description: member.description.split('\n\n')[0]
      }))} />
      
      <div className="bg-wine-cream">
        <a href="#team-section" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-wine-deep text-white px-4 py-2 z-50">
          Skip to team members
        </a>
        <Navigation transparent={true} logoSrc={logoBlue} />
        
        <HeroTeam />

        {/* Team Carousel */}
        <main id="team-section" className="pt-16 px-4 relative">
          <div className="container mx-auto max-w-4xl mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-wine-deep mb-6">Meet Our Winemaking Team</h1>
            <p className="text-lg text-wine-slate/80 leading-relaxed">
              Behind every bottle of Amantes wine is a team of dedicated professionals who share a passion for quality, tradition, and the art of kosher winemaking. From our founder Dr. Joseph Nassir to our supervising Rabbi, each team member brings unique expertise and devotion to our craft.
            </p>
          </div>
          
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
          
          <section className="container mx-auto max-w-6xl" aria-label="Team member profiles">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 8000,
                }),
              ]}
              className="w-full"
              aria-label="Team members carousel"
            >
              <CarouselContent>
                {teamMembers.map((member, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-wine-bronze/20 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-8 md:p-12">
                        <article itemScope itemType="https://schema.org/Person">
                          <header className="text-center mb-6">
                            <h2 className="font-serif text-3xl md:text-4xl text-wine-deep mb-2" itemProp="name">
                              {member.name}
                            </h2>
                            {member.hebrewName && (
                              <p className="text-lg text-wine-slate mb-2" lang="he">
                                {member.hebrewName}
                              </p>
                            )}
                            <p className="text-xl text-wine-bronze font-medium" itemProp="jobTitle">
                              {member.title}
                            </p>
                          </header>
                          
                          <div className="prose prose-lg max-w-none text-wine-deep/90" itemProp="description">
                            {member.description.split('\n\n').map((paragraph, pIndex) => (
                              <p key={pIndex} className="mb-4 leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                          </div>

                          {member.quote && (
                            <blockquote className="mt-6 text-center text-xl italic text-wine-bronze font-serif">
                              {member.quote}
                            </blockquote>
                          )}
                        </article>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 md:-left-12" aria-label="Previous team member" />
              <CarouselNext className="right-4 md:-right-12" aria-label="Next team member" />
            </Carousel>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Team;