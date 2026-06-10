"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Bot, Brain, Zap, GitMerge, MessageSquare, BarChart3,
  ShieldCheck, Layers, ArrowRight, CheckCircle, ChevronRight,
  HeartPulse, ShoppingCart, DollarSign, Users, TrendingUp,
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
  const [displayed, setDisplayed] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, ""));
    if (isNaN(num)) return;
    const suffix = target.replace(/^[^0-9]*[0-9]+/, "");
    const prefix = target.replace(/[0-9].*/, "");
    let start = 0;
    const inc = num / 87;
    const timer = setInterval(() => {
      start += inc;
      if (start >= num) { setDisplayed(target); clearInterval(timer); }
      else setDisplayed(prefix + Math.floor(start) + suffix);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{displayed}</span>;
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
      <div style={{ maxHeight: isOpen ? 400 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <p className="pb-6 text-sm text-gray-500 leading-relaxed max-w-3xl">{a}</p>
      </div>
    </div>
  );
}

const capabilities = [
  { icon: Brain, title: "Autonomous Decision Making", desc: "Purpose-built agents that think through complex problems, form a plan, and execute multi-step tasks end-to-end — operating at full capacity between human check-ins.", tag: "Core AI", wide: true },
  { icon: GitMerge, title: "Multi-Agent Orchestration", desc: "Spin up networks of specialised agents that pass work to each other, self-correct on the fly, and deliver results in real time without manual coordination.", tag: "Architecture", wide: false },
  { icon: MessageSquare, title: "Natural Language Understanding", desc: "Understand what users actually mean, pull relevant context from the conversation, and respond with precision — across any language or business domain.", tag: "NLP", wide: false },
  { icon: Zap, title: "Workflow Automation", desc: "Swap tedious manual steps for AI-powered pipelines that fire actions, route data to the right destination, and surface exceptions before they become problems.", tag: "Automation", wide: false },
  { icon: BarChart3, title: "Continuous Improvement", desc: "Agents that sharpen their performance through built-in feedback cycles — each completed task makes the next one more accurate and more relevant.", tag: "ML", wide: true },
];

const steps = [
  { num: "01", title: "Discovery & Scoping", desc: "We document your existing workflows end-to-end, surface the highest-value automation targets, and establish clear success metrics — all before any code is written.", items: ["Process audit", "ROI modelling", "Agent persona design"] },
  { num: "02", title: "Architecture & Design", desc: "Our architects map the full agent structure — choosing the right models, configuring memory layers, designing integration points, and building reliable fallback paths.", items: ["Model selection", "Tool-use planning", "Safety guardrails"] },
  { num: "03", title: "Build & Fine-Tune", desc: "We develop and condition agents on your real data, then wire them into your current tech stack through APIs, webhooks, and available SDKs.", items: ["Custom training", "API integrations", "Prompt engineering"] },
  { num: "04", title: "Deploy, Monitor & Scale", desc: "We ship to production with complete observability in place — every decision is traceable, drift is caught early, and capacity scales automatically with demand.", items: ["CI/CD pipelines", "LLM observability", "Auto-scaling"] },
];

const industryTabs = [
  { industry: "Customer Support", icon: MessageSquare, metric: "70%+ tickets resolved without human lift", headline: "Always-On Support Agents", desc: "Put agents to work around the clock handling return requests, refunds, order checks, and common queries — passing only the edge cases that genuinely require a human. Every conversation is logged and synced to your CRM.", useCases: ["Resolve returns, refunds, and order status autonomously", "Intelligent ticket classification and priority routing", "Proactive outreach for SLA breach prevention", "Multi-channel support across chat, email, and SMS", "Knowledge base search with contextual answers", "Real-time CRM lookups and automatic record updates", "Sentiment detection and escalation trigger logic"] },
  { industry: "Sales & RevOps", icon: TrendingUp, metric: "3× pipeline coverage with same headcount", headline: "Revenue Automation Agents", desc: "Evaluate inbound leads against your ICP, write tailored outreach at scale, keep CRM records current, and fill calendars with qualified calls — without growing your team. Your reps close deals; agents handle everything else.", useCases: ["Lead qualification against ICP criteria using enrichment data", "Personalised email and LinkedIn sequence generation", "CRM data entry, deduplication, and field enrichment", "Meeting scheduling with calendar integration", "Follow-up cadence management and nudge triggers", "Deal stage progression monitoring and alerts", "Win/loss analysis and churn risk flagging"] },
  { industry: "Healthcare", icon: HeartPulse, metric: "HIPAA-compliant, zero data residency violations", headline: "Clinical Workflow Agents", desc: "Handle prior authorisation requests, appointment coordination, and EHR data processing within a fully HIPAA and HL7/FHIR-compliant framework — cutting the administrative load on clinical staff by up to 60%.", useCases: ["Prior authorisation request drafting and submission", "Patient intake form processing and triage", "EHR data extraction, summarisation, and normalisation", "Appointment scheduling and reminder orchestration", "Insurance eligibility verification workflows", "Clinical documentation support and coding assistance", "Lab result routing and patient notification"] },
  { industry: "Finance", icon: DollarSign, metric: "99.9% transaction monitoring accuracy", headline: "Intelligent Risk & Compliance", desc: "Watch transactions continuously, produce audit-ready reports without manual effort, and flag anomalies before they escalate — across global books and diverse regulatory frameworks.", useCases: ["Real-time transaction monitoring and anomaly flagging", "Automated regulatory report generation (Basel, IFRS)", "KYC document review and onboarding acceleration", "Reconciliation exception identification and resolution", "Trade surveillance and market abuse detection", "Credit decisioning with explainability outputs", "Audit trail generation and evidence packs"] },
  { industry: "E-Commerce", icon: ShoppingCart, metric: "Up to 35% lift in conversion rate", headline: "Personalised Shopping Agents", desc: "Increase revenue with agents that surface the right products based on real behaviour, win back abandoned carts with context-aware nudges, and resolve post-purchase questions without raising a ticket.", useCases: ["Real-time personalised product recommendation", "Abandoned cart recovery with contextual outreach", "Inventory-aware dynamic pricing adjustments", "Post-purchase support and returns automation", "Review and UGC analysis for merchandise insights", "Supplier query management and reorder triggers", "Cross-sell and upsell trigger orchestration"] },
  { industry: "HR & Talent", icon: Users, metric: "60% reduction in time-to-hire", headline: "Recruiting & Onboarding Agents", desc: "Review applications against job requirements, coordinate interview logistics, field candidate questions, and automate the document flow from offer to onboarding — freeing your HR team to focus on culture rather than admin.", useCases: ["CV screening and candidate shortlisting against JD", "Interview scheduling with calendar and video link generation", "Candidate FAQ bot across channels", "Offer letter generation and e-signature orchestration", "Onboarding document collection and verification", "Payroll and benefits enrolment data processing", "Employee helpdesk and policy Q&A automation"] },
];

const stats = [
  { value: "200+", label: "Agents Deployed" },
  { value: "<80ms", label: "Avg. Latency" },
  { value: "98%", label: "Task Accuracy" },
  { value: "12mo", label: "Bug-Free Warranty" },
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

const aiTechBadges = ["LangChain", "LangGraph", "OpenAI GPT-4o", "Anthropic Claude", "Groq", "Pinecone", "Weaviate", "CrewAI", "AutoGen", "RAG Pipelines"];
const compliance = ["HIPAA Compliant", "GDPR Ready", "SOC 2 Aligned", "HL7 / FHIR", "PII Redaction", "Full Audit Logs"];
const faqs = [
  { q: "Which types of processes are a strong fit for AI agents?", a: "AI agents deliver most value in workflows that span multiple steps, involve reasoning over a mix of data types, and require acting across several systems — think customer support triage, sales outreach sequencing, document review, scheduling coordination, and compliance checks. If the task involves reading, interpreting, and taking action, an agent is likely the right tool." },
  { q: "How long does it take to deploy a production-ready agent?", a: "Focused single-function agents are typically live within 3–4 weeks. Orchestrated multi-agent systems or builds requiring custom model fine-tuning run 6–10 weeks. We define the scope and delivery milestones at the start so you have a firm timeline before we write a single line of code." },
  { q: "Do AI agents replace our existing software or work alongside it?", a: "They work alongside it. Our agents connect to your CRMs, ERPs, databases, and internal APIs through webhooks, REST calls, and SDKs. We don't ask you to change your infrastructure — agents layer on top of the tools you already rely on." },
  { q: "How do you keep agents accurate as conditions change over time?", a: "Every agent we deliver includes observability tooling that logs each decision, the reasoning behind it, and every output produced. We configure automated drift detection and schedule periodic performance reviews. Any accuracy regression caused by our code is covered under the 12-month warranty." },
  { q: "What happens when an agent runs into a scenario it can't resolve?", a: "Every agent is built with explicit escalation logic. Unrecognised situations are handed off to a human reviewer with full conversation context already attached. You set the threshold for escalation; the agent honours it and never fails silently." },
  { q: "Can agents learn from our internal knowledge and proprietary data?", a: "Yes. We build RAG pipelines over your documentation and knowledge bases, fine-tune models on your labelled examples, and set up memory systems that preserve domain context across sessions. Unless you opt for a cloud-hosted model, your data stays within your own infrastructure." },
  { q: "How do you approach compliance and auditability in regulated industries?", a: "Every agent ships with a complete audit trail covering who initiated it, what actions were executed, which data was accessed, and what decisions were reached. We design to HIPAA, GDPR, SOC 2, HL7/FHIR, and relevant industry standards from the first sprint — compliance is built in, not bolted on." },
  { q: "What exactly is covered by your 12-month warranty?", a: "Any functional defect, accuracy regression, or integration failure traceable to code our team wrote is resolved at no additional charge within 12 months of going live. Changes to scope and requests for new capabilities fall outside the warranty and are scoped separately under a support arrangement." },
];

export default function AIAgentsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeTab, setActiveTab] = useState(0);
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
                  AI Agents
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-5 sm:mb-7">
                AI agents for workflows that need reasoning and action.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-base sm:text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-8 sm:mb-10">
                We build and ship AI agents that take over decisions, workflows, and day-to-day operations from end to end — giving your team the space to focus on work that actually needs a human.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3, ease: EASE }} className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#0035cc] hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)]">
                  Start Your Agent Project <ArrowRight size={15} />
                </ContactButton>
                <Link href="/customers" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] no-underline">
                  View Customer Work <ChevronRight size={15} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.45 }} className="flex flex-wrap items-center gap-4 sm:gap-6">
                {["HIPAA & GDPR Compliant", "12-Month Warranty", "Senior Engineers Only", "Fixed-Price Delivery"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280] ring-1 ring-gray-200">
                    <CheckCircle size={13} className="text-[#0048ff]" />{t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating agent card — xl only */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-[360px] rounded-lg border border-gray-100 bg-white p-6 text-[#0f1c3f] shadow-[0_18px_55px_rgba(15,28,63,0.08)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-[#0048ff] flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0f1c3f]">SupportAgent v2</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-[10px] text-gray-400">Live · Processing</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-5">
                  {[
                    { role: "user", msg: "Refund request for order #8821" },
                    { role: "agent", msg: "Refund approved. $49 back to card on file within 2–3 days." },
                    { role: "agent", msg: "Confirmation email sent. Ticket closed." },
                  ].map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[82%] px-3 py-2 rounded-xl text-[11px] leading-relaxed ${m.role === "user" ? "bg-[#f5f8ff] text-[#0f1c3f]" : "bg-[#0048ff] text-white"}`}>
                        {m.msg}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 grid grid-cols-3 gap-2 text-center">
                  {[{ v: "1.2s", l: "Response" }, { v: "99.1%", l: "Accuracy" }, { v: "0", l: "Escalations" }].map(({ v, l }) => (
                    <div key={l}>
                      <p className="text-sm font-bold text-[#0048ff]">{v}</p>
                      <p className="text-[9px] text-gray-400 uppercase tracking-wider">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 border-y border-gray-200">
              {stats.map(({ value, label }, i) => (
                <Reveal key={label} delay={i * 0.08} className="bg-white p-5 sm:p-7 border-r border-gray-200 even:border-r-0 md:even:border-r md:last:border-r-0">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0f1c3f] mb-1">
                    <Counter target={value} />
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-[#6b7280]">{label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CAPABILITIES ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Core Capabilities</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                What our AI agents can do
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Purpose-built capabilities engineered for real-world complexity — not demos.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {capabilities.map(({ icon: Icon, title, desc, tag }, i) => (
                <Reveal key={title} delay={i * 0.07} className="group grid grid-cols-1 md:grid-cols-[120px_1fr_120px] gap-4 md:gap-8 border-b border-gray-200 px-0 py-7 sm:py-9 transition-all duration-300 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff]">
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-gray-400 tabular-nums">0{i + 1}</span>
                    <Icon size={18} className="text-[#0048ff] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-[#0f1c3f] mb-3 group-hover:text-[#0048ff] transition-colors">{title}</h3>
                    <p className="text-sm sm:text-base text-[#6b7280] leading-relaxed max-w-3xl">{desc}</p>
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#6b7280] md:text-right">{tag}</span>
                </Reveal>
              ))}

              {/* Integrations card */}
              <Reveal delay={0.4} className="group grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8 border-b border-gray-200 px-0 py-7 sm:py-9 transition-all duration-300 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff]">
                <div className="flex items-start gap-3">
                  <span className="text-xs text-gray-400 tabular-nums">06</span>
                  <Layers size={18} className="text-[#0048ff]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-[#0f1c3f] mb-3 transition-colors group-hover:text-[#0048ff]">Seamless Integrations</h3>
                  <p className="text-sm sm:text-base text-[#6b7280] leading-relaxed mb-5 max-w-3xl transition-colors">
                    Connect agents to any tool in your stack — CRMs, ERPs, databases, APIs, and third-party platforms out of the box.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Slack", "Salesforce", "HubSpot", "Zapier", "Jira", "Notion"].map((t) => (
                      <span key={t} className="text-[11px] border border-gray-200 text-[#0f1c3f] px-2.5 py-1 rounded-md font-medium transition-colors group-hover:border-gray-100 group-hover:bg-white group-hover:text-[#0048ff]">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ INDUSTRY USE CASES ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-12">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Industry Applications</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Agents for every vertical
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed max-w-2xl">
                We&apos;ve deployed AI agents across industries — each tailored to domain logic, compliance requirements, and operational realities.
              </p>
            </Reveal>

            <div className="flex gap-6 sm:gap-8 flex-col lg:flex-row">
              {/* Industry tabs */}
              <div className="flex flex-row lg:flex-col gap-2 lg:w-60 flex-shrink-0 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
                {industryTabs.map(({ industry, icon: Icon }, i) => (
                  <button key={industry} onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2.5 text-left px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer border ${activeTab === i ? "bg-[#0048ff] text-white border-[#0048ff] shadow-[0_16px_36px_rgba(0,72,255,0.22)] -translate-y-0.5" : "bg-white/80 text-[#6b7280] hover:-translate-y-0.5 hover:text-[#0f1c3f] hover:shadow-[0_12px_30px_rgba(15,28,63,0.08)] border-gray-200"}`}>
                    <Icon size={15} className={activeTab === i ? "text-white" : "text-[#0048ff]"} />
                    {industry}
                  </button>
                ))}
              </div>

              {/* Detail panel */}
              <div className="flex-1 bg-white rounded-lg border border-gray-100 p-5 sm:p-8 shadow-[0_16px_45px_rgba(15,28,63,0.05)]">
                <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0f1c3f]">
                    {industryTabs[activeTab].headline}
                  </h3>
                  <span className="text-xs font-semibold text-[#0048ff] bg-white border border-gray-200 px-3 py-1 rounded-md">
                    {industryTabs[activeTab].metric}
                  </span>
                </div>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6">{industryTabs[activeTab].desc}</p>
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Use cases we deploy</p>
                <ul className="space-y-2">
                  {industryTabs[activeTab].useCases.map((uc, i) => (
                    <motion.li key={uc} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.28, delay: i * 0.05 }}
                      className="flex items-start gap-3 border-t border-gray-100 py-3 transition-colors hover:bg-[#f5f8ff]">
                      <span className="w-5 h-5 rounded-md bg-[#f5f8ff] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff]" />
                      </span>
                      <span className="text-sm text-[#0f1c3f] font-medium">{uc}</span>
                    </motion.li>
                  ))}
                </ul>
                <ContactButton className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0048ff] hover:underline">
                  Build a {industryTabs[activeTab].industry} agent <ArrowRight size={12} />
                </ContactButton>
              </div>
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-12 sm:mb-16 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Our Process</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                From zero to production agent
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                A battle-tested 4-phase methodology that ships working agents, not prototypes.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {steps.map(({ num, title, desc, items }, i) => (
                <Reveal key={num} delay={i * 0.1} className="group bg-white border-b border-gray-200 py-7 sm:py-9 grid grid-cols-1 md:grid-cols-[110px_1fr_260px] gap-5 sm:gap-8 transition-all duration-300 hover:bg-[#f5f8ff] hover:px-4">
                  <div className="flex-shrink-0">
                    <span className="block text-3xl sm:text-4xl font-medium leading-none text-[#0f1c3f]/15 transition-colors group-hover:text-[#0048ff]">
                      {num}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#0f1c3f] mb-3">{title}</h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed mb-5">{desc}</p>
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

        {/* ══ TECH STACK ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-14 sm:py-20 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-12 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Technology</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0f1c3f] mb-4">
                The stack behind our agents
              </h2>
              <p className="text-sm text-[#6b7280] max-w-xl leading-relaxed">
                We combine best-in-class models, frameworks, and infrastructure — always choosing the right tool for the job, not the trendy one.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 border border-gray-200 bg-white mb-8 sm:mb-10">
              {techLogos.map(({ src, alt }) => (
                <div key={alt} className="group flex flex-col items-center justify-center gap-2 min-h-[126px] border-r border-b border-gray-200 lg:border-b-0 last:border-r-0 opacity-70 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5f8ff] hover:opacity-100 hover:shadow-[0_12px_30px_rgba(15,28,63,0.06)]">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110">
                    <Image src={src} alt={alt} width={56} height={56} className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className="text-[10px] text-[#6b7280] font-medium transition-colors group-hover:text-[#0048ff]">{alt}</span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="flex flex-wrap justify-center gap-2">
              {aiTechBadges.map((badge) => (
                <span key={badge} className="text-xs font-medium text-[#0f1c3f] bg-white border border-gray-200 px-3.5 py-2 rounded-md transition-all hover:-translate-y-0.5 hover:border-[#0048ff]/40 hover:text-[#0048ff] hover:shadow-[0_10px_24px_rgba(0,72,255,0.1)] cursor-default">
                  {badge}
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ══ SECURITY ══ */}
        <section className="bg-white py-14 sm:py-20">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal>
              <div className="rounded-lg border border-gray-100 bg-[#f5f8ff] px-6 py-8 shadow-[0_12px_34px_rgba(15,28,63,0.05)] sm:px-10 sm:py-12 lg:px-14 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center gap-8 sm:gap-10">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Security-First</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0f1c3f] mb-4 leading-tight">
                    Enterprise security that ships with every agent
                  </h2>
                  <p className="text-sm text-[#6b7280] leading-relaxed max-w-lg">
                    Every agent comes equipped with guardrails, a full audit log, rate controls, PII scrubbing, and role-based permissions — compliance is a core deliverable, not something added at the end.
                  </p>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 w-full">
                  {compliance.map((label) => (
                    <div key={label} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-3 py-3 transition-all hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-[0_10px_24px_rgba(15,28,63,0.06)] sm:px-4">
                      <ShieldCheck size={16} className="text-[#0048ff] flex-shrink-0" />
                      <span className="text-sm font-medium text-[#0f1c3f]">{label}</span>
                    </div>
                  ))}
                </div>
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0f1c3f] leading-tight mb-4">
                  Frequently asked questions
                </h2>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
                  Can&apos;t find the answer you&apos;re looking for? Our team responds within one business day.
                </p>
                <ContactButton className="inline-flex items-center gap-2 bg-[#0048ff] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#0035cc] transition-colors">
                  Ask us directly <ArrowRight size={13} />
                </ContactButton>
              </Reveal>
              <div className="flex flex-col gap-3">
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
        <section className="bg-[#f5f8ff] border-t border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-white px-6 py-10 text-center shadow-[0_12px_34px_rgba(15,28,63,0.05)] sm:px-10 sm:py-14 lg:py-16">
              <div className="relative">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-4">Ready to start?</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-5 max-w-2xl mx-auto">
                Let&apos;s ship your first AI agent
              </h2>
              <p className="text-base text-[#6b7280] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                From the initial scoping call to production deployment in as few as 4 weeks. Fixed-price, outcome-focused, and backed by a 12-month bug-free warranty on everything we build.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#0035cc] hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)]">
                  Start a Free Discovery Call <ArrowRight size={15} />
                </ContactButton>
                <Link href="/customers" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] no-underline">
                  Browse Our Work
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
