// Service area data for the "Do you come to me?" checker and the county map.
//
// ZIP codes. Core-town ZIPs follow the USPS default city name for each ZIP
// (USPS ZIP Code Lookup: https://tools.usps.com/zip-code-lookup.htm?bycitystate).
// The USPS tool could not be queried from the build machine, so every ZIP below was
// cross-checked against the U.S. Census Bureau 2020 ZCTA relationship files:
//   ZCTA to county: https://www2.census.gov/geo/docs/maps-data/data/rel2020/zcta520/tab20_zcta520_county20_natl.txt
//   ZCTA to place:  https://www2.census.gov/geo/docs/maps-data/data/rel2020/zcta520/tab20_zcta520_place20_natl.txt
// 20854 (Potomac) is also listed on the owner's own site.
// DRAFT: Hunter to spot-check a few ZIPs in the USPS tool before launch.

export type CoreTown = "Potomac" | "Bethesda" | "Rockville" | "Silver Spring";

export const coreZips: Record<CoreTown, string[]> = {
  Potomac: ["20854", "20859"],
  Bethesda: ["20811", "20813", "20814", "20816", "20817", "20824", "20825", "20827", "20889", "20892", "20894"],
  Rockville: ["20847", "20848", "20849", "20850", "20851", "20852", "20853", "20857"],
  "Silver Spring": [
    "20901", "20902", "20903", "20904", "20905", "20906", "20907", "20908", "20910", "20911",
    "20914", "20915", "20916", "20918", "20993", "20997",
  ],
};

// Other ZIP codes with most of their land in Montgomery County (Census 2020 ZCTA to county file, county 24031).
export const otherMocoZips = [
  "20812", "20815", "20818", "20832", "20833", "20837", "20838", "20839", "20841", "20842", "20855",
  "20860", "20861", "20862", "20866", "20868", "20871", "20872", "20874", "20876", "20877", "20878",
  "20879", "20880", "20882", "20886", "20895", "20896", "20899", "20912",
];

// Montgomery County communities other than the four core towns (names of incorporated places and CDPs).
export const otherMocoTowns = [
  "Aspen Hill", "Ashton", "Barnesville", "Beallsville", "Boyds", "Brookeville", "Burtonsville", "Cabin John",
  "Chevy Chase", "Clarksburg", "Cloverly", "Colesville", "Damascus", "Darnestown", "Derwood", "Dickerson",
  "Fairland", "Forest Glen", "Friendship Heights", "Gaithersburg", "Garrett Park", "Germantown", "Glen Echo",
  "Glenmont", "Hillandale", "Kemp Mill", "Kensington", "Laytonsville", "Leisure World", "Montgomery Village",
  "North Bethesda", "North Potomac", "Olney", "Poolesville", "Redland", "Sandy Spring", "Somerset", "Spencerville",
  "Takoma Park", "Travilah", "Washington Grove", "Wheaton", "White Oak", "Four Corners",
  "Woodside", "Layhill", "Norbeck",
];

export type AreaResult =
  | { kind: "core"; town: CoreTown }
  | { kind: "nearby"; town: string }
  | { kind: "unknown"; town: string };

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

export function checkArea(input: string): AreaResult | null {
  const raw = input.trim();
  if (!raw) return null;
  const zip = raw.match(/\b(\d{5})\b/)?.[1];
  if (zip) {
    for (const [town, zips] of Object.entries(coreZips) as [CoreTown, string[]][]) {
      if (zips.includes(zip)) return { kind: "core", town };
    }
    if (otherMocoZips.includes(zip)) return { kind: "nearby", town: zip };
    return { kind: "unknown", town: zip };
  }
  const q = norm(raw.replace(/,?\s*(md|maryland)\b.*$/i, ""));
  // Longer names first so "North Bethesda" is not read as "Bethesda".
  const other = [...otherMocoTowns].sort((a, b) => b.length - a.length).find((t) => q === norm(t) || q.startsWith(norm(t) + " "));
  if (other) return { kind: "nearby", town: other };
  const core = (Object.keys(coreZips) as CoreTown[]).find((t) => q === norm(t) || q.startsWith(norm(t) + " "));
  if (core) return { kind: "core", town: core };
  if (/montgomery/.test(q)) return { kind: "nearby", town: "Montgomery County" };
  return { kind: "unknown", town: raw };
}

// Simplified Montgomery County, MD outline (GEOID 24031), projected for a 600 x 514 viewBox.
// Source: U.S. Census Bureau TIGER/Line county boundaries (public domain), via the TIGERweb REST service:
// https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/1/query?where=GEOID%3D%2724031%27&returnGeometry=true&outSR=4326&maxAllowableOffset=0.0012&f=geojson
export const countyViewBox = { width: 600, height: 514 };
export const countyPath =
  "M355.4 86.4L340 71.5L338 72.1L336.1 66.8L333 65.6L330.4 57.3L318.5 37.3L321.2 29L334.3 20L332 21L80.1 170.5L67 184L65.1 191.4L65.8 198.6L62.7 205.1L56.5 209.3L37.4 214.5L32.1 221.5L25.3 236.5L22.2 251.3L20 253.7L22.4 275.1L27.9 284.1L52.2 293.1L58.4 297.5L71.5 318.4L71.2 322.7L76.9 333.1L81.1 336.2L113.5 344.5L144.1 349.3L186.8 349L202 359.1L214 360.8L224.5 366.4L241.2 380.7L259.1 385.9L265.1 389.9L267.6 395.1L267.2 399.7L260.3 409L258.1 417.3L260.6 424.5L264.4 427.8L267.5 439L271.9 441.1L276.1 446.4L280.7 442.4L286.2 451L296.9 454.1L299.9 453.1L306.4 456.4L323.4 454.7L353.2 459.5L363.7 471.9L369.7 486L377.3 493.7L446.4 424.2L480.2 458.2L487.4 447.3L493.8 445.3L495.6 433.9L490.1 428L562.2 302.1L566.5 289.9L563.5 286.2L574.9 279.4L580 271.4L571.1 276.5L564 277.7L556.4 276.2L553.7 270.6L546.8 266.6L545.2 263.2L529 273.2L518.6 268L523.4 262.4L523.6 258.1L526.2 256.7L525.5 255.3L515.4 254.8L512.9 251.5L503.8 250.4L502.7 245.4L505.7 236.3L493.2 231.4L484.7 231.4L481.4 227.9L484.5 222.3L478.5 222.5L477.4 220.4L483.2 218.5L474.8 214.1L478.6 202.1L471.6 198.9L474 185.9L466.8 182.4L465.4 178.9L454 170.5L454.1 165.9L443 150.8L429.7 148L428.2 146.6L427.8 140.1L424.8 135.8L410.3 125.6L391.5 118.9L385.2 121L379.7 117.2L368 116.3L364.6 113.2L364.7 106.9L359.6 99.5L361.4 93.8L359.4 92.5L359.5 89.4L355.4 86.4Z";

// Approximate town centres, projected the same way (lat/long from Census place centroids).
export const townPins: { town: CoreTown; x: number; y: number; label: "left" | "right" | "top" | "bottom" }[] = [
  { town: "Rockville", x: 348.3, y: 324.5, label: "right" },
  { town: "Potomac", x: 299.4, y: 398.9, label: "left" },
  { town: "Bethesda", x: 399.3, y: 441.2, label: "bottom" },
  { town: "Silver Spring", x: 459.4, y: 429.9, label: "top" },
];
