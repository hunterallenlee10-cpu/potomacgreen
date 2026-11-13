"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { taskGroups, taskById, demoTaskIds } from "@/lib/tasks";
import { useList } from "./ListContext";
import { Ticket } from "./Ticket";

export function OneVisitList({ hedgeImage }: { hedgeImage: React.ReactNode }) {
  const { selected, toggle, add, handledCount } = useList();
  const reduce = useReducedMotion();
  const [announce, setAnnounce] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const demoDone = useRef(false);
  const countRef = useRef(handledCount);
  countRef.current = handledCount;

  // On first scroll into view, add three tasks one after another so the visitor sees how it works.
  useEffect(() => {
    if (reduce || demoDone.current) return;
    const el = sectionRef.current;
    if (!el) return;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || demoDone.current) return;
        demoDone.current = true;
        io.disconnect();
        demoTaskIds.forEach((id, i) => timers.push(window.setTimeout(() => add(id), 450 + i * 250)));
      },
      { threshold: 0, rootMargin: "-35% 0px -35% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [reduce, add]);

  const onToggle = (id: string) => {
    const t = taskById[id];
    const willAdd = !selected.includes(id);
    toggle(id);
    const next = countRef.current + (t.status === "handled" ? (willAdd ? 1 : -1) : 0);
    const tail = `${next} ${next === 1 ? "task" : "tasks"}.`;
    if (t.status === "licensed") setAnnounce(`${willAdd ? "Added" : "Removed"} ${t.label}. Needs a licensed pro. ${tail}`);
    else if (t.status === "ask") setAnnounce(`${willAdd ? "Added" : "Removed"} ${t.label}. Not on our usual list. ${tail}`);
    else setAnnounce(`${willAdd ? "Added" : "Removed"} ${t.label}. ${tail}`);
  };

  return (
    <div ref={sectionRef} className="grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-14">
      <div>
        {taskGroups.map((g) => (
          <fieldset key={g.id} className={g.muted ? "mt-10 rounded-[14px] border border-dashed border-line p-5" : "mt-8 first:mt-0"}>
            <legend className={`eyebrow ${g.muted ? "px-2" : "mb-3"}`}>{g.title}</legend>
            {g.muted && (
              <p className="-mt-1 mb-3 text-[15px] text-muted">
                Tap these too. We will tell you straight what we handle.
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {g.tasks.map((t) => {
                const on = selected.includes(t.id);
                const base =
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 sm:px-4 text-left text-[15px] font-semibold leading-tight transition-colors duration-150";
                const style = g.muted
                  ? on
                    ? "border-muted bg-muted text-paper"
                    : "border-line bg-paper text-muted hover:border-muted"
                  : on
                    ? "border-canopy bg-canopy text-on-green"
                    : "border-line bg-card text-ink hover:border-canopy/50";
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onToggle(t.id)}
                    className={`${base} ${style}`}
                  >
                    {on ? (
                      <Check aria-hidden size={16} strokeWidth={2.5} className={g.muted ? "" : "text-lime"} />
                    ) : (
                      <Plus aria-hidden size={16} strokeWidth={1.75} />
                    )}
                    {t.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
        <p className="sr-only" role="status" aria-live="polite">
          {announce}
        </p>
      </div>

      <div className="relative lg:pt-0">
        <div className="lg:sticky lg:top-[104px]">
          <div className="relative">
            {hedgeImage}
            <div className="relative lg:-mt-[260px] lg:px-6">
              <Ticket />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
