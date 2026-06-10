import type { Metadata } from "next";
import { projects } from "@/app/data/projects";
import { notFound } from "next/navigation";

const BASE_URL = "https://acrobit.io";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const title = project.title;
  const description = `${project.description} Built by Acrobit — senior-only software & AI agency.`;
  const pageUrl = `${BASE_URL}/projects/${slug}`;

  return {
    title,
    description,
    keywords: [
      project.title,
      project.category,
      project.industry,
      project.platform,
      "Acrobit portfolio",
      "software development case study",
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${title} — Acrobit`,
      description,
      url: pageUrl,
      type: "website",
      images: project.src
        ? [{ url: project.src, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      title: `${title} — Acrobit`,
      description,
      images: project.src ? [project.src] : undefined,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
