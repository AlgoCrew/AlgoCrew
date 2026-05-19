"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.scss";

const techIcons: Record<string, { icon: string; color: string }> = {
  "Payments":   { icon: "💳", color: "#00cccc" },
  "Security":   { icon: "🔒", color: "#7c3aed" },
  "Real-time":  { icon: "⚡", color: "#f59e0b" },
  "HIPAA":      { icon: "🏥", color: "#10b981" },
  "Data Viz":   { icon: "📊", color: "#0077ff" },
  "AI":         { icon: "🤖", color: "#00cccc" },
  "DevOps":     { icon: "🐳", color: "#2496ed" },
  "Kubernetes": { icon: "☸️", color: "#326ce5" },
  "AWS":        { icon: "☁️", color: "#ff9900" },
  "Automation": { icon: "⚙️", color: "#7c3aed" },
  "IoT":        { icon: "📡", color: "#f59e0b" },
  "SaaS":       { icon: "🔷", color: "#0077ff" },
};

const projects = [
  {
    title: "Scalable Fintech Ecosystems",
    company: "Global Finance Corp",
    tags: ["Payments", "Security", "Real-time"],
    image: "/images/uplash/fintech.png",
  },
  {
    title: "Precision HealthTech Platforms",
    company: "Nexus Health",
    tags: ["HIPAA", "Data Viz", "AI"],
    image: "/images/uplash/health.png",
  },
  {
    title: "Hybrid Cloud Orchestration",
    company: "VCloud Systems",
    tags: ["DevOps", "Kubernetes", "AWS"],
    image: "/images/uplash/global.png",
  },
  {
    title: "Automated Supply Chain AI",
    company: "LogiTech Solutions",
    tags: ["Automation", "IoT", "SaaS"],
    image: "/images/uplash/industry.png",
  },
];

export function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || isMobile) return;

    // CSS sticky approach — same as Services, no pin:true, no z-index blowup
    const updateHeight = () => {
      const scrollAmount = track.scrollWidth - window.innerWidth;
      if (scrollAmount > 0) {
        wrapper.style.height = `${scrollAmount + window.innerHeight}px`;
      }
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

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className={styles.mobileWrapper}>
        <div className={styles.mobileHeader}>
          <span className={styles.mobileLabel}>INDUSTRY SOLUTIONS</span>
          <h2 className={styles.mobileHeading}>
            Transforming <span className={styles.gradientText}>Complex Sectors.</span>
          </h2>
        </div>
        <div className={styles.mobileGrid}>
          {projects.map((project, i) => (
            <div key={i} className={styles.mobileCard}>
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
              <div className={styles.cardMeta}>
                <p className={styles.company}>{project.company}</p>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <div className={styles.tagRow}>
                  {project.tags.map((tag) => {
                    const t = techIcons[tag] || { icon: "◆", color: "#00cccc" };
                    return (
                      <span key={tag} className={styles.techTag} style={{ borderColor: `${t.color}30`, color: t.color }}>
                        <span>{t.icon}</span> {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.mobileFooter}>
          <Link href="/projects" className={styles.viewAll}>View All Work →</Link>
        </div>
      </div>
    );
  }

  return (
    /* CSS sticky wrapper — no GSAP pin */
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>
        <div ref={trackRef} className={styles.track}>
          {/* Intro slide */}
          <div className={styles.introSlide}>
            <span className={styles.introLabel}>INDUSTRY SOLUTIONS</span>
            <h2 className={styles.introHeading}>
              Transforming<br />
              <span className={styles.gradientText}>Complex Sectors.</span>
            </h2>
            <p className={styles.introDesc}>
              From secure Fintech gateways to high-availability HealthTech systems,
              we architect solutions for every vertical.
            </p>
          </div>

          {/* Project cards */}
          {projects.map((project, i) => (
            <div key={i} className={styles.projectSlide}>
              <div className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className={styles.cardOverlay} aria-hidden="true" />
                </div>
                <div className={styles.cardMeta}>
                  <p className={styles.company}>{project.company}</p>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <div className={styles.tagRow}>
                    {project.tags.map((tag) => {
                      const t = techIcons[tag] || { icon: "◆", color: "#00cccc" };
                      return (
                        <span key={tag} className={styles.techTag} style={{ borderColor: `${t.color}30`, color: t.color }}>
                          <span>{t.icon}</span> {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* View all CTA slide */}
          <div className={styles.ctaSlide}>
            <Link href="/projects" className={styles.ctaBtn}>
              View All Work
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
