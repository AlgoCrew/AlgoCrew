Stage 5 deliverable. Status: awaiting review.

# 13 — Independent Design Review (docs 08, 09 and `prototypes/`)

## 1. Verdict

The design system and the homepage can go ahead, after fixes. The inner-page templates cannot go ahead yet.
The light-first system, the information architecture, the compliance language and the 3D scoping are sound, and the copy is unusually disciplined.
First, three things must change. Record the theme decision (D-01) in 04 and the codebase, because today they contradict each other. Design the "verified-only" launch state of the homepage and menus, because V-01 to V-04 are still open. Fix the mega-menu tab order and the hover/click conflict in `ui.js` before 09 "ports" it.
Next, give the service, platform and framework templates their own heroes and signature visuals: today they share one skeleton and no diagrams. Also remove or register the unverified operational and legal claims in the copy.

---

## 2. How the review was done

- **Rendered.** The prototypes were served at `http://localhost:4173/` and viewed in the desktop app's built-in Chromium browser at 1440×900, 800×1024 (tablet) and 375×812 (phone, mobile emulation). All five pages were read in source. The Services mega menu was opened at 1440. The drawer was opened at 800. The lifecycle tabs were inspected.
- **Measured in the page with JavaScript:** focus order with a panel open, the hover-then-click behaviour, the scroll width and the card layout per width, the position of the logo row, the height of the homepage on a phone, the size of footer link targets, the heading outline of every page, and the transfer size of the three.js module.
- **Keyboard:** Shift+Tab was pressed for real inside the open drawer. Other focus orders were derived from the DOM order of focusable elements, not from pressing Tab through every page.
- **Contrast:** every pair in 08 §3 was recomputed with the WCAG 2 formula (§4, R-14).
- **Codebase:** `src/app/layout.tsx`, `src/components/home/three/HeroCanvas.tsx`, `Hero.tsx` and `package.json` were checked to test the claims in 08 §10.1 and 09.
- **Not checked:** Safari, Firefox, real touch devices, any screen reader (VoiceOver or NVDA), 200% zoom and 320px width, 3D frame rate or GPU cost, real hover-intent with a physical pointer, and a production bundle size for three.js plus React Three Fiber (only the CDN module was measured). Provider legal terms (BAAs, attestations) were checked from general knowledge, not against the current contract text.

---

## 3. Scorecard

| Area | Score (1–5) | Reason |
|---|---|---|
| Business objectives | 4 | Exclusively cloud, DevSecOps, security and compliance. No portfolio, statistics or testimonials. The trust strategy is honest, but thin if V-items fail (R-04). |
| Sitemap / IA fit | 4 | The prototypes follow 04's menus and anchors closely. A few drawer and mobile deviations (R-09). |
| Homepage effectiveness | 3 | "What" and "which clouds" land in the hero. "Why trust us" sits below the fold on every width and depends on unverified items (R-04). |
| Visual quality vs "premium, not generic" | 3 | Clean and restrained, but built from the now-common dev-tool kit: mono eyebrows with rules, chips, icon tiles, dark CTA with glow (R-06). |
| Template differentiation | 2 | The service, platform and framework heroes share one skeleton. Inner pages have no visuals. The same split-plus-checklist block repeats about eight times (R-05). |
| Navigation / mega menus | 3 | Good grouping and content. Two behaviour defects: tab order (R-01) and hover-then-click closing the panel (R-02). |
| Mobile | 3 | No overflow, and the drawer works. But there is a ~600px decorative stack before any proof, a 12,400px homepage, a 7-tab strip showing under 3 stages, and orphan cards on tablet (R-10, R-11). |
| Accessibility | 3 | Skip link, landmarks, focus ring, reduced motion and contrast are all good. The menu tab order, the incomplete tabs pattern and the drawer trap need work (R-01, R-03, R-12). |
| Performance / 3D strategy | 3 | WebGL is correctly limited to one place and the wrapper is good. The 180 KB budget is unlikely to hold with React Three Fiber (R-08). |
| Content credibility / compliance language | 3 | The boundary wording is excellent. But some unregistered operational claims, one overstated HIPAA applicability sentence and a few provider-wording nuances remain (R-07, R-13). |
| Technical feasibility in the codebase | 3 | The plan is coherent. Theme migration, Once UI global CSS and the absence of any effort estimate are under-specified (R-15, R-16). |
| SEO | 4 | Server-rendered menus, data-driven sitemap, anchors and FAQ rules are right. Minor heading and link gaps (R-19). |

---

## 4. Findings

Severity: **Blocker** stops implementation from starting correctly. **Major** must be fixed before the affected template ships. **Minor** is fixed during the build. **Polish** is optional.

### Blockers

**R-17 — Theme decision contradicts 04 and the codebase** · Blocker
- **Where:** 04 §8.1 line 223 ("dark default stays"); 04 §8.8 line 316 and §9 line 331 (theme toggle in the drawer and footer); 07 §7 (logos "adapted for light and dark themes"); 08 §2 / D-01; `src/app/layout.tsx:96` `data-theme="dark"` plus the `theme-init` script (lines 177–228), which restores `localStorage['data-theme']` and falls back to `'dark'`.
- **Evidence:** 08 says it "supersedes" an approved Stage 2 line, but 04 was never amended. The prototypes show no toggle, while 04 still places it in two locations.
- **Why it matters:** this decides whether every token, component and QA pass is single or double. Returning visitors with a stored `dark` value would get a broken half-dark page unless the init script is changed.
- **Fix:** get D-01 approved explicitly, then amend 04 §8.1, §8.8 and §9 and 07 §7. In 09, add a task to remove the `theme-init` script, hard-set `data-theme="light"`, and clear the stale `data-theme` key from `localStorage` once.

**R-04 — The likely launch state is not designed, and "why trust us" is weak** · Blocker
- **Where:** `index.html` sections 2, 4, 6 and 8; 07 §11 (V-01 to V-04 "still unanswered"); 09 §5 gating.
- **Evidence:** the measured top of the logo row is 971px at 1440×900, 1155px at 800×1024 and 1351px at 375×812, so it is below the fold everywhere. Every other proof element on the homepage is a dashed placeholder: partner badges, certifications, named contacts and the Trust page. If V-02 fails, the logo row is removed. If V-03 fails for any platform or framework, the cards, menu columns and footer links shrink. Nothing shows what the homepage, the Services menu, the Compliance menu and the footer look like with, for example, one cloud and two frameworks.
- **Why it matters:** the brief's third question ("why should an enterprise trust us") may then be answered only by self-description. Layouts built for 3, 4 and 5 items (`.g3`, `.g4`, `.pillars`, `.mm-grid`) will look broken with 1 or 2.
- **Fix:**
  1. Get V-01 to V-04 answered before template work starts.
  2. Prototype a "minimum verified" homepage and menu set.
  3. Define layouts for 1, 2 and 3 items in each card group.
  4. Add proof that needs no third-party permission, close to the hero: the company facts line (city, legal entity), named leadership with LinkedIn (V-09, V-13), and "How we handle access to your environment" (V-14).

### Major

**R-01 — Mega-menu tab order is wrong, and 09 would port it** · Major
- **Where:** `ui.js:52–58` (panels appended after the whole bar); 08 §7.1 ("trigger, then the panel's columns"); 09 §4 (`MegaMenu`: "Port of `prototypes/ui.js`").
- **Evidence:** with Services open, the measured focus order is: Services → Cloud Platforms → Compliance → Insights → Company → "Discuss Your Cloud Strategy" → *then* the Services panel links. Opening Cloud Platforms with Tab does not close Services.
- **Fix:** in the server-rendered Header, render each panel directly after its trigger, inside the same `li`. Close an open panel when focus moves to another top-level trigger. Correct the reference prototype so the port is right.

**R-02 — Hover opens the panel, then a click closes it** · Major
- **Where:** `ui.js:70–71`.
- **Evidence:** reproduced as `mouseenter` → 220ms → `click` = `aria-expanded="false"`. A mouse user who rests on "Services" for more than 150ms and then clicks (the usual behaviour) closes the menu they just opened.
- **Fix:** when a panel was opened by hover, make the first click a no-op (keep it open), or make click only open. Many teams drop hover-open for disclosure navigation; 04 §8.2 allows either.

**R-03 — The lifecycle tabs pattern is incomplete** · Major
- **Where:** `index.html:184, 287–310`; 08 §9.
- **Evidence:**
  - The panel is `role="region" aria-live="polite"`, not `role="tabpanel"`, and has no `aria-labelledby`.
  - The tab names are read as "01Plan" (no space; measured).
  - There is no Home/End key support.
  - The panel is not focusable, so Tab from a tab skips its content.
  - The `aria-live` region also re-announces on every arrow press. Tabs already announce the selection, so this is noise.
  - Without JavaScript, `<button>`s with no behaviour sit above each list, which is a bad fallback.
- **Fix:** use `role="tabpanel"` with `aria-labelledby` pointing to the active tab and `tabindex="0"`. Remove `aria-live`. Add a visually hidden separator or `aria-label="Stage 1: Plan"`. Support Home/End. Render stage names as `h3` in the server HTML and swap to buttons only after hydration.

**R-05 — Inner templates share one skeleton and no signature visual is demonstrated** · Major
- **Where:** `service-devsecops.html`, `platform-azure.html`, `compliance-hipaa.html`; 08 §6 template table; 08 §10 (concept 2 "DevSecOps page", concept 4 "framework pages").
- **Evidence:**
  - All three heroes are `.hero.page`: crumbs, H1, lead, two buttons, and a small box on the right (an at-a-glance card, a placeholder, or a boundary statement).
  - On Azure, the right column is a placeholder that "is empty" without a badge, so the hero becomes text plus empty space.
  - The DevSecOps page uses a text ledger instead of the pipeline diagram 08 assigns to it. The HIPAA page uses a card grid instead of the control-map SVG.
  - The "eyebrow + H2 on the left, checklist on the right" split appears in Who/Deliverables/Risks/FAQ, When-Azure-fits/FAQ, and Applies/Evidence/Boundaries/FAQ.
- **Why it matters:** the brief asks for "distinctive hero, appropriate visual storytelling" per page, and says pages "must not all look like the same template".
- **Fix:**
  - Put concept 2 in the DevSecOps hero or method section.
  - Put concept 4 (with the table as its text alternative) in the HIPAA control-map section.
  - Give the platform hero a platform-specific visual, such as the landing-zone hierarchy as SVG (management groups → subscriptions), instead of an optional badge.
  - Vary at least two mid-page section layouts per template.
  - Prototype the pillar and Compliance-hub templates, which carry most search traffic (see R-18).

**R-06 — The visual language is clean but close to a stock "dev-tool" look** · Major
- **Where:** `proto.css`: `.eyebrow::before` (rule plus mono uppercase on every section), `.chips`, `.icon`, `.cta` (dark plus radial blue glow), and the alternating white/soft sections.
- **Evidence:** every homepage section opens with the same eyebrow → H2 → lead block, and the cards are uniform. The hero's CSS stack is 240px wide and occupies a small part of a 1440px screen. The H1 breaks over four lines at 1440 because the copy column is 7/12.
- **Why it matters:** the brief explicitly rules out a generic template look. Enterprise competitors (02b) use editorial scale and art direction to differentiate.
- **Fix:**
  - Let the hero visual take more space (about 50% of the width) and set the H1 to wrap in two or three lines.
  - Drop the eyebrow on at least half the sections.
  - Introduce one editorial device used nowhere else, such as a large numeric index on the pillars or a full-bleed technical diagram between sections.
  - Make the five pillar cards distinct in content: one real artefact preview each (a diagram fragment or a policy snippet) instead of an icon tile.

**R-07 — Unregistered claims in the prototype copy** · Major
- **Where and evidence:**
  - `platform-azure.html:100`: "We work with least-privilege, time-bound access in your tenant" is an own-security-practice claim (V-14).
  - `platform-azure.html:72, 101`: "Bicep or Terraform" and "recommend Terraform" contradict the V-16 rule that the DevSecOps page itself states ("Third-party tools (for example Terraform…) are named here only once the business confirms").
  - `platform-azure.html:102`: "Can you work alongside our existing Microsoft partner? Yes."
  - `service-devsecops.html:106, 149`: "Everything is delivered as code in your repositories", and on ownership: "You do." These are IP and contract terms (V-07).
  - `index.html:94`: "Each engagement states its inputs, deliverables and exclusions before work begins."
  - `index.html:127`: Managed services "by the team that built it" (V-12).
  - `index.html:265`: "An engineer will reply."
  - `compliance-hipaa.html:82`: "evidence that is produced automatically".
- **Why it matters:** 07 §11 says every claim must map to a verification item. These do not, and they would survive into production copy.
- **Fix:** add each statement to the register (new V-24 "delivery practices and IP terms") or rewrite it conditionally. Remove Terraform until V-16 is answered.

**R-08 — The 3D performance budget is not credible as written** · Major
- **Where:** 08 §10.3 ("≤ 180 KB gzip for the 3D chunk"); 08 §10.2 (add `three` and `@react-three/fiber`).
- **Evidence:** `three@0.160.0/build/three.module.js` measured 1.27 MB decoded and 196 KB compressed from the CDN. three.js tree-shakes poorly: a minified production bundle of the core is typically about 150–170 KB gzip. React Three Fiber and its reconciler add roughly 40–50 KB. The scene itself is cheap (about 35 draw calls by count, well under 150). The canvas never mounts below 860px, so the WebGL scene serves only desktop visitors, who already see the CSS stack that carries the same meaning.
- **Fix:**
  1. Measure a real production chunk before D-06 is approved.
  2. If it exceeds the budget, use plain `three` with `import { … }` of only the classes used (no React Three Fiber; the scene has no React state), or ship the CSS/SVG stack only and keep WebGL for a later release.
  3. Either way, keep the `HeroCanvas` gating, which was verified in `HeroCanvas.tsx` (`MIN_WIDTH = 860`, reduced-motion `demand` frameloop, IntersectionObserver, `dpr={[1, 1.75]}`).

**R-13 — HIPAA applicability sentence overstates the law** · Major
- **Where:** `compliance-hipaa.html:60`: "If you build or host software that stores or transmits that information, the Security Rule's safeguards apply to your cloud environment."
- **Why it matters:** HIPAA applies only to covered entities and their business associates. A health app that is not acting for a covered entity is generally outside HIPAA (the FTC Health Breach Notification Rule may apply instead). The sentence also contradicts the page's own boundary: "We do not … decide whether you are a covered entity or business associate."
- **Fix:** "If you are a covered entity, or a business associate that creates, receives, maintains or transmits ePHI for one, the Security Rule applies to the systems that hold it. Your counsel decides whether that is you."

**R-18 — Forms and the highest-traffic templates are not prototyped** · Major
- **Where:** 08 §14; README "Still not prototyped".
- **Evidence:** the contact form and the inline form required by 07 §6.2–6.6 on every pillar, capability, platform and framework page are only specified in a table. The same applies to the Services hub, pillar pages, the Compliance hub, About, Contact and Our Approach.
- **Why it matters:** forms are the conversion point and the main accessibility risk (labels, errors, consent). Pillar pages own most target keywords (04 §3).
- **Fix:** before Stage 6 build starts on those routes, prototype Contact with a full validation and error state, one pillar page and the Compliance hub.

**R-20 — Client-logo placement and the two competitor clients** · Major
- **Where:** `index.html:78–86`; 07 §7.
- **Evidence:** the logo row sits directly under a hero that says "We design, build and run cloud platforms". Atmosera is an Azure MSP that sells the same managed and DevSecOps services. Deloitte sells cloud, cyber and compliance. Nigel Frank International is a recruitment firm (07 §7). Directly under that claim, a row of four reads as "these bought this", which is exactly the inference 07 §7 wants to avoid. The neutral sentence from 07 §6.10 is used on About only, not on the homepage.
- **Fix:** keep the monochrome, equal-weight treatment (it is correct). Add the neutral sentence under the homepage row as well. Move the row below Capabilities, so it reads as context rather than endorsement of the hero claim. Make showing Atmosera and Deloitte on the homepage (rather than About only) an explicit client decision after V-18. Do not show Nigel Frank International if the relationship was staffing (07 §7).

### Minor

**R-09 — Drawer content deviates from 04 §8.8, and 04 and 08 disagree** · Minor
- **Where:** `ui.js:47` ("column headings plus real pages"); 04 §8.8 ("only the pillar pages and the two capability pages"); 08 §7.2 ("five pillars only").
- **Evidence:** the drawer's Services section lists five pillars with `href="#"`, but no Cloud Migration, no DevSecOps and no "All services". The Compliance section lists all eight links, including four `#anchor` links, which 04 says mobile omits.
- **Fix:** follow 04 (pillars plus the two capability pages plus "All services"), and drop the anchor-only Compliance items on mobile. Amend 08 §7.2.

**R-10 — Tablet layout leaves orphans and hides content** · Minor
- **Evidence at 800px:**
  - The five pillar cards fall into 2+2+1, and the platforms and insights grids into 2+1, leaving one half-width card each time (measured left offsets 32/410/32).
  - The lifecycle strip is 840px wide inside 736px, so stage 07 is cut off with no scroll hint.
  - `.steps` drops to one column at 1023px, stacking five short steps vertically on a wide screen.
- **Fix:** at 640–1023, show the five pillars as 2+3 or a full-width first card. Show three-item grids as one column of horizontal cards. Keep `.steps` at five columns down to 900px and use two columns below that. Give the lifecycle strip an edge fade and scroll-snap.

**R-11 — Phone: decorative stack before proof, very long page** · Minor
- **Evidence at 375px:** the CSS stack plus its caption occupy about 709–1300px, before the logo row at 1351px. The total homepage height is 12,404px. The lifecycle shows about 2.8 of 7 tabs (scroll width 840 in a 343px box).
- **Fix:**
  - Below 640px, hide `.stage` and keep the `.layers` caption list, which carries the meaning.
  - Turn the lifecycle into a vertical accordion or a native `<select>`.
  - Cut "What you get" to two cards on phone.

**R-12 — The drawer focus trap leaks, and the background is not inert** · Minor
- **Where:** `ui.js:82–87`.
- **Evidence:** the `keydown` listener is on `#drawer`, but the burger is outside it. Shift+Tab from the burger moved focus to the protobar links (tested). The page behind the drawer stays in the accessibility tree.
- **Fix:** put the listener on the header, or set `inert` on `main`, `footer` and the other header items while the drawer is open. `inert` alone removes the need for a manual trap.

**R-14 — Contrast claims: verified, with one misreading and one gap** · Minor
- **Verified (computed):**
  - `--ink` 18.72; `--ink-2` 8.79 (8.19 on soft); `--ink-3` 5.70 (5.31 on soft, 5.13 on tint).
  - `--brand` 6.70; `--brand-strong` 8.90; `--line-control` 3.63; `--line-strong` 1.54; `--cyan` 3.68.
  - `--dark-ink` 16.03; `--dark-ink-2` 8.72 (8.04 on dark-2); `--sky` 11.29; logo grey `#6b7587` 4.65 (08 says 4.7; rounding).
  - All the text pairs in 08 are correct.
- **Misreading:** 08 §3.1 says the outline button "fails the 3:1 requirement for control boundaries". WCAG 1.4.11 does not require a border on a button whose text label identifies it. The change to `--line-control` is still good practice, but it is not a conformance failure. Inputs, which have no label inside them, do need 3:1.
- **Gap:** `.dark .btn.ghost` uses `--dark-line #26314a` on `#0b1120` = 1.45:1. The "Book a 30-minute call" button in the dark CTA block is therefore barely visible as a button.
- **Fix:** correct the wording in 08. Use `--dark-ink-2` or a new `--dark-line-control` (≥ 3:1) for the outline button on dark surfaces.

**R-15 — Once UI and the old global CSS will fight the new tokens** · Minor
- **Where:** `layout.tsx:1–3` imports `@once-ui-system/core/css/styles.css` and `tokens.css` before `custom.css`. Once UI is used in 49 files. 09 decision 4.
- **Evidence:** 09 §10 lists the risk, but its mitigation ("load tokens.css after") does not cover Once UI's resets, typography and `data-theme` selectors, which key off the `dark` attribute set in R-17.
- **Fix:** add an explicit first task in 09: inventory which Once UI global selectors affect `body`, headings, links and focus. Scope new templates under a `.ds` root class, or use a CSS `@layer` order (`once-ui, legacy, tokens, components`), so the cascade is deterministic.

**R-16 — 09 has no effort, sequencing or ownership estimate** · Minor
- **Evidence:** about 25 R1 routes, 4 diagrams, 1 WebGL scene, a new token system, a consent banner, a single form, redirects and 410s (05), and a gating model, with no sizing or critical path.
- **Fix:** add a phase table with rough effort and dependencies (verification answers → tokens and layout → home → new routes → migrated routes → redirects), and name the verification items that block each phase.

**R-19 — SEO and semantic gaps** · Minor
- **Headings:** on every page the footer `h4`s follow `h2`/`h3`, skipping a level (outline measured, e.g. HIPAA `1 2 2 2 3…2 4 4 4 4`). Use `h2` styled small, or plain `p` labels.
- **Breadcrumbs:** `ol.crumbs` is not wrapped in `<nav aria-label="Breadcrumb">` (`service-devsecops.html:45` and the others).
- **Footer:** the "All services" link that 04 §9 requires is missing.
- **H1:** "Engineering Secure, Scalable Cloud Infrastructure." contains none of the homepage target terms from 04 §3 ("cloud security consulting", "DevSecOps"). This is acceptable for a brand H1 only if the `<title>` and meta description carry them. State that in 07 §6.
- **Fine as designed:** the hidden lifecycle lists and the `<details>` FAQs stay in the server HTML. Card links include their H3 in the accessible name, so "Explore →" is not a bare link.

**R-21 — Homepage CTAs and links from 07 §4 are missing** · Minor
- **Evidence:**
  - Section 3 has no "Explore Our Capabilities" link.
  - Section 6 has no "Compliance & Governance → /compliance" link (only the framework cards).
  - Section 7 lacks "one line on engagement models".
  - The hero's secondary CTA points to `#capabilities`, not `/services` (07 §3.3).
  - The compliance card has two chips where 07 asks for three.
- **Fix:** add these, or record why they were dropped.

**R-22 — Four versions of the boundary statement** · Minor
- **Where:** 07 §8 ("standard"); 04 §8.4 menu text; `compliance-hipaa.html:50` ("We do not certify, audit or give legal advice…"); `platform-azure.html:91` (drops "We work alongside them").
- **Fix:** keep one default text in `frameworks.ts`, with an optional per-framework second sentence, as 09 §3 already implies.

**R-23 — Provider and regulation facts to verify** · Minor
- **Correct as written:**
  - Azure Canada Central and Canada East.
  - Microsoft's BAA is offered through its product terms / DPA for in-scope services.
  - AWS's BAA is accepted in AWS Artifact for HIPAA-eligible services.
  - Google Cloud offers a BAA for listed services.
  - "There is no official HIPAA certification."
  - The tooling-table service names.
  - The HIPAA, PCI DSS and GDPR references in concept 4.
- **Needs tightening or checking:**
  - `platform-azure.html:88`, "Azure's attestation covers the platform": it covers *in-scope services*. Say so.
  - `compliance-hipaa.html:86` maps "immutable backups … tested restores" to §164.312(c) Integrity. Backups and restore testing sit under the contingency-plan standard (§164.308(a)(7)), an administrative safeguard. Keep integrity to versioning, change control and integrity checks.
  - HHS proposed substantial Security Rule changes in January 2025 (for example, removing the "addressable" distinction and requiring encryption and MFA). Confirm their status before launch and date-stamp the page.
  - Cloud product names change often. Re-check them at copy freeze: for example, AWS Security Hub (renamed in 2025), Microsoft Sentinel's move to the Defender portal, and "Microsoft Entra ID". This review did not verify current naming.

**R-24 — Responsive loss in the Services menu at 1024–1279** · Minor
- **Where:** `proto.css:319` `.mm-foot .mm-feature { display: none; }`.
- **Evidence:** the "How we work" featured slot, the only link to Our Approach in that panel (04 §8.2), disappears at laptop widths.
- **Fix:** move it into the empty sixth grid cell of the 3+2 layout instead of hiding it.

### Polish

- **R-25 Spelling.** The US spelling rule (07 §2) is broken in `ui.js:9, 17` "data centres", `ui.js:11` "Identity-centred", `ui.js:20` "Organised", and `concept-3d.html:76, 82–83` "centre", "Defence in depth". 08 §10 also uses "Defence". Several of these come from 04 §8 itself, so fix them at the source.
- **R-26 Token drift.** The 10px radius on `.btn` and `.icon` is not in the 8/14/24 radius scale (08 §5). Either add it or use 8px.
- **R-27 Document consistency.** 07 §3.2 says the WIP crystal "can stay"; 08 §10.1 replaces it. Amend 07. Docs 04 and 07 still read "Status: awaiting review" although they are treated as approved.
- **R-28 Reveal motion.** `.rv` sets `opacity: 0` on almost every card below the fold. During review, screenshots taken mid-scroll showed empty sections. Add `@media print { .rv { opacity: 1; transform: none } }`. Consider revealing section heads only, not every card.
- **R-29 Target size.** Footer links measure 20px high at 375px, against 08 §9's 44px rule for touch. Add `padding-block: 12px` on mobile.
- **R-30 Defence-in-depth concept.** It says "Selecting a layer lists the controls", but it is not interactive in the prototype. Either prototype the selection or remove the sentence.

---

## 5. What is good and should be kept

- The compliance language: the boundary statement, the "What we do not do" list, "There is no official HIPAA certification", the BAA FAQ held behind V-22, and placeholders instead of invented proof. This is the strongest part of the work.
- Light-first tokens with verified contrast. One accent; cyan reserved for diagrams.
- The menu content and grouping from 04, server-rendered menus (09), and the URL/anchor discipline, with the planned build-time link checker (09 §10).
- Gating as data (09 §5): one flag drives routes, menus, footer and sitemap.
- The 3D scoping: one WebGL scene, with meaning (layers plus security on every layer), and a text caption list that carries the meaning without it. The existing `HeroCanvas` wrapper is correctly reused.
- The homepage section order, which matches 07 §4 exactly. The lifecycle content, stage by stage, is specific and credible.
- Native `<details>` FAQs, a skip link, landmarks, a visible focus ring, and reduced-motion handling in both CSS and the three.js scene.

---

## 6. Prioritised change list for Stage 6

### Must fix before implementation
1. Approve D-01. Amend 04 §8.1, §8.8 and §9 and 07 §7. Plan the `layout.tsx` theme-init removal and the `localStorage` cleanup (R-17).
2. Get V-01 to V-04 answered. Prototype the verified-only homepage, menus and footer, with 1-, 2- and 3-item layouts. Add proof near the hero that needs no permission (R-04).
3. Correct `ui.js` before it becomes the port reference: put each panel right after its trigger and fix the hover-then-click conflict (R-01, R-02). Fix the lifecycle tabs pattern (R-03).
4. Give the capability, platform and framework templates distinct heroes, and put concepts 2 and 4 on their pages (R-05). Prototype Contact (with form states), one pillar page and the Compliance hub (R-18).
5. Register or remove the unverified claims. Fix the HIPAA applicability sentence (R-07, R-13).
6. Measure the real three.js plus React Three Fiber chunk. Decide between React Three Fiber, plain three.js, or CSS only (R-08).
7. Client decision on homepage logo placement and on Atmosera, Deloitte and Nigel Frank (R-20).

### Fix during implementation
- Visual distinctiveness changes (R-06).
- Drawer content (R-09); drawer `inert` (R-12).
- Tablet and phone layouts (R-10, R-11).
- Dark-surface outline button contrast and the 08 wording (R-14).
- Once UI cascade layering (R-15).
- Effort plan (R-16).
- Heading, breadcrumb and footer-link fixes (R-19).
- Missing homepage links (R-21).
- One boundary text (R-22).
- Provider and regulation fact check at copy freeze (R-23).
- Services menu at laptop widths (R-24).

### Later
- R-25 to R-30 polish.
- The optional dark theme.
- The interactive defence-in-depth diagram.
- Scroll-linked GSAP for the pipeline.

---

## 7. Open questions for the client

1. **Theme:** do you approve light-only for release 1, with the dark toggle removed (D-01)?
2. **V-01 to V-04:** which partner statuses do you hold? Which clouds and frameworks have you actually delivered on? Will you sell fixed-scope assessments? Without these answers, the homepage and menus cannot be finalised.
3. **Clients:** for each of Innovapost, Atmosera, Deloitte and Nigel Frank International, what was the relationship (direct client, subcontract, recruitment), and do you have written logo permission? Do you want Atmosera and Deloitte on the homepage, or on About only?
4. **Delivery practices:** can you confirm the practices the copy states as fact: least-privilege, time-bound access in client tenants; all work delivered as code in the client's repositories; client ownership of the deliverables (IP terms); scope, deliverables and exclusions stated before work starts; and that the team that builds a platform also operates it?
5. **Tools:** which third-party tools does the team use and support (Terraform, GitHub Actions, Argo CD and so on)?
6. **Scope:** do you accept that Solutions and Industries are left out of release 1 (A-04, A-05)? The original brief asked for both.
7. **Legal review:** who is the qualified reviewer for the four framework pages, and when are they available? Each page needs that review before launch (07 §6.6).
8. **Assets:** do you want a richer hero visual (larger, more art-directed), which may mean commissioning illustration? Or is the restrained technical style the intended brand?
