import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonical } from "@/components/seo/JsonLd";
import { CapabilityTemplate } from "@/components/templates/CapabilityTemplate";
import { PillarTemplate } from "@/components/templates/PillarTemplate";
import { liveFrameworks } from "@/resources/frameworks";
import { getService, isServiceHrefLive, liveServices, servicePath, services } from "@/resources/pillars";
import { livePlatforms } from "@/resources/platforms";

/**
 * /services/{pillar or capability}. Only live services from src/resources/pillars.ts are built.
 * The 15 legacy service URLs are answered by the middleware (301 or 410, docs/website-transformation/05).
 */
export const dynamicParams = false;

/** Services served under /services (pillar 4 lives at /compliance). */
const v2Services = () => liveServices().filter((s) => servicePath(s) === `/services/${s.slug}`);

export function generateStaticParams() {
  return v2Services().map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const url = canonical(servicePath(service));
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: url },
    openGraph: { title: service.seo.title, description: service.seo.description, url, type: "website" },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service || servicePath(service) !== `/services/${service.slug}`) notFound();
  const platforms = livePlatforms();
  const frameworks = liveFrameworks();
  if (service.kind === "capability") {
    const parent = services.find((s) => s.slug === service.parent);
    return <CapabilityTemplate service={service} parent={parent} platforms={platforms} frameworks={frameworks} />;
  }
  return <PillarTemplate service={service} platforms={platforms} frameworks={frameworks} isLinkLive={isServiceHrefLive} />;
}
