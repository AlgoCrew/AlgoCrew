"use client";

import { useEffect, useRef } from "react";
import { Column, Heading, Text } from "@once-ui-system/core";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectCard.module.scss";

export const ProjectCard = ({ href, image, title, description }: any) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: "15%", // Inner image parallax
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <Link href={href} className={styles.projectCard} ref={containerRef}>
      <div className={styles.imageWrapper}>
        <img 
          ref={imageRef}
          src={image} 
          alt={title}
          className={styles.parallaxImage} 
        />
      </div>
      <Column gap="12" paddingTop="24">
        <Heading as="h3" variant="heading-strong-m" style={{ lineHeight: '1.2' }}>
          {title}
        </Heading>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {description}
        </Text>
      </Column>
    </Link>
  );
};
