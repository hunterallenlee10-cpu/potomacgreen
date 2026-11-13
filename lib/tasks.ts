// The One Visit List chips. Written in the owner's terms.
// status: handled = on his list, licensed = needs a licensed trade, ask = not on the usual list.
import type { ServiceId } from "./business";

export type TaskStatus = "handled" | "licensed" | "ask";

export type Task = {
  id: string;
  label: string;
  status: TaskStatus;
  service?: ServiceId; // handled tasks map to one of his eight services
};

export type TaskGroup = { id: string; title: string; muted?: boolean; tasks: Task[] };

const h = (id: string, label: string, service: ServiceId): Task => ({ id, label, status: "handled", service });

export const taskGroups: TaskGroup[] = [
  {
    id: "yard",
    title: "Yard",
    tasks: [
      h("prep-flowerbed", "Prep a flowerbed", "flowerbed-planting"),
      h("plant-flowers-shrubs", "Plant flowers or shrubs", "flowerbed-planting"),
      h("refresh-garden", "Refresh a garden area", "flowerbed-planting"),
      h("trim-shrubs", "Trim shrubs", "trimming-hedging"),
      h("shape-hedges", "Shape hedges", "trimming-hedging"),
      h("overgrown-plantings", "Clean up overgrown plantings", "trimming-hedging"),
      h("install-mulch", "Install mulch", "mulch-lawn-care"),
      h("edge-beds", "Edge beds", "mulch-lawn-care"),
      h("lawn-upkeep", "Basic lawn upkeep", "mulch-lawn-care"),
      h("seasonal-cleanup", "Seasonal cleanup", "mulch-lawn-care"),
    ],
  },
  {
    id: "planters",
    title: "Planters and plants",
    tasks: [
      h("place-plants", "Pick and place decorative plants", "decorative-plants"),
      h("arrange-pots", "Arrange pots and outdoor accents", "decorative-plants"),
      h("custom-planter", "Build a custom planter", "planter-construction"),
      h("raised-planter", "Build a raised planter", "planter-construction"),
    ],
  },
  {
    id: "house",
    title: "Around the house",
    tasks: [
      h("assemble-indoor", "Assemble indoor furniture", "furniture-assembly"),
      h("assemble-outdoor", "Assemble outdoor furniture", "furniture-assembly"),
      h("outdoor-items", "Set up outdoor items", "light-handyman"),
      h("household-task", "Small household task", "light-handyman"),
    ],
  },
  {
    id: "moving",
    title: "Moving",
    tasks: [
      h("move-furniture", "Move furniture", "moving-help"),
      h("move-boxes", "Move boxes", "moving-help"),
      h("move-planters", "Move planters", "moving-help"),
    ],
  },
  {
    id: "also",
    title: "Also asked about",
    muted: true,
    tasks: [
      { id: "electrical", label: "Electrical work", status: "licensed" },
      { id: "plumbing", label: "Plumbing", status: "licensed" },
      { id: "roof", label: "Roof repair", status: "licensed" },
      { id: "hvac", label: "HVAC", status: "licensed" },
      { id: "gas", label: "Gas lines", status: "licensed" },
      { id: "tree-removal", label: "Large tree removal", status: "ask" },
      { id: "gutters", label: "Gutter cleaning", status: "ask" },
      { id: "power-washing", label: "Power washing", status: "ask" },
      { id: "painting", label: "Painting", status: "ask" },
      { id: "snow", label: "Snow removal", status: "ask" },
    ],
  },
];

export const allTasks: Task[] = taskGroups.flatMap((g) => g.tasks);
export const taskById: Record<string, Task> = Object.fromEntries(allTasks.map((t) => [t.id, t]));

// Pre-selected one by one when the list first scrolls into view.
export const demoTaskIds = ["install-mulch", "shape-hedges", "assemble-outdoor"];
