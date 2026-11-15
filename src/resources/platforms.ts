import { type FrameworkId, type PageStatus, type PlatformId, isPlatformLive } from "./gating";

/** The seven section anchors every platform page shares (docs/website-transformation/04 §5). */
export const PLATFORM_SECTIONS = [
  "consulting",
  "architecture",
  "migration",
  "devops",
  "security",
  "operations",
  "governance-compliance",
] as const;
export type PlatformSectionId = (typeof PLATFORM_SECTIONS)[number];

export type QA = { q: string; a: string };

export type Platform = {
  slug: PlatformId;
  /** Full name on first mention, short name after (07 §2). */
  name: string;
  shortName: string;
  status: PageStatus;
  h1: string;
  lead: string;
  seo: { title: string; description: string };
  menuDescriptor: string;
  whenItFits: string[];
  /** Three native services shown on cards and chips. */
  highlights: string[];
  sections: Record<PlatformSectionId, { title: string; body: string; tools: string[]; link: string }>;
  frameworkNotes: Partial<Record<FrameworkId, string>>;
  faq: QA[];
};

const sectionTitles: Record<PlatformSectionId, string> = {
  consulting: "Consulting & strategy",
  architecture: "Architecture & landing zones",
  migration: "Migration & modernization",
  devops: "DevOps & DevSecOps",
  security: "Security",
  operations: "Infrastructure management",
  "governance-compliance": "Governance & compliance",
};

const sectionLinks: Record<PlatformSectionId, string> = {
  consulting: "/services/cloud-consulting#strategy",
  architecture: "/services/cloud-consulting#architecture",
  migration: "/services/cloud-migration",
  devops: "/services/devsecops",
  security: "/services/cloud-security",
  operations: "/services/managed-cloud-services",
  "governance-compliance": "/compliance",
};

const sections = (
  content: Record<PlatformSectionId, { body: string; tools: string[] }>,
): Platform["sections"] =>
  Object.fromEntries(
    PLATFORM_SECTIONS.map((id) => [id, { title: sectionTitles[id], link: sectionLinks[id], ...content[id] }]),
  ) as Platform["sections"];

/**
 * Copy is working draft from the approved prototypes. Provider facts (agreements, regions,
 * product names) are re-checked at copy freeze (docs/website-transformation/13, R-23).
 * Answers that depend on an unverified business practice are left out, not softened.
 */
export const platforms: Platform[] = [
  {
    slug: "azure",
    name: "Microsoft Azure",
    shortName: "Azure",
    status: "draft",
    h1: "Microsoft Azure consulting, security and managed services.",
    lead: "Landing zones, migration, DevSecOps, security and operations on Azure, built with Azure's own services and delivered as code.",
    seo: {
      title: "Azure Consulting, Security & Managed Services",
      description:
        "Azure landing zones, migration, DevSecOps, security and governance, implemented with native Azure services and delivered as code.",
    },
    menuDescriptor: "Landing zones, migration, DevSecOps and security on Azure",
    whenItFits: [
      "Your identity already lives in Microsoft Entra ID and Microsoft 365.",
      "You run Windows Server, SQL Server or .NET workloads you want to modernize.",
      "You want Canadian regions: Canada Central and Canada East.",
      "Your security team works in Microsoft Defender and Microsoft Sentinel.",
    ],
    highlights: ["Azure Policy", "Entra ID", "Defender for Cloud"],
    sections: sections({
      consulting: {
        body: "Workload assessment, platform choices and a roadmap your teams can follow.",
        tools: ["Cloud Adoption Framework", "Well-Architected Framework"],
      },
      architecture: {
        body: "Management groups, subscriptions, hub-and-spoke or Virtual WAN networking, and identity, defined as infrastructure as code.",
        tools: ["Azure landing zones", "Management groups", "Bicep"],
      },
      migration: {
        body: "Discovery, wave planning and cutover for servers, databases and applications, then modernization to managed services.",
        tools: ["Azure Migrate", "Database Migration Service", "App Service", "AKS"],
      },
      devops: {
        body: "Pipelines with security stages, workload identity federation instead of stored credentials, and policy checks before deployment.",
        tools: ["Azure Pipelines", "GitHub Actions", "Key Vault"],
      },
      security: {
        body: "Conditional Access and privileged identity, network segmentation, posture management and detection routed to the people who act on it.",
        tools: ["Microsoft Entra ID", "Defender for Cloud", "Microsoft Sentinel"],
      },
      operations: {
        body: "Monitoring, patching, backup with restore tests, disaster recovery and cost reviews, within a defined scope.",
        tools: ["Azure Monitor", "Azure Backup", "Site Recovery", "Cost Management"],
      },
      "governance-compliance": {
        body: "Guardrails as policy, regulatory initiatives assigned at the right scope, and compliance state exported as evidence.",
        tools: ["Azure Policy", "Regulatory compliance dashboard", "Resource locks"],
      },
    }),
    frameworkNotes: {
      hipaa: "Microsoft offers a Business Associate Agreement covering in-scope services. We build on those services and configure the safeguards.",
      gdpr: "EU regions and Microsoft's data protection terms. We implement access, encryption and logging measures.",
      "pci-dss": "Azure's attestation covers the platform. Your workloads stay in scope, so we segment and harden the cardholder-data environment.",
      pipeda: "Canadian regions are available when you choose in-country residency. We implement the safeguards.",
    },
    faq: [
      {
        q: "We also run AWS or Google Cloud. Is that a problem?",
        a: "No. We use one method across clouds and keep governance consistent between them.",
      },
    ],
  },
  {
    slug: "aws",
    name: "Amazon Web Services (AWS)",
    shortName: "AWS",
    status: "draft",
    h1: "AWS consulting, security and managed services.",
    lead: "Multi-account foundations, migration, DevSecOps, security and operations on AWS.",
    seo: {
      title: "AWS Consulting, Security & Managed Services",
      description:
        "AWS multi-account foundations, migration, DevSecOps, security and governance, implemented with native AWS services.",
    },
    menuDescriptor: "Multi-account foundations, migration and security on AWS",
    whenItFits: [],
    highlights: ["Control Tower", "AWS Config", "GuardDuty"],
    // Section copy is not written yet: the page cannot go live while status is "draft".
    sections: sections({
      consulting: { body: "", tools: ["AWS Well-Architected Framework"] },
      architecture: { body: "", tools: ["AWS Organizations", "Control Tower"] },
      migration: { body: "", tools: ["Application Migration Service", "Database Migration Service"] },
      devops: { body: "", tools: ["CodePipeline", "CodeBuild", "Secrets Manager"] },
      security: { body: "", tools: ["IAM Identity Center", "GuardDuty", "Security Hub"] },
      operations: { body: "", tools: ["CloudWatch", "AWS Backup", "Cost Explorer"] },
      "governance-compliance": { body: "", tools: ["AWS Config", "Service control policies"] },
    }),
    frameworkNotes: {},
    faq: [],
  },
  {
    slug: "google-cloud",
    name: "Google Cloud",
    shortName: "Google Cloud",
    status: "draft",
    h1: "Google Cloud consulting, security and managed services.",
    lead: "Organization design, GKE, DevSecOps, security and operations on Google Cloud.",
    seo: {
      title: "Google Cloud Consulting, Security & Managed Services",
      description:
        "Google Cloud organization design, migration, GKE, DevSecOps, security and governance, implemented with native services.",
    },
    menuDescriptor: "Organization design, GKE and security on Google Cloud",
    whenItFits: [],
    highlights: ["Organization Policy", "GKE", "Security Command Center"],
    sections: sections({
      consulting: { body: "", tools: ["Well-Architected Framework"] },
      architecture: { body: "", tools: ["Resource hierarchy", "Shared VPC"] },
      migration: { body: "", tools: ["Migrate to Virtual Machines", "Database Migration Service"] },
      devops: { body: "", tools: ["Cloud Build", "Cloud Deploy", "Secret Manager"] },
      security: { body: "", tools: ["Cloud IAM", "Security Command Center", "VPC Service Controls"] },
      operations: { body: "", tools: ["Cloud Monitoring", "Backup and DR Service"] },
      "governance-compliance": { body: "", tools: ["Organization Policy"] },
    }),
    frameworkNotes: {},
    faq: [],
  },
];

/** What each of the seven capability areas means on any platform (used by the /cloud-platforms overview). */
export const PLATFORM_SECTION_SUMMARY: Record<PlatformSectionId, { title: string; body: string; link: string }> = {
  consulting: { title: sectionTitles.consulting, link: sectionLinks.consulting, body: "Workload assessment, platform choice and a roadmap your teams can follow." },
  architecture: { title: sectionTitles.architecture, link: sectionLinks.architecture, body: "Account structure, network and identity foundations, defined as code." },
  migration: { title: sectionTitles.migration, link: sectionLinks.migration, body: "Discovery, wave planning and cutover, then modernization to managed services." },
  devops: { title: sectionTitles.devops, link: sectionLinks.devops, body: "Pipelines with security stages and policy checks before deployment." },
  security: { title: sectionTitles.security, link: sectionLinks.security, body: "Identity, segmentation, posture management and detection with an owner." },
  operations: { title: sectionTitles.operations, link: sectionLinks.operations, body: "Monitoring, patching, tested recovery and cost reviews within a defined scope." },
  "governance-compliance": { title: sectionTitles["governance-compliance"], link: sectionLinks["governance-compliance"], body: "Guardrails as policy, and compliance state exported as evidence." },
};

/** A platform page is published only when its copy is ready AND delivery experience is verified (V-03). */
export const isPlatformPageLive = (p: Platform): boolean => p.status === "live" && isPlatformLive(p.slug);
export const livePlatforms = (): Platform[] => platforms.filter(isPlatformPageLive);
export const getPlatform = (slug: string): Platform | undefined =>
  livePlatforms().find((p) => p.slug === slug);
