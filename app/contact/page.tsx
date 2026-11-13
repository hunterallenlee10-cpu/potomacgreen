import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { BackToTop } from "@/components/BackToTop";
import { ContactBody } from "@/components/sections/ContactBody";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/JsonLd";
import { pages, pageMetadata, contactBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(pages.contact);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactBreadcrumbJsonLd()} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-bold focus:text-canopy">
        Skip to content
      </a>
      <Nav overHero={false} />
      <main id="main" tabIndex={-1} className="outline-none">
        <ContactBody />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBar />
      <BackToTop />
    </>
  );
}
