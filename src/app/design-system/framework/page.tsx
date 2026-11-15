import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FrameworkTemplate } from "@/components/templates/FrameworkTemplate";
import { frameworks } from "@/resources/frameworks";
import { platforms } from "@/resources/platforms";

/**
 * Internal preview of the framework template with the HIPAA draft and every gate ignored.
 * For design and legal review only: noindex, absent from the sitemap, 404 on production.
 * The public route is /compliance/hipaa, which stays 404 until gating.ts says otherwise.
 */
export const metadata: Metadata = {
  title: "Framework template preview (HIPAA draft)",
  robots: { index: false, follow: false },
};

export default function FrameworkPreviewPage() {
  if (process.env.VERCEL_ENV === "production") notFound();
  const hipaa = frameworks.find((f) => f.slug === "hipaa");
  if (!hipaa) notFound();
  return <FrameworkTemplate framework={hipaa} platforms={platforms} />;
}
