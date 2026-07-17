import type { RelatedGuideLink } from "@/components/GuideArticle";
import { getGuideBySlug } from "@/lib/guides";
import { getComparisonBySlug, getComparisonDisplayTitle } from "@/data/comparisons";
import { guidePath, comparisonPath } from "@/lib/routes";

/**
 * Resolves a relatedSlugs entry from a GuidePage (experience or highlight)
 * into a link, checking highlights, experiences and comparisons in turn —
 * some experience/comparison pages cross-reference each other by slug.
 */
export function resolveGuideRelatedLink(slug: string): RelatedGuideLink | undefined {
  const entry = getGuideBySlug(slug);
  if (entry) {
    if (entry.kind === "experience") {
      return { href: guidePath(entry.page.slug), title: entry.page.title, tagline: entry.page.tagline };
    }
    return { href: `/guides/${entry.page.slug}`, title: entry.page.attractionName, tagline: entry.page.tagline };
  }
  const comparison = getComparisonBySlug(slug);
  if (comparison) {
    return { href: comparisonPath(comparison.slug), title: getComparisonDisplayTitle(comparison), tagline: comparison.summary };
  }
  return undefined;
}
