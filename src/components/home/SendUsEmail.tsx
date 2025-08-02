"use client";

import { mailchimp } from "@/resources";
import { Button, Flex, Heading, Input, Text, Background, Column, Icon } from "@once-ui-system/core";
import { opacity, SpacingToken } from "@once-ui-system/core";
import { useState } from "react";
import { CtoCalendar } from "../Calendars/CtoCalendar";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import BlurAnimatedText from "../ui/BlurAnimatedText";


export const SendUsEmail = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
    >
      <Background
        top="0"
        position="absolute"
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
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
        }}
      />
      <Heading style={{ position: "relative" }} marginBottom="s" variant="display-strong-xs">
        Ready to move fast and scale smart?
      </Heading>
      <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)",
        }}
        wrap="balance"
        marginBottom="m"
        onBackground="neutral-medium"
      >
        Got a bold idea? Let’s bring your vision to life.
        Talk to our experts today and kickstart your journey!
      </Text>

      <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)",
        }}
        wrap="balance"
        marginBottom="s"
        onBackground="neutral-medium"
        className="align-items-center"
      >
        <Flex height="48" vertical="center" gap="m" mobileDirection="column">
          <Flex height="48" vertical="center">
            <Button
              href="mailto:info@algocrew.io"
            >
              Send Us an email
            </Button>
          </Flex>

          <Flex height="48" vertical="center">
            <Button
              data-cal-namespace="30min"
              data-cal-link="info-algocrew/30min"
              data-cal-config='{"layout":"month_view"}'
            >
              Schedule a call
            </Button>
          </Flex>
        </Flex>
      </Text>
    </Column>
  );
};
