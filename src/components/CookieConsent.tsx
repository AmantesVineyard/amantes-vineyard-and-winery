import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  useEffect(() => {
    const consent = getCookie("cookieConsent");
    if (!consent) {
      // Delay showing the cookie banner to let age verification appear first
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookie("cookieConsent", "accepted", 365);
    setShowBanner(false);
  };

  const handleDecline = () => {
    setCookie("cookieConsent", "declined", 365);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-wine-deep/95 backdrop-blur-sm border-t border-wine-gold/20 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-wine-cream text-sm sm:text-base">
          <p>
            We use cookies to enhance your browsing experience, including remembering your age verification. 
            By continuing to use this site, you agree to our use of cookies.{" "}
            <a href="/privacy" className="text-wine-gold hover:underline">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleDecline}
            variant="outline"
            size="sm"
            className="border-wine-cream/30 text-wine-cream hover:bg-wine-cream/10"
          >
            Decline
          </Button>
          <Button
            onClick={handleAccept}
            size="sm"
            className="bg-wine-gold text-wine-deep hover:bg-wine-gold/90"
          >
            Accept Cookies
          </Button>
          <button
            onClick={handleDecline}
            className="text-wine-cream/60 hover:text-wine-cream p-1"
            aria-label="Close cookie banner"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
