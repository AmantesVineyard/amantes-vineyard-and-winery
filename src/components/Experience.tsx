import cellarImage from "@/assets/winery-cellar.jpg";
import { Calendar } from "lucide-react";

const Experience = () => {
  return (
    <section id="experiences" className="py-24 bg-wine-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm tracking-[0.3em] text-wine-bronze uppercase mb-4">
            Experience
          </p>
          <h2 className="text-4xl lg:text-5xl font-serif text-wine-deep mb-6">
            The Story Behind Our Winery
          </h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden group">
              <img 
                src={cellarImage}
                alt="Wine Cellar"
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/60 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <p className="text-lg text-wine-slate/80 leading-relaxed mb-8">
              Guided walking tour through the vineyards in the Valley of Gods and the estate wineries. 
              Experience the art of winemaking from vine to bottle, exploring our historic cellars where 
              tradition meets innovation.
            </p>

            <p className="text-lg text-wine-slate/80 leading-relaxed mb-10">
              Book your tour in advance (minimum 7 adults) which will take place in the heart of our 
              wine country. Discover the passion and craftsmanship that goes into every bottle.
            </p>

            <a 
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-wine-bronze text-white font-semibold tracking-wider hover:bg-wine-gold transition-all duration-300 uppercase text-sm group"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Tour</span>
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: "Organic Vineyards",
              description: "100% organically grown grapes from our sustainable vineyards"
            },
            {
              title: "Traditional Methods",
              description: "Time-honored winemaking techniques passed down through generations"
            },
            {
              title: "Premium Quality",
              description: "Award-winning wines recognized internationally for excellence"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="text-center p-8 bg-white/50 border border-wine-bronze/20 hover:border-wine-bronze/40 transition-colors duration-300"
            >
              <h3 className="text-xl font-serif text-wine-deep mb-4">
                {feature.title}
              </h3>
              <p className="text-wine-slate/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
