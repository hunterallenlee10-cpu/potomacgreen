// Titles, descriptions and JSON-LD. Only true things: no ratings, reviews, prices or awards.
import { business, services } from "./business";
import { faqs } from "./faq";
import { absolute } from "./site";

export const pages = {
  home: {
    path: "/",
    title: "Landscaping & Handyman in Potomac, MD | Potomac Green",
    description:
      "Landscaping and light handyman help in Potomac, Bethesda, Rockville and Silver Spring, MD. Mulch, planting, hedges, assembly and moving. Text photos for an estimate.",
  },
  contact: {
    path: "/contact",
    title: "Contact Potomac Green | Landscaping in Potomac, MD",
    description:
      "Contact Potomac Green for landscaping and handyman help in Potomac, Bethesda, Rockville and Silver Spring. Call, text or WhatsApp 301-674-9361 with photos of the job.",
  },
} as const;

const businessId = absolute("/#business");

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: business.name,
    description: business.lines.oneContact,
    url: absolute("/"),
    telephone: business.phone.schema,
    email: business.email,
    logo: absolute("/images/00-logo-2-logo-site-icon-512.png"),
    image: absolute("/og-image.png"),
    foundingDate: business.established,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: business.hours.days.map((d) => `https://schema.org/${d}`),
        opens: business.hours.opens,
        closes: business.hours.closes,
      },
    ],
    areaServed: business.towns.map((t) => ({
      "@type": "City",
      name: `${t}, ${business.stateShort}`,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${business.county}, ${business.state}`,
      },
    })),
    knowsAbout: services.map((s) => s.name),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phone.schema,
      email: business.email,
      contactType: "customer service",
      areaServed: "US-MD",
      availableLanguage: "English",
    },
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      "@id": absolute(`/#${s.id}`),
      name: s.name,
      serviceType: s.name,
      description: s.description,
      url: absolute(`/#${s.id}`),
      provider: { "@id": businessId },
      areaServed: business.towns.map((t) => ({ "@type": "City", name: `${t}, ${business.stateShort}` })),
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function contactBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
      { "@type": "ListItem", position: 2, name: "Contact", item: absolute("/contact") },
    ],
  };
}
