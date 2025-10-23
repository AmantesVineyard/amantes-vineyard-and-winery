import logo from "@/assets/amantes-logo.png";

const Footer = () => {
  return (
    <footer className="bg-wine-nav border-t border-wine-slate py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <img 
              src={logo}
              alt="Amantes Winery"
              className="w-[90%] h-auto mx-auto md:mx-0"
            />
          </div>

          {/* Links */}
          <div>
            <h4 className="text-wine-cream font-semibold mb-4 tracking-wider uppercase text-sm">Explore</h4>
            <ul className="space-y-2">
              {["Wines", "Winery", "About Us", "Shop"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-wine-cream/70 hover:text-wine-bronze transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-wine-cream font-semibold mb-4 tracking-wider uppercase text-sm">Contact</h4>
            <ul className="space-y-2 text-wine-cream/70">
              <li>40420 Calle Concion</li>
              <li>Temecula, California, 92592</li>
              <li>amantes@amantesvineyard.com</li>
              <li>951-383-2223</li>
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
