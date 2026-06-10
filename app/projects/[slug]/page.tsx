"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/app/data/projects";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const TECH_ICON_MAP: Record<string, string> = {
  "next.js": "/icons/next js.webp",
  react: "/icons/react.svg",
  "node.js": "/icons/node js.png",
  typescript: "/icons/typescript.svg",
  "tailwind css": "/icons/tailwind.webp",
  tailwind: "/icons/tailwind.webp",
  postgresql: "/icons/postgresql.webp",
  mongodb: "/icons/mongo.svg",
  redis: "/icons/redis.svg",
  aws: "/icons/aws.svg",
  "aws lambda": "/icons/Lambda.png",
  cdn: "/icons/cdn.png",
  docker: "/icons/Docker.svg",
  terraform: "/icons/HashiCorp-Terraform.svg",
  fastapi: "/icons/fast api.png",
  openai: "/icons/open ai.webp",
  "openai api": "/icons/open ai.webp",
  "openai whisper": "/icons/open ai whisper.png",
  whisper: "/icons/open ai whisper.png",
  "gpt-4": "/icons/gpt4.png",
  "openai gpt-4": "/icons/gpt4.png",
  langchain: "/icons/langchain.webp",
  supabase: "/icons/supabase.webp",
  vercel: "/icons/vercel.png",
  "socket.io": "/icons/Socket.io.png",
  websockets: "/icons/sockets.png",
  "hl7 fhir": "/icons/hl7.svg",
  python: "/icons/python.svg",
  "chart.js": "/icons/chartjs.svg",
  "stripe connect": "/icons/stripeconnect.jpeg",
  mux: "/icons/mux.jpeg",
  hls: "/icons/hls.svg",
  "framer motion": "/icons/framer-motion.png",
  pinecone: "/icons/pinecone.svg",
  "groq api": "/icons/grok.svg",
  webrtc: "/icons/webrtc.png",
  appwrite: "/icons/appwrite.svg",
  "appwrite storage": "/icons/appwrite.svg",
  "appwrite auth": "/icons/appwrite.svg",
};

function normalizeTechName(name: string) {
  return name.trim().toLowerCase();
}

function getTechIcon(name: string) {
  return TECH_ICON_MAP[normalizeTechName(name)] ?? null;
}

function uniqueTech(items: string[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = getTechIcon(item) ?? normalizeTechName(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-medium leading-[1.05] tracking-tight text-[#0f1c3f] sm:text-5xl">
        {title}
      </h2>
      {body && <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-gray-500">{body}</p>}
    </div>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const others = projects.filter((item) => item.slug !== slug).slice(0, 3);
  const totalTeam = project.team.reduce((sum, item) => sum + item.count, 0);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="px-4 pt-16 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                {project.category}
              </p>
              <h1 className="max-w-4xl text-5xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-500">
                {project.description}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 border-y border-gray-200 lg:mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                { label: "Industry", value: project.industry },
                { label: "Platform", value: project.platform },
                { label: "Year", value: project.year },
              ].map(({ label, value }) => (
                <div key={label} className="border-r border-gray-100 px-4 py-5 last:border-r-0">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                    {label}
                  </p>
                  <p className="text-sm font-semibold leading-snug text-[#0f1c3f]">{value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative mt-12 min-h-[320px] overflow-hidden bg-[#f5f8ff] sm:min-h-[520px]"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.src}
              alt={project.title}
              fill
              className="object-contain p-2 sm:p-5"
              priority
              sizes="(max-width: 768px) 100vw, 1350px"
              quality={100}
            />
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-[1350px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <SectionHeader eyebrow="/ Overview" title="About the project." />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-gray-500">{project.about}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0f1c3f] transition-colors hover:text-[#0048ff]"
            >
              Visit live site
              <ArrowUpRight size={14} strokeWidth={2.4} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-[#f5f8ff] px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-[1350px] grid-cols-2 divide-x divide-y divide-gray-200 md:grid-cols-4 md:divide-y-0">
          {project.results.map(({ metric, label }, index) => (
            <Reveal key={label} delay={index * 0.05}>
              <div className="px-5 py-7 text-center">
                <p className="text-3xl font-bold leading-none tracking-tight text-[#0f1c3f] sm:text-4xl">
                  {metric}
                </p>
                <p className="mt-3 text-[11px] leading-snug text-gray-500">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-[1350px] border-t border-gray-200">
          {[
            { eyebrow: "/ Challenge", title: "The problem we had to solve.", body: project.challenge },
            { eyebrow: "/ Solution", title: "How we turned it into a working product.", body: project.solution },
          ].map((item, index) => (
            <Reveal key={item.eyebrow} delay={index * 0.08}>
              <div className="grid gap-8 border-b border-gray-200 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                <SectionHeader eyebrow={item.eyebrow} title={item.title} />
                <p className="text-base leading-relaxed text-gray-500">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto grid max-w-[1350px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <SectionHeader
              eyebrow="/ Technology"
              title="Stack behind the build."
              body="The tools and platforms used to ship the product, grouped by responsibility."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-8">
              {project.techStack.map(({ category, items }) => (
                <div key={category} className="border-t border-gray-100 pt-5">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {uniqueTech(items).map((item) => {
                      const icon = getTechIcon(item);
                      return (
                        <span
                          key={item}
                          className="inline-flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500"
                        >
                          {icon && (
                            <span className="relative h-5 w-5 overflow-hidden">
                              <Image src={icon} alt={item} fill className="object-contain" sizes="20px" />
                            </span>
                          )}
                          {item.replace("Appwrite Storage", "Appwrite").replace("Appwrite Auth", "Appwrite")}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-[#f5f8ff] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-[1350px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <SectionHeader
              eyebrow="/ Team"
              title="The delivery team."
              body={`${totalTeam} specialists contributed across delivery, engineering, design, infrastructure, and QA.`}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-t border-gray-200 bg-white">
              {project.team.map(({ role, count }) => (
                <div key={role} className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
                  <span className="text-sm font-semibold text-[#0f1c3f]">{role}</span>
                  <span className="font-mono text-sm text-[#0048ff]">{String(count).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-[1350px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <SectionHeader
              eyebrow="/ Goals"
              title={project.goals.title}
              body={project.goals.body}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-t border-gray-200">
              {project.highlights.map(({ heading, body }, index) => (
                <div key={heading} className="grid gap-5 border-b border-gray-200 py-7 sm:grid-cols-[80px_1fr]">
                  <span className="font-mono text-[11px] tracking-widest text-gray-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-3 text-xl font-semibold tracking-tight text-[#0f1c3f]">{heading}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-[1350px]">
          <div className="mb-8 flex items-end justify-between gap-6">
            <SectionHeader eyebrow="/ More work" title="Other projects." />
            <Link
              href="/#projects"
              className="hidden text-sm font-semibold text-[#0f1c3f] transition-colors hover:text-[#0048ff] sm:inline-flex"
            >
              Back to projects
            </Link>
          </div>
          <div className="border-t border-gray-200">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="group flex items-center justify-between gap-5 border-b border-gray-200 py-6"
              >
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0048ff]">
                    {item.category}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight text-[#0f1c3f]">{item.title}</h3>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors group-hover:border-[#0048ff] group-hover:bg-[#0048ff] group-hover:text-white">
                  <ArrowUpRight size={15} strokeWidth={2.4} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
