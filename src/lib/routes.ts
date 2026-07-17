import { schedulePorts, getScheduleEntries } from "@/data/schedules";

export function hasShipSchedule(slug: string): boolean {
  return schedulePorts.some((p) => p.slug === slug);
}

export function hasVerifiedScheduleData(slug: string): boolean {
  return hasShipSchedule(slug) && getScheduleEntries(slug).length > 0;
}

/**
 * Canonical top-level URL map — some editorial, comparison and planning
 * pages are promoted to flat top-level routes for stronger SEO targeting
 * instead of living under /guides, /compare or /planning. Anything not
 * listed here keeps its nested path via the dynamic catch-all routes.
 */
export const TOP_LEVEL_GUIDE_SLUGS = new Set([
  "things-to-do-in-ravenna-from-a-cruise",
  "ravenna-mosaics-guide",
  "one-day-in-ravenna",
]);

/** Comparison/editorial roundups promoted to top-level routes. */
export const TOP_LEVEL_COMPARISON_SLUGS = new Set([
  "ravenna-or-bologna-from-the-cruise-port",
  "ravenna-or-san-marino-from-the-cruise-port",
  "best-ravenna-shore-excursions",
]);

export const TOP_LEVEL_PLANNING_SLUGS = new Set([
  "getting-to-ravenna-cruise-port",
  "porto-corsini-cruise-terminal",
  "ravenna-to-venice",
  "venice-to-ravenna-cruise-port",
  "bologna-to-ravenna-cruise-port",
  "ravenna-cruise-hotels",
]);

export function guidePath(slug: string): string {
  return TOP_LEVEL_GUIDE_SLUGS.has(slug) ? `/${slug}` : `/guides/${slug}`;
}

export function comparisonPath(slug: string): string {
  return TOP_LEVEL_COMPARISON_SLUGS.has(slug) ? `/${slug}` : `/compare/${slug}`;
}

export function planningPath(slug: string): string {
  return TOP_LEVEL_PLANNING_SLUGS.has(slug) ? `/${slug}` : `/planning/${slug}`;
}
