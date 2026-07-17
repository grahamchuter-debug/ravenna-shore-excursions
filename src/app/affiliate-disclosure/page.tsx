import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE, AFFILIATE_DISCLOSURE_SHORT } from "@/lib/site";

const path = "/affiliate-disclosure";
const description = `How ${SITE.name} discloses affiliate and partner booking links, including Shore Excursions Group commissions.`;

export const metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description,
  path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Affiliate Disclosure", path },
];

export default function AffiliateDisclosurePage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema({ title: "Affiliate Disclosure", description, path })]} />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="section-title mt-8">Affiliate Disclosure</h1>
          <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
            <p>{AFFILIATE_DISCLOSURE_SHORT}</p>
            <p>
              Shore excursions featured on {SITE.name} are currently booked through Shore Excursions Group, an
              independent tour operator. When you click through to a partner listing and complete a booking, we may
              earn a commission. This never affects the price you pay, and it does not influence which excursions we
              choose to cover or how we describe them.
            </p>
            <p>
              We do not invent tours or list products that are not genuinely live and bookable. Prices, availability
              and booking terms are set by the operator on their own listing page — always review those details
              before you book.
            </p>
            <p>
              Editorial content, comparisons and recommendations on this site reflect our own independent research
              and judgement, not paid placement. If a page contains a booking link, the commission relationship
              described above applies.
            </p>
            <p>Questions about this disclosure? Contact us at {SITE.email}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
