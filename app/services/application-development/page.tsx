"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, ChevronLeft,
  Layers, Code2, Smartphone, Brain, ShieldCheck,
  Zap, Package, Globe, Search, Rocket,
  RefreshCw, GitMerge, Settings, Users, BarChart3,
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
            <p className="text-xs text-[#0f1c3f]/70 leading-relaxed mb-4">{ctaText ?? "Book a scoping call and we'll define your application development engagement."}</p>
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
  { stat: "23%", source: "BCG", desc: "of product failures trace back to gaps in the technical expertise of the team building them." },
  { stat: "77%", source: "Gartner", desc: "of business leaders identify AI integration into existing applications as a major ongoing challenge." },
  { stat: "30%", source: "BCG", desc: "of technology development projects experience delays or budget overruns that could have been prevented." },
];

const services = [
  {
    icon: Search,
    title: "Product strategy and architecture",
    desc: "Define the technical foundations of lasting products. We translate business requirements into architecture blueprints, domain models, integration strategies, and scalability plans built on cloud-native and microservices principles — reducing hidden complexity, preventing costly rework, and giving your product a stable backbone for long-term growth.",
  },
  {
    icon: Globe,
    title: "Custom web application development",
    desc: "Build mission-critical web applications engineered for long-term performance and scale. We deliver SaaS platforms, enterprise portals, workflow automation tools, and data-driven apps with resilient backends, robust service layers, and production-ready modern frontends.",
  },
  {
    icon: Smartphone,
    title: "Mobile application development",
    desc: "Deliver mobile experiences built for continuous usage, fast updates, and ecosystem reliability. We build native and cross-platform applications with optimized performance, secure data flows, offline capabilities, and seamless integrations with internal systems, devices, and cloud services.",
  },
  {
    icon: Package,
    title: "Enterprise application development",
    desc: "Create high-value enterprise systems that streamline operations and enable measurable productivity gains. We build custom applications for complex workflows, multi-step business processes, internal automation, compliance, and data-heavy environments with rigorous reliability and governance standards.",
  },
  {
    icon: GitMerge,
    title: "API development and system integrations",
    desc: "Strengthen your technology ecosystem with secure, scalable, and well-governed integration layers. We develop REST and GraphQL APIs, microservices, event-driven pipelines, and data exchange frameworks that connect your applications to the systems they depend on.",
  },
  {
    icon: Code2,
    title: "Frontend and backend engineering",
    desc: "Engineer application layers that are resilient, maintainable, and optimized for rapid iteration. Our teams specialize in scalable backend architectures, modular frontends, microservices, clean code principles, and development practices that keep your product stable while accelerating feature delivery.",
  },
  {
    icon: Rocket,
    title: "Cloud-native application development",
    desc: "Build applications architected for the cloud from day one. We leverage serverless services, Kubernetes, containers, and managed cloud capabilities across AWS, Azure, and GCP to deliver high availability, elasticity, cost efficiency, and operational resilience.",
  },
  {
    icon: RefreshCw,
    title: "Application modernization",
    desc: "Rebuild outdated systems into high-performing, future-ready platforms. We refactor monoliths, migrate workloads to modern cloud infrastructure, re-architect legacy components, improve performance bottlenecks, and eliminate technical debt that slows innovation and increases long-term costs.",
  },
  {
    icon: ShieldCheck,
    title: "Quality engineering and automated testing",
    desc: "Protect your application with a mature testing strategy engineered for scale. We implement automated test suites, performance testing, API testing, regression pipelines, and CI-driven quality controls that reduce defects, increase release confidence, and ensure consistent performance across environments.",
  },
  {
    icon: Settings,
    title: "DevOps and release automation",
    desc: "Accelerate delivery with automated, predictable release pipelines. We design and operate CI/CD processes, IaC workflows, environment automation, observability setups, and deployment pipelines that keep releases fast, reliable, and aligned with cloud and security best practices.",
  },
  {
    icon: Layers,
    title: "UX/UI design",
    desc: "Design user-centric experiences that drive adoption and reduce friction. We deliver prototyping, wireframing, usability testing, and UI development for consistency and visual appeal across every surface your users interact with.",
  },
  {
    icon: Brain,
    title: "AI and machine learning integration",
    desc: "Enhance applications with predictive analytics, natural language processing, computer vision, and other intelligent features. We integrate AI and ML capabilities using governance-first patterns that keep your data secure and AI behavior auditable and explainable.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery and solution design",
    color: false,
    desc: "Identify application goals, user journeys, workflows, dependencies, and non-functional requirements through a structured discovery. We review existing systems, data flows, integration needs, constraints, and success criteria. MVP features are shortlisted to accelerate early delivery. When uncertainty exists, we run architectural spikes to validate assumptions before committing to design or development.",
    deliverables: ["Business canvas", "System flows", "Functional backlog", "UI/UX design", "Technical architecture", "Delivery schedule"],
  },
  {
    num: "02",
    title: "Build the MVP",
    color: false,
    desc: "Develop your MVP through iterative cycles designed for clarity, stability, and predictable progress. Each cycle covers frontend, backend, mobile, QA, and integration work — supported by CI/CD pipelines. Feature behavior is validated against real workflows to prevent hidden issues from accumulating. Code quality remains high through static analysis, automated tests, and detailed code reviews.",
    deliverables: ["Release build", "Release notes", "QA test results", "MVP release"],
  },
  {
    num: "03",
    title: "Integrate and validate end to end",
    color: false,
    desc: "Connect the MVP or full application to internal systems, authentication layers, third-party tools, and external data sources. We perform end-to-end testing across all integration points, conduct regression and performance checks, validate error handling, and complete security reviews aligned with real usage patterns. A final readiness review ensures deployment confidence.",
    deliverables: ["Integration results", "Performance baseline", "QA reports", "Release checklist"],
  },
  {
    num: "04",
    title: "Launch and evolve",
    color: true,
    desc: "Deploy the application with monitoring, logging, and observability configured for operational insight. After launch, we analyze user behavior, performance signals, and error trends to guide enhancements, strengthen architecture, and prioritize upcoming features. The application matures over time through continuous improvement cycles.",
    deliverables: ["Deployment package", "Monitoring dashboards", "Launch summary", "Improvement roadmap"],
  },
];

const outcomes = [
  { icon: Zap, title: "Accelerate application development", desc: "Align architecture, design, backend, frontend, QA, and DevOps from day one. Move from requirements to a build-ready blueprint in weeks and progress with predictable delivery cycles." },
  { icon: ShieldCheck, title: "Reduce delivery and technical risk", desc: "Validate feasibility early through architectural spikes, prototype checks, and targeted PoCs. Surface integration, performance, and scalability risks before they impact cost or timelines." },
  { icon: Layers, title: "Build on architecture that scales", desc: "Start with modular, cloud-native foundations designed for reliability across web, mobile, and enterprise-grade systems — engineered with long-term maintainability and security in mind." },
  { icon: CheckCircle, title: "Access certified engineering expertise", desc: "Work with experienced teams following rigorous delivery practices aligned with SOC 2, ISO 27001, and GDPR — with deep expertise in modern frameworks, cloud platforms, and DevOps." },
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
    title: "Integrated enterprise mobility solution for top IP litigation firm",
    company: "Sterne Kessler",
    quote: "Built a docketing app with an intuitive UI, helping attorneys track 10,000+ patent systems.",
    person: "Robert K Burger",
    role: "COO, Sterne Kessler",
    hasVideo: false,
  },
  {
    tag: "Manufacturing · Engineering",
    title: "23% increase in sales productivity with a customized CSR system",
    company: "Knowles",
    quote: "",
    person: "Nick Drogo",
    role: "Global Director IT, Knowles",
    hasVideo: true,
  },
  {
    tag: "Software & IT · Engineering",
    title: "Legacy system transformed into a full-featured inventory management platform",
    company: "AutoconX",
    quote: "",
    person: "Rob Hage",
    role: "CEO, AutoconX Systems",
    hasVideo: true,
  },
  {
    tag: "E-Commerce · Engineering",
    title: "Global e-commerce standardized across 30+ countries",
    company: "Groupon",
    quote: "Their expertise in digital solutions transformed our platform and made our global operations run smoothly.",
    person: "Umair Bashir",
    role: "Director, Groupon",
    hasVideo: false,
  },
  {
    tag: "Fintech · Application Development",
    title: "50% reduction in development time with redesigned modular architecture",
    company: "Fintech Client",
    quote: "tkxel's engineering approach cut our release cycles in half and improved overall product stability.",
    person: "Engineering Lead",
    role: "Head of Engineering",
    hasVideo: false,
  },
];

const recognitions = [
  "America's Fastest Growing Company",
  "Top 100 Inspiring Workplaces 2025",
  "Forbes Coaches Council",
  "Financial Times",
  "Mogul People Leader",
  "ISO 27001 Certified",
  "ISO 20000 Certified",
  "ISO 9001 Certified",
  "CMMI DEV 3 Certified",
];

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
    label: "UI Frameworks & State",
    items: [
      { name: "Redux", img: "/icons/redux.svg" },
      { name: "Tailwind CSS", img: "/icons/tailwind.webp" },
      { name: "Next.js", img: "/icons/next js.webp" },
      { name: "React", img: "/icons/react.svg" },
      { name: "Vue.js", img: "/icons/vue.svg" },
      { name: "Angular", img: "/icons/angular.svg" },
      { name: "TypeScript", img: "/icons/typescript.svg" },
      { name: "Flutter", img: "/icons/Flutter.svg" },
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
      { name: "PostgreSQL", img: "/icons/postgresql.webp" },
      { name: "Socket.io", img: "/icons/Socket.io.png" },
      { name: "Supabase", img: "/icons/supabase.webp" },
    ],
  },
  {
    label: "Cloud, DevOps & CI/CD",
    items: [
      { name: "AWS", img: "/icons/aws.svg" },
      { name: "Azure", img: "/icons/azure.svg" },
      { name: "Docker", img: "/icons/Docker.svg" },
      { name: "Kubernetes", img: "/icons/Kubernetes.svg" },
      { name: "Terraform", img: "/icons/HashiCorp-Terraform.svg" },
      { name: "Jenkins", img: "/icons/jenkins.svg" },
      { name: "GitHub", img: "/icons/github.png" },
      { name: "Vercel", img: "/icons/vercel.png" },
    ],
  },
];

const faqs = [
  {
    q: "What types of applications do you develop?",
    a: "We build a wide range of applications including web applications, mobile apps (iOS and Android), SaaS platforms, enterprise systems, and integration-heavy applications that connect with internal tools or third-party services. We also handle modernization of legacy systems.",
  },
  {
    q: "Do you build applications for iOS, Android, or both?",
    a: "Both. We develop native iOS and Android applications as well as cross-platform solutions using React Native and Flutter. The choice depends on your performance requirements, budget, and timeline — we help you decide in discovery.",
  },
  {
    q: "Can you help define my application requirements if I'm still early in the process?",
    a: "Yes. Our discovery phase is specifically designed for early-stage clarity. We work through product goals, user workflows, system dependencies, technical feasibility, and architecture options — and deliver a structured plan before any build work begins.",
  },
  {
    q: "How do you ensure application security and performance?",
    a: "Security and performance are built in from the architecture phase — not added later. We apply secure coding standards, run static analysis, conduct security reviews before every release, and set up performance testing and observability from day one.",
  },
  {
    q: "Do you work with legacy applications or handle modernization projects?",
    a: "Yes. Application modernization is one of our core services. We refactor monoliths, migrate to cloud-native infrastructure, re-architect legacy components, and eliminate technical debt — while keeping the business running throughout the process.",
  },
  {
    q: "What technology stack do you use for custom application development?",
    a: "We're stack-agnostic and select tools based on your requirements. Our teams are proficient across React, Angular, Vue, Node.js, Python, Go, .NET, AWS, Azure, GCP, Docker, Kubernetes, and more. We recommend what fits your product — not what's easiest for us.",
  },
  {
    q: "Do you provide API development and integrations?",
    a: "Yes. API development and system integrations are a core capability. We build REST and GraphQL APIs, microservices, event-driven pipelines, and data exchange layers that connect your application to every internal and external system it needs.",
  },
  {
    q: "What does your QA and testing process look like?",
    a: "QA is embedded from day one. We write automated test suites alongside development, run regression and performance checks after each release cycle, conduct API and security testing, and complete a full readiness review before any deployment.",
  },
  {
    q: "How do you handle deployment and CI/CD for applications?",
    a: "We design and operate CI/CD pipelines, infrastructure-as-code workflows, and environment automation as part of every engagement. Deployments are automated, repeatable, and observable — with rollback capabilities and monitoring configured before launch.",
  },
  {
    q: "Do you offer post-launch support or application maintenance?",
    a: "Yes. Post-launch we monitor performance, respond to error signals, fix issues, and guide the next improvement cycle. We offer structured support and maintenance arrangements that keep your application stable and continuously improving after go-live.",
  },
];

/* ── Application Dev Process phases for StickySectionTabs ── */
const appProcessPhases: ProcessPhase[] = [
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
              <h4 className="text-base font-semibold text-[#0f1c3f]">Requirements & architecture design</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            We identify application goals, user journeys, workflows, dependencies, and non-functional requirements through structured discovery. We review existing systems, data flows, integration needs, constraints, and success criteria. MVP features are shortlisted to accelerate early delivery — and when uncertainty exists, we run architectural spikes before committing to design or development.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Business canvas", "System flows", "Functional backlog", "UI/UX design", "Technical architecture", "Delivery schedule"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#f5f8ff] rounded-2xl border border-gray-100 p-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-5">Architecture decisions</p>
          <div className="space-y-4">
            {[
              { icon: Layers, label: "Cloud-native foundation", desc: "Modular, scalable structure designed for long-term reliability" },
              { icon: ShieldCheck, label: "Security-first design", desc: "SOC 2, ISO 27001, and GDPR built into architecture from day one" },
              { icon: Zap, label: "MVP scope alignment", desc: "Features prioritised for fastest path to production value" },
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
    title: "MVP development and integration",
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
              <h4 className="text-base font-semibold text-[#0f1c3f]">Iterative development cycles</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            We build your MVP through iterative cycles designed for clarity, stability, and predictable progress. Each cycle covers frontend, backend, mobile, QA, and integration work — supported by CI/CD pipelines. Feature behaviour is validated against real workflows to prevent hidden issues from accumulating across sprints.
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
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-5">Engineering standards</p>
          <div className="space-y-4">
            {[
              { icon: GitMerge, label: "CI/CD from day one", desc: "Automated pipelines keep delivery steady and prevent integration drift" },
              { icon: ShieldCheck, label: "Static code analysis", desc: "Quality gates on every commit — no accumulation of hidden technical debt" },
              { icon: Users, label: "Peer review", desc: "Every merge reviewed against coding standards and architecture guidelines" },
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
    label: "Validate",
    title: "End-to-end validation and security review",
    icon: Settings,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <Settings size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Week 8–12</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">Integration & readiness review</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            We connect the application to internal systems, authentication layers, third-party tools, and external data sources. End-to-end tests cover all integration points, regression and performance checks, error handling validation, and security reviews aligned with real usage patterns. A final readiness review ensures deployment confidence.
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
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-5">Validation focus areas</p>
          <div className="space-y-4">
            {[
              { icon: Globe, label: "System integrations", desc: "APIs, identity providers, external services, and data pipelines" },
              { icon: ShieldCheck, label: "Security review", desc: "Vulnerability scanning and access control audit pre-launch" },
              { icon: BarChart3, label: "Performance testing", desc: "Load validation against expected and peak concurrent usage" },
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
    label: "Launch & Evolve",
    title: "Launch with full observability and evolve continuously",
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
            We deploy the application with monitoring, logging, and observability configured for operational insight from day one. Post-launch, we analyse user behaviour, performance signals, and error trends to guide enhancements, strengthen architecture, and prioritise upcoming features. The application matures through continuous improvement cycles.
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
            { icon: RefreshCw, label: "Continuous delivery", desc: "Regular release cycles keep the application improving after go-live." },
            { icon: Zap, label: "Real-time observability", desc: "Live dashboards track performance, errors, and infrastructure health." },
            { icon: Brain, label: "Data-driven roadmap", desc: "Usage signals shape every feature priority and architectural decision." },
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
export default function ApplicationDevelopmentPage() {
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
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" /> Application Development
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-5">
                Build modern applications that are
                <span className="block text-[#0048ff]">
                  fast, secure, and scalable
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-10">
                We develop web, mobile, and enterprise applications with strong foundations, secure integrations, cloud-ready infrastructure, and AI capabilities that enhance performance, automation, and decision-making.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="flex flex-wrap items-center gap-4 mb-10">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
                  Start a scoping call <ArrowRight size={15} />
                </ContactButton>
                <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all no-underline">
                  View our work <ChevronRight size={15} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-3">
                {["ISO 27001 Certified", "Full IP Ownership", "CI/CD from Day One", "12-Month Warranty"].map((t) => (
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
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-5">Application Delivery Path</p>
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#0048ff]/15" />
                  {[
                    { week: "Week 1–2", label: "Discovery & architecture", done: true },
                    { week: "Week 2–8", label: "MVP build & integration", done: true },
                    { week: "Week 8–12", label: "Validation & QA", done: false },
                    { week: "Week 12+", label: "Launch & continuous improvement", done: false },
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
                Why most application projects struggle
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                These are the patterns that derail application projects before a single user touches the product.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {challenges.map(({ stat, source, desc }, i) => (
                <Reveal key={i} delay={i * 0.1} className="card-glow group relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-8 overflow-hidden">
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
                Our application development services include
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Twelve integrated capabilities covering every layer of a modern application — from architecture through to AI and DevOps.
              </p>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Nav list */}
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
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff] mb-1 block">Application Development</span>
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

        {/* ══ CTA BANNER ══ */}
        <section className="bg-white pb-16 sm:pb-20">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal>
              <div className="rounded-2xl border border-[#0048ff]/15 bg-[#e8eeff] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#0048ff] mb-2">Not sure where to start?</p>
                  <h3 className="text-xl font-semibold text-[#0f1c3f] mb-1">Not sure where to start with your application build?</h3>
                  <p className="text-sm text-[#6b7280]">We'll help you turn early-stage requirements into a clear, scoped, build-ready plan.</p>
                </div>
                <ContactButton className="btn-shimmer flex-shrink-0 inline-flex items-center gap-2 bg-[#0048ff] text-white px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#0035cc] transition-colors">
                  Start here <ArrowRight size={15} />
                </ContactButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ PROCESS — STICKY SECTION TABS ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 mb-16">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Process</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Our approach to application development
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Four phases — scroll through each to see what we design, build, validate, and launch.
              </p>
            </Reveal>
          </div>
          <StickySectionTabs phases={appProcessPhases} ctaText="Book a scoping call and we'll define your application development engagement." />
        </section>

        {/* ══ OUTCOMES ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-14 text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight tracking-tight mb-4">
                Partner with a team built for modern application delivery
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                What working with us actually means for your engineering team, timelines, and product quality.
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
                We select tools based on what your application needs — not what's easiest for us to deliver.
              </p>
            </Reveal>

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

        {/* ══ RECOGNITIONS ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-12 sm:py-16">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="text-center mb-8">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">We&apos;ve been recognized by the best, year after year</p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-wrap justify-center gap-3">
              {recognitions.map((r) => (
                <span key={r} className="text-[11px] font-semibold uppercase tracking-wider text-[#6b7280] bg-white border border-gray-200 px-4 py-2 rounded-full hover:border-[#0048ff]/30 hover:text-[#0048ff] transition-colors cursor-default">
                  {r}
                </span>
              ))}
            </Reveal>
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
                  Everything you need to know before starting an application development engagement.
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
                Ready to build your next application?
              </h2>
              <p className="text-base text-[#6b7280] max-w-xl mx-auto leading-relaxed mb-8">
                Tell us what you&apos;re building and we&apos;ll scope an engagement that takes you from requirements to launch with predictable delivery.
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
