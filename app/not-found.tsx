import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Page not found | Potomac Green",
  description: "This page is not on the list. Head back to Potomac Green for landscaping and handyman help in Potomac, MD.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav overHero={false} />
      <main id="main" className="bg-paper pb-24 pt-[140px] lg:pb-32 lg:pt-[180px]">
        <div className="wrap">
          <div className="ticket mx-auto max-w-[560px] overflow-hidden p-8 pb-12 lg:p-10 lg:pb-14">
            <p className="ticket-label">Ticket 404</p>
            <h1 className="font-display mt-4 text-[clamp(36px,5vw,52px)] font-semibold leading-[1.05]">
              This page is not on the list.
            </h1>
            <p className="mt-4 text-muted">
              The link may be old or mistyped. Everything we do is on the home page, or call or text{" "}
              <a href={business.phone.tel} className="font-bold text-canopy underline underline-offset-4">
                {business.phone.display}
              </a>
              .
            </p>
            <Link href="/" className="btn btn-green mt-8">
              Back to the Potomac Green home page
            </Link>
            <div className="hatch hatch-bottom" aria-hidden="true" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
