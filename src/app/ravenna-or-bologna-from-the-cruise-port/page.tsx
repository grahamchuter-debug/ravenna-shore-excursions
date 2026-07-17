import { notFound } from "next/navigation";
import { comparisonPageMetadata } from "@/lib/seo";
import { ComparisonArticle } from "@/components/ComparisonArticle";
import { getComparisonBySlug } from "@/data/comparisons";

const SLUG = "ravenna-or-bologna-from-the-cruise-port";

export function generateMetadata() {
  const comp = getComparisonBySlug(SLUG);
  if (!comp) return {};
  return comparisonPageMetadata(SLUG, comp.seoTitle, comp.metaDescription);
}

export default function RavennaOrBolognaPage() {
  const comp = getComparisonBySlug(SLUG);
  if (!comp) notFound();

  return <ComparisonArticle comp={comp} path={`/${SLUG}`} />;
}
