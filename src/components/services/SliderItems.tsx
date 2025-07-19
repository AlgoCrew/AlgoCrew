// Card.tsx (renamed to ServiceCard conceptually, but file remains Card.tsx)
"use client";

import { Heading, Row, Text, Column } from '@once-ui-system/core';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Technologies.module.scss'; // Import the CSS module
import { allServices as initialAllServices } from "@/resources"; // Assuming allServices is imported from your resources file

import {
    FaLaptopCode, FaMobileAlt, FaCode, FaPaintBrush, FaBuilding, FaCogs, FaUsers,
    FaPowerOff, FaGlobe, FaCube, FaLink, FaBrain, FaMagic, FaChartBar,
    FaHandshake, FaCheckCircle, FaCloudUploadAlt, FaShieldAlt, FaCloud,
    FaShoppingCart, FaTools, FaRobot, FaPalette, FaEthereum, FaVrCardboard,
    FaCloudMeatball, FaExchangeAlt, FaSyncAlt, FaShopify, FaUserShield, FaRegCheckCircle, FaAutoprefixer,
    FaSellsy
} from 'react-icons/fa'; // Using Font Awesome icons as an example

import {
    HiOutlineShoppingCart
} from 'react-icons/hi2'; // Using Font Awesome icons as an example

// A mapping object to get the React component from its string name
const IconComponents: { [key: string]: React.ElementType } = {
    FaLaptopCode, FaMobileAlt, FaCode, FaPaintBrush, FaBuilding, FaCogs, FaUsers,
    FaPowerOff, FaGlobe, FaCube, FaLink, FaBrain, FaMagic, FaChartBar,
    FaHandshake, FaCheckCircle, FaCloudUploadAlt, FaShieldAlt, FaCloud,
    FaShoppingCart, FaTools, FaRobot, FaPalette, FaEthereum, FaVrCardboard,
    FaCloudMeatball, FaExchangeAlt, FaSyncAlt, HiOutlineShoppingCart, FaShopify, FaUserShield, FaRegCheckCircle, FaAutoprefixer,
    FaSellsy
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
              <Column
                key={`${tech.name}-${index}`}
                className={styles.techItem}
              >
                {IconComponent && (
                  <IconComponent size={48} className={styles.techIcon}  color="accent-background-strong"/>
                )}

                <Text onBackground="neutral-weak" variant="body-default-m" className={styles.statDescription}>
                  {tech.name}
                </Text>
              </Column>
            );
          })}
        </div>
      </div>
    </div>
  );
}
