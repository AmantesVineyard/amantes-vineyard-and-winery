import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
    <div className="min-h-screen bg-wine-cream">
      <Navigation transparent={true} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl text-wine-deep mb-4">
            Winemaking Team
          </h1>
          <p className="text-xl text-wine-slate">
            Our family makes great wine
          </p>
        </div>
      </section>

      {/* Team Carousel */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
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
          >
            <CarouselContent>
              {teamMembers.map((member, index) => (
                <CarouselItem key={index}>
                  <Card className="border-wine-bronze/20 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12">
                      <div className="text-center mb-6">
                        <h2 className="font-serif text-3xl md:text-4xl text-wine-deep mb-2">
                          {member.name}
                        </h2>
                        {member.hebrewName && (
                          <p className="text-lg text-wine-slate mb-2">
                            {member.hebrewName}
                          </p>
                        )}
                        <p className="text-xl text-wine-bronze font-medium">
                          {member.title}
                        </p>
                      </div>
                      
                      <div className="prose prose-lg max-w-none text-wine-deep/90">
                        {member.description.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-4 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {member.quote && (
                        <p className="mt-6 text-center text-xl italic text-wine-bronze font-serif">
                          {member.quote}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 md:-left-12" />
            <CarouselNext className="right-4 md:-right-12" />
          </Carousel>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
