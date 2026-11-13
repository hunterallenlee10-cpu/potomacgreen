"use client";

import { useState, type FormEvent } from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { checkArea, type AreaResult } from "@/lib/area";
import { business } from "@/lib/business";
import { EstimateButton } from "@/components/ui/EstimateButton";
import type { PlannerPreset } from "@/components/VisitPlanner/PlannerContext";

export function AreaChecker() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<AreaResult | null>(null);
  const [asked, setAsked] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAsked(value.trim());
    setResult(checkArea(value));
  };

  let message = "";
  let preset: PlannerPreset = {};
  if (result?.kind === "core") {
    message = `Yes. ${result.town} is one of our core areas. Text us a photo of the job.`;
    preset = { town: result.town };
  } else if (result?.kind === "nearby") {
    message =
      "Possibly. We take nearby Montgomery County jobs depending on the job and schedule. Send the location and a photo.";
    preset = { town: "Other", otherTown: asked };
  } else if (result?.kind === "unknown") {
    message = "That may be outside our area, but ask. Send the location and we will tell you.";
    preset = { town: "Other", otherTown: asked };
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row" role="search" aria-label="Check your town or ZIP">
        <label htmlFor="area-input" className="sr-only">
          Your town or ZIP
        </label>
        <div className="relative flex-1">
          <MapPin aria-hidden size={20} strokeWidth={1.75} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id="area-input"
            type="text"
            inputMode="text"
            autoComplete="postal-code"
            placeholder="Your town or ZIP"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-14 w-full rounded-full border border-line bg-card pl-12 pr-5 text-[17px] text-ink placeholder:text-muted focus:border-canopy"
          />
        </div>
        <button type="submit" className="btn btn-green !min-h-14 px-8">
          Check
        </button>
      </form>

      <div aria-live="polite" className="min-h-[1px]">
        {result && (
          <div
            className={`mt-5 rounded-[14px] border p-5 ${
              result.kind === "core" ? "border-canopy bg-card" : "border-line bg-card"
            }`}
          >
            <p className="flex items-start gap-3 text-[18px] font-semibold leading-snug">
              <span
                className={`mt-1 inline-block size-3 shrink-0 rounded-full ${
                  result.kind === "core" ? "bg-lime ring-2 ring-canopy" : result.kind === "nearby" ? "bg-canopy/50" : "bg-muted/40"
                }`}
                aria-hidden="true"
              />
              {message}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 pl-6">
              <EstimateButton preset={preset} className="btn btn-primary" />
              <a href={business.phone.whatsapp} rel="noopener" className="text-link">
                <MessageCircle aria-hidden size={17} strokeWidth={1.75} /> Send a photo on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
