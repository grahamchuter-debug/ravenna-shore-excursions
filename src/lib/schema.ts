import { SITE } from "./site";
import { absoluteUrl } from "./paths";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(SITE.url, item.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function travelGuideSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    name: title,
    description,
    url: absoluteUrl(SITE.url, path),
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    inLanguage: "en-GB",
  };
}

export function articleSchema({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(SITE.url, path),
    ...(image ? { image: absoluteUrl(SITE.url, image) } : {}),
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    inLanguage: "en-GB",
  };
}

/** TravelAgency for the Ravenna / Porto Corsini cruise planning brand. */
export function travelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    areaServed: [
      {
        "@type": "City",
        name: "Ravenna",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ravenna",
          addressRegion: "Emilia-Romagna",
          addressCountry: "IT",
        },
      },
    ],
    knowsAbout: [
      "Ravenna shore excursions",
      "Porto Corsini cruise port",
      "Bologna from Ravenna cruise port",
      "San Marino from Ravenna cruise port",
      "Post-cruise Venice transfer",
      "Ravenna cruise ship schedule",
      "Ravenna mosaics",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE.email,
      contactType: "customer service",
      areaServed: "IT",
      availableLanguage: ["English", "Italian"],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE.email,
      contactType: "customer service",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "en-GB",
  };
}

export function webPageSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(SITE.url, path),
  };
}
