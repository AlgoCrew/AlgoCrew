// Card.tsx (renamed to ServiceCard conceptually, but file remains Card.tsx)
"use client";

import { Column, Flex, Heading, Text } from '@once-ui-system/core';
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
      container.scrollLeft += scrollSpeed;

      const itemWidth = 208 + 24; // Item min-width (208px) + margin-right (24px for space-x-6)
      const singleSetWidth = allServicesWithIcons.length * itemWidth;

      if (container.scrollLeft >= singleSetWidth) {
        container.scrollLeft = 0;
      }
    }
    // Request the next animation frame
    animationFrameId.current = requestAnimationFrame(animateScroll);
  }, [scrollSpeed]); // Re-create animateScroll if scrollSpeed changes

  // Effect to start and stop the animation loop
  useEffect(() => {
    // Start the animation when the component mounts
    animationFrameId.current = requestAnimationFrame(animateScroll);

    // Cleanup function: cancel the animation frame when the component unmounts
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animateScroll]); // Dependency on animateScroll ensures it restarts if speed changes

  // Event handler for mouse entering the scroll area
  const handleMouseEnter = () => {
    setScrollSpeed(slowSpeed); // Slow down the scroll speed
  };

  // Event handler for mouse leaving the scroll area
  const handleMouseLeave = () => {
    setScrollSpeed(defaultSpeed); // Resume normal scroll speed
  };

  return (
    <div className={styles.appContainer}>
      <Heading wrap="balance" variant="display-strong-m">
        Our Technologies
      </Heading>

      <div
        ref={scrollContainerRef}
        className={styles.scrollContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.itemsWrapper}>
          {/* Map over the duplicated technologies to create the continuous loop */}
          {allServicesWithIcons.map((tech, index) => {
            // Get the SVG component from the mapping
            const IconComponent = IconComponents['FaShoppingCart'];

            return (
              <div
                key={`${tech.name}-${index}`} // Unique key for each duplicated item
                className={styles.techItem}
              >
                {IconComponent && (
                  // Render the SVG component directly
                  <IconComponent size={48} className={styles.techIcon} />
                )}
                <h3 className={styles.techName}>
                  {tech.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
