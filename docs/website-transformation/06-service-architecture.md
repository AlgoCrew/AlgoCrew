Stage 2 deliverable. Status: awaiting review.

# 06 — Service Architecture

Routes, page names and anchor IDs match [04](04-proposed-sitemap.md). Language rules for compliance follow [07 §8](07-content-strategy.md). V-xx items are in [07 §11](07-content-strategy.md).

Rules applied throughout:
- Deliverables are described as the kind of output such an engagement produces. They are not past projects.
- Every tool named below is a real, current product. A tool appears on the site only if the team actually uses it (V-16). Native tools are listed so writers have accurate vocabulary, not as a claim of expertise in every one.
- Retired or renamed products are deliberately left out (for example Azure Blueprints, AWS CodeCommit for new customers, Google Cloud Deployment Manager as a recommendation).

---

## 1. Structure at a glance

| # | Pillar | Page | Standalone capability pages (R1) | Later capability pages |
|---|---|---|---|---|
| 1 | Cloud Consulting & Engineering | `/services/cloud-consulting` | Cloud Migration & Modernization `/services/cloud-migration` | — |
| 2 | DevOps & DevSecOps | `/services/devops` | DevSecOps `/services/devsecops` | Kubernetes & Containers `/services/kubernetes`, Platform Engineering `/services/platform-engineering` |
| 3 | Cloud Security & Cybersecurity | `/services/cloud-security` | — | (Cloud Security Posture Assessment as an offer, `/assessments/security-posture`, if V-04 is yes) |
| 4 | Compliance & Governance | `/compliance` | HIPAA, GDPR, PCI DSS, PIPEDA `/compliance/{framework}` | (Compliance Readiness Review offer, if V-04 is yes) |
| 5 | Managed Cloud Services | `/services/managed-cloud-services` | — | Cloud Cost Optimization `/services/cloud-cost-optimization` |
| — | Platform ecosystems | `/cloud-platforms/{azure,aws,google-cloud}` | 3 platform pages | — |

Capability classification key: **Page** = own URL. **Section+menu** = H2 section with an anchor, linked from the mega menu. **Section** = H2 section with an anchor, not in the menu. **Bullet** = listed inside a section.

---

## 2. Pillars

### Pillar 1 — Cloud Consulting & Engineering (`/services/cloud-consulting`)

**Definition.** Deciding what to build in the cloud and building the foundation correctly: strategy, target architecture, landing zones, migration, modernization and the engineering of the infrastructure itself.

| Capability | Treatment | Anchor / URL |
|---|---|---|
| Cloud strategy & consulting | Section | `#strategy` |
| Cloud architecture (incl. landing zones) | Section+menu | `#architecture` |
| Cloud migration | **Page** | `/services/cloud-migration` (summary section `#migration` on pillar) |
| Cloud modernization | Section of the migration page | `/services/cloud-migration#modernization` |
| Cloud infrastructure engineering | Section | `#infrastructure-engineering` |
| Hybrid & multi-cloud | Section+menu | `#hybrid-multi-cloud` |
| Cloud-native development | Section+menu | `#cloud-native` (infrastructure-side: containers, serverless, managed services; not app or UI builds) |
| Infrastructure optimization | Section | `#optimization` (performance, resilience, right-sizing; cost detail lives in pillar 5) |

**Typical buyer and problem.** CTO, VP Engineering or IT Director at a mid-market or enterprise organisation in a regulated sector. Typical problems: cloud estates that grew without a design (accounts, subscriptions or projects with no structure); a pending data-centre exit or contract deadline; a second cloud arriving through an acquisition; a security or audit finding that traces back to the architecture.

**Typical deliverables.** Current-state assessment and findings report; target architecture with decision records; landing-zone design and its infrastructure-as-code implementation; migration wave plan with dependency map and rollback criteria; modernization options per workload (rehost, replatform, refactor, retire); runbooks and a handover session.

**Cross-links.** Each platform page's `#consulting`, `#architecture` and `#migration` sections link here. Links out to `/services/devops#infrastructure-as-code` (how the foundation is built), `/services/cloud-security#security-architecture`, and `/compliance#cloud-governance` (guardrails in the landing zone). Framework pages link to `#architecture` for data-residency and segmentation design.

**Native tools.**

| | Azure | AWS | Google Cloud |
|---|---|---|---|
| Frameworks | Cloud Adoption Framework for Azure; Azure Well-Architected Framework | AWS Cloud Adoption Framework; AWS Well-Architected Framework and Tool | Google Cloud Adoption Framework; Google Cloud Well-Architected Framework |
| Foundations | Azure landing zones; management groups | AWS Control Tower; AWS Organizations | Resource hierarchy (organization, folders, projects); enterprise foundations blueprint |
| Migration | Azure Migrate; Azure Database Migration Service; Azure Site Recovery | AWS Application Migration Service; AWS Database Migration Service | Migration Center; Migrate to Virtual Machines; Database Migration Service |
| Hybrid | Azure Arc | AWS Outposts | GKE Enterprise; Google Distributed Cloud |
| Cloud-native | AKS; Azure Container Apps; Azure Functions; Azure App Service | Amazon EKS; Amazon ECS; AWS Fargate; AWS Lambda | GKE; Cloud Run; Cloud Run functions |
| Optimization | Azure Advisor | AWS Trusted Advisor; AWS Compute Optimizer | Active Assist recommenders |

### Pillar 2 — DevOps & DevSecOps (`/services/devops`)

**Definition.** Making delivery of infrastructure and software repeatable, observable and secure: pipelines, infrastructure as code, container platforms, automation, observability and release practice. DevSecOps is the security layer across all of it.

| Capability | Treatment | Anchor / URL |
|---|---|---|
| DevOps consulting | Section | `#consulting` |
| DevSecOps implementation | **Page** | `/services/devsecops` (summary section `#devsecops` on pillar) |
| CI/CD pipeline engineering | Section+menu | `#ci-cd` |
| Infrastructure as Code | Section+menu | `#infrastructure-as-code` |
| Platform engineering | Section+menu (page later) | `#platform-engineering` → later `/services/platform-engineering` |
| Kubernetes & containers | Section (page later) | `#kubernetes` → later `/services/kubernetes` |
| Automation & configuration management | Section | `#automation` |
| Monitoring & observability | Section+menu | `#observability` |
| Release engineering | Section | `#release-engineering` (branching, versioning, progressive delivery, rollback) |

The DevSecOps page has its own anchors: `#lifecycle`, `#pipeline-security`, `#supply-chain`, `#policy-as-code`, `#runtime`.

**Typical buyer and problem.** VP Engineering, Head of Platform, or DevOps lead. Problems: releases that are manual or fragile; environments that drift from each other; no reproducible infrastructure; security findings that land late in the cycle; alert noise without useful signals. For DevSecOps specifically, add the CISO or AppSec lead who must show that security controls actually run on every change.

**Typical deliverables.** Pipeline maturity review; reference pipeline templates; IaC module library with review and testing workflow; GitOps deployment setup; Kubernetes cluster baseline (network policy, admission control, RBAC); observability baseline (dashboards, SLOs, alert routing); for DevSecOps: a control map by lifecycle stage, pipeline security gates, SBOM and artifact-signing process, policy-as-code rules, and an exceptions process.

**DevSecOps lifecycle** (used on the homepage, the DevSecOps page and platform `#devops` sections). Seven stages, with security inside each one rather than as a separate stage:

| Stage | Typical controls |
|---|---|
| Plan | Threat modelling, security requirements, data classification |
| Develop | Pre-commit secret scanning, static analysis (SAST), secure defaults |
| Build | Dependency and licence scanning (SCA), SBOM generation, artifact signing |
| Test | Dynamic testing (DAST), IaC scanning, container image scanning |
| Deploy | Policy-as-code admission gates, signed-artifact verification, change records |
| Operate | Runtime protection, least-privilege workload identity, secrets rotation |
| Monitor | Threat detection, audit logging, feedback into the backlog |

**Cross-links.** Platform `#devops` sections link to both pages. `/services/devsecops` links to `/services/cloud-security#application-security`, `#vulnerability-management`, and `/compliance#policy-controls` (pipeline evidence as audit evidence). Framework pages link to `/services/devsecops#pipeline-security` (change management: PCI DSS secure-development and change-control requirements; HIPAA integrity controls).

**Native tools.**

| | Azure | AWS | Google Cloud |
|---|---|---|---|
| CI/CD | Azure Pipelines (Azure DevOps); GitHub Actions | AWS CodePipeline; AWS CodeBuild; AWS CodeDeploy | Cloud Build; Cloud Deploy |
| IaC | Bicep; ARM templates | AWS CloudFormation; AWS CDK | Infrastructure Manager; Config Connector |
| Registry | Azure Container Registry | Amazon ECR | Artifact Registry |
| Containers | AKS | Amazon EKS; Amazon ECS | GKE; Config Sync; Policy Controller |
| Observability | Azure Monitor; Application Insights; Log Analytics; Azure Managed Grafana | Amazon CloudWatch; AWS X-Ray; Amazon Managed Service for Prometheus; Amazon Managed Grafana | Cloud Monitoring; Cloud Logging; Cloud Trace; Google Cloud Managed Service for Prometheus |
| Automation / config | Azure Automation; Azure App Configuration | AWS Systems Manager; AWS AppConfig | VM Manager; Config Sync |
| DevSecOps | GitHub Advanced Security (code scanning, secret scanning, Dependabot); Microsoft Defender for Cloud DevOps security | Amazon Inspector (ECR and Lambda scanning, CI/CD integration); AWS Signer; AWS CloudFormation Guard | Artifact Analysis; Binary Authorization; Assured Open Source Software |
| Cross-cloud (only if used, V-16) | Terraform or OpenTofu, Ansible, Helm, Argo CD, Flux, GitLab CI/CD, Prometheus, Grafana, OpenTelemetry, Trivy, Checkov, Semgrep, Gitleaks, ZAP, Sigstore Cosign, Syft, OPA Gatekeeper, Kyverno | | |

### Pillar 3 — Cloud Security & Cybersecurity (`/services/cloud-security`)

**Definition.** Designing, assessing and running the security controls of a cloud estate: architecture, identity, detection, vulnerability management, and protection of infrastructure and applications.

| Capability | Treatment | Anchor |
|---|---|---|
| Cloud security architecture | Section | `#security-architecture` |
| Security assessments | Section+menu (offer page later if V-04) | `#assessments` |
| Identity & access management | Section+menu | `#iam` |
| Zero Trust architecture | Section+menu (combined with architecture in the menu) | `#zero-trust` |
| Security automation | Section | `#security-automation` |
| Vulnerability management | Section+menu | `#vulnerability-management` |
| Cloud threat detection | Section+menu | `#threat-detection` |
| Security monitoring | Section (pairs with threat detection) | `#security-monitoring` |
| Infrastructure security | Section | `#infrastructure-security` (network segmentation, encryption, key management, hardening) |
| Application security | Section | `#application-security` (links to `/services/devsecops`) |

Penetration testing is listed under `#assessments` only if V-03 confirms the team does it and holds relevant qualifications (V-05). Otherwise, wording is "we coordinate independent penetration testing and remediate findings".

**Typical buyer and problem.** CISO, security lead, or IT Director without a dedicated cloud security team. Problems: posture findings nobody triages; too many over-privileged identities; logging that exists but is never reviewed; a customer security questionnaire or audit that exposes gaps; a planned Zero Trust programme with no cloud design.

**Typical deliverables.** Cloud security posture assessment with prioritised findings; identity and privileged-access design; Zero Trust reference architecture; detection rules and alert routing tuned to the environment; vulnerability-management workflow with severity SLAs agreed with the client; encryption and key-management design; remediation backlog and implementation.

**Cross-links.** Platform `#security` sections link here. Links to `/services/devsecops` (application security), `/services/managed-cloud-services#security-management` (ongoing operation), and `/compliance` (controls become evidence). Every framework page links to `#iam`, `#infrastructure-security` and `#security-monitoring`, because access control, encryption and logging are common to all four frameworks.

**Native tools.**

| | Azure | AWS | Google Cloud |
|---|---|---|---|
| Posture / CNAPP | Microsoft Defender for Cloud | AWS Security Hub; Amazon Inspector | Security Command Center |
| Threat detection / SIEM | Microsoft Sentinel; Defender for Cloud workload protections | Amazon GuardDuty; Amazon Detective; Amazon Security Lake | Security Command Center threat detection; Google Security Operations |
| Identity | Microsoft Entra ID; Conditional Access; Privileged Identity Management | AWS IAM; IAM Identity Center; IAM Access Analyzer | Cloud IAM; IAM recommender; Identity-Aware Proxy |
| Zero Trust access | Entra Conditional Access; Azure Private Link; Azure Bastion | AWS Verified Access; AWS PrivateLink | Identity-Aware Proxy; VPC Service Controls |
| Keys & secrets | Azure Key Vault | AWS KMS; AWS Secrets Manager | Cloud KMS; Secret Manager |
| Network & edge | Azure Firewall; Azure Web Application Firewall; Azure DDoS Protection | AWS Network Firewall; AWS WAF; AWS Shield | Cloud NGFW; Cloud Armor |
| Data discovery | Microsoft Purview | Amazon Macie | Sensitive Data Protection |
| Audit logs | Azure Activity Log; Microsoft Entra audit logs | AWS CloudTrail | Cloud Audit Logs |

### Pillar 4 — Compliance & Governance (`/compliance`)

**Definition.** Turning regulatory and internal requirements into technical controls, governance structures and organised evidence in the cloud. We implement and evidence controls. We do not certify, audit or give legal opinions (07 §8).

| Capability | Treatment | Anchor / URL |
|---|---|---|
| HIPAA | **Page** | `/compliance/hipaa` |
| GDPR | **Page** | `/compliance/gdpr` |
| PCI DSS | **Page** | `/compliance/pci-dss` |
| PIPEDA | **Page** | `/compliance/pipeda` |
| Cloud governance | Section+menu | `#cloud-governance` |
| Security governance | Section | `#security-governance` (policies, standards, roles, exception handling) |
| Risk management | Section+menu | `#risk-management` |
| Compliance assessments | Section | `#assessments` (gap analysis against a framework; offer page later if V-04) |
| Audit readiness | Section+menu | `#audit-readiness` |
| Policy & control implementation | Section+menu | `#policy-controls` (policy as code, continuous control monitoring) |
| Boundaries of our role | Section | `#boundaries` (what we do and what the auditor, QSA, DPO or legal counsel does) |
| Frameworks overview | Section | `#frameworks` (cards linking to the four pages) |

**Why frameworks are pages.** Each has a distinct search intent and a distinct control set, and no reference site covers them (02, finding 1). The pages share one template but differ in substance: the regulation's scope, which cloud features apply, and what evidence an assessor expects.

**Typical buyer and problem.** Compliance officer, CISO, or IT Director at an organisation handling health data, payment cards, or EU, UK or Canadian personal information. Problems: an upcoming audit or assessment; a customer or partner contract that requires a framework; controls that exist on paper but not in the cloud configuration; evidence gathered by hand every year.

**Typical deliverables.** Control mapping from the framework to cloud configuration (shared-responsibility split included); gap assessment and remediation plan; policy-as-code rule set with exceptions register; evidence index linked to automated sources; cloud risk register; governance model (account or subscription hierarchy, tagging, ownership); audit-readiness pack for the client's assessor.

**Framework specifics** (factual anchors for writers; wording per 07 §8):

| Framework | Scope notes the page must get right | Cloud-specific points |
|---|---|---|
| HIPAA | Security Rule safeguards (administrative, physical, technical) for ePHI; covered entities and business associates | Each provider signs a Business Associate Agreement and lists the services in scope (AWS through AWS Artifact; Microsoft through its product terms; Google Cloud through its BAA). Use only in-scope services for ePHI. Whether AlgoCrew signs BAAs is V-22 |
| GDPR | Article 32 security of processing; Article 28 processor terms; DPIAs (Article 35); international transfers (Chapter V); UK GDPR alongside | EU and UK region selection; encryption and key ownership; data discovery; deletion and retention automation. Whether AlgoCrew signs DPAs is V-22 |
| PCI DSS | Version 4.0.1 is current; scope is the cardholder-data environment and connected systems; assessment is by a QSA or by self-assessment | Segmentation to reduce scope; provider attestation of compliance (from each provider's compliance documentation); Security Hub PCI DSS standard; Azure Policy and Defender for Cloud regulatory-compliance initiatives; we are not a QSA or ASV |
| PIPEDA | Ten fair information principles; Safeguards principle; mandatory breach reporting to the Office of the Privacy Commissioner and breach record-keeping | PIPEDA does not itself require data to stay in Canada. Contracts and some provincial rules can. Canadian regions: Azure Canada Central and Canada East; AWS Canada (Central) and Canada West (Calgary); Google Cloud Montréal and Toronto. Do not describe the lapsed Bill C-27 / CPPA as law |

**Cross-links.** Each framework page links to the pillar sections that implement it (see the matrix in §4) and to each platform page's `#governance-compliance`. Platform pages link back to all four frameworks with platform-specific notes.

**Native tools.**

| | Azure | AWS | Google Cloud |
|---|---|---|---|
| Guardrails | Azure Policy; management groups; Azure RBAC | AWS Organizations service control policies; AWS Control Tower controls | Organization Policy Service; resource hierarchy |
| Continuous compliance | Defender for Cloud regulatory compliance dashboard | AWS Config (rules, conformance packs); Security Hub standards | Security Command Center compliance monitoring |
| Evidence & audit | Microsoft Purview Compliance Manager; Azure Resource Graph | AWS Audit Manager; AWS CloudTrail Lake | Cloud Audit Logs; Access Transparency |
| Provider attestations | Microsoft Service Trust Portal | AWS Artifact | Compliance Reports Manager |
| Regulated workloads | Region selection enforced with the built-in "Allowed locations" policy | Region selection enforced with SCPs; AWS Artifact agreements | Assured Workloads; resource-location organization policy |

### Pillar 5 — Managed Cloud Services (`/services/managed-cloud-services`)

**Definition.** Operating cloud environments after they are built: monitoring, incident response, patching, security operations, cost control, backup and recovery, under an agreed scope and service levels.

| Capability | Treatment | Anchor |
|---|---|---|
| Managed Azure / AWS / Google Cloud | Section+menu | `#managed-platforms` (links to each platform `#operations`) |
| Infrastructure management | Section | `#infrastructure-management` (patching, configuration, capacity) |
| Security management | Section | `#security-management` (posture triage, detection response within scope) |
| DevOps managed services | Section | `#devops-managed` (pipeline and platform upkeep) |
| Monitoring & incident management | Section+menu | `#incident-management` |
| Cost optimization | Section+menu (page later) | `#cost-optimization` → later `/services/cloud-cost-optimization` |
| Backup & disaster recovery | Section+menu | `#backup-dr` |

**Scope gate (V-12).** Hours of coverage, response targets and on-call arrangements must match what the business can staff. If 24/7 coverage is not real, the page describes business-hours operations with defined escalation, and the words "24/7" and "round-the-clock" are not used anywhere. Today's "24/7 On-call" and "Follow-the-sun" claims (TrustStrip) are removed until verified.

**Typical buyer and problem.** IT Director or Head of Infrastructure with a small team that cannot cover operations, security triage and cost control alongside project work. Problems: alerts nobody owns; no tested recovery; cost growth without accountability; a migration finished with no plan for day two.

**Typical deliverables.** Service description and responsibility matrix (RACI); onboarding runbooks; monitoring and alert-routing configuration; incident process with post-incident reviews; monthly operations report (incidents, changes, patch status, posture findings, spend against budget); backup policy and recovery-test records; cost recommendations.

**Cross-links.** Each platform page's `#operations` section links here. Links to `/services/cloud-security#security-monitoring`, `/services/devops#observability`, and `/compliance#audit-readiness` (operational records as evidence).

**Native tools.**

| | Azure | AWS | Google Cloud |
|---|---|---|---|
| Multi-tenant operations | Azure Lighthouse | AWS Organizations; cross-account roles | Resource hierarchy; IAM |
| Monitoring | Azure Monitor; Azure Service Health | Amazon CloudWatch; AWS Health | Cloud Monitoring; Personalized Service Health |
| Patching | Azure Update Manager | AWS Systems Manager Patch Manager | VM Manager |
| Backup & DR | Azure Backup; Azure Site Recovery | AWS Backup; AWS Elastic Disaster Recovery | Backup and DR Service |
| Cost | Microsoft Cost Management; Azure Advisor; reservations and savings plans | AWS Cost Explorer; AWS Budgets; Cost Optimization Hub; Savings Plans | Cloud Billing reports and budgets; committed use discounts; recommenders |

---

## 3. Platform ecosystems

One page per platform with seven sections (04 §5). Each section summarises how the capability is delivered on that cloud, names the native tools from the pillar tables above, and links to the pillar.

| Section (anchor) | Azure page | AWS page | Google Cloud page | Links to |
|---|---|---|---|---|
| Consulting (`#consulting`) | Cloud Adoption Framework approach | AWS CAF approach | Google Cloud Adoption Framework approach | `/services/cloud-consulting#strategy` |
| Architecture (`#architecture`) | Azure landing zones, management groups | Control Tower, multi-account structure | Resource hierarchy, enterprise foundations blueprint | `/services/cloud-consulting#architecture` |
| Migration (`#migration`) | Azure Migrate, Database Migration Service | Application Migration Service, AWS DMS | Migration Center, Migrate to Virtual Machines | `/services/cloud-migration` |
| DevOps (`#devops`) | Azure DevOps / GitHub Actions, Bicep, AKS | CodePipeline, CloudFormation/CDK, EKS | Cloud Build, Cloud Deploy, GKE | `/services/devops`, `/services/devsecops` |
| Security (`#security`) | Defender for Cloud, Sentinel, Entra ID | Security Hub, GuardDuty, IAM Identity Center | Security Command Center, Cloud IAM | `/services/cloud-security` |
| Infrastructure management (`#operations`) | Lighthouse, Monitor, Update Manager, Backup | CloudWatch, Systems Manager, AWS Backup | Cloud Monitoring, VM Manager, Backup and DR | `/services/managed-cloud-services` |
| Governance & compliance (`#governance-compliance`) | Azure Policy, regulatory compliance dashboard, BAA route, Canada Central/East | AWS Config, Audit Manager, Artifact, ca-central-1 / ca-west-1 | Organization Policy, Assured Workloads, Montréal/Toronto | `/compliance` + four framework pages |

Platform page extras (unique content): partner status and certified staff counts, **only** if held (V-01, V-05); when we recommend this platform; how it fits a multi-cloud estate. If V-03 shows no real delivery on a platform, that page is not launched and the platform is listed on `/cloud-platforms` as "on request" with no link. (Recommendation: do not list it at all. Alternative: the "on request" line.)

---

## 4. Cross-link matrix: pillars × platforms × compliance frameworks

Each cell describes what the column page says about the row pillar and where it links. "→" means a link to the row pillar's page or section.

| Pillar ↓ / Page → | Azure | AWS | Google Cloud | HIPAA | GDPR | PCI DSS | PIPEDA |
|---|---|---|---|---|---|---|---|
| **Cloud Consulting & Engineering** | Landing zones, Azure Migrate → `#architecture`, migration page | Control Tower, MGN → same | Resource hierarchy, Migration Center → same | In-scope service selection; segmentation → `#architecture` | EU/UK region and transfer design → `#architecture` | CDE scope reduction by design → `#architecture` | Canadian region choice → `#architecture` |
| **DevOps & DevSecOps** | Pipelines, Bicep, AKS → devops, devsecops | CodePipeline, CDK, EKS → same | Cloud Build, Cloud Deploy, GKE → same | Change control and integrity → `/services/devsecops#pipeline-security` | Privacy by design in delivery → `/services/devsecops#lifecycle` | Secure development and change control → `/services/devsecops#pipeline-security` | Safeguards in delivery → `/services/devsecops#lifecycle` |
| **Cloud Security & Cybersecurity** | Defender for Cloud, Sentinel, Entra → cloud-security | Security Hub, GuardDuty, IAM → same | SCC, Cloud IAM → same | Access control, audit logs, encryption → `#iam`, `#security-monitoring`, `#infrastructure-security` | Security of processing (Art. 32) → same anchors | Access, logging, vulnerability management → `#iam`, `#security-monitoring`, `#vulnerability-management` | Safeguards principle → same anchors |
| **Compliance & Governance** | Azure Policy, Compliance Manager → `/compliance#policy-controls` | Config, Audit Manager → same | Org Policy, Assured Workloads → same | Control mapping, evidence → `#audit-readiness` | Records, DPIA support (technical input) → `#risk-management` | Assessment readiness for the QSA → `#audit-readiness` | Breach-record support, accountability → `#security-governance` |
| **Managed Cloud Services** | Lighthouse, Update Manager → managed `#managed-platforms` | Systems Manager, AWS Backup → same | VM Manager, Backup and DR → same | Contingency plan, backup testing → `#backup-dr` | Availability and resilience (Art. 32) → `#backup-dr`, `#incident-management` | Patch and log review operations → `#infrastructure-management`, `#security-management` | Incident handling supporting breach reporting → `#incident-management` |

Reverse links: every pillar page has a "Where we deliver this" strip (three platform links to the matching platform anchor) and a "Supports" strip (the frameworks where the pillar is cited, linking to each framework page). Framework pages link to every platform's `#governance-compliance`. A link only appears if both pages are live.

---

## 5. Mapping of the 15 existing services

| Existing slug | Name today | Decision | New home | Content carried over |
|---|---|---|---|---|
| `cloud-devops` | Cloud & DevOps | **Reframe** → pillars 1 and 2 (301 to `/services/devops`) | `/services/devops`, `/services/cloud-migration`, `/services/cloud-consulting` | Migration, DevOps, CI/CD, containers, IaC, monitoring include items; process steps (Strategy → Handover) as input to Our Approach. "Compliance (GDPR, HIPAA, SOC 2)" bullet moves to `/compliance` without the SOC 2 claim |
| `security-quality` | Security & Quality | **Reframe** → pillar 3 (301 to `/services/cloud-security`) | `/services/cloud-security#assessments` | Pen testing (conditional, V-03/V-05), security audits, cyber consulting. Manual, automation and QA testing dropped. "ISO 27001 Compliance Standards" claim removed |
| `fintech-software-development` | Fintech Software Development | **Reframe** → pillar 4 (301 to `/compliance/pci-dss`) | `/compliance/pci-dss`; later `/industries/financial-services` | PCI DSS and SOC 2 angle (SOC 2 not built as a page). Payment-platform and crypto builds dropped |
| `healthcare-software-development` | Healthcare Software Development | **Reframe** → pillar 4 (301 to `/compliance/hipaa`) | `/compliance/hipaa`; later `/industries/healthcare` | HIPAA angle. Patient portals, telemedicine and EHR builds dropped |
| `team-services` | Team & Support Services | **Deprecate as a service**; optional engagement model (A-06) | `/our-approach#engagement-models` | "Embedded engineers" wording only if kept. "IT consulting" absorbed by pillar 1 |
| `microsoft-solutions` | Microsoft Solutions | **Deprecate** (410; switch to 301 → Azure if V-03 shows overlap) | — | None. D365 and Power Apps are out of scope |
| `data-automation` | Data, AI & Automation | **Deprecate** | — | None |
| `web-app-development` | Web & App Development | **Deprecate** | — | "Cloud Native" include survives conceptually as pillar 1 `#cloud-native` (infrastructure side only) |
| `e-commerce` | E-commerce | **Deprecate** | — | None |
| `ecommerce-development` | E-Commerce Development | **Deprecate** | — | None |
| `digital-marketing` | Digital Marketing | **Deprecate** | — | None |
| `emerging-tech` | Emerging Tech | **Deprecate** | — | None |
| `gaming` | Gaming | **Deprecate** | — | None |
| `saas-development` | SaaS Development | **Deprecate** | — | None |
| `startup-mvp-development` | Startup MVP Development | **Deprecate** | — | None |

Result: 4 reframed, 11 deprecated (including staffing). Five new capability areas have no predecessor: Cloud Consulting & Engineering as a whole, DevSecOps, Managed Cloud Services, the four framework pages, and the three platform pages.

---

## 6. Deprecated services (summary)

Detail (assets, components, data files, copy references) belongs to a later deprecation register. Code references are in 01 §13.

| Deprecated line | Existing pages | Other footprint | URL handling (05) |
|---|---|---|---|
| General web development (incl. WordPress, UX/UI) | `web-app-development` | Home panel, footer, 6 blog links, careers UX/UI role, hire-form roles | 410 |
| Mobile apps | (inside `web-app-development`) | Tech marquees (Flutter, Kotlin, React Native), mobile careers role, 1 blog post | 410 (post) |
| Custom / unrelated software (SaaS, MVP, product engineering) | `saas-development`, `startup-mvp-development` | Pricing plans, FAQ, testimonials, 5 blog posts | 410 |
| E-commerce | `e-commerce`, `ecommerce-development` | Work pages, footer | 410 |
| Gaming and game design | `gaming` | `services.js`, game icons, tech logos (Unity, Unreal) | 410 |
| Creative / digital marketing | `digital-marketing` | — | 410 |
| Emerging tech (metaverse, AR, blockchain) | `emerging-tech` | Home "Data & AI" panel tags | 410 |
| Data, AI & automation | `data-automation` | Home panel, "AI-first" copy, 1 blog post | 410 |
| Microsoft D365 / Power Apps | `microsoft-solutions` | — | 410 (or 301 → Azure, conditional) |
| Staffing / staff augmentation | `team-services`, `/hire` | Hire form, contact options, "Top 1%" and "48h" claims, 4 culture posts | 301 → Our Approach / Contact; posts noindex |
| Portfolio / case studies (not a service; hidden) | `/work` + 9 | `ServiceRelatedWork`, home Projects, 30 MB images | `/work` 301, rest 410 |
