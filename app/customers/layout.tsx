import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/customers`;
const TITLE = "Customer Stories";
const DESCRIPTION =
  "See how Acrobit has helped 200+ companies ship better software. Real products, real results, and measurable outcomes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Acrobit reviews",
    "software development case studies",
    "client success stories",
    "Acrobit portfolio",
    "software agency testimonials",
    "client results",
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
