"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts, categories } from "@/resources/blog";
import styles from "./blog.module.scss";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function BlogListing() {
  const [active, setActive] = useState("All");

  const featured = blogPosts.find(p => p.featured)!;
  const rest = blogPosts.filter(p =>
    !p.featured && (active === "All" || p.category === active)
  );
  const showFeatured = active === "All" || featured.category === active;

  return (
    <>
      {/* ── Category filters ── */}
      <div className={styles.filters}>
        {categories.map(c => (
          <button
            key={c}
            className={`${styles.filterBtn} ${active === c ? styles.filterBtnActive : ""}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ── Featured ── */}
      {showFeatured && (
        <div className={styles.featuredSection}>
          <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
            {/* Visual half */}
            <div className={styles.featuredVisual}>
              <div className={styles.featuredBg} style={{ background: featured.coverGradient }} />
              <div className={styles.featuredNoise} />
              <div className={styles.featuredBigNum}>01</div>
            </div>

            {/* Body half */}
            <div className={styles.featuredBody}>
              <div>
                <div className={styles.featuredMeta}>
                  <span className={styles.catPill}>{featured.category}</span>
                  <span className={styles.metaDot} />
                  <span className={styles.metaText}>{featured.readTime} min read</span>
                  <span className={styles.metaDot} />
                  <span className={styles.metaText}>{formatDate(featured.date)}</span>
                </div>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              </div>
              <div className={styles.featuredFooter}>
                <div className={styles.authorRow}>
                  <div className={styles.authorAvatar}
                    style={{ background: featured.author.color }}>
                    {featured.author.initials}
                  </div>
                  <div>
                    <p className={styles.authorName}>{featured.author.name}</p>
                    <p className={styles.authorRole}>{featured.author.role}</p>
                  </div>
                </div>
                <span className={styles.featuredArrow}>↗</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* ── Grid ── */}
      {rest.length > 0 && (
        <div className={styles.gridSection}>
          {showFeatured && <p className={styles.gridHeading}>More Articles</p>}
          <div className={styles.grid}>
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                <div className={styles.cardVisual}>
                  <div className={styles.cardBg} style={{ background: post.coverGradient }} />
                  <div className={styles.cardNoise} />
                  <span className={styles.cardCat}>{post.category}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span>{formatDate(post.date)}</span>
                    <span className={styles.metaDot} />
                    <span>{post.readTime} min read</span>
                  </div>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <div className={styles.cardFooter}>
                    <div className={styles.cardTags}>
                      {post.tags.slice(0, 3).map(t => (
                        <span key={t} className={styles.cardTag}>{t}</span>
                      ))}
                    </div>
                    <span className={styles.cardArrow}>↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
