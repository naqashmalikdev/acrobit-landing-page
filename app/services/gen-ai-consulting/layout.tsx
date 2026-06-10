import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/services/gen-ai-consulting`;
const TITLE = "Generative AI Consulting";
const DESCRIPTION =
  "Get a clear AI strategy in a single engagement. Acrobit's generative AI consultants align your team on what to build and how.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "generative AI consulting",
    "AI strategy consulting",
    "GenAI advisory",
    "AI transformation consulting",
    "LLM consulting",
    "enterprise AI consulting",
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
