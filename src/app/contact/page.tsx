export const dynamic = "force-static";

import { Column, Flex, Meta } from "@once-ui-system/core";
import { baseURL, contact } from "@/resources";
import styles from "@/components/about/about.module.scss";
import pageStyles from "@/app/contact/contact-page.module.scss";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: contact.title,
            description: contact.description,
            url: `${baseURL}${contact.path}`,
            mainEntity: {
              "@type": "Organization",
              "@id": `${baseURL}/#organization`,
              name: "AlgoCrew",
              email: "query@algocrew.io",
              telephone: "+1-437-450-9656",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Brampton, Ontario L6V 2E7",
                addressLocality: "Brampton",
                addressRegion: "ON",
                postalCode: "L6V 2E7",
                addressCountry: "CA",
              },
            },
          }),
        }}
      />

      {/* Hero — improved */}
      <ContactHero />

      {/* Forms toggle */}
      <section className={pageStyles.formSection}>
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
