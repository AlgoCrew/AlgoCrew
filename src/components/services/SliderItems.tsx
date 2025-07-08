// Card.tsx (renamed to ServiceCard conceptually, but file remains Card.tsx)
"use client";

import { Heading, Row, Text } from '@once-ui-system/core';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Technologies.module.scss'; // Import the CSS module
import { allServices as initialAllServices } from "@/resources"; // Assuming allServices is imported from your resources file

import {
    FaLaptopCode, FaMobileAlt, FaCode, FaPaintBrush, FaBuilding, FaCogs, FaUsers,
    FaPowerOff, FaGlobe, FaCube, FaLink, FaBrain, FaMagic, FaChartBar,
    FaHandshake, FaCheckCircle, FaCloudUploadAlt, FaShieldAlt, FaCloud,
    FaShoppingCart, FaTools, FaRobot, FaPalette, FaEthereum, FaVrCardboard,
    FaCloudMeatball, FaExchangeAlt, FaSyncAlt
} from 'react-icons/fa'; // Using Font Awesome icons as an example

// A mapping object to get the React component from its string name
const IconComponents: { [key: string]: React.ElementType } = {
    FaLaptopCode, FaMobileAlt, FaCode, FaPaintBrush, FaBuilding, FaCogs, FaUsers,
    FaPowerOff, FaGlobe, FaCube, FaLink, FaBrain, FaMagic, FaChartBar,
    FaHandshake, FaCheckCircle, FaCloudUploadAlt, FaShieldAlt, FaCloud,
    FaShoppingCart, FaTools, FaRobot, FaPalette, FaEthereum, FaVrCardboard,
    FaCloudMeatball, FaExchangeAlt, FaSyncAlt
};

interface ServiceCardProps {
    service: {
        name: string;
        iconName?: string; // Changed to iconName
    };
    direction?: "row" | "column";
}

interface Service {
    name: string;
    iconName?: string; // Changed to iconName
}
const allServicesWithIcons: Service[] = initialAllServices as Service[];


export default function SliderItems() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(1.5); // Default scroll speed
  const defaultSpeed = 1.5; // Pixels per frame
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
        <Heading wrap="balance" variant="display-strong-m">
          Our Services
        </Heading>
      </Row>

      <div
        ref={scrollContainerRef}
        className={styles.scrollContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.itemsWrapper}>
          {[...allServicesWithIcons, ...allServicesWithIcons].map((tech, index) => {
            const IconComponent = IconComponents[tech.iconName || ''];
            return (
              <div
                key={`${tech.name}-${index}`}
                className={styles.techItem}
              >
                {IconComponent && (
                  <IconComponent size={48} className={styles.techIcon} />
                )}
                <h3 className={styles.techName}>{tech.name}</h3>
                <Text onBackground="neutral-weak" variant="body-default-m" className={styles.statDescription}>
                  {tech.name}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
