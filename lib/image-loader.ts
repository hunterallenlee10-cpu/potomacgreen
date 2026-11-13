// Custom next/image loader. Every photo is pre-sized by scripts/optimize-images.mjs,
// so this only picks the smallest generated width that covers the request.
import manifest from "./image-manifest.json";

type Entry = { width: number; height: number; widths: number[] };
const files = manifest as Record<string, Entry>;

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  // src looks like "/images/<base>"
  const base = src.replace(/^\/images\//, "");
  const entry = files[base];
  if (!entry) return src;
  const pick = entry.widths.find((w) => w >= width) ?? entry.widths[entry.widths.length - 1];
  return `/images/${base}-${pick}.webp`;
}
