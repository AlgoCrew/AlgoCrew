import { notFound } from "next/navigation";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text } from "@once-ui-system/core";
import { baseURL, about, person, work, categorizedServices } from "@/resources"; // Import categorizedServices
import { formatDate } from "@/utils/formatDate"; // Keep if you add publishedAt back
import { ScrollToHash, CustomMDX } from "@/components"; // Keep if you use CustomMDX for markdown content
import { Metadata } from "next"; // Import Metadata type
import ProjectCard from "@/components/projects/ProjectCard";

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
    <Column as="section" maxWidth="l" horizontal="center" gap="l" >
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

      <Column maxWidth="l" horizontal="center" gap="m">
        <Flex
          horizontal="center"
          vertical="center"
          style={{
            backgroundImage: `url(${service.image})`, // Overlay + Image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '600px', // Adjust as needed
            width: '100%',
            borderRadius: '8px',
            position: 'relative', // Needed for absolute positioning of text if you go that route
            color: 'white', // Text color for contrast
            textAlign: 'center', // Center text within the flex container
            padding: '2rem' // Add some padding inside
          }}
          data-border="rounded" // Apply border radius to the Flex container
        >
        </Flex>

        <Flex style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          backgroundColor: '#1024399e',
          overflow: 'hidden',
          width: '60%',
          height: '100%',
          transition: '.4s ease',
          borderRadius: '8px 0 50rem 8px',
        }}>
          <Column maxWidth="s" gap="s" align="center" style={{justifyContent: 'center'}}>
            <Heading align="center" variant="display-strong-s">
              {service.name}
            </Heading>
            <Text align="center" size="l" style={{maxWidth: '70%', marginLeft: '15%'}}>
              {service.description}
            </Text>
          </Column>
        </Flex>
      </Column>

      {service.includes && service.includes.length > 0 && (
        <Column maxWidth="m" horizontal="center" gap="xl" padding="xl">
          <Heading as="h2" align="center" size="xl">
            What is Included
          </Heading>

          <Flex horizontal="center" gap="l" style={{flexWrap: 'wrap'}}>
            {service.includes.map((childService) => (
              <Column minWidth={16} key={childService.slug} maxWidth={16} gap="m" align="center">
                {/* {childService.image && (
                  <Media
                    src={childService.image}
                    alt={childService.name}
                    data-border="rounded"
                    style={{ height: '12px', width: "120px", borderRadius: '8px' }}
                    objectFit="cover"
                  />
                )} */}
                <Heading as="h3" size="m">
                  {childService.name}
                </Heading>
                <Text align="center" color="muted">
                  {childService.description}
                </Text>
              </Column>
            ))}
          </Flex>
        </Column>
      )}

      {service.steps && service.steps.length > 0 && (
        <Column maxWidth="m" horizontal="center" gap="xl" padding="xl">
          <Heading as="h2" align="center" size="xl">
            Our Process
          </Heading>
          <Column gap="l">
            {service.steps.map((step, index) => (
              <Flex key={index} gap="m" align="start">
                <Text color="primary">
                  {index + 1}.
                </Text>
                <Column gap="s">
                  <Heading as="h3" size="l">
                    {step.title}
                  </Heading>
                  <Text color="muted">
                    {step.description}
                  </Text>
                </Column>
              </Flex>
            ))}
          </Column>
        </Column>
      )}

      <>
        {/* <ProjectCard project={service}/> */}
        <ScrollToHash />
      </>
    </Column>
  );
}