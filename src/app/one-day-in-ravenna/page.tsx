import { notFound } from "next/navigation";
import { guidePageMetadata } from "@/lib/seo";
import { GuideArticle } from "@/components/GuideArticle";
import { getExperienceBySlug } from "@/data/experiences";
import { resolveGuideRelatedLink } from "@/lib/related";

const SLUG = "one-day-in-ravenna";

export function generateMetadata() {
  const page = getExperienceBySlug(SLUG);
  if (!page) return {};
  return guidePageMetadata(page.hubPath, SLUG, page.seoTitle, page.metaDescription, page.imageKey);
}

export default function OneDayInRavennaPage() {
  const page = getExperienceBySlug(SLUG);
  if (!page) notFound();

  return <GuideArticle page={page} hubLabel="Ravenna Planning Guides" getRelatedPage={resolveGuideRelatedLink} />;
}
