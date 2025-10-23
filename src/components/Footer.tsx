import logo from "@/assets/amantes-logo-blue.png";
import footerShape from "@/assets/footer-shape-2.svg";
import vineyardBg from "@/assets/vineyard-hero.jpg";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Top Section - Light Background with Content */}
      <div className="bg-wine-cream py-16 pb-32 relative">
        <div className="container mx-auto px-4">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <img 
              src={logo}
              alt="Amantes Winery"
              className="w-48 h-auto"
            />
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
            {/* Contact */}
            <div>
              <h4 className="text-wine-deep font-semibold mb-4 tracking-wider text-sm">Our Address</h4>
              <div className="space-y-2 text-wine-slate">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=40420+Calle+Concion+Temecula+CA+92592" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-wine-bronze transition-colors block"
                >
                  40420 Calle Concion<br />Temecula, California, 92592
                </a>
              </div>
            </div>

            {/* Book/Contact */}
            <div>
              <h4 className="text-wine-deep font-semibold mb-4 tracking-wider text-sm">Book A Visit</h4>
              <div className="space-y-2 text-wine-slate">
                <p>Monday to Saturday</p>
                <a href="tel:+19513832223" className="hover:text-wine-bronze transition-colors block">
                  951-383-2223
                </a>
              </div>
            </div>

            {/* Distribution */}
            <div>
              <h4 className="text-wine-deep font-semibold mb-4 tracking-wider text-sm">Distribution</h4>
              <div className="space-y-2 text-wine-slate">
                <p>For any inquiries write us at</p>
                <a href="mailto:amantes@amantesvineyard.com" className="hover:text-wine-bronze transition-colors block">
                  amantes@amantesvineyard.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wavy Shape Transition */}
        <div className="absolute bottom-0 left-0 right-0 -mb-px bg-red-500" style={{ height: '103px' }}>
          <svg 
            width="100%" 
            height="103" 
            viewBox="0 0 2062 103" 
            preserveAspectRatio="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="block w-full h-full"
          >
            <path 
              d="M738.098 61.8c47.602-7.69 98.826-21.973 153.671-42.848-80.716 36.256-136.245 41.46-131.163 42.848 25.04 6.842 90.3 29.674 95.462 33.784 6.209 4.944 20.179 0 20.179 0S913.5 103 915.829 103c2.328 0 38.806-12.36 53.552-12.36 14.746 0 47.343 12.36 70.627 12.36 23.283 0 76.059-7.416 232.059-59.328-53.553 22.248-97.42 32.96-93.91 32.96 10.865 0 38.048-14.477 129.61 0 42.687 6.749 123.403-16.48 116.418-20.6-6.985-4.12-15.956-4.693-15.522-4.944 1.229-.709 45.791 3.296 76.836 14.008 37.425 12.914 40.358 13.184 61.313 9.888C1576.304 70.04 1977.867 29 2060 29c2 0 2-9.667 0-29H0v29c27.147 0 632.546 42.688 665.143 42.688 21.731 0 46.05-3.296 72.955-9.888z" 
              fill="hsl(var(--wine-cream))" 
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Bottom Section - Dark Vineyard Background */}
      <div 
        className="relative py-12 bg-cover bg-center"
        style={{ backgroundImage: `url(${vineyardBg})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4">
          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-6">
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
              href="https://www.tripadvisor.com/Attraction_Review-g33174-d8851896-Reviews-Amantes_Vineyard-Temecula_California.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-wine-bronze transition-colors flex items-center justify-center"
              aria-label="TripAdvisor"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H.076l1.346 1.345c-.71 1.24-1.12 2.67-1.12 4.196 0 4.56 3.696 8.256 8.255 8.256 2.405 0 4.59-.98 6.145-2.569.015-.014.028-.028.042-.043l.043.043c1.556 1.588 3.74 2.569 6.145 2.569 4.56 0 8.256-3.696 8.256-8.256 0-1.526-.41-2.956-1.12-4.196l1.346-1.345h-4.385c-2.307-1.569-4.975-2.353-7.645-2.353-1.465 0-2.926.226-4.332.673-1.406-.447-2.867-.673-4.332-.673zm-5.58 5.126c2.883 0 5.222 2.339 5.222 5.222s-2.339 5.222-5.222 5.222-5.222-2.339-5.222-5.222 2.339-5.222 5.222-5.222zm11.26 0c2.883 0 5.222 2.339 5.222 5.222s-2.339 5.222-5.222 5.222-5.222-2.339-5.222-5.222 2.339-5.222 5.222-5.222zm-11.26 1.364c-2.133 0-3.858 1.726-3.858 3.858s1.726 3.858 3.858 3.858 3.858-1.726 3.858-3.858-1.726-3.858-3.858-3.858zm11.26 0c-2.133 0-3.858 1.726-3.858 3.858s1.726 3.858 3.858 3.858 3.858-1.726 3.858-3.858-1.726-3.858-3.858-3.858zm-11.26 1.08c1.48 0 2.778 1.298 2.778 2.778s-1.298 2.778-2.778 2.778-2.778-1.298-2.778-2.778 1.298-2.778 2.778-2.778zm11.26 0c1.48 0 2.778 1.298 2.778 2.778s-1.298 2.778-2.778 2.778-2.778-1.298-2.778-2.778 1.298-2.778 2.778-2.778z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
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
