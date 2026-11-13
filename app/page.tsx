import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { JsonLd } from "@/components/JsonLd";
import { pages, businessJsonLd, servicesJsonLd, faqJsonLd } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { BackToTop } from "@/components/BackToTop";
import { Hero } from "@/components/sections/Hero";
import { SameVisit } from "@/components/sections/SameVisit";
import { OneVisitListSection } from "@/components/sections/OneVisitListSection";
import { Services } from "@/components/sections/Services";
import { ThisMonth } from "@/components/sections/ThisMonth";
import { Photo } from "@/components/ui/Photo";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PocketCard } from "@/components/sections/PocketCard";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RealWork } from "@/components/sections/RealWork";

export const metadata: Metadata = {
  title: pages.home.title,
  description: pages.home.description,
  alternates: { canonical: pages.home.path },
  openGraph: { title: pages.home.title, description: pages.home.description, url: pages.home.path },
  twitter: { title: pages.home.title, description: pages.home.description },
};

export default function Home() {
  return (
    <>
      <JsonLd data={businessJsonLd()} />
      <JsonLd data={servicesJsonLd()} />
      <JsonLd data={faqJsonLd()} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-bold focus:text-canopy">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <SameVisit />
        <OneVisitListSection />
        <Services />
        <ThisMonth
          buildMonth={new Date().getMonth()}
          desktopPhoto={<Photo name="wheelbarrow" sizes="100vw" position="50% 60%" decorative />}
          mobilePhoto={<Photo name="raking" sizes="100vw" position="50% 30%" decorative />}
        />
        <ServiceArea />
        <HowItWorks />
        <PocketCard />
        <RealWork />
        <Reviews />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBar />
      <BackToTop />
    </>
  );
}
