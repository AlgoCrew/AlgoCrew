"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Testimonals.module.scss";

const testimonials = [
  {
    quote: "AlgoCrew didn't just build our product — they transformed how we think about software. The team felt like a genuine extension of our company from day one.",
    highlight: "transformed how we think about software.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Meridian Health",
    initials: "SC",
    color: "#00cccc",
    gradient: "linear-gradient(135deg, #00cccc 0%, #0077ff 100%)",
    metric: "8 wks",
    metricLabel: "to production",
  },
  {
    quote: "From kickoff to launch in 8 weeks. Our conversion rate jumped 340% after launch. I've never seen an agency execute this fast without sacrificing quality.",
    highlight: "Our conversion rate jumped 340% after launch.",
    author: "Marcus Williams",
    role: "Founder & CEO",
    company: "Launchpad",
    initials: "MW",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #0077ff 100%)",
    metric: "340%",
    metricLabel: "conversion lift",
  },
  {
    quote: "The AI integration they built for us cut our ops time by 60%. They don't just code — they solve business problems at the root level.",
    highlight: "cut our ops time by 60%.",
    author: "Priya Sharma",
    role: "VP Engineering",
    company: "NovaTech",
    initials: "PS",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #00cccc 100%)",
    metric: "60%",
    metricLabel: "ops time saved",
  },
  {
    quote: "We went from a rough brief to a fully deployed SaaS in under 10 weeks. Their engineers are the best I've worked with outside of a FAANG company.",
    highlight: "a fully deployed SaaS in under 10 weeks.",
    author: "Daniel Osei",
    role: "Head of Product",
    company: "Stackr Labs",
    initials: "DO",
    color: "#0077ff",
    gradient: "linear-gradient(135deg, #0077ff 0%, #7c3aed 100%)",
    metric: "10 wks",
    metricLabel: "FAANG-quality build",
  },
];

const INTERVAL = 5500;

export default function AnimatedTestimonials() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number, direction: "next" | "prev" = "next") => {
      if (animating || idx === active) return;
      setDir(direction);
      setPrev(active);
      setAnimating(true);
      setTimeout(() => {
        setActive(idx);
        setPrev(null);
        setAnimating(false);
      }, 480);
    },
    [active, animating]
  );

  const advance = useCallback(() => {
    const next = (active + 1) % testimonials.length;
    goTo(next, "next");
  }, [active, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(advance, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, INTERVAL);
  };

  const navigate = (idx: number) => {
    const direction = idx > active ? "next" : "prev";
    goTo(idx, direction);
    resetTimer();
  };

  const t = testimonials[active];

  return (
    <section className={styles.section} id="testimonials" aria-label="Client testimonials">
      {/* Ambient background */}
      <div
        className={styles.ambient}
        style={{ background: t.gradient }}
        aria-hidden="true"
      />

      <div className={styles.inner}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>CLIENT STORIES</span>
          <h2 className={styles.heading}>What our clients say</h2>
        </header>

        {/* Main card area */}
        <div className={styles.stage}>
          {/* Stacked background cards (depth illusion) */}
          <div
            className={styles.cardBg2}
            style={{ "--g": testimonials[(active + 2) % testimonials.length].gradient } as React.CSSProperties}
            aria-hidden="true"
          />
          <div
            className={styles.cardBg1}
            style={{ "--g": testimonials[(active + 1) % testimonials.length].gradient } as React.CSSProperties}
            aria-hidden="true"
          />

          {/* Active card */}
          <article
            className={`${styles.card} ${animating ? (dir === "next" ? styles.exitNext : styles.exitPrev) : styles.enter}`}
            key={active}
          >
            {/* Left: quote content */}
            <div className={styles.cardLeft}>
              {/* Large quote mark */}
              <div className={styles.quoteGlyph} aria-hidden="true">&ldquo;</div>

              <blockquote className={styles.quote}>
                {/* Render quote with highlight inline */}
                {renderHighlighted(t.quote, t.highlight, t.color)}
              </blockquote>

              {/* Author */}
              <div className={styles.author}>
                <div className={styles.avatarWrap}>
                  <div
                    className={styles.avatar}
                    style={{ background: t.gradient }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div className={styles.avatarGlow} style={{ background: t.gradient }} aria-hidden="true" />
                </div>
                <div>
                  <p className={styles.authorName}>{t.author}</p>
                  <p className={styles.authorMeta}>{t.role} · {t.company}</p>
                </div>
              </div>
            </div>

            {/* Right: metric */}
            <div className={styles.cardRight}>
              <div className={styles.metricCard}>
                <div
                  className={styles.metricNum}
                  style={{ background: t.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  {t.metric}
                </div>
                <p className={styles.metricLabel}>{t.metricLabel}</p>

                {/* Mini accent bar */}
                <div className={styles.metricBar} style={{ background: t.gradient }} aria-hidden="true" />
              </div>
            </div>
          </article>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Progress dots */}
          <div className={styles.dots} role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
                className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                onClick={() => navigate(i)}
                style={i === active ? { background: t.color } : {}}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className={styles.arrows}>
            <button
              className={styles.arrow}
              onClick={() => navigate((active - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              className={styles.arrow}
              onClick={() => navigate((active + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>

          {/* Auto-progress bar */}
          <div className={styles.progressWrap} aria-hidden="true">
            <div
              className={styles.progressBar}
              key={active}
              style={{ background: t.gradient }}
            />
          </div>
        </div>

        {/* Author strip — other testimonials */}
        <div className={styles.strip}>
          {testimonials
            .map((t2, i) => ({ t: t2, i }))
            .filter(({ i }) => i !== active)
            .map(({ t: t2, i }) => (
              <button
                key={i}
                className={styles.stripItem}
                onClick={() => navigate(i)}
                aria-label={`View ${t2.author}'s testimonial`}
              >
                <div
                  className={styles.stripAvatar}
                  style={{ background: t2.gradient }}
                >
                  {t2.initials}
                </div>
                <div className={styles.stripInfo}>
                  <p className={styles.stripName}>{t2.author}</p>
                  <p className={styles.stripCo}>{t2.company}</p>
                </div>
                <span className={styles.stripMetric} style={{ color: t2.color }}>{t2.metric}</span>
              </button>
            ))}
        </div>
      </div>
    </section>
  );
}

/* Inline highlight — plain color, no webkit-clip (avoids column split) */
function renderHighlighted(quote: string, highlight: string, color: string) {
  if (!highlight) return <>{quote}</>;
  const idx = quote.indexOf(highlight);
  if (idx === -1) return <>{quote}</>;
  return (
    <>
      {quote.slice(0, idx)}
      <span style={{ color, fontWeight: 700 }}>{highlight}</span>
      {quote.slice(idx + highlight.length)}
    </>
  );
}
