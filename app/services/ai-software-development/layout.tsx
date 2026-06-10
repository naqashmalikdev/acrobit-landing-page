import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/services/ai-software-development`;
const TITLE = "AI Software Development Services";
const DESCRIPTION =
  "Transform your workflows with production-grade AI software. Acrobit builds AI-integrated systems using LLMs, ML pipelines, and intelligent automation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI software development",
    "AI development services",
    "AI engineering agency",
    "LLM integration",
    "ML pipeline development",
    "AI software company",
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
