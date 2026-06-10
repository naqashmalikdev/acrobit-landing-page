"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactButton from "@/app/components/ContactButton";

/* ── Counter ── */
function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = eased * to;
            setCount(decimals ? Math.round(val * 10) / 10 : Math.round(val));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, decimals]);

  return <span ref={ref}>{decimals ? count.toFixed(1) : count}{suffix}</span>;
}

/* ── Reveal ── */
function Reveal({
  children, delay = 0, className = "", y = 24,
}: {
  children: React.ReactNode; delay?: number; className?: string; y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: 60, suffix: "+", label: "Projects shipped", note: "across 18+ industries" },
  { value: 4.9, suffix: "/5", label: "Avg. client rating", note: "60+ verified reviews", decimals: 1 },
  { value: 98, suffix: "%", label: "On-time delivery", note: "measured across all engagements" },
  { value: 8, suffix: "+", label: "Years of experience", note: "combined across the team" },
];

const values = [
  {
    num: "01",
    title: "We build for outcomes, not invoices.",
    body: "Every sprint traces back to a metric that matters. We refuse to pad scope or recommend services you don't need — because long-term trust is worth more than a short-term invoice.",
  },
  {
    num: "02",
    title: "We hate handoffs — one team, start to finish.",
    body: "The engineers who scope your project are the engineers who ship it. No handoffs to cheaper offshore teams. No account managers playing telephone between you and the builders.",
  },
  {
    num: "03",
    title: "Uncomfortable honesty early beats expensive regret later.",
    body: "If the approach is wrong, we say so — even when you've already committed to it. Most clients call this refreshing. A few call it annoying. We're fine with both.",
  },
  {
    num: "04",
    title: "Boring infrastructure, interesting product.",
    body: "We use proven tools at the platform layer so creative energy stays on the product layer. Your project is not where we experiment with unproven tech.",
  },
];

const workItems = [
  {
    num: "01",
    title: "Two-week sprints. No disappearing acts.",
    body: "Every cycle ends with a working demo and a clear plan for the next one. You always know where we are.",
  },
  {
    num: "02",
    title: "Async-first, but never out of reach.",
    body: "We keep communication tight with structured async updates. You never wait more than a business day for a decision or a status.",
  },
  {
    num: "03",
    title: "We flag blockers early, not on launch day.",
    body: "When something is harder than expected, you hear about it immediately — with a proposed solution, not just a problem.",
  },
  {
    num: "04",
    title: "We stay after launch.",
    body: "The week after launch is when real feedback starts. We're still there — watching metrics, fixing edge cases, iterating.",
  },
];

function AboutHero() {
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
          <span className="text-xs font-bold text-[#0048ff] whitespace-nowrap">60+ Projects</span>
        </div>
        <svg id="cursor-right" width="26" height="26" viewBox="0 0 24 24" fill="#0f1c3f" stroke="white" strokeWidth="1.5" strokeLinejoin="round" className="absolute -bottom-5 left-3" style={{ opacity: 0 }}>
          <path d="M4 2l16 9-9 1-4 8z" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 pt-20 pb-14 text-center">

        <motion.p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#0048ff] mb-3" style={{ opacity: 0.7 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 0.7, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          / About Us
        </motion.p>

        <motion.h1 className="font-black text-[#0f1c3f] leading-[1.07] tracking-tight max-w-3xl mb-5" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.09, ease: [0.16, 1, 0.3, 1] }}>
          We Build Software<br />
          <span style={{ color: "#0048ff" }}>That Actually Ships.</span>
        </motion.h1>

        <motion.p className="text-[#6b7280] leading-relaxed max-w-md mb-7" style={{ fontSize: "clamp(0.88rem, 1.2vw, 1rem)" }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
          Full-stack product studio. AI-powered. Outcome-obsessed. We stay after launch.
        </motion.p>

        <motion.div className="flex items-center gap-3 mb-12 flex-wrap justify-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}>
          <ContactButton className="inline-flex items-center gap-2 bg-[#0048ff] hover:bg-[#0035cc] transition-colors text-white text-sm font-bold px-7 py-3.5 rounded-full">
            Work with us
          </ContactButton>
          <Link href="/services" className="w-11 h-11 rounded-full bg-white border border-[#0048ff]/15 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center flex-shrink-0" aria-label="Services">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f1c3f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </Link>
        </motion.div>

        {/* ── Card cluster ── */}
        <div className="relative w-full max-w-[820px] mx-auto flex justify-center items-start" style={{ minHeight: "260px" }}>

          {/* Card 1 — Founded story */}
          <motion.div className="absolute bg-white rounded-2xl p-5 w-[240px] sm:w-[270px]" style={{ left: "0%", top: "20px", rotate: "-4deg", zIndex: 10, boxShadow: "0 20px 60px rgba(0,72,255,0.10), 0 4px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(0,72,255,0.08)" }} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-2 opacity-70">Our story</p>
            <p className="text-sm font-bold text-[#0f1c3f] mb-3 leading-snug">Founded by engineers tired of watching great ideas die due to bad software.</p>
            <div className="flex items-center gap-2 mt-auto">
              <div className="w-7 h-7 rounded-lg bg-[#0048ff] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">AR</div>
              <div>
                <p className="text-[11px] font-semibold text-[#0f1c3f]">Ahmad Raza</p>
                <p className="text-[10px] text-[#6b7280]">Co-Founder &amp; CEO</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Stats (center, front) */}
          <motion.div className="relative bg-white rounded-2xl p-5 w-[220px] sm:w-[250px] mx-auto" style={{ rotate: "2deg", zIndex: 20, boxShadow: "0 24px 64px rgba(0,72,255,0.13), 0 4px 16px rgba(0,0,0,0.07)", border: "1px solid rgba(0,72,255,0.10)" }} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.57, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-3 opacity-60">By the numbers</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-3xl font-black text-[#0f1c3f]">60</span>
              <span className="text-xs text-[#6b7280] mb-1.5">+ projects</span>
            </div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-xs text-[#6b7280]">4.9★ rating</span>
              <span className="w-1 h-1 rounded-full bg-[#0f1c3f]/20" />
              <span className="text-xs text-[#6b7280]">98% on-time</span>
            </div>
            <div className="flex items-center gap-2 bg-[#e8eeff] rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff]" />
              <span className="text-[10px] font-semibold text-[#0048ff]">All via referral</span>
            </div>
          </motion.div>

          {/* Card 3 — Stack / AI */}
          <motion.div className="absolute bg-white rounded-2xl p-5 w-[210px] sm:w-[240px]" style={{ right: "0%", top: "20px", rotate: "4deg", zIndex: 10, boxShadow: "0 20px 60px rgba(0,72,255,0.10), 0 4px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(0,72,255,0.08)" }} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-3 opacity-60">What we do</p>
            <div className="flex flex-col gap-2">
              {["AI & LLM Products", "Web & Mobile Apps", "Cloud & DevOps", "Compliance-First"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff] flex-shrink-0" />
                  <span className="text-[11px] font-medium text-[#0f1c3f]">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#6b7280] mt-3">18+ industries served</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <Navbar />

      {/* 1. HERO */}
      <AboutHero />

      {/* 2. STORY */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">

          <div className="flex-1">
            <Reveal>
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-6">
                / Our story
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-[17px] font-medium text-[#0f1c3f] leading-relaxed mb-5 max-w-[600px]">
                Ahmad and Sara met while consulting at a fintech firm where the AI roadmap was
                a slide deck with no engineers assigned to it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-[600px]">
                They spent six months fixing what should have been scoped correctly from the start.
                That experience became the founding principle: strategy without execution is noise,
                and execution without strategy is expensive noise.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[600px]">
                Since then we've grown from two people into a full-stack studio — still small
                enough to care about every line of code, large enough to move fast. Every client
                has come through a referral. We've never cold-pitched anyone, and we don't plan to.
              </p>
            </Reveal>
          </div>

          <div className="lg:w-[380px] flex-shrink-0">
            <Reveal delay={0.18}>
              <motion.div
                className="rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] p-6 sm:p-8 h-full"
                style={{ minHeight: "240px" }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 0 0 2px rgba(0,72,255,0.3), 0 12px 32px rgba(0,72,255,0.08)",
                }}
                transition={{ duration: 0.22 }}
              >
                <div
                  className="text-[72px] font-black text-[#0048ff] leading-none mb-4 select-none"
                  style={{ opacity: 0.12, lineHeight: "0.8" }}
                  aria-hidden="true"
                >
                  "
                </div>
                <p className="text-[16px] font-medium text-[#0f1c3f] leading-relaxed mb-6">
                  Most AI failures aren't engineering failures — they're requirements failures.
                  We spend more time understanding the problem than writing the first line.
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-[#0048ff]/10">
                  <div className="w-9 h-9 rounded-xl bg-[#0048ff] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    AR
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f1c3f]">Ahmad Raza</p>
                    <p className="text-xs text-gray-400">Co-Founder &amp; CEO</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AI-FIRST STATEMENT */}
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6" style={{ background: "#0048ff" }}>
        <div
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)" }}
        />

        <div className="relative max-w-[1350px] mx-auto flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">
          <div className="lg:w-[480px] flex-shrink-0">
            <Reveal>
              <h2
                className="text-white font-medium leading-[1.08] tracking-tight mb-6 sm:mb-8"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}
              >
                We&apos;re{" "}
                <span
                  className="relative inline-block"
                  style={{ borderBottom: "3px solid rgba(255,255,255,0.5)", paddingBottom: "2px" }}
                >
                  AI-native
                </span>
                , built with conviction.
              </h2>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/services/ai-software-development"
                  className="inline-flex items-center gap-3 bg-white text-[#0048ff] text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Our AI approach
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </motion.div>
            </Reveal>
          </div>

          <div className="flex-1 flex flex-col gap-5 sm:gap-6">
            <Reveal delay={0.08}>
              <p className="text-white/80 text-[15px] leading-relaxed">
                Being AI-native at Acrobit doesn't mean adding AI to everything. It means applying
                intelligence where it genuinely improves decisions, reduces friction, and makes systems
                stronger over time.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-white/80 text-[15px] leading-relaxed">
                We embed AI into products, platforms, and workflows in ways that are governed, secure,
                and aligned to real business outcomes — from early strategy and validation all the way
                through to production-grade deployment.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/80 text-[15px] leading-relaxed">
                Our role is to help you get the balance right — so you ship AI that actually works,
                not AI that sounds good in a pitch deck.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. STATS */}
      <section className="bg-[#f5f8ff] border-y border-gray-100 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-gray-200">
            {stats.map(({ value, suffix, label, note, decimals = 0 }, i) => (
              <Reveal key={label} delay={i * 0.08} className="px-4 sm:px-8 py-6 first:pl-0 last:pr-0">
                <p
                  className="font-bold text-[#0048ff] leading-none mb-2 tabular-nums"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.8rem)" }}
                >
                  <Counter to={value} suffix={suffix} decimals={decimals} />
                </p>
                <p className="text-sm font-semibold text-[#0f1c3f] mb-1">{label}</p>
                <p className="text-xs text-gray-400">{note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VALUES */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">
              / What we actually believe
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">
              Not buzzwords. Beliefs with consequences.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {values.map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] p-6 sm:p-8"
                whileHover={{
                  y: -4,
                  boxShadow: "0 0 0 2px rgba(0,72,255,0.3), 0 12px 32px rgba(0,72,255,0.08)",
                }}
              >
                <span className="text-[10px] font-bold tracking-widest text-[#0048ff] uppercase opacity-60 block mb-4">
                  {num}
                </span>
                <h3 className="text-[17px] sm:text-[18px] font-medium text-[#0f1c3f] tracking-tight leading-snug mb-3">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW WE WORK */}
      <section className="bg-[#f5f8ff] py-14 sm:py-20 px-4 sm:px-6 border-y border-gray-100">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">
              / How we work
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">
              The way we run engagements.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[480px] mt-3">
              B2B clients are committing to a working relationship for weeks or months. Here's
              exactly what that looks like with us.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {workItems.map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 overflow-hidden"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div
                  className="absolute -top-2 -right-2 font-black text-[#0048ff] select-none pointer-events-none leading-none"
                  style={{ fontSize: "5rem", opacity: 0.04 }}
                  aria-hidden="true"
                >
                  {num}
                </div>
                <div className="text-[10px] font-bold tracking-widest text-[#0048ff] uppercase opacity-60 mb-4">
                  {num}
                </div>
                <h3 className="text-[15px] font-bold text-[#0f1c3f] leading-snug mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECH STACK MARQUEE */}
      <section className="bg-white border-b border-gray-100 py-10 overflow-hidden">
        <div className="max-w-[1350px] mx-auto">
          <p className="text-center text-xs font-semibold tracking-[0.18em] uppercase text-gray-400 mb-8">
            Tools that have earned production trust
          </p>
        </div>
        <div className="max-w-[1350px] mx-auto">
          <div className="relative flex overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-16 sm:w-32 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, white, transparent)" }} />
            <div className="absolute right-0 top-0 h-full w-16 sm:w-32 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, white, transparent)" }} />
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex items-center gap-8 sm:gap-10 flex-shrink-0"
                style={{ animation: "marquee 30s linear infinite", paddingRight: "2.5rem" }}
              >
                {[
                  { name: "React", img: "/icons/react.svg" },
                  { name: "TypeScript", img: "/icons/typescript.svg" },
                  { name: "Next.js", img: "/icons/next js.webp" },
                  { name: "Tailwind", img: "/icons/tailwind.webp" },
                  { name: "Node.js", img: "/icons/node js.png" },
                  { name: "PostgreSQL", img: "/icons/postgresql.webp" },
                  { name: "OpenAI", img: "/icons/open ai.webp" },
                  { name: "LangChain", img: "/icons/langchain.webp" },
                  { name: "Supabase", img: "/icons/supabase.webp" },
                  { name: "Docker", img: "/icons/Docker.svg" },
                  { name: "AWS", img: "/icons/aws.svg" },
                  { name: "Python", img: "/icons/python.svg" },
                  { name: "Redis", img: "/icons/redis.svg" },
                  { name: "Vercel", img: "/icons/vercel.png" },
                ].map(({ name, img }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2.5 flex-shrink-0 opacity-55 hover:opacity-100 transition-opacity cursor-default"
                  >
                    <img src={img} alt={name} className="w-7 h-7 object-contain flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#0f1c3f] whitespace-nowrap tracking-tight">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal>
            <motion.div
              className="rounded-3xl border border-[#0048ff]/20 bg-[#f5f8ff] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 text-center overflow-hidden relative"
              whileHover={{
                boxShadow: "0 0 0 2px rgba(0,72,255,0.25), 0 24px 48px rgba(0,72,255,0.07)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,72,255,0.06) 0%, transparent 60%)" }}
              />
              <div className="relative">
                <Reveal delay={0}>
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-5">
                    / Let&apos;s talk
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2
                    className="font-medium text-[#0f1c3f] tracking-tight max-w-2xl mx-auto mb-5"
                    style={{ fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)", lineHeight: 1.1 }}
                  >
                    If this sounds like the team you&apos;ve been looking for — let&apos;s have a real conversation.
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto mb-8 sm:mb-9">
                    No pitch decks. No pressure. A 20-minute call to understand what you&apos;re building
                    and whether we&apos;re the right people to help. If we&apos;re not, we&apos;ll say so honestly.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <ContactButton
                        className="inline-flex items-center gap-2 bg-[#0048ff] text-white text-sm font-semibold px-7 py-3.5 sm:px-8 sm:py-4 rounded-full hover:bg-[#0035cc] transition-colors"
                      >
                        Book a real conversation
                        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <ArrowUpRight size={13} strokeWidth={2.5} />
                        </span>
                      </ContactButton>
                    </motion.div>
                    <p className="text-xs text-gray-400 w-full mt-1">
                      Reply within 4 business hours · No spam, ever
                    </p>
                  </div>
                </Reveal>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
