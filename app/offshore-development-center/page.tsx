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
  { value: 200, suffix: "+", label: "Software developers",  note: "across AI, cloud, and engineering" },
  { value: 17,  suffix: "+", label: "Years in business",    note: "of offshore delivery experience" },
  { value: 500, suffix: "+", label: "Projects delivered",   note: "across 20+ global industries" },
  { value: 60,  suffix: "%", label: "Lower operating costs", note: "vs. equivalent onshore capacity" },
];

const reasons = [
  {
    num: "01",
    title: "Expand capacity without slowing your roadmap.",
    body: "An offshore development center gives you the engineering bandwidth to grow fast — adding skilled engineers, expanding capabilities, and supporting new initiatives without disrupting ongoing delivery.",
  },
  {
    num: "02",
    title: "Tap into specialized global expertise.",
    body: "Our ODC model connects you with a high-quality talent pool spanning multiple disciplines. You get specialized skills and diverse technical perspectives to solve complex challenges at every layer of your stack.",
  },
  {
    num: "03",
    title: "Reduce costs without cutting corners.",
    body: "Building engineering capacity offshore significantly reduces operational spending. You get top-tier execution, predictable monthly costs, and long-term efficiency — without the overhead of local hiring.",
  },
  {
    num: "04",
    title: "Deliver large, complex projects with confidence.",
    body: "For multi-phase initiatives, an ODC provides the bandwidth and technical depth needed to deliver consistently. Your team is equipped to manage scale, architecture, and cross-functional dependencies.",
  },
];

const models = [
  {
    num: "01",
    title: "Dedicated ODC Model.",
    body: "A long-term, fully aligned offshore team working exclusively on your product. High control, consistent delivery, and deep knowledge retention — ideal for evolving systems and ongoing development.",
  },
  {
    num: "02",
    title: "Build-Operate-Transfer (BOT) Model.",
    body: "We set up and run your offshore team, then transfer full ownership to you. Best for companies planning a permanent offshore presence while minimizing early setup risk.",
  },
  {
    num: "03",
    title: "Time & Material (T&M) Model.",
    body: "A flexible, low-commitment model where you pay for actual time and resources used. Ideal for short-term needs, evolving requirements, or experimentation before scaling.",
  },
  {
    num: "04",
    title: "Hybrid ODC Model.",
    body: "A customizable approach combining elements of T&M, Dedicated Teams, and BOT. Start small, adjust as needs evolve, and scale into a long-term structure as your strategy matures.",
  },
];

const faqs = [
  { q: "What is an Offshore Development Center (ODC)?", a: "An ODC is a fully managed offshore engineering unit built around your product. We set up, staff, and operate a dedicated team working exclusively on your systems — at 60% lower cost than equivalent onshore capacity." },
  { q: "How long does it take to launch an ODC?", a: "Our standard ODC launch timeline is 14 days — from needs assessment through infrastructure setup, talent acquisition, and first sprint kickoff. The timeline can vary based on team size and specialisation required." },
  { q: "What are the different ODC operating models?", a: "We offer four: Dedicated ODC (exclusive long-term team), Build-Operate-Transfer (we build it, then hand it over), Time & Material (flexible pay-as-you-go), and Hybrid ODC (a combination tailored to your strategy)." },
  { q: "Who manages the offshore team day-to-day?", a: "We handle all operational management — HR, compliance, infrastructure, and admin. You direct the engineering work directly, with full visibility into sprints, progress, and delivery through shared dashboards." },
  { q: "How do you ensure quality from an offshore team?", a: "Through continuous code reviews, sprint-level QA, automated testing pipelines, and delivery governance aligned to ISO 9001 and ISO 27001 standards. Every team member is vetted for both technical skill and communication." },
  { q: "Can the ODC team be transferred to us later?", a: "Yes. The Build-Operate-Transfer model is specifically designed for companies that want a permanent offshore presence. We build and stabilise the team, then hand full ownership to you at an agreed milestone." },
  { q: "How do time zones work across an ODC?", a: "We design communication rhythms, tooling, and sprint cadences for your specific time zone configuration before kickoff — not after. Overlap hours, async workflows, and nearshore coordination layers are all planned upfront." },
  { q: "What is the minimum team size for an ODC?", a: "We can start with as few as 3–5 engineers and scale from there. Most ODCs begin small to validate fit and process, then expand as confidence and delivery momentum build." },
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

const approachSteps = [
  { num: "01", title: "Needs assessment and planning", body: "A structured evaluation of your project goals, required skills, delivery expectations, and operational constraints — laying the foundation for a sustainable offshore development model." },
  { num: "02", title: "Infrastructure and environment setup", body: "Establish secure infrastructure, communication channels, and development tooling that support effective offshore collaboration, governance, and day-to-day delivery." },
  { num: "03", title: "Talent acquisition and team formation", body: "Identify and onboard engineers, designers, QA professionals, DevOps specialists, and project managers who match your technical profile and delivery culture." },
  { num: "04", title: "Integration and process alignment", body: "Align sprint cycles, tools, and communication patterns with your existing workflows — creating a unified delivery rhythm that reduces friction across distributed time zones." },
  { num: "05", title: "Project execution and management", body: "Begin development with clearly defined milestones, delivery frameworks, and reporting structures. Strong project governance keeps timelines, quality, and productivity on track." },
  { num: "06", title: "Quality assurance and compliance", body: "Continuous testing, code reviews, and performance validation maintain delivery quality. Compliance with security standards ensures safe, reliable execution throughout the engagement." },
  { num: "07", title: "Communication and collaboration", body: "Structured updates, sprint reviews, standups, and shared dashboards enable healthy cross-time-zone coordination and keep distributed teams in sync." },
  { num: "08", title: "Feedback and continuous improvement", body: "Regular retrospectives refine workflows, communication, and technical approaches — reducing bottlenecks and sustaining momentum as the engagement matures." },
  { num: "09", title: "Scalability and long-term planning", body: "Evaluate team performance and plan for future expansion. The ODC evolves to support new products, features, or strategic initiatives as your business grows." },
];

const useCases = [
  { num: "1", title: "Long-term product development", body: "Perfect for businesses building or maintaining complex digital products that require sustained engineering effort and a predictable delivery cycle." },
  { num: "2", title: "Scaling engineering capacity quickly", body: "When speed matters, an ODC helps you expand your team efficiently without the delays and overhead of local recruitment cycles." },
  { num: "3", title: "Accessing specialized skill sets", body: "Ideal when you need domain experts — cloud architects, DevOps engineers, AI specialists, or advanced engineering profiles difficult to source locally." },
  { num: "4", title: "Building a cost-effective delivery hub", body: "An ODC reduces overhead and infrastructure costs, creating a predictable and efficient long-term delivery hub for your organization." },
];


/* ── HERO ── */
function ODCHero() {
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
            Scale Engineering
            <span className="block text-[#0048ff]">With an Offshore Partner</span>
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
            A fully managed offshore development center — built around your product, your stack, and your goals.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-4 mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}>
            <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
              Launch your ODC
            </ContactButton>
            <Link href="/about" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all no-underline">
              About us <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </Link>
          </motion.div>

          <motion.div className="flex flex-wrap items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
            {["60% Cost Reduction", "ISO 27001 Certified", "14-Day Launch", "No Hidden Overhead"].map((t) => (
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#0f1c3f]">ODC launch plan</p>
                  <p className="text-[10px] text-gray-400">Ready in 14 days</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[9px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Active
              </span>
            </div>
            {/* Timeline */}
            <div className="mb-5">
              {[
                { day: "Day 1–3",   label: "Needs assessment",     done: true },
                { day: "Day 4–7",   label: "Infrastructure setup",  done: true },
                { day: "Day 8–12",  label: "Team acquisition",      done: true },
                { day: "Day 13–14", label: "First sprint kickoff",  done: false },
              ].map(({ day, label, done }, i, arr) => (
                <div key={day} className="flex items-start gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: done ? "#0048ff" : "#e5e7eb", background: done ? "#0048ff" : "#fff" }}>
                      {done && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>}
                    </div>
                    {i < arr.length - 1 && <div className="w-px flex-1 my-1" style={{ background: done ? "#0048ff" : "#e5e7eb", minHeight: 12 }} />}
                  </div>
                  <div className="pb-3">
                    <p className="text-[9px] text-gray-400">{day}</p>
                    <p className="text-[11px] font-semibold text-[#0f1c3f]">{label}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-1 border-t border-gray-100 pt-4">
              {[["14d", "Launch"], ["60%", "Savings"], ["ISO", "Certified"]].map(([v, l]) => (
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

export default function ODCPage() {
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
      <ODCHero />

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
                Local hiring is slow, expensive, and often the wrong answer for engineering at scale.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-[600px]">
                Recruitment cycles stretch for months. Salaries compound with benefits, infrastructure,
                and management overhead. And when requirements shift, in-house teams are difficult
                to resize without disruption. An offshore development center removes every one of
                those friction points.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[600px]">
                We set up, operate, and — if needed — transfer a fully functional engineering center
                built around your product. You get experienced talent, governed delivery, and 60%
                lower operating costs, without giving up control of what gets built or how it runs.
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
                  An offshore development center isn&apos;t a cost-cutting measure — it&apos;s a strategic capability that lets you ship more, faster, without bloating your org.
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-[#0048ff]/10">
                  <div className="w-9 h-9 rounded-xl bg-[#0048ff] flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                    <Image src="/logo/light-acrobit-icon.png" alt="Acrobit" width={28} height={28} className="object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f1c3f]">Acrobit</p>
                    <p className="text-xs text-gray-400">Offshore Delivery</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BLUE STATEMENT */}
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6" style={{ background: "#0048ff" }}>
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)" }} />

        <div className="relative max-w-[1350px] mx-auto flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">
          <div className="lg:w-[480px] flex-shrink-0">
            <Reveal>
              <h2 className="text-white font-medium leading-[1.08] tracking-tight mb-6 sm:mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}>
                Your offshore team is{" "}
                <span className="relative inline-block" style={{ borderBottom: "3px solid rgba(255,255,255,0.5)", paddingBottom: "2px" }}>
                  AI-ready
                </span>
                {" "}from day one.
              </h2>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/services/ai-software-development" className="inline-flex items-center gap-3 bg-white text-[#0048ff] text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
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
                Every engineer placed through our ODC model is proficient with modern AI tooling —
                not as an add-on, but as a core part of how they work. Your offshore team is faster
                and more capable than a comparable onshore hire at the same cost point.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-white/80 text-[15px] leading-relaxed">
                We match engineers to your stack and domain, not just their job title. Expect
                specialists who integrate into your processes from day one — with communication
                practices, tooling, and delivery rhythms aligned to your internal team.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/80 text-[15px] leading-relaxed">
                Whether you&apos;re starting with a small unit or scaling to a full multi-discipline
                center, we build the right structure for the work — and evolve it as your
                roadmap demands.
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
                <p className="font-bold text-[#0048ff] leading-none mb-2 tabular-nums" style={{ fontSize: "clamp(2rem, 3.5vw, 3.8rem)" }}>
                  <Counter to={value} suffix={suffix} />
                </p>
                <p className="text-sm font-semibold text-[#0f1c3f] mb-1">{label}</p>
                <p className="text-xs text-gray-400">{note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY BUSINESSES OPT */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">
              / Why businesses opt for an ODC
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">
              What you actually get with this model.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {reasons.map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] p-6 sm:p-8"
                whileHover={{ y: -4, boxShadow: "0 0 0 2px rgba(0,72,255,0.3), 0 12px 32px rgba(0,72,255,0.08)" }}
              >
                <span className="text-[10px] font-bold tracking-widest text-[#0048ff] uppercase opacity-60 block mb-4">{num}</span>
                <h3 className="text-[17px] sm:text-[18px] font-medium text-[#0f1c3f] tracking-tight leading-snug mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ODC OPERATING MODELS */}
      <section className="bg-[#f5f8ff] py-14 sm:py-20 px-4 sm:px-6 border-y border-gray-100">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">
              / Operating models
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">
              The structure that fits your strategy.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[480px] mt-3">
              Not every offshore engagement is the same. Choose the model that matches your timeline, control preference, and long-term plans.
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
                <div className="absolute -top-2 -right-2 font-black text-[#0048ff] select-none pointer-events-none leading-none" style={{ fontSize: "5rem", opacity: 0.04 }} aria-hidden="true">{num}</div>
                <div className="text-[10px] font-bold tracking-widest text-[#0048ff] uppercase opacity-60 mb-4">{num}</div>
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
            AI-ready engineers trained across the full stack
          </p>
        </div>
        <div className="max-w-[1350px] mx-auto">
          <div className="relative flex overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-16 sm:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
            <div className="absolute right-0 top-0 h-full w-16 sm:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-8 sm:gap-10 flex-shrink-0" style={{ animation: "marquee 30s linear infinite", paddingRight: "2.5rem" }}>
                {[
                  { name: "React",      img: "/icons/react.svg" },
                  { name: "TypeScript", img: "/icons/ts.png" },
                  { name: "Next.js",    img: "/icons/next js.webp" },
                  { name: "Tailwind",   img: "/icons/tailwind.webp" },
                  { name: "Node.js",    img: "/icons/node js.png" },
                  { name: "PostgreSQL", img: "/icons/postgresql.webp" },
                  { name: "OpenAI",     img: "/icons/open ai.webp" },
                  { name: "FastAPI",    img: "/icons/fast api.png" },
                  { name: "Supabase",   img: "/icons/supabase.webp" },
                  { name: "Docker",     img: "/icons/Docker.svg" },
                  { name: "AWS",        img: "/icons/aws.svg" },
                  { name: "Python",     img: "/icons/python.svg" },
                  { name: "Angular",    img: "/icons/angular.svg" },
                  { name: "Vue",        img: "/icons/vue.svg" },
                ].map(({ name, img }) => (
                  <div key={name} className="flex items-center gap-2.5 flex-shrink-0 opacity-55 hover:opacity-100 transition-opacity cursor-default">
                    <img src={img} alt={name} className="w-7 h-7 object-contain flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#0f1c3f] whitespace-nowrap tracking-tight">{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. APPROACH */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">
              / Our approach
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">
              How we build your offshore center.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[480px] mt-3">
              Nine structured steps from first conversation to a fully operational, high-performing offshore engineering team.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {approachSteps.map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-[#f5f8ff] rounded-2xl border border-[#0048ff]/10 p-5 sm:p-7 overflow-hidden"
              >
                <div className="absolute -top-2 -right-2 font-black text-[#0048ff] select-none pointer-events-none leading-none" style={{ fontSize: "5rem", opacity: 0.04 }} aria-hidden="true">{num}</div>
                <div className="text-[10px] font-bold tracking-widest text-[#0048ff] uppercase opacity-60 mb-4">{num}</div>
                <h3 className="text-[15px] font-bold text-[#0f1c3f] leading-snug mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. USE CASES */}
      <section className="bg-[#f5f8ff] py-14 sm:py-20 px-4 sm:px-6 border-y border-gray-100">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">
              / Use cases
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">
              When an ODC is the right call.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {useCases.map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 overflow-hidden"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div className="absolute -top-2 -right-2 font-black text-[#0048ff] select-none pointer-events-none leading-none" style={{ fontSize: "5rem", opacity: 0.04 }} aria-hidden="true">{num}</div>
                <div className="text-[10px] font-bold tracking-widest text-[#0048ff] uppercase opacity-60 mb-4">{num}</div>
                <h3 className="text-[15px] font-bold text-[#0f1c3f] leading-snug mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
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

      {/* 10. CTA */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal>
            <motion.div
              className="rounded-3xl border border-[#0048ff]/20 bg-[#f5f8ff] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 text-center overflow-hidden relative"
              whileHover={{ boxShadow: "0 0 0 2px rgba(0,72,255,0.25), 0 24px 48px rgba(0,72,255,0.07)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,72,255,0.06) 0%, transparent 60%)" }} />
              <div className="relative">
                <Reveal delay={0}>
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-5">
                    / Ready to scale offshore?
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="font-medium text-[#0f1c3f] tracking-tight max-w-2xl mx-auto mb-5" style={{ fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)", lineHeight: 1.1 }}>
                    Launch your offshore development center in as little as 14 days.
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto mb-8 sm:mb-9">
                    Tell us your engineering goals and we&apos;ll design the right ODC structure —
                    staffed with the right people, running the right processes, from day one.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <ContactButton className="inline-flex items-center gap-2 bg-[#0048ff] text-white text-sm font-semibold px-7 py-3.5 sm:px-8 sm:py-4 rounded-full hover:bg-[#0035cc] transition-colors">
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
