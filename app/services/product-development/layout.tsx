import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/services/product-development`;
const TITLE = "Product Development Services";
const DESCRIPTION =
  "Build revenue-driving software products with Acrobit — discovery, design, development, and launch in one fixed-price engagement.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "product development services",
    "software product development",
    "build software product",
    "end-to-end product development",
    "SaaS product development",
    "digital product agency",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${TITLE} — Acrobit`,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    title: `${TITLE} — Acrobit`,
    description: DESCRIPTION,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
