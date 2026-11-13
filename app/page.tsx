import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-bold focus:text-canopy">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <div className="h-[1200px]" />
      </main>
      <Footer />
    </>
  );
}
