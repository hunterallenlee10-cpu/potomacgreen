import { business, townLines } from "@/lib/business";
import { Photo } from "@/components/ui/Photo";
import { AreaChecker } from "./AreaChecker";
import { CountyMap } from "./CountyMap";

// Block 6: split map and checker.
export function ServiceArea() {
  return (
    <section id="service-area" aria-labelledby="area-title" className="section scroll-mt-16 bg-paper">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <p className="eyebrow">Service area</p>
          <h2 id="area-title" className="h2 mt-4">
            Do you come to me?
          </h2>
          <p className="mt-5 max-w-[46ch] text-[18px] text-muted">
            Potomac ({business.potomacZip}), Bethesda, Rockville and Silver Spring, plus {business.nearbyLine}.
          </p>
          <div className="mt-8">
            <AreaChecker />
          </div>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {business.towns.map((t) => (
              <li key={t} className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-4">
                <h3 className="text-[20px] font-semibold">
                  {t}
                  {t === "Potomac" && <span className="ml-2 font-sans text-[14px] font-bold text-muted">{business.potomacZip}</span>}
                </h3>
                <p className="text-[16px] text-muted">{townLines[t]}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[14px] lg:block">
            <Photo name="cottage" sizes="(min-width: 1024px) 560px, 1px" position="45% 50%" />
          </div>
          <CountyMap className="lg:absolute lg:-left-10 lg:bottom-10 lg:w-[78%] lg:shadow-[0_30px_60px_-30px_rgba(7,62,43,0.6)]" />
          <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-[14px] lg:hidden">
            <Photo name="cottage" sizes="100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
