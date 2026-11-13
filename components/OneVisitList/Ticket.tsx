"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, CircleAlert, Camera } from "lucide-react";
import { serviceById, services, business } from "@/lib/business";
import { taskById } from "@/lib/tasks";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { useList } from "./ListContext";

// The visit ticket. Motion place 2: new tasks slide in, the counter rolls.
// Never shows time, price or crew estimates.
export function Ticket() {
  const { selected, handledIds, clear } = useList();
  const reduce = useReducedMotion();
  const n = handledIds.length;
  const licensed = selected.filter((id) => taskById[id]?.status === "licensed");
  const ask = selected.filter((id) => taskById[id]?.status === "ask");

  const grouped = services
    .map((s) => ({ service: s, tasks: handledIds.filter((id) => taskById[id].service === s.id) }))
    .filter((g) => g.tasks.length);

  const item = reduce
    ? { initial: false as const, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
      };

  const waText = [
    "Hi Potomac Green, here is my list for one visit:",
    ...handledIds.map((id) => `- ${taskById[id].label}`),
    ...(licensed.length ? ["Also asking about (may need a licensed pro):", ...licensed.map((id) => `- ${taskById[id].label}`)] : []),
    ...(ask.length ? ["Also asking about:", ...ask.map((id) => `- ${taskById[id].label}`)] : []),
  ].join("\n");

  return (
    <div>
      <div className="ticket overflow-hidden shadow-[0_24px_60px_-28px_rgba(7,62,43,0.45)]">
        <div className="flex items-center justify-between border-b border-dashed border-line px-6 py-4">
          <p className="ticket-label">Visit ticket</p>
          {selected.length > 0 && (
            <button type="button" onClick={clear} className="text-link !min-h-11 text-[14px]">
              Clear list
            </button>
          )}
        </div>

        <div className="px-6 pb-10 pt-5">
          <div className="flex items-end gap-3">
            <span className="font-display relative inline-block h-[76px] min-w-[1.2ch] overflow-hidden text-[76px] font-semibold leading-none text-canopy">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={n}
                  className="block"
                  initial={reduce ? false : { y: "70%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: "-70%", opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {n}
                </motion.span>
              </AnimatePresence>
            </span>
            <p className="font-display pb-[10px] text-[24px] font-medium leading-tight">
              {n === 1 ? "task" : "tasks"}. One visit.
            </p>
          </div>

          {selected.length === 0 && (
            <p className="mt-5 text-muted">Tap the tasks on your list. They land here, sorted by service.</p>
          )}

          <ul className="mt-5 space-y-4">
            <AnimatePresence initial={false}>
              {grouped.map((g) => (
                <motion.li key={g.service.id} layout={!reduce} {...item}>
                  <p className="ticket-label">{serviceById[g.service.id].name}</p>
                  <ul className="mt-1.5 space-y-1">
                    <AnimatePresence initial={false}>
                      {g.tasks.map((id) => (
                        <motion.li key={id} {...item} className="flex items-center gap-2.5 text-[16px]">
                          <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-lime text-canopy">
                            <Check aria-hidden size={13} strokeWidth={3} />
                          </span>
                          {taskById[id].label}
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <AnimatePresence initial={false}>
            {licensed.length > 0 && (
              <motion.div key="licensed" {...item} className="mt-5 rounded-[10px] border border-line bg-paper px-4 py-3">
                <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
                  <CircleAlert aria-hidden size={17} strokeWidth={1.75} className="text-muted" /> Needs a licensed pro
                </p>
                <p className="mt-1 text-[15px] text-muted">We will tell you straight so you are not left guessing.</p>
                <p className="mt-2 text-[15px] text-muted">{licensed.map((id) => taskById[id].label).join(", ")}</p>
              </motion.div>
            )}
            {ask.length > 0 && (
              <motion.div key="ask" {...item} className="mt-3 rounded-[10px] border border-line bg-paper px-4 py-3">
                <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
                  <Camera aria-hidden size={17} strokeWidth={1.75} className="text-muted" /> Not on our usual list
                </p>
                <p className="mt-1 text-[15px] text-muted">Send a photo and we will tell you if it is a fit.</p>
                <p className="mt-2 text-[15px] text-muted">{ask.map((id) => taskById[id].label).join(", ")}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="hatch hatch-bottom" aria-hidden="true" />
      </div>

      <div className="mt-5 flex flex-col items-start gap-1">
        <EstimateButton
          className="btn btn-primary w-full !min-h-14 text-[17px]"
          preset={{ tasks: handledIds, services: [...new Set(handledIds.map((id) => taskById[id].service!))] }}
        >
          {n > 0 ? `Get My Estimate for these ${n}` : "Get My Estimate"}
        </EstimateButton>
        {selected.length > 0 && (
          <a
            href={`${business.phone.whatsapp}?text=${encodeURIComponent(waText)}`}
            rel="noopener"
            className="text-link mx-auto"
          >
            Send this list on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
