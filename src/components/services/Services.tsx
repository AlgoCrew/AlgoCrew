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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="services">
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
              <h3 className={styles.panelTitle} style={{ '--accent': s.color } as React.CSSProperties}>
                {s.title.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
              </h3>
              <p className={styles.panelTagline} style={{ color: s.color }}>{s.tagline}</p>
              <p className={styles.panelDesc}>{s.desc}</p>
              <div className={styles.panelTags}>
                {s.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
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
    </section>
  );
}
