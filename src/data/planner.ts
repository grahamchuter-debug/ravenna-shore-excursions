export interface PlannerInput {
  arrivalTime?: string;
  departureTime?: string;
  adults: number;
  children: number;
  interests: string[];
  mobility: "full" | "some" | "limited";
  budget: "budget" | "mid" | "premium";
  travelStyle: "diy" | "guided";
}

export interface PlannerLink {
  label: string;
  href: string;
  why: string;
}

export interface PlannerResult {
  headline: string;
  summary: string;
  excursions: PlannerLink[];
  transfers: PlannerLink[];
  stay: PlannerLink[];
  logistics: PlannerLink[];
  dayPlan: { time: string; text: string }[];
}

export const PLANNER_VISITOR_TYPES = [
  {
    id: "ravenna",
    label: "Ravenna mosaic visitor",
    description: "A local city day once transfer time from Porto Corsini is built in.",
  },
  {
    id: "bologna",
    label: "Bologna culture traveller",
    description: "San Luca walk and porticoed centre on the live small-group excursion.",
  },
  {
    id: "san-marino",
    label: "Private hill-town day",
    description: "Towers, tastings and ridge walks on the private partner product.",
  },
  {
    id: "post-cruise",
    label: "Disembarking for Venice",
    description: "One-way post-cruise transfer ending at Piazzale Roma — not a port-day round trip.",
  },
] as const;

export const INTEREST_OPTIONS = [
  { id: "ravenna", label: "Ravenna mosaics" },
  { id: "bologna", label: "Bologna & San Luca" },
  { id: "san-marino", label: "San Marino" },
  { id: "venice", label: "Post-cruise Venice" },
  { id: "independent", label: "Independent travel" },
  { id: "photography", label: "Photography & scenery" },
  { id: "family", label: "Family-friendly" },
  { id: "food", label: "Food & Emilia-Romagna" },
];

type PlanKey = "ravenna" | "bologna" | "san-marino" | "post-cruise";

export const RAVENNA_DAY_PLANS: Record<
  PlanKey,
  { headline: string; summary: string; minimumHours: number; links: PlannerLink[]; dayPlan: PlannerResult["dayPlan"] }
> = {
  ravenna: {
    headline: "Ravenna Mosaic Day",
    summary:
      "Transfer to Ravenna and focus on two or three UNESCO interiors with a conservative return to Porto Corsini.",
    minimumHours: 6,
    links: [
      {
        label: "Things to do in Ravenna",
        href: "/things-to-do-in-ravenna-from-a-cruise",
        why: "Transfer maths and monument priorities.",
      },
      {
        label: "One day in Ravenna",
        href: "/one-day-in-ravenna",
        why: "Sample timing from gangway to terminal buffer.",
      },
    ],
    dayPlan: [
      { time: "On arrival", text: "Clear the ship and reach Porto Corsini exit for taxi or bus to Ravenna." },
      { time: "Morning", text: "San Vitale and Mausoleum of Galla Placidia when tickets allow." },
      { time: "Midday", text: "Lunch near Piazza del Popolo." },
      { time: "Afternoon", text: "One further mosaic site, then road back to the terminal." },
    ],
  },
  bologna: {
    headline: "Bologna from Porto Corsini",
    summary:
      "Small-group partner day with San Luca walk, historic centre and free time — not the local city, but a strong culture escape.",
    minimumHours: 7,
    links: [
      {
        label: "Bologna excursion",
        href: "/shore-excursions/bologna-from-porto-corsini",
        why: "Live partner product with San Luca and centre time.",
      },
      {
        label: "Ravenna or Bologna?",
        href: "/ravenna-or-bologna-from-the-cruise-port",
        why: "Confirm this trade-off before booking.",
      },
    ],
    dayPlan: [
      { time: "On arrival", text: "Meet the excursion at the terminal promptly." },
      { time: "Morning", text: "Road to Bologna and San Luca porticoed walk." },
      { time: "Midday", text: "Historic centre orientation and free time." },
      { time: "Afternoon", text: "Return road to Porto Corsini — confirm partner return policy." },
    ],
  },
  "san-marino": {
    headline: "Private San Marino",
    summary:
      "Private hill-town pacing with towers, tastings and ridge walks — moderate walking throughout.",
    minimumHours: 7,
    links: [
      {
        label: "Private San Marino",
        href: "/shore-excursions/private-san-marino-from-ravenna",
        why: "Live private partner excursion from the terminal.",
      },
      {
        label: "Ravenna or San Marino?",
        href: "/ravenna-or-san-marino-from-the-cruise-port",
        why: "Hill town vs mosaic city — choose deliberately.",
      },
    ],
    dayPlan: [
      { time: "On arrival", text: "Meet private guide/vehicle at Porto Corsini." },
      { time: "Morning", text: "Road to San Marino and historic centre walk." },
      { time: "Midday", text: "Tastings and tower viewpoints per listing." },
      { time: "Afternoon", text: "Return towards the cruise terminal." },
    ],
  },
  "post-cruise": {
    headline: "Post-Cruise Venice Transfer",
    summary:
      "Disembarkation-only one-way route to Piazzale Roma with gondola, water taxi and St Mark's — not for same-day return.",
    minimumHours: 6,
    links: [
      {
        label: "Post-cruise Venice",
        href: "/shore-excursions/post-cruise-ravenna-to-venice",
        why: "Live one-way partner product details.",
      },
      {
        label: "Ravenna to Venice planning",
        href: "/ravenna-to-venice",
        why: "Independent alternative context.",
      },
    ],
    dayPlan: [
      { time: "Disembarkation", text: "Leave the ship with luggage per operator instructions." },
      { time: "Morning", text: "Road transfer towards Venice." },
      { time: "Midday", text: "Gondola, water taxi and St Mark's area time." },
      { time: "Finish", text: "Piazzale Roma — onward travel under your own arrangements." },
    ],
  },
};

function usableHours(input: PlannerInput): number {
  if (!input.arrivalTime || !input.departureTime) return 7.5;
  const [arrivalHour, arrivalMinute] = input.arrivalTime.split(":").map(Number);
  const [departureHour, departureMinute] = input.departureTime.split(":").map(Number);
  const elapsed = departureHour * 60 + departureMinute - arrivalHour * 60 - arrivalMinute;
  return Math.max(0, elapsed / 60 - 1.5);
}

function selectPlan(input: PlannerInput, hours: number): PlanKey {
  const interests = input.interests;
  if (interests.includes("venice") || input.interests.includes("post-cruise")) return "post-cruise";
  if (
    input.mobility === "limited" ||
    (interests.includes("independent") && interests.includes("ravenna")) ||
    hours < 7
  ) {
    return "ravenna";
  }
  if (interests.includes("san-marino") && input.budget !== "budget") return "san-marino";
  if (interests.includes("bologna") || interests.includes("food")) return "bologna";
  if (interests.includes("photography")) return "san-marino";
  return "ravenna";
}

export function generateRavennaPlan(input: PlannerInput): PlannerResult {
  const hours = usableHours(input);
  const key = selectPlan(input, hours);
  const plan = RAVENNA_DAY_PLANS[key];
  const partySize = input.adults + input.children;
  const excursions = [...plan.links];

  return {
    headline: plan.headline,
    summary: `${plan.summary} Your call provides about ${hours.toFixed(1)} usable hours for ${partySize} guest${partySize === 1 ? "" : "s"}. ${hours < plan.minimumHours ? `This is shorter than the ${plan.minimumHours}-hour minimum we suggest — consider a tighter Ravenna mosaic plan.` : ""}`.trim(),
    excursions,
    transfers: [
      {
        label: "Porto Corsini Cruise Port Guide",
        href: "/cruise-port-guide",
        why: "Terminal distance, taxis and return buffers.",
      },
    ],
    stay: [
      {
        label: "Ravenna cruise hotels",
        href: "/ravenna-cruise-hotels",
        why: "Pre- or post-cruise stays near the terminal or city.",
      },
    ],
    logistics: [
      {
        label: "Ravenna cruise schedule",
        href: "/ravenna-cruise-schedule",
        why: "Sample calls — confirm with your cruise line.",
      },
      {
        label: "Compare options",
        href: "/compare",
        why: "Ravenna vs Bologna vs San Marino trade-offs.",
      },
    ],
    dayPlan: [
      ...plan.dayPlan,
      {
        time: "Return buffer",
        text: "On port days, reach Porto Corsini 60–90 minutes before all-aboard unless your product ends elsewhere (e.g. post-cruise Venice).",
      },
    ],
  };
}
