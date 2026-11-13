"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Appears only after 1.5 screens of scrolling.
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="fixed bottom-[132px] right-4 z-30 inline-flex size-12 items-center justify-center rounded-full border border-line bg-card text-canopy shadow-[0_10px_30px_-12px_rgba(7,62,43,0.45)] hover:bg-paper-2 md:bottom-6 md:right-6"
      aria-label="Back to top"
    >
      <ArrowUp aria-hidden size={22} strokeWidth={1.75} />
    </button>
  );
}
