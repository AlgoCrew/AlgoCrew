Stage 5 deliverable. Status: awaiting review.

# 10 — Implementation Roadmap

How the approved plan in 04–09 gets built, in what order, by whom, and how long it is likely to take. Companion documents: [11 deprecation register](11-deprecation-register.md) (what is unlinked, redirected or removed) and [12 QA and launch plan](12-qa-and-launch-plan.md) (how it is tested and released).

**Implementation has not started.** No file in `src/` has been changed for this plan. Nothing below may start before milestone M0 (approvals).

ID conventions used here: A-xx approval decisions (04 §10), V-xx verification items (07 §11), D-xx design decisions (08 §13), 05 row numbers as `05#n`. New in this document: task IDs `Tn.nn` (n = client stage number, 0 = discovery and gates), milestones `M0…M8`, implementation decisions `I-01…I-06` (§2) and risks `RK-01…` (§9).

---

## 1. Assumptions behind every estimate

**These are planning estimates, not measurements.** No part of the new site has been built, so no velocity data exists. Ranges are working days (one person, one full day). Revisit them after milestone M2, when the design system and header have been built and real velocity is known.

| # | Assumption | If it is wrong |
|---|---|---|
| AS-01 | **Team: two front-end engineers** with Next.js App Router, TypeScript and accessibility experience. One acts as lead. Team size has not been confirmed. | One engineer: the calendar is roughly the effort total (§6.3). Three engineers: little gain, because the critical path (§7) is sequential. |
| AS-02 | **Designer: part-time (about 1 day a week)** for component review, the unprototyped templates (08 §12), form states and OG images. | Without a designer, engineers make these calls, and visual QA takes longer (add 3–5 days). |
| AS-03 | **Copywriting is not engineering work.** A copywriter (client side or contracted; not yet named) turns the working copy in 07 into final copy, page batch by page batch, with a subject-matter review by the client's engineers. Estimated 20–35 writer-days for the 25 R1 core pages. It runs in parallel and must land before each content-entry task. | If engineers write copy, add the writer-days to the engineering total and to the critical path. |
| AS-04 | **Legal review is external.** The client's counsel or a compliance specialist reviews each framework page (07 §6.6), the privacy policy and the terms. Assumed turnaround is 5–10 working days per batch, with up to two rounds. | Longer turnaround delays the gated pages it covers, not the whole launch (§7.3). |
| AS-05 | **Hosting is Vercel.** This is inferred, not confirmed (01 §1: the middleware, `.gitignore` and privacy policy point to it). Preview deployments, instant rollback and domain-level redirects are assumed to be available. | Release mechanics (§8) change, not the build. Add 2–4 days if CI and preview hosting must be set up from scratch. |
| AS-06 | Source control is GitHub (the commit history shows pull requests from the `AlgoCrew` organization). There is no CI today (01 §1). | — |
| AS-07 | Client answers to the verification register (07 §11) arrive while the build runs, not before it starts. Every gated page has a "not confirmed" path, so engineering does not wait on them except where §7.3 says so. | — |
| AS-08 | The decisions recommended in 04–09 are approved as written: A-01…A-14 and D-01…D-09, light only (D-01 option A), all 7 gated R1 pages launch. §6.2 shows how the totals move when these change. | — |
| AS-09 | Engineers work about 80% of their time on tasks. The remainder covers reviews, meetings and support of the current site. This is already included in the calendar figures. | — |
| AS-10 | Effort covers build, unit-level checks and fixing defects found in QA. It excludes copy, legal review, client UAT time and the 30-day post-launch monitoring (listed separately). | — |

---

## 2. Implementation decisions not covered by 04–09

These need an owner's answer before the task that depends on them. Recommendations are given, but they are not yet decisions.

| ID | Decision | Recommendation | Needed by |
|---|---|---|---|
| I-01 | Contact form delivery. Today EmailJS is called from the browser with no server-side validation, rate limit or captcha (01 §12). | A Next.js route handler that validates input, applies a honeypot and rate limit (plus a captcha if spam appears), and sends mail through EmailJS's REST API or another email provider. The provider is the client's choice. | T8.06 |
| I-02 | Where the www → apex redirect lives (05 §3, redirect-chain note) | Make the host redirect the first entry in `redirects()` with `has: [{ type: "host" }]`, or set it at the hosting domain level. Choose one; never both. | T10.06 |
| I-03 | 301 or 308 for permanent redirects (05 §3) | `statusCode: 301`, so the status matches 05 literally and QA can assert one value | T10.06 |
| I-04 | Keep GA4 and Tawk.to at all (after consent) | The client decides with V-15. If kept, they load only after consent (T3.08). | T3.08 |
| I-05 | The 6 hidden culture posts: noindex (05 default) or 410 (05 §1.5 alternative) | noindex, as in 05 | T10.09 |
| I-06 | Preview deployments and the existing `*.vercel.app` → apex redirect in `src/middleware.ts:15-16` | Limit that redirect to the production deployment (for example, check the production host or the environment), otherwise every preview URL redirects to the live site and cannot be reviewed | T1.01 |

---

## 3. Build order

The client's stage list is kept, with its numbering, for task IDs. Execution order follows 09 §10: "build new templates on new routes first (`/cloud-platforms`, `/compliance`), then switch shared layout, then migrate existing routes."

| Order | Stage | Why here |
|---|---|---|
| 1 | 1 Architecture and cleanup | Fixes the WIP build break, adds the data model, CI and the two automated checks every later stage relies on. Non-destructive: nothing is unlinked yet. |
| 2 | 2 Design system | Tokens and primitives are inputs to every template. D-01 must be decided first. |
| 3 | 3 Global components (built, not yet switched into the root layout) | Header, menus, footer, breadcrumbs, CTA and consent are needed by every new page. |
| 4 | 7 Security and compliance pages | Entirely new routes (`/compliance`, `/compliance/[slug]`), so old and new styles do not collide. Legal review has the longest external lead time, so its pages are built first. |
| 5 | 6 Cloud platform pages | New routes (`/cloud-platforms`, `/cloud-platforms/[slug]`). |
| 6 | 5 Core service pages | Modifies the existing `/services` and `/services/[slug]` routes. Needs the platform and framework pages for its cross-links (06 §4). |
| 7 | T3.11 Layout switch | New header and footer replace the old ones once the pages they link to exist on the branch. |
| 8 | 8 Company and contact pages | `/our-approach` and `/trust` are new; `/about`, `/contact`, `/careers`, `/blog` and legal pages are modified. |
| 9 | 4 Homepage | Links to every hub and pillar, so it comes last among the templates. |
| 10 | 9 Motion and 3D | Enhancements on finished templates. The responsive pass runs here across all templates. |
| 11 | 10 SEO and technical optimization | Metadata, schema, sitemap, then the redirect, 410 and noindex set, which ship together in one release (05 §5). |
| 12 | 11 Quality assurance | Per 12. Then launch, monitoring and the cleanup release. |

---

## 4. Task table

Priority: **P0** blocks launch. **P1** expected at launch, and can slip one release only with sign-off. **P2** can follow after launch. Duration is effort in working days for the build role unless the cell says "elapsed". Every task is "Not started" except the completed phases.

### Stage 0 — Discovery, strategy, design (complete) and gates

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T0.01 | Existing website audit and current sitemap | P0 | — | Complete (not recorded) | 01, 03 | Delivered | Done |
| T0.02 | Competitor and reference-site research | P0 | — | Complete | 02, 02a, 02b | Delivered | Done |
| T0.03 | Business and service strategy, content strategy | P0 | T0.01, T0.02 | Complete | 06, 07 | Delivered | Done |
| T0.04 | Sitemap, navigation and route migration | P0 | T0.03 | Complete | 04, 05 | Delivered | Done |
| T0.05 | UI/UX direction, prototypes, component architecture | P0 | T0.04 | Complete | 08, 09, `prototypes/` | Delivered | Done |
| T0.06 | Client approval of A-01…A-14 (V-23), D-01…D-09 and 05 as a whole, including the conditional switches 05#18 and 05#20 | P0 | T0.01–T0.05 | 5–10 elapsed (client) | Signed approval record | Each item marked approved or changed; changes written back into 04–09 before Stage 2 | Not started |
| T0.07 | Approval of 10, 11 and 12, and of I-01…I-06 | P0 | T0.06 | 2–5 elapsed | Approval record | Decisions recorded; estimates re-baselined if A-/D- items changed | Not started |
| T0.08 | Collect verification answers V-01…V-22 (client) | P0 for V-03, V-06, V-07, V-10, V-15; P1 for the rest | T0.06 | 10–20 elapsed, rolling | Fact sheet: value, source, owner, date per V-item | Every V-item marked Confirmed or Not confirmed; nothing left blank at T11.12 | Not started |
| T0.09 | Access: hosting project, domain/DNS, Search Console, GA4, Tawk.to, EmailJS, Cal.com, GitHub admin | P0 | — | 1–5 elapsed | Access list with named holders | Lead engineer can deploy previews, read request logs and view Search Console | Not started |
| T0.10 | Copywriter appointed; copy schedule by batch in the build order of §3 | P0 | T0.06 | 1–2 | Copy calendar | Each batch has a date before its content-entry task | Not started |
| T0.11 | Legal reviewer appointed for the framework pages, privacy policy and terms | P0 | T0.06 | 1–5 elapsed | Named reviewer, turnaround agreed | Reviewer confirmed in writing | Not started |

### Stage 1 — Architecture and cleanup (non-destructive)

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T1.01 | Create the release branch (suggested name `site-v2`) with preview deployments; restrict the `*.vercel.app` redirect in `src/middleware.ts` to production | P0 | T0.07, T0.09, I-06 | 0.5–1 | Branch, preview URL per PR | A preview URL renders the branch and does not redirect to `algocrew.io`; previews send `X-Robots-Tag: noindex` | Not started |
| T1.02 | Fix the WIP build break: commit `src/components/home/three/*`, add `three` and `@react-three/fiber` to `package.json` and the lockfile. `HeroCrystal.tsx` imports `@react-three/drei` (not to be added, D-06), so disable the `HeroCanvas` import in `Hero.tsx` on the branch until T9.01 | P0 | D-04, D-06 | 0.5–1 | Lockfile with two new packages | `npm ci && npm run build` succeeds from a clean clone | Not started |
| T1.03 | Tooling: remove the `export` script; move ESLint 9 to flat config and run `eslint` directly (`next lint` is deprecated in 15.5); align `@types/react` / `@types/react-dom` with React 19; decide Biome vs ESLint (keep ESLint; `biome.json` to cleanup) | P1 | T1.02 | 1–2 | Updated `package.json`, `eslint.config.mjs` | `npm run lint` and `tsc --noEmit` pass on the branch | Not started |
| T1.04 | Repo hygiene: untrack `tsconfig.tsbuildinfo`, `.claire/worktrees/…`, the `.claude/worktrees/zealous-hugle-418b59` gitlink and `.DS_Store` files | P2 | — | 0.5 | Clean `git ls-files` | None of these paths are tracked | Not started |
| T1.05 | Baseline build of current `main`: record the route list, first-load JS per route, and the HTML that Once UI `Meta.generate` and `<Schema>` emit (unverified in 01 §16) | P0 | T1.02 | 1 | Baseline note in the PR | Confirms or refutes the duplicate-title issue; JS baseline per route recorded for 12 §4.11 | Not started |
| T1.06 | Baseline SEO data pull (05 §3 step 1, moved early): 12 months of Search Console pages, queries and linking sites; GA4 landing pages. Flag every 410 URL in 05 with meaningful backlinks or traffic | P0 | T0.09 (Search Console access) | 1–2 | Spreadsheet of 74 URLs with clicks, impressions, referring domains | Each 410 row in 05 marked "keep 410" or "propose 301 to X", and the client approves the list | Not started |
| T1.07 | Typed data model: `src/resources/services.ts`, `platforms.ts`, `frameworks.ts`, `navigation.ts`, `site.ts` with the types in 09 §5 and the gating fields `status`, `verified`, `legalReviewed` | P0 | T0.06 | 2–3 | Five typed files, structure only | `tsc` passes; a page cannot be added without the gating fields | Not started |
| T1.08 | Single gating helper used by `generateStaticParams`, menus, hubs, footer, cross-links and `sitemap.ts` (09 §5 "gating is data, not code") | P0 | T1.07 | 0.5–1 | `isLive()` style helpers | Unit test: an item with a false flag is absent from all six consumers | Not started |
| T1.09 | **Automated check: internal links and anchors** (09 §10). Script builds the site, collects every internal `href` (including `#anchor`), fails on a missing route or anchor. Shared anchor constants come from `navigation.ts` | P0 | T1.07 | 2–3 | `npm run check:links` | Fails on a deliberately broken link and a missing anchor in a test fixture; passes on the branch | Not started |
| T1.10 | **Automated check: sitemap equals routes** (09 §10). Test compares `sitemap.ts` output with the set of generated indexable routes (gated, hidden, noindex excluded) | P0 | T1.07, T1.08 | 1–1.5 | `npm run check:sitemap` | Fails when a gated page leaks into the sitemap or a live page is missing | Not started |
| T1.11 | CI workflow on pull requests to the release branch: lint, typecheck, build, T1.09, T1.10 | P0 | T1.03, T1.09, T1.10 | 1 | GitHub Actions workflow | A PR cannot merge with a failing check | Not started |
| T1.12 | `src/styles/breakpoints.scss` with the three breakpoints of 08 §5 (640, 1024, 1280) and the 1440 cap (moved from `src/components/breakpoints.scss`; old file kept until cleanup) | P1 | — | 0.5 | Mixins file | Mixins compile; used by all new modules | Not started |

### Stage 2 — Design system

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T2.01 | `src/resources/tokens.css`: light surface, dark-section, status, type, space, radius, shadow and motion tokens (08 §3–5, §8), including `--line-control` | P0 | D-01, D-02, D-03 | 1–2 | Token file loaded after Once UI CSS in `layout.tsx` | Values match 08 tables; contrast pairs re-checked with a WCAG 2 calculator | Not started |
| T2.02 | Neutralize global CSS conflicts (09 §10): remove the global `*` transition, `body::after` noise, `<main>` page-in animation and the `scroll-behavior` conflict; switch `<html data-theme>` and the theme-init script to light (D-01) | P0 | T2.01, D-01 | 1–2 | Edited `global.scss`, `custom.css`, `layout.tsx` | Old pages on the branch still render without visual breakage (screenshot comparison of 5 pages) | Not started |
| T2.03 | Type scale (08 §4) as mixins/classes, `text-wrap: balance` on headings | P0 | T2.01 | 1 | Type module | Sizes match 08 at 375, 1024, 1440 px | Not started |
| T2.04 | Primitives batch A: `Button`, `TextLink`, `Section`, `Container`, `SectionHead`, `Eyebrow` (09 §3) | P0 | T2.01–T2.03 | 2–3 | `components/ui/*` | Keyboard focus ring per 08 §9; outline button border uses `--line-control` (≥3:1) | Not started |
| T2.05 | Primitives batch B: `Card`, `Chips`, `IconTile` (adds `lucide-react`, D-08), `Checklist`, `DefinitionCard`, `BoundaryStatement` | P0 | T2.04 | 2–3 | `components/ui/*` | Match prototypes; no raw hex in modules | Not started |
| T2.06 | Primitives batch C: `DataTable`, `Faq` (native `<details>`, FAQPage JSON-LD opt-in), `Steps` (merges `home/ProcessStep` and `services/Steps` markup), `LedgerRow`, `LogoRow` (renders nothing below three logos), `CtaBlock` | P0 | T2.04 | 3–4 | `components/ui/*` | `LogoRow` with 2 logos renders no DOM; `Faq` works with JS disabled | Not started |
| T2.07 | `Reveal` client primitive: one IntersectionObserver, no GSAP, nothing hidden that is already on screen at load, off under reduced motion | P1 | T2.04 | 1 | `components/ui/Reveal` | With `prefers-reduced-motion: reduce`, no transform or opacity animation runs | Not started |
| T2.08 | Form primitives (not prototyped): text input, email, select, textarea, checkbox, help text, inline error, error summary (08 §6, §9) | P0 | T2.04, designer review | 2–3 | `components/ui/form/*` | Labels visible; errors linked with `aria-describedby`; error summary receives focus on submit | Not started |
| T2.09 | Internal component review route, built on previews only (excluded from production builds and the sitemap) | P1 | T2.04–T2.08 | 1 | Review page | Not reachable in a production build; designer sign-off recorded | Not started |
| T2.10 | Lint rules: stylelint `color-no-hex` for modules, and a rule or review check against inline `style` (09 §9) | P1 | T2.01 | 0.5–1 | Config in CI | A hex value in a new module fails CI | Not started |
| T2.11 | **Only if D-01 = option B:** dark theme token set, toggle kept in the footer, every primitive checked in both themes | P0 if B | D-01 | 4–7 | Dark tokens | Every primitive passes contrast in both themes | Not started |

### Stage 3 — Global components

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T3.01 | Fill `navigation.ts` from 04 §8 (Services, Cloud Platforms, Compliance, Insights, Company, CTA) and 04 §9 (footer), using the shared anchor constants | P0 | T1.07, A-01 | 1 | Menu data | Every link resolves under T1.09; a URL appears in at most two header panels | Not started |
| T3.02 | `layout/Header` (server): bar plus all panel HTML from `navigation.ts`; top-level items are links without JS (08 §7.1) | P0 | T3.01, T2.04 | 2–3 | Header component | Panel HTML present in the server response with JS disabled | Not started |
| T3.03 | `layout/MegaMenu` (client), port of `prototypes/ui.js`: `aria-expanded`, click/Enter/Space, 150 ms hover intent, Esc returns focus, scrim, focus-out, 250 ms pointer-leave, one panel at a time, 3 + 2 columns at 1024–1279 px | P0 | T3.02 | 3–4 | Mega menu | Passes the navigation checklist in 12 §4.3 | Not started |
| T3.04 | `layout/MobileDrawer` (client): accordion with one section open, focus trap, scroll lock, Esc and close return focus, sticky CTA, 44 px rows | P0 | T3.02 | 2–3 | Drawer | Passes 12 §4.4 | Not started |
| T3.05 | `layout/Footer` (server) per 04 §9: five columns, verified contact block (V-10, V-11), bottom bar with entity (V-06), Privacy, Terms, Cookie settings; theme toggle only if D-01 = B | P0 | T3.01, V-06, V-10, V-11 | 1–2 | Footer | Gated pages absent when their flag is false; no stats strip | Not started |
| T3.06 | `layout/Breadcrumbs` with BreadcrumbList JSON-LD; last item `aria-current="page"` | P0 | T2.04 | 1 | Breadcrumbs | JSON-LD matches the visible trail | Not started |
| T3.07 | `layout/JumpLinks`: sticky, horizontal scroll on small screens, anchors from constants; does not hide focused content (WCAG 2.2 focus not obscured) | P1 | T2.04 | 1 | Jump links | Focused section heading is visible below header + jump bar | Not started |
| T3.08 | `ConsentBanner` and consent-gated loaders for GA4 (`layout.tsx:235-244`) and Tawk.to (`layout.tsx:285-314`); "Cookie settings" reopens it; non-essential declined by default | P0 | V-15, I-04 | 2–3 | Banner + loader | No request to Google or Tawk domains before consent (12 §4.14) | Not started |
| T3.09 | `seo/JsonLd.tsx` helpers and `canonical(path)` helper (09 §7); Organization data read from `site.ts` | P0 | T1.07 | 1–2 | Helpers | Absolute apex canonical, no trailing slash or query string | Not started |
| T3.10 | `sections/Hero` (variants `home`, `page`) and `sections/ContactFormSection` shell using T2.08 | P0 | T2.04, T2.08 | 1–2 | Two sections | One H1 per page; heading level passed by template | Not started |
| T3.11 | **Layout switch** (after T7.04, T6.04, T5.05): root layout uses the new Header, Footer and ConsentBanner; unlink `SmoothScroll` (Lenis), `ThemeToggle` (D-01 = A), `RouteGuard` and the old `Header.tsx`/`Footer.tsx` (removed at cleanup, register 11) | P0 | T3.02–T3.08, T7.04, T6.04, T5.05 | 1–2 | Updated `src/app/layout.tsx` | All branch pages render with the new shell; T1.09 passes | Not started |

### Stage 7 — Security and compliance pages (built first among templates)

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T7.01 | Final copy for `/compliance` and the four framework pages (copywriter + client SME), following 07 §6.5, §6.6 and §8 | P0 | T0.10, V-03, V-22 | 6–10 writer-days (external) | Approved copy per page | Passes the 07 §8 phrase list (12 §4.13) | Not started |
| T7.02 | `frameworks.ts` content: hub sections and framework entries (`controls`, `evidence`, `notOurRole`, `sharedResponsibility`, `faq`, `verified`, `legalReviewed`) | P0 | T1.07, T7.01 | 2–4 | Data file | Each control has a `pillarAnchor` that exists (T1.09) | Not started |
| T7.03 | `diagrams/ControlMap` (server SVG, data-driven) with control-map table as text alternative | P0 | T2.06 | 2–3 | Diagram | Same content available as a table; readable by screen readers | Not started |
| T7.04 | `/compliance/[slug]` framework template (`src/app/compliance/[slug]/page.tsx`): hero with boundary statement, applies to, shared responsibility, controls, evidence, dark control map, "what we do not do", platform notes, FAQ, form; `generateStaticParams` filtered by `verified && legalReviewed`; `dynamicParams = false` | P0 | T7.02, T7.03, T3.10 | 3–4 | Template | A framework with `legalReviewed: false` returns 404 and appears nowhere | Not started |
| T7.05 | `/compliance` hub (`src/app/compliance/page.tsx`): anchors `#boundaries`, `#frameworks`, `#cloud-governance`, `#security-governance`, `#risk-management`, `#assessments`, `#policy-controls`, `#audit-readiness`; `FrameworkCards` lists live frameworks only | P0 | T7.02, T7.03 | 3–4 | Hub page | All eight anchors exist; menu links to them pass T1.09 | Not started |
| T7.06 | `sections/FrameworkCards` and `sections/Deliverables` | P0 | T2.05 | 1–1.5 | Two sections | Render only live frameworks | Not started |
| T7.07 | Legal review of each framework page on a preview URL; record reviewer, date and reviewed version; set `legalReviewed: true` only after sign-off | P0 per page | T7.04, T0.11 | 5–10 elapsed per round (external) | Review log entry per framework | Log entry exists for each page with `legalReviewed: true` | Not started |

### Stage 6 — Cloud platform pages

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T6.01 | Final copy for `/cloud-platforms` and the three platform pages (07 §6.4), with tools only from 06 and V-16 | P0 | T0.10, V-01, V-03, V-05, V-16 | 4–6 writer-days (external) | Approved copy | At least 40% platform-specific copy per page (07 §6.4) | Not started |
| T6.02 | `platforms.ts` content: seven sections per platform with anchors `#consulting`, `#architecture`, `#migration`, `#devops`, `#security`, `#operations`, `#governance-compliance`; framework notes; `verified` | P0 | T1.07, T6.01 | 1.5–3 | Data file | Every section link resolves (T1.09) | Not started |
| T6.03 | `sections/PlatformCards` and `sections/CapabilityLedger` | P0 | T2.06 | 1–2 | Two sections | Partner badge renders only with a `Badge` value (V-01) | Not started |
| T6.04 | `/cloud-platforms/[slug]` template: hero with partner slot, when we recommend it, seven-row ledger, frameworks on this platform, certifications (V-05), multi-cloud note, FAQ, form; gated on `verified.delivery`; `dynamicParams = false` | P0 | T6.02, T6.03, T3.10 | 3–4 | Template | Unverified platform returns 404 and is absent from menus, hub, home and sitemap | Not started |
| T6.05 | `/cloud-platforms` hub | P0 | T6.03 | 1–2 | Hub page | Lists live platforms only, with no "on request" line (06 §3 recommendation) | Not started |
| T6.06 | Content gate review: 40% platform-specific rule and tool names checked against V-16 | P0 | T6.04 | 0.5 | Review note per page | Page ships only if it passes | Not started |

### Stage 5 — Core service pages

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T5.01 | Final copy for `/services`, the five pillars and two capability pages (07 §6.1–6.3) | P0 | T0.10, V-03, V-12, V-13, V-16 | 8–12 writer-days (external) | Approved copy | Passes 12 §4.13 | Not started |
| T5.02 | `services.ts` content: pillars and capabilities with all anchors from 06 §2 (for example `#strategy`, `#architecture`, `#hybrid-multi-cloud`, `#cloud-native`, `#ci-cd`, `#infrastructure-as-code`, `#platform-engineering`, `#observability`, `#zero-trust`, `#iam`, `#threat-detection`, `#vulnerability-management`, `#assessments`, `#managed-platforms`, `#incident-management`, `#cost-optimization`, `#backup-dr`); DevSecOps anchors `#lifecycle`, `#pipeline-security`, `#supply-chain`, `#policy-as-code`, `#runtime` | P0 | T1.07, T5.01 | 3–5 | Data file | Every mega-menu anchor in 04 §8.2 exists (T1.09) | Not started |
| T5.03 | Switch `src/app/services/[slug]/page.tsx` to render the Pillar or Capability template from `services.ts`; remove `ServiceRelatedWork` from the template; `dynamicParams = false`. The 15 old slugs stop building on the branch (their 301/410 ships in Stage 10) | P0 | T5.02 | 1–2 | Modified route | Six R1 slugs build; an old slug returns 404 on the preview until T10.06/T10.07 | Not started |
| T5.04 | Pillar template: hero with problems, jump links, capability sections with anchors, how we work, what you get, where we deliver (platform anchors), supports (frameworks), `NamedContact` (role only unless V-13), FAQ, form | P0 | T5.03, T3.07, T3.10 | 4–5 | Template | Matches 08 §12 wireframe; each capability section has named tools (07 §6.2 minimum) | Not started |
| T5.05 | Capability template: at-a-glance `DefinitionCard`, method ledger, `ToolingTable`, engagement shape (no durations unless verified), risks, FAQ, form | P0 | T5.03 | 2–3 | Template | Matches `prototypes/service-devsecops.html` | Not started |
| T5.06 | `sections/ToolingTable`, `NamedContact`, `InsightsTeaser` | P0 | T2.06 | 2–3 | Three sections | `NamedContact` renders a role when V-13 is not confirmed | Not started |
| T5.07 | `diagrams/DefenceInDepth` (HTML + CSS) for the Cloud Security dark section | P1 | T2.05 | 1–2 | Diagram | Text alternative present | Not started |
| T5.08 | `diagrams/PipelineGates` static SVG for the DevSecOps page (scroll-linked version is T9.05) | P1 | T2.05 | 1–2 | Diagram | Readable without JS and with reduced motion | Not started |
| T5.09 | Cross-link matrix (06 §4): "Where we deliver this" and "Supports" strips, framework → pillar anchor links; a link appears only if both pages are live | P0 | T5.04, T6.04, T7.04 | 1–2 | Cross-link logic in data/templates | Toggling a platform flag removes every link to it (T1.09 passes in both states) | Not started |
| T5.10 | `/services` hub rewrite (`src/app/services/page.tsx`): five pillar blocks, how engagements start, platforms and frameworks strips, CTA | P0 | T5.02, T6.03, T7.06 | 2–3 | Hub page | Links to all R1 service pages | Not started |
| T5.11 | Managed Cloud Services scope wording applied per V-12 (business-hours fallback; no "24/7" unless confirmed) | P0 | V-12 | 0.5 | Copy in `services.ts` | Grep for "24/7" and "round-the-clock" returns nothing unless V-12 confirmed | Not started |

### Stage 8 — Company and contact pages

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T8.01 | Final copy for About, Our Approach, Trust, Contact, Careers (07 §6.8–6.14); privacy policy and terms text from counsel | P0 | T0.10, T0.11, V-04, V-06, V-07, V-09, V-12, V-14, V-15, V-17, V-20 | 6–9 writer-days + counsel (external) | Approved copy and legal text | Legal text names the verified entity (V-06) | Not started |
| T8.02 | `/our-approach` (new, `src/app/our-approach/page.tsx`): five steps with a "Secure" band (A-14), `#engagement-models` (A-06, A-07, V-04, V-12; no prices), working with your team, how engagements start, `#faq` (engagement Q&As from `/faq`; governing-law answer only per V-07) | P0 | T8.01, T2.06 | 2–3 | Page | Anchors `#engagement-models` and `#faq` exist (targets of 05#6, #8, #18) | Not started |
| T8.03 | `/about` rebuild from `sections/`: who we are, what we do and do not do, leadership (V-09, V-13), `#clients` `LogoRow` (V-02, V-18), credentials (V-05, V-01), company facts from `site.ts` (V-06, V-08, V-10) | P0 | T8.01, T2.06 | 2–3 | Page | `#clients` anchor exists even when the row is hidden (menu item is hidden too, per 04 §8.6) | Not started |
| T8.04 | `/trust` (gated V-14; A-09): practice ledger stated literally, subprocessors matching the privacy policy (V-15), own compliance status (V-17) | P1 | T8.01, A-09 | 1–2 | Page | Every statement maps to a confirmed V-14 item; page absent if the flag is false, and the Our Approach fallback section is present | Not started |
| T8.05 | `/contact` rebuild and one `ContactForm`: name, work email, company, topic, cloud(s), message, consent checkbox (07 §6.12); `?topic=` preselect; unlink `FormToggler` tabs, `HireDeveloperForm`, `DeveloperRoleSelector`, `JobApplicationForm` | P0 | T2.08, T8.01 | 3–4 | Page + form | Passes 12 §4.6 form checklist; no staffing options or "Bid Price" | Not started |
| T8.06 | Form backend per I-01: server-side validation, spam protection, delivery to the V-10 inbox, failure handling that keeps the user's input | P0 | I-01, V-10 | 3–5 | Route handler + provider config | Test submission per topic arrives; spam test blocked; secrets in environment variables, not source | Not started |
| T8.07 | `/careers`: cloud, DevOps and security roles only; JobPosting per real role (V-20); applications by email; remove salary, equity and perk claims unless verified; remove `/work` links (`careers/page.tsx:106, 193`) | P1 | T8.01, V-20 | 1–2 | Page | No generic "Senior Software Engineer" posting; no `/work` link | Not started |
| T8.08 | `/privacy-policy` and `/terms`: counsel's text, entity (V-06), governing law (V-07), actual processors (V-15), cookie section, "Last updated" date | P0 | T8.01, V-06, V-07, V-15 | 0.5–1 | Two pages | Processors listed equal the scripts the site loads (12 §4.13) | Not started |
| T8.09 | Insights templates: label "Insights", four categories, `status` field (`live` / `hidden` / `retired`) in `blog.ts`, hidden posts excluded from listing and related posts, linked table of contents, related-service box, byline (V-09) and dates, CTA "Talk to the team behind this article" | P0 | T2.06, V-09 | 3–4 | Modified `src/app/blog/*` | Listing shows 16 posts; ToC items are links | Not started |
| T8.10 | Insights content edits for the 16 retained posts: recategorize, replace links per 05 §3 internal-link list (12 × `/services/cloud-devops`, 6 × `/services/security-quality`), remove links to hidden and retired posts, set `updated`; remove links to deprecated pages from the 6 hidden posts | P0 | T8.09, T5.03 | 2–3 | Edited `src/resources/blog.ts` | T1.09 passes; no retained post links to a redirected or gone URL | Not started |
| T8.11 | `src/app/not-found.tsx`: links to the five pillars, Compliance and Contact (08 §12); remove Our Work and Pricing | P0 | T5.10 | 0.5 | 404 page | Returns HTTP 404 | Not started |
| T8.12 | `public/manifest.json` name and description; `README.md` description of the company | P1 | — | 0.5 | Two files | No "Elite Software Agency" or "web agency" text | Not started |

### Stage 4 — Homepage

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T4.01 | Final home copy (07 §4; hero option A unless changed at T0.06), platform names trimmed to V-03 | P0 | T0.10, V-03 | 2–3 writer-days (external) | Approved copy | No statistics in the hero (07 §3.2) | Not started |
| T4.02 | `diagrams/Lifecycle` (client): tabs pattern over a server-rendered ordered list of the 7 stages (06 §2), arrow keys, roving tabindex | P0 | T2.06 | 2–3 | Diagram | Works with JS disabled as an ordered list; passes 12 §4.8 and §4.10 | Not started |
| T4.03 | Server-rendered CSS 3D layer stack (from `prototypes/index.html`) as the hero fallback and loading state | P0 | T2.04 | 1–2 | Hero visual | Shown below 860 px, with reduced motion, and without WebGL | Not started |
| T4.04 | Rewrite `src/app/page.tsx` with the 10 sections of 07 §4: Hero, ClientLogos (V-02), PillarGrid, PlatformCards, Lifecycle, FrameworkCards + boundary statement, ApproachSteps, What you get (Deliverables, V-05, V-01, `/trust` link only if live), InsightsTeaser, CtaBlock; set its own canonical | P0 | T4.01–T4.03, T5.10, T6.05, T7.05, T8.02 | 3–4 | Homepage | Old sections unlinked (register 11 homepage entries); one H1; T1.09 passes | Not started |

### Stage 9 — Motion, 3D and responsive

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T9.01 | `diagrams/LayeredPlatform` (concept 1, 08 §10) inside the existing `HeroCanvas` wrapper; core geometry and line materials only; re-enable the dynamic import in `Hero.tsx`; `HeroCrystal.tsx` unlinked (D-04, D-05) | P1 | T4.03, T1.02 | 4–6 | 3D hero | Meets every row of the 08 §10.3 budget | Not started |
| T9.02 | Measure the 3D budget: chunk ≤ 180 KB gzip, < 150 draw calls, pixel ratio ≤ 1.75, LCP element is the H1, CLS ≤ 0.05; mounts only ≥ 860 px, on screen, without reduced motion, with WebGL | P1 | T9.01 | 1–2 | Measurement note in the PR | All budget rows met, or the CSS stack ships alone (D-04 fallback) | Not started |
| T9.03 | Apply `Reveal` across templates (14 px rise, 60 ms stagger capped at four, 600 ms) | P2 | T2.07 | 1–2 | Motion pass | Nothing on screen at load is hidden; off under reduced motion | Not started |
| T9.04 | Ambient diagram loops (pipeline dash, security pulse) that stop off screen and under reduced motion | P2 | T5.07, T5.08 | 1–2 | CSS animation | No loop runs while off screen | Not started |
| T9.05 | Optional GSAP scroll-linked `PipelineGates` (08 §8) | P2 | T5.08 | 2–3 | Enhancement | No scroll-jacking; static version unchanged without JS | Not started |
| T9.06 | Responsive pass on every template at 320, 375, 640, 1024, 1280, 1440 px and 200% zoom | P0 | All template tasks | 3–4 | Fixes | No horizontal scroll except tables and the lifecycle strip (08 §9) | Not started |

### Stage 10 — SEO and technical optimization

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T10.01 | `generateMetadata` on every template from data `seo`: title without "AlgoCrew" (template adds it), ≤ 60 characters, meta description ≤ 155 characters, canonical via T3.09, Open Graph per page | P0 | T3.09, all content tasks | 2 | Metadata | 12 §4.12 metadata rows pass | Not started |
| T10.02 | Structured data (05 §3 table): Organization from `site.ts` (`legalName` only if V-06, no `foundingDate` unless V-08, `sameAs` per V-11), WebSite, Service (`areaServed` per V-19), BreadcrumbList, BlogPosting (`author` per V-09, `dateModified`), FAQPage only where visible; remove PriceSpecification, ProfessionalService, the generic JobPosting and the Once UI `schema`/`sameAs` leftovers | P0 | T3.09, V-06, V-08, V-09, V-11, V-19 | 2–3 | JSON-LD | Validates without errors in Schema.org validator and Rich Results Test | Not started |
| T10.03 | Rewrite `src/app/sitemap.ts` from the data files with the same gating flags; real `lastModified` (`updated ?? date`); no image entries; exclude hidden posts and `/hire` | P0 | T1.08 | 1 | Sitemap | T1.10 passes; 41 URLs when all gated pages launch (04 §2) | Not started |
| T10.04 | `src/app/robots.ts`: keep `Disallow: /api/`, add `Allow: /api/og/`, remove `Host:`, keep `Sitemap:` (05 §3) | P0 | — | 0.5 | robots.txt | Matches 05 exactly | Not started |
| T10.05 | Restyle `src/app/api/og/generate` to the light system with a bundled font (no per-request Google Fonts fetch) | P1 | T2.01 | 1–2 | OG route | No outbound font request; 1200 × 630 output | Not started |
| T10.06 | Redirects in `next.config.mjs` (I-02, I-03): the 12 301s of 05 (05#5, #6, #8, #9, #11, #14, #15, #16, #17, #18, #38, #39) with gated fallbacks for #16 and #17; `/projects` → `/about`; host redirect per I-02 | P0 | T0.06, T1.06, I-02, I-03, all targets built | 1 | Redirect config | 12 §4.2 redirect table passes on the preview; no chains | Not started |
| T10.07 | 410 responses in `src/middleware.ts` from one reviewed data file (32 paths of 05 plus `/projects/:slug`), with a small HTML body linking to `/`, `/services`, `/contact` | P0 | T0.06, T1.06 | 1–2 | Gone list + middleware | Every listed path returns 410 on the preview | Not started |
| T10.08 | Stop generating gone pages: filter `generateStaticParams` sources (`categorizedServices.js`, `ourProjects.js`, `blog.ts`, `locations.ts`); `dynamicParams = false` on every `[slug]` route; legacy route folders unlinked (removed at cleanup) | P0 | T10.07 | 1 | Build without gone pages | Build output lists no retired or hidden work URL; unknown slugs return 404 | Not started |
| T10.09 | noindex for the 6 hidden posts (05#59–#64) via the `status: 'hidden'` flag (I-05) | P0 | T8.09, I-05 | 0.5 | Metadata flag | `robots: noindex, follow`; absent from listing, related posts and sitemap | Not started |
| T10.10 | `src/resources/once-ui.config.js`: `routes` and `protectedRoutes` match the new route list; password-gate API routes unlinked (05 §1.6) | P0 | T3.11 | 0.5 | Config | No route in config that is not in the build | Not started |
| T10.11 | Remove the manual `<meta name="keywords">` (`layout.tsx:251`) and the metadata keywords (`layout.tsx:24-28`) | P1 | — | 0.5 | Layout | No keywords meta in the HTML | Not started |
| T10.12 | Search Console verification (token placeholder at `layout.tsx:77-80` or DNS) and the URL Inspection list (12 redirected URLs, 5 pillar pages) | P0 | T0.09 | 0.5 | Verified property | Property verified for `https://algocrew.io` | Not started |
| T10.13 | Content-Security-Policy, first as report-only, covering the consent-gated third parties (01 §15 item 15) | P1 | T3.08, T8.06 | 1–2 | Header in `next.config.mjs` | No CSP violations in report-only mode across 12 §2 templates | Not started |
| T10.14 | Internal linking pass: every R1 page has at least one inbound link from a menu, hub or body; related-service boxes on all 16 posts | P0 | All content tasks | 1 | Link map | Orphan check in 12 §4.12 passes | Not started |

### Stage 11 — Quality assurance, launch, cleanup

| Task ID | Description | Priority | Dependencies | Estimated duration | Expected deliverable | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| T11.01 | Content freeze; release candidate on a preview deployment with production configuration | P0 | Stages 1–10 | 0.5 | RC deployment ID | All P0 tasks done | Not started |
| T11.02 | Routes, status codes and redirects (12 §4.1–4.2), including gated on/off builds | P0 | T11.01 | 2–3 | Test log | All rows pass | Not started |
| T11.03 | Navigation, drawer, CTA and form checklists (12 §4.3–4.6) | P0 | T11.01 | 2 | Test log | All rows pass | Not started |
| T11.04 | Cross-browser and device matrix (12 §2) | P0 | T11.01 | 3–4 | Matrix results | No open S1/S2 defects | Not started |
| T11.05 | Accessibility: automated pass and manual script with VoiceOver and NVDA (12 §4.10) | P0 | T11.01 | 4–6 | Audit log | WCAG 2.2 AA: no open S1/S2 findings | Not started |
| T11.06 | Performance on the named templates (12 §4.11) | P0 | T11.01 | 2–3 | Lighthouse and WebPageTest results | Targets met or exceptions signed off | Not started |
| T11.07 | SEO checks (12 §4.12) | P0 | T11.01 | 1–2 | Checklist | All rows pass | Not started |
| T11.08 | Content and compliance checks: phrase greps, V-item audit, legal review log (12 §4.13) | P0 | T11.01, T7.07 | 1–2 | Grep output + V-item table | Zero unexplained hits; every V-item resolved | Not started |
| T11.09 | Privacy and consent checks (12 §4.14); console errors and full crawl (12 §4.15) | P0 | T11.01 | 1–1.5 | Network logs, crawl report | No pre-consent tracker request; zero broken links | Not started |
| T11.10 | Defect fixing buffer | P0 | T11.02–T11.09 | 5–10 | Fixes | No open S1/S2 (12 §5) | Not started |
| T11.11 | Client UAT and sign-offs (12 §2.3) | P0 | T11.10 | 3–5 elapsed (client) | Signed go/no-go | All sign-offs recorded | Not started |
| T11.12 | Launch per the runbook (12 §7): redirects, 410s, noindex, sitemap and robots go live in the same deploy; Search Console submission | P0 | T11.11 | 1 | Production deployment | Runbook steps all checked | Not started |
| T11.13 | 30-day monitoring (12 §8) | P0 | T11.12 | 30 calendar days, about 0.25 day per working day (4–6 effort) | Weekly reports | Rollback criteria never met, or handled per 12 §9 | Not started |
| T11.14 | Cleanup release: remove everything marked "Remove at cleanup" in 11, after 14 days without S1/S2 defects; tag the pre-cleanup commit | P1 | T11.13 (day 14 or later) | 3–5 | Cleanup PR | Build, T1.09 and T1.10 pass; bundle and `public/` size reduced | Not started |

**Count:** 119 tasks in total: 11 in Stage 0 (5 Done, 6 gates), and 108 implementation tasks across Stages 1–11 (Stage 1: 12, 2: 11, 3: 11, 4: 4, 5: 11, 6: 6, 7: 7, 8: 12, 9: 6, 10: 14, 11: 14).

---

## 5. Phase timeline (client format)

Durations are calendar working days with the team in AS-01 and AS-02. Phases overlap. Execution order is as in §3, so "Cloud and compliance" runs before "Service pages" even though it is listed after.

| Phase | Focus | Expected output | Duration |
|---|---|---|---|
| Existing website audit | Code, routes, content, claims, assets | 01, 03 | **Complete** |
| Competitor research | Reference sites, positioning gaps | 02, 02a, 02b | **Complete** |
| Business and service strategy | Pillars, capabilities, messaging, verification register | 06, 07 | **Complete** |
| Sitemap and routing | Route tree, navigation, 74-URL migration map | 04, 05 | **Complete** |
| UI/UX strategy | Design direction, prototypes, component architecture | 08, 09, prototypes | **Complete** |
| Approval gate (M0) | Client decisions, access, copywriter and legal reviewer | T0.06–T0.11 | 5–10 (client; elapsed) |
| Design system | Stages 1, 2 and 3: build fix, data model, CI checks, tokens, primitives, header, mega menus, drawer, footer, consent | Component library on previews; new shell ready | 22–32 |
| Cloud and compliance | Stages 7 and 6: `/compliance` + 4 frameworks, `/cloud-platforms` + 3 platforms | New routes on previews; legal review under way | 10–16 (legal review runs in parallel, 5–20 elapsed) |
| Service pages | Stage 5: `/services` hub, 5 pillars, 2 capability pages, cross-links; then layout switch (T3.11) | Service section on previews | 9–15 |
| Company and contact | Stage 8: Our Approach, About, Trust, Contact + form backend, Careers, Insights, legal pages, 404 | All R1 non-home pages on previews | 10–15 |
| Homepage | Stage 4: 10 sections, lifecycle, hero fallback | Homepage on previews | 4–6 |
| Technical implementation | Stages 9 and 10: 3D hero, motion, responsive pass; metadata, structured data, sitemap, robots, redirects, 410s, noindex | Release candidate | 13–19 |
| QA and launch | Stage 11: QA per 12, defect fixing, UAT, launch | Production launch | 10–16, then 30 calendar days of monitoring and a 3–5 day cleanup release |

**Total from M0 approval to launch: 78–119 working days with two engineers (about 16–24 weeks).** Add 5–10 days for the approval gate before it, and 30 calendar days of monitoring plus 3–5 days of cleanup after it. The figures come from §6.

---

## 6. Estimates

### 6.1 Effort by stage (engineering, working days)

| Stage | Effort range | Notes |
|---|---|---|
| 1 Architecture and cleanup | 12–18 | Includes both automated checks and CI |
| 2 Design system | 15–22 | Light only (D-01 = A) |
| 3 Global components | 15–22 | Mega menu and drawer are the riskiest items |
| 7 Security and compliance | 11–17 | Excludes copy and legal review |
| 6 Cloud platforms | 7–12 | Excludes copy |
| 5 Core services | 17–27 | Pillar template is the largest single task |
| 8 Company and contact | 19–28 | Includes the form backend and Insights |
| 4 Homepage | 6–9 | |
| 9 Motion, 3D, responsive | 10–16 | T9.05 (P2) excluded |
| 10 SEO and technical | 15–19 | |
| 11 QA and launch | 18–29 | Includes the defect buffer; excludes UAT, monitoring and cleanup |
| **Total** | **145–219** | Plus monitoring (4–6) and cleanup (3–5) after launch |

Non-engineering effort that runs in parallel: copy 20–35 writer-days (T7.01, T6.01, T5.01, T8.01, T4.01), designer 15–25 days at part time, legal review 5–20 elapsed days, client UAT 3–5 elapsed days.

### 6.2 How the total moves with the open decisions

Calendar deltas assume two engineers.

| Scenario | Effort change | Calendar change | Comment |
|---|---|---|---|
| **Baseline:** light only (D-01 = A), all 7 gated pages launch (3 platforms, 4 frameworks), `/trust` launches | — | **78–119 days** | |
| D-01 = B: light default with dark toggle | +12 to +21 | +7 to +12 | 08 §2 puts this at 25–30% more design-system and QA effort: T2.11, every component in both themes, a second QA pass |
| 4 of 7 gated pages launch (for example 2 platforms, 2 frameworks) | −4 to −7 | −2 to −4 | Templates are still built; savings are content entry, gate reviews and QA per page |
| 0 of 7 gated pages launch | −12 to −20 | −6 to −10 | Platform and framework detail templates (T6.04, T7.04) can be deferred; the two hubs still launch. The hubs become thin, which weakens the positioning |
| `/trust` deferred (A-09 alternative or V-14 unanswered) | −2 to −3 | −1 to −2 | Our Approach carries a short "How we handle access" section instead (07 §5) |
| D-01 = B and 0 of 7 gated pages | about 0 to +1 | about 0 to +2 | The two changes roughly cancel out |
| Each gated page added after launch | +2 to +4 per page | — | Content entry, review, QA and a small release; the template already exists |

### 6.3 Team-size sensitivity

| Team | Calendar to launch |
|---|---|
| One engineer | 145–219 working days (about 7–10 months). Almost no overlap is possible. |
| Two engineers (baseline) | 78–119 working days |
| Three engineers | About 65–100 working days. Stages 1–3 and the redirect release are sequential, so a third person mostly speeds up content entry and QA. |

---

## 7. Critical path, parallel work, external dependencies

### 7.1 Engineering critical path

T0.06 approvals → T1.02 build fix → T1.07 data model → T2.01 tokens → T2.04–T2.06 primitives → T3.02–T3.03 header and mega menu → T7.04 framework template → T5.03–T5.04 service template → T3.11 layout switch → T8.05–T8.06 contact form and backend → T4.04 homepage → T10.06–T10.08 redirects, 410s, stop generating gone pages → T11.02–T11.10 QA and fixing → T11.11 UAT → T11.12 launch.

The form backend (T8.06) is on the path because the contact form is the site's only conversion route and cannot launch untested.

### 7.2 What runs in parallel

- Engineer 2 during Stage 1: T1.09, T1.10, T1.11 (checks and CI) while engineer 1 does T1.02, T1.05, T1.07.
- T1.06 (Search Console data pull) as soon as access exists. It does not wait for the build.
- Copy for each batch runs one stage ahead of its content-entry task (T7.01 during Stage 2, T6.01 and T5.01 during Stage 3 and Stage 7).
- Legal review (T7.07) runs while Stages 6, 5 and 8 are built.
- During Stages 6 and 7: one engineer on templates, the other on `ControlMap`, `PlatformCards`, `CapabilityLedger` and content entry.
- T3.08 consent and T8.06 form backend do not depend on design work and can be built any time after Stage 2.
- T9.01 (3D) can start once T4.03 exists, in parallel with Stage 10.
- T10.02–T10.05 (metadata, schema, sitemap, robots, OG) in parallel with Stage 9.

### 7.3 External dependencies that can block launch regardless of engineering

| Dependency | What it blocks | Launch-blocking? | Fallback if late |
|---|---|---|---|
| T0.06 approvals (A-01…A-14, V-23, D-01…D-09, 05) | Everything | **Yes** | None |
| V-06 legal entity, V-07 governing law | Terms; privacy policy; footer; Organization `legalName` | **Yes**: 07 says legal pages are blocked until resolved, and the site cannot launch without legal pages | Brand name in footer and schema, but Terms cannot be published |
| V-15 actual processors and consent approach | Privacy policy (inaccurate today); consent banner configuration | **Yes** | Launch without GA4 and Tawk.to at all (I-04), with a privacy policy listing only what remains |
| Legal review of each framework page (T7.07) | That framework page only | Per page | The page stays unbuilt; redirects 05#16 and #17 use the `/compliance` fallback |
| V-03 delivery experience per cloud and framework | Platform and framework pages; hero subhead; homepage cards | Per page. If **no** cloud is confirmed, the positioning itself is unsupported and launch should be reconsidered | Pages not built; copy trimmed |
| V-01 partner statuses | Badges, Cloud Platforms featured slot | No | No badges; featured slot falls back (04 §8.3) |
| V-02 client logo permissions (and V-18 relationship type) | Home section 2, `/about#clients`, contact logo row, Our Clients menu item | No | Rows and menu item left out (fewer than three logos) |
| V-08, V-09, V-10 verified company facts | About, bylines, footer, schema, contact details | Partly: at least one verified public email (V-10) is needed for the contact form to deliver | Roles only; "AlgoCrew engineering" bylines; email and form only |
| V-12 managed-services operating model | Managed Cloud Services wording | No | Business-hours wording |
| V-14, V-17 | `/trust` | No | Page deferred (A-09) |
| Search Console access (T0.09) | T1.06 baseline, therefore the 410 review in 05 §3 step 1; launch-day sitemap submission and URL Inspection | **Yes for the redirect release**: 410s should not ship without the backlink check | None. Do not ship 410s blind |
| Hosting access (T0.09) | Previews, logs, rollback, domain-level redirect (I-02) | **Yes** | None |
| Final copy (AS-03) | Each content-entry task | Per page | Page stays unbuilt only if it is gated; ungated pages block launch |
| I-01 form provider credentials | T8.06 | **Yes** | Keep the current EmailJS service with a server-side wrapper |

---

## 8. Milestones and release strategy

### 8.1 Milestones

| Milestone | Exit criteria | Indicative day (from M0, low–high) |
|---|---|---|
| **M0 Approved to build** | T0.06, T0.07 signed; T0.09 access granted; T0.10, T0.11 named | 0 |
| **M1 Foundation** | Clean build from a clean clone; CI runs lint, typecheck, build, link check, sitemap check; previews work and are noindexed; T1.06 410 review approved | 6–9 |
| **M2 Design system and shell** | All primitives on the review route with designer sign-off; header, mega menus and drawer pass the 12 §4.3–4.4 checks on a preview; automated accessibility scan shows no violations on the review route. Re-baseline estimates here | 22–32 |
| **M3 New routes** | `/compliance`, `/cloud-platforms` and every gated page built behind flags; both flag states pass T1.09 and T1.10; framework pages sent for legal review | 32–48 |
| **M4 Services and shell switched** | Service hub, pillars and capabilities built; T3.11 done; cross-links work in both flag states | 41–63 |
| **M5 All templates** | Company, contact (with backend), Insights and homepage built; responsive pass done | 55–84 |
| **M6 Release candidate** | Stage 10 complete on a preview, including redirects and 410s; content freeze; QA per 12 with no open S1/S2; UAT signed | 78–119 |
| **M7 Launch** | Runbook (12 §7) complete; post-launch smoke checks pass | Launch day |
| **M8 Stable and clean** | 30 days of monitoring without hitting rollback criteria; cleanup release merged (T11.14) | Launch + 30 calendar days |

### 8.2 Release strategy

1. **Build on one release branch** (T1.01) with a preview deployment for every pull request. Feature branches merge into the release branch, not into `main`. `main` stays deployable for urgent fixes to the current site; any such fix is merged forward into the release branch the same day.
2. **Previews are private to search engines.** Verify that preview responses carry `X-Robots-Tag: noindex`. If they do not, add it for non-production environments.
3. **One cutover for the URL migration.** 05 §5 requires the redirects, the 410 list, the noindex flags, the sitemap and robots changes and the internal-link cleanup to ship together. A staged launch (for example new services first, homepage later) would either leave old pages linking to new URLs or put 301s in front of pages that do not exist yet, and 05 forbids both. The new templates, layout, homepage and URL changes therefore go live in a single production deploy.
4. **What can be staged:** gated pages that miss launch (platforms, frameworks, `/trust`) ship later as small content releases. Each one flips a data flag, adds the page to menus and sitemap automatically, and repoints any fallback redirect in one hop (05 fallback rule). The cleanup release (T11.14) is separate and comes after M8 conditions are close.
5. **When redirects go live:** in the launch deploy itself (12 §7, step 3), never before the target pages exist and never in a separate deploy.
6. **Rollback plan:** before launch, tag the last pre-launch production commit (suggested `site-v1-final`) and record the current production deployment ID. Rollback is a promotion of that deployment (Vercel instant rollback, assumed under AS-05), which restores the old pages and old URLs together. Prefer a targeted fix where possible: hide one page by flag, revert one redirect. Criteria and procedure are in 12 §9.
7. **No deletion before M8.** Everything retired is unlinked, not deleted, until the cleanup release (09 decision 8, register 11).

---

## 9. Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| RK-01 | Verification answers (V-01…V-22) arrive late or not at all | High | High | Every gated page has a fallback; build ungated pages first; chase P0 items (V-03, V-06, V-07, V-10, V-15) weekly from M0 |
| RK-02 | Legal review turnaround longer than AS-04 | Medium | Medium | Send framework pages at M3; launch without the pages still under review; fallbacks for 05#16 and #17 |
| RK-03 | Copy arrives late or needs heavy rework | High | High | Copy calendar (T0.10) one stage ahead; content entry is a separate task, so templates can be built with working copy from 07 |
| RK-04 | Once UI global CSS fights the new tokens (09 §10) | Medium | Medium | T2.02 first; screenshot comparison; tokens loaded after Once UI |
| RK-05 | Mega menu and drawer accessibility takes longer than estimated | Medium | Medium | Built in Stage 3, tested at M2 with keyboard and screen readers before any page depends on them |
| RK-06 | Traffic loss from 32 410s larger than expected | Low | Medium | T1.06 backlink review before the gone list is final; 30-day monitoring (12 §8) |
| RK-07 | Redirect chains or loops (host redirect plus config redirects; `/projects`) | Medium | Medium | I-02 decided early; 12 §4.2 chain checks |
| RK-08 | 3D hero exceeds its budget | Medium | Low | CSS stack is the server-rendered default; 3D is P1 and can be dropped (D-04 fallback) |
| RK-09 | Gated content leaks into menus or sitemap | Low | High | One flag source; T1.10 sitemap test; T1.09 in both flag states |
| RK-10 | Form spam or failed delivery after launch | Medium | High | I-01 server-side validation and spam protection; delivery test per topic; weekly test submission during monitoring |
| RK-11 | Consent banner misconfigured, so trackers load before consent | Medium | High (GDPR/PIPEDA positioning) | 12 §4.14 network-log checks in a clean profile; launch without GA4/Tawk if unresolved |
| RK-12 | A forbidden compliance phrase or unverified claim ships | Medium | High | 12 §4.13 greps on rendered HTML, schema and meta; legal review log |
| RK-13 | Team size or availability differs from AS-01 | Medium | High | Re-baseline at M2 using real velocity |
| RK-14 | Hosting is not Vercel, or preview/rollback is not available | Low | Medium | Confirm at T0.09; add 2–4 days for CI/preview setup |
| RK-15 | Urgent changes to the live site during the build cause merge conflicts | Medium | Low | Merge forward the same day; keep live-site fixes small |
| RK-16 | Client logo approval (especially Deloitte, 07 §7) never arrives | High | Low | Logo rows render nothing below three approved logos; nothing else depends on them |

---

## 10. Pre-existing defects implementation must fix or consciously drop

| Defect (source) | Decision | Task |
|---|---|---|
| WIP hero imports `three`, `@react-three/fiber`, `@react-three/drei`, none declared (01 §4, §15.1) | **Fix**: add `three` and `@react-three/fiber`; do not add drei; disable the import until the new scene replaces `HeroCrystal` | T1.02, T9.01 |
| `/images/services/webapp.jpg` missing on 5 industry service pages (01 §5, §15.2) | **Drop**: all 5 pages are retired or merged (05#16, #17, #23, #27, #28); the image is not created | T5.03, T10.06–T10.08 |
| `JobApplicationForm` sends only the CV file name and size (01 §12, §15.4) | **Drop for R1**: the form is unlinked; applications by email from Careers. Fixing CV upload is a later decision | T8.05, T8.07 |
| Soft 404 from `RouteGuard` (HTTP 200 for disabled routes) (01 §2, §15.3) | **Fix**: `RouteGuard` unlinked from the layout; hidden pages handled by 301/410/noindex; `dynamicParams = false` gives real 404s | T3.11, T10.07, T10.08 |
| Conflicting company facts: Inc. vs Ltd., founding year, founder name, emails, governing law, prices (01 §14, 07 §10) | **Fix**: one source (`site.ts`) filled from V-06…V-10; prices removed | T1.07, T3.05, T8.03, T8.08, T10.02 |
| GA4 loads without consent; privacy policy lists Plausible instead of the actual processors (01 §12, §15.14) | **Fix**: consent banner, gated loaders, corrected privacy policy | T3.08, T8.08 |
| Client-only EmailJS with no captcha or rate limit (01 §15.5) | **Fix** | T8.06 |
| Password gate with a constant cookie and default password `password` (01 §15.6) | **Drop**: API routes unlinked, then removed | T10.10, T11.14 |
| `npm run export` uses removed `next export` (01 §15.12) | **Fix**: script removed | T1.03 |
| Likely duplicate brand in titles (01 §10, unverified) | **Fix**: titles omit the brand | T1.05 (confirm), T10.01 |
| OG route under robots-disallowed `/api/`, fetching Google Fonts per request (01 §15.16) | **Fix** | T10.04, T10.05 |
| `/hire` and `/contact` pass a relative OG image path (01 §10) | **Drop** for `/hire` (301); **fix** for `/contact` | T10.01 |
| Pricing schema prices contradict the visible prices (01 §5) | **Drop**: page and schema retired | T10.02, T10.06 |
| `scroll-behavior` conflict while Lenis runs (01 §15.17) | **Fix**: Lenis removed, conflict removed | T2.02, T3.11 |
| No Content-Security-Policy (01 §15.15) | **Fix** (report-only first) | T10.13 |
| `*.vercel.app` → apex redirect would break preview review (not in 01; found while planning T1.01) | **Fix**: production only | T1.01 |
| Repo hygiene: tracked build info, stray worktree files (01 §15.13) | **Fix** | T1.04 |

---

> **Progress:** implementation status is tracked in [14-implementation-log.md](14-implementation-log.md). Implementation Stage 1 is complete except T1.03 (lint migration), T1.04 (waits for the first commit) and T1.06 (blocked on Search Console access).

## 11. Reconciliation with the Stage 5 design review

Added after [13-design-review.md](13-design-review.md) was completed. The roadmap above was written in parallel with the review, so it does not include the review's findings. This section adds them. Where this section and the sections above disagree, this section wins.

### 11.1 New gate: design fixes before Stage 6

The review found 2 blockers and 10 major issues. Seven items must be closed before implementation starts. They form a design gate (tasks G-01 to G-07) that sits between plan approval and T1.01. The IDs are G-xx because T0.xx is already used in §4. Estimates are planning estimates, added by the session lead, not by the roadmap author.

| Task ID | Description | Review finding | Owner | Depends on | Est. (working days) | Acceptance criteria | Status |
|---|---|---|---|---|---|---|---|
| G-01 | Record the theme decision (D-01). Amend 04 §8.1, §8.8, §9 and 07 §7 to match. Add the removal of theme-init and the saved-theme cleanup in `layout.tsx` to T1/T2. | R-17 (Blocker) | Client decides; design amends | — | 0.5 | One statement of the theme decision; no document contradicts it | **Done.** Client chose light only. 04 §8.1, §8.8, §9 and 08 §2 amended. The `layout.tsx` and saved-theme cleanup is part of Stage 1–2. |
| G-02 | Get V-01 to V-04 answered, then prototype the verified-only homepage, menus and footer with 1-, 2- and 3-item layouts. Add proof near the hero that needs no permission. | R-04 (Blocker) | Client answers; design | V-01…V-04 | 2–3 after answers | Every launch combination has a designed layout; nothing above the fold is a placeholder | **Done without the answers**, on the client's instruction to use the recommendations: the prototypes now have a launch-state switch (nothing verified, one, two, or all platforms and frameworks) that filters the hero copy, homepage sections, menus, footer, tables and diagrams. Default is nothing verified. A scope, method and role strip under the hero needs no permission. V-01 to V-04 are still unanswered and still decide which state ships. |
| G-03 | Correct `prototypes/ui.js` before it is ported: place each panel directly after its trigger in the DOM, fix the hover-then-click conflict, complete the lifecycle tabs pattern (tab panel role, labels, Home/End). | R-01, R-02, R-03 (Major) | Design | — | 1 | Tab from an open trigger lands in its panel; hover then click leaves the menu open; tabs pass a keyboard and screen-reader check | **Done** in the prototypes (DOM order, hover-then-click, focus-out close, tabpanel role and label, Home/End). Checked with scripted events; not yet checked with a real screen reader. |
| G-04 | Give the capability, platform and framework templates distinct heroes; place the pipeline diagram on the DevSecOps page and the control map on the framework page. Prototype Contact (with form states), one pillar page and the Compliance hub. | R-05, R-18 (Major) | Design | G-01 | 3–5 | Three templates are distinguishable at a glance; three new prototypes reviewed | **Done.** Capability hero carries the pipeline diagram and an at-a-glance row; platform hero is a tinted band with a numbered capability index; framework hero is full-width with a fact row, and the framework page carries the control map. New prototypes: `contact.html` (with error and success states), `pillar-cloud-security.html`, `compliance.html`. |
| G-05 | Remove or register every unverified claim in prototype copy (tenant access, Terraform, deliverable ownership, "an engineer will reply"). Correct the HIPAA applicability sentence. | R-07, R-13 (Major) | Design + client | V-14, V-16 | 0.5 | Every factual claim maps to a V-item or is removed | **Done** for the eight claims listed in R-07 and the HIPAA sentence in R-13; V-24 added to 07 §11. A full fact check still happens at copy freeze (R-23). |
| G-06 | Measure a production build of three.js with React Three Fiber. Choose React Three Fiber, plain three.js, or CSS only, and reset the budget in 08 §10.3. | R-08 (Major) | Engineering | T1.02 | 0.5–1 | Measured chunk size recorded; budget is achievable | **Done**: plain three.js 130 KB gzip, React Three Fiber version 244 KB gzip (scratch esbuild build). Decision: plain three.js, no React Three Fiber; budget reset to 150 KB (08 §10.2–10.3). T1.02 changes accordingly: add `three` only and rewrite the WIP hero's imports. |
| G-07 | Client decision on where client logos appear and whether Atmosera and Deloitte appear on the homepage. | R-20 (Major) | Client | V-02, V-18 | — | Decision recorded in 07 §7 | **Done.** Client accepted the recommendation: logos on About only in release 1, once V-02 is cleared; none on the homepage or Contact. 07 §4 and §7 and 04 §8.6 amended. |

**Status:** all seven gate tasks are closed. What remains before Stage 6 is the client's approval of the plan (T0.06, T0.07) and the external dependencies in §7.

**Effect on the estimate:** The gate adds roughly 7–11 working days of design and engineering, plus client response time for G-01, G-02 and G-07. G-03, G-05 and G-06 do not wait on the client and can start immediately. The total in §6 becomes roughly 85–130 working days from approval to launch. T9.02's 180 KB target is replaced by 150 KB, re-measured in the real Next.js build.

### 11.2 Findings folded into existing tasks

| Review finding | Folded into |
|---|---|
| R-06 visual distinctiveness | G-04, then Stage 2 design-system tasks |
| R-09 drawer content, R-12 drawer `inert` | Stage 3 mobile drawer task |
| R-10, R-11 tablet and phone layouts; R-24 Services menu at laptop widths | T9.06 responsive pass |
| R-14 outline button on dark surfaces (1.45:1); correct the wording in 08 §3.1 | Stage 2 button task |
| R-15 Once UI cascade layering | Stage 2 token task |
| R-16 effort plan | This section |
| R-19 headings, breadcrumbs, footer links; R-21 missing homepage links | Stage 3 and Stage 4 tasks; internal-link check |
| R-22 single boundary-statement text | Data model task (`frameworks.ts`) |
| R-23 provider and regulation fact check | Copy freeze, before legal review |
| R-25 to R-30 polish; dark theme; interactive defence-in-depth; scroll-linked pipeline | After launch |

### 11.3 Correction to 08

The review recomputed the contrast values in 08 §3 and found them correct. It also found that 08 is wrong to call the light outline button's border a failure: WCAG does not require a border on a text button. The real gap is the outline button on dark surfaces. 08 §3.1 and §14 should be amended under G-01.
