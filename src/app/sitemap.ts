import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { absoluteUrl } from "@/lib/paths";
import { getAllExcursionSlugs } from "@/data/excursions";
import { getAllGuideSlugs } from "@/lib/guides";
import { getAllComparisonSlugs } from "@/data/comparisons";
import { getAllPlanningSlugs } from "@/data/planning";
import { getVerifiedMonthKeys } from "@/data/schedules";
import { SCHEDULE_YEARS, portHubPath, portYearPath, portMonthPath } from "@/lib/schedule-utils";
import { guidePath, comparisonPath, planningPath } from "@/lib/routes";

export const dynamic = "force-static";

const PORT_SLUG = "ravenna";
const NOINDEX_PATHS = new Set(["/privacy", "/terms"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    "/",
    "/shore-excursions",
    "/guides",
    "/compare",
    "/ravenna-cruise-port",
    "/cruise-port-guide",
    "/cruise-planner",
    portHubPath(PORT_SLUG),
    "/faq",
    "/enquire",
    "/about",
    "/affiliate-disclosure",
  ];

  const dynamicPages = [
    ...getAllExcursionSlugs().map((s) => `/shore-excursions/${s}`),
    ...new Set(getAllGuideSlugs().map((s) => guidePath(s))),
    ...new Set(getAllComparisonSlugs().map((s) => comparisonPath(s))),
    ...getAllPlanningSlugs().map((s) => planningPath(s)),
    ...SCHEDULE_YEARS.map((y) => portYearPath(PORT_SLUG, y)),
    ...getVerifiedMonthKeys(PORT_SLUG).map((mk) => portMonthPath(PORT_SLUG, mk)),
  ];

  const all = [...staticPages, ...dynamicPages].filter((path) => !NOINDEX_PATHS.has(path));

  return all.map((path) => {
    const url = absoluteUrl(SITE.url, path).replace(/\/?$/, "/");
    return {
      url,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    };
  });
}
