/**
 * Old-to-new routes (docs/website-transformation/05 §1). The single source for redirects
 * and "410 Gone" responses, applied in src/middleware.ts. Row numbers refer to 05.
 *
 * Before launch, every GONE entry must be checked against Search Console data (roadmap T1.06):
 * a URL with meaningful backlinks or traffic may move to REDIRECTS instead.
 */
// ".ts" extension so the unit tests can load this file with Node's built-in type stripping.
import { isFrameworkLive } from "./gating.ts";

/** Permanent redirects (301, decision I-03). Targets must exist on the site. */
export const REDIRECTS: Record<string, () => string> = {
  "/hire": () => "/contact", // 05#5
  "/pricing": () => "/our-approach#engagement-models", // 05#6
  "/faq": () => "/our-approach#faq", // 05#8
  "/locations": () => "/about", // 05#9
  "/work": () => "/about", // 05#11
  "/projects": () => "/about", // old duplicate of /work
  "/services/cloud-devops": () => "/services/devops", // 05#14
  "/services/security-quality": () => "/services/cloud-security", // 05#15
  // 05#16, #17: to the framework page when it is published, otherwise to the hub.
  "/services/fintech-software-development": () => (isFrameworkLive("pci-dss") ? "/compliance/pci-dss" : "/compliance"),
  "/services/healthcare-software-development": () => (isFrameworkLive("hipaa") ? "/compliance/hipaa" : "/compliance"),
  "/services/team-services": () => "/our-approach#engagement-models", // 05#18
  "/locations/software-agency-canada": () => "/about", // 05#38
  "/locations/software-agency-toronto": () => "/about", // 05#39
};

/** Retired pages: answered with 410 Gone and a short page of links. */
export const GONE = new Set<string>([
  // 05#19–28: services outside the new focus
  "/services/data-automation",
  "/services/microsoft-solutions",
  "/services/web-app-development",
  "/services/e-commerce",
  "/services/ecommerce-development",
  "/services/digital-marketing",
  "/services/emerging-tech",
  "/services/gaming",
  "/services/saas-development",
  "/services/startup-mvp-development",
  // 05#29–37: portfolio
  "/work/localised",
  "/work/boxo",
  "/work/stay-with-lumina",
  "/work/cashcloud",
  "/work/outreside",
  "/work/nice2stay",
  "/work/codly",
  "/work/alert-management",
  "/work/deeplawn",
  // 05#40–42: location landing pages
  "/locations/software-agency-united-states",
  "/locations/software-agency-united-kingdom",
  "/locations/software-agency-australia",
  // 05#65–74: posts outside the new focus
  ...retiredPostPaths(),
]);

/** Prefixes whose every sub-path is gone (old duplicates). */
export const GONE_PREFIXES = ["/projects/", "/work/"];

function retiredPostPaths() {
  return [
    "database-performance-optimisation",
    "redis-patterns-production",
    "postgres-vs-mongodb-choose-right",
    "building-ai-features-that-actually-work",
    "nextjs-15-app-router-production-lessons",
    "typescript-advanced-patterns-2025",
    "web-performance-core-web-vitals-2025",
    "graphql-vs-rest-2025",
    "how-to-scope-an-mvp-correctly",
    "react-native-vs-flutter-2025",
  ].map((slug) => `/blog/${slug}`);
}

/** Posts kept reachable but not indexed or listed (05#59–64, decision I-05). */
export const HIDDEN_POSTS = new Set([
  "why-senior-only-teams-ship-faster",
  "async-first-engineering-culture",
  "code-review-culture-that-ships",
  "hiring-senior-engineers-remotely",
  "milestone-billing-vs-hourly",
  "technical-debt-is-not-always-bad",
]);

export const isRetiredPost = (slug: string) => GONE.has(`/blog/${slug}`);
export const isHiddenPost = (slug: string) => HIDDEN_POSTS.has(slug);
/** Listed, indexed and in the sitemap. */
export const isListedPost = (slug: string) => !isRetiredPost(slug) && !isHiddenPost(slug);

export type RouteDecision = { type: "redirect"; to: string } | { type: "gone" } | { type: "keep" };

/** What happens to a path. Trailing slashes are ignored. */
export function decideRoute(pathname: string): RouteDecision {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const redirect = REDIRECTS[path];
  if (redirect) return { type: "redirect", to: redirect() };
  if (GONE.has(path) || GONE_PREFIXES.some((p) => path.startsWith(p))) return { type: "gone" };
  return { type: "keep" };
}
