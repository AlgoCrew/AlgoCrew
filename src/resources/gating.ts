/**
 * Single source of truth for what is allowed to appear on the public site.
 *
 * Gating is data, not code (docs/website-transformation/09 §5). A page, menu link,
 * footer link, cross-link and sitemap entry all ask the helpers in this file, so an
 * unverified platform or framework cannot leak anywhere by accident.
 *
 * Verification items (V-xx) are defined in docs/website-transformation/07 §11.
 * Everything defaults to "not verified": flip a flag only when the business has
 * confirmed the item in writing.
 */

export type PlatformId = "azure" | "aws" | "google-cloud";
export type FrameworkId = "hipaa" | "gdpr" | "pci-dss" | "pipeda";

/** V-03: confirmed delivery experience on the platform. */
export const platformVerified: Record<PlatformId, boolean> = {
  azure: false,
  aws: false,
  "google-cloud": false,
};

/** V-03 (delivery experience) and legal review of the page (07 §6.6). Both are required. */
export const frameworkVerified: Record<FrameworkId, { delivery: boolean; legalReviewed: boolean }> = {
  hipaa: { delivery: false, legalReviewed: false },
  gdpr: { delivery: false, legalReviewed: false },
  "pci-dss": { delivery: false, legalReviewed: false },
  pipeda: { delivery: false, legalReviewed: false },
};

/** A page that exists in the data but is not ready to publish. */
export type PageStatus = "live" | "draft" | "later";

export const isPlatformLive = (id: PlatformId): boolean => platformVerified[id];

export const isFrameworkLive = (id: FrameworkId): boolean =>
  frameworkVerified[id].delivery && frameworkVerified[id].legalReviewed;

export const isStatusLive = (status: PageStatus): boolean => status === "live";

/** Keep only the ids that are live, preserving order. */
export const livePlatformIds = (ids: readonly PlatformId[]): PlatformId[] => ids.filter(isPlatformLive);
export const liveFrameworkIds = (ids: readonly FrameworkId[]): FrameworkId[] => ids.filter(isFrameworkLive);

/** "A", "A and B", "A, B and C". Used wherever copy names the verified platforms or frameworks. */
export const sentenceList = (names: readonly string[]): string =>
  names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
