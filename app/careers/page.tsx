"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, useAnimate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactButton from "@/app/components/ContactButton";

function Reveal({
  children, delay = 0, className = "", y = 24,
}: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

// Seeded once at module level so the pattern is stable across re-renders
const GRID_CELLS: string[] = Array.from({ length: 60 }, () => {
  const filled = Math.random() > 0.42;
  return filled ? `rgba(0,72,255,${(0.12 + Math.random() * 0.68).toFixed(2)})` : "#e8eeff";
});

const perks = [
  {
    num: "01",
    title: "Fully remote & async",
    body: "Work from anywhere. We communicate with intention — no pointless standups, no Slack anxiety.",
  },
  {
    num: "02",
    title: "Work on real products",
    body: "Every project ships. You'll build things people actually use, across industries that matter.",
  },
  {
    num: "03",
    title: "Small team, big ownership",
    body: "No org chart bureaucracy. Your decisions shape the product, the process, and the culture.",
  },
  {
    num: "04",
    title: "AI-first environment",
    body: "We use AI tools seriously. You'll work at the edge of what's possible — not with yesterday's stack.",
  },
];

function CareersHero() {
  // Separate animate scopes for left and right pill+cursor groups
  const [leftScope,  animateLeft]  = useAnimate();
  const [rightScope, animateRight] = useAnimate();

  useEffect(() => {
    // ── Left side sequence ──────────────────────────────────────────
    // t=0    cursor slides in from bottom-left off-screen
    // t=0.55 cursor clicks (scale down)
    // t=0.72 cursor releases + pill pops in
    // t=0.9  ripple ring expands and fades
    // t=1.1+ idle bob loop starts
    async function runLeft() {
      // Start cursor off-screen, pill hidden
      await animateLeft("#cursor-left",  { x: -40, y: 40, opacity: 0 }, { duration: 0 });
      await animateLeft("#pill-left",    { opacity: 0, scale: 0.6 },    { duration: 0 });
      await animateLeft("#ripple-left",  { opacity: 0, scale: 0.4 },    { duration: 0 });

      // Slide cursor in
      await animateLeft("#cursor-left", { x: 0, y: 0, opacity: 1 }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });

      // Click press
      await animateLeft("#cursor-left", { scale: 0.72 }, { duration: 0.12, ease: "easeIn" });

      // Release: cursor returns, pill appears, ripple fires — all at once
      animateLeft("#cursor-left", { scale: 1 },         { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
      animateLeft("#pill-left",   { opacity: 1, scale: 1 }, { duration: 0.35, ease: [0.16, 1, 0.3, 1] });
      await animateLeft("#ripple-left", { opacity: [0.7, 0], scale: [0.4, 1] }, { duration: 0.35, ease: "easeOut" });

      // Idle bob — runs forever via CSS animation applied by class
      animateLeft("#cursor-left", { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut" });
      animateLeft("#pill-left",   { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut" });
    }

    // ── Right side sequence (starts 0.3s after left) ────────────────
    async function runRight() {
      await animateRight("#cursor-right", { x: 40, y: 40, opacity: 0 }, { duration: 0 });
      await animateRight("#pill-right",   { opacity: 0, scale: 0.6 },   { duration: 0 });
      await animateRight("#ripple-right", { opacity: 0, scale: 0.4 },   { duration: 0 });

      // Wait for left to get 0.3s head-start
      await new Promise(r => setTimeout(r, 300));

      await animateRight("#cursor-right", { x: 0, y: 0, opacity: 1 }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
      await animateRight("#cursor-right", { scale: 0.72 }, { duration: 0.12, ease: "easeIn" });

      animateRight("#cursor-right", { scale: 1 },          { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
      animateRight("#pill-right",   { opacity: 1, scale: 1 }, { duration: 0.35, ease: [0.16, 1, 0.3, 1] });
      await animateRight("#ripple-right", { opacity: [0.7, 0], scale: [0.4, 1] }, { duration: 0.35, ease: "easeOut" });

      animateRight("#cursor-right", { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 });
      animateRight("#pill-right",   { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 });
    }

    runLeft();
    runRight();
  }, [animateLeft, animateRight]);

  return (
    <div className="relative w-full overflow-hidden bg-white">

      {/* Dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #c0ccee 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.6,
        }}
      />
      {/* Radial fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 72% 55% at 50% 38%, #ffffff 38%, transparent 100%)" }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[28%] pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)" }}
      />

      {/* ── Left pill + cursor group ── */}
      <div
        ref={leftScope}
        className="absolute hidden sm:block select-none z-20"
        style={{ left: "clamp(20px, 6vw, 100px)", top: "clamp(160px, 22vw, 260px)" }}
      >
        {/* Click dot — small circle just below cursor tip */}
        <div
          id="ripple-left"
          className="absolute rounded-full bg-[#0048ff]/40 pointer-events-none"
          style={{ width: 14, height: 14, bottom: -10, right: 4, opacity: 0, transform: "scale(0.4)" }}
        />
        {/* Pill */}
        <div
          id="pill-left"
          className="flex items-center gap-2 bg-[#0048ff] rounded-full px-4 py-2.5"
          style={{ boxShadow: "0 4px 24px rgba(0,72,255,0.35)", opacity: 0 }}
        >
          <span className="text-xs font-bold text-white whitespace-nowrap">Frontend Engineer</span>
        </div>
        {/* Cursor */}
        <svg
          id="cursor-left"
          width="26" height="26" viewBox="0 0 24 24"
          fill="#0f1c3f" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
          className="absolute -bottom-5 right-2"
          style={{ opacity: 0 }}
        >
          <path d="M4 2l16 9-9 1-4 8z" />
        </svg>
      </div>

      {/* ── Right pill + cursor group ── */}
      <div
        ref={rightScope}
        className="absolute hidden sm:block select-none z-20"
        style={{ right: "clamp(20px, 6vw, 100px)", top: "clamp(130px, 18vw, 220px)" }}
      >
        {/* Click dot — small circle just below cursor tip */}
        <div
          id="ripple-right"
          className="absolute rounded-full bg-[#0048ff]/40 pointer-events-none"
          style={{ width: 14, height: 14, bottom: -10, left: 6, opacity: 0, transform: "scale(0.4)" }}
        />
        {/* Pill */}
        <div
          id="pill-right"
          className="flex items-center gap-2 bg-[#e8eeff] border border-[#0048ff]/20 rounded-full px-4 py-2.5"
          style={{ boxShadow: "0 4px 24px rgba(0,72,255,0.12)", opacity: 0 }}
        >
          <span className="w-2 h-2 rounded-full bg-[#0048ff] flex-shrink-0" />
          <span className="text-xs font-bold text-[#0048ff] whitespace-nowrap">Open Roles: 0</span>
        </div>
        {/* Cursor */}
        <svg
          id="cursor-right"
          width="26" height="26" viewBox="0 0 24 24"
          fill="#0f1c3f" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
          className="absolute -bottom-5 left-3"
          style={{ opacity: 0 }}
        >
          <path d="M4 2l16 9-9 1-4 8z" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 pt-20 pb-14 text-center">

        {/* Eyebrow */}
        <motion.p
          className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#0048ff] mb-3"
          style={{ opacity: 0.7 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          / We&apos;re hiring
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-black text-[#0f1c3f] leading-[1.07] tracking-tight max-w-3xl mb-5"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.09, ease: [0.16, 1, 0.3, 1] }}
        >
          Build the Future,<br />
          <span style={{ color: "#0048ff" }}>Own Your Work.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-[#6b7280] leading-relaxed max-w-md mb-7"
          style={{ fontSize: "clamp(0.88rem, 1.2vw, 1rem)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          We&apos;re a team of builders who ship fast, think deep, and work async-first.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex items-center gap-3 mb-12 flex-wrap justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#openings"
            className="inline-flex items-center gap-2 bg-[#0048ff] hover:bg-[#0035cc] transition-colors text-white text-sm font-bold px-7 py-3.5 rounded-full"
          >
            View Open Roles
          </a>
          <a
            href="https://linkedin.com/company/acrobit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-full bg-white border border-[#0048ff]/15 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center flex-shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0f1c3f">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a
            href="https://github.com/acrobit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-11 h-11 rounded-full bg-white border border-[#0048ff]/15 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center flex-shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0f1c3f">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
        </motion.div>

        {/* ── Card cluster ── */}
        <div className="relative w-full max-w-[820px] mx-auto flex justify-center items-start" style={{ minHeight: "260px" }}>

          {/* Card 1 — Job listing */}
          <motion.div
            className="absolute bg-white rounded-2xl p-5 w-[240px] sm:w-[270px]"
            style={{
              left: "0%", top: "20px", rotate: "-4deg", zIndex: 10,
              boxShadow: "0 20px 60px rgba(0,72,255,0.10), 0 4px 16px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,72,255,0.08)",
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-2 opacity-70">Engineering</p>
            <p className="text-sm font-bold text-[#0f1c3f] mb-3 leading-snug">Full-Stack Engineer</p>
            <div className="flex gap-1.5 flex-wrap mb-4">
              <span className="text-[10px] font-semibold bg-[#e8eeff] text-[#0048ff] px-2.5 py-1 rounded-full">Remote</span>
              <span className="text-[10px] font-semibold bg-[#e8eeff] text-[#0048ff] px-2.5 py-1 rounded-full">Full-time</span>
            </div>
            <div className="w-full h-8 rounded-full bg-[#0048ff] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white tracking-wide">Apply Now</span>
            </div>
          </motion.div>

          {/* Card 2 — Team stats */}
          <motion.div
            className="relative bg-white rounded-2xl p-5 w-[220px] sm:w-[250px] mx-auto"
            style={{
              rotate: "2deg", zIndex: 20,
              boxShadow: "0 24px 64px rgba(0,72,255,0.13), 0 4px 16px rgba(0,0,0,0.07)",
              border: "1px solid rgba(0,72,255,0.10)",
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.57, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-3 opacity-60">Team stats</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-3xl font-black text-[#0f1c3f]">34</span>
              <span className="text-xs text-[#6b7280] mb-1.5">members</span>
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-xs text-[#6b7280]">12 countries</span>
              <span className="w-1 h-1 rounded-full bg-[#0f1c3f]/20" />
              <span className="text-xs text-[#6b7280]">100% remote</span>
            </div>
            <div className="flex items-center gap-2 bg-[#e8eeff] rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff]" />
              <span className="text-[10px] font-semibold text-[#0048ff]">Fast response rate</span>
            </div>
          </motion.div>

          {/* Card 3 — Activity grid */}
          <motion.div
            className="absolute bg-white rounded-2xl p-5 w-[210px] sm:w-[240px]"
            style={{
              right: "0%", top: "20px", rotate: "4deg", zIndex: 10,
              boxShadow: "0 20px 60px rgba(0,72,255,0.10), 0 4px 16px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,72,255,0.08)",
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-3 opacity-60">Ship activity</p>
            <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(10, 1fr)" }}>
              {GRID_CELLS.map((color, i) => (
                <div key={i} className="rounded-[2px] aspect-square" style={{ backgroundColor: color }} />
              ))}
            </div>
            <p className="text-[10px] text-[#6b7280] mt-2.5">200+ projects shipped</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default function CareersPage() {

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <CareersHero />

      {/* ── WHY WEBSPHERE ── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-12 max-w-xl">
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] mb-3 opacity-70">
              / Why us
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight leading-snug">
              What it&apos;s like to work here.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map(({ num, title, body }, i) => (
              <Reveal key={num} delay={i * 0.07}>
                <div className="relative bg-[#f5f8ff] border border-[#0048ff]/20 rounded-2xl p-5 sm:p-7 overflow-hidden h-full">
                  <div
                    className="absolute -top-2 -right-2 font-black text-[#0048ff] select-none pointer-events-none leading-none"
                    style={{ fontSize: "5rem", opacity: 0.04 }}
                  >
                    {num}
                  </div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] opacity-60 mb-4">{num}</p>
                  <h3 className="text-[15px] font-semibold text-[#0f1c3f] leading-snug mb-3">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section id="openings" className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-12">
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] mb-3 opacity-70">
              / Open roles
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight">
              Current openings.
            </h2>
          </Reveal>

          {/* Empty state */}
          <Reveal delay={0.1}>
            <motion.div
              className="rounded-2xl border border-[#0048ff]/15 bg-white px-6 py-12 sm:px-10 sm:py-16 flex flex-col items-center text-center"
              whileHover={{ boxShadow: "0 0 0 1.5px rgba(0,72,255,0.2), 0 12px 32px rgba(0,72,255,0.06)" }}
              transition={{ duration: 0.25 }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#0048ff]/08 flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0048ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                  <line x1="12" y1="12" x2="12" y2="16" />
                  <line x1="10" y1="14" x2="14" y2="14" />
                </svg>
              </div>

              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] opacity-60 mb-3">
                No openings right now
              </p>
              <h3 className="text-2xl font-medium text-[#0f1c3f] tracking-tight mb-3">
                We&apos;re not actively hiring at the moment.
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-md mb-8">
                We hire slow and keep teams small. When a role opens, it goes fast —
                drop your details below and we&apos;ll reach out when the time is right.
              </p>

              <ContactButton
                className="inline-flex items-center gap-2 bg-[#0048ff] text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#0035cc] transition-colors"
              >
                Send us your profile
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </ContactButton>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal>
            <motion.div
              className="rounded-3xl border border-[#0048ff]/20 bg-[#f5f8ff] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 text-center relative overflow-hidden"
              whileHover={{ boxShadow: "0 0 0 2px rgba(0,72,255,0.25), 0 24px 48px rgba(0,72,255,0.07)" }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,72,255,0.06) 0%, transparent 60%)" }}
              />
              <div className="relative">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] mb-5 opacity-70">
                  / Stay in touch
                </p>
                <h2
                  className="font-medium text-[#0f1c3f] tracking-tight max-w-xl mx-auto mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
                >
                  Not the right time? Keep us on your radar.
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto mb-9">
                  We occasionally bring on exceptional people for short-term projects and long-term roles.
                  Send us a note and we&apos;ll remember you when something opens up.
                </p>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <ContactButton
                    className="inline-flex items-center gap-2 bg-[#0048ff] text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-[#0035cc] transition-colors"
                  >
                    Get in touch
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <ArrowUpRight size={13} strokeWidth={2.5} />
                    </span>
                  </ContactButton>
                </motion.div>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-8 pt-7 border-t border-[#0048ff]/10 w-full">
                  <span className="text-xs text-gray-400">Learn more:</span>
                  <Link href="/about" className="text-xs font-semibold text-[#0048ff] hover:underline">About Acrobit</Link>
                  <span className="text-gray-300 hidden sm:inline">·</span>
                  <Link href="/customers" className="text-xs font-semibold text-[#0048ff] hover:underline">Our Work</Link>
                  <span className="text-gray-300 hidden sm:inline">·</span>
                  <Link href="/services/ai-software-development" className="text-xs font-semibold text-[#0048ff] hover:underline">What We Build</Link>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
