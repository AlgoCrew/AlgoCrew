import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonical } from "@/components/seo/JsonLd";
import { PlatformTemplate } from "@/components/templates/PlatformTemplate";
import { liveFrameworks } from "@/resources/frameworks";
import { isServiceHrefLive } from "@/resources/pillars";
import { getPlatform, livePlatforms } from "@/resources/platforms";

/**
 * /cloud-platforms/{platform}. A platform page exists only when its copy is ready and
 * delivery experience on that platform is verified (src/resources/gating.ts, V-03).
 * Anything else is a 404: no page, no link, no sitemap entry.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return livePlatforms().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const platform = getPlatform((await params).slug);
  if (!platform) return {};
  const url = canonical(`/cloud-platforms/${platform.slug}`);
  return {
    title: platform.seo.title,
    description: platform.seo.description,
    alternates: { canonical: url },
    openGraph: { title: platform.seo.title, description: platform.seo.description, url, type: "website" },
  };
}

export default async function PlatformPage({ params }: Props) {
  const platform = getPlatform((await params).slug);
  if (!platform) notFound();
  return <PlatformTemplate platform={platform} frameworks={liveFrameworks()} isLinkLive={isServiceHrefLive} />;
}
