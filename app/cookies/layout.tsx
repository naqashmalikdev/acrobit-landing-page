import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/cookies`;
const TITLE = "Cookie Policy";
const DESCRIPTION =
  "How Acrobit uses cookies and similar technologies on our website.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["Acrobit cookie policy", "cookies", "tracking policy"],
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
