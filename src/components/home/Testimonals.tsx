"use client";
import { useState } from "react";
import styles from "./Testimonals.module.scss";

const testimonials = [
  {
    quote: "AlgoCrew didn't just build our product — they transformed how we think about software. The team felt like a genuine extension of our company.",
    author: "Sarah Chen",
    role: "CTO, Meridian Health",
    company: "Meridian Health",
    initials: "SC",
  },
  {
    quote: "From kickoff to launch in 8 weeks. I've never seen an agency execute this fast without sacrificing quality. Our conversion rate jumped 340% after launch.",
    author: "Marcus Williams",
    role: "Founder & CEO, Launchpad",
    company: "Launchpad",
    initials: "MW",
  },
  {
    quote: "The AI integration they built for us cut our ops time by 60%. They don't just code — they solve business problems at the root level.",
    author: "Priya Sharma",
    role: "VP Engineering, NovaTech",
    company: "NovaTech",
    initials: "PS",
  },
];

export default function AnimatedTestimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.inner}>
        <span className={styles.label}>CLIENT STORIES</span>

        <div className={styles.quoteWrap}>
          <span className={styles.quoteIcon}>&ldquo;</span>
          <blockquote className={styles.quote} key={active}>
            {t.quote}
          </blockquote>
        </div>

        <div className={styles.author}>
          <div className={styles.avatar}>{t.initials}</div>
          <div className={styles.authorInfo}>
            <p className={styles.authorName}>{t.author}</p>
            <p className={styles.authorRole}>{t.role}</p>
          </div>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
