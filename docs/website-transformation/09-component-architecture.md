Stage 4 deliverable. Status: awaiting review.

# 09 — Component Architecture

How the design system in [08](08-ui-ux-design-direction.md) and the pages in [04](04-proposed-sitemap.md) map onto the existing codebase. Component classes (A, B, R, D, W) refer to the inventory in [01 §7](01-existing-website-audit.md). Nothing here has been implemented.

---

## 1. Guiding decisions

| # | Decision | Why |
|---|---|---|
| 1 | **Keep the stack:** Next.js 15 App Router, React 19, TypeScript, SCSS modules, static generation | It works and every page is already static. A re-platform buys nothing. |
| 2 | **Keep the existing folder layout** (`src/app`, `src/components`, `src/resources`) | The team knows it. New work follows the same convention. |
| 3 | **SCSS modules + CSS custom properties for all new UI.** No Tailwind. | SCSS modules are what the live sections use (about 60 modules). Tailwind v4 is imported but effectively unused (one class string in a deprecated form). Remove the import and the `@tailwindcss/postcss` dependency. |
| 4 | **Once UI: keep as infrastructure, stop using it for visuals** | It is imported in 50 files and provides `Meta.generate`, theme plumbing and layout primitives. Ripping it out is a rewrite with no user benefit. New components do not use its visual components, and its "translucent/playful" style attributes are neutralised by our tokens. Full removal is a later, optional cleanup. |
| 5 | **One token file** replaces the two overlapping token families in `custom.css` | The audit found `--brand-*`/`--bg-*` and a second `--clr-*`/`--grad-*` family, plus about 284 inline `style` blocks with hard-coded hex values. |
| 6 | **Content as typed data, pages as templates** | Services, platforms and frameworks are each one typed data file feeding one template through `generateStaticParams`, as `/services/[slug]` already does. |
| 7 | **Server components by default.** Client components only where there is state: header menus, drawer, lifecycle tabs, forms, 3D canvas | Menus must be in the server HTML (04 §8.1). |
| 8 | **Do not delete during the build.** Deprecated and dead components are unlinked first and removed in one cleanup step after launch checks pass | Brief rule: controlled deprecation. The register is doc 11. |

---

## 2. Target structure

New or changed paths only. Existing paths not listed stay where they are.

```
src/
├── app/
│   ├── layout.tsx                      MODIFY  light theme, new metadata, consent-gated scripts
│   ├── page.tsx                        REWRITE home sections (07 §4)
│   ├── services/
│   │   ├── page.tsx                    REWRITE services hub
│   │   └── [slug]/page.tsx             MODIFY  renders Pillar or Capability template from data
│   ├── cloud-platforms/
│   │   ├── page.tsx                    NEW     hub
│   │   └── [slug]/page.tsx             NEW     platform template
│   ├── compliance/
│   │   ├── page.tsx                    NEW     hub (pillar 4)
│   │   └── [slug]/page.tsx             NEW     framework template
│   ├── our-approach/page.tsx           NEW
│   ├── trust/page.tsx                  NEW     (gated, V-14)
│   ├── about/ contact/ careers/ blog/  MODIFY
│   ├── privacy-policy/ terms/          MODIFY  content only
│   ├── not-found.tsx                   MODIFY  new recovery links
│   ├── sitemap.ts  robots.ts           MODIFY  built from the same data files
│   └── (pricing, hire, faq, locations, work)   RETIRE per 05, after redirects are approved
├── components/
│   ├── ui/                             NEW     design-system primitives (§3)
│   ├── layout/                         NEW     Header, MegaMenu, MobileDrawer, Footer, Breadcrumbs, JumpLinks
│   ├── sections/                       NEW     page sections shared across templates (§4)
│   ├── diagrams/                       NEW     Lifecycle, PipelineGates, DefenceInDepth, ControlMap
│   ├── home/three/                     MODIFY  keep HeroCanvas wrapper; replace HeroCrystal with LayeredPlatform
│   ├── seo/                            EXTEND  JsonLd helpers (§7)
│   └── contact/                        MODIFY  one ContactForm
├── resources/
│   ├── tokens.css                      NEW     the only token file (08 §3–5)
│   ├── navigation.ts                   NEW     header, drawer and footer menus: single source
│   ├── services.ts                     NEW     pillars and capabilities (replaces categorizedServices.js for live pages)
│   ├── platforms.ts                    NEW
│   ├── frameworks.ts                   NEW
│   ├── site.ts                         NEW     verified company facts (07 V-06…V-11)
│   └── blog.ts                         MODIFY  category + status per post (07 §9)
└── styles/
    └── breakpoints.scss                MOVE    from components/, with the three breakpoints from 08 §5
```

---

## 3. Primitives (`components/ui/`)

Each is a server component with an SCSS module unless marked. Specs are in 08 §6.

| Component | Props (main) | Replaces / reuses |
|---|---|---|
| `Button` | `variant: primary \| outline`, `size`, `href`, `arrow` | Ad-hoc buttons across sections |
| `TextLink` | `href`, `arrow` | — |
| `Section` | `tone: default \| soft \| dark`, `tight`, `id` | Per-section wrappers |
| `Container` | — | Inline max-width styles |
| `SectionHead` | `eyebrow`, `title`, `lead`, `as` (heading level) | — |
| `Eyebrow` | — | — |
| `Card` | `href?`, `label?`, `icon?`, `title`, `children`, `chips?` | `ServiceCard`, `ValueCard` and the dead `Card`/`Cards` sets |
| `Chips` | `items` | — |
| `IconTile` | `name` (Lucide) | `react-icons` usage (dependency can then be dropped) |
| `Checklist` | `items`, `variant: tick \| dash` | — |
| `DataTable` | `columns`, `rows`, `caption` | `CompareTable` (pricing, retired) |
| `Faq` | `items` | `home/FAQ`, `FaqAccordion` (two FAQ implementations today). Native `<details>`, no client JS. Emits FAQPage JSON-LD only where allowed (§7). |
| `Steps` | `items`, `band?` | `home/ProcessStep`, `services/Steps` (class A: reuse the markup, restyle) |
| `LedgerRow` | `title`, `children`, `tools`, `id` | `IncludedServices` |
| `BoundaryStatement` | `children?` (default text from `frameworks.ts`) | — |
| `DefinitionCard` | `items` | — |
| `LogoRow` | `logos` | New. Renders nothing if fewer than three approved logos (07 §7). |
| `CtaBlock` | `title`, `text`, `primary`, `secondary?` | `home/SendUsEmail` (used on 14 pages: swap in one step) |
| ~~`Reveal`~~ → `layout/MotionScope` *(client, once in the root layout)* | marks: `data-reveal`, `data-ambient` | 17 files importing ScrollTrigger for entrance effects. One IntersectionObserver for the whole page, no GSAP, no wrapper per block (changed during Stage 9). |

---

## 4. Layout and sections

### `components/layout/`

| Component | Type | Notes |
|---|---|---|
| `Header` | server | Renders bar and all panel HTML from `navigation.ts`. Replaces `Header.tsx` (class B). |
| `MegaMenu` | client | Open/close logic only: `aria-expanded`, hover intent, Esc, scrim, focus-out. Port of `prototypes/ui.js` as corrected after the Stage 5 review: each panel is rendered directly after its trigger inside the same `<li>`, a click after a hover-open keeps the panel open, and focus leaving the trigger's `<li>` closes it. |
| `MobileDrawer` | client | Accordion, scroll lock, focus trap. Same source data. |
| `Footer` | server | From `navigation.ts`. Replaces `Footer.tsx` (class B). |
| `Breadcrumbs` | server | Emits BreadcrumbList JSON-LD. |
| `JumpLinks` | server | Sticky in-page navigation; anchors must match 04 §5 and 06. |
| `ConsentBanner` | client | New. Gates GA4 and Tawk.to until consent (07 §10). |

Removed from the layout: `SmoothScroll` (Lenis), `ThemeToggle` (if D-01 is approved), `RouteGuard`'s use for hiding Work (it produces soft 404s; routes are removed instead).

### `components/sections/`

| Section | Used by |
|---|---|
| `Hero` (variants: `home`, `page`) | All templates. Replaces `home/Hero`, `ServiceDetailHero`, `AboutHero`, `ContactHero`, `WorkHero`. |
| `ClientLogos` | Home, About, Contact |
| `PillarGrid` | Home, Services hub |
| `PlatformCards` | Home, Platforms hub, pillar pages |
| `FrameworkCards` | Home, Compliance hub, platform pages |
| `ApproachSteps` | Home, Our Approach |
| `Deliverables` | Home, pillar, capability, framework |
| `ToolingTable` | Capability, pillar |
| `CapabilityLedger` | Platform, pillar |
| `NamedContact` | Pillar, capability (renders a role only when V-13 is not confirmed) |
| `InsightsTeaser` | Home, pillar |
| `ContactFormSection` | Pillar, capability, platform, framework, Contact |

### `components/diagrams/`

| Diagram | Type | Notes |
|---|---|---|
| `Lifecycle` | client | Tabs pattern over a server-rendered ordered list (works without JS). |
| `PipelineGates` | server (SVG) | CSS animation; optional GSAP scroll link added later. |
| `DefenceInDepth` | server | HTML + CSS. |
| `ControlMap` | server (SVG) | Data-driven from `frameworks.ts`. |
| `LayeredPlatform` | client, dynamic import, `ssr: false` | Plain three.js mount function on a `<canvas>`, with `HeroCanvas`'s gating logic (width, reduced motion, visibility). No React Three Fiber (08 §10.2). CSS stack as the server-rendered fallback and loading state. |

---

## 5. Data model (`src/resources/`)

Typed files are the single source for pages, menus, sitemap and structured data. This removes the current drift between nav, footer, service data and sitemap.

```ts
// services.ts
type Capability = { id: string; title: string; summary: string; body: string[]; tools?: Partial<Record<PlatformId, string[]>>; page?: string /* slug if standalone */ };
type Service = {
  slug: string; kind: 'pillar' | 'capability'; parent?: string;
  title: string; h1: string; lead: string; seo: { title: string; description: string };
  problems?: string[]; capabilities?: Capability[]; method?: Step[]; deliverables: string[];
  platforms: PlatformId[]; frameworks: FrameworkId[]; faq: QA[]; contactTopic: string;
  status: 'live' | 'later';
};

// platforms.ts
type Platform = { slug: PlatformId; name: string; h1: string; lead: string; seo; whenItFits: string[];
  sections: { id: SectionId /* the 7 anchors in 04 §5 */; title: string; body: string; tools: string[]; link: string }[];
  frameworkNotes: Record<FrameworkId, string>; faq: QA[];
  verified: { delivery: boolean; partnerBadge?: Badge; certifications?: Cert[] } };

// frameworks.ts
type Framework = { slug: FrameworkId; name: string; region: string; h1: string; lead: string; seo;
  appliesTo: string[]; sharedResponsibility: { platform: PlatformId; agreement: string }[];
  controls: { ref: string; title: string; body: string; evidence: string; pillarAnchor: string }[];
  evidence: string[]; notOurRole: string[]; faq: QA[]; verified: boolean; legalReviewed: boolean };
```

**Gating is data, not code.** A page is generated only when its flag is true (`status: 'live'`, `verified.delivery`, `verified && legalReviewed`). `generateStaticParams`, the menus, hub pages, footer and `sitemap.ts` all filter on the same flags, so an unverified platform or framework cannot appear anywhere by accident. This implements the "works either way" rule in 07 §11.

`navigation.ts` holds the menu structure from 04 §8 and references slugs, so menu links cannot drift from routes. `site.ts` holds verified company facts; a missing value renders nothing instead of a placeholder.

Legacy data files (`categorizedServices.js`, `services.js`, `ourProjects.js`, `offeringTechnologies.js`, `locations.ts`, parts of `content.js`) stay in the repo, unreferenced, until the cleanup step.

---

## 6. Reuse map for existing components

| Existing | Class | Action |
|---|---|---|
| `Providers`, `components/index.ts` | A | Keep; prune exports |
| `Header`, `Footer` | B | Replace with `layout/` versions |
| `SmoothScroll`, `ThemeToggle` | A | Remove from layout (08 D-01, D-06) |
| `home/Hero` + `three/HeroCanvas` | B / A | Keep `HeroCanvas`'s gating logic, replace its R3F `<Canvas>` with a plain canvas; new copy and CTAs; swap scene |
| `three/HeroCrystal` | A | Replace with `LayeredPlatform` |
| `home/ProcessStep`, `services/Steps` | A/B | Merge into `ui/Steps` |
| `home/FAQ`, `FaqAccordion` | B | Merge into `ui/Faq` |
| `home/SendUsEmail` | B | Replace with `ui/CtaBlock` |
| `services/IncludedServices` | A | Becomes `LedgerRow` usage |
| `services/Parallax` | A | Not used (08 D-07) |
| `seo/ServiceSchema` | A | Keep; extend (§7) |
| `contact/ContactForm`, `FormToggler`, `ContactOptions`, `ContactHero` | A/B | One form; new fields (07 §6.12); remove tabs |
| `contact/HireDeveloperForm`, `DeveloperRoleSelector` | D | Unlink; remove at cleanup |
| `contact/JobApplicationForm` | B | Unlink until CV sending is fixed (email applications meanwhile) |
| `blog/BlogClient`, `ShareButton` | A | Keep; add category filter and status filter |
| `careers/*` | A/B | Keep; content changes |
| `about/AboutValues`, `AboutWhyUs`, `AboutVision`, `Details` | B | Rebuild About from `sections/`; unlink these |
| `home/TrustStrip`, `StatsBento`, `WhyChooseUs`, `TechShowcase`, `Testimonals`, `services/Services`, `OfferingTechnologies` | B | Unlink (unverified claims or deprecated content) |
| `work/*`, `projects/*`, `ServiceRelatedWork`, root `ProjectCard` | W | Unlink; remove at cleanup |
| ~35 dead components | R | Remove at cleanup |
| `work/ProjectIllustrations` (SVGs) | W/B | Not reused; the four diagram concepts replace them |

---

## 7. SEO plumbing

| Item | Where |
|---|---|
| Metadata | Each template's `generateMetadata` reads `seo` from its data file. Page titles omit the brand (the layout template adds it), fixing the likely duplicate brand in titles. |
| Canonical | Self-referencing on every page, from one `canonical(path)` helper. |
| Structured data | `seo/JsonLd.tsx` helpers: `Organization` (layout, from `site.ts`), `BreadcrumbList` (Breadcrumbs), `Service` (pillar, capability, platform, framework), `Article` (posts), `FAQPage` only where the FAQ is visible on the page. No `Offer`/price data. |
| Sitemap / robots | `sitemap.ts` built from the data files with the same gating flags; hidden posts excluded. |
| Open Graph image | `api/og/generate` restyled to the light system; fonts bundled, not fetched per request. |
| Redirects, 410s | Per 05, only after approval: redirects in `next.config.mjs`, 410 responses in `middleware.ts`. |

---

## 8. Dependencies

| Package | Action |
|---|---|
| `three` | Add |
| `@react-three/fiber`, `@react-three/drei` | Do not add; rewrite the WIP hero's imports (08 §10.2) |
| `lucide-react` | Add (replaces `react-icons`) |
| `lenis`, `@tailwindcss/postcss`, `react-icons` | Remove once unreferenced |
| `gsap` | Keep; used only by the scroll-linked pipeline |
| `@once-ui-system/core` | Keep (decision 4) |
| `@calcom/embed-react`, `@emailjs/browser` | Keep; load only after interaction or consent |
| `@next/mdx`, `@mdx-js/loader`, `next-mdx-remote`, `gray-matter` | Review at cleanup: the audit found the MDX blog path unused |

---

## 9. Conventions

- One component per folder: `Name.tsx` + `Name.module.scss`. No inline `style` except computed values.
- Colours, spacing and radii only through tokens. A lint rule (stylelint `color-no-hex` in modules) enforces it.
- Media queries only through the three breakpoint mixins.
- `'use client'` appears only in the files marked client above.
- Headings: templates pass the heading level; a section never hard-codes `h1`.
- Every interactive component ships its keyboard behaviour and reduced-motion behaviour, or it is not done.
- Copy lives in `resources/`, not in components.

---

## 10. Risks

| Risk | Mitigation |
|---|---|
| Once UI global CSS fights the new tokens (page background, borders, transitions on `*`) | Load `tokens.css` after Once UI CSS; remove the global `transition`, noise overlay and page-in animation from `global.scss`/`custom.css` in the first design-system task; check each template visually. |
| Old and new styles coexist during the build | Build new templates on new routes first (`/cloud-platforms`, `/compliance`), then switch shared layout, then migrate existing routes. |
| Anchor IDs drift from menu links | Anchors are constants shared by `navigation.ts` and the templates; a build-time check fails on a menu link whose anchor does not exist. |
| 3D chunk hurts first load | Dynamic import, desktop-only mount, budget in 08 §10.3, measured before merge. |
| Gated content leaks into menus or the sitemap | Single flag source (§5) and a test that the sitemap equals the set of generated routes. |

One automated check is worth adding with the first template: a script that builds the site, collects every internal `href`, and fails on any link to a route or anchor that does not exist. It covers the brief's "avoid broken internal links" rule for the whole migration.
