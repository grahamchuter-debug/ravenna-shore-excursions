import type { TravellerRecommendation } from "./types";

/** Traveller-type → best-fit cards for the comparison / recommendation section. */
export const travellerRecommendations: TravellerRecommendation[] = [
  {
    id: "first-time",
    label: "First-time visitor",
    description: "You want one clear answer for a maiden call at Porto Corsini.",
    cards: [
      {
        title: "Things to do in Ravenna from a cruise",
        href: "/things-to-do-in-ravenna-from-a-cruise",
        reason: "Honest transfer time plus a mosaic-first route for newcomers.",
        imageKey: "historic",
      },
      {
        title: "Best Ravenna shore excursions",
        href: "/best-ravenna-shore-excursions",
        reason: "Compare the three live partner products without catalogue noise.",
        imageKey: "compare",
      },
      {
        title: "Ravenna or Bologna?",
        href: "/ravenna-or-bologna-from-the-cruise-port",
        reason: "Decide between mosaics and porticoed city culture.",
        imageKey: "walking",
      },
    ],
  },
  {
    id: "culture",
    label: "Culture & history lover",
    description: "Monuments matter more than beach time or shopping.",
    cards: [
      {
        title: "Ravenna mosaics guide",
        href: "/ravenna-mosaics-guide",
        reason: "Which UNESCO interiors to prioritise when tickets are limited.",
        imageKey: "historic",
      },
      {
        title: "Bologna from Porto Corsini",
        href: "/shore-excursions/bologna-from-porto-corsini",
        reason: "San Luca and medieval Bologna when Ravenna feels familiar.",
        imageKey: "walking",
      },
      {
        title: "One day in Ravenna",
        href: "/one-day-in-ravenna",
        reason: "Tight sequencing for a mosaic-heavy city day.",
        imageKey: "historic",
      },
    ],
  },
  {
    id: "post-cruise",
    label: "Disembarking passenger",
    description: "Your cruise ends at Ravenna and you need onward travel.",
    cards: [
      {
        title: "Post-cruise Venice from Ravenna",
        href: "/shore-excursions/post-cruise-ravenna-to-venice",
        reason: "One-way guided transfer ending at Piazzale Roma with luggage.",
        imageKey: "coast",
      },
      {
        title: "Ravenna to Venice planning",
        href: "/ravenna-to-venice",
        reason: "Independent transfer options if you prefer to self-book.",
        imageKey: "coast",
      },
      {
        title: "Venice to Ravenna cruise port",
        href: "/venice-to-ravenna-cruise-port",
        reason: "Arriving Venice before embarkation — road and rail context.",
        imageKey: "cruise-port",
      },
    ],
  },
  {
    id: "private",
    label: "Private / small-group traveller",
    description: "You dislike large coaches and want pacing control.",
    cards: [
      {
        title: "Private San Marino",
        href: "/shore-excursions/private-san-marino-from-ravenna",
        reason: "The live private product with tastings and tower walks.",
        imageKey: "photography",
      },
      {
        title: "Ravenna or San Marino?",
        href: "/ravenna-or-san-marino-from-the-cruise-port",
        reason: "Flat mosaics versus hilltop micro-state — candid trade-offs.",
        imageKey: "compare",
      },
      {
        title: "Bologna day trip",
        href: "/shore-excursions/bologna-from-porto-corsini",
        reason: "Small-group city escape when San Marino feels too hilly.",
        imageKey: "walking",
      },
    ],
  },
  {
    id: "independent",
    label: "Independent explorer",
    description: "You will arrange taxis or buses yourself.",
    cards: [
      {
        title: "Getting to Ravenna cruise port",
        href: "/getting-to-ravenna-cruise-port",
        reason: "Airports, trains and road approach to Porto Corsini.",
        imageKey: "cruise-port",
      },
      {
        title: "Porto Corsini cruise terminal",
        href: "/porto-corsini-cruise-terminal",
        reason: "Terminal basics before you leave the ship.",
        imageKey: "cruise-port",
      },
      {
        title: "Things to do in Ravenna from a cruise",
        href: "/things-to-do-in-ravenna-from-a-cruise",
        reason: "DIY mosaic routing once you reach the city.",
        imageKey: "historic",
      },
    ],
  },
  {
    id: "short-port",
    label: "Short port call",
    description: "Usable hours ashore are limited after transfers.",
    cards: [
      {
        title: "One day in Ravenna",
        href: "/one-day-in-ravenna",
        reason: "Two-monument minimum viable plan with return buffer.",
        imageKey: "historic",
      },
      {
        title: "Ravenna mosaics guide",
        href: "/ravenna-mosaics-guide",
        reason: "Pick one unmissable interior if time is tight.",
        imageKey: "historic",
      },
      {
        title: "Porto Corsini port guide",
        href: "/cruise-port-guide",
        reason: "Transfer maths before committing to a distant excursion.",
        imageKey: "cruise-port",
      },
    ],
  },
];

export function getRecommendationById(id: string): TravellerRecommendation | undefined {
  return travellerRecommendations.find((rec) => rec.id === id);
}

export function getAllRecommendationIds(): string[] {
  return travellerRecommendations.map((rec) => rec.id);
}
