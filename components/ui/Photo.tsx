import Image from "next/image";
import { images, type ImageKey } from "@/lib/images";

// next/image wrapper for the photo map. Lazy by default, fills its (positioned) parent.
export function Photo({
  name,
  sizes,
  className = "",
  position,
  decorative = false,
}: {
  name: ImageKey;
  sizes: string;
  className?: string;
  position?: string;
  decorative?: boolean;
}) {
  const img = images[name];
  return (
    <Image
      src={img.src}
      alt={decorative ? "" : img.alt}
      fill
      sizes={sizes}
      className={`object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
