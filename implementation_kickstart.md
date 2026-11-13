# Potomac Green: implementation kickstart

Concept site for Potomac Green (landscaping and light handyman, Potomac MD, est. 2026),
built by Lee Enterprises Unlimited as a spec demo. Front end only.

## Plan
- Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion (Edge Line and One Visit List ticket only), lucide-react, qrcode.
- Single landing page plus `/contact`, real 404.
- All facts in `lib/business.ts`. Photos in `lib/images.ts`. Tasks, seasons, area data in `lib/`.
- Images: `npm run images` converts `public/images/raw` with sharp into `.webp` at 640 / 1280 / 2400 (hero also 1920 and a phone crop). A custom `next/image` loader (`lib/image-loader.ts`) picks the right file.
- Visit Planner: one React context (`components/VisitPlanner/PlannerContext.tsx`) carries pre-selects from every button into a 6 step modal. Submit builds WhatsApp and SMS summaries. No backend.
- Launch switch: `NEXT_PUBLIC_SITE_MODE` (`demo` default, `live`) and `NEXT_PUBLIC_SITE_URL` drive robots meta, robots.txt, sitemap and the concept footer line (`lib/site.ts`).

## Design tokens ("Potomac Fieldbook")
| Token | Value | Use |
|---|---|---|
| paper | `#F5F4EC` | page background |
| paper-2 | `#EDEBDF` | alternate sections |
| card | `#FBFBF7` + border `#E2E4D6` | job-ticket cards on paper |
| canopy | `#073E2B` | hero scrim, block 2, planner header, footer, final band |
| canopy-2 | `#0B4A2E` | cards on green (border `rgba(245,244,236,0.12)`) |
| lime | `#9FC63A` | primary button bg, hatch stripe, Edge Line, checks, active states, numbers on green |
| ink | `#13261C` / muted `#5A6A5F` | text on paper |
| on-green | `#F5F4EC` / muted `rgba(245,244,236,0.72)` | text on green |

- Lime is never text on paper. Primary button: lime bg + canopy text.
- Fonts: Fraunces (display, opsz axis, WONK 0) and Hanken Grotesk (body, wordmark 800, 0.08em).
- Hatch stripe: `repeating-linear-gradient(135deg, #9FC63A 0 6px, transparent 6px 11px)` over canopy, 6px. Only on: One Visit List ticket, business card, Visit Planner footer, footer divider.
- 8px grid. Sections 112 to 128px desktop, 72px mobile. Max width 1200px. Card radius 14px.
- Motion only in the hero Edge Line and the One Visit List ticket. Reduced motion respected.

## Checklist
- [x] Phase 1: scaffold, design tokens, fonts, nav, hero with the Edge Line, footer
- [x] Phase 2: block 2 (same visit band with the WhatsApp QR), the One Visit List with `lib/tasks.ts`
- [x] Phase 3: services bento with the Mulch Calculator, This Month band with `lib/seasons.ts`
- [x] Phase 4: Service Area map and checker, how it works, the card in his pocket, sample reviews, FAQ, final call-to-action
- [x] Phase 5: Visit Planner modal, wiring and pre-selects, WhatsApp and SMS summaries, mobile sticky bars, `/contact`
- [ ] Phase 6: launch switch, titles, descriptions, h1, JSON-LD, robots, sitemap, llms.txt, OG image, favicon, 404, image optimisation, SEO-LAUNCH.md
- [ ] Phase 6b: Lighthouse on a production build, both modes, mobile and desktop
- [ ] Phase 7: final review, commit, ready for GitHub and Vercel
