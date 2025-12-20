"use client";
import { useRef } from "react";
import { Column, Heading, Text, Flex } from "@once-ui-system/core";
import gsap from "gsap";
import styles from "./ProjectCard.module.scss";

export const ProjectCard = ({ image, title, description, tags }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;

    gsap.to(card, {
      rotateX: -dy / 20,
      rotateY: dx / 20,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div 
      ref={cardRef} 
      className={styles.projectCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.overlay}>
           <Flex gap="8" wrap>
             {tags.map((tag: string) => (
               <span key={tag} className={styles.tag}>{tag}</span>
             ))}
           </Flex>
        </div>
      </div>
      <Column gap="12" paddingTop="32">
        <Heading variant="heading-strong-m">{title}</Heading>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {description}
        </Text>
      </Column>
    </div>
  );
};
