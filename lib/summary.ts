// Builds the plain-text request that goes to WhatsApp or SMS. No backend.
import { business, serviceById, type ServiceId } from "./business";
import { taskById } from "./tasks";

export type PlannerAnswers = {
  services: (ServiceId | "other")[];
  tasks: string[];
  frequency: "" | "one-time" | "recurring" | "not-sure";
  town: "" | "Potomac" | "Bethesda" | "Rockville" | "Silver Spring" | "Other";
  otherTown: string;
  street: string;
  when: "" | "asap" | "two-weeks" | "this-month" | "flexible";
  photos: "" | "whatsapp" | "text" | "none";
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export const emptyAnswers: PlannerAnswers = {
  services: [],
  tasks: [],
  frequency: "",
  town: "",
  otherTown: "",
  street: "",
  when: "",
  photos: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

export const frequencyLabels = {
  "one-time": "One-time project",
  recurring: "Recurring upkeep",
  "not-sure": "Not sure yet",
} as const;

export const whenLabels = {
  asap: "As soon as possible",
  "two-weeks": "Within 2 weeks",
  "this-month": "This month",
  flexible: "Flexible",
} as const;

export const photoLabels = {
  whatsapp: "I'll send photos on WhatsApp after this",
  text: "I'll text photos",
  none: "No photos right now",
} as const;

export function digitsOnly(phone: string) {
  let d = phone.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return d;
}
export function isValidUSPhone(phone: string) {
  const d = digitsOnly(phone);
  return d.length === 10 && /^[2-9]\d{2}[2-9]\d{6}$/.test(d);
}
export function formatPhone(phone: string) {
  const d = digitsOnly(phone);
  return d.length === 10 ? `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}` : phone.trim();
}

export function serviceLines(a: PlannerAnswers) {
  return a.services.map((id) => {
    if (id === "other") return { id, label: "Something else", tasks: [] as string[] };
    const tasks = a.tasks.filter((t) => taskById[t]?.service === id).map((t) => taskById[t].label);
    return { id, label: serviceById[id].name, tasks };
  });
}

export function townText(a: PlannerAnswers) {
  const town = a.town === "Other" ? a.otherTown.trim() || "Other Montgomery County town" : a.town;
  return [town, a.street.trim()].filter(Boolean).join(", ");
}

export function summaryRows(a: PlannerAnswers): [string, string][] {
  const rows: [string, string][] = [];
  const work = serviceLines(a)
    .map((s) => (s.tasks.length ? `${s.label} (${s.tasks.join(", ")})` : s.label))
    .join("; ");
  if (work) rows.push(["Work", work]);
  if (a.frequency) rows.push(["How often", frequencyLabels[a.frequency]]);
  if (a.town) rows.push(["Where", townText(a)]);
  if (a.when) rows.push(["When", whenLabels[a.when]]);
  if (a.photos) rows.push(["Photos", photoLabels[a.photos]]);
  rows.push(["Name", a.name.trim()]);
  rows.push(["Phone", formatPhone(a.phone)]);
  if (a.email.trim()) rows.push(["Email", a.email.trim()]);
  if (a.notes.trim()) rows.push(["Notes", a.notes.trim()]);
  return rows;
}

export function summaryText(a: PlannerAnswers) {
  return [
    `Hi ${business.name}, I would like an estimate.`,
    "",
    ...summaryRows(a).map(([k, v]) => `${k}: ${v}`),
  ].join("\n");
}

export function whatsappHref(a: PlannerAnswers) {
  return `${business.phone.whatsapp}?text=${encodeURIComponent(summaryText(a))}`;
}
// "?&body=" works on current iOS and Android. Older iOS needs ";body=".
export function smsHref(a: PlannerAnswers, legacy = false) {
  return `${business.phone.sms}${legacy ? ";" : "?&"}body=${encodeURIComponent(summaryText(a))}`;
}
