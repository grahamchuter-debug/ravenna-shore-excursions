/**
 * Central cruise-positioning copy for homepage A/B readiness.
 * Swap `message` (or toggle flags) here — do not scatter strings across components.
 */
export const cruisePositioning = {
  enabled: true,
  eyebrow: "Designed for Cruise Passengers",
  message: "Helping cruise passengers make every hour ashore count at Porto Corsini.",
  variantBMessage: "Everything here is built around your time in port at Ravenna.",
  activeVariant: "A" as "A" | "B",
  showDayAshoreSection: true,
} as const;

export function getCruiseTrustMessage(): string {
  if (cruisePositioning.activeVariant === "B") {
    return cruisePositioning.variantBMessage;
  }
  return cruisePositioning.message;
}

export interface DayAshoreItem {
  id: string;
  title: string;
  body: string;
  icon: "clock" | "route" | "walk" | "sunrise" | "viewpoint" | "food";
}

export const dayAshoreIntro =
  "The essential things cruise passengers should know before leaving Porto Corsini.";

export const dayAshoreItems: DayAshoreItem[] = [
  {
    id: "time-in-port",
    title: "Typical time in port",
    body: "Many calls allow around 8–10 hours ashore, but verify your ship schedule and all-aboard time — turnaround days differ.",
    icon: "clock",
  },
  {
    id: "terminal-distance",
    title: "Distance to Ravenna",
    body: "Porto Corsini is ~15 km from the mosaic monuments — about 30 minutes by road, not a walkable cruise-port city.",
    icon: "route",
  },
  {
    id: "walking-level",
    title: "Walking level",
    body: "Ravenna centre is relatively flat; San Marino and San Luca involve sustained inclines. Mosaic sites include historic floors and steps.",
    icon: "walk",
  },
  {
    id: "best-early-stop",
    title: "Best early stop",
    body: "Reach Ravenna early and start with a major mosaic site before coach groups peak indoors.",
    icon: "sunrise",
  },
  {
    id: "do-not-miss",
    title: "Do not miss",
    body: "At least one interior where Byzantine mosaics cover walls and ceilings — San Vitale or the Mausoleum of Galla Placidia if tickets allow.",
    icon: "viewpoint",
  },
  {
    id: "local-flavour",
    title: "Local flavour",
    body: "Emilia-Romagna specialities — piadina, mortadella and fresh pasta — reward a simple lunch in Ravenna or Bologna when time allows.",
    icon: "food",
  },
];

export const returnToShipNote =
  "Partner excursions may advertise return-to-ship arrangements on port-of-call days where applicable — confirm on the live booking page. The post-cruise Venice product is one-way to Piazzale Roma and does not return to the vessel.";
