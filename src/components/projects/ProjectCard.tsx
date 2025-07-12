"use client";

import { Media, Text, Row, Card, Column, RevealFx, SmartLink, Heading, ToggleButton } from "@once-ui-system/core";
import styles from "./Card.module.scss";
import { ourProjects } from "@/resources";
import Masonry from "react-masonry-css";
import { usePathname } from "next/navigation";

interface CardsProp {
    project: Object | any;
}


export default function ProjectCard({
    project
}: CardsProp) {

  return (
    <>
      <Heading variant="display-strong-s">{project.title}</Heading>

      <div className={styles.projectSection}>
        <div className={styles.projectImageColumn}>
          {project.img && ( // Check if img exists
            <Media
              priority
              aspectRatio="16 / 9"
              radius="m"
              alt={project.title} // Use title for alt text
              src={project.img} // Use project.img
            />
          )}
        </div>

        <div className={styles.projectDetailsColumn}>
          <Text marginBottom="s" variant="body-default-m">{project.description}</Text>

          <div className={styles.projectMetaInfo}>
            <div className={styles.metaItem}>
              <Heading className={styles.metaLabel} variant="body-strong-s">Made for</Heading>
              <Text className={styles.metaValue} variant="body-default-s">{project.name}</Text>
            </div>

            {project.link && (
              <div className={styles.metaItem}>
                <Heading className={styles.metaLabel} variant="body-strong-s">Project URL</Heading>
                <SmartLink className={styles.metaValue} href={project.link} unstyled>{project.link}</SmartLink>
              </div>
            )}

            <div className={styles.metaItem}>
              <Heading className={styles.metaLabel} variant="body-strong-s">Category</Heading>
              <Text className={styles.metaValue} variant="body-default-s">{project.category}</Text>
            </div>

            <div className={styles.metaItem}>
              <Heading className={styles.metaLabel} variant="body-strong-s">Tech Stacks</Heading>

              <span className={`${styles.metaValue} ${styles.metaValueTechStack}`}>
                {project.techStack.map((tech: string, index: number) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))}
              </span>
            </div>

            <div className={styles.metaItem}>
              <Heading className={styles.metaLabel} variant="body-strong-s">Year</Heading>
              <Text className={styles.metaValue} variant="body-default-s">{project.year}</Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
