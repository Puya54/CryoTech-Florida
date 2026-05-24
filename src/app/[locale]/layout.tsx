import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import ChatBot from "@/components/chat/ChatBot";
import WelcomeModal from "@/components/WelcomeModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyCTABar from "@/components/StickyCTABar";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: {
      default: isEs
        ? "CryoTech Florida — Expertos en AC y Refrigeración en Miami"
        : "CryoTech Florida — Miami AC & Refrigeration Experts",
      template: "%s | CryoTech Florida",
    },
    description: isEs
      ? "Reparación de AC y refrigeración residencial, comercial y automotriz en Miami-Dade. Técnicos certificados. Servicio de emergencia 24/7."
      : "Residential, commercial & automotive AC repair and refrigeration in Miami-Dade. Certified technicians. 24/7 emergency service.",
    keywords: isEs
      ? ["reparación AC Miami", "refrigeración comercial Miami", "aire acondicionado automotriz Miami", "HVAC Miami-Dade"]
      : ["AC repair Miami", "commercial refrigeration Miami", "automotive AC Miami", "HVAC Miami-Dade", "air conditioning repair"],
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_US" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: siteConfig.name,
    description: "Residential, commercial & automotive AC and refrigeration repair, installation and maintenance in Miami-Dade County.",
    url: siteConfig.url,
    telephone: siteConfig.phone.href.replace("tel:", ""),
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Miami-Dade County",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.aggregateRating.ratingValue,
      reviewCount: siteConfig.aggregateRating.reviewCount,
      bestRating: siteConfig.aggregateRating.bestRating,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    serviceType: ["HVAC Repair", "Commercial Refrigeration", "Automotive AC", "Air Conditioning Installation"],
    knowsAbout: ["Air Conditioning", "Refrigeration", "HVAC", "Automotive AC", "Walk-in Coolers", "Miami HVAC"],
    priceRange: "$$"
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you offer emergency AC repair in Miami?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer 24/7 emergency AC and refrigeration repair across all of Miami-Dade County with same-day service available."
        }
      },
      {
        "@type": "Question",
        name: "Do you repair commercial walk-in freezers and coolers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we specialize in commercial refrigeration including walk-in freezers, coolers, and large-scale HVAC/R contracts for restaurants and businesses."
        }
      },
      {
        "@type": "Question",
        name: "What type of car AC refrigerants do you service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide complete automotive AC repair and recharge services for both R-134a and the newer R-1234yf refrigerant systems."
        }
      }
    ]
  }
];

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <StickyCTABar />
        <WelcomeModal />
        <ExitIntentPopup />
        <WhatsAppButton />
        <ChatBot />
      </body>
    </html>
  );
}
