import type { ExcursionPage } from "./types";

const PORT_LOGISTICS =
  "Cruise ships call at Porto Corsini, roughly 15 km from Ravenna's historic centre — about 30 minutes by road, not a walkable distance from the mosaics and basilicas. Partner excursions meet at the terminal; taxis are available when ships are in port. Allow roughly 1–1.5 hours each way for Bologna and San Marino on typical road conditions. The post-cruise Venice product is one-way: it ends at Piazzale Roma in Venice with your luggage and does not return to the ship. On standard port-of-call days, confirm all-aboard time and plan to reach Porto Corsini 60–90 minutes early.";

const SEG_SUPPLIER = {
  kind: "shore-excursions-group" as const,
  name: "Shore Excursions Group",
};

export const excursions: ExcursionPage[] = [
  {
    slug: "post-cruise-ravenna-to-venice",
    title: "Post-Cruise Guided Venice Discovery from Ravenna",
    seoTitle: "Post-Cruise Venice from Ravenna (Porto Corsini) — Guided Transfer & Sightseeing",
    metaDescription:
      "Continue to Venice after your Ravenna cruise with a guided small-group transfer from Porto Corsini, gondola ride, water taxi and St Mark's — ending at Piazzale Roma, not the ship.",
    category: "Post-Cruise Transfer",
    badge: "Best for Post-Cruise Passengers",
    tagline:
      "Leave the ship at Porto Corsini and arrive in Venice with your luggage — gondola, water taxi and St Mark's before you check in.",
    duration: "~6.5 hours",
    pace: "Moderate",
    bestFor: "Passengers disembarking at Ravenna who want a guided introduction to Venice before their onward travel",
    overview:
      "This post-cruise product is designed for the end of your sailing, not a same-day return to the ship. A small-group route from Porto Corsini combines road transfer with Venice on the water — typically a gondola experience, water taxi crossing and time around St Mark's — finishing at Piazzale Roma where taxis, buses and vaporetto connections continue your journey.",
    body: [
      "Porto Corsini sits on the Adriatic coast, well outside Venice's lagoon. The day begins at the cruise terminal with luggage handling suited to disembarkation, then moves by road towards Venice before switching to boats for the classic arrival perspective.",
      "On the water, a gondola ride and water taxi segment show how Venice is meant to be approached — canals, palazzi and the rhythm of a city without cars. A guided walk around St Mark's Square and its surroundings provides orientation before you are released at Piazzale Roma.",
      "This is not a full-depth museum day. The value is efficient transfer plus a memorable first encounter with Venice when you are already travelling with bags and onward plans.",
      "Because the itinerary ends in Venice, it suits post-cruise passengers with flights or hotels in the Veneto — not guests who must be back aboard the same evening.",
    ],
    highlights: [
      "Small-group post-cruise transfer from Porto Corsini",
      "Gondola ride and water taxi experience",
      "Guided time around St Mark's Square",
      "Luggage-friendly routing for disembarkation day",
      "Ends at Piazzale Roma, Venice — not at the cruise terminal",
    ],
    included: [
      "Guide and organised transport as described by Shore Excursions Group",
      "Gondola and water taxi elements per the live product listing",
      "St Mark's area orientation walk",
      "One-way finish at Piazzale Roma, Venice",
    ],
    portLogistics: PORT_LOGISTICS,
    suitabilityNote:
      "Post-cruise / disembarkation only — this product ends in Venice and does not return to your ship.",
    whyChoose: [
      "Turns a long transfer day into a structured Venice introduction",
      "Handles luggage on the most awkward part of the journey",
      "Small-group format rather than a large coach drop-off",
      "Useful when your flight or hotel is in Venice or the Veneto",
    ],
    tips: [
      "Confirm your disembarkation time and luggage allowance with the operator before booking",
      "Have onward hotel or transport details ready for Piazzale Roma",
      "Wear comfortable shoes — St Mark's area includes bridges and uneven paving",
      "Do not book this product if you must return to the ship the same day",
    ],
    faqs: [
      {
        question: "Does this tour return to the cruise ship?",
        answer:
          "No. It is a post-cruise, one-way product ending at Piazzale Roma in Venice. It is intended for passengers disembarking at Ravenna.",
      },
      {
        question: "Is Venice the cruise port?",
        answer:
          "No. Ships berth at Porto Corsini near Ravenna on the Adriatic coast. Venice is a separate destination reached by road and water on this transfer day.",
      },
      {
        question: "Can I use this on a regular port-of-call day?",
        answer:
          "The product is built for disembarkation. On a port-of-call day you would be left in Venice without your ship — use Ravenna, Bologna or San Marino options instead.",
      },
      {
        question: "Where exactly does the tour finish?",
        answer:
          "At Piazzale Roma, Venice's main road gateway — where buses, taxis and vaporetto services connect to the rest of the city and Marco Polo Airport.",
      },
    ],
    relatedExcursionSlugs: ["bologna-from-porto-corsini", "private-san-marino-from-ravenna"],
    featured: true,
    imageKey: "historic",
    supplier: {
      ...SEG_SUPPLIER,
      url: "https://www.shoreexcursionsgroup.com/tour/post-cruise-guided-venice-discovery-from-ravenna/eurvgrandveniceluxur",
      productId: "eurvgrandveniceluxur",
    },
  },
  {
    slug: "bologna-from-porto-corsini",
    title: "Bologna Day Trip from Porto Corsini",
    seoTitle: "Bologna Shore Excursion from Ravenna Cruise Port (Porto Corsini)",
    metaDescription:
      "Visit Bologna from Porto Corsini on a small-group shore excursion — San Luca sanctuary walk, historic centre and free time, with realistic road timing from Ravenna's cruise terminal.",
    category: "Culture & City Escape",
    badge: "Culture & City Escape",
    tagline:
      "Porticoes, medieval towers and San Luca's hilltop basilica — Emilia-Romagna's great university city within a cruise day from Porto Corsini.",
    duration: "~7 hours",
    pace: "Relaxed",
    bestFor: "Culture lovers who want a full city day without the mosaic-focused pace of central Ravenna",
    overview:
      "Bologna rewards passengers who enjoy walking under endless porticoes, climbing viewpoints and eating seriously well. This small-group route from Porto Corsini combines the hill walk to San Luca — one of Italy's most distinctive sanctuary approaches — with Bologna's compact historic core and free time for lunch or independent browsing.",
    body: [
      "The drive from Porto Corsini to Bologna typically takes around an hour each way on motorway and ring-road routes, depending on traffic and the exact pickup point at the terminal.",
      "San Luca sits above the city on the Guardia hill. The excursion includes the famous porticoed walk — a sustained but manageable ascent with sweeping views over the Po plain — before descending into Bologna proper.",
      "In the centre, Piazza Maggiore, the Two Towers, the unfinished basilica facade and the market streets show why Bologna is often called Italy's food capital as much as a historic one. Free time allows you to choose a trattoria, gelato stop or a short independent wander.",
      "This is a there-and-back port day: you return to Porto Corsini in time for the ship's schedule. Partner operators may advertise return-to-ship arrangements where applicable — confirm the terms on the live booking page.",
    ],
    highlights: [
      "Walk the porticoed route towards San Luca basilica",
      "Bologna historic centre and Piazza Maggiore",
      "Two Towers and medieval streetscape",
      "Free time for lunch or independent exploration",
      "Small-group format from Porto Corsini",
    ],
    included: [
      "Licensed guide and transport per Shore Excursions Group listing",
      "San Luca walk and Bologna historic-centre orientation",
      "Free time in the city as described by the operator",
      "Return transfer towards Porto Corsini on port-of-call days",
    ],
    portLogistics: PORT_LOGISTICS,
    whyChoose: [
      "Strong alternative when you have already seen Ravenna's mosaics on a previous call",
      "San Luca walk delivers a memorable hilltop arrival without alpine road risk",
      "Easy pacing — rated easy on the partner listing",
      "Free time for Bologna's food culture on your own terms",
    ],
    tips: [
      "Wear shoes with grip for San Luca's porticoed incline",
      "Carry water in warm weather — parts of the walk are exposed",
      "Decide lunch plans early; popular trattorias fill quickly",
      "Confirm whether your sailing is a port of call or turnaround before booking",
    ],
    faqs: [
      {
        question: "Is Bologna the local city for the cruise port?",
        answer:
          "No. Ravenna is the local historic city; Bologna is a separate Emilia-Romagna capital reached by road from Porto Corsini.",
      },
      {
        question: "How strenuous is the San Luca walk?",
        answer:
          "The porticoed route is a steady uphill walk rather than a scramble, but it is not step-free. Discuss mobility needs with the operator before booking.",
      },
      {
        question: "Will I have time for lunch?",
        answer:
          "The itinerary includes free time. How long depends on traffic and group pace — treat lunch as flexible rather than a fixed multi-course event unless the listing states otherwise.",
      },
      {
        question: "Can I visit Bologna independently from the port?",
        answer:
          "Possible by train via Ravenna, but fixed timetables and terminal distance make an organised excursion simpler on a port day.",
      },
    ],
    relatedExcursionSlugs: ["private-san-marino-from-ravenna", "post-cruise-ravenna-to-venice"],
    featured: true,
    imageKey: "historic",
    supplier: {
      ...SEG_SUPPLIER,
      url: "https://www.shoreexcursionsgroup.com/tour/bologna-day-trip-porto-corsini-san-luca-walk-free/eurvdiscobolognagui",
      productId: "eurvdiscobolognagui",
    },
  },
  {
    slug: "private-san-marino-from-ravenna",
    title: "Private San Marino from Ravenna",
    seoTitle: "Private San Marino Shore Excursion from Porto Corsini (Ravenna)",
    metaDescription:
      "Explore San Marino on a private shore excursion from Ravenna's Porto Corsini — medieval towers, panoramic views, tastings and a moderate hill-town walk.",
    category: "Private Experience",
    badge: "Private Experience",
    tagline:
      "Europe's oldest republic on a cliff — private pacing, tower views and included tastings from your Porto Corsini call.",
    duration: "~7 hours",
    pace: "Moderate",
    bestFor: "Couples and small groups wanting a private day in a unique micro-state with food and wine elements",
    overview:
      "San Marino rises above the Romagna hills with three famous towers, narrow stone lanes and views that stretch to the Adriatic on clear days. This private excursion from Porto Corsini pairs a guided walk through the historic mountaintop town with included tastings — a distinctive counterpoint to Ravenna's Byzantine interiors or Bologna's porticoes.",
    body: [
      "From Porto Corsini the road crosses the Emilia-Romagna landscape before climbing to the Città di San Marino. The journey is manageable within a typical cruise day, but the town itself sits on a ridge — expect slopes, steps and cobbles.",
      "A private format allows the guide to adjust pacing for photography, shopping and rest stops. Medieval towers, piazzas and fortress walls provide the day's architectural drama.",
      "Tastings included in the partner product introduce local products — useful structure on a hill town where it is easy to drift without a plan. Confirm dietary requirements when booking.",
      "San Marino uses the euro and has its own stamp and souvenir culture; passports are not usually required for day visits from Italy, but carry ID as you would for any cross-border trip.",
    ],
    highlights: [
      "Private guide and vehicle from Porto Corsini",
      "Medieval towers and panoramic ridge walks",
      "Included tastings per the live product listing",
      "Independent time for souvenirs and viewpoints",
      "Distinct micro-state atmosphere unlike Ravenna or Bologna",
    ],
    included: [
      "Private guide and transport per Shore Excursions Group listing",
      "Guided walk through San Marino's historic centre",
      "Tastings as described on the partner product page",
      "Return transfer towards Porto Corsini on port-of-call days",
    ],
    portLogistics: PORT_LOGISTICS,
    whyChoose: [
      "Private format suits couples and families who dislike large coach groups",
      "A clear 'wow' destination when Ravenna feels familiar",
      "Tastings anchor the day without needing a formal restaurant booking",
      "Moderate pace with flexibility for photo and shop stops",
    ],
    tips: [
      "Wear supportive shoes — San Marino's lanes are steep and stone-paved",
      "Bring a layer; the ridge can be windier and cooler than the coast",
      "Set a spending plan for duty-style shopping if that tempts your group",
      "Confirm group size limits and vehicle type on the booking page",
    ],
    faqs: [
      {
        question: "Is San Marino part of Italy?",
        answer:
          "No. It is an independent micro-state surrounded by Italy. Day visits from the cruise port are common, but it is a separate destination with its own character.",
      },
      {
        question: "How does this compare with Bologna?",
        answer:
          "Bologna is a flat, porticoed city day with San Luca; San Marino is a hilltop fortress town with tower views and tastings. Choose Bologna for urban food culture; San Marino for novelty and scenery.",
      },
      {
        question: "Is the walk suitable for limited mobility?",
        answer:
          "The historic centre includes gradients and steps. Private transport can reduce walking, but the town's character is inherently hilly — discuss needs before booking.",
      },
      {
        question: "Are tastings mandatory?",
        answer:
          "They are part of the listed product. Inform the operator of allergies or preferences in advance.",
      },
    ],
    relatedExcursionSlugs: ["bologna-from-porto-corsini", "post-cruise-ravenna-to-venice"],
    featured: true,
    imageKey: "photography",
    supplier: {
      ...SEG_SUPPLIER,
      url: "https://www.shoreexcursionsgroup.com/tour/private-san-marino-walk-porto-corsini-tastings/eurvpvtsanmarinwalk",
      productId: "eurvpvtsanmarinwalk",
    },
  },
];

export function getExcursionBySlug(slug: string): ExcursionPage | undefined {
  return excursions.find((excursion) => excursion.slug === slug);
}

export function getAllExcursionSlugs(): string[] {
  return excursions.map((excursion) => excursion.slug);
}

export function getFeaturedExcursions(): ExcursionPage[] {
  return excursions.filter((excursion) => excursion.featured);
}
