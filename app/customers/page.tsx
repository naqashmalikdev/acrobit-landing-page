"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactButton from "@/app/components/ContactButton";
import { projects } from "@/app/data/projects";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CustomersHero() {
  const [leftScope, animateLeft] = useAnimate();
  const [rightScope, animateRight] = useAnimate();

  useEffect(() => {
    async function runLeft() {
      await animateLeft("#cursor-left", { x: -40, y: 40, opacity: 0 }, { duration: 0 });
      await animateLeft("#pill-left", { opacity: 0, scale: 0.6 }, { duration: 0 });
      await animateLeft("#ripple-left", { opacity: 0, scale: 0.4 }, { duration: 0 });
      await animateLeft("#cursor-left", { x: 0, y: 0, opacity: 1 }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
      await animateLeft("#cursor-left", { scale: 0.72 }, { duration: 0.12, ease: "easeIn" });
      animateLeft("#cursor-left", { scale: 1 }, { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
      animateLeft("#pill-left", { opacity: 1, scale: 1 }, { duration: 0.35, ease: [0.16, 1, 0.3, 1] });
      await animateLeft("#ripple-left", { opacity: [0.7, 0], scale: [0.4, 1] }, { duration: 0.35, ease: "easeOut" });
      animateLeft("#cursor-left", { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut" });
      animateLeft("#pill-left", { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut" });
    }

    async function runRight() {
      await animateRight("#cursor-right", { x: 40, y: 40, opacity: 0 }, { duration: 0 });
      await animateRight("#pill-right", { opacity: 0, scale: 0.6 }, { duration: 0 });
      await animateRight("#ripple-right", { opacity: 0, scale: 0.4 }, { duration: 0 });
      await new Promise((resolve) => setTimeout(resolve, 300));
      await animateRight("#cursor-right", { x: 0, y: 0, opacity: 1 }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
      await animateRight("#cursor-right", { scale: 0.72 }, { duration: 0.12, ease: "easeIn" });
      animateRight("#cursor-right", { scale: 1 }, { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
      animateRight("#pill-right", { opacity: 1, scale: 1 }, { duration: 0.35, ease: [0.16, 1, 0.3, 1] });
      await animateRight("#ripple-right", { opacity: [0.7, 0], scale: [0.4, 1] }, { duration: 0.35, ease: "easeOut" });
      animateRight("#cursor-right", { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 });
      animateRight("#pill-right", { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 });
    }

    runLeft();
    runRight();
  }, [animateLeft, animateRight]);

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #c0ccee 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.6 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 72% 55% at 50% 38%, #ffffff 38%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[28%] pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)" }} />

      <div ref={leftScope} className="absolute hidden sm:block select-none z-20" style={{ left: "clamp(20px, 6vw, 100px)", top: "clamp(160px, 22vw, 260px)" }}>
        <div id="ripple-left" className="absolute rounded-full bg-[#0048ff]/40 pointer-events-none" style={{ width: 14, height: 14, bottom: -10, right: 4, opacity: 0, transform: "scale(0.4)" }} />
        <div id="pill-left" className="flex items-center gap-2 bg-[#0048ff] rounded-full px-4 py-2.5" style={{ boxShadow: "0 4px 24px rgba(0,72,255,0.35)", opacity: 0 }}>
          <span className="text-xs font-bold text-white whitespace-nowrap">Real Work</span>
        </div>
        <svg id="cursor-left" width="26" height="26" viewBox="0 0 24 24" fill="#0f1c3f" stroke="white" strokeWidth="1.5" strokeLinejoin="round" className="absolute -bottom-5 right-2" style={{ opacity: 0 }}>
          <path d="M4 2l16 9-9 1-4 8z" />
        </svg>
      </div>

      <div ref={rightScope} className="absolute hidden sm:block select-none z-20" style={{ right: "clamp(20px, 6vw, 100px)", top: "clamp(130px, 18vw, 220px)" }}>
        <div id="ripple-right" className="absolute rounded-full bg-[#0048ff]/40 pointer-events-none" style={{ width: 14, height: 14, bottom: -10, left: 6, opacity: 0, transform: "scale(0.4)" }} />
        <div id="pill-right" className="flex items-center gap-2 bg-[#e8eeff] border border-[#0048ff]/20 rounded-full px-4 py-2.5" style={{ boxShadow: "0 4px 24px rgba(0,72,255,0.12)", opacity: 0 }}>
          <span className="w-2 h-2 rounded-full bg-[#0048ff] flex-shrink-0" />
          <span className="text-xs font-bold text-[#0048ff] whitespace-nowrap">60+ Projects Shipped</span>
        </div>
        <svg id="cursor-right" width="26" height="26" viewBox="0 0 24 24" fill="#0f1c3f" stroke="white" strokeWidth="1.5" strokeLinejoin="round" className="absolute -bottom-5 left-3" style={{ opacity: 0 }}>
          <path d="M4 2l16 9-9 1-4 8z" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 pt-20 pb-14 text-center">
        <motion.p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#0048ff] mb-3" style={{ opacity: 0.7 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 0.7, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          / Our Work
        </motion.p>

        <motion.h1 className="font-black text-[#0f1c3f] leading-[1.07] tracking-tight max-w-3xl mb-5" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.09, ease: [0.16, 1, 0.3, 1] }}>
          Real Products.<br />
          <span style={{ color: "#0048ff" }}>Real Results.</span>
        </motion.h1>

        <motion.p className="text-[#6b7280] leading-relaxed max-w-md mb-7" style={{ fontSize: "clamp(0.88rem, 1.2vw, 1rem)" }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
          A look at the products we&apos;ve shipped across AI, healthcare, FinTech, and beyond. Every project here came through a referral.
        </motion.p>

        <motion.div className="flex items-center gap-3 mb-12 flex-wrap justify-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}>
          <a href="#projects" className="inline-flex items-center gap-2 bg-[#0048ff] hover:bg-[#0035cc] transition-colors text-white text-sm font-bold px-7 py-3.5 rounded-full">
            Browse projects
          </a>
          <ContactButton className="w-11 h-11 rounded-full bg-white border border-[#0048ff]/15 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center flex-shrink-0" aria-label="Contact us">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f1c3f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </ContactButton>
        </motion.div>

        <div className="relative w-full max-w-[820px] mx-auto flex justify-center items-start" style={{ minHeight: "260px" }}>
          <motion.div className="absolute bg-white rounded-2xl p-5 w-[240px] sm:w-[270px]" style={{ left: "0%", top: "20px", rotate: "-4deg", zIndex: 10, boxShadow: "0 20px 60px rgba(0,72,255,0.10), 0 4px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(0,72,255,0.08)" }} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-2 opacity-70">Industries</p>
            <p className="text-sm font-bold text-[#0f1c3f] mb-3 leading-snug">Shipped across 18+ verticals, from regulated FinTech to consumer AI.</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {["FinTech", "Healthcare", "AI / LLM", "SaaS"].map((tag) => (
                <span key={tag} className="text-[10px] font-semibold text-[#0048ff] bg-[#e8eeff] rounded-full px-2.5 py-1">{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div className="relative bg-white rounded-2xl p-5 w-[220px] sm:w-[250px] mx-auto" style={{ rotate: "2deg", zIndex: 20, boxShadow: "0 24px 64px rgba(0,72,255,0.13), 0 4px 16px rgba(0,0,0,0.07)", border: "1px solid rgba(0,72,255,0.10)" }} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.57, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-3 opacity-60">By the numbers</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-3xl font-black text-[#0f1c3f]">60</span>
              <span className="text-xs text-[#6b7280] mb-1.5">+ projects</span>
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-xs text-[#6b7280]">4.9 rating</span>
              <span className="w-1 h-1 rounded-full bg-[#0f1c3f]/20" />
              <span className="text-xs text-[#6b7280]">98% on-time</span>
            </div>
            <div className="flex items-center gap-2 bg-[#e8eeff] rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff]" />
              <span className="text-[10px] font-semibold text-[#0048ff]">All via referral</span>
            </div>
          </motion.div>

          <motion.div className="absolute bg-white rounded-2xl p-5 w-[210px] sm:w-[240px]" style={{ right: "0%", top: "20px", rotate: "4deg", zIndex: 10, boxShadow: "0 20px 60px rgba(0,72,255,0.10), 0 4px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(0,72,255,0.08)" }} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-2 opacity-60">Latest feedback</p>
            <p className="text-[11px] font-medium text-[#0f1c3f] leading-relaxed mb-3">&quot;Delivered faster than any agency we&apos;ve worked with, and it actually worked on day one.&quot;</p>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <div className="w-6 h-6 rounded-md bg-[#0048ff] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">JM</div>
              <div>
                <p className="text-[10px] font-semibold text-[#0f1c3f]">James M.</p>
                <p className="text-[9px] text-[#6b7280]">CTO, FinTech startup</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProjectArchive() {
  return (
    <section id="projects" className="px-4 pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-[1350px]">
        <Reveal>
          <div className="mb-8 flex flex-col gap-6 border-y border-gray-100 py-5 md:flex-row md:items-center md:justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
              Project archive
            </p>
            <a href="#contact" className="text-sm font-semibold text-[#0f1c3f] transition-colors hover:text-[#0048ff]">
              Start a project
            </a>
          </div>
        </Reveal>

        <div className="border-t border-gray-300">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.03}>
              <article className="grid gap-8 border-b border-gray-300 py-10 lg:grid-cols-[0.45fr_0.95fr_1fr] lg:gap-12 lg:py-12">
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="font-mono text-[11px] tracking-widest text-gray-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-gray-100" />
                    <span className="text-[10px] font-semibold text-gray-400">{project.year}</span>
                  </div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0048ff]">
                    {project.category}
                  </p>
                  <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#0f1c3f]">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm text-gray-400">
                    {project.industry} / {project.platform}
                  </p>
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="relative block min-h-[240px] overflow-hidden bg-[#f5f8ff] lg:min-h-[330px]"
                >
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-contain p-2 sm:p-3 transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 800px"
                    quality={100}
                    priority={index === 0}
                  />
                </Link>

                <div className="flex flex-col justify-between gap-8">
                  <div>
                    <p className="text-sm leading-relaxed text-gray-500">{project.about}</p>
                    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-gray-100 py-5 sm:grid-cols-4">
                      {project.results.slice(0, 4).map(({ metric, label }) => (
                        <div key={label}>
                          <p className="text-xl font-bold leading-none text-[#0f1c3f]">{metric}</p>
                          <p className="mt-2 text-[10px] leading-snug text-gray-400">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f1c3f] transition-colors hover:text-[#0048ff]"
                    >
                      View case study
                      <ArrowUpRight size={14} strokeWidth={2.4} />
                    </Link>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-[#0048ff]"
                    >
                      Live site
                      <ArrowUpRight size={13} strokeWidth={2.4} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCTA() {
  return (
    <section id="contact" className="border-t border-gray-100 bg-[#f5f8ff] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1350px]">
        <Reveal>
          <div className="grid gap-8 bg-white px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                Next project
              </p>
              <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight text-[#0f1c3f] sm:text-5xl">
                Want to see your product here?
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-500">
                We work with a small number of clients at a time. If the timing is right, let us talk about what we would build together.
              </p>
            </div>
            <ContactButton className="inline-flex w-fit items-center gap-2 bg-[#0048ff] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0035cc]">
              Start a conversation
              <ArrowUpRight size={14} strokeWidth={2.4} />
            </ContactButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function CustomersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <CustomersHero />
      <ProjectArchive />
      <WorkCTA />
      <Footer />
    </main>
  );
}
