"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, ChevronRight, ChevronLeft,
  Layers, Search, Target, Palette, Monitor, Smartphone,
  BarChart2, Users, Zap, ShieldCheck, Star,
  MousePointer2, LayoutDashboard, GitBranch, TrendingUp,
  MessageSquare, Lightbulb, LifeBuoy,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactButton from "@/app/components/ContactButton";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Reusable reveal wrapper ── */
function Reveal({
  children, delay = 0, className = "",
}: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated counter ── */
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

/* ── FAQ item ── */
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

/* ══════════════════════════════════════════════════
   STICKY SECTION TABS
   Left: sticky nav | Right: scrolling content
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
          <div className="mt-4 rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-xs font-semibold text-[#0048ff] mb-1">Ready to start?</p>
            <p className="text-xs text-[#0f1c3f]/70 leading-relaxed mb-4">{ctaText ?? "Book a consultation and we'll scope your engagement end-to-end."}</p>
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
  { value: "50%", label: "Faster product launch" },
  { value: "2.4×", label: "Engagement with personalized screens" },
  { value: "+32%", label: "Activation after onboarding redesign" },
  { value: "70%", label: "Reduced design costs vs. in-house" },
];

const challenges = [
  {
    icon: BarChart2,
    title: "Poor feature adoption",
    desc: "Key features go unused because workflows are too long, too confusing, or buried behind too many steps.",
  },
  {
    icon: TrendingUp,
    title: "High drop-off rates",
    desc: "Users abandon the product during onboarding or critical actions, dragging down activation and revenue.",
  },
  {
    icon: Users,
    title: "Fragmented user flows",
    desc: "Navigating between tasks feels disconnected and inconsistent, leaving users frustrated and churning early.",
  },
];

const expertise = [
  {
    icon: Search,
    title: "UX audit & usability testing",
    tag: "Research",
    wide: false,
    desc: "We identify friction points, behavioural gaps, and usability breakdowns in your product so you can improve adoption and performance with evidence behind every change.",
  },
  {
    icon: Target,
    title: "Design discovery & strategy",
    tag: "Strategy",
    wide: false,
    desc: "We bridge user needs, product objectives, and stakeholder priorities into a focused design direction — so your B2B or SaaS product is built on strategy, not guesswork.",
  },
  {
    icon: Palette,
    title: "UI/UX design & intelligent experiences",
    tag: "Design",
    wide: true,
    desc: "We design interfaces that are intuitive by default — simplifying complex journeys and building experiences that keep users engaged across web and mobile.",
  },
  {
    icon: Layers,
    title: "Design system development",
    tag: "Systems",
    wide: true,
    desc: "We build scalable, reusable component libraries that keep your product visually consistent, speed up delivery, and support growth without design debt.",
  },
];

const offerings = [
  {
    label: "UI/UX DESIGN",
    title: "Launch your MVP",
    bullets: [
      "Map core features and user flows through early wireframes and rapid prototyping",
      "Design intuitive UX/UI screens built around real user needs and human-centered principles",
      "Ship a testable MVP with responsive layouts ready for feedback from day one",
    ],
  },
  {
    label: "UI/UX DESIGN",
    title: "Revamp an existing product",
    bullets: [
      "Overhaul the UX/UI for greater clarity and engagement with refreshed interaction patterns",
      "Eliminate friction across critical user journeys surfaced through research and usability testing",
      "Update the visual language to match modern B2B and SaaS standards with polished motion and animation",
    ],
  },
  {
    label: "UI/UX DESIGN",
    title: "Build an investor-ready presentation",
    bullets: [
      "Shape a compelling product story backed by clear, purposeful information architecture",
      "Translate complex concepts into clean, persuasive visuals using Figma and Sketch",
      "Deliver a presentation that earns investor confidence through strong visual design and storytelling",
    ],
  },
  {
    label: "UI/UX DESIGN",
    title: "Embedded design support",
    bullets: [
      "Place experienced UX, UI, and research designers directly inside your team and workflow",
      "Cover sprints and design iterations with flexible, on-demand capacity",
      "Grow your design output without the delays and overhead of in-house hiring",
    ],
  },
];

const gains = [
  {
    icon: Zap,
    title: "Validated ideas in weeks",
    desc: "Interactive prototypes and structured user journeys ready in weeks — so you confirm what works before committing to full development.",
  },
  {
    icon: BarChart2,
    title: "Lower design overhead",
    desc: "Expert UX/UI capability without the cost of building an in-house team — high output, lower spend, no compromise on quality.",
  },
  {
    icon: MousePointer2,
    title: "Decisions grounded in evidence",
    desc: "Every design choice is backed by research, usability testing, and real user data — not hunches or internal preferences.",
  },
  {
    icon: Monitor,
    title: "Consistent cross-device experience",
    desc: "Mobile-first, fully responsive interfaces that deliver a unified, polished experience whether users are on desktop, tablet, or phone.",
  },
  {
    icon: ShieldCheck,
    title: "Less rework at launch",
    desc: "Catching usability problems during design — not development — dramatically cuts the cost of fixes and keeps your rollout on schedule.",
  },
];

const caseStudies = [
  {
    tag: "Healthcare · Engineering",
    title: "Upgraded LMS helping scale to 1.2M+ users",
    company: "Elia Wellness",
    person: "Geraldine Przybylko",
    role: "Health Strategy Consultant",
  },
  {
    tag: "Legal Services · Engineering",
    title: "Enterprise mobility solution for top IP litigation firm",
    company: "Sterne Kessler",
    quote: "Built a docketing app with an intuitive UI, helping attorneys track 10,000+ patent systems.",
    person: "Robert K Burger",
    role: "COO, Sterne Kessler",
  },
  {
    tag: "Manufacturing · Engineering",
    title: "23% increase in sales team productivity with customized CSR system",
    company: "Knowles",
    person: "Nick Drogo",
    role: "Global Director IT, Knowles",
  },
  {
    tag: "E-Commerce · Engineering",
    title: "Standardizing global e-commerce across 30+ countries",
    company: "Groupon",
    quote: "Their expertise in digital solutions transformed our platform and made our global operations run smoothly.",
    person: "Umair Bashir",
    role: "Director, Groupon",
  },
];

const tools: { name: string; icon?: React.ElementType; img?: string }[] = [
  { name: "Figma", img: "/icons/figma.png" },
  { name: "Adobe XD", img: "/icons/xd.png" },
  { name: "Sketch", img: "/icons/sketch.png" },
  { name: "Hotjar", img: "/icons/hotjar.png" },
  { name: "Maze", img: "/icons/maze.png" },
  { name: "UserTesting", img: "/icons/user-testing.svg" },
  { name: "Miro", img: "/icons/miro.png" },
  { name: "InVision", img: "/icons/invision.png" },
];

const recognitions = [
  "America's Fastest Growing Company",
  "Top 100 Inspiring Workplaces 2025",
  "Forbes Coaches Council",
  "Financial Times",
  "Mogul People Leader",
  "ISO 27001 Certified",
  "ISO 9001 Certified",
  "CMMI DEV 3 Certified",
];

const clientLogos = [
  "nbc", "nokia", "groupon", "encore", "digno", "barclays", "7-eleven", "peopleguru",
];

const faqs = [
  {
    q: "What does your UX/UI design process include?",
    a: "Each engagement moves through discovery, user research, usability testing, UX strategy, information architecture, wireframing, prototyping, and a complete developer-ready handoff. We use Figma, Adobe XD, Sketch, and InVision to produce intuitive, responsive digital products with consistent interaction patterns and micro-interactions. Throughout, we apply Design Thinking, Lean UX, and Human-Centered Design principles — so every design decision ties back to real user behavior and your specific B2B or SaaS objectives.",
  },
  {
    q: "How long does a design project typically take?",
    a: "Most UX/UI engagements run between four and eight weeks, depending on scope. A focused MVP or targeted redesign often wraps up in four weeks, while a full end-to-end product design with a complete design system can take eight to twelve weeks. We agree on a delivery timeline before any work begins and share weekly progress throughout.",
  },
  {
    q: "Can you work with our existing product or design system?",
    a: "Absolutely. We regularly audit live products and slot into established design systems. We'll assess what's performing well, pinpoint where users are getting stuck, and extend or modernize your system without disrupting anything that's already working.",
  },
  {
    q: "Do you handle developer handoff and support after design?",
    a: "Yes — every project closes with a full developer handoff package: annotated Figma files, design tokens, component specifications, and an interactive prototype. After handoff we stay available for design QA during development to make sure the final build matches the intended experience.",
  },
  {
    q: "How do you make sure designs are technically buildable?",
    a: "We involve your engineering team from the Define phase onward. Our designers are familiar with real-world web and mobile constraints and deliberately steer away from patterns that are expensive to implement unless there's a strong, user-backed reason for them.",
  },
  {
    q: "How do you approach accessibility?",
    a: "Accessibility is part of the spec from the start, not a final checklist. We design to WCAG 2.1 AA as the floor, which means every deliverable includes correct color contrast ratios, keyboard navigation flows, semantic HTML recommendations, focus management guidance, and screen-reader-ready labeling.",
  },
  {
    q: "Do you design for mobile as well as web?",
    a: "Yes. We take a mobile-first approach and scale outward — so every layout is tested and refined across iOS, Android, tablet, and desktop. Responsive breakpoints and adaptive component behavior are part of every design, not an afterthought.",
  },
  {
    q: "Which prototyping tools do you use?",
    a: "Figma is our primary tool for high-fidelity, clickable prototypes. For research and usability testing we rely on Maze and UserTesting. Where interactions are complex or conditional, we bring in ProtoPie or Framer to capture the full behavior.",
  },
  {
    q: "Is developer handoff included in every project?",
    a: "Yes, always. You receive Figma files with developer mode active, a full set of design tokens, spacing and typography documentation, and an interactive prototype your team can reference throughout the build.",
  },
  {
    q: "How do you test designs with real users before launch?",
    a: "We run moderated and unmoderated usability sessions through Maze and UserTesting at both the wireframe and high-fidelity stages. What we learn feeds directly into the next round of iterations — so by the time assets are handed off, the design has already been pressure-tested against actual user behavior.",
  },
];

/* ── UX/UI Process phases for StickySectionTabs ── */
const uxProcessPhases: ProcessPhase[] = [
  {
    number: "01",
    label: "Discover",
    title: "User research and stakeholder alignment",
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
              <h4 className="text-base font-semibold text-[#0f1c3f]">Research & alignment</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            We align product goals, analyse user behaviour and audit your existing B2B or SaaS workflows. Through user research, workshops, and system audits using Hotjar and Maze, we surface the gaps and adoption blockers that design must solve.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["User research report", "Stakeholder workshop", "System audit", "Opportunity map"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#f5f8ff] rounded-2xl border border-gray-100 p-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-5">What we investigate</p>
          <div className="space-y-4">
            {[
              { icon: Users, label: "User behaviour", desc: "How your target users interact with similar products today" },
              { icon: BarChart2, label: "Performance gaps", desc: "Where your product falls short of engagement and conversion targets" },
              { icon: MessageSquare, label: "Stakeholder goals", desc: "Business KPIs and product vision that every design decision must support" },
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
    label: "Define",
    title: "Information architecture and wireframing",
    icon: Target,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <Target size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Week 2–3</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">Structure & requirements</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            Research becomes structured user journeys, refined flows, and prioritised requirements. We map information architecture, task flows, and wireframes to ensure every feature and interaction supports measurable business outcomes before a pixel of visual design is committed.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["User journey maps", "Information architecture", "Wireframes", "Prioritized backlog"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#f5f8ff] rounded-2xl border border-gray-100 p-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-5">Design principles applied</p>
          <div className="space-y-4">
            {[
              { icon: Layers, label: "Information hierarchy", desc: "Content structure that guides users to the right outcomes without friction" },
              { icon: MousePointer2, label: "Task flow optimisation", desc: "Every step mapped to real user tasks and business workflows" },
              { icon: TrendingUp, label: "Conversion-focused flows", desc: "Journeys designed to reduce drop-off at critical decision points" },
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
    label: "Design",
    title: "High-fidelity UI and design system",
    icon: Palette,
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 card-glow">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center flex-shrink-0">
              <Palette size={18} className="text-[#0048ff]" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">Week 3–5</p>
              <h4 className="text-base font-semibold text-[#0f1c3f]">Visual design & interaction</h4>
            </div>
          </div>
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4">
            We produce high-fidelity UI and scalable design systems in Figma, Adobe XD, and Sketch. Through usability testing and iteration, we refine micro-interactions, layouts, and responsive patterns so every screen feels fast, intuitive, and purposeful.
          </p>
          <div className="border-t border-gray-100 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["High-fidelity UI", "Design system", "Responsive layouts", "Micro-interaction specs"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-[#f5f8ff] text-[#0f1c3f] px-3 py-1.5 rounded-full border border-gray-100">
                  <CheckCircle size={11} className="text-[#0048ff]" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { icon: Monitor, label: "Responsive design", desc: "Every layout tested across desktop, tablet, and mobile breakpoints." },
            { icon: Zap, label: "Micro-interactions", desc: "Subtle animations that reinforce user actions and reduce cognitive load." },
            { icon: ShieldCheck, label: "Accessibility", desc: "WCAG 2.1 AA compliance built into every component and interaction." },
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
  {
    number: "04",
    label: "Deliver",
    title: "Developer handoff and post-launch validation",
    icon: Layers,
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0048ff] rounded-2xl border border-transparent p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Layers size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-white/60">Week 5–6</p>
              <h4 className="text-base font-semibold text-white">Handoff & validation</h4>
            </div>
          </div>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            We deliver interactive prototypes, engineering-ready assets, design tokens, and full specifications. After handoff, we validate the live product using UserTesting and refine to hit adoption and performance targets — so what ships has already been tested against real users.
          </p>
          <div className="border-t border-white/20 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-3">Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {["Interactive prototype", "Dev handoff package", "Design tokens", "Validation report"].map((d) => (
                <span key={d} className="flex items-center gap-1.5 text-xs font-medium bg-white/15 text-white px-3 py-1.5 rounded-full">
                  <CheckCircle size={11} className="text-white/70" /> {d}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { icon: LayoutDashboard, label: "Figma dev mode", desc: "Annotated files with spacing, tokens, and component logic for developers." },
            { icon: Lightbulb, label: "Post-handoff QA", desc: "We validate the built product matches design spec before launch." },
            { icon: LifeBuoy, label: "Design support", desc: "Available during development to resolve edge cases and component questions." },
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
export default function UIUXDesignPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeOffering, setActiveOffering] = useState(0);
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
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0048ff]" />
                  UI/UX Design
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-[#0f1c3f] mb-6">
                UX/UI design that turns users into
                <span className="block text-[#0048ff]">
                  loyal, engaged customers
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="text-base sm:text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-2xl mb-10">
                We create user experiences that drive adoption and reduce churn across B2B and SaaS products — grounded in real user research, clear information architecture, and interaction design that makes complex workflows feel effortless.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="flex flex-wrap items-center gap-4 mb-10">
                <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,72,255,0.3)] transition-all">
                  Start a Design Consultation <ArrowRight size={15} />
                </ContactButton>
                <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-6 py-3 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] hover:-translate-y-0.5 transition-all no-underline">
                  View Case Studies <ChevronRight size={15} />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-3">
                {["Human-Centered Design", "Figma & Adobe XD", "WCAG Accessibility", "Developer-Ready Handoff"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 ring-1 ring-gray-200 rounded-md bg-white px-2.5 py-1.5 text-xs text-[#6b7280]">
                    <CheckCircle size={12} className="text-[#0048ff]" /> {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating UI preview card */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="w-[300px] rounded-lg border border-gray-100 bg-white p-6"
                style={{ boxShadow: "0 18px 55px rgba(15,28,63,0.08)" }}>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-4">Design Process</p>
                <div className="space-y-3 mb-5">
                  {[
                    { step: "Discover", pct: 100, done: true },
                    { step: "Define", pct: 100, done: true },
                    { step: "Design", pct: 65, done: false },
                    { step: "Deliver", pct: 0, done: false },
                  ].map(({ step, pct, done }) => (
                    <div key={step}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-medium text-[#0f1c3f]">{step}</span>
                        <span className="text-[10px] text-[#0048ff] font-semibold">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: done ? "#0048ff" : "linear-gradient(90deg,#0048ff,#3b82f6)" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mb-4">
                  {[Star, Star, Star, Star, Star].map((Icon, i) => (
                    <Icon key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-[11px] text-[#6b7280] ml-1">5.0 · 200+ projects</span>
                </div>
                <ContactButton className="flex items-center justify-center gap-1.5 bg-[#0048ff] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0035cc] transition-colors">
                  Book free design review <ArrowRight size={12} />
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
                <Reveal key={label} delay={i * 0.08}
                  className={`p-5 sm:p-7 ${i < 3 ? "border-r border-gray-200" : ""}`}>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0f1c3f] mb-1">
                    <Counter target={value} />
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-[#6b7280]">{label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CLIENT MARQUEE ══ */}
        <section className="bg-white py-16 border-b border-gray-100 overflow-hidden">
          <div className="max-w-[1350px] mx-auto mb-8">
            <Reveal className="text-center">
              <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-1">Our Clients</p>
              <p className="text-sm text-[#6b7280]">Trusted by teams at category-leading companies</p>
            </Reveal>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right,#fff,transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left,#fff,transparent)" }} />
            <div className="flex gap-12 items-center" style={{
              animation: "marquee 28s linear infinite",
              width: "max-content",
            }}>
              {[...clientLogos, ...clientLogos, ...clientLogos].map((name, i) => (
                <div key={i} className="flex-shrink-0 px-3">
                  <span className="text-sm font-semibold uppercase tracking-widest text-gray-300 select-none">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }`}</style>
        </section>

        {/* ══ CHALLENGES ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Challenges</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Are you facing these challenges?
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                These are the design problems B2B and SaaS teams bring to us most often — and the ones we&apos;re built to solve.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {challenges.map(({ icon: Icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <div className="group grid grid-cols-1 md:grid-cols-[120px_1fr] items-start border-b border-gray-200 py-6 gap-4 transition-all duration-200 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff] cursor-default">
                    <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                      <span className="font-mono text-[11px] text-gray-400 tabular-nums">0{i + 1}</span>
                      <Icon size={16} className="text-[#0048ff] transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#0f1c3f] mb-2">{title}</h3>
                      <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ EXPERTISE ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Expertise</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Strengthen your product with our core UX/UI expertise
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Four disciplines, one cohesive practice — from first research to live design system.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {expertise.map(({ icon: Icon, title, tag, desc }, i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <div className="group grid grid-cols-1 md:grid-cols-[120px_1fr_120px] items-start border-b border-gray-200 py-6 gap-4 transition-all duration-200 hover:bg-white hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff] cursor-default">
                    <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                      <span className="font-mono text-[11px] text-gray-400 tabular-nums">0{i + 1}</span>
                      <Icon size={16} className="text-[#0048ff] transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#0f1c3f] mb-2">{title}</h3>
                      <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
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

        {/* ══ OFFERINGS SLIDER ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Services</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                We support your product at every stage
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Whether you&apos;re launching, scaling, or fundraising — we have a design engagement that fits.
              </p>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Nav list */}
              <div className="flex flex-row lg:flex-col gap-2 lg:w-72 flex-shrink-0 overflow-x-auto lg:overflow-visible">
                {offerings.map(({ title }, i) => (
                  <button key={i} onClick={() => setActiveOffering(i)}
                    className={`flex items-center gap-3 text-left px-5 py-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer border lg:whitespace-normal ${activeOffering === i
                      ? "bg-[#0048ff] text-white border-[#0048ff] shadow-[0_16px_36px_rgba(0,72,255,0.22)] -translate-y-0.5"
                      : "bg-white/80 text-[#6b7280] border-gray-200 hover:text-[#0f1c3f]"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${activeOffering === i ? "bg-white/25 text-white" : "bg-[#f5f8ff] text-[#0048ff] border border-gray-200"}`}>
                      {i + 1}
                    </span>
                    {title}
                  </button>
                ))}
              </div>

              {/* Content panel */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div key={activeOffering}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="rounded-lg border border-gray-100 bg-[#f5f8ff] p-5 sm:p-8 lg:p-10 h-full"
                    style={{ boxShadow: "0 12px 34px rgba(15,28,63,0.05)" }}>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff] mb-4 block">
                      {offerings[activeOffering].label}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#0f1c3f] mb-6 leading-tight">
                      {offerings[activeOffering].title}
                    </h3>
                    <ul className="space-y-4">
                      {offerings[activeOffering].bullets.map((b, i) => (
                        <motion.li key={b} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.07 }}
                          className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-md bg-[#e8eeff] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle size={12} className="text-[#0048ff]" />
                          </div>
                          <span className="text-sm text-[#0f1c3f] leading-relaxed font-medium">{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => setActiveOffering((p) => Math.max(0, p - 1))}
                        disabled={activeOffering === 0}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#0048ff] hover:text-[#0048ff] transition-colors cursor-pointer bg-white">
                        <ChevronLeft size={16} />
                      </button>
                      <button onClick={() => setActiveOffering((p) => Math.min(offerings.length - 1, p + 1))}
                        disabled={activeOffering === offerings.length - 1}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#0048ff] hover:text-[#0048ff] transition-colors cursor-pointer bg-white">
                        <ChevronRight size={16} />
                      </button>
                      <ContactButton
                        className="ml-auto inline-flex items-center gap-2 bg-[#0048ff] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 transition-all btn-shimmer">
                        Get started <ArrowRight size={14} />
                      </ContactButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PROCESS — STICKY SECTION TABS ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 mb-16">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Process</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                How we design user-centric digital solutions
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Four phases — scroll through each to see what we research, define, design, and deliver.
              </p>
            </Reveal>
          </div>
          <StickySectionTabs phases={uxProcessPhases} ctaText="Book a design consultation and we'll scope your UX/UI engagement end-to-end." />
        </section>

        {/* ══ GAINS ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Benefits</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                What outcomes you&apos;ll gain
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                Measurable improvements across adoption, cost, and delivery speed — built into every engagement.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {gains.map(({ icon: Icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 0.07}>
                  <div className="group grid grid-cols-1 md:grid-cols-[120px_1fr] items-start border-b border-gray-200 py-6 gap-4 transition-all duration-200 hover:bg-[#f5f8ff] hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff] cursor-default">
                    <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                      <span className="font-mono text-[11px] text-gray-400 tabular-nums">0{i + 1}</span>
                      <Icon size={16} className="text-[#0048ff] transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#0f1c3f] mb-2">{title}</h3>
                      <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CASE STUDIES ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-14 max-w-2xl">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Case Studies</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] leading-tight mb-4">
                Design work that drives results
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                A sample of B2B and SaaS products we&apos;ve redesigned, launched, and validated.
              </p>
            </Reveal>

            <div className="border-t border-gray-200">
              {caseStudies.map(({ tag, title, company, quote, person, role }, i) => (
                <Reveal key={title} delay={i * 0.07}>
                  <div className="group grid grid-cols-1 md:grid-cols-[1fr_200px] items-start border-b border-gray-200 py-6 gap-4 transition-all duration-200 hover:bg-white hover:px-4 hover:shadow-[inset_3px_0_0_#0048ff] cursor-default">
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-[#6b7280] mb-2 block">{tag}</span>
                      <h3 className="text-base font-semibold text-[#0f1c3f] mb-2">{title}</h3>
                      {quote && <p className="text-sm text-[#6b7280] italic leading-relaxed mb-2">&ldquo;{quote}&rdquo;</p>}
                      <p className="text-xs text-[#6b7280]">{person} · {role}</p>
                    </div>
                    <div className="md:text-right">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-[#0048ff]">{company}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEASIBILITY CTA ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="rounded-lg border border-gray-100 bg-[#0048ff] p-7 sm:p-10 lg:p-16 relative overflow-hidden"
              style={{ boxShadow: "0 12px 34px rgba(0,72,255,0.18)" }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 80% 50%,rgba(255,255,255,0.07) 0%,transparent 60%)" }} />
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-3">Assessment</p>
                  <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-4">
                    Validate your product vision before you invest
                  </h2>
                  <p className="text-base text-white/75 leading-relaxed mb-6">
                    Get an expert-led UX/UI feasibility review to ensure your product is worth building. We evaluate user flows, interaction models, technical constraints, platform requirements, and potential usability risks — giving you a clear path from idea to a design that actually works in the real world.
                  </p>
                  <div className="flex flex-wrap gap-6 mb-8">
                    {[
                      { value: "+32%", label: "raise in activation by revamping user onboarding" },
                      { value: "2.4×", label: "engagement with AI-personalized screens" },
                    ].map(({ value, label }) => (
                      <div key={label}>
                        <p className="text-3xl font-semibold text-white mb-0.5">{value}</p>
                        <p className="text-xs text-white/60 max-w-[140px] leading-snug">{label}</p>
                      </div>
                    ))}
                  </div>
                  <ContactButton
                    className="btn-shimmer inline-flex items-center gap-2 bg-white text-[#0048ff] px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#e8eeff] hover:-translate-y-0.5 transition-all">
                    Request a free feasibility review <ArrowRight size={15} />
                  </ContactButton>
                </div>
                <div className="hidden lg:flex flex-col gap-3 flex-shrink-0">
                  {[
                    { icon: MousePointer2, label: "User flow evaluation" },
                    { icon: Monitor, label: "Interaction model review" },
                    { icon: ShieldCheck, label: "Usability risk assessment" },
                    { icon: Smartphone, label: "Platform requirements check" },
                    { icon: Lightbulb, label: "Design direction brief" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 bg-white/10 rounded-lg px-5 py-3">
                      <Icon size={16} className="text-white/70 flex-shrink-0" />
                      <span className="text-sm text-white/85 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TOOLS ══ */}
        <section className="bg-[#f5f8ff] border-y border-gray-100 py-16 sm:py-20 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 sm:mb-12">
              <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">Tools & Methods</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] mb-4">
                Industry-standard toolchain
              </h2>
              <p className="text-base text-[#6b7280] max-w-xl leading-relaxed">
                We work with the tools your team already knows — no onboarding friction, no proprietary lock-in.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-wrap gap-3 mb-12">
              {tools.map(({ name, icon: Icon, img }) => (
                <div key={name} className="flex items-center gap-3 bg-white rounded-lg border border-gray-100 px-4 py-3 hover:border-[#0048ff]/30 hover:-translate-y-0.5 transition-all cursor-default">
                  <div className="w-7 h-7 rounded-md bg-[#f5f8ff] flex items-center justify-center overflow-hidden">
                    {img ? (
                      <img src={img} alt={name} className="w-4 h-4 object-contain" />
                    ) : Icon ? (
                      <Icon size={14} className="text-[#0048ff]" />
                    ) : null}
                  </div>
                  <span className="text-sm font-semibold text-[#0f1c3f]">{name}</span>
                </div>
              ))}
            </Reveal>

            {/* Recognition badges */}
            <Reveal delay={0.2}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">We&apos;ve been recognized by the best, year after year</p>
              <div className="flex flex-wrap gap-2">
                {recognitions.map((r) => (
                  <span key={r}
                    className="text-[11px] font-semibold uppercase tracking-wider text-[#6b7280] bg-white border border-gray-200 px-4 py-2 rounded-md hover:border-[#0048ff]/30 hover:text-[#0048ff] transition-colors cursor-default">
                    {r}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section className="bg-white py-16 sm:py-24 lg:py-28">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 sm:gap-16 items-start">
              <Reveal>
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-3">FAQ</p>
                <h2 className="text-3xl md:text-4xl font-medium text-[#0f1c3f] leading-tight mb-4">
                  Frequently asked questions
                </h2>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
                  Everything you need to know before starting a UX/UI engagement with us.
                </p>
                <ContactButton className="inline-flex items-center gap-2 text-sm font-semibold text-[#0048ff] hover:underline">
                  Ask us anything <ArrowRight size={14} />
                </ContactButton>
              </Reveal>

              <div>
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
        <section className="bg-[#f5f8ff] border-t border-gray-100 py-16 sm:py-24">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6">
            <div className="rounded-lg border border-gray-100 bg-white p-8 sm:p-12 lg:p-16 text-center"
              style={{ boxShadow: "0 12px 34px rgba(15,28,63,0.05)" }}>
              <Reveal>
                <p className="text-xs font-semibold text-[#0048ff] uppercase tracking-widest mb-4">Get Started</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f1c3f] mb-4">
                  Ready to design something great?
                </h2>
                <p className="text-base text-[#6b7280] max-w-xl mx-auto leading-relaxed mb-8">
                  Tell us about your product and we&apos;ll scope a design engagement that fits your timeline and budget.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <ContactButton className="btn-shimmer inline-flex items-center gap-2 bg-[#0048ff] text-white px-7 py-3.5 rounded-lg text-sm font-semibold shadow-[0_18px_44px_rgba(0,72,255,0.22)] hover:bg-[#0035cc] hover:-translate-y-0.5 transition-all">
                    Start a project <ArrowRight size={15} />
                  </ContactButton>
                  <Link href="/projects" className="inline-flex items-center gap-2 border border-gray-300 bg-white text-[#0f1c3f] px-7 py-3.5 rounded-lg text-sm font-medium hover:border-[#0048ff] hover:text-[#0048ff] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,28,63,0.08)] transition-all no-underline">
                    View our work <ChevronRight size={15} />
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
