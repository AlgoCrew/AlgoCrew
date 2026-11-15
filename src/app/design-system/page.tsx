import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BoundaryStatement, Button, ButtonRow, Card, Checkbox, CheckboxGroup, Checklist, Chips, CtaBlock, DataTable,
  DefinitionCard, ErrorSummary, Eyebrow, Faq, FormRow, Grid, Heading, Lead, Ledger, LedgerRow, LogoRow, Notice, Page,
  Section, SectionHead, SelectField, Split, Steps, TextField, TextLink, TextareaField, formClass,
} from "@/components/ui";
import { Breadcrumbs, Footer, JumpLinks } from "@/components/layout";

/**
 * Internal review page for the site-v2 primitives (roadmap T2.09).
 * Not part of the public site: 404 on the production deployment, noindex everywhere,
 * and absent from the sitemap and all navigation.
 */
export const metadata: Metadata = {
  title: "Design system review",
  robots: { index: false, follow: false },
};

const swatches = ["Azure Policy", "AWS Config", "Organization Policy"];

export default function DesignSystemPage() {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <Page>
      {/* The real header now comes from the root layout. The full-menu footer below ignores every gate. */}
      <JumpLinks
        items={[
          { id: "ds-cards", label: "Cards" },
          { id: "ds-lists", label: "Lists" },
          { id: "ds-data", label: "Data" },
          { id: "ds-dark", label: "Dark section" },
          { id: "ds-forms", label: "Forms" },
          { id: "ds-footer", label: "Footer states" },
        ]}
      />
      <Section>
        <Breadcrumbs trail={[{ label: "Compliance", href: "/compliance" }, { label: "Design system", href: "/design-system" }]} />
        <SectionHead
          as="h1"
          eyebrow="Internal review"
          title="Design system primitives"
          lead="Every site-v2 building block on one page. Not linked, not indexed, and not available on the production deployment."
        />
        <Grid cols={2}>
          <div>
            <Eyebrow>Type</Eyebrow>
            <Heading as="h2" size="display">Display</Heading>
            <Heading as="h2" size="h1">Heading one</Heading>
            <Heading as="h2" size="h2">Heading two</Heading>
            <Heading as="h3">Heading three</Heading>
            <Lead>Lead paragraph. Large, calm, at most sixty characters wide.</Lead>
            <p>Body text at seventeen pixels on desktop and sixteen on phones.</p>
          </div>
          <div>
            <Eyebrow>Actions</Eyebrow>
            <ButtonRow>
              <Button href="#actions" arrow>Discuss Your Cloud Strategy</Button>
              <Button href="#actions" variant="outline">Explore Our Capabilities</Button>
              <Button href="#actions" size="sm">Talk to us</Button>
            </ButtonRow>
            <p id="actions"><TextLink href="#actions">Text link</TextLink></p>
            <Chips items={swatches} />
            <BoundaryStatement />
          </div>
        </Grid>
      </Section>

      <Section id="ds-cards" tone="soft">
        <SectionHead eyebrow="Cards" title="Cards and grids" />
        <Grid cols={3}>
          <Card href="#cards" label="01" title="Linked card" chips={swatches} more="Explore">
            <p>The whole card is one link. It lifts and takes a brand border on hover.</p>
          </Card>
          <Card label="Evidence" title="Static card">
            <p>No link, no hover state.</p>
          </Card>
          <DefinitionCard
            items={[
              { term: "Practice", value: "DevOps & DevSecOps" },
              { term: "Hidden when empty", value: "" },
              { term: "Typical outputs", value: "Pipelines, policy library, control map" },
            ]}
          />
        </Grid>
        <p id="cards" />
      </Section>

      <Section id="ds-lists">
        <Split>
          <SectionHead eyebrow="Lists" title="Checklists and steps" />
          <Grid cols={2}>
            <Checklist items={["Map requirements to configuration.", "Implement and test controls."]} />
            <Checklist variant="dash" items={["Certify, attest or audit.", "Give legal advice."]} />
          </Grid>
        </Split>
        <Steps
          band="Secure · applied at every step"
          items={[
            { title: "Assess", text: "Current estate, risks and requirements." },
            { title: "Architect", text: "Target design and guardrails." },
            { title: "Implement", text: "Build as code, in reviewed increments." },
            { title: "Manage", text: "Operate within a defined scope." },
            { title: "Optimize", text: "Cost, performance and posture reviews." },
          ]}
        />
      </Section>

      <Section id="ds-data" tone="soft">
        <SectionHead eyebrow="Data" title="Ledger, table and FAQ" />
        <Ledger>
          <LedgerRow id="ledger-a" title="Ledger row" tools={swatches}>
            <p>Title, description and a mono tool list. Stacks below 1024 pixels.</p>
          </LedgerRow>
          <LedgerRow title="Row without tools">
            <p>The third column stays empty.</p>
          </LedgerRow>
        </Ledger>
        <DataTable
          caption="Per-cloud tooling"
          columns={["Control area", "Microsoft Azure", "AWS", "Google Cloud"]}
          rows={[
            ["Policy as code", "Azure Policy", "AWS Config", "Organization Policy"],
            ["Secrets", "Key Vault", "Secrets Manager", "Secret Manager"],
          ]}
        />
        <Faq
          items={[
            { q: "Does the FAQ work without JavaScript?", a: "Yes. It uses the native details element." },
            { q: "Is structured data always added?", a: "No. Only when the page asks for it." },
          ]}
        />
        <p>Logo row with two logos renders nothing (the minimum is three):</p>
        <LogoRow logos={[{ name: "A", src: "/a.svg", width: 1, height: 1 }, { name: "B", src: "/b.svg", width: 1, height: 1 }]} />
      </Section>

      <Section id="ds-dark" tone="dark">
        <SectionHead eyebrow="Dark section" title="One dark section per page" lead="Used for a technical diagram or security story." />
        <Grid cols={3}>
          <Card label="§164.312(a)" title="Card on dark">
            <p>Cards, links and outline buttons adapt to the dark surface.</p>
          </Card>
          <div>
            <ButtonRow>
              <Button href="#dark">Primary</Button>
              <Button href="#dark" variant="outline">Outline</Button>
            </ButtonRow>
            <p id="dark"><TextLink href="#dark">Text link on dark</TextLink></p>
          </div>
          <Checklist items={["Tick list on dark."]} />
        </Grid>
      </Section>

      <Section id="ds-forms">
        <SectionHead eyebrow="Forms" title="Form fields and states" />
        <Grid cols={2}>
          <form className={formClass} action="#" noValidate>
            <FormRow>
              <TextField id="ds-name" name="name" label="Name" autoComplete="name" />
              <TextField id="ds-email" name="email" type="email" label="Work email" autoComplete="email" />
            </FormRow>
            <SelectField id="ds-topic" name="topic" label="Topic" placeholder="Select a topic" options={["Cloud security", "Compliance", "Other"]} />
            <CheckboxGroup legend="Clouds in use" optional>
              <Checkbox name="cloud" value="azure">Microsoft Azure</Checkbox>
              <Checkbox name="cloud" value="aws">AWS</Checkbox>
            </CheckboxGroup>
            <TextareaField id="ds-msg" name="message" label="Message" help="Please do not include passwords, keys or regulated data." />
            <Checkbox name="consent" required>I agree to be contacted about this message.</Checkbox>
            <div><Button type="submit" arrow>Send message</Button></div>
          </form>
          <div className={formClass}>
            <ErrorSummary
              id="ds-errors"
              errors={[
                { fieldId: "ds-bad-email", message: "Work email: enter an address like name@company.com" },
                { fieldId: "ds-bad-topic", message: "Topic: select a topic" },
              ]}
            />
            <TextField id="ds-bad-email" name="bad-email" type="email" label="Work email" defaultValue="sam@" error="Enter an address like name@company.com" />
            <SelectField id="ds-bad-topic" name="bad-topic" label="Topic" placeholder="Select a topic" options={[]} error="Select a topic" />
            <Notice tone="good" title="Message sent.">We have your message and will reply by email.</Notice>
          </div>
        </Grid>
      </Section>

      <Section>
        <CtaBlock
            title="Call-to-action block"
            text="Closes every page. Like every block, it fades in when it scrolls into view."
            primary={{ label: "Discuss Your Cloud Strategy", href: "/contact" }}
            secondary={{ label: "Book a 30-minute call", href: "/contact" }}
          />
      </Section>

      <Section tone="soft" id="ds-footer">
        <SectionHead
          eyebrow="Footer states"
          title="Footer with the full approved menu"
          lead="This footer ignores every gate. The site footer at the very bottom is what ships today: only published pages are linked."
        />
      </Section>
      <Footer navOptions={{ all: true }} />
    </Page>
  );
}
