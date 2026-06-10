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
    const obs = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, decimals]);
  return <span ref={ref}>{decimals ? count.toFixed(1) : count}{suffix}</span>;
}

/* ── Reveal ── */
function Reveal({ children, delay = 0, className = "", y = 24 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* ── DATA ── */
const stats = [
  { value: 200, suffix: "+", label: "AI-forward developers",  note: "across every layer of the stack" },
  { value: 17,  suffix: "+", label: "Years in business",      note: "of structured project delivery" },
  { value: 500, suffix: "+", label: "Projects delivered",     note: "on scope, on budget, on time" },
  { value: 98,  suffix: "%", label: "On-time delivery rate",  note: "measured across all engagements" },
];

const reasons = [
  {
    num: "01",
    title: "Predictable costs from the first conversation.",
    body: "You know the full project cost before development starts. This gives you financial clarity and confidence to plan without the risk of unexpected budget changes mid-way through delivery.",
  },
  {
    num: "02",
    title: "Clear scope, defined deliverables, zero ambiguity.",
    body: "All features, milestones, and timelines are agreed upfront, ensuring every stakeholder is aligned on exactly what will be delivered — and when.",
  },
  {
    num: "03",
    title: "Faster time to market through structured execution.",
    body: "With a locked plan and fixed scope, our teams move quickly and efficiently toward delivery without the overhead of continuous re-scoping or negotiation.",
  },
  {
    num: "04",
    title: "Lower risk, higher control throughout the project.",
    body: "A well-defined scope reduces uncertainty, prevents scope creep, and ensures measurable progress at every milestone — so you always know where things stand.",
  },
];

const approachSteps = [
  { num: "01", title: "Define scope and requirements", body: "Outline all project goals, features, user flows, and functional requirements in collaboration with your stakeholders. Document acceptance criteria and constraints so there is full alignment before work begins." },
  { num: "02", title: "Establish a fixed estimate and delivery plan", body: "Calculate required resources, effort, and timeline to deliver the defined scope. Agree on a fixed project cost and milestone-based schedule, giving you budget certainty and clear checkpoints." },
  { num: "03", title: "Allocate the right team and schedule work", body: "Assign developers, designers, and QA engineers based on the skills and experience needed for your project scope. Create a work schedule aligned to the timeline and milestones defined upfront." },
  { num: "04", title: "Execute design and development efficiently", body: "Build the solution according to approved design and technical specifications. Follow best practices in code reviews and version control to maintain quality, tracking progress against milestones throughout." },
  { num: "05", title: "Validate quality through structured testing", body: "Conduct rigorous QA phases including unit testing, integration testing, and user acceptance testing at defined milestones. Verify all features meet the acceptance criteria defined at the outset." },
  { num: "06", title: "Deliver the completed solution", body: "Provide the final product with all necessary documentation, deployment scripts, and support materials. Facilitate smooth deployment and offer guidance for post-launch validation." },
  { num: "07", title: "Ongoing support and iteration", body: "Offer maintenance, bug fixes, and performance improvements under a support agreement. Provide flexibility to scale, add features, or transition into a different engagement model as your needs evolve." },
];

const useCases = [
  { num: "1", title: "Clearly scoped feature builds", body: "Choose fixed-price when your project has a clearly defined scope, stable requirements, and a need for predictable costs and timelines." },
  { num: "2", title: "UI/UX redesigns and module development", body: "Ideal for focused initiatives with well-defined requirements unlikely to change — such as UI redesigns, contained web or mobile applications, or standalone module builds." },
  { num: "3", title: "Routine maintenance and support packages", body: "A strong fit for consistent, repeatable workflows — documentation updates, support packages, or any service where outcomes can be clearly outlined upfront." },
  { num: "4", title: "Stable product or feature sets", body: "Works well when building a product with stable functionality, predictable behavior, and minimal expected scope changes during execution." },
];

const whyPartner = [
  { num: "01", title: "Work with top-vetted engineering talent.", body: "Every engineer goes through a rigorous process that tests technical proficiency, problem-solving ability, communication, and cultural alignment. Only highly capable professionals move forward." },
  { num: "02", title: "Agile, fast, and fully transparent delivery.", body: "Projects run on Agile methodologies and modern DevOps practices — structured sprints, automated pipelines, and real-time communication ensuring full visibility across every milestone." },
  { num: "03", title: "ISO 9001 & ISO 27001 certified quality.", body: "Delivery processes follow globally recognized quality and security standards. NDA compliance, secure workflows, data protection, and continuous QA are embedded into every phase." },
  { num: "04", title: "End-to-end lifecycle ownership.", body: "From discovery and planning through development, testing, and launch — each phase is defined, tracked, and approved, making even complex projects structured and predictable." },
];

const faqs = [
  { q: "What is a fixed-price engagement model?", a: "A fixed-price engagement means scope, deliverables, timeline, and total cost are agreed upfront. The project is delivered for that set price — giving you clarity and full budget predictability." },
  { q: "When does fixed-price make sense?", a: "Fixed-price works best when requirements are well-defined and unlikely to change significantly. If you have a clear brief, stable scope, and need cost certainty, this is typically the right model." },
  { q: "Will I have full cost and schedule visibility before work starts?", a: "Yes. Before a single line of code is written, you receive a detailed project plan mapping deliverables, timelines, costs, and milestones. Nothing starts without your sign-off." },
  { q: "What happens if requirements change mid-project?", a: "Changes outside the agreed scope are handled through a formal change request process. Any additions are assessed for impact on cost and timeline before being approved — keeping everything transparent." },
  { q: "Who bears the risk of overruns — cost or timeline?", a: "Under a fixed-price model, we absorb the risk of cost overruns on work within the agreed scope. Timeline extensions caused by changes you introduce are handled through change requests." },
  { q: "What kind of projects are best suited for fixed-price?", a: "Feature builds, UI/UX redesigns, MVP development, module builds, maintenance packages, and contained web or mobile applications. Essentially any project with a stable, well-documented scope." },
  { q: "Does fixed-price simplify project management for me?", a: "Significantly. A stable roadmap means fewer decisions, less overhead, and minimal oversight from your side. You review milestones and approve deliverables — we handle the execution." },
  { q: "Are there drawbacks to fixed-price I should consider?", a: "The model is less suited for exploratory work or rapidly evolving requirements. If your scope is likely to shift, a time-and-material or dedicated team model may serve you better." },
  { q: "How do you ensure quality and delivery under fixed-price?", a: "Through milestone-gated QA, structured code reviews, automated testing pipelines, and defined acceptance criteria agreed at project start. Every deliverable is validated before sign-off." },
  { q: "Can we transition to another model after a fixed-price project?", a: "Absolutely. Many clients use a fixed-price engagement to validate direction, then transition into a dedicated team or ODC model for ongoing development. We make that transition seamless." },
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

/* ── HERO ── */
function FixedPriceHero() {
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
            Fixed-Price Projects —
            <span className="block text-[#0048ff]">Budget Certainty, Zero Surprises</span>
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
            Scope locked. Cost agreed. Delivered on time. The model for teams who need clarity from day one.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-4 mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}>
            <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
              Start your project
            </ContactButton>
            <Link href="/about" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all no-underline">
              About us <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </Link>
          </motion.div>

          <motion.div className="flex flex-wrap items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
            {["98% On-Time Delivery", "Fixed Scope & Cost", "Full IP Ownership", "Zero Hidden Fees"].map((t) => (
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#0f1c3f]">Milestone tracker</p>
                  <p className="text-[10px] text-gray-400">98% on-time delivery</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[9px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                On track
              </span>
            </div>
            {/* Milestones */}
            <div className="mb-5">
              {[
                { label: "Scope & estimate",   done: true,  active: false },
                { label: "Design approved",    done: true,  active: false },
                { label: "Development sprint", done: false, active: true  },
                { label: "QA & sign-off",      done: false, active: false },
                { label: "Delivery & launch",  done: false, active: false },
              ].map(({ label, done, active }, i, arr) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: done ? "#0048ff" : active ? "#0048ff" : "#e5e7eb", background: done ? "#0048ff" : active ? "#e8eeff" : "#fff" }}>
                      {done && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>}
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff]" />}
                    </div>
                    {i < arr.length - 1 && <div className="w-px my-1" style={{ height: 12, background: done ? "#0048ff" : "#e5e7eb" }} />}
                  </div>
                  <p className="pb-3 text-[11px] leading-tight" style={{ color: done ? "#0f1c3f" : active ? "#0048ff" : "#9ca3af", fontWeight: active || done ? 600 : 400 }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-1 border-t border-gray-100 pt-4">
              {[["98%", "On-time"], ["500+", "Delivered"], ["0", "Overruns"]].map(([v, l]) => (
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

/* ── PAGE ── */
export default function FixedPricePage() {
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
      <FixedPriceHero />

      {/* 2. WHY IT MATTERS */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="flex-1">
            <Reveal>
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-6">/ Why it matters</p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-[17px] font-medium text-[#0f1c3f] leading-relaxed mb-5 max-w-[600px]">
                Variable billing turns every sprint into a financial question you shouldn't have to answer.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-[600px]">
                Time-and-material projects shift risk entirely onto you. Every change request, every delay,
                every scope conversation becomes a budget conversation. The fixed-price model removes that
                entirely — you agree a number, we deliver against it.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[600px]">
                This works because we invest heavily upfront in scoping. Requirements are documented,
                milestones are mapped, and acceptance criteria are agreed before a line of code is written.
                The result is a project that stays on track — because it was set up to.
              </p>
            </Reveal>
          </div>

          <div className="lg:w-[380px] flex-shrink-0">
            <Reveal delay={0.18}>
              <motion.div
                className="rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] p-6 sm:p-8 h-full"
                style={{ minHeight: "240px" }}
                whileHover={{ y: -4, boxShadow: "0 0 0 2px rgba(0,72,255,0.3), 0 12px 32px rgba(0,72,255,0.08)" }}
                transition={{ duration: 0.22 }}
              >
                <div className="text-[72px] font-black text-[#0048ff] leading-none mb-4 select-none" style={{ opacity: 0.12, lineHeight: "0.8" }} aria-hidden="true">"</div>
                <p className="text-[16px] font-medium text-[#0f1c3f] leading-relaxed mb-6">
                  Fixed-price isn&apos;t a constraint — it&apos;s a discipline. It forces clarity upfront and keeps everyone honest throughout.
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

      {/* BLUE STATEMENT */}
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6" style={{ background: "#0048ff" }}>
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)" }} />
        <div className="relative max-w-[1350px] mx-auto flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">
          <div className="lg:w-[480px] flex-shrink-0">
            <Reveal>
              <h2 className="text-white font-medium leading-[1.08] tracking-tight mb-6 sm:mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}>
                Delivered by{" "}
                <span className="relative inline-block" style={{ borderBottom: "3px solid rgba(255,255,255,0.5)", paddingBottom: "2px" }}>AI-forward</span>
                {" "}engineers.
              </h2>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/services/ai-software-development" className="inline-flex items-center gap-3 bg-white text-[#0048ff] text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
                  Our AI capabilities
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </Link>
              </motion.div>
            </Reveal>
          </div>
          <div className="flex-1 flex flex-col gap-5 sm:gap-6">
            <Reveal delay={0.08}>
              <p className="text-white/80 text-[15px] leading-relaxed">
                Every engineer on a fixed-price engagement uses modern AI tooling as a core part of how
                they work — not a bolt-on. That means more output per sprint, cleaner code, and faster
                turnaround on reviews and testing.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-white/80 text-[15px] leading-relaxed">
                We scope carefully, execute efficiently, and gate every milestone with structured QA.
                The fixed price holds because our process is built to contain scope, not discover it mid-flight.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/80 text-[15px] leading-relaxed">
                And when the project is done, you own everything — code, documentation, deployment scripts —
                with a clear transition path if you want to keep building.
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

      {/* 4. WHY FIXED-PRICE MAKES A DIFFERENCE */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">/ Why fixed-price</p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">What choosing fixed-price does for your business.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {reasons.map(({ num, title, body }, i) => (
              <motion.div key={num}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
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

      {/* 5. TECH MARQUEE */}
      <section className="bg-[#f5f8ff] border-y border-gray-100 py-10 overflow-hidden">
        <div className="max-w-[1350px] mx-auto">
          <p className="text-center text-xs font-semibold tracking-[0.18em] uppercase text-gray-400 mb-8">AI-forward engineers trained across the full stack</p>
        </div>
        <div className="max-w-[1350px] mx-auto">
          <div className="relative flex overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-16 sm:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #f5f8ff, transparent)" }} />
            <div className="absolute right-0 top-0 h-full w-16 sm:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #f5f8ff, transparent)" }} />
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

      {/* 6. APPROACH */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">/ Our approach</p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">How we run fixed-price engagements.</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[480px] mt-3">
              Seven structured phases from initial scoping to post-launch support — each gated, documented, and signed off.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {approachSteps.map(({ num, title, body }, i) => (
              <motion.div key={num}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
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

      {/* 7. USE CASES */}
      <section className="bg-[#f5f8ff] py-14 sm:py-20 px-4 sm:px-6 border-y border-gray-100">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">/ Use cases</p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">When fixed-price is the right call.</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {useCases.map(({ num, title, body }, i) => (
              <motion.div key={num}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
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

      {/* 8. WHY PARTNER WITH US */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">/ Why choose us</p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">How partnering with us benefits you.</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {whyPartner.map(({ num, title, body }, i) => (
              <motion.div key={num}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-[#f5f8ff] rounded-2xl border border-gray-100 p-5 sm:p-7 overflow-hidden"
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
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
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
      <section className="bg-[#f5f8ff] py-14 sm:py-20 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-[1350px] mx-auto">
          <Reveal>
            <motion.div
              className="rounded-3xl border border-[#0048ff]/20 bg-white px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 text-center overflow-hidden relative"
              whileHover={{ boxShadow: "0 0 0 2px rgba(0,72,255,0.25), 0 24px 48px rgba(0,72,255,0.07)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,72,255,0.06) 0%, transparent 60%)" }} />
              <div className="relative">
                <Reveal delay={0}>
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-5">/ Ready to start?</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="font-medium text-[#0f1c3f] tracking-tight max-w-2xl mx-auto mb-5" style={{ fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)", lineHeight: 1.1 }}>
                    Start your fixed-price project with full confidence.
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto mb-8 sm:mb-9">
                    Tell us what you&apos;re building. We&apos;ll scope it, price it, and deliver it — on budget, on time, with everything documented from day one.
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
                    <p className="text-xs text-gray-400 w-full mt-1">Reply within 4 business hours · No spam, ever</p>
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
