import logo from "@/assets/amantes-logo.png";

const Footer = () => {
  return (
    <footer className="bg-wine-nav border-t border-wine-slate py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <img 
              src={logo}
              alt="Amantes Winery"
              className="h-10 w-auto mx-auto md:mx-0"
            />
          </div>

          {/* Links */}
          <div>
            <h4 className="text-wine-cream font-semibold mb-4 tracking-wider uppercase text-sm">Explore</h4>
            <ul className="space-y-2">
              {["Wines", "Winery", "Experiences", "Shop"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-wine-cream/70 hover:text-wine-bronze transition-colors">
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
              <li>Valley of Gods</li>
              <li>Verona, Italy</li>
              <li>info@lagar.com</li>
              <li>+39 045 123 4567</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-wine-cream font-semibold mb-4 tracking-wider uppercase text-sm">Hours</h4>
            <ul className="space-y-2 text-wine-cream/70">
              <li>Mon - Fri: 10am - 6pm</li>
              <li>Saturday: 11am - 8pm</li>
              <li>Sunday: 12pm - 5pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-wine-slate pt-8 text-center">
          <p className="text-wine-cream/60 text-sm">
            © {new Date().getFullYear()} Lagar Winery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
