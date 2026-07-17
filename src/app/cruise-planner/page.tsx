import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { RavennaCruisePlanner } from "@/components/RavennaCruisePlanner";

const path = "/cruise-planner";
const description =
  "Build a personalised Ravenna cruise plan. Enter your port times, party size, interests, mobility, budget and travel style for tailored recommendations.";

export const metadata = buildMetadata({
  title: "Ravenna Cruise Planner — Porto Corsini Port Day Itinerary",
  description,
  path,
  keywords: ["Ravenna cruise planner", "Porto Corsini port day plan", "Ravenna cruise day itinerary"],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Ravenna Cruise Planner", path },
];

export default function CruisePlannerPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Ravenna Cruise Planner", description, path })]} />
      <PageHero
        title="Ravenna Cruise Planner"
        subtitle="Tell us your ship's hours ashore, who is travelling and what you enjoy — get editorial recommendations for Ravenna, Bologna, San Marino and post-cruise Venice."
        compact
      />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <RavennaCruisePlanner />
        </div>
      </section>
    </>
  );
}
