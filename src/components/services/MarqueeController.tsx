"use client";

import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import styles from './Technologies.module.scss';

interface MarqueeControllerProps {
  children: React.ReactNode;
  direction: number;
  speed?: number;
}

export function MarqueeController({ children, direction, speed = 120 }: MarqueeControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !el.firstElementChild) return;

    const content = el.firstElementChild as HTMLElement;

    // Remove any existing clones if useEffect re-runs
    const existingClones = el.querySelectorAll('.is-clone');
    existingClones.forEach(clone => clone.remove());

    // Clone the content for the loop
    const clone = content.cloneNode(true) as HTMLElement;
    clone.classList.add('is-clone');
    el.appendChild(clone);

    const totalWidth = content.offsetWidth;

    // Use xPercent for smoother rendering or standard x with the calculated width
    const animation = gsap.to(el, {
      x: direction > 0 ? -totalWidth : 0,
      ease: "none",
      duration: window.innerWidth < 768 ? speed / 2 : speed, // Speed up slightly on mobile for better feel
      repeat: -1,
      startAt: { x: direction > 0 ? 0 : -totalWidth }
    });

    return () => {
      animation.kill();
    };
  }, [direction, speed]);

  return (
    <div 
      className={styles.marqueeRow} 
      ref={containerRef}
      style={{ display: 'flex' }} // Ensure flex is forced
    >
      {children}
    </div>
  );
}
