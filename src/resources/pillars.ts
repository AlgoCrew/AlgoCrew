import type { FrameworkId, PageStatus, PlatformId } from "./gating";
import type { QA } from "./platforms";

/**
 * Service pillars and standalone capability pages (docs/website-transformation/06).
 *
 * Named pillars.ts, not services.ts as 09 §2 proposed, because the legacy
 * src/resources/services.js still exists until the cleanup release.
 *
 * Section ids are the anchors used by the mega menu (04 §8.2). They are part of the
 * public URL space: do not rename one without updating navigation.ts.
 */

export type Capability = {
  /** Anchor id on the pillar page. */
  id: string;
  title: string;
  /** One line under the link in the mega menu. */
  descriptor: string;
  body: string;
  /** Native tools per cloud, shown only for verified platforms. */
  tools?: Partial<Record<PlatformId, string[]>>;
  /** Slug of a standalone capability page, if one exists. */
  page?: string;
  /** Listed in the mega menu column. */
  inMenu?: boolean;
};

export type Service = {
  slug: string;
  kind: "pillar" | "capability";
  /** For capability pages: the pillar they belong to. */
  parent?: string;
  /** Route override: pillar 4 lives at /compliance, not under /services. */
  path?: string;
  title: string;
  menuTitle?: string;
  /** One-line pillar message (07 §3.1). */
  line: string;
  h1: string;
  lead: string;
  seo: { title: string; description: string };
  problems: string[];
  capabilities: Capability[];
  deliverables: string[];
  /** Capability pages: the method as ledger rows (title, description, mono tool or technique list). */
  method?: { title: string; body: string; tools?: string[] }[];
  /** Capability pages: one row per control area, one tool list per cloud. Columns appear for verified platforms only. */
  tooling?: { area: string; tools: Record<PlatformId, string> }[];
  /** Typical shape of the work. No durations unless verified (07 §6.3). */
  engagement?: { title: string; text: string }[];
  /** Risks we manage: title and how we handle it. */
  risks?: { title: string; text: string }[];
  /** Short "typical outputs" line for the at-a-glance row. */
  outputs?: string;
  /** Which diagram the page carries (08 §10). */
  diagram?: "pipeline" | "defense-in-depth";
  platforms: PlatformId[];
  frameworks: FrameworkId[];
  faq: QA[];
  contactTopic: string;
  status: PageStatus;
};

const ALL_PLATFORMS: PlatformId[] = ["azure", "aws", "google-cloud"];
const ALL_FRAMEWORKS: FrameworkId[] = ["hipaa", "gdpr", "pci-dss", "pipeda"];

/** Shared defaults so every entry stays short. */
const base = {
  problems: [] as string[],
  deliverables: [] as string[],
  platforms: ALL_PLATFORMS,
  frameworks: ALL_FRAMEWORKS,
  faq: [] as QA[],
  status: "draft" as PageStatus,
};

export const services: Service[] = [
  {
    ...base,
    slug: "cloud-consulting",
    kind: "pillar",
    title: "Cloud Consulting & Engineering",
    line: "The right foundation, designed and built.",
    h1: "Cloud consulting and engineering services.",
    lead: "Strategy, architecture and engineering of cloud platforms your teams can run.",
    problems: [
      "The cloud estate grew account by account, with no shared foundation.",
      "Architecture decisions live in people's heads, not in code.",
      "Migration keeps slipping because nobody owns the plan.",
      "Costs and reliability vary from team to team.",
    ],
    deliverables: [
      "Target architecture as diagrams and code.",
      "Landing zone: account or subscription structure, network, identity and guardrails.",
      "Roadmap with workloads ordered by value and risk.",
      "Handover sessions and documentation for the teams who will run it.",
    ],
    faq: [
      { q: "Do you only advise, or do you build?", a: "Both. The same engineers who design the platform implement it as code." },
      { q: "Can you work with our existing platform team?", a: "Yes. We work in your repositories and follow your review process." },
    ],
    status: "live",
    seo: {
      title: "Cloud Consulting & Engineering Services",
      description: "Cloud strategy, architecture, landing zones and cloud-native engineering, delivered as code.",
    },
    capabilities: [
      { id: "strategy", title: "Cloud strategy", descriptor: "Workload assessment and a roadmap your teams can follow", body: "An assessment of your workloads and constraints, and a roadmap that orders the work by value and risk." },
      { id: "architecture", title: "Strategy & Architecture", descriptor: "Target architecture, landing zones and roadmaps", body: "Target architecture and a landing zone: account structure, network, identity and guardrails, defined as code.", inMenu: true },
      { id: "migration", title: "Migration & Modernization", descriptor: "Move and modernize workloads in planned waves", body: "Workloads moved in planned waves with tested cutover and rollback, then modernized to managed services where it pays off.", page: "cloud-migration", inMenu: true },
      { id: "hybrid-multi-cloud", title: "Hybrid & Multi-Cloud", descriptor: "Consistent design across clouds and data centers", body: "One identity, network and policy model across clouds and data centers, so teams do not relearn the rules per platform.", inMenu: true },
      { id: "cloud-native", title: "Cloud-Native Engineering", descriptor: "Containers, serverless and managed services, built right", body: "Containers, serverless and managed data services chosen for the workload, with deployment and observability built in.", inMenu: true },
      { id: "infrastructure-engineering", title: "Infrastructure engineering", descriptor: "Networks, compute and data platforms as code", body: "Networks, compute and data platforms written as reviewed, versioned code." },
      { id: "optimization", title: "Infrastructure optimization", descriptor: "Performance, resilience and cost reviews", body: "Reviews of performance, resilience and cost against a named framework, with prioritized changes." },
    ],
    contactTopic: "cloud",
  },
  {
    ...base,
    slug: "cloud-migration",
    kind: "capability",
    parent: "cloud-consulting",
    title: "Cloud Migration & Modernization",
    line: "Move and modernize workloads in planned waves.",
    h1: "Cloud migration and modernization services.",
    lead: "We move workloads to the cloud in planned waves, with tested cutover and rollback, and modernize the ones where it pays off.",
    problems: [
      "The migration plan is a spreadsheet nobody trusts.",
      "Past cutovers ran long, so the business resists the next one.",
      "Workloads were moved as they were and now cost more than before.",
    ],
    method: [
      { title: "01 Discover", body: "Inventory of workloads, dependencies and data, taken from the estate, not from memory.", tools: ["Dependency mapping", "Sizing"] },
      { title: "02 Plan waves", body: "Workloads grouped into waves by dependency and risk, each with a cutover and rollback plan.", tools: ["Wave plan", "Runbooks"] },
      { title: "03 Migrate", body: "Each wave rehearsed, then cut over inside an agreed window, with data validated before sign-off.", tools: ["Rehearsal", "Data validation"] },
      { title: "04 Modernize", body: "Workloads that benefit are re-platformed to managed databases, containers or serverless.", tools: ["Re-platforming"] },
      { title: "05 Hand over", body: "Documentation, runbooks and sessions with the team that will operate the result.", tools: ["Runbooks", "Handover"] },
    ],
    deliverables: [
      "Workload inventory with dependencies.",
      "Wave plan with cutover and rollback runbooks.",
      "Landing zone the workloads move into.",
      "Validation records for each cutover.",
    ],
    engagement: [
      { title: "Assess", text: "Inventory, dependencies and constraints." },
      { title: "Plan", text: "Waves, runbooks and a pilot workload." },
      { title: "Migrate", text: "Wave by wave, rehearsed first." },
      { title: "Hand over", text: "Operate, document and transfer." },
    ],
    risks: [
      { title: "Downtime.", text: "Every cutover is rehearsed and has an agreed window." },
      { title: "Data loss.", text: "Data is validated before the old system is retired." },
      { title: "Failed rollback.", text: "Rollback is written and tested before the cutover, not during it." },
      { title: "Cost surprises.", text: "Sizing is checked after each wave, not at the end." },
    ],
    faq: [
      { q: "Do you migrate everything at once?", a: "No. Workloads move in waves, starting with a pilot." },
      { q: "Will you modernize as you migrate?", a: "Only where it pays off. Some workloads are better moved first and modernized later." },
    ],
    outputs: "Wave plan, runbooks, validation records",
    status: "live",
    seo: {
      title: "Cloud Migration & Modernization Services",
      description: "Planned cloud migration in waves: discovery, wave planning, migration, modernization and handover.",
    },
    capabilities: [{ id: "modernization", title: "Modernization", descriptor: "Re-platform to managed services", body: "" }],
    contactTopic: "cloud",
  },
  {
    ...base,
    slug: "devops",
    kind: "pillar",
    title: "DevOps & DevSecOps",
    line: "Delivery that is repeatable, observable and secure by default.",
    h1: "DevOps and DevSecOps services.",
    lead: "Pipelines, infrastructure as code, platforms and observability, so shipping is routine instead of an event.",
    problems: [
      "Every team builds and deploys in its own way.",
      "Environments drift, so what passed in test fails in production.",
      "Releases are rare because they are risky.",
      "When something breaks, nobody can see why.",
    ],
    deliverables: [
      "Pipeline templates every service can adopt.",
      "Infrastructure modules with tests and documentation.",
      "Platform runbooks and service-level objectives.",
      "Dashboards and alert rules tied to an owner.",
    ],
    faq: [
      { q: "Do we need to replace our CI/CD tooling?", a: "No. We work with the pipelines you have and standardize them." },
      { q: "Is security part of this?", a: "Yes. Security stages are built into the pipelines. The DevSecOps page covers the controls in detail." },
    ],
    diagram: "pipeline",
    status: "live",
    seo: {
      title: "DevOps & DevSecOps Services",
      description: "CI/CD pipelines, infrastructure as code, Kubernetes platforms and observability, with security built in.",
    },
    capabilities: [
      { id: "devsecops", title: "DevSecOps", descriptor: "Security checks at every stage of delivery", body: "Security controls built into each stage of delivery, with evidence collected as a by-product.", page: "devsecops", inMenu: true },
      { id: "ci-cd", title: "CI/CD Pipelines", descriptor: "Repeatable build, test and release pipelines", body: "Build, test and release pipelines that are the same for every service, with quality and security stages built in.", inMenu: true },
      { id: "infrastructure-as-code", title: "Infrastructure as Code", descriptor: "Versioned, reviewed, reproducible infrastructure", body: "Every environment defined in code, reviewed like application code, and reproducible from scratch.", inMenu: true },
      { id: "platform-engineering", title: "Kubernetes & Platform Engineering", descriptor: "Container platforms and self-service paths for developers", body: "Container platforms and paved paths, so a team can ship a new service without opening a ticket.", inMenu: true },
      { id: "observability", title: "Monitoring & Observability", descriptor: "Metrics, logs and traces that lead to action", body: "Metrics, logs and traces tied to service objectives, with alerts that reach an owner.", inMenu: true },
      { id: "kubernetes", title: "Kubernetes & containers", descriptor: "Cluster design and hardening", body: "Cluster design, upgrades and hardening for managed Kubernetes." },
      { id: "automation", title: "Automation & configuration management", descriptor: "Repeatable operations as code", body: "Routine operations written as code and run the same way every time." },
      { id: "release-engineering", title: "Release engineering", descriptor: "Safe, frequent, reversible releases", body: "Progressive rollouts and tested rollback, so releases are frequent and reversible." },
    ],
    contactTopic: "devops",
  },
  {
    ...base,
    slug: "devsecops",
    kind: "capability",
    parent: "devops",
    title: "DevSecOps",
    line: "Security checks at every stage of delivery.",
    h1: "DevSecOps implementation services.",
    lead: "We build security checks into each stage of your delivery pipeline, so releases stay fast and every control leaves evidence behind.",
    seo: {
      title: "DevSecOps Implementation Services",
      description:
        "Security controls in every delivery stage: threat modeling, scanning, signed artifacts, policy as code and evidence for your assessor.",
    },
    problems: [
      "Security reviews happen at the end, so findings arrive after the work is done.",
      "Scanners exist, but nobody acts on them.",
      "Audit evidence is assembled by hand each cycle.",
    ],
    method: [
      { title: "01 Plan", body: "Threat modeling for new services, and security and compliance requirements written into the backlog.", tools: ["Threat models", "Control mapping"] },
      { title: "02 Develop", body: "Secret scanning before commit, static analysis on pull requests, protected branches and required reviews.", tools: ["SAST", "Secret scanning", "Branch policy"] },
      { title: "03 Build", body: "Dependency scanning, a software bill of materials per build, image scanning and signed artifacts.", tools: ["SCA", "SBOM", "Image scanning", "Signing"] },
      { title: "04 Test", body: "Infrastructure-as-code scanning, policy-as-code checks and dynamic testing of running services.", tools: ["IaC scanning", "Policy as code", "DAST"] },
      { title: "05 Deploy", body: "Short-lived, least-privilege deployment identities. Only signed artifacts are admitted. Approvals are stored with the change.", tools: ["Workload identity", "Admission control"] },
      { title: "06 Operate", body: "Secrets in a managed vault, patching, posture management and restore tests.", tools: ["Vault", "Posture management"] },
      { title: "07 Monitor", body: "Centralized logs, tuned native detection, alerts with an owner and a runbook, and retained evidence.", tools: ["Logging", "Detection", "Evidence retention"] },
    ],
    tooling: [
      { area: "Pipelines", tools: { azure: "Azure Pipelines, GitHub Actions", aws: "CodePipeline, CodeBuild", "google-cloud": "Cloud Build, Cloud Deploy" } },
      { area: "Policy as code", tools: { azure: "Azure Policy", aws: "AWS Config, service control policies", "google-cloud": "Organization Policy" } },
      { area: "Secrets", tools: { azure: "Key Vault", aws: "Secrets Manager", "google-cloud": "Secret Manager" } },
      { area: "Image scanning", tools: { azure: "Defender for Containers", aws: "Amazon Inspector", "google-cloud": "Artifact Analysis" } },
      { area: "Posture and detection", tools: { azure: "Defender for Cloud, Microsoft Sentinel", aws: "Security Hub, GuardDuty", "google-cloud": "Security Command Center" } },
    ],
    engagement: [
      { title: "Review", text: "Current pipelines, tools and findings backlog." },
      { title: "Design", text: "Target pipeline, thresholds and ownership model." },
      { title: "Build", text: "Controls added stage by stage on a pilot service." },
      { title: "Roll out", text: "Extend to remaining services and hand over." },
    ],
    risks: [
      { title: "Slower pipelines.", text: "Checks run in parallel and only block on agreed severities." },
      { title: "Alert fatigue.", text: "Every finding type has an owner, a threshold and a route." },
      { title: "Developer pushback.", text: "Controls are introduced on one service first, with the team involved." },
      { title: "Tool sprawl.", text: "Native services are used before anything new is bought." },
    ],
    outputs: "Pipelines, policy library, control map",
    diagram: "pipeline",
    status: "live",
    capabilities: [
      { id: "lifecycle", title: "Seven-stage lifecycle", descriptor: "Controls in every stage", body: "" },
      { id: "pipeline-security", title: "Pipeline security", descriptor: "Scanning, signing and admission control", body: "" },
      { id: "supply-chain", title: "Software supply chain", descriptor: "Dependencies, SBOMs and provenance", body: "" },
      { id: "policy-as-code", title: "Policy as code", descriptor: "Guardrails checked before deployment", body: "" },
      { id: "runtime", title: "Runtime", descriptor: "Secrets, posture and detection", body: "" },
    ],
    deliverables: [
      "Pipeline definitions with security stages, thresholds and exception handling.",
      "Policy-as-code library matched to your guardrails and frameworks.",
      "Control map linking each pipeline check to the requirement it supports.",
      "Evidence index showing where each control's output is stored and for how long.",
      "Runbooks and handover sessions for the teams who will run it.",
    ],
    faq: [
      { q: "Do we need to replace our CI/CD tooling?", a: "No. We work with the pipelines you have and add controls to them." },
      {
        q: "How is this different from your DevOps service?",
        a: "DevOps covers pipelines, infrastructure as code and platforms. DevSecOps adds the security controls and evidence at each stage.",
      },
      {
        q: "Does this make us compliant?",
        a: "No. It implements and evidences technical controls. Your auditor or assessor decides compliance.",
      },
    ],
    contactTopic: "devops",
  },
  {
    ...base,
    slug: "cloud-security",
    kind: "pillar",
    title: "Cloud Security & Cybersecurity",
    menuTitle: "Cloud Security",
    line: "Controls that fit how your cloud actually works.",
    h1: "Cloud security services.",
    lead: "Controls that fit how your cloud actually works: identity first, segmented networks, tuned detection and a way to fix what is found.",
    seo: {
      title: "Cloud Security & Cybersecurity Services",
      description:
        "Cloud security architecture, identity, Zero Trust, threat detection and vulnerability management with native cloud tooling.",
    },
    problems: [
      "Too many people hold standing admin access.",
      "Posture tools report thousands of findings and nothing gets fixed.",
      "Alerts arrive, but nobody owns them.",
      "Security was designed for the data center, not the cloud.",
    ],
    capabilities: [
      {
        id: "zero-trust",
        title: "Security Architecture & Zero Trust",
        descriptor: "Identity-centered, segmented, least-privilege design",
        body: "Every request is authenticated and authorized. Networks are segmented so a compromise stays small. Designs are written as code and reviewed.",
        tools: {
          azure: ["Entra Conditional Access", "Azure Firewall"],
          aws: ["IAM Identity Center", "Network Firewall"],
          "google-cloud": ["Cloud IAM", "VPC Service Controls"],
        },
        inMenu: true,
      },
      {
        id: "iam",
        title: "Identity & Access Management",
        descriptor: "Roles, federation and privileged access",
        body: "Single sign-on, least-privilege roles, time-bound privileged access and workload identities in place of long-lived keys.",
        tools: {
          azure: ["Microsoft Entra ID", "Privileged Identity Management"],
          aws: ["IAM", "IAM Identity Center"],
          "google-cloud": ["Cloud IAM", "Workload Identity Federation"],
        },
        inMenu: true,
      },
      {
        id: "threat-detection",
        title: "Threat Detection & Monitoring",
        descriptor: "Native detection tooling, tuned and routed",
        body: "Native detection switched on across every account, tuned to cut noise, and routed to an owner with a runbook.",
        tools: {
          azure: ["Defender for Cloud", "Microsoft Sentinel"],
          aws: ["GuardDuty", "Security Hub"],
          "google-cloud": ["Security Command Center"],
        },
        inMenu: true,
      },
      {
        id: "vulnerability-management",
        title: "Vulnerability Management",
        descriptor: "Find, rank and fix weaknesses continuously",
        body: "Findings ranked by exposure and impact, assigned to the team that can fix them, and tracked to closure.",
        tools: {
          azure: ["Defender Vulnerability Management"],
          aws: ["Amazon Inspector"],
          "google-cloud": ["Security Command Center"],
        },
        inMenu: true,
      },
      {
        id: "assessments",
        title: "Security Assessments",
        descriptor: "A clear view of your current cloud security posture",
        body: "A review of your current cloud security posture against a named benchmark, with prioritized findings.",
        inMenu: true,
      },
      { id: "security-architecture", title: "Security architecture", descriptor: "Reference designs as code", body: "" },
      { id: "security-automation", title: "Security automation", descriptor: "Automated response and remediation", body: "" },
      { id: "security-monitoring", title: "Security monitoring", descriptor: "Centralized, tamper-resistant logs", body: "" },
      { id: "infrastructure-security", title: "Infrastructure security", descriptor: "Hardened networks and hosts", body: "" },
      { id: "application-security", title: "Application security", descriptor: "Secure code and dependencies", body: "" },
    ],
    deliverables: [
      "Security architecture as diagrams and code.",
      "Identity model: roles, groups, privileged-access rules.",
      "Detection coverage map with alert routes and runbooks.",
      "Findings register with owners and due dates.",
    ],
    faq: [
      {
        q: "Do you replace our security team?",
        a: "No. We design and build controls, and hand them to the team that will run them.",
      },
      {
        q: "Is this penetration testing?",
        a: "No. Assessments here review configuration and posture. They do not attempt to break in.",
      },
    ],
    diagram: "defense-in-depth",
    status: "live",
    contactTopic: "security",
  },
  {
    ...base,
    slug: "compliance",
    kind: "pillar",
    path: "/compliance",
    title: "Compliance & Governance",
    line: "Requirements turned into controls and evidence.",
    h1: "Cloud compliance and governance: controls, evidence and audit readiness.",
    lead: "We turn framework requirements into cloud configuration, check it continuously, and organize the evidence your assessor will ask for.",
    seo: {
      title: "Cloud Compliance & Governance Services",
      description:
        "Cloud governance, policy and control implementation, risk management and audit readiness. Controls and evidence, not certification.",
    },
    capabilities: [
      {
        id: "cloud-governance",
        title: "Cloud Governance",
        descriptor: "Guardrails, policies and account structure",
        body: "Account or subscription hierarchy, guardrails and tagging standards, so every new workload starts inside the rules.",
        tools: {
          azure: ["Management groups", "Azure Policy"],
          aws: ["AWS Organizations", "Control Tower"],
          "google-cloud": ["Resource hierarchy", "Organization Policy"],
        },
        inMenu: true,
      },
      {
        id: "policy-controls",
        title: "Policy & Control Implementation",
        descriptor: "Controls as code, continuously checked",
        body: "Controls written as code, enforced before deployment and checked continuously for drift.",
        tools: {
          azure: ["Azure Policy initiatives"],
          aws: ["AWS Config rules", "Service control policies"],
          "google-cloud": ["Organization Policy constraints"],
        },
      },
      {
        id: "risk-management",
        title: "Risk Management",
        descriptor: "Cloud risk register and treatment plans",
        body: "A cloud risk register tied to real findings, with owners and treatment plans your leadership can review.",
      },
      {
        id: "audit-readiness",
        title: "Audit Readiness",
        descriptor: "Evidence your auditor can actually use",
        body: "An index of evidence: what each record proves, where it lives and how it is produced.",
        inMenu: true,
      },
      {
        id: "security-governance",
        title: "Security governance",
        descriptor: "Ownership, standards and review cadence",
        body: "Named owners for each control, written standards, and a review cadence that keeps both current.",
      },
      {
        id: "assessments",
        title: "Compliance assessments",
        descriptor: "Gap analysis against one framework",
        body: "A gap analysis of your cloud environment against one framework's technical requirements, with prioritized findings.",
      },
    ],
    faq: [
      {
        q: "Can you make us compliant?",
        a: "No one can promise that. We implement and evidence the technical controls. Your assessor decides compliance.",
      },
      {
        q: "We answer to more than one framework. Do we do this twice?",
        a: "No. Many controls overlap. We map each control once and show every requirement it supports.",
      },
    ],
    contactTopic: "compliance",
    deliverables: [
      "Control map from each requirement to its configuration and check.",
      "Policy-as-code library matched to your guardrails.",
      "Evidence index: what each record proves, where it lives and how it is produced.",
      "Risk register with owners and treatment plans.",
    ],
    status: "live",
  },
  {
    ...base,
    slug: "managed-cloud-services",
    kind: "pillar",
    title: "Managed Cloud Services",
    line: "Operations with a defined scope and clear reporting.",
    h1: "Managed cloud services.",
    lead: "Ongoing operation of your cloud platform within a scope we agree in writing: what we watch, what we change and how we report.",
    problems: [
      "The team that built the platform has moved on to the next project.",
      "Backups run, but nobody has restored one.",
      "The cloud bill grows and nobody can say why.",
      "Incidents are fixed but never reviewed.",
    ],
    deliverables: [
      "Operations report on an agreed schedule: incidents, changes, cost and posture.",
      "Runbooks for the alerts we handle.",
      "Restore test records.",
      "Cost review with actions and owners.",
    ],
    faq: [
      { q: "Can you operate a platform you did not build?", a: "Yes, after an onboarding review that documents its current state and risks." },
      { q: "Who owns the cloud accounts?", a: "You do. We work in your accounts with the access the scope requires." },
    ],
    status: "live",
    seo: {
      title: "Managed Cloud Services",
      description: "Ongoing cloud operations, monitoring, incident management, cost control and tested recovery within a defined scope.",
    },
    capabilities: [
      { id: "managed-platforms", title: "Managed Cloud Operations", descriptor: "Day-two operations on your cloud", body: "Day-two operation of your cloud platform within an agreed scope.", inMenu: true },
      { id: "incident-management", title: "Monitoring & Incident Management", descriptor: "Alerting, response and post-incident review", body: "Alerting, response and a written review after each incident, with actions tracked to closure.", inMenu: true },
      { id: "cost-optimization", title: "Cost Optimization", descriptor: "Right-sizing, commitments and spend guardrails", body: "Right-sizing, commitment planning and budget guardrails, reviewed on a schedule.", inMenu: true },
      { id: "backup-dr", title: "Backup & Disaster Recovery", descriptor: "Tested recovery, not just scheduled backups", body: "Backups that are restored on a schedule, and a recovery plan that has been rehearsed.", inMenu: true },
      { id: "infrastructure-management", title: "Infrastructure management", descriptor: "Patching, capacity and change", body: "Patching, capacity and change management for the platform." },
      { id: "security-management", title: "Security management", descriptor: "Posture and detection, operated", body: "Posture findings triaged and detection alerts handled as part of operations." },
      { id: "devops-managed", title: "DevOps managed services", descriptor: "Pipelines and platforms, operated", body: "Pipelines and developer platforms kept current and available." },
    ],
    contactTopic: "managed",
  },
];

export const servicePath = (s: Service): string => s.path ?? `/services/${s.slug}`;
export const isServiceLive = (s: Service): boolean => s.status === "live";
export const liveServices = (): Service[] => services.filter(isServiceLive);
export const pillars = (): Service[] => services.filter((s) => s.kind === "pillar");
/**
 * True when an internal href points at a page that is published. Used for cross-links
 * (06 §4): a link renders only if its target exists, so toggling a gate never leaves
 * a broken link. Paths outside the service set are assumed to exist.
 */
export const isServiceHrefLive = (href: string): boolean => {
  const path = href.split("#")[0];
  const target = services.find((s) => servicePath(s) === path);
  return target ? isServiceLive(target) : true;
};

/** Title of the service page an href points at, for descriptive link text. */
export const serviceTitleForHref = (href: string): string | undefined =>
  services.find((s) => servicePath(s) === href.split("#")[0])?.title;

export const getService = (slug: string): Service | undefined => liveServices().find((s) => s.slug === slug);
