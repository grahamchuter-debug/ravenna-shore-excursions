import type { FAQ } from "./types";
import { getHomepageFaqs } from "./homepage";

export const extraFaqs: FAQ[] = [
  {
    question: "Where do cruise ships dock near Ravenna?",
    answer:
      "At Porto Corsini, a dedicated cruise terminal on the Adriatic coast east of Ravenna city. Berth assignments can vary — check your ship's daily programme on arrival.",
  },
  {
    question: "How far is Porto Corsini from Ravenna historic centre?",
    answer:
      "About 15 km — typically 30 minutes by road depending on traffic and your exact pickup point. It is not walkable on a port day.",
  },
  {
    question: "Can I explore Ravenna independently from the cruise port?",
    answer:
      "Yes, but you must factor in transfer time. Taxis and buses link Porto Corsini to Ravenna; once in the city the mosaic sites are relatively compact. An organised tour removes transfer guesswork.",
  },
  {
    question: "What should I see in Ravenna on a cruise day?",
    answer:
      "Prioritise the mosaic monuments — San Vitale, Sant'Apollinare Nuovo, the Neonian Baptistery and Mausoleum of Galla Placidia when tickets allow. Allow time for transfers both ways.",
  },
  {
    question: "How far is Bologna from Porto Corsini?",
    answer:
      "Roughly 80–90 km by road. Partner excursions quote about seven hours total including San Luca, the historic centre and free time. Traffic affects exact timing.",
  },
  {
    question: "Is Bologna the local city for the cruise port?",
    answer:
      "No. Ravenna is the local historic city. Bologna is a separate day trip worth planning as its own excursion.",
  },
  {
    question: "How does San Marino compare with Ravenna?",
    answer:
      "Ravenna is flat, mosaic-focused and UNESCO-heavy. San Marino is a steep hilltop micro-state with towers, views and tastings — better as a private full-day escape than a quick add-on.",
  },
  {
    question: "Can I visit Venice and return to the ship the same day?",
    answer:
      "Venice is a long way from Porto Corsini and the live post-cruise product is one-way to Piazzale Roma for disembarking passengers. It is not designed as a same-day round trip to the terminal.",
  },
  {
    question: "What is the post-cruise Venice excursion?",
    answer:
      "A small-group transfer from Porto Corsini that includes gondola and water taxi elements plus time around St Mark's, ending in Venice at Piazzale Roma with your luggage — not back at the ship.",
  },
  {
    question: "Should I book through the cruise line or independently?",
    answer:
      "Ship excursions offer clear protection if an organised tour is delayed. Reputable independent operators may offer smaller groups, but verify port-day experience, cancellation terms and whether return-to-ship applies to your chosen product.",
  },
  {
    question: "How much return-to-ship buffer should I allow?",
    answer:
      "Reach Porto Corsini 60–90 minutes before all-aboard on port days. Build the route backwards from that time, including road contingency after Bologna or San Marino.",
  },
  {
    question: "Are Ravenna shore excursions accessible?",
    answer:
      "Ravenna's mosaic sites include steps and historic surfaces. Bologna's San Luca walk is a sustained incline. San Marino is steep throughout. Discuss mobility needs with the operator before booking.",
  },
  {
    question: "What currency and language are used?",
    answer:
      "Italy uses the euro. Italian is the local language; English is common in tourist-facing businesses. San Marino also uses the euro for practical purposes on day visits.",
  },
  {
    question: "Are ship schedules on this site guaranteed?",
    answer:
      "No. Published calls are for planning only. Itineraries, times and even port assignments change — confirm with your cruise line before booking non-refundable travel.",
  },
];

export function getAllFaqs(): FAQ[] {
  return [...getHomepageFaqs(), ...extraFaqs];
}
