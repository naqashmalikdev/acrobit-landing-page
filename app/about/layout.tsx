import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/about`;
const TITLE = "About Acrobit — Senior-Only Software Agency";
const DESCRIPTION =
  "Learn how Acrobit became a senior-only, outcome-guaranteed software & AI agency with 200+ projects and 98% client satisfaction.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Acrobit",
    "about Acrobit",
    "software agency",
    "senior software engineers",
    "AI development company",
    "outcome guaranteed agency",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
