"use client";

import { Media, Text, Row, Card, Column, RevealFx, SmartLink, Heading, ToggleButton } from "@once-ui-system/core";
import styles from "./Cards.module.scss";
import { ourProjects } from "@/resources";
import Masonry from "react-masonry-css";
import { usePathname } from "next/navigation";

export default function ProjectCards() {
  const breakpointColumnsObj = {
    default: 2,
    720: 1,
  };
  const pathname = usePathname() ?? "";
  

  return (
    <>
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
                  {/* <Text className={styles.TextLink}>View project</Text> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </>
  );
}
