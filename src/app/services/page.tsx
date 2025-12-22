import React from "react";

import { Flex, RevealFx, Column, Schema } from "@once-ui-system/core";
import { about, person, baseURL, services } from "@/resources";
import { Cards } from "@/components/services/Cards";
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

      <ServicesHero />

      <RevealFx translateY="16" delay={0.4}>
        <Flex fillWidth paddingY="64">
           <Cards columns="3" />
        </Flex>
      </RevealFx>

      <Column maxWidth="m" vertical="center" horizontal="center">
        <SendUsEmail />
      </Column>
    </Column>
  );
}


