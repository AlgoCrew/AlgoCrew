"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Technologies.module.scss'; // Import the CSS module
import { Heading, Row, Text } from '@once-ui-system/core';

import {
  FaJsSquare,
  FaCode,
  FaLaptopCode,
  FaAngular,
  FaReact,
  FaLaptop,
  FaVuejs,
  FaNodeJs,
  FaPaintBrush,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDocker,
  FaJira,
  FaTasks,
  FaCogs,
} from 'react-icons/fa'; // Using Font Awesome icons as an example

const IconComponents: { [key: string]: React.ElementType } = {
  FaJsSquare,
  FaCode,
  FaLaptopCode,
  FaAngular,
  FaReact,
  FaLaptop,
  FaVuejs,
  FaNodeJs,
  FaPaintBrush,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDocker,
  FaJira,
  FaTasks,
  FaCogs,
};

interface TechnologyItem {
    name: string;
    iconName: string;
}

// Dummy data for technologies about the services offered
const technologies: TechnologyItem[] = [
    { name: "JavaScript", iconName: "FaJsSquare" },
    { name: "TypeScript", iconName: "FaCode" }, // Reusing FaCode for TypeScript
    { name: "MEAN / MERN", iconName: "FaLaptopCode" },
    { name: "Angular", iconName: "FaAngular" },
    { name: "React", iconName: "FaReact" },
    { name: "Redux", iconName: "FaCode" }, // Reusing FaCode for Redux
    { name: "Next.JS", iconName: "FaLaptop" }, // Using a laptop icon for Next.js
    { name: "Vue.JS", iconName: "FaVuejs" },
    { name: "Nuxt.JS", iconName: "FaVuejs" }, // Reusing Vue.js icon for Nuxt.js
    { name: "Node.JS", iconName: "FaNodeJs" },
    { name: "Nest.JS", iconName: "FaCode" }, // Reusing FaCode for Nest.js
    { name: "Material UI", iconName: "FaPaintBrush" }, // Using paint brush for UI library
    { name: "Express.js", iconName: "FaCode" }, // Reusing FaCode for Express.js
    { name: "HTML", iconName: "FaHtml5" },
    { name: "CSS", iconName: "FaCss3Alt" },
    { name: "JQuery", iconName: "FaCode" }, // Reusing FaCode for JQuery
    { name: "Bootstrap", iconName: "FaCode" }, // Reusing FaCode for Bootstrap
    { name: "Tailwind CSS", iconName: "FaCss3Alt" }, // Reusing CSS icon for Tailwind CSS
    { name: "Git/GitHub", iconName: "FaGitAlt" },
    { name: "Docker", iconName: "FaDocker" },
    { name: "AntDesign", iconName: "FaPaintBrush" }, // Reusing paint brush for UI library
    { name: "JIRA", iconName: "FaJira" },
    { name: "ClickUP", iconName: "FaTasks" }, // Using tasks for project management tool
    { name: "Microservices", iconName: "FaCogs" }, // Reusing Cogs for microservices
    { name: "Mantine UI", iconName: "FaPaintBrush" }, // Reusing paint brush for UI library
    { name: "Other JS Technologies", iconName: "FaCode" } // Catch-all for other JS tech
];

export function AllTechnologies() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(1.5); // Default scroll speed
  const defaultSpeed = 1.5; // Pixels per frame
  const slowSpeed = 0.2; // Slower speed on hover

  const loopedTechnologies = [...technologies, ...technologies, ...technologies];

  const animateScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft += scrollSpeed; // Left-to-right scroll

      const itemWidth = 208 + 24; // width + margin
      const singleSetWidth = technologies.length * itemWidth;

      if (container.scrollLeft >= singleSetWidth) {
        container.style.scrollBehavior = 'auto'; // Disable smooth for instant jump
        container.scrollLeft = 0;

        requestAnimationFrame(() => {
          container.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
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
          Our Technologies
        </Heading>
      </Row>

      <div
        ref={scrollContainerRef}
        className={styles.scrollContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.itemsWrapper}>
          {/* Map over the duplicated technologies to create the continuous loop */}
          {loopedTechnologies.map((tech, index) => {
            // Get the SVG component from the mapping
            const IconComponent = IconComponents[tech.iconName];
            return (
              <div
                key={`${tech.name}-${index}`} // Unique key for each duplicated item
                className={styles.techItem}
              >
                {IconComponent && (
                  // Render the SVG component directly
                  <IconComponent size={48} className={styles.techIcon} onBackground="neutral-weak"/>
                )}
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
