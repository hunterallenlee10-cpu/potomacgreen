import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { siteUrl, isLive } from "@/lib/site";
import { PlannerProvider } from "@/components/VisitPlanner/PlannerContext";
import { ListProvider } from "@/components/OneVisitList/ListContext";
import { VisitPlannerModal } from "@/components/VisitPlanner/VisitPlannerModal";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Potomac Green",
  robots: isLive ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: "Potomac Green",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Potomac Green. One call. More gets done." }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export const viewport: Viewport = {
  themeColor: "#073E2B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable}`}>
      <body>
        <PlannerProvider>
          <ListProvider>
            {children}
            <VisitPlannerModal />
          </ListProvider>
        </PlannerProvider>
        <Analytics />
      </body>
    </html>
  );
}
