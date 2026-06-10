import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/services/ai-poc-mvp`;
const TITLE = "AI POC & MVP Development";
const DESCRIPTION =
  "Validate your AI idea fast. Acrobit ships AI proof-of-concept and MVP projects in weeks, not months.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI MVP development",
    "AI proof of concept",
    "AI POC service",
    "AI prototype development",
    "rapid AI development",
    "AI startup development",
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
