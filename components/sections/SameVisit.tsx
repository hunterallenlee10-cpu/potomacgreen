import { Hammer, MessageCircle, Sprout } from "lucide-react";
import { business, yardServiceIds } from "@/lib/business";
import { Photo } from "@/components/ui/Photo";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { WhatsAppQR } from "@/components/ui/QR";

// Block 2: the differentiator. One local contact for the yard and the small jobs.
export function SameVisit() {
  return (
    <section aria-labelledby="same-visit-title" className="on-green relative isolate overflow-hidden bg-canopy text-on-green">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Photo name="topiary" sizes="100vw" decorative />
        <div className="absolute inset-0 bg-canopy/90" />
      </div>
      <div className="wrap section">
        <div className="max-w-[760px]">
          <p className="eyebrow">One local contact</p>
          <h2 id="same-visit-title" className="h2 mt-4">
            The yard and the to‑do list. Same visit.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[18px] text-on-green-muted">{business.lines.practical}</p>
        </div>

        <div className="mt-12 grid items-start gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
          <article className="ticket-green overflow-hidden md:mt-10">
            <div className="relative aspect-[16/10] md:aspect-[4/3]">
              <Photo name="planting" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
            <div className="p-6 pb-9 lg:p-7 lg:pb-10">
              <p className="ticket-label flex items-center gap-2">
                <Sprout aria-hidden size={15} strokeWidth={1.75} className="text-lime" /> Ticket 01
              </p>
              <h3 className="mt-3 text-[28px] font-semibold leading-tight">Outdoor upkeep</h3>
              <p className="mt-2 text-on-green-muted">Planting, trimming, mulch and lawn care.</p>
              <EstimateButton preset={{ services: yardServiceIds }} className="btn btn-primary mt-6">
                Plan yard work
              </EstimateButton>
            </div>
            <div className="hatch hatch-bottom" aria-hidden="true" />
          </article>

          <article className="ticket-green overflow-hidden">
            <div className="relative aspect-[16/10] md:aspect-[4/3.6]">
              <Photo name="assembly" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
            <div className="p-6 pb-9 lg:p-7 lg:pb-10">
              <p className="ticket-label flex items-center gap-2">
                <Hammer aria-hidden size={15} strokeWidth={1.75} className="text-lime" /> Ticket 02
              </p>
              <h3 className="mt-3 text-[28px] font-semibold leading-tight">Help around the house</h3>
              <p className="mt-2 text-on-green-muted">Assembly, moving and small household jobs.</p>
              <EstimateButton
                preset={{ services: ["furniture-assembly", "light-handyman"] }}
                className="btn btn-primary mt-6"
              >
                Plan a small job
              </EstimateButton>
            </div>
            <div className="hatch hatch-bottom" aria-hidden="true" />
          </article>

          <article className="ticket-green overflow-hidden md:mt-10">
            <div className="flex aspect-[16/10] items-center justify-center bg-paper p-6 md:aspect-[4/3]">
              <WhatsAppQR className="w-[58%] max-w-[220px] [&>svg]:h-auto [&>svg]:w-full" />
            </div>
            <div className="p-6 pb-9 lg:p-7 lg:pb-10">
              <p className="ticket-label flex items-center gap-2">
                <MessageCircle aria-hidden size={15} strokeWidth={1.75} className="text-lime" /> Ticket 03
              </p>
              <h3 className="mt-3 text-[28px] font-semibold leading-tight">Photos first, then a plan</h3>
              <p className="mt-2 text-on-green-muted">{business.lines.photos}</p>
              <a href={business.phone.whatsapp} rel="noopener" className="btn btn-ghost-paper mt-6">
                <MessageCircle aria-hidden size={18} strokeWidth={1.75} /> Message on WhatsApp
              </a>
            </div>
            <div className="hatch hatch-bottom" aria-hidden="true" />
          </article>
        </div>
      </div>
    </section>
  );
}
