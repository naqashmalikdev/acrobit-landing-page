"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronDown, ChevronRight,
  GitMerge, Cpu, RefreshCw, Database, Workflow,
  BarChart3, ShieldCheck, Zap, TrendingUp, Clock,
  DollarSign, Users, Settings, FileText,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactButton from "@/app/components/ContactButton";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Reveal ─── */
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

/* ─── Counter ─── */
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

/* ─── FAQ ─── */
function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-t border-gray-200 last:border-b">
      <button onClick={onClick} className="w-full flex items-center justify-between py-4 sm:py-5 text-left gap-4 cursor-pointer bg-transparent border-none">
        <span className="text-sm sm:text-[15px] font-semibold leading-snug text-[#0f1c3f]">{q}</span>
        <ChevronDown size={17} className="flex-shrink-0 text-[#6b7280] transition-transform duration-250"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      <div style={{ maxHeight: isOpen ? 400 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <p className="pb-5 sm:pb-6 text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ─── data ─── */
const kpis = [
  { value: "70%", label: "Reduction in manual processing time", source: "Industry Research" },
  { value: "50%", label: "Typical operational cost reduction", source: "Enterprise Automation Study" },
  { value: "3×", label: "Faster end-to-end process cycle times", source: "Technology Research" },
  { value: "99.9%", label: "Process accuracy vs ~96% manual", source: "Automation Benchmarks" },
];

const services = [
  {
    icon: BarChart3, title: "Process Discovery & Mining",
    tag: "Foundation",
    desc: "Map your process landscape in detail using AI-powered mining tools. Surface bottlenecks, redundant steps, and high-ROI automation targets with data-driven evidence — before a single bot is commissioned.",
    points: ["Process flow mapping", "Cycle time analysis", "Automation ROI scoring", "Bottleneck identification"],
  },
  {
    icon: Cpu, title: "Robotic Process Automation (RPA)",
    tag: "Core",
    desc: "Run software robots across any application layer — ERPs, CRMs, legacy platforms, and web portals — executing rule-based tasks with precision and without touching your existing infrastructure.",
    points: ["Attended & unattended bots", "Cross-application automation", "Exception handling", "Audit trail & compliance"],
  },
  {
    icon: Workflow, title: "Workflow Orchestration",
    tag: "Integration",
    desc: "Break down silos between departments by wiring your systems together with event-driven orchestration engines that route tasks, transform data, and keep every process synchronised in real time.",
    points: ["API-first architecture", "Event-driven triggers", "Human-in-the-loop approvals", "Multi-system coordination"],
  },
  {
    icon: GitMerge, title: "AI-Augmented Automation",
    tag: "Advanced",
    desc: "Layer AI on top of your RPA foundation — using NLP to read documents, computer vision to extract data, and LLMs to make context-aware decisions — bringing automation to complex, unstructured processes.",
    points: ["Document AI & OCR", "Intelligent classification", "Predictive decisioning", "Conversational triggers"],
  },
  {
    icon: Database, title: "Integration & iPaaS",
    tag: "Connectivity",
    desc: "End data fragmentation by weaving your entire application stack together through reliable integration middleware, real-time data pipelines, and bidirectional API management built for scale.",
    points: ["REST/GraphQL connectors", "ETL/ELT pipelines", "Webhook management", "Data transformation"],
  },
  {
    icon: RefreshCw, title: "Hyperautomation Strategy",
    tag: "Enterprise",
    desc: "Build a company-wide automation programme that unifies RPA, AI, process mining, and low-code tooling into a single, governed hyperautomation initiative with clear milestones and measurable outcomes.",
    points: ["Centre of Excellence design", "Automation governance", "Change management", "Scalability planning"],
  },
];

const steps = [
  {
    num: "01", title: "Process Assessment", tag: "1–2 Weeks",
    desc: "We examine your existing workflows using process mining tooling and direct stakeholder interviews, producing a ranked list of automation candidates sorted by business value, technical feasibility, and delivery risk.",
    deliverables: ["Process inventory", "Automation opportunity map", "ROI prioritisation matrix"],
  },
  {
    num: "02", title: "Solution Architecture", tag: "1–2 Weeks",
    desc: "Our automation architects draft the full technical blueprint — selecting the right platforms, mapping integration patterns, and defining the governance and security standards that will govern every bot we build.",
    deliverables: ["Architecture blueprint", "Tool selection rationale", "Security & compliance plan"],
  },
  {
    num: "03", title: "Build & Test", tag: "2–6 Weeks",
    desc: "We develop automation workflows in sandboxed environments, running exception handling validation, load tests, and user acceptance cycles before anything approaches a production environment.",
    deliverables: ["Automation workflows", "Test results", "Exception handling playbook"],
  },
  {
    num: "04", title: "Deploy & Operate", tag: "Ongoing",
    desc: "We push to production with monitoring, alerting, and SLA tracking already active. Post-launch hypercare support is included, and we keep optimising based on real operational data as it accumulates.",
    deliverables: ["Live deployment", "Monitoring dashboards", "Operational runbooks"],
  },
];

const departments = [
  {
    dept: "Finance & Accounting", icon: DollarSign,
    cases: [
      "Accounts payable & invoice processing automation",
      "Bank reconciliation & period-close acceleration",
      "Expense report review and approval workflows",
      "Automated financial reporting and regulatory filing",
      "Fraud detection and anomaly alerting",
    ],
  },
  {
    dept: "Human Resources", icon: Users,
    cases: [
      "Employee onboarding document processing",
      "Payroll data validation and exception handling",
      "Leave and time-off request approvals",
      "Recruitment pipeline and applicant tracking",
      "Performance review cycle coordination",
    ],
  },
  {
    dept: "Operations", icon: Settings,
    cases: [
      "Supply chain order management automation",
      "Inventory reorder and stock level monitoring",
      "Vendor communication and PO processing",
      "Quality control report generation",
      "Logistics tracking and status notifications",
    ],
  },
  {
    dept: "Customer Service", icon: Zap,
    cases: [
      "Automated ticket routing and classification",
      "SLA monitoring and escalation triggers",
      "CRM data entry and enrichment automation",
      "Refund and returns processing workflows",
      "Customer communication personalisation",
    ],
  },
  {
    dept: "IT & Security", icon: ShieldCheck,
    cases: [
      "User provisioning and access management",
      "Security alert triage and incident response",
      "Patch management and compliance reporting",
      "Backup verification and DR testing",
      "Software licence auditing and renewal",
    ],
  },
  {
    dept: "Legal & Compliance", icon: FileText,
    cases: [
      "Contract review and clause extraction",
      "Regulatory change monitoring and alerts",
      "Due diligence document collection",
      "Audit preparation and evidence gathering",
      "Policy update distribution and sign-off tracking",
    ],
  },
];

const techStack = [
  { category: "RPA Platforms", tools: ["UiPath", "Automation Anywhere", "Power Automate", "Blue Prism"] },
  { category: "Workflow Orchestration", tools: ["n8n", "Make (Integromat)", "Zapier", "Apache Airflow"] },
  { category: "Integration / iPaaS", tools: ["MuleSoft", "Boomi", "Azure Logic Apps", "Workato"] },
  { category: "Process Mining", tools: ["Celonis", "UiPath Process Mining", "Power Automate Process Advisor"] },
  { category: "AI / ML Layer", tools: ["OpenAI GPT-4o", "Azure AI Document Intelligence", "Google Document AI", "AWS Textract"] },
];

const results = [
  { metric: "40–70%", label: "Reduction in process time", icon: Clock },
  { metric: "50–80%", label: "Cost savings on automated tasks", icon: DollarSign },
  { metric: "99.9%", label: "Process accuracy rate", icon: CheckCircle },
  { metric: "6–18 mo", label: "Average ROI payback period", icon: TrendingUp },
];

const faqs = [
  { q: "What makes intelligent automation different from standard RPA?", a: "Standard RPA executes fixed, rule-based tasks on structured data. Intelligent automation extends that foundation with AI — adding NLP to interpret documents, machine learning to make probabilistic decisions, and computer vision to handle image-based inputs. The result is automation that can tackle complex, unstructured workflows where rule-based bots fall short." },
  { q: "What types of processes are the strongest candidates for automation?", a: "Look for high-volume processes with predictable inputs and outputs, workflows that require moving data between systems by hand, repetitive document-handling tasks, and processes governed by approval chains. Our process assessment surfaces your highest-ROI targets first so the early wins are visible quickly." },
  { q: "How long does it typically take to get an automation live?", a: "A straightforward RPA bot can be in production within 2–4 weeks. AI-enhanced workflows with more complex decision logic take 6–10 weeks. Enterprise hyperautomation programmes are delivered in phased tranches over 3–6 months. We sequence the roadmap so you see demonstrated value early, not just at the finish line." },
  { q: "Will this require changes to our existing systems?", a: "No changes to your systems are needed. Our automation solutions run on top of your existing applications — ERPs, CRMs, legacy platforms, and web-based tools — by interacting with interfaces the same way a user would, or through API connections where they exist." },
  { q: "How are exceptions and unexpected errors handled in production?", a: "Every automation we deliver includes layered exception handling: defined business rules for known failure types, escalation routes for unrecognised errors, and human review checkpoints for decisions that carry high risk. All exceptions are logged, triaged, and fed back into the system to improve handling over time." },
  { q: "What ROI should we expect, and how quickly?", a: "Clients we work with typically achieve 40–70% reductions in processing time and 50–80% cost savings on the tasks we automate, with ROI payback arriving within 6–18 months. We build a validated ROI model during the assessment phase so you have concrete, realistic projections before any implementation begins." },
  { q: "Can you help us develop an internal automation capability over time?", a: "Yes. Many clients pair the initial delivery with a structured capability-building programme. We provide training, governance frameworks, operational playbooks, and ongoing mentoring to help your team take ownership of automation development and day-to-day operations as confidence grows." },
  { q: "How do you handle compliance and auditability requirements?", a: "Every automation ships with a full, tamper-evident audit trail recording who triggered it, which actions were executed, what data was processed, and what decisions were reached. All implementations are designed to satisfy SOC 2, GDPR, HIPAA, and applicable industry-specific requirements from the outset." },
];

export default function IntelligentAutomationPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeDept, setActiveDept] = useState(0);

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ══ */}
        <section className="isolate relative min-h-[80vh] sm:min-h-[92vh] flex flex-col justify-center bg-white border-b border-gray-200">
          <div className="h-px bg-gray-200 w-full absolute top-0" />
          <div className="absolute right-0 top-28 hidden lg:block h-[58%] w-px bg-gray-200" />

          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-14 sm:pb-20 w-full">
            <div ref={heroRef} className="max-w-4xl">

              <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE }} className="inline-flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#0048ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" />
                  Intelligent Automation
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 32 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-5">
                Eliminate manual work.<br />
                <span className="text-[#0048ff]">Operate at scale.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-base sm:text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-8">
                We combine AI, RPA, and workflow orchestration to strip out repetitive manual effort, cut error rates, and give your team back the time they need for work that actually requires human judgment.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }} className="flex flex-wrap items-center gap-4 mb-10">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
                  Start Your Automation Assessment <ArrowRight size={15} />
                </ContactButton>
                <ContactButton className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all">
                  See Automation ROI Calculator <ChevronRight size={15} />
                </ContactButton>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-3">
                {["SOC 2 & GDPR Compliant", "No System Changes Required", "12-Month Support Warranty", "Senior Automation Engineers"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 ring-1 ring-gray-200 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280]">
                    <CheckCircle size={12} className="text-[#0048ff]" />{t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating process card */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-[320px] rounded-lg border border-gray-100 bg-white p-6"
                style={{ boxShadow: "0 18px 55px rgba(15,28,63,0.08)" }}>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Automation Impact</p>
                {[
                  { process: "Invoice Processing", before: "4.5 hrs", after: "8 min", saving: "97%" },
                  { process: "Employee Onboarding", before: "3 days", after: "45 min", saving: "94%" },
                  { process: "Report Generation", before: "2 hrs", after: "30 sec", saving: "99%" },
                  { process: "Data Reconciliation", before: "6 hrs", after: "12 min", saving: "97%" },
                ].map(({ process, before, after, saving }) => (
                  <div key={process} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-[#0f1c3f] truncate">{process}</p>
                      <p className="text-[10px] text-gray-400">{before} → {after}</p>
                    </div>
                    <span className="text-xs font-bold text-green-600 flex-shrink-0">{saving}</span>
                  </div>
                ))}
                <ContactButton className="mt-4 flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                  Calculate your savings <ArrowRight size={12} />
                </ContactButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ KPI STATS ══ */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 border-y border-gray-200">
              {kpis.map(({ value, label, source }, i) => (
                <Reveal key={value} delay={i * 0.07}
                  className={`p-5 sm:p-7 ${i < 3 ? "border-r border-gray-200" : ""}`}>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0f1c3f] mb-1">
                    <Counter target={value} />
                  </p>
                  <p className="text-xs text-[#6b7280] leading-relaxed mb-1">{label}</p>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">Source: {source}</span>
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
                End-to-end automation services
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                From identifying automation opportunities to deploying enterprise-scale hyperautomation — we deliver measurable efficiency at every stage.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {services.map(({ icon: Icon, title, tag, desc, points }, i) => (
                <Reveal key={title} delay={i * 0.06}>
                  <div className="group grid grid-cols-1 md:grid-cols-[120px_1fr_160px] items-start border-b border-gray-200 py-6 gap-4 transition-all duration-200 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff] cursor-default">
                    <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                      <span className="font-mono text-[11px] text-gray-400 tabular-nums">0{i + 1}</span>
                      <Icon size={16} className="text-[#0048ff] transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#0f1c3f] mb-2">{title}</h3>
                      <p className="text-sm text-[#6b7280] leading-relaxed mb-3">{desc}</p>
                      <ul className="flex flex-wrap gap-2">
                        {points.map((p) => (
                          <li key={p} className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                            <span className="w-1 h-1 rounded-full bg-[#0048ff] flex-shrink-0" />{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:text-right">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-[#6b7280]">{tag}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ RESULTS STRIP ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-gray-200">
              {results.map(({ metric, label, icon: Icon }, i) => (
                <Reveal key={label} delay={i * 0.08}
                  className={`p-5 sm:p-7 flex flex-col gap-2 ${i < 3 ? "border-r border-gray-200" : ""}`}>
                  <Icon size={16} className="text-[#0048ff]" />
                  <p className="text-2xl md:text-3xl font-medium text-[#0f1c3f]">{metric}</p>
                  <p className="text-[11px] uppercase tracking-widest text-[#6b7280]">{label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Delivery Method</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                How we deliver automation
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                A structured 4-phase methodology that goes from process discovery to live deployment — with clear milestones and zero surprises.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {steps.map(({ num, title, tag, desc, deliverables }, i) => (
                <Reveal key={num} delay={i * 0.08}>
                  <div className="group grid grid-cols-1 md:grid-cols-[110px_1fr_260px] items-start border-b border-gray-200 py-6 gap-4 transition-all duration-200 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff] cursor-default">
                    <div>
                      <span className="font-mono text-[11px] text-gray-400 tabular-nums">{num}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#0f1c3f] mb-2">{title}</h3>
                      <p className="text-sm text-[#6b7280] leading-relaxed mb-3">{desc}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff] mb-1">{tag}</span>
                      {deliverables.map((d) => (
                        <span key={d} className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                          <span className="w-1 h-1 rounded-full bg-[#0048ff] flex-shrink-0" />{d}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ USE CASES BY DEPARTMENT ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-12">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Departmental Use Cases</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Automation across every department
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed max-w-2xl">
                Intelligent automation isn&apos;t limited to one team. We&apos;ve deployed automation solutions across finance, HR, operations, customer service, IT, and legal — with measurable impact in each.
              </p>
            </Reveal>

            <div className="flex gap-8 flex-col lg:flex-row">
              {/* Department tabs */}
              <div className="flex flex-row lg:flex-col gap-2 lg:w-64 flex-shrink-0 overflow-x-auto lg:overflow-x-visible">
                {departments.map(({ dept, icon: Icon }, i) => (
                  <button key={dept} onClick={() => setActiveDept(i)}
                    className={`flex items-center gap-2.5 text-left px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer border ${
                      activeDept === i
                        ? "bg-[#0048ff] text-white border-[#0048ff] shadow-[0_16px_36px_rgba(0,72,255,0.22)] -translate-y-0.5"
                        : "bg-white/80 text-[#6b7280] border-gray-200 hover:text-[#0f1c3f]"
                    }`}>
                    <Icon size={15} className={activeDept === i ? "text-white" : "text-[#0048ff]"} />
                    {dept}
                  </button>
                ))}
              </div>

              {/* Use case panel */}
              <div className="flex-1 rounded-lg border border-gray-100 bg-white p-5 sm:p-8"
                style={{ boxShadow: "0 12px_34px rgba(15,28,63,0.05)" }}>
                <div className="flex items-center gap-3 mb-6">
                  {(() => { const DeptIcon = departments[activeDept].icon; return <div className="w-10 h-10 rounded-lg bg-[#f5f8ff] flex items-center justify-center"><DeptIcon size={18} className="text-[#0048ff]" /></div>; })()}
                  <p className="text-base font-semibold text-[#0f1c3f]">{departments[activeDept].dept}</p>
                </div>
                <ul className="border-t border-gray-200">
                  {departments[activeDept].cases.map((uc, j) => (
                    <motion.li key={uc} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: j * 0.05 }}
                      className="flex items-start gap-3 border-b border-gray-100 py-3">
                      <div className="w-5 h-5 rounded-md bg-[#f5f8ff] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0048ff]" />
                      </div>
                      <span className="text-sm text-[#0f1c3f] font-medium">{uc}</span>
                    </motion.li>
                  ))}
                </ul>
                <ContactButton className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0048ff] hover:underline">
                  Automate {departments[activeDept].dept} workflows <ArrowRight size={12} />
                </ContactButton>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TECH STACK ══ */}
        <section className="bg-white py-12 sm:py-20 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-12">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Technology</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] mb-4">
                Platform-agnostic automation stack
              </h2>
              <p className="text-base text-[#6b7280] max-w-xl leading-relaxed">
                We work with all major automation platforms and select the right tool for your environment — not the one we have a partnership incentive to sell.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {techStack.map(({ category, tools }, i) => (
                <Reveal key={category} delay={i * 0.06}>
                  <div className="group grid grid-cols-1 md:grid-cols-[200px_1fr] items-start border-b border-gray-200 py-5 gap-4 transition-all duration-200 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff] cursor-default">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#0048ff]">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {tools.map((t) => (
                        <span key={t} className="text-xs font-medium text-[#0f1c3f] bg-[#f5f8ff] border border-gray-100 px-3 py-1.5 rounded-md hover:border-[#0048ff]/30 hover:text-[#0048ff] transition-colors">{t}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.3}>
                <div className="group grid grid-cols-1 md:grid-cols-[200px_1fr] items-start border-b border-gray-200 py-5 gap-4 transition-all duration-200 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff] cursor-default">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#0048ff]">Compliance & Security</p>
                  <div className="flex flex-wrap gap-2">
                    {["SOC 2 Type II", "GDPR", "HIPAA", "ISO 27001", "PCI DSS", "EU AI Act", "NIST AI RMF", "FedRAMP"].map((c) => (
                      <span key={c} className="text-xs font-medium text-[#0f1c3f] bg-[#f5f8ff] border border-gray-100 px-3 py-1.5 rounded-md">{c}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="bg-[#f5f8ff] border-t border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 sm:gap-16 items-start">
              <Reveal>
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">FAQ</p>
                <h2 className="text-3xl md:text-4xl font-medium text-[#0f1c3f] leading-tight mb-4">
                  Common questions about intelligent automation
                </h2>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
                  Answers to the questions we hear most from operations, IT, and finance leaders.
                </p>
                <ContactButton className="inline-flex items-center gap-2 bg-[#0048ff] text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 transition-all">
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
        <section className="bg-[#f5f8ff] border-t border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="rounded-lg border border-gray-100 bg-white p-8 sm:p-12 lg:p-16"
              style={{ boxShadow: "0 12px 34px rgba(15,28,63,0.05)" }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <Reveal>
                  <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-4">Ready to automate?</p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-5">
                    Reclaim 70% of your team&apos;s manual effort within 90 days
                  </h2>
                  <p className="text-base text-[#6b7280] mb-8 leading-relaxed">
                    Start with a free process assessment. We identify your highest-value automation targets, build a business case with validated savings projections, and get your first bot into production within weeks.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-7 py-3.5 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 transition-all">
                      Start Free Assessment <ArrowRight size={15} />
                    </ContactButton>
                    <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-7 py-3.5 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] transition-all no-underline">
                      See Automation Results
                    </Link>
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="rounded-lg bg-[#f5f8ff] border border-gray-100 p-8">
                    <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-5">What you get from day one</p>
                    <ul className="border-t border-gray-200">
                      {[
                        "Free process assessment & automation opportunity map",
                        "ROI model with validated time and cost savings",
                        "Technical architecture & platform recommendation",
                        "First automation bot live within 2–4 weeks",
                        "Full audit trail & compliance documentation",
                        "12-month warranty on all delivered automations",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 border-b border-gray-100 py-3">
                          <CheckCircle size={14} className="text-[#0048ff] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#0f1c3f]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
