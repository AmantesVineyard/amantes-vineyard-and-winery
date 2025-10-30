import hanukkahBanner from "@/assets/hanukkah-banner.png";

const HanukkahBanner = () => {
  return (
    <div className="w-full bg-wine-cream flex justify-center pb-10">
      <a 
        href="https://amantesvineyard.orderport.net/product-details/0014/Hanukkah-Gift-Collection"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-6xl px-4 hover:opacity-90 transition-opacity duration-300"
      >
        <img 
          src={hanukkahBanner} 
          alt="Hanukkah Gift Collection - 3 Bottles for the Price of 2"
          className="w-[85%] h-auto mx-auto"
        />
      </a>
    </div>
  );
};

export default HanukkahBanner;
