import {
  Column,
  Flex,
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
    <main style={{ minHeight: "100vh", background: "#030609", paddingTop: "100px" }}>
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

      {/* Hero heading */}
      <section style={{ padding: "60px 60px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "20px" }}>
          GET IN TOUCH
        </span>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "white", margin: "0 0 20px", lineHeight: 1 }}>
          Let&apos;s build something{" "}
          <span style={{ background: "linear-gradient(135deg, #00cccc, #0077ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            together
          </span>
        </h1>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", maxWidth: "480px", lineHeight: 1.7, margin: 0 }}>
          Tell us about your project and we&apos;ll get back to you within 24 hours.
        </p>
      </section>

      {/* Form content */}
      <Column maxWidth="m" gap="xl" horizontal="center" style={{ margin: "0 auto" }}>
        <Flex fillWidth mobileDirection="column" horizontal="center">
          <Column className={styles.blockAlign} flex={12} fillWidth>
            <FormTogger />
          </Column>
        </Flex>
      </Column>
    </main>
  );
}
