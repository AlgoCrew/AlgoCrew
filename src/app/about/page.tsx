import type { Metadata } from "next";
import { canonical } from "@/components/seo/JsonLd";
import { PageHero, PracticeBento } from "@/components/sections";
import {
  BoundaryStatement, Button, ButtonRow, CtaBlock, DefinitionCard, LogoRow, Page, Section, SectionHead, Split, TextLink,
} from "@/components/ui";
import { liveServices, pillars, servicePath } from "@/resources/pillars";
import { site, showClientLogos } from "@/resources/site";

/**
 * /about (docs/website-transformation/07 §6.8, 08 §12 wireframe).
 * Leadership, credentials and company facts render only once verified (V-05, V-06, V-08, V-09, V-10).
 * #clients always exists, because 04 §8.6 and menus may point at it; the logo row inside it
 * renders only with three or more approved logos (V-02), and so does its heading.
 */
const PATH = "/about";
const TITLE = "About Us | Specialist Cloud Engineering Partner";
const DESCRIPTION =
  "A specialist partner for cloud engineering, DevOps and DevSecOps, cloud security and compliance. What we do, what we do not do, and how we work.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonical(PATH), type: "website" },
};

export default function AboutPage() {
  const live = liveServices();
  const practices = pillars().filter((p) => live.includes(p));
  const facts = [
    { term: "Legal name", value: site.legalName },
    { term: "Founded", value: site.foundingYear },
    { term: "Based in", value: site.city },
    { term: "Contact", value: site.email },
  ];

  return (
    <Page>
      <PageHero
        trail={[{ label: "About", href: PATH }]}
        title="A specialist cloud engineering partner."
        lead="We work only on cloud engineering, DevOps and DevSecOps, cloud security, and compliance and governance. Nothing else."
        actions={
          <ButtonRow>
            <Button href="/contact" arrow>
              Discuss Your Cloud Strategy
            </Button>
            <Button href="/our-approach" variant="outline">
              How we work
            </Button>
          </ButtonRow>
        }
      />

      <Section id="what-we-do">
        <SectionHead eyebrow="What we do" title="Five practices, one accountable team." />
        <PracticeBento practices={practices.map((p) => ({ slug: p.slug, href: servicePath(p), title: p.title, text: p.line }))} />
      </Section>

      <Section tone="soft" id="what-we-do-not">
        <Split>
          <SectionHead eyebrow="What we do not do" title="Clear boundaries." />
          <div>
            <p>
              We do not build general websites, mobile apps or games, and we do not supply contract developers. We do not
              certify, audit or give legal advice.
            </p>
            <BoundaryStatement />
          </div>
        </Split>
      </Section>

      <Section id="clients">
        {showClientLogos() && (
          <>
            <SectionHead eyebrow="Clients" title="Teams we've worked with" />
            <LogoRow logos={site.clientLogos} />
            <p>We have delivered work for or alongside these organizations.</p>
          </>
        )}
        {!showClientLogos() && (
          <Split>
            <SectionHead eyebrow="How we work" title="A method you can picture before you sign." />
            <p>
              Assess, architect, implement, manage and optimize, with security applied at every step.{" "}
              <TextLink href="/our-approach">Our Approach</TextLink>
            </p>
          </Split>
        )}
      </Section>

      {facts.some((f) => f.value) && (
      <Section tone="soft" id="company">
        <Split>
          <SectionHead eyebrow="Company" title="Company facts." />
          <DefinitionCard items={facts} />
        </Split>
      </Section>
      )}

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
