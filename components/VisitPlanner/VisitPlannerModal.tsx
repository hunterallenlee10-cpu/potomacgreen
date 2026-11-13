"use client";

import { useEffect, useRef } from "react";
import { usePlanner } from "./PlannerContext";
import { VisitPlanner } from "./VisitPlanner";

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea,select,[tabindex]:not([tabindex="-1"])';

export function VisitPlannerModal() {
  const { open, preset, presetKey, closePlanner, returnFocus } = usePlanner();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevOverflow = document.body.style.overflow;
    const scrollbar = window.innerWidth - html.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    // Focus the first control after the opener has finished its own work.
    const raf = requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>("form button[aria-pressed], form input, form button");
      (first ?? panelRef.current)?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePlanner();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !panelRef.current.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = "";
      returnFocus();
    };
  }, [open, closePlanner, returnFocus]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <div className="backdrop-in absolute inset-0 bg-canopy/70 backdrop-blur-[2px]" onClick={closePlanner} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="planner-title"
        tabIndex={-1}
        className="planner-in relative h-[100dvh] w-full max-w-[680px] overflow-hidden outline-none sm:h-[min(820px,calc(100dvh-48px))] sm:rounded-[18px] sm:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]"
      >
        <VisitPlanner preset={preset} presetKey={presetKey} onClose={closePlanner} titleId="planner-title" />
      </div>
    </div>
  );
}
