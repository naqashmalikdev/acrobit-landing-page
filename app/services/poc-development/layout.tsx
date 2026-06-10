import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/services/poc-development`;
const TITLE = "Proof of Concept Development";
const DESCRIPTION =
  "Turn product vision into a working proof of concept in weeks. Acrobit builds fast, lean POCs that validate your idea before full investment.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "proof of concept development",
    "POC software development",
    "software POC service",
    "rapid prototyping",
    "idea validation development",
    "POC agency",
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
