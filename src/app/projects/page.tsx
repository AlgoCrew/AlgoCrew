import { Flex, Meta, Schema, Column } from "@once-ui-system/core";
import MasonryGrid from "@/components/projects/MasonryGrid";
import { baseURL, projects, person } from "@/resources";
import ProjectCards from "@/components/projects/ProjectCards";

export async function generateMetadata() {
  return Meta.generate({
    title: projects.title,
    description: projects.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(projects.title)}`,
    path: projects.path,
  });
}

export default function gallery() {
  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={projects.title}
        description={projects.description}
        path={projects.path}
        image={`/api/og/generate?title=${encodeURIComponent(projects.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${projects.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {/* <MasonryGrid /> */}
      <ProjectCards />
    </Flex>
  );
}
