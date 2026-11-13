// Every photo on the site. Paths point at /images/<base>; lib/image-loader.ts picks the
// right pre-sized .webp. Alt text describes the scene only. Never "our work".
//
// Pexels source URLs: the Drive file names do not carry the Pexels photo IDs, so the
// exact page URLs are not recorded here yet. DRAFT: Hunter to paste each Pexels page URL.
import manifest from "./image-manifest.json";

type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  source: string | null; // Pexels page URL
};

const m = manifest as Record<string, { width: number; height: number }>;
function photo(base: string, alt: string, source: string | null = null): Photo {
  const e = m[base];
  return { src: `/images/${base}`, width: e.width, height: e.height, alt, source };
}

export const images = {
  // Owner's logo files (not stock).
  logo: photo("00-logo-logo-tree-shovel-transparent", "Potomac Green logo"),
  siteIcon: photo("00-logo-2-logo-site-icon-512", "Potomac Green logo"),

  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  hero: photo(
    "01-STOCK-white-brick-home-black-mulch-beds-boxwood-urns-HERO",
    "White brick house with a black front door, boxwood balls in iron urns and a freshly edged black mulch bed beside a concrete walk",
  ),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  heroMobile: photo(
    "01-STOCK-white-brick-home-black-mulch-beds-boxwood-urns-HERO-mobile",
    "White brick house with a black front door, boxwood balls in iron urns and a freshly edged black mulch bed beside a concrete walk",
  ),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  hedge: photo(
    "02-STOCK-hedge-trimmer-arborvitae-golden-light",
    "Hedge trimmer cutting into a golden green arborvitae in late afternoon light",
  ),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  mulch: photo("03-STOCK-hands-spreading-dark-mulch", "Hands spreading dark hardwood mulch around a young tree"),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  planting: photo("04-STOCK-gloved-hands-planting-seedling", "Gloved hands setting a seedling into dark soil"),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  pots: photo(
    "05-STOCK-potted-evergreens-row-against-wall",
    "Row of ribbed planters with olive trees and evergreens against sage green siding",
  ),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  planter: photo(
    "06-STOCK-rustic-wood-planter-box-succulents",
    "Rustic wood planter box of succulents on a long outdoor table",
  ),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  assembly: photo(
    "07-STOCK-assembly-instructions-hammer-screwdrivers",
    "Furniture assembly diagram with a hammer, screwdrivers, dowels and a tape measure",
  ),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  moving: photo("08-STOCK-moving-boxes-bright-room", "Stacked moving boxes in a bright room with tall arched windows"),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  raking: photo(
    "09-STOCK-raking-leaves-park-portrait",
    "Groundskeeper raking leaves between low clipped hedges under tall trees",
  ),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  wheelbarrow: photo(
    "10-STOCK-wheelbarrow-garden-debris-hedge",
    "Wheelbarrow heaped with garden clippings on a lawn in front of a tall clipped hedge",
  ),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  stripedLawn: photo(
    "11-STOCK-striped-lawn-brick-home-blue-sky",
    "Freshly mowed striped lawn in front of a brick ranch house under a blue sky",
  ),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  ranchWide: photo(
    "12-STOCK-white-ranch-wide-fresh-beds",
    "White brick ranch house with a long fresh mulch bed and a wide lawn",
  ),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  topiary: photo(
    "13-STOCK-topiary-garden-path-deep-green",
    "Deep green formal garden with columnar topiaries, boxwood balls and a curving stone path",
  ),
  // Free stock (Pexels License). Swap for a Potomac Green job photo when the owner supplies one.
  cottage: photo(
    "14-STOCK-cream-cottage-lawn-evergreens",
    "Cream cottage with a wide front lawn, evergreens and mature trees",
  ),
} as const;

export type ImageKey = keyof typeof images;
