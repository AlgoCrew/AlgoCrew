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
      // Zoom effect on the image
      gsap.fromTo(card.querySelector(".media-zoom"), 
        { 
          scale: 1.4, // Starts zoomed in
        }, 
        {
          scale: 1, // Zooms out to natural size
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom", // Starts when bottom of card enters viewport
            end: "bottom top",    // Ends when top of card leaves viewport
            scrub: true           // Ties animation directly to scroll position
          }
        }
      );

      // Subtle fade-in for the text content
      gsap.fromTo(card.querySelector(".card-content"),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // Triggers slightly before the card is centered
            toggleActions: "play none none reverse"
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
            {/* The media-zoom class is targeted by GSAP */}
            <div className="media-zoom h-100 w-100">
                <Media
                src={project.img}
                alt={project.name}
                className="h-100 w-100"
                style={{ objectFit: 'cover' }}
                />
            </div>
            
            <div className={`${styles.overlayContent} card-content`}>
               <Flex fillWidth horizontal="space-between" vertical="center">
                  <Column gap="8" align="start">
                    <Heading variant="heading-strong-l" style={{ color: 'white' }}>
                        {project.name}
                    </Heading>
                    <Text variant="body-default-m" style={{ color: 'rgba(255,255,255,0.8)' }}>
                        Digital Solution, 2024
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