"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./Testimonals.module.scss";

const testimonials = [
  {
    quote: "AlgoCrew didn't just build our product — they",
    highlight: "transformed how we think about software.",
    quoteEnd: "The team felt like a genuine extension of our company from day one.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Meridian Health",
    initials: "SC",
    gradient: "linear-gradient(135deg, #00cccc, #0077ff)",
    metric: "8 weeks",
    metricLabel: "to production",
  },
  {
    quote: "From kickoff to launch in 8 weeks.",
    highlight: "Our conversion rate jumped 340% after launch.",
    quoteEnd: "I've never seen an agency execute this fast without sacrificing quality.",
    author: "Marcus Williams",
    role: "Founder & CEO",
    company: "Launchpad",
    initials: "MW",
    gradient: "linear-gradient(135deg, #7c3aed, #0077ff)",
    metric: "340%",
    metricLabel: "conversion lift",
  },
  {
    quote: "The AI integration they built for us",
    highlight: "cut our ops time by 60%.",
    quoteEnd: "They don't just code — they solve business problems at the root level.",
    author: "Priya Sharma",
    role: "VP Engineering",
    company: "NovaTech",
    initials: "PS",
    gradient: "linear-gradient(135deg, #f59e0b, #00cccc)",
    metric: "60%",
    metricLabel: "ops time saved",
  },
  {
    quote: "We went from a rough brief to",
    highlight: "a fully deployed SaaS in under 10 weeks.",
    quoteEnd: "Their engineers are the best I've worked with outside of a FAANG company.",
    author: "Daniel Osei",
    role: "Head of Product",
    company: "Stackr Labs",
    initials: "DO",
    gradient: "linear-gradient(135deg, #0077ff, #7c3aed)",
    metric: "10 wks",
    metricLabel: "FAANG-quality build",
  },
];

export default function AnimatedTestimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 300);
  }, [active, animating]);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((active + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [active, goTo]);

  const t = testimonials[active];

  return (
    <section className={styles.section} id="testimonials">
      {/* Ambient background glow */}
      <div className={styles.ambientGlow} style={{ background: t.gradient }} />

      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>CLIENT STORIES</span>
          <h2 className={styles.heading}>What our clients say</h2>
        </div>

        <div className={styles.layout}>
          {/* Left — quote */}
          <div className={`${styles.quoteCol} ${animating ? styles.exit : styles.enter}`}>
            <div className={styles.quoteIcon}>&ldquo;</div>
            <blockquote className={styles.quote}>
              {t.quote}{" "}
              <mark className={styles.highlight}>{t.highlight}</mark>
              {" "}{t.quoteEnd}
            </blockquote>

            {/* Author */}
            <div className={styles.author}>
              <div className={styles.avatarWrap}>
                <div
                  className={styles.avatar}
                  style={{ background: t.gradient }}
                >
                  {t.initials}
                </div>
                <div className={styles.avatarRing} style={{ background: t.gradient }} />
              </div>
              <div className={styles.authorInfo}>
                <p className={styles.authorName}>{t.author}</p>
                <p className={styles.authorRole}>{t.role} · {t.company}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className={styles.nav}>
              <div className={styles.dots}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                    onClick={() => goTo(i)}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className={styles.arrows}>
                <button
                  className={styles.arrow}
                  onClick={() => goTo((active - 1 + testimonials.length) % testimonials.length)}
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  className={styles.arrow}
                  onClick={() => goTo((active + 1) % testimonials.length)}
                  aria-label="Next"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Right — metric card + stack preview */}
          <div className={`${styles.metricCol} ${animating ? styles.exit : styles.enter}`}>
            {/* Stat card */}
            <div className={styles.statCard}>
              <div
                className={styles.statNum}
                style={{ background: t.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {t.metric}
              </div>
              <p className={styles.statLabel}>{t.metricLabel}</p>
            </div>

            {/* Other testimonial previews */}
            <div className={styles.previewStack}>
              {testimonials
                .filter((_, i) => i !== active)
                .slice(0, 2)
                .map((prev, i) => (
                  <button
                    key={i}
                    className={styles.preview}
                    onClick={() => goTo(testimonials.indexOf(prev))}
                  >
                    <div className={styles.previewAvatar} style={{ background: prev.gradient }}>
                      {prev.initials}
                    </div>
                    <div className={styles.previewText}>
                      <p className={styles.previewName}>{prev.author}</p>
                      <p className={styles.previewCompany}>{prev.company}</p>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
