"use client";

import { useEffect, useRef } from "react";
import { Column, Flex, Heading, Text, Button, Icon, Background, SpacingToken, opacity, } from "@once-ui-system/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Services.module.scss";
import { effects } from '@/resources';

 const serviceCategories = [
  {
    id: "team-services",
    name: "Strategic Staffing",
    tagline: "Pre-vetted IT Talent",
    description: "Scale your technical capabilities instantly with dedicated managed teams.",
    subServices: ["Staff Augmentation", "Dedicated Teams", "Project Management"],
    gif: "/images/service/team.gif",
    icon: "person"
  },
  {
    id: "web-app-develpoment",
    name: "Product Engineering",
    tagline: "MVP to Enterprise Scale",
    description: "Bespoke digital solutions engineered for performance and market dominance.",
    subServices: ["Web & Mobile", "SaaS", "E-commerce"],
    gif: "/images/service/web.gif",
    icon: "globe"
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    tagline: "Secure & Scalable Architecture",
    description: "Architecting the backbone of modern business with cloud-native transitions.",
    subServices: ["DevOps", "Cybersecurity", "Cloud Migration"],
    gif: "/images/service/devops.gif",
    icon: "clouds"
  },
  {
    id: "intelligence",
    name: "Data & AI Solutions",
    tagline: "Intelligence-Driven Strategy",
    description: "Leverage the next industrial revolution with Generative AI and ML.",
    subServices: ["Generative AI", "Blockchain", "AR/VR"],
    gif: "/images/service/ai.gif",
    icon: "bulb"
  }
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach(t => t.kill());

    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, { opacity: 0, y: 60, scale: 0.95 });

      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse", 
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} className={`${styles.mainWrapper} z-2 px-6 md:px-15`}>
        <Column fillWidth paddingTop="104" gap="64" className={styles.container}>
          
          <Flex direction="column" gap="16">
            <Text variant="label-strong-s" onBackground="accent-medium" className={styles.badge}>WHAT WE DO</Text>
            <Heading variant="display-strong-s">Core pillars of <span className={styles.accent}>digital <br /> transformation</span></Heading>
          </Flex>

          <div className={styles.serviceGrid}>
            {serviceCategories.map((service, index) => (
              <div 
                key={service.id} 
                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                className={styles.serviceCard}
              >
                {/* Updated GIF Overlay for ambient feel */}
                <div className={styles.gifOverlay}>
                  <img src={service.gif} alt="" />
                  <div className={styles.ambientGlow} />
                </div>

                <div className={styles.cardContent}>
                  <Flex fillWidth content="space-between" align="start" marginBottom="40">
                    <div className={styles.iconBox}>
                      <Icon name={service.icon} size="m" />
                    </div>
                    <Text variant="label-strong-s" className={styles.indexNumber}>0{index + 1}</Text>
                  </Flex>

                  <Column gap="12" marginBottom="40">
                    <Heading variant="heading-strong-l">{service.name}</Heading>
                    <Text variant="body-default-m" weight="strong" style={{ color: 'var(--accent-solid)' }}>
                      {service.tagline}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-medium">
                      {service.description}
                    </Text>
                  </Column>

                  <Flex gap="8" wrap marginBottom="20">
                    {service.subServices.map((sub) => (
                      <span key={sub} className={styles.tag}>{sub}</span>
                    ))}
                  </Flex>

                  <div className={styles.buttonWrapper}>
                    <Button href={`/services/${service.id}`} variant="primary" size="s" suffixIcon="arrowRight">
                      Explore Vertical
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New "Show All Services" Action */}
          <Flex fillWidth horizontal="center" marginTop="16">
            <Button 
              href="/services" 
              variant="secondary" 
              size="l" 
              weight="strong"
              suffixIcon="chevronRight"
            >
              View All Specialized Services
            </Button>
          </Flex>
        </Column>
      </section>
    </>
  );
}