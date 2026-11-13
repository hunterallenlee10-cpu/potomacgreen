import { Camera, Check } from "lucide-react";
import { business, cardServices } from "@/lib/business";
import { LogoMark } from "@/components/ui/Logo";
import { WhatsAppQR } from "@/components/ui/QR";

// Block 8: his business card rebuilt in HTML (front and back), plus plain facts.
export function PocketCard() {
  const facts = [
    `${business.hours.label}: ${business.hours.text}`,
    "Service area: Potomac, Bethesda, Rockville, Silver Spring and nearby Montgomery County communities",
    "One-time projects and recurring upkeep",
    business.lines.limits,
  ];
  return (
    <section aria-labelledby="card-title" className="section bg-paper">
      <div className="wrap">
        <div className="max-w-[720px]">
          <p className="eyebrow">The card in his pocket</p>
          <h2 id="card-title" className="h2 mt-4">
            A local service you can text.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
          {/* Front */}
          <div className="biz-card on-green relative aspect-[3.5/2] overflow-hidden rounded-[16px] bg-[linear-gradient(135deg,#0B4A2E,#073E2B)] text-center text-on-green shadow-[0_28px_50px_-26px_rgba(7,62,43,0.7)]">
            <div className="flex h-full flex-col items-center justify-center pb-[9%]">
              <div className="w-[11cqw]">
                <LogoMark height={64} className="h-auto w-full" />
              </div>
              <p className="mt-[0.6cqw] flex w-[30cqw] justify-between text-[3.1cqw] font-bold tracking-[0.12em] text-lime">
                <span>ESTD</span>
                <span>{business.established}</span>
              </p>
              <p className="wordmark mt-[1.4cqw] text-[6.6cqw] leading-none">Potomac Green</p>
              <p className="mt-[1.6cqw] text-[3.15cqw] font-bold tracking-[0.03em] text-lime">{business.cardTagline}</p>
              <a href={business.phone.tel} className="mt-[1cqw] inline-flex min-h-6 items-center text-[3.4cqw] font-bold text-lime hover:underline">
                Whatsapp/phone: {business.phone.display}
              </a>
              <a href={`mailto:${business.email}`} className="inline-flex min-h-6 items-center text-[3.4cqw] font-bold text-lime hover:underline">
                {business.email}
              </a>
            </div>
            <div className="hatch absolute inset-x-0 bottom-0 !h-[7%]" aria-hidden="true" />
          </div>

          {/* Back */}
          <div className="biz-card relative aspect-[3.5/2] overflow-hidden rounded-[16px] bg-[#FBFBF7] shadow-[0_28px_50px_-26px_rgba(7,62,43,0.5)] ring-1 ring-line">
            <div className="grid h-full grid-cols-[1.35fr_1fr] items-center gap-[3cqw] px-[7cqw] pb-[8%] pt-[2%]">
              <div>
                <p className="font-display ml-[8cqw] text-[5.4cqw] font-semibold text-canopy">Services</p>
                <ul className="mt-[1cqw] text-[3.4cqw] leading-[1.5] text-canopy">
                  {cardServices.map((sv) => (
                    <li key={sv}>• {sv}</li>
                  ))}
                </ul>
              </div>
              <a
                href={business.phone.whatsapp}
                rel="noopener"
                className="block overflow-hidden rounded-[2cqw] bg-ink p-[1cqw]"
                aria-label="Scan me: open a WhatsApp chat with Potomac Green"
              >
                <WhatsAppQR className="rounded-[1.4cqw] bg-paper [&>svg]:h-auto [&>svg]:w-full" label="WhatsApp QR code" />
                <span className="block py-[0.8cqw] text-center text-[4.6cqw] font-semibold leading-none tracking-[0.02em] text-paper">
                  SCAN ME
                </span>
              </a>
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-[7%] bg-[repeating-linear-gradient(135deg,rgba(159,198,58,0.6)_0_6px,transparent_6px_11px)]"
              aria-hidden="true"
            />
          </div>

          <div className="ticket p-6 pb-7 lg:p-8">
            <p className="ticket-label">Plain facts</p>
            <ul className="mt-4 space-y-3.5">
              {facts.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-canopy text-lime">
                    <Check aria-hidden size={14} strokeWidth={3} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* DRAFT: replace with a real photo of the owner on a job. Never fill with stock. */}
          <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-[14px] border-2 border-dashed border-line bg-paper text-center text-muted md:min-h-0">
            <Camera aria-hidden size={30} strokeWidth={1.75} />
            <p className="max-w-[24ch] text-[15px] font-semibold">Photo: the owner on a job, from Potomac Green</p>
          </div>
        </div>
      </div>
    </section>
  );
}
