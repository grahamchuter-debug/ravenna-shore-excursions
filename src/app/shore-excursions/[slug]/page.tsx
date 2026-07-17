import Link from "next/link";
import { notFound } from "next/navigation";
import { excursionPageMetadata } from "@/lib/seo";
import { PhotoHeroBand } from "@/components/PhotoHeroBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, articleSchema } from "@/lib/schema";
import { getExcursionBySlug, getAllExcursionSlugs, excursions } from "@/data/excursions";
import { getExcursionImage } from "@/lib/images";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { AFFILIATE_DISCLOSURE_SHORT } from "@/lib/site";

export function generateStaticParams() {
  return getAllExcursionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getExcursionBySlug(slug);
  if (!e) return {};
  return excursionPageMetadata(slug, e.seoTitle, e.metaDescription);
}

export default async function ExcursionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getExcursionBySlug(slug);
  if (!e) notFound();
  const image = getExcursionImage(slug);
  const related = e.relatedExcursionSlugs.map((s) => excursions.find((x) => x.slug === s)).filter(Boolean);
  const bookingUrl = e.supplier?.url;
  const ctaLabel = e.suitabilityNote ? "See Dates & Prices" : "Check Availability";

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Shore Excursions", path: "/shore-excursions" },
    { name: e.title, path: `/shore-excursions/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(e.faqs),
          articleSchema({ title: e.seoTitle, description: e.metaDescription, path: `/shore-excursions/${slug}`, image: image.src }),
        ]}
      />
      <PhotoHeroBand image={image} eyebrow={e.category} title={e.title} subtitle={e.tagline} compact>
        {e.badge && (
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ring-1 ring-white/40">
            {e.badge}
          </span>
        )}
      </PhotoHeroBand>

      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mb-8 flex flex-wrap gap-2">
            <span className="pill">Duration: {e.duration}</span>
            <span className="pill">Pace: {e.pace}</span>
            <span className="pill">Best for: {e.bestFor}</span>
          </div>

          {e.suitabilityNote && (
            <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-950">Suitability</p>
              <p className="mt-1 text-sm text-amber-900">{e.suitabilityNote}</p>
            </div>
          )}

          <p className="text-lg leading-relaxed text-gray-700">{e.overview}</p>

          <div className="prose-body">
            {e.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {e.whyChoose && e.whyChoose.length > 0 && (
            <div className="mt-8 card-accent">
              <h2 className="font-display text-xl font-bold text-gray-900">Why passengers choose this excursion</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                {e.whyChoose.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="card-feature">
              <h2 className="font-display text-xl font-bold text-gray-900">Highlights</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <div className="card-feature">
              <h2 className="font-display text-xl font-bold text-gray-900">What a good tour includes</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                {e.included.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 card-accent">
            <h2 className="font-display text-xl font-bold text-gray-900">Getting there from the cruise port</h2>
            <p className="mt-3 text-gray-700">{e.portLogistics}</p>
          </div>

          <div className="mt-8">
            <h2 className="section-title text-2xl mb-4">Tips for cruise passengers</h2>
            <ul className="list-disc space-y-2 pl-5 text-gray-700">
              {e.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="mt-10 rounded-2xl border border-coastal-100 bg-coastal-50/60 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-gray-900">Book this excursion</h2>
            <p className="mt-2 text-sm text-gray-600">
              Prices, exact departure times and availability are set by the operator and change by date — check the
              live listing rather than relying on a figure here.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {bookingUrl ? (
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer sponsored" className="btn-primary">
                  {ctaLabel}
                </a>
              ) : (
                <Link href="/enquire" className="btn-primary">
                  Enquire about this excursion
                </Link>
              )}
              <Link href="/cruise-planner" className="btn-secondary">
                Build my cruise plan
              </Link>
            </div>
            {bookingUrl && (
              <p className="mt-4 text-xs text-gray-500">{AFFILIATE_DISCLOSURE_SHORT}</p>
            )}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link href="/cruise-port-guide" className="nav-card">
              <h3 className="font-display text-base font-bold text-gray-900">Porto Corsini Port Guide</h3>
              <p className="mt-1 text-sm text-gray-600">Terminal distance, transfers and return-to-ship timing.</p>
            </Link>
            <Link href="/ravenna-cruise-schedule" className="nav-card">
              <h3 className="font-display text-base font-bold text-gray-900">Ship Schedule</h3>
              <p className="mt-1 text-sm text-gray-600">Check who else is in port before you book.</p>
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="section-title text-2xl mb-6">Related excursions</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {related.map(
                  (r) =>
                    r && (
                      <Link key={r.slug} href={`/shore-excursions/${r.slug}`} className="card-editorial group overflow-hidden">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <ResponsiveImage
                            image={getExcursionImage(r.slug)}
                            role="card"
                            imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-base font-bold text-gray-900 group-hover:text-coastal-800">{r.title}</h3>
                          <p className="mt-1 text-sm text-gray-600">{r.tagline}</p>
                        </div>
                      </Link>
                    ),
                )}
              </div>
            </div>
          )}

          <div className="mt-12">
            <FAQSection faqs={e.faqs} title={`${e.title} — FAQs`} />
          </div>

          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
