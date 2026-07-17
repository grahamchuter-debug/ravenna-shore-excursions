import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShipScheduleHubView } from "@/components/ShipScheduleHubView";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { notFound } from "next/navigation";
import { getSchedulePortBySlug } from "@/data/schedules";
import { portHubPath } from "@/lib/schedule-utils";

const PORT_SLUG = "ravenna";
const path = portHubPath(PORT_SLUG);

export function generateMetadata() {
  const port = getSchedulePortBySlug(PORT_SLUG);
  if (!port) return {};
  return buildMetadata({ title: port.seoTitle, description: port.metaDescription, path });
}

export default function RavennaCruiseSchedulePage() {
  const port = getSchedulePortBySlug(PORT_SLUG);
  if (!port) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Ravenna Cruise Schedule", path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          webPageSchema({ title: port.seoTitle, description: port.intro, path }),
          ...(port.faqs ? [faqSchema(port.faqs)] : []),
        ]}
      />
      <PageHero title="Ravenna Cruise Ship Schedule" subtitle={port.description} compact />
      <section className="section-padding">
        <div className="container-wide max-w-5xl">
          <Breadcrumbs items={breadcrumbs} />
          <ShipScheduleHubView port={port} />
        </div>
      </section>
    </>
  );
}
