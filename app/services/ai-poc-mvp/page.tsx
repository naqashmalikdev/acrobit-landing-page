"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, FlaskConical,
  Rocket, Zap, Brain, FileText, BarChart3, Eye,
  ShoppingCart, DollarSign, HeartPulse, Scale, Factory, Layers,
  Clock, ShieldCheck, Code2, GitBranch,
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

function Counter({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, ""));
    if (isNaN(num)) { setVal(target); return; }
    const suffix = target.replace(/^[^0-9]*[0-9]+/, "");
    const prefix = target.replace(/[0-9].*/, "");
    let s = 0; const inc = num / 87;
    const t = setInterval(() => {
      s += inc;
      if (s >= num) { setVal(target); clearInterval(t); }
      else setVal(prefix + Math.floor(s) + suffix);
    }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{val}</span>;
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
      <div style={{ maxHeight: isOpen ? 400 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <p className="pb-5 sm:pb-6 text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ─── data ─── */

const stats = [
  { value: "4wk", label: "PoC delivery target" },
  { value: "60%", label: "Faster validation vs. in-house" },
  { value: "3×", label: "Higher investment confidence" },
  { value: "12mo", label: "Bug-free warranty" },
];

const engagementTypes = [
  {
    type: "Proof of Concept",
    abbr: "PoC",
    timeline: "3–5 Weeks",
    goal: "Confirm that your chosen AI approach actually works before committing to a full-scale build.",
    color: false,
    forWho: "Teams sitting on an AI hypothesis that needs to be de-risked before presenting to the board or unlocking engineering budget.",
    includes: [
      "Working demo tested against representative data",
      "Architecture & model selection with written rationale",
      "Performance benchmarks measured against agreed success criteria",
      "Feasibility report containing a clear go/no-go recommendation",
      "Full codebase handover or a detailed integration brief",
    ],
    notIncludes: ["Production infrastructure", "User auth & admin", "Full error handling"],
  },
  {
    type: "Minimum Viable Product",
    abbr: "MVP",
    timeline: "6–10 Weeks",
    goal: "Deliver a production-grade AI product that real users can access, test, and provide feedback on from day one.",
    color: true,
    forWho: "Organisations that have validated their AI concept and are ready to onboard early users and iterate on real-world feedback.",
    includes: [
      "Production deployment on your cloud environment or ours",
      "User authentication, role management, and access controls",
      "Live monitoring, structured logging, and full observability",
      "CI/CD pipeline with automated test coverage",
      "Human-in-the-loop review workflows where the use case requires them",
      "Complete technical documentation and handover session",
    ],
    notIncludes: [],
  },
];

const capabilities = [
  {
    icon: Brain,
    title: "Conversational AI & Copilots",
    tag: "LLM",
    wide: true,
    desc: "Develop chat interfaces, domain-specific copilots, and multi-turn assistants grounded in your own knowledge base through RAG, fine-tuning, and tool integration — stress-tested against real user queries before you commit to scale.",
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    tag: "Document AI",
    wide: false,
    desc: "Pull structured information out of unstructured documents — contracts, invoices, clinical records, and reports — with high extraction precision and a human review layer for anything the model flags as uncertain.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    tag: "Vision AI",
    wide: false,
    desc: "Prototype image classifiers, object detectors, defect inspection pipelines, and visual search systems — trained on your own dataset and benchmarked for accuracy before you move toward full productionisation.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics & Forecasting",
    tag: "ML",
    wide: false,
    desc: "Build and validate demand forecasts, churn models, risk scores, and anomaly detectors against your historical data — with explainability outputs that give stakeholders confidence in the predictions.",
  },
  {
    icon: Layers,
    title: "Recommendation Engines",
    tag: "Personalisation",
    wide: false,
    desc: "Prototype collaborative filtering, content-based, and hybrid recommendation systems for products, content, or services — evaluated directly on click-through rates and conversion lift against a baseline.",
  },
  {
    icon: FlaskConical,
    title: "Autonomous Agent Workflows",
    tag: "Agents",
    wide: true,
    desc: "Design and validate multi-step agentic pipelines that reason across data, invoke tools, and act across connected systems — proving the core workflow logic in a controlled environment before any production rollout.",
  },
];

const deliverySteps = [
  {
    num: "01",
    title: "Scoping & Success Criteria",
    duration: "Week 1",
    desc: "We facilitate a structured scoping session to pin down the core hypothesis, agree on what measurable success looks like, map data requirements, and lock in the model and architecture direction.",
    deliverables: ["Problem statement doc", "Success metrics definition", "Data readiness checklist", "Architecture decision record"],
  },
  {
    num: "02",
    title: "Core Build",
    duration: "Weeks 2–3",
    desc: "We build the working AI system against your actual data — wiring up the models, developing the interface or API surface, and configuring the evaluation harness that will track performance throughout.",
    deliverables: ["Working prototype", "Evaluation harness", "Integration layer", "Daily async updates"],
  },
  {
    num: "03",
    title: "Validation & Iteration",
    duration: "Week 4–5",
    desc: "We run the system against the agreed success criteria, collect stakeholder observations, and iterate quickly on what needs to change. Edge cases and failure modes are catalogued alongside the final performance baseline.",
    deliverables: ["Performance benchmark report", "Edge case documentation", "Stakeholder demo session", "Iteration log"],
  },
  {
    num: "04",
    title: "Handover & Roadmap",
    duration: "Week 5–6",
    desc: "We hand over the complete codebase with documentation, deliver a written go/no-go recommendation, and — if the PoC passes — provide a production roadmap so the transition to MVP can begin immediately without rework.",
    deliverables: ["Codebase + README", "Go/No-Go report", "Production roadmap", "Cost & timeline estimate"],
  },
];

const industryTabs = [
  {
    industry: "FinTech",
    icon: DollarSign,
    metric: "Validate credit or fraud models in 4 weeks",
    headline: "AI Validation for Financial Products",
    desc: "Financial institutions use PoCs to de-risk AI investments before compliance reviews, infrastructure changes, or market commitments. We build benchmarked demos your risk and tech teams can interrogate.",
    useCases: [
      "Fraud detection model on transaction history",
      "Credit scoring with explainability outputs",
      "KYC document extraction and verification PoC",
      "Personalised financial product recommendation engine",
      "Trade surveillance anomaly detection prototype",
      "Automated regulatory report generation MVP",
      "Conversational financial advisory copilot",
    ],
  },
  {
    industry: "Healthcare",
    icon: HeartPulse,
    metric: "HIPAA-compliant prototypes in 5 weeks",
    headline: "Clinical AI Prototyping",
    desc: "Healthcare PoCs require HIPAA compliance, de-identified data workflows, and clinician validation gates. We build to those constraints from day one — so your PoC is already compliance-ready.",
    useCases: [
      "Clinical documentation summarisation agent",
      "Prior authorisation processing PoC",
      "Diagnostic image classification prototype",
      "Patient triage and symptom assessment chatbot",
      "Drug interaction and formulary advisory agent",
      "EHR data extraction and normalisation pipeline",
      "Claims processing automation MVP",
    ],
  },
  {
    industry: "E-Commerce",
    icon: ShoppingCart,
    metric: "Measure lift on real catalogue data",
    headline: "AI Features That Drive Revenue",
    desc: "E-commerce PoCs are measured in conversion rate, AOV, and return rate — not just accuracy. We prototype against your catalogue and validate impact metrics before full rollout.",
    useCases: [
      "Personalised product recommendation engine",
      "Visual search and image-based product discovery",
      "AI-generated product descriptions at scale",
      "Dynamic pricing and promotions optimisation",
      "Customer intent classification for segmentation",
      "Review summarisation and sentiment analysis",
      "Returns reduction prediction model",
    ],
  },
  {
    industry: "Legal",
    icon: Scale,
    metric: "Prototype contract review in 3 weeks",
    headline: "AI for Legal Workflows",
    desc: "Legal AI PoCs must handle confidential documents, produce auditable outputs, and meet attorney oversight requirements. We build review workflows with human-in-the-loop gates built in.",
    useCases: [
      "Contract clause extraction and risk flagging",
      "Due diligence document review agent",
      "Legal research summarisation copilot",
      "Jurisdiction-specific compliance monitoring prototype",
      "Litigation document classification pipeline",
      "Client intake and matter summary automation",
      "Regulatory change impact analysis agent",
    ],
  },
  {
    industry: "SaaS / Tech",
    icon: Code2,
    metric: "Ship AI features without rebuilding your core",
    headline: "AI Feature Development",
    desc: "SaaS companies use PoCs to validate that an AI feature is technically feasible and improves key product metrics before allocating a full engineering quarter to it.",
    useCases: [
      "In-product AI copilot or assistant feature",
      "Smart search with semantic understanding",
      "Auto-categorisation and tagging pipelines",
      "Anomaly detection for product analytics",
      "Churn prediction and early warning model",
      "AI-generated onboarding and help content",
      "User behaviour clustering and segmentation",
    ],
  },
  {
    industry: "Manufacturing",
    icon: Factory,
    metric: "Validate defect detection before line changes",
    headline: "Industrial AI Prototyping",
    desc: "Manufacturing PoCs validate AI on existing sensor and imaging data before any line changes or infrastructure investment. We benchmark against your current defect rates and cycle times.",
    useCases: [
      "Visual defect detection on production line imagery",
      "Predictive maintenance model on sensor telemetry",
      "Demand forecasting for production planning",
      "Supplier quality analysis and risk scoring",
      "Safety incident prediction and anomaly flagging",
      "Energy consumption optimisation prototype",
      "Production yield improvement model",
    ],
  },
];

const techLogos = [
  { src: "/icons/open ai.webp", alt: "OpenAI" },
  { src: "/icons/fast api.png", alt: "FastAPI" },
  { src: "/icons/next js.webp", alt: "Next.js" },
  { src: "/icons/node js.png", alt: "Node.js" },
  { src: "/icons/ts.png", alt: "TypeScript" },
  { src: "/icons/postgresql.webp", alt: "PostgreSQL" },
  { src: "/icons/supabase.webp", alt: "Supabase" },
  { src: "/icons/tailwind.webp", alt: "Tailwind" },
];

const techBadges = [
  "OpenAI GPT-4o", "Anthropic Claude", "Google Gemini", "Groq",
  "LangChain", "LangGraph", "CrewAI", "RAG Pipelines",
  "Pinecone", "Weaviate", "PyTorch", "Hugging Face",
  "AWS Bedrock", "Azure OpenAI", "Vercel AI SDK",
];

const faqs = [
  {
    q: "What actually separates a PoC from an MVP?",
    a: "A PoC answers one question: will this AI approach work for our problem? It's a time-boxed build — usually 3–5 weeks — that delivers a functional demo validated against pre-agreed success criteria. It's not production-ready. An MVP is: it handles real users, includes authentication, error handling, and observability, and can be deployed. If the PoC passes, the path to MVP typically takes 6–10 additional weeks.",
  },
  {
    q: "Do we need clean, prepared data before we can start?",
    a: "Not necessarily. Week one begins with a data readiness check. If your data is accessible and in reasonable shape, we move straight into the build. If there are gaps or quality issues, we identify the minimum dataset required and either use representative synthetic data for the PoC phase or guide you through preparing a working subset. Full data pipelines are scoped and built at the MVP stage.",
  },
  {
    q: "What happens if the PoC doesn't validate the approach?",
    a: "A PoC that returns a 'no' is still a valuable outcome — it protected you from spending significantly more on a build that would have disappointed. We provide a clear, written go/no-go report covering what was tested, why the approach didn't perform as expected, and what alternative directions are worth exploring. Many clients pivot to a stronger solution rather than shelving the idea entirely.",
  },
  {
    q: "Who owns the code at the end of the engagement?",
    a: "You do. Full IP and codebase ownership transfers to you upon final payment. You receive the complete repository, all documentation, and a live technical handover session. Whether you take it in-house or pass it to another development team, we make sure the transition is clean and well-documented.",
  },
  {
    q: "Is the pricing fixed or time and materials?",
    a: "All PoC and MVP engagements are fixed-price with a clearly scoped deliverable list agreed before work starts. You have full cost certainty from day one. If requirements evolve during the build, we discuss scope changes openly before proceeding — no hidden charges or end-of-month surprises.",
  },
  {
    q: "Which AI models and frameworks do you build with?",
    a: "We make technology choices based on what the problem calls for, not preference. For high-reasoning tasks we typically reach for GPT-4o; for long-context document processing, Claude; for multimodal inputs, Gemini; and for data-sensitive or cost-constrained scenarios, open-weight models like LLaMA or Mistral. On the orchestration side we use LangChain, LangGraph, CrewAI, and custom RAG pipelines depending on the architecture.",
  },
  {
    q: "How much of our time does the engagement require?",
    a: "Not much, but the right moments matter. We need a 1-hour kickoff call, access to your data, and one domain expert reachable for questions over async chat. We schedule a midpoint demo around weeks 2–3 and a final walkthrough at delivery. Between those touchpoints we work autonomously and send you written progress updates daily.",
  },
  {
    q: "What exactly is included in the final handover?",
    a: "The complete codebase with a README and setup instructions, architecture documentation explaining the decisions made, a performance benchmarking report against the agreed success criteria, a written go/no-go recommendation with the reasoning behind it, and a production roadmap with time and cost estimates if you choose to proceed to MVP or wider deployment.",
  },
];

/* ══════════════════════════════ PAGE ══════════════════════════════ */
export default function AIPoCMVPPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main className="">

        {/* ══ HERO ══ */}
        <section className="isolate relative min-h-[80vh] sm:min-h-[92vh] flex flex-col justify-center bg-white border-b border-gray-200">
          <div className="h-px bg-gray-200 w-full absolute top-0" />
          <div className="absolute right-0 top-28 hidden lg:block h-[58%] w-px bg-gray-200" />

          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-14 sm:pb-20 w-full">
            <div ref={heroRef} className="max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE }} className="inline-flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#0048ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" /> AI PoC &amp; MVP
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-6">
                Validate your AI idea fast.
                <span className="block text-[#0048ff]">Ship what works.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-base sm:text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-10">
                We build AI-powered proof of concepts and MVPs on real data, giving you a clear answer on what works before you commit a full engineering quarter to it.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3, ease: EASE }} className="flex flex-wrap items-center gap-4 mb-10">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
                  Start a PoC Scoping Call <ArrowRight size={15} />
                </ContactButton>
                <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all no-underline">
                  See Case Studies <ChevronRight size={15} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.45 }} className="flex flex-wrap items-center gap-3">
                {["Fixed-Price Delivery", "Full IP Ownership", "Go/No-Go Report Included", "12-Month Warranty"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 ring-1 ring-gray-200 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280]">
                    <CheckCircle size={12} className="text-[#0048ff]" />{t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating delivery timeline card */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-[320px] rounded-lg border border-gray-100 bg-white p-6" style={{ boxShadow: "0 18px 55px rgba(15,28,63,0.08)" }}>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-5">PoC Delivery Timeline</p>
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#0048ff]/15" />
                  {[
                    { week: "Week 1", label: "Scoping & Architecture", done: true },
                    { week: "Week 2–3", label: "Core Build & Integration", done: true },
                    { week: "Week 4", label: "Validation & Demo", done: false },
                    { week: "Week 5", label: "Handover & Roadmap", done: false },
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
                  <span className="text-[10px] text-gray-400">Typical PoC scope</span>
                  <span className="text-xs font-bold text-[#0048ff]">3–5 weeks</span>
                </div>
                <ContactButton className="mt-3 flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                  Book scoping call <ArrowRight size={12} />
                </ContactButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 border-y border-gray-200">
              {stats.map(({ value, label }, i) => (
                <Reveal key={label} delay={i * 0.08} className={`p-5 sm:p-7 ${i < 3 ? "border-r border-gray-200" : ""}`}>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0f1c3f] mb-1">
                    <Counter target={value} />
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-[#6b7280]">{label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ POC vs MVP ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Engagement Types</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                PoC or MVP — which do you need?
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Both are fixed-price and time-boxed. The difference is the outcome: one validates an idea, the other ships it.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {engagementTypes.map(({ type, abbr, timeline, goal, color, forWho, includes, notIncludes }) => (
                <Reveal key={type} className={`rounded-2xl border p-6 sm:p-8 lg:p-10 ${color ? "bg-[#0048ff] border-transparent" : "bg-white border-gray-100 card-glow"}`}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className={`text-[10px] font-semibold tracking-widest uppercase mb-1 ${color ? "text-white/60" : "text-[#0048ff]"}`}>{abbr}</p>
                      <h3 className={`text-2xl font-medium tracking-tight ${color ? "text-white" : "text-[#0f1c3f]"}`}>{type}</h3>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${color ? "bg-white/20 text-white" : "bg-[#e8eeff] text-[#0048ff]"}`}>{timeline}</span>
                  </div>

                  <p className={`text-sm leading-relaxed mb-6 ${color ? "text-white/80" : "text-[#6b7280]"}`}>{goal}</p>

                  <div className={`text-xs rounded-xl px-4 py-3 mb-6 ${color ? "bg-white/10 text-white/80" : "bg-[#f5f8ff] text-[#6b7280]"}`}>
                    <span className={`font-semibold ${color ? "text-white" : "text-[#0f1c3f]"}`}>Best for: </span>{forWho}
                  </div>

                  <p className={`text-[10px] font-semibold tracking-widest uppercase mb-3 ${color ? "text-white/60" : "text-gray-400"}`}>What&apos;s included</p>
                  <ul className="space-y-2.5 mb-5">
                    {includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle size={14} className={`flex-shrink-0 mt-0.5 ${color ? "text-white/70" : "text-[#0048ff]"}`} />
                        <span className={`text-sm ${color ? "text-white/85" : "text-[#0f1c3f]"}`}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {notIncludes.length > 0 && (
                    <>
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-2">Not included (added in MVP)</p>
                      <ul className="space-y-1.5">
                        {notIncludes.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-[#6b7280]">
                            <span className="w-3.5 h-px bg-gray-300 flex-shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CAPABILITIES ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">What We Build</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Six AI categories we PoC and ship
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Each engagement produces a working, benchmarked system — not a slide deck or a proof of architecture.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {capabilities.map(({ icon: Icon, title, tag, desc, wide }, i) => (
                <Reveal key={title} delay={i * 0.07} className={`card-glow group relative rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 overflow-hidden ${wide ? "md:col-span-2" : ""}`}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(circle at 30% 30%,rgba(0,72,255,0.06) 0%,transparent 65%)" }} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#e8eeff] flex items-center justify-center group-hover:bg-[#0048ff] transition-colors duration-300">
                        <Icon size={22} className="text-[#0048ff] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#f5f8ff] text-[#6b7280] px-2.5 py-1 rounded-full border border-gray-100">{tag}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#0f1c3f] mb-3 group-hover:text-[#0048ff] transition-colors duration-300">{title}</h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-16 text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Delivery Process</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                How we run a PoC engagement
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Four phases, five weeks, one clear answer — does this AI approach work for your problem?
              </p>
            </Reveal>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#0048ff] via-[#0048ff]/30 to-transparent hidden md:block" />
              <div className="flex flex-col gap-8">
                {deliverySteps.map(({ num, title, duration, desc, deliverables }, i) => (
                  <Reveal key={num} delay={i * 0.1} className="flex gap-8 items-start">
                    <div className="flex-shrink-0 hidden md:flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-[#0048ff] flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                        {num}
                      </div>
                    </div>
                    <div className="card-glow flex-1 bg-white rounded-2xl border border-gray-100 p-5 sm:p-7">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="text-xs font-semibold tracking-widest uppercase text-[#0048ff] md:hidden">{num}</span>
                        <h3 className="text-xl font-semibold text-[#0f1c3f]">{title}</h3>
                        <span className="text-[10px] font-semibold bg-[#e8eeff] text-[#0048ff] px-2.5 py-1 rounded-full ml-auto">{duration}</span>
                      </div>
                      <p className="text-sm text-[#6b7280] leading-relaxed mb-5">{desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {deliverables.map((d) => (
                          <span key={d} className="text-[11px] font-medium bg-[#f5f8ff] text-[#6b7280] px-3 py-1.5 rounded-full border border-gray-100">{d}</span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ INDUSTRY USE CASES ══ */}
        <section className="bg-[#f5f8ff] py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-12">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Industry Applications</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                What we&apos;ve prototyped by vertical
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed max-w-2xl">
                Every industry has different data types, compliance requirements, and success metrics. Select yours to see what we&apos;ve built and can validate.
              </p>
            </Reveal>

            <div className="flex gap-8 flex-col lg:flex-row">
              <div className="flex flex-row lg:flex-col gap-2 lg:w-60 flex-shrink-0 overflow-x-auto lg:overflow-x-visible">
                {industryTabs.map(({ industry, icon: Icon }, i) => (
                  <button key={industry} onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2.5 text-left px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer border-none ${activeTab === i ? "bg-[#0048ff] text-white shadow-md" : "bg-white text-[#6b7280] hover:bg-gray-50 border border-gray-100"}`}>
                    <Icon size={15} className={activeTab === i ? "text-white" : "text-[#0048ff]"} />
                    {industry}
                  </button>
                ))}
              </div>

              <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5 sm:p-8">
                <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
                  <h3 className="text-xl font-semibold text-[#0f1c3f]">{industryTabs[activeTab].headline}</h3>
                  <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full">
                    {industryTabs[activeTab].metric}
                  </span>
                </div>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6">{industryTabs[activeTab].desc}</p>
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">PoC &amp; MVP ideas we can validate</p>
                <ul className="space-y-2.5">
                  {industryTabs[activeTab].useCases.map((uc, i) => (
                    <motion.li key={uc} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.28, delay: i * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f5f8ff] transition-colors">
                      <span className="w-5 h-5 rounded-full bg-[#e8eeff] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff]" />
                      </span>
                      <span className="text-sm text-[#0f1c3f] font-medium">{uc}</span>
                    </motion.li>
                  ))}
                </ul>
                <ContactButton className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0048ff] hover:underline">
                  Scope a {industryTabs[activeTab].industry} PoC <ArrowRight size={12} />
                </ContactButton>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TECH STACK ══ */}
        <section className="bg-white py-12 sm:py-20 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="text-center mb-12">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Technology</p>
              <h2 className="text-3xl md:text-4xl font-medium text-[#0f1c3f] tracking-tight mb-4">
                Model-agnostic, framework-agnostic
              </h2>
              <p className="text-sm text-[#6b7280] max-w-xl mx-auto leading-relaxed">
                We select the right model and framework for your specific problem — not the one that&apos;s easiest for us to use.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-wrap items-center justify-center gap-8 mb-12">
              {techLogos.map(({ src, alt }) => (
                <div key={alt} className="group flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 flex items-center justify-center p-2.5 group-hover:border-[#0048ff]/30 group-hover:shadow-md transition-all">
                    <img src={src} alt={alt} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] text-[#6b7280] font-medium">{alt}</span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="flex flex-wrap justify-center gap-2">
              {techBadges.map((badge) => (
                <span key={badge} className="text-xs font-medium text-[#0f1c3f] bg-white border border-gray-200 px-3.5 py-2 rounded-full hover:border-[#0048ff]/40 hover:text-[#0048ff] transition-colors cursor-default">
                  {badge}
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ══ TRUST STRIP ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-10 sm:py-14">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { icon: Clock, title: "Fixed timeline", desc: "PoCs in 3–5 weeks. MVPs in 6–10. We agree the deadline before we start and hit it." },
                  { icon: ShieldCheck, title: "Full IP ownership", desc: "You own all code, models, and data pipelines from day one. No lock-in, no licensing fees." },
                  { icon: GitBranch, title: "Clean handover", desc: "Every engagement ends with documented code, a README, and a technical handover session." },
                  { icon: Rocket, title: "Production-ready path", desc: "PoCs are scoped so the code is reusable — moving to MVP doesn't mean starting over." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="card-glow bg-white rounded-2xl border border-gray-100 p-5 sm:p-7">
                    <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center mb-5">
                      <Icon size={18} className="text-[#0048ff]" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#0f1c3f] mb-2">{title}</h3>
                    <p className="text-xs text-[#6b7280] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 sm:gap-16 items-start">
              <Reveal>
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">FAQ</p>
                <h2 className="text-3xl md:text-4xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                  Frequently asked questions
                </h2>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
                  Questions we get before almost every PoC engagement — answered honestly.
                </p>
                <ContactButton className="inline-flex items-center gap-2 bg-[#0048ff] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#0035cc] transition-colors">
                  Ask us directly <ArrowRight size={13} />
                </ContactButton>
              </Reveal>
              <div>
                {faqs.map((faq, i) => (
                  <Reveal key={i} delay={i * 0.04}>
                    <FAQItem q={faq.q} a={faq.a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="bg-[#f5f8ff] border-t border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="rounded-lg border border-gray-100 bg-white p-8 sm:p-12 lg:p-20 text-center" style={{ boxShadow: "0 12px 34px rgba(15,28,63,0.05)" }}>
              <Reveal>
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-4">Ready to validate?</p>
                <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-5 max-w-2xl mx-auto">
                  Get a clear answer on your AI idea within 5 weeks
                </h2>
                <p className="text-base text-[#6b7280] max-w-xl mx-auto mb-10 leading-relaxed">
                  Fixed-price, time-boxed, and closed out with a written go/no-go report. You leave knowing exactly what to build next — or which direction to rule out entirely.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#0035cc] transition-colors">
                    Start a PoC Scoping Call <ArrowRight size={15} />
                  </ContactButton>
                  <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-200 text-[#0f1c3f] px-8 py-4 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] transition-colors no-underline">
                    View Past Projects
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
