import { comparisonPageMetadata } from "@/lib/seo";
import { ComparisonArticle } from "@/components/ComparisonArticle";
import { getComparisonBySlug, getAllComparisonSlugs } from "@/data/comparisons";
import { TOP_LEVEL_COMPARISON_SLUGS } from "@/lib/routes";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  // Slugs promoted to top-level routes (see lib/routes.ts) are excluded here
  // to avoid duplicate content at two URLs.
  return getAllComparisonSlugs()
    .filter((slug) => !TOP_LEVEL_COMPARISON_SLUGS.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) return {};
  return comparisonPageMetadata(slug, c.seoTitle, c.metaDescription);
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  if (!comp) notFound();

  return <ComparisonArticle comp={comp} path={`/compare/${slug}`} />;
}
