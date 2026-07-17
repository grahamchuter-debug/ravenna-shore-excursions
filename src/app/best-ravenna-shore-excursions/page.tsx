import { notFound } from "next/navigation";
import { comparisonPageMetadata } from "@/lib/seo";
import { ComparisonArticle } from "@/components/ComparisonArticle";
import { EditorsCollection } from "@/components/EditorsCollection";
import { getComparisonBySlug } from "@/data/comparisons";

const SLUG = "best-ravenna-shore-excursions";

export function generateMetadata() {
  const comp = getComparisonBySlug(SLUG);
  if (!comp) return {};
  return comparisonPageMetadata(SLUG, comp.seoTitle, comp.metaDescription);
}

export default function BestRavennaShoreExcursionsPage() {
  const comp = getComparisonBySlug(SLUG);
  if (!comp) notFound();

  return (
    <>
      <ComparisonArticle comp={comp} path={`/${SLUG}`} />
      <EditorsCollection />
    </>
  );
}
