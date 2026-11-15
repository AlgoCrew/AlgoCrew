# 17. Design refresh (after launch)

**Date:** 2026-11-15
**Request (owner):** "check the design for all the pages now, improve design, add section from the references, if needed, now look rigid."
**Status:** homepage done and accepted; rolled out to the other site-v2 pages the same day.

## Why

The built site matches the approved prototypes, and seen live it reads as rigid. The cause is repetition, not any one section: every section is "label, heading, a row of identical white text cards", on alternating white and grey bands with the same spacing. Below the hero there is one visual (the dark lifecycle band) in about 7,000 px of scrolling.

This supersedes the earlier instruction to match the prototypes exactly. The prototypes stay the reference for identity (type, colour, tone, heading sizes, header, hero), not for every section layout.

## Goals

- Each section has its own layout, so the page has rhythm.
- More to look at: icons, small diagrams, tinted and gradient panels, hover movement.
- Sections seen on the reference sites that we can fill honestly.

## Not changing

- Identity: Geist, the blue and ink palette, mono labels, the hero and its 3D scene, header, footer.
- Every content rule from the brief: no statistics, client logos, testimonials, case studies, partner badges, or named clouds and frameworks until verified. This is why some reference-site sections (stat bands, logo walls, a three-cloud band, an industries or frameworks grid) are **not** added.
- Tokens only, WCAG 2.2 AA, reduced motion respected, no new dependencies.

## Approaches considered

1. **Restyle only** (new colours and shadows on the same card rows). Cheap, and does not fix the repetition. Rejected.
2. **New layout per section plus honest new sections** (chosen). Fixes the cause and stays inside the content rules.
3. **Full redesign with new identity.** Throws away approved work and the prototypes' look, which the owner likes. Rejected.

## Homepage design

| Section | Before | After |
|---|---|---|
| Hero, scope strip | — | Unchanged |
| Capabilities | Five equal cards | Mixed grid: one tall featured card with a small diagram, four smaller cards; larger icon tiles, index numbers, corner glow on hover |
| Lifecycle (dark) | — | Unchanged |
| Compliance | Three cards | Split: links as rows on the left; on the right a "requirement → control → check → evidence" flow |
| Method | Five boxed cells | Connected timeline with numbered nodes (now the shared `Steps` block) |
| Outputs | Four text cards | Inset tinted panel; each output has a small drawn preview of the artifact |
| Engagement models | (only on Our Approach) | **New on home:** two panels, copy shared with Our Approach |
| Insights | Three equal cards | One featured post and two compact rows |
| FAQ | (only on Our Approach) | **New on home:** the four engagement questions, copy shared with Our Approach |
| Closing CTA | — | Unchanged |

## Rollout to the other pages

The inner pages are built from four shared blocks, so the rollout changed the blocks, not each page.

| Shared block | Before | After | Pages that use it |
|---|---|---|---|
| `Steps` | Boxed cells with a dark footer bar | Connected timeline; vertical below 1024 px | Home, Our Approach, service pages |
| `Ledger` rows | Lines between rows; tools as a plain list | One card per row with an accent bar on hover; tools as chips; rows with no tools use the full width | Services, pillar and service pages, Compliance, Cloud Platforms, Our Approach |
| `Checklist` | Bare ticks | A row per item with a round tick badge | Pillar and service pages, Compliance, Our Approach, Careers |
| `Card` | 14 px corners, flat hover | 24 px corners, corner glow and lift on hover, larger gradient icon tile | Everywhere cards appear |
| `Inset` (new) | — | Tinted rounded panel inside a section | "What you get" on Home, pillar pages, service pages, Compliance |

Page-specific changes: About uses the homepage's mixed practices grid; Our Approach uses the two engagement panels; the "Who it's for" cards on service pages are numbered.

**Not restyled:** Insights (`/blog`), posts, Privacy and Terms. They are still built on the old UI library and are scheduled for the cleanup release (16, O3 and O4). Contact is unchanged: it is one form and one side panel.

## Left to the builder

Exact spacing and drawing details. Engagement and FAQ copy moves to one shared file so the two pages cannot drift.
