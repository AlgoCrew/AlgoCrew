import { type FrameworkId, type PageStatus, type PlatformId, isFrameworkLive } from "./gating";
import type { QA } from "./platforms";

/**
 * The one boundary statement used everywhere (07 §8; review R-22: a single text, not variants).
 * We implement and evidence controls. We do not certify, audit, attest or give legal advice.
 */
export const BOUNDARY_STATEMENT =
  "We implement and evidence technical controls. Certification, attestation and legal interpretation are the role of your auditor, assessor or counsel. We work alongside them.";

/**
 * Technical controls that several frameworks share. The control-map diagram draws
 * requirement -> shared control -> evidence, which is why one control can serve several frameworks.
 */
export const SHARED_CONTROLS = [
  { id: "access", label: "MFA + least privilege", evidence: "Access review export" },
  { id: "encryption", label: "Encryption", evidence: "Policy compliance state" },
  { id: "logging", label: "Central audit logging", evidence: "Log retention config" },
  { id: "recovery", label: "Tested backup and restore", evidence: "Restore test records" },
] as const;
export type SharedControlId = (typeof SHARED_CONTROLS)[number]["id"];

export type Control = {
  /** Regulation reference shown as mono metadata, e.g. "§164.312(a)". */
  ref: string;
  title: string;
  body: string;
  evidence: string;
  /** Shared controls this requirement is met by (drawn in the control map). */
  maps: SharedControlId[];
};

export type Framework = {
  slug: FrameworkId;
  name: string;
  /** Mono label on cards: region and sector. */
  region: string;
  status: PageStatus;
  /** Mono tag in the page hero. */
  tag: string;
  h1: string;
  lead: string;
  cardLine: string;
  menuDescriptor: string;
  seo: { title: string; description: string };
  facts: { protects: string; appliesTo: string };
  appliesTo: string[];
  sharedResponsibility: Partial<Record<PlatformId, string>>;
  staysWithYou: string;
  controls: Control[];
  evidence: string[];
  notOurRole: string[];
  faq: QA[];
  /** Contact-form topic and CTA label (07 §3.3). */
  cta: string;
  /**
   * One or two headline requirements for the cross-framework map on the Compliance hub.
   * Framework pages draw their own full control list instead.
   */
  hubRequirements: { label: string; maps: SharedControlId[] }[];
};

/**
 * Copy is working draft from the approved prototypes. Every framework page needs review by a
 * qualified person before `legalReviewed` is set in gating.ts (07 §6.6). Not optional.
 */
export const frameworks: Framework[] = [
  {
    slug: "hipaa",
    name: "HIPAA",
    region: "United States · Health",
    status: "draft",
    tag: "HIPAA · Security Rule · 45 CFR Part 164, Subpart C",
    h1: "HIPAA cloud security and compliance readiness.",
    lead: "We implement the technical safeguards HIPAA requires for electronic protected health information in your cloud environment, and prepare the evidence your assessor will ask for.",
    cardLine: "Safeguards and evidence for health information in the cloud.",
    menuDescriptor: "Safeguards and evidence for health information in the cloud",
    seo: {
      title: "HIPAA Compliance Readiness for Cloud Environments",
      description:
        "Technical controls and audit readiness for HIPAA workloads in the cloud: access, audit logging, integrity, authentication and transmission security.",
    },
    facts: {
      protects: "Electronic protected health information",
      appliesTo: "Covered entities and their business associates",
    },
    appliesTo: [
      "HIPAA applies to covered entities such as providers, health plans and clearinghouses, and to the business associates that handle protected health information for them.",
      "If you are a covered entity, or a business associate that creates, receives, maintains or transmits electronic protected health information for one, the Security Rule applies to the systems that hold it. Your counsel decides whether that is you. This summary is not legal advice.",
    ],
    sharedResponsibility: {
      azure: "Business Associate Agreement offered through Microsoft's product terms for in-scope services.",
      aws: "Business Associate Addendum accepted through AWS Artifact, covering HIPAA-eligible services.",
      "google-cloud": "Business Associate Agreement accepted with Google, covering listed services.",
    },
    staysWithYou:
      "Using only in-scope services, plus identity, network, encryption, logging and backup configuration.",
    controls: [
      {
        ref: "§164.312(a)",
        title: "Access control",
        body: "Unique identities, least-privilege roles, time-bound privileged access, encryption at rest with managed keys.",
        evidence: "Role assignments, access reviews",
        maps: ["access", "encryption"],
      },
      {
        ref: "§164.312(b)",
        title: "Audit controls",
        body: "Activity and data-access logs collected centrally, protected from change and retained to your policy.",
        evidence: "Log configuration, retention settings",
        maps: ["logging"],
      },
      {
        ref: "§164.312(c)",
        title: "Integrity",
        body: "Versioning, immutable backups, change control through pipelines and tested restores.",
        evidence: "Restore test records, change history",
        maps: ["recovery"],
      },
      {
        ref: "§164.312(d)",
        title: "Authentication",
        body: "Single sign-on, multi-factor authentication and workload identities in place of shared credentials.",
        evidence: "Authentication policies",
        maps: ["access"],
      },
      {
        ref: "§164.312(e)",
        title: "Transmission security",
        body: "TLS enforced in transit, private connectivity between services and segmented networks.",
        evidence: "Policy compliance state",
        maps: ["encryption"],
      },
    ],
    evidence: [
      "Control map from each safeguard to its configuration and check.",
      "Evidence index listing where each record lives and how it is produced.",
      "Architecture and data-flow diagrams showing where health information is stored and moves.",
      "Technical input to your risk analysis, for your team to own and complete.",
    ],
    notOurRole: [
      "We do not certify you. There is no official HIPAA certification.",
      "We do not give legal advice or decide whether you are a covered entity or business associate.",
      "We do not write your administrative policies or run workforce training.",
      "We do not guarantee the outcome of an audit or investigation.",
    ],
    faq: [
      {
        q: 'Is Azure, AWS or Google Cloud "HIPAA compliant"?',
        a: "Providers offer services that are eligible for HIPAA workloads under their agreement. How you configure and use them is what your assessor looks at.",
      },
      {
        q: "We also need PIPEDA or GDPR. Can the same controls serve both?",
        a: "Many technical controls overlap. We map each control once and show which requirements it supports.",
      },
    ],
    cta: "Discuss Your HIPAA Requirements",
    hubRequirements: [
      { label: "HIPAA §164.312(a)", maps: ["access", "encryption"] },
      { label: "HIPAA §164.312(b)", maps: ["logging"] },
    ],
  },
  // The three frameworks below have their card and menu copy (approved in 04 §8.4) but no page
  // copy yet. They stay "draft", so no page, link or sitemap entry is generated for them.
  ...(
    [
      ["gdpr", "GDPR", "EU & UK · Privacy", "Technical measures for EU and UK personal data", "GDPR technical measures for cloud environments.", [{ label: "GDPR Art. 32", maps: ["access", "encryption", "logging", "recovery"] }]],
      ["pci-dss", "PCI DSS", "Global · Payments", "Controls for cardholder-data environments", "PCI DSS controls for cloud environments.", [{ label: "PCI DSS Req. 8", maps: ["access"] }, { label: "PCI DSS Req. 10", maps: ["logging"] }]],
      ["pipeda", "PIPEDA", "Canada · Privacy", "Safeguards for Canadian personal information", "PIPEDA safeguards for Canadian personal information in the cloud.", [{ label: "PIPEDA Principle 7", maps: ["access", "encryption", "logging"] }]],
    ] as [FrameworkId, string, string, string, string, Framework["hubRequirements"]][]
  ).map(
    ([slug, name, region, line, h1, hubRequirements]): Framework => ({
      slug,
      name,
      region,
      status: "draft",
      tag: name,
      h1,
      lead: "",
      cardLine: `${line}.`,
      menuDescriptor: line,
      seo: { title: `${name} Compliance Readiness for Cloud Environments`, description: "" },
      facts: { protects: "", appliesTo: "" },
      appliesTo: [],
      sharedResponsibility: {},
      staysWithYou: "",
      controls: [],
      evidence: [],
      notOurRole: [],
      faq: [],
      cta: `Discuss Your ${name} Requirements`,
      hubRequirements,
    }),
  ),
];

/** Published only when the copy is ready AND delivery is verified AND the page is legally reviewed. */
export const isFrameworkPageLive = (f: Framework): boolean => f.status === "live" && isFrameworkLive(f.slug);
export const liveFrameworks = (): Framework[] => frameworks.filter(isFrameworkPageLive);
export const getFramework = (slug: string): Framework | undefined =>
  liveFrameworks().find((f) => f.slug === slug);
