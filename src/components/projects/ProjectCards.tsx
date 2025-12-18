"use client";

import { useEffect } from "react";
import { Media, Column, Heading, ToggleButton, Flex, Text } from "@once-ui-system/core";
import styles from "./Cards.module.scss";
import { ourProjects } from "@/resources";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectCards() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".project-card");
    
    cards.forEach((card: any) => {
      gsap.fromTo(card.querySelector(".media-zoom"), 
        { scale: 1.2 }, 
        {
          scale: .8,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      gsap.fromTo(card.querySelector(".card-content"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  return (
    <Column gap="80" fillWidth>
      {ourProjects?.map((project, index) => (
        <div key={index} className={`${styles.projectCard} project-card`}>
          <div className={styles.mediaFrame}>
            <Media
              src={project.img}
              alt={project.name}
              className="media-zoom h-100 w-100"
              style={{ objectFit: 'cover' }}
            />
            
            <div className={`${styles.overlayContent} card-content`}>
               <Flex fillWidth content="space-between" align="center">
                  <Column gap="8" align="start">
                    <Heading variant="heading-strong-l" style={{ color: 'white' }}>
                        {project.name}
                    </Heading>

                    <Text variant="body-default-m" style={{ color: 'rgba(255,255,255,0.8)' }}>
                        Digital Solution — 2024
                    </Text>
                  </Column>

                  <ToggleButton
                    href={project.path}
                    label="Explore"
                    variant="ghost"
                    style={{ background: 'white', color: 'black' }}
                  />
               </Flex>
            </div>
          </div>
        </div>
      ))}
    </Column>
  );
}
