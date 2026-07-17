import type { Metadata } from "next";
import { SITE } from "./site";
import { absoluteUrl } from "./paths";
import {
  siteImages,
  getExcursionImage,
  getHotelImage,
  getTransferImage,
  getHighlightImage,
  getGuideImage,
  getComparisonImage,
} from "./images";
import { guidePath, comparisonPath, planningPath } from "./routes";

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
}

export function fullTitle(title: string, path: string): string {
  return path === "/" ? title : `${title} | ${SITE.name}`;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
  imageAlt,
  noindex = false,
}: PageSEO): Metadata {
  const url = absoluteUrl(SITE.url, path);
  const ogTitle = fullTitle(title, path);
  const ogImage = image ?? siteImages.ogDefault.src;
  const ogImageAlt = imageAlt ?? siteImages.ogDefault.alt;

  return {
    title: path === "/" ? { absolute: ogTitle } : title,
    description,
    keywords: [
      "Ravenna shore excursions",
      "Porto Corsini cruise port",
      "Ravenna cruise excursions",
      "Bologna from Ravenna cruise",
      "San Marino from Ravenna cruise",
      "Ravenna cruise schedule",
      ...keywords,
    ],
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: ogTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export function excursionPageMetadata(slug: string, title: string, description: string) {
  const image = getExcursionImage(slug);
  return buildMetadata({
    title,
    description,
    path: `/shore-excursions/${slug}`,
    image: image?.src,
    imageAlt: image?.alt,
  });
}

export function hotelPageMetadata(slug: string, title: string, description: string) {
  const image = getHotelImage(slug);
  return buildMetadata({
    title,
    description,
    path: planningPath(slug),
    image: image?.src,
    imageAlt: image?.alt,
  });
}

export function transferPageMetadata(slug: string, title: string, description: string) {
  const image = getTransferImage(slug);
  return buildMetadata({
    title,
    description,
    path: planningPath(slug),
    image: image?.src,
    imageAlt: image?.alt,
  });
}

export function highlightPageMetadata(slug: string, title: string, description: string) {
  const image = getHighlightImage(slug);
  return buildMetadata({
    title,
    description,
    path: `/guides/${slug}`,
    image: image?.src,
    imageAlt: image?.alt,
  });
}

export function guidePageMetadata(_hubPath: string, slug: string, title: string, description: string, imageKey: string) {
  const image = getGuideImage(imageKey);
  return buildMetadata({
    title,
    description,
    path: guidePath(slug),
    image: image?.src,
    imageAlt: image?.alt,
  });
}

export function comparisonPageMetadata(slug: string, title: string, description: string) {
  const image = getComparisonImage(slug);
  return buildMetadata({
    title,
    description,
    path: comparisonPath(slug),
    image: image?.src,
    imageAlt: image?.alt,
  });
}

export function planningPageMetadata(slug: string, title: string, description: string, imageKey: string) {
  const image = getGuideImage(imageKey);
  return buildMetadata({
    title,
    description,
    path: planningPath(slug),
    image: image?.src,
    imageAlt: image?.alt,
  });
}

/** @deprecated use highlightPageMetadata */
export function attractionPageMetadata(slug: string, title: string, description: string) {
  return highlightPageMetadata(slug, title, description);
}
