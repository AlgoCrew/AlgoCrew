import {
  Column,
  Flex,
  Heading,
  RevealFx,
  Meta,
  Schema
} from "@once-ui-system/core";
import { baseURL, contact, aboutUs, person } from "@/resources";
import styles from "@/components/about/about.module.scss";
import React from "react";
import FormTogger from "@/components/contact/FormToggler";

export async function generateMetadata() {
  return Meta.generate({
    title: contact.title,
    description: contact.description,
    baseURL: baseURL,
    image: `images/og/home.jpg`,
    path: contact.path,
  });
}

export default function Contact() {

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={aboutUs.title}
        description={aboutUs.metaDescription}
        path={aboutUs.path}
        image={`/api/og/generate?title=${encodeURIComponent(aboutUs.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${aboutUs.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Flex fillWidth mobileDirection="column" horizontal="center">
        <Column className={styles.blockAlign} flex={12} fillWidth>
          <FormTogger />
        </Column>
      </Flex>
    </Column>
  );
}
