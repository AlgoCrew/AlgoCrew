import type { Metadata } from "next";
import Link from "next/link";
import { Lifecycle } from "@/components/diagrams/Lifecycle";
import { canonical } from "@/components/seo/JsonLd";
import { FrameworkCards, HomeHero, PillarIcon, ScopeStrip, pillarsClass } from "@/components/sections";
import {
  BoundaryStatement, Button, ButtonRow, Card, CtaBlock, Grid, Page, Section, SectionHead, Split, Steps, TextLink,
} from "@/components/ui";
import { blogPosts } from "@/resources/blog";
import { liveFrameworks } from "@/resources/frameworks";
import { sentenceList } from "@/resources/gating";
import { liveServices, pillars, servicePath } from "@/resources/pillars";
import { livePlatforms } from "@/resources/platforms";
import { site } from "@/resources/site";

/**
 * Homepage (roadmap T4.04; prototype: docs/website-transformation/prototypes/index.html).
 * Section order follows the prototype. Gated sections follow its launch states: with no
 * platform verified the platforms section is left out, and with no framework page published
 * the frameworks section is replaced by the governance section.
 */
const TITLE = "AlgoCrew | Cloud Engineering, DevSecOps & Compliance";
const DESCRIPTION =
  "We design, build and run secure cloud platforms, with security controls and compliance evidence built into delivery, from DevSecOps to managed services.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: canonical("/") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonical("/"), type: "website" },
};

/** Three short capability tags per pillar card, as in the prototype. */
const CHIPS: Record<string, string[]> = {
  "cloud-consulting": ["Architecture", "Migration", "Multi-cloud"],
  devops: ["CI/CD", "IaC", "Kubernetes"],
  "cloud-security": ["Zero Trust", "IAM", "Detection"],
  compliance: ["Governance", "Audit readiness"],
  "managed-cloud-services": ["Monitoring", "Cost", "Backup & DR"],
};
const CARD_LINES: Record<string, string> = {
  "cloud-consulting": "The right foundation, designed and built. Strategy, architecture, landing zones and migration in planned waves.",
  devops: "Delivery that is repeatable, observable and secure by default. Pipelines, infrastructure as code and platform engineering.",
  "cloud-security": "Controls that fit how your cloud actually works: identity, segmentation, detection and remediation.",
  compliance: "Requirements turned into controls and evidence your assessor can use.",
  "managed-cloud-services": "Operations with a defined scope and clear reporting.",
};
/** Three retained Insights posts, one per category (07 §9). */
const INSIGHTS = ["supply-chain-security-software", "zero-trust-security-architecture-guide", "terraform-infrastructure-as-code-patterns"];
const INSIGHT_CATEGORY: Record<string, string> = {
  "supply-chain-security-software": "DevOps & DevSecOps",
  "zero-trust-security-architecture-guide": "Cloud Security",
  "terraform-infrastructure-as-code-patterns": "Cloud Engineering",
};

export default function HomePage() {
  const live = liveServices();
  const practices = pillars().filter((p) => live.includes(p));
  const platforms = livePlatforms();
  const frameworks = liveFrameworks();
  const devsecopsLive = live.some((s) => s.slug === "devsecops");
  const posts = INSIGHTS.map((slug) => blogPosts.find((p) => p.slug === slug)).filter((p) => p !== undefined);

  return (
    <Page>
      {/* 1. Hero */}
      <HomeHero
        eyebrow="Cloud · DevSecOps · Security · Compliance"
        title="Engineering Secure, Scalable Cloud Infrastructure."
        lead={`We design, build and run cloud platforms${
          platforms.length ? ` on ${sentenceList(platforms.map((p) => p.name))}` : ""
        }, with security controls and compliance evidence built in from the first pipeline.`}
        platformNames={platforms.map((p) => p.shortName)}
        actions={
          <ButtonRow>
            <Button href="/contact" arrow>
              Discuss Your Cloud Strategy
            </Button>
            <Button href="#capabilities" variant="outline">
              Explore Our Capabilities
            </Button>
          </ButtonRow>
        }
      />

      {/* 2. Scope, method, role (client logos are on About only, 07 §7) */}
      <Section tight>
        <ScopeStrip />
      </Section>

      {/* 3. Capabilities */}
      <Section tone="soft" id="capabilities">
        <SectionHead
          eyebrow="Capabilities"
          title="Five practices. One accountable team."
          lead="Each practice has its own method and its own list of deliverables."
        />
        <div className={pillarsClass}>
          {practices.map((p) => (
            <Card
              key={p.slug}
              href={servicePath(p)}
              icon={<PillarIcon slug={p.slug} />}
              title={p.title}
              chips={CHIPS[p.slug]}
              more="Explore the practice"
            >
              <p>{CARD_LINES[p.slug] ?? p.line}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 4. Cloud platforms: only verified platforms */}
      {platforms.length > 0 && (
        <Section id="platforms">
          <Split>
            <SectionHead eyebrow="Cloud platforms" title="One method across your clouds." />
            <p>
              We work with each platform&apos;s native services first, so what we build is supported, documented and yours
              to run.
            </p>
          </Split>
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

      {/* 5. DevSecOps lifecycle */}
      <Section tone="dark" id="lifecycle">
        <SectionHead
          eyebrow="DevSecOps"
          title="Security is part of every stage, not a gate at the end."
          lead="Select a stage to see the controls we build into it."
        />
        <Lifecycle />
        {devsecopsLive && (
          <p>
            <TextLink href="/services/devsecops">Explore DevSecOps</TextLink>
          </p>
        )}
      </Section>

      {/* 6. Security & compliance */}
      {frameworks.length > 0 ? (
        <Section id="frameworks">
          <SectionHead eyebrow="Security & compliance" title="Controls and evidence for the frameworks you answer to." />
          <FrameworkCards frameworks={frameworks} />
          <BoundaryStatement />
          <p>
            <TextLink href="/compliance">Compliance &amp; Governance</TextLink>
          </p>
        </Section>
      ) : (
        <Section id="compliance">
          <SectionHead eyebrow="Compliance & governance" title="Requirements turned into controls and evidence." />
          <Grid cols={3}>
            <Card href="/compliance#cloud-governance" title="Cloud governance" more="Explore">
              <p>Account structure, guardrails and policies that apply to every workload.</p>
            </Card>
            <Card href="/compliance#policy-controls" title="Policy and control implementation" more="Explore">
              <p>Controls written as code and checked continuously.</p>
            </Card>
            <Card href="/compliance#audit-readiness" title="Audit readiness" more="Explore">
              <p>Organized, current evidence your assessor can use.</p>
            </Card>
          </Grid>
          <BoundaryStatement />
        </Section>
      )}

      {/* 7. Our approach */}
      <Section tone="soft" id="approach">
        <SectionHead eyebrow="Our approach" title="A method you can picture before you sign." />
        <Steps
          band="Secure · applied at every step"
          items={[
            { title: "Assess", text: "Current estate, risks and requirements. Output: findings and a prioritized plan." },
            { title: "Architect", text: "Target design and guardrails. Output: architecture and control map." },
            { title: "Implement", text: "Build as code, in reviewed increments. Output: working platform and pipelines." },
            { title: "Manage", text: "Operate within a defined scope. Output: operations reports." },
            { title: "Optimize", text: "Cost, performance and posture reviews. Output: tracked improvements." },
          ]}
        />
        <p>
          <TextLink href="/our-approach">How we work</TextLink>
        </p>
      </Section>

      {/* 8. What you get */}
      <Section id="outputs">
        <Split>
          <div>
            <SectionHead
              eyebrow="What you get"
              title="Specific outputs, not slideware."
              lead="Typical outputs of our engagements."
            />
            {site.trustPageVerified && (
              <TextLink href="/trust">Trust &amp; Security: how we handle access to your environment</TextLink>
            )}
          </div>
          <Grid cols={2}>
            <Card label="Design" title="Landing-zone design">
              <p>Account or subscription structure, network, identity and guardrails, as diagrams and code.</p>
            </Card>
            <Card label="Controls" title="Control map">
              <p>Framework requirements mapped to cloud configuration and the checks that enforce it.</p>
            </Card>
            <Card label="Evidence" title="Evidence index">
              <p>Where each piece of audit evidence lives and how it is produced.</p>
            </Card>
            <Card label="Operations" title="Operations report">
              <p>Incidents, changes, cost and posture, on an agreed schedule.</p>
            </Card>
          </Grid>
        </Split>
      </Section>

      {/* 9. Insights */}
      {posts.length > 0 && (
        <Section tone="soft" id="insights">
          <SectionHead eyebrow="Insights" title="Current technical thinking." />
          <Grid cols={3}>
            {posts.map((post) => (
              <Card key={post.slug} href={`/blog/${post.slug}`} label={INSIGHT_CATEGORY[post.slug]} title={post.title} more="Read" />
            ))}
          </Grid>
          <p>
            <Link href="/blog">All insights</Link>
          </p>
        </Section>
      )}

      {/* 10. Final CTA */}
      <Section id="contact">
        <CtaBlock
          title="Tell us about your environment."
          text="Share which clouds you run, what you need to secure and which frameworks apply."
          primary={{ label: "Discuss Your Cloud Strategy", href: "/contact" }}
          secondary={site.bookingUrl ? { label: "Book a 30-minute call", href: site.bookingUrl } : undefined}
        />
      </Section>
    </Page>
  );
}
