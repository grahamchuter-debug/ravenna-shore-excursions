import type { AttractionPage } from "./types";

export const highlights: AttractionPage[] = [
  {
    slug: "bologna-from-porto-corsini-guide",
    title: "Bologna from Porto Corsini",
    seoTitle: "Bologna Day Trip from Ravenna Cruise Port",
    metaDescription:
      "Plan Bologna from Porto Corsini with road times, San Luca walk context, historic-centre free time and port-day return planning.",
    attractionName: "Bologna",
    tagline: "Porticoes, towers and San Luca's hilltop basilica — Emilia-Romagna beyond Ravenna.",
    overview:
      "Bologna is not the local cruise city — Ravenna is — but it is the headline partner excursion from Porto Corsini. Expect a full day with San Luca's porticoed ascent and time in the medieval centre.",
    body: [
      "Road time from the terminal is typically around an hour each way, making this an organised-excursion day rather than a spontaneous side trip.",
      "San Luca offers a distinctive arrival experience: a long sheltered walk climbing to the sanctuary with views over the Po plain.",
      "The flat historic core rewards unstructured wandering under porticoes — Piazza Maggiore, the Two Towers and market streets fill free time.",
    ],
    distanceFromPort: "~80–90 km from Porto Corsini",
    travelTime: "About 1 hour each way by road on typical excursion routing",
    timeNeeded: "Full port day (~7 hours on partner listing)",
    gettingThere: [
      {
        method: "Partner shore excursion",
        detail: "Small-group tour with guide, San Luca walk and centre time — the practical cruise-day option.",
        time: "Full day",
        cost: "See live Shore Excursions Group listing",
      },
      {
        method: "Independent train via Ravenna",
        detail: "Possible but station transfers and fixed timetables add friction on a port schedule.",
        time: "Variable",
        cost: "Lower; higher timing risk",
      },
    ],
    highlights: [
      "San Luca porticoed walk",
      "Piazza Maggiore and Two Towers",
      "Portico-lined shopping and food streets",
      "Free time for lunch",
    ],
    tips: [
      "Wear shoes suitable for San Luca's incline",
      "Do not confuse Bologna with the local port city — Ravenna is separate",
      "Confirm return timing on the live booking page",
    ],
    faqs: [
      {
        question: "Is this the same as visiting Ravenna?",
        answer: "No. Bologna is a separate city day. Ravenna's mosaics require their own transfer plan.",
      },
    ],
    relatedAttractionSlugs: ["san-marino-from-ravenna-guide"],
    relatedExcursionSlug: "bologna-from-porto-corsini",
  },
  {
    slug: "san-marino-from-ravenna-guide",
    title: "San Marino from Ravenna Cruise Port",
    seoTitle: "San Marino Shore Excursion from Porto Corsini",
    metaDescription:
      "Understand San Marino as a private hill-town day from Porto Corsini — towers, tastings, walking demands and comparison with Ravenna.",
    attractionName: "San Marino",
    tagline: "Medieval towers on a ridge — Europe's oldest republic as a private port-day escape.",
    overview:
      "San Marino trades Ravenna's flat mosaic interiors for steep stone lanes and fortress views. The live product is private, includes tastings and suits couples or small groups.",
    body: [
      "The micro-state sits above the Romagna hills — expect cobbles, slopes and postcard viewpoints rather than quiet basilicas.",
      "Private pacing allows photo stops and tasting time without a large coach schedule.",
      "Passports are not usually required for day visits from Italy, but carry ID as you would for any border-adjacent trip.",
    ],
    distanceFromPort: "Roughly 90–100 km from Porto Corsini depending on route",
    travelTime: "About 1–1.5 hours each way",
    timeNeeded: "Full port day (~7 hours on partner listing)",
    gettingThere: [
      {
        method: "Private partner excursion",
        detail: "Listed private tour with guide, walk and tastings from Porto Corsini.",
        time: "Full day",
        cost: "See live Shore Excursions Group listing",
      },
    ],
    highlights: [
      "Three towers and fortress walls",
      "Ridge panoramas towards the Adriatic",
      "Included tastings per partner listing",
      "Private group format",
    ],
    tips: [
      "Compare with Ravenna if mobility is limited — San Marino is inherently hilly",
      "Bring a layer for exposed ridge sections",
    ],
    faqs: [
      {
        question: "Can I visit independently?",
        answer: "Possible by car, but parking and pacing on a port schedule make the private excursion simpler.",
      },
    ],
    relatedAttractionSlugs: ["bologna-from-porto-corsini-guide"],
    relatedExcursionSlug: "private-san-marino-from-ravenna",
  },
  {
    slug: "post-cruise-venice-from-ravenna",
    title: "Post-Cruise Venice from Ravenna",
    seoTitle: "Post-Cruise Transfer from Porto Corsini to Venice",
    metaDescription:
      "How the one-way post-cruise Venice product works from Ravenna's terminal — gondola, water taxi, St Mark's and Piazzale Roma finish.",
    attractionName: "Venice (post-cruise)",
    tagline: "Disembark at Porto Corsini and finish in Venice — not a same-day return to the ship.",
    overview:
      "Venice is not the cruise port. This product targets passengers ending their sailing at Ravenna who want a guided transfer into Venice with on-the-water arrival moments.",
    body: [
      "The itinerary combines road transfer from Porto Corsini with boat experiences — typically gondola and water taxi segments — plus time around St Mark's.",
      "It ends at Piazzale Roma for onward hotels, trains or airport connections — luggage is part of the equation.",
      "Do not book for a regular port of call unless you intentionally want to stay in Venice and miss the ship.",
    ],
    distanceFromPort: "Porto Corsini to Venice — substantial road plus lagoon crossing",
    travelTime: "~6.5 hours total per partner listing",
    timeNeeded: "Disembarkation day anchor",
    gettingThere: [
      {
        method: "Post-cruise partner excursion",
        detail: "One-way guided product ending Piazzale Roma — confirm disembarkation details when booking.",
        time: "~6.5 hours",
        cost: "See live Shore Excursions Group listing",
      },
    ],
    highlights: [
      "Gondola and water taxi elements",
      "St Mark's area orientation",
      "Luggage-friendly disembarkation routing",
      "Finish at Piazzale Roma",
    ],
    tips: [
      "Have onward Venice transport or hotel plans ready",
      "This is not Venice-as-a-port — ships berth at Porto Corsini",
    ],
    faqs: [
      {
        question: "Will I return to the ship?",
        answer: "No. This is a post-cruise one-way product.",
      },
    ],
    relatedAttractionSlugs: ["bologna-from-porto-corsini-guide"],
    relatedExcursionSlug: "post-cruise-ravenna-to-venice",
  },
];

export function getHighlightBySlug(slug: string): AttractionPage | undefined {
  return highlights.find((h) => h.slug === slug);
}

export function getAllHighlightSlugs(): string[] {
  return highlights.map((h) => h.slug);
}
