// The launch switch. Everything SEO-related reads from here.
// demo (default): noindex, nofollow, no sitemap, concept footer line visible.
// live: index, follow, sitemap listed, concept line hidden.
export const siteMode: "demo" | "live" = process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";
export const isLive = siteMode === "live";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://potomacgreen.biz").replace(/\/$/, "");
export const absolute = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
// Bump when page content changes; used as the sitemap lastModified date.
export const contentUpdated = "2026-11-13";
