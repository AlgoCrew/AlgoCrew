"use client"

import { Column, Flex, Heading, Text, Grid, Card } from "@once-ui-system/core";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Cards.module.scss'; // Keeping original styles import

export default function IncludedServices({
  service,
}: {
  service: any
}) {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (service.includes && service.includes.length > 0) {
      service.includes.forEach((_: any, index: any) => {
        // Animate the card itself
        gsap.fromTo(
          `.card-${index}`,
          { opacity: 0, y: 50 }, // Initial state for card
          {
            opacity: 1,
            y: 0,
            duration: 1,
            // delay: index * 0.1,
            scrollTrigger: {
              trigger: `.card-${index}`,
              start: 'top 80%',
              end: 'top 60%',
              scrub: true,
              toggleActions: 'play none none none',
            },
          }
        );
      });
      
    }
  }, [service]);

  return (
    <>
      {service.includes && service.includes.length > 0 && (
        <Column maxWidth="m" horizontal="center" gap="xl" paddingTop="xl">
          <div>
            <Heading variant="display-strong-s" align="center" size="xl">
              Services Include
            </Heading>

            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-s">
              Included services for the {service.name} are lisited below
            </Text>
          </div>


          <Flex fillWidth gap="24" mobileDirection="column">
            <Grid
              columns={3} mobileColumns="1"
              fillWidth marginBottom="40" gap="20"
              className={`${styles.card}`}
            >
              {service.includes.map((childService: any, index: number) => (
                <Column key={childService.slug} className={`card-${index} ${styles.mediaObject} display-flex surface-background neutral-border-alpha-medium border-solid border-1 radius-l-4 flex-column transition-macro-medium min-width-0 fill-width position-relative cursor-interactive neutral-on-background-strong`} fillWidth radius="l-4" direction="column" border="neutral-alpha-medium">
                  <Column className={`card-${index}`} gap="s" align="center" paddingY="32" paddingX="8">
                    <Heading as="h3" size="m">
                      {childService.name}
                    </Heading>

                    <Text align="center" color="muted" onBackground="neutral-weak" variant="body-default-m">
                      {childService.description}
                    </Text>
                  </Column>
                </Column>
              ))}
            </Grid>
          </Flex>
        </Column>
      )}
    </>
  );
}