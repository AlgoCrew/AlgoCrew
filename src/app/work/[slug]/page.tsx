import { notFound } from "next/navigation";
import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, work } from "@/resources";
import { ourProjects } from "@/resources";
import { Metadata } from "next";
import { ProjectDetail } from "@/components/work/ProjectDetail";
import { SendUsEmail } from "@/components/home/SendUsEmail";

const catColors: Record<string, string> = {
  "Web application":   "#06c8e8",
  "Cloud application": "#a78bfa",
  "SaaS Platform":     "#34d399",
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return (ourProjects as any[]).map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = (ourProjects as any[]).find((p: any) => p.slug === slug);
  if (!project) return {};
  return Meta.generate({
    title: `${project.title} — AlgoCrew`,
    description: project.description,
    baseURL,
    image: project.img,
    path: `${work.path}/${slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = (ourProjects as any[]).find((p: any) => p.slug === slug);
  if (!project) notFound();

  const accent   = catColors[project.category] ?? "#06c8e8";
  const all      = ourProjects as any[];
  const idx      = all.findIndex((p: any) => p.slug === slug);
  const prev     = idx > 0 ? all[idx - 1] : null;
  const next     = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <main style={{ width: "100%", overflowX: "clip", background: "var(--bg-page)" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={`${work.path}/${slug}`}
        title={`${project.title} — AlgoCrew`}
        description={project.description}
        image={project.img}
      />
      <ProjectDetail project={project} accent={accent} prev={prev} next={next} />
      <SendUsEmail />
    </main>
  );
}
