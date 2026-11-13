"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { seasonForMonth, monthNames } from "@/lib/seasons";
import { EstimateButton } from "@/components/ui/EstimateButton";

// Block 5. DRAFT: confirm seasonal focus with the owner.
// The month is computed at build time (prop) and refreshed on the client.
export function ThisMonth({ buildMonth, desktopPhoto, mobilePhoto }: { buildMonth: number; desktopPhoto: React.ReactNode; mobilePhoto: React.ReactNode }) {
  const [month, setMonth] = useState(buildMonth);
  useEffect(() => setMonth(new Date().getMonth()), []);
  const season = seasonForMonth(month);

  return (
    <section aria-labelledby="this-month-title" className="on-green relative isolate overflow-hidden bg-canopy text-on-green">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 hidden md:block">{desktopPhoto}</div>
        <div className="absolute inset-0 md:hidden">{mobilePhoto}</div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#073E2B_0%,rgba(7,62,43,0.92)_55%,rgba(7,62,43,0.35)_100%)] md:bg-[linear-gradient(90deg,#073E2B_0%,rgba(7,62,43,0.93)_42%,rgba(7,62,43,0.55)_52%,rgba(7,62,43,0)_66%)]" />
      </div>
      <div className="wrap flex min-h-[640px] items-end py-[72px] md:min-h-[600px] md:items-center lg:py-28">
        <div className="max-w-[500px]">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-green-line bg-canopy py-1.5 pl-1.5 pr-4">
            <span className="hatch block h-6 w-6 rounded-full" aria-hidden="true" />
            <span className="eyebrow">This month · {monthNames[month]}</span>
          </p>
          <h2 id="this-month-title" className="h2 mt-5">
            {season.name}
          </h2>
          <ul className="mt-6 space-y-2.5 text-[18px]">
            {season.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-lime text-canopy">
                  <Check aria-hidden size={15} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <EstimateButton preset={{ services: season.services }} className="btn btn-primary mt-8">
            Get My Estimate
          </EstimateButton>
        </div>
      </div>
    </section>
  );
}
