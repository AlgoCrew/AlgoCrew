// cards.tsx
"use client"
import { useEffect } from 'react'; // Import useEffect
import { Grid, Column } from '@once-ui-system/core';
import ValueCard from './Card'; // Renamed import for clarity, but the file is still 'Card.tsx'
import { ourValues } from "@/resources"; // Assuming allourValues is imported from your resources file
import gsap from 'gsap'; // Import GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Cards.module.scss'; // Keeping original styles import

interface ourValue {
    name: string;
    description: string;
    iconName?: string;
}

interface CardsProps {
    columns?: '1' | '2' | '3' | '4';
    direction?: 'row' | 'column';
}

export function Cards({
    columns = '1',
    direction
}: CardsProps) {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (ourValues.length > 0) {
      ourValues.forEach((_: any, index: any) => {
        // Animate the card itself
        gsap.fromTo(
          `.value-card-${index}`,
          { opacity: 0, y: 50 }, // Initial state for card
          {
            opacity: 1,
            y: 0,
            duration: 1,
            // delay: index * 0.1,
            scrollTrigger: {
              trigger: `.value-card-${index}`,
              start: 'top 80%',
              end: 'top 60%',
              scrub: true,
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, [ourValues]);

    return (
      <>
        {ourValues.length > 0 && (
          <Grid
            columns={columns} mobileColumns="1"
            fillWidth marginBottom="40" gap="12"
            className={`${styles.card}`}
          >
            {ourValues.map((ourValue, index) => (
              <Column key={ourValue.name} className={`value-card-${index} ${styles.mediaObject} display-flex surface-background neutral-border-alpha-medium border-solid border-1 radius-l-4 flex-column transition-macro-medium min-width-0 fill-width position-relative cursor-interactive neutral-on-background-strong`} fillWidth radius="l-4" direction="column" border="neutral-alpha-medium">
                <ValueCard // Using ValueCard here
                  ourValue={ourValue} // Passing the ourValue object as a prop
                  direction={direction}
                />
              </Column>
            ))}
          </Grid>
        )}
      </>
    );
}
