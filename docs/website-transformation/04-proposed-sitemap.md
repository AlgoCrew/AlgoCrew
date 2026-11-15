Stage 2 deliverable. Status: awaiting review.

# 04 — Proposed Sitemap and Navigation Architecture

Inputs: [01 audit](01-existing-website-audit.md), [03 current sitemap](03-current-sitemap.md), [02 competitor synthesis](02-competitor-research.md). Companion documents: [05 route migration](05-route-migration.md), [06 service architecture](06-service-architecture.md), [07 content strategy](07-content-strategy.md). Route names, page names and anchor IDs in this file are the reference for all four.

Nothing here is implemented. No route, redirect or file outside `docs/website-transformation/` is to be changed until this plan is approved.

---

## 1. Summary of decisions

| # | Decision | Client proposal | Why |
|---|---|---|---|
| 1 | Five header items + one CTA: **Services, Cloud Platforms, Compliance, Insights, Company** + "Discuss Your Cloud Strategy" | Same groups, plus Solutions and Industries | Solutions and Industries are dropped from release 1 (decisions 4, 5). Every reference site keeps the top bar to 4–7 items (02, finding 4). |
| 2 | Five pillar pages plus two standalone capability pages in release 1 (Cloud Migration & Modernization, DevSecOps) | 8 service pages | `cloud-engineering` folded into Cloud Consulting & Engineering. Strategy and engineering pages from a firm our size would say the same things and compete for the same searches. `cloud-governance-compliance` folded into `/compliance` so governance has one page, not two. |
| 3 | Compliance hub is the Compliance & Governance pillar page: `/compliance`, with frameworks at `/compliance/{framework}` | `/security-compliance/{framework}` plus `/services/cloud-governance-compliance` | The client's version gives two hubs for one topic. Cloud security is already a service pillar, so "security" in the compliance URL repeats it. `/compliance/hipaa` is shorter and matches what people search for. |
| 4 | **No `/solutions` in release 1.** Packaged offers may launch later as `/assessments`, and only if the business sells fixed-scope offers (V-04 in 07) | 6 solution pages | All six candidates map one-to-one onto a service page (table in §6). Services and Solutions menus that overlap are a known failure (Managed Solution, 02a). |
| 5 | **No `/industries` in release 1.** HIPAA and PCI DSS pages cover healthcare and payments buyers. Industry pages come later only if real sector experience is confirmed (V-03) | Industries "where relevant" | Delivery experience is unverified, and today's industry pages are software-build pages with broken images. |
| 6 | "Our Clients" is a section on About (`/about#clients`), not a page | Standalone page | A page with four logos and no descriptions is thin and invites inferred endorsement. Revisit when there are more clients with permission. |
| 7 | New `/trust` page (Trust & Security: how we protect client environments and data) | Not proposed | It is the strongest proof we can offer that does not depend on case studies (02, finding 6). It only describes practices that have been verified. |
| 8 | Keep the `/blog` URL and label it **Insights** | `/insights` | Renaming would add 16 redirects and gain nothing in search. The label is what users see. |
| 9 | Retire `/pricing`, `/hire`, `/faq`, `/locations/*`. Remove `/work/*` from public view (Hide) | — | Detail in §7 and in 05. |
| 10 | Platform pages are three pages with seven sections each, not 21 pages | — | §5. |

---

## 2. Final route tree

R1 = release 1. L = later release. **Gated** = launches only when the named verification item in 07 §11 is confirmed; until then the page is left out of the build, the navigation and the sitemap.

```
/                                         Home                                   R1
├── services                              Services overview                      R1
│   ├── cloud-consulting                  Cloud Consulting & Engineering         R1  (pillar 1)
│   ├── cloud-migration                   Cloud Migration & Modernization        R1  (capability, pillar 1)
│   ├── devops                            DevOps & DevSecOps                     R1  (pillar 2)
│   ├── devsecops                         DevSecOps                              R1  (capability, pillar 2)
│   ├── cloud-security                    Cloud Security & Cybersecurity         R1  (pillar 3)
│   ├── managed-cloud-services            Managed Cloud Services                 R1  (pillar 5; scope gated on V-12)
│   ├── kubernetes                        Kubernetes & Containers                L
│   ├── platform-engineering              Platform Engineering                   L
│   └── cloud-cost-optimization           Cloud Cost Optimization                L
├── cloud-platforms                       Cloud Platforms overview               R1
│   ├── azure                             Microsoft Azure                        R1  gated V-01, V-03
│   ├── aws                               Amazon Web Services (AWS)              R1  gated V-01, V-03
│   └── google-cloud                      Google Cloud                           R1  gated V-01, V-03
├── compliance                            Compliance & Governance                R1  (pillar 4 + framework hub)
│   ├── hipaa                             HIPAA                                  R1  gated V-03
│   ├── gdpr                              GDPR                                   R1  gated V-03
│   ├── pci-dss                           PCI DSS                                R1  gated V-03
│   └── pipeda                            PIPEDA                                 R1  gated V-03
├── assessments                           Assessments overview                   L   gated V-04
│   ├── cloud-readiness                   Cloud Readiness Assessment             L   gated V-04
│   ├── security-posture                  Cloud Security Posture Assessment      L   gated V-04
│   ├── compliance-readiness              Compliance Readiness Review            L   gated V-04
│   └── devops-maturity                   DevOps Maturity Assessment             L   gated V-04
├── industries/healthcare                 Healthcare                             L   gated V-03
├── industries/financial-services         Financial Services                     L   gated V-03
├── about                                 About (incl. #clients)                 R1
├── our-approach                          Our Approach                           R1
├── trust                                 Trust & Security                       R1  gated V-14
├── careers                               Careers                                R1  (footer only)
├── contact                               Contact                                R1
├── blog                                  Insights                               R1
│   ├── [16 retained posts]               Insights article                       R1
│   ├── [6 hidden posts, noindex]         —                                      resolves, not linked
│   └── category/{4 slugs}                Insights category                      L
├── clients                               Our Clients                            L   gated V-02
├── privacy-policy                        Privacy Policy                         R1
├── terms                                 Terms of Service                       R1
└── (404)                                 Not found                              R1
```

Industries sit at `/industries/{slug}` with no hub page until there are at least three of them.

**Route counts**

| | Release 1 | Later |
|---|---|---|
| Core pages (excluding posts and 404) | **25** (8 retained URLs + 17 new) | **15** (3 services, 5 assessments, 2 industries, 4 blog categories, 1 clients) |
| Insights articles, indexable | 16 | new articles per 07 §9 |
| Hidden posts (noindex, resolve) | 6 | — |
| Indexable URLs in sitemap | **41** (25 + 16) | |

If any gated page is not ready, release 1 still works: the overview page lists only the pages that exist, and redirects aimed at a gated page use the fallback target given in 05.

---

## 3. Page inventory

Template types (outlines in 07 §6): **Home**, **Hub** (overview listing child pages), **Pillar** (service pillar), **Capability** (single service), **Platform**, **Compliance hub**, **Framework**, **Offer** (fixed-scope assessment), **Industry**, **Company**, **Approach**, **Trust**, **Contact**, **Listing**, **Article**, **Legal**, **Utility**.

| Route | Page name | Template | Primary search intent / keyword theme | Purpose (one line) | Release |
|---|---|---|---|---|---|
| `/` | Home | Home | brand; "cloud security consulting", "DevSecOps consulting company" | Say who we are, for whom, on which clouds, and route each buyer to a pillar | R1 |
| `/services` | Services | Hub | "cloud consulting services", "cloud and DevOps services" | List the five pillars and their capabilities on one page | R1 |
| `/services/cloud-consulting` | Cloud Consulting & Engineering | Pillar | "cloud consulting", "cloud architecture services", "multi-cloud consulting" | Strategy, architecture and engineering of cloud platforms | R1 |
| `/services/cloud-migration` | Cloud Migration & Modernization | Capability | "cloud migration services", "application modernization" | Planned migration and modernization of workloads | R1 |
| `/services/devops` | DevOps & DevSecOps | Pillar | "DevOps consulting", "CI/CD pipeline services", "infrastructure as code" | Delivery pipelines, IaC, platforms, observability | R1 |
| `/services/devsecops` | DevSecOps | Capability | "DevSecOps services", "DevSecOps implementation", "software supply chain security" | Security controls built into each stage of delivery | R1 |
| `/services/cloud-security` | Cloud Security & Cybersecurity | Pillar | "cloud security services", "cloud security consulting", "zero trust" | Securing cloud estates: architecture, identity, detection, vulnerabilities | R1 |
| `/services/managed-cloud-services` | Managed Cloud Services | Pillar | "managed cloud services", "managed Azure/AWS services" | Ongoing operation, security management and cost control | R1 |
| `/services/kubernetes` | Kubernetes & Containers | Capability | "Kubernetes consulting", "AKS/EKS/GKE" | Container platform design and hardening | L |
| `/services/platform-engineering` | Platform Engineering | Capability | "platform engineering services", "internal developer platform" | Self-service golden paths for engineering teams | L |
| `/services/cloud-cost-optimization` | Cloud Cost Optimization | Capability | "cloud cost optimization", "FinOps consulting" | Reduce and govern cloud spend | L |
| `/cloud-platforms` | Cloud Platforms | Hub | "Azure vs AWS vs Google Cloud consulting", "multi-cloud partner" | How we work across the three clouds; route to each one | R1 |
| `/cloud-platforms/azure` | Microsoft Azure | Platform | "Azure consulting", "Azure migration", "Azure security" | All our capabilities, as delivered on Azure | R1 gated |
| `/cloud-platforms/aws` | Amazon Web Services (AWS) | Platform | "AWS consulting", "AWS migration", "AWS security" | All our capabilities, as delivered on AWS | R1 gated |
| `/cloud-platforms/google-cloud` | Google Cloud | Platform | "Google Cloud consulting", "GCP migration", "GCP security" | All our capabilities, as delivered on Google Cloud | R1 gated |
| `/compliance` | Compliance & Governance | Compliance hub | "cloud compliance services", "cloud governance", "audit readiness" | Governance, controls and audit readiness, and the four frameworks | R1 |
| `/compliance/hipaa` | HIPAA | Framework | "HIPAA compliant cloud", "HIPAA cloud security" | Technical safeguards and evidence for HIPAA workloads | R1 gated |
| `/compliance/gdpr` | GDPR | Framework | "GDPR cloud compliance", "GDPR technical measures" | Technical and organisational measures for GDPR in the cloud | R1 gated |
| `/compliance/pci-dss` | PCI DSS | Framework | "PCI DSS cloud", "PCI DSS 4.0 compliance cloud" | Cardholder-data environment controls and assessment readiness | R1 gated |
| `/compliance/pipeda` | PIPEDA | Framework | "PIPEDA compliance cloud", "Canadian data privacy cloud" | Safeguards and data-residency choices for Canadian personal information | R1 gated |
| `/assessments` | Assessments | Hub | "cloud assessment services" | Fixed-scope entry engagements | L gated |
| `/assessments/cloud-readiness` | Cloud Readiness Assessment | Offer | "cloud readiness assessment" | Scoped migration and landing-zone readiness review | L gated |
| `/assessments/security-posture` | Cloud Security Posture Assessment | Offer | "cloud security assessment" | Scoped review of cloud security posture | L gated |
| `/assessments/compliance-readiness` | Compliance Readiness Review | Offer | "HIPAA/PCI readiness assessment" | Gap analysis against one framework | L gated |
| `/assessments/devops-maturity` | DevOps Maturity Assessment | Offer | "DevOps assessment" | Pipeline and delivery maturity review | L gated |
| `/industries/healthcare` | Healthcare | Industry | "healthcare cloud security" | Sector view across HIPAA, PIPEDA and the pillars | L gated |
| `/industries/financial-services` | Financial Services | Industry | "fintech cloud compliance" | Sector view across PCI DSS and the pillars | L gated |
| `/about` | About | Company | brand; "AlgoCrew" | Who we are, where we are, how we are set up; client logos | R1 |
| `/our-approach` | Our Approach | Approach | "cloud engagement model", brand | The method, engagement models and engagement FAQ | R1 |
| `/trust` | Trust & Security | Trust | brand + "security practices" | Our own security practices when we work in client environments | R1 gated |
| `/careers` | Careers | Company | "cloud engineer jobs Brampton", brand | Hiring for cloud, DevOps and security roles | R1 |
| `/contact` | Contact | Contact | brand; "contact" | One form, booking link and direct contact details | R1 |
| `/blog` | Insights | Listing | "cloud security articles" | Articles in four categories | R1 |
| `/blog/{slug}` | (post title) | Article | per post | Technical article that links to the relevant pillar | R1 |
| `/blog/category/{slug}` | Insights: {category} | Listing | category topic | Indexable category listing once a category has 5 or more posts | L |
| `/clients` | Our Clients | Company | brand | Fuller client page, only once permissions and more clients exist | L gated |
| `/privacy-policy` | Privacy Policy | Legal | — | Accurate processors, cookies and rights | R1 |
| `/terms` | Terms of Service | Legal | — | Verified entity and governing law | R1 |
| 404 | Not found | Utility | — | Recovery links to the pillars and contact | R1 |

Insights categories (slugs): `cloud-engineering`, `devops-devsecops`, `cloud-security`, `compliance-governance`. The post triage is in 07 §9.

---

## 4. Page vs section rules

A capability gets **its own page** only if all four hold:
1. It has a distinct search intent that a pillar page cannot answer without diluting it.
2. It has at least roughly 800 words of non-overlapping content: its own method, deliverables and FAQ.
3. Delivery experience is confirmed (V-03).
4. It does not compete for the same keyword as a page that already exists.

Otherwise it is a **section** of its pillar page with a stable anchor ID. Sections that matter in the menu get a **menu anchor** (a mega-menu link to `/pillar#anchor`). Minor items are bullets inside a section.

Applying the rule in release 1 gives two capability pages:
- **Cloud Migration & Modernization**: the strongest standalone commercial intent in pillar 1, with its own method (discover, plan waves, migrate, modernize).
- **DevSecOps**: the differentiator nobody else covers (02, finding 3). It needs its own lifecycle content and should not be buried in DevOps.

Kubernetes, Platform Engineering and Cloud Cost Optimization pass tests 1 and 4 but are deferred until content and experience are confirmed. Until then they are sections. The full classification of capabilities is in [06](06-service-architecture.md).

**Cannibalisation guards**
- `/services/devops` targets DevOps, CI/CD and IaC terms and names DevSecOps only in one summary section that links to `/services/devsecops`. The DevSecOps page owns "DevSecOps" terms.
- `/services/cloud-consulting` summarises migration in one section that links to `/services/cloud-migration` and does not target "migration".
- Platform pages target "{platform} + capability" terms. Pillar pages target capability terms without a platform name.
- `/compliance` targets governance and audit-readiness terms. Framework pages target "{framework} + cloud".

---

## 5. Platform pages: three pages, not 21

Seven capabilities across three platforms would make 21 near-identical pages: the same method and deliverables with the cloud name swapped. That is a thin-content and cannibalisation risk, and a small firm cannot maintain it.

Each platform page instead has the same seven sections, each with an anchor, and each section links to the pillar page that owns the capability:

| Section | Anchor | Links to |
|---|---|---|
| Consulting & strategy | `#consulting` | `/services/cloud-consulting#strategy` |
| Architecture & landing zones | `#architecture` | `/services/cloud-consulting#architecture` |
| Migration & modernization | `#migration` | `/services/cloud-migration` |
| DevOps & DevSecOps | `#devops` | `/services/devops`, `/services/devsecops` |
| Security | `#security` | `/services/cloud-security` |
| Infrastructure management | `#operations` | `/services/managed-cloud-services` |
| Governance & compliance | `#governance-compliance` | `/compliance` and the framework pages |

What makes each platform page unique is platform-specific detail: the native tools we use (06 §3), the landing-zone pattern, partner status (only if held, V-01), and how that cloud handles each framework (for example where Business Associate Agreements are signed, and which Canadian regions exist for PIPEDA work). If a platform-specific page is ever justified (for example "Azure migration" with real volume and experience), it is added as `/cloud-platforms/azure/migration` in a later release, one at a time, never as a 7×3 batch.

---

## 6. Solutions: decision

**Recommendation: no Solutions section in release 1.** Alternative: launch two of them as campaign landing pages kept out of the nav (rejected, because they would still compete with service pages in search).

| Candidate | Where its content goes instead |
|---|---|
| Secure Cloud Transformation | `/services/cloud-migration` (security built into migration) plus the homepage story |
| Enterprise DevSecOps | `/services/devsecops` |
| Cloud Infrastructure Modernization | `/services/cloud-migration#modernization` |
| Cloud Security and Governance | `/services/cloud-security` + `/compliance#cloud-governance` |
| Automated Compliance Readiness | `/compliance#policy-controls` (policy as code, continuous evidence) |
| Multi-Cloud Management | `/services/managed-cloud-services` + `/services/cloud-consulting#hybrid-multi-cloud` |

Each would repeat a service page under a different label. What buyers can actually use as a "solution" is a fixed-scope, priced entry engagement. If the business sells such offers (V-04), they launch as `/assessments/*` in release 2, written like a statement of work: scope, duration range, inputs needed, deliverables, exclusions. That gives a third axis (what you can buy first) that does not overlap services or platforms. If the answer is no, the same content lives as "How engagements start" on `/our-approach`.

---

## 7. Fate of existing pages (summary; full table in 05)

| Existing | Decision | Target |
|---|---|---|
| `/pricing` | Retire. Build-team prices do not apply to cloud engagements, and three different price sets exist (01 §14) | 301 → `/our-approach#engagement-models` |
| `/hire` | Merge into the single contact form | 301 → `/contact` |
| `/services/team-services` (staffing) | Stop selling staffing as a service. If the business keeps embedded engineers, describe it as one engagement model (decision A-06) | 301 → `/our-approach#engagement-models` |
| `/careers` | Keep; footer only; roles limited to cloud, DevOps and security; JobPosting schema only for real openings | — |
| `/faq` | Merge: engagement questions move to `/our-approach#faq`; service questions go into each page's own FAQ | 301 → `/our-approach#faq` |
| `/locations` + 5 pages | Retire as geo pages. Canada and Toronto facts move to About; US, UK and AU pages are gone | 301 / 410 (05) |
| `/blog` | Keep URL, label Insights, 16 posts kept, 6 hidden, 10 gone | 05, 07 §9 |
| `/work` + 9 | Hide: not public, not linked, not in the sitemap | `/work` 301 → `/about`; detail pages 410 |
| `/privacy-policy`, `/terms` | Keep and correct (entity, processors, cookies, governing law) | — |

---

## 8. Header navigation

### 8.1 Top bar (desktop ≥ 1024 px)

`[Logo] Services ▾ · Cloud Platforms ▾ · Compliance ▾ · Insights · Company ▾ [Discuss Your Cloud Strategy]`

- Five items plus one CTA button. The site is light only in release 1; there is no theme toggle. *(Amended after Stage 5: the client chose light only for release 1, decision D-01. The dark default and the theme toggle are removed.)*
- Items with ▾ open a panel on click and on keyboard Enter/Space. Hover opens after a 150 ms intent delay and also works with the keyboard. Esc closes the panel. Only one panel is open at a time. Every top-level label is also a link to its hub page (Services → `/services`, Cloud Platforms → `/cloud-platforms`, Compliance → `/compliance`, Company → `/about`) through a "View all" link inside the panel. The label itself toggles the panel, so touch users are not navigated away by accident.
- Menus must render in the server HTML (02: client-only menus are a pattern to avoid).
- Rule: a URL may appear in at most two header panels (its home panel plus one cross-reference).

### 8.2 Services mega menu

Five columns, one per pillar. The column heading links to the pillar page. Each link has a one-line descriptor underneath.

| Column (heading → URL) | Link | URL | Descriptor |
|---|---|---|---|
| **Cloud Consulting & Engineering** → `/services/cloud-consulting` | Strategy & Architecture | `/services/cloud-consulting#architecture` | Target architecture, landing zones and roadmaps |
| | Migration & Modernization | `/services/cloud-migration` | Move and modernize workloads in planned waves |
| | Hybrid & Multi-Cloud | `/services/cloud-consulting#hybrid-multi-cloud` | Consistent design across clouds and data centres |
| | Cloud-Native Engineering | `/services/cloud-consulting#cloud-native` | Containers, serverless and managed services, built right |
| **DevOps & DevSecOps** → `/services/devops` | DevSecOps | `/services/devsecops` | Security checks at every stage of delivery |
| | CI/CD Pipelines | `/services/devops#ci-cd` | Repeatable build, test and release pipelines |
| | Infrastructure as Code | `/services/devops#infrastructure-as-code` | Versioned, reviewed, reproducible infrastructure |
| | Kubernetes & Platform Engineering | `/services/devops#platform-engineering` | Container platforms and self-service paths for developers |
| | Monitoring & Observability | `/services/devops#observability` | Metrics, logs and traces that lead to action |
| **Cloud Security** → `/services/cloud-security` | Security Architecture & Zero Trust | `/services/cloud-security#zero-trust` | Identity-centred, segmented, least-privilege design |
| | Identity & Access Management | `/services/cloud-security#iam` | Roles, federation and privileged access |
| | Threat Detection & Monitoring | `/services/cloud-security#threat-detection` | Native detection tooling, tuned and routed |
| | Vulnerability Management | `/services/cloud-security#vulnerability-management` | Find, rank and fix weaknesses continuously |
| | Security Assessments | `/services/cloud-security#assessments` | A clear view of your current cloud security posture |
| **Compliance & Governance** → `/compliance` | Cloud Governance | `/compliance#cloud-governance` | Guardrails, policies and account structure |
| | Audit Readiness | `/compliance#audit-readiness` | Evidence your auditor can actually use |
| | Frameworks (inline row) | `/compliance/hipaa` · `/compliance/gdpr` · `/compliance/pci-dss` · `/compliance/pipeda` | HIPAA · GDPR · PCI DSS · PIPEDA (no descriptor; cross-reference) |
| **Managed Cloud Services** → `/services/managed-cloud-services` | Managed Azure, AWS & Google Cloud | `/services/managed-cloud-services#managed-platforms` | Day-two operations on your cloud |
| | Monitoring & Incident Management | `/services/managed-cloud-services#incident-management` | Alerting, response and post-incident review |
| | Cost Optimization | `/services/managed-cloud-services#cost-optimization` | Right-sizing, commitments and spend guardrails |
| | Backup & Disaster Recovery | `/services/managed-cloud-services#backup-dr` | Tested recovery, not just scheduled backups |

- **Featured slot** (right edge or bottom band): "How we work: Assess → Architect → Implement → Manage → Optimize, with security at every step." Links to `/our-approach`. If V-04 is answered yes, this slot is replaced by "Start with an assessment" → `/assessments`.
- **Panel footer:** "Explore Our Capabilities" → `/services` (secondary), plus the platform line "Delivered on Azure · AWS · Google Cloud" with each name linking to its platform page (only pages that exist).
- 1024–1279 px: columns wrap to 3 + 2. Descriptors stay.

### 8.3 Cloud Platforms menu

| Link | URL | Descriptor |
|---|---|---|
| Microsoft Azure | `/cloud-platforms/azure` | Landing zones, migration, DevSecOps and security on Azure |
| Amazon Web Services | `/cloud-platforms/aws` | Multi-account foundations, migration and security on AWS |
| Google Cloud | `/cloud-platforms/google-cloud` | Organization design, GKE, and security on Google Cloud |
| Multi-cloud overview | `/cloud-platforms` | How we choose, combine and govern platforms |

- **Featured slot:** partner badges for statuses actually held (V-01). If none are held, the slot shows "Hybrid & Multi-Cloud" → `/services/cloud-consulting#hybrid-multi-cloud`. Never show vendor logos styled as badges without a held status.
- **Panel CTA:** "Discuss Your Cloud Strategy" → `/contact?topic=platform`.
- Vendor names appear as plain text. Vendor logos appear only where the vendor's partner programme permits it.

### 8.4 Compliance menu

| Group | Link | URL | Descriptor |
|---|---|---|---|
| **Frameworks** | HIPAA | `/compliance/hipaa` | Safeguards and evidence for health information in the cloud |
| | GDPR | `/compliance/gdpr` | Technical measures for EU and UK personal data |
| | PCI DSS | `/compliance/pci-dss` | Controls for cardholder-data environments |
| | PIPEDA | `/compliance/pipeda` | Safeguards for Canadian personal information |
| **Governance & Readiness** | Cloud Governance | `/compliance#cloud-governance` | Policy, guardrails and account hierarchy |
| | Policy & Control Implementation | `/compliance#policy-controls` | Controls as code, continuously checked |
| | Risk Management | `/compliance#risk-management` | Cloud risk register and treatment plans |
| | Audit Readiness | `/compliance#audit-readiness` | Organised, current evidence for assessors |

- **Featured slot (boundary statement):** "We implement controls and prepare evidence. Your auditor or assessor certifies." → `/compliance#boundaries`. This is deliberate: it sets the honest scope up front (07 §8).
- **Panel CTA:** "View all compliance services" → `/compliance`.

### 8.5 Insights

A direct link to `/blog`, with no panel in release 1. When category pages launch, it becomes a small panel listing the four categories plus "Latest articles".

### 8.6 Company menu

| Link | URL | Descriptor | Condition |
|---|---|---|---|
| About | `/about` | Who we are and where we work from | — |
| Our Approach | `/our-approach` | Method, engagement models and FAQ | — |
| Our Clients | `/about#clients` | Teams we've worked with | V-02 approved. Logos appear on About only in release 1 (07 §7, amended) |
| Trust & Security | `/trust` | How we protect your environments and data | V-14 verified |
| Careers | `/careers` | Cloud, DevOps and security roles | — |
| Contact | `/contact` | Talk to an engineer | — |

No featured slot. Panel CTA: "Discuss Your Cloud Strategy" → `/contact`.

### 8.7 Header CTA

"Discuss Your Cloud Strategy" → `/contact`. On pages that already have an inline form (contact page), the button scrolls to the form.

### 8.8 Mobile navigation (< 1024 px)

- The bar shows the logo, a compact CTA ("Talk to us" → `/contact`; the full label does not fit at 375 px) and a menu button (`aria-expanded`, `aria-controls`).
- The menu opens a full-height drawer with a focus trap. Esc and the close button dismiss it, and focus returns to the menu button. Body scroll is locked while it is open.
- The drawer is an accordion: one section open at a time, in the same five sections as desktop. Pillar headings are links. Inside Services, only the pillar pages and the two capability pages are listed. The anchor links are left out on mobile so the list is short and nothing depends on hover.
- Cloud Platforms and Compliance list their page links. Company lists all items.
- A sticky footer inside the drawer shows "Discuss Your Cloud Strategy" (full width).
- The current drawer's "We're hiring" promo is removed. Careers stays in Company.
- Tap targets are at least 44 px. There are no hover-only interactions.

---

## 9. Footer structure

| Column | Links |
|---|---|
| **Services** | Cloud Consulting & Engineering, Cloud Migration & Modernization, DevOps & DevSecOps, DevSecOps, Cloud Security & Cybersecurity, Managed Cloud Services, All services (`/services`) |
| **Cloud Platforms** | Microsoft Azure, Amazon Web Services, Google Cloud, Multi-cloud overview |
| **Compliance** | Compliance & Governance (`/compliance`), HIPAA, GDPR, PCI DSS, PIPEDA |
| **Company** | About, Our Approach, Trust & Security, Insights, Careers, Contact |
| **Contact block** | Verified email, phone and city (V-10); LinkedIn (only verified profiles, V-11); "Discuss Your Cloud Strategy" button |
| **Bottom bar** | © {year} {verified legal entity name} · Privacy Policy · Terms of Service · Cookie settings (opens consent manager) |

Removed from the current footer: the stats strip ("Top 1%", "8+ countries", "48h first commit", "30-day rolling exit"), the "Accepting new projects" badge, every deprecated service link, Case Studies, Pricing, FAQ, Locations, "Join the Crew".

Gated pages that have not launched are left out of the footer, not shown as disabled links.

---

## 10. Decisions requiring approval

| ID | Decision | Recommendation | Alternative (one line) |
|---|---|---|---|
| A-01 | Top navigation | Services, Cloud Platforms, Compliance, Insights, Company + CTA | Fold Compliance into Services (4 items); loses the differentiator's visibility |
| A-02 | Compliance URL structure | `/compliance` as pillar and hub; `/compliance/{framework}` | `/security-compliance/{framework}` as proposed, plus a separate governance service page |
| A-03 | Cloud engineering page | Merge into `/services/cloud-consulting` | Separate `/services/cloud-engineering` (risk of near-duplicate) |
| A-04 | Solutions | None in R1; `/assessments` in R2 if V-04 is yes | Launch the 6 solution pages as proposed |
| A-05 | Industries | None in R1; healthcare and financial services later if V-03 is confirmed | Launch them now as reframed versions of the old industry pages |
| A-06 | Staffing | Retire as a service; "embedded engineers" becomes an engagement model only if the business wants it | Keep a staff-augmentation page (contradicts the specialist positioning) |
| A-07 | Pricing | Retire; engagement models without prices | Publish starting prices for assessments if V-04 is yes |
| A-08 | Our Clients | Section on About plus a homepage strip; no page in R1 | Standalone `/clients` |
| A-09 | Trust & Security page | Launch in R1, limited to verified practices | Defer to R2 |
| A-10 | Blog URL | Keep `/blog`, label "Insights" | Move to `/insights` with 16 301s |
| A-11 | Locations | Retire all six; Canadian facts move to About | Keep a single `/locations/canada` reframed for PIPEDA buyers |
| A-12 | Work/case studies | Hide: 410 detail pages, `/work` 301 → `/about` | noindex and keep reachable (still public; rejected) |
| A-13 | Gating | Platform and framework pages launch only when V-01/V-03 are confirmed | Launch all and soften copy (risks claims we cannot support) |
| A-14 | Approach step order | Assess → Architect → Implement → Manage → Optimize, with "Secure" across every step | Client's six steps with Secure as step 4 |
