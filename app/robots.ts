import type { MetadataRoute } from "next";
import { isLive, absolute } from "@/lib/site";

// Crawling stays allowed in both modes so crawlers can read the page-level robots meta.
// Demo pages carry "noindex, nofollow". Live mode also lists the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(isLive ? { sitemap: absolute("/sitemap.xml") } : {}),
  };
}
