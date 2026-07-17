"use client";

import Link from "next/link";
import { experienceCards } from "@/data/homepage";
import { subjectImages } from "@/lib/images";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const CARD_EMOJI: Record<string, string> = {
  "ravenna-mosaics": "🕍",
  bologna: "🏛️",
  "san-marino": "🏰",
  "post-cruise-venice": "🛶",
};

/**
 * "How would you like to experience Ravenna?" — the four homepage
 * experience paths (Ravenna mosaics, Bologna, San Marino, post-cruise Venice).
 */
export function ExperiencePaths() {
  return (
    <section id="choose" className="section-padding bg-white">
      <div className="container-wide">
        <p className="section-eyebrow">Choose your day</p>
        <h2 className="section-title mt-2 max-w-3xl">
          How would you like to experience Ravenna?
        </h2>
        <p className="section-subtitle">
          From Byzantine mosaics to Bologna&apos;s porticoes, San Marino&apos;s towers or a
          post-cruise finish in Venice — pick the experience that fits your call at Porto Corsini.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experienceCards.map((card) => {
            const image = subjectImages[card.imageKey] ?? subjectImages["historic-centre"];
            return (
              <Link
                key={card.slug}
                href={card.href}
                className="card-editorial group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ResponsiveImage
                    image={image}
                    role="card"
                    imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-coastal-900/75 via-coastal-900/15 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute left-4 top-4 text-2xl" aria-hidden="true">
                    {CARD_EMOJI[card.slug] ?? "🌄"}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                      {card.title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex-1 text-sm leading-relaxed text-gray-600">{card.description}</p>
                  <span className="mt-4 text-sm font-semibold tracking-wide text-maple-600 group-hover:text-maple-500">
                    {card.cta} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
