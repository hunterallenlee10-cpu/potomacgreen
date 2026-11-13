"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { taskById } from "@/lib/tasks";

type Ctx = {
  selected: string[]; // in the order they were added
  toggle: (id: string) => boolean; // returns the new pressed state
  add: (id: string) => void;
  clear: () => void;
  handledCount: number;
  handledIds: string[];
};

const ListCtx = createContext<Ctx | null>(null);

export function ListProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    let pressed = false;
    setSelected((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      pressed = true;
      return [...cur, id];
    });
    return pressed;
  }, []);
  const add = useCallback((id: string) => setSelected((cur) => (cur.includes(id) ? cur : [...cur, id])), []);
  const clear = useCallback(() => setSelected([]), []);

  const handledIds = useMemo(() => selected.filter((id) => taskById[id]?.status === "handled"), [selected]);
  const value = useMemo(
    () => ({ selected, toggle, add, clear, handledCount: handledIds.length, handledIds }),
    [selected, toggle, add, clear, handledIds],
  );
  return <ListCtx.Provider value={value}>{children}</ListCtx.Provider>;
}

export function useList() {
  const ctx = useContext(ListCtx);
  if (!ctx) throw new Error("useList must be used inside ListProvider");
  return ctx;
}
