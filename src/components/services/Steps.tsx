"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Steps.module.scss";

export default function Steps({ service }: { service: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate progress line
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: 0.5,
        },
      }
    );

    // Animate each step row
    const rows = gsap.utils.toArray<HTMLElement>(`.${styles.stepRow}`);
    rows.forEach((step) => {
      gsap.fromTo(step,
        { opacity: 0.3, y: 20 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: step,
            start: "top 70%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    });
  }, [service]);

  if (!service.steps?.length) return null;

  return (
    <div ref={containerRef} className={styles.stepsSection}
      style={{ maxWidth: 1100, margin: "0 auto", padding: "0 60px 80px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 72 }}>
        <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#06c8e8", marginBottom: 12 }}>
          THE PROCESS
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--text-primary)", margin: 0 }}>
          How It Works
        </h2>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        <div className={styles.timelineTrack} />
        <div ref={lineRef} className={styles.timelineProgress} />

        {service.steps.map((step: any, index: number) => {
          const isEven = index % 2 === 0;
          return (
            <div key={index}
              className={`${styles.stepRow} ${isEven ? styles.rowEven : styles.rowOdd}`}>

              {/* Content */}
              <div className={styles.stepContent}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>0{index + 1}</span>
                  <div className={styles.stepStatusLine} />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
                  {step.title}
                </h3>
                <p className={styles.stepDesc}
                  style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
                  {step.description}
                </p>
              </div>

              {/* Center dot */}
              <div className={styles.dotContainer}>
                <div className={styles.outerDot}>
                  <div className={styles.innerDot} />
                </div>
              </div>

              {/* Spacer */}
              <div className={styles.spacer} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
