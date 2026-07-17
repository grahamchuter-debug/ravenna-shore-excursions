import type { FAQ } from "./types";

export interface Terminal {
  name: string;
  quay: string;
  usedBy: string;
  cityAccess: string;
}

export interface PortGuideSection {
  heading: string;
  paragraphs: string[];
}

export const portGuideContent = {
  title: "Porto Corsini Cruise Port Guide",
  subtitle:
    "Where ships berth, how far Ravenna really is, transport options and sensible return-to-ship planning.",
  terminals: [
    {
      name: "Porto Corsini Cruise Terminal",
      quay: "Adriatic coast east of Ravenna — dedicated cruise berths and terminal facilities",
      usedBy: "Medium and large ships on Adriatic, Mediterranean and repositioning itineraries calling at Ravenna",
      cityAccess:
        "Not walkable to Ravenna historic centre (~15 km / ~30 min by road). Taxis and excursion coaches meet ships; public bus services link to Ravenna with less predictability on port days.",
    },
  ] as Terminal[],
  sections: [
    {
      heading: "Porto Corsini vs Ravenna — know the difference",
      paragraphs: [
        "Cruise marketing often says 'Ravenna', but the ship docks at Porto Corsini on the coast. The mosaics, basilicas and pedestrian historic core are in Ravenna proper — a separate journey.",
        "Treat every port day as terminal → city → terminal unless you book an excursion that handles transfers. Underestimating that gap is the most common planning mistake on this port.",
        "Venice and Bologna are not 'nearby' in cruise-day terms. Venice is a major post-cruise destination; Bologna is a full excursion. Neither replaces understanding Porto Corsini's location.",
      ],
    },
    {
      heading: "Getting from the terminal to Ravenna",
      paragraphs: [
        "Taxis typically wait when ships are in port. Confirm whether the fare is metered or fixed and agree the drop-off point in Ravenna — Piazza del Popolo or near San Vitale are common anchors.",
        "Public buses run between Porto Corsini and Ravenna, but frequency and crowding vary. On a tight schedule, taxis or organised tours reduce risk.",
        "Allow roughly 30 minutes each way by road in normal conditions, plus time to find your coach or taxi at the terminal on return. Summer traffic and event days can add delay.",
      ],
    },
    {
      heading: "Ravenna mosaic highlights",
      paragraphs: [
        "Ravenna's UNESCO ensemble spans the 5th and 6th centuries — glittering mosaics in San Vitale, Sant'Apollinare Nuovo, the Neonian Baptistery and the Mausoleum of Galla Placidia.",
        "Tickets and timed entry apply to some sites. A single cruise day can cover two or three major monuments with disciplined sequencing — trying to see everything feels rushed once transfers are included.",
        "The city itself is relatively flat and cycle-friendly, but mosaic interiors mean quiet observation rather than a brisk checklist tour.",
      ],
    },
    {
      heading: "Beyond Ravenna on a port day",
      paragraphs: [
        "Partner excursions from Porto Corsini include Bologna (San Luca walk and historic centre), private San Marino (towers and tastings) and a post-cruise Venice transfer for disembarking passengers.",
        "Each option uses most of a typical port window. Combining Ravenna with Bologna or San Marino in one independent day is not realistic without sacrificing depth.",
        "Confirm whether your sailing is a port of call, embarkation or disembarkation — the post-cruise Venice product only fits the latter.",
      ],
    },
    {
      heading: "A realistic Ravenna city day",
      paragraphs: [
        "If you transfer independently, head straight for your chosen mosaic sites after reaching Ravenna. Morning admission often means fewer coach groups indoors.",
        "Allow a simple lunch near the centre, then one further monument or a slow walk through Piazza del Popolo and the surrounding lanes.",
        "Work backwards from all-aboard: leave Ravenna with enough road time to reach Porto Corsini 60–90 minutes early.",
      ],
    },
    {
      heading: "Return-to-ship planning",
      paragraphs: [
        "All-aboard is earlier than published departure. For a Ravenna city day, be at the terminal 60–90 minutes before that cutoff.",
        "After Bologna or San Marino excursions, trust the operator's stated return plan on port-of-call days but still know your own all-aboard time.",
        "Independent travellers are responsible for the final leg from Ravenna to Porto Corsini — do not assume a taxi will be instant at peak return time.",
      ],
    },
  ] as PortGuideSection[],
  faqs: [
    {
      question: "Can I walk into Ravenna from the cruise terminal?",
      answer:
        "No. Porto Corsini is about 15 km from the historic centre — plan road transport.",
    },
    {
      question: "What can I see without leaving the port area?",
      answer:
        "The immediate port zone is functional rather than scenic. The worthwhile sights are in Ravenna or on organised excursions to Bologna, San Marino or Venice.",
    },
    {
      question: "Do I need a tour to see the mosaics?",
      answer:
        "No, but you need transfer time and ticket planning. A guide adds context in the monuments; an excursion bundles logistics.",
    },
    {
      question: "Is Venice the same as the cruise port?",
      answer:
        "No. Ships berth at Porto Corsini near Ravenna. Venice is reached separately — including via the post-cruise one-way product.",
    },
    {
      question: "How early should I be back at Porto Corsini?",
      answer:
        "Reach the terminal 60–90 minutes before all-aboard, with extra road contingency after inland excursions.",
    },
  ] as FAQ[],
};

export const terminals = portGuideContent.terminals;
export const portGuideSections = portGuideContent.sections;
export const portGuideFaqs = portGuideContent.faqs;
