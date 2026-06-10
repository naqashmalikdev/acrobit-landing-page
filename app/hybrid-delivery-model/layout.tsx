import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/hybrid-delivery-model`;
const TITLE = "Hybrid Software Delivery Model";
const DESCRIPTION =
  "Combine onshore and offshore delivery for the best of speed, quality, and cost with Acrobit's hybrid model.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "hybrid software delivery",
    "hybrid development model",
    "onshore offshore team",
    "blended delivery model",
    "hybrid engineering team",
    "flexible software delivery",
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
