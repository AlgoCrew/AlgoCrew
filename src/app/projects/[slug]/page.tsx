import { notFound } from "next/navigation";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text } from "@once-ui-system/core";
import { baseURL, about, person, work, ourProjects } from "@/resources"; // Import ourProjects
import { formatDate } from "@/utils/formatDate"; // Keep if you add publishedAt back
import { ScrollToHash, CustomMDX } from "@/components"; // Keep if you use CustomMDX for markdown content
import { Metadata } from "next"; // Import Metadata type
import ProjectCard from "@/components/projects/ProjectCard";

// Generate static paths for all projects based on their slugs
export async function generateStaticParams() {
  // Map over your imported ourProjects array to get slugs
  return ourProjects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let project = ourProjects.find((p) => p.slug === slugPath);

  if (!project) return { }; // Return empty metadata if project not found

  return Meta.generate({
    title: project.title,       // Use project.title
    description: project.description, // Use project.description
    baseURL: baseURL,
    image: project.img || 'images/og/about.jpg', // Use project.img
    path: project.path,
  });
}

// Main Project component
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const routeParams = await params
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';
  
  let project = ourProjects.find((p) => p.slug === slugPath);

  if (!project?.name) {
    notFound(); // Display 404 page if project not found
  }

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting" // Consider if 'blogPosting' is appropriate for a project; 'article' might be better
        baseURL={baseURL}
        path={`${project.path}`}
        title={project.title}       // Use project.title
        description={project.description} // Use project.description
        image={project.img || `/api/og/generate?title=${encodeURIComponent(project.title)}`} // Use project.img
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column maxWidth="xs" gap="16">
        <Button data-border="rounded" href="/projects" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
          Projects
        </Button>

      </Column>

      <>
        <ProjectCard project={project}/>
        <ScrollToHash />
      </>
    </Column>
  );
}