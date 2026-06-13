import { notFound } from "next/navigation";
import { Meta } from "@once-ui-system/core";
import { baseURL, categorizedServices } from "@/resources";
import { Metadata } from "next";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Parallax from "@/components/services/Parallax";
import IncludedServices from "@/components/services/IncludedServices";
import Steps from "@/components/services/Steps";
import ServiceRelatedWork from "@/components/services/ServiceRelatedWork";
import { FAQ } from "@/components/home/FAQ";
import { SendUsEmail } from "@/components/home/SendUsEmail";

export async function generateStaticParams() {
  return (categorizedServices as any[]).map((s: any) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = (categorizedServices as any[]).find((s: any) => s.slug === slug);
  if (!service) return {};
  return {
    ...Meta.generate({
      title: service.title,
      description: service.description,
      baseURL,
      image: service.image || `/api/og/generate?title=${encodeURIComponent(service.title)}`,
      path: `/services/${service.slug}`,
    }),
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = (categorizedServices as any[]).find((s: any) => s.slug === slug);
  if (!service?.name) notFound();

  return (
    <main style={{ width: "100%", overflowX: "clip", background: "var(--bg-page)" }}>
      <ServiceSchema
        name={service.name}
        description={service.description}
        slug={service.slug}
      />

      {/* Full-bleed parallax hero */}
      <Parallax service={service} />

      {/* Included sub-services grid */}
      <div style={{ padding: "80px 0 40px", background: "var(--bg-page)" }}>
        <IncludedServices service={service} />
      </div>

      {/* Process steps timeline */}
      <div style={{ padding: "40px 0 0", background: "var(--bg-page)" }}>
        <Steps service={service} />
      </div>

      {/* Related projects from /work */}
      <ServiceRelatedWork serviceSlug={service.slug} serviceName={service.name} />

      {/* FAQ */}
      <FAQ />

      {/* Email CTA */}
      <SendUsEmail />
    </main>
  );
}
