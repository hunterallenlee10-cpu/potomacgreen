import Image from "next/image";
import { images } from "@/lib/images";

// The owner's logo mark. Never shown above 260px tall (source is 220 x 260).
export function LogoMark({ height = 36, className = "", decorative = true }: { height?: number; className?: string; decorative?: boolean }) {
  const width = Math.round((images.logo.width / images.logo.height) * height);
  return (
    <Image
      src={images.logo.src}
      width={width}
      height={height}
      sizes={`${width}px`}
      alt={decorative ? "" : images.logo.alt}
      className={className}
    />
  );
}

export function Wordmark({ size = "md", tone = "light" }: { size?: "sm" | "md" | "lg"; tone?: "light" | "dark" }) {
  const main = size === "lg" ? "text-[22px]" : size === "sm" ? "text-[15px]" : "text-[17px]";
  const sub = size === "lg" ? "text-[10.5px]" : "text-[8.5px]";
  return (
    <span className="flex flex-col leading-none">
      <span className={`wordmark ${main} ${tone === "light" ? "text-on-green" : "text-canopy"}`}>Potomac Green</span>
      <span
        className={`mt-[5px] font-bold uppercase tracking-[0.16em] ${sub} ${tone === "light" ? "text-on-green-muted" : "text-muted"}`}
      >
        Landscaping &amp; Handyman Services
      </span>
    </span>
  );
}
