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
      
      {/* Decorative Grapevines - Side Borders */}
      <GrapevineSVG side="left" />
      <GrapevineSVG side="right" />
      
      {/* Additional Crisscrossing Vines */}
      <GrapevineSVG side="left" className="!left-20 md:!left-32 opacity-40" />
      <GrapevineSVG side="right" className="!right-20 md:!right-32 opacity-40" />
      <GrapevineSVG side="left" className="!left-40 md:!left-64 opacity-30 hidden lg:block" />
      <GrapevineSVG side="right" className="!right-40 md:!right-64 opacity-30 hidden lg:block" />
      <Hero />
      <WineShowcase />
      {/* <Experience /> */}
      <Footer />
    </div>
  );
};

export default Index;
