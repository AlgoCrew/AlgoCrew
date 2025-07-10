"use client";

import Masonry from "react-masonry-css";
import { Media, OgCard } from "@once-ui-system/core";
import styles from "./Gallery.module.scss";
import { gallery } from "@/resources";

export default function MasonryGrid() {
  const breakpointColumnsObj = {
    default: 2,
    720: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {gallery.images.map((image, index) => (
        <Media
          priority={index < 10}
          sizes="(max-width: 560px) 100vw, 50vw"
          key={index}
          radius="m"
          aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
          src={image.src}
          alt={image.alt}
          className={styles.gridItem}
        />
      ))}

      <OgCard 
        ogData={{
          title: "Design Engineers Club",
          description: "The Design Engineers Club is a community of vibe coders.",
          image: "/images/projects/project-01/otre.png",
          faviconUrl: "/images/avatar.jpg",
          url: "https://designengineers.club"
        }}
      />

      <OgCard 
        ogData={{
          title: "Design Engineers Club",
          description: "The Design Engineers Club is a community of vibe coders.",
          image: "/images/projects/project-01/otre.png",
          faviconUrl: "/images/avatar.jpg",
          url: "https://designengineers.club"
        }}
      />

      <OgCard 
        ogData={{
          title: "Design Engineers Club",
          description: "The Design Engineers Club is a community of vibe coders.",
          image: "/images/projects/project-01/otre.png",
          faviconUrl: "/images/avatar.jpg",
          url: "https://designengineers.club"
        }}
        direction="row"
      />

      <OgCard 
        ogData={{
          title: "Design Engineers Club",
          description: "The Design Engineers Club is a community of vibe coders.",
          image: "/images/projects/project-01/otre.png",
          faviconUrl: "/images/avatar.jpg",
          url: "https://designengineers.club"
        }}
        direction="row"
      />

      <OgCard 
        ogData={{
          title: "Design Engineers Club",
          description: "The Design Engineers Club is a community of vibe coders.",
          image: "/images/projects/project-01/otre.png",
          faviconUrl: "/images/avatar.jpg",
          url: "https://designengineers.club"
        }}
        direction="row-reverse"
      />

      <OgCard 
        ogData={{
          title: "Design Engineers Club",
          description: "The Design Engineers Club is a community of vibe coders.",
          image: "/images/projects/project-01/otre.png",
          faviconUrl: "/images/avatar.jpg",
          url: "https://designengineers.club"
        }}
        direction="row-reverse"
        background="brand-alpha-weak"
        border="brand-alpha-medium"
        shadow="l"
      />
    </Masonry>
  );
}
