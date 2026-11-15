Stage 2 deliverable. Status: awaiting review.

# 05 — Route Migration Plan (old → new)

**No redirect, 410, noindex or route change is to be created until this plan is approved.** This document describes the plan only. Target routes and names follow [04](04-proposed-sitemap.md). Verification IDs (V-xx) refer to [07 §11](07-content-strategy.md).

## Definitions

| Action | Meaning |
|---|---|
| **Retain** | Same URL. Substance unchanged. Only small edits (internal links, category, metadata). |
| **Modify** | Same URL, content rewritten for the new positioning. |
| **Merge** | URL ends. Its useful content moves into the target page. 301 to that page. |
| **Hide** | Removed from the public experience: not linked, not in the sitemap. Data kept in the repo for possible later reuse. Either noindex (URL still resolves) or 410. |
| **Retire** | URL and content deleted. 410 if no relevant page exists, 301 if one does. |

| Redirect | Meaning |
|---|---|
| **301** | Permanent redirect (see the implementation note on 301 vs 308). |
| **410** | Gone. Used where the only possible destination would be irrelevant; redirecting there would be treated as a soft 404 and mislead users. |
| **noindex** | Page resolves with `robots: noindex, follow`. Removed from sitemap, listing and related posts. |
| **None** | URL unchanged. |
| **Review** | Decide after the pre-launch traffic and backlink check (§3, "Order of operations", step 1). |

**Fallback rule for gated targets.** If a 301 target is a gated page (04 §2) that is not live at launch, the redirect points to the fallback named in brackets, and is repointed (one hop, never chained) when the page launches.

---

## 1. Full mapping: all 74 existing page URLs

### 1.1 Static pages (13)

| # | Existing URL | Proposed URL | Action | Redirect | Rationale |
|---|---|---|---|---|---|
| 1 | `/` | `/` | Modify | None | New positioning, sections per 07 §4 |
| 2 | `/about` | `/about` | Modify | None | Rewritten. Adds `#clients` and the Canadian office facts from the location pages |
| 3 | `/services` | `/services` | Modify | None | Overview of 5 pillars, replacing 15 cards |
| 4 | `/contact` | `/contact` | Modify | None | One form with topic options (no staffing or "bid price" fields); booking link |
| 5 | `/hire` | `/contact` | Merge | 301 | Hire-a-developer form retired; already noindex; linked from 14 pages through `SendUsEmail` |
| 6 | `/pricing` | `/our-approach#engagement-models` | Retire | 301 | Build-team prices are irrelevant and contradictory; the engagement-models section answers the same "how do you charge" intent without prices |
| 7 | `/careers` | `/careers` | Modify | None | Roles limited to cloud, DevOps and security; JobPosting schema only for real openings (V-20) |
| 8 | `/faq` | `/our-approach#faq` | Merge | 301 | Engagement Q&As move to Our Approach; service Q&As go to page FAQs |
| 9 | `/locations` | `/about` | Merge | 301 | Geo hub retired; company location is stated on About |
| 10 | `/blog` | `/blog` (label "Insights") | Modify | None | New categories and listing; URL kept to avoid 16 redirects |
| 11 | `/work` | `/about` | Hide | 301 | Portfolio removed from public view; About is the closest "who are they" page and the hub has inbound links |
| 12 | `/privacy-policy` | `/privacy-policy` | Modify | None | Correct the processors (GA4, Tawk.to, EmailJS, Cal.com, Vercel; V-15), cookies, entity (V-06) |
| 13 | `/terms` | `/terms` | Modify | None | Correct entity and governing law (V-06, V-07) |

### 1.2 Service pages (15)

| # | Existing URL | Proposed URL | Action | Redirect | Rationale |
|---|---|---|---|---|---|
| 14 | `/services/cloud-devops` | `/services/devops` | Merge | 301 | Closest match ("Cloud & DevOps"); 12 inbound blog links are from DevOps posts. Its migration content goes to `/services/cloud-migration`, its compliance bullets to `/compliance` |
| 15 | `/services/security-quality` | `/services/cloud-security` | Merge | 301 | Pen testing, audits and consulting map to Cloud Security; the QA/testing content is dropped |
| 16 | `/services/fintech-software-development` | `/compliance/pci-dss` [fallback `/compliance`] | Merge | 301 | The only part that survives the repositioning is the PCI DSS / payments-security angle |
| 17 | `/services/healthcare-software-development` | `/compliance/hipaa` [fallback `/compliance`] | Merge | 301 | The HIPAA angle survives; patient-portal and EHR build services do not |
| 18 | `/services/team-services` | `/our-approach#engagement-models` | Merge | 301 | Staffing retired as a service (A-06). If no embedded-engineer model is kept, the section still explains how engagements are staffed. If the client rejects any staffing mention, switch to 410 |
| 19 | `/services/data-automation` | — | Retire | 410 | AI, BI and RPA are outside the new focus; no relevant page exists |
| 20 | `/services/microsoft-solutions` | — | Retire | 410 | D365 ERP/CRM and Power Apps are not Azure infrastructure. If the client confirms Azure work grew out of this line, use 301 → `/cloud-platforms/azure` instead (Review if V-03 says so) |
| 21 | `/services/web-app-development` | — | Retire | 410 | Web and mobile builds are deprecated; redirecting to a cloud page would mislead web-dev searchers |
| 22 | `/services/e-commerce` | — | Retire | 410 | Deprecated (Shopify, WooCommerce) |
| 23 | `/services/ecommerce-development` | — | Retire | 410 | Deprecated; duplicate of #22 |
| 24 | `/services/digital-marketing` | — | Retire | 410 | Deprecated |
| 25 | `/services/emerging-tech` | — | Retire | 410 | Deprecated (metaverse, AR, blockchain) |
| 26 | `/services/gaming` | — | Retire | 410 | Deprecated |
| 27 | `/services/saas-development` | — | Retire | 410 | Deprecated (product builds) |
| 28 | `/services/startup-mvp-development` | — | Retire | 410 | Deprecated (MVP builds) |

### 1.3 Work pages (9)

All Hide. They are removed from the public experience. Their data (`ourProjects.js`, images) stays in the repo until a later deprecation register decides otherwise. A 301 to an unrelated page would be a soft 404 and would imply a case study still exists. Four of them (localised, boxo, cashcloud, alert-management) are cloud or compliance stories in substance. They stay hidden too, because no case studies are published and the outcome claims in them are unverified (01 §14).

| # | Existing URL | Proposed URL | Action | Redirect | Rationale |
|---|---|---|---|---|---|
| 29 | `/work/localised` | — | Hide | 410 | Case study; linked from 1 blog post (link to be removed) |
| 30 | `/work/boxo` | — | Hide | 410 | Case study; linked from 1 blog post |
| 31 | `/work/stay-with-lumina` | — | Hide | 410 | Web-build case study |
| 32 | `/work/cashcloud` | — | Hide | 410 | Case study with unverified "PCI-DSS achieved" claim; linked from 1 blog post |
| 33 | `/work/outreside` | — | Hide | 410 | Web-build case study |
| 34 | `/work/nice2stay` | — | Hide | 410 | Web-build case study |
| 35 | `/work/codly` | — | Hide | 410 | SaaS-build case study |
| 36 | `/work/alert-management` | — | Hide | 410 | SRE case study; no client consent on record |
| 37 | `/work/deeplawn` | — | Hide | 410 | SaaS/CRO case study |

### 1.4 Location pages (5)

| # | Existing URL | Proposed URL | Action | Redirect | Rationale |
|---|---|---|---|---|---|
| 38 | `/locations/software-agency-canada` | `/about` | Merge | 301 | Canadian HQ facts are true and stated on About. PIPEDA content from its FAQs moves to `/compliance/pipeda` |
| 39 | `/locations/software-agency-toronto` | `/about` | Merge | 301 | Brampton, Ontario office (V-10) is on About |
| 40 | `/locations/software-agency-united-states` | — | Retire | 410 | Thin geo page about web/mobile services; no US office claimed |
| 41 | `/locations/software-agency-united-kingdom` | — | Retire | 410 | Same. Not redirected to `/compliance/gdpr`: different intent |
| 42 | `/locations/software-agency-australia` | — | Retire | 410 | Same |

### 1.5 Blog posts (32)

Triage reasoning is in 07 §9. Every retained post links to `/services/cloud-devops` or `/services/security-quality`. Those links are updated to the new URLs (§5), so the retained posts never depend on a redirect.

| # | Existing URL | Proposed URL | Action | Redirect | Rationale (new category) |
|---|---|---|---|---|---|
| 43 | `/blog/kubernetes-vs-ecs-2025` | same | Retain | None | Cloud Engineering |
| 44 | `/blog/aws-cost-optimisation-engineering-guide` | same | Retain | None | Cloud Engineering (links to the cost optimization section) |
| 45 | `/blog/serverless-vs-containers-2025` | same | Retain | None | Cloud Engineering |
| 46 | `/blog/microservices-vs-monolith-honest-guide` | same | Retain | None | Cloud Engineering (architecture); remove link to hidden `technical-debt…` |
| 47 | `/blog/event-driven-architecture-patterns` | same | Retain | None | Cloud Engineering; remove link to retired `redis-patterns…` |
| 48 | `/blog/ci-cd-pipeline-best-practices-2025` | same | Retain | None | DevOps & DevSecOps; remove link to hidden `code-review-culture…` |
| 49 | `/blog/docker-production-best-practices` | same | Retain | None | DevOps & DevSecOps |
| 50 | `/blog/terraform-infrastructure-as-code-patterns` | same | Retain | None | DevOps & DevSecOps |
| 51 | `/blog/observability-beyond-monitoring` | same | Retain | None | DevOps & DevSecOps; remove link to retired `database-performance…` |
| 52 | `/blog/sre-practices-for-startups` | same | Retain | None | DevOps & DevSecOps; remove link to hidden `code-review-culture…`. Title framing ("startups") reviewed at the editorial pass |
| 53 | `/blog/supply-chain-security-software` | same | Retain | None | DevOps & DevSecOps (links to `/services/devsecops`) |
| 54 | `/blog/owasp-top-10-2025-developer-guide` | same | Retain | None | DevOps & DevSecOps; remove link to retired `database-performance…` |
| 55 | `/blog/zero-trust-security-architecture-guide` | same | Retain | None | Cloud Security |
| 56 | `/blog/api-security-best-practices-2025` | same | Retain | None | Cloud Security; remove link to retired `redis-patterns…` |
| 57 | `/blog/jwt-security-common-mistakes` | same | Retain | None | Cloud Security (application security) |
| 58 | `/blog/kubernetes-security-hardening` | same | Retain | None | Cloud Security |
| 59 | `/blog/why-senior-only-teams-ship-faster` | same | Hide | noindex | Culture/staffing pitch. Kept reachable for recruiting; links to MVP service and `/work` removed |
| 60 | `/blog/async-first-engineering-culture` | same | Hide | noindex | Culture; useful from Careers only |
| 61 | `/blog/code-review-culture-that-ships` | same | Hide | noindex | Culture; useful from Careers only |
| 62 | `/blog/hiring-senior-engineers-remotely` | same | Hide | noindex | Recruiting/staffing angle |
| 63 | `/blog/milestone-billing-vs-hourly` | same | Hide | noindex | Commercial model for build projects; links to `/pricing` and `/work` removed |
| 64 | `/blog/technical-debt-is-not-always-bad` | same | Hide | noindex | General software; harmless, off-message |
| 65 | `/blog/database-performance-optimisation` | — | Retire | 410 | Application database tuning; off-topic |
| 66 | `/blog/redis-patterns-production` | — | Retire | 410 | Application development |
| 67 | `/blog/postgres-vs-mongodb-choose-right` | — | Retire | 410 | Application development |
| 68 | `/blog/building-ai-features-that-actually-work` | — | Retire | 410 | AI product builds |
| 69 | `/blog/nextjs-15-app-router-production-lessons` | — | Retire | 410 | Web development |
| 70 | `/blog/typescript-advanced-patterns-2025` | — | Retire | 410 | Web/general software |
| 71 | `/blog/web-performance-core-web-vitals-2025` | — | Retire | 410 | Web development |
| 72 | `/blog/graphql-vs-rest-2025` | — | Retire | 410 | API development |
| 73 | `/blog/how-to-scope-an-mvp-correctly` | — | Retire | 410 | MVP builds |
| 74 | `/blog/react-native-vs-flutter-2025` | — | Retire | 410 | Mobile |

The Hide rows (noindex) are deliberately not 410. They contain nothing misleading, and Careers can link to the culture posts. If the client prefers a clean break, all six can become 410 with no other change to this plan.

### 1.6 Non-page endpoints and existing redirects

| Existing | Proposed | Action | Redirect | Rationale |
|---|---|---|---|---|
| `/api/og/generate` | same | Retain | None | Still used for OG images; robots must allow `/api/og/` (§3) |
| `/api/authenticate` (POST) | — | Retire | None (route removed → 404) | The password gate protects nothing; it uses a constant cookie and the default password `password` (01 §15) |
| `/api/check-auth` (GET) | — | Retire | None (route removed → 404) | Same |
| `/projects` → `/work` (config redirect) | `/projects` → `/about` | Modify | 301 | Point straight at the final target to avoid a `/projects → /work → /about` chain |
| `/projects/:slug` → `/work/:slug` | `/projects/:slug` → gone | Modify | 410 | Avoid a 308 → 410 chain |
| `/sitemap.xml` | same | Modify | None | §3 |
| `/robots.txt` | same | Modify | None | §3 |
| `/manifest.json` | same | Modify | None | Name/description "Elite Software Agency…" → new positioning |
| `/icon.svg`, favicons | same | Retain | None | Brand unchanged |
| 404 page | — | Modify | — | Replace the Work and Pricing links with Services, Cloud Platforms, Compliance and Contact |
| Host redirect (www, `*.vercel.app`) | same | Retain | 301 | See the chain note in §2 |

### 1.7 Headline numbers (74 page URLs)

| Action | Count | | Redirect | Count |
|---|---|---|---|---|
| Retain | 16 | | 301 | 12 |
| Modify | 8 | | 410 | 32 |
| Merge | 10 | | noindex | 6 |
| Hide | 16 | | None | 24 |
| Retire | 24 | | Review | 0 (2 rows have conditional switches: #18, #20) |
| **Total** | **74** | | **Total** | **74** |

Hide = `/work` (301) + 9 work pages (410) + 6 posts (noindex). Retire = `/pricing` (301) + 10 services + 3 locations + 10 posts (all 410).

---

## 2. New routes with no predecessor

Some of these receive redirects (noted), but none existed before.

| Route | Page | Release | Receives 301 from |
|---|---|---|---|
| `/services/cloud-consulting` | Cloud Consulting & Engineering | R1 | — |
| `/services/cloud-migration` | Cloud Migration & Modernization | R1 | — |
| `/services/devops` | DevOps & DevSecOps | R1 | `/services/cloud-devops` |
| `/services/devsecops` | DevSecOps | R1 | — |
| `/services/cloud-security` | Cloud Security & Cybersecurity | R1 | `/services/security-quality` |
| `/services/managed-cloud-services` | Managed Cloud Services | R1 | — |
| `/cloud-platforms` | Cloud Platforms | R1 | — |
| `/cloud-platforms/azure` | Microsoft Azure | R1 gated | (`/services/microsoft-solutions` only if #20 switches) |
| `/cloud-platforms/aws` | Amazon Web Services (AWS) | R1 gated | — |
| `/cloud-platforms/google-cloud` | Google Cloud | R1 gated | — |
| `/compliance` | Compliance & Governance | R1 | fallback for #16, #17 |
| `/compliance/hipaa` | HIPAA | R1 gated | `/services/healthcare-software-development` |
| `/compliance/gdpr` | GDPR | R1 gated | — |
| `/compliance/pci-dss` | PCI DSS | R1 gated | `/services/fintech-software-development` |
| `/compliance/pipeda` | PIPEDA | R1 gated | — |
| `/our-approach` | Our Approach | R1 | `/pricing`, `/faq`, `/services/team-services` |
| `/trust` | Trust & Security | R1 gated | — |
| `/services/kubernetes` | Kubernetes & Containers | L | — |
| `/services/platform-engineering` | Platform Engineering | L | — |
| `/services/cloud-cost-optimization` | Cloud Cost Optimization | L | — |
| `/assessments` + `/assessments/{cloud-readiness, security-posture, compliance-readiness, devops-maturity}` | Assessments | L gated | — |
| `/industries/healthcare`, `/industries/financial-services` | Industries | L gated | (#16/#17 could be repointed here later; one hop) |
| `/blog/category/{cloud-engineering, devops-devsecops, cloud-security, compliance-governance}` | Insights categories | L | — |
| `/clients` | Our Clients | L gated | — |

Release 1: 17 new routes. Later: 15.

---

## 3. Implementation notes (describe only; do not implement)

### Where each mechanism would live in this app

| Mechanism | Location | Notes |
|---|---|---|
| **301s** (12 + `/projects`) | `next.config.mjs` → `redirects()` (the array already exists, lines 29-34) | Next.js `permanent: true` sends **308**, not 301. Google treats both the same. If a literal 301 is required, use `statusCode: 301` in place of `permanent`. Fragments in destinations (`/our-approach#faq`) are allowed. |
| **410s** (32 + `/projects/:slug`) | `src/middleware.ts` (already runs on every page path) | Next.js `redirects()` cannot return 410. Middleware would check a single list of gone paths and return a 410 response with a small HTML body (links to `/`, `/services`, `/contact`). Keep the list in one data file so it can be reviewed. The middleware matcher already covers these paths. |
| **Stop building gone pages** | `generateStaticParams` sources: `categorizedServices.js`, `ourProjects.js`, `blog.ts`, `locations.ts` | Remove the entries (or filter them out) so the pages are not generated. Add `export const dynamicParams = false` on `[slug]` routes so unknown slugs return a real 404 rather than rendering on demand. |
| **noindex** (6 posts) | `src/app/blog/[slug]/page.tsx` `generateMetadata` | `robots: { index: false, follow: true }` driven by a `hidden` flag on the post data. The same flag excludes the post from `/blog`, related posts and `sitemap.ts`. |
| **Do not use RouteGuard to hide pages** | `src/components/RouteGuard.tsx` | It renders NotFound with HTTP 200 (soft 404) and leaves the URLs in the sitemap (01 §2). |
| **Redirect chains with the host redirect** | `next.config.mjs` redirects run **before** middleware | A request for `www.algocrew.io/pricing` would go config 301 → `www…/our-approach` → middleware 301 → apex: two hops. Fix: either make the host redirect the first entry in `redirects()` (using `has: [{ type: "host" }]`), or let the hosting platform handle the www → apex step at the domain level. Pick one before launch. |
| **Contact topic pre-selection** | `/contact?topic=…` | Query parameter only selects a form option; the canonical stays `/contact`. Never put personal data in the URL. |

### Order of operations at launch

1. Pre-launch data pull: export Search Console pages, queries and linking sites, plus GA4 landing pages (12 months). Re-review any 410 URL that has meaningful backlinks or traffic.
2. Ship the new pages and the updated internal links in the same deploy as the redirects. Never ship redirects pointing at pages that do not exist yet.
3. Deploy the 301s, 410s and noindex flags together. Update `/projects` at the same time.
4. Submit the new sitemap in Search Console. Use URL Inspection on the 12 redirected URLs and the 5 pillar pages.
5. Keep the redirect and gone lists for at least 12 months. Never reuse a retired slug for unrelated content.

### sitemap.xml changes (`src/app/sitemap.ts`)

- Build from the new route data only. Release 1: 25 core pages plus 16 posts = 41 URLs. Gated pages are added only once they are live.
- Exclude: Hide/Retire URLs, noindex posts, `/hire`, anchors, query URLs.
- `lastModified`: use real content dates (the post's `updated ?? date`; the page's last content edit), not build time for everything.
- Remove the per-post `images: og/home.jpg` entries (they all point at one generic image). Add real per-page OG images later.
- Drop `priority`/`changeFrequency` or keep them consistent. Google ignores both.

### robots.txt changes (`src/app/robots.ts`)

- Keep `Disallow: /api/`, but add `Allow: /api/og/` so social and search crawlers can fetch OG images.
- **Do not** disallow retired or hidden paths. Crawlers must be able to fetch them to see the 410 or noindex.
- Remove the `Host:` line (non-standard; Google ignores it).
- Keep the `Sitemap:` line.

### Canonical rules

- Every indexable page has a self-referencing absolute canonical on the apex host (`https://algocrew.io/...`), with no trailing slash and no query string.
- Platform pages are self-canonical, never canonicalised to a pillar (they are distinct pages, not duplicates).
- `/blog?category=…` (client-side filter) canonicalises to `/blog` until category pages exist. After that, each `/blog/category/{slug}` is self-canonical.
- `/contact?topic=…` canonicalises to `/contact`.
- noindex posts: no cross-page canonical (mixing noindex with a canonical to another URL sends conflicting signals). Self-canonical or none.
- 410 and redirected URLs have no canonical (they serve no page).
- The home page sets its own canonical explicitly (today it inherits `/` from the layout).

### Internal-link cleanup list

| Where | Current link(s) | Change to |
|---|---|---|
| `src/components/Header.tsx:9-15` + mobile drawer `:169-183` | Work, Pricing, Careers ("Hiring" badge), "Book a Strategy Call" | New nav (04 §8) |
| `src/components/Footer.tsx:8-35` | Stats strip; 8 deprecated or merged service links; Case Studies, Pricing, FAQ, Locations; "Join the Crew" | New footer (04 §9) |
| `src/components/home/Hero.tsx` | "See Case Studies" → `/work` | "Explore Our Capabilities" → `/services` |
| `src/components/home/SendUsEmail.tsx:22` (14 pages) | "Book a Strategy Call" → `/hire` | "Discuss Your Cloud Strategy" → `/contact` |
| `src/components/services/Services.tsx` (home panels) | team-services, web-app-development, cloud-devops, data-automation | The five pillar pages |
| `src/components/work/Projects.tsx` (home) | "View All Work" → `/work` | Remove the section (07 §4) |
| `src/components/services/ServiceRelatedWork.tsx` | `/work/*` on every service page | Remove the component from the service template |
| `src/app/services/[slug]/page.tsx` | Back link `/services`, CTA `/contact` | Keep; the template is rebuilt per 07 §6 |
| `src/app/careers/page.tsx` | "View our work" → `/work` (hero and CTA) | Remove or → `/our-approach` |
| `src/app/locations/[slug]/page.tsx` | `/work`, `/services` | Page removed |
| `src/app/not-found.tsx` | Our Work, Pricing | Services, Cloud Platforms, Compliance, Contact |
| `src/resources/blog.ts` (retained posts) | `/services/cloud-devops` (12×) | The most specific new page per post: `/services/devops`, `/services/devsecops`, `/services/cloud-consulting`, `/services/managed-cloud-services#cost-optimization` |
| `src/resources/blog.ts` | `/services/security-quality` (6×) | `/services/cloud-security` or `/services/devsecops` (supply chain, OWASP) |
| `src/resources/blog.ts` | Links from retained posts to hidden or retired posts: `technical-debt…`, `redis-patterns…`, `database-performance…`, `code-review-culture…` | Remove, or point to a retained post on the same topic |
| `src/resources/blog.ts` (hidden posts) | `/services/startup-mvp-development`, `/services/team-services`, `/pricing`, `/work/*`, retired posts | Remove |
| Blog post sidebar | "Work with us" → `/contact` | "Discuss Your Cloud Strategy" → `/contact` |
| `src/components/contact/*` | Hire-a-Developer tab, Apply tab, staffing service options, "Bid Price" | One form; job applications go via Careers (and the CV upload bug is fixed or removed: 01 §15) |
| `src/resources/once-ui.config.js` | `routes`, `protectedRoutes` include `/work`, `/pricing`, `/faq`, `/locations`, `/hire` | Match the new route list |
| `src/app/layout.tsx:24-28, 251` | Two keyword sets for web and mobile development | Remove the manual `<meta name="keywords">`; keywords carry no ranking weight |
| `public/manifest.json` | "Elite Software Agency" | New name/description |

### Structured-data changes

| Schema | Where | Change |
|---|---|---|
| `Organization` | layout | New description (cloud, DevSecOps, security, compliance). `legalName` only once V-06 is confirmed. Remove `foundingDate` until V-08 is confirmed. `sameAs` only verified profiles (V-11). Contact details per V-10. Optional `knowsAbout` listing the five pillars. No `award`, `hasCredential` or `memberOf` for statuses not held. |
| `WebSite` | layout | New description |
| `Service` | each pillar, capability, platform and framework page | `serviceType` = page name; `provider` = Organization @id; `areaServed` only where verified (V-19); no `offers` or prices unless V-04 is yes and prices are published |
| `BreadcrumbList` | all pages except home | Add a visible breadcrumb UI to match (today it is JSON-LD only) |
| `FAQPage` | page-level FAQs | Optional. Google shows FAQ rich results only for a small set of authoritative sites, so do not expect a SERP feature. If used, it must match the visible FAQ exactly. Remove the `/faq` markup with the page. |
| `PriceSpecification` | `/pricing` | Remove with the page (it currently contradicts the visible prices) |
| `JobPosting` | `/careers` | Only for real, current openings (V-20). Remove the generic "Senior Software Engineer" posting |
| `ProfessionalService` | location pages | Remove with the pages |
| `BlogPosting` | posts | `author` as `Person` with one consistent name and title (V-09); per-post `image` when available; `dateModified` from `updated` |
| `AboutPage`, `ContactPage` | about, contact | Keep, with corrected Organization data |
| Do not add | anywhere | `Review`, `AggregateRating`, or client `Organization` entities implying endorsement |

---

## 4. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Traffic loss from 32 410s | Lost visits, mostly for deprecated terms (web, mobile, MVP, gaming). That traffic does not fit the new audience. | Accepted by design. Step 1 data pull: any 410 URL with relevant backlinks gets a 301 to a genuinely related page instead |
| Redirects to unrelated pages being read as soft 404s | Search equity wasted, user confusion | 301 only where intent survives (12 cases); 410 elsewhere |
| Gated pages not ready at launch | Redirects pointing at missing pages | Fallback targets (rule at top); never deploy a redirect before its target |
| Redirect chains (`www` + config; `/projects`) | Slower, diluted signals | Fixes in §3 |
| Cannibalisation (devops ↔ devsecops; cloud-consulting ↔ cloud-migration; pillar ↔ platform) | Pages compete for the same terms | Guards in 04 §4; one primary keyword theme per page |
| Thin platform or framework pages | Poor rankings and a credibility hit with expert buyers | Gating on V-01/V-03; minimum content per 07 §6 |
| Soft 404s if RouteGuard is used to hide pages | Hidden pages still return 200 and stay in the sitemap | Use 410 or noindex as specified, not RouteGuard |
| Compliance wording read as a guarantee | Legal and reputational exposure | Language rules in 07 §8, applied to every page, schema and meta description |
| No baseline data | Cannot measure the impact of the migration | Export Search Console (12 months of pages and queries) and GA4 landing pages before launch; annotate the launch date |
| Hidden posts still discoverable | Off-message content found through old links | noindex plus removed from all listings; switch to 410 if the client prefers |
| Client logos (Atmosera and Deloitte are also competitors) | Permission, brand-guideline or relationship issues | V-02 and V-18 are required before any logo goes live; see 07 §7 |

---

## 5. Approval gate

This plan is not to be implemented in part. The redirect list, the gone list, the noindex flags, the sitemap/robots changes and the internal-link cleanup ship together, in one release, after approval of this document and of decisions A-01 to A-14 in 04.
