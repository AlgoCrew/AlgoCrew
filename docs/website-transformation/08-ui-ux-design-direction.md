Stage 4 deliverable. Status: awaiting review.

# 08 — UI/UX Design Direction and Design System

This document defines the light-first visual system, navigation, interaction, motion and 3D direction. It is demonstrated by the prototypes in [`prototypes/`](prototypes/README.md):

| Prototype | Shows |
|---|---|
| `index.html` | Home template, mega menus, mobile drawer, lifecycle interaction, scroll motion |
| `service-devsecops.html` | Capability template |
| `platform-azure.html` | Platform template |
| `compliance-hipaa.html` | Framework template |
| `concept-3d.html` | The four visual concepts, including a live three.js scene |
| `proto.css`, `ui.js` | Draft tokens, components and behaviour |

Routes, menu content and page outlines come from [04](04-proposed-sitemap.md) and [07](07-content-strategy.md) and are not repeated here.

---

## 1. Principles

1. **Light first.** White and off-white carry the site. Dark appears once per page at most, for a technical diagram or security story, plus the closing call to action.
2. **One accent.** A single blue does all the pointing. Cyan is a secondary signal used only in diagrams.
3. **Type does the work.** Large, tight headlines and generous space replace gradients, glows and glass.
4. **Technical, not decorative.** Every visual explains something: layers, a pipeline, a control map. Monospace labels mark technical facts (stage numbers, tool names, regulation references).
5. **Honest surfaces.** No statistics, badges or logos that have not been verified (07 §11). The design must look complete without them.
6. **Fast and accessible by default.** Content is server-rendered HTML. Motion and 3D are enhancements that can be removed without losing meaning.

**Departures from today's site:** dark default, translucent "glass" cards, cyan-to-blue gradients, noise overlay, marquees, pinned horizontal scroll, and a global `transition` on every element are all retired.

---

## 2. Decision needed: theme

The current site defaults to dark with a light toggle. 04 §8.1 says "dark default stays", which conflicts with the light-first brief. This document supersedes that line.

| Option | Effect |
|---|---|
| **A. Light only in release 1 (recommended)** | One theme to design, build and test. Remove the toggle. Dark sections still exist as designed surfaces. |
| B. Light default, dark toggle kept | Every component needs a second set of tokens and a second QA pass. Roughly 25–30% more design-system and QA effort. |

Recommendation: A. A dark theme can be added later from the same semantic tokens (§3 is structured for it).

**Decided: A.** The client chose light only for release 1. 04 §8.1, §8.8 and §9 are amended to match. Implementation removes the hard-coded dark attribute and theme-init script in `layout.tsx`, the `ThemeToggle`, and any saved theme in `localStorage` (so returning visitors are not stuck on a theme that no longer exists).

---

## 3. Colour

Tokens are semantic. Components never use raw hex values.

### 3.1 Light surface tokens

| Token | Value | Use | Contrast on white |
|---|---|---|---|
| `--bg` | `#ffffff` | Page | — |
| `--bg-soft` | `#f5f7fa` | Alternating sections, hovers | — |
| `--bg-tint` | `#eef3fe` | Brand-tinted panels: boundary statement, featured menu slot, icon tiles | — |
| `--ink` | `#0b1220` | Headings, primary text | 18.7:1 |
| `--ink-2` | `#414b5d` | Body text, leads | 8.8:1 (8.2:1 on soft) |
| `--ink-3` | `#5d6779` | Captions, metadata, menu descriptors | 5.7:1 (5.3:1 on soft) |
| `--line` | `#e2e7ee` | Hairlines, card borders | decorative |
| `--line-strong` | `#c9d1dc` | Dividers, placeholder outlines | decorative |
| `--line-control` | `#7c8799` | Borders of inputs and outline buttons | 3.6:1 |
| `--brand` | `#1d4ed8` | Links, primary button, eyebrows, focus ring | 6.7:1; white on it 6.7:1 |
| `--brand-strong` | `#173fae` | Hover and pressed | white on it 8.9:1 |
| `--cyan` | `#0891b2` | Diagram accents only | 3.7:1: never for text |

All ratios were calculated with the WCAG 2 formula, and the Stage 5 review recomputed them and found them correct. Text pairs meet AA (4.5:1). `--line-control` is for input borders, which need 3:1. Correction from the review (R-14): the light outline button is not a failure, because its label carries the contrast and WCAG does not require a border on a text button. The real gap is the outline button on dark surfaces, whose `--dark-line` border measures 1.45:1 and gives the button no visible edge; on dark it must use `--dark-ink-2` for the border.

### 3.2 Dark surface tokens (sections, not a theme)

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--dark` | `#0b1120` | Dark section background (the current site's page colour, kept for continuity) | — |
| `--dark-2` | `#121a2c` | Cards on dark | — |
| `--dark-line` | `#26314a` | Borders on dark | decorative |
| `--dark-ink` | `#e8edf6` | Text on dark | 16.0:1 |
| `--dark-ink-2` | `#a6b1c6` | Secondary text on dark | 8.7:1 (8.0:1 on dark-2) |
| `--sky` | `#7dd3fc` | Links, eyebrows and accents on dark | 11.3:1 |
| `--sky-strong` | `#38bdf8` | Selected state, diagram lines on dark | — |

### 3.3 Rules

- One dark section per page, plus the closing call to action. Home: lifecycle. Framework: control map. Cloud Security: defence-in-depth diagram.
- Gradients: only one soft radial tint behind a hero (`--bg-tint` to transparent) and one in the call-to-action block. No gradient text, no gradient borders.
- Status colours (success, warning, error) are needed for forms only: `#15803d`, `#b45309`, `#b91c1c` on white, always with an icon or text, never colour alone.
- Brand relationship: `--brand` is the existing `--brand-blue #2563eb` darkened one step for contrast. The existing cyan `#06c8e8` is retired from UI and survives as `--cyan`/`--sky` in diagrams.

---

## 4. Typography

**Families:** Geist (all text) and Geist Mono (technical metadata). Both are already loaded through `next/font`; no new fonts.

| Role | Size (fluid) | Weight | Line height | Tracking | Example |
|---|---|---|---|---|---|
| Display | `clamp(2.5rem, 6.2vw, 4.75rem)` | 600 | 1.02 | -0.035em | Home hero H1 |
| H1 (page) | `clamp(2.25rem, 5vw, 3.75rem)` | 600 | 1.05 | -0.03em | Inner-page H1, call-to-action heading |
| H2 (section) | `clamp(1.75rem, 3.6vw, 2.75rem)` | 600 | 1.1 | -0.025em | Section headings |
| H3 (card) | `1.25rem` | 600 | 1.25 | -0.01em | Card and row titles |
| Lead | `clamp(1.0625rem, 1.6vw, 1.3125rem)` | 400 | 1.55 | 0 | Hero and section intros, max 60ch |
| Body | `1.0625rem` (17px); 16px below 640px | 400 | 1.6 | 0 | Paragraphs, max 70ch |
| Small | `0.9375rem` | 400 | 1.5 | 0 | Card body, table cells |
| Nav | `0.9375rem` | 500 | 1 | 0 | Top bar items |
| Menu link / descriptor | `0.906rem` / `0.8125rem` | 550 / 400 | 1.3 / 1.4 | 0 | Mega menu |
| Button | `0.9375rem` | 550 | 1 | 0 | All buttons |
| Eyebrow / label | `0.75rem` Geist Mono, uppercase | 500 | 1 | 0.08em | Section eyebrows, table headers |
| Metadata | `0.6875–0.75rem` Geist Mono | 500 | 1.4 | 0.06em | Stage numbers, tool lists, §references, breadcrumbs |

Rules: one H1 per page. Headings use `text-wrap: balance`. Sentence case everywhere except the two fixed button labels from 07 §3.3. No text below 11px. No all-caps outside mono labels.

---

## 5. Space, grid, shape

| Token | Value |
|---|---|
| Container | 1200px content width + gutters |
| Gutter | `clamp(16px, 4vw, 40px)` |
| Section padding | `clamp(64px, 9vw, 128px)`; tight variant `clamp(40px, 6vw, 72px)` |
| Spacing scale | 4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128 px |
| Grid | 12 columns conceptually; shipped as 2, 3, 4 and 5-column grids with 20px gaps; split layouts 5/7 and 7/5 |
| Radius | 8px (controls, chips), 14px (cards), 24px (call-to-action block, concept frames) |
| Borders | 1px `--line` on cards and tables; 1.5px in diagrams |
| Shadow | One only: `0 1px 2px rgba(11,18,32,.04), 0 8px 24px rgba(11,18,32,.06)`, on hover and on the open mega menu. Resting cards have no shadow. |

**Breakpoints** (replacing 15 ad-hoc values found in the audit): `640px`, `1024px`, `1280px`, plus a 1440px content cap.

| Range | Behaviour |
|---|---|
| < 640 | Single column; buttons full width; body 16px |
| 640–1023 | Two-column grids; drawer navigation; split layouts stack |
| 1024–1279 | Desktop navigation; Services menu wraps to 3 + 2 columns |
| ≥ 1280 | Full layouts; Services menu in 5 columns |

---

## 6. Components

| Component | Spec |
|---|---|
| **Primary button** | `--brand` fill, white text, 48px high (40px small), 10px radius, optional arrow that moves 3px on hover. One per view. |
| **Outline button** | White fill, `--line-control` border, `--ink` text. Secondary action only. |
| **Text link** | `--brand`, weight 550, underline on hover, trailing arrow for "go to" links. |
| **Card** | White, 1px border, 14px radius, 28px padding. Linked cards lift 2px and take a brand border on hover. Contents: optional icon tile or mono label, H3, one paragraph, optional chips, optional "more" link. |
| **Chip** | Mono 12px on `--bg-soft` with border. Used for tool names and capability tags. Not interactive unless it is a link (then it takes a hover border). |
| **Icon tile** | 40px, `--bg-tint`, 1.6px stroke line icon in `--brand`. One icon style site-wide (outline, rounded joins). |
| **Eyebrow** | Mono uppercase with a 24px leading rule. Introduces every section. |
| **Section head** | Eyebrow, H2, optional lead. Max width 760px. |
| **Framework card** | Region/sector mono label, framework name at 1.5rem, one line. |
| **Boundary statement** | Left 3px brand rule on `--bg-tint`. Label "Our role". Appears on Home, Compliance hub, every framework page, platform pages and the Compliance menu. |
| **Steps** | Numbered columns in one bordered container; a dark band underneath carries the "applied at every step" message. Stacks vertically below 1024px. |
| **Ledger row** | Three columns: title, description with link, mono tool list. Used for platform capabilities and method stages. |
| **Jump links** | Sticky bar under the header on long pages; horizontal scroll on small screens. |
| **Table** | Mono uppercase headers, hairline rows, first column bold, horizontal scroll wrapper on small screens. |
| **Checklist** | Tick list for deliverables; dash list for "what we do not do". |
| **FAQ** | Native `<details>`; plus/minus marker; one answer paragraph. |
| **At-a-glance card** | Definition list in the hero of capability pages: practice, platforms, frameworks supported. |
| **Client logo row** | Four equal cells in one bordered row; monochrome logos; no links, no hover. 2 × 2 below 1024px. Rules in 07 §7. |
| **Call-to-action block** | Dark, 24px radius, H1-size heading, one line, primary button plus optional booking link. |
| **Breadcrumbs** | Mono 12px, slash separators, last item `aria-current="page"`, with BreadcrumbList structured data. |
| **Form fields** (not prototyped) | 48px high, `--line-control` border, visible label above, help text below, error text in red with icon, focus ring as §9. Topic and cloud selects per 07 §6.12. Consent checkbox links to the privacy policy. |
| **Placeholder** (design-time only) | Dashed outline, mono text. Marks items waiting on the verification register. Never ships. |

Each template keeps its own identity through its hero and its signature block:

| Template | Hero | Signature block |
|---|---|---|
| Home | Display H1 + layered 3D visual | Interactive lifecycle (dark) |
| Services hub | H1 + five-pillar index | Pillar blocks with capability anchors |
| Pillar | H1 + problems list | Capability sections with anchors |
| Capability | H1 + at-a-glance card | Method ledger + per-cloud tooling table |
| Platform | H1 + partner slot | Seven-row capability ledger |
| Compliance hub | H1 + boundary statement | Framework cards + control-mapping diagram |
| Framework | H1 + boundary statement | Control map (dark) + "what we do not do" |
| About | H1 + company facts | Client logo row, leadership |
| Our Approach | H1 + five steps | Engagement models, FAQ |
| Trust | H1, plain | Practice list, stated literally |
| Contact | H1 + form | What happens next |
| Insights listing / article | H1 + filters / title + byline | Featured post / linked contents + related service box |

---

## 7. Navigation

Content of every menu is fixed in 04 §8. This section specifies layout and behaviour, as built in `ui.js`.

### 7.1 Desktop (≥ 1024px)

- Sticky bar, 68px, white at 88% opacity with background blur, hairline bottom border.
- Left to right: wordmark, five items, primary button.
- Items with a menu are `<button aria-expanded aria-controls>`. Insights is a plain link.
- **Open:** click, Enter or Space; or hover after a 150ms intent delay (pointer devices only). **Close:** Esc (focus returns to the trigger), click on the scrim, focus leaving the header, or pointer leaving for 250ms. One panel open at a time.
- Panels are full-width, anchored under the bar, with a scrim over the page. They drop in 6px over 180ms.
- Tab order follows the visual order: trigger, then the panel's columns left to right, then the footer row.

| Panel | Layout |
|---|---|
| Services | Five columns, one per pillar: mono heading (links to the pillar), then links with a one-line descriptor. Footer row: "Explore Our Capabilities", platform line, and the "How we work" featured slot. 3 + 2 columns at 1024–1279px. |
| Cloud Platforms | Two-column link list + featured slot on the right. |
| Compliance | Two groups (Frameworks, Governance & Readiness) + the "Our role" boundary statement as the featured slot. |
| Company | One group in three columns. |

**Production requirement:** all menu HTML is rendered on the server and present without JavaScript (the prototype builds it in JS only to share one header across static files). Without JavaScript the top-level items are links to their hub pages.

### 7.2 Mobile and tablet (< 1024px)

- Bar: wordmark, compact "Talk to us" button, 44px menu button.
- Drawer fills the screen below the bar. Page scroll is locked, focus is trapped, Esc closes and returns focus to the menu button.
- Accordion with one section open at a time. Services lists the five pillars only (no anchor links). Minimum row height 44px (56px for section headers).
- Sticky footer inside the drawer: full-width primary button.

### 7.3 Footer

Five columns (brand and contact, Services, Cloud Platforms, Compliance, Company) collapsing to two, then one. Bottom bar: legal entity, Privacy, Terms, Cookie settings. Content in 04 §9.

---

## 8. Motion

Tooling: CSS transitions and keyframes first. GSAP + ScrollTrigger (already installed) only for the scroll-linked pipeline. **Lenis smooth scrolling is removed** (native scrolling is more accessible and removes a global dependency). No Framer Motion, no Lottie: nothing in the design needs them.

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(.2, .7, .2, 1)` | Entrances |
| `--dur-1` | 150ms | Hover, focus, button, chip |
| `--dur-2` | 180–200ms | Menu panel, accordion, tab change |
| `--dur-3` | 600ms | Scroll reveal |

| Pattern | Behaviour |
|---|---|
| Scroll reveal | Fade and rise 14px, once, when a block enters the viewport. Siblings stagger by 60ms, capped at four. Content already on screen at load is never hidden. |
| Hover | Colour and border changes; cards lift 2px; arrows move 3px. Nothing scales. |
| Menu | Panel drops 6px; scrim fades. |
| Lifecycle | Selecting a stage moves the marker and swaps the panel; arrow keys move between stages. |
| Diagrams | Slow, continuous and low-contrast: a dash flowing along the pipeline, a soft pulse on security rings. |
| Hero 3D | Gentle idle sway (±10°), pointer tilt, pulses travelling between layers. |

Rules:
- Animate `opacity` and `transform` only.
- `prefers-reduced-motion: reduce` disables reveals, loops and 3D animation. The 3D scene renders one still frame. Nothing depends on motion to be understood.
- No scroll-jacking, no pinned horizontal scroll, no parallax on text, no autoplaying carousels, no marquees.
- No animation runs longer than 600ms except ambient diagram loops, which stop when off screen.

---

## 9. Accessibility

| Area | Requirement |
|---|---|
| Structure | One H1; ordered headings; landmarks (`header`, `nav`, `main`, `footer`); skip link as the first focusable element |
| Keyboard | Everything reachable and operable; visible focus: 3px `--brand` ring with 3px offset (`--sky` on dark); no focus traps except the open drawer |
| Menus | Disclosure pattern (`button` + `aria-expanded`), not `role="menu"`; Esc closes |
| Lifecycle | Tabs pattern (`tablist`, `tab`, `aria-selected`, roving tabindex, arrow keys); without JS it is a plain ordered list |
| Contrast | Text ≥ 4.5:1, large text and control boundaries ≥ 3:1 (§3) |
| Targets | ≥ 44 × 44px on touch layouts |
| Media | Decorative visuals `aria-hidden`; diagrams have a text alternative (caption list, table or `aria-label`); logos have the company name as alt text |
| Motion | §8 |
| Forms | Visible labels, described errors, no placeholder-only labels, error summary on submit |
| Zoom | No horizontal scroll at 320px width or 200% zoom, except inside tables and the lifecycle strip |
| Target standard | WCAG 2.2 AA |

---

## 10. 3D and visual storytelling

Demonstrated in `prototypes/concept-3d.html`.

| # | Concept | Explains | Where | Technology | Fallback |
|---|---|---|---|---|---|
| 1 | **Layered platform**: three slabs (cloud foundation, platform, workloads), nodes, pulses between layers, a security outline on every layer | What we build, and that security is in every layer | Home hero only | Plain three.js with named imports (§10.2) | CSS 3D stack (the `index.html` hero), then a static image |
| 2 | **Pipeline with gates**: seven stages on a line, a gate between each, an evidence band underneath | DevSecOps | Home lifecycle; DevSecOps page | Inline SVG + CSS; GSAP for the scroll-linked version | Static SVG, then the ordered list |
| 3 | **Defence in depth**: nested layers around data | Cloud security | Cloud Security page (its dark section) | HTML + CSS | Already static |
| 4 | **Control mapping**: requirements → controls → evidence, many-to-one | Compliance | Compliance hub; framework pages | Inline SVG | Static SVG, then the control-map table |

**Only concept 1 uses WebGL.** Everything else is SVG or CSS, which is sharper, lighter and readable by assistive technology.

### 10.1 The work-in-progress hero crystal

The uncommitted `src/components/home/three/` hero renders an abstract glass crystal with a transmission material. Recommendation: **replace the crystal with concept 1 and keep the wrapper's gating logic.** The crystal is decorative (the brief asks for visuals with meaning) and transmission needs an extra render pass per frame. The `HeroCanvas` wrapper's behavior is good and is kept: it skips mounting below 860px, renders one frame for reduced motion, and pauses when off screen. Its React Three Fiber `<Canvas>` is replaced by a plain `<canvas>` and a three.js mount function, for the size reason measured in §10.2.

### 10.2 Dependencies

| Package | Decision |
|---|---|
| `three` | Add. Import only the classes the scene uses. |
| `@react-three/fiber` | **Do not add** (changed after measurement, below). The scene has no React state, so the reconciler buys nothing. |
| `@react-three/drei` | Do not add. |
| GSAP | Keep; use only for the scroll-linked pipeline. |
| Lenis | Remove. |
| Framer Motion, Lottie | Do not add. |

**Measured (review finding R-08).** The scene was built two ways with esbuild (minified, ESM, React external) and gzipped at level 9, using three 0.187.0 and React Three Fiber 9.8.2:

| Build | Minified | Gzip |
|---|---|---|
| Plain three.js, named imports | 526 KB | **130 KB** |
| React Three Fiber `<Canvas>` version | 916 KB | **244 KB** |

The original 180 KB budget could not be met with React Three Fiber. Plain three.js meets it with room to spare. These are esbuild numbers from a scratch build, not from the site's Next.js build; re-measure in the real build (roadmap T9.02).

### 10.3 Performance budget

| Item | Budget |
|---|---|
| 3D code | Loaded with `next/dynamic` and `ssr: false`, after first paint. Not part of the initial JavaScript. Target ≤ 150 KB gzip for the 3D chunk (measured 130 KB in a scratch build). |
| Largest Contentful Paint | The H1 text, not the canvas. Target ≤ 2.5s on a mid-range phone. |
| Layout shift | Canvas container has a fixed aspect ratio. CLS ≤ 0.05. |
| Frame cost | Under 150 draw calls, no post-processing, no shadows, no transmission, unlit materials. Pixel ratio capped at 1.75. |
| When it runs | Only ≥ 860px wide, only while the hero is on screen, only without reduced motion, only if WebGL is available. Otherwise the CSS stack is shown. |
| Other pages | No WebGL anywhere else. |

---

## 11. Imagery and iconography

- **Icons:** one outline set, 24px grid, 1.6px stroke, rounded joins. Recommend Lucide (ISC licence) so icons are consistent and need no drawing. Five pillar icons are sketched in the prototype.
- **Photography:** none in release 1. Team photos only on About and only with consent (07 V-13).
- **Vendor marks:** Azure, AWS and Google Cloud appear as text. Vendor logos and partner badges only as the partner programmes allow (07 V-01).
- **Client logos:** monochrome, single neutral tone (`#6b7587`, 4.7:1), equal visual weight (07 §7).
- **Open Graph images:** light background, wordmark, page title in Geist. The current generator's dark style and the Google Fonts fetch on every request are replaced at implementation.

---

## 12. Wireframes for templates not prototyped

Section order only; content is in 07 §6.

```
SERVICES HUB  /services
[H1 + 2-sentence intro]
[Pillar block ×5: mono number | name + line | capability links (2 cols) | platform chips]
[How engagements start → Our Approach]
[Platforms strip] [Frameworks strip]
[CTA block]

PILLAR  /services/{pillar}
[Crumbs · H1 · one-line outcome · primary button]      [Problems we solve: 3–4 items]
[Jump links: sticky]
[Capability section ×n: H2 + paragraph + tool chips | link to capability page if one exists]
[How we work: steps]
[What you get: checklist]            [Where we deliver: platform links]
[Supports: framework links]          [Named contact card]
[FAQ]
[Inline contact form]

COMPLIANCE HUB  /compliance
[Crumbs · H1 · lead]                 [Boundary statement]
[Framework cards ×4]
[Control-mapping diagram (concept 4)]
[Governance sections: ledger rows with anchors]
[What you get]  [FAQ]  [CTA: Discuss Your Compliance Requirements]

ABOUT  /about
[H1 · who we are]                    [Company facts: definition list]
[What we do and do not do: 5 short paragraphs + boundary line]
[Leadership: cards, photos only with consent]
[#clients: "Teams we've worked with" + logo row + one neutral sentence]
[Credentials held: only if verified]
[CTA]

OUR APPROACH  /our-approach
[H1 · lead]
[Five steps: each with purpose, activities, named outputs]  [Secure band across all five]
[#engagement-models: 3–4 cards, no prices]
[Working with your team: access, communication, handover]
[#faq]
[CTA]

TRUST  /trust
[H1 · lead]
[Practice list: ledger rows: topic | what we do | evidence available on request]
[Our own compliance status, stated literally]
[How to request questionnaire answers]

CONTACT  /contact
[H1]                                 [What happens next: 3 steps]
[Form: name, work email, company,    [Booking link]
 topic, cloud(s), message, consent]  [Direct email / phone]
[Small client logo row]              [Careers link]

INSIGHTS LISTING  /blog
[H1 "Insights"]  [Category filters ×4]
[Featured article: wide card]
[Article grid: 3 columns: category label, title, date, read time]

INSIGHTS ARTICLE  /blog/{slug}
[Crumbs · category · H1 · byline · published / updated]
[Summary]
[Body: 70ch]                          [Sticky linked contents (desktop)]
[Related service box]
[3 related posts]
[CTA: Talk to the team behind this article]

404
[H1 "Page not found"]  [Links: five pillars, Compliance, Contact]
```

---

## 13. Decisions requiring approval

| ID | Decision | Recommendation |
|---|---|---|
| D-01 | Theme | Light only in release 1; remove the toggle (§2) |
| D-02 | Accent colour | Single blue `#1d4ed8`; cyan kept for diagrams only |
| D-03 | Typeface | Keep Geist and Geist Mono |
| D-04 | Hero visual | Replace the WIP crystal with the layered-platform scene; reuse its wrapper (§10.1) |
| D-05 | WebGL scope | Home hero only; all other visuals SVG/CSS |
| D-06 | Libraries | Add `three` only (no React Three Fiber, per the measurement in §10.2); remove Lenis; no Framer Motion or Lottie |
| D-07 | Scroll effects | Retire pinned horizontal scroll, marquees and parallax |
| D-08 | Icons | Lucide outline set |
| D-09 | Photography | None in release 1 |

## 14. Known gaps

- The outline button on dark surfaces has no visible edge (1.45:1); fix specified in §3.1. Not yet changed in the prototype.
- Still specified but not prototyped: Services hub, About, Our Approach, Trust, Insights listing and article, 404, and Open Graph images (§12).
- Checked only in one Chromium-based browser at 375, 1100 and 1440px. Not checked: Safari, Firefox, tablet widths, screen readers, real phones, 200% zoom.
- The three.js concept was checked for rendering and console errors, not profiled for frame rate.
- Fixed in the prototypes after the Stage 5 review: menu tab order (R-01), hover-then-click (R-02), lifecycle tabs pattern (R-03), unverified copy claims (R-07), HIPAA applicability sentence (R-13). Also closed since: distinct inner-page heroes with their diagrams (R-05), prototypes for Contact, a pillar page and the Compliance hub (R-18), launch-state layouts (R-04), the theme amendment (R-17), logo placement (R-20) and the dark outline button (R-14). The review's minor and polish findings are handled during implementation (10 §11.2).
