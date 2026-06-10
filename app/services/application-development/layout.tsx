import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/services/application-development`;
const TITLE = "Custom Application Development";
const DESCRIPTION =
  "Full-cycle custom app development for web and mobile. Senior engineers, fixed-price, 12-month warranty.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "custom application development",
    "software development services",
    "app development agency",
    "web application development",
    "mobile app development",
    "full-cycle software development",
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
