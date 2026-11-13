# Lighthouse results

Lighthouse 13.6.0, Playwright Chromium, against a production build (`next build` then `next start`), 2026-11-13.
Live mode was run with `NEXT_PUBLIC_SITE_MODE=live NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

| Mode | Page | Form factor | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|---|
| live | / | mobile | 100 | 100 | 100 | 100 | 0.9 s | 0 |
| live | / | desktop | 98 | 100 | 100 | 100 | 1.1 s | 0 |
| live | /contact | mobile | 100 | 100 | 100 | 100 | 0.8 s | 0 |
| live | /contact | desktop | 100 | 100 | 100 | 100 | 0.2 s | 0 |
| demo | / | mobile | 99 | 100 | 100 | 69 | 0.9 s | 0 |
| demo | / | desktop | 98 | 100 | 100 | 69 | 1.1 s | 0 |
| demo | /contact | mobile | 100 | 100 | 100 | 69 | 0.8 s | 0 |
| demo | /contact | desktop | 100 | 100 | 100 | 69 | 0.2 s | 0 |

Demo mode: the only failing SEO audit on every run is `is-crawlable` ("Page is blocked from indexing"), which is intended.

Structured data: both pages posted to https://validator.schema.org: 0 errors, 0 warnings.
Types found: HomeAndConstructionBusiness, OpeningHoursSpecification, City, AdministrativeArea, ContactPoint,
Service (x8), FAQPage, Question, Answer (home); BreadcrumbList, ListItem (contact).
