import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WineShowcase from "@/components/WineShowcase";
import Experience from "@/components/Experience";
import HanukkahBanner from "@/components/HanukkahBanner";
import Footer from "@/components/Footer";
import GrapevineSVG from "@/components/GrapevineSVG";

const Index = () => {
  return (
    <div className="min-h-screen bg-wine-cream overflow-x-hidden">
      <Navigation />
      <Hero />
      <WineShowcase />
      {/* <Experience /> */}
      <HanukkahBanner />
      <Footer />
    </div>
  );
};

export default Index;
