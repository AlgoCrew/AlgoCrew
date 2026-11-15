# 02b — Reference sites: Avanade, Accenture, Slalom, Deloitte

Research date: 2026-11-11. Purpose: learn information architecture, navigation, content hierarchy and service presentation from four large consultancies, to inform the repositioning as a specialist Cloud (Azure/AWS/GCP), DevOps/DevSecOps, Cloud Security and Compliance-readiness (HIPAA, GDPR, PCI DSS, PIPEDA) consultancy. These are references only, not templates to copy.

## Method and evidence

- Every page was fetched live over HTTP with a desktop browser user agent (`curl`). No site blocked the requests: all returned HTTP 200 with server-rendered markup.
- Navigation was extracted from the HTML itself: for Accenture, Slalom and Deloitte, the mega menus are in the server-rendered `<nav>` markup. Avanade is a Next.js / Sitecore XM Cloud app whose HTML holds only 2 `<a>` tags, so its menu and page content were read from the embedded `__NEXT_DATA__` JSON (the layout data the page renders from).
- Sitemaps were found through `robots.txt` and their child sitemaps were downloaded: Avanade (index of 31 child sitemaps, 653 `/en-us/` URLs), Accenture (`sitemap-index.xml` → `/us-en/sitemap.xml` with 449 URLs and `/en/sitemap.xml` with 1,486 URLs), Slalom (`us-sitemap.xml`, 756 URLs), Deloitte (`sitemap_index.xml` → `sitemap_us_en.xml`, 9,571 URLs).
- I could not see rendered visuals (no screenshots). Visual notes come only from the markup, image alt text, component names and the colour and font values in each site's CSS. They are labelled as such.
- Pages fetched: Avanade 15, Accenture 13, Slalom 13, Deloitte 15 (listed under each site's Limitations).

---

## 1. Avanade — avanade.com/en-us

### Overview
Avanade was founded by Microsoft and Accenture and is majority-owned by Accenture. It is a Microsoft-only partner aimed at enterprise CIOs and IT and business leaders. The site positions it as the largest dedicated Microsoft workforce and as Microsoft's "Client Zero". Every service (cloud, security, data and AI, business applications, managed services) is framed through the Microsoft ecosystem: Azure, Dynamics 365, Power Platform, Microsoft Security, Copilot and Fabric. The site does not present AWS or GCP. The tagline, used in the logo lockup and the footer, is "Do what matters".

### Sitemap (source: sitemap.xml index of 31 children, filtered to `/en-us/`; cross-checked against the nav JSON)
```
/en-us/                                   Home
├── /industry/{13 industries}              (automotive, banking, capital-markets, consumer-goods, energy,
│                                           government-and-public-services, health, insurance, life-sciences,
│                                           manufacturing, nonprofit, retail, utilities) + campaign sub-pages
├── /services/                             (hub URL 301-redirects to home; 133 service URLs in the sitemap)
│   ├── cloud/ (avanade-cloud-impact, build-and-modernize-applications, mainframe-modernization)
│   ├── security                            "AI-Powered Security & Cyber Resilience"
│   ├── microsoft-tech/                     Microsoft Technology Services hub children:
│   │   ├── cloud-and-applications/ (ai-ready-cloud, azure-vmware-solution, linux-ai-readiness,
│   │   │                            mainframe-to-azure, modernization-services, vmware-migration)
│   │   ├── microsoft-security/ (advanced-identity, ai-cyber-defense, copilot-readiness-assessment, threat-protection)
│   │   ├── analytics-data-and-ai/, intelligent-business-applications/, microsoft-power-platform/,
│   │   └── modern-workplace/, emerging-tech
│   ├── managed-services/ (azure-expert-msp)
│   ├── integrated-solutions/ (cyber-resilience/{idc-leader, security-risk-assessment}, ai-readiness,
│   │                           modernized-cloud-data-and-ai, future-of-work, smart-manufacturing, ...)
│   ├── pre-packaged-solutions/ (avanade-cloud-move, avanade-accelerated-erp, intelligent-security-operations, ...)
│   ├── artificial-intelligence/, agentic-ai-platform, ai-workforce/, data-ai-transformation/,
│   ├── business-applications/, experiences, avanade-x/, avanade-advisory, tech-partnerships/{adobe, databricks, ...}
├── /insights/ (clients/ 212 client stories, articles/ 140, events/ 23, research report microsites)
├── /newsroom/ (65)
├── /career/ (12)
├── /about/ (leadership, responsible-business, trust-center/{vulnerability-disclosure})
├── /contact, /office-locations
└── /utility/ (privacy, terms, accessibility, code-of-business-ethics, sitemap, trademarks ...)
```
Two URLs in the nav, `/en-us/services` and `/en-us/industry`, return a 301 redirect to the homepage, so the top-level menu labels have no real landing pages. The old URL `/services/microsoft-tech/microsoft-security` redirects to `/services/security`, and `/microsoft-tech/cloud-and-applications` redirects to `/services/cloud`.

### Header & navigation (from the `Navigation` component in `__NEXT_DATA__`)
The utility row and the main row are built as separate components: logo, an "agentic search" header, the main navigation, a Contact Us button and a country/site selector.

| Top-level item | Dropdown links (in order) |
|---|---|
| Industries | Automotive, Banking, Capital Markets, Consumer Goods, Energy, Government and Public Services, Healthcare, Insurance, Life Sciences, Manufacturing, Nonprofit, Retail, Utilities |
| Services | Cloud; AI-Powered Security & Cyber Resilience; Business Applications; AI Workforce; Data and AI Transformation; Experiences; Microsoft Technology Services; Managed Services; Artificial Intelligence; Avanade Agentic Platform; Pre-packaged Solutions |
| Insights | Client Success Stories, Events |
| Careers | Area of Expertise, Countdown to Avanade, Limitless Learning, Inclusion and Diversity, Life at Avanade, Benefits and Total Rewards, Search jobs |
| About | Leadership, Responsible Business |

- The menu has two levels only. The data contains no groups, featured cards or images, so it is a simple list dropdown, not a rich mega menu.
- CTA: a persistent "Contact Us" button that opens a contact popover form ("Doing what matters starts here"). The same popover also lists press contacts and the three regional headquarters.
- Utility: an AI "agentic search" box with suggested prompts (for example, AI capabilities, how to apply for jobs, which industries are served), plus a country selector with 23 locales.
- Mobile nav: cannot be determined. It is rendered client-side and the data holds no mobile-specific structure.

### Page structure
**Homepage (`/en-us`)**
1. Hero: the "Do what matters" headline, a paragraph tying the brand to AI value ("Build Beyond Limits" research campaign) and a video.
2. Announcements carousel: Agentic Platform, GitHub Global SI Partner of the Year award, Pre-packaged Solutions, Accelerated ERP. Each slide has a "Learn more" link.
3. Positioning statement, "Advancing the world through the power of people and Microsoft", followed by a paragraph that lists Copilot agents, AI-ready data, cloud modernization, cyber resilience and ERP.
4. Client story carousel: Mammut, EQ Bank, Fater, each with a logo and a "Read more" link.
5. Three image-and-text bands (component `Timage`): Industry ("Industry fluency, Microsoft depth"), Services ("Services built for real world impact") and Insights, each with an "Explore…" CTA.
6. "The Avanade Story" banner (founded by Microsoft and Accenture), then a metrics block: 20X Microsoft Global SI Partner of the Year, 7K+ organisations, 60K specialists, 165K Microsoft certifications.
7. Careers banner, then "In the news" cards (3).
8. Footer: logo and tagline; Insights, Career, About, Events; Newsroom, Trust Center, Vulnerability disclosure, Locations; LinkedIn, YouTube and Instagram; legal row.

**Cloud service page (`/services/cloud`)**: a template shared by Security and Managed Services.
Hero (title, one-line promise, "Talk to us" anchor CTA) → sticky jump links (Our approach / What you can achieve / Our capabilities / Client stories / Contact us / FAQs) → "Cloud as the foundation for change" banner → "The Avanade advantage in cloud" (3 proof points) → outcome carousel ("Wherever you are in your cloud journey": foundation, intelligence, continuous growth) → capability accordion (Cloud Impact assessment, Build and Modernize Applications, Mainframe Modernization, Cloud Move), each with an "Explore" link → testimonial (CIO quote) → client-story carousel (Centrica, EDF, Crelan, Zurich) → inline "Want to talk to an expert?" form → partner logo line → FAQ accordion (5 questions, one on hybrid and regulated environments) → footer.

**Security page (`/services/security`)**: same template. The proof section, "Proven at scale", cites all 6 Microsoft solution partner designations, 2X Zero Trust Champion and 20X GSI Partner of the Year. The capability accordion covers Optimized Cyber Resilience, Unified Threat Protection, Manage and Evolve (managed SOC), Security and AI (Security Copilot) and Advanced Identity. A Siemens testimonial follows, then client stories (EDF, Crelan, Siemens), the form and 4 FAQs.

**Managed Services (`/services/managed-services`)**: the "Manage and Evolve" proposition and capability accordion: Azure Cloud Support as a Service (24/7 incident support plus 8x5 coverage), Dynamics 365 as a Service, Apps and Infra, Data and AI, Modern Workplace, Security, Sitecore. Also a Cloud Solutions Provider (licensing) block and 5 FAQs on transition and scaling.

**Cyber Resilience (`/integrated-solutions/cyber-resilience`)**: an older template. It has a hero carousel with an IDC MarketScape Leader badge. Its accordion includes "Compliance and regulatory" (GRC risk assessment, gap analysis, compliance maturity tools), the only explicit compliance content found. Client stories follow.

**Industry: Healthcare (`/industry/health`)**: hero → problem banner → scrolling accordion of 9 outcome cards → metrics (41 of the top 100 hospitals, 21 of the 25 largest US health plans) → client stories → "Expert spotlight" cards (Copilot for Security in Healthcare guide, research report, video) → form.

**Trust Center (`/about/trust-center`)**: a CISO quote, security and privacy workforce, controls, Microsoft expertise, and metrics. It is a strong trust page, but it covers Avanade's own posture rather than a client service.

**Insights**: a Coveo search page with facets for Industry, Topic and Content Type, sorted by date. The result list is loaded client-side and was not visible.

### Service categorisation
- Cloud sits under `/services/cloud/*` (modernisation-led: assessment, app modernisation, mainframe, migration). Azure-specific offers sit separately under `/services/microsoft-tech/cloud-and-applications/*` (Azure VMware Solution, mainframe-to-Azure, VMware migration). The site has two cloud taxonomies, one outcome-based and one Microsoft-product-based, and old URLs redirect between them.
- AWS and GCP: none. Partners other than Microsoft are under `/services/tech-partnerships/` (Adobe, Databricks, Profisee, Sitecore).
- Security: `/services/security`, plus Microsoft Security products under `/microsoft-tech/microsoft-security/*`, plus `/integrated-solutions/cyber-resilience`.
- DevOps / DevSecOps: no dedicated page or nav label. "GitHub" appears only as an award.
- Compliance: no dedicated page. It appears as one accordion item ("Compliance and regulatory") and as sovereignty and regulation mentions in FAQs. HIPAA, GDPR and PCI are not named on the pages read.
- Managed services: `/services/managed-services/*`, with an Azure Expert MSP sub-page.
- "Pre-packaged Solutions" (`/services/pre-packaged-solutions/*`) are productised fixed-scope offers (Cloud Move, Accelerated ERP, Intelligent Security Operations).

### Content & messaging
- Headlines are short and declarative (Cloud, Security, Managed services), followed by a one-sentence benefit. Section headers are written as outcomes ("What you can achieve", "Services built for real world impact").
- Value propositions: Microsoft depth, AI readiness ("cloud as your foundation for AI"), the "Manage and Evolve" idea of continuous improvement rather than keep-the-lights-on, and right-sized, practical delivery.
- Trust language is award- and metric-heavy (20X Partner of the Year, 60K specialists, all six Microsoft designations), backed by named-client stories with logos and named executive testimonials.
- CTA wording: "Talk to us", "Explore", "Read more", "View Case Study", "Want to talk to an expert?", "Speak with a CSP expert".
- Audience: enterprise IT and business leaders already invested in Microsoft. FAQ copy targets objections about regulated and hybrid environments, migration value and AI scaling.

### Visual design observations (from CSS and component names; visuals not seen)
- Brand colours in CSS: orange `#ff5800` and magenta `#ce0569` (dominant), dark `#9b044f`, near-black `#1c1c1c` and light grey `#f5f7fa` backgrounds. Font stack: Segoe UI, then Open Sans and Roboto.
- Decorative SVG "logolines" and curved section dividers (`top-curvature.svg`, `timage-top-gray-substract.svg`) separate bands, which suggests an organic, curved section style.
- Heavy use of carousels, accordions and image-text bands. A "Metric" component is used for stats.

### Patterns worth adopting
- One reusable service-page template: hero + CTA → sticky jump links → approach → outcomes → capability accordion → testimonial → case studies → inline form → FAQ. This suits a small team because every service page is built the same way.
- An inline contact form on every service page, plus a global contact popover.
- FAQ blocks that answer buyer objections; regulated and hybrid environments map directly to our compliance angle.
- A Trust Center page. For a compliance-focused consultancy, publishing our own security and privacy posture is a credibility lever.
- Productised, fixed-scope offers (for example a "Cloud Move" style package). For us: an Azure Landing Zone package, a HIPAA readiness assessment, a DevSecOps pipeline hardening package.

### Patterns to avoid
- Nav labels that redirect to the homepage (`/services`, `/industry`). Every top-level item needs a real hub page.
- Two overlapping service taxonomies (outcome-based vs Microsoft-product-based) with redirects between them, which confuses both users and search engines.
- Eleven Services items in a flat list with no grouping, mixing products (Agentic Platform), offer types (Pre-packaged) and capabilities.
- Metric-heavy proof (60K people, 20X awards) does not scale down to a small firm. Use specific outcomes and certifications instead.

### Limitations
- Pages read (15): home, services/cloud, services/security, microsoft-technology-services, managed-services, managed-services/azure-expert-msp (body content was mostly empty in the data), industry/health, insights, contact (form only, no body content in the data), about/trust-center, integrated-solutions/cyber-resilience, plus services, industry, microsoft-security and cloud-and-applications, which redirected.
- Hover and animation behaviour, mobile menu, rendered visuals and Coveo search results were not observable. The contact form's field list is not in the layout data.

---

## 2. Accenture — accenture.com/en/services/cloud (cloud area plus global header)

### Overview
Accenture is a global professional-services firm that sells "reinvention" to C-suite buyers across every function and industry. Cloud is one of 19 capability areas. On the cloud page it is positioned as the engine of AI ("AI at scale depends on cloud at scale.") and sold through statistics, analyst rankings and hyperscaler alliances (AWS, Google Cloud, Microsoft and ServiceNow on the cloud page).

### Sitemap (source: `/en/sitemap.xml`, 1,486 URLs, and `/us-en/sitemap.xml`, 449 URLs, via `sitemap-index.xml`)
```
/en
├── /services/ (19 capabilities)
│   ├── cloud/ application-transformation/{application-modernization, quality-engineering, genwizard, ...},
│   │          cloud-strategy-design, modernization-services, technology-sovereignty, mainframe-services,
│   │          cloud-security, edge-computing, product-platform-engineering, network/, cloud-infrastructure/,
│   │          infrastructure-modernization, infrastructure-managed-services, application-managed-services
│   ├── cybersecurity/ cyber-strategy/{cybersecurity-as-a-service}, cyber-resilience/{mxdr, cyber-response-crisis-management},
│   │                  cyber-protection/{zero-trust, secure-ai, deepfakes, mysecurity}, cyber-industry,
│   │                  cybersecurity-centers, physical-security (labelled "Operational Tech Security")
│   ├── ecosystem-partners/ aws/{vmware-to-aws-migration/...}, google-cloud, microsoft, servicenow, oracle, sap,
│   │                       salesforce, cyberark, palo-alto-networks, sailpoint, anthropic, openai, nvidia, ... (~25)
│   ├── finance-risk/ risk-compliance, enterprise-performance-management, finance-platform-transformation
│   ├── managed-services/ (business-process operations: finance, talent-hr, trust-safety, ...)
│   └── ai-data, strategy, technology-transformation, emerging-technology/{quantum-security}, ...
├── /industries/ (20)
├── /insights/ (405), /blogs/ (188), /case-studies/ (254), /explainers/ (40), /podcast/
├── /products/ (29)
├── /edge/ (mid-market brand "Accenture Edge": services/cloud-infrastructure, services/cybersecurity/{managed-xdr, ...})
├── /about/ (contact-us, leadership, location, awards-recognition, company-index, ...)
└── /us-en/careers/...
```

### Header & navigation (global header, server-rendered on every page)
| Top-level | Panel groups and links |
|---|---|
| Services ▸ | Header link "Services" (`/en/services`). **Capabilities** (19): Artificial Intelligence and Data, Cloud, Customer Service, Cybersecurity, Digital Engineering and Manufacturing, Ecosystem Partners, Emerging Technology, Finance and Risk Management, Infrastructure and Capital Projects, Learning, Managed Services, Marketing and Experience, Metaverse, Sales and Commerce, Strategy, Supply Chain, Sustainability, Talent and Organization, Technology Transformation. **Industries** (20): Aerospace and Defense … Utilities |
| Products | direct link |
| Insights | direct link |
| About Us ▸ | "About Accenture". **Our organization**: Reinvention Services, Leaders, Locations, Value Report, Awards & Industry Recognition. **Our network**: Accenture Construct, Accenture Edge, Accenture LearnVantage. **Our joint ventures & investments**: Avanade, DLB, Dragos, Faculty, Ookla. **Media & Investors**: Media Relations, Investor Relations, Board of Directors |
| Careers ▸ | Careers homepage. **Find a job**: Search for jobs, Career areas. **Life at Accenture**: Work and impact, Benefits, Culture. **How we hire**: Using AI, Hiring journey, Pro tips |

- Industries sits inside the Services panel as a second column group, not as its own top-level item. This keeps the top bar at five items.
- Utility nav: Contact Us, Careers, Locations; LinkedIn, Facebook and Instagram; Search; a country/language selector ("Current Country: United States", around 50 countries).
- No featured content cards or CTA button in the mega menu markup; it is text lists only.
- Mobile: the markup has "Menu", "Close Menu" and "Back" buttons, which indicates a drill-down, panel-by-panel mobile menu.
- In-page sub-nav: each capability page has a sticky secondary bar (for Cloud: What to do / What's trending / Partners / Leaders / Careers) with a collapsed "Expand Menu" version.

### Page structure
**Cloud (`/en/services/cloud`)**
1. Sub-nav bar, then H1 "Cloud consulting services" and the H2 value line (AI depends on cloud).
2. "Cloud now" statistics band: 51% of front-runners' tech budgets go to cloud and AI; $805B public cloud spend; only 13% are confident in their data strategy.
3. "Reinvent with cloud": 10 expandable cards, each with a statistic, an H3 benefit headline and "Learn more" (Modernization Services, Application Transformation, Cloud Strategy and Design, Technology Sovereignty, Mainframe, Cloud Security, Edge Computing, Product and Platform Engineering, Network, Cloud Infrastructure).
4. "What's trending with cloud?": a carousel mixing Research Reports, a Case Study (TotalEnergies) and a Blog, plus "View all work" (a filtered insights index).
5. "Partners in change": AWS, Google, Microsoft and ServiceNow logos, each with a paragraph and "Learn more".
6. "Awards and recognition": toggle cards (6x Gartner MQ Public Cloud leader, IDC, Forrester, Everest Google Cloud PEAK, and others).
7. "Our leaders": 5 named leaders with titles and LinkedIn links.
8. Cloud careers CTA ("Search open roles"), then the footer.

**Cybersecurity (`/en/services/cybersecurity`)**: same template. Hero; news feature (utilities cyber foundation); "Cybersecurity now" stats; "Reinvent with cybersecurity" cards (Cyber Strategy, Cyber Resilience, Cyber Protection, Quantum Security, Operational Tech Security, Cyber Industry, Cybersecurity Centers); trending carousel; a 23-logo partner wall (CrowdStrike, Wiz, Zscaler, Okta and others); awards, including an IDC Cybersecurity GRC Leader; leaders by region; careers.

**Cloud Security (`/en/services/cloud/cloud-security`)**: an L2 template. Breadcrumb (Cloud / Cloud security); sub-nav (The imperative / What you can do / What you'll achieve / What's trending); H1 plus an "Operate with confidence…" H2; data band (41% cite security and compliance risk as a top-3 cloud barrier); "What you can do" accordion (security by design, digital core, workforce); "What you'll achieve" (4 outcomes, including adapting to regulatory change); trending.

**Ecosystem partner pages (`/ecosystem-partners/aws`, `/google-cloud`, `/microsoft`)**: breadcrumb; H1 "Accenture + AWS" (or "+ Google Cloud", "+ Microsoft"); "Why work with us?" with partner metrics (20k+ AWS-certified professionals, 30k+ credentials); a solution-themes carousel (mainframe, modernisation, data); partnership spotlight (re:Invent event, case studies); news; partner awards; partner leaders; careers. The Google page adds "Reinvent your industry" (Google Cloud for retail, banking and others), Marketplace listing, joint offerings (Google SecOps, agentic SOC) and 26X partner awards.

**Risk and compliance (`/finance-risk/risk-compliance`)**: H1 "Risk consulting"; CRO survey stats; accordion of 8 "What you can do" items (regulatory change, controls, reporting, fraud, KYC/AML, credit risk), each with a stat; quantified outcomes. It is aimed at CROs in financial services, not at IT compliance frameworks.

**Contact (`/about/contact-us`)**: H1 "How can we help?". Audience routing cards (Clients, Job seekers, Ecosystem partners, Investors, Media, Suppliers, Former employees, Current employees), then a form whose first field, "Inquiry Type", routes the request (new or current client RFI/RFP, and others).

**Home (`/en`)**: H1 "Together We Reinvented"; research carousel; CEO quote; client spotlight video series; awards; careers; news ticker.

### Service categorisation
- Cloud: `/services/cloud/{offering}` with up to 3 levels (`/application-transformation/quality-engineering`). Offerings are named as capabilities (Modernization, Application Transformation, Cloud Strategy and Design, Cloud Security, Network, Infrastructure, Platform Engineering).
- Azure, AWS and GCP: `/services/ecosystem-partners/{aws|google-cloud|microsoft}`. They sit outside the cloud tree, are grouped with SaaS and AI vendors, and are linked from a cloud-page "Partners" band. Migration offers sit under the partner (`/ecosystem-partners/aws/vmware-to-aws-migration`).
- DevOps: no page titled DevOps. The closest are "Product and Platform Engineering" and "Application Transformation › Quality Engineering". DevSecOps is not a label.
- Cybersecurity: its own capability (`/services/cybersecurity/*`) with strategy, resilience, protection and industry groupings. Cloud security is duplicated under cloud.
- Compliance: split across `/finance-risk/risk-compliance` (financial and regulatory risk), Cybersecurity GRC (an award mention) and Technology Sovereignty. Named frameworks such as HIPAA, GDPR or PCI were not visible on the pages read.
- Managed services: `/services/managed-services` is business-process operations. Infrastructure and application managed services live under cloud (`/cloud/infrastructure-managed-services`). Mid-market managed security sits under the separate Edge brand (`/edge/services/cybersecurity/managed-extended-detection-response`).

### Content & messaging
- Headline pattern: a statistic first, then a benefit headline ("25-40% of enterprise cloud spend goes to modernization", then "Update your cloud foundation to power AI"). Almost every card leads with a number.
- Vocabulary: reinvention, digital core, AI-ready, sovereignty, resilience, front-runners.
- Trust: analyst quadrants (Gartner, IDC, Forrester, Everest), partner awards, named leaders with LinkedIn, logo walls, proprietary research.
- CTA wording: "Learn more", "View all work", "Explore more", "Search open roles". No contact CTA appears on the cloud page body; contact is only in the utility nav and footer.
- Audience: C-suite and CIO/CISO/CRO at the largest enterprises. Copy speaks to strategy more than implementation.

### Visual design observations (from CSS; visuals not seen)
- CSS colours: Accenture purple `#a100ff` (dominant), deep purple `#460073` and `#7500c0`, near-black `#202020`, greys, accent coral `#ff5757` and orange `#ff7800`.
- Fonts: Graphik (sans) and GT Sectra Fine (serif, for editorial headlines).
- Component class names (`rad-*`) show a design system: sub-nav bar, toggle "awards cards", expandable flip cards ("Learn more" / "Close"), carousels with "Expand" controls, data/stat bands.

### Patterns worth adopting
- A sticky in-page sub-nav on long service pages (What to do / Trending / Partners / Leaders).
- Industries nested inside the Services mega panel, which keeps the top bar short. Useful if we keep a short industry list (Healthcare for HIPAA, Financial and Payments for PCI, Public sector).
- A stat-led capability card ("41% cite security and compliance risk as a top-3 cloud barrier"). We can use credible third-party stats per service, with sources.
- Partner pages as "Firm + AWS" / "Firm + Microsoft" / "Firm + Google Cloud", each with certifications count, solution themes, case studies and named leads. This maps directly onto our Azure, AWS and GCP pages.
- Breadcrumbs on L2 pages (Cloud / Cloud security).
- Audience-routing contact page with an "Inquiry type" field.

### Patterns to avoid
- A 19-item capability list and 20 industries: far too broad for a specialist. Our nav should show 5–7 services.
- Hyperscaler pages detached from the cloud tree (under "Ecosystem partners" with SaaS vendors), which makes "Azure consulting" harder to find.
- No contact CTA in the main cloud page body. A smaller firm needs a CTA in every section that converts.
- Statistics that cannot be verified at our scale, or awards we do not hold. Do not imitate the analyst-badge wall.

### Limitations
- Pages read (13): /en (home), /en/services, /en/services/cloud, cloud/cloud-security, cloud/product-platform-engineering, cybersecurity, ecosystem-partners/microsoft (only partly parsed), aws, google-cloud (headings), finance-risk/risk-compliance, industries/health (headings), insights (headings), about/contact-us.
- The contact URL was redirected by geo-IP to `/us-en/about/contact-us?country=PK`. Content may vary by country.
- The Insights page renders its result lists client-side; only the section headings were visible. The mega menu's hover and animation behaviour and the visuals were not observable.

---

## 3. Slalom — slalom.com/us/en

### Overview
Slalom is a business and technology consultancy, privately held, that brands itself as "fiercely human". It is mid-to-large, with strong regional presence and buyers in enterprise and upper mid-market. It sells 12 service areas across strategy, data, AI, cloud and product building, backed by 700+ technology partners (AWS, Microsoft, Google Cloud, Salesforce, Snowflake and others). The tone is warmer and more personal than Accenture or Deloitte, with people, testimonials and storytelling to the fore.

### Sitemap (source: robots.txt → `us-sitemap.xml`, 756 URLs)
```
/us/en
├── /services/ (12) strategy, data, artificial-intelligence/{ai-transformation/{aws, google, microsoft-and-databricks},
│                    agentforce, ai-accelerated-engineering, enhanceiq}, cloud/{legacy-modernization/
│                    {application-modernization/ + ~18 Q&A guide pages, snowflake-modernization-guide, salesforce-hubbl}},
│                    systems-implementation, experience-strategy-design, digital-product-building, planning-delivery,
│                    organizational-change-talent, sustainability, operations, privacy-security,
│                    future-of-marketing, zero-legacy-guide
├── /industries/ (8 groups) financial-services, healthcare-life-sciences, manufacturing, media-communications,
│                    public-social-impact/{federal/sewp}, resources, retail-consumer, technology
├── /insights/ (181), /customer-stories/ (171), /blog/ (35)
├── /who-we-are/ (282) partners/{aws, microsoft, google-cloud, salesforce, snowflake, databricks, ...},
│                    leadership, our-people, newsroom/, locations/, environmental-impact, community-impact
├── /careers, /values
└── /legal/ (21)
```
Application modernisation has about 18 long-tail "question" pages (for example, how to choose a modernisation partner, roadmap, pricing and value, best practices). This is an explicit SEO and AEO content cluster under the service URL.

### Header & navigation (server-rendered `cmp-main-navigation`)
| Top-level | Mega menu content |
|---|---|
| Services ▸ | 12 service columns. Each title links to its page and has 3 descriptive sub-labels (not separate links): **Strategy** (Business strategy, Customer strategy, Data & technology strategy) · **Data** (Engineering & architecture, Management & governance, Literacy & analytics) · **Artificial intelligence** (Machine learning, Generative AI, Intelligent products) · **Cloud** (Migration & modernization, Optimization, Infrastructure) · **Systems implementation** (Customer applications, Business applications, Integration) · **Experience strategy & design** (3) · **Digital product building** (Product engineering, Platform engineering, Data engineering & ML) · **Planning & delivery** (3) · **Organizational change & talent** (3) · **Sustainability** (3) · **Operations** (3) · **Privacy & security** (Governance, risk & compliance; Data privacy; Security). Footer link: "Explore all services" |
| Industries ▸ | 8 groups, each with 3–5 sub-segments: Energy & natural resources; Financial services; Healthcare & life sciences (Consumer health & wellness, Healthcare payer, Healthcare provider, MedTech & services, Pharma/biotech); Media & communications; Manufacturing, distribution & logistics; Public & social impact (Federal, State & local, Education, Nonprofit); Retail & consumer goods; Technology. "Explore all industries" |
| Insights | direct link |
| Stories | direct link (customer stories) |
| Who we are ▸ | Overview, Our people, Our partners, Environmental impact, Our core values, Community impact, Awards & recognition, Impact report, Our leaders, Newsroom, Our locations (12 countries) |
| Careers | direct link |

- Primary CTA in the header: a "Let's talk" button that anchors to a global form (`#lets_talk_form`), present at the foot of every page.
- Utility: language/country navigation (11 countries) and a search overlay.
- The mega menu has no featured content cards. Its distinctive feature is the 3-line descriptor under each service, which tells the reader what the service covers without adding more links.
- Mobile: not determinable from the markup; the logo is duplicated, which suggests a separate mobile header.

### Page structure
**Homepage**
1. Video hero carousel (5 slides: AI in motion, future of marketing, AI Accelerate Teams, AI research report, legacy modernisation), each slide with 1–3 CTAs ("Watch video", "See solutions", "Read story").
2. Positioning line (H3: a human, outcome-led consultancy).
3. Four feature tiles: AI consulting, AI research, AI webinar, a Siemens story.
4. "Explore our stories & insights" carousel of 9 cards, each tagged with type (Customer Story / Article / Insight), industry and read time.
5. "What our customers say": 4 named testimonials with title and company logo.
6. Purpose statement, then "The Slalom experience": End-to-end services, Industry know-how, Exponential impact (700+ partners), New and noteworthy (news).
7. "Let's build together" CTA, the global "Let's talk about your next big project" form (name, email, phone, company, title, country, city, message, two consent boxes), and the footer.
8. Footer: Quick links (AI transformation, Marketing, Legacy modernization, Newsroom, Blog), locations, social, legal, and the "Fiercely Human Consulting" tagline.

**Cloud (`/services/cloud`)**: icon and H1 "Cloud consulting" with intro; "Jump to" links (Expertise / Our experience / Stories and insights) plus a "let's talk" button; a "See it in action" story card tagged with the service combination used (Cloud + Org change + Planning + Strategy); stats (7.8K+ cloud consultants, 2.6K+ cloud projects completed in 2022, 6.2K+ certifications across AWS, Google and Microsoft); "Our cloud expertise" with 3 blocks (Migration & modernization, Optimization, Infrastructure); a story carousel; then the "Let's build together" CTA. The page is short. The "2022" stat is dated.

**Privacy & security (`/services/privacy-security`)**: the same template. The H1 is followed by "Protecting data means protecting people." There are 3 expertise blocks: Governance, risk & compliance (a named "security adoption framework"), Data privacy, Security (gap assessment to implementation). Stats: 240+ security engineers, 15 average years of experience. Stories and insights follow.

**Partner page (`/who-we-are/partners/aws`)**: H2 "AWS & Slalom" with a partnership-since line; jump links (Expertise & Solutions / Stories & Insights / News & Events / Leaders / Awards); featured story (La-Z-Boy mainframe); **a full list of AWS competencies** (22, including DevOps, Security, Migration and Modernization, Cloud Operations, Healthcare, Financial Services); stats (800+ certifications, 7,000+ AWS-experienced consultants, 3,100+ projects in FY25); partner-exec quote; "Our featured solutions" (legacy modernisation, AI transformation, data foundations, product innovation, contact centre); stories; news and events (re:Invent booth and Summits); "Meet our AWS leaders" (5 people with bios and LinkedIn); awards. The Microsoft page lists 14 **Microsoft specializations** (including Agentic DevOps with Azure and GitHub, Infra and database migration to Azure, Kubernetes on Azure, Threat protection, Identity and access management, Cloud security, Data security) and typed offers: Accelerator (Azure Landing Zone, Data Lakehouse), Offering (Azure Zero Trust Assessment), Workshop (Copilot), Solution (GitHub + Azure). The Google Cloud page lists competencies and featured solutions.

**Legacy modernization (`/services/cloud/legacy-modernization`)**: a campaign-style solution page. Jump links (Results / Customer Story / Solutions / Partners / Experts) and a "Let's Talk" button; quantified results; story; solution list; modernisation partners; "We're ready when you are" CTA; stories; named experts.

**Healthcare & life sciences (`/industries/healthcare-life-sciences`)**: hero story; positioning; named industry leaders (5); sub-segment expertise; stories and insights; events; awards.

### Service categorisation
- Cloud: `/services/cloud`, with sub-capabilities shown as descriptors (Migration & modernization, Optimization, Infrastructure). Deep content sits under `/cloud/legacy-modernization/*`.
- Azure, AWS and GCP: under `/who-we-are/partners/{aws|microsoft|google-cloud}`, so hyperscalers are framed as company relationships, not services. AI transformation has per-cloud variants (`/services/artificial-intelligence/ai-transformation/{aws|google|microsoft-and-databricks}`).
- DevOps: no service page. Platform engineering is a descriptor under Digital product building, and DevOps appears only as an AWS competency and a Microsoft specialization.
- Security and compliance: one combined service, "Privacy & security", whose first sub-area is "Governance, risk & compliance". It is the closest of the four sites to our positioning, but specific frameworks are not named on the page.
- Managed services: no nav item. A news release mentions a new agentic managed services offering.

### Content & messaging
- Headline style: short, plain and human ("Cloud consulting", "Privacy & security", "Let's build together"). Section titles use the "Our ___ expertise" pattern.
- Value propositions: people-first, outcome-led, tailored mixes of services ("we bring a tailored mix of services to every project"), and a large partner ecosystem.
- Trust: named customer testimonials with logos, stories tagged by industry, competency and specialization lists, certification counts, named leaders with bios.
- CTA wording: "Let's talk", "Get in touch", "Let's start modernizing", "Read story", "See solutions", "Watch the webinar".
- Audience: business and technology leaders. The tone is accessible rather than C-suite formal.

### Visual design observations (from CSS and alt text; visuals not seen)
- CSS colours: bright blue `#0c62fb` (dominant), light blue `#6da1fd`, lime `#deff4d`, cyan `#1be1f2`, lavender `#c7b9ff`, coral `#ff4d5f`, navy `#002faf` and `#0f1c41`. The palette is saturated and energetic.
- Fonts: the proprietary "Slalom Sans" plus Lora (serif).
- An icon per service (each service has an "…icon" image), large lifestyle and people photography (descriptive alt text: meetings, handshakes, events) and video heroes. Cards show read time.

### Patterns worth adopting
- **Descriptor lines under each mega-menu service**, which makes scope clear without 40 extra links. For example: "Cloud Security — Posture management · Identity · Threat protection" and "Compliance Readiness — HIPAA · GDPR · PCI DSS · PIPEDA".
- **Listing named partner competencies and specializations** (AWS DevOps or Security competency, Microsoft "Infra and database migration to Azure" specialization). For a small firm this is the most credible proof available. List only what we actually hold.
- Typed offers (Accelerator / Assessment / Workshop / Solution) such as Azure Landing Zone Accelerator or Azure Zero Trust Assessment. These are productised entry points.
- One global "Let's talk" form at the foot of every page, anchored from a header button.
- A long-tail Q&A content cluster under a service URL (the application-modernisation questions). We can do the same for "HIPAA on AWS", "PCI DSS in Azure", "What is DevSecOps".
- Story cards tagged with the services combined and the industry.

### Patterns to avoid
- Thin core service pages (Cloud is about 3 short blocks) with a stat dated 2022. Keep stats current or drop them.
- Hyperscalers buried under "Who we are › Our partners" instead of in Services. For us, Azure, AWS and GCP are primary services.
- Broken or authoring paths in live markup: an AWS page link to `/content/slalom/admin/backup/english/zero-legacy`, a services page link to `web.archive.org`, and language-master links. These need QA.
- Twelve service areas: too many for a specialist.

### Limitations
- Pages read (13): home, services, services/cloud, cloud/legacy-modernization, privacy-security, digital-product-building, partners hub, partners/aws, partners/microsoft, partners/google-cloud, industries/healthcare-life-sciences, insights, customer-stories.
- Insights and customer-story listings use client-side filtering; only the headings and featured items were visible. Mobile menu behaviour and visuals were not observable. No dedicated contact page exists; the contact route is the global form.

---

## 4. Deloitte — deloitte.com/us/en/services/consulting/services/cloud-services.html (cloud area plus global header)

### Overview
Deloitte US is a Big Four professional-services firm covering audit, tax, consulting and advisory. Cloud is presented as "Cloud Services" (the browser title says "Hybrid Cloud & Infrastructure services"), a sub-practice of "AI & Engineering". Its audiences are CIOs, CTOs, CFOs and CISOs at large enterprises and government. Deloitte's distinguishing assets are its risk, regulatory and cyber depth and its audit and assurance heritage, which are the closest to "compliance readiness" among the four sites.

### Sitemap (source: robots.txt → `sitemap_index.xml` → `sitemap_us_en.xml`, 9,571 URLs)
```
/us/en.html
├── /services/consulting/services/ (~1,031 URLs incl. articles)
│   ├── engineering-ai-data (AI & Engineering) → artificial-intelligence-and-data, cloud-services, engineering,
│   │       operations-industry-domain-solutions
│   ├── cloud-services → cloud-infrastructure-platforms-services, hybrid-cloud-managed-services, engineering,
│   │       cloud-security-management-services (→ secure-by-design, attack-surface-management-services)
│   ├── cyber → cyber-defense-resilience, cybersecurity-managed-services ("Cyber Operate"),
│   │       cyber-strategy-transformation, digital-trust-and-privacy (→ identity-and-access-management,
│   │       data-and-digital-trust), enterprise-security, ai-and-cybersecurity-solutions, cybersecurity-platformization
│   ├── risk-regulatory-forensic → regulatory-financial-risk, forensic-discovery-financial-crime, ...
│   ├── microsoft (Deloitte Microsoft Technology Practice), microsoft-services, microsoft-cybersecurity-solutions, ...
│   └── human-capital, strategy-transactions, operate-services, ...
├── /services/audit-assurance/ (318), /services/tax/ (186)
├── /what-we-do/capabilities/ (265) incl. cloud-transformation/services/devops-cloud-platform, silicon2service, operate
├── /what-we-do/case-studies/ (138)
├── /alliances/ (~130 pages) aws, google, oracle, salesforce, sap, servicenow, workday, snyk-alliance, zscaler,
│               google-cloud-alliance-msp, deloitte-google-cloud-security, aws-alliance-heath-care-and-life-sciences, ...
├── /industries/ (consumer, energy, financial-services, government-public, life-sciences-health-care, tmt, ...)
├── /insights/ (topics 916, industry 1,153, research-centers), /dbriefs-webcasts/
├── /about/ (people/ 3,279 profiles, press-room, governance), /offices/
├── /contact/ (contact-us, rfp)
└── /careers/, /legal/
```

### Header & navigation (server-rendered `cmp-header`)
| Top-level | Sub-tabs → panel links |
|---|---|
| Who we are ▸ | Tabs: Overview (About Deloitte, Our shared values, Facts & figures) · Governance (Network, brands & alliances; Transparency report) · Recognition · Newsroom · Contact Us |
| What we do ▸ | Tabs: **Case studies** (featured content card: "Blockchain & Digital Assets — Service") · **Services** (22: AI & Engineering, Assurance, Audit, Business Process Solutions, Customer, Cyber, Deloitte Private, Direct Tax, Enterprise Performance, Finance, Global Employer Services, Human Capital, Indirect Tax, Infrastructure, Legal Business Services, M&A Services, Operate, Regulatory Risk & Forensic, Strategy & Transactions, Sustainability, Tax Transformation Consulting, Trade and Tariffs) · **Industries** (IndustryAdvantage, Consumer, Energy Resources & Industrials, Financial Services, Government & Public Services, Life Sciences & Health Care, Private Equity, Space, Sports, TMT) · **Alliances** (AWS, Google, Oracle, Salesforce, SAP, ServiceNow, Workday, All Alliances) |
| Our Thinking ▸ | Overview · Industry thinking (19 industries) · Deloitte Insights (Home, Explore by Topic, Research Centers, Top 10 Reading Guide, Weekly Economic Update) · Dbriefs |
| Careers ▸ | Careers home, Job search, Students and early careers, Experienced professionals, Life at Deloitte, Alumni |

- Third level, in a second nested menu in the markup (drill-down; I could not tell whether it is a desktop flyout or mobile only): AI & Engineering → AI & Data, Cloud Services, Engineering, Industry Solutions. Cyber → Cyber Defense & Resilience, Cyber Operate, Cyber Strategy & Transformation, Digital Trust & Privacy, Enterprise Security, Cyber AI, Platformization. Regulatory, Risk & Forensic → Forensic Discovery & Financial Crime, Regulatory & Financial Risk.
- **Microsoft is not in the Alliances menu.** It is a service practice at `/services/consulting/services/microsoft.html`.
- Utility and CTA: a "Let's Connect" button (to the contact page), a "My Deloitte" login menu (Dashboard, Content feed, Subscriptions, Profile, Account settings) and a location selector.
- In-page: a side "Jump to:" nav (Services / Related thinking & events / Client stories / Industry recognition / Contacts) and breadcrumbs (What we do › Services › AI & Engineering).
- Footer: Let's connect (About, Contact us, **Submit RFP**, Newsroom, View locations); What we do; Our thinking; Careers; social; legal.

### Page structure
**Cloud Services (entry page)**
1. Breadcrumb, then H1 "Cloud Services" with the H2 "Build with purpose", an intro on cloud at an AI inflection point, and a "Get in touch" CTA.
2. A second H1 ("Hybrid Cloud & Infrastructure services") inside a modal "Get in touch" form (Eloqua). The page has two H1s and a title that does not match the H1.
3. Positioning: "Technology solutions to build enduring advantage" (AI, rising costs and regulation are changing cloud strategy).
4. "Explore Hybrid Cloud & Infrastructure capabilities": a tabbed or expandable set of 6 (Cloud infrastructure and platforms, Hybrid managed services, Silicon2Service, Physical and spatial AI, Engineering, Cloud cybersecurity). Each has a tagline, a paragraph and "Learn more".
5. "Our thinking": 8 article cards typed Perspective / Collection / Article, with read time (AI factory, tokenomics, hybrid cost).
6. "Events": Dbriefs webcasts and NVIDIA GTC.
7. "Featured client stories": a Vanguard video, then 9 story cards ("Get the full story"), including a FinOps culture at Prudential and a compliance-themed bank story, plus "See all our stories".
8. "Awards and recognition": Gartner MQ Custom Software, Gartner MQ Public Cloud Optimization, IDC Cloud Security Services, IDC Industry Cloud.
9. "Our leadership": a named practice leader with email, phone and LinkedIn.
10. Footer.

**Cyber (`/cyber.html`)**: H1 "Cyber" with "Confidently embrace the future"; Contact us and "Download cyber overview" (PDF) CTAs; sub-service list; video; "Explore Cyber services" cards (5); industries grid (6).

**Cloud Security Management (`/cloud-security-management-services.html`)**: H1 with a managed-platform proposition; benefits list; "Explore our end-to-end cloud solutions": Secure by Design (SDLC security workflow), Cyber Cloud Managed Services (24/7 monitoring; "industry-specific security and compliance coverage"), PACE predictive analytics, Cloud Security Policy Orchestration (multi-cloud posture), Attack Surface Management; IndustryAdvantage; IDC leader; Deloitte x Snyk (AppSec for GenAI); "The Deloitte difference" (Outcomes-driven / Quality-oriented / Value-focused); newsletter signup.

**Digital Trust & Privacy (`/digital-trust-and-privacy.html`)**: breadcrumb under Cyber; H1 plus the H2 "Make security and trust second nature"; tabs for Customer Identity (CIAM), Data Protection & Compliance, Digital Trust & Online Protection, Enterprise Identity, Privacy Governance & Compliance. This is the closest analogue to a compliance-readiness service. Its bullets cover data-lifecycle risk, privacy safeguards and meeting regulatory and contractual obligations.

**DevOps Cloud Platform (`/what-we-do/capabilities/cloud-transformation/services/devops-cloud-platform.html`)**: H1 "DevOps Cloud Platform"; problem framing (toolchain complexity); what DCP is; benefits grouped as Reduced complexity / Flexibility / Advanced technical approach (CI/CD, ephemeral pipelines, multicloud, managed-service option); core components; Why Deloitte; endnotes; Get in touch. It is the only dedicated DevOps page found across the four sites, and it sits in a legacy URL tree with no nav entry.

**Alliance pages**: `/alliances/aws.html` (H1 "The Deloitte & Amazon Web Services (AWS) alliance"; event; "in action" industry tabs: LSHC, GPS, FS; named AWS leaders; news) and `/alliances/google.html` (H1 "Forge the future"; FDE offer; stories; industry and capability tabs: Data Analytics & AI, Security, FS, Retail, GPS, LSHC). The **Microsoft Technology Practice** page lists integrated services: Hybrid Cloud, Workplace Engineering, Engineering-as-a-Service, AI and Data, Customer, Enterprise Performance, Cyber, Operate.

**Contact (`/contact/contact-us.html`)**: a single long form with Topic, Industries and Subindustry, Service areas and Subservice, contact fields and a captcha. There is a separate "Submit RFP" route.

**Home (`/us/en.html`)**: a research-report hero; brand statement ("Connecting the dots…") with Our approach, Client stories and Careers links; "The latest from Deloitte" cards; "Our work" stories; careers.

### Service categorisation
- Cloud: `/services/consulting/services/cloud-services.html` under AI & Engineering, with children for infrastructure and platforms, hybrid managed services, engineering, and cloud cybersecurity. The URLs are flat (every service is a sibling `.html` file under `/services/consulting/services/`), with hierarchy expressed only through breadcrumbs.
- AWS and Google: `/alliances/{aws|google}.html`, with many solution sub-pages (`google-cloud-alliance-msp`, `deloitte-google-cloud-security`, `aws-alliance-heath-care-and-life-sciences`). Microsoft is a consulting practice (`/services/consulting/services/microsoft.html`), so the three hyperscalers are presented inconsistently.
- DevOps: `/what-we-do/capabilities/cloud-transformation/services/devops-cloud-platform.html` (a productised platform). DevSecOps appears only as a 2019 Tech Trends article and in "Secure by Design" (SDLC security) under cloud security.
- Cyber: a full sub-tree of 7 services, including a managed SOC ("Cyber Operate").
- Compliance: Digital Trust & Privacy (privacy governance and compliance, data protection and compliance) under Cyber; Regulatory, Risk & Forensic (financial regulation); articles on NIST compliance and LSHC regulatory compliance. HIPAA, GDPR and PCI were not visible as service names on the pages read.
- Managed services: an "Operate" suffix convention across practices (Cyber Operate, Regulatory Risk & Forensic Operate, Hybrid managed services, Enterprise Operations as a Service).

### Content & messaging
- Headlines are brand-voice two-word or three-word lines ("Build with purpose", "Forge the future", "Don't let unknowns define your limits"), followed by an explanatory paragraph. The recurring sign-off is "Let's make this work."
- Value propositions: AI-ready and resilient foundations, cost control (tokenomics, FinOps), regulation-aware transformation, and integrated cyber and risk.
- Trust: analyst recognitions, named partners and leaders with direct contact details, client stories, proprietary research and webcasts.
- CTA wording: "Get in touch", "Contact us", "Submit RFP", "Download cyber overview", "Learn more", "Get the full story", "Let's Connect".
- Audience: C-suite (including CFO-targeted pieces), government and regulated industries. The Submit RFP CTA signals procurement-led buyers.

### Visual design observations (from CSS; visuals not seen)
- CSS colours: Deloitte green `#86bc25` and `#26890d`, blues `#007cb0`, `#0076a8` and `#005587`, teal `#00abab` and `#0d8390`, greys `#53565a`, `#75787b` and `#d0d0ce`. The look is corporate and restrained.
- Image-promo cards with schema.org `ImageObject` markup, a YouTube video gated behind cookie consent ("change your advertising and targeting cookie settings"), and tab and expand components for capability lists.

### Patterns worth adopting
- **"Submit RFP" as a distinct CTA** next to "Contact us". Enterprise and regulated buyers often procure this way, and it costs us nothing.
- A direct named contact (photo, title, email, LinkedIn) at the foot of each service page. A small firm can show the actual principal, which is a real advantage.
- Breadcrumbs plus a side "Jump to" nav on long pages.
- Digital Trust & Privacy's structure (identity, data protection and compliance, privacy governance and compliance) is a useful model for a Compliance Readiness hub, which we can make more specific by naming HIPAA, GDPR, PCI DSS and PIPEDA.
- Productised platform pages (DevOps Cloud Platform: problem → what it is → benefits → components → why us). This is a good template for a DevSecOps offering.
- Downloadable one-page capability overviews (PDF) for procurement teams.

### Patterns to avoid
- Two H1s, and a `<title>` that does not match the H1, on the main cloud page. This is an SEO and accessibility flaw.
- Inconsistent hyperscaler placement (AWS and Google under Alliances, Microsoft under Services, Microsoft absent from the menu).
- A 22-item Services list mixing tax, audit and consulting. DevOps lives in an orphaned URL tree outside the nav.
- A heavy, multi-field gated form with tracking fields in the markup. Our forms should have few fields.
- Flat `.html` URL patterns that do not express hierarchy. Prefer `/services/cloud-security/` style paths.

### Limitations
- Pages read (15): home, cloud-services (entry; `cloud-consulting-services.html` redirects to it), engineering-ai-data, cyber, cloud-security-management-services, digital-trust-and-privacy, risk-regulatory-forensic, alliances/aws, alliances/google, microsoft (practice), devops-cloud-platform, industries/life-sciences-health-care/about, insights (headings), contact-us. Also the robots.txt and sitemap files.
- Whether the third-level menu is a desktop flyout or mobile-only could not be confirmed. Insights personalisation ("For You") and the video were not observable. Visuals were not seen.

---

## Cross-site comparison

### Navigation and IA at a glance
| | Avanade | Accenture | Slalom | Deloitte |
|---|---|---|---|---|
| Top-level items | 5 (Industries, Services, Insights, Careers, About) | 5 (Services, Products, Insights, About Us, Careers) | 6 (Services, Industries, Insights, Stories, Who we are, Careers) | 4 (Who we are, What we do, Our Thinking, Careers) |
| Menu depth | 2 levels, flat list | 2 levels, grouped columns | 2 levels with descriptor lines | 3 levels, tabbed panels |
| Header CTA | Contact Us (popover form) | none (Contact in utility) | Let's talk (global form) | Let's Connect |
| Hyperscalers live under | Microsoft only, in Services | Services › Ecosystem Partners | Who we are › Partners | Alliances (AWS, Google); Services (Microsoft) |
| DevOps page | none | none (Platform Engineering) | none (descriptor only) | DevOps Cloud Platform (orphaned) |
| Compliance page | accordion item only | Risk & compliance (financial) | Privacy & security › GRC | Digital Trust & Privacy |

### Strength ratings (based only on what was observed)
| Area | Avanade | Accenture | Slalom | Deloitte |
|---|---|---|---|---|
| Cloud consulting | **Strong**: dedicated cloud page with a capability accordion, client stories and FAQs | **Strong**: 10 cloud offerings with stats, a deep sub-tree and partner and award bands | **Moderate**: cloud page is short (3 blocks, 2022 stat); depth sits in the legacy-modernisation cluster | **Strong**: 6 hybrid-cloud capabilities, managed services, FinOps stories, leader contact |
| Azure | **Strong**: whole site is Microsoft-centric, with Azure VMware, mainframe-to-Azure and an Azure MSP page | **Moderate**: "Accenture + Microsoft" partner page, mostly delegated to Avanade | **Moderate**: Microsoft partner page lists Azure specializations and a Landing Zone accelerator | **Moderate**: Microsoft Technology Practice page has Hybrid Cloud, but Microsoft is missing from the nav |
| AWS | **Not offered**: no AWS service or partner page found | **Strong**: dedicated page with certification metrics, solutions, awards and leaders; VMware-to-AWS sub-pages | **Strong**: lists 22 AWS competencies, project counts, solutions and leaders | **Moderate**: alliance page centred on events, industries and leaders; many solution sub-pages in the sitemap |
| Google Cloud | **Not offered**: none found | **Strong**: richest partner page, with industry, Marketplace, joint offerings and 26X awards | **Moderate**: competencies and featured solutions, but a thinner page | **Moderate**: alliance page with capability and industry tabs; MSP and security sub-pages exist |
| DevOps | **Not offered**: no page or label | **Weak**: only Platform Engineering and Quality Engineering | **Weak**: platform-engineering descriptor and partner competencies only | **Moderate**: dedicated DevOps Cloud Platform page, but no nav entry |
| DevSecOps | **Not offered**: none observed | **Not offered**: no label seen; security-by-design wording only | **Weak**: "Agentic DevOps" and security specializations listed, no service | **Weak**: Secure by Design (SDLC security) and a Snyk AppSec piece under cloud security |
| Cybersecurity | **Strong**: dedicated page, 5 capabilities, Zero Trust and IDC proof, managed SOC | **Strong**: full cyber capability with 7 areas, a 23-partner wall and analyst awards | **Moderate**: one combined Privacy & security page with 3 areas | **Strong**: 7-service cyber tree, managed cloud security platform, privacy and identity |
| Compliance | **Weak**: one "Compliance and regulatory" accordion item; no frameworks named | **Weak**: Risk & compliance is aimed at financial CROs; no HIPAA, GDPR or PCI framing seen | **Moderate**: GRC and data privacy are first-class sub-areas, with a named adoption framework | **Moderate**: Privacy Governance & Compliance and Data Protection & Compliance pages; frameworks not named |
| Enterprise solutions | **Strong**: pre-packaged solutions, Dynamics ERP, Agentic Platform | **Strong**: 19 capabilities and products across functions | **Strong**: 12 services combined per engagement, industry solutions | **Strong**: audit, tax, risk and consulting breadth, plus RFP route |
| Content strategy | **Moderate**: consistent service template and FAQs; insights searchable but client-side | **Strong**: research reports, blogs, case studies and stat-led cards cross-linked into every page | **Strong**: long-tail Q&A cluster, tagged stories with read times, testimonials | **Strong**: Deloitte Insights, Dbriefs webcasts, typed thinking cards, downloadable overviews |
| Visual experience (from markup and CSS only) | **Moderate**: curved dividers, logolines, carousels; visuals not seen | **Moderate**: mature design system with flip cards and stat bands; visuals not seen | **Strong**: video heroes, service icons, bold multi-colour palette, people photography | **Weak**: restrained corporate palette, cookie-gated video, dense tabbed panels; visuals not seen |

### Takeaways for our IA (sized for a small specialist firm)
1. Keep the top bar to 5 or 6 items, with a header CTA ("Book a consultation" or "Let's talk"). Use Slalom-style descriptor lines in the Services mega menu.
2. Put Azure, AWS and GCP inside Services (or a "Platforms" group next to it), not under About or Partners. Give each a "Firm + Azure" style page listing only the certifications and competencies we actually hold.
3. Give DevOps/DevSecOps and Compliance Readiness first-class nav entries. None of the four sites does this well, so it is our clearest gap to fill. Name HIPAA, GDPR, PCI DSS and PIPEDA explicitly, with one sub-page each.
4. Use one service-page template (Avanade's): hero and CTA, jump links, approach, capabilities, proof, case study, inline form, FAQ. Add Deloitte's named principal contact and "Submit RFP".
5. Add a Trust Center (our own security posture) and productised offers (assessments, accelerators, workshops).
6. Avoid nav items that redirect, duplicate taxonomies, two H1s, broken authoring links and dated statistics.
