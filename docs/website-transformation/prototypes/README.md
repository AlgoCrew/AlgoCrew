# Stage 3–4: Design prototypes

Stage 3 deliverable. Status: **awaiting review**.

Static HTML/CSS design references for the approved Stage 2 strategy ([04](../04-proposed-sitemap.md), [07](../07-content-strategy.md)). They are not production code and nothing in `src/` was changed.

## View

From the repo root: `python3 -m http.server 4173 --directory docs/website-transformation/prototypes`, then open http://localhost:4173. (Opening the files directly also works.)

## Pages

| File | Template (07 §6) | What it demonstrates |
|---|---|---|
| `index.html` | Home | All 10 homepage sections in the approved order; layered-infrastructure hero visual; interactive DevSecOps lifecycle |
| `service-devsecops.html` | Capability (§6.3) | Jump links, method rows, per-cloud tooling table, deliverables, engagement shape, risks, FAQ |
| `platform-azure.html` | Platform (§6.4) | Seven capability sections with native tooling and anchors from 04 §5; frameworks on the platform |
| `compliance-hipaa.html` | Framework (§6.6) | Boundary statement in the hero; shared responsibility; dark control-map section; "what we do not do" |
| `pillar-cloud-security.html` | Pillar (§6.2) | Problems list in the hero, capability ledger with anchors, defense-in-depth diagram as the dark section |
| `compliance.html` | Compliance hub (§6.5) | Framework chips and boundary statement in the hero, control-mapping diagram, governance ledger, do / do not lists |
| `contact.html` | Contact (§6.12) | The form, what happens next, and a design reference for the error and success states |
| `concept-3d.html` | — (Stage 4) | Four visual concepts: live three.js layered platform, pipeline with gates, defence in depth, control mapping |
| `proto.css` | — | Draft light-first tokens (colour, type, spacing, radius), shared components |
| `ui.js` | — (Stage 4) | Mega menus, mobile drawer, scroll reveal. Builds the header in JS only so static pages can share it; production renders it on the server |

## Design decisions made here

- **Light-first.** White and off-white surfaces, one blue accent (`#1d4ed8`, the existing brand blue darkened to pass contrast on white), hairline borders, almost no shadow. Dark is used for exactly one technical section per page (lifecycle, control map) and the closing call to action.
- **Type.** Geist for everything (already the site font), large tight display headings, Geist Mono for technical metadata: eyebrows, step numbers, tool names, regulation references.
- **Each template has its own identity** on a shared system: home leads with the visual, capability with an "at a glance" card, platform with a three-column capability ledger, framework with the role boundary.
- **Hero visual** is a CSS 3D stand-in: three infrastructure layers with a security ring on each. The real 3D concept is Stage 4.
- **Placeholders are visible.** Dashed boxes mark everything that depends on the verification register (07 §11): client logos, partner badges, certifications, named contacts, contact details. Client names are text wordmarks, not logos.
- **No invented proof.** No statistics, testimonials, case studies or badges.

## Stage 4 additions

Mega menus for all four menu groups, the mobile accordion drawer, scroll-reveal motion and the 3D concepts page. The written design system is [08](../08-ui-ux-design-direction.md); the component plan is [09](../09-component-architecture.md). Still not prototyped: forms, the dark theme (recommended out of scope), and the templates wireframed in 08 §12.

## Fixes after the Stage 5 review

Menu panels now sit directly after their trigger in the DOM, so Tab goes from a trigger into its panel. A click that follows a hover-open keeps the menu open. Focus leaving a trigger's list item closes its panel. The lifecycle is a complete tabs pattern (tab panel role and label, readable tab names, Home and End keys). Eight unverified claims in the copy were removed or turned into placeholders, and the HIPAA applicability sentence was corrected. The inner-page heroes are now distinct, the Contact, pillar and Compliance-hub pages are prototyped, and the partial-launch layouts exist (see Launch states).

## Launch states

A switch in the top bar of every page sets which gated items are treated as verified (07 §11, V-01 and V-03): nothing, one platform and one framework, two of each, or all. It filters the hero copy, homepage sections, menus, footer, per-cloud tables, tool lists and diagrams. The default is nothing verified, which is the state the site is designed to launch in if no answers arrive. With nothing verified, the Cloud Platforms menu becomes a plain link, the homepage platforms section is removed, and the frameworks section is replaced by a governance section.

Client logos are no longer on the homepage (About only, once permission is confirmed). A scope, method and role strip sits under the hero instead.

## Checked

After the design-gate changes, all eight pages were loaded in all four launch states at 1440 and 375 px (64 combinations) with no script errors and no horizontal overflow. Earlier checks: rendered at 1440, 1100 and 375 px: no console errors and no horizontal overflow on any of the five pages. All four mega menus open and close (click, Esc), only one opens at a time, the Services menu wraps to three columns at 1100 px, the drawer locks scroll and returns focus on Esc, the lifecycle selection works, and the three.js scene renders. Not checked: other browsers, tablet widths, screen readers, hover-intent timing with a real pointer, frame rate of the 3D scene. Known issue: the outline button border fails 3:1 contrast (fix specified in 08 §3.1).

## Copy caveats

Copy is working draft. Provider-agreement statements on the HIPAA and Azure pages (BAA routes, regions) must be checked against current provider terms, and framework pages need review by a qualified person before any launch.
