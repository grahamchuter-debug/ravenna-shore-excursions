import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { planningPages } from "@/data/planning";
import { planningHubImage } from "@/lib/images";
import { planningPath } from "@/lib/routes";
import { RavennaPlanningLinks } from "@/components/RavennaPlanningLinks";

const path = "/ravenna-cruise-port";
const description =
  "Everything cruise passengers need for Ravenna's Porto Corsini terminal — getting there, hotels, ship schedule and onward travel to or from Venice and Bologna.";

export const metadata = buildMetadata({
  title: "Ravenna Cruise Port — Planning Hub",
  description,
  path,
  keywords: ["Ravenna cruise port", "Porto Corsini", "Ravenna cruise planning"],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Cruise Planning", path },
];

export default function RavennaCruisePortPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Ravenna Cruise Port — Planning Hub", description, path })]} />
      <PageHero
        title="Ravenna Cruise Port — Planning Hub"
        subtitle="Ships berth at Porto Corsini, about 15km from Ravenna's mosaic centre. Start here for terminal, transport, hotel and schedule planning."
        image={planningHubImage}
        compact
      />
      <section className="section-padding">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/cruise-port-guide" className="nav-card">
              <h3 className="font-display text-base font-bold text-gray-900">Porto Corsini Port Guide</h3>
              <p className="mt-1 text-sm text-gray-600">Terminal location, transport and mosaic-day planning.</p>
            </Link>
            <Link href="/ravenna-cruise-schedule" className="nav-card">
              <h3 className="font-display text-base font-bold text-gray-900">Ship Schedule</h3>
              <p className="mt-1 text-sm text-gray-600">Which ships call at Porto Corsini and when.</p>
            </Link>
            {planningPages.map((p) => (
              <Link key={p.slug} href={planningPath(p.slug)} className="nav-card">
                <h3 className="font-display text-base font-bold text-gray-900">{p.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <RavennaPlanningLinks />
    </>
  );
}
