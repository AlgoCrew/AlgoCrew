"use client";

import { useEffect } from "react";
import { Media, Text, Row, Card, Column, RevealFx, SmartLink, Heading, ToggleButton } from "@once-ui-system/core";
import styles from "./Cards.module.scss";
import { ourProjects } from "@/resources";
import Masonry from "react-masonry-css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectCards() {
  const breakpointColumnsObj = {
    default: 2,
    720: 1,
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Wait for the DOM to load before applying animations
    if (ourProjects?.length > 0) {
      ourProjects.forEach((_, index) => {
        // Determine the direction of animation based on index (even/odd)
        const direction = index % 2 === 0 ? -100 : 100; // Even index from left, odd index from right

        // Animate each project card with a smoother delay and parallax effect
        gsap.fromTo(
          `.project-card-${index}`,
          { opacity: 0, x: direction, y: 50 }, // Start with opacity 0 and move in from left or right, with a smaller downward movement
          {
            opacity: 1,
            x: 0,
            y: 10, // Move vertically back to its normal position
            duration: 1.5, // Increase duration for smoother transition
            ease: 'power2.out', // Use a smoother easing function for a more natural effect
            delay: index * 0.2, // Delay each card by 0.2s for smoother staggered animation
            scrollTrigger: {
              trigger: `.project-card-${index}`,
              start: 'top 100%',
              end: 'top 50%',
              scrub: true,
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, []);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {ourProjects?.map((project, index) => (
        <div className={`${styles.container} project-card-${index}`} key={index}>
          <Media
            src={project.img}
            alt={project.title}
            className={`${styles.image} h-100 w-100`}
          >
          </Media>
          <div className={styles.overlay}>
            <div className={styles.text}>
              <div className={styles.smartLink}>
                <Heading
                  wrap="balance"
                  variant="display-strong-xs"
                  className={styles.TextHeading}
                >
                  {project.name}
                </Heading>

                <ToggleButton
                  className={styles.TextLink}
                  href={project.path}
                  label="View project"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </Masonry>
  );
}
