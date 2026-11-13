import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { business, services } from "@/lib/business";
import { isLive } from "@/lib/site";
import { LogoMark, Wordmark } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="on-green bg-canopy text-on-green">
      <div className="hatch" aria-hidden="true" />
      <div className="wrap grid gap-12 pb-14 pt-16 md:grid-cols-12 md:pb-16 lg:pt-20">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex min-h-11 items-center gap-3">
            <LogoMark height={52} />
            <Wordmark size="lg" />
          </Link>
          <p className="mt-6 max-w-[38ch] text-on-green-muted">{business.lines.oneContact}</p>
          <p className="eyebrow mt-8">Call, text or WhatsApp</p>
          <a
            href={business.phone.tel}
            className="font-display mt-1 inline-block text-[40px] font-semibold leading-tight text-lime hover:underline"
          >
            {business.phone.display}
          </a>
          <div className="mt-3 flex flex-wrap gap-x-5">
            <a href={business.phone.sms} className="text-link">
              <MessageCircle aria-hidden size={17} strokeWidth={1.75} /> Text {business.phone.display}
            </a>
            <a href={business.phone.whatsapp} rel="noopener" className="text-link">
              <Phone aria-hidden size={17} strokeWidth={1.75} /> WhatsApp
            </a>
            <a href={`mailto:${business.email}`} className="text-link">
              <Mail aria-hidden size={17} strokeWidth={1.75} /> {business.email}
            </a>
          </div>
        </div>

        <div className="md:col-span-4">
          <h2 className="eyebrow">Services</h2>
          <ul className="mt-3 grid gap-x-6 sm:grid-cols-2 md:grid-cols-1">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/#${s.id}`} className="inline-flex min-h-11 items-center text-on-green hover:text-lime">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow">Service area</h2>
          <p className="mt-4 text-on-green">{business.areaLine}</p>
          <p className="mt-2 text-[15px] text-on-green-muted">Also nearby Montgomery County communities, depending on the job and schedule.</p>
          <h2 className="eyebrow mt-8">{business.hours.label}</h2>
          <p className="mt-3">{business.hours.text}</p>
          <h2 className="eyebrow mt-8">Get in touch</h2>
          <Link href="/contact" className="text-link mt-1">
            Contact Potomac Green
          </Link>
        </div>
      </div>
      <div className="border-t border-green-line">
        <div className="wrap flex flex-col gap-1 py-6 pb-28 text-[15px] text-on-green-muted md:pb-6">
          <p>© 2026 Potomac Green</p>
          {!isLive && <p>Concept preview by Lee Enterprises Unlimited.</p>}
        </div>
      </div>
    </footer>
  );
}
