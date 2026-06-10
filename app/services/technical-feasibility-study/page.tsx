"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, ChevronLeft,
  Search, Layers, GitBranch, BarChart3, ShieldCheck,
  FileText, Zap, TrendingUp, Users, AlertTriangle,
  Settings, Clock, DollarSign, Target, Cpu,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactButton from "@/app/components/ContactButton";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="rounded-2xl border overflow-hidden transition-all duration-200" style={{
      border: isOpen ? "1.5px solid rgba(0,72,255,0.25)" : "1.5px solid #e5e7eb",
      background: isOpen ? "rgba(0,72,255,0.03)" : "#fff",
    }}>
      <button onClick={onClick} className="w-full flex items-center justify-between px-4 sm:px-7 py-4 sm:py-5 text-left gap-4 cursor-pointer bg-transparent border-none">
        <span className="text-sm sm:text-[15px] font-semibold leading-snug" style={{ color: "#0f1c3f" }}>{q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f1c3f" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div style={{ maxHeight: isOpen ? 500 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <p className="px-4 sm:px-7 pb-5 sm:pb-6 text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ── Scrolling Timeline ── */
interface TStep { number: string; icon: React.ElementType; title: string; desc: string; details: string[]; }

function TimelineItem({ step, isLeft }: { step: TStep; isLeft: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.55], [isLeft ? -48 : 48, 0]);
  const Icon = step.icon;
  return (
    <motion.div ref={ref} style={{ opacity, x }}
      className={`relative flex items-center gap-6 md:gap-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <div className="group card-glow bg-white rounded-2xl border border-gray-100 p-7 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "radial-gradient(circle at 30% 30%,rgba(0,72,255,0.05) 0%,transparent 65%)" }} />
          <div className={`mb-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#0048ff] bg-[#e8eeff] px-3 py-1.5 rounded-full border border-[#0048ff]/20 ${isLeft ? "md:ml-auto" : ""}`}>
            Phase {step.number}
          </div>
          <h3 className="text-xl font-semibold text-[#0f1c3f] mb-3 leading-snug group-hover:text-[#0048ff] transition-colors duration-300">{step.title}</h3>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-5">{step.desc}</p>
          <div className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}>
            {step.details.map((d) => (
              <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                <CheckCircle size={10} className="text-[#0048ff] flex-shrink-0" /> {d}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-10 flex-shrink-0">
        <motion.div whileHover={{ scale: 1.12, rotate: 6 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "#0048ff", boxShadow: "0 8px 32px rgba(0,72,255,0.35)" }}>
          <Icon size={22} className="text-white" />
        </motion.div>
      </div>
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}

function ScrollTimeline({ steps }: { steps: TStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">
      <div className="absolute left-1/2 top-0 hidden md:block h-full w-px -translate-x-1/2 bg-gray-100 rounded-full">
        <motion.div className="w-full rounded-full origin-top"
          style={{ height: lineHeight, background: "linear-gradient(to bottom,#0048ff,#3b82f6)", boxShadow: "0 0 12px rgba(0,72,255,0.3)" }} />
      </div>
      <div className="absolute left-8 top-0 block md:hidden h-full w-px bg-gray-100 rounded-full">
        <motion.div className="w-full rounded-full origin-top"
          style={{ height: lineHeight, background: "linear-gradient(to bottom,#0048ff,#3b82f6)" }} />
      </div>
      <div className="space-y-16 md:space-y-24">
        {steps.map((step, i) => <TimelineItem key={i} step={step} isLeft={i % 2 === 0} />)}
      </div>
      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="relative mt-16 flex justify-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "#0048ff", boxShadow: "0 8px 24px rgba(0,72,255,0.3)" }}>
          <CheckCircle size={22} className="text-white" />
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════ DATA ══════════════════════════════ */

const stats = [
  { value: "48%", source: "Gartner", desc: "of enterprise-wide digital initiatives actually meet or exceed their intended business outcome targets — the rest face delays, overruns, or cancellation." },
  { value: "78%", source: "KPMG", desc: "of technology leaders report their organization struggles to keep pace with the rate of change in platforms, architecture, and integration expectations." },
  { value: "62%", source: "Salesforce", desc: "of businesses say their existing data infrastructure is not configured to take full advantage of emerging technologies including AI and automation." },
];

const services = [
  {
    icon: Search,
    title: "Requirements and scope analysis",
    sub: "Clarity before commitment",
    desc: "Ambiguous requirements are the leading cause of scope creep and budget overruns. We translate business goals into clearly defined technical expectations, establish constraints and assumptions, and align every stakeholder on what is in and out of scope before work begins. You invest in building what you actually need — not what someone assumed you meant.",
    points: ["Business goal to technical requirement mapping", "Constraint and assumption documentation", "Stakeholder alignment session", "Scope boundary definition"],
  },
  {
    icon: Layers,
    title: "Technology stack and architecture evaluation",
    sub: "Build on the right foundation",
    desc: "The wrong technology choice costs more to reverse than it cost to make. We assess proposed frameworks, platforms, and architectural patterns against your performance requirements, team capabilities, integration complexity, and long-term maintainability needs. You receive a grounded recommendation — not a trending answer.",
    points: ["Framework and platform suitability review", "Scalability and performance evaluation", "Build-vs-buy and open-source assessment", "Architecture pattern recommendation"],
  },
  {
    icon: GitBranch,
    title: "System compatibility and integration assessment",
    sub: "Map what connects before you connect it",
    desc: "Integration failures are the most common cause of project delays. We review your APIs, databases, third-party services, and legacy systems to identify compatibility gaps, dependency chains, and required changes for smooth interoperability. You know exactly what the integration surface looks like before architecture is locked.",
    points: ["API and data contract review", "Legacy system compatibility analysis", "Integration gap identification", "Dependency and sequencing map"],
  },
  {
    icon: DollarSign,
    title: "Resource, timeline and cost estimation",
    sub: "Plan with numbers you can trust",
    desc: "Unreliable estimates create budget surprises and broken trust. We determine the skill sets, team size, tooling, and infrastructure required to deliver your solution, then produce effort estimates, realistic delivery timelines, and cost range scenarios with explicit assumptions. Your planning is grounded in technical reality, not optimism.",
    points: ["Skill set and team composition requirements", "Infrastructure and tooling cost model", "Phased delivery timeline", "Budget scenarios with confidence ranges"],
  },
  {
    icon: ShieldCheck,
    title: "Risk identification and mitigation planning",
    sub: "Surface blockers before they become crises",
    desc: "Every technical project has risks. The difference between a well-run project and a derailed one is how early those risks are identified and who owns the mitigation. We systematically surface performance, security, compliance, and integration risks, assign severity ratings, and define mitigation actions with owners before a line of code is written.",
    points: ["Performance and scalability risk analysis", "Security and compliance gap review", "Integration and dependency risk register", "Mitigation actions with assigned owners"],
  },
  {
    icon: FileText,
    title: "Feasibility report and recommendations",
    sub: "A decision document, not a slide deck",
    desc: "We close every engagement with a structured feasibility report: a go/no-go recommendation, technical findings, the evaluated options with trade-offs, and a concrete path forward with prioritized next steps. Your leadership team leaves with a shared, documented basis for investment decisions — no guesswork, no conflicting interpretations.",
    points: ["Executive summary with go/no-go position", "Technical findings and architecture options", "Prioritized risk and mitigation register", "Recommended implementation roadmap"],
  },
];

const processSteps: TStep[] = [
  {
    number: "01", icon: Target,
    title: "Requirement analysis",
    desc: "We work with your product, engineering, and business stakeholders to document objectives, define technical expectations, establish constraints, and set measurable success criteria. Nothing proceeds until scope is unambiguous.",
    details: ["Goal and constraint documentation", "Success criteria definition", "Stakeholder alignment", "Scope boundary setting"],
  },
  {
    number: "02", icon: Cpu,
    title: "System architecture review",
    desc: "We analyze your current or proposed architecture — integrations, infrastructure, data flows, and technology choices — mapping what works, what limits you, and what needs to change before build begins.",
    details: ["Architecture pattern assessment", "Infrastructure and data flow review", "Integration surface mapping", "Strength and limitation analysis"],
  },
  {
    number: "03", icon: Layers,
    title: "Technology stack evaluation",
    desc: "We assess the proposed technology choices against your specific performance, scalability, team capability, and integration requirements — with evidence-based scoring across each dimension.",
    details: ["Framework and platform scoring", "Scalability and performance fit", "Team capability alignment", "Long-term maintainability review"],
  },
  {
    number: "04", icon: Clock,
    title: "Resource and timeline estimation",
    desc: "We model the effort, team composition, infrastructure investment, and delivery phases required to build your solution — producing realistic timelines and cost ranges with explicit assumptions, not best-case projections.",
    details: ["Team composition and skill requirements", "Phased effort estimation", "Infrastructure cost modelling", "Delivery timeline with milestones"],
  },
  {
    number: "05", icon: AlertTriangle,
    title: "Technical risk assessment",
    desc: "We systematically identify performance, security, integration, and compliance risks — rating each by severity and likelihood, and defining concrete mitigation actions with accountability owners before the project commits.",
    details: ["Risk identification across all dimensions", "Severity and likelihood scoring", "Mitigation action definition", "Risk ownership assignment"],
  },
  {
    number: "06", icon: FileText,
    title: "Feasibility report and delivery",
    desc: "We deliver a structured, decision-ready report: go/no-go position, full technical findings, architecture options with trade-offs, risk register, and a prioritized implementation roadmap your team can act on immediately.",
    details: ["Go/no-go recommendation", "Architecture options with trade-offs", "Full risk register", "Prioritized implementation roadmap"],
  },
];

const outcomes = [
  { icon: Zap, title: "Faster, more confident decisions", desc: "A comprehensive technical analysis replaces guesswork with evidence. Leadership teams make go/no-go calls in days, not months of investigation." },
  { icon: TrendingUp, title: "Budget and team aligned to reality", desc: "Validated estimates for infrastructure, tooling, and team composition let you allocate resources to actual needs — reducing waste and improving return on investment." },
  { icon: ShieldCheck, title: "Risks eliminated before they compound", desc: "Architecture gaps, compatibility issues, and security concerns are surfaced and assigned mitigation owners before major investment locks in a costly direction." },
  { icon: Settings, title: "Technology stack validated for scale", desc: "Framework, platform, and architecture choices are stress-tested against your growth, performance, and maintainability requirements before they become irreversible." },
  { icon: DollarSign, title: "No budget surprises mid-delivery", desc: "Early insight into effort, timelines, and cost constraints enables realistic planning, prevents mid-project scope explosions, and improves on-time delivery rates significantly." },
];

const caseStudies = [
  { tag: "Fintech · Feasibility", title: "42% reduction in projected development cost by surfacing architectural gaps before design was locked", company: "Payments Platform", quote: "The assessment revealed an architecture decision that would have multiplied our infrastructure costs. Fixing it before build saved us months and significant budget.", person: "CTO", role: "Leading Digital Payments Provider", highlight: "42% cost reduction" },
  { tag: "E-Commerce · Feasibility", title: "60% improvement in delivery predictability through validated estimates and a technically grounded roadmap", company: "National Retailer", quote: "We finally had estimates built on real technical analysis. The roadmap was credible from day one and we delivered inside it.", person: "Head of Technology", role: "National Retail Brand", highlight: "60% predictability gain" },
  { tag: "Healthcare · Feasibility", title: "25+ integration risks identified across clinical, billing, and third-party systems before a single integration was built", company: "Regional Healthtech", quote: "We uncovered complexity we did not know existed. Addressing it in discovery rather than mid-sprint was the difference between a delayed project and a delivered one.", person: "VP Engineering", role: "Regional Healthtech Leader", highlight: "25+ risks mitigated" },
  { tag: "SaaS · Feasibility", title: "30% of potential rework eliminated by validating core assumptions with technical prototypes before full development", company: "Growth-Stage SaaS", quote: "Without this study we would have built the wrong version of our product. The prototype validation alone justified the entire engagement cost.", person: "Founder & CEO", role: "High-Growth SaaS Platform", highlight: "30% rework avoided" },
];

const faqs = [
  { q: "How long does a technical feasibility study take?", a: "Scope and complexity determine duration. A focused assessment covering a single system or integration typically runs one to two weeks. A comprehensive study covering architecture, stack, integrations, resource estimation, and risk across a complex product typically takes two to four weeks. We scope the engagement during an initial call and give you a fixed timeline before work begins." },
  { q: "What do we receive at the end of the engagement?", a: "You receive a structured feasibility report containing: a go/no-go recommendation with supporting rationale, technical findings organized by assessment area, evaluated architecture options with trade-offs, a risk register with mitigation actions and ownership, resource and cost estimates with confidence ranges, and a prioritized implementation roadmap. All deliverables are provided in formats your leadership and engineering teams can act on directly." },
  { q: "Who should be involved from our side?", a: "At minimum: a product owner or CPO who can articulate business goals, a technical lead or CTO who understands current architecture and constraints, and any relevant system owners for the integrations under review. For most engagements, a core group of three to five people produces better outcomes than a large committee. We facilitate the sessions and manage information gathering efficiently." },
  { q: "Can you assess a product idea with no existing system?", a: "Yes — this is one of the most common and highest-value use cases. For greenfield products, we assess the proposed architecture and technology stack against your requirements, evaluate build options, estimate effort and cost, and identify risks in the design before development commitment is made. The output is a technical foundation brief and implementation roadmap rather than a system review." },
  { q: "What if we already have a preferred technology stack?", a: "A preferred stack is part of what we evaluate — not something we override. We assess whether your preferred choices meet your specific performance, scalability, integration, and team capability requirements. If they do, we validate them with evidence. If they don't, we explain why with specific criteria so your team can make an informed decision. We do not substitute our preferences for yours." },
  { q: "How is a feasibility study different from a technical discovery workshop?", a: "A discovery workshop is a facilitated session that aligns stakeholders on direction, surfaces assumptions, and produces a documented decision basis in one to three days. A feasibility study is a structured technical investigation — it involves system review, architecture analysis, integration assessment, prototype validation where needed, and formal estimation. Discovery establishes direction; feasibility validates whether that direction is technically viable and what it will realistically cost." },
  { q: "Do you sign NDAs before the engagement?", a: "Yes. We sign mutual NDAs before any scoping conversation that involves proprietary product, architecture, or business information. For most engagements a standard confidentiality agreement is sufficient. We are accustomed to working within strict information governance requirements, particularly in financial services and healthcare." },
  { q: "What happens after the feasibility study?", a: "The study closes with a clear next-steps document and implementation roadmap. Many clients move directly into a discovery workshop or technical architecture phase with us, using the feasibility report as the brief. Others use the output to run an informed procurement process or present internally for investment approval. The report is structured so it functions as a standalone decision document regardless of what comes next." },
];

/* ══════════════════════════════ PAGE ══════════════════════════════ */
export default function TechnicalFeasibilityStudyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ══ */}
        <section className="isolate relative min-h-[80vh] sm:min-h-[92vh] flex flex-col justify-center bg-white border-b border-gray-200">
          <div className="h-px bg-gray-200 w-full absolute top-0" />
          <div className="absolute right-0 top-28 hidden lg:block h-[58%] w-px bg-gray-200" />

          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-14 sm:pb-20 w-full">
            <div ref={heroRef} className="max-w-3xl">

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE }} className="inline-flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#0048ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" /> Technical Feasibility Study
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-5">
                Validate your idea
                <span className="block text-[#0048ff]">before you invest in it</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-10">
                We assess technical viability, architecture fit, integration complexity, resource requirements, and risk — so you know exactly what you are building, what it will cost, and where the landmines are before a single sprint begins.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="flex flex-wrap items-center gap-4 mb-10">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
                  Request a feasibility study <ArrowRight size={15} />
                </ContactButton>
                <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all no-underline">
                  View case studies <ChevronRight size={15} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-3">
                {["Architecture validated", "Risks surfaced early", "Estimates you can trust", "Decision-ready report"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 ring-1 ring-gray-200 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280]">
                    <CheckCircle size={12} className="text-[#0048ff]" />{t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating findings card */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-[300px] rounded-lg border border-gray-100 bg-white p-6"
                style={{ boxShadow: "0 18px 55px rgba(15,28,63,0.08)" }}>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-5">Study Deliverables</p>
                {[
                  { label: "Go / No-go recommendation", done: true },
                  { label: "Architecture options + trade-offs", done: true },
                  { label: "Technology stack validation", done: true },
                  { label: "Integration risk register", done: false },
                  { label: "Resource & cost estimate", done: false },
                  { label: "Implementation roadmap", done: false },
                ].map(({ label, done }, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3 last:mb-0">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${done ? "bg-[#0048ff]" : "border-2 border-gray-200 bg-white"}`}>
                      {done && <CheckCircle size={10} className="text-white" />}
                    </div>
                    <p className={`text-xs font-medium ${done ? "text-[#0f1c3f]" : "text-gray-400"}`}>{label}</p>
                  </div>
                ))}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">Typical duration</span>
                  <span className="text-xs font-bold text-[#0048ff]">1–4 weeks</span>
                </div>
                <ContactButton
                  className="mt-3 flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                  Start assessment <ArrowRight size={12} />
                </ContactButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">The scale of the problem</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Why most digital initiatives fail to deliver on their promise
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                The pattern is consistent across industries: projects fail not because execution was poor, but because the technical foundation was never properly validated before investment was committed.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map(({ value, source, desc }, i) => (
                <Reveal key={i} delay={i * 0.1} className="card-glow group relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-8 overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(circle at 20% 20%,rgba(0,72,255,0.05) 0%,transparent 65%)" }} />
                  <div className="relative z-10">
                    <p className="text-5xl md:text-6xl font-bold text-[#0048ff] mb-4 leading-none">{value}</p>
                    <p className="text-sm text-[#0f1c3f] font-medium leading-relaxed mb-4">{desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6b7280] bg-[#f5f8ff] border border-gray-100 px-2.5 py-1 rounded-full">
                      Source: {source}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY IT MATTERS — bento ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Why It Matters</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                What a feasibility study prevents
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Every one of these failure modes is preventable with structured technical validation before development begins.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: AlertTriangle, title: "Avoid costly surprises", desc: "Incompatibilities, architectural limits, and security gaps surface before they derail your timeline or blow your budget." },
                { icon: Layers, title: "Choose the right stack", desc: "Technology choices matched to your performance needs, integration reality, and long-term scalability — not industry trends." },
                { icon: BarChart3, title: "Validate with data, not instinct", desc: "Decisions grounded in technical evaluation, resource needs, and system behavior — not assumptions that haven't been tested." },
                { icon: ShieldCheck, title: "Reduce delivery risk", desc: "Dependencies, constraints, and operational risks mapped early so your team executes with clarity rather than discovering blockers mid-sprint." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 0.08} className="card-glow group bg-white rounded-2xl border border-gray-100 p-5 sm:p-8">
                  <div className="w-12 h-12 rounded-xl bg-[#e8eeff] flex items-center justify-center mb-5 group-hover:bg-[#0048ff] transition-colors duration-300">
                    <Icon size={22} className="text-[#0048ff] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0f1c3f] mb-3">{title}</h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SERVICES SLIDER ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Assessment Areas</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Six areas every feasibility study covers
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Each assessment area produces specific findings and documented decisions — together they form a complete picture of viability, cost, and risk.
              </p>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-row lg:flex-col gap-2 lg:w-72 flex-shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {services.map(({ icon: Icon, title, sub }, i) => (
                  <button key={i} onClick={() => setActiveService(i)}
                    className={`flex items-start gap-3 text-left px-4 py-3.5 rounded-xl text-sm font-medium whitespace-nowrap lg:whitespace-normal transition-all cursor-pointer border-none flex-shrink-0 ${activeService === i ? "bg-[#0048ff] text-white shadow-md" : "bg-white text-[#6b7280] hover:bg-gray-50 border border-gray-100"}`}>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200 ${activeService === i ? "bg-white/20" : "bg-[#f5f8ff] border border-gray-200"}`}>
                      <Icon size={14} className={activeService === i ? "text-white" : "text-[#0048ff]"} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug text-sm">{title}</p>
                      <p className={`text-[11px] mt-0.5 hidden lg:block ${activeService === i ? "text-white/70" : "text-gray-400"}`}>{sub}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div key={activeService}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-8 lg:p-10 min-h-[300px]">
                    <div className="flex items-start gap-5 mb-5">
                      <div className="w-14 h-14 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
                        {(() => { const Icon = services[activeService].icon; return <Icon size={24} className="text-[#0048ff]" />; })()}
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff] mb-1">{services[activeService].sub}</p>
                        <h3 className="text-2xl font-semibold text-[#0f1c3f] leading-tight">{services[activeService].title}</h3>
                      </div>
                    </div>
                    <p className="text-base text-[#6b7280] leading-relaxed mb-6">{services[activeService].desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {services[activeService].points.map((p) => (
                        <span key={p} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                          <CheckCircle size={11} className="text-[#0048ff]" /> {p}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 items-center pt-4 border-t border-gray-100">
                      <button onClick={() => setActiveService((p) => Math.max(0, p - 1))} disabled={activeService === 0}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#0048ff] hover:text-[#0048ff] transition-colors cursor-pointer bg-white">
                        <ChevronLeft size={16} />
                      </button>
                      <button onClick={() => setActiveService((p) => Math.min(services.length - 1, p + 1))} disabled={activeService === services.length - 1}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#0048ff] hover:text-[#0048ff] transition-colors cursor-pointer bg-white">
                        <ChevronRight size={16} />
                      </button>
                      <span className="text-xs text-[#6b7280]">{activeService + 1} / {services.length}</span>
                      <ContactButton
                        className="ml-auto inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0035cc] transition-colors btn-shimmer">
                        Start assessment <ArrowRight size={14} />
                      </ContactButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PROCESS — SCROLLING TIMELINE ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 mb-16">
            <Reveal className="max-w-2xl mx-auto text-center">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Our Approach</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Six-phase technical feasibility approach
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                A structured investigation arc — each phase builds on the last to produce a complete, decision-ready view of your product's technical viability.
              </p>
            </Reveal>
          </div>
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <ScrollTimeline steps={processSteps} />
          </div>
        </section>

        {/* ══ OUTCOMES ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Why Our Approach</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                What makes our feasibility studies different
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                We deliver decision documents, not slide decks. Every output is structured to drive a specific, accountable next step.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {outcomes.map(({ icon: Icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <div className="card-glow group bg-white rounded-2xl border border-gray-100 p-5 sm:p-8 h-full">
                    <div className="w-12 h-12 rounded-xl bg-[#e8eeff] flex items-center justify-center mb-5 group-hover:bg-[#0048ff] transition-colors duration-300">
                      <Icon size={22} className="text-[#0048ff] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-semibold text-[#0f1c3f] mb-3">{title}</h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Blue CTA strip */}
            <Reveal className="mt-10">
              <div className="rounded-2xl bg-[#0048ff] p-7 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <h3 className="text-xl font-semibold text-white mb-2">Not sure if you need a full feasibility study?</h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    Book a 30-minute scoping call. We'll assess your situation, identify the specific risks that need validation, and recommend the right scope and format.
                  </p>
                </div>
                <ContactButton
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-[#0048ff] font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#e8eeff] transition-colors">
                  Book scoping call <ArrowRight size={15} />
                </ContactButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="bg-[#f5f8ff] border-t border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-10 sm:gap-16">
              <Reveal className="lg:w-80 flex-shrink-0">
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">FAQ</p>
                <h2 className="text-4xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                  Common questions
                </h2>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
                  Everything you need to know before commissioning a technical feasibility study.
                </p>
                <ContactButton className="inline-flex items-center gap-2 text-sm font-semibold text-[#0048ff] hover:underline">
                  Ask a question <ArrowRight size={14} />
                </ContactButton>
              </Reveal>
              <div className="flex-1 flex flex-col gap-3">
                {faqs.map(({ q, a }, i) => (
                  <Reveal key={q} delay={i * 0.03}>
                    <FAQItem q={q} a={a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ BOTTOM CTA ══ */}
        <section className="bg-white border-t border-gray-100 py-16 sm:py-20">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 text-center">
            <Reveal>
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-4">Get Started</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] tracking-tight mb-4">
                Know before you build.
              </h2>
              <p className="text-base text-[#6b7280] max-w-xl mx-auto leading-relaxed mb-8">
                A technical feasibility study typically costs less than a single sprint of rework. Tell us what you&apos;re planning to build and we&apos;ll scope the right level of assessment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#0035cc] transition-colors">
                  Request a feasibility study <ArrowRight size={15} />
                </ContactButton>
                <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-200 text-[#0f1c3f] px-8 py-4 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] transition-colors no-underline">
                  View our work <ChevronRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
