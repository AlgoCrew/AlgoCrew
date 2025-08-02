import { notFound } from "next/navigation";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Grid, Text, RevealFx, Card } from "@once-ui-system/core";
import { baseURL, about, person, work, categorizedServices } from "@/resources"; // Import categorizedServices
import { formatDate } from "@/utils/formatDate"; // Keep if you add publishedAt back
import { ScrollToHash, CustomMDX } from "@/components"; // Keep if you use CustomMDX for markdown content
import { Metadata } from "next"; // Import Metadata type
import ProjectCard from "@/components/projects/ProjectCard";
import { Row, ToggleButton, useTheme } from '@once-ui-system/core';
import HeroSection from "@/components/services/HeroSection";
import IncludedServices from "@/components/services/IncludedServices";
import Steps from "@/components/services/Steps";
import Parallax from "@/components/Parallax";
import { CtoCalendar } from "@/components/Calendars/CtoCalendar";
import { SendUsEmail } from "@/components/services/SendUsEmail";

// Generate static paths for all services based on their slugs
export async function generateStaticParams() {
  // Map over your imported categorizedServices array to get slugs
  return categorizedServices.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for each service page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let service = categorizedServices.find((p) => p.slug === slugPath);

  if (!service) return {}; // Return empty metadata if service not found

  return Meta.generate({
    title: service.title,       // Use service.title
    description: service.description, // Use service.description for meta description
    baseURL: baseURL,
    image: service.image || `/api/og/generate?title=${encodeURIComponent(service.title)}`, // Use service.image
    path: `/services/${service.slug}`, // Use service.slug for path
  });
}

// Main service component
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const routeParams = await params
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';
  
  let service = categorizedServices.find((p) => p.slug === slugPath);

  if (!service?.name) {
    notFound(); // Display 404 page if service not found
  }

  return (
    <Column as="section" maxWidth="l" horizontal="center" gap="l" overflow="visible">
      <Schema
        as="article" // 'article' is generally more appropriate for a service page than 'blogPosting'
        baseURL={baseURL}
        path={`/services/${service.slug}`} // Use service.slug for path
        title={service.title}       // Use service.title
        description={service.description} // Use service.description for schema description
        image={service.image || `/api/og/generate?title=${encodeURIComponent(service.title)}`} // Use service.image
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Parallax service={service}/>

      {/* <HeroSection service={service} /> */}

      <IncludedServices service={service} />

      <Steps service={service} />

      <Column
        id={about.intro.title}
        maxWidth="m"
        minHeight="80"
        vertical="center"
        // marginBottom="8"
      >
        <SendUsEmail />
      </Column>
    </Column>
  );
}