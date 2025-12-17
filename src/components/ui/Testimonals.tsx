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

export const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null); // Added Ref for Meta Info
  const isAnimating = useRef(false);

  const changeStep = (nextIndex: number) => {
    if (isAnimating.current || nextIndex === active) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setActive(nextIndex);
        isAnimating.current = false;
      }
    });

    // Fade out everything before switching state
    tl.to([imageRef.current, textRef.current, metaRef.current], {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  useEffect(() => {
    // GSAP Context makes selectors relative to containerRef
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Start by ensuring they are invisible but in position
      tl.set([imageRef.current, textRef.current, metaRef.current], { opacity: 0 });

      // 1. Image Entrance
      tl.fromTo(imageRef.current, 
        { opacity: 0, scale: 0.9, rotateY: -15 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 0.7, ease: "back.out(1.2)" }
      );

      // 2. Word Reveal (Targeting spans inside textRef)
      const words = textRef.current?.querySelectorAll('.word-span');
      if (words && words.length > 0) {
        tl.fromTo(words, 
          { opacity: 0, filter: 'blur(10px)', y: 5 },
          { opacity: 1, filter: 'blur(0px)', y: 0, stagger: 0.01, duration: 0.4 },
          "-=0.4"
        );
      } else {
        // Fallback if split fails
        tl.to(textRef.current, { opacity: 1, duration: 0.4 }, "-=0.4");
      }

      // 3. Meta Info (Name/Designation)
      tl.fromTo(metaRef.current, 
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.4 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [active]);

  const handleNext = () => changeStep((active + 1) % testimonials.length);
  const handlePrev = () => changeStep((active - 1 + testimonials.length) % testimonials.length);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <div className={styles.grid}>
        
        <div className={styles.imageContainer}>
          <div ref={imageRef} className={styles.imageCard}>
            <img src={testimonials[active].src} alt={testimonials[active].name} />
            <div className={styles.imageOverlay} />
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.quoteWrapper}>
            <span className={styles.quoteIcon}>“</span>
            
            <div ref={textRef} className="mb-8">
              <Text 
                variant="heading-default-m" 
                className="italic leading-relaxed neutral-on-background-weak dark:text-neutral-300"
              >
                {testimonials[active].quote}
              </Text>
            </div>

            <div ref={metaRef} className="flex flex-col gap-1 border-l-4 border-cyan-500 pl-6">
              <Heading variant="heading-strong-m">
                {testimonials[active].name}
              </Heading>
              <Text variant="body-default-s" onBackground="brand-medium">
                {testimonials[active].designation}
              </Text>
            </div>
          </div>

          <Flex gap="12" className="mt-12 items-center">
            <IconButton icon="chevronLeft" variant="secondary" onClick={handlePrev} />
            <IconButton icon="chevronRight" variant="secondary" onClick={handleNext} />
            <div className={styles.pagination}>
              <span className="text-cyan-500">{active + 1}</span> / {testimonials.length}
            </div>
          </Flex>
        </div>
      </div>
    </div>
  );
};
