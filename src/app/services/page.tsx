import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, canonical, serviceSchema } from "@/components/seo/JsonLd";
import { FrameworkQuickLinks, PageHero } from "@/components/sections";
import sec from "@/components/sections/sections.module.scss";
import { Button, ButtonRow, CtaBlock, Ledger, LedgerRow, Page, Section, SectionHead, Split } from "@/components/ui";
import { liveFrameworks } from "@/resources/frameworks";
import { liveServices, pillars, servicePath, services } from "@/resources/pillars";
import { livePlatforms } from "@/resources/platforms";

/**
 * /services: the five practices on one page (docs/website-transformation/07 §6.1, 08 §12 wireframe).
 * Lists live pillars only. Each pillar shows its menu capabilities, linking to a standalone
 * page where one is live, otherwise to the anchor on the pillar page.
 */
const PATH = "/services";
const TITLE = "Cloud Consulting, DevSecOps & Security Services";
const DESCRIPTION =
  "Cloud consulting and engineering, DevOps and DevSecOps, cloud security, compliance and managed cloud services, with security controls built into delivery.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonical(PATH), type: "website" },
};

export default function ServicesPage() {
  const live = liveServices();
  const livePillars = pillars().filter((p) => live.includes(p));
  const platforms = livePlatforms();
  const frameworks = liveFrameworks();

  return (
    <Page>
      <JsonLd data={serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH })} />
      <PageHero
        trail={[{ label: "Services", href: PATH }]}
        title="Cloud, DevSecOps, security and compliance services."
        lead="Five practices, one accountable team. Each practice has its own method and its own list of deliverables."
        actions={
          <ButtonRow>
            <Button href="/contact" arrow>
              Discuss Your Cloud Strategy
            </Button>
          </ButtonRow>
        }
      />

      <Section id="practices">
        <SectionHead eyebrow="Practices" title="Find the practice that fits your problem." />
        <Ledger>
          {livePillars.map((pillar, i) => {
            const links = pillar.capabilities
              .filter((c) => c.inMenu && c.body)
              .map((c) => {
                const page = c.page ? services.find((s) => s.slug === c.page && live.includes(s)) : undefined;
                return { label: page?.title ?? c.title, href: page ? servicePath(page) : `${servicePath(pillar)}#${c.id}` };
              });
            return (
              <LedgerRow key={pillar.slug} id={pillar.slug} title={`0${i + 1} ${pillar.title}`}>
                <p className={sec.pillarLine}>
                  {pillar.line}{" "}
                  <Link href={servicePath(pillar)}>
                    {pillar.title}
                    <span aria-hidden="true"> →</span>
                  </Link>
                </p>
                <ul className={sec.linkList} aria-label={`${pillar.title} capabilities`}>
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </LedgerRow>
            );
          })}
        </Ledger>
      </Section>

      {(platforms.length > 0 || frameworks.length > 0) && (
        <Section tone="soft" tight>
          <Split>
            <SectionHead eyebrow="Platforms and frameworks" title="Delivered on your cloud, for the frameworks you answer to." />
            <div>
              {platforms.length > 0 && (
                <ul className={sec.quick} aria-label="Platforms">
                  {platforms.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/cloud-platforms/${p.slug}`}>{p.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
              <FrameworkQuickLinks frameworks={frameworks} />
            </div>
          </Split>
        </Section>
      )}

      <Section>
        <CtaBlock
          title="Not sure where to start?"
          text="Tell us what you run and what needs to change. We will suggest a first step."
          primary={{ label: "Discuss Your Cloud Strategy", href: "/contact" }}
        />
      </Section>
    </Page>
  );
}
