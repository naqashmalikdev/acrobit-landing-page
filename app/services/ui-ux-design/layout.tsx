import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/services/ui-ux-design`;
const TITLE = "UI/UX Design Services";
const DESCRIPTION =
  "User-centered UX/UI design that turns visitors into customers. End-to-end design from discovery to delivery.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "UI UX design agency",
    "UX design services",
    "product design agency",
    "user interface design",
    "user experience design",
    "SaaS UX design",
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
