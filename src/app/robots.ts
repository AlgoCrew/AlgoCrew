import { baseURL } from "@/resources";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Only block server/API internals. Real content (including /hire) is
        // crawlable so Google can read its canonical tag and consolidate.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
    host: baseURL,
  };
}
