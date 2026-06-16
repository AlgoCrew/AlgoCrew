import { notFound } from "next/navigation";
import { Meta } from "@once-ui-system/core";
import Link from "next/link";
import { baseURL } from "@/resources";
import { blogPosts, getPost, getRelated } from "@/resources/blog";
import { SendUsEmail } from "@/components/home/SendUsEmail";
import { ShareButton } from "./ShareButton";
import styles from "../blog.module.scss";

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    ...Meta.generate({
      title: post.metaTitle ?? `${post.title}, AlgoCrew Blog`,
      description: post.metaDescription ?? post.excerpt,
      baseURL,
      path: `/blog/${slug}`,
      image: "/images/og/home.jpg",
    }),
    alternates: { canonical: `/blog/${slug}` },
  };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/* Extract h2 headings from raw HTML body for sidebar ToC */
function extractHeadings(html: string) {
  const matches = [...html.matchAll(/<h2>(.*?)<\/h2>/g)];
  return matches.map(m => m[1]);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelated(slug);
  const headings = extractHeadings(post.body);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${baseURL}/blog/${slug}`,
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.updated ?? post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
      worksFor: { "@type": "Organization", name: "AlgoCrew", url: baseURL },
    },
    publisher: {
      "@type": "Organization",
      name: "AlgoCrew",
      url: baseURL,
      logo: { "@type": "ImageObject", url: `${baseURL}/images/LogoDark.png` },
    },
    image: `${baseURL}/images/og/home.jpg`,
    url: `${baseURL}/blog/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${baseURL}/blog/${slug}` },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    timeRequired: `PT${post.readTime}M`,
    inLanguage: "en-US",
    isPartOf: { "@type": "Blog", "@id": `${baseURL}/blog`, name: "AlgoCrew Blog" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseURL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${baseURL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${baseURL}/blog/${slug}` },
      ],
    },
  };

  return (
    <main style={{ width: "100%", overflowX: "clip", background: "var(--bg-page)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* ── Hero ── */}
      <section className={styles.postHero}>
        <div className={styles.postHeroBg} style={{ background: post.coverGradient }} />
        <div className={styles.postHeroNoise} />
        <div className={styles.postHeroOverlay} />

        <div className={styles.postHeroInner}>
          <Link href="/blog" className={styles.postBackLink}>← All Articles</Link>

          <div className={styles.postHeroMeta}>
            <span className={styles.catPill} style={{
              background: `color-mix(in srgb, ${post.accent} 15%, transparent)`,
              color: post.accent,
              border: `1px solid color-mix(in srgb, ${post.accent} 30%, transparent)`,
            }}>
              {post.category}
            </span>
            <span className={styles.metaDot} style={{ background: "rgba(255,255,255,0.3)" }} />
            <span className={styles.metaText} style={{ color: "rgba(255,255,255,0.5)" }}>
              {post.readTime} min read
            </span>
          </div>

          <h1 className={styles.postTitle}>{post.title}</h1>

          <div className={styles.postHeroFooter}>
            <div className={styles.postAuthorRow}>
              <div className={styles.postAuthorAvatar} style={{ background: post.author.color }}>
                {post.author.initials}
              </div>
              <div>
                <p className={styles.postAuthorName}>{post.author.name}</p>
                <p className={styles.postAuthorRole}>{post.author.role}</p>
              </div>
            </div>
            <div className={styles.postHeroMetaRight}>
              <span>{formatDate(post.date)}</span>
              <span className={styles.metaDot} style={{ background: "rgba(255,255,255,0.3)" }} />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body + Sidebar ── */}
      <div className={styles.postLayout}>

        {/* Article */}
        <article
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* Sidebar */}
        <aside className={styles.sidebar}>

          {headings.length > 0 && (
            <div className={styles.sideCard}>
              <p className={styles.sideCardTitle}>In this article</p>
              <ul className={styles.tocList}>
                {headings.map(h => (
                  <li key={h} className={styles.tocItem}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.sideCard}>
            <p className={styles.sideCardTitle}>Tags</p>
            <div className={styles.sideTagList}>
              {post.tags.map(t => (
                <span key={t} className={styles.sideTag}>{t}</span>
              ))}
            </div>
          </div>

          <div className={styles.sideCard}>
            <p className={styles.sideCardTitle}>Share this article</p>
            <ShareButton />
          </div>

          <div className={styles.sideCard}>
            <p className={styles.sideCardTitle}>Work with us</p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65, margin: "0 0 14px" }}>
              Senior engineers, no lock-in, milestone billing.
            </p>
            <Link href="/contact" style={{
              display: "block", textAlign: "center",
              padding: "10px 0", borderRadius: 100,
              background: "linear-gradient(135deg, #06c8e8 0%, #2563eb 100%)",
              color: "#04121a", WebkitTextFillColor: "#04121a",
              fontSize: 13, fontWeight: 800, textDecoration: "none",
            }}>
              Start a Project →
            </Link>
          </div>

        </aside>
      </div>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.sectionInner}>
            <span className={styles.label}>KEEP READING</span>
            <h2 style={{
              fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900,
              letterSpacing: "-0.04em", color: "var(--text-primary)", margin: "0 0 4px",
            }}>
              Related Articles
            </h2>
            <div className={styles.relatedGrid}>
              {related.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.relatedCard}>
                  <p className={styles.relatedCat}>{p.category}</p>
                  <h3 className={styles.relatedTitle}>{p.title}</h3>
                  <span className={styles.relatedMeta}>{p.readTime} min · {formatDate(p.date)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SendUsEmail />
    </main>
  );
}
