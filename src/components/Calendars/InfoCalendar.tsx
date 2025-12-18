"use client"

import React from "react";

import { Flex, Text, Button, Column } from "@once-ui-system/core";
import { about } from "@/resources";
import styles from "@/components/about/about.module.scss";

  
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function InfoCalendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  return (
    <>     
      <Text style={{ color: 'white' }} variant="body-default-l" marginBottom="m">
        Ready to move fast and scale smart? Let’s bring your MVP to life!
      </Text>

      <Flex maxWidth="m" gap="s" horizontal="start" vertical="start" mobileDirection="column">
          <Column
              id={about.intro.title}
              vertical="center"
              className={styles.columnHeight}
          >
              {about.calendar.display && (
                  <Flex
                      fitWidth
                      className={` ${styles.blockAlign} ${styles.cursorPointer}`}
                      style={{
                          backdropFilter: "blur(var(--static-space-1))",
                      }}
                      background="brand-alpha-strong"
                      radius="full"
                      gap="8"
                      data-cal-namespace="30min"
                      data-cal-link="info-algocrew/30min"
                      data-cal-config='{"layout":"month_view"}'
                      vertical="center"
                  >
                      <Button prefixIcon="calendar"  >
                        <Flex padding="8">Book a Free Consultation</Flex>
                      </Button>
                  </Flex>
              )}
          </Column>

          <Column
              id={about.intro.title}
              vertical="center"
              className={styles.columnHeight}
          >
              {about.calendar.display && (
                  <Flex
                      fitWidth
                      border="accent-alpha-weak"
                      className={`animate-bounce ${styles.blockAlign} ${styles.cursorPointer} ${styles.glowingBorder}`}
                      style={{
                          // backdropFilter: "blur(var(--static-space-1))",
                          color: 'white'
                      }}
                      background="accent-alpha-weak"
                      radius="full"
                      // padding="4"
                      gap="8"
                      vertical="center"
                  >
                    <Button prefixIcon="email" style={{ color: 'white' }}   href="mailto:info@algocrew.io" variant="secondary">
                      <Flex padding="8">Email us directly</Flex>
                    </Button>
                  </Flex>
              )}
          </Column>
      </Flex>
    </>
  );
}
