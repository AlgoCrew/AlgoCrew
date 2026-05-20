"use client";

import Image from "next/image";
import Link from "next/link";
import { ourProjects } from "@/resources";
import styles from "./ServiceRelatedWork.module.scss";

const catColors: Record<string, string> = {
  "Web application":   "#06c8e8",
  "Cloud application": "#a78bfa",
  "SaaS Platform":     "#34d399",
};

// Map service slug → project categories to prefer
const serviceToCategories: Record<string, string[]> = {
  "web-app-development":  ["Web application", "SaaS Platform"],
  "cloud-devops":         ["Cloud application"],
  "e-commerce":           ["Web application"],
  "data-automation":      ["SaaS Platform", "Cloud application"],
  "microsoft-solutions":  ["Cloud application", "Web application"],
  "digital-marketing":    ["Web application", "SaaS Platform"],
  "team-services":        ["Web application", "Cloud application", "SaaS Platform"],
  "security-quality":     ["Cloud application"],
  "emerging-tech":        ["SaaS Platform", "Cloud application"],
  "gaming":               ["Web application"],
};

interface Props {
  serviceSlug: string;
  serviceName: string;
}

export default function ServiceRelatedWork({ serviceSlug, serviceName }: Props) {
  const all = ourProjects as any[];
  const preferred = serviceToCategories[serviceSlug] ?? [];

  // Pick up to 3: first try preferred categories, then fill with remainder
  const preferred3 = all.filter((p) => preferred.includes(p.category)).slice(0, 3);
  const related = preferred3.length >= 3
    ? preferred3
    : [...preferred3, ...all.filter((p) => !preferred3.includes(p))].slice(0, 3);

  if (!related.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>RELATED WORK</span>
          <h2 className={styles.heading}>
            See it in <span className={styles.accent}>action</span>
          </h2>
          <p className={styles.sub}>
            Real projects delivered using our {serviceName} practice.
          </p>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {related.map((p) => {
            const accent = catColors[p.category] ?? "#06c8e8";
            const gradient = `linear-gradient(135deg, ${accent} 0%, #2563eb 100%)`;
            return (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className={styles.card}
                style={{ "--accent": accent } as React.CSSProperties}
              >
                {/* Top gradient bar */}
                <div className={styles.cardBar} style={{ background: gradient }} />

                {/* Image */}
                <div className={styles.imgWrap}>
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className={styles.img}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className={styles.imgOverlay} />
                  <span className={styles.catBadge}>{p.category}</span>
                </div>

                {/* Meta */}
                <div className={styles.meta}>
                  <p className={styles.company} style={{ color: accent }}>
                    {p.name} · {p.origin}
                  </p>
                  <h3 className={styles.title}>{p.title}</h3>
                  <div className={styles.tagRow}>
                    {p.techStack.slice(0, 3).map((t: string) => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                    {p.techStack.length > 3 && (
                      <span className={styles.tag}>+{p.techStack.length - 3}</span>
                    )}
                  </div>
                  <span className={styles.cta} style={{ color: accent }}>
                    View case study →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all */}
        <div className={styles.footer}>
          <Link href="/work" className={styles.viewAll}>
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
