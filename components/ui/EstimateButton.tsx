"use client";

import type { ReactNode } from "react";
import { usePlanner, type PlannerPreset } from "@/components/VisitPlanner/PlannerContext";

// Every "Get My Estimate" style button. Always a <button>, never a link.
export function EstimateButton({
  preset,
  className = "btn btn-primary",
  children = "Get My Estimate",
  ariaLabel,
}: {
  preset?: PlannerPreset;
  className?: string;
  children?: ReactNode;
  ariaLabel?: string;
}) {
  const { openPlanner } = usePlanner();
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      onClick={(e) => openPlanner(preset ?? {}, e.currentTarget)}
    >
      {children}
    </button>
  );
}
