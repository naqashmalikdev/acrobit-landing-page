"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, ChevronLeft,
  Target, Users, Lightbulb, Map, ShieldCheck,
  FileText, GitBranch, Search, Layers,
  TrendingUp, AlertTriangle, Compass,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactButton from "@/app/components/ContactButton";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-t border-gray-200 transition-colors duration-200 last:border-b">
      <button onClick={onClick} className="w-full flex items-center justify-between px-0 py-5 sm:py-6 text-left gap-5 cursor-pointer">
        <span className="text-sm sm:text-base font-medium leading-snug text-[#0f1c3f]">{q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f1c3f" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div style={{ maxHeight: isOpen ? 500 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <p className="pb-6 text-sm text-gray-500 leading-relaxed max-w-3xl">{a}</p>
      </div>
    </div>
  );
}

const stats = [
  { value: "68%", source: "Standish Group", desc: "of software projects fail or are challenged due to unclear requirements and poor stakeholder alignment — not technical execution." },
  { value: "3×", source: "PMI", desc: "more likely to deliver on time, on scope, and within budget — teams that run structured discovery before development." },
  { value: "100×", source: "IBM Systems Sciences", desc: "more expensive to fix a requirement error in production than to surface and resolve it during discovery." },
];

const workshopTypes = [
  { icon: Compass, title: "Product Discovery Workshop", subtitle: "For teams defining what to build", desc: "When you have a product idea but are not confident about scope, prioritization, or user fit — this workshop brings your leadership, product, and engineering teams together to define what to build, for whom, and in what sequence. You leave with a validated product brief, prioritized feature set, and shared understanding of the problem you are solving.", deliverables: ["Product brief", "Prioritized feature backlog", "User persona alignment", "Go/no-go decision framework"], duration: "1–2 days", ideal: "Pre-development, new product launches" },
  { icon: GitBranch, title: "Technical Discovery Workshop", subtitle: "For teams scoping architecture and risk", desc: "When stakeholders are aligned on direction but the technical path is unclear — this workshop surfaces architecture options, integration complexity, infrastructure requirements, and engineering risk. Your CTO, architects, and senior engineers work through constraints together so your roadmap is grounded in technical reality, not optimism.", deliverables: ["Architecture options brief", "Integration complexity map", "Technical risk register", "Build-vs-buy recommendation"], duration: "1–3 days", ideal: "Complex integrations, legacy modernization" },
  { icon: Map, title: "UX Discovery Workshop", subtitle: "For teams designing user-centered products", desc: "When you need to understand your users before designing your solution — this workshop maps real user journeys, surfaces pain points, and aligns the team on design direction before wireframes are drawn. It eliminates guesswork about user behavior and ensures your UX investments target the moments that matter most.", deliverables: ["User journey maps", "Pain point prioritization", "Design direction brief", "UX success metrics"], duration: "1–2 days", ideal: "New products, redesigns, UX audits" },
  { icon: Target, title: "Strategic Alignment Workshop", subtitle: "For leadership and cross-functional teams", desc: "When leadership, product, and engineering are not fully aligned on vision, priorities, or constraints — this facilitated session resolves ambiguity at the decision-making level. We surface conflicting assumptions, facilitate structured debate, and build shared commitment to a single direction before execution begins.", deliverables: ["Shared vision statement", "Priority alignment matrix", "Decision log", "Constraint register"], duration: "Half day to 1 day", ideal: "New initiatives, organizational change" },
];

const processSteps = [
  { num: "01", icon: Search, title: "Pre-workshop preparation", desc: "Before the room convenes, we gather context so the workshop itself is spent solving — not catching up. We conduct stakeholder interviews, review existing documentation, and identify the specific assumptions, gaps, and tensions that need to surface.", items: ["Stakeholder interviews", "Document review", "Assumption inventory", "Agenda design"] },
  { num: "02", icon: Users, title: "Stakeholder alignment session", desc: "We open by surfacing each participant's understanding of the goal, constraints, and success criteria. Divergence in the room is expected — and valuable. Identifying it early prevents it from derailing execution six months later.", items: ["Goal alignment", "Constraint mapping", "Success criteria definition", "Risk identification"] },
  { num: "03", icon: Lightbulb, title: "Problem and opportunity mapping", desc: "With alignment established, we map the core problem space — user needs, business constraints, technical realities. This is where assumptions are tested against evidence and the real scope of the challenge becomes clear.", items: ["Problem statement definition", "User need validation", "Opportunity sizing", "Scope boundary setting"] },
  { num: "04", icon: Layers, title: "Solution exploration and prioritization", desc: "We explore the solution space together — generating options, evaluating trade-offs, and stress-testing approaches against your constraints. Prioritization is structured and explicit so the output reflects agreed reasoning, not the loudest voice in the room.", items: ["Option generation", "Trade-off analysis", "Effort-vs-impact scoring", "Decision documentation"] },
  { num: "05", icon: FileText, title: "Roadmap and risk documentation", desc: "We close with a documented output: a clear direction, an ordered roadmap, a risk register with mitigation owners, and explicit decision log entries. Every participant leaves knowing exactly what was decided and why.", items: ["Roadmap draft", "Risk register with owners", "Decision log", "Next steps with accountability"] },
];

const outcomes = [
  { icon: Users, title: "Aligned stakeholders", desc: "Every decision-maker leaves with the same understanding of direction, priorities, and constraints — no more conflicting interpretations after kickoff." },
  { icon: ShieldCheck, title: "Validated direction", desc: "Assumptions are tested before development starts. You invest in the right solution, not the first one that sounded good in a meeting." },
  { icon: FileText, title: "Prioritized backlog", desc: "Features are ranked by impact and feasibility with explicit reasoning — so your engineering team can start work without scope uncertainty." },
  { icon: AlertTriangle, title: "Risks surfaced early", desc: "Technical, product, and organizational risks are identified and assigned mitigation owners before they become blockers mid-sprint." },
];

const forWhom = [
  { icon: Compass, label: "New product teams", desc: "Launching something new and need alignment before the first line of code is written." },
  { icon: GitBranch, label: "Legacy modernization", desc: "Migrating or rebuilding existing systems where technical complexity and stakeholder risk are high." },
  { icon: Lightbulb, label: "Startups pre-build", desc: "Validating product direction and de-risking the investment before committing to a full development cycle." },
  { icon: TrendingUp, label: "Enterprise initiatives", desc: "Cross-functional programs where leadership alignment and decision clarity are prerequisites for execution." },
];

const caseStudies = [
  { tag: "Healthcare · Discovery", title: "Discovery workshop condensed 6 months of misaligned requirements into a 2-day aligned roadmap", metric: "2 days", metricLabel: "vs. 6 months" },
  { tag: "Legal Services · Technical Discovery", title: "Technical discovery identified three critical integration risks before architecture was locked", metric: "3", metricLabel: "Risks caught early" },
  { tag: "Manufacturing · Strategic Alignment", title: "Strategic alignment workshop resolved 4 months of leadership disagreement in a single day", metric: "1 day", metricLabel: "To full alignment" },
  { tag: "E-Commerce · UX Discovery", title: "UX discovery revealed users' primary frustration was not what the product team had assumed", metric: "+CV", metricLabel: "Conversion lift" },
];

const faqs = [
  { q: "How long does a discovery workshop typically take?", a: "Duration depends on scope and workshop type. A focused strategic alignment session can run half a day. A full product discovery covering problem mapping, solution exploration, and roadmap documentation typically takes one to two days. Technical discovery workshops covering architecture, integration, and risk often run two to three days. We scope the duration based on your specific situation during the pre-engagement conversation." },
  { q: "Who should attend from our side?", a: "The right participants depend on the workshop type. Product discovery requires your product owner or CPO, at least one senior engineer, and any key business stakeholders. Technical discovery needs your CTO or lead architect, senior engineers, and relevant integration owners. We recommend keeping attendance tight — five to eight people produces better outcomes than fifteen, because every person in the room changes the group dynamics." },
  { q: "What do we receive after the workshop?", a: "You receive documented deliverables specific to the workshop type — typically a decision log, risk register with mitigation owners, prioritized backlog or roadmap, alignment brief, and next-steps document with accountability assignments. Deliverables are provided within two business days of the workshop closing session." },
  { q: "Can discovery workshops be run remotely?", a: "Yes. We facilitate remote workshops using structured virtual collaboration tools. Remote sessions require slightly more preparation and tighter facilitation to maintain focus, but the outputs are equivalent. Fully remote workshops work well for strategic alignment and product discovery. Technical discovery involving complex architecture review benefits from in-person or hybrid format when possible, but is fully achievable remotely." },
  { q: "How is a discovery workshop different from a kickoff meeting?", a: "A kickoff meeting introduces a project and assigns tasks. A discovery workshop surfaces unknowns, tests assumptions, resolves disagreements, and produces documented decisions. Kickoffs assume direction is set. Discovery workshops establish direction. Skipping discovery and moving straight to a kickoff is one of the primary reasons projects encounter major scope changes at sprint five instead of sprint one." },
  { q: "Do you require an NDA before the workshop?", a: "We are happy to sign a mutual NDA before any discovery engagement. We recommend it when the session will involve unreleased product strategy, sensitive business metrics, or proprietary technical architecture. For most engagements, a standard confidentiality agreement is sufficient." },
  { q: "What if we already have a defined scope?", a: "A defined scope is a starting point, not a reason to skip discovery. Most defined scopes contain embedded assumptions that have never been explicitly validated. A short pre-build discovery session focused on stress-testing your existing scope — rather than generating one from scratch — often identifies two or three high-risk assumptions that would have surfaced as change requests during development." },
  { q: "How do we know if we actually need a discovery workshop?", a: "If any of these apply, discovery will save you time and money: you have not aligned your leadership, product, and engineering teams on the same definition of success; you are starting a project with significant technical unknowns; you have had previous projects that ran over scope or required major mid-sprint pivots; or you are about to invest significantly in building something that has not been validated with real users or data." },
];

export default function DiscoveryWorkshopsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeType, setActiveType] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ══ */}
        <section className="relative isolate min-h-[80vh] sm:min-h-[92vh] flex flex-col justify-center overflow-hidden bg-white border-b border-gray-200">
          <div className="absolute inset-x-0 top-0 h-px bg-gray-200" />
          <div className="absolute right-0 top-28 hidden lg:block h-[58%] w-px bg-gray-200" />

          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-14 sm:pb-20 w-full">
            <div ref={heroRef} className="max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE }} className="mb-5 sm:mb-6">
                <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#0048ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" />
                  Discovery Workshops
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-5 sm:mb-7">
                Align teams, validate direction, eliminate costly surprises.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-base sm:text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-8 sm:mb-10">
                Structured facilitation sessions that surface assumptions, align stakeholders, and produce documented decisions — before a single sprint begins. Turn ambiguity into a clear roadmap in one to three focused days.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3, ease: EASE }} className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#0035cc] hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)]">
                  Book a workshop <ArrowRight size={15} />
                </ContactButton>
                <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] no-underline">
                  See case studies <ChevronRight size={15} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.45 }} className="flex flex-wrap items-center gap-4 sm:gap-6">
                {["Facilitated by practitioners", "Documented deliverables", "Remote or on-site", "Same-week availability"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280] ring-1 ring-gray-200">
                    <CheckCircle size={13} className="text-[#0048ff]" /> {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating agenda card — xl only */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-[320px] rounded-lg border border-gray-100 bg-white p-6 text-[#0f1c3f] shadow-[0_18px_55px_rgba(15,28,63,0.08)]">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Sample Workshop Agenda</p>
                {[
                  { time: "09:00", item: "Stakeholder context & goals", active: true },
                  { time: "10:30", item: "Assumption mapping", active: true },
                  { time: "12:00", item: "Problem space definition", active: false },
                  { time: "13:30", item: "Solution exploration", active: false },
                  { time: "15:30", item: "Prioritization & roadmap", active: false },
                  { time: "16:30", item: "Risk register & next steps", active: false },
                ].map(({ time, item, active }, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3.5 last:mb-0">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${active ? "bg-[#0048ff]" : "bg-gray-200"}`} />
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <p className={`text-xs font-medium leading-snug ${active ? "text-[#0f1c3f]" : "text-gray-400"}`}>{item}</p>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">{time}</span>
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">Duration</span>
                  <span className="text-xs font-bold text-[#0048ff]">1–3 days</span>
                </div>
                <ContactButton className="mt-3 flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                  Reserve a session <ArrowRight size={12} />
                </ContactButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <Reveal className="mb-8 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">The cost of skipping discovery</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Why most projects fail before development begins
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                The data is consistent across decades of project research: the majority of software failures trace back to misalignment and unclear requirements — not technical execution.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 border-y border-gray-200">
              {stats.map(({ value, source, desc }, i) => (
                <Reveal key={i} delay={i * 0.08} className="bg-white p-5 sm:p-8 border-r border-gray-200 last:border-r-0 md:[&:nth-child(3)]:border-r-0">
                  <p className="text-4xl sm:text-5xl md:text-6xl font-medium text-[#0048ff] mb-3 leading-none">{value}</p>
                  <p className="text-sm text-[#0f1c3f] font-medium leading-relaxed mb-2">{desc}</p>
                  <span className="text-[11px] uppercase tracking-widest text-[#6b7280]">Source: {source}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WORKSHOP TYPES ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Workshop Types</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Four structured workshops for four distinct challenges
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Each workshop is facilitated around a specific type of uncertainty — product direction, technical architecture, user experience, or leadership alignment.
              </p>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex flex-row lg:flex-col gap-2 lg:w-64 flex-shrink-0 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
                {workshopTypes.map(({ icon: Icon, title, subtitle }, i) => (
                  <button key={i} onClick={() => setActiveType(i)}
                    className={`flex items-start gap-3 text-left px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap lg:whitespace-normal transition-all cursor-pointer border flex-shrink-0 ${activeType === i ? "bg-[#0048ff] text-white border-[#0048ff] shadow-[0_16px_36px_rgba(0,72,255,0.22)] -translate-y-0.5" : "bg-white/80 text-[#6b7280] hover:-translate-y-0.5 hover:text-[#0f1c3f] hover:shadow-[0_12px_30px_rgba(15,28,63,0.08)] border-gray-200"}`}>
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${activeType === i ? "bg-white/20" : "bg-[#f5f8ff]"}`}>
                      <Icon size={13} className={activeType === i ? "text-white" : "text-[#0048ff]"} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug text-sm">{title}</p>
                      <p className={`text-[11px] leading-snug mt-0.5 hidden lg:block ${activeType === i ? "text-white/70" : "text-gray-400"}`}>{subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div key={activeType} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="bg-white rounded-lg border border-gray-100 p-5 sm:p-8 shadow-[0_16px_45px_rgba(15,28,63,0.05)] min-h-[320px]">
                    <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-2">{workshopTypes[activeType].subtitle}</p>
                    <h3 className="text-xl sm:text-2xl font-medium text-[#0f1c3f] leading-tight mb-4">{workshopTypes[activeType].title}</h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed mb-6">{workshopTypes[activeType].desc}</p>
                    <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Deliverables</p>
                    <ul className="space-y-2 mb-6">
                      {workshopTypes[activeType].deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3 border-t border-gray-100 py-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#f5f8ff] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff]" />
                          </span>
                          <span className="text-sm text-[#0f1c3f] font-medium">{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Duration</p>
                          <p className="text-sm font-semibold text-[#0f1c3f]">{workshopTypes[activeType].duration}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Ideal for</p>
                          <p className="text-sm font-semibold text-[#0f1c3f]">{workshopTypes[activeType].ideal}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setActiveType((p) => Math.max(0, p - 1))} disabled={activeType === 0}
                          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#0048ff] hover:text-[#0048ff] transition-colors cursor-pointer bg-white">
                          <ChevronLeft size={16} />
                        </button>
                        <button onClick={() => setActiveType((p) => Math.min(workshopTypes.length - 1, p + 1))} disabled={activeType === workshopTypes.length - 1}
                          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#0048ff] hover:text-[#0048ff] transition-colors cursor-pointer bg-white">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-12 sm:mb-16 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">How It Works</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                From ambiguity to a clear, documented direction
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Every workshop follows a structured facilitation arc — each phase building on the last to turn stakeholder input into actionable, documented decisions.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {processSteps.map(({ num, icon: Icon, title, desc, items }, i) => (
                <Reveal key={num} delay={i * 0.1} className="group bg-white border-b border-gray-200 py-7 sm:py-9 grid grid-cols-1 md:grid-cols-[110px_1fr_260px] gap-5 sm:gap-8 transition-all duration-300 hover:bg-[#f5f8ff] hover:px-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl sm:text-4xl font-medium leading-none text-[#0f1c3f]/15 transition-colors group-hover:text-[#0048ff]">{num}</span>
                    <Icon size={18} className="text-[#0048ff] mt-1 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#0f1c3f] mb-3 group-hover:text-[#0048ff] transition-colors">{title}</h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
                  </div>
                  <ul className="flex flex-col gap-2 md:pt-1">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-[#6b7280]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff] flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHO IT'S FOR ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Who It&apos;s For</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Built for teams making high-stakes decisions
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Discovery workshops deliver the most value when the cost of a wrong decision is high and the cost of spending a day to prevent it is low.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {forWhom.map(({ icon: Icon, label, desc }, i) => (
                <Reveal key={label} delay={i * 0.07} className="group grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8 border-b border-gray-200 px-0 py-7 sm:py-9 transition-all duration-300 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff]">
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-gray-400 tabular-nums">0{i + 1}</span>
                    <Icon size={18} className="text-[#0048ff] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-[#0f1c3f] mb-2 group-hover:text-[#0048ff] transition-colors">{label}</h3>
                    <p className="text-sm sm:text-base text-[#6b7280] leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ OUTCOMES ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-12 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">What You Leave With</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Tangible outputs, not just better conversations
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                A discovery workshop is not a meeting. It produces documented deliverables that drive the next phase of work.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {outcomes.map(({ icon: Icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 0.07} className="group grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8 border-b border-gray-200 px-0 py-7 sm:py-9 transition-all duration-300 hover:bg-white hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff]">
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-gray-400 tabular-nums">0{i + 1}</span>
                    <Icon size={18} className="text-[#0048ff] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-[#0f1c3f] mb-2 group-hover:text-[#0048ff] transition-colors">{title}</h3>
                    <p className="text-sm sm:text-base text-[#6b7280] leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10">
              <div className="rounded-lg border border-gray-100 bg-white p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-[0_12px_34px_rgba(15,28,63,0.05)]">
                <div className="max-w-xl">
                  <h3 className="text-xl font-semibold text-[#0f1c3f] mb-2">Start with a scoping call</h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    Tell us what decision you are trying to make and we will recommend the right workshop format, participants, and duration.
                  </p>
                </div>
                <ContactButton className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0048ff] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#0035cc] transition-colors shadow-[0_18px_44px_rgba(0,72,255,0.22)]">
                  Book a scoping call <ArrowRight size={15} />
                </ContactButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ CASE STUDIES ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-12 flex items-end justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Results</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight">
                  Discovery workshops in practice
                </h2>
              </div>
              <Link href="/projects" className="text-sm font-semibold text-[#0048ff] no-underline hover:underline inline-flex items-center gap-1">
                All case studies <ArrowRight size={14} />
              </Link>
            </Reveal>

            <div className="border-t border-gray-200">
              {caseStudies.map(({ tag, title, metric, metricLabel }, i) => (
                <Reveal key={title} delay={i * 0.07} className="group grid grid-cols-1 md:grid-cols-[140px_1fr_100px] gap-5 sm:gap-8 border-b border-gray-200 py-7 sm:py-9 px-0 transition-all duration-300 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff] cursor-pointer">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0048ff]">{tag.split(" · ")[0]}</span>
                    <p className="text-3xl font-medium text-[#0048ff] leading-none mt-2">{metric}</p>
                    <p className="text-[11px] text-[#6b7280] uppercase tracking-wider mt-1">{metricLabel}</p>
                  </div>
                  <p className="text-base sm:text-lg font-medium text-[#0f1c3f] leading-snug group-hover:text-[#0048ff] transition-colors self-center">{title}</p>
                  <div className="self-center flex items-center justify-end">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0048ff] opacity-0 group-hover:opacity-100 transition-opacity">
                      View <ArrowRight size={12} />
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 sm:gap-16 items-start">
              <Reveal>
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">FAQ</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0f1c3f] leading-tight mb-4">
                  Common questions
                </h2>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
                  Everything you need to know before booking a discovery workshop.
                </p>
                <ContactButton className="inline-flex items-center gap-2 bg-[#0048ff] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#0035cc] transition-colors">
                  Ask us directly <ArrowRight size={13} />
                </ContactButton>
              </Reveal>
              <div className="flex flex-col gap-3">
                {faqs.map(({ q, a }, i) => (
                  <Reveal key={q} delay={i * 0.03}>
                    <FAQItem q={q} a={a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="bg-[#f5f8ff] border-t border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-white px-6 py-10 text-center shadow-[0_12px_34px_rgba(15,28,63,0.05)] sm:px-10 sm:py-14 lg:py-16">
              <div className="relative">
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-4">Get Started</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-5 max-w-2xl mx-auto">
                  Ready to align your team and build the right thing?
                </h2>
                <p className="text-base text-[#6b7280] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                  One to three days of structured facilitation can prevent months of misaligned execution. Tell us what you&apos;re working through and we&apos;ll scope the right workshop.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#0035cc] hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)]">
                    Book a discovery workshop <ArrowRight size={15} />
                  </ContactButton>
                  <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] no-underline">
                    View our work <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
