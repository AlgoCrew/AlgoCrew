export const dynamic = "force-static";

import { Column, Flex, Meta, Schema } from "@once-ui-system/core";
import { baseURL, contact, aboutUs, person } from "@/resources";
import styles from "@/components/about/about.module.scss";
import React from "react";
import FormTogger from "@/components/contact/FormToggler";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactOptions } from "@/components/contact/ContactOptions";
import { SendUsEmail } from "@/components/home/SendUsEmail";

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
    <main style={{ minHeight: "100vh", background: "var(--bg-page)" }}>
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

      {/* Hero — improved */}
      <ContactHero />

      {/* Forms toggle — unchanged */}
      <section style={{ padding: "0 60px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <Column maxWidth="m" gap="xl" horizontal="center" style={{ margin: "0 auto", maxWidth: "100%" }}>
          <Flex fillWidth mobileDirection="column" horizontal="center">
            <Column className={styles.blockAlign} flex={12} fillWidth>
              <FormTogger />
            </Column>
          </Flex>
        </Column>
      </section>

      {/* Other ways to reach us */}
      <ContactOptions />

      {/* CTA */}
      <SendUsEmail />
    </main>
  );
}
