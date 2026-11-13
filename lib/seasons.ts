// DRAFT: confirm seasonal focus with the owner.
// Uses only his eight services. Keyed by month (0 = January).
import type { ServiceId } from "./business";

export type Season = {
  id: "spring" | "summer" | "fall" | "winter";
  name: string;
  months: number[];
  bullets: string[];
  services: ServiceId[];
  image: "wheelbarrow";
};

export const seasons: Season[] = [
  {
    id: "spring",
    name: "Spring beds",
    months: [2, 3, 4],
    bullets: ["Flowerbed prep", "Planting flowers and shrubs", "Mulch refresh", "Decorative plants and pots"],
    services: ["flowerbed-planting", "mulch-lawn-care", "decorative-plants"],
    image: "wheelbarrow",
  },
  {
    id: "summer",
    name: "Summer upkeep",
    months: [5, 6, 7],
    bullets: ["Trimming and hedging", "Edging beds", "Basic lawn upkeep", "Recurring upkeep visits"],
    services: ["trimming-hedging", "mulch-lawn-care"],
    image: "wheelbarrow",
  },
  {
    id: "fall",
    name: "Fall cleanup",
    months: [8, 9, 10],
    bullets: [
      "Seasonal cleanup",
      "Cutting back overgrown plantings",
      "Mulch refresh",
      "Moving patio furniture and planters",
    ],
    services: ["mulch-lawn-care", "trimming-hedging", "moving-help"],
    image: "wheelbarrow",
  },
  {
    id: "winter",
    name: "Indoor season",
    months: [11, 0, 1],
    bullets: ["Furniture assembly", "Moving help", "Small household tasks", "Planter builds, ready for spring"],
    services: ["furniture-assembly", "moving-help", "light-handyman", "planter-construction"],
    image: "wheelbarrow",
  },
];

export function seasonForMonth(month: number): Season {
  return seasons.find((s) => s.months.includes(month)) ?? seasons[0];
}

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
