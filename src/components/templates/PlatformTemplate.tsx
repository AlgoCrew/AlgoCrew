import Link from "next/link";
import { JumpLinks } from "@/components/layout";
import { JsonLd, serviceSchema } from "@/components/seo/JsonLd";
import { CapabilityIndex, PageHero } from "@/components/sections";
import fw from "@/components/sections/sections.module.scss";
import {
  BoundaryStatement, Button, ButtonRow, Checklist, CtaBlock, Faq, Grid, Ledger, LedgerRow, Page, Section, SectionHead, Split, TextLink,
} from "@/components/ui";
import type { Framework } from "@/resources/frameworks";
import { serviceTitleForHref } from "@/resources/pillars";
import { PLATFORM_SECTIONS, type Platform, type PlatformSectionId } from "@/resources/platforms";

/** Short labels for the jump bar, as in the prototype. */
const JUMP_LABELS: Record<PlatformSectionId, string> = {
  consulting: "Consulting",
  architecture: "Architecture",
  migration: "Migration",
  devops: "DevOps & DevSecOps",
  security: "Security",
  operations: "Operations",
  "governance-compliance": "Governance",
};

/**
 * Platform page (docs/website-transformation/07 §6.4; prototype: platform-azure.html).
 * `frameworks` are the framework pages allowed to be linked (live ones in production).
 * `isLinkLive` decides whether a cross-link target is published; unpublished targets render no link.
 */
export function PlatformTemplate({
  platform: p,
  frameworks,
  isLinkLive,
}: {
  platform: Platform;
  frameworks: readonly Framework[];
  isLinkLive: (href: string) => boolean;
}) {
  const path = `/cloud-platforms/${p.slug}`;
  const contact = `/contact?topic=${p.slug}`;
  const sections = PLATFORM_SECTIONS.map((id) => ({ id, ...p.sections[id] })).filter((sec) => sec.body);
  const notes = frameworks.filter((f) => p.frameworkNotes[f.slug]);

  return (
    <Page>
      <JsonLd data={serviceSchema({ name: p.seo.title, description: p.seo.description, path })} />
      <PageHero
        tinted
        trail={[
          { label: "Cloud Platforms", href: "/cloud-platforms" },
          { label: p.name, href: path },
        ]}
        title={p.h1}
        lead={p.lead}
        actions={
          <ButtonRow>
            <Button href={contact} arrow>
              Discuss Your Cloud Strategy
            </Button>
          </ButtonRow>
        }
        aside={<CapabilityIndex label={`On ${p.shortName}`} items={sections} />}
      />
      <JumpLinks
        items={[
          ...sections.map((sec) => ({ id: sec.id, label: JUMP_LABELS[sec.id] })),
          ...(notes.length ? [{ id: "frameworks", label: "Frameworks" }] : []),
          ...(p.faq.length ? [{ id: "faq", label: "FAQ" }] : []),
        ]}
      />

      {p.whenItFits.length > 0 && (
        <Section tight>
          <Split>
            <SectionHead eyebrow={`When ${p.shortName} fits`} title={`Where we recommend ${p.shortName}.`} />
            <Checklist items={p.whenItFits} />
          </Split>
        </Section>
      )}

      <Section tone="soft" id="capabilities">
        <SectionHead
          eyebrow={`${p.shortName} capabilities`}
          title={`${sections.length === 7 ? "Seven" : sections.length} capabilities, delivered the ${p.shortName} way.`}
        />
        <Ledger>
          {sections.map((sec) => (
            <LedgerRow key={sec.id} id={sec.id} title={sec.title} tools={sec.tools}>
              <p>{sec.body}</p>
              {isLinkLive(sec.link) && (
                <p>
                  <TextLink href={sec.link}>{serviceTitleForHref(sec.link) ?? "More on this service"}</TextLink>
                </p>
              )}
            </LedgerRow>
          ))}
        </Ledger>
      </Section>

      {notes.length > 0 && (
        <Section id="frameworks">
          <SectionHead
            eyebrow={`Frameworks on ${p.shortName}`}
            title={`How ${p.shortName} handles the frameworks you answer to.`}
          />
          <Grid cols="fit">
            {notes.map((f) => (
              <Link key={f.slug} className={fw.fw} href={`/compliance/${f.slug}`}>
                <strong>{f.name}</strong>
                <p>{p.frameworkNotes[f.slug]}</p>
              </Link>
            ))}
          </Grid>
          <BoundaryStatement />
        </Section>
      )}

      {p.faq.length > 0 && (
        <Section tone={notes.length ? "soft" : "default"} id="faq">
          <Split>
            <SectionHead eyebrow="FAQ" title={`${p.shortName} questions.`} />
            <Faq items={p.faq} schema />
          </Split>
        </Section>
      )}

      <Section>
        <CtaBlock
          title={`Discuss your ${p.shortName} environment.`}
          text="Tell us what runs there today and what needs to change."
          primary={{ label: "Discuss Your Cloud Strategy", href: contact }}
        />
      </Section>
    </Page>
  );
}
