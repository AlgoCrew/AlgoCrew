import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row, Meta, Schema, Icon, IconButton } from "@once-ui-system/core";
import { home, about, person, newsletter, baseURL, routes, services, social } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Cards } from "@/components/services/Cards";
import { OfferingTechnologies } from "@/components/services/OfferingTechnologies";
import styles from "@/components/about/about.module.scss";
import { CtoCalendar } from "@/components/Calendars/CtoCalendar";
import { SendUsEmail } from "@/components/services/SendUsEmail";
import { ServicesHero } from "@/components/services/ServicesHero";

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={services.path}
        title={services.title}
        description={services.description}
        image={`/api/og/generate?title=${encodeURIComponent(services.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* <Column fillWidth paddingTop="24" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {services.headline}
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.2} fillWidth paddingBottom="32">
            <Text onBackground="neutral-weak" variant="body-default-l">
              {services.subline}
            </Text>
          </RevealFx>

          <Column
            id={about.intro.title}
            fillWidth
            minHeight="80"
            vertical="center"
            // marginBottom="8"
          >
            <CtoCalendar />
          </Column>
        </Column>
      </Column> */}

      <ServicesHero />

      <RevealFx translateY="16" delay={0.4}>
        <Flex fillWidth paddingY="64">
           <Cards columns="3" />
        </Flex>
      </RevealFx>
{/* 
      <RevealFx translateY="16" delay={0.6}>
        <OfferingTechnologies />
      </RevealFx> */}

      <Column maxWidth="m" paddingY="80" vertical="center" horizontal="center">
        <SendUsEmail />
      </Column>
    </Column>
  );
}


