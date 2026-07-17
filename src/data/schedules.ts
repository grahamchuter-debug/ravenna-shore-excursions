import type { ScheduleEntry, ShipSchedulePort } from "./types";
import {
  filterEntriesByMonth,
  filterEntriesByYear,
  getMonthsWithEntries,
  type ScheduleYear,
} from "@/lib/schedule-utils";
import ravennaSchedule from "./imported-schedules/ravenna.json";

const SCHEDULE_FAQS = [
  {
    question: "How accurate are Ravenna / Porto Corsini cruise schedules?",
    answer:
    "These listings support planning only. Ships, times, berths and call types change — confirm with your cruise line before booking excursions or flights.",
  },
  {
    question: "Where do cruise ships berth at Ravenna?",
    answer:
      "At Porto Corsini on the Adriatic coast, not in Ravenna's historic centre. Terminal details may vary by call.",
  },
  {
    question: "Is a Porto Corsini call long enough for Bologna or San Marino?",
    answer:
      "A typical 8–10 hour port window can suit partner full-day excursions when traffic cooperates. Short calls are better focused on Ravenna itself.",
  },
];

const SCHEDULE_TIPS = [
  "Confirm all-aboard time rather than relying only on published departure",
  "Remember the terminal is ~30 minutes from Ravenna — build transfers into every plan",
  "Post-cruise Venice products are for disembarkation, not same-day return",
  "Verify whether your call is port of call, embarkation or disembarkation before booking",
];

export const SCHEDULE_YEARS = [2026, 2027] as const;

export const schedulePorts: ShipSchedulePort[] = [
  {
    slug: "ravenna",
    name: "Ravenna (Porto Corsini)",
    country: "Italy",
    seoTitle: "Ravenna Cruise Ship Schedule — Porto Corsini Port Calls",
    metaDescription:
      "Sample Ravenna / Porto Corsini cruise ship schedule for 2026 and 2027 planning — confirm all calls with your cruise line before booking.",
    intro:
      "Ravenna cruise calls use Porto Corsini on the Adriatic coast. The city's mosaic monuments sit inland, while partner excursions reach Bologna, San Marino and post-cruise Venice.",
    description:
      "Byzantine mosaics, Emilia-Romagna gateways and Adriatic turnaround port — plan around road time from Porto Corsini, not the city centre pier.",
    scheduleOverview:
      "Ravenna appears on Mediterranean, Adriatic and repositioning routes, with concentrations in spring and autumn. Sample entries below mix port calls and turnaround types — verify each one.",
    planningTips: SCHEDULE_TIPS,
    faqs: SCHEDULE_FAQS,
  },
];

const scheduleData: Record<string, ScheduleEntry[]> = {
  ravenna: ravennaSchedule as ScheduleEntry[],
};

export function getSchedulePortBySlug(slug: string): ShipSchedulePort | undefined {
  return schedulePorts.find((port) => port.slug === slug);
}

export function getAllSchedulePortSlugs(): string[] {
  return schedulePorts.map((port) => port.slug);
}

export function getScheduleEntries(slug: string): ScheduleEntry[] {
  return scheduleData[slug] ?? [];
}

export function getScheduleEntryCount(slug: string): number {
  return getScheduleEntries(slug).length;
}

export function getScheduleEntriesForYear(slug: string, year: ScheduleYear): ScheduleEntry[] {
  return filterEntriesByYear(getScheduleEntries(slug), year);
}

export function getScheduleEntriesForMonth(slug: string, monthKey: string): ScheduleEntry[] {
  return filterEntriesByMonth(getScheduleEntries(slug), monthKey);
}

export function getVerifiedMonthKeys(slug: string): string[] {
  return getMonthsWithEntries(getScheduleEntries(slug));
}

export function searchSchedulesByShip(query: string): { portSlug: string; entries: ScheduleEntry[] }[] {
  const normalised = query.toLowerCase().trim();
  if (!normalised) return [];

  return schedulePorts
    .map((port) => ({
      portSlug: port.slug,
      entries: getScheduleEntries(port.slug).filter(
        (entry) =>
          entry.ship.toLowerCase().includes(normalised) ||
          entry.cruiseLine.toLowerCase().includes(normalised),
      ),
    }))
    .filter((result) => result.entries.length > 0);
}

export function getTodayTomorrowEntries(slug: string): {
  today: ScheduleEntry[];
  tomorrow: ScheduleEntry[];
} {
  const entries = getScheduleEntries(slug);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateKey = (date: Date) => date.toISOString().slice(0, 10);

  return {
    today: entries.filter((entry) => entry.date === dateKey(today)),
    tomorrow: entries.filter((entry) => entry.date === dateKey(tomorrow)),
  };
}
