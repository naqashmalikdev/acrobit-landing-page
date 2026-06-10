"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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

/* ── DATA ── */
const stats = [
  { value: 200, suffix: "+", label: "Software developers", note: "across AI, cloud, and engineering" },
  { value: 17,  suffix: "+", label: "Years in business",   note: "of experience and execution" },
  { value: 500, suffix: "+", label: "Projects delivered",  note: "across 20+ industries" },
  { value: 40,  suffix: "%", label: "Faster delivery",     note: "vs. traditional hiring models" },
];

const deliverables = [
  {
    num: "01",
    title: "Focused expertise on your product.",
    body: "You get a dedicated team that treats your product like their own. We hand-pick specialists who fit your tech stack and goals — giving you focused attention and the exact skills you need.",
  },
  {
    num: "02",
    title: "Cost-effective development, long-term.",
    body: "Instead of juggling freelancers or short-term contracts, a dedicated team gives you long-term efficiency, predictable costs, and better ROI as your product scales.",
  },
  {
    num: "03",
    title: "Access to global talent without delays.",
    body: "Tap into our global pool of engineers, architects, QA experts, and product specialists. World-class talent without the delays and overhead of local hiring.",
  },
  {
    num: "04",
    title: "Reduced operational risk — we handle the rest.",
    body: "We handle all hiring, onboarding, HR, compliance, and admin. You avoid legal complexities and focus entirely on building your product.",
  },
];

const faqs = [
  { q: "What is a dedicated team model?", a: "A dedicated team is a full-time engineering unit assembled exclusively around your product. Unlike freelancers or short-term contractors, a dedicated team integrates into your processes, tools, and delivery rhythm — and stays." },
  { q: "How quickly can a team be assembled?", a: "Typically 3–14 days. We maintain a pre-vetted pool of engineers, designers, QA specialists, and PMs ready to be matched to your stack and goals — no waiting months for local hiring cycles." },
  { q: "Can I scale the team up or down?", a: "Yes. The model is built for elasticity. You can add specialists, reduce headcount, or change the team composition as your roadmap evolves — without re-contracting or disrupting delivery." },
  { q: "Do I control the team's day-to-day work?", a: "Fully. The team integrates into your tools, sprints, and standups. You direct the work; we handle hiring, HR, compliance, and admin so you never have to." },
  { q: "What roles can be part of my dedicated team?", a: "Engineers (frontend, backend, fullstack, mobile), AI/ML specialists, DevOps, QA, product designers, and product managers — assembled based on your specific needs and technology stack." },
  { q: "How does dedicated team compare to hiring in-house?", a: "You get equivalent output at 2–4x lower cost, with zero hiring overhead. No recruitment, no benefits admin, no compliance risk. And you can ramp up in two weeks instead of four months." },
  { q: "Is the team working exclusively on my product?", a: "Yes. Dedicated teams work only on your product during the engagement — not split across multiple clients. That focus is what drives the knowledge depth and velocity you're paying for." },
  { q: "What happens if a team member isn't the right fit?", a: "We replace them quickly with no disruption to your delivery. Talent management is our responsibility — you flag the issue, we resolve it." },
];

/* ── FAQ Item ── */
function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="rounded-2xl border overflow-hidden transition-all duration-200"
      style={{ border: isOpen ? "1.5px solid rgba(0,72,255,0.25)" : "1.5px solid #e5e7eb", background: isOpen ? "rgba(0,72,255,0.03)" : "#fff" }}>
      <button onClick={onClick} className="w-full flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 text-left gap-4 bg-transparent border-none cursor-pointer">
        <span className="text-sm sm:text-[15px] font-semibold leading-snug text-[#0f1c3f]">{q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f1c3f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div style={{ maxHeight: isOpen ? 400 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <p className="px-5 sm:px-7 pb-5 sm:pb-6 text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

const models = [
  {
    num: "01",
    title: "Extended Team Support.",
    body: "Strengthen your in-house team with specialized talent that blends into your workflows, tools, and delivery rhythm — ideal for filling skill gaps quickly without hiring overhead.",
  },
  {
    num: "02",
    title: "Autonomous Delivery Team.",
    body: "A fully independent engineering unit that manages the entire delivery cycle from planning to deployment. Best for businesses wanting end-to-end ownership without internal management load.",
  },
  {
    num: "03",
    title: "Flexible On-Demand Team.",
    body: "A scalable team model built for shifting priorities and dynamic workloads. Add or reduce capacity as your roadmap evolves, ensuring efficient delivery at every stage.",
  },
  {
    num: "04",
    title: "Complete Product Delivery Team.",
    body: "A holistic team covering product discovery, design, development, QA, DevOps, and ongoing support. Ideal for organizations seeking long-term product ownership under one unified team.",
  },
];

/* ── HERO ── */
function DedicatedTeamsHero() {
  return (
    <section className="isolate relative min-h-[80vh] sm:min-h-[92vh] flex flex-col justify-center bg-white border-b border-gray-200">
      <div className="h-px bg-gray-200 w-full absolute top-0" />
      <div className="absolute right-0 top-28 hidden lg:block h-[58%] w-px bg-gray-200" />

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-14 sm:pb-20 w-full relative">
        <div className="max-w-4xl">

          <motion.div className="inline-flex items-center gap-2 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#0048ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" /> Engagement Model
            </span>
          </motion.div>

          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-5" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            Dedicated Teams
            <span className="block text-[#0048ff]">Built Around Your Product</span>
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
            Cost-effective. Flexible. AI-forward. Partner with us across engineering, cloud, and product.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-4 mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}>
            <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
              Build your team
            </ContactButton>
            <Link href="/about" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all no-underline">
              About us <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </Link>
          </motion.div>

          <motion.div className="flex flex-wrap items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
            {["3–14 Day Ramp-up", "Full IP Ownership", "AI-Forward Teams", "Scale Anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 ring-1 ring-gray-200 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0048ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>{t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Floating card */}
        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="w-[310px] rounded-lg border border-gray-100 bg-white p-6 text-[#0f1c3f]" style={{ boxShadow: "0 18px 55px rgba(15,28,63,0.08)" }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0048ff] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#0f1c3f]">Your dedicated team</p>
                  <p className="text-[10px] text-gray-400">Assembled in 3–14 days</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[9px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Active
              </span>
            </div>
            {/* Team roster */}
            <div className="flex flex-col gap-1 mb-5">
              {[
                { initials: "SR", name: "Sara R.", role: "Lead Engineer", color: "#0048ff" },
                { initials: "MK", name: "Mike K.", role: "AI Specialist", color: "#7c3aed" },
                { initials: "AL", name: "Aisha L.", role: "Product Designer", color: "#0891b2" },
                { initials: "JT", name: "James T.", role: "DevOps Engineer", color: "#059669" },
              ].map(({ initials, name, role, color }) => (
                <div key={name} className="flex items-center gap-2.5 py-1.5 border-b border-gray-50 last:border-0">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: color }}>{initials}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-[#0f1c3f] truncate">{name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{role}</p>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                </div>
              ))}
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-1 border-t border-gray-100 pt-4">
              {[["40%", "Faster"], ["500+", "Projects"], ["98%", "On-time"]].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className="text-[13px] font-bold text-[#0048ff]">{v}</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function DedicatedTeamsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
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
      <DedicatedTeamsHero />

      {/* 2. WHY IT MATTERS */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">

          <div className="flex-1">
            <Reveal>
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-6">
                / Why it matters
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-[17px] font-medium text-[#0f1c3f] leading-relaxed mb-5 max-w-[600px]">
                Most companies hire wrong — too slow, too expensive, or too fragmented to ship anything meaningful.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-[600px]">
                Freelancers disappear. Short-term contractors don&apos;t care about your codebase.
                In-house hiring takes months and costs a fortune before a single line ships.
                The dedicated team model fixes all three — you get a full-time unit that operates
                like an internal team, without the overhead.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[600px]">
                We handle hiring, onboarding, HR, compliance, and admin. You focus on the product.
                Ramp up in 3–14 days, scale elastically as your roadmap evolves, and cut engineering
                costs by 2–4x compared to equivalent in-house capacity.
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
                  The dedicated team model isn&apos;t outsourcing — it&apos;s an extension of your own engineering org, without the hiring risk.
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-[#0048ff]/10">
                  <div className="w-9 h-9 rounded-xl bg-[#0048ff] flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                    <Image src="/logo/light-acrobit-icon.png" alt="Acrobit" width={28} height={28} className="object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f1c3f]">Acrobit</p>
                    <p className="text-xs text-gray-400">Engagement Model</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AI-FORWARD STATEMENT */}
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
                Teams that are{" "}
                <span
                  className="relative inline-block"
                  style={{ borderBottom: "3px solid rgba(255,255,255,0.5)", paddingBottom: "2px" }}
                >
                  AI-forward
                </span>
                , assembled for you.
              </h2>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/services/ai-software-development"
                  className="inline-flex items-center gap-3 bg-white text-[#0048ff] text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Our AI capabilities
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
                Every engineer we place is trained on modern AI tooling — not as a gimmick, but
                as a genuine productivity multiplier. Your team ships faster because they work
                smarter at every layer of the stack.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-white/80 text-[15px] leading-relaxed">
                We match engineers to your tech stack and product domain — not just their CV.
                You get specialists who ramp up in days, not months, and integrate into your
                existing processes from day one.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/80 text-[15px] leading-relaxed">
                Whether you need a single specialist or a full cross-functional unit, we assemble
                the right team composition for the work — and adjust it as your roadmap evolves.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. STATS */}
      <section className="bg-[#f5f8ff] border-y border-gray-100 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-gray-200">
            {stats.map(({ value, suffix, label, note }, i) => (
              <Reveal key={label} delay={i * 0.08} className="px-4 sm:px-8 py-6 first:pl-0 last:pr-0">
                <p
                  className="font-bold text-[#0048ff] leading-none mb-2 tabular-nums"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.8rem)" }}
                >
                  <Counter to={value} suffix={suffix} />
                </p>
                <p className="text-sm font-semibold text-[#0f1c3f] mb-1">{label}</p>
                <p className="text-xs text-gray-400">{note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KEY DELIVERABLES */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">
              / Key deliverables
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">
              What you actually get with this model.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {deliverables.map(({ num, title, body }, i) => (
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

      {/* 5. ENGAGEMENT MODELS */}
      <section className="bg-[#f5f8ff] py-14 sm:py-20 px-4 sm:px-6 border-y border-gray-100">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">
              / Choose your model
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">
              The model that fits your need.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[480px] mt-3">
              Every engagement is different. Pick the structure that matches your team, timeline, and delivery expectations.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {models.map(({ num, title, body }, i) => (
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
            AI-forward engineers trained across the full stack
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
                  { name: "TypeScript", img: "/icons/ts.png" },
                  { name: "Next.js", img: "/icons/next js.webp" },
                  { name: "Tailwind", img: "/icons/tailwind.webp" },
                  { name: "Node.js", img: "/icons/node js.png" },
                  { name: "PostgreSQL", img: "/icons/postgresql.webp" },
                  { name: "OpenAI", img: "/icons/open ai.webp" },
                  { name: "FastAPI", img: "/icons/fast api.png" },
                  { name: "Supabase", img: "/icons/supabase.webp" },
                  { name: "Docker", img: "/icons/Docker.svg" },
                  { name: "AWS", img: "/icons/aws.svg" },
                  { name: "Python", img: "/icons/python.svg" },
                  { name: "Angular", img: "/icons/angular.svg" },
                  { name: "Vue", img: "/icons/vue.svg" },
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

      {/* 7. FAQ */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">/ FAQ</p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">Frequently asked questions.</h2>
          </Reveal>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.03}>
                <FAQItem q={faq.q} a={faq.a} isOpen={openFAQ === i} onClick={() => setOpenFAQ(openFAQ === i ? null : i)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
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
                    / Ready to scale?
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2
                    className="font-medium text-[#0f1c3f] tracking-tight max-w-2xl mx-auto mb-5"
                    style={{ fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)", lineHeight: 1.1 }}
                  >
                    Build your dedicated team in as little as 14 days.
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto mb-8 sm:mb-9">
                    Tell us your stack, your goals, and your timeline. We&apos;ll assemble the right
                    engineers, designers, and specialists — and have them working on your product
                    within two weeks.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <ContactButton
                        className="inline-flex items-center gap-2 bg-[#0048ff] text-white text-sm font-semibold px-7 py-3.5 sm:px-8 sm:py-4 rounded-full hover:bg-[#0035cc] transition-colors"
                      >
                        Start the conversation
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
