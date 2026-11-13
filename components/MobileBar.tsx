"use client";

import { MessageCircle, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { taskById } from "@/lib/tasks";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { useList } from "@/components/OneVisitList/ListContext";

// Phones only: sticky Call / WhatsApp / Get My Estimate, plus a slim list bar once tasks are picked.
export function MobileBar() {
  const { handledIds } = useList();
  const n = handledIds.length;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 md:hidden">
      {n > 0 && (
        <EstimateButton
          preset={{ tasks: handledIds, services: [...new Set(handledIds.map((id) => taskById[id].service!))] }}
          className="flex min-h-11 w-full items-center justify-center gap-2 border-t border-green-line bg-canopy-2 text-[15px] font-bold text-on-green"
        >
          <span className="font-display text-[18px] text-lime">{n}</span> {n === 1 ? "task" : "tasks"} · Get My Estimate
        </EstimateButton>
      )}
      <nav aria-label="Quick contact" className="on-green grid grid-cols-[1fr_1fr_1.5fr] gap-2 border-t border-green-line bg-canopy px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5">
        <a href={business.phone.tel} className="btn btn-ghost-paper !min-h-12 !gap-1.5 !px-2 text-[15px]">
          <Phone aria-hidden size={17} strokeWidth={1.75} /> Call
        </a>
        <a href={business.phone.whatsapp} rel="noopener" className="btn btn-ghost-paper !min-h-12 !gap-1.5 !px-2 text-[15px]">
          <MessageCircle aria-hidden size={17} strokeWidth={1.75} /> WhatsApp
        </a>
        <EstimateButton className="btn btn-primary !min-h-12 !px-3 text-[15px]" />
      </nav>
    </div>
  );
}
