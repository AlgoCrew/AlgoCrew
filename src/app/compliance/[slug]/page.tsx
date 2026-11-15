import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonical } from "@/components/seo/JsonLd";
import { FrameworkTemplate } from "@/components/templates/FrameworkTemplate";
import { getFramework, liveFrameworks } from "@/resources/frameworks";
import { livePlatforms } from "@/resources/platforms";

/**
 * /compliance/{framework}. A framework page exists only when its copy is ready, delivery
 * experience is verified and the page has been legally reviewed (src/resources/gating.ts).
 * Anything else is a 404: no page, no link, no sitemap entry.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return liveFrameworks().map((f) => ({ slug: f.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const framework = getFramework((await params).slug);
  if (!framework) return {};
  const url = canonical(`/compliance/${framework.slug}`);
  return {
    title: framework.seo.title,
    description: framework.seo.description,
    alternates: { canonical: url },
    openGraph: { title: framework.seo.title, description: framework.seo.description, url, type: "website" },
  };
}

export default async function FrameworkPage({ params }: Props) {
  const framework = getFramework((await params).slug);
  if (!framework) notFound();
  return <FrameworkTemplate framework={framework} platforms={livePlatforms()} />;
}
