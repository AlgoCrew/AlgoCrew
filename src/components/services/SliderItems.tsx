// Card.tsx (renamed to ServiceCard conceptually, but file remains Card.tsx)
"use client";

import { Heading, Row, Text, Column, Particle, SmartLink, Media, Card } from '@once-ui-system/core';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Technologies.module.scss'; // Import the CSS module
import { allSliderServices as initialAllServices } from "@/resources"; // Assuming allServices is imported from your resources file

interface Service {
    name: string;
    iconName?: string; // Changed to iconName
    path?: string; // Changed to iconName
    img?: any; // Changed to iconName
}
const allServicesWithIcons: Service[] = initialAllServices as Service[];


export function SliderItems() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(1.5); // Default scroll speed
  const defaultSpeed = 1; // Pixels per frame
  const slowSpeed = 0.2; // Slower speed on hover

  const animateScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft -= scrollSpeed;

      const itemWidth = 208 + 24;
      const singleSetWidth = allServicesWithIcons.length * itemWidth;

      if (container.scrollLeft <= 0) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = singleSetWidth;

        requestAnimationFrame(() => {
          container.style.scrollBehavior = 'smooth';
        });
      }
    }

    animationFrameId.current = requestAnimationFrame(animateScroll);
  }, [scrollSpeed]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animateScroll);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animateScroll])

  const handleMouseEnter = () => {
    setScrollSpeed(slowSpeed); // Slow down the scroll speed
  };

  const handleMouseLeave = () => {
    setScrollSpeed(defaultSpeed); // Resume normal scroll speed
  };

  return (
    <div className={styles.appContainer}>
      <Row fillWidth horizontal="start" paddingBottom="16">
        <SmartLink href="/services">
          <Heading wrap="balance" variant="display-strong-m">
            Our Services
          </Heading>
        </SmartLink>
      </Row>

        <div
          ref={scrollContainerRef}
          className={`${styles.scrollContainer} z-1`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.itemsWrapper}>
            {[...allServicesWithIcons, ...allServicesWithIcons].map((tech, index) => {
              return (
                  <Column
                    key={`${tech.name}-${index}`}
                  >
                    <SmartLink href={tech.path} unstyled>
                      <Row maxWidth={24} className={styles.glowingBorder}>
                        <Card radius="l-4" direction="column" border="neutral-alpha-medium">
                          <Media
                            border="neutral-alpha-weak"
                            sizes="s:300px"
                            fillWidth
                            width={21}
                            height={15}
                            // aspectRatio="4 / 3"
                            radius="l"
                            alt={tech.name}
                            src={tech?.img}
                            unoptimized
                          />

                          <Column fillWidth paddingLeft="20" paddingY="24" gap="8" >
                            <Text onBackground="neutral-strong" variant="heading-default-s" className={styles.statDescription}>
                              {tech.name}
                            </Text>
                          </Column>
                        </Card>
                      </Row>
                    </SmartLink>
                  </Column>
              );
            })}
          </div>
        </div>
    </div>
  );
}
