export interface SiteImage {
  src: string;
  alt: string;
  base: string;
}

const B = "/images";

function img(base: string, alt: string): SiteImage {
  return { base, src: `${B}/${base}.jpg`, alt };
}

export const siteImages = {
  hero: img(
    "hero-home",
    "Byzantine apse mosaic inside the Basilica of San Vitale, Ravenna — gateway to shore excursions from Porto Corsini",
  ),
  ogDefault: img(
    "og-default",
    "Ravenna mosaics — shore excursions and cruise-port planning from Porto Corsini",
  ),
  logo: {
    base: "logo-mark",
    src: `${B}/logo-mark.svg`,
    alt: "Ravenna Shore Excursions",
  },
  port: img("cruise-port", "Porto Corsini cruise terminal — Ravenna's Adriatic cruise port"),
} as const;

export const subjectImages: Record<string, SiteImage> = {
  mosaics: img("mosaics", "Byzantine apse mosaic in the Basilica of San Vitale, Ravenna"),
  "san-vitale": img("san-vitale", "Triumphal arch mosaics inside the Basilica of San Vitale, Ravenna"),
  "historic-centre": img("historic-centre", "Piazza del Popolo in Ravenna's historic centre"),
  /** Alias — some data entries still use the shorter "historic" key. */
  historic: img("historic-centre", "Piazza del Popolo in Ravenna's historic centre"),
  "porto-corsini": img("porto-corsini", "Porto Corsini seaport — the cruise terminal for Ravenna calls"),
  "cruise-port": img("cruise-port", "Porto Corsini cruise terminal near Ravenna"),
  bologna: img("bologna", "Piazza Maggiore in Bologna — day trip from Porto Corsini cruise port"),
  walking: img("walking", "Historic porticoes in Bologna, Emilia-Romagna"),
  "san-marino": img("san-marino", "Guaita Fortress towers above San Marino"),
  photography: img("photography", "San Marino's towers and ridge viewpoints"),
  venice: img("venice", "Gondola on the Grand Canal, Venice"),
  coast: img("coast", "Adriatic coastline near Ravenna"),
  compare: img("compare", "Piazza della Libertà, San Marino"),
  food: img("food", "Tortellini in brodo, an Emilia-Romagna speciality near Bologna"),
  family: img("family", "Piazza del Popolo in Ravenna's historic centre"),
  private: img("san-marino", "Private guided walk in San Marino"),
  "hero-home": img("hero-home", "Byzantine apse mosaic in the Basilica of San Vitale, Ravenna"),
};

function pick(key: string): SiteImage {
  return subjectImages[key] ?? siteImages.ogDefault;
}

const excursionImageKeys: Record<string, string> = {
  "post-cruise-ravenna-to-venice": "venice",
  "bologna-from-porto-corsini": "bologna",
  "private-san-marino-from-ravenna": "san-marino",
};

export function getExcursionImage(slug: string): SiteImage {
  return pick(excursionImageKeys[slug] ?? "mosaics");
}

export const excursionsHubImage = pick("bologna");

const highlightImageKeys: Record<string, string> = {
  "bologna-from-porto-corsini-guide": "bologna",
  "san-marino-from-ravenna-guide": "san-marino",
  "post-cruise-venice-from-ravenna": "venice",
};

const comparisonImageKeys: Record<string, string> = {
  "ravenna-or-bologna-from-the-cruise-port": "compare",
  "ravenna-or-san-marino-from-the-cruise-port": "photography",
  "best-ravenna-shore-excursions": "compare",
  "can-you-explore-ravenna-independently": "walking",
};

export function getComparisonImage(slug: string): SiteImage {
  return pick(comparisonImageKeys[slug] ?? "compare");
}

export function getHighlightImage(slug: string): SiteImage {
  return pick(highlightImageKeys[slug] ?? "historic-centre");
}

export function getGuideImage(key: string): SiteImage {
  return pick(key in subjectImages ? key : "historic-centre");
}

export function getHotelImage(_slug: string): SiteImage {
  return pick("historic-centre");
}

export function getTransferImage(_slug: string): SiteImage {
  return pick("coast");
}

export const guidesHubImage = pick("historic-centre");
export const planningHubImage = pick("cruise-port");
