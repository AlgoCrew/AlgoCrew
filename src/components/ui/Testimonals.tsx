"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './Testimonials.module.scss';

export const Testimonials = ({ testimonials }: { testimonials: any[] }) => {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageCardRef.current) return;
    const card = imageCardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    gsap.to(card, {
      rotateX, rotateY,
      duration: 0.5, ease: "power2.out", transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!imageCardRef.current) return;
    gsap.to(imageCardRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.8, ease: "elastic.out(1, 0.5)",
    });
  };

  const changeStep = (nextIndex: number) => {
    if (isAnimating.current || nextIndex === active) return;
    isAnimating.current = true;

    gsap.to(containerRef.current, {
      opacity: 0, y: 10, duration: 0.25,
      onComplete: () => {
        setActive(nextIndex);
        gsap.to(containerRef.current, { opacity: 1, y: 0, duration: 0.4 });
        isAnimating.current = false;
      },
    });
  };

  return (
    <div style={{ padding: "0 60px", maxWidth: "1280px", margin: "0 auto" }}>
      {/* Section header */}
      <span className={styles.sectionLabel}>CLIENT STORIES</span>
      <h2 className={styles.sectionTitle}>
        Trusted by <span className={styles.accentText}>industry leaders</span>
      </h2>

      <div ref={containerRef} className={styles.grid}>
        {/* Image */}
        <div className={styles.imageContainer}>
          <div
            ref={imageCardRef}
            className={styles.imageCard}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={testimonials[active].src}
              alt={testimonials[active].name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.imageOverlay} />
            <div className={styles.glare} />
          </div>
        </div>

        {/* Content */}
        <div className={styles.contentSection}>
          {/* Stars */}
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={styles.star}>★</span>
            ))}
          </div>

          <div className={styles.quoteWrapper}>
            <span className={styles.quoteIcon}>&ldquo;</span>
            <p className={styles.quoteText}>
              {testimonials[active].quote}
            </p>

            <div className={styles.authorBlock}>
              <p className={styles.authorName}>{testimonials[active].name}</p>
              <p className={styles.authorRole}>{testimonials[active].designation}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className={styles.paginationRow}>
            <button
              className={styles.navBtn}
              onClick={() => changeStep((active - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={styles.navBtn}
              onClick={() => changeStep((active + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className={styles.pagination}>
              <span>{active + 1}</span> / {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
