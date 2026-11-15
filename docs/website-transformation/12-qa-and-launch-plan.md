Stage 5 deliverable. Status: awaiting review.

# 12 — QA and Launch Plan

Testing, accessibility, performance, SEO, content and privacy checks, and the launch, monitoring and rollback procedure for release 1. Task IDs (`Tn.nn`), milestones and implementation decisions (`I-xx`) are from [10](10-implementation-roadmap.md); deprecation entries (`DEP-xxx`) from [11](11-deprecation-register.md); route rows (`05#n`) from [05](05-route-migration.md); verification items (`V-xx`) from 07 §11.

Every checklist row has an explicit pass criterion. A row passes only when its criterion is met on the release candidate (T11.01) and, where marked **[prod]**, again on production after launch.

---

## 1. Assumptions

- Hosting is Vercel (inferred in 01 §1, **not confirmed**). Wherever this plan says "promote", "instant rollback" or "deployment ID", replace it with the equivalent of the confirmed host.
- Production host is `https://algocrew.io` (apex), with `www` and the production `*.vercel.app` alias redirecting to it.
- "All gated pages launch" is the baseline. When a gated page does not launch, its rows change as described in §4.1.
- Redirects use status 301 (I-03). If I-03 is decided as `permanent: true`, read every expected 301 as 308.
- Team roles are as in 10 AS-01 to AS-04. People are named at T0.09–T0.11.

---

## 2. Scope, environments and sign-off

### 2.1 In scope

All R1 routes in 04 §2 (25 core pages, 16 indexable posts, 6 noindex posts, 404); every row of 05; header, mega menus, drawer, footer; the contact form and its delivery; consent; metadata, structured data, sitemap, robots, OG images; the 3D hero and all diagrams.

Out of scope: later-release routes (`/services/kubernetes`, `/assessments/*`, `/industries/*`, `/blog/category/*`, `/clients`), the dark theme (unless D-01 = B, in which case every visual row is run twice), and the legacy pages that are unlinked but not removed until cleanup.

### 2.2 Environments

| Environment | Used for | Notes |
|---|---|---|
| Local production build (`npm run build && npm start`) | Automated checks T1.09, T1.10, crawl, Lighthouse CI | Same code as the preview |
| Preview deployment of the release branch | All manual QA, UAT, legal review | Must not redirect to production (I-06) and must send `X-Robots-Tag: noindex` |
| Release-candidate preview (T11.01) | Final full pass, sign-off | Production configuration and environment variables except analytics IDs |
| Production **[prod]** | Launch-day smoke checks and monitoring | §7, §8 |

### 2.3 Browser and device matrix

Latest stable versions at the time of testing, plus the previous major version of Safari and iOS Safari.

| Class | Viewport (CSS px) | Chrome | Safari | Firefox | Edge | iOS Safari | Android Chrome |
|---|---|---|---|---|---|---|---|
| Large desktop | 1920 × 1080 | Full | Full | Full | Smoke | — | — |
| Desktop | 1440 × 900 | Full | Full | Full | Full | — | — |
| Laptop | 1280 × 800 and 1024 × 768 (menu breakpoint) | Full | Full | Smoke | Smoke | — | — |
| Tablet | 768 × 1024 portrait, 1024 × 768 landscape (real iPad if available) | Smoke | — | — | — | Full | Smoke |
| Phone | 375 × 812 (real iPhone), 360 × 800 (real Android) | Smoke (emulated) | — | — | — | Full | Full |
| Narrow | 320 width, any browser | Full | — | — | — | — | — |

**Full** = every checklist in §4 that applies to the viewport. **Smoke** = home, one pillar page, one framework page, contact form submission, header menu open and close.

At least one real iPhone and one real Android phone are required. Emulation alone does not pass the phone class.

### 2.4 Who signs off

| Area | Sign-off role |
|---|---|
| Technical checks (§4.1–4.2, 4.9–4.10, 4.14) | Lead engineer |
| Visual and responsive (§4.7) | Designer |
| Accessibility (§4.8) | Lead engineer plus an independent tester who did not build the component (the second engineer is acceptable) |
| Content and claims (§4.11–4.12) | Client marketing owner |
| Framework pages, privacy policy, terms | Client counsel or compliance specialist (T0.11) |
| Privacy and consent (§4.13) | Client privacy owner, with counsel |
| Go/no-go (§6, §7) | Client project owner and lead engineer |

---

## 3. Automated checks (run on every pull request and on the release candidate)

| Check | Tool | Pass criterion |
|---|---|---|
| Build, lint, typecheck | `npm run build`, `eslint`, `tsc --noEmit` | Zero errors |
| Internal links and anchors (T1.09) | `npm run check:links` | Zero links to a missing route or anchor |
| Sitemap equals routes (T1.10) | `npm run check:sitemap` | Sitemap set equals the set of generated indexable routes |
| Status codes (§4.2) | A script that requests each row of §4.2 with redirects not followed | Every status and `Location` header matches |
| Accessibility scan | axe-core (for example via Playwright) on every R1 URL | Zero violations at WCAG 2.2 A/AA tags |
| Lighthouse | Lighthouse CI on the templates in §4.11 | Targets in §4.11 |
| Full crawl | The link check plus an external crawler (for example linkinator or Screaming Frog) from `/` | Zero 4xx/5xx on internal links; zero redirect chains; no orphan R1 page |
| Phrase search | `grep` over the rendered output (§4.13) | Zero unexplained matches |
| Console errors | Playwright run over every R1 URL, logging `console.error` and page errors | Zero errors (warnings logged for review) |

---

## 4. Checklists

### 4.1 All routes

R1 routes from 04 §2. Gated pages are tested **twice**: in a build with the flag on and in a build with the flag off.

| Done | Route | Pass criterion (flag on, or ungated) | Pass criterion with flag off |
|---|---|---|---|
| [ ] | `/` | 200; one H1; 10 sections of 07 §4 in order (client logos only if V-02 cleared ≥ 3 logos) | — |
| [ ] | `/services` | 200; lists the 5 pillars and 2 capability pages | — |
| [ ] | `/services/cloud-consulting` | 200; anchors `#strategy`, `#architecture`, `#migration`, `#infrastructure-engineering`, `#hybrid-multi-cloud`, `#cloud-native`, `#optimization` exist | — |
| [ ] | `/services/cloud-migration` | 200; anchor `#modernization` exists | — |
| [ ] | `/services/devops` | 200; anchors `#consulting`, `#devsecops`, `#ci-cd`, `#infrastructure-as-code`, `#platform-engineering`, `#kubernetes`, `#automation`, `#observability`, `#release-engineering` | — |
| [ ] | `/services/devsecops` | 200; anchors `#lifecycle`, `#pipeline-security`, `#supply-chain`, `#policy-as-code`, `#runtime` | — |
| [ ] | `/services/cloud-security` | 200; anchors `#security-architecture`, `#assessments`, `#iam`, `#zero-trust`, `#security-automation`, `#vulnerability-management`, `#threat-detection`, `#security-monitoring`, `#infrastructure-security`, `#application-security` | — |
| [ ] | `/services/managed-cloud-services` | 200; anchors `#managed-platforms`, `#infrastructure-management`, `#security-management`, `#devops-managed`, `#incident-management`, `#cost-optimization`, `#backup-dr`; coverage wording matches V-12 (no "24/7" unless confirmed) | — |
| [ ] | `/cloud-platforms` | 200; lists only live platforms; no "on request" line | Hub lists the remaining platforms only |
| [ ] | `/cloud-platforms/azure`, `/aws`, `/google-cloud` (gated V-03, badge V-01) | 200; anchors `#consulting`, `#architecture`, `#migration`, `#devops`, `#security`, `#operations`, `#governance-compliance`; badge only if V-01 | 404; absent from header, drawer, footer, hub, home platforms section, pillar "Where we deliver this" strips, sitemap |
| [ ] | `/compliance` | 200; anchors `#boundaries`, `#frameworks`, `#cloud-governance`, `#security-governance`, `#risk-management`, `#assessments`, `#policy-controls`, `#audit-readiness`; boundary statement present | Framework cards list live frameworks only |
| [ ] | `/compliance/hipaa`, `/gdpr`, `/pci-dss`, `/pipeda` (gated V-03 and legal review) | 200; boundary statement; "what we do not do"; legal review log entry exists (§4.12) | 404; absent from menus, footer, hub, home section 6, pillar "Supports" strips, platform `#governance-compliance` links, sitemap; 05#16 and #17 redirect to `/compliance` |
| [ ] | `/about` | 200; `#clients` anchor present; logo row only with ≥ 3 approved logos | — |
| [ ] | `/our-approach` | 200; anchors `#engagement-models`, `#faq`; no prices | — |
| [ ] | `/trust` (gated V-14) | 200; every statement maps to a confirmed V-14 item | 404; absent from Company menu, footer, home "What you get" link; Our Approach has the short "How we handle access" section |
| [ ] | `/careers` | 200; footer only (not in the top bar); no `/work` links; JobPosting only per real role (V-20) | — |
| [ ] | `/contact` | 200; one form; booking link (V-10); careers link | — |
| [ ] | `/blog` | 200; heading "Insights"; exactly the 16 retained posts; category filters for categories with posts | — |
| [ ] | 16 retained posts (05#43–#58) | 200 each; byline (V-09 or "AlgoCrew engineering"); published and updated dates; linked table of contents; related-service box; 3 related live posts | — |
| [ ] | 6 hidden posts (05#59–#64) | 200 with noindex (§4.2) | — |
| [ ] | `/privacy-policy`, `/terms` | 200; verified entity (V-06); governing law (V-07); processors (V-15) | — |
| [ ] | Unknown URLs: `/does-not-exist`, `/services/not-a-slug`, `/compliance/sox`, `/cloud-platforms/oracle`, `/blog/not-a-post` | **HTTP 404** (not 200); 404 page links to the five pillars, Compliance, Contact | — |
| [ ] | Menu-only items: "Our Clients" (`/about#clients`) | Shown in the Company menu only if V-02 approved | Item absent |

### 4.2 Redirects and status codes

Request each URL without following redirects. "Expected `Location`" must match exactly, including the fragment. Run on the release candidate and again **[prod]**.

| Done | 05# | Existing URL | Expected status | Expected `Location` / behavior |
|---|---|---|---|---|
| [ ] | 1 | `/` | 200 | Self-canonical `https://algocrew.io/` |
| [ ] | 2 | `/about` | 200 | Self-canonical `https://algocrew.io/about` |
| [ ] | 3 | `/services` | 200 | Self-canonical `https://algocrew.io/services` |
| [ ] | 4 | `/contact` | 200 | Self-canonical `https://algocrew.io/contact` |
| [ ] | 5 | `/hire` | 301 | `/contact` |
| [ ] | 6 | `/pricing` | 301 | `/our-approach#engagement-models` |
| [ ] | 7 | `/careers` | 200 | Self-canonical `https://algocrew.io/careers` |
| [ ] | 8 | `/faq` | 301 | `/our-approach#faq` |
| [ ] | 9 | `/locations` | 301 | `/about` |
| [ ] | 10 | `/blog` | 200 | Self-canonical; page labeled "Insights" |
| [ ] | 11 | `/work` | 301 | `/about` |
| [ ] | 12 | `/privacy-policy` | 200 | Self-canonical `https://algocrew.io/privacy-policy` |
| [ ] | 13 | `/terms` | 200 | Self-canonical `https://algocrew.io/terms` |
| [ ] | 14 | `/services/cloud-devops` | 301 | `/services/devops` |
| [ ] | 15 | `/services/security-quality` | 301 | `/services/cloud-security` |
| [ ] | 16 | `/services/fintech-software-development` | 301 | `/compliance/pci-dss` (fallback while gated page is not live: `/compliance`) |
| [ ] | 17 | `/services/healthcare-software-development` | 301 | `/compliance/hipaa` (fallback while gated page is not live: `/compliance`) |
| [ ] | 18 | `/services/team-services` | 301 | `/our-approach#engagement-models` |
| [ ] | 19 | `/services/data-automation` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 20 | `/services/microsoft-solutions` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 21 | `/services/web-app-development` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 22 | `/services/e-commerce` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 23 | `/services/ecommerce-development` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 24 | `/services/digital-marketing` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 25 | `/services/emerging-tech` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 26 | `/services/gaming` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 27 | `/services/saas-development` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 28 | `/services/startup-mvp-development` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 29 | `/work/localised` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 30 | `/work/boxo` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 31 | `/work/stay-with-lumina` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 32 | `/work/cashcloud` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 33 | `/work/outreside` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 34 | `/work/nice2stay` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 35 | `/work/codly` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 36 | `/work/alert-management` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 37 | `/work/deeplawn` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 38 | `/locations/software-agency-canada` | 301 | `/about` |
| [ ] | 39 | `/locations/software-agency-toronto` | 301 | `/about` |
| [ ] | 40 | `/locations/software-agency-united-states` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 41 | `/locations/software-agency-united-kingdom` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 42 | `/locations/software-agency-australia` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 43 | `/blog/kubernetes-vs-ecs-2025` | 200 | Self-canonical `https://algocrew.io/blog/kubernetes-vs-ecs-2025` |
| [ ] | 44 | `/blog/aws-cost-optimisation-engineering-guide` | 200 | Self-canonical `https://algocrew.io/blog/aws-cost-optimisation-engineering-guide` |
| [ ] | 45 | `/blog/serverless-vs-containers-2025` | 200 | Self-canonical `https://algocrew.io/blog/serverless-vs-containers-2025` |
| [ ] | 46 | `/blog/microservices-vs-monolith-honest-guide` | 200 | Self-canonical `https://algocrew.io/blog/microservices-vs-monolith-honest-guide` |
| [ ] | 47 | `/blog/event-driven-architecture-patterns` | 200 | Self-canonical `https://algocrew.io/blog/event-driven-architecture-patterns` |
| [ ] | 48 | `/blog/ci-cd-pipeline-best-practices-2025` | 200 | Self-canonical `https://algocrew.io/blog/ci-cd-pipeline-best-practices-2025` |
| [ ] | 49 | `/blog/docker-production-best-practices` | 200 | Self-canonical `https://algocrew.io/blog/docker-production-best-practices` |
| [ ] | 50 | `/blog/terraform-infrastructure-as-code-patterns` | 200 | Self-canonical `https://algocrew.io/blog/terraform-infrastructure-as-code-patterns` |
| [ ] | 51 | `/blog/observability-beyond-monitoring` | 200 | Self-canonical `https://algocrew.io/blog/observability-beyond-monitoring` |
| [ ] | 52 | `/blog/sre-practices-for-startups` | 200 | Self-canonical `https://algocrew.io/blog/sre-practices-for-startups` |
| [ ] | 53 | `/blog/supply-chain-security-software` | 200 | Self-canonical `https://algocrew.io/blog/supply-chain-security-software` |
| [ ] | 54 | `/blog/owasp-top-10-2025-developer-guide` | 200 | Self-canonical `https://algocrew.io/blog/owasp-top-10-2025-developer-guide` |
| [ ] | 55 | `/blog/zero-trust-security-architecture-guide` | 200 | Self-canonical `https://algocrew.io/blog/zero-trust-security-architecture-guide` |
| [ ] | 56 | `/blog/api-security-best-practices-2025` | 200 | Self-canonical `https://algocrew.io/blog/api-security-best-practices-2025` |
| [ ] | 57 | `/blog/jwt-security-common-mistakes` | 200 | Self-canonical `https://algocrew.io/blog/jwt-security-common-mistakes` |
| [ ] | 58 | `/blog/kubernetes-security-hardening` | 200 | Self-canonical `https://algocrew.io/blog/kubernetes-security-hardening` |
| [ ] | 59 | `/blog/why-senior-only-teams-ship-faster` | 200 | `<meta name="robots" content="noindex, follow">`; absent from `/blog`, related posts, sitemap |
| [ ] | 60 | `/blog/async-first-engineering-culture` | 200 | `<meta name="robots" content="noindex, follow">`; absent from `/blog`, related posts, sitemap |
| [ ] | 61 | `/blog/code-review-culture-that-ships` | 200 | `<meta name="robots" content="noindex, follow">`; absent from `/blog`, related posts, sitemap |
| [ ] | 62 | `/blog/hiring-senior-engineers-remotely` | 200 | `<meta name="robots" content="noindex, follow">`; absent from `/blog`, related posts, sitemap |
| [ ] | 63 | `/blog/milestone-billing-vs-hourly` | 200 | `<meta name="robots" content="noindex, follow">`; absent from `/blog`, related posts, sitemap |
| [ ] | 64 | `/blog/technical-debt-is-not-always-bad` | 200 | `<meta name="robots" content="noindex, follow">`; absent from `/blog`, related posts, sitemap |
| [ ] | 65 | `/blog/database-performance-optimisation` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 66 | `/blog/redis-patterns-production` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 67 | `/blog/postgres-vs-mongodb-choose-right` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 68 | `/blog/building-ai-features-that-actually-work` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 69 | `/blog/nextjs-15-app-router-production-lessons` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 70 | `/blog/typescript-advanced-patterns-2025` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 71 | `/blog/web-performance-core-web-vitals-2025` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 72 | `/blog/graphql-vs-rest-2025` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 73 | `/blog/how-to-scope-an-mvp-correctly` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |
| [ ] | 74 | `/blog/react-native-vs-flutter-2025` | 410 | HTML body with links to `/`, `/services`, `/contact`; no canonical |

Endpoints and host rules (05 §1.6, §3):

| Done | Request | Expected status | Expected `Location` / behavior |
|---|---|---|---|
| [ ] | `/projects` | 301 | `/about` (one hop) |
| [ ] | `/projects/localised` (any slug) | 410 | Gone body; no `/work` hop |
| [ ] | `/api/authenticate` (POST), `/api/check-auth` (GET) | 404 | Route removed (DEP-069, DEP-070) |
| [ ] | `/api/og/generate?title=Test` | 200, `image/png` | 1200 × 630 light image; no outbound font request in server logs |
| [ ] | `/sitemap.xml` | 200 | §4.10 sitemap rows |
| [ ] | `/robots.txt` | 200 | Exactly: `User-agent: *`, `Allow: /`, `Allow: /api/og/`, `Disallow: /api/`, `Sitemap: https://algocrew.io/sitemap.xml`; no `Host:` |
| [ ] | `/manifest.json`, `/icon.svg`, `/favicon.ico` | 200 | New manifest name and description (DEP-221) |
| [ ] | `https://www.algocrew.io/` | 301 | `https://algocrew.io/` |
| [ ] | `https://www.algocrew.io/pricing` | 301 | `https://algocrew.io/our-approach#engagement-models` in **one hop** (I-02) |
| [ ] | `https://www.algocrew.io/work/boxo` | 301 then 410, or 410 directly | At most one redirect before the 410 |
| [ ] | Production `*.vercel.app` alias, any path | 301 | `https://algocrew.io` + same path |
| [ ] | A preview deployment URL | 200 | Not redirected; `X-Robots-Tag: noindex` |
| [ ] | `/about/` (trailing slash) | 308 or 301 | `/about` (Next default); canonical has no trailing slash |
| [ ] | `/contact?topic=compliance` | 200 | Topic preselected; canonical `https://algocrew.io/contact` |
| [ ] | `/blog?category=cloud-security` | 200 | Canonical `https://algocrew.io/blog` |
| [ ] | Any redirect target above | — | Target itself returns 200 (no redirect to a redirect, no redirect to a 404 or 410) |

### 4.3 Navigation and mega menus (desktop ≥ 1024 px)

| Done | Check | Pass criterion |
|---|---|---|
| [ ] | Server-rendered | With JavaScript disabled, all panel links are in the HTML source, and Services, Cloud Platforms, Compliance and Company are links to `/services`, `/cloud-platforms`, `/compliance`, `/about` |
| [ ] | Top bar content | Exactly: wordmark, Services, Cloud Platforms, Compliance, Insights, Company, "Discuss Your Cloud Strategy" (A-01) |
| [ ] | Trigger semantics | Each menu trigger is a `<button>` with `aria-expanded` and `aria-controls`; Insights is a plain link; no `role="menu"` |
| [ ] | Open by click, Enter, Space | Each opens its panel and sets `aria-expanded="true"` |
| [ ] | Hover intent | Pointer resting on a trigger opens after about 150 ms; passing across the bar without stopping opens nothing |
| [ ] | Pointer leave | Panel closes about 250 ms after the pointer leaves header and panel |
| [ ] | Esc | Closes the panel and returns focus to its trigger |
| [ ] | One panel at a time | Opening a second panel closes the first, by click, keyboard and hover |
| [ ] | Focus order | Tab moves trigger → panel columns left to right → panel footer row → next trigger |
| [ ] | Focus out | Tabbing out of the header closes the panel |
| [ ] | Scrim | Clicking the scrim closes the panel |
| [ ] | Touch on a tablet ≥ 1024 px | Tapping a label toggles the panel and does not navigate |
| [ ] | Services panel layout | 5 columns at ≥ 1280 px; 3 + 2 at 1024–1279 px; descriptors visible |
| [ ] | Links | Every link in every panel resolves (T1.09) and matches 04 §8.2–8.6; a URL appears in at most two panels |
| [ ] | Gated items | Platform, framework, Trust and Our Clients items appear only when their page or condition is live |
| [ ] | Featured slots | Services: "How we work" → `/our-approach`; Cloud Platforms: badges only if V-01, else Hybrid & Multi-Cloud link; Compliance: boundary statement → `/compliance#boundaries` |
| [ ] | Sticky bar | 68 px, stays on scroll, does not cover a focused element (WCAG 2.2 SC 2.4.11) |

### 4.4 Mobile drawer (< 1024 px)

| Done | Check | Pass criterion |
|---|---|---|
| [ ] | Bar | Wordmark, "Talk to us" → `/contact`, menu button (44 × 44 px minimum) with `aria-expanded` and `aria-controls` |
| [ ] | Open | Drawer fills the screen below the bar; page behind does not scroll (iOS Safari included) |
| [ ] | Focus trap | Tab and Shift+Tab cycle inside the drawer only |
| [ ] | Close | Esc and the close button close it; focus returns to the menu button |
| [ ] | Accordion | One section open at a time; section headers ≥ 56 px tall, rows ≥ 44 px |
| [ ] | Services list | Pillar pages and the two capability pages only; no anchor links |
| [ ] | Sticky CTA | Full-width "Discuss Your Cloud Strategy" stays visible at the bottom of the drawer |
| [ ] | No hover dependency | Every item operable by tap only |
| [ ] | Removed items | No "We're hiring" promo; no theme toggle (D-01 = A) |
| [ ] | Rotation | Rotating the phone with the drawer open keeps it usable and does not unlock page scroll |

### 4.5 CTA links

| Done | CTA | Pass criterion |
|---|---|---|
| [ ] | Header "Discuss Your Cloud Strategy" | → `/contact`; on `/contact` it scrolls to the form (04 §8.7) |
| [ ] | Hero primary and secondary | → `/contact` and `/services` ("Explore Our Capabilities") |
| [ ] | Pillar, capability, platform pages | Primary CTA → `/contact?topic=…` with the right topic preselected |
| [ ] | `/compliance` | "Discuss Your Compliance Requirements" → `/contact?topic=compliance` |
| [ ] | Framework pages | "Discuss Your {Framework} Requirements" → `/contact?topic={framework}` |
| [ ] | Articles | "Talk to the team behind this article" → `/contact` |
| [ ] | Booking | "Book a 30-minute call" opens the Cal.com link from V-10 (or is absent if V-10 not confirmed) |
| [ ] | Closing CTA block | Present on every R1 page except `/contact` and legal pages; one primary button |
| [ ] | Retired labels | None of the labels in DEP-215 appear (§4.13 grep) |

### 4.6 Forms

The only R1 form is the contact form (07 §6.12), also embedded as `ContactFormSection` on pillar, capability, platform and framework pages. Test it on `/contact` and on one page of each embedding template.

| Done | Check | Pass criterion |
|---|---|---|
| [ ] | Fields | Name, work email, company, topic (Cloud consulting & migration / DevOps & DevSecOps / Cloud security / Compliance / Managed services / Other), cloud(s) in use, message, consent checkbox; no staffing options, no "Bid Price" |
| [ ] | Labels | Every field has a visible label above it; no placeholder-only labels |
| [ ] | Required validation | Submitting empty shows an inline error per required field and an error summary that receives focus and links to each field |
| [ ] | Email validation | `a@b`, `test`, and an address with spaces are rejected with a specific message |
| [ ] | Error association | Each error is linked with `aria-describedby`; status color is never the only signal (icon or text present) |
| [ ] | Consent | Form cannot submit without the consent checkbox; its label links to `/privacy-policy` |
| [ ] | Topic preselect | Each `?topic=` value used in §4.5 preselects the matching option; an unknown value leaves the default |
| [ ] | Server-side validation (I-01) | A request that bypasses the browser (for example `curl` with missing fields) is rejected with a 4xx and no email is sent |
| [ ] | Spam protection | A honeypot-filled submission is silently dropped; more than the agreed rate from one IP is rejected; captcha (if enabled) works with keyboard and screen reader |
| [ ] | Success | A confirmation message appears in place, is announced to screen readers (live region), and states what happens next (response time only if V-10) |
| [ ] | Failure | With the email provider unreachable, the user sees an error and their typed input is kept |
| [ ] | Delivery | One test submission per topic arrives at the V-10 inbox within 5 minutes with all fields intact |
| [ ] | User confirmation email (if sent) | Arrives; wording follows 07 §8; sender domain authenticates (SPF/DKIM pass in headers) |
| [ ] | No personal data in URLs | Form uses POST; nothing typed appears in the URL, analytics events or server logs beyond what the privacy policy states |
| [ ] | Secrets | No provider private key in client bundles (search the built JS for the key) |
| [ ] | Careers | Job seekers are directed to email; no CV upload exists in R1 |

### 4.7 Responsive layouts

Breakpoints from 08 §5. Every R1 template at each width.

| Done | Width | Pass criterion |
|---|---|---|
| [ ] | 320 px | No horizontal page scroll (except inside tables and the lifecycle strip); buttons full width; text not clipped |
| [ ] | 375 px | As 320; drawer navigation; body text 16 px |
| [ ] | 639 / 640 px | Single column below, two-column grids from 640 |
| [ ] | 1023 / 1024 px | Drawer below, desktop navigation from 1024; Services menu 3 + 2 columns |
| [ ] | 1279 / 1280 px | Services menu 5 columns from 1280 |
| [ ] | 1440 px and 1920 px | Content capped at 1440; container 1200 px plus gutters |
| [ ] | 200% browser zoom at 1280 px | No horizontal scroll; no overlapping text; sticky bars do not cover more than a third of the viewport |
| [ ] | Text spacing override (WCAG 1.4.12 bookmarklet) | No clipped or overlapping text |
| [ ] | Long words and long titles | The longest post title and "Cloud Migration & Modernization" wrap cleanly in cards and breadcrumbs |
| [ ] | Tables | Tooling and control-map tables scroll horizontally inside their wrapper on phones; first column readable |
| [ ] | Visual match | Designer compares each template with the prototypes and 08 §12 wireframes |

### 4.8 Animations and reduced motion

| Done | Check | Pass criterion |
|---|---|---|
| [ ] | Properties | Only `opacity` and `transform` animate (DevTools performance panel shows no layout-triggering animations) |
| [ ] | Scroll reveal | Fade and 14 px rise, once; stagger ≤ 4 siblings at 60 ms; content visible at load is never hidden |
| [ ] | Durations | No animation over 600 ms except ambient diagram loops |
| [ ] | Off-screen | Ambient loops and the 3D scene stop when off screen |
| [ ] | `prefers-reduced-motion: reduce` | No reveals, no loops, 3D renders one still frame; all content present |
| [ ] | No JavaScript | All content visible; lifecycle shown as an ordered list |
| [ ] | Forbidden patterns | No scroll-jacking, pinned horizontal scroll, text parallax, autoplaying carousel or marquee anywhere |
| [ ] | Lifecycle interaction | Click and arrow keys move between the 7 stages; panel swaps in ≤ 200 ms |

### 4.9 3D rendering and fallbacks (08 §10.3)

| Done | Check | Pass criterion |
|---|---|---|
| [ ] | Chunk size | 3D chunk ≤ 180 KB gzip (from build output) and not part of the initial JavaScript of `/` |
| [ ] | Loading | Loaded with `next/dynamic`, `ssr: false`, after first paint |
| [ ] | LCP element | The H1, not the canvas (Lighthouse "Largest Contentful Paint element") |
| [ ] | Layout shift | Canvas container has a fixed aspect ratio; CLS ≤ 0.05 on `/` |
| [ ] | Frame cost | < 150 draw calls (`renderer.info.render.calls`); no post-processing, shadows or transmission; pixel ratio ≤ 1.75 |
| [ ] | Mount conditions | Mounts only at ≥ 860 px, while the hero is on screen, without reduced motion, with WebGL. Each condition tested by toggling it |
| [ ] | WebGL unavailable | With WebGL disabled in the browser, the CSS layer stack shows and no console error appears |
| [ ] | Below 860 px | No WebGL context is created (no `three` chunk requested) |
| [ ] | Accessibility | Canvas container is `aria-hidden`; the hero meaning does not depend on it |
| [ ] | Frame rate | Smooth on a mid-range laptop (no sustained drops below 30 fps in a 10-second recording); this is a smoke check, not a benchmark |
| [ ] | Other pages | No WebGL anywhere except `/` |

### 4.10 Accessibility (WCAG 2.2 AA)

**Automated:** axe-core on every R1 URL in both a desktop and a 375 px viewport: zero violations. Lighthouse accessibility ≥ 95 on the §4.11 templates. Automated tools catch only part of WCAG; the manual script is required.

**Manual script.** Run on `/`, `/services/cloud-security`, `/services/devsecops`, one platform page, one framework page, `/compliance`, `/contact`, `/blog`, one article, and the 404 page.

| Done | Step | Pass criterion |
|---|---|---|
| [ ] | 1. Load, press Tab once | Skip link is the first focusable element and visible on focus; activating it moves focus to `main` |
| [ ] | 2. Tab through the whole page | Every interactive element reachable in visual order; focus ring always visible (3 px `--brand`, `--sky` on dark sections); focus never hidden behind the sticky header or jump links (SC 2.4.11) |
| [ ] | 3. Operate every menu, the drawer, FAQ items, lifecycle tabs and the form with keyboard only | All work per §4.3, §4.4, §4.6; lifecycle uses arrow keys with roving tabindex |
| [ ] | 4. Consent banner by keyboard | Reachable, all choices operable, focus returns sensibly after dismissal; it does not trap focus |
| [ ] | 5. VoiceOver, macOS Safari | Landmarks list shows header, nav, main, footer; headings list shows one H1 and no skipped levels; menu triggers announce "collapsed/expanded"; lifecycle announces "tab, n of 7, selected"; form errors are read out; success message is announced |
| [ ] | 6. VoiceOver, iOS Safari | Drawer opens and closes with swipe navigation; focus does not escape the open drawer; form can be completed |
| [ ] | 7. NVDA, Windows (Firefox or Chrome) | Same checks as step 5 in browse and focus modes |
| [ ] | 8. Images and diagrams | Logos have the company name as alt text; decorative visuals are `aria-hidden`; each diagram (Lifecycle, PipelineGates, DefenceInDepth, ControlMap) has a text alternative with the same information |
| [ ] | 9. Contrast | Text ≥ 4.5:1, large text ≥ 3:1, control boundaries (inputs, outline buttons with `--line-control`) ≥ 3:1, focus indicator ≥ 3:1; checked with a contrast tool on light and dark sections |
| [ ] | 10. Target size | All targets ≥ 24 × 24 px (SC 2.5.8); on touch layouts ≥ 44 × 44 px (08 §9) |
| [ ] | 11. Headings and structure | One H1 per page; headings in order; tables have headers and captions; FAQ uses `<details>`/`<summary>` |
| [ ] | 12. Language and titles | `<html lang="en">`; every page has a unique, descriptive `<title>` |
| [ ] | 13. Consistent help (SC 3.2.6) | Contact link appears in the same relative place (header CTA, footer) on every page |
| [ ] | 14. Zoom and reflow | §4.7 rows for 320 px and 200% pass |
| [ ] | 15. Motion | §4.8 reduced-motion row passes |

### 4.11 Performance

Field targets are Core Web Vitals "good" thresholds at the 75th percentile. Lab targets use Lighthouse mobile emulation (default throttling), median of 3 runs.

| Done | Template (URL) | LCP | CLS | INP / TBT (lab) | Lighthouse Performance | Best Practices | SEO |
|---|---|---|---|---|---|---|---|
| [ ] | Home (`/`) | ≤ 2.5 s | ≤ 0.05 | TBT ≤ 200 ms | ≥ 90 | ≥ 95 | 100 |
| [ ] | Services hub (`/services`) | ≤ 2.5 s | ≤ 0.1 | TBT ≤ 200 ms | ≥ 90 | ≥ 95 | 100 |
| [ ] | Pillar (`/services/cloud-security`) | ≤ 2.5 s | ≤ 0.1 | TBT ≤ 200 ms | ≥ 90 | ≥ 95 | 100 |
| [ ] | Capability (`/services/devsecops`) | ≤ 2.5 s | ≤ 0.1 | TBT ≤ 200 ms | ≥ 90 | ≥ 95 | 100 |
| [ ] | Platform (`/cloud-platforms/azure`, or `/cloud-platforms` if no platform is live) | ≤ 2.5 s | ≤ 0.1 | TBT ≤ 200 ms | ≥ 90 | ≥ 95 | 100 |
| [ ] | Compliance hub (`/compliance`) | ≤ 2.5 s | ≤ 0.1 | TBT ≤ 200 ms | ≥ 90 | ≥ 95 | 100 |
| [ ] | Framework (`/compliance/hipaa`, or the first live framework) | ≤ 2.5 s | ≤ 0.1 | TBT ≤ 200 ms | ≥ 90 | ≥ 95 | 100 |
| [ ] | Contact (`/contact`) | ≤ 2.5 s | ≤ 0.1 | TBT ≤ 200 ms | ≥ 90 | ≥ 95 | 100 |
| [ ] | Insights listing (`/blog`) | ≤ 2.5 s | ≤ 0.1 | TBT ≤ 200 ms | ≥ 90 | ≥ 95 | 100 |
| [ ] | Article (`/blog/kubernetes-vs-ecs-2025`) | ≤ 2.5 s | ≤ 0.1 | TBT ≤ 200 ms | ≥ 90 | ≥ 95 | 100 |

Field INP target: ≤ 200 ms (checked after launch in §8; lab tools do not measure INP).

| Done | Budget check | Pass criterion |
|---|---|---|
| [ ] | First-load JavaScript per route | **Proposed target:** ≤ 150 KB gzip for content templates, excluding the 3D chunk. Confirm against the T1.05 baseline before M2; if Once UI alone exceeds it, the target becomes "baseline + 10%" and the exception is recorded |
| [ ] | Client components | `'use client'` only in MegaMenu, MobileDrawer, Lifecycle, Reveal, forms, ConsentBanner, the 3D canvas (09 §9): checked by grep |
| [ ] | Third-party scripts before consent | None (§4.14) |
| [ ] | Fonts | Geist and Geist Mono self-hosted via `next/font`; no request to `fonts.googleapis.com` or `fonts.gstatic.com` from any page or the OG route |
| [ ] | Images | No photography in R1 (D-09). Logos are SVG. Any raster image is served through `next/image` with width and height, is ≤ 200 KB, and none above the fold is lazy-loaded |
| [ ] | Legacy assets | No request on any R1 page for files under `public/images/projects/`, `services/`, `service/`, `gallery/`, `about/`, `uplash/`, `technologies/`, or `hero.png` |
| [ ] | Caching | `/_next/static/*` immutable; HTML served from the static cache (response header shows a cache hit on the second request, host permitting) |

### 4.12 SEO

| Done | Check | Pass criterion |
|---|---|---|
| [ ] | Titles | Unique on every indexable page; ≤ 60 characters before the template suffix; "AlgoCrew" appears once (from the `%s \| AlgoCrew` template), never twice |
| [ ] | Meta descriptions | Unique, present on every indexable page, ≤ 155 characters, follow 07 §8 (no "compliant", "certified", "guaranteed") |
| [ ] | One H1 | Exactly one `<h1>` per page (crawler count) |
| [ ] | Canonical | Every indexable page: absolute self-canonical on `https://algocrew.io`, no trailing slash, no query string; home sets its own; noindex posts self-canonical or none; 301/410 responses have none |
| [ ] | sitemap.xml | Equals the set of indexable R1 routes: 41 URLs when all gated pages launch (25 core + 16 posts), minus each gated page not live. Contains no 301, 410, noindex, anchor or query URL, and no `/hire`. `lastModified` reflects content dates, not one build time for all |
| [ ] | robots.txt | As in §4.2 |
| [ ] | noindex | The 6 hidden posts carry `noindex, follow`; no other R1 page does; previews carry `X-Robots-Tag: noindex`; production does not |
| [ ] | Structured data validation | Every R1 template passes the Schema.org validator with zero errors and the Rich Results Test with zero errors. Organization: no `foundingDate` unless V-08, `legalName` only if V-06, `sameAs` only V-11 profiles. No `PriceSpecification`, `Offer`, `Review`, `AggregateRating`, `ProfessionalService` or generic `JobPosting` anywhere |
| [ ] | BreadcrumbList | Present on every page except home; matches the visible breadcrumb exactly |
| [ ] | FAQPage | Only on pages whose visible FAQ matches the markup word for word |
| [ ] | Open Graph and Twitter | Every indexable page has `og:title`, `og:description`, `og:url` (its own canonical, not the home URL), `og:image` that returns 200; Twitter card `summary_large_image`; `@algocrew` only if V-11 |
| [ ] | OG image fetch | `og:image` URLs fetchable by a crawler (robots allows `/api/og/`) |
| [ ] | Internal links | Zero internal links to a 301, 410 or 404 URL (crawl); every retained post links to the page named for it in 05 §3 |
| [ ] | No orphan pages | Every indexable R1 page has at least one inbound internal link from a menu, hub, body or related box |
| [ ] | Hidden posts | Not linked from `/blog`, related posts or any R1 page except (optionally) `/careers` |
| [ ] | Keywords meta | No `<meta name="keywords">` |
| [ ] | `hreflang` | None (single-language site) |
| [ ] | Search Console | Property verified (T10.12) before launch day |

### 4.13 Content and compliance

**Where to search.** Search the **rendered output**, not `src/`: legacy data files stay in the repo unreferenced until cleanup and would give false positives. Crawl every R1 URL (including the 6 hidden posts) and save the HTML, then search it. This covers body copy, headings, nav descriptors, alt text, meta tags and JSON-LD. Also search the confirmation email template and the OG image titles.

```sh
# from a saved crawl in ./crawl/ (one .html per URL)
grep -rniE -f forbidden-compliance.txt crawl/
grep -rniE -f deprecated-terms.txt crawl/
grep -rniE -f unverified-claims.txt crawl/
```

**`forbidden-compliance.txt`** (07 §8; every match is a defect, including in hidden posts)

```
hipaa[- ]compliant
hipaa[- ]certified
hipaa ready
gdpr[- ]compliant
gdpr[- ]certified
pci-dss
pci dss certified
pci[- ]compliant
pipeda certified
pipeda requires .* (stay|stored|remain) in canada
compliance guaranteed
guaranteed compliance
100% compliant
audit[- ]proof
pass your audit
audit guaranteed
we certify
make you (hipaa|gdpr|pci|pipeda|compliant)
our qsa
our assessors
soc 2 aligned
soc 2-aligned
iso 27001 aligned
iso 27001 compliance
certified (engineers|team)
military[- ]grade
bank[- ]grade
bulletproof
unhackable
fully secure
zero risk
bill c-27
\bcppa\b
compliant (aws|azure|gcp|google cloud)
```

**`deprecated-terms.txt`** (06 §6, 07 §2; matches are defects on every R1 page; hidden posts are exempt from this list only)

```
web development
web app
mobile app
react native
flutter
kotlin
\bswift\b
gaming
game (design|art|development)
\bunity\b
unreal
metaverse
blockchain
web3
ar/vr
e-?commerce
shopify
woocommerce
wordpress
digital marketing
\bppc\b
influencer
\bmvp\b
saas development
staff augmentation
hire a developer
dedicated team
strategic staffing
dynamics 365
\bd365\b
power apps
ai-first
digital experiences
digital products
cinematic
launch your product
ui/ux
ux/ui
ux / ui
top 1%
\belite\b
rockstar
ninja
\bcrew\b
transform
revolutioni[sz]e
supercharge
\bunlock
cutting-edge
trusted by
partnered with
chosen by
clients include
get started
see case studies
start a project
build something exceptional
join the crew
book a strategy call
case stud
```

Exceptions: `\bcrew\b` does not match "AlgoCrew". "transform" may match legitimate technical text (for example "data transformation" in a retained post): each hit is reviewed and logged as accepted or fixed. Retained posts may mention a deprecated technology in a technical comparison only if the editorial pass (07 §9.2) accepted it; log each accepted hit.

**`unverified-claims.txt`** (07 §10, 11 §7; a match passes only if the V-item in brackets is confirmed and the value matches the confirmed source)

```
\$50m
18\+ countries
8\+ countries
12\+ (industry|verticals)
50\+ projects
30\+ (happy )?clients
98%
120\+
0 critical
zero p0
48 ?h
48-hour
24 ?h(our)? response
24 ?/ ?7
round-the-clock
follow-the-sun
30-day rolling
zero lock-in
100% ip
nda on day 1
risk-free
happy client
nexacapital
nexus health
vcloud
logitech
sarah chen
marcus williams
priya sharma
daniel osei
meridian health
launchpad
novatech
stackr
algocrew ltd
algocrew inc
plausible
lorant
once ui
arqam malik
arqam tahir
\$4,900
\$8,000
\$14,000
\$12,000
\$25,000
\$1,500
80,?000
180,?000
equity
foundingdate
```

`algocrew inc` / `algocrew ltd`: exactly one of them may appear, and only if it is the V-06 name. `foundingdate` passes only if V-08 is confirmed.

| Done | Check | Pass criterion |
|---|---|---|
| [ ] | Forbidden compliance phrasing | Zero matches |
| [ ] | Deprecated terms | Zero unexplained matches; accepted exceptions logged |
| [ ] | Unverified claims | Zero matches, or each match backed by a confirmed V-item |
| [ ] | Boundary statement | Present on `/compliance#boundaries`, every framework page, platform pages, the Compliance menu featured slot and the home compliance section (08 §6) |
| [ ] | Client logos | Only on Home, `/about#clients`, `/contact`; never on service, platform or framework pages, OG images, schema or meta (07 §7); heading "Teams we've worked with"; ≥ 3 logos or none |
| [ ] | Vendor marks | Azure, AWS, Google Cloud as text; partner badges only as V-01 permits |
| [ ] | Spelling | US spelling in all new copy (existing slugs such as `aws-cost-optimisation-engineering-guide` unchanged); "PCI DSS" without hyphen; "DevSecOps" casing |
| [ ] | Facts | PCI DSS stated as v4.0.1; PIPEDA not described as requiring Canadian residency; HIPAA services described as "eligible" or "in scope" |

**Verification register audit.** One row per V-item. Each passes when either the confirmed value is used, or the "if not confirmed" path of 07 §11 is visibly applied.

| Done | V-item | Pass criterion if confirmed | Pass criterion if not confirmed |
|---|---|---|---|
| [ ] | V-01 Partner statuses | Badge exactly as the program permits | No badge, no "partner" wording; Cloud Platforms featured slot shows Hybrid & Multi-Cloud |
| [ ] | V-02 Logo permissions | Written permission on file for every logo shown | Logo rows and "Our Clients" menu item absent |
| [ ] | V-03 Delivery per cloud and framework | Page live | Page 404, absent everywhere; hero subhead and cards trimmed; redirects use fallbacks |
| [ ] | V-04 Fixed-scope offers | (R2 only) | No offers, no prices; "How engagements start" on Our Approach |
| [ ] | V-05 Certifications | Listed by type and count with verification links | Section absent; no "certified engineers" |
| [ ] | V-06 Legal entity | Same name in footer, privacy, terms, schema `legalName` | **Launch blocked** (legal pages cannot publish) |
| [ ] | V-07 Governing law | Same answer in Terms and Our Approach FAQ | **Launch blocked** (Terms); FAQ item absent |
| [ ] | V-08 Founding year | On About and schema | Absent from both |
| [ ] | V-09 Names and titles | Consistent on About, bylines, schema | Roles only; bylines "AlgoCrew engineering" |
| [ ] | V-10 Contact details, booking link, response time | Used in footer, Contact, schema | Email and form only; no response-time promise; no booking link |
| [ ] | V-11 Social profiles | Linked in footer and `sameAs` | Unlinked |
| [ ] | V-12 Managed services model | Coverage stated exactly | Business-hours wording; zero "24/7" |
| [ ] | V-13 Named contacts | Name, photo, LinkedIn with consent record | Role title only |
| [ ] | V-14 Own security practices | Each `/trust` statement maps to a confirmed item | `/trust` absent; only verified items elsewhere |
| [ ] | V-15 Processors and consent | Privacy policy lists exactly the processors loaded | **Launch blocked** unless trackers are removed (10 §7.3) |
| [ ] | V-16 Third-party tools | Named where used | Native tools only |
| [ ] | V-17 Own compliance status | Stated literally on `/trust` | "We do not currently hold…" or omitted; never "aligned" |
| [ ] | V-18 Relationship type | Wording matches | "Teams we've worked with" only |
| [ ] | V-19 Regions served | `areaServed` present | `areaServed` absent |
| [ ] | V-20 Open roles | JobPosting per real role | General hiring note; no JobPosting |
| [ ] | V-21 Statistics | Shown with source and date | None shown |
| [ ] | V-22 BAAs and DPAs | Stated on HIPAA and GDPR pages and FAQ | Pages say "ask us about contractual terms" |
| [ ] | V-23 Approvals | Approval record exists (T0.06) | **Launch blocked** |

**Legal review log.** Each framework page, the privacy policy and the terms need a record: page, reviewer name and role, date, reviewed preview URL or commit, outcome, and confirmation that the live text equals the reviewed text (diff of the rendered text). A framework page with `legalReviewed: true` and no matching record is an S1 defect.

### 4.14 Privacy and consent

Run in a fresh browser profile with no stored data, with the DevTools network log recording from first request.

| Done | Check | Pass criterion |
|---|---|---|
| [ ] | First load, no choice made | Banner visible; zero requests to `googletagmanager.com`, `google-analytics.com`, `*.tawk.to` (embed or chat); no `_ga*` cookies |
| [ ] | Interaction before choosing | Scrolling, clicking and pressing keys do not load Tawk.to (the current first-interaction trigger in `layout.tsx` is replaced by consent, T3.08) |
| [ ] | Decline non-essential | Banner closes; still zero tracker requests and cookies across 3 page navigations and a reload |
| [ ] | Accept | GA4 and Tawk.to (if kept, I-04) load; analytics cookies set |
| [ ] | Change choice | "Cookie settings" in the footer reopens the banner; withdrawing consent stops further loading on the next page view and removes analytics cookies where technically possible |
| [ ] | Choice persists | Reload and new tab keep the choice; the stored record has a date |
| [ ] | Default | Non-essential is declined by default; "Accept" and "Decline" are equally prominent |
| [ ] | Privacy policy | Lists exactly the processors the site loads or sends data to (expected per 05#12: GA4, Tawk.to, EmailJS or the I-01 provider, Cal.com, the host) and no others (no Plausible unless used); cookie section names each cookie; entity per V-06 |
| [ ] | Booking link | Cal.com is a link only; no Cal.com request until clicked |
| [ ] | Fonts | No Google Fonts requests (§4.11) |
| [ ] | Forms | Personal data goes only to the I-01 endpoint; nothing in URLs or analytics events |

### 4.15 Console errors and broken links

| Done | Check | Pass criterion |
|---|---|---|
| [ ] | Console | Zero `console.error` and zero uncaught exceptions on every R1 URL in Chrome, Safari and Firefox; hydration warnings count as errors |
| [ ] | Full crawl from `/` | Zero internal 4xx or 5xx; zero internal links to redirects; zero redirect chains |
| [ ] | External links | All return 2xx or 3xx (LinkedIn may block crawlers: check manually) |
| [ ] | Assets | Zero 404s for images, fonts, scripts, styles, manifest or icons |
| [ ] | CSP (report-only, T10.13) | Zero violation reports across the §4.11 templates, before and after consent |

---

## 5. Defect severity and launch-blocking criteria

| Severity | Definition | Examples | Launch |
|---|---|---|---|
| **S1 Blocker** | Legal, security or data exposure; site or key flow unusable; wrong or unverified claim | Forbidden compliance phrase or unverified claim live; trackers load before consent; form submissions lost; a 5xx on any R1 page; redirect loop; gated page live without its V-item or legal review; personal data in URLs; private key in client code | Blocks launch |
| **S2 Critical** | Key flow degraded or WCAG 2.2 AA failure on a key flow; SEO migration error | Mega menu or drawer not keyboard-operable; form errors not announced; a row in §4.2 wrong; sitemap includes a gone or noindex URL; internal link to a 404/410; LCP over 4 s on a named template; Safari or iOS layout broken on a template | Blocks launch |
| **S3 Major** | Visible defect with a workaround; AA failure off key flows | One table not scrolling on phones; contrast failure on a caption; Lighthouse Performance 80–89 on one template; console warning | Launch allowed with a fix date within 10 working days, signed by the client project owner |
| **S4 Minor** | Cosmetic | Spacing off by a few pixels; animation timing | Backlog |

**Launch-blocking criteria (all must be true to launch):**
1. Zero open S1 and S2 defects.
2. Every row in §4.1, §4.2, §4.12 and §4.14 passes on the release candidate.
3. §4.13 greps return zero unexplained matches; every V-item row passes; every framework page that is live has a legal review record.
4. V-06, V-07, V-15 and V-23 are confirmed (or trackers are removed for V-15).
5. Search Console access works and the T1.06 backlink review of the 410 list is approved.
6. Rollback deployment ID recorded and rollback rehearsed once on a preview (§9).
7. All sign-offs in §2.4 recorded.

---

## 6. Pre-launch checklist (T-10 to T-1 working days)

| Done | Item | Pass criterion |
|---|---|---|
| [ ] | Content freeze declared | No content changes after this point without go/no-go owner approval |
| [ ] | Release candidate deployed (T11.01) | Deployment ID recorded |
| [ ] | Full QA pass of §3 and §4 on the RC | All launch-blocking criteria (§5) met |
| [ ] | Gated pages | Final flag states recorded; each "off" page's fallback verified |
| [ ] | Redirect and gone lists | Final, matching 05 and the approved T1.06 review; switches for 05#18 and 05#20 recorded |
| [ ] | Search Console data refreshed | Last 3 months of pages and queries exported again, as the comparison baseline |
| [ ] | Search Console verification | Property verified for `https://algocrew.io` |
| [ ] | Host settings | I-02 decision applied (www → apex in one place only); domain and TLS checked; DNS TTL lowered 48 h ahead if a DNS change is planned |
| [ ] | Environment variables | Form provider credentials, analytics IDs and any keys set in production, not in source |
| [ ] | Email | Production inbox for form delivery confirmed; a test submission from the RC arrives |
| [ ] | Analytics | GA4 property access confirmed (if kept); launch annotation prepared |
| [ ] | Baseline tag | Last pre-launch production commit tagged `site-v1-final`; current production deployment ID recorded as the rollback target |
| [ ] | Rollback rehearsal | Promote-and-revert rehearsed on a preview or staging alias; time taken recorded |
| [ ] | Monitoring | Access to request logs (404, 410, 5xx) confirmed; daily report owner named |
| [ ] | Launch window | A weekday morning in the team's time zone, not a Friday or before a holiday; lead engineer and client project owner available for the following 4 hours |
| [ ] | Go/no-go meeting (T-1) | Decision recorded with the §5 criteria |

---

## 7. Launch-day runbook

Steps are in order. Each has an owner (lead engineer unless stated) and is ticked in the launch record with a timestamp.

1. **Freeze.** No merges to `main` or the release branch except the launch merge.
2. **Confirm rollback target.** Re-read the recorded production deployment ID and tag `site-v1-final`.
3. **Merge the release branch to `main`** (or promote the approved RC deployment, if the host builds from the same commit). This single deploy contains the new pages, layout and internal links **and** the 301s (`next.config.mjs`), the 410 middleware list, the noindex flags, the new `sitemap.ts` and `robots.ts`. **Redirects and the new sitemap go live at this step**, never earlier and never in a separate deploy (05 §3 steps 2–3, 05 §5).
4. **Wait for the production deployment to be ready**, then confirm the deployment ID and that `/` returns 200 with the new H1.
5. **Run the status-code script against production** (§4.2, every row and the endpoint table). Any failure: fix forward within 30 minutes or roll back (§9).
6. **Run the crawl against production** (§4.15). Zero internal 4xx/5xx and zero redirect chains.
7. **Check `/sitemap.xml` and `/robots.txt` on production** (§4.12). URL count recorded.
8. **Consent check** in a clean browser profile (§4.14 first three rows).
9. **Form check:** one submission per topic from production; confirm arrival in the inbox.
10. **Smoke the browser matrix:** home, one pillar, one framework, contact form, menus, on Chrome, Safari, iOS Safari, Android Chrome.
11. **Search Console** (client SEO owner or lead engineer): submit `https://algocrew.io/sitemap.xml`; run URL Inspection and "Request indexing" for `/` and the 5 pillar pages (`/services/cloud-consulting`, `/services/devops`, `/services/cloud-security`, `/compliance`, `/services/managed-cloud-services`); run URL Inspection on the 12 redirected URLs (05#5, #6, #8, #9, #11, #14–#18, #38, #39) to confirm Google sees the redirect.
12. **Annotate** the launch date and time in GA4 (if kept) and in the monitoring log.
13. **Watch logs for 4 hours:** 5xx, unexpected 404s (URLs not in the gone list), 410 hits, form errors. Apply the rollback criteria (§9) throughout.
14. **Close the launch record** with all timestamps and hand over to the 30-day monitoring owner.

---

## 8. Post-launch monitoring (first 30 days)

Daily for the first 7 days, then twice a week until day 30. A short written report each time, to the client project owner.

| Signal | Source | What to look for | Action |
|---|---|---|---|
| 404 log | Host request logs | Any URL not in the gone list with repeated hits (for example 5 or more in a day), especially from external referrers | Add a 301 to a genuinely related page, or add to the gone list; never point it at an unrelated page |
| 410 log | Host request logs | 410 URLs receiving real traffic or links from referrers that matter | Review against T1.06; switch to 301 only if a related page exists |
| 5xx | Host logs | Any | S1 investigation |
| Search Console Pages report | Search Console | "Not found (404)" growth beyond the gone list; "Soft 404" (target: 0); "Page with redirect" for the 12 301s; "Excluded by noindex" equals the 6 hidden posts; new pillar pages moving to "Indexed" | Investigate each unexpected entry |
| Sitemap status | Search Console | Sitemap read successfully; discovered count equals the sitemap URL count | Fix and resubmit |
| Rankings and clicks for retained URLs | Search Console Performance, compared with the pre-launch export | Clicks and impressions for the 16 retained posts and the 8 retained core URLs (05#1–#4, #7, #10, #12, #13); queries for the 301 sources now attributed to their targets | A drop over 30% week on week on a retained URL is investigated (internal links, canonical, content changes) |
| Core Web Vitals field data | Search Console CWV report; CrUX when it has enough data (often 28 days) | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75 | Fix regressions as S3, or S2 if a named template fails badly |
| Form submissions | Inbox and form backend logs | Count per week against the pre-launch average; delivery failures; spam volume | Weekly test submission; adjust spam rules |
| Consent | Consent records (if stored) and GA4 | Tracker loads only after consent | S1 if not |
| Console and client errors | Error reporting, if any is installed, or a weekly Playwright run | New errors | Fix by severity |

Day 14: if there are no open S1/S2 defects, the cleanup release (T11.14, register 11 §14) may be scheduled. Day 30: final monitoring report and M8 sign-off.

---

## 9. Rollback criteria and procedure

**Roll back the whole site** (to the recorded pre-launch deployment) if any of these occurs and cannot be fixed forward within **2 hours**:
- 5xx on more than 1% of requests, or any R1 template not rendering.
- A redirect loop, or more than 5 rows of §4.2 failing on production.
- The contact form not delivering and no working alternative (the published email address) in place.

**Fix forward without rollback** (faster and safer):
- One page wrong or a claim found: set its data flag off (page returns 404 and leaves every menu and the sitemap), redeploy.
- One redirect wrong: correct that entry and redeploy.
- Trackers loading before consent: remove the GA4 and Tawk.to loaders and redeploy; restore after the fix.
- A visual or accessibility defect: fix by severity.

**Procedure for a full rollback:**
1. Decision by the lead engineer and the client project owner; record the time and reason.
2. Promote the recorded pre-launch deployment (Vercel instant rollback, assumed; otherwise redeploy the `site-v1-final` tag). This restores the old pages and old URLs together, so no URL is left pointing at a missing page.
3. Verify: `/` shows the old site; `/services/cloud-devops` returns 200 again; `/sitemap.xml` is the old sitemap.
4. Search Console: if the rollback lasts under 48 hours, no action. If longer, resubmit the old sitemap and expect re-crawling of the 410 URLs.
5. Keep the release branch unchanged; fix on a branch from it; re-run the full §5 criteria before the next attempt.
6. Write a short incident note: cause, impact window, fix.

---

## 10. What cannot be tested until the client supplies something

| Needed | Blocks testing of |
|---|---|
| Logo files and written permission (V-02, V-18) | Logo rows on Home, About, Contact; "Our Clients" menu item; logo contrast and alt text |
| Partner statuses and badge assets (V-01) | Platform-page badges; Cloud Platforms featured slot |
| Delivery confirmation per cloud and framework (V-03) | Which platform and framework pages are live; hero subhead; sitemap count |
| Verified company facts (V-06 to V-11) | Footer, legal pages, About facts, schema `legalName`, `foundingDate`, `sameAs`, bylines, contact details |
| Processor list and consent decision (V-15, I-04) | Privacy policy accuracy; consent banner configuration; tracker checks |
| Managed-services model (V-12), named contacts (V-13), own practices (V-14, V-17), certifications (V-05), roles (V-20), BAA/DPA position (V-22) | The pages and sections that depend on each |
| Counsel's review of framework pages, privacy policy, terms | Legal review log; launch of each framework page |
| Hosting details and access (assumed Vercel) | Preview behavior, request logs, rollback rehearsal, host-level redirect (I-02), caching checks |
| Search Console access | T1.06 backlink review (and so the final 410 list), launch-day sitemap submission, URL Inspection, all §8 Search Console monitoring |
| Production inbox and form provider credentials (V-10, I-01) | Form delivery, confirmation email, SPF/DKIM checks |
| GA4 and Tawk.to property access | Post-consent loading checks; launch annotation |
| Real devices (one iPhone, one Android phone, optionally an iPad) | Phone and tablet classes in §2.3 |
