import { ArrowRight, MessageCircle } from "lucide-react";
import { business, serviceById, type ServiceId } from "@/lib/business";
import type { ImageKey } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { EstimateButton } from "@/components/ui/EstimateButton";
import { MulchCalculator } from "./MulchCalculator";

function PlanButton({ id }: { id: ServiceId }) {
  const s = serviceById[id];
  return (
    <EstimateButton preset={{ services: [id] }} className="text-link mt-3 self-start">
      Plan {s.short} <ArrowRight aria-hidden size={17} strokeWidth={1.75} />
    </EstimateButton>
  );
}

function Tile({
  id,
  image,
  position,
  className = "",
  photoClass = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw",
  tall = false,
}: {
  tall?: boolean;
  id: ServiceId;
  image: ImageKey;
  position?: string;
  className?: string;
  photoClass?: string;
  sizes?: string;
}) {
  const s = serviceById[id];
  return (
    <article id={id} className={`ticket flex scroll-mt-28 flex-col overflow-hidden ${className}`}>
      <div className={`relative shrink-0 ${photoClass}`}>
        <Photo name={image} sizes={sizes} position={position} />
      </div>
      <div className={`flex flex-col p-6 ${tall ? "" : "flex-1"}`}>
        <h3 className="text-[24px] font-semibold leading-tight">{s.name}</h3>
        <p className="mt-2 text-muted">{s.description}</p>
        <div className="mt-auto pt-1">
          <PlanButton id={id} />
        </div>
      </div>
    </article>
  );
}

// Block 4: asymmetric bento. Each tile carries a stable id for future service pages.
export function Services() {
  const mulch = serviceById["mulch-lawn-care"];
  return (
    <section id="services" aria-labelledby="services-title" className="section scroll-mt-16 bg-paper-2">
      <div className="wrap">
        <div className="max-w-[820px]">
          <p className="eyebrow">Services</p>
          <h2 id="services-title" className="h2 mt-4">
            Landscaping and light handyman services for Montgomery County homes.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <Tile
            id="trimming-hedging"
            image="hedge"
            className="lg:col-span-4 lg:row-span-2"
            photoClass="aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[420px]"
            position="50% 40%"
            tall
          />

          <article id="mulch-lawn-care" className="ticket grid scroll-mt-28 overflow-hidden md:col-span-2 lg:col-span-8 lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-full">
              <Photo name="mulch" sizes="(min-width: 1024px) 400px, 100vw" position="60% 50%" />
            </div>
            <div className="flex flex-col p-6 lg:p-7">
              <h3 className="text-[24px] font-semibold leading-tight">{mulch.name}</h3>
              <p className="mt-2 text-muted">{mulch.description}</p>
              <MulchCalculator />
              <div className="mt-auto pt-2">
                <PlanButton id="mulch-lawn-care" />
              </div>
            </div>
          </article>

          <Tile id="flowerbed-planting" image="planting" className="lg:col-span-4" />
          <Tile id="decorative-plants" image="pots" className="lg:col-span-4" position="50% 60%" />
          <Tile id="planter-construction" image="planter" className="lg:col-span-4" position="60% 50%" />
          <Tile id="furniture-assembly" image="assembly" className="lg:col-span-4" />
          <Tile id="moving-help" image="moving" className="lg:col-span-4" position="22% 60%" />
          <Tile id="light-handyman" image="stripedLawn" className="lg:col-span-4" position="50% 60%" />

          <article className="ticket-green on-green flex flex-col justify-center gap-4 p-7 pb-10 text-on-green md:col-span-2 lg:col-span-8 lg:p-10 lg:pb-12">
            <p className="ticket-label">And more</p>
            <p className="font-display max-w-[30ch] text-[30px] font-medium leading-[1.15] lg:text-[34px]">
              {business.lines.andMore}
            </p>
            <a href={business.phone.whatsapp} rel="noopener" className="btn btn-primary self-start">
              <MessageCircle aria-hidden size={18} strokeWidth={1.75} /> Send a photo on WhatsApp
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
