"use client";

import type { RefObject } from "react";
import { Check, MessageCircle, MessageSquareText, Phone, Pencil } from "lucide-react";
import { business } from "@/lib/business";
import { smsHref, summaryRows, whatsappHref, type PlannerAnswers } from "@/lib/summary";

export function Success({
  a,
  headingRef,
  onEdit,
}: {
  a: PlannerAnswers;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onEdit: () => void;
}) {
  return (
    <div className="step-next">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-canopy text-lime">
        <Check aria-hidden size={34} strokeWidth={2.5} />
      </span>
      {/* DRAFT: confirm reply method and timing with the owner. */}
      <h3 ref={headingRef} tabIndex={-1} className="mt-5 text-[28px] font-semibold leading-tight outline-none sm:text-[32px]">
        Got it. Send this to Potomac Green and we will reply with next steps.
      </h3>
      <p className="mt-2 text-muted">Nothing has been sent yet. Pick how you want to send it.</p>

      <div className="mt-6 grid gap-3">
        <a href={whatsappHref(a)} rel="noopener" className="btn btn-primary !min-h-14 w-full text-[17px]">
          <MessageCircle aria-hidden size={20} strokeWidth={1.75} /> Send on WhatsApp
        </a>
        <a href={smsHref(a)} className="btn btn-green !min-h-14 w-full text-[17px]">
          <MessageSquareText aria-hidden size={20} strokeWidth={1.75} /> Send as a text
        </a>
        <a href={business.phone.tel} className="btn btn-outline !min-h-14 w-full text-[17px]">
          <Phone aria-hidden size={20} strokeWidth={1.75} /> Call now: {business.phone.display}
        </a>
        <a href={smsHref(a, true)} className="text-link mx-auto text-[15px]">
          Text not filling in on an older iPhone? Use this text link
        </a>
      </div>

      <div className="ticket mt-7 p-5">
        <div className="flex items-center justify-between">
          <p className="ticket-label">Your request</p>
          <button type="button" onClick={onEdit} className="text-link !min-h-11 text-[15px]">
            <Pencil aria-hidden size={15} strokeWidth={1.75} /> Edit answers
          </button>
        </div>
        <dl className="mt-2 divide-y divide-line">
          {summaryRows(a).map(([k, v]) => (
            <div key={k} className="grid gap-0.5 py-2.5 sm:grid-cols-[110px_1fr] sm:gap-3">
              <dt className="text-[15px] font-bold text-muted">{k}</dt>
              <dd className="text-[16px]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
