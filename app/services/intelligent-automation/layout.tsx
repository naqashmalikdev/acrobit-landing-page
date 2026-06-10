import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/services/intelligent-automation`;
const TITLE = "Intelligent Automation Services";
const DESCRIPTION =
  "Eliminate manual work with intelligent automation. Acrobit builds RPA, AI-driven workflows, and process automation for enterprises.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "intelligent automation",
    "AI automation services",
    "workflow automation",
    "RPA development",
    "business process automation",
    "enterprise automation",
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
