"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, ChevronLeft,
  FlaskConical, ShieldCheck, Layers, GitBranch, Zap,
  Search, Target, Map, Code2, Network, Brain, BarChart3, Rocket,
  Clock, Users,
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
    <div className="border-t border-gray-200 last:border-b">
      <button onClick={onClick} className="w-full flex items-center justify-between py-4 sm:py-5 text-left gap-4 cursor-pointer bg-transparent border-none">
        <span className="text-sm sm:text-[15px] font-semibold leading-snug text-[#0f1c3f]">{q}</span>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div style={{ maxHeight: isOpen ? 500 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <p className="pb-5 sm:pb-6 text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STICKY SECTION TABS
══════════════════════════════════════════════════ */
interface ProcessPhase {
  number: string;
  label: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

function StickySectionTabs({ phases, ctaText }: { phases: ProcessPhase[]; ctaText?: string }) {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight / 2;
      sectionRefs.current.forEach((ref, i) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (scrollMid >= offsetTop && scrollMid < offsetTop + offsetHeight) setActiveSection(i);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (i: number) => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="lg:w-80 flex-shrink-0 lg:sticky lg:top-28 lg:self-start space-y-3">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            const active = activeSection === i;
            return (
              <button key={i} onClick={() => scrollTo(i)}
                className="w-full text-left rounded-2xl transition-all duration-300 cursor-pointer border-none"
                style={{
                  padding: "18px 20px",
                  background: active ? "#0048ff" : "#f5f8ff",
                  border: active ? "1.5px solid #0048ff" : "1.5px solid #e5e7eb",
                  boxShadow: active ? "0 8px 32px rgba(0,72,255,0.2)" : "none",
                  transform: active ? "scale(1.02)" : "scale(1)",
                }}>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ background: active ? "rgba(255,255,255,0.2)" : "#e8eeff" }}>
                    <Icon size={18} style={{ color: active ? "#fff" : "#0048ff" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-semibold tracking-widest uppercase mb-0.5"
                      style={{ color: active ? "rgba(255,255,255,0.7)" : "#6b7280" }}>Phase {phase.number}</div>
                    <div className="text-sm font-semibold leading-snug"
                      style={{ color: active ? "#fff" : "#0f1c3f" }}>{phase.label}</div>
                  </div>
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{ background: active ? "rgba(255,255,255,0.6)" : "transparent" }} />
                </div>
              </button>
            );
          })}
          <div className="mt-4 rounded-2xl border border-[#0048ff]/15 bg-[#e8eeff] p-5">
            <p className="text-xs font-semibold text-[#0048ff] mb-1">Ready to start?</p>
            <p className="text-xs text-[#0f1c3f]/70 leading-relaxed mb-4">{ctaText ?? "Book a scoping call and we'll scope your PoC engagement end-to-end."}</p>
            <ContactButton className="flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
              Book a call <ArrowRight size={12} />
            </ContactButton>
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-24 lg:space-y-32">
          {phases.map((phase, i) => (
            <motion.div key={i}
              ref={(el) => { sectionRefs.current[i] = el; }}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE }} className="scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl font-bold leading-none select-none" style={{ color: "#e8eeff" }}>{phase.number}</span>
                <div>
                  <span className="inline-flex items-center text-[10px] font-semibold tracking-widest uppercase text-[#0048ff] bg-[#e8eeff] px-2.5 py-1 rounded-full border border-[#0048ff]/20 mb-1 block w-fit">
                    {phase.label}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-[#0f1c3f] leading-snug">{phase.title}</h3>
                </div>
              </div>
              {phase.content}
              {i < phases.length - 1 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <button onClick={() => scrollTo(i + 1)}
                    className="flex items-center gap-2 text-sm font-semibold text-[#0048ff] hover:underline cursor-pointer bg-transparent border-none p-0">
                    Next: {phases[i + 1].label} <ChevronRight size={15} />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════ DATA ══════════════════════════════ */

const challenges = [
  {
    stat: "23%",
    desc: "of product failures are tied directly to gaps in technical expertise during early development",
    source: "Industry Research",
  },
  {
    stat: "43%",
    desc: "of technology projects fail when business outcomes are vague or not aligned across stakeholders from the start",
    source: "Technology Survey",
  },
  {
    stat: "42%",
    desc: "of teams misjudge delivery timelines because feasibility, effort, and scope complexity were never formally validated",
    source: "Product Development Study",
  },
];

const services = [
  {
    icon: Search,
    title: "Technical feasibility assessment",
    desc: "Examine whether your concept can actually be built by stress-testing architecture choices, integration constraints, data flow requirements, reliability risks, and cross-system dependencies. Know what's buildable, what breaks under pressure, and what it realistically takes to scale.",
  },
  {
    icon: Target,
    title: "Business and requirements discovery",
    desc: "Surface the metrics that define success, sharpen business logic, quantify edge cases, and convert vague objectives into clear technical and functional requirements. Get all stakeholders aligned on exactly what the PoC needs to prove before an MVP investment is justified.",
  },
  {
    icon: Map,
    title: "Experience design and workflow modeling",
    desc: "Map user journeys that account for operational realities, compliance requirements, and system-level dependencies. Build prototypes that test not just usability, but whether the product genuinely fits inside real business workflows.",
  },
  {
    icon: Code2,
    title: "Functional PoC implementation",
    desc: "Engineer a working, focused build that tackles the riskiest parts of your concept first — system interactions, backend logic, third-party integrations, and non-negotiable performance requirements. Prove feasibility where it counts, not just where it's easy.",
  },
  {
    icon: Network,
    title: "Integration and data ecosystem validation",
    desc: "Put your concept through its paces inside your real technical environment — APIs, legacy applications, identity systems, security boundaries, and data sources. Uncover hidden blockers like schema conflicts, rate limits, data quality gaps, or environment mismatches before they reach production.",
  },
  {
    icon: Brain,
    title: "AI PoC development",
    desc: "Prototype AI-powered features using GenAI or Agentic AI capabilities grounded in your own data and workflows. Demonstrate real, measurable value rather than theoretical benchmarks — and know what's achievable before committing to a full build.",
  },
  {
    icon: BarChart3,
    title: "Scalability, performance, and architecture evaluation",
    desc: "Stress-test the architecture under expected and peak-load conditions. Identify infrastructure gaps, caching strategies, cloud resource requirements, and long-term cost trajectories. Give engineering and leadership a clear picture of what scaling this product will actually require.",
  },
  {
    icon: Rocket,
    title: "MVP readiness and delivery roadmap",
    desc: "Translate PoC outcomes into an investment-ready plan covering effort estimates, required skills, infrastructure implications, risk categories, feature sequencing, and realistic milestones — so leadership has everything needed to proceed with confidence.",
  },
];

const processPhases = [
  {
    num: "01",
    phase: "Discover",
    label: "Solution discovery and feasibility assessment",
    color: false,
    desc: "Identify the exact problem your PoC must solve and evaluate the operational, financial, customer, and workflow implications of the solution. We analyze constraints, dependencies, integration touchpoints, and measurable business outcomes so the PoC is anchored to real value rather than assumptions.",
    deliverables: ["Opportunity brief", "Success metrics", "Feasibility map"],
    steps: null,
  },
  {
    num: "02",
    phase: "Pilot",
    label: "Experience modeling and alignment",
    color: false,
    desc: "Design user flows that reflect real business rules, edge cases, and operational realities. We translate these flows into a technical blueprint that outlines required APIs, data structures, integration logic, and architectural decisions — ensuring the PoC targets the highest risk areas.",
    deliverables: ["Workflow models", "Interface prototypes", "Architecture and integration blueprint"],
    steps: [
      {
        sub: "PoC engineering and integration setup",
        desc: "Implement the core functionality required to test feasibility, including backend logic, critical integrations, environment setup, and identity handling. We validate interoperability across systems, assess data quality, measure latency, and surface any hidden performance or security issues early.",
        deliverables: ["Functional PoC", "Integration validation", "Performance observations"],
      },
    ],
  },
  {
    num: "03",
    phase: "Transform & Scale",
    label: "Solution performance review and architecture direction",
    color: true,
    desc: "Evaluate how the PoC behaves under real usage conditions — user experience insights, operational fit, system compatibility, process friction points, reliability expectations, and architectural strengths or gaps. We highlight what can scale and what needs refinement before entering MVP development.",
    deliverables: ["Architecture direction", "Scalability findings", "Risk and dependency assessment"],
    steps: [
      {
        sub: "MVP roadmap and investment model",
        desc: "Convert PoC results into a decision-ready plan for leadership. We define the engineering scope, timelines, team structure, dependencies, cost model, and sequencing to confidently progress from PoC to MVP and later to full-scale product development.",
        deliverables: ["MVP plan", "Delivery roadmap", "Cost and resource model"],
      },
    ],
  },
];

const trustPoints = [
  { icon: Zap, title: "Validation in weeks, not months", desc: "Go from concept to a working PoC fast — with focused engineering that targets the highest-risk parts of your idea first." },
  { icon: ShieldCheck, title: "Uncertainty eliminated early", desc: "Validate workflows, system interactions, and integration dependencies before they become expensive problems in a full build." },
  { icon: Network, title: "Deep integration expertise", desc: "Prove feasibility inside your real environment — across APIs, data sources, identity systems, and legacy infrastructure." },
  { icon: Layers, title: "A clear path to scale", desc: "Convert PoC results into a concrete, decision-ready roadmap for moving to MVP and full product development." },
];

const platforms: { name: string; img?: string; icon?: React.ElementType }[] = [
  { name: "Jira", img: "/icons/jira.svg" },
  { name: "Trello", img: "/icons/trello.svg" },
  { name: "Figma", img: "/icons/figma.png" },
  { name: "VS Code", img: "/icons/vscode.svg" },
  { name: "Claude AI", img: "/icons/Claude Ai.png" },
  { name: "InVision", img: "/icons/invision.png" },
];

const caseStudies = [
  {
    tag: "Healthcare · Engineering",
    title: "Upgraded LMS helping scale to 1.2M+ users",
    company: "Elia Wellness",
    quote: "",
    person: "Geraldine Przybylko",
    role: "Health Strategy Consultant",
    hasVideo: true,
  },
  {
    tag: "Legal Services · Engineering",
    title: "Enterprise mobility solution for top IP litigation firm",
    company: "Sterne Kessler",
    quote: "tkxel built a docketing app with an intuitive UI, helping attorneys track 10,000+ patent systems.",
    person: "Robert K Burger",
    role: "COO, Sterne Kessler",
    hasVideo: false,
  },
  {
    tag: "Manufacturing · Engineering",
    title: "23% increase in sales team productivity with customized CSR system",
    company: "Knowles",
    quote: "",
    person: "Nick Drogo",
    role: "Global Director IT, Knowles",
    hasVideo: true,
  },
  {
    tag: "E-Commerce · Engineering",
    title: "Standardizing global e-commerce across 30+ countries",
    company: "Groupon",
    quote: "Their expertise in digital solutions transformed our platform and made our global operations run smoothly.",
    person: "Umair Bashir",
    role: "Director, Groupon",
    hasVideo: false,
  },
];

const faqs = [
  {
    q: "What is a PoC and how does it differ from an MVP?",
    a: "A Proof of Concept determines whether a technical approach or business idea is actually feasible before any significant investment is made. It answers 'can this be built and does it behave as expected?' — usually within three to six weeks. An MVP is a shippable product designed for real users. The PoC comes first so you can de-risk the MVP investment with evidence, not assumptions.",
  },
  {
    q: "How long does a typical PoC engagement take?",
    a: "Most engagements run between three and six weeks depending on scope and complexity. Straightforward feasibility assessments or single-integration proofs often finish in two to three weeks. PoCs involving AI capabilities, multiple system integrations, or performance modeling under load typically take four to six weeks.",
  },
  {
    q: "What do we receive at the end of the engagement?",
    a: "You receive a working functional build — not a polished demo — along with a feasibility report, architecture recommendations, integration validation findings, a risk and dependency assessment, and a delivery roadmap with realistic effort estimates for the transition to MVP. Full codebase ownership is transferred to you at completion.",
  },
  {
    q: "Will you work with our existing systems and data?",
    a: "Yes, always. Testing against your actual environment is central to the process — that means your real APIs, databases, legacy applications, identity providers, and security layers. We surface integration blockers and data quality issues early so they don't become expensive surprises during full-scale development.",
  },
  {
    q: "What if the PoC shows the idea isn't viable?",
    a: "A PoC that concludes 'this won't work' is still a successful outcome — it saved the cost and time of a full failed build. We deliver a clear report detailing what was tested, why the approach didn't pass validation, and which alternative directions are worth exploring. Many clients use these findings to pivot to a better solution faster.",
  },
  {
    q: "Can you build AI features into a PoC?",
    a: "Yes. We prototype AI-powered functionality using GenAI, Agentic AI, RAG pipelines, and custom model integrations. Crucially, we validate performance against your actual data and real workflows — not synthetic test sets — so you get honest, evidence-based insight into what AI can realistically deliver for your use case.",
  },
  {
    q: "Is PoC development fixed-price?",
    a: "Yes. Every engagement is fixed-price with a fully defined scope agreed before a single line of code is written. If requirements shift during the build, we discuss any scope changes before proceeding — there are no unexpected invoices at the end.",
  },
  {
    q: "Who owns the code once the PoC is complete?",
    a: "You own everything. Full IP and codebase rights transfer to you on final payment. You receive the complete repository, any supporting documentation, and a technical handover session with the team. The PoC is scoped to be reusable — progressing to MVP builds on what we've already validated, not from scratch.",
  },
];

/* ── PoC Process phases for StickySectionTabs ── */
const pocStickyPhases: ProcessPhase[] = [
  {
    number: "01",
    label: "Discover",
    title: "Solution discovery and feasibility assessment",
    icon: Search,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <Search size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Week 1</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">Discovery & feasibility</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            We identify the exact problem your PoC must solve and evaluate the operational, financial, and workflow implications. By analysing constraints, dependencies, integration touchpoints, and measurable outcomes, the PoC is anchored to real value rather than assumptions.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Opportunity brief", "Success metrics", "Feasibility map"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#f5f8ff] rounded-2xl border border-gray-100 p-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-5">What we assess</p>
          <div className="space-y-4">
            {[
              { icon: Target, label: "Problem clarity", desc: "Exact business problem the PoC must prove or disprove" },
              { icon: Network, label: "Integration landscape", desc: "APIs, legacy systems, data sources, and security layers involved" },
              { icon: BarChart3, label: "Success criteria", desc: "Quantified thresholds that define go/no-go at PoC completion" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-[#0048ff]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0f1c3f]">{label}</p>
                  <p className="text-xs text-[#6b7280] leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    label: "Pilot",
    title: "Experience modeling and PoC engineering",
    icon: Code2,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <Map size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Week 2–3</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">Experience modeling & blueprint</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            We design user flows reflecting real business rules, edge cases, and operational realities — translated into a technical blueprint covering required APIs, data structures, and integration logic. The PoC is targeted at the highest-risk areas rather than the easiest ones.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Workflow models", "Interface prototypes", "Architecture & integration blueprint"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <Code2 size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Week 3–5</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">PoC engineering & integration</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            We implement core functionality to test feasibility — backend logic, critical integrations, environment setup, and identity handling. We validate interoperability, assess data quality, measure latency, and surface hidden performance or security issues before they become full-build problems.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Functional PoC", "Integration validation", "Performance observations"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    label: "Transform & Scale",
    title: "Performance review and MVP roadmap",
    icon: Rocket,
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0048ff] rounded-2xl border border-transparent p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <BarChart3 size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-white/60">Week 5–6</p>
              <h4 className="text-base font-semibold text-white">Solution review & MVP plan</h4>
            </div>
          </div>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            We evaluate how the PoC performs under real usage — UX insights, operational fit, system compatibility, and architectural strengths or gaps. Then we convert PoC results into a decision-ready MVP plan: scope, timelines, team structure, dependencies, and a cost model so leadership can progress with confidence.
          </p>
          <div className="border-t border-white/20 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Architecture direction", "Scalability findings", "Risk & dependency assessment", "MVP plan", "Delivery roadmap", "Cost & resource model"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-white/15 text-white px-3 py-1.5 rounded-full">
                  <CheckCircle size={11} className="text-white/70" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { icon: Zap, label: "Fast validation", desc: "Working PoC in weeks — not months — with focused, high-impact engineering." },
            { icon: ShieldCheck, label: "Risk clarity", desc: "Hidden integration, performance, and scalability risks surfaced early." },
            { icon: Layers, label: "Roadmap to scale", desc: "PoC findings converted into a clear, practical plan for MVP and beyond." },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="card-glow group bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-[#e8eeff] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0048ff] transition-colors duration-300">
                <Icon size={16} className="text-[#0048ff] group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0f1c3f] mb-0.5">{label}</p>
                <p className="text-xs text-[#6b7280] leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

/* ══════════════════════════════ PAGE ══════════════════════════════ */
export default function PoCDevelopmentPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main className="">

        {/* ══ HERO ══ */}
        <section className="isolate relative min-h-[80vh] sm:min-h-[92vh] flex flex-col justify-center bg-white border-b border-gray-200">
          <div className="h-px bg-gray-200 w-full absolute top-0" />
          <div className="absolute right-0 top-28 hidden lg:block h-[58%] w-px bg-gray-200" />

          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-14 sm:pb-20 w-full">
            <div ref={heroRef} className="max-w-4xl">

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE }} className="inline-flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#0048ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" /> PoC Development
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-6">
                Turn product vision into
                <span className="block text-[#0048ff]">validated, scalable solutions</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-base sm:text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-10">
                Get clarity on feasibility, architecture, workflows, data, integrations, AI capabilities, and performance. We engineer focused PoCs that give you a decision-ready path to full product development.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="flex flex-wrap items-center gap-4 mb-10">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
                  Start a PoC scoping call <ArrowRight size={15} />
                </ContactButton>
                <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all no-underline">
                  View case studies <ChevronRight size={15} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-3">
                {["Fixed-Price Delivery", "Full IP Ownership", "Go/No-Go Report Included", "3–6 Week Timelines"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 ring-1 ring-gray-200 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280]">
                    <CheckCircle size={12} className="text-[#0048ff]" /> {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating timeline card */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-[310px] rounded-lg border border-gray-100 bg-white p-6"
                style={{ boxShadow: "0 18px 55px rgba(15,28,63,0.08)" }}>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-5">PoC Delivery Timeline</p>
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#0048ff]/15" />
                  {[
                    { week: "Week 1", label: "Discovery & feasibility", done: true },
                    { week: "Week 2–3", label: "Workflow modeling & blueprint", done: true },
                    { week: "Week 3–5", label: "PoC build & integration", done: false },
                    { week: "Week 5–6", label: "Review & MVP roadmap", done: false },
                  ].map(({ week, label, done }, i) => (
                    <div key={i} className="flex items-start gap-3 mb-4 last:mb-0">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 mt-0.5 ${done ? "bg-[#0048ff] border-[#0048ff]" : "bg-white border-gray-300"}`} />
                      <div>
                        <p className="text-[10px] font-semibold text-[#0048ff] uppercase tracking-wider">{week}</p>
                        <p className="text-xs font-medium text-[#0f1c3f]">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">Typical scope</span>
                  <span className="text-xs font-bold text-[#0048ff]">3–6 weeks</span>
                </div>
                <ContactButton className="mt-3 flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                  Book scoping call <ArrowRight size={12} />
                </ContactButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ CHALLENGES ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Challenges</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Do these product development challenges sound familiar?
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                These are the patterns that derail teams before the first line of production code is written.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {challenges.map(({ stat, desc, source }, i) => (
                <Reveal key={i} delay={i * 0.1}
                  className="card-glow group relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-8 overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(circle at 20% 20%,rgba(0,72,255,0.05) 0%,transparent 65%)" }} />
                  <div className="relative z-10">
                    <p className="text-5xl md:text-6xl font-bold text-[#0048ff] mb-4 leading-none">{stat}</p>
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

        {/* ══ SERVICES SLIDER ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Services</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Core services for PoC development
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Eight focused capabilities that cover every dimension of validating a product concept before you invest in the full build.
              </p>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Nav list */}
              <div className="flex flex-row lg:flex-col gap-2 lg:w-80 flex-shrink-0 overflow-x-auto lg:overflow-visible">
                {services.map(({ icon: Icon, title }, i) => (
                  <button key={i} onClick={() => setActiveService(i)}
                    className={`flex items-center gap-3 text-left px-4 py-3.5 rounded-xl text-sm font-medium whitespace-nowrap lg:whitespace-normal transition-all cursor-pointer border-none ${activeService === i
                      ? "bg-[#0048ff] text-white shadow-md"
                      : "bg-[#f5f8ff] text-[#6b7280] hover:bg-gray-100"}`}>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${activeService === i ? "bg-white/20" : "bg-white border border-gray-200"}`}>
                      <Icon size={14} className={activeService === i ? "text-white" : "text-[#0048ff]"} />
                    </span>
                    <span className="leading-snug">{title}</span>
                  </button>
                ))}
              </div>

              {/* Content panel */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div key={activeService}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="bg-[#f5f8ff] rounded-2xl border border-gray-100 p-5 sm:p-8 lg:p-10 h-full min-h-[280px]">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
                        {(() => { const Icon = services[activeService].icon; return <Icon size={24} className="text-[#0048ff]" />; })()}
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff] mb-1 block">PoC Development Services</span>
                        <h3 className="text-2xl font-semibold text-[#0f1c3f] leading-tight">
                          {services[activeService].title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-base text-[#6b7280] leading-relaxed mb-8">
                      {services[activeService].desc}
                    </p>
                    <div className="flex gap-3 items-center">
                      <button onClick={() => setActiveService((p) => Math.max(0, p - 1))}
                        disabled={activeService === 0}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#0048ff] hover:text-[#0048ff] transition-colors cursor-pointer bg-white">
                        <ChevronLeft size={16} />
                      </button>
                      <button onClick={() => setActiveService((p) => Math.min(services.length - 1, p + 1))}
                        disabled={activeService === services.length - 1}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#0048ff] hover:text-[#0048ff] transition-colors cursor-pointer bg-white">
                        <ChevronRight size={16} />
                      </button>
                      <span className="text-xs text-[#6b7280] ml-1">{activeService + 1} / {services.length}</span>
                      <ContactButton
                        className="ml-auto inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0035cc] transition-colors btn-shimmer">
                        Scope this service <ArrowRight size={14} />
                      </ContactButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PROCESS — STICKY SECTION TABS ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 mb-16">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Process</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Our end-to-end PoC development approach
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Three phases — scroll through each to see what we discover, build, and deliver at every stage.
              </p>
            </Reveal>
          </div>
          <StickySectionTabs phases={pocStickyPhases} ctaText="Book a PoC scoping call and we'll scope your engagement end-to-end." />
        </section>

        {/* ══ CTA STRIP ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="rounded-lg border border-[#0048ff]/20 bg-[#0048ff] p-7 sm:p-10 lg:p-16 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 80% 50%,rgba(255,255,255,0.07) 0%,transparent 60%)" }} />
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
                style={{ background: "rgba(255,255,255,0.04)" }} />
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-3">Get Clarity</p>
                  <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-4">
                    Get clarity on your PoC strategy
                  </h2>
                  <p className="text-base text-white/75 leading-relaxed mb-8">
                    Build a PoC strategy that aligns architecture, workflows, integrations, data, and scaling considerations into one clear direction.
                  </p>
                  <ContactButton
                    className="btn-shimmer inline-flex items-center gap-2 bg-white text-[#0048ff] px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#e8eeff] transition-colors">
                    Scale your product vision <ArrowRight size={15} />
                  </ContactButton>
                </div>
                <div className="hidden lg:grid grid-cols-2 gap-3 flex-shrink-0">
                  {trustPoints.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="bg-white/10 rounded-xl p-5 max-w-[200px]">
                      <Icon size={18} className="text-white/70 mb-3" />
                      <p className="text-sm font-semibold text-white mb-1">{title}</p>
                      <p className="text-xs text-white/60 leading-snug">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PLATFORMS ══ */}
        <section className="bg-white py-16 sm:py-20 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="text-center mb-12">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Platforms we use</p>
              <h2 className="text-3xl md:text-4xl font-medium text-[#0f1c3f] tracking-tight mb-4">
                Built with tools your team already knows
              </h2>
              <p className="text-sm text-[#6b7280] max-w-xl mx-auto leading-relaxed">
                No proprietary lock-in. We work within your existing toolchain and hand everything over at the end.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-wrap justify-center gap-5">
              {platforms.map(({ name, img, icon: Icon }) => (
                <div key={name} className="card-glow group flex flex-col items-center gap-3 bg-white rounded-2xl border border-gray-100 px-8 py-6 min-w-[110px]">
                  <div className="w-12 h-12 rounded-xl bg-[#e8eeff] flex items-center justify-center group-hover:bg-[#0048ff] transition-colors duration-300 overflow-hidden">
                    {img ? (
                      <img src={img} alt={name} className="w-7 h-7 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                    ) : Icon ? (
                      <Icon size={20} className="text-[#0048ff] group-hover:text-white transition-colors duration-300" />
                    ) : null}
                  </div>
                  <span className="text-xs font-semibold text-[#0f1c3f]">{name}</span>
                </div>
              ))}
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
                  Frequently asked questions
                </h2>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
                  Everything you need to know before starting a PoC engagement with us.
                </p>
                <ContactButton className="inline-flex items-center gap-2 text-sm font-semibold text-[#0048ff] hover:underline">
                  Ask us anything <ArrowRight size={14} />
                </ContactButton>
              </Reveal>

              <div className="flex-1">
                {faqs.map(({ q, a }, i) => (
                  <Reveal key={q} delay={i * 0.04}>
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
                Ready to validate your product idea?
              </h2>
              <p className="text-base text-[#6b7280] max-w-xl mx-auto leading-relaxed mb-8">
                Tell us what you&apos;re building and we&apos;ll scope a PoC engagement that gives you a clear, decision-ready answer in weeks.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#0035cc] transition-colors">
                  Start a scoping call <ArrowRight size={15} />
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
