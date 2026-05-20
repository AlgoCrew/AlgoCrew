"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ourProjects } from "@/resources";
import styles from "./RelatedProjects.module.scss";

// Pick 3 diverse projects that span different categories & geographies
const featured = (ourProjects as any[]).filter((p: any) =>
  ["localised", "boxo", "cashcloud"].includes(p.slug)
);

const catColors: Record<string, string> = {
  "Web application":   "#06c8e8",
  "Cloud application": "#a78bfa",
  "SaaS Platform":     "#34d399",
};

export function RelatedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(`.${styles.card}`);
    if (!cards) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
        }
      }),
      { threshold: 0.1 }
    );
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 100}ms`;
      obs.observe(card);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>RELATED PROJECTS</span>
          <h2 className={styles.heading}>
            You might also{" "}
            <span className={styles.accent}>find these relevant.</span>
          </h2>
          <p className={styles.sub}>
            Similar engagements across cloud, fintech, and e-commerce verticals.
          </p>
        </header>

        <div className={styles.grid}>
          {featured.map((project: any) => {
            const accent = catColors[project.category] ?? "#06c8e8";
            return (
              <article
                key={project.slug}
                className={styles.card}
                style={{ "--accent": accent } as React.CSSProperties}
              >
                <div className={styles.imgWrap}>
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className={styles.img}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className={styles.overlay} aria-hidden="true" />
                  <span className={styles.badge}>{project.category}</span>
                </div>

                <div className={styles.body}>
                  <span className={styles.company} style={{ color: accent }}>
                    {project.name} · {project.origin}
                  </span>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.desc}>{project.description}</p>

                  <div className={styles.stackRow}>
                    {project.techStack.slice(0, 3).map((t: string) => (
                      <span key={t} className={styles.pill}>{t}</span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className={styles.pill}>+{project.techStack.length - 3}</span>
                    )}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      View live →
                    </a>
                  )}
                </div>

                {/* Hover accent line */}
                <div className={styles.accentLine} aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
