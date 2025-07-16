"use client";

import { Media, Text, Row, Card, Column, RevealFx, SmartLink, Heading, ToggleButton } from "@once-ui-system/core";
import styles from "./Cards.module.scss";
import { ourProjects } from "@/resources";
import Masonry from "react-masonry-css";

export default function ProjectCards() {
  const breakpointColumnsObj = {
    default: 2,
    720: 1,
  };  

  return (
    <>
      <div className={styles.parentDiv}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonryGrid}
          columnClassName={styles.masonryGridColumn}
        >
          {ourProjects?.map((project, index) => (
            <div className={styles.container} key={index}>
              <img src={project.img} width={100} height={100} alt={project.title} className={styles.image} />
              <div className={styles.overlay}>
                <div className={styles.text}>
                  <div className={styles.smartLink}>
                    <Heading wrap="balance" variant="display-strong-xs" className={styles.TextHeading}>
                      {project.name}
                    </Heading>

                    <ToggleButton className={styles.TextLink} href={project.path} label="View project" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </>
  );
}
