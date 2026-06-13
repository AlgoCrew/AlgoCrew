"use client";

import { mailchimp } from "@/resources";
import { Button, Flex, Heading, Background, Column, Text } from "@once-ui-system/core";
import { opacity, SpacingToken } from "@once-ui-system/core";
import { useEffect, useRef } from "react";
import { getCalApi } from "@calcom/embed-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SendUsEmail.module.scss';

export const SendUsEmail = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Initialize Cal.com
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();

    // GSAP Entrance
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        }
      });

      gsap.from(".cta-stagger", {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.sectionWrapper}>
      <Column
        ref={cardRef}
        className={styles.mainCard}
        fillWidth
        padding="xl"
        radius="xl"
        horizontal="center"
        align="center"
        background="surface"
      >
        <Background
          className={styles.customBackground}
          mask={{
            x: mailchimp.effects.mask.x,
            y: mailchimp.effects.mask.y,
            radius: mailchimp.effects.mask.radius,
            cursor: mailchimp.effects.mask.cursor
          }}
          gradient={{
            display: mailchimp.effects.gradient.display,
            opacity: mailchimp.effects.gradient.opacity as opacity,
            x: mailchimp.effects.gradient.x,
            y: mailchimp.effects.gradient.y,
            width: mailchimp.effects.gradient.width,
            height: mailchimp.effects.gradient.height,
            tilt: mailchimp.effects.gradient.tilt,
            colorStart: mailchimp.effects.gradient.colorStart,
            colorEnd: mailchimp.effects.gradient.colorEnd,
          }}
          dots={{
            display: mailchimp.effects.dots.display,
            opacity: mailchimp.effects.dots.opacity as opacity,
            size: mailchimp.effects.dots.size as SpacingToken,
            color: mailchimp.effects.dots.color,
          }}
        />

        <div className={styles.contentOverlay}>
          <Heading 
            className="cta-stagger" 
            marginBottom="s" 
            variant="display-strong-xs"
            align="center"
          >
            Want to see if we are the <span className={styles.highlight}>right fit?</span>
          </Heading>
          
          <Text
            className="cta-stagger"
            style={{ maxWidth: "540px" }}
            wrap="balance"
            marginBottom="xl"
            onBackground="neutral-medium"
            align="center"
            variant="body-default-l"
          >
            Partner with confidence.
            Start your 7 days free trial! no risk, all reward.
          </Text>

          <Flex 
            className="cta-stagger" 
            gap="16" 
            mobileDirection="column" 
            fillWidth={false}
          >
            <Button
              data-cal-namespace="30min"
              data-cal-link="info-algocrew/30min"
              data-cal-config='{"layout":"month_view"}'
              prefixIcon="calendar"
              variant="primary"
              size="l"
              className={styles.ctaButton}
            >
              Schedule a call
            </Button>

            <Button
              prefixIcon="email"
              href="mailto:query@algocrew.io"
              variant="secondary"
              size="l"
              className={styles.ctaButton}
            >
              Email us directly
            </Button>
          </Flex>
        </div>
      </Column>
    </div>
  );
};
