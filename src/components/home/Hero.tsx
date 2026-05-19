"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.scss";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!heroRef.current) return;

    gsap.to(heroRef.current, {
      scale: 0.92,
      opacity: 0.3,
      filter: "blur(8px)",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} id="hero">
      {/* Background layers */}
      <div className={styles.bg} />
      <div className={styles.grid} />
      <div className={styles.noise} />

      {/* Main content */}
      <div className={styles.content}>
        <h1 className={`${styles.headline} ${styles.animIn1}`}>
          <span>We Build</span>
          <br />
          <span className={styles.gradientWord}>Digital</span>
          <br />
          <span className={styles.strokeWord}>Experiences</span>
        </h1>

        <p className={`${styles.sub} ${styles.animIn2}`}>
          We craft high-performance digital products for startups and enterprises.
          From concept to launch — fast, precise, cinematic.
        </p>

        <div className={`${styles.actions} ${styles.animIn3}`}>
          <Link href="/contact" className={styles.btnPrimary}>
            Launch Your Product →
          </Link>
          <Link href="/projects" className={styles.btnGhost}>
            See Case Studies
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint}>
        <span>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
