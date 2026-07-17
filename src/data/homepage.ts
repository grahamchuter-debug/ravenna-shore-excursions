import type { ExperienceCard, FAQ, VisitorType } from "./types";

export const homepageTagline = "Find the best version of your day in Ravenna";

export const homepageTrustLine =
  "Independently researched cruise-day advice for Porto Corsini — partner excursions, honest comparisons and schedules you should verify with your cruise line.";

export const passengerSnapshot = {
  eyebrow: "Cruise passenger snapshot",
  title: "What to know before you plan Ravenna",
  items: [
    {
      label: "Cruise terminal",
      value: "Porto Corsini",
      detail: "Ships use the Porto Corsini cruise terminal — not Ravenna city centre.",
    },
    {
      label: "Best known for",
      value: "Byzantine mosaics and UNESCO heritage",
      detail: "San Vitale, Galla Placidia and the historic centre reward a focused visit.",
    },
    {
      label: "Best for",
      value: "Culture, history and regional day trips",
      detail: "Ravenna itself, Bologna, San Marino, or a post-cruise Venice journey.",
    },
    {
      label: "City access",
      value: "Transport required from the cruise terminal",
      detail: "Allow roughly 15 km / about 30 minutes each way — arrangements vary by sailing.",
    },
    {
      label: "Popular wider trips",
      value: "Bologna, San Marino and post-cruise Venice",
      detail: "Choose by time ashore, mobility and whether you are finishing the cruise.",
    },
    {
      label: "Ideal planning style",
      value: "Pre-book transport or a port pickup",
      detail: "Do not assume a walkable city arrival or guaranteed shuttle for every sailing.",
    },
  ],
};

export const spiritOfRavenna = {
  eyebrow: "Emilia-Romagna & the Adriatic",
  title: "Spirit of Ravenna",
  paragraphs: [
    "Ravenna is Italy's mosaic capital — Byzantine gold, baptistery ceilings and quiet basilicas that reward unhurried looking.",
    "From Porto Corsini you can reach Bologna's porticoes, San Marino's towers or — on disembarkation day — continue to Venice by water. Each option asks for different timing and expectations.",
    "The port is a gateway, not the city itself. The best days start with honest transfer maths and end with a buffer back at the terminal.",
  ],
  highlights: [
    { emoji: "✨", label: "Byzantine mosaics" },
    { emoji: "🏛️", label: "Bologna & Emilia-Romagna" },
    { emoji: "🏰", label: "San Marino ridge" },
  ],
  imageKey: "historic",
};

export const embarkationSection = {
  title: "Turnaround & post-cruise days",
  body:
    "Some sailings embark or disembark at Porto Corsini. If you are leaving the ship for good, the post-cruise Venice product can replace a bare transfer — gondola, water taxi and St Mark's before you continue from Piazzale Roma. It does not return to the vessel. On regular port-of-call days, Ravenna's mosaics, Bologna and San Marino are the realistic excursion set.",
  cta: { label: "Post-cruise Venice option", href: "/shore-excursions/post-cruise-ravenna-to-venice" },
};

export const finalCta = {
  title: "Ready to choose your day?",
  body:
    "Compare Ravenna against Bologna and San Marino, read the Porto Corsini port guide, then book partner excursions only when the timing fits your ship.",
  primary: { label: "Browse shore excursions", href: "/shore-excursions" },
  secondary: { label: "Read the port guide", href: "/cruise-port-guide" },
};

export const visitorTypes: VisitorType[] = [
  {
    id: "port-day",
    label: "I'm visiting Ravenna for the day on a cruise",
    shortLabel: "Port day",
    description:
      "Match your hours ashore to Ravenna mosaics, Bologna, San Marino or a post-cruise Venice transfer — with realistic road time from Porto Corsini.",
    href: "/shore-excursions",
    cta: "Plan my port day",
  },
  {
    id: "first-time",
    label: "It's my first time in Ravenna",
    shortLabel: "First visit",
    description:
      "Compare mosaic-focused Ravenna with Bologna and San Marino before choosing the experience that fits your first call.",
    href: "/best-ravenna-shore-excursions",
    cta: "See first-time picks",
  },
  {
    id: "independent",
    label: "I prefer to explore independently",
    shortLabel: "Independent",
    description:
      "Understand taxi and bus links from Porto Corsini to Ravenna's basilicas, plus how much time transfer adds to a DIY day.",
    href: "/things-to-do-in-ravenna-from-a-cruise",
    cta: "Explore independently",
  },
  {
    id: "planner",
    label: "I want help choosing my day",
    shortLabel: "Cruise planner",
    description:
      "Tell us your port times, interests, mobility and budget for a tailored Ravenna-area plan.",
    href: "/cruise-planner",
    cta: "Use the planner",
  },
];

export interface HomeSection {
  slug: string;
  number: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

/** Four homepage experience paths — exact intents for Ravenna port days. */
export const experienceCards: ExperienceCard[] = [
  {
    slug: "ravenna-mosaics",
    title: "Ravenna Mosaics",
    description:
      "UNESCO basilicas and baptistery ceilings — the Byzantine heart of your day once you reach the city from Porto Corsini.",
    href: "/things-to-do-in-ravenna-from-a-cruise",
    cta: "Discover Ravenna",
    imageKey: "historic",
  },
  {
    slug: "bologna",
    title: "Bologna",
    description:
      "San Luca's porticoed walk, medieval towers and portico-lined streets on a small-group day from the cruise terminal.",
    href: "/shore-excursions/bologna-from-porto-corsini",
    cta: "Explore Bologna",
    imageKey: "walking",
  },
  {
    slug: "san-marino",
    title: "San Marino",
    description:
      "Private hill-town pacing, tower views and included tastings in Europe's oldest republic.",
    href: "/shore-excursions/private-san-marino-from-ravenna",
    cta: "Visit San Marino",
    imageKey: "photography",
  },
  {
    slug: "post-cruise-venice",
    title: "Post-Cruise Venice",
    description:
      "Disembark at Porto Corsini and finish at Piazzale Roma — gondola, water taxi and St Mark's on the way to Venice.",
    href: "/shore-excursions/post-cruise-ravenna-to-venice",
    cta: "Continue to Venice",
    imageKey: "coast",
  },
];

export const coreSections: HomeSection[] = [
  {
    slug: "shore-excursions",
    number: "01",
    title: "Shore Excursions",
    description: "Live partner tours to Bologna, San Marino and post-cruise Venice — matched to Porto Corsini timings.",
    href: "/shore-excursions",
    cta: "Browse excursions",
  },
  {
    slug: "cruise-port-guide",
    number: "02",
    title: "Porto Corsini Cruise Port Guide",
    description: "Terminal layout, distance to Ravenna, taxis, buses and return-to-ship planning.",
    href: "/cruise-port-guide",
    cta: "Read the port guide",
  },
  {
    slug: "compare",
    number: "03",
    title: "Compare Your Options",
    description: "Ravenna or Bologna? Ravenna or San Marino? Clear comparisons without overselling.",
    href: "/compare",
    cta: "Compare day trips",
  },
  {
    slug: "independent",
    number: "04",
    title: "Explore Ravenna",
    description: "Mosaic itinerary ideas with honest transfer time from the terminal.",
    href: "/things-to-do-in-ravenna-from-a-cruise",
    cta: "Plan a city day",
  },
  {
    slug: "ravenna-cruise-schedule",
    number: "05",
    title: "Ship Schedules",
    description: "Sample Porto Corsini calls for 2026–2027 — confirm every date with your cruise line.",
    href: "/ravenna-cruise-schedule",
    cta: "View schedules",
  },
  {
    slug: "faq",
    number: "06",
    title: "Ravenna FAQs",
    description: "Honest answers on terminal access, transfer time, excursion choices and timing.",
    href: "/faq",
    cta: "Read the FAQs",
  },
];

export function getHomepageFaqs(): FAQ[] {
  return [
    {
      question: "Can I walk from Porto Corsini to Ravenna's historic centre?",
      answer:
        "No. The cruise terminal is about 15 km from central Ravenna — roughly 30 minutes by road. Plan a taxi, organised excursion or public bus rather than walking.",
    },
    {
      question: "Is Venice the cruise port?",
      answer:
        "No. Ships berth at Porto Corsini near Ravenna. Venice is a separate destination, reachable on the post-cruise transfer product or by independent travel.",
    },
    {
      question: "Should first-time visitors choose Ravenna, Bologna or San Marino?",
      answer:
        "Choose Ravenna for mosaics and early Christian monuments; Bologna for porticoes, San Luca and urban food culture; San Marino for a private hill-town day with tower views and tastings.",
    },
    {
      question: "When does the post-cruise Venice tour make sense?",
      answer:
        "Only when you are disembarking at Ravenna and want a guided one-way transfer that ends at Piazzale Roma in Venice. It is not for same-day return to the ship.",
    },
    {
      question: "How early should I return to Porto Corsini?",
      answer:
        "Aim to reach the terminal 60–90 minutes before all-aboard. Allow extra margin after Bologna or San Marino because motorway and hill-road traffic can vary.",
    },
  ];
}
