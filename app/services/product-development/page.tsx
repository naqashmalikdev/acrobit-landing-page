"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, ChevronLeft,
  Layers, Code2, Smartphone, Brain, ShieldCheck,
  Zap, TrendingUp, Package, GitBranch, BarChart3,
  Search, Rocket, Globe, Cpu,
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
            <p className="text-xs text-[#0f1c3f]/70 leading-relaxed mb-4">{ctaText ?? "Book a discovery call and we'll scope your product engagement end-to-end."}</p>
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

const stats = [
  { value: "2.5×", source: "Industry Research", desc: "greater revenue growth achieved by companies that modernize their operations with AI at the core of their product strategy." },
  { value: "60%", source: "Digital Transformation Study", desc: "of companies with a strong digital product foundation consistently report higher revenue outcomes than peers on legacy systems." },
  { value: "30%", source: "Global Tech Report", desc: "of total earnings at leading digital companies now flows directly from software products they've built and own." },
];

const services = [
  {
    icon: Search,
    title: "Product strategy & discovery",
    desc: "Shape your idea into a concrete, buildable plan. Through structured discovery we work through product goals, scope boundaries, technical feasibility, data flows, and architecture fundamentals. The result is a delivery roadmap where every feature is anchored to a real business outcome — so the team builds with shared direction from day one.",
  },
  {
    icon: Layers,
    title: "UX/UI design",
    desc: "Design interfaces that help people accomplish real work. We bring together user research, workflow analysis, and interaction logic to produce design systems, wireframes, and functional prototypes that hold up across web, mobile, and internal tooling — ready to support MVP delivery from the opening sprint.",
  },
  {
    icon: Globe,
    title: "Web application development",
    desc: "Deliver production-grade web applications on solid architectural foundations. We build SaaS platforms, internal dashboards, customer portals, and workflow tools with clean service layers, reliable integration support, and structural modularity that keeps long-term maintenance manageable.",
  },
  {
    icon: Smartphone,
    title: "Mobile application development",
    desc: "Ship mobile apps that perform under real usage conditions — fast load times, offline capability, device-level integrations, and consistent release cycles. We cover iOS, Android, and cross-platform targets with CI/CD and automated testing so updates roll out smoothly without disrupting what's already working.",
  },
  {
    icon: Package,
    title: "Enterprise application development",
    desc: "Build complex enterprise platforms that handle scale, compliance requirements, and multi-team usage without creating bottlenecks. We deliver microservices-based systems with fine-grained access controls, full audit trails, modern API layers, and architecture that flexes as requirements evolve.",
  },
  {
    icon: Brain,
    title: "AI and ML integration",
    desc: "Embed intelligent capabilities directly into your product architecture — not bolted on as an afterthought. We implement search, recommendations, in-app copilots, predictive features, and content automation using patterns that keep data governance sound and AI outputs explainable and auditable.",
  },
  {
    icon: ShieldCheck,
    title: "QA engineering & release automation",
    desc: "Go to production with confidence. Test suites, performance validation, and CI/CD pipelines are set up from the start — not the end. We cover functional, security, and regression testing across every release cycle so quality stays high as the product scales and release cadence increases.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery and solution design",
    color: false,
    desc: "Map out product goals, user workflows, system dependencies, and technical constraints through a structured kickoff. We dig into existing processes, data flows, integration needs, and what good looks like — then narrow down MVP scope so early delivery is focused and low-risk. When there is genuine uncertainty, we run short architectural spikes to test assumptions before any design or build work begins.",
    deliverables: ["Business canvas", "Functional backlog", "UI/UX design", "Technical architecture", "Delivery estimates"],
  },
  {
    num: "02",
    title: "Build the MVP",
    color: false,
    desc: "Develop your MVP in short, repeatable build cycles that keep delivery steady and predictable. Each cycle touches frontend, backend, mobile, QA, and integrations — all connected through CI/CD. Feature behavior is validated against how things actually run in the real environment, so issues surface early. Code quality is maintained through static checks, automated tests, and peer review throughout.",
    deliverables: ["Release build", "Release notes", "QA test results", "MVP release"],
  },
  {
    num: "03",
    title: "Integrate and validate end to end",
    color: false,
    desc: "Wire the MVP into your wider ecosystem — auth systems, internal tools, third-party services, and data sources. We run end-to-end tests across every integration point, check regression and performance under load, validate failure handling, and complete a security pass before any release. A full readiness review signs off deployment.",
    deliverables: ["Integration results", "Performance baseline", "QA reports", "Release checklist"],
  },
  {
    num: "04",
    title: "Launch and grow",
    color: true,
    desc: "Go live with monitoring, structured logging, and full observability already in place. Post-launch we track how users interact with the product, watch performance metrics, and respond to real error patterns — using all of it to plan the next improvements, refine the architecture, and keep the roadmap grounded in what actually matters.",
    deliverables: ["Deployment package", "Monitoring dashboards", "Launch summary", "Improvement roadmap"],
  },
];

const outcomes = [
  { icon: Zap, title: "Faster delivery, less overhead", desc: "Discovery, design, engineering, QA, and DevOps work together from the start — so momentum stays steady from proof of concept through to MVP, without handoff delays slowing you down." },
  { icon: ShieldCheck, title: "Risk caught before it becomes expensive", desc: "Technical and integration risks surface early through targeted proofs of concept. Problems get resolved at the design stage — not after they've already affected timelines or burned budget." },
  { icon: Layers, title: "Architecture designed for the long run", desc: "Every product is built on a modular, cloud-ready foundation that supports sustained reliability — whether you're shipping a focused web tool, a mobile product, or a full enterprise platform." },
  { icon: CheckCircle, title: "Engineering practices you can trust", desc: "Our teams follow standards aligned with SOC 2, ISO 27001, GDPR, and CCPA — with additional compliance coverage for healthcare and financial services where the product requires it." },
];


/* ── Tech stack tabs ── */
type TechItem = { name: string; img?: string; icon?: React.ElementType };

const techTabs: { label: string; items: TechItem[] }[] = [
  {
    label: "Frontend & Mobile",
    items: [
      { name: "React", img: "/icons/react.svg" },
      { name: "Angular", img: "/icons/angular.svg" },
      { name: "Vue.js", img: "/icons/vue.svg" },
      { name: "TypeScript", img: "/icons/typescript.svg" },
      { name: "Tailwind CSS", img: "/icons/tailwind.webp" },
      { name: "Redux", img: "/icons/redux.svg" },
      { name: "Flutter", img: "/icons/Flutter.svg" },
      { name: "Next.js", img: "/icons/next js.webp" },
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      { name: "Node.js", img: "/icons/node js.png" },
      { name: "FastAPI", img: "/icons/fast api.png" },
      { name: "Python", img: "/icons/python.svg" },
      { name: "Go", img: "/icons/go.svg" },
      { name: "Ruby on Rails", img: "/icons/ruby on rails.svg" },
      { name: "Bun", img: "/icons/bun.svg" },
      { name: "Socket.io", img: "/icons/Socket.io.png" },
      { name: "GitHub", img: "/icons/github.png" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", img: "/icons/aws.svg" },
      { name: "Azure", img: "/icons/azure.svg" },
      { name: "Docker", img: "/icons/Docker.svg" },
      { name: "Kubernetes", img: "/icons/Kubernetes.svg" },
      { name: "Terraform", img: "/icons/HashiCorp-Terraform.svg" },
      { name: "Jenkins", img: "/icons/jenkins.svg" },
      { name: "Vercel", img: "/icons/vercel.png" },
      { name: "GitHub Actions", img: "/icons/github.png" },
    ],
  },
  {
    label: "Data & AI",
    items: [
      { name: "PostgreSQL", img: "/icons/postgresql.webp" },
      { name: "MongoDB", img: "/icons/mongo.svg" },
      { name: "MySQL", img: "/icons/MySQL.svg" },
      { name: "Redis", img: "/icons/redis.svg" },
      { name: "Elasticsearch", img: "/icons/Elastic-Search.png" },
      { name: "Apache Kafka", img: "/icons/Apache-Kafka.png" },
      { name: "LangChain", img: "/icons/langchain.webp" },
      { name: "OpenAI", img: "/icons/open ai.webp" },
    ],
  },
];

const faqs = [
  {
    q: "What happens during discovery before any build work starts?",
    a: "We run a structured discovery session that covers your product goals, core user workflows, system dependencies, data flows, integration requirements, and any non-negotiable constraints. You leave with a functional backlog, an architecture blueprint, and a delivery estimate — so the build begins with the full team aligned on exactly what's being built and why.",
  },
  {
    q: "How long does it take to go from idea to a working MVP?",
    a: "For most engagements, MVP delivery takes between eight and sixteen weeks depending on scope complexity. Focused tools and single-workflow SaaS products can often reach MVP in six to eight weeks. We lock in the timeline during discovery so there are no surprises later in the build.",
  },
  {
    q: "Can you build web and mobile versions of the same product?",
    a: "Yes. We cover web products — SaaS platforms, portals, dashboards, internal enterprise tools — and mobile products across iOS, Android, React Native, and Flutter. When both are in scope, we typically run them in a single engagement to keep design, logic, and API contracts consistent.",
  },
  {
    q: "Can AI features be added to an existing product?",
    a: "Yes. We integrate intelligent search, recommendation engines, in-app copilots, content generation, and predictive capabilities directly into existing architectures. We use patterns that preserve data governance and keep AI behavior transparent and auditable — not just impressive in a demo.",
  },
  {
    q: "How do you handle QA and testing throughout the build?",
    a: "Testing runs alongside development — it is not added at the end. We write automated test suites, run regression checks after each build cycle, conduct security and performance testing, and complete a full readiness review before anything reaches production.",
  },
  {
    q: "What does post-launch support look like?",
    a: "Before launch we set up monitoring, structured logging, and full observability so you have immediate visibility the moment the product goes live. After launch we track user behavior, watch for performance degradation, and use real signals to prioritize what gets built next.",
  },
  {
    q: "Do you follow any compliance or regulatory standards?",
    a: "Yes. Our engineering practices are built around SOC 2, ISO 27001, GDPR, and CCPA by default. For products in healthcare or financial services we incorporate HIPAA or PCI DSS requirements as the scope demands.",
  },
  {
    q: "Who owns the code and IP when the engagement ends?",
    a: "You own everything outright. Full codebase and IP rights transfer to you on final payment. We hand over the complete repository, documentation, architecture notes, and run a dedicated technical handover session so your team — or any future team — can maintain and extend the product independently.",
  },
];

/* ── Product Dev Process phases for StickySectionTabs ── */
const productProcessPhases: ProcessPhase[] = [
  {
    number: "01",
    label: "Discovery",
    title: "Discovery and solution design",
    icon: Search,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <Search size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Week 1–2</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">Kickoff & architecture design</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            We map product goals, user workflows, system dependencies, and technical constraints through a structured kickoff. We dig into existing processes, data flows, integration needs, and what success looks like — then narrow MVP scope so early delivery is focused and low-risk. When uncertainty exists, we run architectural spikes to test assumptions before any build work begins.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Business canvas", "Functional backlog", "UI/UX design", "Technical architecture", "Delivery estimates"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#f5f8ff] rounded-2xl border border-gray-100 p-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-5">What we align on</p>
          <div className="space-y-4">
            {[
              { icon: Layers, label: "Architecture decisions", desc: "Modular, cloud-ready foundations that support long-term growth" },
              { icon: BarChart3, label: "MVP scope", desc: "Only features that prove value early — everything else deferred" },
              { icon: Zap, label: "Delivery plan", desc: "Realistic timelines with clear milestones and decision checkpoints" },
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
    label: "Build MVP",
    title: "MVP development and quality assurance",
    icon: Code2,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <Code2 size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Week 2–8</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">Iterative build cycles</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            We develop your MVP in short, repeatable build cycles. Each cycle covers frontend, backend, mobile, QA, and integrations — connected through CI/CD. Feature behaviour is validated against real workflows so issues surface early. Code quality is maintained through static checks, automated tests, and peer review throughout every sprint.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Release build", "Release notes", "QA test results", "MVP release"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#f5f8ff] rounded-2xl border border-gray-100 p-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-5">Built-in quality gates</p>
          <div className="space-y-4">
            {[
              { icon: ShieldCheck, label: "Automated testing", desc: "Unit, integration, and regression suites run on every commit" },
              { icon: GitBranch, label: "CI/CD pipeline", desc: "Continuous delivery from day one — no manual deployment steps" },
              { icon: TrendingUp, label: "Performance checks", desc: "Load and stress tests against defined baselines each cycle" },
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
    number: "03",
    label: "Integrate",
    title: "Integration and end-to-end validation",
    icon: GitBranch,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <GitBranch size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Week 8–12</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">System integration & validation</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            We wire the MVP into your wider ecosystem — auth systems, internal tools, third-party services, and data sources. End-to-end tests cover every integration point with regression, performance, failure handling, and a security pass before release. A full readiness review signs off on deployment confidence.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Integration results", "Performance baseline", "QA reports", "Release checklist"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#f5f8ff] rounded-2xl border border-gray-100 p-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-5">Integration focus areas</p>
          <div className="space-y-4">
            {[
              { icon: Globe, label: "Third-party services", desc: "APIs, payment gateways, analytics, and external data sources" },
              { icon: ShieldCheck, label: "Security review", desc: "Vulnerability scan and access control audit before go-live" },
              { icon: BarChart3, label: "Load testing", desc: "Performance validated under expected and peak concurrent usage" },
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
    number: "04",
    label: "Launch & Grow",
    title: "Launch, monitor, and continuously improve",
    icon: Rocket,
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0048ff] rounded-2xl border border-transparent p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Rocket size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-white/60">Week 12+</p>
              <h4 className="text-base font-semibold text-white">Launch & continuous improvement</h4>
            </div>
          </div>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            We go live with monitoring, structured logging, and full observability already configured. Post-launch we track how users interact with the product, watch performance metrics, and respond to real error patterns — using all of it to plan the next improvements, refine architecture, and keep the roadmap grounded in what actually matters.
          </p>
          <div className="border-t border-white/20 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Deployment package", "Monitoring dashboards", "Launch summary", "Improvement roadmap"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-white/15 text-white px-3 py-1.5 rounded-full">
                  <CheckCircle size={11} className="text-white/70" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { icon: TrendingUp, label: "Usage analytics", desc: "Real user behaviour signals guide every improvement cycle." },
            { icon: Zap, label: "Performance monitoring", desc: "Live dashboards track response times, errors, and infrastructure health." },
            { icon: Brain, label: "Roadmap evolution", desc: "Post-launch data shapes feature priorities and architectural decisions." },
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
export default function ProductDevelopmentPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeService, setActiveService] = useState(0);
  const [activeTech, setActiveTech] = useState(0);
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
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" /> Product Development
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-5">
                Build products that drive revenue
                <span className="block text-[#0048ff]">
                  and long-term growth
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-10">
                From discovery to architecture to MVP and beyond — we build web, mobile, and enterprise products engineered for performance, scale, integrations, and AI-powered capabilities.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="flex flex-wrap items-center gap-4 mb-10">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
                  Start a discovery call <ArrowRight size={15} />
                </ContactButton>
                <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all no-underline">
                  View our work <ChevronRight size={15} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-3">
                {["Fixed-Price Delivery", "Full IP Ownership", "12-Month Warranty", "ISO 27001 Certified"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 ring-1 ring-gray-200 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280]">
                    <CheckCircle size={12} className="text-[#0048ff]" />{t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating milestone card */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-[310px] rounded-lg border border-gray-100 bg-white p-6"
                style={{ boxShadow: "0 18px 55px rgba(15,28,63,0.08)" }}>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-5">Product Delivery Path</p>
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#0048ff]/15" />
                  {[
                    { week: "Week 1–2", label: "Discovery & architecture", done: true },
                    { week: "Week 2–8", label: "MVP build & QA", done: true },
                    { week: "Week 8–12", label: "Integration & validation", done: false },
                    { week: "Week 12+", label: "Launch & evolution", done: false },
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
                  <span className="text-[10px] text-gray-400">Typical MVP scope</span>
                  <span className="text-xs font-bold text-[#0048ff]">8–16 weeks</span>
                </div>
                <ContactButton className="mt-3 flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                  Book discovery call <ArrowRight size={12} />
                </ContactButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Stats</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                The business impact of modern digital products
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Organizations that invest in purpose-built digital products consistently outperform those running on legacy platforms and manual workflows.
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
                Build modern products that scale with your business
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Seven integrated capabilities that take a product from first idea through to a live, evolving platform.
              </p>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-4">
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
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff] mb-1 block">Product Development Services</span>
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

        {/* ══ PROCESS — STICKY SECTION TABS ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 mb-16">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Process</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Our approach to product development
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Four phases — scroll through each to see what we discover, build, integrate, and launch.
              </p>
            </Reveal>
          </div>
          <StickySectionTabs phases={productProcessPhases} ctaText="Book a discovery call and we'll scope your product engagement end-to-end." />
        </section>

        {/* ══ OUTCOMES ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                What you can achieve with Acrobit
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                How we help teams turn ideas into scalable, production-grade digital products.
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

        {/* ══ TECH STACK ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="text-center mb-12">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Tools & Technologies</p>
              <h2 className="text-3xl md:text-4xl font-medium text-[#0f1c3f] tracking-tight mb-4">
                A modern, full-stack technology foundation
              </h2>
              <p className="text-sm text-[#6b7280] max-w-xl mx-auto leading-relaxed">
                We select the right tools for each product — not the ones that are easiest for us to use.
              </p>
            </Reveal>

            {/* Tab bar */}
            <Reveal delay={0.05} className="flex justify-center gap-2 mb-10 flex-wrap">
              {techTabs.map(({ label }, i) => (
                <button key={i} onClick={() => setActiveTech(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer border-none ${activeTech === i
                    ? "bg-[#0048ff] text-white shadow-md"
                    : "bg-[#f5f8ff] text-[#6b7280] hover:bg-gray-100 border border-gray-200"}`}>
                  {label}
                </button>
              ))}
            </Reveal>

            {/* Logo grid */}
            <AnimatePresence mode="wait">
              <motion.div key={activeTech}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {techTabs[activeTech].items.map(({ name, img, icon: Icon }, i) => (
                  <motion.div key={name}
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="card-glow group flex flex-col items-center gap-3 bg-white rounded-2xl border border-gray-100 p-5 cursor-default">
                    <div className="w-14 h-14 rounded-xl bg-[#f5f8ff] flex items-center justify-center group-hover:bg-[#e8eeff] transition-colors duration-300 overflow-hidden">
                      {img ? (
                        <img src={img} alt={name} className="w-9 h-9 object-contain" />
                      ) : Icon ? (
                        <Icon size={26} className="text-[#0048ff]" />
                      ) : null}
                    </div>
                    <span className="text-[11px] font-semibold text-[#0f1c3f] text-center leading-tight">{name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
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
                  Everything you need to know before starting a product development engagement with us.
                </p>
                <ContactButton className="inline-flex items-center gap-2 text-sm font-semibold text-[#0048ff] hover:underline">
                  Ask us anything <ArrowRight size={14} />
                </ContactButton>
              </Reveal>
              <div className="flex-1 flex flex-col gap-3">
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
                Ready to build your next product?
              </h2>
              <p className="text-base text-[#6b7280] max-w-xl mx-auto leading-relaxed mb-8">
                Tell us what you&apos;re building and we&apos;ll scope a product development engagement from discovery through to launch.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#0035cc] transition-colors">
                  Start a project <ArrowRight size={15} />
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
