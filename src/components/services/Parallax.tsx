"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ServiceHero.module.scss";

export default function ServiceDetailHero({ service }: { service: any }) {
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  useEffect(() => {
    const img = heroRef.current?.querySelector<HTMLElement>(`.${styles.heroImg}`);
    if (!img) return;
    const onScroll = () => {
      img.style.transform = `scale(1.08) translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const bar = heroRef.current?.querySelector<HTMLElement>("[data-progress]");
    if (!bar) return;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const highlights: string[] = service.highlights ?? [];

  return (
    <div ref={heroRef} className={styles.hero}>
      {/* Parallax image */}
      <div className={styles.heroImgWrap}>
        <Image
          src={service.image || "/images/services/webapp.jpg"}
          alt={service.name}
          fill
          priority
          className={styles.heroImg}
          sizes="100vw"
        />
      </div>

      {/* Overlays */}
      <div className={styles.heroOverlay} />
      <div className={styles.heroGradient} />

      {/* Accent bar */}
      <div className={styles.heroBar}
        style={{ background: "linear-gradient(90deg, #06c8e8, #2563eb)" }} />

      {/* Scroll progress */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: 3, zIndex: 100, background: "rgba(255,255,255,0.06)",
        pointerEvents: "none",
      }}>
        <div data-progress style={{
          height: "100%", width: "0%",
          background: "linear-gradient(90deg, #06c8e8, #2563eb)",
          transition: "width 0.1s linear",
        }} />
      </div>

      {/* Back link */}
      <Link href="/services" className={styles.backBtn}>
        ← All Services
      </Link>

      {/* Hero text */}
      <div className={styles.heroContent}>
        <div className={styles.heroBadges}>
          <span className={styles.heroCat}>{service.category}</span>
          {service.status && (
            <>
              <span className={styles.heroDot} style={{ background: "#06c8e8" }} />
              <span className={styles.heroMeta}>{service.status}</span>
            </>
          )}
        </div>
        <h1 className={styles.heroTitle}>{service.name}</h1>
        <p className={styles.heroSub}>{service.description}</p>

        {highlights.length > 0 && (
          <div className={styles.heroHighlights}>
            {highlights.map((h, i) => (
              <div key={i} className={styles.heroHighlight}>
                <span className={styles.heroHighlightDot} />
                {h}
              </div>
            ))}
          </div>
        )}

        <Link href="/contact" className={styles.heroCta}>
          Start a Project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </div>

      {/* Floating stats */}
      <div className={styles.statsCard}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{service.metric_value ?? "99.9%"}</span>
          <span className={styles.statLabel}>Performance</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNum}>{service.includes?.length ?? "10"}+</span>
          <span className={styles.statLabel}>Sub-services</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNum} style={{ fontSize: "1rem" }}>
            <span className={styles.statusPulse} style={{ display: "inline-block" }} />
          </span>
          <span className={styles.statLabel}>Live</span>
        </div>
      </div>
    </div>
  );
}
