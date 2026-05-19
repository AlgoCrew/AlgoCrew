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
    title: "Strategic Staffing",
    tagline: "Pre-vetted IT Talent",
    desc: "Scale your technical capabilities instantly with dedicated managed teams. From staff augmentation to full turnkey delivery.",
    tags: ["Staff Augmentation", "Dedicated Teams", "Project Management"],
    color: "#00cccc",
    icon: "◈",
  },
  {
    id: "web-app-development",
    num: "02",
    title: "Product Engineering",
    tagline: "MVP to Enterprise Scale",
    desc: "Bespoke digital solutions engineered for performance and market dominance. Web, mobile, SaaS — built to last.",
    tags: ["Web & Mobile", "SaaS Platforms", "E-commerce"],
    color: "#0077ff",
    icon: "⬡",
  },
  {
    id: "cloud-devops",
    num: "03",
    title: "Cloud & DevOps",
    tagline: "Secure & Scalable Infrastructure",
    desc: "Architecting the backbone of modern business with cloud-native transitions, CI/CD pipelines, and enterprise security.",
    tags: ["DevOps", "Cybersecurity", "Cloud Migration"],
    color: "#7c3aed",
    icon: "⬢",
  },
  {
    id: "data-automation",
    num: "04",
    title: "Data & AI Solutions",
    tagline: "Intelligence-Driven Strategy",
    desc: "Leverage the next industrial revolution with Generative AI, machine learning, and intelligent automation workflows.",
    tags: ["Generative AI", "Blockchain", "AR/VR"],
    color: "#f59e0b",
    icon: "◎",
  },
];

export function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    // Mobile: no horizontal scroll
    if (window.innerWidth < 768) return;

    // Dynamically set wrapper height = exact scroll distance + one viewport
    // so the sticky releases ONLY after the last card fully enters view
    const updateHeight = () => {
      const scrollAmount = track.scrollWidth - window.innerWidth;
      wrapper.style.height = `${scrollAmount + window.innerHeight}px`;
    };
    updateHeight();

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update progress bar
            const fill = document.getElementById("services-progress");
            if (fill) fill.style.width = `${self.progress * 100}%`;
          },
        },
      });
    });

    const onResize = () => {
      updateHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper} id="services">
      <div className={styles.sticky}>
        {/* Label — visible in first panel */}
        <div className={styles.sectionMeta}>
          <span className={styles.label}>WHAT WE DO</span>
          <h2 className={styles.heading}>Our Capabilities</h2>
        </div>

        {/* Horizontal track */}
        <div className={styles.track} ref={trackRef}>
          {services.map((s) => (
            <div key={s.id} className={styles.panel}>
              <div className={styles.panelInner}>
                <div className={styles.panelNum}>{s.num}</div>
                <div className={styles.panelIcon} style={{ color: s.color }}>{s.icon}</div>
                <h3
                  className={styles.panelTitle}
                  style={{ color: s.color } as React.CSSProperties}
                >
                  {s.title}
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

        <div className={styles.progressBar}>
          <div className={styles.progressFill} id="services-progress" />
        </div>
      </div>
    </div>
  );
}
