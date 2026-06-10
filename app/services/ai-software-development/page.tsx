"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, ChevronLeft,
  Brain, Zap, ShieldCheck, BarChart3, MessageSquare,
  Eye, GitBranch, RefreshCw, Settings, Bot,
  Search, TrendingUp, Layers, Users, Sparkles, Code2, Rocket,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactButton from "@/app/components/ContactButton";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Reveal ── */
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

/* ── FAQ ── */
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

/* ══════════════════════════════════════════════════
   STICKY SECTION TABS  (21st.dev pattern)
   Left: sticky nav tracking scroll position
   Right: scrolling content sections
══════════════════════════════════════════════════ */
interface ProcessPhase {
  number: string;
  label: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

function StickySectionTabs({ phases }: { phases: ProcessPhase[] }) {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight / 2;
      sectionRefs.current.forEach((ref, i) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (scrollMid >= offsetTop && scrollMid < offsetTop + offsetHeight) {
            setActiveSection(i);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

        {/* ── Left sticky nav — direct flex child ── */}
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
                        style={{ color: active ? "rgba(255,255,255,0.7)" : "#6b7280" }}>
                        Phase {phase.number}
                      </div>
                      <div className="text-sm font-semibold leading-snug"
                        style={{ color: active ? "#fff" : "#0f1c3f" }}>
                        {phase.label}
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{ background: active ? "rgba(255,255,255,0.6)" : "transparent" }} />
                  </div>
                </button>
              );
            })}

            {/* CTA card below nav */}
            <div className="mt-4 rounded-2xl border border-[#0048ff]/15 bg-[#e8eeff] p-5">
              <p className="text-xs font-semibold text-[#0048ff] mb-1">Ready to start?</p>
              <p className="text-xs text-[#0f1c3f]/70 leading-relaxed mb-4">
                Book a discovery call and we'll scope your AI engagement end-to-end.
              </p>
              <ContactButton
                className="flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                Book a call <ArrowRight size={12} />
              </ContactButton>
            </div>
        </div>

        {/* ── Right scrolling content ── */}
        <div className="flex-1 min-w-0 space-y-24 lg:space-y-32">
          {phases.map((phase, i) => (
            <motion.div key={i}
              ref={(el) => { sectionRefs.current[i] = el; }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="scroll-mt-28">
              {/* Phase header */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl font-bold leading-none select-none"
                  style={{ color: "#e8eeff" }}>{phase.number}</span>
                <div>
                  <span className="inline-flex items-center text-[10px] font-semibold tracking-widest uppercase text-[#0048ff] bg-[#e8eeff] px-2.5 py-1 rounded-full border border-[#0048ff]/20 mb-1 block w-fit">
                    {phase.label}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-[#0f1c3f] leading-snug">
                    {phase.title}
                  </h3>
                </div>
              </div>
              {/* Content */}
              {phase.content}
              {/* Next phase link */}
              {i < phases.length - 1 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <button onClick={() => scrollTo(i + 1)}
                    className="flex items-center gap-2 text-sm font-semibold text-[#0048ff] hover:underline cursor-pointer bg-transparent border-none p-0">
                    Next: {phases[i + 1].label}
                    <ChevronRight size={15} />
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

const stats = [
  { value: "54%", source: "Gartner", desc: "of Infrastructure & Operations leaders are now adopting AI specifically to reduce operational costs." },
  { value: "1.5×", source: "BCG", desc: "revenue growth — AI-leading companies also see 1.6× stronger shareholder returns and 1.4× higher ROIC." },
  { value: "88%", source: "McKinsey", desc: "of organizations now report regular AI use in at least one core business function." },
];

const services = [
  { icon: Brain, title: "AI-first product engineering", desc: "If AI is central to your product vision, you need engineering patterns that support it from day one. We build AI-native products where intelligence, personalization, and automation sit at the core of the architecture — systems that learn from usage, adapt to behavior, and deliver experiences that feel intuitive because the AI works in real conditions." },
  { icon: Settings, title: "Custom AI solution development", desc: "We build AI systems that solve real business problems, not theoretical use cases. Whether you need predictive accuracy or an AI agent that automates frontline tasks, we deliver production-ready solutions using modern LLMs and intelligent automation — designed for messy data, real integrations, user adoption, and ongoing operations." },
  { icon: Search, title: "AI strategy and consulting", desc: "AI fails when teams chase the wrong problems or underestimate data requirements. We help you focus on where AI will actually shift business metrics. Through structured discovery, we assess data readiness, prioritize high-value use cases, and create a practical roadmap with realistic timelines and resourcing — no vendor bias, no inflated promises." },
  { icon: BarChart3, title: "Machine learning and predictive analytics", desc: "Your data can reveal churn risks, high-value prospects, or operational bottlenecks before they occur. We build ML models that perform reliably in production, not just in experimentation — from forecasting to customer prediction, creating analytics systems that improve continuously with real-world feedback." },
  { icon: MessageSquare, title: "Natural language processing and conversational AI", desc: "We engineer NLP systems that understand context and respond intelligently. Whether a chatbot that resolves most inquiries, a contract analysis engine, or an internal knowledge assistant — we use transformer models and retrieval-augmented generation to deliver conversational AI that feels helpful and accurate." },
  { icon: Eye, title: "Computer vision and visual intelligence", desc: "We convert visual data into actionable intelligence. Our vision systems detect defects, analyze video for anomalies, and classify large image libraries with consistent accuracy — from quality control to security to inventory management, built to outperform manual review and scale with your operations." },
  { icon: Zap, title: "AI-powered workflow automation", desc: "We automate repetitive processes that slow teams down. Tasks that once took minutes now take seconds. Decisions that required meetings now run on real-time data. Using intelligent process automation and agentic AI, we target high-volume, rules-based workflows and replace them with systems that operate faster and more reliably." },
  { icon: RefreshCw, title: "AI integration and legacy modernization", desc: "Legacy systems can still benefit from AI without full rewrites. We add intelligent capabilities to existing platforms, integrate modern models with older architectures, and deliver upgrades that respect your operational constraints — faster value without the risk of rebuilding core systems from scratch." },
  { icon: GitBranch, title: "AI operations and MLOps", desc: "Building a model is easy. Keeping it accurate as data drifts is the real challenge. We provide full MLOps support — monitoring, drift detection, automated retraining, and continuous optimization — so your AI remains reliable, efficient, and aligned with evolving business needs." },
  { icon: Bot, title: "AI agents", desc: "We build and deploy AI agents that automate tasks, streamline operations, and enhance customer experiences. From single-purpose task agents to multi-agent systems that coordinate across workflows, we deliver agents that operate reliably in production environments." },
];

const outcomes = [
  { icon: Zap, title: "Faster time to AI value", desc: "Structured discovery, pilot-first delivery, and production-ready engineering compress the path from AI idea to measurable business impact." },
  { icon: ShieldCheck, title: "AI that stays accurate", desc: "Full MLOps support — monitoring, drift detection, and automated retraining — keeps your models performing as data and conditions change." },
  { icon: Layers, title: "Built for your existing stack", desc: "We integrate AI into your current architecture. No unnecessary rewrites, no lock-in — just capabilities added where they create real value." },
  { icon: TrendingUp, title: "Measurable ROI from day one", desc: "Every engagement is scoped around specific business metrics. Pilot results are validated before full investment is committed." },
];

const caseStudies = [
  { tag: "Healthcare · AI", title: "Upgraded platform helping scale to 1.2M+ users with AI-driven content", company: "Elia Wellness", quote: "", person: "Geraldine Przybylko", role: "Health Strategy Consultant", hasVideo: true },
  { tag: "Legal Services · AI", title: "Intelligent docketing system reducing manual tracking for 10,000+ patent cases", company: "Sterne Kessler", quote: "The AI capabilities transformed how our attorneys track and manage cases at scale.", person: "Robert K Burger", role: "COO, Sterne Kessler", hasVideo: false },
  { tag: "Manufacturing · AI", title: "AI-driven CSR system delivering 23% increase in sales productivity", company: "Knowles", quote: "", person: "Nick Drogo", role: "Global Director IT, Knowles", hasVideo: true },
  { tag: "E-Commerce · AI", title: "AI-enabled platform standardizing operations across 30+ countries", company: "Groupon", quote: "Their AI expertise transformed our platform and made global operations run smoothly.", person: "Umair Bashir", role: "Director, Groupon", hasVideo: false },
];

const clients = ["Sabb", "Scavas AI", "Sterne Kessler", "Centraleyes", "Groupon", "Marlee"];

const faqs = [
  { q: "How do you determine where AI will create real value in our business?", a: "We run a structured discovery session with your leadership and technical teams to identify where AI will shift actual business metrics — not just technical outcomes. We assess data readiness, evaluate feasibility against your current architecture, and prioritize use cases by impact and implementation risk. You leave knowing exactly what's possible and which initiative to tackle first." },
  { q: "What's the difference between your AI PoC and a full AI software build?", a: "An AI PoC (4–6 weeks) validates that the AI approach works with your real data before full investment. It answers: does this model perform well enough to justify building? A full AI software build (90+ days) produces a production-grade system with auth, monitoring, error handling, retraining pipelines, and integration into your existing stack." },
  { q: "How do you handle data privacy and security in AI projects?", a: "Data governance is built into every engagement from architecture design. We apply data anonymization where required, design secure data pipeline patterns, comply with GDPR, HIPAA, and SOC 2 constraints as applicable, and never use client data to train or fine-tune models outside of the agreed engagement scope." },
  { q: "Can you add AI capabilities to our existing product without a full rebuild?", a: "Yes. AI integration and legacy modernization is a core capability. We add intelligent features — search, recommendations, automation, copilots — to existing architectures without requiring full rewrites. We design integrations that respect your operational constraints and minimize disruption to live systems." },
  { q: "What AI models and frameworks do you work with?", a: "We're model-agnostic. We select the right tool for the problem: GPT-4o for high-reasoning tasks, Claude for long-context and document work, Gemini for multimodal, and open-source models (LLaMA, Mistral) where data privacy or cost requires it. Frameworks include LangChain, LangGraph, CrewAI, and custom RAG pipelines depending on the use case." },
  { q: "How do you keep AI models accurate after launch?", a: "We provide full MLOps support — continuous monitoring, data drift detection, automated retraining triggers, performance benchmarking, and optimization cycles. Your AI doesn't degrade after deployment; it improves as usage grows and real-world data accumulates." },
  { q: "How long does a typical AI software project take?", a: "Discovery and architecture design: 2 weeks. AI proof of value pilot: 4–6 weeks. Production MVP: approximately 90 days. Full-scale product: 90+ days depending on scope. Each phase has clearly defined deliverables and go/no-go decision points so you control investment at every stage." },
  { q: "Do we own the AI models and code you build?", a: "Yes. Full IP and codebase ownership transfers to you on final payment. This includes trained models, data pipelines, integration code, documentation, and architecture notes. No licensing fees, no lock-in to our infrastructure or tooling." },
];

/* ── Process phase content ── */
const processPhases: ProcessPhase[] = [
  {
    number: "01",
    label: "Discover",
    title: "AI solution discovery and architecture design",
    icon: Sparkles,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <Search size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Step 1A</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">AI solution discovery</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            In a focused session with your leadership and technical teams, we identify where AI will create actual business value — not just technical impressiveness. We assess data quality, evaluate feasibility against your architecture, and determine whether LLMs, custom ML models, or intelligent automation is the right fit.
          </p>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
            You leave discovery knowing exactly what is possible, what it will cost, and which initiative to tackle first.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Feasibility brief", "High-value use case map", "Prioritized delivery plan"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Card B */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <Layers size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Step 1B · 2 weeks</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">Architecture and data design</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            AI does not work without the right foundation. We design the technical architecture that supports your AI system long-term — model selection, data pipelines, API integration points, security protocols, and scalability requirements. A practical blueprint, not abstract system design.
          </p>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
            We audit your data: do you have enough? Is it labeled correctly? If your data is not ready, we tell you upfront and show you how to fix it before investing in model development.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Architecture blueprint", "Data strategy", "AI feature backlog", "Implementation roadmap"].map((d) => (
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
    number: "02",
    label: "Pilot",
    title: "Proof of value and production MVP",
    icon: Code2,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <BarChart3 size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Step 2A · 4–6 weeks</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">AI proof of value</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            Before committing to full development, validate that the AI actually works — built on your real data and tested against your actual success criteria. We build a working prototype, whether a forecasting model, computer vision system, or LLM-powered feature, and measure its performance in your operational context.
          </p>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
            If the pilot does not meet the agreed criteria, you have not wasted months on a full build. If it exceeds expectations, you have quantified proof of value to justify full investment.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Working pilot", "Model performance report", "Validation and compliance checklist"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Card B — inverted blue */}
        <div className="bg-[#0048ff] rounded-2xl border border-transparent p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-white/60">Step 2B · ~90 days</p>
              <h4 className="text-base font-semibold text-white">AI software MVP</h4>
            </div>
          </div>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            We build production-grade AI MVPs — not demos that break when they touch real users. Your MVP includes authentication, logging, monitoring dashboards, human oversight controls, error handling, and automated retraining pipelines.
          </p>
          <p className="text-sm text-white/80 leading-relaxed mb-6">
            It integrates with your existing systems, handles edge cases reliably, and ships with documentation so your team can support it. Designed to scale — no architectural rewrites needed later.
          </p>
          <div className="border-t border-white/20 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Production AI MVP", "Integration specs", "Monitoring setup", "Handover documentation"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-white/15 text-white px-3 py-1.5 rounded-full">
                  <CheckCircle size={11} className="text-white/70" /> {d}
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
    title: "Scale, optimize, and operate",
    icon: Rocket,
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <TrendingUp size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Step 3 · 90+ days</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">Transform and scale</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            Once your MVP proves value, we expand it into a fully engineered product used across teams or customer segments. We refine model accuracy based on real-world feedback, optimize infrastructure costs, strengthen security and compliance, add new features based on user needs, and scale deployment to handle ten times the load.
          </p>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
            This is continuous improvement — not just maintenance. Your AI becomes better every month as we retrain on fresh data, tune for performance, and incorporate lessons from production usage.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Multi-feature rollout", "Optimization reports", "Drift detection & retraining", "Operational runbook"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* MLOps summary cards */}
        <div className="flex flex-col gap-4">
          {[
            { icon: BarChart3, label: "Model monitoring", desc: "Continuous performance tracking against production baselines." },
            { icon: RefreshCw, label: "Automated retraining", desc: "Drift detection triggers retraining before accuracy degrades." },
            { icon: ShieldCheck, label: "Compliance audits", desc: "Regular security and governance reviews as usage grows." },
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
export default function AISoftwareDevelopmentPage() {
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
            <div ref={heroRef} className="max-w-4xl">

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE }} className="inline-flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#0048ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" /> AI Software Development
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-5">
                Transform workflows, decisions,
                <span className="block text-[#0048ff]">
                  and customer value with AI
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-10">
                Whether you aim to enhance workflows, modernize legacy systems, or build AI-first products — we deliver the strategy, engineering, and ongoing operations needed to make AI work in your business.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="flex flex-wrap items-center gap-4 mb-10">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
                  Start a discovery call <ArrowRight size={15} />
                </ContactButton>
                <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all no-underline">
                  View case studies <ChevronRight size={15} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-3">
                {["Production-Ready AI", "Full IP Ownership", "MLOps Included", "Model-Agnostic"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 ring-1 ring-gray-200 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280]">
                    <CheckCircle size={12} className="text-[#0048ff]" />{t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating card */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-[310px] rounded-lg border border-gray-100 bg-white p-6"
                style={{ boxShadow: "0 18px 55px rgba(15,28,63,0.08)" }}>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-5">AI Delivery Path</p>
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#0048ff]/15" />
                  {[
                    { week: "Week 1–2", label: "Discovery & architecture design", done: true },
                    { week: "Week 2–8", label: "AI proof of value pilot", done: true },
                    { week: "Week 8–16", label: "Production AI MVP build", done: false },
                    { week: "Week 16+", label: "Scale, optimize & MLOps", done: false },
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
                  <span className="text-[10px] text-gray-400">Full AI MVP scope</span>
                  <span className="text-xs font-bold text-[#0048ff]">~90 days</span>
                </div>
                <ContactButton className="mt-3 flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                  Book discovery call <ArrowRight size={12} />
                </ContactButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ CLIENT MARQUEE ══ */}
        <section className="bg-white border-y border-gray-100 py-10 overflow-hidden">
          <div className="max-w-[1350px] mx-auto mb-6">
            <Reveal className="text-center">
              <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest">Our Clients</p>
            </Reveal>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right,#fff,transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left,#fff,transparent)" }} />
            <div className="flex gap-16 items-center" style={{ animation: "marquee 26s linear infinite", width: "max-content" }}>
              {[...clients, ...clients, ...clients].map((name, i) => (
                <span key={i} className="flex-shrink-0 text-sm font-bold uppercase tracking-widest text-gray-200 select-none">{name}</span>
              ))}
            </div>
          </div>
          <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
        </section>

        {/* ══ STATS ══ */}
        <section className="bg-[#f5f8ff] border-b border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">The business impact of AI adoption today</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                The numbers behind AI adoption
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Organizations that move from AI experimentation to production consistently outperform those still running on manual processes.
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

        {/* ══ SERVICES SLIDER ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Services</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                AI capabilities that ship, scale, and deliver measurable ROI
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Ten integrated AI capabilities covering strategy through to operations — everything needed to take an AI idea to production.
              </p>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-row lg:flex-col gap-2 lg:w-80 flex-shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {services.map(({ icon: Icon, title }, i) => (
                  <button key={i} onClick={() => setActiveService(i)}
                    className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap lg:whitespace-normal transition-all cursor-pointer border-none ${activeService === i
                      ? "bg-[#0048ff] text-white shadow-md"
                      : "bg-[#f5f8ff] text-[#6b7280] hover:bg-gray-100"}`}>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${activeService === i ? "bg-white/20" : "bg-white border border-gray-200"}`}>
                      <Icon size={14} className={activeService === i ? "text-white" : "text-[#0048ff]"} />
                    </span>
                    <span className="leading-snug">{title}</span>
                  </button>
                ))}
              </div>

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div key={activeService}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="bg-[#f5f8ff] rounded-2xl border border-gray-100 p-5 sm:p-8 lg:p-10 min-h-[280px]">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
                        {(() => { const Icon = services[activeService].icon; return <Icon size={24} className="text-[#0048ff]" />; })()}
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff] mb-1 block">AI Software Development</span>
                        <h3 className="text-2xl font-semibold text-[#0f1c3f] leading-tight">{services[activeService].title}</h3>
                      </div>
                    </div>
                    <p className="text-base text-[#6b7280] leading-relaxed mb-8">{services[activeService].desc}</p>
                    <div className="flex gap-3 items-center">
                      <button onClick={() => setActiveService((p) => Math.max(0, p - 1))} disabled={activeService === 0}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#0048ff] hover:text-[#0048ff] transition-colors cursor-pointer bg-white">
                        <ChevronLeft size={16} />
                      </button>
                      <button onClick={() => setActiveService((p) => Math.min(services.length - 1, p + 1))} disabled={activeService === services.length - 1}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#0048ff] hover:text-[#0048ff] transition-colors cursor-pointer bg-white">
                        <ChevronRight size={16} />
                      </button>
                      <span className="text-xs text-[#6b7280] ml-1">{activeService + 1} / {services.length}</span>
                      <ContactButton className="ml-auto inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0035cc] transition-colors btn-shimmer">
                        Scope this service <ArrowRight size={14} />
                      </ContactButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PROCESS — STICKY SECTION TABS (21st.dev pattern) ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 mb-16">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Process</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                How we turn AI ideas into production-ready software
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Three phases — scroll through each to see what we build, validate, and deliver at every stage.
              </p>
            </Reveal>
          </div>

          <StickySectionTabs phases={processPhases} />
        </section>

        {/* ══ OUTCOMES ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Accelerate your AI transformation with tailored solutions
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                From custom AI solutions and ML models to seamless integration and automation — we deliver systems that optimize workflows, enhance decision-making, and drive measurable business value.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {outcomes.map(({ icon: Icon, title, desc }, i) => (
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

      

        {/* ══ FAQ ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-10 sm:gap-16">
              <Reveal className="lg:w-80 flex-shrink-0">
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">FAQ</p>
                <h2 className="text-4xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                  Frequently asked questions
                </h2>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
                  Everything you need to know before starting an AI software engagement with us.
                </p>
                <ContactButton className="inline-flex items-center gap-2 text-sm font-semibold text-[#0048ff] hover:underline">
                  Ask us anything <ArrowRight size={14} />
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
        <section className="bg-[#f5f8ff] border-t border-gray-100 py-16 sm:py-20">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 text-center">
            <Reveal>
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-4">Get Started</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] tracking-tight mb-4">
                Ready to build AI that actually works?
              </h2>
              <p className="text-base text-[#6b7280] max-w-xl mx-auto leading-relaxed mb-8">
                Tell us what you&apos;re trying to solve and we&apos;ll scope an AI engagement that takes you from discovery to production with a clear, decision-ready path at every stage.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#0035cc] transition-colors">
                  Start a discovery call <ArrowRight size={15} />
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
