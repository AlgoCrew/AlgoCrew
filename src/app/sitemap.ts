import type { MetadataRoute } from "next";
import { baseURL, categorizedServices } from "@/resources";
import { ourProjects } from "@/resources/ourProjects";
import { blogPosts } from "@/resources/blog";
import { locations } from "@/resources/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /* ── Static routes ── */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseURL,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0  },
    { url: `${baseURL}/services`,      lastModified: now, changeFrequency: "weekly",  priority: 0.9  },
    { url: `${baseURL}/work`,          lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseURL}/pricing`,       lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseURL}/about`,         lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${baseURL}/careers`,       lastModified: now, changeFrequency: "weekly",  priority: 0.8  },
    { url: `${baseURL}/blog`,          lastModified: now, changeFrequency: "daily",   priority: 0.9  },
    { url: `${baseURL}/faq`,           lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseURL}/locations`,     lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${baseURL}/contact`,       lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseURL}/privacy-policy`,lastModified: now, changeFrequency: "yearly",  priority: 0.3  },
    { url: `${baseURL}/terms`,         lastModified: now, changeFrequency: "yearly",  priority: 0.3  },
  ];

  /* ── Service detail pages ── */
  const serviceRoutes: MetadataRoute.Sitemap = categorizedServices.map((s) => ({
    url: `${baseURL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  /* ── Blog posts ── */
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${baseURL}/blog/${p.slug}`,
    lastModified: new Date(p.date).toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${baseURL}/images/og/home.jpg`],
  }));

  /* ── Work / case study pages (with images for Google image search) ── */
  const workRoutes: MetadataRoute.Sitemap = ourProjects.map((p) => ({
    url: `${baseURL}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
    images: p.img ? [`${baseURL}${p.img}`] : [],
  }));

  /* ── Location pages ── */
  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${baseURL}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...workRoutes, ...locationRoutes];
}
