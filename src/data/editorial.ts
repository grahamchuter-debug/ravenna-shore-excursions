import type { EditorialCategory } from "./types";

export interface EditorialCategoryDef {
  id: EditorialCategory;
  label: string;
  shortLabel: string;
  description: string;
}

export const EDITORIAL_CATEGORIES: EditorialCategoryDef[] = [
  { id: "editors-choice", label: "Editor's Choice", shortLabel: "Editor's Choice", description: "Our strongest overall choice for a well-timed Porto Corsini port day." },
  { id: "best-historic", label: "Best Historic Experience", shortLabel: "Historic", description: "Ravenna's mosaics and early Christian monuments." },
  { id: "best-independent", label: "Best Independent Experience", shortLabel: "Independent", description: "A realistic self-guided Ravenna day once transfer time is accounted for." },
  { id: "best-coastal", label: "Best City Escape", shortLabel: "City Escape", description: "Bologna porticoes and San Luca from the cruise terminal." },
  { id: "best-view", label: "Best Views", shortLabel: "Views", description: "San Marino towers and Adriatic panoramas." },
  { id: "best-got", label: "Signature Experience", shortLabel: "Signature", description: "Future curated Ravenna-area products — not yet bookable." },
  { id: "best-families", label: "Best for Families", shortLabel: "Families", description: "Flexible Ravenna and Bologna options with manageable walking." },
  { id: "best-photography", label: "Best Photography", shortLabel: "Photography", description: "Mosaic interiors and San Marino ridge viewpoints." },
  { id: "best-food", label: "Best Food & Wine", shortLabel: "Food & Wine", description: "Emilia-Romagna flavours in Ravenna and Bologna." },
  { id: "best-luxury", label: "Best Private Tour", shortLabel: "Private", description: "Private San Marino pacing for one party." },
  { id: "hidden-gem", label: "Hidden Gem", shortLabel: "Hidden Gem", description: "Quieter mosaic sites beyond the headline basilicas." },
  { id: "best-value", label: "Best Value", shortLabel: "Best Value", description: "A rewarding port day without unnecessary complexity." },
  { id: "best-short-port", label: "Best Short Port Call", shortLabel: "Short Port", description: "Focused Ravenna mosaic routing when hours are limited." },
];

export interface EditorsCollectionItem {
  id: string;
  emoji: string;
  label: string;
  description: string;
  href: string;
  cta: string;
  signature?: boolean;
  comingSoon?: boolean;
}

export const editorsCollectionItems: EditorsCollectionItem[] = [
  {
    id: "post-cruise-venice",
    emoji: "🛶",
    label: "Best Post-Cruise Transfer",
    description: "Post-cruise Venice from Porto Corsini — gondola, water taxi and St Mark's ending at Piazzale Roma.",
    href: "/shore-excursions/post-cruise-ravenna-to-venice",
    cta: "See post-cruise Venice",
  },
  {
    id: "first-time",
    emoji: "✨",
    label: "Best First-Time Ravenna Day",
    description: "Things to do in Ravenna from a cruise — mosaic routing with honest transfer time from Porto Corsini.",
    href: "/things-to-do-in-ravenna-from-a-cruise",
    cta: "Plan Ravenna",
  },
  {
    id: "culture",
    emoji: "🏛️",
    label: "Best Culture Escape",
    description: "Bologna from Porto Corsini — San Luca walk, historic centre and free time in Emilia-Romagna's capital.",
    href: "/shore-excursions/bologna-from-porto-corsini",
    cta: "Explore Bologna",
  },
  {
    id: "private",
    emoji: "🏰",
    label: "Best Private Experience",
    description: "Private San Marino — medieval towers, tastings and flexible hill-town pacing.",
    href: "/shore-excursions/private-san-marino-from-ravenna",
    cta: "View private tour",
  },
  {
    id: "mosaics",
    emoji: "🕌",
    label: "Best Mosaic Deep-Dive",
    description: "Ravenna mosaics guide — which monuments to prioritise on a single port day.",
    href: "/ravenna-mosaics-guide",
    cta: "Read mosaic guide",
  },
  {
    id: "compare",
    emoji: "⚖️",
    label: "Best Comparison Start",
    description: "Ravenna or Bologna from the cruise port — compare road time, walking and what each day feels like.",
    href: "/ravenna-or-bologna-from-the-cruise-port",
    cta: "Compare options",
  },
  {
    id: "independent",
    emoji: "🚶",
    label: "Best Independent Day",
    description: "One day in Ravenna — sequencing mosaics, lunch and return transfer to Porto Corsini.",
    href: "/one-day-in-ravenna",
    cta: "Use the day plan",
  },
  {
    id: "port-guide",
    emoji: "⚓",
    label: "Essential Port Read",
    description: "Porto Corsini cruise terminal guide — distance to Ravenna, taxis and return buffers.",
    href: "/cruise-port-guide",
    cta: "Read port guide",
  },
];

export function getEditorialLabel(id: EditorialCategory): string {
  return EDITORIAL_CATEGORIES.find((category) => category.id === id)?.label ?? id;
}
