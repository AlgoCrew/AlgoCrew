"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ourProjects } from "@/resources";
import styles from "./WorkGrid.module.scss";

const catColors: Record<string, string> = {
  "Web application":   "#06c8e8",
  "Cloud application": "#a78bfa",
  "SaaS Platform":     "#34d399",
};

const projects = ourProjects as any[];

export function WorkGrid() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = wrapperRef.current;
    const track   = trackRef.current;
    if (!wrapper || !track || isMobile) return;

    const updateHeight = () => {
      const scrollAmt = track.scrollWidth - window.innerWidth;
      if (scrollAmt > 0) wrapper.style.height = `${scrollAmt + window.innerHeight}px`;
    };
    updateHeight();

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    const onResize = () => { updateHeight(); ScrollTrigger.refresh(); };
    window.addEventListener("resize", onResize);
    return () => { ctx.revert(); window.removeEventListener("resize", onResize); };
  }, [isMobile]);

  /* ── Mobile fallback ── */
  if (isMobile) {
    return (
      <div className={styles.mobileWrap}>
        <div className={styles.mobileHeader}>
          <span className={styles.label}>ALL PROJECTS</span>
          <h2 className={styles.heading}>
            Every engagement,{" "}
            <span className={styles.accent}>every outcome.</span>
          </h2>
        </div>
        <div className={styles.mobileGrid}>
          {projects.map((p) => {
            const accent = catColors[p.category] ?? "#06c8e8";
            return (
              <div key={p.slug} className={styles.mobileCard} style={{ "--accent": accent } as React.CSSProperties}>
                <div className={styles.mobileImgWrap}>
                  <Image src={p.img} alt={p.title} fill className={styles.mobileImg}
                    sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className={styles.mobileOverlay} />
                  <span className={styles.catBadge}>{p.category}</span>
                  <span className={styles.yearBadge}>{p.year}</span>
                </div>
                <div className={styles.mobileMeta}>
                  <p className={styles.company} style={{ color: accent }}>{p.name} · {p.origin}</p>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <div className={styles.tagRow}>
                    {p.techStack.slice(0, 3).map((t: string) => (
                      <span key={t} className={styles.pill}>{t}</span>
                    ))}
                  </div>
                  {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>View live →</a>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── Desktop horizontal scroll ── */
  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>
        <div ref={trackRef} className={styles.track}>

          {/* Intro slide */}
          <div className={styles.introSlide}>
            <span className={styles.label}>ALL PROJECTS</span>
            <h2 className={styles.heading}>
              Every<br />
              <span className={styles.accent}>engagement,<br />every outcome.</span>
            </h2>
            <p className={styles.introDesc}>
              {projects.length} real-world projects across {Object.keys(catColors).length} verticals
              and 8+ countries — from fintech to cloud infrastructure.
            </p>
            {/* colour legend */}
            <div className={styles.legend}>
              {Object.entries(catColors).map(([cat, color]) => (
                <div key={cat} className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: color }} />
                  <span className={styles.legendLabel}>{cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project cards */}
          {projects.map((p) => {
            const accent = catColors[p.category] ?? "#06c8e8";
            const gradient = `linear-gradient(135deg, ${accent} 0%, #2563eb 100%)`;
            return (
              <div key={p.slug} className={styles.projectSlide}>
                <Link href={`/work/${p.slug}`} className={styles.card} style={{ "--accent": accent } as React.CSSProperties}>

                  {/* Ambient glow */}
                  <div className={styles.cardGlow} style={{ background: gradient }} aria-hidden="true" />

                  {/* Image */}
                  <div className={styles.imgWrap}>
                    <Image src={p.img} alt={p.title} fill className={styles.img}
                      sizes="340px" />
                    <div className={styles.cardOverlay} aria-hidden="true" />
                    <div className={styles.cardTopBar} style={{ background: gradient }} aria-hidden="true" />

                    {/* Badges */}
                    <div className={styles.badges}>
                      <span className={styles.catBadge}>{p.category}</span>
                      <span className={styles.yearBadge}>{p.year}</span>
                    </div>

                    {/* Origin — slides up on hover */}
                    <div className={styles.originPill}>📍 {p.origin}</div>
                  </div>

                  {/* Meta */}
                  <div className={styles.cardMeta}>
                    <p className={styles.company} style={{ color: accent }}>{p.name}</p>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <div className={styles.tagRow}>
                      {p.techStack.slice(0, 3).map((t: string) => (
                        <span key={t} className={styles.pill}>{t}</span>
                      ))}
                      {p.techStack.length > 3 && (
                        <span className={`${styles.pill} ${styles.pillMore}`}>+{p.techStack.length - 3}</span>
                      )}
                    </div>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>
                        View live
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <path d="M7 17L17 7M17 7H7M17 7v10"/>
                        </svg>
                      </a>
                    )}
                  </div>

                </Link>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
