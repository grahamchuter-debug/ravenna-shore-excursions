import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { excursions } from "@/data/excursions";
import { getExcursionImage, excursionsHubImage } from "@/lib/images";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const path = "/shore-excursions";
const description =
  "Live shore excursions from Ravenna's Porto Corsini cruise port — post-cruise Venice, Bologna and private San Marino, with cruise-aware timing and honest suitability notes.";

export const metadata = buildMetadata({
  title: "Shore Excursions from Porto Corsini",
  description,
  path,
  image: excursionsHubImage.src,
  imageAlt: excursionsHubImage.alt,
  keywords: [
    "Ravenna shore excursions",
    "Porto Corsini shore excursions",
    "Bologna from Ravenna cruise",
    "San Marino shore excursion",
    "post-cruise Venice transfer",
  ],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Shore Excursions", path },
];

export default function ShoreExcursionsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          webPageSchema({
            title: "Ravenna Shore Excursions",
            description,
            path,
          }),
        ]}
      />
      <PageHero
        image={excursionsHubImage}
        title="Ravenna Shore Excursions"
        subtitle="Live partner excursions from Porto Corsini — Bologna's porticoes, private San Marino towers and a post-cruise transfer to Venice — with reliable timing notes for cruise passengers."
        compact
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mt-6 text-gray-600">
            Not sure which is right for your call? Start with{" "}
            <Link href="/best-ravenna-shore-excursions" className="font-semibold text-coastal-700 hover:underline">
              Best Ravenna shore excursions
            </Link>{" "}
            or compare{" "}
            <Link href="/ravenna-or-bologna-from-the-cruise-port" className="font-semibold text-coastal-700 hover:underline">
              Ravenna vs Bologna
            </Link>
            .
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {excursions.map((e) => {
              const image = getExcursionImage(e.slug);
              return (
                <Link key={e.slug} href={`/shore-excursions/${e.slug}`} className="card-editorial group overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <ResponsiveImage
                      image={image}
                      role="card"
                      imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-coastal-900/55 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    {e.badge && <span className="absolute left-3 top-3 pill bg-white/90">{e.badge}</span>}
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">
                      {e.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">{e.tagline}</p>
                    <p className="mt-3 text-xs font-medium text-coastal-700">
                      {e.duration} · {e.pace}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
