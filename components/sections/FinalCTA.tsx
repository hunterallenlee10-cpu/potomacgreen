import { MessageCircle } from "lucide-react";
import { business } from "@/lib/business";
import { Photo } from "@/components/ui/Photo";
import { EstimateButton } from "@/components/ui/EstimateButton";

// Block 11.
export function FinalCTA() {
  return (
    <section aria-labelledby="final-title" className="on-green relative isolate overflow-hidden bg-canopy text-on-green">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Photo name="ranchWide" sizes="100vw" position="50% 55%" decorative />
        <div className="absolute inset-0 bg-canopy/[0.82]" />
      </div>
      <div className="wrap py-24 text-center lg:py-36">
        <h2 id="final-title" className="font-display mx-auto max-w-[17ch] text-[clamp(38px,5.6vw,72px)] font-semibold leading-[1.02] tracking-[-0.025em] text-balance">
          {business.lines.handled}
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <EstimateButton className="btn btn-primary !min-h-14 w-full text-[17px] sm:w-auto" />
          <a href={business.phone.tel} className="btn btn-ghost-paper !min-h-14 w-full sm:w-auto">
            Call or text {business.phone.display}
          </a>
        </div>
        <a href={business.phone.whatsapp} rel="noopener" className="text-link mt-5">
          <MessageCircle aria-hidden size={17} strokeWidth={1.75} /> Or send photos on WhatsApp.
        </a>
      </div>
    </section>
  );
}
