import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/ai-first`;
const TITLE = "AI-First Software Development";
const DESCRIPTION =
  "Acrobit builds software with AI at the core — not as an add-on. Every project leverages LLMs, automation, and intelligent data pipelines.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI-first software development",
    "AI native software",
    "artificial intelligence software agency",
    "LLM-powered software",
    "AI driven development",
    "intelligent software systems",
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
