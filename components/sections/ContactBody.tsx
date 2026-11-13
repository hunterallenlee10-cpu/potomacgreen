import { Clock, Mail, MapPin, MessageCircle, MessageSquareText, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { WhatsAppQR } from "@/components/ui/QR";
import { CountyMap } from "./CountyMap";
import { InlinePlanner } from "@/components/VisitPlanner/InlinePlanner";

export function ContactBody() {
  const tile = "ticket flex flex-col p-6 lg:p-7";
  return (
    <>
      <section aria-labelledby="contact-title" className="bg-paper pb-14 pt-[132px] lg:pb-20 lg:pt-[168px]">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1 id="contact-title" className="font-display mt-4 max-w-[20ch] text-[clamp(38px,5.4vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-balance">
            Contact Potomac Green, landscaping and handyman help in Potomac, MD
          </h1>
          <p className="mt-5 max-w-[56ch] text-[18px] text-muted">
            Serving Potomac, Bethesda, Rockville and Silver Spring. Call, text or WhatsApp {business.phone.display} with
            your town, a short task list and a few photos. {business.lines.small}
          </p>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            <li className={tile}>
              <Phone aria-hidden size={26} strokeWidth={1.75} className="text-canopy" />
              <h2 className="mt-4 text-[26px] font-semibold">Call</h2>
              <p className="mt-1 text-muted">{business.hours.text}</p>
              <a href={business.phone.tel} className="btn btn-green mt-auto self-start !mt-6">
                Call {business.phone.display}
              </a>
            </li>
            <li className={tile}>
              <MessageSquareText aria-hidden size={26} strokeWidth={1.75} className="text-canopy" />
              <h2 className="mt-4 text-[26px] font-semibold">Text</h2>
              <p className="mt-1 text-muted">{business.lines.photos}</p>
              <a href={business.phone.sms} className="btn btn-green mt-auto self-start !mt-6">
                Text {business.phone.display}
              </a>
            </li>
            <li className={`${tile} sm:flex-row sm:items-start sm:gap-5 md:flex-col lg:flex-row`}>
              <div className="flex flex-1 flex-col self-stretch">
                <MessageCircle aria-hidden size={26} strokeWidth={1.75} className="text-canopy" />
                <h2 className="mt-4 text-[26px] font-semibold">WhatsApp</h2>
                <p className="mt-1 text-muted">Scan or tap to send photos.</p>
                <a href={business.phone.whatsapp} rel="noopener" className="btn btn-primary mt-auto self-start !mt-6">
                  Open WhatsApp
                </a>
              </div>
              <WhatsAppQR className="mt-5 w-[132px] shrink-0 overflow-hidden rounded-[10px] ring-1 ring-line sm:mt-0 [&>svg]:h-auto [&>svg]:w-full" />
            </li>
          </ul>
          <p className="mt-6 flex flex-wrap items-center gap-2 text-[17px]">
            <Mail aria-hidden size={18} strokeWidth={1.75} className="text-canopy" /> Prefer email?
            <a href={`mailto:${business.email}`} className="text-link">
              {business.email}
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="planner-inline-title" className="section bg-paper-2">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div>
            <p className="eyebrow">Visit Planner</p>
            <h2 id="planner-inline-title-visible" className="h2 mt-4">
              Plan the visit in six quick steps.
            </h2>
            <div className="mt-8">
              <InlinePlanner />
            </div>
          </div>
          <div className="lg:pt-[118px]">
            <div className="ticket p-6 lg:p-7">
              <p className="ticket-label">Hours and service area</p>
              <p className="mt-4 flex gap-3">
                <Clock aria-hidden size={20} strokeWidth={1.75} className="mt-1 shrink-0 text-canopy" />
                <span>
                  <strong>{business.hours.label}:</strong> {business.hours.text}
                </span>
              </p>
              <p className="mt-3 flex gap-3">
                <MapPin aria-hidden size={20} strokeWidth={1.75} className="mt-1 shrink-0 text-canopy" />
                <span>
                  <strong>Service area:</strong> Potomac ({business.potomacZip}), Bethesda, Rockville and Silver Spring,
                  Maryland, plus {business.nearbyLine}.
                </span>
              </p>
              <CountyMap className="mt-6" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
