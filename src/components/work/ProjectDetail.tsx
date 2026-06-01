"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectDetail.module.scss";

interface Props {
  project: any;
  accent: string;
  prev: any;
  next: any;
}

export function ProjectDetail({ project, accent, prev, next }: Props) {
  const heroRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  // Parallax hero image on scroll
  useEffect(() => {
    const img = heroRef.current?.querySelector<HTMLElement>(`.${styles.heroImg}`);
    if (!img) return;
    const onScroll = () => {
      const y = window.scrollY;
      img.style.transform = `scale(1.08) translateY(${y * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-reveal for content sections
  useEffect(() => {
    const els = contentRef.current?.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 60}ms`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const gradient = `linear-gradient(135deg, ${accent} 0%, #2563eb 100%)`;

  return (
    <>
      {/* ── HERO ── */}
      <div ref={heroRef} className={styles.hero}>
        {/* Parallax image */}
        <div className={styles.heroImgWrap}>
          <Image
            src={project.img}
            alt={project.title}
            fill
            priority
            className={styles.heroImg}
            sizes="100vw"
          />
        </div>

        {/* Overlays */}
        <div className={styles.heroOverlay} />
        <div className={styles.heroGradient} style={{ background: `linear-gradient(to top, rgba(3,6,9,0.96) 0%, rgba(3,6,9,0.3) 60%, transparent 100%)` }} />

        {/* Top accent bar */}
        <div className={styles.heroBar} style={{ background: gradient }} />

        {/* Scroll progress line */}
        <ScrollProgress accent={accent} />

        {/* Back link */}
        <Link href="/work" className={styles.backBtn}>
          ← All Projects
        </Link>

        {/* Hero text */}
        <div className={styles.heroContent}>
          <div className={styles.heroBadges}>
            <span className={styles.heroCat}>{project.category}</span>
            <span className={styles.heroDot} style={{ background: accent }} />
            <span className={styles.heroOrigin}>📍 {project.origin}</span>
            <span className={styles.heroDot} style={{ background: "rgba(255,255,255,0.2)" }} />
            <span className={styles.heroYear}>{project.year}</span>
          </div>
          <h1 className={styles.heroTitle}>{project.title}</h1>
          <p className={styles.heroSub}>{project.description}</p>

          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className={styles.heroLive} style={{ background: gradient }}>
              View Live Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
        </div>

        {/* Floating stats card */}
        <div className={styles.statsCard}>
          <div className={styles.statItem}>
            <span className={styles.statNum} style={{ color: accent }}>
              {project.techStack.length}
            </span>
            <span className={styles.statLabel}>Technologies</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum} style={{ color: accent }}>
              {project.year}
            </span>
            <span className={styles.statLabel}>Delivered</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum} style={{ color: accent }}>✓</span>
            <span className={styles.statLabel}>Live & Scaled</span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <section ref={contentRef} className={styles.body}>
        <div className={styles.bodyInner}>

          {/* ── MAIN COLUMN ── */}
          <div className={styles.main}>

            {/* Challenge */}
            <div className={`${styles.block} ${styles.reveal}`}>
              <div className={styles.blockLabel} style={{ color: accent }}>
                <span className={styles.blockNum}>01</span>
                The Challenge
              </div>
              <div className={styles.blockDivider} style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              <p className={styles.blockText}>{project.challenge}</p>
            </div>

            {/* Solution */}
            <div className={`${styles.block} ${styles.reveal}`}>
              <div className={styles.blockLabel} style={{ color: accent }}>
                <span className={styles.blockNum}>02</span>
                Our Solution
              </div>
              <div className={styles.blockDivider} style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              <p className={styles.blockText}>{project.solution}</p>
            </div>

            {/* Results */}
            {project.results && (
              <div className={`${styles.block} ${styles.reveal}`}>
                <div className={styles.blockLabel} style={{ color: accent }}>
                  <span className={styles.blockNum}>03</span>
                  Results
                </div>
                <div className={styles.blockDivider} style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                <div className={styles.resultsGrid}>
                  {project.results.map((r: { metric: string; label: string }, i: number) => (
                    <div key={i} className={styles.resultCard} style={{ "--accent": accent } as React.CSSProperties}>
                      <span className={styles.resultMetric} style={{ color: accent }}>{r.metric}</span>
                      <span className={styles.resultLabel}>{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outcomes */}
            {project.outcomes && (
              <div className={`${styles.block} ${styles.reveal}`}>
                <div className={styles.blockLabel} style={{ color: accent }}>
                  <span className={styles.blockNum}>{project.results ? "04" : "03"}</span>
                  Outcome
                </div>
                <div className={styles.blockDivider} style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                <p className={styles.blockText}>{project.outcomes}</p>
              </div>
            )}

            {/* Tech stack */}
            <div className={`${styles.block} ${styles.reveal}`}>
              <div className={styles.blockLabel} style={{ color: accent }}>
                <span className={styles.blockNum}>{project.results ? "05" : project.outcomes ? "04" : "03"}</span>
                Tech Stack
              </div>
              <div className={styles.blockDivider} style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              <div className={styles.techCloud}>
                {project.techStack.map((t: string, i: number) => (
                  <span
                    key={t}
                    className={styles.techPill}
                    style={{ "--accent": accent, animationDelay: `${i * 50}ms` } as React.CSSProperties}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* ── SIDEBAR ── */}
          <aside className={styles.sidebar}>

            {/* Client card */}
            <div className={`${styles.sideCard} ${styles.reveal}`} style={{ "--accent": accent } as React.CSSProperties}>
              <div className={styles.sideCardAccent} style={{ background: gradient }} />
              <p className={styles.sideCardEye}>CLIENT</p>
              <p className={styles.sideCardTitle}>{project.name}</p>
              <p className={styles.sideCardSub}>📍 {project.origin}</p>
            </div>

            {/* Meta card */}
            <div className={`${styles.sideCard} ${styles.reveal}`} style={{ "--accent": accent } as React.CSSProperties}>
              <div className={styles.sideMeta}>
                <div className={styles.sideMetaItem}>
                  <p className={styles.sideCardEye}>CATEGORY</p>
                  <p className={styles.sideMetaVal}>{project.category}</p>
                </div>
                <div className={styles.sideMetaItem}>
                  <p className={styles.sideCardEye}>YEAR</p>
                  <p className={styles.sideMetaVal}>{project.year}</p>
                </div>
                <div className={styles.sideMetaItem}>
                  <p className={styles.sideCardEye}>STACK SIZE</p>
                  <p className={styles.sideMetaVal}>{project.techStack.length} tools</p>
                </div>
              </div>
            </div>

            {/* Live button */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.sideBtn} ${styles.reveal}`}
                style={{ background: gradient }}
              >
                View Live Project →
              </a>
            )}

            {/* Start a project CTA */}
            <Link href="/contact" className={`${styles.sideBtnGhost} ${styles.reveal}`}>
              Start a similar project
            </Link>

          </aside>
        </div>
      </section>

      {/* ── PREV / NEXT ── */}
      {(prev || next) && (
        <nav className={styles.navRow}>
          <div className={styles.navInner}>
            {prev ? (
              <Link href={`/work/${prev.slug}`} className={styles.navCard}>
                <span className={styles.navDir}>← Previous</span>
                <span className={styles.navTitle}>{prev.title}</span>
                <span className={styles.navClient}>{prev.name} · {prev.origin}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/work/${next.slug}`} className={`${styles.navCard} ${styles.navCardRight}`}>
                <span className={styles.navDir}>Next →</span>
                <span className={styles.navTitle}>{next.title}</span>
                <span className={styles.navClient}>{next.name} · {next.origin}</span>
              </Link>
            ) : <div />}
          </div>
        </nav>
      )}
    </>
  );
}

/* ── Scroll progress bar ── */
function ScrollProgress({ accent }: { accent: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: 3, zIndex: 100, background: "rgba(255,255,255,0.06)",
    }}>
      <div ref={barRef} style={{
        height: "100%", width: "0%",
        background: `linear-gradient(90deg, ${accent}, #2563eb)`,
        transition: "width 0.1s linear",
      }} />
    </div>
  );
}
