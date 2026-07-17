import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PhotoHeroBand } from "@/components/PhotoHeroBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { PlanningLinks } from "@/components/PlanningLinks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, articleSchema } from "@/lib/schema";
import { siteImages } from "@/lib/images";
import { portGuideContent, portGuideFaqs } from "@/data/port-guide";

const path = "/cruise-port-guide";
const image = siteImages.port;
const description =
  "The complete Porto Corsini cruise port guide for Ravenna — terminal location, transport to the city, mosaic priorities and return-to-ship timing.";

export const metadata = buildMetadata({
  title: "Porto Corsini Cruise Port Guide (Ravenna)",
  description,
  path,
  image: image.src,
  imageAlt: image.alt,
  keywords: ["Porto Corsini cruise port", "Ravenna cruise terminal", "Ravenna port to city centre", "Ravenna cruise port guide"],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Porto Corsini Cruise Port Guide", path },
];

export default function CruisePortGuidePage() {
  const { terminals, sections } = portGuideContent;

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(portGuideFaqs), articleSchema({ title: "Porto Corsini Cruise Port Guide", description, path, image: image.src })]} />
      <PhotoHeroBand
        image={image}
        eyebrow="Terminal guidance"
        title="Porto Corsini Cruise Port Guide"
        subtitle="Where ships dock, how far Ravenna really is, transport options and sensible return-to-ship planning for every call at Porto Corsini."
        compact
      />
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          <h2 className="section-title text-2xl mb-4">Porto Corsini at a glance</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-coastal-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Terminal</th>
                  <th className="px-4 py-3 text-left font-semibold">Location</th>
                  <th className="px-4 py-3 text-left font-semibold">Used by</th>
                  <th className="px-4 py-3 text-left font-semibold">Ravenna access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {terminals.map((t) => (
                  <tr key={t.name}>
                    <td className="px-4 py-3 font-medium text-gray-900">{t.name}</td>
                    <td className="px-4 py-3 text-gray-600">{t.quay}</td>
                    <td className="px-4 py-3 text-gray-600">{t.usedBy}</td>
                    <td className="px-4 py-3 text-gray-600">{t.cityAccess}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Check your cruise app the night before. Berths and shuttle arrangements can change, and Adriatic coastal traffic can affect returns from Bologna or San Marino excursions.
          </p>

          <div className="prose-body mt-4">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Link href="/ravenna-mosaics-guide" className="nav-card">
              <h3 className="font-display text-base font-bold text-gray-900">Mosaics guide</h3>
              <p className="mt-1 text-sm text-gray-600">Which basilicas and baptisteries to prioritise.</p>
            </Link>
            <Link href="/porto-corsini-cruise-terminal" className="nav-card">
              <h3 className="font-display text-base font-bold text-gray-900">Terminal guide</h3>
              <p className="mt-1 text-sm text-gray-600">Pickup zones, facilities and return planning.</p>
            </Link>
            <Link href="/ravenna-cruise-schedule" className="nav-card">
              <h3 className="font-display text-base font-bold text-gray-900">Ship schedule</h3>
              <p className="mt-1 text-sm text-gray-600">See who&apos;s in port before you book.</p>
            </Link>
          </div>

          <div className="mt-12">
            <FAQSection faqs={portGuideFaqs} title="Porto Corsini Cruise Port — FAQs" />
          </div>
          <div className="mt-12">
            <PlanningLinks />
          </div>
        </div>
      </section>
    </>
  );
}
