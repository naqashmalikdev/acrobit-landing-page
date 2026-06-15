import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/components/Providers";

const BASE_URL = "https://acrobit.io";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Acrobit",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Senior-only custom software & AI development agency. Fixed-price, outcome-guaranteed, HIPAA/GDPR compliant.",
  sameAs: [
    "https://twitter.com/acrobit",
    "https://linkedin.com/company/acrobit",
    "https://github.com/acrobit",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Acrobit",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Acrobit — Custom Software & AI Development Agency",
    template: "%s | Acrobit",
  },
  description:
    "Acrobit is a senior-only software & AI development agency. Fixed-price delivery, outcome-guaranteed, HIPAA/GDPR compliant. 200+ projects shipped.",
  keywords: [
    "custom software development",
    "AI development agency",
    "web development agency",
    "software development company",
    "AI software development",
    "mobile app development",
    "Acrobit",
  ],
  authors: [{ name: "Acrobit", url: BASE_URL }],
  creator: "Acrobit",
  publisher: "Acrobit",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "Acrobit",
    locale: "en_US",
    url: BASE_URL,
    title: "Acrobit — Custom Software & AI Development Agency",
    description:
      "Senior-only software & AI agency. Fixed-price, outcome-guaranteed, HIPAA/GDPR compliant. 200+ projects shipped.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@acrobit",
    creator: "@acrobit",
    title: "Acrobit — Custom Software & AI Development Agency",
    description:
      "Senior-only software & AI agency. Fixed-price, outcome-guaranteed, HIPAA/GDPR compliant.",
  },
  icons: {
    icon: [
      { url: "/favicon/apple-touch-icon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
    shortcut: "/favicon/apple-touch-icon.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
