import React from "react";
import { Meta, Schema } from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/services/Services";
import { ProcessSteps } from "@/components/home/ProcessStep";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { OfferingTechnologies } from "@/components/services/OfferingTechnologies";
import Details from "@/components/about/Details";
import AnimatedTestimonials from "@/components/home/Testimonals";
import { SendUsEmail } from "@/components/home/SendUsEmail";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <main id="main-content" style={{ width: "100%", overflow: "hidden" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={encodeURIComponent(home.image)}
        author={{
          name: "Arqam",
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* 1. Cinematic hero — full viewport, compresses on scroll */}
      <Hero />

      {/* 2. Tech marquee strip */}
      <OfferingTechnologies />

      {/* 3. Horizontal scroll services — pinned section */}
      <Services />

      {/* 4. Sticky sidebar process steps */}
      <ProcessSteps />

      {/* 5. Split-screen Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Selected work */}
      <div style={{ background: "#030609", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "120px 60px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "20px" }}>
            SELECTED WORK
          </span>
          <Projects />
        </div>
      </div>

      {/* 7. Number wall stats */}
      <Details />

      {/* 8. Testimonials */}
      <AnimatedTestimonials />

      {/* 9. Cinematic CTA */}
      <SendUsEmail />
    </main>
  );
}
