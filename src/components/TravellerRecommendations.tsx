import Link from "next/link";
import { travellerRecommendations } from "@/data/recommendations";
import { subjectImages } from "@/lib/images";
import { ResponsiveImage } from "@/components/ResponsiveImage";

/**
 * "What kind of traveller are you?" — grouped recommendation cards driven by
 * recommendations.ts, replacing any cramped comparison table on the homepage.
 */
export function TravellerRecommendations() {
  return (
    <section className="section-padding bg-coastal-50/60">
      <div className="container-wide">
        <p className="section-eyebrow">Find your fit</p>
        <h2 className="section-title mt-2 max-w-3xl">What kind of Ravenna traveller are you?</h2>
        <p className="section-subtitle">
          Six honest starting points, matched to how you plan to spend your hours ashore at Porto Corsini.
        </p>

        <div className="mt-10 space-y-10">
          {travellerRecommendations.map((group) => (
            <div key={group.id}>
              <h3 className="font-display text-lg font-bold text-gray-900">{group.label}</h3>
              <p className="mt-1 text-sm text-gray-600">{group.description}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {group.cards.map((card) => {
                  const image = card.imageKey ? subjectImages[card.imageKey] : undefined;
                  return (
                    <Link key={card.href} href={card.href} className="card-editorial group overflow-hidden">
                      {image && (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <ResponsiveImage
                            image={image}
                            role="card"
                            imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h4 className="font-display text-base font-bold text-gray-900 group-hover:text-coastal-800">
                          {card.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">{card.reason}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
