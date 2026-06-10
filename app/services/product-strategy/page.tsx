"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, ChevronLeft,
  Target, Users, BarChart3, Map, Lightbulb, TrendingUp,
  Layers, GitBranch, Compass, Zap, ShieldCheck, Settings,
  Search, FileText, RefreshCw,
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

/* ══════════════════════════════ DATA ══════════════════════════════ */

const challenges = [
  {
    icon: Compass,
    title: "No shared product direction",
    desc: "Teams interpret goals differently, sprint priorities conflict, and product direction shifts by whoever spoke last. Without a documented, agreed-upon vision, effort fragments and delivery loses coherence.",
  },
  {
    icon: GitBranch,
    title: "Fragmented cross-team decisions",
    desc: "Engineering, design, and business stakeholders prioritize independently. The result is duplicated effort, constant re-scoping, and a product that reflects internal politics more than user needs.",
  },
  {
    icon: BarChart3,
    title: "Building without measuring",
    desc: "Features ship without defined success criteria, clear ownership, or a feedback loop. Six months later, nobody can explain whether the release moved any metric — or which metric it was supposed to move.",
  },
  {
    icon: TrendingUp,
    title: "Scaling without a framework",
    desc: "Growth and iteration happen reactively. There is no disciplined approach to prioritization, no rhythm for validating bets, and no mechanism to sustain momentum as the product and team get larger.",
  },
];

const services = [
  {
    icon: Target,
    title: "Product vision and strategic alignment",
    sub: "A north star everyone believes in",
    desc: "We work with your leadership, product, and engineering teams to articulate where the product is going, why it matters, and what winning looks like. The output is a documented product vision that gives every team member a shared reference point for every decision — not an aspirational slide that gets forgotten after the all-hands.",
    points: ["Vision statement development", "Strategic bet identification", "Leadership alignment facilitation", "Product-market positioning"],
  },
  {
    icon: Search,
    title: "Market analysis and opportunity assessment",
    sub: "Understand the landscape before you compete in it",
    desc: "We conduct structured market research — user interviews, competitive benchmarking, and market sizing — to identify where real opportunity exists and where the market is already saturated. You invest in the bets most likely to compound, not the ones that feel intuitive.",
    points: ["User research and synthesis", "Competitive landscape analysis", "Market sizing (TAM/SAM/SOM)", "Opportunity prioritization"],
  },
  {
    icon: BarChart3,
    title: "Product-market fit evaluation",
    sub: "Know if your product is resonating",
    desc: "We analyze adoption signals, retention curves, NPS, DAU/MAU ratios, and churn patterns to assess where your product is winning and where it is not. We surface the friction points, validate (or challenge) your value proposition, and give you a clear picture of how close to fit you actually are.",
    points: ["Retention and adoption analysis", "NPS and churn assessment", "Value proposition validation", "Friction point identification"],
  },
  {
    icon: Map,
    title: "Customer journey mapping",
    sub: "See what users actually experience",
    desc: "We map real user flows across the product lifecycle — identifying drop-off points, moments of confusion, and behaviors that differ from assumed intent. Journey maps become a shared artifact that aligns UX, PM, and engineering around the same understanding of what users go through.",
    points: ["End-to-end journey documentation", "Drop-off and friction analysis", "Behavioral motivation mapping", "Cross-functional alignment artifact"],
  },
  {
    icon: Zap,
    title: "MVP scoping and early validation",
    sub: "Define the smallest version that proves the most",
    desc: "For teams exploring new product bets or testing new market directions, we define the minimum viable scope that validates the core assumption without overbuilding. We scope for learning speed, not feature completeness — so you validate faster and invest deeper only when signals justify it.",
    points: ["Core assumption identification", "Minimum viable scope definition", "Validation metric design", "Build-vs-test decision framework"],
  },
  {
    icon: Layers,
    title: "Roadmap and feature prioritization",
    sub: "A roadmap built on evidence, not politics",
    desc: "We build structured, metrics-based prioritization models using RICE, MoSCoW, Kano, or custom scoring frameworks aligned to your business goals. The output is a defensible roadmap where every item on it can be explained by a data point — not by who asked for it loudest.",
    points: ["Prioritization framework selection", "Feature scoring and ranking", "Business goal alignment mapping", "Roadmap communication artifact"],
  },
  
];

const processPhases = [
  {
    id: "diagnose", label: "Diagnose", num: "01",
    title: "Understand where the product stands today",
    desc: "Before recommending anything, we get a complete picture of current state. We analyze product usage data, user behavior patterns, competitive dynamics, team workflows, and product-market signals. This phase surfaces the real constraints — not just the ones the team has already named.",
    items: ["Product analytics review", "User behavior and retention analysis", "Competitive context mapping", "Team and workflow assessment", "Identification of root causes vs. symptoms"],
  },
  {
    id: "define", label: "Define", num: "02",
    title: "Shape the product vision and strategic bets",
    desc: "With a clear diagnosis in place, we work with your leadership and product teams to articulate where the product should go, which strategic bets are worth making, and what the opportunity map looks like across users, markets, and segments. The output is a documented direction — not a hypothesis.",
    items: ["Product vision articulation", "Strategic bet selection", "Opportunity map development", "KPI and success metric framework", "Stakeholder alignment session"],
  },
  {
    id: "prioritize", label: "Prioritize", num: "03",
    title: "Build a grounded roadmap with clear scoring",
    desc: "We apply structured prioritization frameworks — RICE, MoSCoW, Kano, or custom models — to rank features, bets, and initiatives against your defined KPIs and business goals. Every roadmap item has a score, a hypothesis, and a connection to a real user or business need.",
    items: ["Framework selection and calibration", "Feature and initiative scoring", "Roadmap sequencing and phasing", "Dependency identification", "Communication artifact production"],
  },
  {
    id: "validate", label: "Validate", num: "04",
    title: "Test assumptions before committing investment",
    desc: "Prioritized bets still need validation before engineering investment is committed. We design lightweight tests — prototypes, user interviews, A/B experiments, or staged rollouts — to evaluate early signals and challenge the riskiest assumptions before they become expensive mistakes.",
    items: ["Assumption identification and ranking", "Validation method selection", "Prototype or test design", "Signal evaluation and interpretation", "Roadmap refinement based on findings"],
  },
  {
    id: "guide", label: "Guide", num: "05",
    title: "Build a rhythm that sustains strategic execution",
    desc: "Strategy has no value if it cannot be maintained under the pressure of daily execution. We help teams establish a repeatable operating rhythm — healthy backlogs, regular KPI reviews, structured planning ceremonies, and decision frameworks — so the product strategy stays alive rather than becoming a document that collects dust.",
    items: ["Iteration rhythm design", "KPI review process", "Backlog health maintenance", "Decision framework embedding", "Cross-functional operating cadence"],
    isLast: true,
  },
];

const caseStudies = [
  { tag: "Healthtech · Product Strategy", title: "30% increase in user retention after redefining product vision and rebuilding activation metrics around real user behavior", company: "Digital Health Platform", quote: "The strategy work brought clarity we didn't know we were missing. It reshaped how we build, measure, and improve.", person: "Chief Product Officer", role: "Leading Digital Health Provider" },
  { tag: "SaaS · Product Strategy", title: "30% reduction in feature waste through a prioritized roadmap built on structured RICE scoring and validated user insight", company: "Software Platform", quote: "They helped us eliminate noise and focus on what actually drives outcomes. It changed how we plan every quarter.", person: "VP Product", role: "High-Growth Software Platform" },
  { tag: "Fintech · Product Strategy", title: "2.5× increase in product adoption by repositioning the core value proposition and redesigning onboarding based on journey maps", company: "Fintech Startup", quote: "Once the product aligned with real user behavior, adoption surged. The research changed everything.", person: "Co-Founder", role: "Fast-Growing Fintech Startup" },
  { tag: "Logistics · Product Strategy", title: "Established roadmap predictability across three teams by defining a unified product vision and embedding outcome-driven KPIs", company: "Global Logistics Co.", quote: "For the first time, engineering, PM, and design were working toward the same outcomes. The alignment was real.", person: "Director of Technology", role: "Global Logistics Leader" },
  { tag: "E-Commerce · Product Strategy", title: "29% improvement in trial-to-paid conversion through structured market analysis and pricing strategy refinement", company: "Retail Tech Platform", quote: "The strategic insights directly shaped our growth levers. The impact on conversion was immediate and measurable.", person: "CEO", role: "Leading Retail Tech Company" },
];

const toolCategories = [
  {
    label: "Strategy & roadmapping",
    tools: [
      { name: "Jira", img: "/icons/jira.svg" },
      { name: "Trello", img: "/icons/trello.svg" },
      { name: "GitHub", img: "/icons/github.png" },
      { name: "VS Code", img: "/icons/vscode.svg" },
    ],
  },
  {
    label: "Design & prototyping",
    tools: [
      { name: "Figma", img: "/icons/figma.png" },
      { name: "Miro", img: "/icons/miro.png" },
      { name: "Maze", img: "/icons/maze.png" },
      { name: "Hotjar", img: "/icons/hotjar.png" },
    ],
  },
];

const outcomes = [
  { icon: Compass, title: "Research-led product vision", desc: "Direction grounded in user research, market analysis, and business context — not internal assumptions or executive preference." },
  { icon: BarChart3, title: "Measurable priorities and clearer decisions", desc: "Defined KPIs and scoring frameworks eliminate guesswork and make every prioritization decision traceable to a real objective." },
  { icon: Layers, title: "Focused roadmaps that drive outcomes", desc: "Feature noise is reduced so the roadmap reflects validated priorities — increasing the proportion of work that moves a metric." },
  { icon: Users, title: "Stronger cross-team alignment", desc: "Product, engineering, and design share context and ownership, improving execution velocity and reducing costly re-scoping cycles." },
  { icon: TrendingUp, title: "Faster learning and sustained growth", desc: "Iteration becomes disciplined and efficient — improving adoption, retention, and ROI while minimizing effort on low-signal work." },
];

const faqs = [
  { q: "What does a product strategy engagement actually produce?", a: "The output depends on the scope, but a typical engagement produces: a documented product vision and strategic bets, a KPI framework connected to product features, a prioritized roadmap with scoring rationale, a customer journey map, and an operating cadence design. All deliverables are structured to be used immediately — not filed away." },
  { q: "How long does a product strategy engagement take?", a: "A focused engagement covering vision, prioritization, and KPI framework typically runs three to five weeks. A comprehensive engagement including market analysis, journey mapping, backlog restructuring, and alignment facilitation runs six to ten weeks. We scope based on your specific situation during an initial discovery conversation." },
  { q: "Who needs to be involved from our side?", a: "At minimum: a product owner or CPO who can represent product direction, a technical lead or CTO who can validate feasibility of strategic bets, and at least one senior business stakeholder who understands commercial goals. Broader involvement from engineering and design is valuable in the alignment and journey mapping phases." },
  { q: "We already have a roadmap. Can you help us validate it rather than replace it?", a: "Yes. A roadmap validation engagement — reviewing existing priorities against defined KPIs, scoring current items with a structured framework, and stress-testing the sequencing against dependencies — is one of the most common and efficient ways to engage. You do not need to start from scratch for this to be valuable." },
  { q: "How is product strategy different from product management?", a: "Product management executes within a defined direction: running sprints, managing the backlog, coordinating delivery. Product strategy establishes what that direction should be: which users, which problems, which bets, and which metrics define success. Strategy is the input that makes product management coherent and focused." },
  { q: "Can you work with an early-stage product that has no data yet?", a: "Yes. Early-stage engagements focus on market analysis, user research, assumption mapping, and MVP scoping rather than data analysis. The approach shifts from evaluating existing signals to designing the hypotheses and experiments that will generate them. Strategy at this stage is about choosing the right bets before you build, not interpreting results after." },
  { q: "Do you work with in-house product teams or replace them?", a: "We work alongside your team, not instead of it. Our role is to bring structured methodology, external perspective, and facilitation expertise that complements your domain knowledge. Every deliverable is built collaboratively so your team understands the reasoning and can maintain and evolve the strategy independently." },
  { q: "What frameworks do you use for prioritization?", a: "We use RICE (Reach, Impact, Confidence, Effort), MoSCoW (Must/Should/Could/Won't), and Kano (satisfaction vs. investment curves) as starting points, then adapt or combine them based on your product stage and decision context. For companies with mature OKR practices, we connect prioritization scoring directly to key results so roadmap choices are explicitly tied to committed objectives." },
];

/* ══════════════════════════════ PAGE ══════════════════════════════ */
export default function ProductStrategyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeService, setActiveService] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
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
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" /> Product Strategy
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-5">
                A strategy that connects
                <span className="block text-[#0048ff]">your product to your users</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-10">
                Teams move fast, markets shift fast, and products drift fast. We help you understand where your product stands today, where value can actually be created, and how to align engineering, design, and business around a roadmap that delivers.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="flex flex-wrap items-center gap-4 mb-10">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
                  Start a strategy engagement <ArrowRight size={15} />
                </ContactButton>
                <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all no-underline">
                  View case studies <ChevronRight size={15} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-3">
                {["Research-led vision", "Metrics-based roadmap", "Cross-team alignment", "Actionable deliverables"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 ring-1 ring-gray-200 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280]">
                    <CheckCircle size={12} className="text-[#0048ff]" />{t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating strategy card */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-[300px] rounded-lg border border-gray-100 bg-white p-6"
                style={{ boxShadow: "0 18px 55px rgba(15,28,63,0.08)" }}>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-5">Strategy Engagement Output</p>
                {[
                  { label: "Product vision document", done: true },
                  { label: "Strategic bets map", done: true },
                  { label: "KPI and metrics framework", done: true },
                  { label: "Prioritized roadmap", done: false },
                  { label: "Customer journey map", done: false },
                  { label: "Operating cadence design", done: false },
                ].map(({ label, done }, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3 last:mb-0">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${done ? "bg-[#0048ff]" : "border-2 border-gray-200 bg-white"}`}>
                      {done && <CheckCircle size={9} className="text-white" />}
                    </div>
                    <p className={`text-xs font-medium ${done ? "text-[#0f1c3f]" : "text-gray-400"}`}>{label}</p>
                  </div>
                ))}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">Typical engagement</span>
                  <span className="text-xs font-bold text-[#0048ff]">3–10 weeks</span>
                </div>
                <ContactButton
                  className="mt-3 flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                  Book a strategy call <ArrowRight size={12} />
                </ContactButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ CHALLENGES ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Common Challenges</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Why product strategy matters now
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                These are the patterns that appear in every product organization operating without a clear, shared strategy — and the reason most teams plateau despite working hard.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {challenges.map(({ icon: Icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 0.08} className="card-glow group bg-white rounded-2xl border border-gray-100 p-5 sm:p-8 flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0048ff] transition-colors duration-300 self-start mt-0.5">
                    <Icon size={22} className="text-[#0048ff] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#0f1c3f] mb-2">{title}</h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SERVICES SLIDER ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Capabilities</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Ten product strategy capabilities
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                From market analysis and vision definition to roadmap prioritization and cross-team alignment — a complete set of capabilities for teams at every product stage.
              </p>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-row lg:flex-col gap-2 lg:w-72 flex-shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {services.map(({ icon: Icon, title, sub }, i) => (
                  <button key={i} onClick={() => setActiveService(i)}
                    className={`flex items-start gap-3 text-left px-4 py-3.5 rounded-xl text-sm font-medium whitespace-nowrap lg:whitespace-normal transition-all cursor-pointer border-none flex-shrink-0 ${activeService === i ? "bg-[#0048ff] text-white shadow-md" : "bg-[#f5f8ff] text-[#6b7280] hover:bg-gray-100"}`}>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200 ${activeService === i ? "bg-white/20" : "bg-white border border-gray-200"}`}>
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
                    className="bg-[#f5f8ff] rounded-2xl border border-gray-100 p-5 sm:p-8 lg:p-10 min-h-[300px]">
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
                        <span key={p} className="flex items-center gap-1.5 text-xs font-medium bg-white text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                          <CheckCircle size={11} className="text-[#0048ff]" /> {p}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 items-center pt-4 border-t border-gray-200">
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
                        Explore this capability <ArrowRight size={14} />
                      </ContactButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>


        {/* ══ PROCESS — TAB SWITCHER ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl mx-auto text-center">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Our Approach</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                How we build product strategy
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Five phases — each building on the last — to produce a strategy that is grounded in evidence, aligned across teams, and built to survive contact with daily execution.
              </p>
            </Reveal>

            {/* Phase tab pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {processPhases.map((ph, i) => (
                <button key={ph.id} onClick={() => setActivePhase(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer border-none ${activePhase === i ? "bg-[#0048ff] text-white shadow-md" : "bg-[#f5f8ff] text-[#6b7280] hover:bg-gray-100"}`}>
                  <span className={`text-[10px] font-bold ${activePhase === i ? "text-white/70" : "text-[#0048ff]"}`}>{ph.num}</span>
                  {ph.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activePhase}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.38, ease: EASE }}>
                <div className={`rounded-2xl border p-5 sm:p-8 lg:p-12 ${processPhases[activePhase].isLast ? "bg-[#0048ff] border-transparent" : "bg-[#f5f8ff] border-gray-100"}`}>
                  <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-1/2">
                      <div className={`inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border mb-5 ${processPhases[activePhase].isLast ? "text-white/80 bg-white/15 border-white/20" : "text-[#0048ff] bg-[#e8eeff] border-[#0048ff]/20"}`}>
                        Phase {processPhases[activePhase].num} · {processPhases[activePhase].label}
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-semibold leading-snug mb-5 ${processPhases[activePhase].isLast ? "text-white" : "text-[#0f1c3f]"}`}>
                        {processPhases[activePhase].title}
                      </h3>
                      <p className={`text-base leading-relaxed ${processPhases[activePhase].isLast ? "text-white/80" : "text-[#6b7280]"}`}>
                        {processPhases[activePhase].desc}
                      </p>
                    </div>
                    <div className="lg:w-1/2 flex flex-col justify-center gap-3">
                      {processPhases[activePhase].items.map((item, j) => (
                        <motion.div key={item} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.06, duration: 0.35, ease: EASE }}
                          className={`flex items-center gap-3 p-4 rounded-xl ${processPhases[activePhase].isLast ? "bg-white/10" : "bg-white border border-gray-100"}`}>
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${processPhases[activePhase].isLast ? "bg-white/20" : "bg-[#e8eeff]"}`}>
                            <CheckCircle size={14} className={processPhases[activePhase].isLast ? "text-white" : "text-[#0048ff]"} />
                          </div>
                          <span className={`text-sm font-medium ${processPhases[activePhase].isLast ? "text-white/90" : "text-[#0f1c3f]"}`}>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Next phase nudge */}
                {activePhase < processPhases.length - 1 && (
                  <div className="flex justify-center mt-6">
                    <button onClick={() => setActivePhase(activePhase + 1)}
                      className="flex items-center gap-2 text-sm font-semibold text-[#0048ff] cursor-pointer bg-transparent border-none hover:underline">
                      Next: {processPhases[activePhase + 1].label} <ChevronRight size={15} />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ══ TOOLS & FRAMEWORKS ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Tools & Frameworks</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Methodologies and platforms we use
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                We select tools and frameworks based on your team's context — not the ones we happen to prefer.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {toolCategories.map(({ label, tools }, ci) => (
                <Reveal key={label} delay={ci * 0.08}>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#0048ff] mb-5 text-center">{label}</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {tools.map(({ name, img, icon: Icon }: { name: string; img?: string; icon?: React.ElementType }) => (
                        <div key={name} className="group card-glow flex flex-col items-center gap-2.5 bg-white rounded-2xl border border-gray-100 p-4 cursor-default">
                          <div className="w-11 h-11 rounded-xl bg-[#f5f8ff] flex items-center justify-center group-hover:bg-[#0048ff] transition-colors duration-300">
                            {img ? (
                              <img src={img} alt={name} className="w-6 h-6 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                            ) : Icon ? (
                              <Icon size={18} className="text-[#0048ff] group-hover:text-white transition-colors duration-300" />
                            ) : null}
                          </div>
                          <span className="text-[11px] font-medium text-[#6b7280] text-center leading-snug">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ OUTCOMES ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">What You Can Expect</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                A strategy built to be used, not filed
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Every deliverable is structured to drive the next decision. Strategy without operational traction is just a document.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {outcomes.map(({ icon: Icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <div className={`card-glow group rounded-2xl border p-8 h-full ${i === 0 ? "bg-[#0048ff] border-transparent" : "bg-white border-gray-100"}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${i === 0 ? "bg-white/20" : "bg-[#e8eeff] group-hover:bg-[#0048ff]"}`}>
                      <Icon size={22} className={i === 0 ? "text-white" : "text-[#0048ff] group-hover:text-white transition-colors duration-300"} />
                    </div>
                    <h3 className={`text-base font-semibold mb-3 ${i === 0 ? "text-white" : "text-[#0f1c3f]"}`}>{title}</h3>
                    <p className={`text-sm leading-relaxed ${i === 0 ? "text-white/80" : "text-[#6b7280]"}`}>{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10">
              <div className="rounded-2xl bg-[#f5f8ff] border border-[#0048ff]/10 p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <h3 className="text-xl font-semibold text-[#0f1c3f] mb-2">Ready to align your team around a shared product direction?</h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    Tell us where your product is today and what decision you're trying to make — we'll scope the right engagement.
                  </p>
                </div>
                <ContactButton
                  className="flex-shrink-0 btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                  Start the conversation <ArrowRight size={15} />
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
                  Everything you need to know before starting a product strategy engagement.
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
                Build a product people actually want.
              </h2>
              <p className="text-base text-[#6b7280] max-w-xl mx-auto leading-relaxed mb-8">
                The gap between a product that drifts and a product that compounds is a clear, shared strategy. Let&apos;s build yours.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#0035cc] transition-colors">
                  Start a strategy engagement <ArrowRight size={15} />
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
