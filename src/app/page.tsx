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
import { TechShowcase } from "@/components/home/TechShowcase";
import { AchievementsStrip } from "@/components/home/AchievementsStrip";

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
    <main
      id="main-content"
      style={{
        width: "100%",
        overflowX: "clip", /* clips horizontal without breaking sticky */
        position: "relative",
      }}
    >
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

      {/* 1. Cinematic hero */}
      <Hero />

      {/* 2. Tech marquee strip */}
      <OfferingTechnologies />

      {/* 3. Horizontal scroll services (CSS sticky, no GSAP pin) */}
      <Services />

      {/* 4. NEW: Achievements / metrics strip */}
      <AchievementsStrip />

      {/* 5. Sticky sidebar process steps */}
      <ProcessSteps />

      {/* 6. Split-screen Why Choose Us */}
      <WhyChooseUs />

      {/* 7. NEW: Interactive tech showcase */}
      <TechShowcase />

      {/* 8. Selected work */}
      <div
        style={{
          background: "#030609",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          padding: "120px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.25)",
              display: "block",
              marginBottom: "20px",
            }}
          >
            SELECTED WORK
          </span>
          <Projects />
        </div>
      </div>

      {/* 9. Number wall stats */}
      <Details />

      {/* 10. Testimonials */}
      <AnimatedTestimonials />

      {/* 11. Cinematic CTA */}
      <SendUsEmail />
    </main>
  );
}
