import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/fixed-price-projects`;
const TITLE = "Fixed-Price Software Development";
const DESCRIPTION =
  "No surprise invoices. Acrobit delivers fixed-price software projects with outcome guarantees and 12-month warranties.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "fixed price software development",
    "fixed cost software project",
    "guaranteed delivery",
    "no surprise billing",
    "outcome guaranteed software",
    "fixed scope development",
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
