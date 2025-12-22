"use client";

import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Heading, Text, Flex } from '@once-ui-system/core';
import gsap from 'gsap';
import styles from './Testimonials.module.scss';

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const Testimonials = ({ testimonials }: { testimonials: any[] }) => {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Apple-style Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageCardRef.current) return;
    
    const card = imageCardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (Max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -6; 
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!imageCardRef.current) return;
    gsap.to(imageCardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
  };

  // Original ChangeStep logic
  const changeStep = (nextIndex: number) => {
    if (isAnimating.current || nextIndex === active) return;
    isAnimating.current = true;
    gsap.to(containerRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      onComplete: () => {
        setActive(nextIndex);
        gsap.to(containerRef.current, { opacity: 1, y: 0, duration: 0.4 });
        isAnimating.current = false;
      }
    });
  };

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.imageContainer}>
          {/* Apply Mouse Events Here */}
          <div 
            ref={imageCardRef} 
            className={styles.imageCard}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img src={testimonials[active].src} alt={testimonials[active].name} />
            <div className={styles.glare} /> 
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.quoteWrapper}>
            <span className={styles.quoteIcon}>“</span>
            <div className="mb-8">
              <Text variant="heading-default-m" className="italic leading-relaxed">
                {testimonials[active].quote}
              </Text>
            </div>

            <div className="flex flex-col gap-1 border-l-4 border-cyan-500 pl-6">
              <Heading variant="heading-strong-m">{testimonials[active].name}</Heading>
              <Text variant="body-default-s" onBackground="brand-medium">
                {testimonials[active].designation}
              </Text>
            </div>
          </div>

          <Flex gap="12" className="mt-12 items-center">
            <IconButton icon="chevronLeft" variant="secondary" onClick={() => changeStep((active - 1 + testimonials.length) % testimonials.length)} />
            <IconButton icon="chevronRight" variant="secondary" onClick={() => changeStep((active + 1) % testimonials.length)} />
            <div className={styles.pagination}>
              <span className="text-cyan-500">{active + 1}</span> / {testimonials.length}
            </div>
          </Flex>
        </div>
      </div>
    </div>
  );
};
