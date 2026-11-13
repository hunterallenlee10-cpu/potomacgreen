# Potomac Green: concept site

Front-end-only concept for Potomac Green (landscaping and light handyman, Potomac MD).
Built by Lee Enterprises Unlimited. Next.js 16, TypeScript, Tailwind CSS v4.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run images     # re-generate .webp files from public/images/raw
node scripts/og-image.cjs   # re-render public/og-image.png (needs Playwright)
```

- Business facts: `lib/business.ts`. Photos: `lib/images.ts`. Tasks, seasons, service area: `lib/`.
- Launch switch: `NEXT_PUBLIC_SITE_MODE` (`demo` default, `live`) and `NEXT_PUBLIC_SITE_URL`. See `SEO-LAUNCH.md`.
- Deploy: import the repo into Vercel as its own project. Leave it in demo mode until launch day.
- Lighthouse results: `lighthouse/RESULTS.md`. Plan and tokens: `implementation_kickstart.md`.
