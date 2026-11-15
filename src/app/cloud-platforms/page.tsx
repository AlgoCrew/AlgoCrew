import type { Metadata } from "next";
import { JsonLd, canonical, serviceSchema } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections";
import { Button, ButtonRow, Card, CtaBlock, Grid, Ledger, LedgerRow, Page, Section, SectionHead, TextLink } from "@/components/ui";
import { sentenceList } from "@/resources/gating";
import { isServiceHrefLive, serviceTitleForHref } from "@/resources/pillars";
import { PLATFORM_SECTIONS, PLATFORM_SECTION_SUMMARY, livePlatforms } from "@/resources/platforms";

/**
 * /cloud-platforms: how we work across clouds, and the route to each published platform page
 * (docs/website-transformation/04 §3). Names only platforms whose pages are live; with none
 * verified it is a method page that names no vendor.
 */
const PATH = "/cloud-platforms";
const TITLE = "Cloud Platforms";
const DESCRIPTION =
  "One method across your clouds: strategy, landing zones, migration, DevSecOps, security, operations and governance, built on native services.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonical(PATH), type: "website" },
};

export default function CloudPlatformsPage() {
  const platforms = livePlatforms();
  const named = sentenceList(platforms.map((p) => p.name));

  return (
    <Page>
      <JsonLd data={serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH })} />
      <PageHero
        trail={[{ label: TITLE, href: PATH }]}
        title="One method across your clouds."
        lead={`We work with each platform's native services first${named ? `, on ${named}` : ""}, so what we build is supported, documented and yours to run.`}
        actions={
          <ButtonRow>
            <Button href="/contact?topic=platform" arrow>
              Discuss Your Cloud Strategy
            </Button>
          </ButtonRow>
        }
      />

      {platforms.length > 0 && (
        <Section id="platforms">
          <SectionHead eyebrow="Platforms" title="Choose your platform." />
          <Grid cols="fit">
            {platforms.map((p, i) => (
              <Card
                key={p.slug}
                href={`/cloud-platforms/${p.slug}`}
                label={`0${i + 1}`}
                title={p.name}
                chips={p.highlights}
                more={`${p.shortName} capabilities`}
              >
                <p>{p.menuDescriptor}.</p>
              </Card>
            ))}
          </Grid>
        </Section>
      )}

      <Section tone="soft" id="method">
        <SectionHead
          eyebrow="The method"
          title="Seven capability areas, the same on every platform."
          lead="The tools change from cloud to cloud. The order of work, the reviews and the outputs do not."
        />
        <Ledger>
          {PLATFORM_SECTIONS.map((id) => {
            const area = PLATFORM_SECTION_SUMMARY[id];
            return (
              <LedgerRow key={id} id={id} title={area.title}>
                <p>{area.body}</p>
                {isServiceHrefLive(area.link) && (
                  <p>
                    <TextLink href={area.link}>{serviceTitleForHref(area.link) ?? "More on this service"}</TextLink>
                  </p>
                )}
              </LedgerRow>
            );
          })}
        </Ledger>
      </Section>

      <Section>
        <CtaBlock
          title="Tell us which clouds you run."
          text="And what needs to change. We will suggest where to start."
          primary={{ label: "Discuss Your Cloud Strategy", href: "/contact?topic=platform" }}
        />
      </Section>
    </Page>
  );
}
