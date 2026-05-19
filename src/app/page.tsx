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

const wrap: React.CSSProperties = { position: "relative", zIndex: 1 };

export default function Home() {
  return (
    <main
      id="main-content"
      style={{ width: "100%", overflowX: "clip", position: "relative" }}
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

      <div style={wrap}><Hero /></div>
      <div style={wrap}><OfferingTechnologies /></div>
      <div style={wrap}><Services /></div>
      <div style={wrap}><AchievementsStrip /></div>
      <div style={wrap}><ProcessSteps /></div>
      <div style={wrap}><WhyChooseUs /></div>
      <div style={wrap}><TechShowcase /></div>
      <div style={wrap}><Projects /></div>
      <div style={wrap}><Details /></div>
      <div style={wrap}><AnimatedTestimonials /></div>
      <div style={wrap}><SendUsEmail /></div>
    </main>
  );
}
