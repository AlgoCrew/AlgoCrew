"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServicesCard.module.scss";

export default function IncludedServices({ service }: { service: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = gsap.utils.toArray<HTMLElement>(`.${styles.cardItem}`);
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, rotateX: -12 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 1.1, stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [service]);

  if (!service.includes?.length) return null;

  return (
    <div ref={containerRef} className={styles.sectionWrapper}
      style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <span className={styles.accentTag}
          style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>
          SOLUTIONS ECOSYSTEM
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--text-primary)", margin: "0 0 16px" }}>
          Included Services
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          A comprehensive suite of capabilities to power <strong style={{ color: "var(--text-primary)" }}>{service.name}</strong> end-to-end.
        </p>
      </div>

      {/* Grid */}
      <div className={styles.mainGrid}
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {service.includes.map((child: any, index: number) => (
          <div key={child.slug ?? index} className={styles.cardItem}>
            <div className={styles.cardGlow} />
            <div className={styles.cardContent} style={{ display: "flex", flexDirection: "column", gap: 20, padding: "28px 28px", height: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 900, opacity: 0.2, color: "var(--text-primary)", fontFamily: "monospace" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.cardDot} />
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                  {child.name}
                </h3>
                <p className={styles.cardDescription}
                  style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>
                  {child.description}
                </p>
              </div>
              <div className={styles.cardFooter} style={{ marginTop: "auto", paddingTop: 16 }}>
                <div className={styles.line} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
