import { useScrollProgress } from "@/hooks/use-parallax";
import { useEffect, useState } from "react";

interface GrapevineSVGProps {
  side?: "left" | "right";
  className?: string;
}

const GrapevineSVG = ({ side = "left", className = "" }: GrapevineSVGProps) => {
  const scrollProgress = useScrollProgress();
  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    // Vine grows from 0% to 100% as you scroll through the page
    const targetGrowth = Math.min(scrollProgress * 1.5, 100);
    setGrowth(targetGrowth);
  }, [scrollProgress]);

  const isLeft = side === "left";

  return (
    <svg
      className={`fixed ${isLeft ? 'left-0' : 'right-0'} top-0 h-full w-24 md:w-32 lg:w-40 pointer-events-none z-30 ${className}`}
      viewBox="0 0 100 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        opacity: Math.min(growth / 20, 0.6),
        transform: isLeft ? 'scaleX(1)' : 'scaleX(-1)'
      }}
    >
      {/* Main vine stem */}
      <path
        d="M20,0 Q25,100 20,200 Q15,300 20,400 Q25,500 20,600 Q15,700 20,800"
        stroke="hsl(var(--wine-brown))"
        strokeWidth="2"
        fill="none"
        strokeDasharray="800"
        strokeDashoffset={800 - (growth * 8)}
        style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
      />
      
      {/* Leaves that appear as vine grows */}
      {growth > 15 && (
        <ellipse
          cx="25"
          cy="150"
          rx="8"
          ry="12"
          fill="hsl(var(--wine-bronze))"
          opacity={Math.min((growth - 15) / 10, 0.7)}
          style={{ transition: 'opacity 0.5s ease-out' }}
        />
      )}
      
      {growth > 25 && (
        <ellipse
          cx="15"
          cy="250"
          rx="10"
          ry="14"
          fill="hsl(var(--wine-bronze))"
          opacity={Math.min((growth - 25) / 10, 0.7)}
          style={{ transition: 'opacity 0.5s ease-out' }}
        />
      )}
      
      {growth > 40 && (
        <ellipse
          cx="25"
          cy="350"
          rx="9"
          ry="13"
          fill="hsl(var(--wine-bronze))"
          opacity={Math.min((growth - 40) / 10, 0.7)}
          style={{ transition: 'opacity 0.5s ease-out' }}
        />
      )}
      
      {growth > 55 && (
        <ellipse
          cx="15"
          cy="450"
          rx="11"
          ry="15"
          fill="hsl(var(--wine-bronze))"
          opacity={Math.min((growth - 55) / 10, 0.7)}
          style={{ transition: 'opacity 0.5s ease-out' }}
        />
      )}
      
      {growth > 70 && (
        <ellipse
          cx="25"
          cy="550"
          rx="10"
          ry="14"
          fill="hsl(var(--wine-bronze))"
          opacity={Math.min((growth - 70) / 10, 0.7)}
          style={{ transition: 'opacity 0.5s ease-out' }}
        />
      )}
      
      {/* Grape clusters that appear last */}
      {growth > 80 && (
        <g opacity={Math.min((growth - 80) / 15, 0.8)}>
          <circle cx="30" cy="200" r="4" fill="hsl(var(--wine-burgundy))" />
          <circle cx="27" cy="205" r="4" fill="hsl(var(--wine-burgundy))" />
          <circle cx="33" cy="205" r="4" fill="hsl(var(--wine-burgundy))" />
          <circle cx="30" cy="210" r="4" fill="hsl(var(--wine-burgundy))" />
        </g>
      )}
      
      {growth > 85 && (
        <g opacity={Math.min((growth - 85) / 15, 0.8)}>
          <circle cx="10" cy="400" r="4" fill="hsl(var(--wine-burgundy))" />
          <circle cx="7" cy="405" r="4" fill="hsl(var(--wine-burgundy))" />
          <circle cx="13" cy="405" r="4" fill="hsl(var(--wine-burgundy))" />
          <circle cx="10" cy="410" r="4" fill="hsl(var(--wine-burgundy))" />
        </g>
      )}
    </svg>
  );
};

export default GrapevineSVG;
