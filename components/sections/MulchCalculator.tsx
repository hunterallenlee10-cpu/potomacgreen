"use client";

import { useId, useState } from "react";
import { ChevronDown, Calculator } from "lucide-react";
import { EstimateButton } from "@/components/ui/EstimateButton";

// Quantities only, never prices.
export function mulchQuantities(lengthFt: number, widthFt: number, depthIn: number) {
  const cubicFeet = lengthFt * widthFt * (depthIn / 12);
  const cubicYards = cubicFeet / 27;
  const bags = Math.ceil(cubicFeet / 2 - 1e-9); // 2 cubic foot bags
  return { cubicFeet, cubicYards: Math.round(cubicYards * 10) / 10, bags };
}

export function MulchCalculator() {
  const [open, setOpen] = useState(false);
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("4");
  const [depth, setDepth] = useState(3);
  const id = useId();

  const L = parseFloat(length);
  const W = parseFloat(width);
  const valid = L > 0 && W > 0 && L < 10000 && W < 10000;
  const q = valid ? mulchQuantities(L, W, depth) : null;
  const notes = q
    ? `Mulch bed about ${L} ft by ${W} ft at ${depth} inches deep (calculator: about ${q.cubicYards.toFixed(1)} cubic yards, or ${q.bags} bags of 2 cubic feet).`
    : undefined;

  const field =
    "mt-1.5 h-12 w-full rounded-[10px] border border-line bg-paper px-3 text-[17px] font-semibold text-ink focus:border-canopy";

  return (
    <div className="mt-5 rounded-[12px] border border-line bg-paper">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-12 w-full items-center gap-2.5 px-4 text-left font-bold text-canopy"
      >
        <Calculator aria-hidden size={18} strokeWidth={1.75} />
        How much mulch do I need?
        <ChevronDown aria-hidden size={18} strokeWidth={1.75} className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div id={`${id}-panel`} hidden={!open} className="border-t border-line px-4 pb-5 pt-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="text-[15px] font-semibold text-muted">
            Bed length (feet)
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.5"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className={field}
            />
          </label>
          <label className="text-[15px] font-semibold text-muted">
            Bed width (feet)
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.5"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className={field}
            />
          </label>
        </div>
        <fieldset className="mt-3">
          <legend className="text-[15px] font-semibold text-muted">Depth (inches)</legend>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {[2, 3, 4].map((d) => (
              <label
                key={d}
                className={`flex h-12 cursor-pointer items-center justify-center rounded-[10px] border text-[16px] font-bold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-canopy ${
                  depth === d ? "border-canopy bg-canopy text-on-green" : "border-line bg-paper text-ink"
                }`}
              >
                <input
                  type="radio"
                  name={`${id}-depth`}
                  value={d}
                  checked={depth === d}
                  onChange={() => setDepth(d)}
                  className="sr-only"
                />
                {d} in
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-4 grid grid-cols-2 gap-3" aria-live="polite">
          <div className="rounded-[10px] bg-card px-3 py-3 ring-1 ring-line">
            <p className="font-display text-[34px] font-semibold leading-none text-canopy">
              {q ? q.cubicYards.toFixed(1) : "0.0"}
            </p>
            <p className="mt-1 text-[15px] text-muted">cubic yards</p>
          </div>
          <div className="rounded-[10px] bg-card px-3 py-3 ring-1 ring-line">
            <p className="font-display text-[34px] font-semibold leading-none text-canopy">{q ? q.bags : 0}</p>
            <p className="mt-1 text-[15px] text-muted">bags of 2 cubic feet</p>
          </div>
        </div>
        <p className="mt-3 text-[15px] text-muted">General guide. We confirm quantities when we see the bed.</p>
        <EstimateButton
          className="btn btn-primary mt-4 w-full"
          preset={{ services: ["mulch-lawn-care"], tasks: ["install-mulch"], notes }}
        >
          Get My Estimate for mulch
        </EstimateButton>
      </div>
    </div>
  );
}
