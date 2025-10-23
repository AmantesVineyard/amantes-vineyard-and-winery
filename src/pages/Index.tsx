import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WineShowcase from "@/components/WineShowcase";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import GrapevineSVG from "@/components/GrapevineSVG";

const Index = () => {
  return (
    <div className="min-h-screen bg-wine-cream">
      <Navigation />
      <Hero />
      <WineShowcase />
      {/* <Experience /> */}
      <Footer />
    </div>
  );
};

export default Index;
