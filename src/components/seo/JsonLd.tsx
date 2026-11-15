import { baseURL } from "@/resources";
import { site } from "@/resources/site";

/**
 * Structured-data and canonical helpers (docs/website-transformation/09 §7).
 * Company facts come only from site.ts: an unverified fact is left out of the schema.
 */

/** Absolute canonical URL on the apex host: no trailing slash, no query string, no hash. */
export const canonical = (path: string): string => {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, "");
  return clean ? `${baseURL}${clean.startsWith("/") ? "" : "/"}${clean}` : baseURL;
};

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so a string value can never close the script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const defined = (o: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && !(Array.isArray(v) && v.length === 0)));

export const organizationSchema = () =>
  defined({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseURL}/#organization`,
    name: site.brand,
    legalName: site.legalName,
    url: baseURL,
    email: site.email,
    telephone: site.phone,
    foundingDate: site.foundingYear ? String(site.foundingYear) : undefined,
    sameAs: Object.values(site.social),
  });

export const breadcrumbSchema = (trail: readonly { label: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.label,
    item: canonical(item.href),
  })),
});

/** For pillar, capability, platform and framework pages. No Offer or price data. */
export const serviceSchema = ({ name, description, path }: { name: string; description: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: canonical(path),
  provider: { "@id": `${baseURL}/#organization` },
});
