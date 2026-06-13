import { baseURL } from "@/resources";

interface ServiceSchemaProps {
  /** Display name of the service, e.g. "Web App Development" */
  name: string;
  /** SEO description for the service */
  description: string;
  /** Route slug, e.g. "web-app-development" */
  slug: string;
}

/**
 * Emits Service + BreadcrumbList JSON-LD for a service detail page.
 * Shared across all /services/[slug] pages so the structured data stays
 * consistent. The Service is provided by the AlgoCrew Organization
 * declared in the root layout (@id reference, no duplicate Org node).
 */
export function ServiceSchema({ name, description, slug }: ServiceSchemaProps) {
  const url = `${baseURL}/services/${slug}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        serviceType: name,
        description,
        url,
        provider: { "@id": `${baseURL}/#organization` },
        areaServed: ["CA", "US", "GB"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseURL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${baseURL}/services` },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default ServiceSchema;
