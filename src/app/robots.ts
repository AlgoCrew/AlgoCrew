import { baseURL } from "@/resources";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/hire/"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
    host: baseURL,
  };
}
