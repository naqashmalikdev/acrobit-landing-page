import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/dedicated-teams`;
const TITLE = "Dedicated Software Development Teams";
const DESCRIPTION =
  "Hire a dedicated team of senior software engineers from Acrobit. Fully integrated, fully accountable, no ramp-up.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "dedicated software development team",
    "dedicated dev team",
    "hire software team",
    "staff augmentation",
    "dedicated engineering team",
    "extended software team",
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
