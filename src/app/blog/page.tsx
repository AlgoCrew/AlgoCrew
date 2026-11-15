export const dynamic = "force-static";

import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { BlogListing } from "./BlogClient";
import { CtaBlock, Section } from "@/components/ui";
import styles from "./blog.module.scss";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "Insights",
      description: "Engineering insights, product thinking, and lessons from shipping software at scale with senior-only teams.",
      baseURL,
      path: "/blog",
      image: "/images/og/home.jpg",
    }),
    alternates: { canonical: "/blog" },
  };
}

const blogListingSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${baseURL}/blog`,
  url: `${baseURL}/blog`,
  name: "AlgoCrew Blog",
  description: "Engineering insights, product thinking, and lessons from shipping software at scale with senior-only teams.",
  publisher: { "@type": "Organization", name: "AlgoCrew", url: baseURL },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseURL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseURL}/blog` },
    ],
  },
};

export default function BlogPage() {
  return (
    <div style={{ width: "100%", overflowX: "clip", background: "var(--bg-page)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }} />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.label}>THE ALGOCREW BLOG</span>
          <h1 className={styles.heroTitle}>
            Engineering<br />
            <span className={styles.accent}>Perspectives.</span>
          </h1>
          <p className={styles.heroSub}>
            Lessons from shipping production software with senior-only teams,
            architecture, culture, AI, and everything in between.
          </p>
        </div>
      </section>

      {/* ── Listing (client — filters) ── */}
      <BlogListing />

      {/* ── CTA ── */}
      <Section>
        <CtaBlock title="Tell us about your environment." text="Share which clouds you run, what you need to secure and which frameworks apply." primary={{ label: "Discuss Your Cloud Strategy", href: "/contact" }} />
      </Section>
    </div>
  );
}
