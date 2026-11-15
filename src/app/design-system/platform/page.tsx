import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformTemplate } from "@/components/templates/PlatformTemplate";
import { frameworks } from "@/resources/frameworks";
import { platforms } from "@/resources/platforms";

/**
 * Internal preview of the platform template with the Azure draft and every gate ignored.
 * noindex, absent from the sitemap, 404 on production. The public route is
 * /cloud-platforms/azure, which stays 404 until gating.ts says otherwise.
 */
export const metadata: Metadata = {
  title: "Platform template preview (Azure draft)",
  robots: { index: false, follow: false },
};

export default function PlatformPreviewPage() {
  if (process.env.VERCEL_ENV === "production") notFound();
  const azure = platforms.find((p) => p.slug === "azure");
  if (!azure) notFound();
  return <PlatformTemplate platform={azure} frameworks={frameworks} isLinkLive={() => true} />;
}
