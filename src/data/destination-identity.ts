/**
 * World 2.0 destination identity — Ravenna.
 * Pattern: DESTINATION / SHORE EXCURSIONS / STRAPLINE
 */
export type LogoConcept = "mosaic-arch" | "anchor-arch" | "harbour-m";
export type LogoVariant = "full" | "compact" | "mark";
export type LogoTone = "default" | "on-dark";

export const destinationIdentity = {
  destination: "Ravenna",
  descriptor: "Shore Excursions",
  /** Displayed as tracked uppercase in the wordmark. */
  strapline: "Porto Corsini & Beyond",
  accessibleName: "Ravenna Shore Excursions",
  accent: "mosaic-gold" as const,
  /**
   * Mosaic arch — Byzantine-inspired arch silhouette with a subtle cruise
   * anchor. Distinctive without looking like a beach brand.
   */
  logoConcept: "mosaic-arch" as LogoConcept,
  iconStyle: "mosaic-arch" as const,
} as const;
