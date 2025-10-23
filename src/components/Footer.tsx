import logo from "@/assets/amantes-logo.png";
import footerShape from "@/assets/footer-shape.svg";

const Footer = () => {
  return (
    <footer className="bg-wine-nav relative pt-12 pb-12">
      {/* Wavy Top Border */}
      <div className="absolute top-0 left-0 right-0 transform rotate-180">
        <img 
          src={footerShape}
          alt=""
          className="w-full h-auto"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-12 mb-12 items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <img 
              src={logo}
              alt="Amantes Winery"
              className="w-[90%] h-auto mx-auto md:mx-0"
            />
          </div>

          {/* Explore & Learn - Two columns close together in center */}
          <div className="flex gap-12 justify-center">
            {/* Explore */}
            <div>
              <h4 className="text-wine-cream font-semibold mb-4 tracking-wider uppercase text-sm">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#wines" className="text-wine-cream/70 hover:text-wine-bronze transition-colors">
                    Wines
                  </a>
                </li>
                <li>
                  <a 
                    href="https://amantesvineyard.orderport.net/wines/Our-Wines" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-wine-cream/70 hover:text-wine-bronze transition-colors"
                  >
                    Buy Wine
                  </a>
                </li>
                <li>
                  <a href="#team" className="text-wine-cream/70 hover:text-wine-bronze transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-wine-cream/70 hover:text-wine-bronze transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Learn */}
            <div>
              <h4 className="text-wine-cream font-semibold mb-4 tracking-wider uppercase text-sm">Learn</h4>
              <ul className="space-y-2">
                {["History", "Wine Blog", "About Us"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-wine-cream/70 hover:text-wine-bronze transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-wine-cream font-semibold mb-4 tracking-wider uppercase text-sm">Contact</h4>
            <ul className="space-y-2 text-wine-cream/70">
              <li>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=40420+Calle+Concion+Temecula+CA+92592" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-wine-bronze transition-colors"
                >
                  40420 Calle Concion<br />Temecula, California, 92592
                </a>
              </li>
              <li>
                <a href="mailto:amantes@amantesvineyard.com" className="hover:text-wine-bronze transition-colors">
                  amantes@amantesvineyard.com
                </a>
              </li>
              <li>
                <a href="tel:+19513832223" className="hover:text-wine-bronze transition-colors">
                  951-383-2223
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-wine-slate pt-8 text-center">
          <p className="text-wine-cream/60 text-sm">
            © 2025 Ha-Adamah, LLC All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
