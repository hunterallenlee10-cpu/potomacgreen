import { getImageProps } from "next/image";
import { CalendarClock, MessageCircle, Sparkles } from "lucide-react";
import { business } from "@/lib/business";
import { images } from "@/lib/images";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { EdgeLinePhoto, EdgeLineUnderline } from "./EdgeLine";

// The hero photo sits in a frame that does "object-fit: cover" by hand, so the Edge Line
// SVG inside the same frame lines up with the photo at every size.
export function Hero() {
  const common = { alt: images.hero.alt, fetchPriority: "high" as const, loading: "eager" as const };
  const {
    props: { srcSet: mobileSrcSet, sizes: mobileSizes },
  } = getImageProps({
    ...common,
    src: images.heroMobile.src,
    width: images.heroMobile.width,
    height: images.heroMobile.height,
    sizes: "93vh",
  });
  const { props: desktop } = getImageProps({
    ...common,
    src: images.hero.src,
    width: images.hero.width,
    height: images.hero.height,
    sizes: "(min-aspect-ratio: 3/2) 100vw, 138vh",
  });

  return (
    <section aria-labelledby="hero-title" className="hero on-green bg-canopy text-on-green">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-frame">
          <picture>
            <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes={mobileSizes} />
            <img {...desktop} alt={images.hero.alt} className="absolute inset-0 h-full w-full object-cover" />
          </picture>
          <EdgeLinePhoto />
        </div>
        {/* Scrims: left on desktop, bottom-up on phones, plus a soft top band for the nav. */}
        <div className="hero-scrim absolute inset-0" aria-hidden="true" />
      </div>

      <div className="wrap hero-content">
        <div className="max-w-[640px]">
          <h1 id="hero-title">
            <span className="eyebrow block text-balance !text-[12px] !tracking-[0.08em] text-lime sm:!text-[13px] sm:!tracking-[0.14em]">Landscaping &amp; handyman services in Potomac, MD</span>
            <span className="hero-title font-display mt-3 block text-[clamp(48px,min(7.4vw,12vh),96px)] font-semibold leading-[0.98] tracking-[-0.028em] md:mt-4">
              One call.
              <br />
              <span className="relative inline-block">
                More gets done.
                <EdgeLineUnderline />
              </span>
            </span>
          </h1>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.55] text-on-green/90 md:mt-6 md:text-[18px]">
            Planting, hedges, mulch and lawn care, plus furniture assembly, moving help and small jobs around the house.
            <span className="hidden md:inline"> Serving Potomac, Bethesda, Rockville and Silver Spring.</span>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
            <EstimateButton className="btn btn-primary w-full !min-h-14 text-[17px] sm:w-auto" />
            <a href={business.phone.tel} className="btn btn-ghost-paper hidden !min-h-14 sm:inline-flex">
              Call or text {business.phone.display}
            </a>
          </div>
          <ul className="mt-6 hidden flex-wrap gap-x-6 gap-y-3 text-[15px] font-medium text-on-green-muted md:flex">
            <li className="flex items-center gap-2">
              <Sparkles aria-hidden size={17} strokeWidth={1.75} className="text-lime" />
              Small jobs welcome
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle aria-hidden size={17} strokeWidth={1.75} className="text-lime" />
              Send photos on WhatsApp
            </li>
            <li className="flex items-center gap-2">
              <CalendarClock aria-hidden size={17} strokeWidth={1.75} className="text-lime" />
              {business.hours.short}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
