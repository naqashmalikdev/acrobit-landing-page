import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/privacy`;
const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Acrobit collects, uses, and protects your personal data. GDPR and privacy-first practices.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["Acrobit privacy policy", "data protection", "GDPR compliance"],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: false },
  openGraph: {
    title: `${TITLE} — Acrobit`,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
