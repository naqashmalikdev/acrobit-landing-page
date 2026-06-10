"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, useAnimate } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactButton from "@/app/components/ContactButton";

/* ── Reveal ── */
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

/* ══════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════ */
function AIFirstHero() {
  const [leftScope,  animateLeft]  = useAnimate();
  const [rightScope, animateRight] = useAnimate();

  useEffect(() => {
    async function runLeft() {
      await animateLeft("#cursor-left",  { x: -40, y: 40, opacity: 0 }, { duration: 0 });
      await animateLeft("#pill-left",    { opacity: 0, scale: 0.6 },    { duration: 0 });
      await animateLeft("#ripple-left",  { opacity: 0, scale: 0.4 },    { duration: 0 });
      await animateLeft("#cursor-left", { x: 0, y: 0, opacity: 1 }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
      await animateLeft("#cursor-left", { scale: 0.72 }, { duration: 0.12, ease: "easeIn" });
      animateLeft("#cursor-left", { scale: 1 },          { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
      animateLeft("#pill-left",   { opacity: 1, scale: 1 }, { duration: 0.35, ease: [0.16, 1, 0.3, 1] });
      await animateLeft("#ripple-left", { opacity: [0.7, 0], scale: [0.4, 1] }, { duration: 0.35, ease: "easeOut" });
      animateLeft("#cursor-left", { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut" });
      animateLeft("#pill-left",   { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut" });
    }
    async function runRight() {
      await animateRight("#cursor-right", { x: 40, y: 40, opacity: 0 }, { duration: 0 });
      await animateRight("#pill-right",   { opacity: 0, scale: 0.6 },   { duration: 0 });
      await animateRight("#ripple-right", { opacity: 0, scale: 0.4 },   { duration: 0 });
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
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #c0ccee 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.6 }} />
      {/* Radial fade */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 72% 55% at 50% 38%, #ffffff 38%, transparent 100%)" }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[28%] pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)" }} />

      {/* ── Left pill + cursor ── */}
      <div ref={leftScope} className="absolute hidden sm:block select-none z-20" style={{ left: "clamp(20px, 6vw, 100px)", top: "clamp(160px, 22vw, 260px)" }}>
        <div id="ripple-left" className="absolute rounded-full bg-[#0048ff]/40 pointer-events-none" style={{ width: 14, height: 14, bottom: -10, right: 4, opacity: 0, transform: "scale(0.4)" }} />
        <div id="pill-left" className="flex items-center gap-2 bg-[#0048ff] rounded-full px-4 py-2.5" style={{ boxShadow: "0 4px 24px rgba(0,72,255,0.35)", opacity: 0 }}>
          <span className="text-xs font-bold text-white whitespace-nowrap">AI-Native Studio</span>
        </div>
        <svg id="cursor-left" width="26" height="26" viewBox="0 0 24 24" fill="#0f1c3f" stroke="white" strokeWidth="1.5" strokeLinejoin="round" className="absolute -bottom-5 right-2" style={{ opacity: 0 }}>
          <path d="M4 2l16 9-9 1-4 8z" />
        </svg>
      </div>

      {/* ── Right pill + cursor ── */}
      <div ref={rightScope} className="absolute hidden sm:block select-none z-20" style={{ right: "clamp(20px, 6vw, 100px)", top: "clamp(130px, 18vw, 220px)" }}>
        <div id="ripple-right" className="absolute rounded-full bg-[#0048ff]/40 pointer-events-none" style={{ width: 14, height: 14, bottom: -10, left: 6, opacity: 0, transform: "scale(0.4)" }} />
        <div id="pill-right" className="flex items-center gap-2 bg-[#e8eeff] border border-[#0048ff]/20 rounded-full px-4 py-2.5" style={{ boxShadow: "0 4px 24px rgba(0,72,255,0.12)", opacity: 0 }}>
          <span className="w-2 h-2 rounded-full bg-[#0048ff] flex-shrink-0" />
          <span className="text-xs font-bold text-[#0048ff] whitespace-nowrap">4 AI Phases</span>
        </div>
        <svg id="cursor-right" width="26" height="26" viewBox="0 0 24 24" fill="#0f1c3f" stroke="white" strokeWidth="1.5" strokeLinejoin="round" className="absolute -bottom-5 left-3" style={{ opacity: 0 }}>
          <path d="M4 2l16 9-9 1-4 8z" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 pt-20 pb-14 text-center">

        <motion.p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#0048ff] mb-3" style={{ opacity: 0.7 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 0.7, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          / An AI-First Company
        </motion.p>

        <motion.h1 className="font-black text-[#0f1c3f] leading-[1.07] tracking-tight max-w-3xl mb-5" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.09, ease: [0.16, 1, 0.3, 1] }}>
          Redefining What&apos;s Possible<br />
          <span style={{ color: "#0048ff" }}>With AI.</span>
        </motion.h1>

        <motion.p className="text-[#6b7280] leading-relaxed max-w-md mb-7" style={{ fontSize: "clamp(0.88rem, 1.2vw, 1rem)" }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
          Building the future of software, systems, and operations — all with AI at the core.
        </motion.p>

        <motion.div className="flex items-center gap-3 mb-12 flex-wrap justify-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}>
          <ContactButton className="inline-flex items-center gap-2 bg-[#0048ff] hover:bg-[#0035cc] transition-colors text-white text-sm font-bold px-7 py-3.5 rounded-full">
            Talk to our AI team
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <ArrowUpRight size={12} strokeWidth={2.5} />
            </span>
          </ContactButton>
          <Link href="/services/ai-software-development" className="w-11 h-11 rounded-full bg-white border border-[#0048ff]/15 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center flex-shrink-0" aria-label="AI services">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f1c3f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </Link>
        </motion.div>

        {/* ── Card cluster ── */}
        <div className="relative w-full max-w-[820px] mx-auto flex justify-center items-start" style={{ minHeight: "260px" }}>

          {/* Card 1 — AI Strategy */}
          <motion.div className="absolute bg-white rounded-2xl p-5 w-[240px] sm:w-[270px]" style={{ left: "0%", top: "20px", rotate: "-4deg", zIndex: 10, boxShadow: "0 20px 60px rgba(0,72,255,0.10), 0 4px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(0,72,255,0.08)" }} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-2 opacity-70">Phase 01</p>
            <p className="text-sm font-bold text-[#0f1c3f] mb-3 leading-snug">AI Strategy &amp; Direction</p>
            <div className="flex gap-1.5 flex-wrap mb-4">
              <span className="text-[10px] font-semibold bg-[#e8eeff] text-[#0048ff] px-2.5 py-1 rounded-full">Consulting</span>
              <span className="text-[10px] font-semibold bg-[#e8eeff] text-[#0048ff] px-2.5 py-1 rounded-full">Workshops</span>
            </div>
            <div className="w-full h-8 rounded-full bg-[#0048ff] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white tracking-wide">Explore Phase</span>
            </div>
          </motion.div>

          {/* Card 2 — AI stats center */}
          <motion.div className="relative bg-white rounded-2xl p-5 w-[220px] sm:w-[250px] mx-auto" style={{ rotate: "2deg", zIndex: 20, boxShadow: "0 24px 64px rgba(0,72,255,0.13), 0 4px 16px rgba(0,0,0,0.07)", border: "1px solid rgba(0,72,255,0.10)" }} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.57, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-3 opacity-60">AI coverage</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-3xl font-black text-[#0f1c3f]">4</span>
              <span className="text-xs text-[#6b7280] mb-1.5">lifecycle phases</span>
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-xs text-[#6b7280]">Strategy → Product</span>
              <span className="w-1 h-1 rounded-full bg-[#0f1c3f]/20" />
              <span className="text-xs text-[#6b7280]">Full cycle</span>
            </div>
            <div className="flex items-center gap-2 bg-[#e8eeff] rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff]" />
              <span className="text-[10px] font-semibold text-[#0048ff]">Governance-first</span>
            </div>
          </motion.div>

          {/* Card 3 — AI capabilities */}
          <motion.div className="absolute bg-white rounded-2xl p-5 w-[210px] sm:w-[240px]" style={{ right: "0%", top: "20px", rotate: "4deg", zIndex: 10, boxShadow: "0 20px 60px rgba(0,72,255,0.10), 0 4px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(0,72,255,0.08)" }} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-3 opacity-60">Capabilities</p>
            <div className="flex flex-col gap-2">
              {["LLM & GenAI Products", "AI Agents & Automation", "ML Solutions", "PoC → Production"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff] flex-shrink-0" />
                  <span className="text-[11px] font-medium text-[#0f1c3f]">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#6b7280] mt-3">EU AI Act · NIST · ISO 27001</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   AI LIFECYCLE — sticky image left, scrollable cards right
══════════════════════════════════════════════════ */

/* Phase SVG icons */
function CompassIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-14 h-14" fill="none">
      <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <circle cx="60" cy="60" r="40" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="60" cy="60" r="28" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <polygon points="60,10 64,56 60,60 56,56" fill="rgba(255,255,255,0.95)" />
      <polygon points="60,110 64,64 60,60 56,64" fill="rgba(255,255,255,0.3)" />
      <polygon points="110,60 64,56 60,60 64,64" fill="rgba(255,255,255,0.5)" />
      <polygon points="10,60 56,64 60,60 56,56" fill="rgba(255,255,255,0.2)" />
      <circle cx="60" cy="60" r="5" fill="white" />
      <polygon points="60,4 61.5,8 60,7 58.5,8" fill="white" />
    </svg>
  );
}
function FlaskIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-14 h-14" fill="none">
      <path d="M44 20h32M44 20v36L22 90a8 8 0 006.5 12h63a8 8 0 006.5-12L76 56V20" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="48" cy="80" r="4" fill="rgba(255,255,255,0.5)" />
      <circle cx="65" cy="88" r="3" fill="rgba(255,255,255,0.35)" />
      <circle cx="72" cy="76" r="5" fill="rgba(255,255,255,0.4)" />
      <line x1="44" y1="56" x2="76" y2="56" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-14 h-14" fill="none">
      <circle cx="60" cy="60" r="20" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="8" fill="rgba(255,255,255,0.3)" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
        <rect key={i} x="57" y="12" width="6" height="12" rx="3"
          fill="rgba(255,255,255,0.7)"
          transform={`rotate(${deg} 60 60)`} />
      ))}
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-14 h-14" fill="none">
      <path d="M60 10 L63 54 L60 60 L57 54 Z" fill="rgba(255,255,255,0.95)" />
      <path d="M60 110 L63 66 L60 60 L57 66 Z" fill="rgba(255,255,255,0.4)" />
      <path d="M10 60 L54 57 L60 60 L54 63 Z" fill="rgba(255,255,255,0.5)" />
      <path d="M110 60 L66 63 L60 60 L66 57 Z" fill="rgba(255,255,255,0.4)" />
      <path d="M25 25 L53 52 L60 60 L52 53 Z" fill="rgba(255,255,255,0.35)" />
      <path d="M95 95 L67 68 L60 60 L68 67 Z" fill="rgba(255,255,255,0.25)" />
      <circle cx="60" cy="60" r="6" fill="white" />
    </svg>
  );
}

const phaseIcons = [CompassIcon, FlaskIcon, GearIcon, SparkleIcon];

const phases = [
  {
    title: "AI strategy & direction",
    desc: "Helping leadership teams clarify where AI fits, what to prioritize, and how success should be measured before significant investment.",
    idealFor: "Organizations beginning their AI journey or reassessing fragmented AI initiatives that lack clear ownership or strategic alignment.",
    services: ["GenAI Consulting & Workshops", "AI & Data Innovation"],
    gradient: "linear-gradient(145deg, #0035cc 0%, #0048ff 55%, #2563eb 100%)",
  },
  {
    title: "AI validation & early execution",
    desc: "Helping organizations test AI ideas in real conditions, validate value and feasibility, and build early solutions before committing to broader rollout.",
    idealFor: "Organizations that want to move from experimentation to action without committing to large-scale rollouts too early.",
    services: ["AI PoC & MVP Development", "AI Agents", "Machine Learning Solutions"],
    gradient: "linear-gradient(145deg, #1d4ed8 0%, #0048ff 55%, #3b82f6 100%)",
  },
  {
    title: "AI-enabled operations",
    desc: "Applying AI within everyday workflows and decision points to improve efficiency, consistency, and speed across the organization.",
    idealFor: "Organizations seeking practical operational gains without disrupting how teams already work.",
    services: ["Intelligent Automation", "AI Software Development"],
    gradient: "linear-gradient(145deg, #0048ff 0%, #0035cc 55%, #1e40af 100%)",
  },
  {
    title: "AI-powered products & platforms",
    desc: "Working with product teams to integrate intelligence into digital products and platforms so they evolve, adapt, and improve over time.",
    idealFor: "Product-led and digital-first organizations building customer-facing platforms or intelligent software products.",
    services: ["AI Software Development", "Machine Learning Solutions", "AI Agents"],
    gradient: "linear-gradient(145deg, #002299 0%, #0035cc 55%, #0048ff 100%)",
  },
];

function AILifecycleSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

      {/* Left — sticky heading */}
      <div className="lg:w-[460px] xl:w-[500px] flex-shrink-0">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] mb-4 opacity-70">
            / Full lifecycle
          </p>
          <h2 className="font-medium text-[#0f1c3f] tracking-tight leading-snug mb-8"
            style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)" }}>
            How Acrobit supports the full{" "}
            <span className="focus-word-gr">AI</span>{" "}
            lifecycle.
          </h2>
          <ul className="space-y-3">
            {phases.map((ph, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#0048ff] opacity-50" />
                <span className="text-sm text-gray-500 leading-snug">{ph.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right — scrollable phase cards */}
      <div className="flex-1 min-w-0 space-y-5">
        {phases.map((ph, i) => {
          const Icon = phaseIcons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="rounded-2xl border border-[#0048ff]/20 bg-white overflow-hidden"
                whileHover={{ y: -4, boxShadow: "0 0 0 2px rgba(0,72,255,0.3), 0 16px 40px rgba(0,72,255,0.08)" }}
                transition={{ duration: 0.22 }}
              >
                {/* Gradient header — phase + title left, icon right */}
                <div
                  className="relative overflow-hidden px-7 pt-7 pb-6 flex items-start justify-between gap-4"
                  style={{ background: ph.gradient }}
                >
                  {/* Subtle radial glow */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.12) 0%, transparent 55%)" }} />
                  {/* Decorative ring */}
                  <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full border border-white/08 pointer-events-none" />

                  {/* Text */}
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/50 mb-2">
                      Phase {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-[20px] font-semibold text-white leading-snug tracking-tight">
                      {ph.title}
                    </h3>
                  </div>

                  {/* Icon — top right */}
                  <div className="relative z-10 flex-shrink-0 opacity-70 mt-1">
                    <Icon />
                  </div>
                </div>

                {/* Content body */}
                <div className="p-7 bg-[#f5f8ff]">
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-5">{ph.desc}</p>

                  <div className="rounded-xl bg-white border border-[#0048ff]/10 px-4 py-3 mb-5">
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#0048ff] opacity-60 mb-1">
                      Ideal for
                    </p>
                    <p className="text-[13px] text-gray-500 leading-relaxed">{ph.idealFor}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {ph.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full px-3.5 py-1.5 text-xs font-medium text-[#0048ff] border border-[#0048ff]/25 bg-white hover:bg-[#0048ff] hover:text-white transition-colors duration-200 cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
export default function AIFirstPage() {
  return (
    <main className="min-h-screen bg-white">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .focus-word-gr {
          position: relative;
          background: linear-gradient(46deg, #93c5fd 18.88%, #0048ff 99.34%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .focus-word-gr::after {
          content: "";
          height: 2px;
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          background: linear-gradient(46deg, #93c5fd 18.88%, #0048ff 99.34%);
        }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <AIFirstHero />

      {/* ── BELIEF + VISION ── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Belief */}
          <div className="flex-1">
            <Reveal>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] mb-4 opacity-70">
                OUR BELIEF
              </p>
              <h2 className="text-3xl font-medium text-[#0f1c3f] tracking-tight leading-snug mb-5">
                Every organization&apos;s AI journey is different.
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[520px]">
                We work closely with you to understand context, readiness, and ambition — then identify
                where intelligence can drive growth, efficiency, and durable value. Not every problem
                needs AI. We help you find the ones that do.
              </p>
            </Reveal>
          </div>

          {/* Vision */}
          <div className="flex-1">
            <Reveal delay={0.1}>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] mb-4 opacity-70">
                OUR VISION
              </p>
              <h2 className="text-3xl font-medium text-[#0f1c3f] tracking-tight leading-snug mb-5">
                A future where AI strengthens how businesses operate.
              </h2>
              <div className="space-y-3">
                {[
                  "Better decisions, not just automation",
                  "Systems that improve over time",
                  "Human ownership and accountability by design",
                  "Trustworthy, secure adoption that scales responsibly",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0048ff]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="text-[#0048ff]" strokeWidth={3} />
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

  
      {/* ── AI-FIRST IN PRACTICE ── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-[340px] flex-shrink-0">
            <Reveal>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] mb-3 opacity-70">
                / In practice
              </p>
              <h2 className="text-3xl font-medium text-[#0f1c3f] tracking-tight leading-snug">
                What being AI-first looks like in practice.
              </h2>
            </Reveal>
          </div>
          <div className="flex-1 space-y-5 text-sm text-gray-500 leading-relaxed">
            <Reveal delay={0.06}>
              <p>
                At Acrobit, AI represents a shift in how modern organizations create progress.
                It helps teams move with greater clarity, make faster decisions, and build systems
                that improve over time.
              </p>
            </Reveal>
            <Reveal delay={0.11}>
              <p>
                Being AI-first does not mean adding AI everywhere. It means applying intelligence
                where it meaningfully elevates how work gets done — improving decision quality,
                streamlining complexity, and delivering experiences that adapt as needs change.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                We see AI as a force that expands human capability. When paired with experience,
                creativity, and judgment, it enables organizations to design smarter platforms,
                reduce operational drag, and build digital products that learn and improve over time.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AI LIFECYCLE — STICKY LEFT + SCROLL RIGHT ── */}
      <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <AILifecycleSection />
        </div>
      </section>

      {/* ── GOVERNANCE ── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-12">
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] mb-3 opacity-70">
              / Governance
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-2xl">
              Backed by our structured approach to AI governance.
            </h2>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Standards badges */}
            <div className="lg:w-[320px] flex-shrink-0">
              <Reveal>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-5">
                  STANDARDS WE FOLLOW
                </p>
                <div className="space-y-3">
                  {[
                    { label: "EU AI Act", tag: "Compliance" },
                    { label: "ISO 27001", tag: "Security" },
                    { label: "NIST AI RMF", tag: "Risk Mgmt" },
                  ].map(({ label, tag }) => (
                    <div key={label}
                      className="flex items-center gap-3 rounded-xl border border-[#0048ff]/20 bg-[#f5f8ff] px-5 py-3.5">
                      <div className="w-2 h-2 rounded-full bg-[#0048ff] flex-shrink-0" />
                      <span className="text-sm font-bold text-[#0f1c3f] flex-1">{label}</span>
                      <span className="text-[10px] font-semibold text-[#0048ff] bg-[#0048ff]/08 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Text */}
            <div className="flex-1 space-y-4 text-sm text-gray-500 leading-relaxed">
              <Reveal delay={0.08}>
                <p>
                  Artificial intelligence increasingly influences decisions, workflows, and outcomes.
                  Without clear governance, it can introduce risk, weaken accountability, and reduce
                  confidence in decision-making. Responsible AI begins with clarity around where AI
                  is used, how it informs decisions, and who remains accountable for outcomes.
                </p>
              </Reveal>
              <Reveal delay={0.13}>
                <p>
                  At Acrobit, we design AI systems with clear human oversight — particularly where
                  decisions affect customers, employees, or business performance. We establish defined
                  data boundaries, usage policies, and review mechanisms to ensure AI supports informed
                  decisions rather than obscuring responsibility.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p>
                  Our governance approach aligns with established standards, including the NIST AI Risk
                  Management Framework, ISO 27001, and the EU AI Act. These frameworks guide how we
                  manage risk, security, and accountability as AI capabilities scale — allowing
                  organizations to adopt AI with assurance and operate with confidence.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS / PEOPLE ── */}
      <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-[380px] flex-shrink-0">
            <Reveal>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] mb-3 opacity-70">/ People</p>
              <h2 className="text-3xl font-medium text-[#0f1c3f] tracking-tight leading-snug mb-5">
                We invest in building the skills that make AI work.
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                AI transformation is a people transformation. We help organizations build the skills,
                habits, and confidence needed for AI to become part of everyday work.
              </p>
            </Reveal>
          </div>
          <div className="flex-1">
            <div className="space-y-3">
              {[
                "Assess AI skill gaps against business strategy & key use cases",
                "Build a culture of AI learning with clear incentives",
                "Deliver role-based training across functions",
                "Integrate AI into daily work through project-based learning",
                "Develop internal champions to support repeatable wins",
              ].map((item, i) => (
                <Reveal key={item} delay={i * 0.07}>
                  <motion.div
                    className="flex items-start gap-4 rounded-xl border border-[#0048ff]/15 bg-white px-5 py-4"
                    whileHover={{ y: -2, boxShadow: "0 0 0 1.5px rgba(0,72,255,0.25), 0 8px 24px rgba(0,72,255,0.06)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#0048ff]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="text-[#0048ff]" strokeWidth={3} />
                    </div>
                    <p className="text-sm text-[#0f1c3f] font-medium leading-relaxed">{item}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WORKING WITH US LOOKS LIKE ── */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-12">
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] mb-3 opacity-70">/ Partnership</p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight">
              What working with Acrobit as an AI partner looks like.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Early in problem framing",
                body: "AI is integrated at the start of solution design, not after requirements are finalized.",
              },
              {
                title: "Focused on decision quality",
                body: "AI is applied where it improves judgment, speed, or clarity — not just for automation's sake.",
              },
              {
                title: "Built around human oversight",
                body: "Clear ownership and review remain in place wherever AI informs decisions.",
              },
              {
                title: "Grounded in real workflows",
                body: "Solutions are designed to fit how teams already operate, reducing adoption friction.",
              },
              {
                title: "Designed to scale responsibly",
                body: "Cost, security, and governance are considered from day one, not bolted on after.",
              },
              {
                title: "Measured by outcomes",
                body: "Initiatives are evaluated based on impact on cost, efficiency, or growth — not technical metrics alone.",
              },
            ].map(({ title, body }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <motion.div
                  className="rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] p-5 sm:p-7"
                  whileHover={{ y: -4, boxShadow: "0 0 0 2px rgba(0,72,255,0.3), 0 12px 32px rgba(0,72,255,0.08)" }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#0048ff] flex items-center justify-center mb-5">
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </div>
                  <h3 className="text-[15px] font-bold text-[#0f1c3f] mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal>
            <motion.div
              className="rounded-3xl border border-[#0048ff]/20 bg-[#f5f8ff] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 text-center relative overflow-hidden"
              whileHover={{ boxShadow: "0 0 0 2px rgba(0,72,255,0.25), 0 24px 48px rgba(0,72,255,0.07)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,72,255,0.06) 0%, transparent 60%)" }} />
              <div className="relative">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] mb-5 opacity-70">
                  / Let&apos;s build
                </p>
                <h2 className="font-medium text-[#0f1c3f] tracking-tight max-w-2xl mx-auto mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.1 }}>
                  Ready to make AI a real part of how you operate?
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto mb-9">
                  No pitch decks. A 20-minute conversation about where AI can genuinely move the needle
                  for your business — and whether we&apos;re the right team to help you get there.
                </p>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <ContactButton
                    className="inline-flex items-center gap-2 bg-[#0048ff] text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-[#0035cc] transition-colors">
                    Start a conversation
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <ArrowUpRight size={13} strokeWidth={2.5} />
                    </span>
                  </ContactButton>
                </motion.div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
