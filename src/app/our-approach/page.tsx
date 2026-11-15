import type { Metadata } from "next";
import { JumpLinks } from "@/components/layout";
import { canonical } from "@/components/seo/JsonLd";
import { EngagementPanels, PageHero } from "@/components/sections";
import {
  Button, ButtonRow, Card, CtaBlock, Faq, Grid, Ledger, LedgerRow, Page, Section, SectionHead, Split, Steps, Checklist,
} from "@/components/ui";
import { ENGAGEMENT_FAQ, ENGAGEMENT_MODELS } from "@/resources/engagement";

/**
 * /our-approach (docs/website-transformation/07 §6.9; method section of prototypes/index.html).
 * Anchors #engagement-models and #faq are redirect targets in 05 (rows 6, 8, 18): do not rename.
 *
 * Draft copy. Statements about how engagements run are V-24 items (07 §11) and need the
 * business's confirmation before launch. No prices (A-07). No governing-law answer until V-07.
 */
const PATH = "/our-approach";
const TITLE = "Our Approach | Cloud Engagement Model";
const DESCRIPTION =
  "How we work: assess, architect, implement, manage and optimize, with security applied at every step. Engagement models and common questions.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonical(PATH), type: "website" },
};

const STEPS = [
  {
    id: "assess",
    title: "Assess",
    text: "Current estate, risks and requirements.",
    body: "We look at what runs today, how it is secured and what you must comply with. The review is based on the environment itself, not on documentation alone.",
    outputs: ["Findings", "Prioritized plan"],
  },
  {
    id: "architect",
    title: "Architect",
    text: "Target design and guardrails.",
    body: "We design the target platform and the guardrails that keep it in shape: account structure, network, identity and policy.",
    outputs: ["Architecture", "Control map"],
  },
  {
    id: "implement",
    title: "Implement",
    text: "Build as code, in reviewed increments.",
    body: "We build in small, reviewed increments, as code, so every change can be traced and repeated.",
    outputs: ["Working platform", "Pipelines"],
  },
  {
    id: "manage",
    title: "Manage",
    text: "Operate within a defined scope.",
    body: "If you want us to run what we built, we operate it within a scope agreed in writing.",
    outputs: ["Operations reports"],
  },
  {
    id: "optimize",
    title: "Optimize",
    text: "Cost, performance and posture reviews.",
    body: "We review cost, performance and security posture on a schedule and track the changes that come out of it.",
    outputs: ["Tracked improvements"],
  },
];

export default function OurApproachPage() {
  return (
    <Page>
      <PageHero
        trail={[{ label: "Our Approach", href: PATH }]}
        title="How we work: assess, architect, implement, manage, optimize."
        lead="A method you can picture before you sign. Security is not a step of its own: it is applied at every one."
        actions={
          <ButtonRow>
            <Button href="/contact" arrow>
              Discuss Your Cloud Strategy
            </Button>
          </ButtonRow>
        }
      />
      <JumpLinks
        items={[
          { id: "method", label: "Method" },
          { id: "steps", label: "Each step" },
          { id: "engagement-models", label: "Engagement models" },
          { id: "working-together", label: "Working together" },
          { id: "faq", label: "FAQ" },
        ]}
      />

      <Section tone="soft" id="method">
        <SectionHead eyebrow="Our approach" title="A method you can picture before you sign." />
        <Steps band="Secure · applied at every step" items={STEPS.map(({ title, text }) => ({ title, text }))} />
      </Section>

      <Section id="steps">
        <SectionHead eyebrow="Each step" title="What happens, and what you get." />
        <Ledger>
          {STEPS.map((step, i) => (
            <LedgerRow key={step.id} id={step.id} title={`0${i + 1} ${step.title}`} tools={step.outputs}>
              <p>{step.body}</p>
            </LedgerRow>
          ))}
        </Ledger>
      </Section>

      <Section tone="soft" id="engagement-models">
        <SectionHead
          eyebrow="Engagement models"
          title="Two ways to work with us."
          lead="Both start the same way: a conversation about your environment, then a proposal."
        />
        <EngagementPanels items={ENGAGEMENT_MODELS} />
      </Section>

      <Section id="working-together">
        <Split>
          <SectionHead eyebrow="Working together" title="Working with your team." />
          <Checklist
            items={[
              "We work in your cloud accounts and repositories, alongside your engineers.",
              "Work is reviewed through your existing process before it is merged.",
              "Every engagement ends with documentation and handover sessions.",
            ]}
          />
        </Split>
      </Section>

      <Section tone="soft" id="faq">
        <Split>
          <SectionHead eyebrow="FAQ" title="Questions about engagements." />
          <Faq
            schema
            items={ENGAGEMENT_FAQ}
          />
        </Split>
      </Section>

      <Section>
        <CtaBlock
          title="Tell us about your environment."
          text="Share which clouds you run, what you need to secure and which frameworks apply."
          primary={{ label: "Discuss Your Cloud Strategy", href: "/contact" }}
        />
      </Section>
    </Page>
  );
}
