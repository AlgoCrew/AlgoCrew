/**
 * Contact form options and validation rules (docs/website-transformation/07 §6.12).
 * Shared by the browser form and the /api/contact route, so both apply the same rules.
 */
export const TOPICS = [
  { id: "cloud", label: "Cloud consulting & migration" },
  { id: "devops", label: "DevOps & DevSecOps" },
  { id: "security", label: "Cloud security" },
  { id: "compliance", label: "Compliance" },
  { id: "managed", label: "Managed services" },
  { id: "other", label: "Other" },
] as const;
export type TopicId = (typeof TOPICS)[number]["id"];

export const CLOUDS = [
  { id: "azure", label: "Microsoft Azure" },
  { id: "aws", label: "AWS" },
  { id: "google-cloud", label: "Google Cloud" },
  { id: "other", label: "Other or on-premises" },
] as const;

/** `?topic=` values used across the site, mapped to a form topic. */
const TOPIC_ALIASES: Record<string, TopicId> = {
  cloud: "cloud", platform: "cloud", azure: "cloud", aws: "cloud", "google-cloud": "cloud",
  devops: "devops", security: "security", managed: "managed",
  compliance: "compliance", hipaa: "compliance", gdpr: "compliance", "pci-dss": "compliance", pipeda: "compliance",
};
export const topicFromQuery = (value: string | null): TopicId | "" => (value && TOPIC_ALIASES[value]) || "";

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  topic: string;
  clouds: string[];
  message: string;
  consent: boolean;
  /** Honeypot: hidden from people, filled in by bots. Must stay empty. */
  website?: string;
};

export type FieldErrors = Partial<Record<"name" | "email" | "company" | "topic" | "message" | "consent", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns an empty object when the input is valid. Messages say what to do, in plain words. */
export function validateContact(input: Partial<ContactInput>): FieldErrors {
  const errors: FieldErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const company = (input.company ?? "").trim();
  const message = (input.message ?? "").trim();
  if (!name) errors.name = "Enter your name";
  else if (name.length > 100) errors.name = "Use 100 characters or fewer";
  if (!EMAIL.test(email) || email.length > 200) errors.email = "Enter an address like name@company.com";
  if (!company) errors.company = "Enter your company name";
  else if (company.length > 150) errors.company = "Use 150 characters or fewer";
  if (!TOPICS.some((t) => t.id === input.topic)) errors.topic = "Select a topic";
  if (message.length < 10) errors.message = "Tell us a little more (at least 10 characters)";
  else if (message.length > 5000) errors.message = "Use 5,000 characters or fewer";
  if (input.consent !== true) errors.consent = "Tick the box so we can reply to you";
  return errors;
}
