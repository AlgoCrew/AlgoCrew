# 16. Final review (workflow stage 7)

**Date:** 2026-11-15
**Reviewed:** `main` at `e5d644e`, plus the two fixes in §2 (uncommitted at the time of writing), as a local production build.
**Brief:** "a comprehensive code, UI/UX, responsiveness, accessibility, SEO, and performance review."
**Builds on:** `15-qa-report.md` (accessibility, SEO, performance and console checks on the built pages). This review adds a code review, a prototype comparison and a full responsiveness sweep, and does not repeat what 15 already measured.

## Verdict

**The implementation meets the brief and matches the approved prototypes. It is ready for a hosted preview, not yet for launch.** No open code defect blocks launch. The blockers are the client and legal items already listed in 15 §3, plus the Vercel plan limit (§5).

| Area | Rating | Basis |
|---|---|---|
| Code | Good | Server code validates at every trust boundary; one S1 privacy bug found and fixed (§2) |
| UI/UX against the prototypes | Matches | Same H1s, heading sizes and section order on all five prototyped pages; one mobile sizing gap found and fixed (§2) |
| Responsiveness | Pass | 33 pages × 4 widths (320, 768, 1024, 1440): no horizontal overflow |
| Accessibility | Pass, with manual checks left | 0 axe violations (15); real-keyboard and screen-reader passes still to do |
| SEO and migration | Pass | 74/74 migration rows, 33-URL sitemap, 0 broken links, 1 H1 and complete metadata per page |
| Performance | Pass, with an exception | CLS 0; LCP element is the H1; 3D lazy and under budget; first-load JS at or below baseline (exception recorded in 15 §4); LCP time still unmeasured |

## 1. What was checked

- **Code:** the contact API route, the shared validation, middleware and the migration table, the contact form, mega menu, mobile drawer, consent banner, 3D scene wrapper, the gating of menus and review pages, and the old components left behind.
- **Prototype comparison:** home, DevSecOps service, Cloud Security pillar, Compliance hub and Contact, at 1440 px (structure and heading sizes measured) and 375 px (visual).
- **Responsiveness:** every sitemap URL at 320, 768, 1024 and 1440 px, then 320 and 768 px again after the font fix.
- **Regression:** type check, 12 unit tests, link, sitemap and token checks after both fixes.

The platform (Azure) and framework (HIPAA) templates were not compared: their pages are gated off, and only the review pages under `/design-system` show them.

## 2. Defects found and fixed in this review

| # | Severity | Defect | Fix | Verified |
|---|---|---|---|---|
| F1 | **S1** (privacy) | The contact form had no `method`, so a submission before JavaScript loaded, or with JavaScript off, became a GET request with the name, email and message in the URL. 12 §5 lists personal data in URLs as a blocker. The QA fix that put the form into the static HTML made this reachable | `method="post" action="/api/contact"` on the form (`ContactForm.tsx`). JavaScript submissions are unchanged | Built HTML: `<form … action="/api/contact" method="post">` |
| F2 | S3 (UI) | Below 1024 px Once UI sets the root font to 15 px, so on phones and tablets every heading, text size and spacing was about 6% smaller than the prototypes (home H1 at 375 px: 37.5 px against the prototype's 40 px). You asked for the prototypes' big headings | `--font-scaling-tablet` and `--font-scaling-mobile` set to 16px in `tokens.css` | Root 16 px at 375, 768 and 1440 px; home H1 40 px at 375 px; no overflow at 320 or 768 px |

## 3. Open findings

Ranked. None blocks launch on its own.

| # | Severity | Finding | Recommendation |
|---|---|---|---|
| O1 | S3 | ~~Without JavaScript the form posts safely, but the visitor got a raw JSON error.~~ **Fixed:** `/api/contact` also accepts plain form posts and answers them with a short page (sent, missing fields, too many messages, or failed) with a link back. JSON requests from the form script are unchanged | Verified with curl: 9 cases (form, multipart, JSON, malformed, honeypot, rate limit) return the right status and page or JSON |
| O2 | S3 | **About 60 old components are no longer used** (old Header and Footer, home, about, contact, work, services, calendars), still bundled into source and still compiled by Sass, which prints the deprecation warnings in the Vercel log | Delete them in the cleanup release (roadmap Stage 11, deprecation register 11), with the uncommitted `src/components/home/three/` draft |
| O3 | S3 | **First-load JavaScript is about 367 kB per page**, mostly Once UI's providers in the root layout. Recorded as an exception in 15 §4 | After the cleanup release, move Insights and the legal pages off Once UI and remove its providers from the root layout |
| O4 | S3 | **Insights still carries the old positioning:** header "Engineering Perspectives… senior-only teams… AI" and the old categories (T8.09) | Rewrite the header and recategorize the posts around the four pillars |
| O5 | S4 | ~~3D wrapper race: two starts during the import could mount the scene twice.~~ **Fixed:** a `starting` flag in `HeroScene.tsx` | Width changed across 860 px during load: one canvas, mounted, no errors |
| O6 | S4 | **Rate limit is per server instance** and resets on cold start. Already marked as a known shortcut in the route | Move to a shared store (Vercel KV or Upstash) if spam gets through |
| O7 | S4 | **Lint:** the OG image route has an `<img>` without `alt`. It renders an image file and is never shown to people | Add `alt=""` |
| O8 | — | **Not built yet** (P1 in the roadmap): OG image restyle (T10.05), report-only CSP (T10.13) | Schedule after launch |

## 4. Still unverified

These need a hosted preview, real devices or the client, and are listed in 15 §5:

- LCP time, INP and Lighthouse scores
- real Tab-key order, the focus ring, and VoiceOver and NVDA passes
- Safari, Firefox, iOS and Android
- EmailJS delivery end to end

## 5. Deployment status

`main` (`e5d644e`) is on GitHub but **not deployed**. Vercel's Hobby plan refuses to build a private repository owned by a GitHub organization (commit status on `e5d644e`). The 17:21 build in the Vercel log rebuilt the previous commit, `99acaac`, because "Redeploy" reuses a deployment's own commit. To deploy, upgrade the Vercel team to Pro, or deploy from a local checkout with `npx vercel --prod`.

## 6. Recommended order from here

1. Close the client and legal blockers in 15 §3: privacy policy and terms, hidden posts, Search Console review of the 410 list, EmailJS keys.
2. Unblock Vercel (§5) and deploy to a **preview**, not production. Run Lighthouse, the real-keyboard pass and the device matrix there (§4).
3. Launch per the 12 §7 runbook (O1 and O5 are fixed).
4. Cleanup release within the first weeks: O2, then O3, O4 and O8.
