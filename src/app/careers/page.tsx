import type { Metadata } from "next";
import { canonical } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections";
import { Button, ButtonRow, Checklist, CtaBlock, Page, Section, SectionHead, Split } from "@/components/ui";

/**
 * /careers (docs/website-transformation/07 §6.14, roadmap T8.07). Footer link only.
 * No open roles, pay, equity or perks are listed until the business confirms them (V-20);
 * JobPosting structured data only for real, open roles. The old page is in src/legacy.
 */
const PATH = "/careers";
const TITLE = "Careers";
const DESCRIPTION =
  "Work on cloud engineering, DevOps and DevSecOps, cloud security and compliance. Who we hire and how to get in touch.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: { title: `${TITLE} | AlgoCrew`, description: DESCRIPTION, url: canonical(PATH), type: "website" },
};

export default function CareersPage() {
  return (
    <Page>
      <PageHero
        trail={[{ label: "Careers", href: PATH }]}
        title="Careers"
        lead="We hire engineers who design, secure and operate cloud platforms."
        actions={
          <ButtonRow>
            <Button href="/contact?topic=other" arrow>
              Get in touch
            </Button>
          </ButtonRow>
        }
      />
      <Section id="who">
        <Split>
          <SectionHead eyebrow="Who we hire" title="Cloud, DevOps and security engineers." />
          <Checklist
            items={[
              "Cloud engineers who build landing zones and platforms as code.",
              "DevOps and platform engineers who build pipelines teams rely on.",
              "Security engineers who design identity, detection and controls for cloud environments.",
            ]}
          />
        </Split>
      </Section>
      <Section tone="soft" id="roles">
        <Split>
          <SectionHead eyebrow="Open roles" title="No roles are listed right now." />
          <p>
            We still want to hear from engineers in these areas. Use the contact form, choose &ldquo;Other&rdquo; as the
            topic, and tell us about the work you do.
          </p>
        </Split>
      </Section>
      <Section>
        <CtaBlock
          title="Questions about working here?"
          text="Tell us about yourself and the work you want to do."
          primary={{ label: "Get in touch", href: "/contact?topic=other" }}
        />
      </Section>
    </Page>
  );
}
