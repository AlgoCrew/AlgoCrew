# 15. QA report: release candidate on `site-v2`

**Date:** 2026-11-15
**Build tested:** local production build (`next build` + `next start`, port 3200) of the uncommitted `site-v2` working tree.
**Plan followed:** `12-qa-and-launch-plan.md`. This is the developer QA pass (roadmap Stage 11). It is not the release-candidate pass on a hosted preview, which still needs hosting access, real devices and the client's inputs (12 §10).

## Verdict

**Not ready to launch.** The code is in good shape: every automated check passes, and the defects found in this pass are fixed. Launch is blocked by content and access items the client owns (§3 below), mainly the legal pages, Search Console access and the verification items.

## 1. Results by check

| Area (12 §) | Result | Notes |
|---|---|---|
| Type check | Pass | `tsc --noEmit` |
| Unit tests | Pass | 12 of 12 (`npm run test:checks`) |
| Internal links | Pass | 42 built pages, 0 broken (`check:links`) |
| Sitemap | Pass | 33 URLs; 0 missing, 0 extra; no gone, hidden or redirecting URL in it (`check:sitemap`) |
| Design tokens | Pass | 7 site-v2 stylesheets, 0 raw colours (`check:tokens`) |
| Redirects and status codes (§4.2) | Pass | 74 of 74 rows of 05 return the expected status on the production server (Stage 10) |
| SEO tags (§4.12) | Pass | 39 pages scanned: titles, descriptions, canonicals, robots, one H1 each, 0 issues |
| Accessibility, axe-core (§4.10) | Pass after fixes | WCAG 2.0/2.1/2.2 A and AA rules on 19 templates: 0 violations. The two legal pages failed `link-in-text-block` and are fixed (see §2). The final re-run on those two used a computed-style check, because loading axe again was blocked in this session |
| Landmarks | Pass after fix | There was no `<main>` on any page (fixed, see §2) |
| Keyboard: mega menus (§4.3) | Pass, handlers only | Services, Compliance, Company: open on activation, panel follows its trigger in the DOM, Esc closes and returns focus to the trigger. Real Tab-key order **not** tested: the preview pane does not move focus on Tab. Needs a manual pass |
| Keyboard: mobile drawer (§4.4) | Pass, handlers only | At 375 px: opens, page behind is inert and scroll-locked, Tab from the last item wraps to the menu button, Esc closes and returns focus. Same limit as above |
| Console errors (§4.15) | Pass | 36 pages (33 sitemap URLs + a 404, a 410 and a hidden post) loaded on the production server: 0 script errors. The console shows HTTP status lines for the deliberate 404/410 test URLs, plus one more 404 that could not be traced: every asset referenced by every sitemap page returns 200, as do the favicon set, manifest and OG image |
| Consent (§4.14) | Pass | No request to Google or Tawk.to before consent; neither URL is in the built HTML |
| Layout shift | Pass after fix | CLS 0 on `/`, a service page, `/compliance`, a post and `/contact` (`/contact` was 0.151; fixed, see §2) |
| LCP element | Pass | The H1 on every template measured, not the 3D canvas |
| LCP time | **Not measured** | The preview pane was hidden, so the browser delayed first paint (LCP = first paint ≈ 1.8–2.3 s, server response 9 ms). These numbers are not meaningful. Run Lighthouse on the hosted preview |
| First-load JavaScript (§4.11) | Exception | See §4 |
| 3D budget (§4.9) | Pass | 132 KB gzip in two lazy chunks, not in the homepage's first load (Stage 9) |
| Content and claims (§4.13) | Open items | See §3. All remaining hits are on the legal pages and on hidden posts |

## 2. Defects found and fixed in this pass

| # | Severity | Defect | Fix |
|---|---|---|---|
| 1 | S2 | Links inside body text on several pages were told apart by colour only (WCAG 1.4.1). axe `link-in-text-block` | Links inside running text are underlined site-wide (`src/styles/motion.css`), on the legal pages (`legal.module.scss`), in the consent banner and in pillar lines. Colour overrides were rewritten with two-class selectors so Once UI's `a:not(.button)` rule no longer wins |
| 2 | S3 | Two stylesheets still used the old cyan `#06c8e8` as a text colour (contrast below 4.5:1) | Replaced with `var(--brand)` in `blog.module.scss` and `legal.module.scss` |
| 3 | S2 | `/contact` shifted after load (CLS 0.151), and without JavaScript the page had **no form**: `useSearchParams` stopped the form from being pre-rendered, so the side panel drew in the form's column and then jumped | The form reads `?topic=` from `window.location` after mount; the `Suspense` wrapper is gone. The form is now in the static HTML, CLS is 0, and `?topic=compliance` still preselects "Compliance" |
| 4 | S2 | No `<main>` landmark on any page: the layout's content wrapper was a `<div>` | The wrapper renders as `<main id="main-content">`. Five pages (Insights, posts, privacy, terms, 404) had their own `<main>` and now use `<div>`, so each page has exactly one |
| 5 | S3 | `public/manifest.json` still described the old business ("Elite Software Agency… web, mobile") with the old colours | Name, description and colours match the new positioning and tokens |

## 3. Launch blockers (owned outside the code)

Severity per 12 §5. None of these can be closed by development alone.

| # | Severity | Blocker | Owner | What closes it |
|---|---|---|---|---|
| B1 | S1 | **Privacy policy is wrong.** It names Plausible as the analytics tool; the site uses Google Analytics and Tawk.to (after consent). It names "AlgoCrew Ltd." (unverified, V-06), calls AlgoCrew "a software engineering and consulting agency", and contains "GDPR-compliant data processing agreements" | Client + counsel | A rewritten policy listing the real processors (V-15, I-04) and the verified legal entity, reviewed by counsel |
| B2 | S1 | **Terms** name "AlgoCrew Ltd." (unverified) and are dated January 2025 | Client + counsel | Verified entity and counsel review |
| B3 | S1 | **Hidden posts carry unverified commitments:** "first commit within 48 hours of kickoff" (2 posts), "30-day rolling exit" (1 post). They are `noindex` and unlinked, but still reachable by URL | Client | Either confirm the claims (with evidence), edit them out, or move the posts to 410 (one line each in `routeMigration.ts`) |
| B4 | S2 | **410 list not checked against Search Console** (T1.06). Retired URLs with real backlinks should redirect instead | Client (access) | Search Console access, then a review of the 32 paths |
| B5 | S1 | **Contact form delivery untested.** EmailJS keys are environment variables and are not set in this environment | Client (V-10, I-01) | Production keys and inbox; one test submission end to end |
| B6 | — | **Open verification items** (V-01 to V-23 in 13 and 12 §10): no client logos, no partner badges, no platform or framework pages live, company facts empty. The site is built to launch in this "nothing verified" state, so these do not block launch by themselves, but V-06, V-07, V-15 and V-23 do (12 §5 item 4) | Client | Confirmations recorded in `site.ts` and `gating.ts` |
| B7 | — | **Sign-offs, rollback rehearsal and hosted-preview QA** (12 §5 items 6–7, §2.3 device matrix) | Client + developer | Hosting access, real devices |

## 4. First-load JavaScript exception

Every page loads 360–370 kB of first-load JavaScript (homepage 368 kB, `/blog` 418 kB), against a proposed target of 150 KB. Most of it is the shared root layout: Once UI's providers and the React runtime, which every page pays for. 12 §4.11 sets the fallback: if the library alone exceeds the target, the target becomes "baseline + 10%". Against the Stage 1 baseline (homepage 449 kB, most pages 361–369 kB) every page is at or below baseline, and the homepage is 81 kB lighter. **Recorded as an exception, not a defect.** The real saving is removing Once UI's providers from the root layout once the legacy Insights and legal pages no longer use it. That is follow-up work, not part of R1.

## 5. Not covered in this pass

- LCP, INP and Lighthouse scores (needs a visible browser on a hosted preview).
- Real Tab-key order and visible focus ring in a real browser; screen-reader pass (VoiceOver, NVDA).
- Safari, Firefox, iOS and Android (12 §2.3).
- Reduced-motion behaviour in a browser (checked in code only).
- External links (LinkedIn and other outbound links not requested).
- CSP report-only (T10.13 not built).
- Copy that is still from the old site and outside R1 scope: the Insights header ("Engineering Perspectives… senior-only teams… AI") and its old categories (T8.09).
