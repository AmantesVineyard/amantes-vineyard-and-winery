import logo from "@/assets/amantes-logo.png";
import footerShape from "@/assets/footer-shape-2.svg";
import vineyardBg from "@/assets/vineyard-hero.jpg";
import GrapevineSVG from "@/components/GrapevineSVG";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Wavy Shape Transition */}
      <div className="relative w-full pointer-events-none overflow-hidden" style={{ height: '103px' }}>
        <svg 
          className="w-full h-full block"
          viewBox="0 0 2062 103" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <style>
              {`.st0 { isolation: isolate; opacity: .3; } .st1 { fill: #f9f8f4; fill-rule: evenodd; }`}
            </style>
          </defs>
          <path 
            className="st1"
            d="M738.1,61.8c47.6-7.69,98.83-21.97,153.67-42.85-80.72,36.26-136.24,41.46-131.16,42.85,25.04,6.84,90.3,29.67,95.46,33.78,6.21,4.94,20.18,0,20.18,0,0,0,37.25,7.42,39.58,7.42s38.81-12.36,53.55-12.36,47.34,12.36,70.63,12.36,76.06-7.42,232.06-59.33c-53.55,22.25-97.42,32.96-93.91,32.96,10.86,0,38.05-14.48,129.61,0,42.69,6.75,123.4-16.48,116.42-20.6s-15.96-4.69-15.52-4.94c1.23-.71,45.79,3.3,76.84,14.01,37.43,12.91,40.36,13.18,61.31,9.89,29.49-4.94,431.06-45.98,513.19-45.98,2,0,2-9.67,0-29H0v29c27.15,0,632.55,42.69,665.14,42.69,21.73,0,46.05-3.3,72.96-9.89Z"
          />
        </svg>
      </div>

      {/* Main Footer - Dark Vineyard Background */}
      <div 
        className="relative py-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${vineyardBg})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4">
          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-12">
            {/* Left - Logo and Social Links */}
            <div className="flex flex-col items-center md:items-start">
              <img 
                src={logo}
                alt="Amantes Winery"
                className="w-48 h-auto mb-6"
              />
              {/* Social Icons */}
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/amantesvineyard/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-wine-bronze transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/amantesvineyard" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-wine-bronze transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@amantesvineyard" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-wine-bronze transition-colors flex items-center justify-center"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Middle - Explore and Learn */}
            <div className="grid grid-cols-2 gap-8">
              {/* Explore */}
              <div>
                <h4 className="text-white font-semibold mb-4 tracking-wider text-sm">EXPLORE</h4>
                <ul className="space-y-2 text-white/80">
                  <li>
                    <a href="/buy-wine" className="hover:text-wine-bronze transition-colors">
                      Buy Wine
                    </a>
                  </li>
                  <li>
                    <a href="/team" className="hover:text-wine-bronze transition-colors">
                      Team
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-wine-bronze transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Learn */}
              <div>
                <h4 className="text-white font-semibold mb-4 tracking-wider text-sm">LEARN</h4>
                <ul className="space-y-2 text-white/80">
                  <li>
                    <a href="/history" className="hover:text-wine-bronze transition-colors">
                      History
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="hover:text-wine-bronze transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#wines" className="hover:text-wine-bronze transition-colors">
                      Wines
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right - Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-4 tracking-wider text-sm">CONTACT</h4>
              <div className="space-y-2 text-white/80">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=40420+Calle+Concion+Temecula+CA+92592" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-wine-bronze transition-colors block"
                >
                  40420 Calle Concion<br />Temecula, CA 92592
                </a>
                <p className="pt-2">
                  <a href="tel:+19513832223" className="hover:text-wine-bronze transition-colors">
                    +1 951-383-2223
                  </a>
                </p>
                <p>
                  <a href="mailto:amantes@amantesvineyard.com" className="hover:text-wine-bronze transition-colors">
                    amantes@amantesvineyard.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-white/80 text-sm">
              © 2025 Ha-Adamah, LLC All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
