import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { comparisons, getComparisonDisplayTitle } from "@/data/comparisons";
import { getComparisonImage } from "@/lib/images";
import { comparisonPath } from "@/lib/routes";

const path = "/compare";
const description =
  "Honest comparisons for Ravenna cruise passengers — Ravenna or Bologna, Ravenna or San Marino, independent or guided, and the best Ravenna shore excursions for different travellers.";

export const metadata = buildMetadata({
  title: "Compare Ravenna Cruise Options",
  description,
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Compare", path },
];

export default function CompareHubPage() {
  const image = getComparisonImage("ravenna-or-bologna-from-the-cruise-port");
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Compare Ravenna Cruise Options", description, path })]} />
      <PageHero
        title="Compare Ravenna Cruise Options"
        subtitle="Editorial comparisons to help you choose between Ravenna's mosaics, Bologna, San Marino and different touring styles."
        image={image}
        compact
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid gap-4 sm:grid-cols-2">
            {comparisons.map((c) => (
              <Link key={c.slug} href={comparisonPath(c.slug)} className="nav-card group">
                <h2 className="font-display text-lg font-bold text-gray-900 group-hover:text-coastal-800">
                  {getComparisonDisplayTitle(c)}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{c.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
