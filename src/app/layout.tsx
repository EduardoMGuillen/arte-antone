import type { Metadata } from "next";
import { Fraunces, Nunito, Great_Vibes } from "next/font/google";
import { StoreProvider } from "@/components/store/StoreProvider";
import CartDrawer from "@/components/store/CartDrawer";
import CheckoutModal from "@/components/store/CheckoutModal";
import SearchOverlay from "@/components/store/SearchOverlay";
import Toaster from "@/components/store/Toaster";
import {
  BRAND,
  BRAND_TAGLINE,
  CATEGORIES,
  CONTACT,
  INSTAGRAM_URL,
  MAP_COORDS,
  SITE_URL,
} from "@/lib/constants";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const title = `${BRAND} | Tableros para bebé y recuerdos personalizados en Honduras`;
const description =
  "Arte Antone crea tableros de nacimiento, nombres decorativos, recuerditos de cumpleaños y baby shower en MDF, personalizados y pintados a mano en Cofradía, Cortés. Envíos a todo Honduras.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: BRAND,
  category: "shopping",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: BRAND,
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: `${BRAND} — ${BRAND_TAGLINE}` },
      { url: "/logo.png", width: 900, height: 900, alt: `${BRAND} logo` },
    ],
    type: "website",
    locale: "es_HN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  keywords: [
    "tableros para bebé",
    "tablero de nacimiento Honduras",
    "recuerditos de cumpleaños",
    "recuerdos baby shower Honduras",
    "nombres decorativos MDF",
    "regalos personalizados San Pedro Sula",
    "Cofradía Cortés",
    "Arte Antone",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteOrigin = SITE_URL.replace(/\/$/, "");
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": ["Store", "LocalBusiness"],
    "@id": `${siteOrigin}/#negocio`,
    name: BRAND,
    description,
    slogan: BRAND_TAGLINE,
    url: SITE_URL,
    logo: `${siteOrigin}/logo.png`,
    image: `${siteOrigin}/og.png`,
    sameAs: [INSTAGRAM_URL],
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cofradía",
      addressRegion: "Cortés",
      addressCountry: "HN",
    },
    geo: { "@type": "GeoCoordinates", latitude: MAP_COORDS.lat, longitude: MAP_COORDS.lng },
    areaServed: { "@type": "Country", name: "Honduras" },
    currenciesAccepted: "HNL",
    openingHours: "Mo-Sa 08:00-18:00",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Catálogo ${BRAND}`,
      itemListElement: CATEGORIES.map((c) => ({ "@type": "OfferCatalog", name: c.label })),
    },
  };

  return (
    <html lang="es" className={`${display.variable} ${sans.variable} ${script.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink antialiased">
        <StoreProvider>
          {children}
          <CartDrawer />
          <CheckoutModal />
          <SearchOverlay />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
