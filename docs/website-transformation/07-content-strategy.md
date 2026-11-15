Stage 2 deliverable. Status: awaiting review.

# 07 — Content Strategy: positioning, messaging, page objectives, content hierarchy

Routes and names follow [04](04-proposed-sitemap.md). Services and tools follow [06](06-service-architecture.md). URL handling follows [05](05-route-migration.md). Every claim the new content relies on is listed in the verification register (§11). Until an item there is confirmed, the "if not confirmed" column applies.

---

## 1. Positioning, audiences, value propositions

### 1.1 Positioning statement (internal; not published copy)

For mid-market and enterprise organisations in regulated sectors that run on Microsoft Azure, AWS or Google Cloud, AlgoCrew is a specialist cloud engineering partner. We design, secure and operate cloud infrastructure with security controls and compliance evidence built into delivery. Unlike generalist IT agencies, we work only on cloud engineering, DevOps and DevSecOps, cloud security and compliance. We are precise about what we deliver and what we do not: we implement and evidence controls, and auditors certify.

The named clouds depend on V-03. If a platform is not confirmed, it is removed from this statement and from every derived line.

### 1.2 Audience segments

| Segment | Role examples | What they need from the site | Pages they land on | What makes them leave |
|---|---|---|---|---|
| Technology leader | CTO, VP Engineering | Will this partner design something my team can own? Is the scope clear? | Home, `/services/cloud-consulting`, `/services/cloud-migration`, platform pages | Vague claims, no deliverables, generalist signals (web, mobile, gaming) |
| Security leader | CISO, Head of Security, security architect | Do they understand cloud-native controls and detection? Do they handle access to our environment safely? | `/services/cloud-security`, `/services/devsecops`, `/trust` | Buzzwords ("military-grade", "unhackable"), no named tools, no method |
| Compliance / privacy lead | Compliance officer, privacy officer, DPO | Do they know the framework? Do they overstate their role? | `/compliance`, framework pages | Promises of "guaranteed compliance" or "certification" |
| Infrastructure / IT leader | IT Director, Head of Infrastructure at a regulated mid-market firm | Can they run this after it is built? What hours, what scope? | `/services/managed-cloud-services`, platform pages | Unclear coverage, implied 24/7 that is not real |
| Evaluator (secondary) | Platform or DevOps lead, procurement / vendor-risk reviewer | Technical depth; how the vendor protects client data | `/services/devops`, Insights, `/trust` | Missing security practices, inconsistent legal details |

### 1.3 Value propositions

| # | Proposition | What it means | Proof that can back it (§5) |
|---|---|---|---|
| 1 | Security built into delivery | Controls are set at each lifecycle stage, not reviewed at the end | DevSecOps control map; pipeline deliverables |
| 2 | Compliance you can evidence | Framework requirements are mapped to cloud configuration and to evidence an assessor can use | Deliverable lists; boundary statement |
| 3 | Multi-cloud, one method | One approach across Azure, AWS and Google Cloud (only the platforms confirmed in V-03) | Platform pages with native tooling; held certifications (V-05) |
| 4 | Clear scope | Every engagement states inputs, deliverables and exclusions | SOW-style deliverable lists on every service page |
| 5 | From build to run | The same team can operate what it builds, under a defined scope | Managed services scope (V-12) |

---

## 2. Tone of voice and vocabulary

**Tone:** plain, precise and calm. Write the way a senior engineer explains a design to a CISO: specific nouns, short sentences, no hype. Name real tools. State limits openly. Second person ("your environment") for buyer-facing copy, first person plural ("we") for our actions. Canadian/British spelling or US spelling: pick one (recommendation: US spelling, which matches "optimization" in the routes, with the exception of quoted legal names) and apply it everywhere.

| Use | Avoid (and why) |
|---|---|
| implement, configure, harden, evidence, map, automate, operate | "transform", "revolutionise", "supercharge", "unlock" (empty) |
| controls, guardrails, landing zone, policy as code, least privilege | "military-grade", "bank-grade", "bulletproof", "unhackable" (unprovable) |
| audit readiness, assessment readiness, control mapping, evidence | "compliant", "certified", "guaranteed compliance" (see §8) |
| shared responsibility | "fully secure", "zero risk" |
| engagement, scope, deliverables, handover | "crew", "rockstars", "ninjas", "top 1%", "elite" (staffing-era vocabulary) |
| named services (Azure Policy, AWS Config, Security Command Center) | generic "cutting-edge technologies" |
| "we've worked with" | "trusted by", "chosen by", "partnered with" for clients (implied endorsement; §7) |
| Microsoft Azure, AWS, Google Cloud (first mention); Azure, AWS, Google Cloud after | "GCP" in headings (fine in body); "Amazon Cloud" |
| HIPAA, GDPR, PCI DSS, PIPEDA (no hyphen in PCI DSS) | "PCI-DSS", "HIPAA-certified", "GDPR-certified" |
| DevSecOps (one word, this casing) | "Dev-Sec-Ops", "SecDevOps" |
| specific timelines only when verified | "48 hours", "first commit in 48h", "launch in weeks" |

Words retired with the old positioning: digital experiences, digital products, cinematic, launch your product, MVP, staff augmentation (unless A-06 keeps "embedded engineers"), hire a developer, AI-first, top 1% talent.

---

## 3. Messaging hierarchy, hero options, CTA vocabulary

### 3.1 Hierarchy

| Level | Message | Used on |
|---|---|---|
| **Core** | We engineer secure, scalable cloud infrastructure, with security controls and compliance evidence built into delivery. | Home hero, About, meta descriptions, Organization schema |
| **Pillars** | Cloud Consulting & Engineering: "The right foundation, designed and built." · DevOps & DevSecOps: "Delivery that is repeatable, observable and secure by default." · Cloud Security & Cybersecurity: "Controls that fit how your cloud actually works." · Compliance & Governance: "Requirements turned into controls and evidence." · Managed Cloud Services: "Operations with a defined scope and clear reporting." | Home capabilities, Services overview, pillar heroes, mega menu |
| **Proof** | Deliverable lists; method; named contacts; certifications held; our own security practices; client logos with permission | Every page (§5) |
| **Action** | Discuss Your Cloud Strategy | Every page |

Pillar lines are original working copy. Final wording happens at copywriting.

### 3.2 Homepage hero options

The client's direction is "Engineering Secure, Scalable Cloud Infrastructure." All three options are original wording. Platform names in the subheads are trimmed to those confirmed in V-03.

| Option | H1 | Subhead |
|---|---|---|
| **A (recommended)** | Engineering Secure, Scalable Cloud Infrastructure. | We design, build and run cloud platforms on Microsoft Azure, AWS and Google Cloud, with security controls and compliance evidence built in from the first pipeline. |
| B | Cloud infrastructure with security in every layer. | Architecture, DevSecOps and managed operations for organisations that answer to auditors, regulators and their own security teams. |
| C | Secure cloud engineering for regulated organisations. | From first assessment to day-two operations, we implement the technical controls behind HIPAA, GDPR, PCI DSS and PIPEDA programmes on Azure, AWS and Google Cloud. |

Why A: it keeps the client's direction and the subhead does the qualifying work (platforms, security, evidence). B is the alternative if the brand wants a less engineering-led tone. C is the most specific but depends on V-03 for all four frameworks, so it is the most fragile option.

Hero rules: no statistics, no badges unless held, no client logos inside the hero. The WIP abstract 3D visual (01 §4) suits this brand and can stay once its dependencies are declared.

### 3.3 CTA vocabulary

| Role | Label | Target |
|---|---|---|
| Primary (every page) | **Discuss Your Cloud Strategy** | `/contact` (with `?topic=` preselecting the form option on pillar, platform and framework pages) |
| Secondary | **Explore Our Capabilities** | `/services` |
| Contextual variant, `/compliance` | Discuss Your Compliance Requirements | `/contact?topic=compliance` |
| Contextual variant, framework pages | Discuss Your {HIPAA / GDPR / PCI DSS / PIPEDA} Requirements | `/contact?topic={framework}` |
| Contextual, Insights articles | Talk to the team behind this article | `/contact` |
| Booking | Book a 30-minute call | Cal.com link (V-10; replaces the mislabelled "Book a Strategy Call" → `/hire`) |
| Mobile header (space-constrained) | Talk to us | `/contact` |
| Only if V-04 = yes | Start with an assessment | `/assessments` |

Retired labels: Get Started, Launch Your Product, See Case Studies, Start a Project, Build Something Exceptional, Join the Crew, Hire a Developer.

---

## 4. Homepage structure

The client's order is kept, with three changes: Solutions is removed (A-04); "Secure" becomes a band across the approach steps instead of a step (A-14); and a proof section is added because there are no case studies.

| # | Section | Objective | Message | Content elements | CTA |
|---|---|---|---|---|---|
| 1 | Hero | Say what we do and for whom in five seconds | Core message (option A) | H1, subhead, two CTAs, abstract visual; no stats | Discuss Your Cloud Strategy · Explore Our Capabilities |
| 2 | ~~Client logos~~ **Scope, method and role strip** (amended after Stage 5; logos move to About only, §7) | Show real working relationships without implying endorsement | "Teams we've worked with" | Monochrome logos, equal visual weight, alphabetical, no links, no captions (§7). **Only shown if V-02 is cleared for at least three logos; otherwise the section is left out** (not replaced with vendor logos) | none |
| 3 | Core capabilities | Route each buyer to their pillar | Five pillar lines (§3.1) | 5 cards: name, one line, 3 capability chips, link to the pillar page | Card links; "Explore Our Capabilities" |
| 4 | Cloud platforms | Show multi-cloud coverage without vendor-badge clutter | One method across your clouds | Cards for the confirmed platforms (V-03), 2–3 native-service examples each (06 §3), partner badge only if held (V-01) | Link to each platform page |
| 5 | DevSecOps lifecycle | Make the differentiator tangible | Security is part of every stage | Interactive 7 stages: Plan → Develop → Build → Test → Deploy → Operate → Monitor. Selecting a stage shows its controls (06 §2, pillar 2). Static list fallback for reduced motion and no JS | Explore DevSecOps → `/services/devsecops` |
| 6 | Security & compliance | Signal framework depth and honest boundaries | Controls and evidence for your framework; your auditor certifies | 4 framework cards (confirmed ones only), one line each; boundary statement (§8) | Link to each framework; "Compliance & Governance" → `/compliance` |
| 7 | Our approach | Show a method a buyer can picture | Assess → Architect → Implement → Manage → Optimize, with security across every step | 5 steps with one-line outputs each; a "Secure" band spanning all five; one line on engagement models | Our Approach → `/our-approach` |
| 8 | What you get | Replace case studies with verifiable proof | Specific outputs, named people, real credentials | 3–4 example deliverables (e.g. landing-zone design, control map, evidence index, operations report); certifications held (V-05) and partner status (V-01) if any; link to Trust & Security (V-14) | Trust & Security → `/trust` |
| 9 | Latest insights | Show current technical thinking | — | 3 most recent posts from the four categories | All insights → `/blog` |
| 10 | Final CTA | Convert | "Tell us about your environment. An engineer will reply." (response time only if verified, V-10) | Short form or button; booking link | Discuss Your Cloud Strategy |
| 11 | Footer | Navigation, legal accuracy | — | 04 §9 | — |

Removed from today's homepage: tech marquees ×2, StatsBento, Details stats, WhyChooseUs, Projects ("industry solutions"), testimonials, home FAQ, staffing panels.

---

## 5. Proof that replaces case studies

| Proof type | How it appears | Depends on | If unavailable |
|---|---|---|---|
| Deliverable lists | "What you get" on every service, platform and framework page, written like a statement of work (06 deliverables) | Nothing; these are descriptions of output types | — |
| Method | Our Approach page; per-page "How we work" with named outputs per step | Nothing | — |
| Named contact per pillar | Name, role, photo and LinkedIn of the person who leads that pillar, on its page (a pattern from Deloitte, adapted) | V-13 consent; V-09 consistent names | Use a role ("Cloud security lead") with no name |
| Certifications held | Individual certifications (e.g. Microsoft, AWS, Google Cloud, Kubernetes or security certifications) listed by type and count, with verification links where the issuer provides them | V-05 | Section omitted; never "certified team" in general terms |
| Partner status | Badge on platform pages and the home platforms section, exactly as the programme permits | V-01 | Omitted; no vendor logo styled as a badge |
| Our own security practices | `/trust`: access to client environments, MFA, least privilege, device management, data handling, NDAs, subprocessors, incident contact | V-14, V-15, V-17 | Page deferred (A-09); a short "How we handle access" section on Our Approach, limited to verified items |
| Client logos | Home, About, Contact (§7) | V-02, V-18 | Omitted |
| Technical articles | Insights linked from the relevant pages | Author names (V-09) | Byline "AlgoCrew engineering" |
| Deliverable samples | Table of contents of a real template (e.g. assessment report outline), shown as an image or list | A real template exists (V-21) | Omitted |

Not used: statistics, testimonials, anonymised "a leading bank" stories, award walls, "SOC 2 aligned" style claims about ourselves.

---

## 6. Page template outlines

SEO titles use the layout template `"%s | AlgoCrew"`. The page-level title therefore must **not** include "AlgoCrew" (this fixes the likely duplicate "Services - AlgoCrew | AlgoCrew"). Title ≤ 60 characters and meta description ≤ 155 characters. Meta descriptions follow the language rules in §8.

### 6.1 Service overview (`/services`)
- **Objective:** show the whole offer on one screen and route people to the pillars.
- **H1 direction:** "Cloud, DevSecOps, security and compliance services."
- **Sections:** intro (2 sentences) → 5 pillar blocks (line, capability list with links and anchors, platforms strip) → how engagements start (link to Our Approach) → platforms and frameworks strips → CTA.
- **Internal links:** all pillar and capability pages; `/cloud-platforms`; `/compliance`.
- **CTA:** Discuss Your Cloud Strategy.
- **SEO:** title "Cloud Consulting, DevSecOps & Security Services". Meta: what we do, on which clouds, for regulated teams.

### 6.2 Service pillar (5 pages)
- **Objective:** convince the pillar's buyer that we understand the problem and can deliver a defined scope.
- **H1 direction:** pillar name plus a qualifier, e.g. "Cloud security services for Azure, AWS and Google Cloud."
- **Sections:** hero (H1, one-line outcome, CTA) → jump links → problems we solve (3–4, in the buyer's words) → capabilities (one H2 section per capability, with its anchor ID from 06; standalone capabilities as summary + link) → how we work (method steps specific to the pillar) → what you get (deliverables) → where we deliver this (platform links to anchors) → supports (framework links) → named contact (V-13) → FAQ (4–6, page-specific) → inline contact form.
- **Internal links:** capability pages, platform anchors, framework pages, 1–3 relevant Insights articles.
- **CTA:** Discuss Your Cloud Strategy (topic preselected).
- **SEO:** "{Pillar} Services | Azure, AWS, Google Cloud". Meta: problem → what we do → deliverable.
- **Minimum:** each capability section has at least one specific paragraph and named native tools; no section is a single generic sentence.

### 6.3 Individual service / capability (`/services/cloud-migration`, `/services/devsecops`; later kubernetes, platform-engineering, cloud-cost-optimization)
- **Objective:** own one specific search intent with depth.
- **H1 direction:** "Cloud migration and modernization services" / "DevSecOps implementation services."
- **Sections:** hero → who it's for → our method (migration: discover → plan waves → migrate → modernize → hand over; DevSecOps: the 7-stage lifecycle with controls) → tooling per cloud (06) → what you get → typical engagement shape (phases, no durations unless verified) → risks we manage (e.g. downtime, data loss, failed rollback) → FAQ → form.
- **Internal links:** parent pillar (breadcrumb + body), platform anchors, related framework pages, Insights.
- **CTA:** Discuss Your Cloud Strategy.
- **SEO:** "{Capability} Services | {Pillar context}". The meta description names the method and the deliverables.

### 6.4 Cloud platform (Azure, AWS, Google Cloud)
- **Objective:** answer "do they really work on my cloud, and how?"
- **H1 direction:** "Microsoft Azure consulting, security and managed services."
- **Sections:** hero (+ partner badge only if held) → when we recommend this platform → 7 capability sections (04 §5) with native tooling → frameworks on this platform (BAA route, PCI DSS attestation, Canadian/EU regions) → certifications held for this platform (V-05) → multi-cloud note → FAQ → form.
- **Internal links:** every pillar or section listed in 06 §3; four framework pages; `/cloud-platforms`.
- **CTA:** Discuss Your Cloud Strategy (`?topic=azure` etc.).
- **SEO:** "{Platform} Consulting, Security & Managed Services". Meta mentions migration, DevSecOps, security and governance on that platform.
- **Minimum:** at least 40% of the copy is platform-specific (tool names, patterns, platform behaviour). If it is not, the page does not ship.

### 6.5 Compliance hub (`/compliance`, Compliance & Governance pillar)
- **Objective:** explain how we turn requirements into controls and evidence, and route people to their framework.
- **H1 direction:** "Cloud compliance and governance: controls, evidence and audit readiness."
- **Sections:** hero → boundaries of our role (`#boundaries`, §8) → frameworks (`#frameworks`, 4 cards) → cloud governance → security governance → risk management → assessments → policy & control implementation → audit readiness → what you get → FAQ → form.
- **Internal links:** the four framework pages, `/services/cloud-security`, `/services/devsecops#policy-as-code`, platform `#governance-compliance` anchors.
- **CTA:** Discuss Your Compliance Requirements.
- **SEO:** "Cloud Compliance & Governance Services". Meta: controls, evidence, audit readiness, frameworks named; no "compliant/certified".

### 6.6 Compliance framework (HIPAA, GDPR, PCI DSS, PIPEDA)
- **Objective:** show precise knowledge of the framework in cloud terms, and an honest scope.
- **H1 direction:** "HIPAA cloud security and compliance readiness" / "PCI DSS controls for cloud environments" / "PIPEDA safeguards for Canadian personal information in the cloud" / "GDPR technical measures for cloud environments."
- **Sections:** hero → who this applies to (plain summary of scope; no legal advice) → shared responsibility on Azure, AWS and Google Cloud (provider agreements and attestations) → the controls we implement (grouped: access, encryption, logging, segmentation, change control, backup, incident handling), each linked to its pillar anchor → evidence we help you prepare → what we do not do (§8 boundary, specific to the framework: QSA for PCI DSS, legal counsel or DPO for GDPR, privacy counsel for PIPEDA) → platform notes (06 §2, pillar 4) → FAQ → form.
- **Internal links:** pillar anchors from the 06 §4 matrix; platform `#governance-compliance`; related Insights.
- **CTA:** Discuss Your {Framework} Requirements.
- **SEO:** "{Framework} Compliance for Azure, AWS & Google Cloud". Meta: "technical controls and audit readiness", never "become compliant".
- **Legal review:** each framework page is reviewed by a qualified person (the client's counsel or a compliance specialist) before launch. This is not optional.

### 6.7 Solution template: not used
No Solutions pages exist (A-04). The equivalent for release 2 is the **Offer** template (`/assessments/*`, only if V-04 is yes): objective (sell a fixed-scope first engagement); H1 = offer name; sections: who it's for → scope → inputs we need → activities → deliverables → exclusions → duration range → price or "scoped on request" → next steps → form. SEO: "{Offer name} | Fixed-Scope Cloud Assessment".

### 6.8 About (`/about`, company template)
- **Objective:** establish a real, accountable company.
- **H1 direction:** "A specialist cloud engineering partner, based in Canada" (V-10).
- **Sections:** who we are (focus, location) → what we do and do not do (one paragraph per pillar plus the "we don't certify" line) → leadership (names and titles per V-09; photos only with consent) → **#clients** (logo row, §7) → how we work (link to Our Approach) → credentials held (V-05, V-01) → company facts (legal name V-06, founded V-08, address V-10) → CTA.
- **Removed:** stats, the "AI-first pivot" timeline, "Top 1%", "digital products" mission.
- **SEO:** "About Us | Specialist Cloud Engineering Partner". Meta: focus, location, pillars.

### 6.9 Our Approach (`/our-approach`)
- **Objective:** make the engagement easy to picture and lower perceived risk.
- **H1 direction:** "How we work: assess, architect, implement, manage, optimize."
- **Sections:** the five steps (each with purpose, typical activities and named outputs) → security across every step (band) → **#engagement-models** (assessment if V-04; scoped project; managed service with scope per V-12; embedded engineers if A-06; no prices) → working with your team (access, communication, handover) → how engagements start (the fallback for packaged offers if V-04 is no) → **#faq** (merged from `/faq`: contracts, NDAs, IP, access, regions, governing law per V-07) → CTA.
- **SEO:** "Our Approach | Cloud Engagement Model".

### 6.10 Clients (section `/about#clients` in R1; page `/clients` later)
- **Objective:** show working relationships truthfully.
- **R1 section:** heading "Teams we've worked with", logo row, one neutral sentence ("We have delivered work for or alongside these organisations."), no descriptions, metrics or quotes.
- **Later page (V-02):** only once each client has approved a short factual description of the engagement type in writing. Same rules as §7.

### 6.11 Trust & Security (`/trust`)
- **Objective:** answer vendor-risk questions before they are asked.
- **H1 direction:** "How we protect your environments and data."
- **Sections:** access to client environments (least privilege, just-in-time where used, MFA) → our devices and accounts → data handling and retention → confidentiality (NDA practice) → subprocessors (matches the privacy policy, V-15) → incident contact → our own compliance status, stated literally (e.g. "We do not hold a SOC 2 report"; V-17) → how to request our security questionnaire answers.
- **Rule:** every statement maps to a V-14 item. Unverified items are left out, not softened.
- **SEO:** "Trust & Security Practices".

### 6.12 Contact (`/contact`)
- **Objective:** one low-friction route for every enquiry.
- **H1 direction:** "Discuss your cloud strategy."
- **Sections:** short form (name, work email, company, topic select [Cloud consulting & migration / DevOps & DevSecOps / Cloud security / Compliance / Managed services / Other], cloud(s) in use, message, consent checkbox linking to the privacy policy) → what happens next (who replies, response time only if V-10) → booking link → direct email and phone (V-10) → small client logo row (§7) → careers link for job seekers.
- **Removed:** Hire-a-Developer tab, Apply tab (it loses CVs, 01 §15), staffing service options, "Bid Price".
- **SEO:** "Contact | Discuss Your Cloud Strategy".

### 6.13 Insights listing (`/blog`) and article (`/blog/{slug}`)
- **Listing objective:** a topical library, filtered by the four categories. H1 "Insights". Featured article, category filters, grid. Canonical rules in 05 §3.
- **Article objective:** earn search visibility and show competence, then route readers to a pillar.
- **Article structure:** H1 (title as is) → byline (real person, V-09) and dates (published / updated) → summary → body with linked table of contents (today's ToC items are not links) → "Related service" box (one pillar or capability page, chosen per post in the internal-link list in 05 §3) → 3 related posts in the same category → CTA "Talk to the team behind this article".
- **SEO:** keep the existing `metaTitle` and `metaDescription` where present. Add a per-post OG image when available.

### 6.14 Careers (`/careers`, short)
Footer-only. H1 "Careers". Who we hire (cloud, DevOps, security engineers), how we work, open roles only when real (V-20) with JobPosting schema per role, application by email (until the CV upload is fixed). Remove salary, equity and perk claims unless verified, the UX/UI and mobile roles, and the links to `/work`.

---

## 7. Client trust strategy

**The four clients:** Innovapost, Atmosera, Deloitte, Nigel Frank International. No logo files are in the repo (01 §11).

**Display rules**
- Logos only. Monochrome (single neutral tone, adapted for light and dark themes). Each logo sits in an equal bounding box sized for equal visual weight, not equal width. Alphabetical order. No links, no hover effects, no captions.
- Heading: **"Teams we've worked with"** (recommended; the most neutral). Alternative: "Trusted by teams at" (the client's suggestion, slightly stronger implication).
- No testimonials, project descriptions, metrics, service tags next to logos, or "partners" wording.
- Logos never appear on service, capability, platform or framework pages. Next to "HIPAA" or "Managed Azure", a logo implies that client bought that service.
- Not in OG images, schema, ads or meta descriptions.
- Minimum three approved logos to show a row. With fewer, the row is left out entirely.
- **Where (amended after Stage 5, decision on review finding R-20):** `/about#clients` only in release 1, and only once V-02 is cleared. No logo row on the homepage or Contact. Reason: directly under the hero claim, the row reads as endorsement, and two of the four organizations are also competitors. Revisit homepage placement once V-02 and V-18 are answered.
- **In place of logos near the hero:** a three-part strip that needs no permission: scope (the four practice areas), method (the five approach steps) and role (the boundary statement).

**What Atmosera and Deloitte being clients implies**
- **Both are also competitors or reference sites in this space** (02). Atmosera is an Azure MSP whose managed and DevSecOps services overlap ours directly. Deloitte sells cloud, cyber and compliance services at scale.
- The relationship is probably subcontracting or delivery support, not "they bought our services for themselves" (V-18). "Teams we've worked with" stays accurate either way; "trusted by" or "clients include" may not.
- Both will look at the site. Structure and wording must be visibly our own: no lifecycle menu labels resembling Atmosera's (Transform, Protect, Accelerate, Operate, Innovate), no copied phrasing from either. 02 already flags this. Our approach steps and lifecycle stages are deliberately different.
- No messaging that positions us against "big consultancies" or "global integrators". It would contradict the logo row and could harm the relationship.
- Large firms usually require written permission and brand-guideline compliance for any logo use. Expect Deloitte in particular to need formal approval. Ask before design work depends on it.
- If either declines, show the others (minimum three rule) and never mention the declining firm.

**Innovapost and Nigel Frank International**
- Confirm the nature of each relationship (V-18). Nigel Frank International is a technology recruitment firm, so the relationship may have been staffing-related rather than a cloud services engagement. Showing it is still fine under "Teams we've worked with" if permission is given, but it should not be used as evidence of a specific capability.

---

## 8. Compliance language rules

**Principle:** we implement technical controls, governance and audit readiness. We do **not** certify, audit, attest, give legal opinions, or guarantee compliance. Compliance is the client's outcome, decided by their assessor, auditor, regulator or counsel.

| Approved phrasing | Forbidden phrasing |
|---|---|
| "We implement the technical safeguards HIPAA requires for ePHI in your cloud environment." | "We make you HIPAA compliant." / "HIPAA-certified" (there is no official HIPAA certification) |
| "We prepare your environment and evidence for your PCI DSS assessment." | "PCI DSS certified solutions" / "We certify your environment" / "Get PCI compliant fast" |
| "We map GDPR Article 32 security requirements to your cloud configuration." | "GDPR compliant cloud" / "Guaranteed GDPR compliance" |
| "We help you meet PIPEDA's Safeguards principle with technical controls in Canadian or other regions." | "PIPEDA certified" / "PIPEDA requires your data to stay in Canada" (it does not) |
| "Controls designed to support HIPAA, GDPR, PCI DSS and PIPEDA programmes." | "Compliance guaranteed" / "100% compliant" / "audit-proof" |
| "Audit readiness" / "assessment readiness" | "Pass your audit" / "Audit guaranteed" |
| "Your QSA (or internal assessor) performs the PCI DSS assessment; we prepare the environment and evidence." | "Our assessors" / "our QSA" (unless a QSA relationship is verified) |
| "This is not legal advice. Your counsel or DPO decides how the regulation applies to you." | "We'll tell you what the law requires of you." |
| "Built on services covered by the provider's BAA." | "HIPAA-compliant AWS/Azure/GCP" (providers are not "compliant"; the services are eligible or in scope) |
| About ourselves (only if true, V-17): "We do not currently hold a SOC 2 report or ISO 27001 certificate." | "SOC 2 aligned", "ISO 27001 aligned", "HIPAA ready", "GDPR compliant" (the current TrustStrip and services claims; remove) |

**Where the rules apply:** body copy, headings, nav descriptors, meta titles and descriptions, schema descriptions, image alt text, OG images, form confirmation emails, sales PDFs linked from the site.

**Standard boundary statement** (used on `/compliance#boundaries`, every framework page, and the Compliance menu featured slot), working copy: "We implement and evidence technical controls. Certification, attestation and legal interpretation are the role of your auditor, assessor or counsel. We work alongside them."

**Facts to get right:** PCI DSS v4.0.1 is the current version. The lapsed Canadian Bill C-27 (CPPA) is not law and must not be described as such. GDPR copy covers the UK GDPR where relevant. HIPAA "eligible" or "in-scope" services, not "compliant" services.

---

## 9. Insights triage and categories

**Is there a meaningful content strategy?** Yes. 16 of the 32 posts fit the new positioning, which is enough to launch three categories. Compliance & Governance has no posts yet, so it launches only with the new articles below. Insights stays a direct nav link (no panel) until category pages are justified (≥ 5 posts each).

### 9.1 Categories

| Category | Slug (later page) | Posts at launch | Feeds pillar |
|---|---|---|---|
| Cloud Engineering | `cloud-engineering` | 5 | Cloud Consulting & Engineering, Managed Cloud Services |
| DevOps & DevSecOps | `devops-devsecops` | 7 | DevOps & DevSecOps |
| Cloud Security | `cloud-security` | 4 | Cloud Security & Cybersecurity |
| Compliance & Governance | `compliance-governance` | 0 (new articles) | Compliance & Governance |

### 9.2 Triage of the 32 posts

| Decision | Posts | Treatment |
|---|---|---|
| **Keep: Cloud Engineering (5)** | kubernetes-vs-ecs-2025, aws-cost-optimisation-engineering-guide, serverless-vs-containers-2025, microservices-vs-monolith-honest-guide, event-driven-architecture-patterns | Recategorise, fix internal links (05 §3), add "Related service" box, editorial check for dated claims and set `updated` |
| **Keep: DevOps & DevSecOps (7)** | ci-cd-pipeline-best-practices-2025, docker-production-best-practices, terraform-infrastructure-as-code-patterns, observability-beyond-monitoring, sre-practices-for-startups, supply-chain-security-software, owasp-top-10-2025-developer-guide | Same |
| **Keep: Cloud Security (4)** | zero-trust-security-architecture-guide, api-security-best-practices-2025, jwt-security-common-mistakes, kubernetes-security-hardening | Same |
| **Keep but unlink (noindex) (6)** | why-senior-only-teams-ship-faster, async-first-engineering-culture, code-review-culture-that-ships, hiring-senior-engineers-remotely, milestone-billing-vs-hourly, technical-debt-is-not-always-bad | Removed from the listing, sitemap and related posts; noindex, follow; links to deprecated pages removed; culture posts may be linked from Careers |
| **Retire (410) (10)** | database-performance-optimisation, redis-patterns-production, postgres-vs-mongodb-choose-right, building-ai-features-that-actually-work, nextjs-15-app-router-production-lessons, typescript-advanced-patterns-2025, web-performance-core-web-vitals-2025, graphql-vs-rest-2025, how-to-scope-an-mvp-correctly, react-native-vs-flutter-2025 | Removed; 410 |

Slugs that contain "2025" are kept (changing them would cost search equity). Freshness is shown with the `updated` date, not the slug.

### 9.3 First new articles (priority order; topics, not finished titles)

1. Compliance & Governance: a HIPAA technical-safeguards control map for Azure, AWS and Google Cloud.
2. Compliance & Governance: PCI DSS v4.0.1 scope reduction through cloud segmentation.
3. Compliance & Governance: PIPEDA and data residency, what the law requires and what contracts add.
4. Compliance & Governance: GDPR Article 32 expressed as cloud configuration.
5. DevOps & DevSecOps: a DevSecOps control map, stage by stage (the companion to the homepage lifecycle).
6. Compliance & Governance: policy as code across Azure Policy, AWS Config and Organization Policy.
7. Cloud Engineering: landing-zone foundations compared across the three clouds.
8. Cloud Security: prioritising cloud posture findings that teams actually fix.

Only topics where the team has real experience (V-03) are written. Each new article is reviewed against §8.

---

## 10. Existing content problems the new content must resolve

| Problem (from 01 §14 / §5) | Resolution |
|---|---|
| Conflicting statistics: 8+ vs 18+ countries; 98% satisfaction / retention in three places; $50M+ client revenue; 50+ projects; 30+ clients; 120+ deployments; 0 critical incidents; "Top 1%" | Remove every statistic. Reintroduce one only with a source and an owner (V-21) |
| Conflicting prices: $8,000 / $14,000 (page) vs $4,900 / $12,000 (schema) vs $4,900 (FAQ) | `/pricing` retired; no prices published unless V-04 adds priced offers |
| Legal entity: "AlgoCrew Inc." (footer, schema) vs "AlgoCrew Ltd." (privacy, terms) | One verified name (V-06) everywhere: footer, legal pages, schema |
| Governing law: Ontario (FAQ) vs England & Wales (Terms) | One verified answer (V-07) in Terms and in the Our Approach FAQ |
| Founding year 2019 (timeline) vs 2020 (schema) | Verified year (V-08) or omit |
| Founder identity: "Arqam Malik, Founder & CTO" vs "Muhammad Arqam" vs "Arqam Tahir, Software Engineer" | One name and title per person (V-09) across bylines, About and schema |
| Emails: query@, info@, hello@algocrew.com, legal@, hr@ | One public enquiry address plus legal and privacy addresses (V-10) |
| Privacy policy lists Plausible, but GA4, Tawk.to and EmailJS are used, with no consent | Privacy policy lists the actual processors (V-15). Cookie consent banner (decline non-essential by default) before GA4 or Tawk.to load. Footer "Cookie settings". Essential for a GDPR/PIPEDA-positioned brand |
| Fabricated-looking company names on the homepage (NexaCapital, Nexus Health, VCloud Systems, LogiTech Solutions) not in any project data | Section removed. These names must not be reused anywhere |
| Testimonials (Sarah Chen / Meridian Health, Marcus Williams / Launchpad, Priya Sharma / NovaTech, Daniel Osei / Stackr Labs) with no verification | Removed. No testimonials in R1 |
| Self-compliance claims: "SOC 2 Aligned", "ISO 27001 Aligned", "HIPAA Ready", "GDPR Compliant", "ISO 27001 Compliance Standards" | Removed. Our own status is stated literally on `/trust` (V-17) |
| Case-study outcome claims ("SOC 2 certified", "PCI-DSS achieved") | Hidden with `/work`; not reused |
| Speed claims: "48h first commit", "24h response", "48h response guarantee" | Removed; a response-time line only if V-10 confirms it |
| "24/7 On-call", "Follow-the-sun" | Removed unless V-12 confirms coverage |
| Careers: salary range, equity, $1,500 learning budget, team quotes; CV upload never sent | Verify or remove (V-20); email applications until fixed |
| Template leftovers: Once UI schema (`lorant@once-ui.com`), `sameAs` to Once UI, README "modern web agency", manifest "Elite Software Agency" | Replace with verified company data |
| Broken images (`/images/services/webapp.jpg` on 5 pages) | Pages retired or merged |
| Two FAQ sets, two "by the numbers" blocks, two tech grids | One FAQ per page; no stats; tooling appears in context on platform and pillar pages |

---

## 11. REQUIRES BUSINESS VERIFICATION register

Owner for every item: the client. The plan is designed so that every "if not confirmed" path still ships a coherent site. V-01 to V-04 are the four open questions from Stage 1 and are **still unanswered**.

| ID | Item to verify | New content that relies on it | If confirmed | If not confirmed or unanswered |
|---|---|---|---|---|
| **V-01** | Partner statuses held with Microsoft, AWS and Google Cloud (programme name, tier, specialisations), and permission to display the badges | Platform pages, home platforms section, Cloud Platforms menu featured slot, About credentials | Badge exactly as the programme permits, with the exact programme wording | No badges and no "partner" wording; featured slot falls back (04 §8.3); platform pages rely on method and tooling |
| **V-02** | Written permission and logo files for Innovapost, Atmosera, Deloitte and Nigel Frank International | Home section 2, `/about#clients`, contact logo row, Our Clients menu item | Logos per §7 rules | Fewer than 3 approved: section and menu item left out |
| **V-03** | Real delivery experience on each cloud (Azure, AWS, Google Cloud) and with each framework (HIPAA, GDPR, PCI DSS, PIPEDA) | Platform and framework pages; hero subhead; positioning; homepage cards; article topics | Page launches | That page is not built; it is removed from menus, hub, homepage and copy. Redirects to it use fallbacks (05). Hero option A subhead drops that platform |
| **V-04** | Whether fixed-scope packaged offers (assessments, readiness reviews) will be sold, and whether prices are published | `/assessments/*` (R2), menu featured slot, "Start with an assessment" CTA, engagement models | Offer template (§6.7) in R2 | No offers; "How engagements start" on Our Approach; no prices anywhere |
| V-05 | Individual certifications held by staff (type, count, expiry, verification link) | Platform pages, About, home proof section | Listed by type and count with links | Section left out; never "certified engineers" in general |
| V-06 | Legal entity name and registration (Inc. vs Ltd.) | Footer, privacy, terms, Organization `legalName` | Used everywhere | Brand name only; legal pages blocked until resolved (they must name the entity) |
| V-07 | Governing law and contracting entity | Terms; Our Approach FAQ | Stated | FAQ item left out; Terms blocked |
| V-08 | Founding year | About; schema `foundingDate` | Stated | Omitted |
| V-09 | Names and titles of founders and leadership; blog author attribution | About leadership, bylines, schema | Consistent everywhere | Roles only; bylines "AlgoCrew engineering" |
| V-10 | Public email, phone, address (Brampton, ON), booking link, and any response-time commitment | Footer, Contact, schema, About | Used | Email and contact form only; no response-time promise |
| V-11 | Ownership of LinkedIn, GitHub and X profiles | Footer, `sameAs` | Linked | Unlinked |
| V-12 | Managed services operating model: hours of coverage, on-call, response targets, tooling access model | `/services/managed-cloud-services`, engagement models | Stated exactly | Business-hours scope with escalation; no "24/7" anywhere |
| V-13 | Named contact person per pillar, with consent to show name, photo and LinkedIn | Pillar pages | Shown | Role title only |
| V-14 | Our own security practices (MFA, least privilege, client-access method, device management, data retention, NDA practice, background checks if any) | `/trust`, Our Approach, home proof section | Each verified item stated | `/trust` deferred (A-09); only verified items appear anywhere |
| V-15 | Actual processors and trackers (GA4, Tawk.to, EmailJS, Cal.com, Vercel, others) and the consent approach | Privacy policy, cookie banner, `/trust` subprocessors | Listed | Privacy policy cannot be published as-is (it is inaccurate today) |
| V-16 | Third-party tools the team actually uses (Terraform, Argo CD, Datadog, etc.) | Pillar and platform tool lists | Named | Native tools only |
| V-17 | Our own compliance status (SOC 2 report, ISO 27001 certificate, any in progress) | `/trust`, §8 | Stated literally (e.g. "SOC 2 Type II report available under NDA") | "We do not currently hold…" stated literally, or omitted; never "aligned" |
| V-18 | Nature of each client relationship (direct client, subcontract, delivery partner, recruitment channel) | §7 wording; future `/clients` | Wording chosen to match | "Teams we've worked with" only |
| V-19 | Regions served and contracting countries | Service schema `areaServed`, About | Stated | `areaServed` omitted |
| V-20 | Real open roles, compensation and benefits | Careers, JobPosting schema | Published | General hiring note; no schema |
| V-21 | Any statistic, team size or template the business wants to show (with its source) | Home proof section, About | Shown with source and date | Not shown |
| V-22 | Whether AlgoCrew signs BAAs (HIPAA) and DPAs (GDPR) as a business associate or processor | HIPAA and GDPR pages, Our Approach FAQ | "We sign BAAs / DPAs where we access regulated data" | Silent on the point; the client handles it in contracts; pages say "ask us about contractual terms" |
| V-23 | Approval of decisions A-01 to A-14 (04 §10) | All four documents | Proceed to Stage 3 | Revise these documents |
| V-24 | Delivery practices and contract terms stated in copy: work delivered as code in the client's repositories; client ownership of deliverables (IP terms); scope, deliverables and exclusions stated before work starts; working alongside a client's existing partner; the build team also operating the platform (added after the Stage 5 review, R-07) | Home capabilities and deliverables sections, service and platform FAQs, managed services copy | Stated as fact | Left out or phrased as "typical"; FAQ items omitted |
