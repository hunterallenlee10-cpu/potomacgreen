"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X, MessageCircle } from "lucide-react";
import { business } from "@/lib/business";
import { LogoMark, Wordmark } from "@/components/ui/Logo";
import { EstimateButton } from "@/components/ui/EstimateButton";

const anchors = [
  { href: "/#services", label: "Services" },
  { href: "/#one-visit-list", label: "One Visit List" },
  { href: "/#service-area", label: "Service Area" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#faq", label: "FAQ" },
];

// overHero: transparent over a dark hero until 40px of scroll. On other pages it starts solid.
export function Nav({ overHero = true }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(!overHero);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = sheetRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && sheetRef.current) {
        const items = [...sheetRef.current.querySelectorAll<HTMLElement>("a,button")];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      burgerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const solid = scrolled;
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-200 ${
          solid ? "border-b border-line bg-paper/[0.92] backdrop-blur-md" : "on-green border-b border-transparent"
        }`}
      >
        <nav aria-label="Main" className="wrap flex h-[68px] items-center gap-4 lg:h-[76px]">
          <Link href="/" className="flex min-h-11 items-center gap-3">
            <LogoMark height={36} />
            <Wordmark size="sm" tone={solid ? "dark" : "light"} />
          </Link>

          <ul className="ml-auto hidden items-center gap-1 xl:flex">
            {anchors.map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  className={`inline-flex min-h-11 items-center rounded-full px-3 text-[15px] font-semibold transition-colors ${
                    solid ? "text-ink hover:bg-paper-2" : "text-on-green hover:bg-white/10"
                  }`}
                >
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 xl:ml-4">
            <a
              href={business.phone.tel}
              className={`hidden min-h-11 items-center gap-2 rounded-full px-3 text-[15px] font-bold md:inline-flex ${
                solid ? "text-canopy hover:bg-paper-2" : "text-on-green hover:bg-white/10"
              }`}
            >
              <Phone aria-hidden size={17} strokeWidth={1.75} />
              {business.phone.display}
            </a>
            <EstimateButton className="btn btn-primary hidden !min-h-11 !px-5 text-[15px] sm:inline-flex" />
            <button
              ref={burgerRef}
              type="button"
              className={`inline-flex size-11 items-center justify-center rounded-full xl:hidden ${
                solid ? "text-canopy hover:bg-paper-2" : "text-on-green hover:bg-white/10"
              }`}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu aria-hidden size={26} strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="on-green fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-canopy text-on-green"
        >
          <div className="wrap flex h-[68px] shrink-0 items-center gap-3">
            <LogoMark height={36} />
            <Wordmark size="sm" />
            <button
              type="button"
              className="ml-auto inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X aria-hidden size={26} strokeWidth={1.75} />
            </button>
          </div>
          <ul className="wrap mt-6 flex flex-col">
            {anchors.map((a) => (
              <li key={a.href} className="border-b border-green-line">
                <Link
                  href={a.href}
                  onClick={() => setOpen(false)}
                  className="font-display flex min-h-16 items-center text-[30px] font-medium"
                >
                  {a.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-green-line">
              <Link href="/contact" onClick={() => setOpen(false)} className="font-display flex min-h-16 items-center text-[30px] font-medium">
                Contact
              </Link>
            </li>
          </ul>
          <div className="wrap mt-auto pb-10 pt-10">
            <p className="eyebrow">Call, text or WhatsApp</p>
            <a href={business.phone.tel} className="font-display mt-2 block text-[40px] font-semibold leading-tight text-lime">
              {business.phone.display}
            </a>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a href={business.phone.sms} className="btn btn-ghost-paper">
                <MessageCircle aria-hidden size={18} strokeWidth={1.75} /> Text us
              </a>
              <a href={business.phone.whatsapp} className="btn btn-ghost-paper" rel="noopener">
                WhatsApp
              </a>
            </div>
            <div className="mt-3" onClick={() => setOpen(false)}>
              <EstimateButton className="btn btn-primary w-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
