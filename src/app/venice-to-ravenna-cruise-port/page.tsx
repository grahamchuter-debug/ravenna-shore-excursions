import { notFound } from "next/navigation";
import { planningPageMetadata } from "@/lib/seo";
import { PlanningArticle } from "@/components/PlanningArticle";
import { getPlanningBySlug } from "@/data/planning";

const SLUG = "venice-to-ravenna-cruise-port";

export function generateMetadata() {
  const page = getPlanningBySlug(SLUG);
  if (!page) return {};
  return planningPageMetadata(SLUG, page.seoTitle, page.metaDescription, page.imageKey);
}

export default function VeniceToRavennaCruisePortPage() {
  const page = getPlanningBySlug(SLUG);
  if (!page) notFound();

  return <PlanningArticle page={page} />;
}
