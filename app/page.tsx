import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { SameVisit } from "@/components/sections/SameVisit";
import { OneVisitListSection } from "@/components/sections/OneVisitListSection";
import { Services } from "@/components/sections/Services";
import { ThisMonth } from "@/components/sections/ThisMonth";
import { Photo } from "@/components/ui/Photo";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-bold focus:text-canopy">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <SameVisit />
        <OneVisitListSection />
        <Services />
        <ThisMonth
          buildMonth={new Date().getMonth()}
          desktopPhoto={<Photo name="wheelbarrow" sizes="100vw" position="50% 60%" decorative />}
          mobilePhoto={<Photo name="raking" sizes="100vw" position="50% 30%" decorative />}
        />
      </main>
      <Footer />
    </>
  );
}
