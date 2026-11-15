import { ControlMap } from "@/components/diagrams/ControlMap";
import { JumpLinks } from "@/components/layout";
import { JsonLd, serviceSchema } from "@/components/seo/JsonLd";
import { FactRow, PageHero } from "@/components/sections";
import {
  BoundaryStatement, Button, ButtonRow, Card, Checklist, CtaBlock, DataTable, Faq, Grid, Page, Section, SectionHead, Split,
} from "@/components/ui";
import { BOUNDARY_STATEMENT, type Framework } from "@/resources/frameworks";
import type { Platform } from "@/resources/platforms";

/**
 * Framework page (docs/website-transformation/07 §6.6): HIPAA, GDPR, PCI DSS, PIPEDA.
 * `platforms` are the platforms allowed to be named on the page (live ones in production).
 * A section with nothing to show is left out, so the page stays coherent in any launch state.
 */
export function FrameworkTemplate({ framework: f, platforms }: { framework: Framework; platforms: readonly Platform[] }) {
  const path = `/compliance/${f.slug}`;
  const contact = `/contact?topic=${f.slug}`;
  const shared = platforms.filter((p) => f.sharedResponsibility[p.slug]);
  const jump = [
    { id: "applies", label: "Who it applies to", show: f.appliesTo.length > 0 },
    { id: "shared", label: "Shared responsibility", show: shared.length > 0 },
    { id: "controls", label: "Control map", show: f.controls.length > 0 },
    { id: "evidence", label: "Evidence", show: f.evidence.length > 0 },
    { id: "boundaries", label: "What we don't do", show: f.notOurRole.length > 0 },
    { id: "faq", label: "FAQ", show: f.faq.length > 0 },
  ].filter((j) => j.show);

  return (
    <Page>
      <JsonLd data={serviceSchema({ name: f.seo.title, description: f.seo.description, path })} />
      <PageHero
        trail={[
          { label: "Compliance", href: "/compliance" },
          { label: f.name, href: path },
        ]}
        tag={f.tag}
        plain
        titleSize="display"
        title={f.h1}
        lead={f.lead}
        actions={
          <ButtonRow>
            <Button href={contact} arrow>
              {f.cta}
            </Button>
            {f.controls.length > 0 && (
              <Button href="#controls" variant="outline">
                See the control map
              </Button>
            )}
          </ButtonRow>
        }
        below={
          <FactRow
            items={[
              { term: "What it protects", value: f.facts.protects },
              { term: "Who it applies to", value: f.facts.appliesTo },
              { term: "Our role", value: BOUNDARY_STATEMENT, role: true },
            ]}
          />
        }
      />
      <JumpLinks items={jump} />

      {f.appliesTo.length > 0 && (
        <Section id="applies">
          <Split>
            <SectionHead eyebrow="Who it applies to" title={`Who ${f.name} applies to.`} />
            <div>
              {f.appliesTo.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Split>
        </Section>
      )}

      {shared.length > 0 && (
        <Section tone="soft" id="shared">
          <SectionHead
            eyebrow="Shared responsibility"
            title="The provider secures the cloud. You secure what you run in it."
          />
          <DataTable
            caption="Provider agreements"
            columns={["Platform", "Provider agreement"]}
            rows={shared.map((p) => [p.name, f.sharedResponsibility[p.slug]])}
          />
          {f.staysWithYou && (
            <p>
              <strong>What stays with you:</strong> {f.staysWithYou}
            </p>
          )}
        </Section>
      )}

      {f.controls.length > 0 && (
        <Section tone="dark" id="controls">
          <SectionHead
            eyebrow="Control map"
            title="Requirements, as cloud configuration."
            lead="Each requirement maps to cloud settings and to the evidence those settings produce."
          />
          <Grid cols={3}>
            {f.controls.map((c) => (
              <Card key={c.ref} label={c.ref} title={c.title}>
                <p>{c.body}</p>
                <p>Evidence: {c.evidence}</p>
              </Card>
            ))}
          </Grid>
        </Section>
      )}

      {f.evidence.length > 0 && (
        <Section id="evidence">
          <ControlMap
            requirements={f.controls.map((c) => ({ label: `${f.name} ${c.ref}`, maps: c.maps }))}
            caption="One control can satisfy several requirements, and each control produces its own evidence."
          />
          <Split>
            <SectionHead eyebrow="Evidence" title="What we help you prepare." />
            <Checklist items={f.evidence} />
          </Split>
        </Section>
      )}

      {f.notOurRole.length > 0 && (
        <Section tone="soft" id="boundaries">
          <Split>
            <SectionHead eyebrow="Boundaries" title="What we do not do." />
            <div>
              <Checklist variant="dash" items={f.notOurRole} />
              <BoundaryStatement />
            </div>
          </Split>
        </Section>
      )}

      {f.faq.length > 0 && (
        <Section id="faq">
          <Split>
            <SectionHead eyebrow="FAQ" title={`${f.name} questions.`} />
            <Faq items={f.faq} schema />
          </Split>
        </Section>
      )}

      <Section>
        <CtaBlock
          title={`${f.cta}.`}
          text="Tell us where your regulated data lives today and which cloud you run."
          primary={{ label: f.cta, href: contact }}
        />
      </Section>
    </Page>
  );
}
