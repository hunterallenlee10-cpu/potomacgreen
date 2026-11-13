import type { MetadataRoute } from "next";
import { isLive, absolute, contentUpdated } from "@/lib/site";

// Empty in demo mode. Live mode lists every page.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isLive) return [];
  return [
    { url: absolute("/"), lastModified: contentUpdated, changeFrequency: "monthly", priority: 1 },
    { url: absolute("/contact"), lastModified: contentUpdated, changeFrequency: "yearly", priority: 0.7 },
  ];
}
