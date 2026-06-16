"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiStripe, SiKubernetes, SiDocker, SiOpenai, SiGrafana, SiAmazonwebservices, SiN8N } from "react-icons/si";
import { HiShieldCheck, HiCpuChip, HiBolt } from "react-icons/hi2";
import { TbWifi, TbCloudCode, TbRobot } from "react-icons/tb";
import { FintechIllustration, HealthIllustration, CloudIllustration, SupplyChainIllustration } from "./ProjectIllustrations";
import styles from "./Projects.module.scss";

type TagConfig = { icon: React.ElementType; color: string; bg: string };

const techTags: Record<string, TagConfig> = {
  "Payments":    { icon: SiStripe,              color: "#00d4aa", bg: "rgba(0,212,170,0.08)"  },
  "Security":    { icon: HiShieldCheck,          color: "#a78bfa", bg: "rgba(167,139,250,0.08)"},
  "Real-time":   { icon: HiBolt,                 color: "#fbbf24", bg: "rgba(251,191,36,0.08)" },
  "HIPAA":       { icon: HiShieldCheck,          color: "#34d399", bg: "rgba(52,211,153,0.08)" },
  "Data Viz":    { icon: SiGrafana,              color: "#f97316", bg: "rgba(249,115,22,0.08)" },
  "AI":          { icon: SiOpenai,               color: "#22d3ee", bg: "rgba(34,211,238,0.08)" },
  "DevOps":      { icon: SiDocker,               color: "#38bdf8", bg: "rgba(56,189,248,0.08)" },
  "Kubernetes":  { icon: SiKubernetes,           color: "#6366f1", bg: "rgba(99,102,241,0.08)" },
  "AWS":         { icon: SiAmazonwebservices,    color: "#fb923c", bg: "rgba(251,146,60,0.08)"  },
  "Automation":  { icon: SiN8N,                  color: "#c084fc", bg: "rgba(192,132,252,0.08)" },
  "IoT":         { icon: TbWifi,                 color: "#fbbf24", bg: "rgba(251,191,36,0.08)" },
  "SaaS":        { icon: TbCloudCode,            color: "#38bdf8", bg: "rgba(56,189,248,0.08)" },
  "LLM Ops":     { icon: HiCpuChip,             color: "#22d3ee", bg: "rgba(34,211,238,0.08)" },
  "MLOps":       { icon: TbRobot,               color: "#a78bfa", bg: "rgba(167,139,250,0.08)"},
};

const projects = [
  {
    title: "AI-Powered Trading Infrastructure",
    company: "NexaCapital",
    tags: ["Payments", "Security", "Real-time"],
    illustration: FintechIllustration,
    accent: "#00d4aa",
    gradient: "linear-gradient(135deg, #00d4aa 0%, #0077ff 100%)",
  },
  {
    title: "Precision HealthTech Platform",
    company: "Nexus Health",
    tags: ["HIPAA", "Data Viz", "AI"],
    illustration: HealthIllustration,
    accent: "#34d399",
    gradient: "linear-gradient(135deg, #34d399 0%, #22d3ee 100%)",
  },
  {
    title: "Hybrid Cloud Orchestration",
    company: "VCloud Systems",
    tags: ["DevOps", "Kubernetes", "AWS"],
    illustration: CloudIllustration,
    accent: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)",
  },
  {
    title: "Autonomous Supply Chain AI",
    company: "LogiTech Solutions",
    tags: ["Automation", "IoT", "LLM Ops"],
    illustration: SupplyChainIllustration,
    accent: "#c084fc",
    gradient: "linear-gradient(135deg, #c084fc 0%, #6366f1 100%)",
  },
];

function TagPill({ tag }: { tag: string }) {
  const cfg = techTags[tag];
  if (!cfg) return null;
  const Icon = cfg.icon;
  return (
    <span
      className={styles.techTag}
      style={{ color: cfg.color, background: cfg.bg, borderColor: `${cfg.color}28` }}
    >
      <Icon size={10} aria-hidden="true" />
      {tag}
    </span>
  );
}

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

    const getScrollAmt = () => track.scrollWidth - window.innerWidth;

    const updateHeight = () => {
      const scrollAmount = getScrollAmt();
      if (scrollAmount > 0) {
        wrapper.style.height = `${scrollAmount + window.innerHeight}px`;
      }
    };
    updateHeight();

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollAmt(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${getScrollAmt()}`,
          scrub: 0.3,
          invalidateOnRefresh: true,
          anticipatePin: 1,
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
          <p className={styles.mobileDesc}>
            From secure Fintech gateways to high-availability HealthTech systems,
            we architect solutions for every vertical.
          </p>
        </div>
        <div className={styles.mobileGrid}>
          {projects.map((project, i) => (
            <div key={i} className={styles.mobileCard}>
              <div className={styles.imageWrapper}>
                <project.illustration />
                <div className={styles.cardOverlay} aria-hidden="true"
                  style={{ background: `linear-gradient(to top, rgba(5,8,14,0.6) 0%, transparent 60%)` }} />
              </div>
              <div className={styles.cardMeta}>
                <p className={styles.company} style={{ color: project.accent }}>{project.company}</p>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <div className={styles.tagRow}>
                  {project.tags.map((tag) => <TagPill key={tag} tag={tag} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.mobileFooter}>
          <Link href="/work" className={styles.viewAll}>View All Work →</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>
        <div ref={trackRef} className={styles.track}>

          {/* Intro slide */}
          <div className={styles.introSlide}>
            <span className={styles.introLabel}>INDUSTRY SOLUTIONS</span>
            <h2 className={styles.introHeading}>
              Transforming<br />
              <span className={styles.gradientText}>Complex<br />Sectors.</span>
            </h2>
            <p className={styles.introDesc}>
              From secure Fintech gateways to high-availability HealthTech
              systems, we architect solutions for every vertical.
            </p>
            <div className={styles.introDots}>
              {projects.map((p, i) => (
                <span key={i} className={styles.introDot} style={{ background: p.accent }} />
              ))}
            </div>
          </div>

          {/* Project cards */}
          {projects.map((project, i) => (
            <div key={i} className={styles.projectSlide}>
              <div className={styles.card} style={{ "--accent": project.accent } as React.CSSProperties}>

                {/* Ambient glow behind card */}
                <div className={styles.cardGlow} style={{ background: project.gradient }} aria-hidden="true" />

                <div className={styles.imageWrapper}>
                  <project.illustration />
                  <div className={styles.cardOverlay} aria-hidden="true"
                    style={{ background: `linear-gradient(to top, rgba(5,8,14,0.75) 0%, transparent 50%)` }} />
                  {/* Accent top bar */}
                  <div className={styles.cardTopBar} style={{ background: project.gradient }} aria-hidden="true" />
                </div>

                <div className={styles.cardMeta}>
                  <p className={styles.company} style={{ color: project.accent }}>{project.company}</p>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <div className={styles.tagRow}>
                    {project.tags.map((tag) => <TagPill key={tag} tag={tag} />)}
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* CTA slide */}
          <div className={styles.ctaSlide}>
            <div className={styles.ctaContent}>
              <p className={styles.ctaEyebrow}>Ready to build?</p>
              <p className={styles.ctaHeading}>Your vertical.<br />Our expertise.</p>
              <Link href="/work" className={styles.ctaBtn}>
                View All Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
