import type { Metadata } from "next";
import { Lifecycle } from "@/components/diagrams/Lifecycle";
import { canonical } from "@/components/seo/JsonLd";
import {
  ComplianceSplit, EngagementPanels, FrameworkCards, HomeHero, InsightsFeature, OutputArtifacts, PracticeBento,
  ScopeStrip, homeStyles,
} from "@/components/sections";
import {
  BoundaryStatement, Button, ButtonRow, Card, CtaBlock, Faq, Grid, Inset, Page, Section, SectionHead, Split, Steps, TextLink,
} from "@/components/ui";
import { blogPosts } from "@/resources/blog";
import { ENGAGEMENT_FAQ, ENGAGEMENT_MODELS } from "@/resources/engagement";
import { liveFrameworks } from "@/resources/frameworks";
import { sentenceList } from "@/resources/gating";
import { liveServices, pillars, servicePath } from "@/resources/pillars";
import { livePlatforms } from "@/resources/platforms";
import { site } from "@/resources/site";

/**
 * Homepage (roadmap T4.04; prototype: docs/website-transformation/prototypes/index.html).
 * Section layouts follow the design refresh (docs/website-transformation/17-design-refresh.md).
 * Gated sections follow the launch states: with no platform verified the platforms section is
 * left out, and with no framework page published the frameworks section is replaced by the
 * governance section.
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
        <PracticeBento
          practices={practices.map((p) => ({
            slug: p.slug,
            href: servicePath(p),
            title: p.title,
            text: CARD_LINES[p.slug] ?? p.line,
            chips: CHIPS[p.slug],
          }))}
        />
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
          <ComplianceSplit
            head={<SectionHead eyebrow="Compliance & governance" title="Requirements turned into controls and evidence." />}
            links={[
              { href: "/compliance#cloud-governance", title: "Cloud governance", text: "Account structure, guardrails and policies that apply to every workload." },
              { href: "/compliance#policy-controls", title: "Policy and control implementation", text: "Controls written as code and checked continuously." },
              { href: "/compliance#audit-readiness", title: "Audit readiness", text: "Organized, current evidence your assessor can use." },
            ]}
            foot={<BoundaryStatement />}
          />
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
      <Section id="outputs" tight>
        <Inset>
          <div className={homeStyles.insetGrid}>
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
          <OutputArtifacts
            items={[
              { label: "Design", title: "Landing-zone design", text: "Account or subscription structure, network, identity and guardrails, as diagrams and code." },
              { label: "Controls", title: "Control map", text: "Framework requirements mapped to cloud configuration and the checks that enforce it." },
              { label: "Evidence", title: "Evidence index", text: "Where each piece of audit evidence lives and how it is produced." },
              { label: "Operations", title: "Operations report", text: "Incidents, changes, cost and posture, on an agreed schedule." },
            ]}
          />
          </div>
        </Inset>
      </Section>

      {/* 8b. Engagement models (copy shared with /our-approach) */}
      <Section tone="soft" id="engagement">
        <SectionHead
          eyebrow="Engagement models"
          title="Two ways to work with us."
          lead="Both start the same way: a conversation about your environment, then a proposal."
        />
        <EngagementPanels items={ENGAGEMENT_MODELS} />
        <p>
          <TextLink href="/our-approach#engagement-models">How engagements run</TextLink>
        </p>
      </Section>

      {/* 9. Insights */}
      {posts.length > 0 && (
        <Section id="insights">
          <SectionHead eyebrow="Insights" title="Current technical thinking." />
          <InsightsFeature
            posts={posts.map((post) => ({ href: `/blog/${post.slug}`, category: INSIGHT_CATEGORY[post.slug], title: post.title }))}
          />
          <p>
            <TextLink href="/blog">All insights</TextLink>
          </p>
        </Section>
      )}

      {/* 9b. FAQ (copy shared with /our-approach, which carries the FAQ schema) */}
      <Section tone="soft" id="faq" tight>
        <Split>
          <SectionHead eyebrow="FAQ" title="Questions about working with us." />
          <Faq items={ENGAGEMENT_FAQ} />
        </Split>
      </Section>

      {/* 10. Final CTA */}
      <Section id="contact">
        <CtaBlock
          title="Tell us about your environment."
          text={`Share which clouds you run, what you need to secure and which frameworks apply.${
            site.responseTime ? ` ${site.responseTime}` : ""
          }`}
          primary={{ label: "Discuss Your Cloud Strategy", href: "/contact" }}
          secondary={site.bookingUrl ? { label: "Book a 30-minute call", href: site.bookingUrl } : undefined}
        />
      </Section>
    </Page>
  );
}
