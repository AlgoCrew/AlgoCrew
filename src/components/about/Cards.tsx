"use client"
import { useEffect, useRef } from 'react';
import { Grid } from '@once-ui-system/core';
import ValueCard from './Card';
import { ourValues } from "@/resources";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Cards.module.scss';

export function Cards({ columns = '2' }: { columns?: string }) {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const cards = gsap.utils.toArray('.card-reveal');

    // Professional Staggered Entry
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: {
          amount: 0.4,
          from: "start"
        },
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          // toggleActions: 'play none none reverse' // Un-comment if you want it to replay on scroll up
        },
      }
    );
  }, []);

  return (
    <Grid
      ref={containerRef}
      columns={3}
      mobileColumns="1"
      fillWidth
      gap="24"
      className={styles.gridContainer}
    >
      {ourValues.map((value) => (
        <div key={value.name} className="card-reveal">
          <ValueCard ourValue={value} />
        </div>
      ))}
    </Grid>
  );
}
