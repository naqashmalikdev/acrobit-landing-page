import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/offshore-development-center`;
const TITLE = "Offshore Development Center";
const DESCRIPTION =
  "Set up an offshore development center with Acrobit — senior engineers, full accountability, and seamless timezone overlap.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "offshore development center",
    "ODC software",
    "offshore software team",
    "offshore engineering team",
    "dedicated offshore team",
    "nearshore development",
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
