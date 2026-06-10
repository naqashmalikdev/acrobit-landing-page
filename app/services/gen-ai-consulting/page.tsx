"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight,
  Lightbulb, Map, BarChart3, ShieldCheck, FlaskConical,
  Rocket, TrendingUp,
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
    let s = 0; const inc = num / 87;
    const t = setInterval(() => { s += inc; if (s >= num) { setVal(target); clearInterval(t); } else setVal(Math.floor(s) + suffix); }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{val}</span>;
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

const challenges = [
  { pct: "70%", label: "of AI failures trace back to people and process gaps, not the technology itself", source: "Industry Research" },
  { pct: "75%", label: "of organisations report a critical shortage of in-house AI expertise", source: "Enterprise AI Survey" },
  { pct: "74%", label: "of businesses find it difficult to achieve and sustain measurable value from AI", source: "Global AI Adoption Study" },
];

const services = [
  { icon: Lightbulb, title: "AI Workshop", tag: "1 Day", desc: "An intensive strategy session designed for decision-makers. Surface the highest-impact opportunities in your business, gauge your current readiness, and leave with a concrete adoption roadmap.", deliverables: ["Readiness report", "Use-case map", "Prioritized roadmap"] },
  { icon: Map, title: "AI Strategy & Readiness Assessment", tag: "2 Weeks", desc: "Examine your organisation's data maturity, existing infrastructure, and governance posture to pinpoint where GenAI can generate real, measurable business outcomes.", deliverables: ["Maturity scorecard", "Gap analysis", "Strategic roadmap"] },
  { icon: BarChart3, title: "Use Case Discovery & ROI Modelling", tag: "2 Weeks", desc: "Surface and rank GenAI opportunities that align with your strategic priorities. We attach ROI projections, technical feasibility scores, and implementation sequencing to each one.", deliverables: ["Use-case backlog", "ROI model", "Feasibility matrix"] },
  { icon: ShieldCheck, title: "Governance & Responsible AI Advisory", tag: "Ongoing", desc: "Build confidence in your GenAI programme with governance frameworks that align to NIST AI RMF, ISO 27001, and the EU AI Act — keeping your use of AI ethical, secure, and audit-ready.", deliverables: ["AI policy templates", "Risk framework", "Compliance checklist"] },
  { icon: FlaskConical, title: "Pilot & Proof-of-Concept Advisory", tag: "4–6 Weeks", desc: "Move your GenAI strategy off the whiteboard with structured pilot design, measurable success criteria, and hands-on validation before committing to a wider rollout.", deliverables: ["Interactive demo", "Performance metrics", "Go/No-Go report"] },
];

const valueProps = [
  { icon: Rocket, title: "Accelerated time to value", desc: "Go from initial concept to a working prototype in weeks, not quarters, using battle-tested GenAI delivery frameworks." },
  { icon: TrendingUp, title: "Outcomes you can measure", desc: "Tie every AI investment to a concrete business result — productivity gains, cost reductions, or revenue impact — with clear before-and-after benchmarks." },
  { icon: ShieldCheck, title: "Responsible by design", desc: "Build GenAI systems that are transparent and compliant from the ground up, aligned to NIST AI RMF, ISO 27001, and EU AI Act requirements." },
  { icon: CheckCircle, title: "Safety built in", desc: "Deliver AI that stays within defined boundaries — with policy-aligned behaviour, misuse prevention, and output accuracy you can rely on in production." },
];

const phases = [
  {
    num: "01", phase: "Discover", title: "AI Workshop", duration: "1 Day",
    desc: "A hands-on session built for decision-makers who want clarity before committing. In a single day we surface the highest-value AI opportunities, take stock of your readiness, and sketch out an adoption path.",
    deliverables: ["Readiness report", "Use-case map", "Prioritized roadmap"],
  },
  {
    num: "01b", phase: "Discover", title: "Discovery & Design", duration: "2 Weeks",
    desc: "Translate strategy into a concrete implementation blueprint. We define your architecture, data approach, and governance posture — and stress-test ROI assumptions before any building begins.",
    deliverables: ["Use-case backlog", "ROI model", "Solution blueprint"],
  },
  {
    num: "02", phase: "Pilot", title: "AI Proof of Value", duration: "4–6 Weeks",
    desc: "Put your GenAI concept to the test with a focused pilot — a RAG-powered assistant or an intelligent workflow agent. We lock in success criteria upfront and validate performance before recommending expansion.",
    deliverables: ["Interactive demo", "Performance metrics", "Compliance checklist"],
  },
  {
    num: "02b", phase: "Pilot", title: "90-Day AI MVP", duration: "6–10 Weeks",
    desc: "Ship a production-grade MVP complete with user authentication, structured logging, system monitoring, and human-in-the-loop controls — built to generate measurable signal from real users.",
    deliverables: ["Live MVP deployment", "SLOs", "Adoption plan", "Training resources"],
  },
  {
    num: "03", phase: "Transform & Scale", title: "Full-Scale GenAI Products", duration: "90 Days+",
    desc: "Graduate from pilot to platform. We build enterprise-grade GenAI products engineered for deep system integration, polished user experiences, continuous performance optimisation, and organisation-wide deployment.",
    deliverables: ["Multi-use-case rollout", "Performance reports", "Operational playbooks"],
  },
];

const industries = [
  { name: "Financial Services", useCases: ["Automated compliance reports", "Personalised client communications", "Synthetic datasets for risk modelling", "Market trend visual dashboards", "Conversational financial advisory"] },
  { name: "Healthcare", useCases: ["Clinical documentation automation", "Patient intake & triage bots", "Prior authorisation processing", "EHR data extraction & summarisation", "Drug interaction advisory agents"] },
  { name: "Retail & E-Commerce", useCases: ["Personalised product recommendations", "Dynamic pricing optimisation", "Customer support automation", "Inventory demand forecasting", "UGC content summarisation"] },
  { name: "Manufacturing", useCases: ["Predictive maintenance reporting", "Quality inspection AI", "Supplier contract analysis", "Safety incident report generation", "Production schedule optimisation"] },
  { name: "Marketing & Media", useCases: ["AI content creation pipelines", "Campaign performance analysis", "SEO-optimised copy generation", "Audience segmentation models", "Brand voice consistency agents"] },
  { name: "Legal Services", useCases: ["Contract review & redlining", "Legal research summarisation", "Due diligence automation", "Compliance monitoring agents", "Client intake document generation"] },
];

const llms = ["OpenAI GPT-4o", "Anthropic Claude", "Google Gemini", "DeepSeek", "Meta LLaMA", "Mistral"];
const frameworks = ["LangChain", "LangGraph", "CrewAI", "AutoGen", "RAG Pipelines", "Pinecone", "Weaviate", "Azure OpenAI"];

const faqs = [
  { q: "What does your Generative AI consulting workshop actually cover?", a: "It's a focused, one-day working session for leaders and decision-makers — not a presentation. We spend the day locating where GenAI can create tangible value in your organisation, taking an honest look at data, systems, and team readiness, and mapping out a practical adoption roadmap tied directly to business outcomes. You leave with ranked use cases, feasibility notes, and clear next actions." },
  { q: "How is this different from standard AI consulting?", a: "Most AI consulting ends with a strategy deck. Our approach starts with outcomes and works backwards. We pair focused workshops with rapid prototyping so you're looking at working AI capabilities within weeks — not waiting months for a report. Every engagement is scoped around what moves your business metrics, not what looks impressive on paper." },
  { q: "Who should be in the room for the GenAI workshop?", a: "The session is built for executives, heads of departments, product leads, and senior operations managers. Technical staff benefit from attending, but the content and facilitation are designed to be fully accessible to non-technical leaders who are ultimately making adoption decisions." },
  { q: "Does the engagement continue after the workshop?", a: "Yes — the workshop is the entry point. From there we offer complete lifecycle support covering strategy, readiness assessment, pilot development, production build, and continuous optimisation. A large portion of our clients choose to engage us across the entire journey from day one." },
  { q: "How do you find the GenAI use cases that will actually move the needle?", a: "We run a structured discovery process that cross-references AI capabilities with your specific business workflows, data landscape, and strategic objectives. Each opportunity is scored across ROI potential, technical achievability, and delivery risk — producing a ranked backlog you can act on immediately." },
  { q: "How quickly will we see tangible results?", a: "You walk out of the workshop with a concrete roadmap and a prioritised use-case list on day one. Progress to a pilot and you'll have a functional AI prototype within 4–6 weeks. A production-ready MVP typically follows within 6–10 weeks of the pilot completing." },
  { q: "Do we need existing AI expertise internally to get value from this?", a: "No. The majority of clients who come to us have minimal or no in-house AI capability. We take full ownership of the technical execution while progressively building your team's understanding through knowledge transfer and hands-on involvement throughout the engagement." },
  { q: "Which compliance and regulatory frameworks do you work within?", a: "We design AI systems to align with NIST AI RMF, ISO 27001, the EU AI Act, HIPAA, GDPR, SOC 2, and relevant industry-specific requirements. Audit logging, granular access controls, PII handling, and explainability outputs are included in every deployment as standard." },
];

const caseStudies = [
  { industry: "Agri-Tech", title: "AI-powered knowledge sharing agent for organic farming certification", metric: "50%", metricLabel: "Faster discovery" },
  { industry: "Software & IT", title: "Engineering the architecture behind intelligent content creation", metric: "3×", metricLabel: "Content velocity" },
  { industry: "Corporate Services", title: "AI assistant cutting customer response times in half", metric: "60%", metricLabel: "Faster responses" },
  { industry: "Agri Chemical", title: "GreenGro cuts support time with AI knowledge agent", metric: "2×", metricLabel: "Support efficiency" },
];

export default function GenAIConsultingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeIndustry, setActiveIndustry] = useState(0);

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
                  AI &amp; Data Innovation
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-5 sm:mb-7">
                Clarity on your AI strategy in a single day.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-base sm:text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-8 sm:mb-10">
                A 1-day GenAI workshop that surfaces your highest-value opportunities, takes stock of your readiness, and hands you a clear adoption roadmap with measurable ROI targets — before you commit a single pound to implementation.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3, ease: EASE }} className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#0035cc] hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)]">
                  Book a Free AI Workshop <ArrowRight size={15} />
                </ContactButton>
                <Link href="/customers" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] no-underline">
                  View AI Case Studies <ChevronRight size={15} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.45 }} className="flex flex-wrap items-center gap-4 sm:gap-6">
                {["NIST AI RMF Aligned", "EU AI Act Ready", "12-Month Warranty", "Senior AI Consultants Only"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280] ring-1 ring-gray-200">
                    <CheckCircle size={13} className="text-[#0048ff]" />{t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating workshop output card — xl only */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-[340px] rounded-lg border border-gray-100 bg-white p-6 text-[#0f1c3f] shadow-[0_18px_55px_rgba(15,28,63,0.08)]">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Workshop Output</p>
                {[
                  { label: "AI opportunities identified", value: "12–18" },
                  { label: "High-impact use cases", value: "3–5" },
                  { label: "Estimated ROI potential", value: "2–5×" },
                  { label: "Time to first working pilot", value: "4 weeks" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                    <span className="text-xs text-[#6b7280]">{label}</span>
                    <span className="text-sm font-bold text-[#0048ff]">{value}</span>
                  </div>
                ))}
                <ContactButton className="mt-4 flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                  Book your workshop <ArrowRight size={12} />
                </ContactButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ CHALLENGE STATS ══ */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div className="grid grid-cols-1 md:grid-cols-3 border-y border-gray-200">
              {challenges.map(({ pct, label, source }, i) => (
                <Reveal key={pct} delay={i * 0.08} className="bg-white p-5 sm:p-8 border-r border-gray-200 last:border-r-0 md:[&:nth-child(3)]:border-r-0">
                  <p className="text-4xl sm:text-5xl md:text-6xl font-medium text-[#0048ff] mb-3 leading-none">
                    <Counter target={pct} />
                  </p>
                  <p className="text-sm text-[#0f1c3f] leading-relaxed mb-2 max-w-xs">{label}</p>
                  <span className="text-[11px] uppercase tracking-widest text-[#6b7280]">Source: {source}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">What We Offer</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Unlock AI value with expert-led consulting
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                From initial strategy through to production deployment — every engagement is tied to measurable business outcomes.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {services.map(({ icon: Icon, title, tag, desc, deliverables }, i) => (
                <Reveal key={title} delay={i * 0.07} className="group grid grid-cols-1 md:grid-cols-[120px_1fr_160px] gap-4 md:gap-8 border-b border-gray-200 px-0 py-7 sm:py-9 transition-all duration-300 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff]">
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-gray-400 tabular-nums">0{i + 1}</span>
                    <Icon size={18} className="text-[#0048ff] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-[#0f1c3f] mb-3 group-hover:text-[#0048ff] transition-colors">{title}</h3>
                    <p className="text-sm sm:text-base text-[#6b7280] leading-relaxed max-w-3xl mb-4">{desc}</p>
                    <ul className="flex flex-col gap-1.5">
                      {deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-xs text-[#6b7280]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff] flex-shrink-0" />{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#6b7280] md:text-right">{tag}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ VALUE PROPS ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-12 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Why Acrobit</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Turn AI into measurable ROI
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Every engagement is scoped around what moves your business metrics, not what looks impressive on paper.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {valueProps.map(({ icon: Icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 0.07} className="group grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8 border-b border-gray-200 px-0 py-7 sm:py-9 transition-all duration-300 hover:bg-white hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff]">
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-gray-400 tabular-nums">0{i + 1}</span>
                    <Icon size={18} className="text-[#0048ff] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-[#0f1c3f] mb-3 group-hover:text-[#0048ff] transition-colors">{title}</h3>
                    <p className="text-sm sm:text-base text-[#6b7280] leading-relaxed max-w-3xl">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROCESS ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-12 sm:mb-16 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Our Approach</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Starting with a 1-day workshop
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                A structured 3-phase engagement from discovery to full-scale transformation.
              </p>
            </Reveal>

            {[
              { label: "01 — Discover", items: phases.filter(p => p.num.startsWith("01")) },
              { label: "02 — Pilot", items: phases.filter(p => p.num.startsWith("02")) },
              { label: "03 — Transform & Scale", items: phases.filter(p => p.num === "03") },
            ].map(({ label, items }, gi) => (
              <div key={label} className="mb-10">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#0048ff]">{label}</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="border-t border-gray-200">
                  {items.map(({ title, duration, desc, deliverables }, i) => (
                    <Reveal key={title} delay={gi * 0.1 + i * 0.07} className="group grid grid-cols-1 md:grid-cols-[110px_1fr_220px] gap-5 sm:gap-8 border-b border-gray-200 py-7 sm:py-9 px-0 transition-all duration-300 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff]">
                      <div className="flex-shrink-0">
                        <span className="block text-3xl sm:text-4xl font-medium leading-none text-[#0f1c3f]/15 transition-colors group-hover:text-[#0048ff]">
                          {title.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-[#0f1c3f] mb-3 group-hover:text-[#0048ff] transition-colors">{title}</h3>
                        <p className="text-sm text-[#6b7280] leading-relaxed mb-5">{desc}</p>
                      </div>
                      <div className="flex flex-col gap-2 md:pt-1">
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#6b7280] mb-1">{duration}</span>
                        {deliverables.map((d) => (
                          <div key={d} className="flex items-center gap-2 text-xs text-[#6b7280]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff] flex-shrink-0" />{d}
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ INDUSTRY USE CASES ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-12">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Industry Applications</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                GenAI use cases by industry
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed max-w-2xl">
                We&apos;ve identified and implemented GenAI solutions across every major vertical. Select your industry to explore relevant opportunities.
              </p>
            </Reveal>

            <div className="flex gap-6 sm:gap-8 flex-col lg:flex-row">
              <div className="flex flex-row lg:flex-col gap-2 lg:w-60 flex-shrink-0 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
                {industries.map(({ name }, i) => (
                  <button key={name} onClick={() => setActiveIndustry(i)}
                    className={`flex items-center gap-2.5 text-left px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer border ${activeIndustry === i ? "bg-[#0048ff] text-white border-[#0048ff] shadow-[0_16px_36px_rgba(0,72,255,0.22)] -translate-y-0.5" : "bg-white/80 text-[#6b7280] hover:-translate-y-0.5 hover:text-[#0f1c3f] hover:shadow-[0_12px_30px_rgba(15,28,63,0.08)] border-gray-200"}`}>
                    {name}
                  </button>
                ))}
              </div>

              <div className="flex-1 bg-white rounded-lg border border-gray-100 p-5 sm:p-8 shadow-[0_16px_45px_rgba(15,28,63,0.05)]">
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-5">{industries[activeIndustry].name} — Use cases we deploy</p>
                <ul className="space-y-2">
                  {industries[activeIndustry].useCases.map((uc, i) => (
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
                  Explore {industries[activeIndustry].name} use cases <ArrowRight size={12} />
                </ContactButton>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CASE STUDIES ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-12 flex items-end justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Proven Results</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight">
                  How we&apos;ve helped businesses succeed with AI
                </h2>
              </div>
              <Link href="/projects" className="text-sm font-semibold text-[#0048ff] no-underline hover:underline inline-flex items-center gap-1">
                All case studies <ArrowRight size={14} />
              </Link>
            </Reveal>

            <div className="border-t border-gray-200">
              {caseStudies.map(({ industry, title, metric, metricLabel }, i) => (
                <Reveal key={title} delay={i * 0.07} className="group grid grid-cols-1 md:grid-cols-[140px_1fr_100px] gap-5 sm:gap-8 border-b border-gray-200 py-7 sm:py-9 px-0 transition-all duration-300 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff] cursor-pointer">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0048ff]">{industry}</span>
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

        {/* ══ TECH / LLM STACK ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-14 sm:py-20 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-12 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Technology</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0f1c3f] mb-4">
                LLMs &amp; agent frameworks we work with
              </h2>
              <p className="text-sm text-[#6b7280] max-w-xl leading-relaxed">
                We combine best-in-class models and frameworks — always choosing the right tool for the job, not the trendy one.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Foundation Models</p>
              <div className="flex flex-wrap gap-2">
                {llms.map((m) => (
                  <span key={m} className="text-xs font-medium text-[#0f1c3f] bg-white border border-gray-200 px-3.5 py-2 rounded-md transition-all hover:-translate-y-0.5 hover:border-[#0048ff]/40 hover:text-[#0048ff] hover:shadow-[0_10px_24px_rgba(0,72,255,0.1)] cursor-default">{m}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Frameworks &amp; Vector Stores</p>
              <div className="flex flex-wrap gap-2">
                {frameworks.map((f) => (
                  <span key={f} className="text-xs font-medium text-[#0f1c3f] bg-white border border-gray-200 px-3.5 py-2 rounded-md transition-all hover:-translate-y-0.5 hover:border-[#0048ff]/40 hover:text-[#0048ff] hover:shadow-[0_10px_24px_rgba(0,72,255,0.1)] cursor-default">{f}</span>
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
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-4">Not sure where to start?</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-5 max-w-2xl mx-auto">
                  Get your AI strategy right from day one
                </h2>
                <p className="text-base text-[#6b7280] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                  Understand exactly where GenAI can create real, lasting value in your business — tailored to your industry, your data, and your specific goals.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#0035cc] hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)]">
                    Book a Free AI Workshop <ArrowRight size={15} />
                  </ContactButton>
                  <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] no-underline">
                    View AI Case Studies
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
