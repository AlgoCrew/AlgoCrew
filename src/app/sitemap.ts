import type { MetadataRoute } from "next";
import { baseURL } from "@/resources";
import { listedPosts } from "@/resources/blog";
import { liveFrameworks } from "@/resources/frameworks";
import { liveServices, servicePath } from "@/resources/pillars";
import { livePlatforms } from "@/resources/platforms";
import { site } from "@/resources/site";

/**
 * Sitemap built from the same gated data as the pages and menus (roadmap T10.03).
 * Only indexable pages: no retired or hidden posts, no gated pages, no redirect sources.
 * `npm run check:sitemap` fails the build if this and the built pages ever disagree.
 */
type Entry = MetadataRoute.Sitemap[number];
const page = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
  url: path === "/" ? baseURL : `${baseURL}${path}`,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    ...liveServices().map((s) => page(servicePath(s), s.kind === "pillar" ? 0.9 : 0.8)),
    page("/cloud-platforms", 0.8),
    ...livePlatforms().map((p) => page(`/cloud-platforms/${p.slug}`, 0.8)),
    ...liveFrameworks().map((f) => page(`/compliance/${f.slug}`, 0.8)),
    page("/our-approach", 0.7),
    page("/about", 0.7),
    ...(site.trustPageVerified ? [page("/trust", 0.6)] : []),
    page("/contact", 0.7),
    page("/careers", 0.5),
    page("/blog", 0.8, "weekly"),
    ...listedPosts().map((p) => ({
      ...page(`/blog/${p.slug}`, 0.6),
      lastModified: new Date(p.updated ?? p.date).toISOString(),
    })),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
