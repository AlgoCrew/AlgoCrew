# 14 — Implementation log (Stage 6)

Running record of what has been implemented on the `site-v2` branch, what was verified and what is still open. Task IDs refer to [10-implementation-roadmap.md](10-implementation-roadmap.md).

Nothing has been committed or pushed yet. `main` is untouched.

## Implementation Stage 1: Architecture and cleanup

| Task | Status | What was done | Verified |
|---|---|---|---|
| T1.01 Release branch; preview redirect | Partly done | Branch `site-v2` created locally. `src/middleware.ts` now redirects `*.vercel.app` to the apex only when `VERCEL_ENV` is `production`, and sends `X-Robots-Tag: noindex` on every host that is not `algocrew.io`. | Build passes. **Not verified on a real preview deployment**: the branch is not pushed and Vercel hosting is still an assumption. |
| T1.02 Fix the WIP build break | Done, differently | No packages added. The `HeroCanvas` import in `Hero.tsx` is commented out and `src/components/home/three` is excluded in `tsconfig.json` until T9.01 rewrites the scene on plain three.js (08 §10.2). The WIP files are kept as they were. | `npm ci`, `npm run typecheck` and `npm run build` succeed. |
| T1.03 Tooling | Partly done | Removed the dead `export` script. Added `typecheck`, `test:checks`, `check:links`, `check:sitemap` scripts. | `next lint` still works (2 warnings, 0 errors) but is deprecated in Next 15.5. **Open:** move to the ESLint CLI with flat config; align `@types/react` with React 19. |
| T1.04 Repo hygiene | Not started | Untracking `tsconfig.tsbuildinfo`, the stale worktree gitlink and `.DS_Store` files changes the git index, so it waits for the first commit. | — |
| T1.05 Baseline build | Done | See the baseline below. | — |
| T1.06 Baseline SEO data | Blocked | Needs Search Console and GA4 access from the client. | — |
| T1.07 Typed data model | Done | `src/resources/gating.ts`, `pillars.ts`, `platforms.ts`, `frameworks.ts`, `navigation.ts`, `site.ts`. Content comes from the approved prototypes; everything is `draft` and unverified, so no new page or link is generated yet. | Type check passes. |
| T1.08 Gating helper | Done | `isPlatformLive`, `isFrameworkLive`, `livePlatforms()`, `liveFrameworks()`, `liveServices()`; `headerNav()` and `footerNav()` are built only from live items. | Type check. The "absent from all six consumers" test becomes possible when the consumers exist; the two build checks below cover menus and sitemap. |
| T1.09 Link and anchor check | Done | `scripts/site-checks.mjs links` reads the build output and fails on an internal link to a missing route or a missing `#anchor`. Redirect sources, API routes and files in `public/` count as valid targets. | Unit tests pass (`npm run test:checks`, 6 tests after Stage 2). On the current site: 74 pages, 0 broken links. Correction: in Stage 1 the tests were run by file path; the npm script itself was wrong (`node --test scripts/`) and would have failed in CI. Fixed in Stage 2 to `node --test scripts/*.test.mjs`. |
| T1.10 Sitemap equals routes | Done | `scripts/site-checks.mjs sitemap` compares the built `sitemap.xml` with the built pages that are not `noindex`. | Unit test covers a leaked page and a missing page. On the current site: 0 missing, 0 extra. |
| T1.11 CI workflow | Written | `.github/workflows/ci.yml`: type check, lint, check tests, build, both checks. | **Not run on GitHub** (nothing pushed). |
| T1.12 Breakpoints | Done | `src/styles/breakpoints.scss` with 640, 1024, 1280 px and mobile-first mixins. Legacy file untouched. | Not yet imported by any module. |

### Deviations from the plan

- **`pillars.ts`, not `services.ts`.** 09 §2 named the new file `services.ts`, but the legacy `src/resources/services.js` still exists and the names would collide.
- **No `three` package yet.** It is added with T9.01, when something imports it.
- **Gating has three conditions for frameworks:** copy ready (`status: "live"`), delivery verified, and legal review recorded. All three must be true.

### Baseline (current site, built on `site-v2` before any visible change)

- 83 static generations, 74 HTML pages. Matches the 74 URLs in [03-current-sitemap.md](03-current-sitemap.md).
- First-load JavaScript: 103 kB shared; home 449 kB; `/services/[slug]` 419 kB; `/blog` 418 kB; `/work` 415 kB; `/contact` 380 kB; most other pages 361–369 kB. Middleware 34 kB.
- **Duplicate brand in titles confirmed** (the audit could not verify this): `/services` renders `Services - AlgoCrew | AlgoCrew`, and `/about`, `/contact`, `/blog` and `/hire` follow the same pattern. The fix is planned in 09 §7.
- `/hire` carries `noindex, follow` and is correctly absent from the sitemap.
- Canonical tags are self-referencing on the pages sampled.

### Open questions carried into Stage 2

1. Is the site hosted on Vercel? The middleware fix depends on `VERCEL_ENV`.
2. May the branch be committed and pushed, so CI and a preview deployment can be checked?

## Implementation Stage 2: Design system

This is the first stage that changes how existing pages look: the whole site is now light.

| Task | Status | What was done | Verified |
|---|---|---|---|
| T2.01 Tokens | Done | `src/resources/tokens.css`, loaded after Once UI and `custom.css`. Names checked for collisions with existing variables: none. | Values are the ones in 08 §3–5. |
| T2.02 Global CSS and theme | Done | `<html data-theme="light">`; the theme-init script now deletes any saved theme and sets light; `ThemeProvider theme="light"`; theme toggle removed from the old header. Removed: the transition on every element, the page-in animation on `<main>`, the noise overlay, and `scroll-behavior: smooth !important`. | Dev server: `/services`, `/about`, `/blog` render in light with no breakage. See the notes below for `/`, `/contact` and service detail pages. |
| T2.03 Type scale | Done | Size tokens plus the `Heading`, `Lead` and `Eyebrow` components; `text-wrap: balance` on headings. | Seen on the review page at 1440 px only. |
| T2.04–T2.06 Primitives | Done | `src/components/ui`: `Page`, `Container`, `Section`, `Grid`, `Split`, `Heading`, `Lead`, `Eyebrow`, `SectionHead`, `Button`, `ButtonRow`, `TextLink`, `Card`, `Chips`, `IconTile`, `Checklist`, `DefinitionCard`, `BoundaryStatement`, `Steps`, `Ledger`, `LedgerRow`, `DataTable`, `Faq`, `LogoRow`, `CtaBlock`. | Each one rendered and looked at on the review page, including the dark-section variants. |
| T2.07 Reveal | Done | One IntersectionObserver; hidden state applied only after mount and only below the fold; off under reduced motion. | Renders. The animation itself could not be observed: the preview pane's animation clock was stopped. |
| T2.08 Form primitives | Done | `TextField`, `SelectField`, `TextareaField`, `Checkbox`, `CheckboxGroup`, `FormRow`, `ErrorSummary`, `Notice`. Labels are always visible; help and error text are tied to the control with `aria-describedby`. | Default, error and success states seen on the review page. No real submission yet (that is T8.06). |
| T2.09 Review page | Done | `/design-system`. `noindex, nofollow`, not in the sitemap or any menu, and renders the not-found page when `VERCEL_ENV` is `production`. | Normal build: page present. (An earlier note here said "108 kB first-load JS". That figure was misleading: see the correction under Stage 3.) Build with `VERCEL_ENV=production`: review content absent. The HTTP status on a real production deployment is not verified. |
| T2.10 Lint rule | Done, differently | `npm run check:tokens` fails on any raw hex or `rgb()` value in site-v2 style modules (`ui.module.scss` and the future `layout`, `sections` and `diagrams` folders). Part of `scripts/site-checks.mjs`, not stylelint: no new dependency. Added to CI. Legacy stylesheets are not checked. | Unit test added. Passes on the branch, and exits 1 when a hex value is added to `ui.module.scss`. A first version written as a shell one-liner silently passed; it was replaced. |
| T2.11 Dark theme | Not needed | D-01 was decided as light only. | — |

### Deviations from the plan

- **One stylesheet for all primitives** (`ui.module.scss`) and three component files, not one folder per component as 09 §9 proposed. The set is small and nearly every page uses most of it.
- **`IconTile` takes the icon as a child.** `lucide-react` is added when the first icon is used (homepage pillar cards), not now.
- **New routes must be registered.** The existing `RouteGuard` blocks any path not listed in `once-ui.config.js`. `/cloud-platforms`, `/compliance`, `/our-approach`, `/trust` and `/design-system` were added there.
- **Once UI overrides link colors.** It ships `a:not(.button) { color: … }`, which beat the button and link classes. Link colors are restated one specificity step higher inside `.page` until Once UI's visual CSS is retired.
- **Every site-v2 page must be wrapped in `<Page>`.** The root layout places pages in a flex row.

### Notes on existing pages after the light switch

- **Service detail pages keep their dark hero.** `/services/cloud-devops` has a hero that is dark by its own styles, so it now sits dark inside a light site. These pages are rebuilt in implementation Stage 5.
- **`/contact` hero looked blank in the preview pane.** Its heading waits on a reveal animation and the pane's animation clock was stopped (`document.timeline.currentTime` was 0). The contact files are unchanged from `main`, so this is very likely the pane and not a regression, but it has not been confirmed in a normal browser.
- **`/` could not be viewed in the preview pane**: the pane showed a cached page from a different project that had used port 3000. The built HTML for `/` was checked instead (`data-theme="light"`, correct title).
- The old floating header overlaps the top of new pages. It is replaced at the layout switch (T3.11).

### Build after Stage 2

75 pages (74 plus the review page), 0 broken internal links, sitemap matches. Type check passes; lint has the same 2 warnings as before.

## Implementation Stage 3: Global components

Built and reviewed on `/design-system`. Not yet used by the public pages: the old header and footer stay until the layout switch (T3.11). The one exception is the consent banner, which is live in the root layout now.

| Task | Status | What was done | Verified |
|---|---|---|---|
| T3.01 Menu data | Done | `navigation.ts` builds header and footer menus from the gated data. `headerNav({ all: true })` returns the full approved menu for the review page only. Added the Cloud Platforms featured slot fallback (04 §8.3). | Full menu: 4 panels, 31 links in Services. Gated menu today: Services, Cloud Platforms and Insights as plain links, Company panel, no Compliance item. |
| T3.02 Header | Done | `layout/Header.tsx` (server). Every panel is in the server HTML. | Built HTML contains all four panels and their links. |
| T3.03 Mega menu | Done | `layout/MegaMenu.tsx` (client). Top-level items are real links to their hub page that become disclosure buttons after hydration. | Scripted checks in the browser: Tab from an open trigger lands in its panel; one panel at a time; Esc closes and returns focus; hover opens; a click after a hover-open keeps it open and the next click closes it. Seen at 1440 px. |
| T3.04 Mobile drawer | Done | `layout/MobileDrawer.tsx` (client). Accordion via native `<details name>`, scroll lock, `inert` on the rest of the page, focus trap, pages only (no anchor links). | At 375 px: opens under the bar and fills the screen, no horizontal overflow, Esc closes, focus returns to the menu button, scroll lock and `inert` are removed. |
| T3.05 Footer | Done | `layout/Footer.tsx` (server). Contact details and legal entity render only when set in `site.ts`. No stats strip. | Full footer: four link columns. Gated footer today: three columns with seven links. |
| T3.06 Breadcrumbs | Done | With BreadcrumbList JSON-LD built from the same trail. | Renders. JSON-LD not yet run through a validator. |
| T3.07 Jump links | Done | Sticky under the header, horizontal scroll on small screens. | Renders and sticks. Focus-not-obscured behaviour not yet tested on a long page. |
| T3.08 Consent | Done | `layout/ConsentBanner.tsx` replaces the unconditional Google Analytics and Tawk.to scripts in `layout.tsx`. Nothing loads until the visitor accepts; "Essential only" and "Accept" have equal weight; "Cookie settings" in the new footer reopens it. | Browser: no request to Google or Tawk before a choice or after declining; Google's tag loads after accepting; the footer button reopens the banner. Built HTML for `/` and `/services` contains no Google or Tawk reference. |
| T3.09 SEO helpers | Done | `seo/JsonLd.tsx`: `JsonLd`, `canonical()`, `organizationSchema()` (verified facts only), `breadcrumbSchema()`, `serviceSchema()`. | Type check only. |
| T3.10 Hero and form section | Deferred | Built with the first template that uses them (compliance pages), where their shape is known. | — |
| T3.11 Layout switch | Later | After the new pages exist. | — |

### Deviations and notes

- **"Cookie settings" is unreachable until the layout switch.** The button lives in the new footer. Until then a visitor can decide once but cannot reopen the banner. Acceptable on an unreleased branch; must not ship without the new footer.
- **Which processors run is still a business decision** (V-15, I-04). The banner text names Google Analytics and Tawk.to because those are what the code loads.
- **The link check skips `/design-system`.** That page shows the full menu, including pages not built yet. Before the exemption the check reported 38 broken links from it, which is the check working as intended.
- **Without JavaScript the mobile menu button does nothing.** The footer still links to every published page. Desktop top-level items work as plain links.
- **A second dev-server entry** (`algocrew-dev-3100`) was added to `.claude/launch.json`, because the preview pane kept loading a cached page from a different project on port 3000.

### Correction: first-load JavaScript

Stage 2 noted "108 kB first-load JS" for the review page. After Stage 3 the same page reports 366 kB, like every other page. The build manifest shows why: the page's own script is 6 kB plus 13 kB of CSS, and the rest is the shared root layout (old header, footer and UI library), which every page currently pays for. The real saving arrives at the layout switch, and should be measured then.

### Build after Stage 3

75 pages, 0 broken internal links (review page exempt), sitemap matches, 6 check tests pass, token check passes on 2 stylesheets, type check passes, lint unchanged at 2 warnings.

## Implementation Stage 7 (built fourth): Compliance pages

The first new public route. Design reference: `prototypes/compliance.html` and `prototypes/compliance-hipaa.html`. From this stage on, each built page is compared with its prototype in the browser before it is reported (client instruction, 2026-11-15: keep the prototypes' look, including the large headings).

| Task | Status | What was done | Verified |
|---|---|---|---|
| T7.01 Final copy | Not done (external) | Pages use the working draft from the approved prototypes. | — |
| T7.02 Framework data | Partly done | HIPAA has full draft content. GDPR, PCI DSS and PIPEDA have card and menu copy only. Added `SHARED_CONTROLS` and a `maps` list per requirement for the diagram. | Type check. |
| T7.03 Control map | Done | `diagrams/ControlMap.tsx`: server-rendered SVG from data, with the same content as a table under "View this map as a table". | Seen on the HIPAA preview with five requirements and four shared controls. |
| T7.04 Framework template | Done | `templates/FrameworkTemplate.tsx` and `/compliance/[slug]` with `dynamicParams = false`. A page is generated only when copy is ready, delivery is verified and legal review is recorded. | `/compliance/hipaa` returns 404; the build generates no framework page; no link or sitemap entry points to one. Template seen at `/design-system/framework` (HIPAA draft, all gates ignored, noindex, not-found on production). |
| T7.05 Compliance hub | Done | `/compliance`: hero with the boundary statement, jump links, six governance services with anchors, "what we do and do not", typical outputs, FAQ, call to action. The Compliance & Governance pillar is now `live`. | Built: one H1, title "Cloud Compliance & Governance Services \| AlgoCrew" (no duplicate brand), canonical `https://algocrew.io/compliance`, Service, BreadcrumbList and FAQPage structured data, in the sitemap. Anchors present: `boundaries`, `cloud-governance`, `security-governance`, `risk-management`, `assessments`, `policy-controls`, `audit-readiness`. |
| T7.06 Sections | Done | `sections/PageHero`, `FactRow`, `FrameworkCards`, `FrameworkQuickLinks`. `Deliverables` is a `Checklist` inside a `Split`, not a separate component. | Seen in both pages. |
| T7.07 Legal review | Not done (external) | Needs a qualified reviewer. `/design-system/framework` on a preview deployment is the page to review. | — |

### Match against the prototypes

- **Framework hero:** breadcrumb, mono tag, heading at the prototype's 72 px on a 1440 px screen, lead, two buttons and the fact row. One difference kept on purpose: the "Our role" cell uses the single shared boundary text (review R-22), which is longer than the prototype's.
- **Hub hero:** heading at 60 px as in the prototype, boundary statement full width under the button.
- **Hub with nothing verified:** no framework chips, no Frameworks section and no tool lists, which is the prototype's "nothing verified" state. `#frameworks` exists only once a framework page is published; no menu links to it.
- Checked at 1440 px and 375 px, no horizontal overflow on either page.

### Deviations

- **Call-to-action block, not an inline form,** at the foot of both pages. The contact form arrives with the Contact page (T8.06); these pages link to `/contact?topic=…`.
- **The old header still sits on top of these pages** until the layout switch.
- `RouteGuard` now also allows paths under `/design-system`.

### Build after this stage

77 pages, 0 broken internal links, sitemap matches, 6 check tests pass, token check passes on 4 stylesheets, type check passes, lint unchanged.

## Implementation Stage 6 (built fifth): Cloud platform pages

Design reference: `prototypes/platform-azure.html`. The overview page had no prototype; it reuses the homepage prototype's "One method across your clouds" section.

| Task | Status | What was done | Verified |
|---|---|---|---|
| T6.01 Final copy | Not done (external) | Azure uses the working draft from the prototype. AWS and Google Cloud have tool lists and menu copy only. | — |
| T6.02 Platform data | Partly done | Azure: seven sections with the anchors from 04 §5, framework notes, FAQ. Added `PLATFORM_SECTION_SUMMARY` for the overview page. | Type check; all seven anchors present on the Azure preview. |
| T6.03 Sections | Done | `sections/CapabilityIndex` (the numbered list beside the hero). Platform cards are `Card` in a `Grid`; the ledger is `Ledger` + `LedgerRow`. No partner-badge component yet: nothing renders in that slot until a held status exists (V-01). | Seen on the preview. |
| T6.04 Platform template | Done | `templates/PlatformTemplate.tsx` and `/cloud-platforms/[slug]` with `dynamicParams = false`. Generated only when copy is ready and delivery on that platform is verified. | `/cloud-platforms/azure` returns 404; the build generates no platform page. Template seen at `/design-system/platform` (Azure draft, gates ignored). |
| T6.05 Overview page | Done | `/cloud-platforms`: hero, cards for published platforms only, the seven capability areas, call to action. | Built: title "Cloud Platforms \| AlgoCrew", in the sitemap. With nothing verified the page body names no vendor (the only "AWS" in the HTML is the old layout's keywords tag, which goes in the SEO stage). |
| T6.06 Content gate review | Not done | Needs final copy. | — |

### Match against the prototype

- **Hero:** tinted band with a faint grid, breadcrumb, heading at 60 px on a 1440 px screen (same as the prototype), lead, one button, and the numbered "On Azure" index on the right.
- **Jump bar, "Where we recommend Azure", the seven-row ledger with tool lists, "Frameworks on Azure" cards and the boundary statement** follow the prototype's order and layout.
- **Differences kept on purpose:** no dashed partner-badge placeholder (placeholders never ship); three FAQ answers that depend on unverified practices are left out, so the Azure draft has one FAQ item.

### Cross-links

A link to a service page renders only when that page is published (`isServiceHrefLive`), and uses the target page's name as its text. Today, on the overview page, only the Governance row links out (to `/compliance`). This is the rule in 06 §4 and T5.09, applied early.

### Deviations

- The link check now skips everything under `/design-system/`, not only the index. The template previews ignore gates and so link to pages that are not built; the check reported 10 such links before the change.

### Build after this stage

79 pages, 0 broken internal links, sitemap matches, 6 check tests pass, token check passes on 4 stylesheets, type check passes, lint unchanged.

## Implementation Stage 5 (built sixth): Core service pages

Design references: `prototypes/service-devsecops.html` (capability) and `prototypes/pillar-cloud-security.html` (pillar).

| Task | Status | What was done | Verified |
|---|---|---|---|
| T5.01 Final copy | Not done (external) | Working draft written in `pillars.ts` for all five pillars and both capability pages. No "24/7" wording. | — |
| T5.02 Service data | Done | Problems, capability copy, deliverables, FAQ, method, tooling, engagement, risks, outputs, diagram per page. Pillars 1–3 and 5 and both capability pages are `live`. | Type check. |
| T5.03 Route switch | Done, with a deviation | `/services/[slug]` renders the pillar or capability template for the six new slugs. **The 15 legacy slugs keep rendering** until Stage 10, so the old header, footer and homepage never link to a missing page. No slug overlaps. | Build: 21 service pages (6 new + 15 legacy), 0 broken links. |
| T5.04 Pillar template | Done | Hero with problems list, jump bar, capability ledger with anchors, dark defense-in-depth section (security) or pipeline section (DevOps), outputs, platform and framework strips (live items only), FAQ, call to action. | Cloud Security matches its prototype: 60 px heading, problems list, five capabilities, dark layers section. |
| T5.05 Capability template | Done | Hero with pipeline diagram and at-a-glance row, who it's for, method ledger, tooling table (verified platforms only), outputs, engagement steps, risks, FAQ. | DevSecOps matches its prototype: 60 px heading, same diagram, same section order. Tooling section is absent while no platform is verified. |
| T5.06 Sections | Partly done | `ProblemsList`, `GlanceRow`. `NamedContact` not built: no role or name is verified (V-13), and a placeholder would not ship. `InsightsTeaser` left for the homepage. | — |
| T5.07 Defense in depth | Done | `diagrams/DefenseInDepth.tsx`, HTML and CSS, an ordered list read outermost first. | Seen on Cloud Security. |
| T5.08 Pipeline | Done | `diagrams/PipelineGates.tsx`, static SVG with a label; the flowing dash stops under reduced motion. | Seen on DevSecOps and DevOps. Scrolls inside its frame on phones, as in the prototype. |
| T5.09 Cross-links | Done | Platform and framework strips render only for live items; capability links only when the target page is live. | Today no platform or framework strip renders. |
| T5.10 Services hub | Done | `/services` rewritten: five practices with their capabilities, platform and framework strips (live only), call to action. "How engagements start" waits for `/our-approach`. | Title "Cloud Consulting, DevSecOps & Security Services \| AlgoCrew"; all 20 capability links resolve. |
| T5.11 Managed scope wording | Done | No "24/7" or round-the-clock claims. | Grep of the built page: none. |

Checked at 1440 px (DevSecOps, Cloud Security, DevOps, hub) and 375 px (all seven pages: one H1 each, no horizontal overflow). Not compared side by side: Cloud Consulting, Cloud Migration and Managed Cloud Services, which have no prototype.

### Build after this stage

85 pages, 0 broken internal links, sitemap matches, 6 check tests pass, token check passes, type check passes, lint unchanged at 2 warnings.

## Layout switch (T3.11)

| Change | Verified |
|---|---|
| Root layout now uses the site-v2 `Header` and `Footer` (`src/components/layout`). The old `Header.tsx`/`Footer.tsx` stay in the repo, unlinked, until the cleanup release. | Every page, old and new, shows one site header and one footer. The header stays pinned while scrolling; jump links sit under it. |
| `SmoothScroll` (Lenis) removed from `Providers`. | Old pages scroll normally. |
| The review page no longer renders its own header. | — |

**Deviation:** `RouteGuard` is **kept**. It still password-protects one `/work` page; removing it before the Stage 10 410s would make that page public. It goes with `/work` in Stage 10.

**Pre-existing, not caused here:** the old homepage logs a hydration warning (its industry illustration uses random numbers). It disappears with the homepage rebuild.

## Implementation Stage 8 (built seventh): Company and contact pages

| Task | Status | What was done | Verified |
|---|---|---|---|
| T8.02 Our Approach | Done | `/our-approach`: five steps with the "Secure · applied at every step" band (prototype homepage section), what each step produces, `#engagement-models` (scoped project, managed service; no prices), working together, `#faq`. | 60 px heading; anchors present; in the sitemap. |
| T8.03 About | Done | `/about` rebuilt: who we are, the five practices, what we do not do, `#clients` (logo row only with 3+ approved logos; until then a pointer to Our Approach), company facts only when verified. Unverified stats, timeline and "Top 1%" claims are gone. | Today: no logos, no company-facts section (nothing in `site.ts` is verified yet). |
| T8.04 Trust | Not built | Gated on V-14; the menu item stays hidden. | — |
| T8.05 Contact | Done | `/contact` rebuilt to match `prototypes/contact.html`: one form (name, work email, company, topic, clouds, message, consent), "what happens next", careers link. `?topic=` preselects the topic. The Hire-a-Developer, staffing and job-application tabs are unlinked. | Error summary lists each problem, links to each field and receives focus; fields get `aria-invalid` and a described error; a failed send keeps all text; hidden spam field is off-screen. |
| T8.06 Form backend | Done, needs configuration | `POST /api/contact`: shared validation (`src/resources/contact.ts`), honeypot, rate limit (5 per 10 minutes per IP, in memory), delivery through the EmailJS REST API using environment variables only. **The old form had its EmailJS keys and a personal email address in source; the new route reads them from the environment** (`.env.example` lists them). | Route tested: invalid input 422, spam trap 200 with nothing sent, bad JSON 400, sixth request in the window 429, missing configuration 503. 3 unit tests for the validation and topic mapping. **No real email sent:** the variables are not set locally. |
| T8.07 Careers, T8.08 legal pages, T8.09–T8.10 Insights, T8.11 404, T8.12 manifest | Not started | — | — |

### Things the business must supply before launch

- **EmailJS (or another provider) settings** in the hosting environment: `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`, `CONTACT_TO_EMAIL`, and "allow non-browser API calls" switched on in EmailJS. Until then every submission fails, with the text kept.
- **V-24 confirmation** for the Our Approach and Contact statements about how engagements run ("we agree a scope before any work starts", working in the client's accounts and repositories, handover).

### Build after these steps

86 pages, 0 broken internal links, sitemap matches (the check caught `/our-approach` missing from the sitemap; fixed), 9 tests pass, token check passes, type check passes, lint unchanged at 2 warnings. No Google or Tawk reference in the built Contact page.

## Implementation Stage 4 (built eighth): Homepage

Design reference: `prototypes/index.html`, in its "nothing verified" launch state.

| Task | Status | What was done | Verified |
|---|---|---|---|
| T4.01 Final copy | Not done (external) | Hero option A and the prototype's working copy. No statistics. | — |
| T4.02 Lifecycle | Done | `diagrams/Lifecycle.tsx`. Server HTML is an ordered list of the seven stages with their controls (complete without JavaScript); after hydration it becomes tabs with arrow keys, Home/End, roving focus and one labelled panel. Own stylesheet `lifecycle.module.scss`. | Keyboard: End selects Monitor, ArrowRight wraps to Plan, click selects Build; panel labelled by the selected tab. The no-JS list is in the built HTML. |
| T4.03 CSS layer stack | Done | `sections/HomeHero.tsx`: the prototype's three-plane stack and the layer list. Remains the fallback for the WebGL scene (T9.01). Stops floating under reduced motion. | Matches the prototype at 1440 px; scales down at 375 px. |
| T4.04 Homepage | Done | `src/app/page.tsx` rewritten in the prototype's order: hero, scope/method/role strip, five practices, platforms (verified only), lifecycle, compliance (frameworks when published, governance otherwise), approach, what you get, insights, call to action. Old homepage components are unlinked, not deleted. | Heading 76 px on a 1440 px screen, the same as the prototype. One H1. Title "AlgoCrew \| Cloud Engineering, DevSecOps, Security & Compliance". No old claims ("Top 1%", "digital experiences") in the built page. |

### Result

- **First-load JavaScript for `/`: 367 kB, down from 449 kB** at the baseline (Stage 1).
- The old homepage's hydration warning is gone with it.
- In the "nothing verified" state the platforms section is absent and the compliance section shows governance, as in the prototype.

### Fixed during this stage

- **Cards in "What you get" were staggered.** A spacing rule for stacked text in split layouts also applied inside card grids. Scoped it to non-grid blocks.

### Note for whoever previews the site locally

The preview browser had an old service worker registered for `localhost:3100`, which served a stale copy of the homepage script and made the new page crash with "Cannot read properties of undefined (reading 'call')". Unregistering it fixed it. The site itself registers no service worker, so this does not affect visitors.

### Build after this stage

86 pages, 0 broken internal links, sitemap matches, 9 tests pass, token check passes on 6 stylesheets, type check passes, lint unchanged.

## Implementation Stage 9: Motion, 3D and responsive pass

| Task | Status | What was done | Verified |
|---|---|---|---|
| T9.01 3D hero | Done | `diagrams/layeredPlatformScene.ts`: the approved layered-platform scene in plain three.js with named imports (no React Three Fiber, 08 §10.2). Colours read from the CSS tokens. `diagrams/HeroScene.tsx` keeps the old wrapper's gating: 860 px and wider, no reduced motion, WebGL available, loaded after idle, paused off screen, disposed on unmount. The CSS stack stays as the server-rendered fallback inside a fixed-height box (no layout shift on swap). `three` added; `@types/three` as a dev dependency. | WebGL scene renders at desktop width; the three.js code arrives as its own file; at 320 px the CSS stack shows and no WebGL loads. |
| T9.02 3D budget | Done | — | **Real build: two lazy chunks, 51 KB + 81 KB = 132 KB gzip**, under the 150 KB budget. Not in the homepage's first-load bundle (homepage 368 kB, up 1 kB for the wrapper). Frame rate not profiled. |
| T9.03 Scroll reveal | Done, differently | `layout/MotionScope.tsx`, once in the root layout: blocks marked `data-reveal` (section heads, cards, steps, ledger rows, checklists, framework cards, diagrams, CTA) fade and rise once; 60 ms stagger capped at four. Nothing on screen at load is hidden; without JavaScript nothing is hidden; reduced motion turns it off. Replaces the per-block `Reveal` component (deleted). | 23 blocks waiting below the fold on the homepage, 0 hidden on screen; blocks switch to visible on scroll. |
| T9.04 Ambient loops | Done | Blocks marked `data-ambient` (pipeline dash, defense-in-depth rings, hero float) pause while off screen; reduced motion stops them in CSS. | Off-screen pause observed on the hidden CSS stack. Reduced-motion behaviour checked in code only (the preview pane cannot emulate it). |
| T9.05 Scroll-linked pipeline | Skipped | P2, optional. | — |
| T9.06 Responsive pass | Done | Fixed: header items wrapped onto two lines between 1024 and ~1100 px. Items no longer wrap; the short "Talk to us" button is used up to 1279 px. | All 15 site-v2 pages at 320, 640, 1024 and 1280 px (and three at 375 px): no horizontal overflow outside scroll strips, header one line high. 1440 px checked page by page in earlier stages. 200% zoom not tested separately (equivalent to the 640 px layout). |

### Notes

- **The uncommitted WIP crystal** (`src/components/home/three/*`, `Hero.tsx`) is still in the repo, excluded from type-checking and unused. The new scene does not import it. It can be deleted at the cleanup release or kept as reference; that is the owner's call.
- **Dev preview caching:** the preview browser twice served a stale homepage script after large changes (once through an old service worker, once from its HTTP cache). Forcing a reload of the chunk fixed it. Production builds use hashed file names, so visitors are not affected.

### Build after this stage

86 pages, 0 broken internal links, sitemap matches, 9 tests pass, token check passes on 7 stylesheets, type check passes, lint unchanged.

## Implementation Stage 10: SEO and route migration

| Task | Status | What was done | Verified |
|---|---|---|---|
| T10.01 Metadata | Done for site-v2, Insights, Careers, legal | Page titles no longer repeat the brand (the layout adds "\| AlgoCrew"). Site-wide default title and description replaced (they still described the old agency). | Built titles: "Insights \| AlgoCrew", "Careers \| AlgoCrew", "Privacy Policy \| AlgoCrew", post titles without a second brand. |
| T10.02 Structured data | Partly done | Layout Organization schema now comes from `site.ts` (verified facts only: today just name and URL; no unverified email, phone, address, founding date or social profiles). WebSite kept. Old `ServiceSchema` gone with the legacy service pages. | Built homepage: Organization with name and URL only. Blog posting and Careers JobPosting schemas not reviewed yet (T8.07, T8.09). |
| T10.03 Sitemap | Done | Rewritten from the gated data: v2 pages, live services, platforms and frameworks, 16 listed posts with real `lastModified`, legal pages. No images, no hidden or retired posts, no redirect sources. | 33 URLs; `check:sitemap` passes. |
| T10.04 robots.txt | Done | `Allow: /api/og/`, `Disallow: /api/`, `Host:` removed, sitemap kept. | Matches 05 §3. |
| T10.06 Redirects | Done, in middleware | The 12 redirects of 05 plus `/projects` → `/about`, as **301**, in `src/middleware.ts` from `src/resources/routeMigration.ts`. #16/#17 point to the framework page when published, else `/compliance`. The old `/projects` → `/work` rule in `next.config.mjs` is removed (it created a two-hop chain). Host and path redirects are combined, so `www.algocrew.io/pricing` reaches its target in one hop. | Production server: every redirect returns 301 to a page that returns 200; `www` + old path is one 301. Unit test: no redirect points at another redirect or a gone page. |
| T10.07 410 Gone | Done | 32 paths of 05 plus everything under `/work/` and `/projects/` return 410 with a short page linking to Home, Services and Contact, and `X-Robots-Tag: noindex`. | Production server: all 32 return 410. |
| T10.08 Stop building gone pages | Done | `pricing`, `faq`, `hire`, `locations`, `work` and the two password API routes moved (with `git mv`) to `src/legacy/app-routes/`; `/services/[slug]` builds only the six new services; retired posts are not built; `dynamicParams = false` on every slug route. | Build: 42 pages (was 86). Unknown service or post slugs return 404. |
| T10.09 Hidden posts | Done | Six posts: built, `noindex, follow`, left out of the listing, related posts and sitemap. | Built HTML of a hidden post: `noindex, follow`; a retained post: `index, follow`. |
| T10.10 Route config | Done | `routes` lists only published sections; `protectedRoutes` empty. `RouteGuard` removed from the layout (its only job was the retired `/work` page). | — |
| T10.11 Keywords meta | Done | Both keyword lists removed from the layout. | No `name="keywords"` in the built HTML. |
| T10.05 OG image restyle, T10.13 CSP | Not done | Both P1. | — |
| T10.12 Search Console | Blocked | Needs access. | — |
| T10.14 Internal links | Done for links; orphan check not run | Blog bodies: 12 × `/services/cloud-devops` → `/services/devops`, 6 × `/services/security-quality` → `/services/cloud-security`, `/services/team-services` and `/pricing` → `/our-approach#engagement-models`; 53 links to retired services, the portfolio, retired posts and hidden posts unwrapped (text kept). The old staffing call-to-action (`SendUsEmail`, which linked to `/hire`) replaced on Insights, posts and Careers. Careers links to `/work` and the 404 page's Work and Pricing links replaced. | `check:links`: 0 broken across 42 pages (it reported 54 before the clean-up). |

**Every row of 05 was requested against a production build (`next start`): 74 of 74 returned the expected status** (200 for kept and hidden pages, 301 for redirects, 410 for retired pages).

### Not done or still open

- **The 32 "410 Gone" decisions have not been checked against Search Console** (T1.06, blocked on access). Any retired URL with real backlinks should become a redirect before launch; the list is one file.
- **Careers copy** still says "elite engineers" and lists unverified perks (T8.07).
- **Insights categories** are still the old ones (Engineering Culture, AI/ML, Mobile…); recategorizing is T8.09.
- `/services/x/` with a trailing slash goes through Next.js's own 308 first, then the 301: two hops for that rare form only.

### Build after this stage

42 pages, 0 broken internal links, sitemap matches (33 URLs), 12 tests pass, token check passes, type check passes, lint unchanged.

## Implementation Stage 11: QA

Full report: `15-qa-report.md`.

| Task | Status | What was done | Verified |
|---|---|---|---|
| T11.02 Automated checks | Done | Type check, tests, links, sitemap, tokens, SEO tag scan, content scan. | All pass; content-scan hits are only on legal pages and hidden posts (launch blockers B1–B3). |
| T11.03 Accessibility | Done, with limits | axe-core (WCAG A/AA) on 19 templates; fixed colour-only links, old cyan text colour, missing `<main>` landmark. | 0 violations. Real Tab order, focus ring and screen readers not tested (pane limitation). |
| T11.04 Performance | Partly done | Fixed the `/contact` layout shift (0.151 → 0) and the form missing from the static HTML. First-load JavaScript recorded as an exception (at or below baseline). | CLS 0 on five templates; LCP element is the H1. LCP time not measurable in a hidden pane. |
| T11.05 Console and assets | Done | 36 pages on the production server. Old-business wording removed from `manifest.json`. | 0 script errors; all referenced assets 200. |
| T11.01 Hosted release candidate, devices, sign-offs | Blocked | Needs hosting access, devices and the client items in 15 §3. | — |

### Build after this stage

42 pages, 0 broken internal links, sitemap matches (33 URLs), 12 tests pass, token check passes, type check passes.

## Workflow stage 7: Final review

Full review: `16-final-review.md`. Two defects fixed:
- the contact form now posts (personal data could reach the URL before hydration);
- the root font stays 16px below 1024px, so mobile and tablet sizes match the prototypes.

Eight open findings are ranked there, none blocking. Checks after the fixes: type check, 12 tests, 0 broken links, sitemap matches, token check passes, no horizontal overflow on 33 pages at 320/768/1024/1440 px.

Follow-up fixes from the review: O1, plain form posts get a readable result page from `/api/contact`; O5, the 3D scene cannot mount twice. Verified with curl (9 cases), a scripted submit with JavaScript on, and a width change across 860 px during load.

### Change after launch: lifecycle auto-advance (owner request, 2026-11-15)

The homepage lifecycle now moves to the next stage every 6 seconds. This is a deliberate exception to 08 §8 ("no autoplaying carousels"), requested by the owner. It is built to meet WCAG 2.2.2 (Pause, Stop, Hide):
- it runs only while the section is at least half on screen;
- it pauses while the pointer is over it or focus is inside it;
- it stops for good once the visitor selects a stage (click or keys);
- it is off when reduced motion is set;
- it never moves keyboard focus and does not announce changes.

Verified on a production build: stage 01 → 02 → 03 at about 6-second steps while in view; no movement off screen; paused under hover and focus; stays on the clicked stage. Resume after the pointer leaves could not be confirmed in the hidden preview pane (it does not paint, so the on-screen check stalls); check it in a normal browser.

## Design refresh: homepage (owner request, 2026-11-15)

Design note: `17-design-refresh.md`. The homepage keeps its hero, scope strip, lifecycle and closing CTA. Changed or added:

| Section | Change | Files |
|---|---|---|
| Capabilities | Mixed grid: one tall featured card with a drawing, four smaller cards | `sections/HomeSections.tsx` (`PracticeBento`) |
| Compliance | Links as rows, beside a "requirement → control → check → evidence" flow | `ComplianceSplit` |
| Method | Connected timeline (vertical on phones) | `MethodTimeline` |
| Outputs | Inset tinted panel; each output has a drawn preview | `OutputArtifacts` |
| Engagement models | New on the homepage | `EngagementPanels`, `resources/engagement.ts` |
| Insights | One featured post and two rows | `InsightsFeature` |
| FAQ | New on the homepage (no FAQ schema here; `/our-approach` keeps it) | `Faq`, `resources/engagement.ts` |

Engagement and FAQ copy now lives in `src/resources/engagement.ts`, used by both pages. Not added, because the content rules forbid them until verified: a three-cloud band, an industries or frameworks grid, statistics, logos, testimonials.

Verified on a production build: desktop (1440) and phone (375) screenshots of every changed section; no horizontal overflow at 320, 768, 1024 and 1440 px; 12 tests, links, tokens and type check pass; one H1. Not re-run: the axe scan (blocked in this session) and Lighthouse.

## Design refresh: rollout to inner pages (2026-11-15)

Details in `17-design-refresh.md` ("Rollout to the other pages"). The shared blocks `Steps`, `Ledger`, `Checklist` and `Card` were restyled and a new `Inset` panel added (`src/components/ui`), so every site-v2 page changed without page-by-page layouts. The homepage's own timeline and panel were removed in favour of the shared ones. About, Our Approach and the service template got one page-specific change each.

Verified on a production build: screenshots of Services, a service page, a pillar page, Compliance, About, Our Approach and Careers at 1440 px, and a service page at 375 px; no horizontal overflow on 21 pages at 320, 768, 1024 and 1440 px (84 checks, including the design-system review pages and one post); 12 tests, links, sitemap, tokens and type check pass. Not re-run: axe and Lighthouse. Insights, posts and the legal pages are not restyled.

## Owner change request "AlgoCrew Website Changes in Plain English" (2026-11-18), first pass (2026-11-19)

Done (no new facts needed):
- Phone menu lists every service page (Cloud Migration and DevSecOps were missing); one name per service everywhere (menu said "Cloud Security" and "Migration & Modernization").
- Cookie banner is a slim bottom strip on phones (19% of a 375×812 screen, was about half).
- Insights: filters built from published posts only (All, DevOps, Engineering, Security); "2025" removed from published titles and one description. Slugs unchanged. "OWASP Top 10 2025" kept: it is the list's edition name.
- Content-Security-Policy header (upgrade-insecure-requests, frame-ancestors, base-uri, object-src, form-action). Script sources not restricted (T10.13). HSTS was already sent.
- Organization schema: logo and address. City filled from the owner's request: Brampton, Ontario (shows in footer, About and schema).
- Reply promise renders beside the homepage's last button once `site.responseTime` is set. LinkedIn link label and icon ready for `site.social.linkedin`.
- Phones: mono labels 12–13px (were 11–12px); blog labels at least 12px (were 9–11px); breadcrumb and blog back links 24px tall.

Waiting on the owner (data only, already wired in `site.ts`): email, phone, LinkedIn URL, booking link, reply time, founding year. Waiting on content and decisions: team, case studies, proof results, industries, price, certifications and badges, which clouds and standards (gating V-03; SOC 2 and ISO 27001 are new frameworks with no page content), starter offer, blog authors and new posts, cookieless visitor counting (conflicts with "nothing loads before consent"), Search Console recrawl.

## Homepage lifecycle redesign (owner request, 2026-11-19)

The owner found the stage tabs static ("buttons not looks are button… not looks like it is slider") and pointed to three process-diagram references (staggered pills, a loop, a vertical timeline). Rebuilt `diagrams/Lifecycle.tsx` as two views of the same seven stages:

- **Loop, 1024px and wider:** seven icon nodes on a ring around a "Security at every stage" hub, with dashed arrows between them. The arc to the next stage draws over 6 seconds, and its `animationend` advances the loop, so the animation is the timer. The side panel shows the stage's icon, a one-line purpose and its four controls. Play/pause, previous/next and a counter sit above the panel.
- **Timeline, below 1024px and before the script loads:** icon rings on a vertical line, with every stage's purpose and controls visible. No slider on phones.
- **Colour:** each stage takes a step from periwinkle to cyan, mixed from existing tokens.
- **Accessibility:** follows the WAI-ARIA APG tabbed-carousel pattern. Play/pause comes first in the tab order. Hover pauses. Keyboard focus or choosing a stage stops rotation until Play is pressed. Rotation starts stopped with reduced motion. The panel is `aria-live="polite"` only while stopped. Only one view is displayed at a time.
- **New copy:** a one-line purpose per stage, describing method and making no claims.

Verified on a production build at 1440 (advancing, done arcs and the active glow), at 800 and at 375: the timeline shows with no overflow. On the loop: Next, Previous, a stage click and the Left arrow key each select the right stage, stop rotation and set the panel to polite; Play restarts. No console errors. Hover pausing was checked with the real pointer on the previous version, which used the same handlers. Not re-verified on the loop version: keyboard order with a real Tab key (the pane limitation), and a screen reader.

## Insights page and header button (owner request, 2026-11-20)

- **Header button hover:** the text turned dark on hover because Once UI's `a:not(.button):hover` has the same specificity and loads later. The hover now sets the white text explicitly, with a slight lift and shadow. A simulated run of that Once UI rule over every link on eight pages showed the header button was the only link it affected.
- **Insights (`/blog`)** rebuilt on the site-v2 system (`sections/InsightsList.tsx`, `sections/insights.module.scss`). Changes:
  - The standard page hero, with copy in the new positioning (the old hero said "senior-only teams… AI").
  - The newest article is featured.
  - Topic filters show counts, plus a title search with an empty state.
  - A three-column card grid.
  - Each topic has a drawn cover (DevOps: pipeline with gates; Security: layers around a shield; Engineering: stacked layers), varied per article.
- **Fixed:** the featured article was repeated as the first grid card, because the post flagged `featured` is hidden, so the fallback article was not excluded from the grid.
- **Lighter page:** the browser now receives summaries only. The route's own script went from 58.8 kB to 3.1 kB.
- **Cleanup:** `app/blog/BlogClient.tsx` and the `categories` export were removed, and 41 listing rules were removed from `blog.module.scss` (the article page keeps its styles).

Verified on a production build:
- **Desktop and phone screenshots.**
- **Filtering:** Security 6, a search for "terraform" finds 1, a search with no matches shows the empty state, and reset works.
- **Accuracy:** no duplicate articles. The polite live region announces the count.
- **Checks:** links, sitemap, tests and tokens pass.
