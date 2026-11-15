import { baseURL } from "@/resources";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og/"],
        // Server internals only. Open Graph images under /api/og/ stay fetchable (05 §3).
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
