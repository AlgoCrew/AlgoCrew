export const dynamic = "force-static";

import type { Metadata } from "next";
import { canonical } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections";
import { InsightsList } from "@/components/sections/InsightsList";
import { CtaBlock, Page, Section } from "@/components/ui";
import { baseURL } from "@/resources";
import { listedPosts } from "@/resources/blog";

/** /blog (Insights). Design refresh, docs/website-transformation/17. */
const PATH = "/blog";
const TITLE = "Insights";
const DESCRIPTION =
  "Practical articles on cloud architecture, DevOps and DevSecOps, and cloud security, from the engineers who build and run these platforms.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonical(PATH), type: "website", images: ["/images/og/home.jpg"] },
};

const blogListingSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${baseURL}/blog`,
  url: `${baseURL}/blog`,
  name: "AlgoCrew Insights",
  description: DESCRIPTION,
  publisher: { "@id": `${baseURL}/#organization` },
};

export default function BlogPage() {
  // Newest first; the client gets summaries only, never article bodies.
  const posts = listedPosts()
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ slug, title, excerpt, category, date, readTime }) => ({ slug, title, excerpt, category, date, readTime }));

  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }} />
      <PageHero
        trail={[{ label: "Insights", href: PATH }]}
        title="Notes from building secure cloud platforms."
        lead="Practical guides on cloud architecture, DevOps and DevSecOps, and cloud security: what we recommend, and why."
      />
      <Section tight>
        <InsightsList posts={posts} />
      </Section>
      <Section>
        <CtaBlock
          title="Tell us about your environment."
          text="Share which clouds you run, what you need to secure and which frameworks apply."
          primary={{ label: "Discuss Your Cloud Strategy", href: "/contact" }}
        />
      </Section>
    </Page>
  );
}
