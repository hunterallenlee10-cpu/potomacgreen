import Image from "next/image";
import { gallery } from "@/lib/gallery";

// Ready for the owner's real job photos. Renders nothing while lib/gallery.ts is empty.
export function RealWork() {
  if (gallery.length === 0) return null;
  return (
    <section aria-labelledby="real-work-title" className="section bg-paper">
      <div className="wrap">
        <p className="eyebrow">Recent work</p>
        <h2 id="real-work-title" className="h2 mt-4">
          Jobs around Montgomery County.
        </h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((p) => (
            <li key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 380px, 50vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
