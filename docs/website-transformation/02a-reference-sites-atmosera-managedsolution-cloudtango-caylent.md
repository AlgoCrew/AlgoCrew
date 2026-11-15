# 02a: Reference Sites (Atmosera, Managed Solution, Cloudtango, Caylent)

Research date: 2026-11-11. We use these sites to learn information architecture (IA), navigation, content hierarchy and how services are presented. We are not copying them.

**Method.** Raw HTML came from `curl`, plus one WebFetch pass per homepage. For each site we pulled `robots.txt`, `sitemap.xml` / sitemap index children, the homepage and 10 to 15 inner pages. Menus were extracted from the markup: WordPress/Elementor DOM for Atmosera and Managed Solution, and the Next.js/Builder.io flight payload for Caylent. Cloudtango sits behind a Cloudflare bot challenge (HTTP 403 Just a moment...). We did not try to get past the challenge. Its pages were read from Internet Archive (Wayback Machine) snapshots, and each snapshot date is given below. Copy is paraphrased throughout, with at most one short quote per site.

---

## 1. Atmosera (atmosera.com)

### Overview
Atmosera is an Azure-only partner based in Lake Oswego, Oregon. It sells to mid-market and enterprise IT, engineering and security leaders who run on Microsoft Azure and GitHub. It positions itself through Microsoft credentials: Azure Expert MSP (renewed for a 7th year, per a blog post), a stated 100% Azure focus since 2014, Microsoft Specializations (Agentic DevOps with Azure and GitHub, AVD, AI Apps, App Modernization, Cloud Security, Threat Protection) and GitHub Partner Advisory Board membership. The service story runs on a five-verb lifecycle (Transform, Protect, Accelerate, Operate, Innovate) that covers consulting, managed services and training. The site has a Spanish mirror under `/es/`, built with WPML.

### Sitemap (source: `sitemap_index.xml`, referenced in robots.txt)
The index has 8 child sitemaps: post (234 URLs), page (68), tribe_events (16), training (6), video (176), data-sheet (34), case-study (29) and wdswc-course (41).

```
/                                   Home
/transform/                         Pillar: Azure transformation
  /transform/azure-migration/  /transform/azure-virtual-desktop/
  /transform/azure-optimization/  /transform/azure-adoption/  /transform/azure-data-migration/
/protect/                           Pillar: cybersecurity
  /protect/secure-cloud/  /protect/secure-edge/  /protect/identity-access-management-iam/
  /protect/devsecops/  /protect/secure-cloud-backup/
/accelerate/                        Pillar: AI
  /accelerate/data-engineering-for-ai/  /accelerate/copilot-services/
  /accelerate/ai-for-application-modernization/  /accelerate/large-learning-models/
  /accelerate/ai-training/  /accelerate/github-copilot-adoption-framework/  /ai-governance-services/
/operate/                           Pillar: managed services
  /operate/managed-azure/  /operate/managed-security/  /operate/managed-compliance/
  /operate/disaster-recovery/  /operate/atmosera-management-platform/
/innovate/                          Pillar: app/data modernisation
  /innovate/application-modernization/  /innovate/data-modernization/
  /innovate/cloud-native-app-dev/  /innovate/devops/ (target of /devops/)  /devops-services/
SEO landing pages (flat, outside the pillars):
  /azure-security/  /azure-data-security/  /managed-azure-security/  /azure-devops-services/
  /azure-devops-migration/  /azure-performance-optimization/
  /cloud-security-services-in-{boise|charlotte|indianapolis}/  /cybersecurity-services-in-las-vegas/
/insights/ (filterable hub: case studies, blogs, events, videos)
/resources/case-study/*  /resources/data-sheet/*  /resources/events/  /video/*  /event/*
/training/  /course/*  /course-category/*  /training-categories/
/about-us/  /team/{name}/  /contact-us/  /privacy-policy/  /legal-policy/  /lp/* (offer landing pages)
/es/...  (Spanish mirror)
```
Compliance URLs: there is no HIPAA, GDPR or PCI service page. Compliance is covered by `/operate/managed-compliance/` and a data sheet `/resources/data-sheet/atmosera-compliance-services/`. Standards-specific content exists only as blog posts (`/blog/azure-hipaa-compliance/`, `/blog/understanding-azure-pci-compliance/`).

### Header & navigation
The menu is built with the Stratum mega-menu plugin for Elementor. A second copy of the same menu sits in an `elementor-hidden-desktop` container, which serves as the tablet/mobile header with identical items. The language switcher links to `/es/`. The primary CTA is **Get in Touch**, a button at the far right that goes to `/contact-us/`.

| Top level | Contents |
|---|---|
| **Expertise** (mega menu, label What We Help Clients Do) | Five columns. Each column has a pillar title, a short tagline and its links: **Transform**, New Foundation (Azure Migration, Azure Virtual Desktop, Azure Optimization, Azure Adoption). **Protect**, Defense in Depth (Secure Cloud, Secure Edge, Secure IAM, DevSecOps). **Accelerate**, Intelligent Solutions (Data Engineering for AI, Copilot, AppDev with AI, LLMs and Cognitive AI, AI Training, AI Governance). **Operate**, Azure in Expert Hands (Managed Azure Services, Managed Security, Managed Compliance, Managed DR, AMP™). **Innovate**, Empower Your Future (App Modernization, DevOps, Data Modernization, Technical Training, Cloud Native AppDev). **Featured block:** a case study, Performance Tuning and Database Migration to Azure, with a *Read Case Study* button. |
| **Solutions** (dropdown, label We can help you) | Eight outcome-phrased links that route back into the pillars: Architect and deploy an Azure environment → /transform/. Build better software with GitHub → /devops/. Elevate InfoSec posture → /protect/. Increase data resiliency → /innovate/data-modernization/. Maximise value from Azure → /transform/. Modernise applications. Train and upskill talent → /training/. Migrate apps and data to Azure. A trailing tagline is not linked (`#`). |
| **Insights** | Case Studies, Blogs, Events, Videos. All four are filtered views of `/insights/` (JetEngine query strings). |
| **Atmosera** (company) | Why Atmosera, About (both → /about-us/), Leadership (/about-us#leadership), Careers (external site builder domain), Contact. |

There is no separate utility bar. Phone numbers (Sales and Support) appear only in the pre-footer contact block.

### Page structure
**Homepage (in order):**
1. Hero. Headline: "Redefine Possible with Modern Technology and Human Expertise". Two buttons: *Get in Touch*, and a second *Contact Us* that points to `msn.com`, a broken placeholder.
2. Trust strip: Trusted by 100+ companies, then a client logo carousel (Slick).
3. Your Expertise Advantage: Microsoft Specializations badges.
4. Testimonial carousel: 9 named people with titles and companies (CEO busHive, CTO Keona Health, Oregon DOJ, and others).
5. Engineering Cloud Power: five alternating pillar sections. Each has an H2 benefit headline and an Explore … Services arrow link (Azure Transformation, Cybersecurity, AI Solutions, Managed Cloud, Application Innovation). A sixth Explore Atmosera Expertise card links to `#`.
6. Let's Create Value; Build a Partnership: about blurb plus stats (100% Azure since 2014, .0011% of North American Microsoft partners, 98.4% two-year satisfaction, 1 integrated platform).
7. Mid-page CTA Let's Talk.
8. Case study carousel, 9 cards (ITAR/DFARS, SAP, financial services, healthcare, Fortune 100 agentic AI, law firm, public sector Fabric, retail).
9. Upcoming Events. The live page shows lorem-ipsum placeholder text here.
10. Latest News: 3 blog cards plus Explore News & Resources.
11. Get in Touch Today: Sales and Support phone numbers and HQ address.
12. Minimal footer: social icons, Privacy, Legal, Home / Insights / Contact. There are no link columns.

**Pillar page (/protect/):** H1 Cybersecurity Services for Microsoft Cloud and Azure. Then an intro with five capability cards (Secure Cloud, Edge, Apps, Data & AI, IAM), a Ready to Explore… CTA band, the same shared testimonial carousel, a promo block for a Data Security & DLP Workshop offer (→ `/lp/data-security-workshop/`), long sections per sub-service each with a link, Cyber Protection by the Numbers, three related blog cards, the case study carousel and a contact form.

**Service page (/protect/devsecops/):** H1 DevSecOps Consulting and GitHub Security Services. Then an intro with three benefit bullets, a CTA band, testimonials, a benefits grid (faster deploys, lower remediation cost, compliance assurance, empowered developers), a Why indispensable section that names SOC 2, GDPR, PCI DSS and HIPAA, a Why Atmosera grid, a features grid (vulnerability scanning, code review, container security, training), a four-step methodology (Assess & Plan → Integrate Tools → Foster Collaboration → Measure & Iterate), by the numbers stats and case studies.

**Service page (/operate/managed-compliance/):** H1 Managed Azure Compliance Services and Audit Readiness. Then a value intro, CTA band, testimonials, and a six-step compliance roadmap (Assessment → Architecture & Design → Policy Enforcement → Posture Optimisation → Monitoring & Reporting → Documentation & Evidence). After that: a value grid, a Why choose us grid naming HIPAA, PCI DSS, SOC2 and GDPR, a Why managed compliance matters grid (penalties, breaches, trust, resilience) and a closing CTA.

**Service page (/operate/managed-azure/):** a benefit intro, an Azure expertise on your team grid, CAF/WAF best-practice language, a journey (assess → architect → migrate → deploy → AMP platform → onboarding), named service tiers (Baseline vs Enhanced Baseline Managed Azure Operations), insights, case studies and a Related Services link list.

**About:** credential badges, then three delivery modes (Professional Services / Managed Services / Technical Training), then a leadership grid with bio pages. **Contact:** address, two phone numbers and an embedded HubSpot form.

### Service categorisation
- **Cloud / Azure:** Transform (migration, AVD, optimisation, adoption) plus Operate (managed Azure, DR, the AMP platform). Azure only. AWS and GCP are never offered.
- **DevOps / DevSecOps:** DevOps sits under *Innovate* (`/devops-services/`, built around GitHub Enterprise, Actions, Copilot and ADO→GitHub migration). DevSecOps sits under *Protect* (`/protect/devsecops/`). So the two are split across pillars.
- **Security:** the *Protect* pillar (Secure Cloud / Edge / IAM / DevSecOps). Managed Security sits under *Operate*.
- **Compliance:** one page, *Managed Compliance*, under Operate. Frameworks (HIPAA, PCI DSS, SOC 2, GDPR) are named inside the copy and have no pages of their own. PIPEDA is not mentioned.
- **URL pattern:** `/{pillar-verb}/{service}/`, plus flat SEO pages (`/azure-security/`) and city pages (`/cloud-security-services-in-{city}/`).

### Content & messaging
Headlines are keyword-heavy H1s (X Services for Y), followed by benefit-led H2s and four-item benefit grids. The site leans on Microsoft partner tiers, percentage stats and named-client testimonials, with the same 9-person carousel reused on every page. CTA wording: Get in Touch, Let's Talk, Ready to …?, Explore … Services, Read Case Study. The audience is Azure-committed organisations, with regulated work shown in case studies (ITAR/DFARS, healthcare, financial services, public sector). The tone is confident and specialist, with Azure Expert MSP repeated many times.

### Visual design observations
From markup only. Elementor global colours are a dark navy (#080a20 / #000f31), an accent orange (#f37321 / #d6661e), a blue (#005698) and greys. Custom fonts are named Headings and Paragraph Text. The layout uses Slick carousels for logos, testimonials and case studies, arrow-icon text links, and alternating image/text pillar rows. We could not see the rendered visuals.

### Patterns worth adopting / to avoid
- **Adopt:** the lifecycle pillar mega menu, where each column has a verb, a tagline and 4 to 6 links. Also: a featured case study inside the mega menu, a second Solutions menu phrased as problems/outcomes, a numbered methodology on service pages, compliance-roadmap steps that end in documentation & evidence, and a Related Services block for cross-linking.
- **Avoid:** splitting DevOps and DevSecOps across two pillars; one identical testimonial carousel on every page; flat SEO duplicates beside the pillar pages (`/azure-security/` vs `/protect/secure-cloud/`); broken or placeholder content (msn.com CTA, `#` links, lorem-ipsum events); no compliance pages for individual frameworks.

### Limitations
We cannot see visual styling, hover animation or mobile layout because no screenshots were taken. We did not read blog, case study or course detail pages beyond their titles in the sitemap.

---

## 2. Managed Solution (managedsolution.com)

### Overview
Managed Solution is a San Diego MSP and Microsoft Solutions Partner. It sells managed IT, 24/7 U.S.-based help desk, co-managed IT, Microsoft consulting and licensing, and security/compliance (vCISO) to organisations with 100+ users across the U.S. Its positioning is a national managed IT provider with deep Microsoft credentials (Top 1% Microsoft Consultancy, Microsoft partner designations, CRN MSP 500 and other awards). It is help-desk-led and broad rather than a cloud-engineering specialist. Azure is one service among many.

### Sitemap (source: `sitemap_index.xml`, referenced in robots.txt)
The index has 11 children: post-sitemap1/2 (201 + 130), page (39), ms_services (19), ms_solutions (17), ms_products (4), ms_case_studies (10), ms_events (404 at time of fetch), guide (5), location (53) and local (1). It uses custom post types per section.

```
/it-services/                 Services hub
  managed-it-services, co-managed-it-services, it-help-desk-services, managed-it-security-solutions,
  microsoft-consulting-services, microsoft-professional-services, microsoft-security-services,
  azure-managed-services, virtual-cio-consulting-services, backup-and-disaster-recovery-solutions,
  remote-management-and-monitoring-tools, microsoft-365-migrations, microsoft-teams-voice-voip-system,
  microsoft-sharepoint-content-management, microsoft-dynamics-365-crm, microsoft-system-center, microsoft-exchange
/microsoft-technology-solutions/ (Solutions hub)  /solutions/*
  ai-and-automation, network-monitoring, zero-touch-deployment-services, compliance-management-system,
  entra-id-intune-migration, engagement-viva, microsoft-power-apps, technology-mergers-and-acquisitions,
  microsoft-365-copilot, simplified-cloud-management (+ /azure-open-ai/), hyper-v, microsoft-intune-services,
  microsoft-defender-services, microsoft-teams-collaboration-tools, rpa-help-desk
/products/  procurement-services, security-products, microsoft-licensing
/industries/  financial-technology-services, managed-it-services-for-healthcare,
              life-sciences-technology-services, managed-it-services-for-manufacturing, non-profit-technology-services
/resources/  /blog/  /case-studies/ (ms_case_studies/*)  /eguides/ (guide/*)  /events/  /service-descriptions/
/culture/ /about-us/ /awards-certifications/ /careers/ /leadership-team/
/contact-us/ /customer-support/ /partners/ /partner-programs/* (drata, network-penetration-testing, ...)
/managed-it-services-pricing/   /azure-cloud-migration-managed-services/ (landing page)
/location/it-services-{city}/   (52 city landing pages)
```
Compliance URLs: one page, `/solutions/compliance-management-system/`. It lists CCPA, HIPAA, GDPR, PIPEDA, SOX, NIST 800, PCI DSS, SOC 2 and FINRA in a single section. There are no pages for individual frameworks.

### Header & navigation
The WebFetch summary said there was no menu. That was wrong: the full menu is in the raw HTML.
- **Utility bar:** phone 888.563.9132, Customer Support, Make A Payment (external billing portal), Partner Programs, Search (popup).
- **Primary nav:** seven Elementor dropdowns. Each top-level item is itself a link to its hub page.

| Top level (hub URL) | Dropdown links |
|---|---|
| **Services** (/it-services/) | Managed IT · Co-Managed IT · IT Help Desk · Managed IT Security · Microsoft Consulting Services · Microsoft Professional Services · Microsoft Security · Azure Cloud · VCIO Consulting |
| **Solutions** (/microsoft-technology-solutions/) | AI & Automation · Network Monitoring · Zero Touch Deployment · Compliance Management System · Entra ID and Intune Migration · Employee Engagement · Business Process Automation · Technology Mergers and Acquisitions |
| **Products** (/products/) | Procurement Services · Security · Microsoft Licensing |
| **Industries** (/industries/) | Finance · Healthcare · Life Sciences · Manufacturing · Non-Profits |
| **Resources** (/resources/) | Blog · Case Studies · eGuides · Events · Service Descriptions |
| **Culture** (/culture/) | About Us · Awards & Certifications · Careers · Leadership Team |
| **Contact** (/contact-us/) | Contact Us · Customer Support · Partner with Us |

The dropdowns are simple single-column lists. There are no featured blocks or descriptions. **Header CTA:** *Book Consultation* (→ /contact-us/), plus a phone link and *Contact Sales*.
- **Mobile nav:** an Elementor off-canvas panel (hamburger) repeats the menu. It leaves out the Industries group and the Microsoft Professional Services item, and adds the utility links and a phone CTA.

### Page structure
**Homepage:**
1. Hero H1: "Enterprise Managed IT Services with 24/7 Help Desk Support". The subhead targets 100+ user organisations. CTAs: *Contact us* (anchor), *Learn More* (/it-services/) and a phone number.
2. Google reviews widget (Trustindex, rated Excellent, 77 reviews).
3. Webinar promo Insights for IT Leaders → View Webinars.
4. Microsoft Specialized Experts…: a wall of award and partner badges with a link to Awards & Certifications.
5. Two feature cards: AI-Powered Managed Services and National Managed Services Provider.
6. Remote Managed IT Services — All 50 U.S. States, with an interactive state map.
7. Empowering Every Role with Smarter IT: a services wheel whose segments link to services.
8. Stats: 10,000+ customers, 96.5% CSAT, A+ cybersecurity rating.
9. Worked With Us? with a Submit Feedback link (Google review).
10. Footer contact form Contact Us Today!
11. Footer columns: Services (11 links), Solutions (7), Products (3), Contact (4), then a newsletter signup (25,000 subscribers) and privacy links.

There are no client logos, case studies or industry sections on the homepage.

**Service page (/it-services/azure-managed-services/):** H1 Azure Managed Services with a subhead about scalability, security and cost. CTA *Optimize Your Cloud Now*, then the Google review carousel, three H3 feature blocks, a monitoring-capability bullet list, an Azure Webinar Series (three video cards), a Partner with a Premier Microsoft Service Provider section with three Microsoft designation badges, a CTA, and four related blog cards. The copy mixes M365 and Azure, and there is no AWS or GCP content.

**Service page (/it-services/managed-it-security-solutions/):** H1 plus a CTA *Secure your future today*, reviews, four capability H3s (automated threat detection, 24/7 monitoring, SIEM, phishing simulation), Microsoft badges, a *View Datasheet* PDF (HubSpot) and related blogs.

**Compliance page (/solutions/compliance-management-system/):** H1 Compliance Management System, subhead about vCISO support, CTA *Get Started Today*. Then reviews, four H3 value blocks (Expert Guidance, Tailored Assessment, Ongoing Support, vCISO Expertise), a deliverables list (System Security Plan, Acceptable Use Policy, BCP/BIA, DR Plan, Incident Response Plan, third-party risk assessment), a Supporting Top Compliance Regulations section (CCPA, HIPAA, GDPR, PIPEDA, SOX, NIST 800, PCI DSS, SOC 2, FINRA, each with a short explainer), a datasheet download and related blogs.

**Industry page (/industries/managed-it-services-for-healthcare/):** H1, a pain-point subhead and CTA *Talk to a Healthcare IT Expert*. Then a services checklist (HIPAA/HITECH EHR transmission, cybersecurity monitoring, UCaaS, SD-WAN, M&A integration), a mini case study (Helio Health), an outcome bullets section, repeated CTAs (*Request Medical IT Services*, *Get Healthcare Compliance*), a PDF download and resources.

**Pricing (/managed-it-services-pricing/):** three tiers, Monitor / Support (marked Most Popular) / IT Partner, priced per user/mo with Request quote instead of a number. Each tier lists features cumulatively and has a *Book a Discovery Call* button. Retention and CSAT stats follow. **Location pages (/location/it-services-chicago/):** templated local SEO pages with an H1 Managed IT Services in {City} and a standard service list. **Contact:** a stat strip (96.5 CSAT, 5x Microsoft Solutions Partner, Top 1% Microsoft consultancy, 95% retention), a support-centre redirect for existing customers and a HubSpot form.

### Service categorisation
- **Cloud:** Azure Cloud (`/it-services/azure-managed-services/`) plus Simplified Cloud Management and a migration landing page. Azure only. There are no AWS or GCP offers.
- **DevOps / DevSecOps:** not offered.
- **Security:** Managed IT Security and Microsoft Security under Services, Security products under Products, and Defender and Entra/Intune under Solutions. Security is scattered across three menus.
- **Compliance:** Compliance Management System (vCISO) under *Solutions*. It is the only one of the four reference sites that names PIPEDA.
- **URL patterns:** `/it-services/{service}/`, `/solutions/{solution}/`, `/products/{x}/`, `/industries/{x}/`, `/location/it-services-{city}/`.

### Content & messaging
Headlines describe the SEO term directly (Managed IT Services in Chicago, Azure Managed Services). The value propositions are 24/7 U.S.-based support, response times, CSAT and retention, and Microsoft rank. Trust signals are dense: Google review widgets on every page, award badge walls, Microsoft designation badges. Some stats contradict each other: Top 100 in the meta description vs Top 150 vs Top 1% in the body, and 90% vs 95% retention on different pages. CTA wording: Book Consultation, Contact Sales, Get Started Today, Secure your future today, Optimize Your Cloud Now, Book a Discovery Call. The audience is COOs, CFOs and IT managers at mid-market companies (100+ users) and regulated SMBs.

### Visual design observations
The site is built with WordPress and Elementor (Swiper carousels, Lottie animations). Brand colours sit in external CSS and could not be read from the HTML. The images are mostly stock photography (file names reference bigstock). The page structure is a dense badge-and-review layout. We could not see the rendered visuals.

### Patterns worth adopting / to avoid
- **Adopt:** a utility bar that separates existing-customer tasks (support, payment) from sales; a clickable hub page for every menu group; a regulations explainer list on the compliance page; a list of concrete compliance deliverables (SSP, IRP, BCP); transparent tier structure on the pricing page; datasheet PDFs as mid-funnel CTAs.
- **Avoid:** seven top-level items that mix taxonomies (Services, Solutions and Products overlap); security spread across three menus; a mobile menu that drops Industries; stats that contradict each other; reusing the review widget on every page; stock-heavy imagery; 50+ thin city pages; nothing on DevOps or other clouds.

### Limitations
We did not open blog, case study or eGuide detail pages. `ms_events-sitemap.xml` returned 404. The homepage map and the services wheel are interactive, and we only read their markup. We cannot see rendered visuals.

---

## 3. Cloudtango (cloudtango.net/azure/usa/): directory, not a consultancy

### Overview
Cloudtango calls itself the "World's largest MSP directory" (homepage title). It is a lead-generation directory and awards body. Buyers search MSPs by location, service and vendor partnership, then send a Request Quote through a modal. MSPs list themselves for free. Cloudtango also publishes vendor-specific Top N lists (Azure, AWS, Microsoft, Cisco and others), case studies (Work), annual MSP Select awards, an events calendar, data reports for investors, and a sister cybersecurity site (Cybertango). For us, it shows how MSPs get labelled and compared by third parties, and therefore which labels buyers actually see.

**Access note:** the live site returns HTTP 403 with a Cloudflare JavaScript challenge to curl and WebFetch. We did not try to bypass it. Everything below comes from Wayback Machine snapshots: `/azure/usa/` of 2025-05-16, `/` of 2026-06-30, sitemap of 2026-05-05, `/about/`, `/msp-awards/`, `/cybersec/` and `/providers/get-listed/` of April-May 2026, the Managed Solution profile of 2026-03-11, `/microsoft/us/` of 2025-07-22 and `/aws/partners/usa/` of 2026-03-12. The live Azure ranking may have changed since.

### Sitemap (source: archived `sitemap.xml`, about 10,746 URLs)
```
/                         MSP search (location, HQ toggle, service/partnership filter, company-name search)
/providers/{id}/{slug}    ~8,978 provider profiles
/msp/{city}               ~181 Top 20 MSPs in {City} pages
/msp-awards/...           ~480 award pages (MSP Select by year/region)
/{vendor}/{region}/       vendor x geography rankings: /azure/{usa|uk|ca|au|ie|fr|nl|ch|scotland|florida}/,
                          /aws/{state|city|country}/, /aws/partners/usa/, /microsoft/{us|...}, /cisco/, /veeam/,
                          /fortinet/, /citrix/, /sophos/, /dell/, /vmware/, /palo-alto/ ... (40+ vendors)
/cybersecurity/{state|country}/   security MSP rankings by geography
/cybersec/{category}/     by security category: data-protection, detection-response, email-security,
                          endpoint-protection, iam-pam, network-firewall, sase, secure-web-gateways,
                          security-awareness-training, siem, web-application-firewall
/topMSPs/{country}/       national top lists   /mssp/  /managed-it/  /pentest/  /sd-wan/  /copilot/
/case-studies/{vendor}/{region}/   Work section
/battlecards/  /events/  /msp-data/  /blog/  /about/  /providers/get-listed/
```
robots.txt allows public pages for `*`. It blocks GPTBot, wget, libwww and some scrapers, and disallows `/tangoplus/` and `/list/`.

### Header & navigation
The menu is flat, with no dropdowns. **Get Listed** (the MSP-facing CTA) sits at top right, followed by **MSPs** · **CyberSec** · **Work** (case studies) · **Awards** · **Events** · **Data** (reports) · **Blog** · **Cybertango** (external) · **About**. On mobile a Menu panel shows the same items, with Data reports spelled out and Get Listed at the bottom. The footer has © notice, cookies, Privacy, Contact, Blog, Data Reports and social links.

### Page structure
**/azure/usa/ Top 50 Microsoft Azure Partners in the United States:**
- An H1 with a Related: Case Studies link to `/case-studies/azure/us/`. There is no intro text and no ranking method is explained. The only disclaimer is at the bottom: the list is a limited selection and readers should run an extended search.
- A single table marked up with schema.org `Service` and 50 `LocalBusiness` rows. Columns: **Company** (logo and name → profile), **Description** (first ~200 characters of the MSP's self-description) with *View Profile* / *Case Studies* (expands up to two case study teasers with hashtags such as #Azure, #Cloud Migration) / *Request Quote* (modal form), **Partners** (vendor list such as Microsoft or VMware, Cisco, Datto…) and **Location** (city, metro, state).
- The quote modal asks for first and last name, company, work email, phone and comments, with a privacy consent line.
- **Who is listed:** a mix of Microsoft-only consultancies and generalist MSPs. Examples: ZAG Technical Services (#1), Managed Solution (#3), Agile IT, 3Cloud (#1 Microsoft Azure partner in its own copy), Avanade (#20), Quisitive, **Atmosera (#25)**, Credera, Synoptek, Ensono, TierPoint and Redapt. Many entries are local break/fix-style MSPs whose descriptions never mention Azure. That suggests the ranking draws on directory profile data and not on verified Azure depth.

**Homepage / search:** the filters are LOCATION (with an HQ-only toggle), **IT SERVICE or PARTNERSHIPS** (one long list) and company name. The service taxonomy includes Application Dev, **AWS**, **Azure**, Backup & Recovery, Cloud Migration, Colocation, CRM, **Cybersecurity**, Data Storage, **DevOps**, Dynamics 365, Email Security, ERP, **GCP**, Identity Management, IT Consulting, Managed IT, Microsoft 365, Modern Workplace, Networking, PaaS/IaaS, Private Cloud, SD-WAN, UCaaS, Virtualization, VoIP and more. About 150 vendor partnerships follow. Results show Company, Description, Services, Partners, HQ and **Reviews** (star score and count).

**Provider profile (e.g. /providers/5821/managed-solution):** name, star rating and review count, a description, a mission statement, and **badges/tags** (MSP Select, company size 20+, client segment SMB/SME, list membership Microsoft 100, vertical Healthcare, certifications SOC 2 Type 1/2), an award blurb, up to four case studies, Services (truncated …and 20 more), Partnerships, Microsoft solution areas (Data & AI, Digital & App Innovation, Infrastructure, Modern Work, Security), HQ, phone, a Visit Website link (tracked redirect), Request Quote and a full list of reviews with a *Write a Review* modal.

**Get Listed form:** the fields show exactly which attributes MSPs are compared on. They are company, logo, description, website, LinkedIn, contact, founded year, **company size band**, **certifications (ISO 27001, ISO 9001, SOC 2 Type 1, SOC 2 Type 2)**, **dominant vertical (>50% of clients: Accounting, Banking/Finance, Education, Government, Healthcare, Hospitality, Legal, Manufacturing, Non-profits, Real Estate, Retail, Technology)**, address, and **vendor partnerships with tier** (e.g. Amazon APN Select/Advanced/Premier, Microsoft levels).

**Awards (/msp-awards/):** MSP Select 2026. The stated focus areas are cybersecurity, support, infrastructure, AI use, business growth and customer satisfaction. No scoring method is published.

### Service categorisation (how the directory classifies MSPs)
- **Clouds:** AWS, Azure and GCP are separate service tags. Each has its own vendor ranking pages, though GCP has no `/gcp/` ranking in the sitemap. Azure has 10 regional lists and AWS has 40+ state, city and country lists.
- **DevOps:** a single service tag. There are no DevOps ranking pages.
- **Security:** its own top-level area, split by country/state (`/cybersecurity/{geo}/`) and by 11 categories (SIEM, SASE, IAM/PAM, etc.), plus MSSP and pentest lists.
- **Compliance:** there is **no compliance taxonomy**. HIPAA, PCI and GDPR are not filters. Compliance shows up only as provider certifications (SOC 2, ISO 27001) and vertical tags (Healthcare, Finance).

### Content & messaging (what it tells us about MSP positioning)
- Buyers compare providers on **vendor partnerships, location, reviews and vertical**, not on methodology. Profiles that name partner tiers, Microsoft solution areas, certifications and case studies with hashtags look stronger.
- MSP self-descriptions in the Azure list are mostly generic (full-service IT, award-winning, Top 1%). Specialists stand out by naming one platform and one outcome. Atmosera's entry, for example, opens with Azure migration, management and optimisation.
- Review counts are low (often under 30), but stars are displayed prominently.
- The quote is "World's largest MSP directory" (homepage title).

### Visual design observations
The archived markup suggests a Foundation-based (`medium-12 columns`, `data-reveal-id`) utilitarian table layout with logo thumbnails. It is a data-first design without marketing styling. We did not view rendered visuals.

### Patterns worth adopting / to avoid
- **Adopt (for our own site and directory profile):** make sure the profile has a complete set of service tags (Azure, AWS, GCP, DevOps, Cybersecurity, Cloud Migration, Identity Management), partner tiers, SOC 2 / ISO certifications, vertical tags and 2 to 4 case studies with platform hashtags. On our own site, mirror the comparison attributes buyers see (partnerships, certifications, verticals, reviews) so they can be checked at a glance. Expose compliance frameworks explicitly, which competitors and directories under-serve.
- **Avoid:** generic full-service self-descriptions; unverifiable superlatives; rankings without a stated method, which we should not lean on as our main proof.

### Limitations
The live pages are blocked by Cloudflare bot protection, so all content comes from Wayback snapshots and may be out of date. The `/azure/usa/` snapshot is from May 2025. Search filters, the review flow and the quote modal are interactive or JS-driven and were read only from markup. We did not view any individual award-year pages or `/msp-data/`.

---

## 4. Caylent (caylent.com)

### Overview
Caylent is an AWS Premier Tier Services Partner. Per its own stats it holds 850+ AWS certifications, 10 AWS Partner of the Year awards and 90+ NPS, and it was named a Major Player in the IDC MarketScape. It sells AWS migration, modernisation, data, generative and agentic AI, and managed cloud operations to enterprises and scale-ups, and it has a growing private equity and public sector line. It now leads with an AI-first delivery story: **Caylent Accelerate™** (agentic delivery for migration and operations with output-based pricing) and a dedicated **Anthropic Consulting & Engineering (ACE)** practice. Offers are packaged as fixed-scope **Caylent Catalysts™**.

### Sitemap (source: `/sitemap.xml`, single file, referenced in robots.txt)
```
/                       Home
/services               Services hub
  /services/{agentic-engineering-and-enablement | aws-foundations-and-migrations | application-modernization |
   customer-experience-transformation | cloud-native-app-dev | cloud-operations-managed-services |
   data-modernization-and-analytics | product-strategy-and-experience | infrastructure-and-dev-ops-modernization |
   modernizing-microsoft-workloads-on-aws | artificial-intelligence-and-ml-ops}
  /generative-ai-aws    (AI Use Case Acceleration)
/industries             Industries hub (industry detail pages live under /services/*)
  /services/{healthcare-and-life-sciences | financial-services | media-and-entertainment | travel-and-hospitality |
   saas-and-isv | energy-power-and-utilities | education-technology | transportation-and-logistics |
   retail-and-advertising-technology | private-equity | public-sector}
/catalysts              By Type: 32 packaged offers  /catalysts/{aws-control-tower | migrate-and-manage |
                        cloudops-core | aiops-platform | cloud-migration-quick-start | disaster-recovery-strategy |
                        vmware-to-aws-strategy | mlops-strategy | llm-ops-strategy | generative-ai-knowledge-base |
                        intelligent-document-processing | serverless-app | network-modernization-strategy ...}
/caylent-accelerate (+ -cloud-migration, -database-modernization, -application-modernization,
                     -agentic-cloud-operations, -for-private-equity, -faq)
/anthropic-consulting-and-engineering   /anthropic   /aws   /partnerships
/how-we-work  /about  /careers  /the-caylien-collective  /contact
/insights  /blog/* (436)  /case-studies  /case-study/* (77)  /events  /aws-events  /reinvent*
/ai-* tools (ai-use-case-navigator, ai-risk-mitigation ...)  /smb  /graviton  /opensearch  /next-gen-infrastructure
/policies /dpa /subprocessors /privacy-policy /terms-of-service /accessibility-statement
```
Compliance URLs: none. SOC 2 and HIPAA appear only in blog posts (`/blog/how-to-prepare-for-soc-2-compliance-…`, `/blog/…hipaa-compliant-ai-solutions`).

### Header & navigation
**JavaScript-rendered.** The server HTML has no `<header>` or `<nav>` element. We rebuilt the menu from the Builder.io `navItems` data in the Next.js flight payload, so the labels are reliable but the visual layout and order of columns is inferred.
- **Announcement bar:** IDC MarketScape Major Player news linking to the blog.
- **Header CTA:** *Get started* → /contact.
- **Top-level items:**
  1. **Anthropic Consulting & Engineering**: a direct link to `/anthropic-consulting-and-engineering`, promoted to the top level.
  2. **Solutions** (mega menu, three groups):
     - *By Service*: Agentic Engineering & Enablement · AWS Foundations & Migrations · Application Modernization · Customer Experience Transformation · Cloud Native App Dev · Cloud Operations & Managed Services · Data Modernization & Analytics · AI Use Case Acceleration · Product Strategy and Experience. (The `/services` hub additionally lists Infrastructure & DevOps Modernization.)
     - *By Industry*: Education Technology · Energy, Power & Utilities · Financial Services · Healthcare & Life Sciences · Media & Entertainment · Private Equity · SaaS & ISV · Travel & Hospitality · Transportation & Logistics.
     - *By Type* (Catalysts): AI Innovation Engine · AWS Control Tower · Build Agentic Products · Intelligent Document Processing · LLMOps Strategy · Migrate off SQL & Oracle · Migrate off VMware · MLOps Strategy · Rewrite Legacy Applications.
     - *Featured:* a Customer Spotlight case study card (Smarsh).
  3. **Resources**: Insights (latest announcements, industry news…), Events, Case Studies, Anthropic Partnership (→ /anthropic). Each link carries a one-line description.
  4. **Company**: About, Partnerships, Careers, each with a one-line description, plus a featured Caylent Accelerate™ item.
- **Footer:** Solutions (By Type of Service / By Industry / By Type), Resources (Insights, Events, Case Studies), Company (About, Partnerships, Careers, DEI Statement, Contact), Legal (Terms, Privacy, Accessibility, Cookie Settings, Do Not Sell), social links (X, LinkedIn, GitHub, TikTok, YouTube) and a newsletter signup (Join Thousands of Cloud Professionals).
- **Mobile nav:** could not be determined because it is rendered client-side.

### Page structure
**Homepage:**
1. Carousel hero with 6 slides: Anthropic Consulting & Engineering; IDC MarketScape; Caylent Accelerate™ for Agentic Cloud Operations; Pronetx acquisition; four 2025 AWS Partner of the Year awards; AWS Consulting & Engineering → Our Services.
2. What We Do, headline "Turning Ideas to Impact. Faster.", with a video and a *How We Work* CTA.
3. Catalyzing Your Cloud Evolution: positioning text and Explore links.
4. Trusted by Global Enterprises & Growing Organizations: an auto-scrolling logo carousel.
5. Testimonial carousel: Indeed, Symmons, BrainBox AI, AWS, Taco Bell, Onyx CenterSource.
6. Customer Stories → View all.
7. Community and credentials: certification, competency and delivery-designation badges, plus stats (10x POY, 850+ certs, 90+ NPS).
8. Recent Announcements & Insights.
9. Final CTA Let's Evolve Together → Get in touch.
10. Newsletter, then footer.

The page has 7 `<video>` elements.

**Services hub (/services):** H1 AWS Cloud Services. Then Why Caylent (outcomes not outputs, a Do With philosophy, AWS frameworks), a grid of 10 service cards, an Applied Intelligence AI-first delivery block, a testimonials carousel with quantified quotes (e.g. 50% lower infrastructure spend), customer stories and the final CTA. The Industries and Catalysts hubs use the **same template**.

**Service page (/services/aws-foundations-and-migrations):** breadcrumb back to Services, H1 and a one-line promise. Then What is it? (cross-cloud migrations from Azure, GCP or VMware, with an Accelerate™ pitch), a CTA, and four proof tiles (2x Global Migration POY; **2,000+ migrations across HIPAA, FedRAMP, SOC2 and PCI environments**; up to 50% faster; output-based engagement), an Accelerate™ explainer, three case study cards, an offer banner (30 days of free managed services after migration), a row of four related Catalyst cards, and an FAQ (pricing model, landing zone vs migration, cross-cloud, post-migration, VMware exits, AWS tooling comparison).

**Service page (/services/infrastructure-and-dev-ops-modernization):** What is it? with benefit bullets, then What we do (containers/serverless, DevOps enablement, CI/CD, observability, cost optimisation, **Security, Compliance & DR guardrails**, network modernisation), How we do it in five numbered steps (Listen → Architect → Modernize → Optimize → Educate), an infographic resource, related case studies, four Catalyst cards and related blog posts.

**Service page (/services/cloud-operations-managed-services):** contrasts itself with reactive MSPs. Four outcome tiles (instant triage, engineering hours redirected, continuous cost optimisation, compounding capacity), a foundation section (12 years of tickets, Amazon Bedrock AgentCore, guardrails & SLOs), a choice of two delivery models (CloudOps Core platform vs custom AIOps build), a team composition list (named AI agents plus lead architect, engineering bench and CSM) and case studies.

**Catalyst page (/catalysts/aws-control-tower):** a promise line, What is it?, four outcome tiles, a five-step approach (Discover & Define → Plan & Design → Build & Validate → Launch & Deploy → Manage & Extend), an **Engagement Deliverables** list, related case studies and more packages. It reads like a productised SOW.

**Industry page (/services/healthcare-and-life-sciences):** an AWS Healthcare Competency claim, four specialisation cards (clinical systems, digital health, analytics, core health IT), an Accelerate™ banner, customer logos, three Catalysts, a whitepaper and a CTA.

**About:** mission, logos, How We Work, story, awards, DEI, a leadership grid with LinkedIn links. **How We Work:** the Caylent Way four-stage model (Strategy → Planning → Prototyping → Execution) and an Explore by Service / Industry / Type switcher. **Contact:** a form (rendered client-side, so the fields were not visible), hello@ email, social links and a careers block.

### Service categorisation
- **Cloud:** AWS only. Azure and GCP appear only as *sources* to migrate away from. Microsoft Workloads on AWS (.NET, MSSQL, licensing) is framed as moving Microsoft estates onto AWS.
- **DevOps:** Infrastructure & DevOps Modernization. There is no DevSecOps label; security guardrails are a bullet inside it.
- **Security / compliance:** **no standalone security or compliance service.** Security shows up as guardrails (Control Tower Catalyst, SCPs, GuardDuty add-ons). Compliance appears as proof points (HIPAA, FedRAMP, SOC2 and PCI environments) and in industry pages.
- **Managed services:** Cloud Operations & Managed Services, with CloudOps Core / AIOps Platform Catalysts and Migrate + Manage.
- **Three-way taxonomy:** By Service / By Industry / By Type (packaged Catalysts). All industry pages sit under `/services/` (URL pattern `/services/{slug}`), offers under `/catalysts/{slug}` and programmes under `/caylent-accelerate-*`.

### Content & messaging
Short, rhythmic headlines ending in Faster. with an evolution metaphor (Catalyze your cloud evolution, Let's Evolve Together). The value propositions are speed, output-based pricing, AI agents together with certified engineers, and quantified outcomes. Trust comes from AWS awards, cert counts, NPS, named enterprise testimonials with metrics, and IDC recognition. CTA wording: Get started, Get in touch, How We Work, Learn More, Get Pricing, Request a Complimentary Analysis. The audience is CTOs and engineering, product and business leaders. One page addresses three personas explicitly (For Engineering / Product / Business Leaders). The quote is "Turning Ideas to Impact. Faster." (homepage).

### Visual design observations
Built with Next.js and Builder.io, with heavy use of video and carousels (hero, logos, testimonials). Font and colour tokens are not exposed in the HTML we fetched. We cannot judge visuals beyond the component types: carousel hero, video, icon tiles, card grids, numbered steps and FAQ accordion.

### Patterns worth adopting / to avoid
- **Adopt:** a Solutions mega menu split three ways (Service / Industry / Packaged offer); one-line descriptions under every menu link; a featured customer card in the menu; productised offers with an approach, a deliverables list and an FAQ; four proof tiles on each service page; Related Catalysts cross-sell rows; persona-specific value blocks; one reused hub template for Services, Industries and Packages.
- **Avoid:** a JS-only navigation that crawlers and no-JS users cannot see; industry pages under `/services/`, which muddles the URL taxonomy; no security or compliance pillar (a gap for us, and our opportunity); carousel heroes that hide the main proposition behind rotating news.

### Limitations
The header menu, contact form fields, case study listing (Loading case studies...) and the Catalyst listing (Loading solutions...) are rendered client-side. The menu was reconstructed from embedded JSON, so column order and layout are inferred. Mobile navigation and visuals were not observable. We did not read blog or case study detail pages.

---

## 5. Cross-site comparison

Ratings are Strong / Moderate / Weak / Not offered. For Cloudtango, the rating reflects how well the directory *covers or surfaces* each topic, since it does not deliver services.

| Dimension | Atmosera | Managed Solution | Cloudtango (directory) | Caylent |
|---|---|---|---|---|
| Cloud consulting | **Strong**: five-pillar lifecycle with migration, adoption, optimisation and managed Azure pages. | **Moderate**: Azure managed services and migration landing pages, but help-desk-led. | **Moderate**: Cloud Migration/IaaS/PaaS tags and vendor rankings, with no depth signals. | **Strong**: 10+ services, packaged Catalysts and quantified migration proof. |
| Azure | **Strong**: whole site is Azure-only, with Expert MSP status and specialisations. | **Moderate**: one Azure page mixed with M365 and partner badges. | **Moderate**: dedicated Top 50 Azure lists in 10 regions, but generic MSPs dominate them. | **Not offered**: Azure appears only as a migration source. |
| AWS | **Not offered**: no AWS content found. | **Not offered**: no AWS pages. | **Moderate**: AWS tag plus 40+ geographic AWS ranking pages. | **Strong**: Premier Tier, 850+ certs, AWS-native services throughout. |
| Google Cloud | **Not offered**. | **Not offered**. | **Weak**: GCP is a search tag only, with no GCP ranking pages in the sitemap. | **Not offered**: GCP appears only as a migration source. |
| DevOps | **Strong**: GitHub-centred DevOps page with ADO→GitHub offer and training. | **Not offered**. | **Weak**: a single DevOps filter tag. | **Moderate**: Infrastructure & DevOps Modernization covers CI/CD, containers and observability. |
| DevSecOps | **Strong**: dedicated page with features, methodology and named frameworks. | **Not offered**. | **Not offered**: no tag or list. | **Weak**: security guardrails are only a bullet under DevOps. |
| Cybersecurity | **Strong**: Protect pillar (cloud, edge, IAM, apps, data) plus managed security. | **Moderate**: managed security, Microsoft security and products, but scattered and generic. | **Strong**: a dedicated security area by geography and 11 categories, plus MSSP/pentest lists. | **Weak**: no security service; only Control Tower guardrails. |
| Compliance | **Moderate**: one managed-compliance page with a six-step roadmap; frameworks named only in copy. | **Moderate**: vCISO page listing nine regulations including PIPEDA, plus deliverables; no framework pages. | **Weak**: no compliance taxonomy; only SOC 2/ISO certification and vertical tags. | **Weak**: HIPAA/FedRAMP/SOC2/PCI only as proof points and in blogs. |
| Enterprise solutions | **Moderate**: Fortune 100, SAP and public sector case studies; enterprise tone; no enterprise packaging. | **Weak**: targets 100+ users mid-market; pricing tiers per user. | **Weak**: segment tags are SMB/SME; lists mix enterprise SIs with local MSPs. | **Strong**: enterprise testimonials, PE and public sector lines, IDC recognition, productised SOW-style offers. |
| Content strategy | **Moderate**: large library (234 posts, 176 videos, 34 data sheets, training catalogue) undercut by duplicate SEO pages and placeholders. | **Moderate**: blog, eGuides, webinars and datasheets, but templated city pages and inconsistent stats. | **Moderate**: programmatic vendor × geography pages and case study hashtags; thin editorial content. | **Strong**: 436 posts, 77 case studies, a consistent hub template, FAQs and Catalyst cross-links. |
| Visual experience | **Moderate (inferred)**: navy/orange palette, carousels and alternating rows; not visually verified. | **Weak (inferred)**: badge and review-heavy, stock photography; not visually verified. | **Weak**: utilitarian data tables (by design). | **Moderate (inferred)**: video and carousel-rich modern stack; not visually verified, and the JS-only nav hurts robustness. |

**Overall takeaway for our IA.** No reference site covers all three clouds plus DevSecOps plus compliance with pages per framework. Atmosera is the best model for a security- and compliance-inclusive lifecycle mega menu. Caylent is the best model for a three-way Solutions taxonomy (Service / Industry / Packaged offer) and for productised offer pages. Managed Solution shows the value of a utility bar and a regulations explainer, and also the cost of overlapping top-level menus. Cloudtango shows the attributes buyers actually compare: partnerships with tiers, certifications, verticals, reviews and case studies tagged by platform. Our gap to fill is dedicated HIPAA, GDPR, PCI DSS and PIPEDA readiness pages under a single Compliance group, alongside multi-cloud (Azure, AWS, GCP) platform pages.
