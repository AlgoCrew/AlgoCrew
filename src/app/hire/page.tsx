import {
  Column,
  Flex,
  Meta,
  Schema
} from "@once-ui-system/core";
import { baseURL, hire, aboutUs, person } from "@/resources";
import styles from "@/components/about/about.module.scss";
import React from "react";
import FormTogger from "@/components/contact/FormToggler";

export async function generateMetadata() {
  return Meta.generate({
    title: hire.title,
    description: hire.description,
    baseURL: baseURL,
    image: `images/og/home.jpg`,
    path: hire.path,
  });
}

export default function Contact() {

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={aboutUs.title}
        description={aboutUs.description}
        path={aboutUs.path}
        image="/images/og/about.jpg"
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
