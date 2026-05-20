import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { SendUsEmail } from "@/components/home/SendUsEmail";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <main style={{ width: "100%", overflowX: "clip" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero */}
      <WorkHero />

      {/* All projects — filterable grid */}
      <WorkGrid />

      {/* CTA */}
      <SendUsEmail />
    </main>
  );
}
