# 01 — Existing Website Audit (Stage 1, research only)

Repo: `/Users/devdensmbp/Projects/AlgoCrew` · Branch: `main` (HEAD `99acaac`) · Audit date: 2026-11-11

Scope: document what exists today. No code was changed, no dev server was run, nothing was built. `node_modules/` is **not present** in the working copy, so anything that depends on library internals (e.g. exactly what Once UI's `Meta.generate` / `<Schema>` emit) is marked as unverified.

Target positioning, for context only: Cloud (Azure/AWS/GCP), DevOps/DevSecOps, Cloud Security/Cybersecurity, Compliance (HIPAA, GDPR, PCI DSS, PIPEDA). Work/Portfolio/Case Studies to be hidden.

"Deprecated" in this doc means: web development, gaming, mobile apps, general/custom software, creative/design (UI/UX), plus adjacent generalist lines found in the code (e-commerce, digital marketing, emerging tech/metaverse/blockchain, Microsoft D365/Power Apps, MVP/SaaS product building, staff augmentation). Whether the adjacent lines are deprecated is a business call; they are flagged so Stage 2 can decide.

---

## 1. Stack, versions and architecture

| Item | Value | Evidence |
|---|---|---|
| Framework | Next.js App Router, `next ^15.3.1` (lockfile resolves **15.5.9**) | `package.json`, `package-lock.json` |
| React | `react` / `react-dom` **19.0.0** (types are `@types/react ^18.3.20` — mismatch) | `package.json` |
| Language | TypeScript 5.8, `strict: true`, `allowJs: true` (data files are `.js`) | `tsconfig.json` |
| Path alias | `@/*` → `./src/*` | `tsconfig.json` |
| UI library | **Once UI** `@once-ui-system/core ^1.2.4` (lockfile 1.3.10) — layout primitives, ThemeProvider, `Meta`, `Schema`, form inputs | `src/app/layout.tsx:1-8`, `src/components/Providers.tsx` |
| Styling | SCSS modules (60 `*.module.scss` files), Sass `^1.86.3` (modern compiler), global `src/app/global.scss`, tokens in `src/resources/custom.css`; Tailwind v4 is installed and imported but almost unused (see §8) | `next.config.mjs:14-17`, `postcss.config.mjs`, `src/app/global.scss:1` |
| MDX | `@next/mdx`, `next-mdx-remote`, `gray-matter`; `pageExtensions: ts,tsx,md,mdx`. No live route uses MDX (see §5) | `next.config.mjs:3-13` |
| Animation | `gsap ^3.13.0` (+ ScrollTrigger), `lenis ^1.3.23` smooth scroll | `package.json`, `src/components/SmoothScroll.tsx` |
| 3D (WIP, uncommitted) | `three`, `@react-three/fiber`, `@react-three/drei` are imported but **not in package.json or package-lock.json** | `src/components/home/three/*.tsx` |
| Icons | `react-icons ^5.5.0` (hi2, pi, fa6, io5, si, tb, vsc) | `src/resources/icons.ts` |
| Forms / email | `@emailjs/browser ^4.4.1` (client-side) | `src/components/contact/*Form.tsx` |
| Scheduling | `@calcom/embed-react ^1.5.3` — only used by dead components | `src/components/Calendars/*` |
| Auth helper | `cookie ^1.0.2` for password-gate API | `src/app/api/authenticate/route.ts` |
| Lint/format | ESLint 9 with legacy `.eslintrc.json` (`next/core-web-vitals`); `biome.json` also present (formatter + linter, not wired into scripts) | `.eslintrc.json`, `biome.json` |
| Scripts | `dev`, `build`, `start`, `lint`, and `export: next export` (command removed in Next 14+, will fail) | `package.json` |
| Version | `algocrew` v2.2.0 | `package.json` |

Project docs: `README.md` still describes the company as "a modern web agency" and lists Custom Web Development, Mobile App Development, Gaming, UI/UX Design, E-Commerce, etc. No `CLAUDE.md` exists. `.claude/launch.json` defines one dev config (`npm run dev`, port 3000). `LICENSE` is MIT.

### Architecture summary

- Single root layout `src/app/layout.tsx` wraps every page in `<Providers>` → `<Header/>` → `<RouteGuard>{children}</RouteGuard>` → `<Footer/>`.
- All content is hard-coded in TS/JS data files under `src/resources/` or inline in page/component files. No CMS, no database, no runtime data fetching.
- All dynamic routes use `generateStaticParams` from in-repo arrays, so the whole site is effectively SSG. Only the API routes and middleware run at request time.

### Rendering mode per route (from source; not confirmed by a build)

| Route | Mode | Notes |
|---|---|---|
| `/` | Static | No dynamic APIs used |
| `/about`, `/blog`, `/careers`, `/contact`, `/services` | Static, forced | `export const dynamic = "force-static"` at line 1 |
| `/faq`, `/hire`, `/locations`, `/pricing`, `/privacy-policy`, `/terms`, `/work` | Static (implicit) | |
| `/services/[slug]`, `/blog/[slug]`, `/work/[slug]`, `/locations/[slug]` | SSG via `generateStaticParams` | `dynamicParams` not set (defaults to `true`), so unknown slugs render on demand and hit `notFound()` |
| `/api/authenticate` (POST), `/api/check-auth` (GET) | Dynamic (Node) | |
| `/api/og/generate` | Dynamic, `runtime = "nodejs"` | Fetches Google Fonts on every request (`route.tsx:10-23`) |
| `/sitemap.xml`, `/robots.txt` | Metadata routes | `src/app/sitemap.ts`, `src/app/robots.ts` |
| `/icon.svg` | Metadata file convention | `src/app/icon.svg`. `src/app/favicon.svg` is **not** a Next convention (only `favicon.ico` is); the served `/favicon.svg` comes from `public/` |

### Hosting / deploy

- No `vercel.json`, `wrangler.*`, `netlify.toml`, Dockerfile or CI workflow in the repo.
- Vercel is inferred: middleware 301-redirects `*.vercel.app` to the apex (`src/middleware.ts:15-16`), `.gitignore` ignores `.vercel`, and the Privacy Policy lists "Vercel, website hosting" (`src/app/privacy-policy/page.tsx:73`).
- Canonical host is `https://algocrew.io` (`src/resources/once-ui.config.js:5`, `src/middleware.ts:7`).

### Environment variables

| Var | Used in | Notes |
|---|---|---|
| `PAGE_ACCESS_PASSWORD` | `src/app/api/authenticate/route.ts:7` | `.env.example` sets it to the literal `password` |
| `NODE_ENV` | `src/app/api/authenticate/route.ts:21` | cookie `secure` flag |

No other `process.env` usage. EmailJS service/template IDs and public key, GA4 ID (`G-WPN816FH63`) and the Tawk.to property ID are hard-coded in source.

---

## 2. Routing configuration

### App Router pages (`src/app/**/page.tsx`)

| Route | File | Slug source |
|---|---|---|
| `/` | `src/app/page.tsx` | — |
| `/about` | `src/app/about/page.tsx` | — |
| `/blog` | `src/app/blog/page.tsx` (+ client `BlogClient.tsx`) | — |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | `blogPosts` in `src/resources/blog.ts` (32 posts) |
| `/careers` | `src/app/careers/page.tsx` (+ `CareersClient.tsx`, `CareersSections.tsx`) | — |
| `/contact` | `src/app/contact/page.tsx` | — |
| `/faq` | `src/app/faq/page.tsx` | — |
| `/hire` | `src/app/hire/page.tsx` | — (`robots: noindex, follow`, line 23) |
| `/locations` | `src/app/locations/page.tsx` | — |
| `/locations/[slug]` | `src/app/locations/[slug]/page.tsx` | `locations` in `src/resources/locations.ts` (5) |
| `/pricing` | `src/app/pricing/page.tsx` (+ `PricingClient.tsx`) | — |
| `/privacy-policy` | `src/app/privacy-policy/page.tsx` | — |
| `/services` | `src/app/services/page.tsx` | — |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` | `categorizedServices` in `src/resources/categorizedServices.js` (15) |
| `/terms` | `src/app/terms/page.tsx` | — |
| `/work` | `src/app/work/page.tsx` | — |
| `/work/[slug]` | `src/app/work/[slug]/page.tsx` | `ourProjects` in `src/resources/ourProjects.js` (9) |
| 404 | `src/app/not-found.tsx` | also rendered by RouteGuard for disabled routes |

Totals: 13 static pages + 61 dynamic pages (15 + 32 + 9 + 5) = **74 page URLs**, plus 3 API routes and 2 metadata routes. Full enumeration is in `03-current-sitemap.md`.

There is no `/industries`, `/solutions`, `/compliance`, `/team` or `/case-studies` route. Industry pages exist only as entries inside `/services/[slug]` (fintech, SaaS, startup MVP, healthcare, e-commerce development). Location pages act as geo landing pages.

### Non-route MDX files

`src/app/work/projects/*.mdx` (3 files: `automate-design-handovers-with-a-figma-to-code-pipeline`, `building-once-ui-a-customizable-design-system`, `simple-portfolio-builder`) are leftovers from the Once UI "magic portfolio" template. They are **not** routes (not named `page.mdx`) and no live code reads them; `getPosts()` in `src/utils/utils.ts:69` is only called by the dead `src/components/blog/Posts.tsx`.

### API routes

| Route | Method | Purpose |
|---|---|---|
| `/api/authenticate` | POST | Compares body `password` to `PAGE_ACCESS_PASSWORD`, sets `authToken=authenticated` httpOnly cookie for 1h |
| `/api/check-auth` | GET | Returns 200 if cookie `authToken === "authenticated"` |
| `/api/og/generate?title=` | GET | Dynamic OG image (`next/og`), dark background, `person.avatar` (`/images/LogoDark.png`) + title; Geist from Google Fonts |

### Middleware

`src/middleware.ts`: 301 from `www.algocrew.io` and any `*.vercel.app` host to `https://algocrew.io`, path preserved. Matcher excludes `_next/static`, `_next/image`, favicon/icon files, `manifest.json`, `robots.txt`, `sitemap.xml`, `images/`.

### Redirects / rewrites / headers (`next.config.mjs`)

- Redirects (permanent): `/projects` → `/work`, `/projects/:slug` → `/work/:slug` (lines 29-34). No rewrites.
- Headers on all routes: X-Frame-Options SAMEORIGIN, nosniff, Referrer-Policy, Permissions-Policy, X-XSS-Protection, DNS prefetch, HSTS with preload (lines 37-56). No Content-Security-Policy.
- Cache headers for `/_next/static/*` (immutable) and `/images/*` (1 day + SWR 7 days).

### RouteGuard and password protection

`src/components/RouteGuard.tsx` (client component, wraps every page in the root layout):
- `routes` allow-list from `src/resources/once-ui.config.js:7-21` (all 13 static routes set to `true`). Prefix matching for `/blog`, `/work`, `/services`, `/locations`, `/faq` (`RouteGuard.tsx:19`).
- If a route is disabled it renders `<NotFound/>` **inside the normal page shell with HTTP 200** (soft 404), lines 80-82. This is a ready-made switch for hiding `/work` (`routes["/work"] = false`), but it would not return a real 404 status and the pages would still be generated and listed in the sitemap.
- `protectedRoutes` (`once-ui.config.js:31-33`) contains only `/work/automate-design-handovers-with-a-figma-to-code-pipeline`, which is **not** a real project slug, so the password gate currently protects nothing.

---

## 3. Global layout, providers, header, footer

### Root layout — `src/app/layout.tsx`

- Imports Once UI `styles.css` + `tokens.css`, then `src/resources/custom.css`, then `src/app/global.scss` (lines 1-4).
- `generateMetadata` (13-82): title template `"%s | AlgoCrew"`, default title/description from `home` in `content.js`, canonical `/`, keywords (web development, mobile app development, …, lines 24-28), OG + Twitter (`@algocrew`) with `/images/og/home.jpg`, robots index/follow, icons, `manifest.json`. Google verification placeholder commented out.
- `<html>` hard-codes `data-theme="dark"` and Once UI data attributes (91-112).
- Inline JSON-LD `@graph` (120-174): `Organization` (name, alternateNames incl. "AlgoCrew Inc.", logo, description "custom software development, cloud solutions, and mobile apps", email `query@algocrew.io`, phone `+1-437-450-9656`, `foundingDate: "2020"`, Brampton ON address, sameAs LinkedIn/GitHub/X) and `WebSite` ("Custom software development agency for web, mobile, cloud and AI.").
- Inline theme-init script (176-233): applies style attributes and resolves theme from `localStorage['data-theme']`, **default dark**.
- GA4 `G-WPN816FH63` via `next/script` afterInteractive (235-244).
- A second hard-coded `<meta name="keywords">` (251), duplicating the metadata keywords.
- Body: skip link → `<Header/>` → `#main-content` → `<RouteGuard>` → `<Footer/>`.
- Tawk.to live chat, loaded on first scroll/pointer/key/touch (291-314).

### Providers — `src/components/Providers.tsx`

Once UI `ThemeProvider` (style from config) → `DataThemeProvider` → `ToastProvider` → `IconProvider` (`src/resources/icons.ts`) → `SmoothScroll` (Lenis + GSAP ScrollTrigger sync).

### Header — `src/components/Header.tsx`

- Floating "island" nav. Logo is text + dot ("AlgoCrew"), not an image.
- Links (lines 9-15): Home `/`, Services `/services`, Work `/work`, Pricing `/pricing`, Careers `/careers` (badge "Hiring"), About `/about`, Contact `/contact`.
- Right cluster: `ThemeToggle`, CTA "Get Started" → `/contact` (96-100).
- Mobile drawer: same links + "Book a Strategy Call →" `/contact` and "We're hiring, View open roles" `/careers` (169-183).
- Not in header: `/blog`, `/faq`, `/locations`, `/hire`, legal pages. No services dropdown/mega-menu.

### Footer — `src/components/Footer.tsx`

- Stats strip (8-13): "Top 1% Engineers only", "8+ Countries served", "48h First commit", "30-day Rolling exit".
- Brand column: tagline "Elite engineering for ambitious teams…", "Accepting new projects" badge, email, phone `+1 (437) 450-9656`, "Brampton, Canada", socials (LinkedIn, GitHub, X, Email).
- Services column (15-24): Product Engineering → `/services/web-app-development`, Cloud & DevOps → `/services/cloud-devops`, Data & AI → `/services/data-automation`, Strategic Staffing → `/services/team-services`, Fintech Development, SaaS Development, MVP Development, E-Commerce → `/services/ecommerce-development`.
- Company column (26-35): About, Case Studies (`/work`), Pricing, Careers, Blog, FAQ, Locations, Contact.
- CTA column: "Start a Project" `/contact`, "Join the Crew →" `/careers`.
- Bottom: "© {year} AlgoCrew Inc.", Privacy, Terms.
- Not linked from footer: `/services/cloud-devops` sub-pages beyond the 8 above, `/services/security-quality` (the closest current match to the new positioning), `/services/healthcare-software-development`, `/hire`.

### Shared CTA — `src/components/home/SendUsEmail.tsx`

Used at the bottom of 14 pages. "Build Something Exceptional →" → `/contact`; "Book a Strategy Call" → **`/hire`** (line 22). This is the only global link to `/hire`.

---

## 4. Homepage — `src/app/page.tsx`

Metadata: `Meta.generate` with `home.title` "AlgoCrew - Delivering Top-Tier IT Solutions and Services" and `home.description` (staffing / project development). `<Schema as="webPage">`. Sections, in order (lines 45-57):

| # | Component | Path | What it shows today | Deprecated / portfolio content |
|---|---|---|---|---|
| 1 | `Hero` | `src/components/home/Hero.tsx` | H1 "We Build / Digital / Experiences", sub "We craft high-performance digital products… fast, precise, cinematic." CTAs "Launch Your Product →" `/contact`, "See Case Studies" `/work`. GSAP intro. **WIP:** dynamic-imported `HeroCanvas` (three.js crystal) layer | Generalist copy; CTA to portfolio |
| 2 | `OfferingTechnologies` | `src/components/services/OfferingTechnologies.tsx` | "TECH STACK — Engineered with Industry Leaders", two marquee rows of ~27 tech pills (AWS, Azure, GCP, Docker, K8s, Terraform, Helm, Vercel, Cloudflare, Supabase, Node, NestJS, FastAPI, GraphQL, Go, OpenAI, Prisma, React, Next.js, TS, Tailwind, Framer, Flutter, Kotlin, Postgres, Redis, Bun, Turborepo). Data is inline, not from `offeringTechnologies.js` | Frontend/mobile items (React, Next, Tailwind, Framer, Flutter, Kotlin) |
| 3 | `Services` | `src/components/services/Services.tsx` | "WHAT WE DO — Our Capabilities", GSAP horizontal-scroll panels (data inline, 8-48): 01 Strategic Staffing → `/services/team-services`; 02 Product Engineering ("Web, mobile, SaaS"; tags Web & Mobile, SaaS, E-commerce) → `/services/web-app-development`; 03 Cloud & DevOps (DevOps, Cybersecurity, Cloud Migration) → `/services/cloud-devops`; 04 Data & AI (Generative AI, Blockchain, AR/VR) → `/services/data-automation` | Panels 01, 02, 04 |
| 4 | `TrustStrip` | `src/components/home/TrustStrip.tsx` | Two marquees: "SOC 2 Aligned", "NDA on Day 1", "HIPAA Ready", "100% IP Transfer", "Zero Lock-in", "ISO 27001 Aligned", "Follow-the-sun", "Secure by Design", "GDPR Compliant", "24 / 7 On-call"; delivery items (Agile, standups, Slack, milestone billing…) | Compliance claims need verification (§13) |
| 5 | `StatsBento` | `src/components/home/StatsBento.tsx` | "BY THE NUMBERS": 48hrs brief→first commit, $50M+ client revenue generated, 18+ countries, 12+ industry verticals, 3 days sprint ramp-up, Top 1% of applicants | Claims |
| 6 | `ProcessSteps` | `src/components/home/ProcessStep.tsx` | "HOW WE WORK": Discover / Build / Evolve | Neutral |
| 7 | `WhyChooseUs` | `src/components/home/WhyChooseUs.tsx` | "THE ALGOCREW EDGE": Global Reach, Speed to Market (48hr matching), Top 1% Talent, AI-First, Security First; stat "98% Client satisfaction rate" | Staffing-oriented |
| 8 | `TechShowcase` | `src/components/home/TechShowcase.tsx` | Second tech grid (AWS, Azure, GCP, K8s, Docker, Terraform, Helm, Service Mesh, Node, Nest, Go, FastAPI, React, Next, GraphQL, Flutter, React Native, Kotlin) | Mobile/frontend items; duplicates section 2 |
| 9 | `Projects` | `src/components/work/Projects.tsx` | "INDUSTRY SOLUTIONS — Transforming Complex Sectors": 4 cards with illustrations: "AI-Powered Trading Infrastructure" (NexaCapital), "Precision HealthTech Platform" (Nexus Health), "Hybrid Cloud Orchestration" (VCloud Systems), "Autonomous Supply Chain AI" (LogiTech Solutions). "View All Work →" `/work` | Portfolio-tied; company names do not match `ourProjects` (see §13) |
| 10 | `Details` | `src/components/about/Details.tsx` | "BY THE NUMBERS — Quality you can count on": 98% client retention, 8 yrs avg experience, 0 critical incidents in prod, 120+ production deployments | Claims; second "by the numbers" block |
| 11 | `AnimatedTestimonials` | `src/components/home/Testimonals.tsx` | 4 testimonials with initials avatars: Sarah Chen (CTO, Meridian Health), Marcus Williams (Founder & CEO, Launchpad, "340% conversion"), Priya Sharma (VP Eng, NovaTech), Daniel Osei (Head of Product, Stackr Labs) | Product-build focused; authenticity unverified |
| 12 | `FAQ` | `src/components/home/FAQ.tsx` | 7 Qs: onboarding talent, vetting, fixed vs T&M, industries (Fintech, HealthTech, SaaS, AI/ML, EdTech…), AI-First, NDA/IP, team integration | Staffing/product-build focus |
| 13 | `SendUsEmail` | `src/components/home/SendUsEmail.tsx` | CTA block → `/contact`, `/hire` | |

Each section is wrapped in `<div style={{position:relative,zIndex:1}}>`.

### WIP (uncommitted) — Hero 3D crystal

- `src/components/home/Hero.tsx` (+15 lines): `next/dynamic` import of `./three/HeroCanvas` with `ssr:false`, rendered inside `<div className={styles.scene} aria-hidden>`.
- `src/components/home/Hero.module.scss` (+21 lines): `.scene` absolute, `pointer-events:none`, opacity 0.6 (0.45 below 1100px), radial mask.
- `src/components/home/three/HeroCanvas.tsx` (new): R3F `<Canvas>`, mounts only at ≥860px, respects `prefers-reduced-motion` (`frameloop="demand"`), pauses via IntersectionObserver when off-screen, DPR 1–1.75.
- `src/components/home/three/HeroCrystal.tsx` (new): drei `MeshTransmissionMaterial`, `Environment`, `Lightformer`; icosahedron core + satellites, pointer parallax.
- **Blocking issue:** `three`, `@react-three/fiber`, `@react-three/drei` are not declared in `package.json` / lockfile. A clean `npm install && npm run build` would fail with module-not-found. Visually it is abstract and brand-neutral, so it is reusable for the new positioning once dependencies are added.

---

## 5. Inner pages

### Services — `/services` (`src/app/services/page.tsx`)

- Metadata title "Services - AlgoCrew", description "From staff augmentation to AI solutions…", OG via `/api/og/generate`.
- Hero: "WHAT WE DO — Our Capabilities", "10 practice areas. 30+ sub-services. One crew." Stats: 10 Service Areas, 30+ Sub-services, 8+ Countries, Top 1% Talent (lines 52-72). The grid actually renders **15** cards (10 practice areas + 5 industry verticals).
- Grid: one card per `categorizedServices` entry → `/services/{slug}` with category, description, first 3 `includes` + "+N more". Accent colours keyed by slug (26-37), includes `"gaming"` and `"e-commerce"`.
- Then `ProcessSteps`, `AnimatedTestimonials`, `FAQ`, `SendUsEmail`.

### Service detail — `/services/[slug]` (`src/app/services/[slug]/page.tsx`)

- Data: `categorizedServices` (`find` by slug). Metadata from `service.title` / `service.description` / `service.image`; canonical `/services/{slug}`.
- Sections: `ServiceSchema` JSON-LD (Service + BreadcrumbList) → `Parallax` hero (image = `service.image`, status pill, metric_value, CTA `/contact`, back link `/services`) → `IncludedServices` (grid of `includes`, not linked) → `Steps` (process timeline) → `ServiceRelatedWork` (3 projects from `ourProjects` chosen by `serviceToCategories` map, links `/work/{slug}` and `/work`) → `FAQ` (same generic home FAQ) → `SendUsEmail`.
- The 15 service entries (`src/resources/categorizedServices.js`):

| Slug | Name | Category | Line | Relevance to new positioning |
|---|---|---|---|---|
| `web-app-development` | Web & App Development | Digital Engineering | 2 | Deprecated (web, mobile, custom software, SaaS, MVP, WordPress, UX/UI) |
| `cloud-devops` | Cloud & DevOps | Infrastructure | 38 | **Core** (migration, DevOps, CI/CD, compliance GDPR/HIPAA/SOC 2, containers, IaC, monitoring) |
| `e-commerce` | E-commerce | Retail Solutions | 72 | Deprecated (Shopify, WooCommerce) |
| `security-quality` | Security & Quality | Cyber Defense | 103 | **Core** for security (pen testing, audits, consulting); QA/manual/automation testing is adjacent. Claims "ISO 27001 Compliance Standards" (line 110) |
| `data-automation` | Data, AI & Automation | Artificial Intelligence | 134 | Not in new focus |
| `microsoft-solutions` | Microsoft Solutions | Enterprise Systems | 165 | Not in new focus (D365 ERP/CRM, Power Apps) |
| `digital-marketing` | Digital Marketing | Growth & Performance | 193 | Deprecated (SEO, SMM, PPC, influencer…) |
| `team-services` | Team & Support Services | Talent Solutions | 227 | Staffing; business decision |
| `emerging-tech` | Emerging Tech | Future Innovation | 255 | Deprecated (Metaverse, AR, Blockchain) |
| `gaming` | Gaming | Entertainment Tech | 284 | Deprecated (Unity, Unreal, game art, Web3) |
| `fintech-software-development` | Fintech Software Development | Industry Vertical | 318 | Industry; software-build framing, but has PCI-DSS/SOC 2 angle |
| `saas-development` | SaaS Development | Industry Vertical | 350 | Deprecated (product build) |
| `startup-mvp-development` | Startup MVP Development | Industry Vertical | 382 | Deprecated |
| `healthcare-software-development` | Healthcare Software Development | Industry Vertical | 414 | Industry; HIPAA angle |
| `ecommerce-development` | E-Commerce Development | Industry Vertical | 446 | Deprecated; duplicates `e-commerce` |

Data issues: `includes` slug `"FaRocket"` (line 22, an icon name used as a slug); `"web-app-development"` reused as an include slug for WordPress (line 25); the 5 industry entries use `image: "/images/services/webapp.jpg"` (lines 331, 363, 395, 427, 459) which **does not exist** in `public/`, so their parallax hero image and OG image are broken. `side_image` is defined on every entry but no live component renders it.

### Industry pages

None as a separate route type. The 5 "Industry Vertical" entries above are the industry pages. `src/components/work/Projects.tsx` on the homepage is labelled "INDUSTRY SOLUTIONS" but links to `/work`.

### Solutions pages

None exist.

### About — `/about` (`src/app/about/page.tsx`)

Static hero "We are AlgoCrew." ("software company headquartered in Canada…"), Mission block (inline, "Engineering digital products that change industries", 4 bullets incl. "AI-first engineering approach"), stats (lines 109-112: 50+ projects across 12+ verticals, 30+ happy clients, 5+ years, 98% satisfaction), `AboutWhyUs` (Senior-only bench, 48-hour ramp-up, AI-first, Security baked in, 100% IP transfer, Embedded not outsourced), `AboutValues` (Integrity, Trust, Ownership, Passion, Collaboration, Initiative — inline copy of `ourValues.js`), `AboutVision` (timeline 2019 founded → 2021 first enterprise client → 2022 went global "18+ countries" → 2023 "AI-first pivot" → 2025 "Top 1% engineers" → 2026+), `SendUsEmail`. JSON-LD `AboutPage` + BreadcrumbList. No team section is rendered (team data and `OurTeam` component exist but are unused).

### Contact — `/contact` (`src/app/contact/page.tsx`)

`ContactHero` (trust row: 24h response, 48h first commit, NDA day one, 0 lock-in) → `FormToggler` (tabs: Hire a Developer / General Inquiry / Apply for a Role) → `ContactOptions` (Cal.com `cal.com/info-algocrew/30min`, email, phone, LinkedIn, Google Maps, "Slack channel" mailto) → `SendUsEmail`. JSON-LD `ContactPage` with Organization.

### Hire — `/hire` (`src/app/hire/page.tsx`)

Only `FormToggler` inside a narrow column; reuses the about module styles. `robots: { index:false, follow:true }`. Linked from every `SendUsEmail` as "Book a Strategy Call" — the label suggests a calendar, but it lands on the hire-a-developer form.

### Careers — `/careers` (`src/app/careers/page.tsx`)

Hero ("See open roles", "View our work" → `/work`), marquee of perks (inline 30-35: "Top 1% talent", "Equity available", "8+ countries", "$1,500 learn budget"…), `RolesSection` (8 roles in `CareersClient.tsx:8-15`: Senior Full-Stack, DevOps/SRE, AI/ML, **UX/UI Designer**, Technical PM, Backend Go/Rust, **Mobile Engineer (React Native)**, Cloud Security Architect; each "Apply" → `/contact`), `PerksSection`, `ProcessSection` (Apply → async challenge → live interview → paid trial sprint), team quotes (24-28, attributed to Huzaifa K., Irfan N., Muhammad A.), CTA → `/contact` and `/work`, `SendUsEmail`. JSON-LD WebPage + one `JobPosting` ("Senior Software Engineer", frontend/backend/full-stack/mobile/DevOps/AI, salary USD 80k–180k, `validThrough: 2026-12-31`).

### Blog — `/blog`, `/blog/[slug]`

- Source: `src/resources/blog.ts` (1,423 lines). 32 posts; each has slug, title, excerpt, optional metaTitle/metaDescription/updated, category, tags, date, readTime, author (`Arqam Malik — Founder & CTO` or `Dev Team`), featured flag, gradient, accent and an **HTML string body** rendered with `dangerouslySetInnerHTML`.
- Listing (`BlogClient.tsx`): client-side category filter (`All`, Engineering Culture, Business, Engineering, AI / ML, DevOps, Mobile, Product, Security), featured card + grid.
- Post page: gradient hero, article, sidebar (ToC from `<h2>` — items are not links, tags, `ShareButton`, "Work with us" → `/contact`), related posts (same category), `SendUsEmail`. JSON-LD `BlogPosting` with breadcrumb. All posts use `/images/og/home.jpg` as OG image.
- Categories: DevOps 9, Security 7, Engineering 10, Engineering Culture 4, Business 1, AI/ML 1, Mobile 1, Product 1 (per-post list in `03-current-sitemap.md`).
- Post bodies link internally to `/services/cloud-devops` (12×), `/services/web-app-development` (6×), `/services/security-quality` (6×), `/services/startup-mvp-development` (3×), `/services/team-services` (2×), `/services/data-automation`, `/services/saas-development`, `/work`, `/work/localised`, `/work/boxo`, `/work/cashcloud`, `/pricing`, `/contact`, and to other posts.

### Work / projects — `/work`, `/work/[slug]`

- `/work`: `WorkHero` ("OUR WORK … move industries.") → `WorkGrid` (category filter; cards → `/work/{slug}` + external "View live") → `SendUsEmail`. Metadata `work.title` "Our Work - Case Studies & Client Projects".
- `/work/[slug]`: `ProjectDetail` (challenge, solution, results metrics, outcomes, tech stack, client/category/year sidebar, external live link, prev/next) → `SendUsEmail`.
- Data `src/resources/ourProjects.js` — 9 projects, all with real-looking external client URLs:

| Slug | Client | Title | Origin | Category | Year |
|---|---|---|---|---|---|
| `localised` | Localised | Global Designer E-commerce Infrastructure | USA | Web application | 2024 |
| `boxo` | Boxo | E-commerce Analytics & Mini-app Ecosystem | Singapore | Web application | 2024 |
| `stay-with-lumina` | Stay with Lumina | Luxury Vacation Rental Marketplace | UK | Web application | 2025 |
| `cashcloud` | Get Cash Cloud | FinTech Vendor Transaction Management | USA | Web application | 2023 |
| `outreside` | Outreside | Swiss Premium Outdoor E-commerce | Switzerland | Web application | 2025 |
| `nice2stay` | Nice2stay | Editorial Travel & Villa Marketplace | Netherlands | Web application | 2019 |
| `codly` | Codly | Dynamic QR Code SaaS Platform | UAE | SaaS Platform | 2025 |
| `alert-management` | Alert Management System | Infrastructure SRE & Incident Response | Czech Republic | Cloud application | 2024 |
| `deeplawn` | Deeplawn | AI-Driven Lawn Care Automation | United States | SaaS Platform | 2024 |

Several are cloud/compliance stories in substance (Localised: AWS CloudFormation + Drata SOC 2; Cash Cloud: AWS + Sprinto, PCI-DSS; Alert Management: SRE/Datadog/Splunk; Boxo: K8s/Terraform/GCP) even though all are hidden under the portfolio plan.

### FAQ — `/faq` (`src/app/faq/page.tsx`)

19 Q&As in 5 groups (Getting Started, Pricing & Contracts, Team & Process, IP & Legal, Technical), inline array, FAQPage JSON-LD. Generic agency content (MVP package, pricing "$4,900", React Native in stack). Separate from the 7-question home `FAQ` component.

### Pricing — `/pricing` (`src/app/pricing/page.tsx` + `PricingClient.tsx`)

Plans: Sprint "$8,000 / project" (MVPs), Studio "$14,000 / month" (Most Popular), Enterprise "Custom". `CompareTable`, `FaqAccordion`, callout → `/contact`. JSON-LD WebPage + Breadcrumb + `PriceSpecification` "Startup Sprint" minPrice **4900** and "Growth Team" minPrice **12000** (lines 117-126) — does not match the visible prices.

### Locations — `/locations`, `/locations/[slug]`

`src/resources/locations.ts`: 5 geo pages (`software-agency-canada`, `-toronto`, `-united-states`, `-united-kingdom`, `-australia`). Each has headline, description, metaDescription, services list (mostly web/mobile/SaaS/AI), 4 stats, FAQs. Detail page: hero CTAs `/contact` and `/work`, services list (not linked, "View all services" → `/services`), why section, FAQs, `SendUsEmail`. JSON-LD `ProfessionalService`. Some FAQs already mention PIPEDA, OSFI, GDPR, HIPAA, PCI-DSS, CCPA, Australian Privacy Act.

### Legal — `/privacy-policy`, `/terms`

Shared `legal.module.scss`. Both "Last updated: January 2025 · AlgoCrew **Ltd.**" (footer and schema say AlgoCrew **Inc.**). Privacy lists sub-processors Vercel, Cal.com, **Plausible Analytics**, Slack (lines 72-77) — the site actually runs GA4, Tawk.to and EmailJS, none of which are listed. Terms are governed by **England and Wales** (`terms/page.tsx:86`) while `/faq` says contracts default to Ontario law. No cookie policy / consent banner exists.

### 404 — `src/app/not-found.tsx`

Links Home, Our Work, Services, About, Contact, Pricing.

---

## 6. Content sources — where each piece of content lives

| File | Exports | Used by (live) | Notes |
|---|---|---|---|
| `src/resources/categorizedServices.js` | `categorizedServices` (15) | `/services`, `/services/[slug]`, `sitemap.ts` | Main service data |
| `src/resources/services.js` | `allServices` (39 flat items) | **none live** (only dead `services/Cards.tsx`) | Includes gaming, WordPress, metaverse, etc. |
| `src/resources/ourProjects.js` | `ourProjects` (9) | `/work`, `/work/[slug]`, `ServiceRelatedWork`, `sitemap.ts` | Portfolio |
| `src/resources/blog.ts` | `blogPosts`, `categories`, `getPost`, `getRelated` | `/blog`, `/blog/[slug]`, `sitemap.ts` | HTML bodies inline |
| `src/resources/locations.ts` | `locations`, `getLocation` | `/locations`, `/locations/[slug]`, `sitemap.ts` | |
| `src/resources/ourTeam.js` | `ourTeam` (3: Huzaifa Khalid, Irfan Nazeer, Muhammad Arqam) | **none live** (dead `about/OurTeam.tsx`) | Includes ages; Irfan's GitHub points to huzaifa215 |
| `src/resources/ourValues.js` | `ourValues` (6) | **none live** (dead `about/Cards.tsx`); same values duplicated inline in `AboutValues.tsx` | |
| `src/resources/offeringTechnologies.js` | `offeringTechnologies` (36) | **none** | Homepage tech lists are inline in components |
| `src/resources/content.js` | `person`, `social`, `newsletter`, `home`, `about`, `aboutUs`, `blog`, `work`, `projects`, `services`, `contact`, `hire` | `home` (layout + home metadata), `work`, `contact`, `hire` (metadata), `person` (OG route avatar), `social` (contact/hire forms) | `about`, `aboutUs`, `blog`, `projects`, `services`, `newsletter` effectively unused by live pages (they hard-code their own copy) |
| `src/resources/once-ui.config.js` | `baseURL`, `routes`, `protectedRoutes`, `fonts`, `style`, `dataStyle`, `effects`, `mailchimp`, `schema`, `sameAs`, `display` | layout, Providers, RouteGuard | `schema` (name "Once UI", email `lorant@once-ui.com`) and `sameAs` (Once UI Threads/LinkedIn/Discord) are template leftovers, not used by live pages |
| `src/resources/icons.ts` | `iconLibrary` | Providers (Once UI IconProvider) | |
| `src/resources/custom.css` | design tokens | layout | §8 |
| Inline in components/pages | Homepage section copy, FAQ (2 separate sets), pricing, careers roles, about copy, testimonials, stats, tech lists, footer/header links | — | Most marketing copy is **not** in `resources/` |
| MDX | `src/app/work/projects/*.mdx` (3) | **none** | Template leftovers |

---

## 7. Component inventory

Usage determined by grepping every `import` in `src/`. "Dead" = no live import chain from a page or the root layout.

Classification key: **A** Reusable as-is · **B** Reusable with restyle/content change · **R** Redundant/dead · **D** Tied only to deprecated services · **W** Tied to Work-Portfolio.

### Layout / global

| Component | Path | Used by | Class |
|---|---|---|---|
| Header | `src/components/Header.tsx` | root layout (via `components/index.ts`) | B (nav items) |
| Footer | `src/components/Footer.tsx` | root layout | B (links, stats) |
| Providers | `src/components/Providers.tsx` | root layout | A |
| RouteGuard | `src/components/RouteGuard.tsx` | root layout | A (soft-404 caveat) |
| SmoothScroll | `src/components/SmoothScroll.tsx` | Providers | A |
| ThemeToggle | `src/components/ThemeToggle.tsx` | Header | A |
| ThemeLogo | `src/components/ThemeLogo.tsx` | nobody | R (dead) |
| ProjectCard (root) | `src/components/ProjectCard.tsx` | exported from index, never imported | R + W |
| HeadingLink | `src/components/HeadingLink.tsx` | only `mdx.tsx` | R |
| ScrollToHash | `src/components/ScrollToHash.tsx` | exported, never imported | R |
| CustomMDX | `src/components/mdx.tsx` | exported, never imported | R |
| barrel | `src/components/index.ts` | layout | A (prune exports) |
| breakpoints mixins | `src/components/breakpoints.scss` | only `about/about.module.scss` | A |
| not-found | `src/app/not-found.tsx` | Next 404, RouteGuard | B (links to /work) |

### Home

| Component | Path | Used by | Class |
|---|---|---|---|
| Hero | `src/components/home/Hero.tsx` | `/` | B (copy, CTA to /work) |
| HeroCanvas / HeroCrystal (WIP) | `src/components/home/three/` | Hero | A once deps added |
| HeroAnimations | `src/components/home/HeroAnimations.tsx` | nobody | R |
| AchievementsStrip | `src/components/home/AchievementsStrip.tsx` | nobody | R |
| TrustStrip | `src/components/home/TrustStrip.tsx` | `/` | B (verify claims) |
| StatsBento | `src/components/home/StatsBento.tsx` | `/` | B (claims) |
| ProcessSteps | `src/components/home/ProcessStep.tsx` | `/`, `/services` | A/B |
| WhyChooseUs | `src/components/home/WhyChooseUs.tsx` | `/` | B (staffing framing) |
| TechShowcase | `src/components/home/TechShowcase.tsx` | `/` | B (drop mobile/frontend; overlaps OfferingTechnologies) |
| AnimatedTestimonials | `src/components/home/Testimonals.tsx` | `/`, `/services` | B (content unverified) |
| FAQ (home) | `src/components/home/FAQ.tsx` | `/`, `/services`, `/services/[slug]` | B (content) |
| SendUsEmail (home) | `src/components/home/SendUsEmail.tsx` | 14 pages | B (`/hire` link) |

### Services

| Component | Path | Used by | Class |
|---|---|---|---|
| Services (panels) | `src/components/services/Services.tsx` | `/` | B (inline data mostly deprecated; mechanism reusable) |
| OfferingTechnologies | `src/components/services/OfferingTechnologies.tsx` | `/` | B |
| Parallax | `src/components/services/Parallax.tsx` | `/services/[slug]` | A |
| IncludedServices | `src/components/services/IncludedServices.tsx` | `/services/[slug]` | A |
| Steps | `src/components/services/Steps.tsx` | `/services/[slug]` | A |
| ServiceRelatedWork | `src/components/services/ServiceRelatedWork.tsx` | `/services/[slug]` | W |
| ServiceSchema | `src/components/seo/ServiceSchema.tsx` | `/services/[slug]` | A |
| Card / Cards | `src/components/services/Card.tsx`, `Cards.tsx` | nobody (reads `allServices`) | R + D |
| HeroSection | `src/components/services/HeroSection.tsx` | nobody | R |
| ServicesHero | `src/components/services/ServicesHero.tsx` | nobody (uses CtoCalendar) | R |
| MarqueeController | `src/components/services/MarqueeController.tsx` | nobody | R |
| technologies | `src/components/services/technologies.tsx` | nobody | R |
| SendUsEmail (services) | `src/components/services/SendUsEmail.tsx` | nobody | R |

### Work / projects

| Component | Path | Used by | Class |
|---|---|---|---|
| Projects (industry solutions) | `src/components/work/Projects.tsx` | `/` | W (illustrations could be repurposed) |
| ProjectIllustrations | `src/components/work/ProjectIllustrations.tsx` | Projects | W / B (SVG illustrations: fintech, health, cloud, supply chain) |
| WorkHero | `src/components/work/WorkHero.tsx` | `/work` | W |
| WorkGrid | `src/components/work/WorkGrid.tsx` | `/work` | W |
| ProjectDetail | `src/components/work/ProjectDetail.tsx` | `/work/[slug]` | W |
| RelatedProjects | `src/components/work/RelatedProjects.tsx` | nobody | R + W |
| ProjectCards / ProjectCard / SendUsEmail | `src/components/projects/*` | nobody | R + W |

### About

| Component | Path | Used by | Class |
|---|---|---|---|
| AboutWhyUs | `src/components/about/AboutWhyUs.tsx` | `/about` | B |
| AboutValues | `src/components/about/AboutValues.tsx` | `/about` | A/B |
| AboutVision | `src/components/about/AboutVision.tsx` | `/about` | B (timeline claims, "AI-first pivot") |
| Details | `src/components/about/Details.tsx` | `/` | B (claims) |
| AboutHero, OurMission, OurVision, OurTeam, Card, Cards, SendUsEmail, TableOfContents | `src/components/about/*` | nobody | R (OurTeam could be revived for a team section) |

### Contact / forms

| Component | Path | Used by | Class |
|---|---|---|---|
| ContactHero | `src/components/contact/ContactHero.tsx` | `/contact` | A/B |
| ContactOptions | `src/components/contact/ContactOptions.tsx` | `/contact` | A |
| FormToggler | `src/components/contact/FormToggler.tsx` | `/contact`, `/hire` | B (tabs are staffing-first) |
| ContactForm | `src/components/contact/ContactForm.tsx` | FormToggler | B (service options: Staff Augmentation, Dedicated Team, Fixed-Price Project, IT Consulting, General Inquiry; "Bid Price") |
| HireDeveloperForm + DeveloperRoleSelector | `src/components/contact/HireDeveloperForm.tsx`, `DeveloperRoleSelector.tsx` | FormToggler | D (developer roles incl. UI/UX Designer, Mobile Developer) |
| JobApplicationForm | `src/components/contact/JobApplicationForm.tsx` | FormToggler | B (role list incl. Mobile, UI/UX; CV not actually sent) |

### Other

| Component | Path | Used by | Class |
|---|---|---|---|
| BlogListing | `src/app/blog/BlogClient.tsx` | `/blog` | A |
| ShareButton | `src/app/blog/[slug]/ShareButton.tsx` | `/blog/[slug]` | A |
| RolesSection | `src/app/careers/CareersClient.tsx` | `/careers` | B (roles) |
| PerksSection, ProcessSection | `src/app/careers/CareersSections.tsx` | `/careers` | A/B |
| CompareTable, FaqAccordion | `src/app/pricing/PricingClient.tsx` | `/pricing` | B |
| Post / Posts | `src/components/blog/*` | nobody (MDX template blog) | R |
| ui/Testimonals | `src/components/ui/Testimonals.tsx` | nobody | R |
| CeoCalendar / CtoCalendar | `src/components/Calendars/*` | only dead AboutHero / ServicesHero | R |

Dead code count: ~35 component files (plus their SCSS modules) are unreachable from any page.

---

## 8. Design system

### Styling approach

- Once UI core CSS (`styles.css`, `tokens.css`) + Once UI layout primitives (`Flex`, `Column`, etc.) in the layout and forms.
- Most visible sections are bespoke SCSS modules with **heavy inline `style={{}}`** (≈284 occurrences in `src/app` + `src/components`), many with hard-coded hex colours (`#06c8e8`, `#2563eb`, `#a78bfa`…) despite `custom.css:3` saying "No hardcoded colors allowed".
- Tailwind v4: `@import "tailwindcss"` in `global.scss:1` and `@theme inline` animations (`--animate-scroll`, `--animate-float`, `--animate-glow-pulse`). Utility classes are effectively unused in live code (only `flex flex-wrap gap-2 mt-2` in `DeveloperRoleSelector.tsx:85`).

### Tokens and colour (`src/resources/custom.css`)

- Brand: `--brand-cyan #06c8e8`, `--brand-blue #2563eb`, `--brand-purple #7c3aed`, `--brand-amber #f59e0b`, gradient cyan→blue. Once UI custom brand scale `--scheme-brand-100…1200` (cyan).
- Surfaces (dark): `--bg-page #0B1120`, `--bg-elevated #111827`, translucent `--bg-card`, glass tokens; text `--text-primary #F1F5F9`, `--text-muted #8B97A8` (comment notes WCAG AA fix); borders, shadows, glows.
- Light theme overrides under `[data-theme="light"]` (bg `#f4f6fb`, text `#080c14`, brand cyan darkened to `#0099aa`).
- A second, overlapping token family `--clr-*` / `--grad-*` exists in the same file.
- `global.scss` overrides Once UI `--page-background` per theme and adds a site-wide `body::after` noise overlay (in custom.css), page-in animation on every `<main>`, and a global `transition` on `*`.
- Per-section accent colours are hard-coded maps (e.g. `services/page.tsx:26-37`, `work/[slug]/page.tsx:9-13`, `ServiceRelatedWork.tsx:8`).

### Theming

Once UI attributes: brand/accent `custom`, neutral `slate`, solid `contrast`/`flat`, border `playful`, surface `translucent`, transition `all`, scaling 100 (`once-ui.config.js:71-82`). **Default theme: dark** (hard-coded on `<html>` and in theme-init). `ThemeToggle` in the header switches light/dark and persists to `localStorage`.

### Typography

Geist (heading, body, label) and Geist Mono (code) via `next/font/google` (self-hosted at build), `display: swap` (`once-ui.config.js:36-68`). Exposed as CSS vars `--font-heading/body/label/code` on `<html>`. Display sizes are mostly inline `clamp()` values; `--text-display: clamp(3rem, 8vw, 7rem)`. OG route loads Geist from Google Fonts at request time.

### Spacing / breakpoints

- Once UI spacing tokens in layout/forms; bespoke sections use raw px/clamp values.
- `src/components/breakpoints.scss`: `$s 768px`, `$m 1024px`, `$l 1440px` (max-width mixins) — imported by one file only.
- Actual media queries are ad hoc: 768px (85×), 900px (22×), 1024px (17×), 640px, 600px, 480px, 960px, 767px, 560px, 860px, 580px, 1100px, 1000px, 992px (min), 700px.

---

## 9. Animation and 3D

| Library | Version | Where used |
|---|---|---|
| GSAP + ScrollTrigger | 3.13.0 | `SmoothScroll`, `Hero`, `Services` (pinned horizontal scroll), `work/Projects`, `WorkGrid`, `Details`, `services/Steps`, `IncludedServices`; plus many dead components (17 files import ScrollTrigger) |
| Lenis | 1.3.23 | `SmoothScroll.tsx` (global, inside Providers); CSS hooks in `custom.css:162-164` |
| CSS keyframes | — | marquees (`TrustStrip`, `OfferingTechnologies`), Tailwind `@theme` animations, `page-in` on `<main>` |
| three / @react-three/fiber / @react-three/drei | **not installed** | WIP `src/components/home/three/HeroCanvas.tsx`, `HeroCrystal.tsx` (uncommitted) |

No framer-motion. `html { scroll-behavior: smooth !important }` in `global.scss` and `html { scroll-behavior: auto }` in `custom.css` conflict (Lenis needs `auto`).

---

## 10. SEO

| Aspect | Current state |
|---|---|
| Metadata | Root layout sets defaults + title template. Most pages call Once UI `Meta.generate({title, description, baseURL, path, image})` and add `alternates.canonical` (relative, resolved via `metadataBase`). `/faq` and `/locations`, `/locations/[slug]` build metadata by hand. Home has no own `alternates` (inherits `/` from layout). Exact tags emitted by `Meta.generate` not verified (no node_modules). |
| Titles | Several titles already contain "AlgoCrew" and the layout template appends "| AlgoCrew" → likely duplicates, e.g. "Services - AlgoCrew | AlgoCrew" (depends on how `Meta.generate` sets `title`; unverified). |
| Canonical | Present on every page; host is apex. |
| OG images | `/images/og/home.jpg` (home, blog, contact, hire), `/images/og/about.jpg`, or `/api/og/generate?title=…` (services, work, careers, pricing). Five industry service pages point at the missing `/images/services/webapp.jpg`. `/hire` and `/contact` pass a relative `images/og/home.jpg` (no leading slash). `/faq` defines `openGraph` without images; `/locations*` define no `openGraph` and may inherit the home og:url. |
| OG route | `/api/og/generate` — note `robots.ts` disallows `/api/`, which some social crawlers honour. |
| Twitter | `summary_large_image`, `@algocrew` (handle not verified). |
| sitemap.ts | 12 static + 15 services + 32 blog + 9 work + 5 locations = **73 URLs**; `/hire` excluded (noindex). `lastModified` = build time for everything except blog (uses `date`, ignores `updated`). Blog entries all list `og/home.jpg` as image. Detail in `03-current-sitemap.md`. |
| robots.ts | `allow: /`, `disallow: /api/`, sitemap + host. |
| JSON-LD | Layout: Organization + WebSite. Home/work/work-detail/hire: Once UI `<Schema as="webPage">`. About: AboutPage + Breadcrumb. Contact: ContactPage. Blog: Blog + Breadcrumb; posts: BlogPosting + Breadcrumb. Services detail: Service + Breadcrumb (`areaServed: CA, US, GB`). Careers: WebPage + Breadcrumb + JobPosting. Pricing: WebPage + Breadcrumb + PriceSpecification. FAQ: FAQPage. Locations detail: ProfessionalService. |
| Breadcrumbs | JSON-LD only; no visible breadcrumb UI (except "back" links). |
| Keywords | Two sources (metadata `keywords` and a manual `<meta name="keywords">`) — both web/mobile/custom software. |
| manifest | `public/manifest.json`: "AlgoCrew — Elite Software Agency", "custom software development, web, mobile, cloud & AI solutions", theme `#06c8e8`. |
| Verification | Google Search Console token placeholder commented out (`layout.tsx:77-80`). |

---

## 11. Image and media assets (`public/`, ~71 MB)

| Folder | Size | Contents | Used by live code | Ties |
|---|---|---|---|---|
| `public/` root | ~80 KB | favicons (`.ico` multi-size, svg, 16/32 png), `apple-touch-icon.png`, `icon-192/512.png`, `manifest.json` | yes | brand |
| `images/LogoDark.png`, `logo-dark.svg`, `logo-light.svg` | 24 KB / 4 KB | logos | LogoDark in schema/OG; svgs only by dead ThemeLogo | brand |
| `images/og/` | 1.7 MB | `home.jpg` (1.1 MB), `about.jpg` | yes | generic (content not inspected visually) |
| `images/projects/project-01/` | **30 MB** | 22 screenshots: localized, boxo, swl-1, c-c (3.1 MB), otre, nice2stay (5.0 MB), codly, alert, deeplawn (live); s-s-1, hw, enterprise, foodil (template MDX only); sap, cloud-1, psych, placeholder, building, snoonu, polarpro (unreferenced) | 9 live | **Portfolio** |
| `images/services/` | 13 MB | team, developer1, ecommerce, emerging, digital, gaming, microsoft, quality, automation, devops, commerce (PNG, 0.4–2.2 MB each) | only `digital.png`, `team.png` as `image`; others only as unused `side_image` | gaming/ecommerce/digital/emerging/microsoft = deprecated |
| `images/service/` | 3.5 MB | web.gif, devops.gif, ai.gif, team.gif | unreferenced | web = deprecated |
| `images/gallery/` | 5.5 MB | horizontal-1..4.png | only `content.js` `projects.images` (unused) | portfolio/template |
| `images/about/` | 5.9 MB | mission, mission2, vision, vision1, vision3.jpg (4.7 MB), vision4 | only via unused `aboutUs` data | — |
| `images/team/` | 2.1 MB | arqam (1.6 MB), huzaifa, irfan | only dead OurTeam | team |
| `images/testimonals/` | 460 KB | natalia.png, femke.jpeg | unreferenced | testimonial photos (real people? unknown) |
| `images/uplash/` | 2.4 MB | team, global, fintech, health, quality, market, security, ai, industry | unreferenced | stock |
| `images/technologies/` | 336 KB | ~60 tech logos (svg/png) | only by unused `offeringTechnologies.js` / dead components | includes unity, unreal, flutter, swift, vue, laravel… |
| `images/countries/` | 24 KB | canada, pk webp | unreferenced | — |
| `images/hero.png` | **5.7 MB** | | unreferenced | — |
| other | | avatar.jpg, contact.png, hire.png, favicon.png, icon.png | unreferenced | — |

Missing but referenced: `/images/services/webapp.jpg` (5 live service pages), `/images/about/vision-abstract.png` (unused data), `/images/technologies/d365.png` (file is `D365.png`; unused data), `cover-04.jpg` / `video-01.mp4` (template MDX only).

**Client logos:** searched file names and all source for Innovapost, Atmosera, Deloitte, Nigel Frank (International) — **none found**. There is no client-logo strip anywhere on the site; the only third-party logos are technology icons (react-icons and `images/technologies/`). Real client names appear only as text in `ourProjects.js` and blog bodies.

---

## 12. Forms and integrations

| Integration | Where | Detail / risk |
|---|---|---|
| EmailJS (client-side) | `ContactForm.tsx:19-22`, `HireDeveloperForm.tsx:19-22`, `JobApplicationForm.tsx:11-14` | Same service + 2 templates (admin + user confirmation) for all three forms; public key hard-coded. No server-side validation, captcha or rate limiting. `JobApplicationForm` validates a CV upload but **only sends the file name and size** (line 126) — the CV itself never reaches the company. |
| Contact form fields | `ContactForm.tsx:134-172` | Service select (Staff Augmentation, Dedicated Team, Fixed-Price Project, IT Consulting, General Inquiry), "Bid Price (USD)", name, email, phone, subject, message |
| Hire form | `HireDeveloperForm.tsx`, `DeveloperRoleSelector.tsx:15-24` | Roles: Cloud, Fullstack, Backend, Frontend, Data Scientist, DevOps, UI/UX, QA, Mobile, PM; monthly budget; timezone |
| Cal.com | `ContactOptions.tsx:12` link `cal.com/info-algocrew/30min`; embed (`@calcom/embed-react`) only in dead `CeoCalendar`/`CtoCalendar` (`ceo-algocrew/30min`, `cto-algocrew/30min`) and dead SendUsEmail variants | |
| Google Analytics 4 | `layout.tsx:235-244` | `G-WPN816FH63`, loads without consent |
| Tawk.to chat | `layout.tsx:291-314` | loads on first interaction |
| Password gate | `/api/authenticate`, `/api/check-auth`, `RouteGuard` | static cookie value `authenticated` (not signed); currently protects no real page |
| Mailchimp | `once-ui.config.js:139` placeholder URL | used only by dead components |
| Contact data | email `query@algocrew.io` (site), `legal@algocrew.io` (terms), `hr@algocrew.io` (`person`), `ceo@`/`cto@` (dead), README uses `info@algocrew.io` / `hello@algocrew.com`; phone `+1 (437) 450-9656`; address "35 Herkley Dr, Brampton, ON L6V 2E7" (`HireDeveloperForm.tsx:200`, `locations.ts:33`) | Inconsistent emails |

---

## 13. References to deprecated offerings (live code paths unless noted)

### Global / metadata / structured data
- `src/app/layout.tsx:24-28` keywords "web development", "mobile app development", "software agency", "custom software development".
- `src/app/layout.tsx:138` Organization description "custom software development, cloud solutions, and mobile apps".
- `src/app/layout.tsx:168` WebSite description "for web, mobile, cloud and AI".
- `src/app/layout.tsx:251` manual keywords meta (web, mobile, custom software).
- `src/resources/content.js:59-60` home title/description (staffing, "full-scale project development"); `:283` work description "web, mobile, and cloud projects"; `:291` services headline "Shaping digital experiences".
- `public/manifest.json:2-4` "Elite Software Agency", "web, mobile, cloud & AI".
- `README.md` (whole "What We Do" list).

### Header / footer / CTAs
- `src/components/Header.tsx:11` "Work" nav item (portfolio).
- `src/components/Footer.tsx:16` "Product Engineering" → web-app-development; `:20-23` Fintech/SaaS/MVP/E-Commerce development; `:28` "Case Studies" → /work.
- `src/components/home/Hero.tsx` H1 "We Build Digital Experiences", "digital products", CTA "See Case Studies" → /work.
- `src/components/home/SendUsEmail.tsx:16-22` "From idea to launch in weeks", "/hire".

### Homepage sections
- `src/components/services/Services.tsx:19-48` Product Engineering ("Web, mobile, SaaS", tags Web & Mobile, SaaS Platforms, E-commerce), Data & AI (Blockchain, AR/VR), Strategic Staffing.
- `src/components/services/OfferingTechnologies.tsx:38-45` React, Next.js, TypeScript, Tailwind, Framer, Flutter, Kotlin (frontend/mobile).
- `src/components/home/TechShowcase.tsx:46-53` React, Next.js, GraphQL, Flutter, React Native, Kotlin.
- `src/components/work/Projects.tsx` industry solutions → /work.
- `src/components/home/FAQ.tsx` (industries: EdTech, Logistics, Developer Tooling; AI-first product delivery).
- `src/components/home/Testimonals.tsx` (8-week launch, 340% conversion, SaaS build).

### Services data and pages
- `src/resources/categorizedServices.js`: `web-app-development` (2-37), `e-commerce` (72-102), `digital-marketing` (193-226), `emerging-tech` (255-283), `gaming` (284-315), `saas-development` (350-381), `startup-mvp-development` (382-413), `ecommerce-development` (446-477); also `microsoft-solutions` (165-192), `data-automation` (134-164), `team-services` (227-254) outside the new focus.
- `src/app/services/page.tsx:26-37` accent map incl. `gaming`, `e-commerce`; `:52-72` "10 practice areas", "Top 1% Talent".
- `src/components/services/ServiceRelatedWork.tsx:15-26` mapping incl. `gaming`, `e-commerce`, `digital-marketing`.
- `src/resources/services.js` (whole file; dead) — Web/App/WordPress/UX/Gaming/Metaverse/AR/Blockchain/E-commerce/Shopify.
- `src/resources/offeringTechnologies.js` (dead) — Unity, Unreal, Flutter, Swift, Laravel, Vue, Nuxt.
- `src/resources/icons.ts:74,83` `game`, `wordPress` icons.

### Other pages
- `src/app/faq/page.tsx:37` MVP package; `:49` "$4,900 for focused MVP sprints"; `:105` "React Native" in stack.
- `src/app/pricing/page.tsx:29-34` Sprint "MVPs & Feature Builds"; `:117` schema "Ideal for MVPs".
- `src/app/careers/page.tsx:57` JobPosting "frontend, backend, full-stack, mobile"; `:100` "engineers, designers, and strategists"; `CareersClient.tsx:11` UX/UI Designer, `:14` Mobile Engineer (React Native).
- `src/components/contact/JobApplicationForm.tsx:22,26` Mobile Engineer, UI/UX Designer roles.
- `src/components/contact/DeveloperRoleSelector.tsx:21,23` UI/UX Designer, Mobile Developer.
- `src/components/contact/ContactForm.tsx:138-143` staffing/fixed-price project options.
- `src/resources/locations.ts:24-25, 47-48, 69-70, 92-93, 114-115` web apps, mobile apps, e-commerce, SaaS in descriptions and service lists for every location.
- `src/app/about/page.tsx:84` "Engineering digital products"; `src/components/about/AboutVision.tsx:9` "AI-first pivot".
- `src/app/work/**`, `src/components/work/**` — all portfolio.
- Blog (`src/resources/blog.ts`): Mobile post `react-native-vs-flutter-2025`; web/product posts `nextjs-15-app-router-production-lessons`, `web-performance-core-web-vitals-2025`, `typescript-advanced-patterns-2025`, `how-to-scope-an-mvp-correctly`, `graphql-vs-rest-2025`; body links to `/services/web-app-development` (6×), `/services/startup-mvp-development` (3×), `/services/saas-development`, `/work/*`.
- Template MDX (`src/app/work/projects/*.mdx`, not routed) — Figma-to-code, design system, portfolio builder.

---

## 14. Claims that need business verification

| Claim | Location(s) |
|---|---|
| "Top 1%" talent / "Top 1% of applicants make our bench", 5-stage vetting | Footer stats, `StatsBento`, `WhyChooseUs`, `/services` hero, `/careers` marquee, `AboutVision:10` |
| "$50M+ client revenue generated" | `StatsBento.tsx` |
| "18+ countries" vs "8+ countries" (inconsistent) | `StatsBento` / `AboutVision:8` vs Footer, `/services`, `/careers` |
| "12+ industry verticals" | `StatsBento`, `/about` |
| "50+ projects delivered", "30+ happy clients", "5+ years", "98% satisfaction" | `/about:109-112`; "98% client retention" `Details.tsx:8`; "98% client satisfaction" `WhyChooseUs` |
| "0 critical incidents in prod / Zero P0s ever", "120+ production deployments", "8 yrs avg engineer experience" | `Details.tsx:9-11` |
| "50+ projects for Canadian clients", "30+ US clients across 12 states" | `locations.ts:28, 74` |
| "48h first commit", "24h response", "48h response guarantee" | Footer, `ContactHero`, `locations.ts` |
| Compliance: "SOC 2 Aligned", "HIPAA Ready", "ISO 27001 Aligned", "GDPR Compliant", "24/7 On-call" | `TrustStrip.tsx:14-25`; "ISO 27001 Compliance Standards" `categorizedServices.js:110`; "SOC 2-aligned" `WhyChooseUs`, `Details` |
| Client outcomes "SOC 2 Compliance certified" (Localised), "PCI-DSS Compliance achieved" (Cash Cloud), plus all metric results for 9 projects | `ourProjects.js:13-198` |
| Regulated-industry experience (PCI-DSS, SOC 2, FCA, HIPAA, PHIPA, OSFI, SEC, security clearance) | `/faq:95`, `locations.ts` FAQs |
| Testimonials: Sarah Chen / Meridian Health, Marcus Williams / Launchpad, Priya Sharma / NovaTech, Daniel Osei / Stackr Labs (no photos, no links) | `home/Testimonals.tsx:5-50`; also `content.js:88` "Happy Client" |
| Homepage "industry solutions" companies NexaCapital, Nexus Health, VCloud Systems, LogiTech Solutions — none appear in `ourProjects` | `work/Projects.tsx:31-65` |
| Founding year: schema `foundingDate: "2020"` vs timeline "2019 Founded in Canada" | `layout.tsx:141`, `AboutVision.tsx:6` |
| Legal entity: "AlgoCrew Inc." vs "AlgoCrew Ltd." | Footer:143, schema vs privacy/terms |
| Founder identity: blog author "Arqam Malik, Founder & CTO" vs team "Muhammad Arqam" / `person` "Arqam Tahir, Software Engineer" | `blog.ts`, `ourTeam.js`, `content.js:3-13` |
| Careers: salary range USD 80k–180k, equity, "$1,500 learn budget", team quotes | `careers/page.tsx:24-35, 70-74` |
| Pricing: $8,000 / $14,000 (page) vs $4,900 / $12,000 (schema) vs $4,900 (FAQ) | `pricing/page.tsx:30,50,119,126`, `faq/page.tsx:49` |
| "7-day risk-free trial" | `content.js:197` (unused data) |
| Governing law: Ontario (FAQ) vs England & Wales (Terms) | `faq/page.tsx:91`, `terms/page.tsx:86` |
| Sub-processors (Plausible listed; GA4/Tawk/EmailJS not listed) | `privacy-policy/page.tsx:72-77` |
| Social profiles github.com/algocrew, x.com/algocrew, @algocrew exist and belong to the company | Footer, layout schema/twitter |

No awards or formal certifications are claimed as held; claims are phrased "aligned"/"ready"/"compliant" except the client-project "certified/achieved" results.

---

## 15. Technical debt and risks (factual, short)

1. **WIP build break:** three/R3F/drei imported but not declared as dependencies.
2. **Broken images:** `/images/services/webapp.jpg` missing for 5 live service pages (hero + OG).
3. **Soft 404s:** RouteGuard renders NotFound with HTTP 200 for disabled routes; hiding `/work` via `routes` alone leaves pages in the sitemap with 200 status.
4. **Job applications lose CVs:** only filename/size is emailed.
5. **Client-only forms:** EmailJS called from the browser with no captcha/rate limit; public key in source.
6. **Weak password gate:** constant cookie value, default password `password` in `.env.example`, protects a non-existent page.
7. **~35 dead components** and several unused data files (`services.js`, `offeringTechnologies.js`, `ourTeam.js`, `ourValues.js`, much of `content.js`, MDX templates, `utils/utils.ts`) plus Once UI template leftovers (`schema`/`sameAs` pointing at Once UI).
8. **~45 MB of unreferenced media** in `public/` (largest: `hero.png` 5.7 MB, `about/vision3.jpg` 4.7 MB, several 1–4 MB project PNGs); live project PNGs up to 5 MB.
9. **Content scattered and duplicated:** two FAQ sets, two "by the numbers" blocks on the homepage, two tech-stack sections, values duplicated, inconsistent stats/prices/legal entity.
10. **Blog bodies are raw HTML strings** rendered with `dangerouslySetInnerHTML` (trusted content, but hard to edit; internal links hard-coded to deprecated service URLs).
11. **Styling drift:** ~284 inline style objects, hard-coded hex colours, two token families, ad-hoc breakpoints; Tailwind loaded but unused.
12. **Tooling:** `npm run export` uses removed `next export`; `next lint` is deprecated in 15.5; ESLint 9 with legacy config; Biome config unused; `@types/react` 18 with React 19.
13. **Repo hygiene:** tracked gitlink `.claude/worktrees/zealous-hugle-418b59` (now deleted in working tree), stray tracked `.claire/worktrees/…/Header.module.scss`, `tsconfig.tsbuildinfo` (348 KB) committed despite `.gitignore`, `.DS_Store` files in `public/images/*` (untracked status not checked individually).
14. **Analytics without consent** (GA4) while privacy policy claims Plausible; no cookie banner — relevant for a GDPR/PIPEDA-positioned brand.
15. **No CSP header.**
16. OG generator fetches Google Fonts on every request and lives under robots-disallowed `/api/`.
17. `scroll-behavior` set to both `smooth !important` (global.scss) and `auto` (custom.css) while Lenis is active.

---

## 16. Could not determine

- Exact HTML emitted by Once UI `Meta.generate` and `<Schema>` (node_modules absent, no build run), so duplicate-title and OG-inheritance issues are inferred, not confirmed.
- Actual deployment target and environment values in production (no deploy config in repo).
- Whether testimonials, project metrics and compliance claims are genuine.
- Whether the social handles (GitHub/X) exist.
- Visual content of OG images and stock/project screenshots (not opened).
- Whether `tawk.to` / GA property IDs are still active.
