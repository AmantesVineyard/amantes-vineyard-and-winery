import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/amantes-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/", isRoute: true },
    { name: "HISTORY", href: "/history", isRoute: true },
    { name: "WINES", href: "#wines", isRoute: false },
    { name: "TEAM", href: "#team", isRoute: false },
    { name: "CONTACT", href: "#contact", isRoute: false },
    { name: "ABOUT US", href: "/about", isRoute: true },
    { name: "BUY WINE", href: "/buy-wine", isRoute: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-wine-nav/95 backdrop-blur-sm border-b border-wine-slate/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left Nav Items */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(0, 4).map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm tracking-widest text-wine-cream/80 hover:text-wine-bronze transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm tracking-widest text-wine-cream/80 hover:text-wine-bronze transition-colors duration-300"
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          {/* Center Logo */}
          <a href="#home" className="absolute left-1/2 -translate-x-1/2">
            <img 
              src={logo}
              alt="Amantes Winery"
              className="h-12 lg:h-14 w-auto"
            />
          </a>

          {/* Right Nav Items */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(4).map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm tracking-widest text-wine-cream/80 hover:text-wine-bronze transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm tracking-widest text-wine-cream/80 hover:text-wine-bronze transition-colors duration-300"
                >
                  {link.name}
                </a>
              )
            ))}
            <button className="text-wine-cream/80 hover:text-wine-bronze transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-wine-cream z-50"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-8 border-t border-wine-slate">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm tracking-widest text-wine-cream/80 hover:text-wine-bronze transition-colors"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm tracking-widest text-wine-cream/80 hover:text-wine-bronze transition-colors"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
