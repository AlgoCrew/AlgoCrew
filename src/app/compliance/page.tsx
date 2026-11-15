import type { Metadata } from "next";
import { ControlMap } from "@/components/diagrams/ControlMap";
import { JumpLinks } from "@/components/layout";
import { JsonLd, canonical, serviceSchema } from "@/components/seo/JsonLd";
import { FrameworkCards, FrameworkQuickLinks, PageHero } from "@/components/sections";
import {
  BoundaryStatement, Button, ButtonRow, Checklist, CtaBlock, Faq, Inset, Grid, Ledger, LedgerRow, Page, Section, SectionHead, Split,
} from "@/components/ui";
import { liveFrameworks } from "@/resources/frameworks";
import { livePlatformIds } from "@/resources/gating";
import { services } from "@/resources/pillars";

/**
 * /compliance: the Compliance & Governance pillar and the framework hub in one page
 * (docs/website-transformation/04 decision 3, 07 §6.5).
 * Anchors used by the menus: #boundaries, #frameworks and one per governance capability.
 */
const pillar = services.find((s) => s.slug === "compliance")!;
const PATH = "/compliance";
const CONTACT = "/contact?topic=compliance";
const CTA = "Discuss Your Compliance Requirements";

export const metadata: Metadata = {
  title: pillar.seo.title,
  description: pillar.seo.description,
  alternates: { canonical: canonical(PATH) },
  openGraph: { title: pillar.seo.title, description: pillar.seo.description, url: canonical(PATH), type: "website" },
};

export default function CompliancePage() {
  const frameworks = liveFrameworks();
  const platforms = livePlatformIds(pillar.platforms);
  const capabilities = pillar.capabilities.filter((c) => c.body);

  return (
    <Page>
      <JsonLd data={serviceSchema({ name: pillar.seo.title, description: pillar.seo.description, path: PATH })} />
      <PageHero
        trail={[{ label: "Compliance", href: PATH }]}
        title={pillar.h1}
        lead={pillar.lead}
        actions={
          <>
            <FrameworkQuickLinks frameworks={frameworks} />
            <ButtonRow>
              <Button href={CONTACT} arrow>
                {CTA}
              </Button>
            </ButtonRow>
          </>
        }
        below={<BoundaryStatement id="boundaries" />}
      />
      <JumpLinks
        items={[
          ...(frameworks.length ? [{ id: "frameworks", label: "Frameworks" }] : []),
          ...capabilities.map((c) => ({ id: c.id, label: c.title })),
          { id: "role", label: "Our role" },
          { id: "faq", label: "FAQ" },
        ]}
      />

      {/* The section and its anchor exist only when at least one framework page is published. */}
      {frameworks.length > 0 && (
        <Section id="frameworks">
          <SectionHead eyebrow="Frameworks" title="Start from the framework you answer to." />
          <FrameworkCards frameworks={frameworks} />
          <ControlMap
            requirements={frameworks.flatMap((f) => f.hubRequirements)}
            caption="Map each control once. Show every requirement it supports."
          />
        </Section>
      )}

      <Section tone="soft">
        <SectionHead eyebrow="Governance & readiness" title="Services that apply to any framework." />
        <Ledger>
          {capabilities.map((c) => (
            <LedgerRow key={c.id} id={c.id} title={c.title} tools={platforms.flatMap((p) => c.tools?.[p] ?? [])}>
              <p>{c.body}</p>
            </LedgerRow>
          ))}
        </Ledger>
      </Section>

      <Section id="role">
        <Split>
          <SectionHead eyebrow="Our role" title="What we do, and what we do not." />
          <Grid cols={2}>
            <Checklist
              items={[
                "Map requirements to cloud configuration.",
                "Implement and test technical controls.",
                "Organize evidence for your assessor.",
                "Work alongside your auditor and counsel.",
              ]}
            />
            <Checklist
              variant="dash"
              items={[
                "Certify, attest or audit.",
                "Give legal advice.",
                "Guarantee an audit outcome.",
                "Write your organizational policies for you.",
              ]}
            />
          </Grid>
        </Split>
      </Section>

      {pillar.deliverables.length > 0 && (
        <Section id="deliverables">
          <Inset>
            <Split>
              <SectionHead eyebrow="What you get" title="Typical outputs." />
              <Checklist items={pillar.deliverables} />
            </Split>
          </Inset>
        </Section>
      )}

      <Section id="faq">
        <Split>
          <SectionHead eyebrow="FAQ" title="Common questions." />
          <Faq items={pillar.faq} schema />
        </Split>
      </Section>

      <Section>
        <CtaBlock
          title="Discuss your compliance requirements."
          text="Tell us which frameworks apply and where your regulated data lives."
          primary={{ label: CTA, href: CONTACT }}
        />
      </Section>
    </Page>
  );
}
