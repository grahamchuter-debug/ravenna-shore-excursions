import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ExperiencePaths } from "@/components/ExperiencePaths";
import { SpiritOfRavenna } from "@/components/SpiritOfRavenna";
import { HonestAdvice } from "@/components/HonestAdvice";
import { TravellerRecommendations } from "@/components/TravellerRecommendations";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, travelGuideSchema } from "@/lib/schema";
import {
  coreSections,
  getHomepageFaqs,
  homepageTagline,
  homepageTrustLine,
  passengerSnapshot,
  embarkationSection,
  finalCta,
} from "@/data/homepage";
import { getFeaturedExcursions } from "@/data/excursions";
import { siteImages, getExcursionImage } from "@/lib/images";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { PreloadImage } from "@/components/PreloadImage";
import { CruiseHeroTrust } from "@/components/CruiseHeroTrust";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Ravenna Shore Excursions | Porto Corsini Cruise Tours",
  description: SITE.description,
  path: "/",
  keywords: [
    "Ravenna shore excursions",
    "Ravenna cruise port",
    "Porto Corsini shore excursions",
    "Ravenna mosaics cruise",
    "Bologna from Ravenna cruise",
    "San Marino shore excursion",
  ],
});

export default function HomePage() {
  const faqs = getHomepageFaqs();
  const featured = getFeaturedExcursions().slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(faqs),
          travelGuideSchema({
            title: SITE.name,
            description: SITE.description,
            path: "/",
          }),
        ]}
      />

      <PreloadImage base={siteImages.hero.base} role="hero" />

      {/* 1. Hero */}
      <section className="home-hero">
        <ResponsiveImage
          image={siteImages.hero}
          role="hero"
          priority
          className="absolute inset-0 block h-full w-full"
          imgClassName="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-2 text-coastal-100 animate-fade-up">Ravenna Shore Excursions</p>
          <h1 className="home-hero-heading animate-fade-up-delay">{homepageTagline}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg animate-fade-up-delay">
            Ships call at Porto Corsini, about 30 minutes from Ravenna&apos;s Byzantine mosaics. We help you
            choose the right day — Ravenna, Bologna, San Marino or a post-cruise finish in Venice.
          </p>

          <CruiseHeroTrust />

          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
            <Link href="/shore-excursions" className="btn-accent">
              Explore Ravenna Excursions
            </Link>
            <Link
              href="/ravenna-cruise-schedule"
              className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              View Your Ship Schedule
            </Link>
            <Link
              href="/getting-to-ravenna-cruise-port"
              className="btn-secondary bg-transparent text-white/85 border-white/20 hover:bg-white/10"
            >
              Planning a cruise from Ravenna?
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80 animate-fade-up-delay-2">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true">✨</span> Independent excursions
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true">🧑‍🤝‍🧑</span> Smaller-group options
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true">🗺️</span> Cruise-port planning
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true">🔒</span> Secure booking
            </span>
          </div>
        </div>
      </section>

      {/* 4. Experience paths */}
      <ExperiencePaths />

      {/* 5. Featured excursions */}
      <section className="section-padding bg-coastal-900 text-white">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="section-eyebrow text-coastal-200">Live partner products</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Featured shore excursions</h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              Three live excursions from Porto Corsini — nothing invented, nothing padded to fill a catalogue.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((e) => {
              const image = getExcursionImage(e.slug);
              return (
                <Link
                  key={e.slug}
                  href={`/shore-excursions/${e.slug}`}
                  className="card-editorial group overflow-hidden bg-white/5 border-white/10 hover:bg-white/10"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <ResponsiveImage
                      image={image}
                      role="card"
                      imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-coastal-900/80 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    {e.badge && <span className="absolute left-3 top-3 badge-editors-choice">{e.badge}</span>}
                  </div>
                  <div className="p-6 text-white">
                    <h3 className="font-display text-lg font-bold group-hover:text-maple-300">{e.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{e.tagline}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-maple-300">Discover more →</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-8">
            <Link href="/shore-excursions" className="btn-accent">
              All Shore Excursions
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Cruise passenger snapshot */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <p className="section-eyebrow">{passengerSnapshot.eyebrow}</p>
          <h2 className="section-title mt-2 max-w-2xl">{passengerSnapshot.title}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {passengerSnapshot.items.map((item) => (
              <div key={item.label} className="card-feature">
                <p className="text-xs font-semibold uppercase tracking-wide text-coastal-600">{item.label}</p>
                <p className="mt-2 font-display text-lg font-bold text-gray-900">{item.value}</p>
                <p className="mt-2 text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why passengers choose */}
      <HonestAdvice />

      {/* 8. Spirit of Ravenna */}
      <SpiritOfRavenna />

      {/* 9. Port & transport overview teaser */}
      <section className="section-padding bg-white border-t border-coastal-100">
        <div className="container-wide max-w-4xl">
          <div className="card-accent">
            <p className="section-eyebrow">Terminal reality</p>
            <h2 className="section-title mt-2">Porto Corsini is not Ravenna</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Ships berth at Porto Corsini on the Adriatic coast — about 15 km / 30 minutes from Ravenna&apos;s
              mosaic monuments. Our port guide covers terminal layout, taxis, buses and realistic return-to-ship
              timing before you book anything.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/cruise-port-guide" className="btn-secondary text-sm">
                Read the port guide
              </Link>
              <Link href="/porto-corsini-cruise-terminal" className="btn-secondary text-sm">
                Terminal guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Cruise schedule preview */}
      <section className="section-padding bg-coastal-900 text-white">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">See which ships call at Ravenna</h2>
          <p className="mt-4 text-white/85">
            Check sample Porto Corsini ship calls for 2026–2027 before you book Bologna, San Marino or a mosaic
            day. Times are indicative — always confirm your own port call with your cruise line.
          </p>
          <Link href="/ravenna-cruise-schedule" className="btn-accent mt-8 inline-flex">
            View Ravenna ship schedule
          </Link>
        </div>
      </section>

      {/* 11. Embarkation / turnaround */}
      <section id="embarkation" className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <p className="section-eyebrow">Turnaround days</p>
          <h2 className="section-title mt-2">Starting or finishing your cruise in Ravenna?</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">{embarkationSection.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={embarkationSection.cta.href} className="btn-primary text-sm">
              {embarkationSection.cta.label}
            </Link>
            <Link href="/getting-to-ravenna-cruise-port" className="btn-secondary text-sm">
              Getting to Porto Corsini
            </Link>
            <Link href="/venice-to-ravenna-cruise-port" className="btn-secondary text-sm">
              Venice to Ravenna
            </Link>
            <Link href="/ravenna-cruise-hotels" className="btn-secondary text-sm">
              Where to stay
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Recommendation framework */}
      <TravellerRecommendations />

      {/* 13. FAQs */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <FAQSection faqs={faqs} title="Ravenna Cruise — FAQs" />
        </div>
      </section>

      {/* 14. Final CTA */}
      <section className="section-padding bg-coastal-50 border-t border-coastal-100">
        <div className="container-wide max-w-3xl text-center">
          <p className="section-eyebrow">Ready when you are</p>
          <h2 className="section-title mt-2">{finalCta.title}</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">{finalCta.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={finalCta.primary.href} className="btn-primary">
              {finalCta.primary.label}
            </Link>
            <Link href={finalCta.secondary.href} className="btn-secondary">
              {finalCta.secondary.label}
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-600 max-w-2xl mx-auto">{homepageTrustLine}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-gray-600">
            {coreSections.slice(0, 4).map((s) => (
              <Link key={s.slug} href={s.href} className="pill hover:bg-coastal-100">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
