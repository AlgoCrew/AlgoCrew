import {
  Column,
  Flex,
  Meta,
  Schema
} from "@once-ui-system/core";
import { baseURL, hire } from "@/resources";
import styles from "@/components/about/about.module.scss";
import React from "react";
import FormTogger from "@/components/contact/FormToggler";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: hire.title,
      description: hire.description,
      baseURL: baseURL,
      image: `images/og/home.jpg`,
      path: hire.path,
    }),
    alternates: { canonical: hire.path },
    // /hire is a thin lead-gen page: crawlable (not robots-blocked) but kept out of the index.
    robots: { index: false, follow: true },
  };
}

export default function Contact() {

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={hire.title}
        description={hire.description}
        path={hire.path}
        image="/images/og/home.jpg"
      />
 
      <Flex fillWidth mobileDirection="column" horizontal="center">
        <Column className={styles.blockAlign} flex={12} fillWidth>
          <FormTogger />
        </Column>
      </Flex>
    </Column>
  );
}
