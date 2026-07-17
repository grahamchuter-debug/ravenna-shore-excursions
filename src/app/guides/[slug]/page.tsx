import { notFound } from "next/navigation";
import { highlightPageMetadata, guidePageMetadata } from "@/lib/seo";
import { HighlightArticle } from "@/components/HighlightArticle";
import { GuideArticle } from "@/components/GuideArticle";
import { getGuideBySlug, getAllGuideSlugs } from "@/lib/guides";
import { TOP_LEVEL_GUIDE_SLUGS } from "@/lib/routes";
import { resolveGuideRelatedLink } from "@/lib/related";

export function generateStaticParams() {
  // Slugs promoted to top-level routes (see lib/routes.ts) are excluded here
  // to avoid duplicate content at two URLs.
  return getAllGuideSlugs()
    .filter((slug) => !TOP_LEVEL_GUIDE_SLUGS.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getGuideBySlug(slug);
  if (!entry) return {};
  if (entry.kind === "highlight") {
    return highlightPageMetadata(slug, entry.page.seoTitle, entry.page.metaDescription);
  }
  return guidePageMetadata(
    entry.page.hubPath,
    slug,
    entry.page.seoTitle,
    entry.page.metaDescription,
    entry.page.imageKey,
  );
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getGuideBySlug(slug);
  if (!entry) notFound();

  if (entry.kind === "highlight") {
    return <HighlightArticle page={entry.page} />;
  }

  return (
    <GuideArticle
      page={entry.page}
      hubLabel="Ravenna Planning Guides"
      getRelatedPage={resolveGuideRelatedLink}
    />
  );
}
