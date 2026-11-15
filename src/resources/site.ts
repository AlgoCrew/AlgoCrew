/**
 * Verified company facts (docs/website-transformation/07 §11).
 *
 * Every value here must be confirmed by the business before it is filled in.
 * A missing value renders nothing: components must never show a placeholder
 * or fall back to the unverified values scattered through the legacy content.
 */

export type ClientLogo = { name: string; src: string; width: number; height: number };

export const site = {
  brand: "AlgoCrew",
  /** V-06: legal entity name ("Inc." vs "Ltd." is unresolved). */
  legalName: undefined as string | undefined,
  /** V-07: governing law for the terms and the engagement FAQ. */
  governingLaw: undefined as string | undefined,
  /** V-08 */
  foundingYear: undefined as number | undefined,
  /** V-10: one public enquiry address, phone, city, booking link. */
  email: undefined as string | undefined,
  phone: undefined as string | undefined,
  city: undefined as string | undefined,
  bookingUrl: undefined as string | undefined,
  /** V-10: only if the business commits to one. */
  responseTime: undefined as string | undefined,
  /** V-11: only profiles the business confirms it owns. */
  social: {} as Partial<Record<"linkedin" | "github" | "x", string>>,
  /**
   * V-02: logos with written permission. Shown on /about only (07 §7, amended),
   * and only when there are at least three.
   */
  clientLogos: [] as ClientLogo[],
  /** V-14: /trust is published only when our own security practices are verified. */
  trustPageVerified: false,
} as const;

/** 07 §7: fewer than three approved logos means no logo row at all. */
export const MIN_CLIENT_LOGOS = 3;
export const showClientLogos = (): boolean => site.clientLogos.length >= MIN_CLIENT_LOGOS;
