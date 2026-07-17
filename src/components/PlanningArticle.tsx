import Link from "next/link";
import type { PlanningPage } from "@/data/types";
import { PhotoHeroBand } from "@/components/PhotoHeroBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, articleSchema } from "@/lib/schema";
import { subjectImages } from "@/lib/images";
import { planningPath } from "@/lib/routes";
import { getPlanningBySlug } from "@/data/planning";
import { getExcursionBySlug } from "@/data/excursions";

interface RelatedLink {
  href: string;
  title: string;
  tagline: string;
}

function resolveRelatedLink(slug: string): RelatedLink | undefined {
  const planning = getPlanningBySlug(slug);
  if (planning) {
    return { href: planningPath(planning.slug), title: planning.title, tagline: planning.tagline };
  }
  const excursion = getExcursionBySlug(slug);
  if (excursion) {
    return { href: `/shore-excursions/${excursion.slug}`, title: excursion.title, tagline: excursion.tagline };
  }
  return undefined;
}

interface PlanningArticleProps {
  page: PlanningPage;
}

export function PlanningArticle({ page }: PlanningArticleProps) {
  const path = planningPath(page.slug);
  const image = subjectImages[page.imageKey] ?? subjectImages["cruise-port"];
  const related = page.relatedSlugs.map(resolveRelatedLink).filter(Boolean) as RelatedLink[];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Cruise Planning", path: "/ravenna-cruise-port" },
    { name: page.title, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(page.faqs),
          articleSchema({ title: page.seoTitle, description: page.metaDescription, path, image: image.src }),
        ]}
      />
      <PhotoHeroBand image={image} eyebrow="Cruise Planning" title={page.title} subtitle={page.tagline} compact />
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />
          <p className="text-lg leading-relaxed text-gray-700">{page.overview}</p>
          <div className="prose-body">
            {page.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {page.sections && page.sections.length > 0 && (
            <div className="mt-8 space-y-8">
              {page.sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="font-display text-xl font-bold text-gray-900">{s.heading}</h2>
                  <div className="prose-body mt-2">
                    {s.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {page.tips.length > 0 && (
            <div className="mt-10 card-feature">
              <h2 className="font-display text-xl font-bold text-gray-900">Tips for cruise passengers</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                {page.tips.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="section-title text-2xl mb-6">Related planning</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.href} href={r.href} className="nav-card">
                    <h3 className="font-display text-base font-bold text-gray-900">{r.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{r.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {page.faqs.length > 0 && (
            <div className="mt-12">
              <FAQSection faqs={page.faqs} title={`${page.title} — FAQs`} />
            </div>
          )}

          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
