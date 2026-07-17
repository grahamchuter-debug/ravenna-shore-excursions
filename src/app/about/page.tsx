import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const path = "/about";

export const metadata = buildMetadata({
  title: `About ${SITE.name}`,
  description:
    `About ${SITE.name} — an independent Ravenna cruise planning resource for passengers arriving at Porto Corsini.`,
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About", path },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: `About ${SITE.name}`, description: `About ${SITE.name}.`, path })]} />
      <PageHero title={`About ${SITE.name}`} subtitle="An independent planning resource built for cruise passengers — your gateway to Ravenna's mosaics, Bologna, San Marino and post-cruise Venice from Porto Corsini." compact />
      <section className="section-padding">
        <div className="container-wide max-w-3xl prose prose-gray">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
            <p>
              {SITE.name} is an independent planning resource for cruise passengers calling at Ravenna. Whether you have one day ashore or want to understand Bologna, San Marino, post-cruise Venice and the mosaic city itself before you sail, our goal is to help you choose the best version of your Ravenna day — not just browse a catalogue of tours.
            </p>
            <p>
              We focus on the practical decisions that shape a good Ravenna cruise day: Ravenna or Bologna, whether independent exploring suits your hours, when a private or small-group tour beats a large coach, and how to build a realistic return-to-ship buffer from Porto Corsini.
            </p>
            <p>
              Our guides are written for real cruise timings, not generic tourism. We highlight honest editorial comparisons and recommendations for different traveller types, and we list only live partner excursions — never invented tours. Ship schedules and transfer times are indicative — always confirm all-aboard times with your cruise line.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
