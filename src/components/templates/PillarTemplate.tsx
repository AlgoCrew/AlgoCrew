import Link from "next/link";
import { DefenseInDepth } from "@/components/diagrams/DefenseInDepth";
import { PipelineGates } from "@/components/diagrams/PipelineGates";
import { JumpLinks } from "@/components/layout";
import { JsonLd, serviceSchema } from "@/components/seo/JsonLd";
import { FrameworkQuickLinks, PageHero, ProblemsList } from "@/components/sections";
import sec from "@/components/sections/sections.module.scss";
import {
  Button, ButtonRow, Checklist, CtaBlock, Eyebrow, Faq, Inset, Heading, Ledger, LedgerRow, Page, Section, SectionHead, Split, TextLink,
} from "@/components/ui";
import type { Framework } from "@/resources/frameworks";
import type { PlatformId } from "@/resources/gating";
import { type Service, servicePath } from "@/resources/pillars";
import type { Platform } from "@/resources/platforms";

/**
 * Service pillar page (docs/website-transformation/07 §6.2; prototype: pillar-cloud-security.html).
 * `platforms` and `frameworks` are the ones allowed to be named or linked (live ones in production);
 * `isLinkLive` decides whether a capability's standalone page may be linked.
 * Capabilities without copy are left out, so the page never shows an empty section.
 */
export function PillarTemplate({
  service: p,
  platforms,
  frameworks,
  isLinkLive,
}: {
  service: Service;
  platforms: readonly Platform[];
  frameworks: readonly Framework[];
  isLinkLive: (href: string) => boolean;
}) {
  const path = servicePath(p);
  const contact = `/contact?topic=${p.contactTopic}`;
  const capabilities = p.capabilities.filter((c) => c.body);
  const platformIds = platforms.map((pl) => pl.slug);
  const toolsFor = (tools?: Partial<Record<PlatformId, string[]>>) => platformIds.flatMap((id) => tools?.[id] ?? []);
  const supported = frameworks.filter((f) => p.frameworks.includes(f.slug));
  const deliveredOn = platforms.filter((pl) => p.platforms.includes(pl.slug));

  const jump = [
    ...capabilities.filter((c) => c.inMenu).map((c) => ({ id: c.id, label: c.title.split(" & ")[0] })),
    ...(p.diagram ? [{ id: "layers", label: p.diagram === "pipeline" ? "Security in delivery" : "Layers" }] : []),
    ...(p.deliverables.length ? [{ id: "deliverables", label: "What you get" }] : []),
    ...(p.faq.length ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  return (
    <Page>
      <JsonLd data={serviceSchema({ name: p.seo.title, description: p.seo.description, path })} />
      <PageHero
        trail={[
          { label: "Services", href: "/services" },
          { label: p.title, href: path },
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
        aside={<ProblemsList items={p.problems} />}
      />
      <JumpLinks items={jump} />

      <Section id="capabilities">
        <SectionHead
          eyebrow="Capabilities"
          title={`${capabilities.length === 5 ? "Five" : capabilities.length === 4 ? "Four" : capabilities.length} capabilities, one practice.`}
        />
        <Ledger>
          {capabilities.map((c) => {
            const page = c.page ? `/services/${c.page}` : undefined;
            return (
              <LedgerRow key={c.id} id={c.id} title={c.title} tools={toolsFor(c.tools)}>
                <p>{c.body}</p>
                {page && isLinkLive(page) && (
                  <p>
                    <TextLink href={page}>{c.title}</TextLink>
                  </p>
                )}
              </LedgerRow>
            );
          })}
        </Ledger>
      </Section>

      {p.diagram === "defense-in-depth" && (
        <Section tone="dark" id="layers">
          <div className={sec.darkSplit}>
            <div>
              <Eyebrow>Defense in depth</Eyebrow>
              <Heading as="h2">Data at the center. Controls at every layer around it.</Heading>
              <Checklist
                items={[
                  <>
                    <strong>Identity:</strong> who and what can act, and for how long.
                  </>,
                  <>
                    <strong>Network:</strong> what can reach what.
                  </>,
                  <>
                    <strong>Workload:</strong> hardened images, patched hosts, scanned code.
                  </>,
                  <>
                    <strong>Data:</strong> encrypted, classified, backed up and logged.
                  </>,
                ]}
              />
            </div>
            <DefenseInDepth />
          </div>
        </Section>
      )}

      {p.diagram === "pipeline" && (
        <Section id="layers">
          <SectionHead
            eyebrow="Security in delivery"
            title="Security is part of every stage, not a gate at the end."
          />
          <PipelineGates />
          {isLinkLive("/services/devsecops") && (
            <p>
              <TextLink href="/services/devsecops">DevSecOps</TextLink>
            </p>
          )}
        </Section>
      )}

      {p.deliverables.length > 0 && (
        <Section id="deliverables">
          <Inset>
            <Split>
              <SectionHead eyebrow="What you get" title="Typical outputs." />
              <Checklist items={p.deliverables} />
            </Split>
          </Inset>
        </Section>
      )}

      {deliveredOn.length > 0 && (
        <Section tight id="platforms">
          <Split>
            <SectionHead eyebrow="Where we deliver this" title="On your cloud." />
            <ul className={sec.quick}>
              {deliveredOn.map((pl) => (
                <li key={pl.slug}>
                  <Link href={`/cloud-platforms/${pl.slug}`}>{pl.name}</Link>
                </li>
              ))}
            </ul>
          </Split>
        </Section>
      )}

      {supported.length > 0 && (
        <Section tight id="supports">
          <Split>
            <SectionHead eyebrow="Supports" title="These controls feed your compliance program." />
            <FrameworkQuickLinks frameworks={supported} />
          </Split>
        </Section>
      )}

      {p.faq.length > 0 && (
        <Section id="faq">
          <Split>
            <SectionHead eyebrow="FAQ" title="Common questions." />
            <Faq items={p.faq} schema />
          </Split>
        </Section>
      )}

      <Section>
        <CtaBlock
          title={`Talk through your ${p.title.split(" & ")[0].toLowerCase()} needs.`}
          text="Tell us which clouds you run and what you need to change."
          primary={{ label: "Discuss Your Cloud Strategy", href: contact }}
        />
      </Section>
    </Page>
  );
}
