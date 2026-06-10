import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/services/technical-feasibility-study`;
const TITLE = "Technical Feasibility Study";
const DESCRIPTION =
  "Validate your software idea before you invest. Acrobit delivers detailed technical feasibility studies for startups and enterprises.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "technical feasibility study",
    "software feasibility analysis",
    "technology assessment",
    "technical due diligence",
    "software viability study",
    "tech stack assessment",
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
