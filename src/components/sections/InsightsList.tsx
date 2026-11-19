"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Heading } from "@/components/ui";
import s from "./insights.module.scss";

/**
 * Insights listing (design refresh, docs/website-transformation/17): featured article, topic
 * filters with counts, title search, card grid. Receives summaries only, so article bodies are
 * not shipped to the browser.
 */
export type InsightSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** A drawn cover per topic, so covers say what an article is about (decorative). */
function Cover({ category, seed }: { category: string; seed: number }) {
  // Per-article variation, so covers on the same topic still differ.
  const shift = (seed % 5) * 6;
  const lit = seed % 5;
  let art;
  if (category === "DevOps") {
    art = (
      <g transform={`translate(${shift - 12} 0)`}>
        <path className={s.artLine} d="M24 90h272" />
        {[40, 104, 168, 232, 296].map((x, i) => (
          <g key={x}>
            <circle className={i === lit ? s.artNodeOn : s.artNode} cx={x} cy="90" r="11" />
            {i < 4 && <rect className={s.artGate} x={x + 26} y="83" width="14" height="14" rx="3" transform={`rotate(45 ${x + 33} 90)`} />}
          </g>
        ))}
        <rect className={s.artBand} x="40" y="124" width="256" height="18" rx="9" />
      </g>
    );
  } else if (category === "Security") {
    art = (
      <g transform={`translate(${160 + shift - 12} 90)`}>
        {[78, 58, 38].map((r, i) => (
          <rect key={r} className={i === lit % 3 ? s.artRingOn : s.artRing} x={-r} y={-r * 0.62} width={r * 2} height={r * 1.24} rx={14 - i * 3} />
        ))}
        <path className={s.artShield} d="M0-20l15 6v11c0 10-6.5 18-15 22-8.5-4-15-12-15-22v-11z" />
        <path className={s.artTick} d="M-6 0l4 4 8-8" />
      </g>
    );
  } else {
    art = (
      <g transform={`translate(${shift - 12} 0)`}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${96 + i * 14} ${40 + i * 30})`}>
            <rect className={i === lit % 3 ? s.artLayerOn : s.artLayer} width="152" height="44" rx="10" />
            <rect className={s.artBar} x="14" y="17" width={[60, 84, 44][i]} height="10" rx="5" />
            <circle className={s.artDot} cx="134" cy="22" r="4" />
          </g>
        ))}
      </g>
    );
  }
  return (
    <svg className={s.cover} viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id={`grid-${seed}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path className={s.artGrid} d="M20 0H0V20" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill={`url(#grid-${seed})`} />
      {art}
    </svg>
  );
}

const Meta = ({ post }: { post: InsightSummary }) => (
  <p className={s.meta}>
    <time dateTime={post.date}>{formatDate(post.date)}</time>
    <span aria-hidden="true">·</span>
    {post.readTime} min read
  </p>
);

export function InsightsList({ posts }: { posts: readonly InsightSummary[] }) {
  const [topic, setTopic] = useState("All");
  const [query, setQuery] = useState("");

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [["All", posts.length] as const, ...[...counts.entries()].sort((a, b) => b[1] - a[1])];
  }, [posts]);

  const q = query.trim().toLowerCase();
  const filtering = topic !== "All" || q !== "";
  const matches = posts.filter(
    (p) => (topic === "All" || p.category === topic) && (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)),
  );
  const [featured, ...rest] = posts;
  const grid = filtering ? matches : rest;

  return (
    <>
      {!filtering && featured && (
        <section className={s.featuredWrap} aria-labelledby="featured-title">
          <Link href={`/blog/${featured.slug}`} className={s.featured}>
            <div className={s.featuredCover}>
              <Cover category={featured.category} seed={0} />
              <span className={s.chip}>Latest · {featured.category}</span>
            </div>
            <div className={s.featuredBody}>
              <Meta post={featured} />
              <Heading as="h2" size="h2" id="featured-title">
                {featured.title}
              </Heading>
              <p className={s.excerpt}>{featured.excerpt}</p>
              <span className={s.more}>
                Read the article <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className={s.browse} aria-labelledby="all-articles">
        <div className={s.toolbar}>
          <Heading as="h2" size="h3" id="all-articles">
            {filtering ? "Matching articles" : "More articles"}
          </Heading>
          <div className={s.controls}>
            <div className={s.topics} role="group" aria-label="Filter by topic">
              {topics.map(([name, count]) => (
                <button
                  key={name}
                  type="button"
                  className={s.topic}
                  aria-pressed={topic === name}
                  onClick={() => setTopic(name)}
                >
                  {name} <span>{count}</span>
                </button>
              ))}
            </div>
            <label className={s.search}>
              <span className={s.srOnly}>Search articles</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="9" cy="9" r="6" />
                <path d="m13.5 13.5 4 4" />
              </svg>
              <input type="search" value={query} placeholder="Search articles" onChange={(e) => setQuery(e.target.value)} />
            </label>
          </div>
        </div>

        <p className={s.srOnly} aria-live="polite">
          {filtering ? `${matches.length} ${matches.length === 1 ? "article" : "articles"} found` : ""}
        </p>

        {grid.length > 0 ? (
          <ul className={s.grid}>
            {grid.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className={s.card}>
                  <div className={s.cardCover}>
                    <Cover category={post.category} seed={posts.indexOf(post) + 1} />
                    <span className={s.chip}>{post.category}</span>
                  </div>
                  <div className={s.cardBody}>
                    <Meta post={post} />
                    <Heading as="h3" size="h3">
                      {post.title}
                    </Heading>
                    <p className={s.excerpt}>{post.excerpt}</p>
                    <span className={s.more}>
                      Read <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={s.empty}>
            <p>No articles match that search.</p>
            <button
              type="button"
              className={s.topic}
              onClick={() => {
                setTopic("All");
                setQuery("");
              }}
            >
              Show all articles
            </button>
          </div>
        )}
      </section>
    </>
  );
}
