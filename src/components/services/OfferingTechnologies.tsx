"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Technologies.module.scss'; // Import the CSS module
import { Heading, Row, Text, Media } from '@once-ui-system/core'; // Import Media component

// Removed Font Awesome imports and inline SVG definitions
// The icons will now be loaded via the Media component using their paths.

interface TechnologyItem {
    name: string;
    iconName: string; // This will now be the path to the SVG/PNG image
}

// Dummy data for technologies about the services offered
// Updated to use image paths
const technologies: TechnologyItem[] = [
    { name: "JavaScript", iconName: "/images/technologies/js.svg" },
    { name: "TypeScript", iconName: "/images/technologies/ts.svg" },
    { name: "MEAN / MERN", iconName: "/images/technologies/react.svg" }, // Assuming a generic React icon for MEAN/MERN
    { name: "Angular", iconName: "/images/technologies/angular.svg" },
    { name: "Redux", iconName: "/images/technologies/redux.svg" },
    { name: "Oracle", iconName: "/images/technologies/oracle.svg" },
    { name: "React", iconName: "/images/technologies/react.svg" },
    { name: "Next.JS", iconName: "/images/technologies/next.svg" },
    { name: "Vue.JS", iconName: "/images/technologies/vue.svg" },
    { name: "Nuxt.JS", iconName: "/images/technologies/nuxt.svg" },
    { name: "Node.JS", iconName: "/images/technologies/node.svg" }, // Assuming a Node.js specific icon
    { name: "Scss", iconName: "/images/technologies/scss.svg" },
    { name: "Nest.JS", iconName: "/images/technologies/nest.svg" },
    { name: "Express.JS", iconName: "/images/technologies/express.svg" },
    { name: "HTML", iconName: "/images/technologies/html.svg" },
    { name: "CSS", iconName: "/images/technologies/css.svg" },
    { name: "JQuery", iconName: "/images/technologies/jquery.svg" },
    { name: "Bootstrap", iconName: "/images/technologies/bootstrap.png" }, // Example of a PNG
    { name: "Tailwind CSS", iconName: "/images/technologies/tailwind.svg" }, // Assuming a generic React icon for Tailwind CSS
    { name: "Git/GitHub", iconName: "/images/technologies/github.svg" },
    { name: "Docker", iconName: "/images/technologies/docker.svg" },
    { name: "Mysql", iconName: "/images/technologies/mysql.svg" },
    { name: "JIRA", iconName: "/images/technologies/jira.svg" },
    { name: "ClickUP", iconName: "/images/technologies/clickup.svg" },
    { name: "Microservices", iconName: "/images/technologies/react.svg" }, // Assuming a generic React icon for Microservices
    { name: "Flutter", iconName: "/images/technologies/flutter.svg" },
    { name: "PHP", iconName: "/images/technologies/php.svg" },
    { name: "Python", iconName: "/images/technologies/python.svg" },
    { name: "Ruby", iconName: "/images/technologies/ruby.svg" },
    { name: "Mongo DB", iconName: "/images/technologies/mongo.svg" },
    { name: "Rails", iconName: "/images/technologies/rails.svg" },
    { name: "Kubernetes", iconName: "/images/technologies/kubernetes.svg" },
    { name: "Unity", iconName: "/images/technologies/unity.svg" },
    { name: "Unreal Engine", iconName: "/images/technologies/unreal.svg" },
    { name: "Postgresql", iconName: "/images/technologies/postgresql.svg" },
    { name: "Swift", iconName: "/images/technologies/swift.svg" },
    { name: "NativeScript", iconName: "/images/technologies/ns.svg" },
    { name: "Kotlin", iconName: "/images/technologies/kotlin.svg" },
    { name: "java", iconName: "/images/technologies/java.svg" },
];

export function OfferingTechnologies() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(1.5); // Default scroll speed
  const defaultSpeed = 1; // Pixels per frame
  const slowSpeed = 0.2; // Slower speed on hover

  const loopedTechnologies = [...technologies, ...technologies, ...technologies];

  const animateScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft += scrollSpeed; // Left-to-right scroll

      // Calculate the width of a single set of technologies for looping
      // This assumes each techItem has a fixed width and margin-right
      // You might need to adjust '208 + 24' based on your actual CSS for .techItem
      const itemWidth = 208 + 24; // width + margin-right from Technologies.module.scss
      const singleSetWidth = technologies.length * itemWidth;

      if (container.scrollLeft >= singleSetWidth) {
        // Reset scroll position to create a seamless loop
        container.style.scrollBehavior = 'auto'; // Disable smooth for instant jump
        container.scrollLeft = 0;

        // Re-enable smooth scroll after the jump for subsequent scrolling
        requestAnimationFrame(() => {
          container.style.scrollBehavior = 'smooth';
        });
      }
    }

    animationFrameId.current = requestAnimationFrame(animateScroll);
  }, [scrollSpeed, technologies.length]); // Add technologies.length to dependencies if it can change

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animateScroll);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animateScroll]);

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
            return (
              <div
                key={`${tech.name}-${index}`} // Unique key for each duplicated item
                className={styles.techItem}
              >
                {/* Use the Media component to display the SVG/PNG from the path */}
                <Media
                  src={tech.iconName}
                  alt={tech.name}
                  className={`${styles.techIcon} w-[240px] h-[240px]`} // Apply existing icon styles if any
                  objectFit="contain" // Ensure the entire icon is visible
                />
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
