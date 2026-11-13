import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/faq";

// Block 10. Same text as the FAQPage JSON-LD (lib/faq.ts).
export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section scroll-mt-16 bg-paper">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="h2 mt-4">
            Straight answers.
          </h2>
        </div>
        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center gap-4 py-4 text-[19px] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans text-[19px] font-semibold tracking-normal">{f.q}</h3>
                <ChevronDown
                  aria-hidden
                  size={22}
                  strokeWidth={1.75}
                  className="ml-auto shrink-0 text-canopy transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="max-w-[62ch] pb-6 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
