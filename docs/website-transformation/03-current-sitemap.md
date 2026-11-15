# 03 — Current Sitemap (Stage 1, as-is)

Source of truth: `src/app/**/page.tsx`, the data arrays that feed `generateStaticParams`, `src/components/Header.tsx`, `src/components/Footer.tsx`, in-page `<Link>`s, `src/app/sitemap.ts`, `src/app/robots.ts`, `next.config.mjs`, `src/middleware.ts`, `src/components/RouteGuard.tsx`. Links were verified by grepping `href` in source, not assumed. No build was run.

Status column = **preliminary** recommendation against the new positioning (Cloud, DevOps/DevSecOps, Cloud Security/Cybersecurity, Compliance; Work hidden). Final decisions belong to Stage 2.

---

## 1. Route tree

```
/                                         Home
├── about                                 About
├── services                              Services hub (15 cards)
│   ├── web-app-development
│   ├── cloud-devops
│   ├── e-commerce
│   ├── security-quality
│   ├── data-automation
│   ├── microsoft-solutions
│   ├── digital-marketing
│   ├── team-services
│   ├── emerging-tech
│   ├── gaming
│   ├── fintech-software-development      (category "Industry Vertical")
│   ├── saas-development                  (Industry Vertical)
│   ├── startup-mvp-development           (Industry Vertical)
│   ├── healthcare-software-development   (Industry Vertical)
│   └── ecommerce-development             (Industry Vertical)
├── work                                  Portfolio / case studies
│   ├── localised
│   ├── boxo
│   ├── stay-with-lumina
│   ├── cashcloud
│   ├── outreside
│   ├── nice2stay
│   ├── codly
│   ├── alert-management
│   └── deeplawn
├── blog                                  Blog listing (client-side category filter)
│   └── [32 posts — see §1.1]
├── locations                             Geo hub
│   ├── software-agency-canada
│   ├── software-agency-toronto
│   ├── software-agency-united-states
│   ├── software-agency-united-kingdom
│   └── software-agency-australia
├── pricing
├── careers
├── faq
├── contact
├── hire                                  (noindex; not in sitemap)
├── privacy-policy
├── terms
└── (404) not-found

Non-page endpoints
├── /api/authenticate        POST  password gate
├── /api/check-auth          GET   password gate
├── /api/og/generate?title=  GET   dynamic OG image
├── /sitemap.xml                    metadata route
├── /robots.txt                     metadata route
├── /icon.svg                       app icon convention
└── /manifest.json, /favicon.*      static (public/)

Redirects (next.config.mjs, 308 permanent)
├── /projects        → /work
└── /projects/:slug  → /work/:slug

Host redirect (middleware, 301): www.algocrew.io and *.vercel.app → https://algocrew.io (path kept)
```

Counts: 13 static pages + 15 service + 9 work + 32 blog + 5 location = **74 page URLs** (+ 404).

Slug sources:
- `/services/[slug]` → `categorizedServices[].slug` in `src/resources/categorizedServices.js`
- `/work/[slug]` → `ourProjects[].slug` in `src/resources/ourProjects.js`
- `/blog/[slug]` → `blogPosts[].slug` in `src/resources/blog.ts`
- `/locations/[slug]` → `locations[].slug` in `src/resources/locations.ts`

`dynamicParams` is not disabled, so any other slug under these segments renders on demand and returns `notFound()`.

Not routes: `includes[].slug` values inside service entries (e.g. `devops`, `penetration-testing`) are display-only; `src/app/work/projects/*.mdx` (3 template files) are not routed and unused. `protectedRoutes` lists `/work/automate-design-handovers-with-a-figma-to-code-pipeline`, which resolves to 404 because that slug is not in `ourProjects`.

### 1.1 Blog slugs (32), in source order

| # | Slug | Category | Date |
|---|---|---|---|
| 1 | why-senior-only-teams-ship-faster | Engineering Culture | 2025-05-12 (featured) |
| 2 | async-first-engineering-culture | Engineering Culture | 2025-04-28 |
| 3 | milestone-billing-vs-hourly | Business | 2025-04-14 |
| 4 | nextjs-15-app-router-production-lessons | Engineering | 2025-03-30 |
| 5 | building-ai-features-that-actually-work | AI / ML | 2025-03-15 |
| 6 | kubernetes-vs-ecs-2025 | DevOps | 2025-02-28 |
| 7 | react-native-vs-flutter-2025 | Mobile | 2025-02-10 |
| 8 | technical-debt-is-not-always-bad | Engineering | 2025-01-25 |
| 9 | how-to-scope-an-mvp-correctly | Product | 2025-01-12 |
| 10 | postgres-vs-mongodb-choose-right | Engineering | 2024-12-20 |
| 11 | ci-cd-pipeline-best-practices-2025 | DevOps | 2024-12-05 |
| 12 | code-review-culture-that-ships | Engineering Culture | 2024-11-18 |
| 13 | zero-trust-security-architecture-guide | Security | 2025-05-01 |
| 14 | owasp-top-10-2025-developer-guide | Security | 2025-04-20 |
| 15 | docker-production-best-practices | DevOps | 2025-04-05 |
| 16 | terraform-infrastructure-as-code-patterns | DevOps | 2025-03-22 |
| 17 | api-security-best-practices-2025 | Security | 2025-03-08 |
| 18 | observability-beyond-monitoring | DevOps | 2025-02-18 |
| 19 | aws-cost-optimisation-engineering-guide | DevOps | 2025-01-30 |
| 20 | jwt-security-common-mistakes | Security | 2025-01-18 |
| 21 | microservices-vs-monolith-honest-guide | Engineering | 2025-01-05 |
| 22 | redis-patterns-production | Engineering | 2024-11-30 |
| 23 | typescript-advanced-patterns-2025 | Engineering | 2024-11-10 |
| 24 | web-performance-core-web-vitals-2025 | Engineering | 2024-10-28 |
| 25 | database-performance-optimisation | Engineering | 2024-10-12 |
| 26 | kubernetes-security-hardening | Security | 2024-09-28 |
| 27 | sre-practices-for-startups | DevOps | 2024-09-10 |
| 28 | event-driven-architecture-patterns | Engineering | 2024-08-25 |
| 29 | supply-chain-security-software | Security | 2024-08-10 |
| 30 | serverless-vs-containers-2025 | DevOps | 2024-07-22 |
| 31 | hiring-senior-engineers-remotely | Engineering Culture | 2024-07-05 |
| 32 | graphql-vs-rest-2025 | Engineering | 2024-06-18 |

---

## 2. Navigation hierarchy

### 2.1 Header (`src/components/Header.tsx:9-15`, desktop and mobile drawer)

| Item | Target |
|---|---|
| Logo "AlgoCrew" | `/` |
| Home | `/` |
| Services | `/services` (no dropdown) |
| Work | `/work` |
| Pricing | `/pricing` |
| Careers (badge "Hiring") | `/careers` |
| About | `/about` |
| Contact | `/contact` |
| CTA "Get Started" | `/contact` |
| Mobile-only CTAs | "Book a Strategy Call →" `/contact`; "We're hiring, View open roles" `/careers` |
| ThemeToggle | (no link) |

Not in header: `/blog`, `/faq`, `/locations`, `/hire`, any service detail page, legal pages.

### 2.2 Footer (`src/components/Footer.tsx`)

- **Services column (15-24):** `/services/web-app-development` (label "Product Engineering"), `/services/cloud-devops`, `/services/data-automation` ("Data & AI"), `/services/team-services` ("Strategic Staffing"), `/services/fintech-software-development`, `/services/saas-development`, `/services/startup-mvp-development` ("MVP Development"), `/services/ecommerce-development` ("E-Commerce").
- **Company column (26-35):** `/about`, `/work` ("Case Studies"), `/pricing`, `/careers`, `/blog`, `/faq`, `/locations`, `/contact`.
- **CTA column:** `/contact` ("Start a Project"), `/careers` ("Join the Crew").
- **Bottom bar:** `/privacy-policy`, `/terms`.
- **External:** LinkedIn, GitHub, X, `mailto:query@algocrew.io`, `tel:+14374509656`.

Not in footer: `/services` hub itself, `/services/security-quality`, `/services/healthcare-software-development`, and the other 5 service pages (e-commerce, microsoft-solutions, digital-marketing, emerging-tech, gaming), `/hire`.

### 2.3 Reachable only through contextual / internal links

| Route(s) | Only reached via |
|---|---|
| `/services/e-commerce`, `/services/microsoft-solutions`, `/services/digital-marketing`, `/services/emerging-tech`, `/services/gaming`, `/services/healthcare-software-development` | `/services` grid card only |
| `/services/security-quality` | `/services` grid + 6 links inside blog bodies |
| `/work/{slug}` (9) | `/work` grid (`WorkGrid`), "Related work" on every service detail page (`ServiceRelatedWork`, 3 per page), prev/next on project pages, blog bodies (`localised`, `boxo`, `cashcloud`) |
| `/blog/{slug}` (32) | `/blog` listing, related-posts on post pages, cross-links inside post bodies |
| `/locations/{slug}` (5) | `/locations` hub only |
| `/hire` | "Book a Strategy Call" button in `SendUsEmail` (`src/components/home/SendUsEmail.tsx:22`) on 14 pages |
| `/blog`, `/faq`, `/locations` | footer only (plus back-links) |

Homepage contextual links: Hero → `/contact`, `/work`; Services panels → `/services/team-services`, `/services/web-app-development`, `/services/cloud-devops`, `/services/data-automation`; Projects → `/work`; SendUsEmail → `/contact`, `/hire`.

Other contextual links to `/work`: careers hero + CTA, location detail hero, 404 page, project-detail back link, `/services/[slug]` "View all".

### 2.4 Orphan routes

- **No orphan pages** among the 74 real URLs: every one has at least one inbound internal link.
- Weakly linked: the 6 service pages reachable only from the `/services` grid; the 5 location pages (one hub link each); `/hire` (CTA only, noindex, absent from sitemap).
- Config-only path with no page: `/work/automate-design-handovers-with-a-figma-to-code-pipeline` (in `protectedRoutes`, 404s).

---

## 3. Page inventory

Abbreviations for shared dependencies: **SUE** = `components/home/SendUsEmail.tsx`; **Layout** = root layout + Header + Footer + RouteGuard (applies to every page and is not repeated).

### 3.1 Core and company pages

| Route | Page Name | Page Type | Current Purpose | Status | Proposed Route | Dependencies (components · data · inbound links) |
|---|---|---|---|---|---|---|
| `/` | Home | home | Generalist agency homepage: digital products, staffing, product engineering, case studies | Modify | `/` | Hero (+WIP three/), OfferingTechnologies, Services, TrustStrip, StatsBento, ProcessSteps, WhyChooseUs, TechShowcase, work/Projects (+ProjectIllustrations), about/Details, Testimonals, home/FAQ, SUE · `content.js` `home` · header, footer logo, 404 |
| `/services` | Services hub | service hub | Grid of all 15 service/industry entries + process, testimonials, FAQ | Modify | TBD in Stage 2 | ProcessSteps, Testimonals, home/FAQ, SUE · `categorizedServices.js` · header, 404, Parallax back link, location pages |
| `/about` | About | company | Company story, stats, why-us, values, timeline | Modify | `/about` | AboutWhyUs, AboutValues, AboutVision, SUE · inline copy · header, footer, 404 |
| `/contact` | Contact | conversion | 3-tab form (hire / inquiry / job), other channels | Modify | `/contact` | ContactHero, FormToggler (ContactForm, HireDeveloperForm, DeveloperRoleSelector, JobApplicationForm), ContactOptions, SUE · EmailJS, Cal.com link · header CTA, footer, ~every page |
| `/hire` | Hire a Developer | conversion / utility | Bare FormToggler; target of "Book a Strategy Call" | Merge (into /contact or a booking page) | TBD in Stage 2 | FormToggler · `content.js` `hire` · SUE on 14 pages |
| `/pricing` | Pricing | company / commercial | Sprint / Studio / Enterprise build-team plans | Modify (or Hide — business call) | TBD in Stage 2 | CompareTable, FaqAccordion, SUE · inline · header, footer, 404, 1 blog post |
| `/careers` | Careers | company | Open roles (incl. UX/UI, Mobile), perks, hiring process | Modify | `/careers` | RolesSection, PerksSection, ProcessSection, SUE · inline · header, footer |
| `/faq` | FAQ | utility | 19 generic agency Q&As + FAQPage schema | Modify | `/faq` | SUE · inline · footer |
| `/locations` | Locations hub | geo landing | Lists 5 geo pages | Modify | TBD in Stage 2 | SUE · `locations.ts` · footer |
| `/blog` | Blog | blog | Listing with category filter | Keep (modify categories) | `/blog` | BlogListing, SUE · `blog.ts` · footer, post back links |
| `/work` | Our Work | portfolio | Case study grid | Hide | — | WorkHero, WorkGrid, SUE · `ourProjects.js`, `content.js` `work` · header, footer, hero, home Projects, careers, locations, service pages, 404, blog |
| `/privacy-policy` | Privacy Policy | legal | Privacy notice (Jan 2025, "AlgoCrew Ltd.", lists Plausible) | Modify | `/privacy-policy` | legal.module.scss · footer |
| `/terms` | Terms | legal | Terms (England & Wales law) | Modify (verify) | `/terms` | legal.module.scss · footer |
| (404) | Not found | utility | Recovery links incl. /work | Modify | — | not-found.module.scss · RouteGuard, Next |

### 3.2 Service detail pages (`/services/[slug]`)

All share: Parallax, IncludedServices, Steps, ServiceRelatedWork (→ `ourProjects.js`), home/FAQ, SUE, ServiceSchema · data `categorizedServices.js` · inbound: `/services` grid (all), plus the extra links listed.

| Route | Page Name | Page Type | Current Purpose | Status | Proposed Route | Extra inbound links / notes |
|---|---|---|---|---|---|---|
| `/services/cloud-devops` | Cloud & DevOps | service | Cloud app dev, migration, integration, DevOps, CI/CD, compliance, containers, IaC, monitoring | Modify (core; likely split) | TBD in Stage 2 | footer, home panel, 12 blog links |
| `/services/security-quality` | Security & Quality | service | Pen testing, audits, cyber consulting + QA/manual/automation testing | Modify (core security; drop/merge QA) | TBD in Stage 2 | 6 blog links; not in footer |
| `/services/fintech-software-development` | Fintech Software Development | industry | Payment platforms, banking dashboards, PCI-DSS/SOC 2, fraud, crypto | Modify (reframe to compliance/security for fintech) | TBD in Stage 2 | footer; image `webapp.jpg` missing |
| `/services/healthcare-software-development` | Healthcare Software Development | industry | Patient portals, telemedicine, EHR, HIPAA | Modify (reframe to HIPAA compliance/cloud) | TBD in Stage 2 | grid only; image missing |
| `/services/team-services` | Team & Support Services | service | Staff augmentation, dedicated teams, IT consulting | Hide / TBD (staffing is a business decision) | TBD in Stage 2 | footer, home panel, 2 blog links |
| `/services/data-automation` | Data, AI & Automation | service | AI/ML, GenAI, analytics, BI, RPA, Power Apps | Retire (or Hide — business call) | — | footer, home panel, 1 blog link |
| `/services/microsoft-solutions` | Microsoft Solutions | service | D365 ERP/CRM, Power Apps | Retire (or Merge if Azure work overlaps — business call) | — | grid only |
| `/services/web-app-development` | Web & App Development | service (deprecated) | Web, mobile, custom software, SaaS, MVP, WordPress, UX/UI | Retire | — | footer ("Product Engineering"), home panel, 6 blog links |
| `/services/e-commerce` | E-commerce | service (deprecated) | Store dev, Shopify, WooCommerce | Retire | — | grid only |
| `/services/ecommerce-development` | E-Commerce Development | industry (deprecated) | Headless commerce, storefronts, marketplaces | Retire | — | footer; duplicates `/services/e-commerce`; image missing |
| `/services/digital-marketing` | Digital Marketing | service (deprecated) | SEO, SMM, PPC, influencer, CRO | Retire | — | grid only |
| `/services/emerging-tech` | Emerging Tech | service (deprecated) | Metaverse, AR, blockchain, GenAI | Retire | — | grid only |
| `/services/gaming` | Gaming | service (deprecated) | Game art, Unity, Unreal, Web3, AR/VR | Retire | — | grid only |
| `/services/saas-development` | SaaS Development | industry (deprecated) | Multi-tenant SaaS product builds | Retire | — | footer, 1 blog link; image missing |
| `/services/startup-mvp-development` | Startup MVP Development | industry (deprecated) | 6–10 week MVP builds | Retire | — | footer, 3 blog links; image missing |

### 3.3 Work pages (`/work/[slug]`)

All share: ProjectDetail, SUE, Once UI Schema · data `ourProjects.js` · inbound: `/work` grid, ServiceRelatedWork, prev/next. Status **Hide** for all (per brief); proposed route —.

| Route | Page Name (client — title) | Notes |
|---|---|---|
| `/work/localised` | Localised — Global Designer E-commerce Infrastructure | AWS/Drata SOC 2 story; linked from blog |
| `/work/boxo` | Boxo — E-commerce Analytics & Mini-app Ecosystem | K8s/Terraform/GCP; linked from blog |
| `/work/stay-with-lumina` | Stay with Lumina — Luxury Vacation Rental Marketplace | web build |
| `/work/cashcloud` | Get Cash Cloud — FinTech Vendor Transaction Management | AWS/Sprinto PCI-DSS; linked from blog |
| `/work/outreside` | Outreside — Swiss Premium Outdoor E-commerce | web build |
| `/work/nice2stay` | Nice2stay — Editorial Travel & Villa Marketplace | web build / SEO |
| `/work/codly` | Codly — Dynamic QR Code SaaS Platform | SaaS build |
| `/work/alert-management` | Alert Management System — Infrastructure SRE & Incident Response | SRE/observability; no external link |
| `/work/deeplawn` | Deeplawn — AI-Driven Lawn Care Automation | CRO/analytics |

Note: four of these (localised, boxo, cashcloud, alert-management) are cloud/DevOps/compliance stories; whether any content is reused in an anonymised form is a Stage 2 question.

### 3.4 Location pages (`/locations/[slug]`)

All share: location.module.scss, SUE, ProfessionalService JSON-LD · data `locations.ts` · inbound: `/locations` only. Status **Modify** (content lists web/mobile/SaaS services; slugs say "software-agency"); proposed route TBD in Stage 2.

| Route | Page Name (headline) |
|---|---|
| `/locations/software-agency-canada` | Canada's Senior-Only Software Agency |
| `/locations/software-agency-toronto` | Toronto Software Development Agency |
| `/locations/software-agency-united-states` | US-Ready Software Development Agency |
| `/locations/software-agency-united-kingdom` | UK Software Development Partner |
| `/locations/software-agency-australia` | Australian Software Development Partner |

### 3.5 Blog posts (`/blog/[slug]`)

All share: `blog/[slug]/page.tsx`, ShareButton, SUE, BlogPosting JSON-LD · data `blog.ts` · inbound: `/blog` listing, related posts, body cross-links. Page type: blog. Proposed route: `/blog/{same slug}` for Keep/Modify; — for Retire.

| Slug | Status | Reason |
|---|---|---|
| kubernetes-vs-ecs-2025 | Keep | DevOps |
| ci-cd-pipeline-best-practices-2025 | Keep | DevOps (check body links to /services/web-app-development) |
| docker-production-best-practices | Keep | DevOps |
| terraform-infrastructure-as-code-patterns | Keep | DevOps / IaC |
| observability-beyond-monitoring | Keep | DevOps / SRE |
| aws-cost-optimisation-engineering-guide | Keep | Cloud |
| sre-practices-for-startups | Keep | DevOps / SRE |
| serverless-vs-containers-2025 | Keep | Cloud |
| zero-trust-security-architecture-guide | Keep | Security |
| owasp-top-10-2025-developer-guide | Keep | Security (DevSecOps angle) |
| api-security-best-practices-2025 | Keep | Security |
| jwt-security-common-mistakes | Keep | Security |
| kubernetes-security-hardening | Keep | Cloud security |
| supply-chain-security-software | Keep | DevSecOps |
| why-senior-only-teams-ship-faster | Modify | Culture post; links MVP service and /work/localised |
| async-first-engineering-culture | Modify / TBD | Culture |
| code-review-culture-that-ships | Modify / TBD | Culture |
| hiring-senior-engineers-remotely | Modify / TBD | Culture / recruiting |
| milestone-billing-vs-hourly | Modify / TBD | Commercial model |
| microservices-vs-monolith-honest-guide | TBD | Architecture; borderline |
| event-driven-architecture-patterns | TBD | Architecture; borderline |
| database-performance-optimisation | TBD | General software |
| technical-debt-is-not-always-bad | TBD | General software |
| building-ai-features-that-actually-work | Retire / TBD | AI product build |
| postgres-vs-mongodb-choose-right | Retire / TBD | General software |
| redis-patterns-production | Retire / TBD | General software |
| nextjs-15-app-router-production-lessons | Retire | Web development |
| typescript-advanced-patterns-2025 | Retire | Web/general software |
| web-performance-core-web-vitals-2025 | Retire | Web development |
| graphql-vs-rest-2025 | Retire | General software / API dev |
| how-to-scope-an-mvp-correctly | Retire | MVP/product build |
| react-native-vs-flutter-2025 | Retire | Mobile |

Retiring a post needs a redirect decision (Stage 2); several Keep posts link into Retire posts and deprecated service pages.

### 3.6 Non-page endpoints

| Route | Type | Purpose | Status | Notes |
|---|---|---|---|---|
| `/api/og/generate` | API | OG images for services, work, careers, pricing | Keep | Under robots-disallowed `/api/` |
| `/api/authenticate`, `/api/check-auth` | API | Password gate | TBD (unused today) | Protects a non-existent page |
| `/sitemap.xml` | metadata | Sitemap | Modify | See §4 |
| `/robots.txt` | metadata | Robots | Modify (if hidden routes need disallow/noindex) | |
| `/projects`, `/projects/:slug` | redirect | → `/work` | Modify (target will be hidden) | Redirect chain risk once /work is redirected |

---

## 4. sitemap.xml / robots.txt vs reality

### What `src/app/sitemap.ts` emits (73 URLs)

| Group | Count | Source | priority / changefreq | lastModified |
|---|---|---|---|---|
| Static | 12 | hard-coded list (lines 11-24): `/`, `/services`, `/work`, `/pricing`, `/about`, `/careers`, `/blog`, `/faq`, `/locations`, `/contact`, `/privacy-policy`, `/terms` | 1.0 → 0.3 | build time |
| Services | 15 | `categorizedServices` | 0.8 monthly | build time |
| Blog | 32 | `blogPosts` | 0.7 monthly | `post.date` (ignores `updated`); image always `og/home.jpg` |
| Work | 9 | `ourProjects` | 0.7 monthly | build time; image `p.img` |
| Locations | 5 | `locations` | 0.8 monthly | build time |

### Comparison

| Route(s) | Exists | In sitemap | Indexable | Note |
|---|---|---|---|---|
| 13 static pages except `/hire` | yes | yes | yes | |
| `/hire` | yes | **no** | `noindex, follow` (`hire/page.tsx:23`) | Consistent; but it is linked from 14 pages |
| 15 service pages | yes | yes | yes | All deprecated service pages are advertised to search engines today |
| 9 work pages + `/work` | yes | yes | yes | Will need removing/redirecting when Work is hidden |
| 32 blog posts | yes | yes | yes | |
| 5 location pages + hub | yes | yes | yes | |
| `/api/*` | yes | no | disallowed in robots | OG images live under a disallowed path |
| `/projects*` | redirect only | no | — | |
| `/work/automate-design-handovers-…` | no (404) | no | — | Only in `protectedRoutes` config |

Sitemap and real pages match one-to-one except for the intentional `/hire` exclusion. Nothing in the sitemap 404s. Note that the sitemap is built from the same arrays as the pages, so hiding a route in `RouteGuard` alone (`routes["/work"]=false`) would **not** remove it from the sitemap — it would keep advertising URLs that then show a soft 404 with HTTP 200.

### `src/app/robots.ts`

```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://algocrew.io/sitemap.xml
Host: https://algocrew.io
```

No per-route disallows; `/hire` is deliberately crawlable so its noindex can be read.

---

## 5. Open questions for Stage 2 (not decided here)

- Fate of staffing (`/services/team-services`, `/hire`, Hire-a-Developer form) and of `/pricing` (current plans are build-team pricing).
- Whether AI/Data and Microsoft D365 lines are retired or hidden.
- Whether the location pages stay as geo landing pages under new slugs.
- Redirect map for 10+ retired service pages, ~8 retired posts, and the 10 hidden work URLs (and the existing `/projects` redirect that points at `/work`).
