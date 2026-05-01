import captainNova from "@/assets/captain-nova.png";
import Image from "next/image";

interface CaptainAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  pulse?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-40 w-40",
  xl: "h-56 w-56",
};

export default function CaptainAvatar({
  size = "md",
  pulse = true,
  className = "",
}: CaptainAvatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 rounded-full bg-linear-to-br from-neon-cyan/40 via-neon-blue/30 to-neon-purple/40 blur-2xl ${pulse ? "animate-pulse-glow" : ""}`}
      />
      <div
        className={`${sizeMap[size]} relative rounded-full p-0.5 bg-linear-to-br from-neon-cyan via-neon-blue to-neon-purple`}
      >
        <div className="h-full w-full overflow-hidden rounded-full bg-background">
          <Image
            src={captainNova}
            alt="Captain Nova, your AI esports captain"
            width={1024}
            height={1280}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
