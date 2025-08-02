"use client"

import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row, Meta, Schema, Icon, IconButton } from "@once-ui-system/core";
import { home, about, person, newsletter, baseURL, routes, services, social } from "@/resources";
import styles from "@/components/about/about.module.scss";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import BlurAnimatedText from "../ui/BlurAnimatedText";

export function CtoCalendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  return (
    <>
      <Text onBackground="neutral-weak" variant="body-default-l" marginBottom="m">
        Looking for the right tech partner? Let’s explore how we can help. Talk to our experts at
        {' '}<BlurAnimatedText text="cto@algocrew.io" />{' '}
        or schedule your free consultation now!
      </Text>

      <Column maxWidth="m" gap="xl" horizontal="center">
          <Column
              id={about.intro.title}
              fillWidth
              minHeight="80"
              vertical="center"
              // marginBottom="8"
          >
              {about.calendar.display && (
                  <Flex
                      fitWidth
                      border="brand-alpha-medium"
                      className={` ${styles.blockAlign} ${styles.cursorPointer}`}
                      style={{
                          backdropFilter: "blur(var(--static-space-1))",
                      }}
                      background="brand-alpha-weak"
                      radius="full"
                      padding="4"
                      gap="8"
                      // marginBottom="m"
                      data-cal-namespace="30min"
                      data-cal-link="cto-algocrew/30min"
                      data-cal-config='{"layout":"month_view"}'
                      vertical="center"
                  >
                      <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                      <Flex padding="8" paddingRight="12" >Schedule a call</Flex>
                  </Flex>
              )}
          </Column>
      </Column>
    </>
  );
}
