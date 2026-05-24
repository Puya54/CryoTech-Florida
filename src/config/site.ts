// src/config/site.ts
export const siteConfig = {
  name: "CryoTech Florida",
  url: (() => {
    let siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cryotechflorida.com";
    if (siteUrl && !siteUrl.startsWith("http://") && !siteUrl.startsWith("https://")) {
      siteUrl = `https://${siteUrl}`;
    }
    return siteUrl;
  })(),

  phone: {
    display: "(305) 555-0100",
    href: "tel:+13055550100",
  },
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "13055550100",
    messageEn: "Hi! I need HVAC/refrigeration service in Miami.",
    messageEs: "Hola! Necesito servicio de refrigeración/HVAC en Miami.",
  },
  email: "info@cryotechflorida.com",

  address: {
    street: "1234 NW 36th St",
    city: "Miami",
    state: "FL",
    zip: "33142",
    county: "Miami-Dade",
    country: "US",
    display: "1234 NW 36th St, Miami, FL 33142",
  },
  coordinates: {
    lat: 25.8103,
    lng: -80.2289,
  },

  googleMapsKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "",
  webhookUrl: process.env.WEBHOOK_URL ?? "",

  social: {
    instagram: "https://instagram.com/cryotechflorida",
    facebook: "https://facebook.com/cryotechflorida",
    google: "https://g.page/cryotechflorida",
  },

  license: "Miami-Dade County CAC License #XXXXXXXX",
  certifications: ["EPA 608 Certified", "NATE Certified", "ACCA Member"],

  aggregateRating: {
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
  },
} as const;
