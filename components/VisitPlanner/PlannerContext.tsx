"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { ServiceId } from "@/lib/business";

export type Frequency = "one-time" | "recurring" | "not-sure";
export type TownChoice = "Potomac" | "Bethesda" | "Rockville" | "Silver Spring" | "Other";

export type PlannerPreset = {
  services?: (ServiceId | "other")[];
  tasks?: string[]; // task ids from lib/tasks.ts
  town?: TownChoice;
  otherTown?: string;
  notes?: string;
};

type Ctx = {
  open: boolean;
  preset: PlannerPreset;
  presetKey: number;
  openPlanner: (preset?: PlannerPreset, opener?: HTMLElement | null) => void;
  closePlanner: () => void;
  returnFocus: () => void;
};

const PlannerCtx = createContext<Ctx | null>(null);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<PlannerPreset>({});
  const [presetKey, setPresetKey] = useState(0);
  const opener = useRef<HTMLElement | null>(null);

  const openPlanner = useCallback((p: PlannerPreset = {}, el?: HTMLElement | null) => {
    opener.current = el ?? (document.activeElement as HTMLElement | null);
    setPreset(p);
    setPresetKey((k) => k + 1);
    setOpen(true);
  }, []);
  const closePlanner = useCallback(() => setOpen(false), []);
  const returnFocus = useCallback(() => {
    const el = opener.current;
    if (el && document.contains(el)) el.focus({ preventScroll: true });
  }, []);

  const value = useMemo(
    () => ({ open, preset, presetKey, openPlanner, closePlanner, returnFocus }),
    [open, preset, presetKey, openPlanner, closePlanner, returnFocus],
  );
  return <PlannerCtx.Provider value={value}>{children}</PlannerCtx.Provider>;
}

export function usePlanner() {
  const ctx = useContext(PlannerCtx);
  if (!ctx) throw new Error("usePlanner must be used inside PlannerProvider");
  return ctx;
}
