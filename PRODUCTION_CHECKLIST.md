# CalcLabzPro — Production Deployment Checklist

Use this checklist before every production deployment.

## Pre-Deploy

- [ ] `npx next build` — zero TypeScript errors
- [ ] `npx vitest run` — all 185+ tests pass
- [ ] `npx next lint` — zero ESLint errors
- [ ] All env vars set in Vercel dashboard:
  - `WEB3FORMS_ACCESS_KEY` — contact form API key
  - `SENTRY_DSN` (optional) — error tracking
- [ ] `.env.local` NOT committed to git (verify `.gitignore`)
- [ ] No hardcoded API keys in source code (grep for `access_key`, `api_key`)

## SEO

- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] JSON-LD schemas validate via [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Canonical URLs resolve correctly (no redirects to non-canonical)
- [ ] OG image renders in [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Google Search Console: No crawl errors

## Performance

- [ ] Lighthouse Performance score ≥ 90
- [ ] Lighthouse Accessibility score ≥ 90
- [ ] Lighthouse SEO score ≥ 95
- [ ] No CLS (Cumulative Layout Shift) > 0.1
- [ ] Service worker loads and caches correctly
- [ ] Images serve as AVIF/WebP (check Network tab)

## Security

- [ ] CSP headers present (check response headers)
- [ ] HSTS header with `preload` flag
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] No console.log() in production (only warn/error via logger)
- [ ] Contact form rate limiting active (test with 6 rapid submissions)
- [ ] Proxy (middleware) blocking malicious bots on API routes

## Functionality

- [ ] All 268+ calculator pages render correctly
- [ ] Calculator input → calculate → result flow works
- [ ] Contact form submits successfully
- [ ] Dark/light theme toggle works
- [ ] Mobile navigation opens/closes
- [ ] Command palette (Ctrl+K) opens
- [ ] Back-to-top button appears on scroll
- [ ] Category pages list correct calculators
- [ ] Blog posts render with TOC and reading progress bar
- [ ] Dashboard page loads with history/favorites

## Post-Deploy

- [ ] Verify live site loads at `calclabz.com`
- [ ] Check Vercel deployment logs for errors
- [ ] Monitor Sentry for new errors (if configured)
- [ ] Verify PWA install prompt works on mobile
- [ ] Run Google PageSpeed Insights on homepage and 3 calculator pages
