import React from "react";
import { Column, Meta, Schema } from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { ProcessSteps } from "@/components/home/ProcessStep";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { OfferingTechnologies } from "@/components/services/OfferingTechnologies";
import Details from "@/components/about/Details";
import AnimatedTestimonials from "@/components/home/Testimonals";
import { SendUsEmail } from "@/components/home/SendUsEmail";
import { Services } from "@/components/services/Services";
import { Hero } from "@/components/home/Hero";

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
    <main id="main-content">
      <Column maxWidth="xl" gap="xl" horizontal="center">
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={home.path}
          title={home.title}
          description={home.description}
          image={encodeURIComponent(home.image)}
          author={{
            name: 'Arqam',
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />

        <Hero />

        <div className="py-16 w-full">
          <OfferingTechnologies />
        </div>

        <div className="w-full">
          <Services />
        </div>

        <div className="w-full flex flex-col items-center">
          <ProcessSteps />
        </div>

        <div className="w-full flex flex-col items-center">
          <WhyChooseUs />
        </div>

        <Projects />

        <div className="w-full flex flex-col items-center bg-page">
          <Details />
        </div>

        <div className="w-full bg-page">
          <AnimatedTestimonials />
        </div>

        <Column
          maxWidth="xl"
          minHeight="80"
          vertical="center"
          className="px-3 md:px-16"
          background="page"
        >
          <SendUsEmail />
        </Column>
      </Column>
    </main>
  );
}
