import { PipelineGates } from "@/components/diagrams/PipelineGates";
import { JumpLinks } from "@/components/layout";
import { JsonLd, serviceSchema } from "@/components/seo/JsonLd";
import { GlanceRow, PageHero } from "@/components/sections";
import {
  Button, ButtonRow, Card, Checklist, CtaBlock, DataTable, Faq, Grid, Ledger, LedgerRow, Page, Section, SectionHead, Split, Steps,
} from "@/components/ui";
import type { Framework } from "@/resources/frameworks";
import { type Service, servicePath } from "@/resources/pillars";
import type { Platform } from "@/resources/platforms";

/**
 * Single-capability page (docs/website-transformation/07 §6.3; prototype: service-devsecops.html).
 * The tooling table shows one column per platform allowed to be named; with none, the section is left out.
 */
export function CapabilityTemplate({
  service: c,
  parent,
  platforms,
  frameworks,
}: {
  service: Service;
  parent?: Service;
  platforms: readonly Platform[];
  frameworks: readonly Framework[];
}) {
  const path = servicePath(c);
  const contact = `/contact?topic=${c.contactTopic}`;
  const shownPlatforms = platforms.filter((pl) => c.platforms.includes(pl.slug));
  const shownFrameworks = frameworks.filter((f) => c.frameworks.includes(f.slug));
  const tooling = shownPlatforms.length ? c.tooling ?? [] : [];
  const method = c.method ?? [];
  const engagement = c.engagement ?? [];
  const risks = c.risks ?? [];

  const jump = [
    { id: "who", label: "Who it's for", show: c.problems.length > 0 },
    { id: "method", label: "Method", show: method.length > 0 },
    { id: "tooling", label: "Tooling", show: tooling.length > 0 },
    { id: "deliverables", label: "What you get", show: c.deliverables.length > 0 },
    { id: "engagement", label: "Engagement", show: engagement.length > 0 },
    { id: "risks", label: "Risks", show: risks.length > 0 },
    { id: "faq", label: "FAQ", show: c.faq.length > 0 },
  ].filter((j) => j.show);

  return (
    <Page>
      <JsonLd data={serviceSchema({ name: c.seo.title, description: c.seo.description, path })} />
      <PageHero
        trail={[
          { label: "Services", href: "/services" },
          ...(parent ? [{ label: parent.title, href: servicePath(parent) }] : []),
          { label: c.title, href: path },
        ]}
        title={c.h1}
        lead={c.lead}
        actions={
          <ButtonRow>
            <Button href={contact} arrow>
              Discuss Your Cloud Strategy
            </Button>
            {method.length > 0 && (
              <Button href="#method" variant="outline">
                See the method
              </Button>
            )}
          </ButtonRow>
        }
        below={
          <>
            {c.diagram === "pipeline" && <PipelineGates />}
            <GlanceRow
              items={[
                { term: "Practice", value: parent?.title },
                { term: "Delivered on", value: shownPlatforms.map((pl) => pl.shortName).join(" · ") },
                { term: "Supports programs for", value: shownFrameworks.map((f) => f.name).join(" · ") },
                { term: "Typical outputs", value: c.outputs },
              ]}
            />
          </>
        }
      />
      <JumpLinks items={jump} />

      {c.problems.length > 0 && (
        <Section id="who">
          <SectionHead eyebrow="Who it's for" title="Teams that recognize at least one of these." />
          <Grid cols={3}>
            {c.problems.map((problem) => (
              <Card key={problem} title={problem} as="h3" />
            ))}
          </Grid>
        </Section>
      )}

      {method.length > 0 && (
        <Section tone="soft" id="method">
          <SectionHead eyebrow="Method" title={`${method.length === 7 ? "Seven" : method.length === 5 ? "Five" : method.length} stages, with outputs at each.`} />
          <Ledger>
            {method.map((m) => (
              <LedgerRow key={m.title} title={m.title} tools={m.tools}>
                <p>{m.body}</p>
              </LedgerRow>
            ))}
          </Ledger>
        </Section>
      )}

      {tooling.length > 0 && (
        <Section id="tooling">
          <SectionHead eyebrow="Tooling" title="Native services first, on each cloud." />
          <DataTable
            caption="Native services by control area and cloud"
            columns={["Control area", ...shownPlatforms.map((pl) => pl.name)]}
            rows={tooling.map((t) => [t.area, ...shownPlatforms.map((pl) => t.tools[pl.slug])])}
          />
        </Section>
      )}

      {c.deliverables.length > 0 && (
        <Section tone="soft" id="deliverables">
          <Split>
            <SectionHead eyebrow="What you get" title="Artifacts you can maintain." />
            <Checklist items={c.deliverables} />
          </Split>
        </Section>
      )}

      {engagement.length > 0 && (
        <Section id="engagement">
          <SectionHead eyebrow="Engagement" title="Typical shape of the work." />
          <Steps items={engagement} />
        </Section>
      )}

      {risks.length > 0 && (
        <Section tone="soft" id="risks">
          <Split>
            <SectionHead eyebrow="Risks we manage" title="What usually goes wrong, and how we handle it." />
            <Checklist
              items={risks.map((r) => (
                <>
                  <strong>{r.title}</strong> {r.text}
                </>
              ))}
            />
          </Split>
        </Section>
      )}

      {c.faq.length > 0 && (
        <Section id="faq">
          <Split>
            <SectionHead eyebrow="FAQ" title="Common questions." />
            <Faq items={c.faq} schema />
          </Split>
        </Section>
      )}

      <Section>
        <CtaBlock
          title={c.diagram === "pipeline" ? "Talk through your pipeline." : "Talk through your migration."}
          text={
            c.diagram === "pipeline"
              ? "Tell us what you ship, how often, and which controls you need to evidence."
              : "Tell us what you run today and where it needs to go."
          }
          primary={{ label: "Discuss Your Cloud Strategy", href: contact }}
        />
      </Section>
    </Page>
  );
}
