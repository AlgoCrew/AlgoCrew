"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Services.module.scss";

const services = [
  {
    id: "team-services",
    num: "01",
    title: "Strategic\nStaffing",
    tagline: "Pre-vetted IT Talent",
    desc: "Scale your technical capabilities instantly with dedicated managed teams. From staff augmentation to full turnkey delivery.",
    tags: ["Staff Augmentation", "Dedicated Teams", "Project Management"],
    color: "#00cccc",
    icon: "◈",
  },
  {
    id: "web-app-development",
    num: "02",
    title: "Product\nEngineering",
    tagline: "MVP to Enterprise Scale",
    desc: "Bespoke digital solutions engineered for performance and market dominance. Web, mobile, SaaS — built to last.",
    tags: ["Web & Mobile", "SaaS Platforms", "E-commerce"],
    color: "#0077ff",
    icon: "⬡",
  },
  {
    id: "cloud-devops",
    num: "03",
    title: "Cloud &\nDevOps",
    tagline: "Secure & Scalable Infrastructure",
    desc: "Architecting the backbone of modern business with cloud-native transitions, CI/CD pipelines, and enterprise security.",
    tags: ["DevOps", "Cybersecurity", "Cloud Migration"],
    color: "#7c3aed",
    icon: "⬢",
  },
  {
    id: "data-automation",
    num: "04",
    title: "Data &\nAI Solutions",
    tagline: "Intelligence-Driven Strategy",
    desc: "Leverage the next industrial revolution with Generative AI, machine learning, and intelligent automation workflows.",
    tags: ["Generative AI", "Blockchain", "AR/VR"],
    color: "#f59e0b",
    icon: "◎",
  },
];

export function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    // CSS sticky approach — no pin:true, no fixed positioning, no z-index blowup
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

    return () => ctx.revert();
  }, []);

  return (
    /* Outer wrapper provides the vertical scroll space */
    <div ref={wrapperRef} className={styles.wrapper} id="services">
      {/* CSS sticky — stays in view without GSAP pin */}
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.sectionMeta}>
          <span className={styles.label}>WHAT WE DO</span>
          <h2 className={styles.heading}>Our Capabilities</h2>
        </div>

        <div className={styles.track} ref={trackRef}>
          {services.map((s) => (
            <div key={s.id} className={styles.panel}>
              <div className={styles.panelInner}>
                <div className={styles.panelNum}>{s.num}</div>
                <div className={styles.panelIcon} style={{ color: s.color }}>{s.icon}</div>
                <h3
                  className={styles.panelTitle}
                  style={{ "--accent": s.color } as React.CSSProperties}
                >
                  {s.title.split("\n").map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </h3>
                <p className={styles.panelTagline} style={{ color: s.color }}>{s.tagline}</p>
                <p className={styles.panelDesc}>{s.desc}</p>
                <div className={styles.panelTags}>
                  {s.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <Link href={`/services/${s.id}`} className={styles.panelLink} style={{ color: s.color }}>
                  Explore →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll progress bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
      </div>
    </div>
  );
}
