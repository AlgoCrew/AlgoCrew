"use client";

import { Column, Flex, Heading, Text, RevealFx } from "@once-ui-system/core";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Steps.module.scss';

export default function Steps({ service }: { service: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate the vertical progress line height
    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      { 
        scaleY: 1, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: 0.5,
        }
      }
    );

    // Animate steps appearing and highlighting
    const steps = gsap.utils.toArray(`.${styles.stepRow}`);
    steps.forEach((step: any) => {
      gsap.fromTo(step, 
        { opacity: 0.3, y: 20 },
        { 
          opacity: 1, 
          y: 0,
          scrollTrigger: {
            trigger: step,
            start: "top 70%",
            end: "top 40%",
            scrub: true,
          }
        }
      );
    });
  }, [service]);

  return (
    <>
      {service.steps && service.steps.length > 0 && (
        <Column 
          ref={containerRef}
          maxWidth="m" 
          horizontal="center" 
          paddingY="128" 
          gap="64"
          className={styles.stepsSection}
        >
          <Column align="center" gap="16">
            <Text variant="label-strong-s" style={{ color: '#00ccccf0', letterSpacing: '0.3em' }}>
              THE PROCESS
            </Text>
            <Heading variant="display-strong-s" align="center">
              How It Works
            </Heading>
          </Column>

          <Flex fillWidth position="relative" direction="column">
            {/* The Background Track */}
            <div className={styles.timelineTrack} />
            {/* The Animated Progress Line */}
            <div ref={lineRef} className={styles.timelineProgress} />

            {service.steps.map((step: any, index: number) => {
              const isEven = index % 2 === 0;
              return (
                <Flex 
                  key={index} 
                  className={`${styles.stepRow} ${isEven ? styles.rowEven : styles.rowOdd}`}
                  fillWidth
                  align="center"
                >
                  {/* Content Side */}
                  <Column className={styles.stepContent} gap="12">
                    <Flex align="center" gap="12" className={styles.stepHeader}>
                        <Text variant="label-strong-m" className={styles.stepNumber}>
                            0{index + 1}
                        </Text>
                        <div className={styles.stepStatusLine} />
                    </Flex>
                    
                    <Heading as="h3" variant="heading-strong-m">
                      {step.title}
                    </Heading>
                    <Text onBackground="neutral-weak" variant="body-default-l" className={styles.stepDesc}>
                      {step.description}
                    </Text>
                  </Column>

                  {/* Center Dot Area */}
                  <div className={styles.dotContainer}>
                    <div className={styles.outerDot}>
                        <div className={styles.innerDot} />
                    </div>
                  </div>

                  {/* Empty spacer for alternating layout */}
                  <div className={styles.spacer} />
                </Flex>
              );
            })}
          </Flex>
        </Column>
      )}
    </>
  );
}
