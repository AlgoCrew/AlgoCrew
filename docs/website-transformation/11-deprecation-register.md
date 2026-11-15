Stage 5 deliverable. Status: awaiting review.

# 11 — Deprecation Register

Every service, route, navigation entry, section, component, data file, asset, dependency, claim, copy pattern, metadata item and structured-data item that the plan removes, hides or deprecates. Route decisions are taken from [05](05-route-migration.md) and cited by row number (`05#n`). Nothing in this register contradicts 05. Stages refer to the roadmap in [10](10-implementation-roadmap.md); "Cleanup" is task T11.14, after launch.

**Nothing listed here has been changed.** Every entry has status Proposed.

## How to read the register

**Actions**

| Action | Meaning |
|---|---|
| Unlink | No live page, menu or component imports or links to it. The file stays in the repo. |
| Hide | Not linked, not in the sitemap. URL behavior is given by the paired 05 action. |
| Redirect 301 | Permanent redirect per 05 (status per I-02/I-03 in 10). |
| 410 | Gone, served by middleware per 05. |
| noindex | Page resolves with `robots: noindex, follow`, excluded from listing, related posts and sitemap. |
| Replace | A new component, copy or value takes its place in the same role. |
| Remove at cleanup | Deleted in the cleanup release (T11.14), after launch checks pass. |
| Keep unreferenced | Stays in the repo with no live reference, for possible reuse; reviewed again at cleanup. |

Where two actions apply, they are given in order, for example "Unlink → Remove at cleanup".

**Types:** the eleven types in the brief (service, route, nav entry, homepage section, component, data, asset, dependency, claim, metadata, structured data), plus two added types: **copy** (retired wording patterns, 07 §2) and **config** (tooling and build configuration).

**Path verification:** every file path in this register was checked to exist in the working copy on 2026-11-11, unless marked **[unverified]**. Line numbers come from 01 and were spot-checked. Where the check found a different line, the checked line is given and marked **[line checked]**.

---

## 1. Deprecated services

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-001 | General web development (web apps, custom websites, WordPress) | service | `src/resources/categorizedServices.js:2-37` (`web-app-development`); `src/resources/services.js` (dead) | Outside the cloud, DevSecOps, security and compliance focus (06 §6) | Unlink → 410 (route DEP-031) | None. The "Cloud Native" include survives only as pillar 1 `#cloud-native` (06 §5) | 05 approval (T0.06) | 5, 10 | Proposed |
| DEP-002 | Mobile app development (React Native, Flutter, Kotlin, Swift) | service | Inside `web-app-development`; tech marquees (DEP-110, DEP-116); careers role (DEP-174); blog post (DEP-068) | Deprecated line (06 §6) | Unlink → 410 | None | T0.06 | 4, 5, 8, 10 | Proposed |
| DEP-003 | UI/UX and creative design | service | `web-app-development` includes; `services.js`; careers UX/UI role (DEP-174); hire-form role (DEP-123) | Deprecated line (01 header, 06 §6) | Unlink | None | T0.06 | 5, 8 | Proposed |
| DEP-004 | SaaS product development | service | `categorizedServices.js:350-381` (`saas-development`) | Product build, not cloud engineering | Unlink → 410 (DEP-037) | None | T0.06 | 5, 10 | Proposed |
| DEP-005 | Startup MVP development | service | `categorizedServices.js:382-413` (`startup-mvp-development`); `/pricing` Sprint plan; `/faq` MVP answers | Product build | Unlink → 410 (DEP-038) | None | T0.06 | 5, 10 | Proposed |
| DEP-006 | "Product Engineering" (umbrella label for web, mobile, SaaS) | service | `src/components/Footer.tsx:16`; `src/components/services/Services.tsx:22` (panel 02) | Generalist label | Replace | Pillar links (04 §9) | A-01 | 3, 4 | Proposed |
| DEP-007 | E-commerce (Shopify, WooCommerce, headless commerce, marketplaces) | service | `categorizedServices.js:72-102` (`e-commerce`) and `:446-477` (`ecommerce-development`) | Deprecated; two duplicate entries | Unlink → 410 (DEP-032, DEP-033) | None | T0.06 | 5, 10 | Proposed |
| DEP-008 | Gaming and game design (Unity, Unreal, game art, Web3) | service | `categorizedServices.js:284-315` (`gaming`); `services.js`; `icons.ts:74` | Deprecated | Unlink → 410 (DEP-036) | None | T0.06 | 5, 10 | Proposed |
| DEP-009 | Digital marketing (SEO, social, PPC, influencer, CRO) | service | `categorizedServices.js:193-226` (`digital-marketing`) | Deprecated | Unlink → 410 (DEP-034) | None | T0.06 | 5, 10 | Proposed |
| DEP-010 | Emerging tech (metaverse, AR/VR, blockchain) | service | `categorizedServices.js:255-283` (`emerging-tech`); home "Data & AI" panel tags | Deprecated | Unlink → 410 (DEP-035) | None | T0.06 | 4, 5, 10 | Proposed |
| DEP-011 | Data, AI and automation (GenAI, BI, RPA, Power Apps) and the "AI-first" positioning | service | `categorizedServices.js:134-164` (`data-automation`); `AboutVision.tsx:9`; `WhyChooseUs`; home FAQ | Outside the new focus (05#19) | Unlink → 410 (DEP-029) | None | T0.06 | 4, 5, 8, 10 | Proposed |
| DEP-012 | Microsoft D365 ERP/CRM and Power Apps | service | `categorizedServices.js:165-192` (`microsoft-solutions`) | Not Azure infrastructure (05#20) | Unlink → 410, or 301 → `/cloud-platforms/azure` if V-03 shows overlap | None, or Azure page | V-03, 05#20 switch | 5, 10 | Proposed |
| DEP-013 | Staffing: staff augmentation, dedicated teams, "hire a developer", "Strategic Staffing" | service | `categorizedServices.js:227-254` (`team-services`); `/hire`; `HireDeveloperForm.tsx`; `Services.tsx:12` (panel 01); `Footer.tsx:19` | Retired as a service (A-06) | Unlink → Redirect 301 (DEP-028, DEP-019) | `/our-approach#engagement-models` ("embedded engineers" only if A-06 keeps it) | A-06 | 4, 5, 8, 10 | Proposed |
| DEP-014 | QA, manual and automation testing | service | `categorizedServices.js:103-133` (`security-quality` includes) | Dropped in the merge to Cloud Security (05#15, 06 §5) | Unlink | None | T0.06 | 5 | Proposed |
| DEP-015 | Fintech software builds (payment platforms, banking dashboards, crypto) | service | `categorizedServices.js:318-349` (`fintech-software-development`) | Only the PCI DSS angle survives (05#16) | Unlink → Redirect 301 (DEP-026) | `/compliance/pci-dss` [fallback `/compliance`] | V-03, T7.07 | 5, 10 | Proposed |
| DEP-016 | Healthcare software builds (patient portals, telemedicine, EHR) | service | `categorizedServices.js:414-445` (`healthcare-software-development`) | Only the HIPAA angle survives (05#17) | Unlink → Redirect 301 (DEP-027) | `/compliance/hipaa` [fallback `/compliance`] | V-03, T7.07 | 5, 10 | Proposed |
| DEP-017 | Generic "IT consulting" | service | `ContactForm.tsx:138-143` option; `team-services` includes | Absorbed by pillar 1 (06 §5) | Replace | Cloud Consulting & Engineering | T0.06 | 5, 8 | Proposed |
| DEP-018 | Build-team pricing plans (Sprint $8,000, Studio $14,000, Enterprise) | service | `src/app/pricing/page.tsx:29-34`, `PricingClient.tsx` | Prices do not apply to cloud engagements; three contradictory price sets (A-07) | Unlink → Redirect 301 (DEP-020) | `/our-approach#engagement-models`, no prices | A-07, V-04 | 8, 10 | Proposed |

## 2. Routes

Every row of 05 whose action is not "None", plus the endpoints in 05 §1.6. Route folders stay in the repo (unlinked, no longer generated) until cleanup.

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-019 | `/hire` (05#5) | route | `src/app/hire/page.tsx` | Merge into the single contact form | Redirect 301 → Remove at cleanup | `/contact` | A-06 | 10 | Proposed |
| DEP-020 | `/pricing` (05#6) | route | `src/app/pricing/page.tsx`, `PricingClient.tsx`, module styles | Retire (A-07) | Redirect 301 → Remove at cleanup | `/our-approach#engagement-models` | A-07 | 10 | Proposed |
| DEP-021 | `/faq` (05#8) | route | `src/app/faq/page.tsx` | Merge | Redirect 301 → Remove at cleanup | `/our-approach#faq` | T0.06 | 10 | Proposed |
| DEP-022 | `/locations` (05#9) | route | `src/app/locations/page.tsx` | Merge (A-11) | Redirect 301 → Remove at cleanup | `/about` | A-11 | 10 | Proposed |
| DEP-023 | `/work` (05#11) | route | `src/app/work/page.tsx` | Hide portfolio (A-12) | Redirect 301 → Remove at cleanup | `/about` | A-12 | 10 | Proposed |
| DEP-024 | `/services/cloud-devops` (05#14) | route | `/services/[slug]` from `categorizedServices.js:38` | Merge | Redirect 301 | `/services/devops` | T0.06 | 10 | Proposed |
| DEP-025 | `/services/security-quality` (05#15) | route | `categorizedServices.js:103` | Merge | Redirect 301 | `/services/cloud-security` | T0.06 | 10 | Proposed |
| DEP-026 | `/services/fintech-software-development` (05#16) | route | `categorizedServices.js:318` | Merge | Redirect 301 | `/compliance/pci-dss` [fallback `/compliance`] | V-03, T7.07 | 10 | Proposed |
| DEP-027 | `/services/healthcare-software-development` (05#17) | route | `categorizedServices.js:414` | Merge | Redirect 301 | `/compliance/hipaa` [fallback `/compliance`] | V-03, T7.07 | 10 | Proposed |
| DEP-028 | `/services/team-services` (05#18) | route | `categorizedServices.js:227` | Merge (A-06) | Redirect 301 (410 if the client rejects any staffing mention) | `/our-approach#engagement-models` | A-06 | 10 | Proposed |
| DEP-029 | `/services/data-automation` (05#19) | route | `categorizedServices.js:134` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-030 | `/services/microsoft-solutions` (05#20) | route | `categorizedServices.js:165` | Retire | 410 (or 301 → `/cloud-platforms/azure` if V-03) | — | V-03 | 10 | Proposed |
| DEP-031 | `/services/web-app-development` (05#21) | route | `categorizedServices.js:2` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-032 | `/services/e-commerce` (05#22) | route | `categorizedServices.js:72` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-033 | `/services/ecommerce-development` (05#23) | route | `categorizedServices.js:446` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-034 | `/services/digital-marketing` (05#24) | route | `categorizedServices.js:193` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-035 | `/services/emerging-tech` (05#25) | route | `categorizedServices.js:255` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-036 | `/services/gaming` (05#26) | route | `categorizedServices.js:284` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-037 | `/services/saas-development` (05#27) | route | `categorizedServices.js:350` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-038 | `/services/startup-mvp-development` (05#28) | route | `categorizedServices.js:382` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-039 | `/work/localised` (05#29) | route | `src/app/work/[slug]/page.tsx` from `ourProjects.js` | Hide | 410 | — | A-12 | 10 | Proposed |
| DEP-040 | `/work/boxo` (05#30) | route | same | Hide | 410 | — | A-12 | 10 | Proposed |
| DEP-041 | `/work/stay-with-lumina` (05#31) | route | same | Hide | 410 | — | A-12 | 10 | Proposed |
| DEP-042 | `/work/cashcloud` (05#32) | route | same | Hide | 410 | — | A-12 | 10 | Proposed |
| DEP-043 | `/work/outreside` (05#33) | route | same | Hide | 410 | — | A-12 | 10 | Proposed |
| DEP-044 | `/work/nice2stay` (05#34) | route | same | Hide | 410 | — | A-12 | 10 | Proposed |
| DEP-045 | `/work/codly` (05#35) | route | same | Hide | 410 | — | A-12 | 10 | Proposed |
| DEP-046 | `/work/alert-management` (05#36) | route | same | Hide | 410 | — | A-12 | 10 | Proposed |
| DEP-047 | `/work/deeplawn` (05#37) | route | same | Hide | 410 | — | A-12 | 10 | Proposed |
| DEP-048 | `/locations/software-agency-canada` (05#38) | route | `src/app/locations/[slug]/page.tsx` from `locations.ts` | Merge | Redirect 301 | `/about` (PIPEDA FAQ content → `/compliance/pipeda`) | A-11 | 10 | Proposed |
| DEP-049 | `/locations/software-agency-toronto` (05#39) | route | same | Merge | Redirect 301 | `/about` | A-11, V-10 | 10 | Proposed |
| DEP-050 | `/locations/software-agency-united-states` (05#40) | route | same | Retire | 410 | — | A-11 | 10 | Proposed |
| DEP-051 | `/locations/software-agency-united-kingdom` (05#41) | route | same | Retire | 410 | — | A-11 | 10 | Proposed |
| DEP-052 | `/locations/software-agency-australia` (05#42) | route | same | Retire | 410 | — | A-11 | 10 | Proposed |
| DEP-053 | `/blog/why-senior-only-teams-ship-faster` (05#59) | route | `src/resources/blog.ts` | Hide | noindex | Stays resolvable; may be linked from Careers | I-05 | 8, 10 | Proposed |
| DEP-054 | `/blog/async-first-engineering-culture` (05#60) | route | `blog.ts` | Hide | noindex | same | I-05 | 8, 10 | Proposed |
| DEP-055 | `/blog/code-review-culture-that-ships` (05#61) | route | `blog.ts` | Hide | noindex | same | I-05 | 8, 10 | Proposed |
| DEP-056 | `/blog/hiring-senior-engineers-remotely` (05#62) | route | `blog.ts` | Hide | noindex | same | I-05 | 8, 10 | Proposed |
| DEP-057 | `/blog/milestone-billing-vs-hourly` (05#63) | route | `blog.ts` | Hide | noindex | same | I-05 | 8, 10 | Proposed |
| DEP-058 | `/blog/technical-debt-is-not-always-bad` (05#64) | route | `blog.ts` | Hide | noindex | same | I-05 | 8, 10 | Proposed |
| DEP-059 | `/blog/database-performance-optimisation` (05#65) | route | `blog.ts` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-060 | `/blog/redis-patterns-production` (05#66) | route | `blog.ts` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-061 | `/blog/postgres-vs-mongodb-choose-right` (05#67) | route | `blog.ts` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-062 | `/blog/building-ai-features-that-actually-work` (05#68) | route | `blog.ts` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-063 | `/blog/nextjs-15-app-router-production-lessons` (05#69) | route | `blog.ts` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-064 | `/blog/typescript-advanced-patterns-2025` (05#70) | route | `blog.ts` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-065 | `/blog/web-performance-core-web-vitals-2025` (05#71) | route | `blog.ts` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-066 | `/blog/graphql-vs-rest-2025` (05#72) | route | `blog.ts` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-067 | `/blog/how-to-scope-an-mvp-correctly` (05#73) | route | `blog.ts` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-068 | `/blog/react-native-vs-flutter-2025` (05#74) | route | `blog.ts` | Retire | 410 | — | T1.06 | 10 | Proposed |
| DEP-069 | `/api/authenticate` (POST) (05 §1.6) | route | `src/app/api/authenticate/route.ts` | Password gate protects nothing; constant cookie | Unlink → Remove at cleanup (404) | — | T0.06 | 10, Cleanup | Proposed |
| DEP-070 | `/api/check-auth` (GET) (05 §1.6) | route | `src/app/api/check-auth/route.ts` | Same | Unlink → Remove at cleanup (404) | — | T0.06 | 10, Cleanup | Proposed |
| DEP-071 | `/projects` → `/work` config redirect (05 §1.6) | route | `next.config.mjs:29-34` | Target is hidden; would chain | Replace | `/projects` 301 → `/about` | T0.06 | 10 | Proposed |
| DEP-072 | `/projects/:slug` → `/work/:slug` (05 §1.6) | route | `next.config.mjs:29-34` | Would chain 308 → 410 | 410 | — | T0.06 | 10 | Proposed |
| DEP-073 | Config-only path `/work/automate-design-handovers-with-a-figma-to-code-pipeline` | route | `src/resources/once-ui.config.js:32` (`protectedRoutes`) | Not a real page (404 today) | Remove at cleanup | — | — | 10 | Proposed |

## 3. Navigation entries, CTAs and internal links

There are **no mega menus and no visible breadcrumbs** on the current site (01 §3, §10), so nothing in those two places is deprecated. Breadcrumbs exist only as JSON-LD on pages listed in §2 and §10, and go with those pages.

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-074 | Header "Home" item | nav entry | `src/components/Header.tsx:9` (desktop and drawer) | Not in the new top bar; the wordmark links home | Replace | Wordmark link | A-01 | 3 | Proposed |
| DEP-075 | Header "Services" plain link (no dropdown) | nav entry | `Header.tsx:10` | Becomes the Services mega menu | Replace | Services panel (04 §8.2) | A-01 | 3 | Proposed |
| DEP-076 | Header "Work" | nav entry | `Header.tsx:11` | Portfolio hidden | Unlink | — | A-12 | 3 | Proposed |
| DEP-077 | Header "Pricing" | nav entry | `Header.tsx:12` | Page retired | Unlink | — | A-07 | 3 | Proposed |
| DEP-078 | Header "Careers" with "Hiring" badge | nav entry | `Header.tsx:13` | Careers moves to Company menu and footer; badge removed | Replace | Company menu "Careers" | A-01 | 3 | Proposed |
| DEP-079 | Header "About" and "Contact" as top-level items | nav entry | `Header.tsx:14-15` | Move into the Company menu | Replace | Company menu (04 §8.6) | A-01 | 3 | Proposed |
| DEP-080 | Header CTA "Get Started" | nav entry | `Header.tsx:96-100` | Retired label (07 §3.3) | Replace | "Discuss Your Cloud Strategy" → `/contact` | — | 3 | Proposed |
| DEP-081 | Mobile drawer "Book a Strategy Call →" | nav entry | `Header.tsx:169-175` | Mislabeled; retired label | Replace | Sticky drawer CTA "Discuss Your Cloud Strategy" | — | 3 | Proposed |
| DEP-082 | Mobile drawer "We're hiring, View open roles" promo | nav entry | `Header.tsx:177-183` | Removed (04 §8.8) | Unlink | — | — | 3 | Proposed |
| DEP-083 | Header `ThemeToggle` | nav entry | `Header.tsx` right cluster | Light only (D-01) | Unlink (or move to footer if D-01 = B) | — | D-01 | 3 | Proposed |
| DEP-084 | Footer stats strip ("Top 1%", "8+ Countries", "48h First commit", "30-day Rolling exit") | nav entry | `src/components/Footer.tsx:8-13` | Unverified claims (07 §10) | Unlink | — | — | 3 | Proposed |
| DEP-085 | Footer "Accepting new projects" badge and tagline "Elite engineering for ambitious teams…" | nav entry | `Footer.tsx` brand column | Staffing-era copy | Replace | Verified contact block (04 §9) | V-10 | 3 | Proposed |
| DEP-086 | Footer service links: Product Engineering, Data & AI, Strategic Staffing, Fintech Development, SaaS Development, MVP Development, E-Commerce | nav entry | `Footer.tsx:16, 18-23` | Deprecated or merged services | Unlink | Footer Services column (04 §9) | A-01 | 3 | Proposed |
| DEP-087 | Footer "Cloud & DevOps" → `/services/cloud-devops` | nav entry | `Footer.tsx:17` | URL merged | Replace | `/services/devops` and the other pillar links | — | 3 | Proposed |
| DEP-088 | Footer Company links: Case Studies, Pricing, FAQ, Locations | nav entry | `Footer.tsx:28-29, 32-33` | Pages hidden, retired or merged | Unlink | — | A-07, A-11, A-12 | 3 | Proposed |
| DEP-089 | Footer "Blog" label and Careers badge | nav entry | `Footer.tsx:30-31` | Label becomes "Insights"; badge removed | Replace | "Insights" → `/blog` | A-10 | 3 | Proposed |
| DEP-090 | Footer CTAs "Start a Project" and "Join the Crew →" | nav entry | `Footer.tsx:131` and CTA column | Retired labels | Replace | "Discuss Your Cloud Strategy" | — | 3 | Proposed |
| DEP-091 | Footer GitHub and X links | nav entry | `Footer.tsx:39-40` | Ownership unverified | Unlink unless V-11 confirms | — | V-11 | 3 | Proposed |
| DEP-092 | Footer copyright "AlgoCrew Inc." | nav entry | `Footer.tsx:143` | Entity unverified (Inc. vs Ltd.) | Replace | Verified entity name | V-06 | 3 | Proposed |
| DEP-093 | Homepage Hero CTAs "Launch Your Product →" and "See Case Studies" → `/work` | nav entry | `src/components/home/Hero.tsx:72-75` | Retired labels; portfolio | Replace | "Discuss Your Cloud Strategy" → `/contact`; "Explore Our Capabilities" → `/services` | — | 4 | Proposed |
| DEP-094 | `SendUsEmail` CTAs "Build Something Exceptional →" and "Book a Strategy Call" → `/hire`; line "From idea to launch in weeks" (14 pages) | nav entry | `src/components/home/SendUsEmail.tsx:16-24` | Mislabeled booking link; retired copy | Replace | `CtaBlock`: "Discuss Your Cloud Strategy" → `/contact`; "Book a 30-minute call" (Cal.com, V-10) | V-10 | 3, 4 | Proposed |
| DEP-095 | Home Services panel links → `team-services`, `web-app-development`, `cloud-devops`, `data-automation` | nav entry | `src/components/services/Services.tsx:133` (data 8-48) | Deprecated or merged targets | Unlink | `PillarGrid` links to the five pillars | — | 4 | Proposed |
| DEP-096 | Home "View All Work →" | nav entry | `src/components/work/Projects.tsx` | Portfolio | Unlink | — | A-12 | 4 | Proposed |
| DEP-097 | "Related work" links on every service page (3 projects + "View all") | nav entry | `src/components/services/ServiceRelatedWork.tsx`, used at `src/app/services/[slug]/page.tsx:68` | Related-service section points to the portfolio | Unlink | Cross-link strips (06 §4) | A-12 | 5 | Proposed |
| DEP-098 | Careers "View our work" and "See what we build" → `/work` | nav entry | `src/app/careers/page.tsx:106, 193` [line checked] | Portfolio | Unlink | Remove, or → `/our-approach` | A-12 | 8 | Proposed |
| DEP-099 | Location page CTAs "Start a Project →" and "View Our Work" | nav entry | `src/app/locations/[slug]/page.tsx:60-61` [line checked] | Pages retired | Unlink (with route) | — | A-11 | 10 | Proposed |
| DEP-100 | 404 links "Our Work" and "Pricing" | nav entry | `src/app/not-found.tsx:7` and list | Targets hidden or retired | Replace | Pillars, Compliance, Contact (08 §12) | — | 8 | Proposed |
| DEP-101 | Blog post sidebar "Work with us" | nav entry | `src/app/blog/[slug]/page.tsx:178` [line checked] | Retired label | Replace | "Talk to the team behind this article" → `/contact` | — | 8 | Proposed |
| DEP-102 | Blog body links to `/services/cloud-devops` (12×) | nav entry | `src/resources/blog.ts` | Merged URL; retained posts must not depend on a redirect (05 §1.5) | Replace | Most specific new page per post (05 §3 table) | — | 8 | Proposed |
| DEP-103 | Blog body links to `/services/security-quality` (6×) | nav entry | `blog.ts` | Merged URL | Replace | `/services/cloud-security` or `/services/devsecops` | — | 8 | Proposed |
| DEP-104 | Blog body links to `/services/web-app-development` (6×), `/services/startup-mvp-development` (3×), `/services/team-services` (2×), `/services/saas-development` (1×), `/services/data-automation` (1×) | nav entry | `blog.ts` | Gone or merged URLs | Unlink | Remove, or point to a retained post on the same topic | — | 8 | Proposed |
| DEP-105 | Blog body links to `/work` (1×), `/work/localised`, `/work/boxo`, `/work/cashcloud` (1× each), `/pricing` (1×) | nav entry | `blog.ts` (counts verified by grep) | Hidden or retired | Unlink | — | A-07, A-12 | 8 | Proposed |
| DEP-106 | Links from retained posts to hidden or retired posts (`technical-debt…`, `redis-patterns…`, `database-performance…`, `code-review-culture…`) | nav entry | `blog.ts` (05#46, #47, #48, #51, #52, #54, #56) | Hidden or gone targets | Unlink | Retained post on the same topic, or remove | — | 8 | Proposed |
| DEP-107 | Related-posts block showing hidden or retired posts | nav entry | `src/app/blog/[slug]/page.tsx:205` (`getRelated` in `blog.ts`) | Must list live posts only | Replace | Filter on `status: 'live'` | I-05 | 8 | Proposed |
| DEP-108 | Contact page tabs "Hire a Developer" and "Apply for a Role" | nav entry | `src/components/contact/FormToggler.tsx` | Staffing; CV is never sent | Unlink | One form (07 §6.12); careers by email | A-06 | 8 | Proposed |

## 4. Homepage sections

Each entry covers the section on `src/app/page.tsx` (lines 45-57) and its component file. Sections are unlinked when the new homepage lands (T4.04); files are removed at cleanup.

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-109 | Hero copy "We Build / Digital / Experiences", "fast, precise, cinematic" | homepage section | `src/components/home/Hero.tsx` | Generalist copy | Replace | `sections/Hero` (home), hero option A (07 §3.2); `HeroCanvas` kept | T4.01 | 4 | Proposed |
| DEP-110 | Tech stack marquees (OfferingTechnologies) | homepage section | `src/components/services/OfferingTechnologies.tsx` (inline data 38-45) | Frontend and mobile items; marquees retired (D-07) | Unlink → Remove at cleanup | Tooling in context on pillar and platform pages | D-07 | 4, Cleanup | Proposed |
| DEP-111 | "Our Capabilities" horizontal-scroll panels (Services) | homepage section | `src/components/services/Services.tsx` (data 8-48) | Panels 01, 02, 04 deprecated; pinned horizontal scroll retired | Unlink → Remove at cleanup | `PillarGrid` | D-07 | 4, Cleanup | Proposed |
| DEP-112 | TrustStrip (compliance claims and delivery marquees) | homepage section | `src/components/home/TrustStrip.tsx:14-25` | Self-compliance claims (DEP-188…DEP-192) | Unlink → Remove at cleanup | `FrameworkCards` + boundary statement | — | 4, Cleanup | Proposed |
| DEP-113 | StatsBento "By the numbers" | homepage section | `src/components/home/StatsBento.tsx` | Unverified statistics | Unlink → Remove at cleanup | None (no statistics, 07 §5) | V-21 | 4, Cleanup | Proposed |
| DEP-114 | ProcessSteps "How we work: Discover / Build / Evolve" | homepage section | `src/components/home/ProcessStep.tsx` (also on `/services`) | Replaced by the five-step approach (A-14) | Replace → Remove at cleanup | `ApproachSteps` using `ui/Steps` (markup reused) | A-14 | 4, 5, Cleanup | Proposed |
| DEP-115 | WhyChooseUs "The AlgoCrew edge" | homepage section | `src/components/home/WhyChooseUs.tsx` | Staffing framing; "98%" claim | Unlink → Remove at cleanup | "What you get" proof section | — | 4, Cleanup | Proposed |
| DEP-116 | TechShowcase (second tech grid) | homepage section | `src/components/home/TechShowcase.tsx:46-53` | Mobile and frontend items; duplicate | Unlink → Remove at cleanup | — | — | 4, Cleanup | Proposed |
| DEP-117 | Projects "Industry solutions" (4 cards) | homepage section | `src/components/work/Projects.tsx:31-65` | Portfolio-tied; fabricated-looking company names | Unlink → Remove at cleanup | — | A-12 | 4, Cleanup | Proposed |
| DEP-118 | Details "Quality you can count on" | homepage section | `src/components/about/Details.tsx:8-11` | Unverified statistics | Unlink → Remove at cleanup | — | V-21 | 4, Cleanup | Proposed |
| DEP-119 | AnimatedTestimonials (4 testimonials; also on `/services`) | homepage section | `src/components/home/Testimonals.tsx:5-50` | Unverified; no testimonials in R1 | Unlink → Remove at cleanup | — | — | 4, 5, Cleanup | Proposed |
| DEP-120 | Home FAQ (7 staffing/product questions; also on `/services`, `/services/[slug]`) | homepage section | `src/components/home/FAQ.tsx` | Off-message content; second FAQ implementation | Replace → Remove at cleanup | Page-specific `ui/Faq` | — | 4, 5, Cleanup | Proposed |
| DEP-121 | SendUsEmail closing block (14 pages) | homepage section | `src/components/home/SendUsEmail.tsx` | Retired copy; `/hire` link | Replace → Remove at cleanup | `ui/CtaBlock` (swapped in one step) | — | 3, 4, Cleanup | Proposed |

## 5. Components

Components whose only role is a homepage section are in §4 and are not repeated. Classes are from 01 §7: **D** tied to deprecated services, **W** tied to Work/Portfolio, **R** dead, **B** reusable but unlinked or replaced per 09 §6.

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-122 | HireDeveloperForm (D) | component | `src/components/contact/HireDeveloperForm.tsx` | Staffing form | Unlink → Remove at cleanup | `ContactForm` | A-06 | 8, Cleanup | Proposed |
| DEP-123 | DeveloperRoleSelector (D) | component | `src/components/contact/DeveloperRoleSelector.tsx` | Developer roles incl. UI/UX, Mobile | Unlink → Remove at cleanup | — | A-06 | 8, Cleanup | Proposed |
| DEP-124 | services/Card `ServiceCard` and services/Cards (R + D) | component | `src/components/services/Card.tsx`, `Cards.tsx` | Dead; read `allServices` | Remove at cleanup | `ui/Card` | — | Cleanup | Proposed |
| DEP-125 | ServiceRelatedWork (W) | component | `src/components/services/ServiceRelatedWork.tsx` (mapping 15-26 incl. `gaming`, `e-commerce`, `digital-marketing`) | Portfolio | Unlink → Remove at cleanup | — | A-12 | 5, Cleanup | Proposed |
| DEP-126 | ProjectIllustrations (W/B) | component | `src/components/work/ProjectIllustrations.tsx` | Not reused; the four diagram concepts replace it (09 §6) | Unlink → Keep unreferenced → Remove at cleanup | `components/diagrams/*` | — | 4, Cleanup | Proposed |
| DEP-127 | WorkHero (W) | component | `src/components/work/WorkHero.tsx` | Portfolio | Unlink (with route) → Remove at cleanup | — | A-12 | 10, Cleanup | Proposed |
| DEP-128 | WorkGrid (W) | component | `src/components/work/WorkGrid.tsx` | Portfolio | Unlink → Remove at cleanup | — | A-12 | 10, Cleanup | Proposed |
| DEP-129 | ProjectDetail (W) | component | `src/components/work/ProjectDetail.tsx` | Portfolio | Unlink → Remove at cleanup | — | A-12 | 10, Cleanup | Proposed |
| DEP-130 | RelatedProjects (R + W) | component | `src/components/work/RelatedProjects.tsx` | Dead; portfolio | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-131 | projects/ProjectCards, ProjectCard, SendUsEmail (R + W) and their modules | component | `src/components/projects/*` (7 files) | Dead; portfolio | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-132 | Root ProjectCard (R + W) | component | `src/components/ProjectCard.tsx` (exported from `components/index.ts`) | Dead | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-133 | Dead global helpers (R): ThemeLogo, HeadingLink, ScrollToHash, CustomMDX | component | `src/components/ThemeLogo.tsx`, `HeadingLink.tsx`, `ScrollToHash.tsx`, `mdx.tsx` | Unreachable | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-134 | Dead home components (R): HeroAnimations, AchievementsStrip | component | `src/components/home/HeroAnimations.tsx`, `AchievementsStrip.tsx` (+ module) | Unreachable | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-135 | Dead services components (R): HeroSection, ServicesHero, MarqueeController, technologies, services/SendUsEmail | component | `src/components/services/HeroSection.tsx`, `ServicesHero.tsx`, `MarqueeController.tsx`, `technologies.tsx`, `SendUsEmail.tsx` | Unreachable | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-136 | Dead about components (R): AboutHero, OurMission, OurVision, OurTeam, Card (`ValueCard`), Cards, SendUsEmail, TableOfContents | component | `src/components/about/*` (8 files + modules) | Unreachable. OurTeam could be revived (preserve list) | Remove at cleanup | `sections/` leadership cards | V-13 | Cleanup | Proposed |
| DEP-137 | Dead blog components (R): Post, Posts | component | `src/components/blog/Post.tsx`, `Posts.tsx` (+ module) | MDX template blog, unused | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-138 | ui/Testimonals (R) | component | `src/components/ui/Testimonals.tsx` | Dead | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-139 | CeoCalendar, CtoCalendar (R) | component | `src/components/Calendars/*` | Only used by dead components; embed booking pages `ceo-algocrew`, `cto-algocrew` | Remove at cleanup | Cal.com link (V-10) | V-10 | Cleanup | Proposed |
| DEP-140 | Header, Footer (B) | component | `src/components/Header.tsx`, `Footer.tsx` (+ modules) | Replaced by server-rendered `layout/` versions | Replace → Remove at cleanup | `layout/Header`, `MegaMenu`, `MobileDrawer`, `Footer` | T3.11 | 3, Cleanup | Proposed |
| DEP-141 | SmoothScroll (Lenis) (A, removed by D-06) | component | `src/components/SmoothScroll.tsx` (in `Providers.tsx`) | Native scrolling (08 §8) | Unlink → Remove at cleanup | — | D-06 | 3, Cleanup | Proposed |
| DEP-142 | ThemeToggle (A, removed by D-01) | component | `src/components/ThemeToggle.tsx` | Light only | Unlink → Remove at cleanup (keep if D-01 = B) | — | D-01 | 3, Cleanup | Proposed |
| DEP-143 | RouteGuard | component | `src/components/RouteGuard.tsx` | Soft 404s; password gate retired | Unlink → Remove at cleanup | 301/410/noindex and `dynamicParams = false` | T10.07 | 3, Cleanup | Proposed |
| DEP-144 | HeroCrystal (WIP) | component | `src/components/home/three/HeroCrystal.tsx` (uncommitted) | Decorative; needs drei and transmission (08 §10.1) | Replace → Remove at cleanup | `diagrams/LayeredPlatform` in the kept `HeroCanvas` | D-04 | 9, Cleanup | Proposed |
| DEP-145 | services/Steps and home/ProcessStep markup (B) | component | `src/components/services/Steps.tsx` | Merged | Replace → Remove at cleanup | `ui/Steps` | — | 2, Cleanup | Proposed |
| DEP-146 | FaqAccordion and CompareTable (B) | component | `src/app/pricing/PricingClient.tsx` | Second FAQ implementation; retired page | Replace → Remove at cleanup (with DEP-020) | `ui/Faq`, `ui/DataTable` | A-07 | 10, Cleanup | Proposed |
| DEP-147 | IncludedServices (A) | component | `src/components/services/IncludedServices.tsx` | Becomes `LedgerRow` usage | Replace → Remove at cleanup | `ui/LedgerRow` | — | 5, Cleanup | Proposed |
| DEP-148 | Parallax `ServiceDetailHero` (A) | component | `src/components/services/Parallax.tsx` | Not used (D-07) | Unlink → Remove at cleanup | `sections/Hero` (page) | D-07 | 5, Cleanup | Proposed |
| DEP-149 | FormToggler (B) | component | `src/components/contact/FormToggler.tsx` | Tabs removed | Unlink → Remove at cleanup | `ContactForm` | — | 8, Cleanup | Proposed |
| DEP-150 | JobApplicationForm (B) | component | `src/components/contact/JobApplicationForm.tsx` (CV only as name and size, line 126) | Loses CVs | Unlink → Keep unreferenced | Email applications from Careers; fix later or remove | — | 8, Cleanup | Proposed |
| DEP-151 | ContactHero (A/B) | component | `src/components/contact/ContactHero.tsx` (trust row: 24h, 48h, NDA, 0 lock-in) | Replaced; claims | Replace → Remove at cleanup | `sections/Hero` | V-10 | 8, Cleanup | Proposed |
| DEP-152 | About sections AboutValues, AboutWhyUs, AboutVision (B) | component | `src/components/about/AboutValues.tsx`, `AboutWhyUs.tsx`, `AboutVision.tsx` | About rebuilt from `sections/`; timeline claims | Unlink → Remove at cleanup | `/about` per 07 §6.8 | — | 8, Cleanup | Proposed |
| DEP-153 | Barrel exports of dead components | component | `src/components/index.ts` | Exports `ProjectCard`, `ScrollToHash`, `CustomMDX`, etc. | Replace | Pruned barrel | — | Cleanup | Proposed |
| DEP-154 | Old breakpoint mixins | component | `src/components/breakpoints.scss` (768/1024/1440, used by one file) | Replaced by 640/1024/1280 (08 §5) | Replace → Remove at cleanup | `src/styles/breakpoints.scss` | — | 1, Cleanup | Proposed |

## 6. Data files and inline data

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-155 | `categorizedServices` (15 entries) | data | `src/resources/categorizedServices.js` | Replaced for live pages | Keep unreferenced → Remove at cleanup | `src/resources/services.ts` (cloud-devops and security-quality includes carried over, 06 §5) | T5.03 | 5, Cleanup | Proposed |
| DEP-156 | `allServices` (39 items incl. gaming, WordPress, metaverse) | data | `src/resources/services.js` | Dead | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-157 | `ourProjects` (9 projects) | data | `src/resources/ourProjects.js` | Portfolio hidden; unverified outcome claims | Keep unreferenced (preserve list) | — | A-12 | 10 | Proposed |
| DEP-158 | `offeringTechnologies` (36 items incl. Unity, Unreal, Flutter) | data | `src/resources/offeringTechnologies.js` | Dead | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-159 | `ourTeam` (3 people, with ages; one wrong GitHub link) | data | `src/resources/ourTeam.js` | Dead; personal data (ages) | Remove at cleanup | Leadership data in `site.ts` (V-09, V-13) | V-09 | Cleanup | Proposed |
| DEP-160 | `ourValues` (6 values, duplicated inline in AboutValues) | data | `src/resources/ourValues.js` | Dead duplicate | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-161 | `locations` (5 geo pages) | data | `src/resources/locations.ts` (services lists 24-25, 47-48, 69-70, 92-93, 114-115; claims 28, 74) | Routes retired | Keep unreferenced → Remove at cleanup, after PIPEDA and Canada facts move | `/compliance/pipeda`, `/about` | A-11, V-10 | 10, Cleanup | Proposed |
| DEP-162 | Unused `content.js` exports: `about`, `aboutUs`, `blog`, `projects`, `services`, `newsletter`, `work`, `hire` (incl. `services.headline` "Shaping digital experiences" line 291, `work` description line 283, "Happy Client" line 88, "7-day risk-free trial" line 197) | data | `src/resources/content.js` | Unused or deprecated | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-163 | `content.js` `person` ("Arqam Tahir, Software Engineer"; avatar used by OG route) | data | `src/resources/content.js:3-13` | Conflicting founder identity | Replace | `site.ts` (V-09) | V-09 | 10 | Proposed |
| DEP-164 | Resource barrel exports of dead data | data | `src/resources/index.ts` (re-exports `allServices`, `ourValues`, `ourProjects`, `ourTeam`, unused `content.js` keys) | Keeps dead data reachable | Replace | Pruned barrel | — | Cleanup | Proposed |
| DEP-165 | `getPosts()` MDX helper | data | `src/utils/utils.ts:69` | Only used by dead `blog/Posts.tsx` | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-166 | Template MDX files (Figma-to-code, Once UI design system, portfolio builder) | data | `src/app/work/projects/*.mdx` (3) | Once UI template leftovers, not routed | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-167 | Blog entries for the 10 retired posts | data | `src/resources/blog.ts` (05#65–#74) | Retired | Replace (`status: 'retired'`, not generated) → Remove at cleanup | — | T10.08 | 8, Cleanup | Proposed |
| DEP-168 | Blog categories `Engineering Culture`, `Business`, `Engineering`, `AI / ML`, `Mobile`, `Product`, `DevOps`, `Security` | data | `blog.ts` `categories`; `src/app/blog/BlogClient.tsx` filter | Replaced by four categories (07 §9.1) | Replace | Cloud Engineering, DevOps & DevSecOps, Cloud Security, Compliance & Governance | A-10 | 8 | Proposed |
| DEP-169 | Once UI config leftovers: `schema` (name "Once UI", `lorant@once-ui.com`), `sameAs` (Once UI profiles), `mailchimp` placeholder | data | `src/resources/once-ui.config.js:139, 187-189` and `sameAs` | Template leftovers | Remove at cleanup | `site.ts` | — | 10, Cleanup | Proposed |
| DEP-170 | `routes` and `protectedRoutes` entries for `/work`, `/pricing`, `/faq`, `/locations`, `/hire` | data | `src/resources/once-ui.config.js:7-21, 31-33` | Must match the new route list (05 §3) | Replace | New route list | T10.10 | 10 | Proposed |
| DEP-171 | Icons `game` and `wordPress` | data | `src/resources/icons.ts:74, 83` | Deprecated services | Remove at cleanup (whole `react-icons` map if DEP-266 proceeds) | Lucide `IconTile` | D-08 | Cleanup | Proposed |
| DEP-172 | Services hub accent map with `gaming`, `e-commerce` and hero stats "10 practice areas", "30+ sub-services", "Top 1% Talent" | data | `src/app/services/page.tsx:26-37, 52-72` | Deprecated slugs and claims | Replace | New `/services` hub | T5.10 | 5 | Proposed |
| DEP-173 | `/faq` inline Q&As (19), including MVP package, "$4,900", "React Native", Ontario law | data | `src/app/faq/page.tsx` (`$4,900` at line 50 [line checked], React Native at 105, Ontario at 92) | Merged; engagement Q&As move after review | Replace → Remove at cleanup | `/our-approach#faq` (V-07) | V-07 | 8, Cleanup | Proposed |
| DEP-174 | Careers roles "UX / UI Designer" and "Mobile Engineer (React Native)"; perks marquee; team quotes | data | `src/app/careers/CareersClient.tsx:11, 14` [line checked]; `src/app/careers/page.tsx:24-35` | Deprecated roles; unverified perks | Replace | Cloud, DevOps, security roles only (V-20) | V-20 | 8 | Proposed |
| DEP-175 | Job application role list ("Senior Mobile Engineer (React Native)", "UI/UX Designer") | data | `src/components/contact/JobApplicationForm.tsx:22, 26` | Deprecated roles | Unlink (with DEP-150) | — | — | 8 | Proposed |
| DEP-176 | Contact form service options (Staff Augmentation, Dedicated Team, Fixed-Price Project, IT Consulting) and "Bid Price (USD)" field | data | `src/components/contact/ContactForm.tsx:138-143, 151` | Staffing options | Replace | Topic select (07 §6.12) | A-06 | 8 | Proposed |
| DEP-177 | Default password `password` | data | `.env.example` (`PAGE_ACCESS_PASSWORD`) | Password gate retired | Remove at cleanup | — | DEP-069 | Cleanup | Proposed |

## 7. Claims (unverified statistics, testimonials, company facts, self-compliance)

All are removed unless the named V-item confirms them (07 §10). Removal happens when the containing page or component is replaced; the grep in 12 §4.13 proves none remain.

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-178 | "Top 1%" talent, "Top 1% of applicants", 5-stage vetting | claim | Footer stats; `StatsBento`; `WhyChooseUs`; `/services` hero; `/careers` marquee; `AboutVision.tsx:10` | Unverified; staffing vocabulary | Replace (remove) | None | — | 3, 4, 5, 8 | Proposed |
| DEP-179 | "$50M+ client revenue generated" | claim | `StatsBento.tsx` | Unverified | Replace (remove) | None | V-21 | 4 | Proposed |
| DEP-180 | "18+ countries" vs "8+ countries" | claim | `StatsBento.tsx:59`; `AboutVision.tsx:8`; `Footer.tsx:10`; `/services`; `/careers` | Contradictory | Replace (remove) | Regions only if V-19 | V-19 | 3, 4, 5, 8 | Proposed |
| DEP-181 | "12+ industry verticals" | claim | `StatsBento`; `/about:109` | Unverified | Replace (remove) | None | V-21 | 4, 8 | Proposed |
| DEP-182 | "50+ projects", "30+ happy clients", "5+ years", "98% satisfaction" | claim | `src/app/about/page.tsx:109-112` | Unverified | Replace (remove) | None | V-21 | 8 | Proposed |
| DEP-183 | "98% client retention", "0 critical incidents in prod / Zero P0s", "120+ production deployments", "8 yrs avg experience" | claim | `src/components/about/Details.tsx:8-11` | Unverified | Replace (remove) | None | V-21 | 4 | Proposed |
| DEP-184 | "98% client satisfaction rate" | claim | `src/components/home/WhyChooseUs.tsx:56` [line checked] | Unverified | Replace (remove) | None | V-21 | 4 | Proposed |
| DEP-185 | "50+ projects for Canadian clients", "30+ US clients across 12 states" | claim | `src/resources/locations.ts:28, 74` | Unverified | Unlink (with routes) | None | — | 10 | Proposed |
| DEP-186 | Speed claims: "48h first commit", "24h response", "48h response guarantee", "3 days sprint ramp-up", "48hr matching", "48-hour ramp-up" | claim | Footer; `ContactHero`; `StatsBento`; `WhyChooseUs`; `AboutWhyUs`; `locations.ts` | Unverified | Replace (remove) | Response-time line only if V-10 | V-10 | 3, 4, 8 | Proposed |
| DEP-187 | "30-day Rolling exit", "Zero lock-in", "100% IP transfer", "NDA on Day 1" | claim | Footer stats; `TrustStrip`; `ContactHero`; `AboutWhyUs` | Contractual promises not in the verification register | Replace (remove unless the client confirms them as contract terms; add to V-21) | Our Approach FAQ, if confirmed | V-07, V-21 | 3, 4, 8 | Proposed |
| DEP-188 | "SOC 2 Aligned" / "SOC 2-aligned" | claim | `TrustStrip.tsx:15`; `WhyChooseUs`; `Details` | Self-compliance claim (07 §8) | Replace (remove) | Literal status on `/trust` (V-17) | V-17 | 4 | Proposed |
| DEP-189 | "HIPAA Ready" | claim | `TrustStrip.tsx:17` | Self-compliance claim | Replace (remove) | — | V-17 | 4 | Proposed |
| DEP-190 | "ISO 27001 Aligned" and "ISO 27001 Compliance Standards" | claim | `TrustStrip.tsx:20`; `categorizedServices.js:110` | Self-compliance claim | Replace (remove) | — | V-17 | 4, 5 | Proposed |
| DEP-191 | "GDPR Compliant" | claim | `TrustStrip.tsx:23` | Self-compliance claim | Replace (remove) | — | V-17 | 4 | Proposed |
| DEP-192 | "24 / 7 On-call" and "Follow-the-sun" | claim | `TrustStrip.tsx:21, 24`; `AboutVision.tsx:8` | Coverage unverified | Replace (remove) | Business-hours wording (V-12) | V-12 | 4, 8 | Proposed |
| DEP-193 | Client-project outcomes "SOC 2 Compliance certified" (Localised), "PCI-DSS Compliance achieved" (Cash Cloud) and all project metrics | claim | `src/resources/ourProjects.js:13-198` | Unverified; hidden with `/work` | Hide (with DEP-157) | Not reused | A-12 | 10 | Proposed |
| DEP-194 | Regulated-industry experience (PCI-DSS, SOC 2, FCA, HIPAA, PHIPA, OSFI, SEC, security clearance) | claim | `src/app/faq/page.tsx:95`; `locations.ts` FAQs | Unverified (V-03) | Unlink (with routes) | Framework pages only if V-03 | V-03 | 10 | Proposed |
| DEP-195 | Testimonials: Sarah Chen (Meridian Health), Marcus Williams (Launchpad, "340% conversion"), Priya Sharma (NovaTech), Daniel Osei (Stackr Labs) | claim | `src/components/home/Testimonals.tsx:9, 21, 33, 45` [line checked] | Unverified; no testimonials in R1 | Unlink (DEP-119) | None | — | 4, 5 | Proposed |
| DEP-196 | Fabricated-looking company names NexaCapital, Nexus Health, VCloud Systems, LogiTech Solutions | claim | `src/components/work/Projects.tsx:35, 43, 51, 59` [line checked] | Not in any project data; must not be reused anywhere (07 §10) | Unlink (DEP-117) → Remove at cleanup | None | — | 4, Cleanup | Proposed |
| DEP-197 | Founding year 2019 (timeline) vs 2020 (schema) | claim | `AboutVision.tsx:6`; `src/app/layout.tsx:141` | Contradictory | Replace | Verified year or omitted | V-08 | 8, 10 | Proposed |
| DEP-198 | Legal entity "AlgoCrew Inc." vs "AlgoCrew Ltd." | claim | `Footer.tsx:143`; layout schema `alternateNames`; `src/app/privacy-policy/page.tsx:24, 29`; `src/app/terms/page.tsx:24` | Contradictory | Replace | One verified name | V-06 | 3, 8, 10 | Proposed |
| DEP-199 | Founder identity: "Arqam Malik, Founder & CTO" vs "Muhammad Arqam" vs "Arqam Tahir, Software Engineer" | claim | `blog.ts` authors; `ourTeam.js`; `content.js:3-13` | Contradictory | Replace | One name and title per person | V-09 | 8, 10 | Proposed |
| DEP-200 | Inconsistent emails: `query@`, `info@`, `hello@algocrew.com`, `legal@`, `hr@`, `ceo@`, `cto@` | claim | `Footer.tsx:41, 78`; `content.js`; `terms/page.tsx`; README; dead calendars | Inconsistent | Replace | One public enquiry address plus legal and privacy addresses | V-10 | 3, 8 | Proposed |
| DEP-201 | Governing law: Ontario (FAQ) vs England and Wales (Terms) | claim | `faq/page.tsx:92` [line checked]; `terms/page.tsx:86` | Contradictory | Replace | Verified answer in Terms and Our Approach FAQ | V-07 | 8 | Proposed |
| DEP-202 | Prices $8,000 / $14,000 (page), $4,900 / $12,000 (schema), $4,900 (FAQ), "$25,000+ per month" (FAQ) | claim | `pricing/page.tsx:30, 50, 119, 126`; `faq/page.tsx:50` | Contradictory; prices retired (A-07) | Unlink (with routes) | None unless V-04 | A-07, V-04 | 10 | Proposed |
| DEP-203 | Careers salary USD 80k–180k, equity, "$1,500 learn budget", team quotes | claim | `src/app/careers/page.tsx:24-35, 70-74` | Unverified | Replace (remove unless verified) | Real roles only (V-20) | V-20 | 8 | Proposed |
| DEP-204 | Sub-processors: Plausible listed; GA4, Tawk.to, EmailJS not listed; "cookie-free analytics" | claim | `privacy-policy/page.tsx:42, 72-77` | Inaccurate | Replace | Actual processors (V-15) | V-15 | 8 | Proposed |
| DEP-205 | Social profiles GitHub `algocrew`, X `algocrew`, Twitter `@algocrew` | claim | `Footer.tsx:39-40`; layout `sameAs` and `twitter` | Ownership unverified | Replace (remove unless V-11) | Verified profiles only | V-11 | 3, 10 | Proposed |
| DEP-206 | Address "35 Herkley Dr, Brampton, ON L6V 2E7" and phone `+1 (437) 450-9656` | claim | `HireDeveloperForm.tsx:200`; `locations.ts:33`; `Footer.tsx:81`; layout schema | Needs confirmation for public use | Replace (keep only if V-10) | `site.ts` | V-10 | 3, 8, 10 | Proposed |

## 8. Copy patterns

Retired wording from 07 §2, §3.3 and §8. Location is site-wide; the literal search terms are in 12 §4.13.

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-207 | Generalist product vocabulary: "digital experiences", "digital products", "cinematic", "launch your product", "from idea to launch", "MVP" | copy | Hero, SendUsEmail, About mission (`about/page.tsx:84`), FAQ, pricing | Old positioning (07 §2) | Replace | Core message (07 §3.1) | — | 3–8 | Proposed |
| DEP-208 | Staffing vocabulary: "staff augmentation", "hire a developer", "dedicated team", "crew", "rockstars", "ninjas", "top 1%", "elite", "senior-only bench" | copy | Footer, WhyChooseUs, About, Careers, Contact, FAQ, blog culture posts | Old positioning | Replace (hidden posts exempt, 05#59–#64) | engagement, scope, deliverables (07 §2) | A-06 | 3–8 | Proposed |
| DEP-209 | "AI-first", "AI-first pivot", "intelligence-native" | copy | `AboutVision.tsx:9`; `WhyChooseUs`; home FAQ; About mission | Outside focus | Replace (remove) | — | — | 4, 8 | Proposed |
| DEP-210 | Hype verbs and vague tech: "transform", "revolutionize", "supercharge", "unlock", "cutting-edge technologies", "battle-tested" | copy | Site-wide | 07 §2 | Replace | implement, configure, harden, evidence, map, automate, operate | — | 3–8 | Proposed |
| DEP-211 | Unprovable security words: "military-grade", "bank-grade", "bulletproof", "unhackable", "fully secure", "zero risk" | copy | Site-wide (none found in the audit; guard rule) | 07 §2 | Replace | Named controls | — | 3–8 | Proposed |
| DEP-212 | Compliance overstatement: "compliant", "certified", "guaranteed compliance", "HIPAA-certified", "PCI DSS certified", "audit-proof", "pass your audit", "our QSA" | copy | Site-wide, meta, schema, alt text, OG images, confirmation emails (07 §8) | 07 §8 | Replace | Approved phrasings (07 §8) | T7.07 | 3–10 | Proposed |
| DEP-213 | Spelling and naming: "PCI-DSS", "SecDevOps", "Dev-Sec-Ops", "Amazon Cloud", "GCP" in headings; UK spellings ("optimisation", "organisation") in new copy (existing slugs keep their spelling) | copy | `ourProjects.js`, `locations.ts`, blog titles, new copy | 07 §2 naming rules; US spelling | Replace | PCI DSS, DevSecOps, Google Cloud | — | 5–8 | Proposed |
| DEP-214 | Endorsement wording for clients: "trusted by", "chosen by", "partnered with", "clients include", "partners" | copy | Guard rule for new copy (07 §7) | Implies endorsement | Replace | "Teams we've worked with" | V-18 | 4, 8 | Proposed |
| DEP-215 | Retired CTA labels: Get Started, Launch Your Product, See Case Studies, Start a Project, Build Something Exceptional, Join the Crew, Hire a Developer, Book a Strategy Call (→ `/hire`), Work with us | copy | Header, Hero, SendUsEmail, Footer, locations, blog sidebar | 07 §3.3 | Replace | Discuss Your Cloud Strategy; Explore Our Capabilities; Book a 30-minute call; Talk to us | — | 3–8 | Proposed |

## 9. Metadata

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-216 | Metadata `keywords` (software agency, custom software development, web development, mobile app development) | metadata | `src/app/layout.tsx:24-28` | Deprecated terms; no ranking weight | Remove (Stage 10) | — | — | 10 | Proposed |
| DEP-217 | Manual `<meta name="keywords">` (second keyword set) | metadata | `src/app/layout.tsx:251` | Duplicate; deprecated terms | Remove (Stage 10) | — | — | 10 | Proposed |
| DEP-218 | Home title "AlgoCrew - Delivering Top-Tier IT Solutions and Services" and staffing description | metadata | `src/resources/content.js:59-60` | Old positioning; brand duplicated by the title template | Replace | `seo` in data (07 §6) | — | 4, 10 | Proposed |
| DEP-219 | `/services` description "From staff augmentation to AI solutions…" and title "Services - AlgoCrew" | metadata | `src/app/services/page.tsx` metadata | Old positioning; duplicate brand | Replace | "Cloud Consulting, DevSecOps & Security Services" | — | 5, 10 | Proposed |
| DEP-220 | Page titles that include "AlgoCrew" (duplicated by the `%s \| AlgoCrew` template) | metadata | `Meta.generate` calls across `src/app/**/page.tsx` | Likely duplicate brand (01 §10; confirm at T1.05) | Replace | Titles without the brand (07 §6) | T1.05 | 10 | Proposed |
| DEP-221 | Web manifest name "AlgoCrew — Elite Software Agency", description "custom software development, web, mobile, cloud & AI" | metadata | `public/manifest.json:2-4` | Old positioning | Replace | New name and description | — | 8 | Proposed |
| DEP-222 | README "modern web agency" and "What We Do" list | metadata | `README.md` | Old positioning | Replace | New project description | — | 8 | Proposed |
| DEP-223 | Hard-coded dark default `data-theme="dark"` and theme-init default | metadata | `src/app/layout.tsx:96`, theme-init script 176-233 | Light only (D-01) | Replace | Light | D-01 | 2 | Proposed |
| DEP-224 | Blog OG and sitemap image `/images/og/home.jpg` on all 32 posts | metadata | `src/app/blog/[slug]/page.tsx`; `src/app/sitemap.ts` | Generic image; 05 §3 removes sitemap image entries | Replace | Per-post OG image when available; no sitemap images | — | 10 | Proposed |
| DEP-225 | OG/hero references to missing `/images/services/webapp.jpg` | metadata | `categorizedServices.js:331, 363, 395, 427, 459` [line checked] | Broken image; pages retired or merged | Unlink (with routes) | — | 05#16, #17, #23, #27, #28 | 10 | Proposed |
| DEP-226 | Relative OG image path `images/og/home.jpg` | metadata | `src/app/hire/page.tsx`, `src/app/contact/page.tsx` | Missing leading slash | Replace (`/contact`); goes with route (`/hire`) | Light OG image (T10.05) | — | 10 | Proposed |
| DEP-227 | Dark OG generator style with per-request Google Fonts fetch | metadata | `src/app/api/og/generate/route.tsx:10-23` | 08 §11 | Replace | Light style, bundled font | — | 10 | Proposed |
| DEP-228 | robots `Host:` line; `/api/` disallow without an `/api/og/` allow | metadata | `src/app/robots.ts` | 05 §3 | Replace | robots per 05 §3 | — | 10 | Proposed |
| DEP-229 | Static sitemap list with build-time `lastModified`, priorities and deprecated URLs | metadata | `src/app/sitemap.ts:11-24` and groups | Advertises deprecated URLs | Replace | Data-driven sitemap (T10.03) | T1.10 | 10 | Proposed |

## 10. Structured data

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-230 | Organization description "custom software development, cloud solutions, and mobile apps" | structured data | `src/app/layout.tsx:138` | Old positioning | Replace | Core message (07 §3.1) | — | 10 | Proposed |
| DEP-231 | Organization `foundingDate: "2020"` | structured data | `layout.tsx:141` | Unverified (conflicts with 2019) | Remove (Stage 10) unless V-08 | — | V-08 | 10 | Proposed |
| DEP-232 | Organization `alternateNames` incl. "AlgoCrew Inc."; contact details; address | structured data | `layout.tsx:120-174` | Entity and contacts unverified | Replace | `legalName` only if V-06; contacts per V-10 | V-06, V-10 | 10 | Proposed |
| DEP-233 | Organization `sameAs` (LinkedIn, GitHub, X) | structured data | `layout.tsx` | Ownership unverified | Replace | Verified profiles (V-11) | V-11 | 10 | Proposed |
| DEP-234 | WebSite description "for web, mobile, cloud and AI" | structured data | `layout.tsx:168` | Old positioning | Replace | New description | — | 10 | Proposed |
| DEP-235 | `PriceSpecification` "Startup Sprint" 4900 and "Growth Team" 12000 | structured data | `src/app/pricing/page.tsx:117-126` | Contradicts visible prices; page retired | Unlink (with route) | — | A-07 | 10 | Proposed |
| DEP-236 | `ProfessionalService` on location pages | structured data | `src/app/locations/[slug]/page.tsx` | Pages retired | Unlink (with route) | — | A-11 | 10 | Proposed |
| DEP-237 | Generic `JobPosting` "Senior Software Engineer" (frontend, backend, full-stack, mobile), salary 80k–180k, `validThrough` 2026-12-31 | structured data | `src/app/careers/page.tsx:56-74` [line checked] | Not a real opening (V-20) | Replace | One JobPosting per real role | V-20 | 8, 10 | Proposed |
| DEP-238 | `FAQPage` on `/faq` | structured data | `src/app/faq/page.tsx` | Page merged | Unlink (with route) | `FAQPage` only where a visible FAQ matches (09 §7) | — | 10 | Proposed |
| DEP-239 | `Service` + `BreadcrumbList` for the 13 retired or merged service pages | structured data | `src/components/seo/ServiceSchema.tsx` via `/services/[slug]` | Pages retired or merged | Unlink (with routes); component kept and extended | `Service` on new pillar, capability, platform, framework pages | — | 10 | Proposed |
| DEP-240 | `Service` `areaServed: CA, US, GB` | structured data | `ServiceSchema.tsx` | Unverified regions | Replace | Only if V-19 | V-19 | 10 | Proposed |
| DEP-241 | Once UI `<Schema as="webPage">` on `/work`, `/work/[slug]`, `/hire` | structured data | `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`, `src/app/hire/page.tsx` | Pages hidden or merged | Unlink (with routes) | — | A-12 | 10 | Proposed |
| DEP-242 | `BlogPosting` author inconsistent; `image` always `og/home.jpg`; `dateModified` ignores `updated` | structured data | `src/app/blog/[slug]/page.tsx` | 05 §3 | Replace | `author` per V-09; per-post image; `dateModified` from `updated` | V-09 | 10 | Proposed |
| DEP-243 | `AboutPage` and `ContactPage` Organization data | structured data | `src/app/about/page.tsx`, `src/app/contact/page.tsx` | Carry the unverified Organization facts | Replace | Corrected Organization from `site.ts` | V-06, V-10 | 10 | Proposed |

## 11. Assets

Sizes from 01 §11, confirmed with `du` where given.

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-244 | Live portfolio screenshots: localized, boxo, swl-1, c-c, otre, nice2stay, codly, alert, deeplawn | asset | `public/images/projects/project-01/` (9 files) | Portfolio hidden | Keep unreferenced (preserve, with DEP-157) | — | A-12 | Cleanup review | Proposed |
| DEP-245 | Template-only screenshots: s-s-1, hw, enterprise, foodil | asset | `public/images/projects/project-01/` (4 files) | Used only by template MDX | Remove at cleanup | — | DEP-166 | Cleanup | Proposed |
| DEP-246 | Unreferenced screenshots: sap, cloud-1, psych, placeholder, building, snoonu, polarpro | asset | `public/images/projects/project-01/` (7 files) | Unreferenced | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-247 | Folder count discrepancy: 01 lists 22 files in `project-01`, the check found 20 | asset | `public/images/projects/project-01/` | Recount before cleanup | — (note) | — | — | Cleanup | Proposed |
| DEP-248 | Deprecated service images: gaming, ecommerce, commerce, digital, emerging, microsoft, automation | asset | `public/images/services/` (13 MB folder) | Deprecated services; `digital.png` is a live `image`, the rest only unused `side_image` | Unlink (with DEP-155) → Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-249 | Other service images: team, developer1, quality, devops | asset | `public/images/services/` | Only referenced by legacy data (`team.png` as a live `image`) | Keep unreferenced → Remove at cleanup | No photography in R1 (D-09) | D-09 | Cleanup | Proposed |
| DEP-250 | Animated GIFs web, devops, ai, team | asset | `public/images/service/` (3.5 MB) | Unreferenced | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-251 | Gallery horizontal-1…4 | asset | `public/images/gallery/` (5.5 MB) | Only unused `content.js` `projects.images` | Remove at cleanup | — | DEP-162 | Cleanup | Proposed |
| DEP-252 | About images mission, mission2, vision, vision1, vision3 (4.7 MB), vision4 | asset | `public/images/about/` (5.9 MB) | Only unused `aboutUs` data | Remove at cleanup | — | DEP-162 | Cleanup | Proposed |
| DEP-253 | Team photos arqam, huzaifa, irfan | asset | `public/images/team/` (2.1 MB) | Only dead OurTeam | Keep unreferenced (preserve) | Leadership photos only with consent (V-13) | V-13 | Cleanup review | Proposed |
| DEP-254 | Testimonial photos natalia, femke | asset | `public/images/testimonals/` (460 KB) | Unreferenced; identity and consent unknown | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-255 | Stock images team, global, fintech, health, quality, market, security, ai, industry | asset | `public/images/uplash/` (2.4 MB) | Unreferenced stock | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-256 | Technology logos (57 files, incl. Unity, Unreal, Flutter, Swift, Vue, Laravel) | asset | `public/images/technologies/` (336 KB) | Only unused `offeringTechnologies.js`; vendor marks as text only (08 §11) | Remove at cleanup | Tool names as text chips | DEP-158 | Cleanup | Proposed |
| DEP-257 | Country flags canada, canada1, pk, pk1 | asset | `public/images/countries/` (4 files) | Unreferenced | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-258 | `hero.png` (5.7 MB) | asset | `public/images/hero.png` | Unreferenced | Remove at cleanup | — | — | Cleanup | Proposed |
| DEP-259 | avatar.jpg, contact.png, hire.png, favicon.png, icon.png, `images/favicon.ico` | asset | `public/images/` | Unreferenced per 01 and a filename grep (`icon.png` matched only `apple-touch-icon.png` paths; `images/favicon.ico` not in 01) **[verify before removal]** | Remove at cleanup | Root favicons in `public/` stay | — | Cleanup | Proposed |
| DEP-260 | `logo-dark.svg`, `logo-light.svg` | asset | `public/images/` | Only used by dead ThemeLogo | Keep unreferenced (preserve; brand) | — | — | Cleanup review | Proposed |
| DEP-261 | OG images `og/home.jpg` (1.1 MB), `og/about.jpg` | asset | `public/images/og/` | Dark style; content not inspected | Replace → Remove at cleanup once unreferenced | Light OG images from T10.05 | — | 10, Cleanup | Proposed |
| DEP-262 | References to missing assets: `/images/about/vision-abstract.png`, `/images/technologies/d365.png` (file is `D365.png`), `cover-04.jpg`, `video-01.mp4` | asset | `content.js`; `categorizedServices.js`; `offeringTechnologies.js`; `simple-portfolio-builder.mdx` | Broken references in legacy data | Remove at cleanup (with their data files) | — | — | Cleanup | Proposed |
| DEP-263 | `.DS_Store` files | asset | `public/images/*` **[unverified individually]** | Repo hygiene | Remove at cleanup (T1.04) | — | — | 1 | Proposed |

## 12. Dependencies

From 09 §8 and 08 §10.2. Removal happens at cleanup once no import remains.

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-264 | `lenis` | dependency | `package.json`; `SmoothScroll.tsx`; CSS hooks `custom.css:162-164` | Native scrolling (D-06) | Unlink → Remove at cleanup | — | D-06 | 3, Cleanup | Proposed |
| DEP-265 | `@tailwindcss/postcss`, `@import "tailwindcss"`, Tailwind `@theme` animations, `postcss.config.mjs` | dependency | `package.json`; `src/app/global.scss:1`; `postcss.config.mjs` (only plugin is Tailwind) | Effectively unused (09 decision 3) | Remove at cleanup (keep `postcss` only if another plugin needs it) | SCSS modules + tokens | DEP-123 (the one Tailwind class string is in `DeveloperRoleSelector.tsx:85`) | Cleanup | Proposed |
| DEP-266 | `react-icons` | dependency | `package.json`; `src/resources/icons.ts`; Footer, sections | Replaced by Lucide (D-08) | Replace → Remove at cleanup | `lucide-react` | D-08 | 2, Cleanup | Proposed |
| DEP-267 | `@next/mdx`, `@mdx-js/loader`, `next-mdx-remote`, `gray-matter`; `pageExtensions` md/mdx | dependency | `package.json`; `next.config.mjs:3-13` | MDX path unused (09 §8: review) | Remove at cleanup after review | — | DEP-165, DEP-166 | Cleanup | Proposed |
| DEP-268 | `cookie`, `@types/cookie` | dependency | `package.json`; API routes; `privacy-policy/page.tsx` and `blog.ts` mention the word only | Only the retired password gate uses the package | Remove at cleanup | — | DEP-069, DEP-070 | Cleanup | Proposed |
| DEP-269 | `@calcom/embed-react` | dependency | `package.json`; only dead `CeoCalendar`/`CtoCalendar` | 09 §8 says keep and load after interaction; it is unused once the dead calendars go, because Contact uses a plain link | Keep unreferenced → review at cleanup | Cal.com link | DEP-139 | Cleanup | Proposed |
| DEP-270 | `@react-three/drei` (imported by WIP `HeroCrystal`, never declared) | dependency | `src/components/home/three/HeroCrystal.tsx` | Not to be added (D-06) | Replace | Core `three` geometry in `LayeredPlatform` | D-06 | 1, 9 | Proposed |
| DEP-271 | `@types/react` ^18 / `@types/react-dom` ^18 with React 19 | dependency | `package.json` devDependencies | Version mismatch | Replace | React 19 types | — | 1 | Proposed |

`@emailjs/browser` is kept or replaced per I-01 (10 §2); `gsap` and `@once-ui-system/core` are kept (09 §8). They are not deprecations.

## 13. Configuration and tooling

| ID | Item | Type | Location | Reason | Action | Replacement or target | Depends on | Stage | Status |
|---|---|---|---|---|---|---|---|---|---|
| DEP-272 | `export: next export` script | config | `package.json` scripts | Command removed in Next 14+ | Remove (T1.03) | — | — | 1 | Proposed |
| DEP-273 | Legacy `.eslintrc.json` and `next lint` | config | `.eslintrc.json`; `package.json` `lint` | Deprecated in Next 15.5 | Replace | ESLint flat config | — | 1 | Proposed |
| DEP-274 | `biome.json` (not wired into scripts) | config | `biome.json` | Unused second linter | Remove at cleanup | ESLint | T1.03 | Cleanup | Proposed |
| DEP-275 | Tracked `tsconfig.tsbuildinfo`, `.claire/worktrees/zealous-hugle-418b59/…/Header.module.scss`, `.claude/worktrees/zealous-hugle-418b59` gitlink | config | repo root (all three confirmed tracked by `git ls-files`) | Repo hygiene | Remove (T1.04) | — | — | 1 | Proposed |
| DEP-276 | `*.vercel.app` → apex redirect for every Vercel host | config | `src/middleware.ts:15-16` | Breaks preview review (10 I-06) | Replace | Production host only | I-06 | 1 | Proposed |
| DEP-277 | Global `transition` on `*`, `body::after` noise overlay, `<main>` page-in animation | config | `src/app/global.scss`; `src/resources/custom.css:150` | Retired by 08 §1 | Remove (T2.02) | — | — | 2 | Proposed |
| DEP-278 | `scroll-behavior: smooth !important` vs `auto` conflict | config | `src/app/global.scss:50`; `src/resources/custom.css:139` | Conflict; Lenis removed | Replace | Native scrolling | D-06 | 2 | Proposed |
| DEP-279 | Second token family `--clr-*` / `--grad-*` and old brand tokens (`--brand-cyan` in UI) | config | `src/resources/custom.css` | One token file (09 decision 5) | Replace → Remove at cleanup | `src/resources/tokens.css` | D-02 | 2, Cleanup | Proposed |
| DEP-280 | Hard-coded per-section accent maps | config | `src/app/services/page.tsx:26-37`; `src/app/work/[slug]/page.tsx:9-13`; `ServiceRelatedWork.tsx:8` | No raw hex (09 §9) | Unlink (with their pages and components) | Tokens | — | 5, 10 | Proposed |

---

## 14. Controlled deprecation procedure

Applies to every entry above. It implements 09 decision 8 ("do not delete during the build") and 05 §5 ("ship together").

1. **Unlink (during the build, stage given per entry).** Replace the import or link with its replacement, or remove it. Do not delete the file. Mark the entry "Unlinked" in this register in the same pull request.
2. **Verify no broken links.** The pull request must pass the link and anchor check (T1.09) and the sitemap test (T1.10). For routes, the old URL may 404 on the preview until step 3. That is expected and allowed only on the release branch.
3. **Redirects, 410s and noindex after approval, in one deploy.** Route entries (§2) go live only in the launch deploy (10 §8.2, 12 §7), after T0.06 approval of 05 and T1.06 backlink review. Never ship a redirect before its target exists.
4. **Confirm in production.** After launch, 12 §4.2 is run against production, and 12 §8 monitors 404 and 410 logs for 30 days.
5. **Remove at cleanup (T11.14).** No earlier than 14 days after launch with no open S1/S2 defects. Before deleting: tag the commit (suggested `site-v1-final` for the launch baseline and `pre-cleanup` for this step); run a filename and import grep for each item; delete; build; run T1.09 and T1.10; record the bundle and `public/` size change.
6. **What is preserved and where.** Everything removed stays in git history at the tags above. Items on the preserve list (§15) are either kept unreferenced in place or carried into the new data files before the old file is removed. The redirect list (`next.config.mjs`) and the gone list (middleware data file) are kept for at least 12 months (05 §3 step 5); retired slugs are never reused for unrelated content.
7. **Status flow per entry:** Proposed → Approved (T0.06/T0.07) → Unlinked → Live (redirect, 410 or noindex in production, if applicable) → Removed or Kept.

## 15. Preserve list

| Item | Why keep it | How it is kept |
|---|---|---|
| `src/components/home/three/HeroCanvas.tsx` wrapper | Desktop-only mount, reduced-motion still frame, off-screen pause (08 §10.1) | Reused as is (T9.01) |
| `home/ProcessStep` and `services/Steps` markup | Basis of `ui/Steps` | Ported in T2.06, then files removed |
| `services/IncludedServices`, `seo/ServiceSchema`, `blog/BlogClient`, `ShareButton`, careers sections, `ContactOptions` | Class A components still useful | Kept and modified (09 §6) |
| 16 retained and 6 hidden blog posts in `blog.ts` | Search equity; Careers can link the culture posts | Kept in place with `status` |
| `ourProjects.js` and the 9 live screenshots, especially the cloud and compliance stories (localised, boxo, cashcloud, alert-management) | Possible future case studies if clients consent and outcomes are verified | Kept unreferenced in place; reviewed at cleanup; always in git history |
| `cloud-devops` and `security-quality` include lists and process steps in `categorizedServices.js` | Input to `services.ts` and Our Approach (06 §5) | Carried into `services.ts` before the old file is removed |
| PIPEDA, Canada and Toronto content in `locations.ts` FAQs | True Canadian facts and PIPEDA material (05#38, #39) | Moved to `/about` and `/compliance/pipeda` before removal |
| Engagement Q&As in `src/app/faq/page.tsx` | Feed `/our-approach#faq` | Moved, after V-07 check |
| `ourTeam.js` names and the team photos | Reference for V-09 and V-13 | Photos kept unreferenced; names checked against V-09; ages not carried over |
| `logo-dark.svg`, `logo-light.svg`, `LogoDark.png`, root favicons | Brand assets | Kept |
| `work/ProjectIllustrations` SVGs | History only; not reused (09 §6) | Git history |
| Search Console and GA4 exports from T1.06 | Baseline to measure the migration | Stored with the project documents (location chosen by the client) |
| Redirect and gone lists | Must stay live 12 months or more | In code, never removed at cleanup |

## 16. Summary counts

Total entries: **280** (DEP-001 to DEP-280).

**By type**

| Type | Count |
|---|---|
| service | 18 |
| route | 55 |
| nav entry | 35 |
| homepage section | 13 |
| component | 33 |
| data | 23 |
| claim | 29 |
| copy | 9 |
| metadata | 14 |
| structured data | 14 |
| asset | 20 |
| dependency | 8 |
| config | 9 |
| **Total** | **280** |

**By primary action** (the first action in each entry's Action cell)

| Action | Count |
|---|---|
| Unlink | 73 |
| Hide | 1 |
| Redirect 301 | 12 |
| 410 | 33 |
| noindex | 6 |
| Replace | 101 |
| Remove at cleanup (or Remove in an earlier stage) | 45 |
| Keep unreferenced | 8 |
| Note only (DEP-247) | 1 |
| **Total** | **280** |

Consistency with 05 §1.7: the 12 Redirect 301 entries are exactly the 12 page-level 301s of 05 (DEP-019–DEP-028, DEP-048, DEP-049). The 33 410 entries are the 32 page-level 410s of 05 plus `/projects/:slug` (DEP-072). The 6 noindex entries are 05#59–#64. `/projects` → `/about` (DEP-071) is counted under Replace. The two conditional switches in 05 (05#18 to 410, 05#20 to 301) would each move one entry between the 301 and 410 rows.

**Not verified:** the `.DS_Store` files individually (DEP-263); whether the `public/images/` files in DEP-259 are referenced anywhere outside `src/` and `public/manifest.json`; the 22 vs 20 file count in `project-01` (DEP-247); line numbers in 01 that were not spot-checked (only the ones marked **[line checked]** were).
