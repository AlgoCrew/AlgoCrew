"use client"

import React from "react";

import { Flex, Text, Button, Column } from "@once-ui-system/core";
import { about } from "@/resources";
import styles from "@/components/about/about.module.scss";

  
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CeoCalendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  return (
    <>     
      {/* <Text onBackground="neutral-weak" variant="body-default-l" marginBottom="m">
        Want to see if we’re the right fit? Let’s work together risk-free. Try us free for 7 days!!
      </Text> */}

      <Flex maxWidth="m" gap="s" horizontal="start" vertical="start" mobileDirection="column">
          <Column
              id={about.intro.title}
              // fillWidth
              // minHeight="80"
              vertical="center"
              // marginBottom="8"
              className={styles.columnHeight}
          >
              {about.calendar.display && (
                  <Flex
                      fitWidth
                      // border="brand-alpha-medium"
                      className={` ${styles.blockAlign} ${styles.cursorPointer}`}
                      style={{
                          backdropFilter: "blur(var(--static-space-1))",
                      }}
                      background="brand-alpha-strong"
                      radius="full"
                      // padding="4"
                      gap="8"
                      // marginBottom="m"
                      data-cal-namespace="30min"
                      data-cal-link="ceo-algocrew/30min"
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
              // fillWidth
              // minHeight="80"
              vertical="center"
              // marginBottom="8"
              className={styles.columnHeight}
          >
              {about.calendar.display && (
                  <Flex
                      fitWidth
                      // border="brand-alpha-medium"
                      border="accent-alpha-weak"
                      className={`animate-bounce ${styles.blockAlign} ${styles.cursorPointer} ${styles.glowingBorder}`}
                      style={{
                          backdropFilter: "blur(var(--static-space-1))",
                      }}
                      // background="brand-alpha-weak"
                      background="accent-alpha-weak"
                      radius="full"
                      // padding="4"
                      gap="8"
                      // marginBottom="m"
                      vertical="center"
                  >
                    {/* <Button prefixIcon="email"  href="mailto:info@algocrew.io" variant="primary">
                      <Flex padding="8" paddingRight="12" >Email us directly</Flex>
                    </Button> */}
                    <Button prefixIcon="email"  href="mailto:ceo@algocrew.io" variant="secondary">
                      <Flex padding="8">Email us directly</Flex>
                    </Button>
                  </Flex>
              )}
          </Column>
      </Flex>
    </>
  );
}
