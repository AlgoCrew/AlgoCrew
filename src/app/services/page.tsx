import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row, Meta, Schema, Icon, IconButton } from "@once-ui-system/core";
import { home, about, person, newsletter, baseURL, routes, services, social } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Cards } from "@/components/services/Cards";
import { Calendar } from "@/components/services/Calendar";
import { OfferingTechnologies } from "@/components/services/OfferingTechnologies";
import styles from "@/components/about/about.module.scss";

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

      <Column fillWidth paddingTop="24" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {services.headline}
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
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
            <Calendar />
          </Column>
        </Column>
      </Column>


      <RevealFx translateY="16" delay={0.6}>
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={3} paddingX="20">
            <Cards columns="3" />
          </Flex>
        </Flex>
      </RevealFx>

      <OfferingTechnologies />

      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
