"use client";

import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import styles from './Technologies.module.scss';

interface MarqueeControllerProps {
  children: React.ReactNode;
  direction: number;
  speed?: number;
}

export function MarqueeController({ children, direction, speed = 100 }: MarqueeControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const content = el.firstElementChild as HTMLElement;
    if (!content) return;

    // Clone the content twice to ensure there's enough overflow for a seamless loop
    const clone1 = content.cloneNode(true);
    const clone2 = content.cloneNode(true);
    el.appendChild(clone1);
    el.appendChild(clone2);

    const totalWidth = content.offsetWidth;

    const animation = gsap.to(el, {
      x: direction > 0 ? -totalWidth : 0,
      ease: "none",
      duration: speed,
      repeat: -1,
      startAt: { x: direction > 0 ? 0 : -totalWidth }
    });

    return () => {
      animation.kill();
    };
  }, [direction, speed]);

  return (
    <div className={styles.marqueeRow} ref={containerRef}>
      {children}
    </div>
  );
}