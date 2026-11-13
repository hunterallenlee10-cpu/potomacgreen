# Launch day checklist (Potomac Green)

The deployed concept runs in **demo mode**: `noindex, nofollow`, no sitemap, and the
"Concept preview by Lee Enterprises Unlimited." line in the footer. Do these in order on launch day.

## 1. Flip the switch
- [ ] In Vercel, Project Settings, Environment Variables (Production):
  - `NEXT_PUBLIC_SITE_MODE=live`
  - `NEXT_PUBLIC_SITE_URL=https://<the real domain>` (no trailing slash)
- [ ] Redeploy (the variables are read at build time).

## 2. Confirm
- [ ] View source on `/` and `/contact`: `<meta name="robots" content="index, follow">`.
- [ ] Canonical tags point at the real domain.
- [ ] `/robots.txt` lists `Sitemap: https://<domain>/sitemap.xml`.
- [ ] `/sitemap.xml` lists `/` and `/contact`.
- [ ] Footer no longer shows the concept line.
- [ ] Paste the home page into the Rich Results Test (https://search.google.com/test/rich-results) and the Schema Markup Validator (https://validator.schema.org). No errors.
- [ ] Share the link in iMessage or WhatsApp and check the preview image.

## 3. Google Business Profile
- [ ] Create and verify the profile at https://business.google.com.
- [ ] Category: Landscaper. Add secondary categories only if true (for example Handyman).
- [ ] Service-area business: hide the street address. Service area: Potomac, Bethesda, Rockville, Silver Spring.
- [ ] Name exactly `Potomac Green`, phone exactly `301-674-9361`, the same hours as the site.
- [ ] Add the website link and real job photos.
- [ ] Ask the first happy customers for reviews.

## 4. Search engines
- [ ] Google Search Console: add the domain property, verify, submit `/sitemap.xml`.
- [ ] Bing Webmaster Tools: import from Search Console or add the site, submit the sitemap.

## 5. Replace every placeholder
- [ ] Swap stock photos for real job photos as they arrive (`public/images/raw`, then `npm run images`, then update `lib/images.ts`). Add real job photos to `lib/gallery.ts` to switch on the Recent work section.
- [ ] Fill the "Photo: the owner on a job" slot (`components/sections/PocketCard.tsx`).
- [ ] Replace the three sample reviews with real Google reviews (`components/sections/Reviews.tsx`). Do not add `review` or `aggregateRating` JSON-LD unless the reviews are real and shown on the page.
- [ ] Resolve every `DRAFT` and `TODO` comment: `grep -rn "DRAFT\|TODO" app components lib`.
- [ ] Add social links to `lib/business.ts` if the owner has them.
- [ ] Bump `contentUpdated` in `lib/site.ts` whenever page content changes.
