"use client";

import React, { useEffect, useRef } from 'react';
import styles from './Technologies.module.scss';
import gsap from "gsap";
import { effects } from '@/resources';
import { Column, Row, Media, Heading, Text, Background, SpacingToken, opacity } from "@once-ui-system/core";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

interface TechnologyItem {
    name: string;
    iconName: string; // Path to the SVG/PNG image
}

const technologies: TechnologyItem[] = [
  { name: "React", iconName: "/images/technologies/react.svg" },
  { name: "Next.js", iconName: "/images/technologies/next.svg" },
  { name: "Vue.js", iconName: "/images/technologies/vue.svg" },
  { name: "Nuxt.js", iconName: "/images/technologies/nuxt.svg" },
  { name: "Node.js", iconName: "/images/technologies/node.svg" },
  { name: "Nest.js", iconName: "/images/technologies/nest.svg" },
  { name: "Angular", iconName: "/images/technologies/angular.svg" },
  { name: "Amazon Web Services", iconName: "/images/technologies/aws.svg" },
  { name: "Microsoft Azure", iconName: "/images/technologies/azure.svg" },
  { name: "Google Cloud Platform", iconName: "/images/technologies/gcp.svg" },
  { name: "Containerization", iconName: "/images/technologies/docker.svg" },
  { name: "Virtualization", iconName: "/images/technologies/virtualization.svg" },
  { name: "Kubernetes", iconName: "/images/technologies/kubernetes.svg" },
  { name: "Helm", iconName: "/images/technologies/helm.svg" },
  { name: "Service Mesh", iconName: "/images/technologies/s-m.svg" },
  { name: "Terraform", iconName: "/images/technologies/terraform.svg" },
  { name: "Ansible", iconName: "/images/technologies/ansible.svg" },
  { name: "Chef", iconName: "/images/technologies/chef.png" },
  { name: "Django", iconName: "/images/technologies/django.svg" },
  { name: "Ruby on Rails", iconName: "/images/technologies/rails.svg" },
  { name: "Kotlin", iconName: "/images/technologies/kotlin.svg" },
  { name: "React Native", iconName: "/images/technologies/react.svg" },
  { name: "Flutter", iconName: "/images/technologies/flutter.svg" },
  { name: "Laravel PHP", iconName: "/images/technologies/laravel.svg" },
  { name: ".NET", iconName: "/images/technologies/dotnet.svg" },
  { name: "FastAPI", iconName: "/images/technologies/fast.svg" },
  { name: "GraphQL", iconName: "/images/technologies/graphql.svg" },
  { name: "Go (Golang)", iconName: "/images/technologies/golang.svg" },
  { name: "D365", iconName: "/images/technologies/d365.png" },
  { name: "Microservices", iconName: "/images/technologies/microservices.svg" },
  { name: "Unity", iconName: "/images/technologies/unity.svg" },
  { name: "Unreal Engine", iconName: "/images/technologies/unreal.svg" },
  { name: "Swift", iconName: "/images/technologies/swift.svg" },
  { name: "Oracle", iconName: "/images/technologies/oracle.svg" },
  { name: "DigitalOcean", iconName: "/images/technologies/digitalocean.svg" },
  { name: "IBM", iconName: "/images/technologies/ibm.svg" }
];

export function OfferingTechnologies() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupInfiniteMarquee = (el: HTMLDivElement, direction: number) => {
      const content = el.querySelector(`.${styles.marqueeContent}`) as HTMLElement;
      if (!content) return;

      // Create 2 clones for a total of 3 identical strips to ensure zero "blank" space
      const clone1 = content.cloneNode(true);
      const clone2 = content.cloneNode(true);
      el.appendChild(clone1);
      el.appendChild(clone2);

      const totalWidth = content.offsetWidth;

      gsap.to(el, {
        x: direction > 0 ? -totalWidth : 0,
        ease: "none",
        duration: 100, // Increase for slower, smoother motion
        repeat: -1,
        startAt: { x: direction > 0 ? 0 : -totalWidth }
      });
    };

    const row1Ref1: any = row1Ref.current
    const row2Ref2: any = row2Ref.current
    if (row1Ref1) setupInfiniteMarquee(row1Ref1, 1);
    if (row2Ref2) setupInfiniteMarquee(row2Ref2, -1);

    return () => {
      gsap.killTweensOf([row1Ref1, row2Ref2]);
    };
  }, []);

  return (
    <section className={styles.section}>
      <Column fillWidth horizontal="center" gap="48" className="z-2">
        <Column align="center" gap="16" className="px-6 text-center">
          {/* <div className={styles.badge}>Our Stack</div> */}
          <Heading variant="display-strong-s">
            Engineered with <span className={styles.accent}>Industry Leaders</span>
          </Heading>

          <Text className={styles.sectionDescription} variant="heading-default-s">
             Crafted to evolve, scale, and remain secure over time
          </Text>
        </Column>

        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeRow} ref={row1Ref}>
            <div className={styles.marqueeContent}>
              {technologies.map((tech, i) => (
                <TechCard key={`row1-${i}`} tech={tech} />
              ))}
            </div>
          </div>

          <div className={styles.marqueeRow} ref={row2Ref}>
            <div className={styles.marqueeContent}>
              {[...technologies].reverse().map((tech, i) => (
                <TechCard key={`row2-${i}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </Column>

      <Background
        position="absolute"
        mask={{ x: 0, y: 50, radius: 100, cursor: effects.mask.cursor }}
        dots={{ display: true, opacity: 20 as opacity, size: '2' as SpacingToken, color: 'accent' }}
      />
    </section>
  );
}

const TechCard = ({ tech }: { tech: any }) => (
  <div className={styles.techCard}>
    <img src={tech.iconName} alt={tech.name} className={styles.techIcon} />
    <Text variant="label-strong-s" className={styles.techName}>{tech.name}</Text>
  </div>
);
