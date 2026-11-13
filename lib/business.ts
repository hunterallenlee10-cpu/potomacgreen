// Every business fact on the site comes from this file. Invent nothing.
// Source: the owner's current site (potomacgreen.biz) and his business card.

export const business = {
  name: "Potomac Green",
  wordmark: "POTOMAC GREEN",
  tagline: "LANDSCAPING & HANDYMAN SERVICES",
  cardTagline: "LANDSCAPING AND HANDYMAN SERVICES",
  established: "2026",
  // Owner name unknown. DRAFT: add his name if he wants it shown.
  ownerName: null as string | null,

  phone: {
    display: "301-674-9361",
    e164: "+13016749361",
    schema: "+1-301-674-9361",
    tel: "tel:+13016749361",
    sms: "sms:+13016749361",
    whatsapp: "https://wa.me/13016749361",
  },
  email: "potomacservice@gmail.com",
  currentSite: "https://potomacgreen.biz",
  // DRAFT: add socials if the owner has them. None found.
  socials: [] as { label: string; href: string }[],

  towns: ["Potomac", "Bethesda", "Rockville", "Silver Spring"] as const,
  potomacZip: "20854",
  county: "Montgomery County",
  state: "Maryland",
  stateShort: "MD",
  areaLine: "Serving Potomac, Bethesda, Rockville & Silver Spring, Maryland",
  nearbyLine: "nearby Montgomery County communities, depending on the job and schedule",

  hours: {
    label: "Typical hours",
    text: "Monday to Friday, 8:00 a.m. to 4:00 p.m.",
    short: "Mon to Fri, 8 to 4",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "16:00",
  },

  lines: {
    hero: "One call. More gets done.",
    handled: "Montgomery County outdoor care and small jobs, handled.",
    small: "Small jobs welcome.",
    practical: "A practical option when a large contractor is unnecessary.",
    photos: "Share the task and photos before scheduling.",
    limits: "Clear limits when a job requires a licensed specialist.",
    oneContact:
      "One local contact for landscaping, planting, yard upkeep, furniture assembly, moving help and light handyman jobs.",
    andMore: "Have a different small job? Send a photo and a short description to see whether it is a fit.",
  },
} as const;

export type ServiceId =
  | "flowerbed-planting"
  | "trimming-hedging"
  | "mulch-lawn-care"
  | "decorative-plants"
  | "planter-construction"
  | "furniture-assembly"
  | "moving-help"
  | "light-handyman";

export type Service = {
  id: ServiceId;
  name: string;
  short: string; // used in "Plan {short}"
  description: string;
  kind: "yard" | "house";
};

export const services: Service[] = [
  {
    id: "flowerbed-planting",
    name: "Flowerbed Prep & Planting",
    short: "flowerbed prep",
    description: "Prepare beds, place new flowers and shrubs, refresh existing garden areas.",
    kind: "yard",
  },
  {
    id: "trimming-hedging",
    name: "Trimming & Hedging",
    short: "trimming and hedging",
    description: "Shape shrubs and hedges, clean up overgrown plantings.",
    kind: "yard",
  },
  {
    id: "mulch-lawn-care",
    name: "Mulch & Lawn Care",
    short: "mulch and lawn care",
    description: "Mulch installation, basic lawn upkeep, edging, cleanup, seasonal refresh.",
    kind: "yard",
  },
  {
    id: "decorative-plants",
    name: "Decorative Plants",
    short: "decorative plants",
    description: "Selection and placement help for plants, pots and outdoor accents.",
    kind: "yard",
  },
  {
    id: "planter-construction",
    name: "Planter Construction",
    short: "a planter build",
    description: "Simple custom planters and raised planting solutions for patios, yards and entries.",
    kind: "yard",
  },
  {
    id: "furniture-assembly",
    name: "Furniture Assembly",
    short: "furniture assembly",
    description: "Indoor and outdoor furniture and household items.",
    kind: "house",
  },
  {
    id: "moving-help",
    name: "Moving Help",
    short: "moving help",
    description: "Furniture, boxes, planters and other manageable items around the property.",
    kind: "house",
  },
  {
    id: "light-handyman",
    name: "Light Handyman Tasks",
    short: "light handyman tasks",
    description: "Small, non-specialty household tasks that do not require a licensed trade contractor.",
    kind: "house",
  },
];

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s])) as Record<ServiceId, Service>;
export const yardServiceIds = services.filter((s) => s.kind === "yard").map((s) => s.id);

// Short list printed on the back of his card.
export const cardServices = [
  "Flowerbed Prep/Planting",
  "Trimming/Hedging",
  "Mulch",
  "Lawn Care",
  "Furniture Assembly/Moving",
  "Decorative Plants",
  "Planter Construction",
  "And more",
];

// From his site, one line per core town.
export const townLines: Record<(typeof business.towns)[number], string> = {
  Potomac:
    "Garden-bed preparation, planting, hedge trimming, mulch, lawn cleanup, planter projects, furniture assembly.",
  Bethesda: "Yard and patio upkeep, decorative planting, seasonal cleanup, outdoor furniture assembly, moving help.",
  Rockville: "Shrub and hedge care, edging, mulch, raised planters, cleanup, furniture assembly.",
  "Silver Spring": "Garden refreshes, trimming, yard cleanup, decorative plants, assembly, moving assistance.",
};
