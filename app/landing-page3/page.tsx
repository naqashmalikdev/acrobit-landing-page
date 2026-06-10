"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Testimonials from "@/app/components/Testimonials";
import ComplianceCovered from "@/app/components/ComplianceCovered";
import FAQ from "@/app/components/FAQ";
import Contact from "@/app/components/Contact";

const servicesMenu = {
  categories: [
    "AI & Data Innovation",
    "Engineering",
    "Advisory & Strategy",
    "Cybersecurity",
    "Optimization & Quality",
    "Cloud & Infrastructure",
  ],
  items: [
    { title: "AI Agents", badge: "NEW", desc: "Use AI agents to streamline workflows, decisions, and cut costs." },
    { title: "GenAI Consulting & Workshops", desc: "Build your AI roadmap with expert strategy, readiness, and ROI clarity." },
    { title: "Intelligent Automation", desc: "Streamline operations with intelligent automation that boosts efficiency." },
    { title: "AI PoC & MVP Development", desc: "Turn AI concepts into working pilots that prove value." },
    { title: "Machine Learning Solutions", desc: "Unlock predictive insights and impact through end-to-end ML solutions." },
    { title: "MLOps & AI Infrastructure", desc: "Reliable AI with automated pipelines and governed deployment." },
    { title: "Data Science & Predictive Analytics", desc: "Forecast trends and power smarter decisions with advanced analytics." },
    { title: "Data Engineering & Integration", desc: "Connect silos, modernize pipelines, and deliver reliable data for AI." },
    { title: "Data Governance & BI", desc: "Build a trusted data foundation for consistent, reliable intelligence." },
  ],
};

const companyMenu = [
  { title: "About Us", desc: "Our story, mission, and the team behind Acrobit." },
  { title: "Leadership", desc: "Meet the senior leaders driving our vision forward." },
  { title: "Culture & Values", desc: "How we work, what we believe, and why it matters." },
  { title: "Press & Media", desc: "News, announcements, and media resources." },
  { title: "Partnerships", desc: "Strategic alliances that extend our capabilities." },
  { title: "Careers", desc: "Join a team building software that changes industries." },
];

const resourcesMenu = [
  { title: "Blog", desc: "Insights, tutorials, and engineering deep-dives." },
  { title: "Case Studies", desc: "Real results from real client engagements." },
  { title: "Whitepapers", desc: "In-depth research and strategic frameworks." },
  { title: "Webinars", desc: "Live and on-demand sessions with our experts." },
  { title: "Documentation", desc: "Technical guides and integration references." },
  { title: "Newsletter", desc: "Monthly digest of what's moving in tech." },
];

type MenuKey = "services" | "company" | "resources" | null;

const projects = [
  {
    title: "ChatScribe",
    category: "AI & Communication",
    description: "AI-powered real-time translation across 400+ languages for chats and calls.",
    src: "/projects/chatscribe.webp",
    url: "https://chat.logoi.ai",
  },
  {
    title: "FeedNow",
    category: "Productivity & Analytics",
    description: "Live website feedback widget with real-time analytics dashboard.",
    src: "/projects/wefad.webp",
    url: "https://feednow.app",
  },
  {
    title: "Instant Response",
    category: "AI & Education",
    description: "Groq-powered English speech coach with sub-100ms feedback latency.",
    src: "/projects/instant-responce.webp",
    url: "https://www.instant-response-app.com",
  },
  {
    title: "Cloudpital",
    category: "Healthcare Solutions",
    description: "AI-powered HIS & EHR platform modernising clinical workflows.",
    src: "/projects/cloudpital.webp",
    url: "https://cloudpital.com",
  },
  {
    title: "Bashbop",
    category: "Event Management",
    description: "Full-stack event marketplace with live streaming and Stripe payouts.",
    src: "/projects/bashbop.webp",
    url: "https://bashbop.com",
  },
  {
    title: "QuanticX",
    category: "AI & FinTech",
    description: "Real-time trading chatbot with OpenAI-powered market insights.",
    src: "/projects/quanticx.webp",
    url: "https://quanticx.com",
  },
  {
    title: "Lunarisflow",
    category: "Web Development",
    description: "High-performance Next.js landing page rebuild with modern UI/UX.",
    src: "/projects/lunarisflow.webp",
    url: "https://lunarisflow.com",
  },
  {
    title: "Astore",
    category: "Cloud Storage",
    description: "Lightweight personal cloud storage app built on Appwrite + Next.js.",
    src: "/projects/astore.webp",
    url: "https://astore.app",
  },
];

export default function LandingPage3() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [activeCategory, setActiveCategory] = useState("AI & Data Innovation");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canSlideLeft, setCanSlideLeft] = useState(false);
  const [canSlideRight, setCanSlideRight] = useState(true);

  const checkSlide = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanSlideLeft(scrollLeft > 0);
    setCanSlideRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const slide = (dir: "left" | "right") => {
    const w = sliderRef.current?.clientWidth ?? 600;
    sliderRef.current?.scrollBy({ left: dir === "left" ? -Math.round(w / 3) : Math.round(w / 3), behavior: "smooth" });
  };

  const toggle = (key: MenuKey) => setOpenMenu((prev) => (prev === key ? null : key));
  const close = () => setOpenMenu(null);

  return (
    <main className="min-h-screen bg-white">
      <style>{`
        @keyframes menuSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mega-animate {
          animation: menuSlideDown 0.22s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Navbar */}
      <nav className="relative z-50 bg-white border-b border-gray-100">
        <div className="max-w-[1350px] mx-auto pr-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <span className="font-extrabold text-2xl text-[#0f1c3f] tracking-tight select-none">
            WebSphere<span className="text-[#0048ff]">X</span>
          </span>

          {/* Nav links */}
          <div className="flex items-center gap-8">

            {/* Services */}
            <button
              onClick={() => toggle("services")}
              className={`flex items-center gap-1 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer p-0 ${openMenu === "services" ? "text-[#0048ff]" : "text-[#1a2b4a] hover:text-[#0048ff]"}`}
            >
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: openMenu === "services" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Customers — no arrow, no dropdown */}
            <a href="#" className="text-[#1a2b4a] text-sm font-medium no-underline hover:text-[#0048ff] transition-colors">
              Customers
            </a>

            {/* Company */}
            <button
              onClick={() => toggle("company")}
              className={`flex items-center gap-1 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer p-0 ${openMenu === "company" ? "text-[#0048ff]" : "text-[#1a2b4a] hover:text-[#0048ff]"}`}
            >
              Company
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: openMenu === "company" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Careers — no dropdown */}
            <a href="#" className="text-[#1a2b4a] text-sm font-medium no-underline hover:text-[#0048ff] transition-colors">
              Careers
            </a>

            {/* Resources */}
            <button
              onClick={() => toggle("resources")}
              className={`flex items-center gap-1 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer p-0 ${openMenu === "resources" ? "text-[#0048ff]" : "text-[#1a2b4a] hover:text-[#0048ff]"}`}
            >
              Resources
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: openMenu === "resources" ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Blue glow blob */}
          <div className="absolute right-0 top-0 h-full w-[340px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at right center, rgba(80,120,255,0.22) 0%, rgba(100,140,255,0.10) 50%, transparent 80%)",
              filter: "blur(12px)",
            }}
          />
        </div>
      </nav>

      {/* ── MEGA MENUS ── */}
      {openMenu && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={close} />

          {/* SERVICES MEGA MENU */}
          {openMenu === "services" && (
            <div className="absolute left-0 right-0 z-50 bg-white shadow-2xl border-t border-gray-100 mega-animate">
              <div className="max-w-[1350px] mx-auto  flex" style={{ minHeight: "480px" }}>
              {/* Left sidebar */}
              <div className="w-[260px] flex-shrink-0 bg-white border-r border-gray-100 py-6 flex flex-col justify-between">
                <div>
                  {servicesMenu.categories.map((cat) => (
                    <button key={cat} onMouseEnter={() => setActiveCategory(cat)} onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-6 py-3 text-sm font-medium flex items-center justify-between transition-colors cursor-pointer border-none ${activeCategory === cat ? "bg-[#0048ff] text-white" : "text-[#1a2b4a] hover:bg-gray-50"}`}>
                      {cat}
                      {activeCategory === cat && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
                <div className="px-6 pt-6 border-t border-gray-100">
                  <button className="w-full flex items-center justify-between text-sm font-medium text-[#1a2b4a] border border-gray-200 rounded px-4 py-2.5 hover:border-[#0048ff] hover:text-[#0048ff] transition-colors bg-white cursor-pointer">
                    View all services
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mt-5 mb-3">Recognized by</p>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-xs text-orange-600 leading-none">Inc.<br />5000</span>
                    <span className="font-bold text-xs text-[#0048ff] leading-tight">IW<br /><span className="font-normal text-[9px]">INSPIRING WORKPLACES</span></span>
                    <span className="font-bold text-sm text-[#1a2b4a] tracking-wide">Forbes</span>
                  </div>
                </div>
              </div>

              {/* Center grid */}
              <div className="flex-1 px-10 py-8">
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {servicesMenu.items.map(({ title, badge, desc }) => (
                    <a key={title} href="#" className="group no-underline flex gap-3">
                      <span className="mt-1 w-3 h-3 flex-shrink-0 bg-[#0048ff] rounded-sm" />
                      <div>
                        <p className="text-sm font-semibold text-[#0f1c3f] group-hover:text-[#0048ff] transition-colors flex items-center gap-2">
                          {title}
                          {badge && <span className="text-[10px] font-bold bg-[#e8eeff] text-[#0048ff] px-2 py-0.5 rounded-full">{badge}</span>}
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#0048ff] no-underline mt-8 transition-colors">
                  All AI &amp; Data Innovation services
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Spotlight */}
              <div className="w-[300px] flex-shrink-0 bg-[#f0f3fa] py-8 px-6">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Spotlight</p>
                <div className="rounded-xl overflow-hidden mb-4 bg-[#0048ff] aspect-[4/3] flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                  </div>
                  <div className="relative z-10 text-center px-4">
                    <p className="text-white/70 text-[10px] tracking-widest uppercase mb-1">Acrobit</p>
                    <p className="text-white font-bold text-base leading-tight">Generative AI in Business Operations</p>
                    <p className="text-white/60 text-[11px] mt-1">C-Suite Strategies for AI Adoption</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#0f1c3f] leading-snug mb-2">
                  Generative AI in Business Operations: C-Suite Strategies for AI Adoption
                </p>
                <a href="#" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#0048ff] no-underline transition-colors">
                  Get the whitepaper
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              </div>{/* end max-w container */}
            </div>
          )}

          {/* COMPANY MEGA MENU */}
          {openMenu === "company" && (
            <div className="absolute left-0 right-0 z-50 bg-white shadow-2xl border-t border-gray-100 mega-animate">
              <div className="max-w-[1350px] mx-auto px-10 py-10">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-6">Company</p>
                <div className="grid grid-cols-3 gap-x-12 gap-y-7">
                  {companyMenu.map(({ title, desc }) => (
                    <a key={title} href="#" className="group no-underline flex gap-3">
                      <span className="mt-1 w-3 h-3 flex-shrink-0 bg-[#0048ff] rounded-sm" />
                      <div>
                        <p className="text-sm font-semibold text-[#0f1c3f] group-hover:text-[#0048ff] transition-colors">{title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RESOURCES MEGA MENU */}
          {openMenu === "resources" && (
            <div className="absolute left-0 right-0 z-50 bg-white shadow-2xl border-t border-gray-100 mega-animate">
              <div className="max-w-[1350px] mx-auto px-10 py-10 flex gap-16">
                <div className="flex-1">
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-6">Resources</p>
                  <div className="grid grid-cols-3 gap-x-12 gap-y-7">
                    {resourcesMenu.map(({ title, desc }) => (
                      <a key={title} href="#" className="group no-underline flex gap-3">
                        <span className="mt-1 w-3 h-3 flex-shrink-0 bg-[#0048ff] rounded-sm" />
                        <div>
                          <p className="text-sm font-semibold text-[#0f1c3f] group-hover:text-[#0048ff] transition-colors">{title}</p>
                          <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                {/* Featured resource */}
                <div className="w-[240px] flex-shrink-0 bg-[#f0f3fa] rounded-2xl p-6">
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">Featured</p>
                  <p className="text-sm font-bold text-[#0f1c3f] leading-snug mb-2">
                    The 2025 State of AI in Software Development
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    Download our annual report on how engineering teams are adopting AI.
                  </p>
                  <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-[#0048ff] no-underline hover:underline">
                    Download report
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Hero */}
      <div className="flex items-center justify-center px-4 pb-4 pt-4">
        <div className="w-full max-w-[1350px] relative">
          <div className="w-full relative rounded-3xl overflow-hidden" style={{ aspectRatio: "16/6", minHeight: "650px" }}>
            <Image
              src="/bg-2.png"
              alt="Hero background"
              fill
              className="object-cover"
              priority
              // sizes="(max-width: 768px) 100vw, 1350px"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
            <div className="absolute bottom-8 left-8 max-w-[560px]">
              <h1 className="text-white leading-[1.1] tracking-tight mb-4" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)" }}>
                We Design, Build &amp; Ship<br />Software That Actually Works.
              </h1>
              <p className="text-white/70 leading-relaxed mb-7" style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)" }}>
                From idea to production — our senior team delivers full-cycle software with a guaranteed outcome, fixed price, and a 12-month bug-free warranty.
              </p>
              <button className="flex items-center gap-3 bg-white text-gray-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors w-fit">
                Get in contact
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0048ff] text-white flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          {/* White corner block */}
          <div className="absolute bottom-0 right-0 bg-white" style={{ width: "28%", height: "42%", maxHeight: "110px", borderRadius: "16px 0 0 0" }} />

          {/* Reviews card — inside the white corner block */}
          <div
            className="absolute flex items-center bg-white rounded-2xl px-5 py-4"
            style={{
              bottom: "12px",
              right: "12px",
              width: "calc(28% - 24px)",
              boxShadow: "0 12px 48px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {/* Overlapping avatars */}
            <div className="flex items-center flex-shrink-0" style={{ width: "84px" }}>
              {[
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&q=80",
              ].map((src, i) => (
                <div
                  key={src}
                  className="relative rounded-full overflow-hidden border-[3px] border-white flex-shrink-0"
                  style={{ width: "44px", height: "44px", marginLeft: i === 0 ? 0 : "-12px", zIndex: 3 - i }}
                >
                  <Image src={src} alt="Client" fill className="object-cover" sizes="44px" />
                </div>
              ))}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 ml-7">
              <p className="text-gray-500 text-xs leading-snug mb-1.5">
                Real stories. Real results. Hear what our clients have to say.
              </p>
              <a href="#" className="inline-flex items-center gap-1 text-gray-900 text-sm font-bold no-underline hover:text-[#0048ff] transition-colors">
                See Reviews
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── SOCIAL PROOF MARQUEE ── */}
      <section className="bg-white border-y border-gray-100 py-10 overflow-hidden">
        <div className="max-w-[1350px] mx-auto ">
          <p className="text-center text-xs font-semibold tracking-[0.18em] uppercase text-gray-400 mb-8">
            Trusted by innovative companies worldwide
          </p>
        </div>

        {/* Marquee track */}
        <div className="max-w-[1350px] mx-auto ">
        <div className="relative flex overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, white, transparent)" }} />
          <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, white, transparent)" }} />

          {/* Scrolling strip — duplicated for seamless loop */}
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-16 flex-shrink-0"
              style={{ animation: "marquee 28s linear infinite", paddingRight: "4rem" }}
            >
              {[
                { name: "Stripe", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" fill="#0048ff"/><path d="M11 9c0-1 .8-1.5 2-1.5 1.5 0 3 .6 3 .6V6s-1.3-.5-3-.5C10.5 5.5 8.5 7 8.5 9.2c0 3.8 5 3.2 5 5 0 1-.8 1.5-2 1.5-1.7 0-3.3-.8-3.3-.8v2.2s1.5.7 3.3.7c2.7 0 4.8-1.3 4.8-3.7C16.3 10 11 10.5 11 9z" fill="white"/></svg> },
                { name: "Shopify", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M16 4s-.2-1-1.5-1c-.7 0-1.3.4-1.8.8C11.5 4 10 4.5 9.5 8L8 8.5 7.5 10l1-.2C8 13 8.5 18 12 19c2.5.7 4.5-1 4.5-1L18 7l-2-.5V4z" stroke="#0048ff" strokeWidth="1.2" fill="none"/><path d="M9.5 8C9.5 8 11 7.5 12.5 7.5" stroke="#0048ff" strokeWidth="1.2" strokeLinecap="round"/></svg> },
                { name: "Notion", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#0048ff" strokeWidth="1.3" fill="none"/><path d="M7 8h6M7 12h8M7 16h5" stroke="#0048ff" strokeWidth="1.3" strokeLinecap="round"/></svg> },
                { name: "Figma", icon: <svg width="24" height="28" viewBox="0 0 24 32" fill="none"><rect x="2" y="2" width="10" height="10" rx="5" fill="#0048ff" opacity="0.7"/><rect x="2" y="12" width="10" height="10" rx="5" stroke="#0048ff" strokeWidth="1.3" fill="none"/><rect x="2" y="22" width="10" height="8" rx="4" stroke="#0048ff" strokeWidth="1.3" fill="none"/><rect x="12" y="2" width="10" height="10" rx="5" stroke="#0048ff" strokeWidth="1.3" fill="none"/><circle cx="17" cy="17" r="5" fill="#0048ff" opacity="0.5"/></svg> },
                { name: "Slack", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="2" y="9" width="5" height="5" rx="2.5" fill="#0048ff" opacity="0.4"/><rect x="9" y="2" width="5" height="5" rx="2.5" fill="#0048ff" opacity="0.6"/><rect x="9" y="9" width="5" height="5" rx="2.5" fill="#0048ff"/><rect x="17" y="9" width="5" height="5" rx="2.5" fill="#0048ff" opacity="0.4"/><rect x="9" y="17" width="5" height="5" rx="2.5" fill="#0048ff" opacity="0.6"/></svg> },
                { name: "Linear", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0048ff" strokeWidth="1.3" fill="none"/><path d="M7 17L17 7M12 7h5v5" stroke="#0048ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { name: "Vercel", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3L22 20H2L12 3Z" fill="#0f1c3f"/></svg> },
                { name: "GitHub", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7C6.7 19.9 6.1 18 6.1 18c-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.7.9.7 1.9V21c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z" fill="#0f1c3f"/></svg> },
                { name: "Jira", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3L21 12l-9 9" stroke="#0048ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M12 12L3 3" stroke="#0048ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/></svg> },
                { name: "Webflow", icon: <svg width="32" height="24" viewBox="0 0 40 24" fill="none"><path d="M4 18L12 6l5 8 4-5 8 9" stroke="#0048ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> },
                { name: "HubSpot", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill="#0048ff" opacity="0.7"/><circle cx="12" cy="4" r="2" fill="#0048ff"/><circle cx="12" cy="20" r="2" fill="#0048ff"/><circle cx="4" cy="12" r="2" fill="#0048ff"/><circle cx="20" cy="12" r="2" fill="#0048ff"/></svg> },
                { name: "Twilio", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0048ff" strokeWidth="1.3" fill="none"/><circle cx="9" cy="9" r="1.8" fill="#0048ff"/><circle cx="15" cy="9" r="1.8" fill="#0048ff"/><circle cx="9" cy="15" r="1.8" fill="#0048ff"/><circle cx="15" cy="15" r="1.8" fill="#0048ff"/></svg> },
              ].map(({ name, icon }) => (
                <div key={name} className="flex items-center gap-2.5 flex-shrink-0 opacity-55 hover:opacity-100 transition-opacity cursor-default">
                  {icon}
                  <span className="text-sm font-semibold text-[#0f1c3f] whitespace-nowrap tracking-tight">{name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        </div>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── OUR SERVICES SECTION ── */}
      <section className="bg-white py-10 px-6">
        <div className="max-w-[1350px] mx-auto">

          {/* Header */}
          <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight mb-3">Our Services</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[480px] mb-14">
            We craft bold digital solutions that drive growth. From concept to launch, solving real-world problems with precision and creativity.
          </p>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 — AI */}
            <div className="relative rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] overflow-hidden flex flex-col" style={{ minHeight: "380px" }}>
              <div className="p-7 pb-0">
                <h3 className="text-lg font-bold text-[#0f1c3f] mb-3">Artificial Intelligence</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We develop iOS and Android apps using cross-platform technologies for wider reach and consistent performance, enhanced with AI and ML integration for smarter user experiences.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center pb-4 pt-4 relative" style={{ minHeight: "180px" }}>
                <div className="relative w-52 h-44">
                  <Image src="/figures/ai-fig.png" alt="AI" fill className="object-contain drop-shadow-xl" sizes="208px" />
                </div>
              </div>
            </div>

            {/* Card 2 — App Development */}
            <div className="relative rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] overflow-hidden flex flex-col" style={{ minHeight: "380px" }}>
              <div className="p-7 pb-0">
                <h3 className="text-lg font-bold text-[#0f1c3f] mb-3">App Development</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  iOS &amp; Android app development with seamless cross-platform compatibility. Smart solutions powered by AI integration.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center pb-4 pt-4 relative" style={{ minHeight: "180px" }}>
                <div className="relative w-52 h-44">
                  <Image src="/figures/app dev.png" alt="App Development" fill className="object-contain drop-shadow-xl" sizes="208px" />
                </div>
              </div>
            </div>

            {/* Card 3 — Web Development */}
            <div className="relative rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] overflow-hidden flex flex-col" style={{ minHeight: "380px" }}>
              <div className="p-7 pb-0">
                <h3 className="text-lg font-bold text-[#0f1c3f] mb-3">Web Development</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We create custom websites and web apps, offer tailored e-commerce solutions, and build with CMS and no-code platforms for faster, flexible development.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center pb-4 pt-4 relative" style={{ minHeight: "180px" }}>
                <div className="relative w-52 h-44">
                  <Image src="/figures/webdev.png" alt="Web Development" fill className="object-contain drop-shadow-xl" sizes="208px" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ── MORE THAN JUST SERVICES ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1350px] mx-auto">

          {/* Header */}
          <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight mb-3">More Than Just Services</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[520px] mb-12">
            We go beyond basic services — offering long-term support, flexible payments, expert teams, and scalable solutions. Every project is designed with care to ensure value, growth, and lasting impact for our clients.
          </p>

          {/* Top row — 1/3 + 2/3 */}
          <div className="flex flex-col md:flex-row gap-5 mb-5">

            {/* Affordable Services — 1/3 */}
            <div className="relative rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] overflow-hidden flex flex-col md:w-1/3" style={{ minHeight: "320px" }}>
              <div className="p-7 pb-0">
                <h3 className="text-lg font-bold text-[#0f1c3f] mb-2">Affordable Services</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[500px]">
                  We believe great technology shouldn&apos;t come with a hefty price tag. Our pricing is transparent, competitive, and tailored to your unique goals. Whether you&apos;re a startup or enterprise, we scale to fit your budget.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center pb-6 pt-4">
                <div className="relative w-64 h-64">
                  <Image src="/figures/coin.png" alt="Affordable Services" fill className="object-contain drop-shadow-xl" sizes="256px" />
                </div>
              </div>
            </div>

            {/* Scalable Solutions — 2/3 */}
            <div className="relative rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] overflow-hidden flex flex-col md:w-2/3" style={{ minHeight: "320px" }}>
              <div className="p-7 pb-0">
                <h3 className="text-lg font-bold text-[#0f1c3f] mb-2">Scalable Solutions</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[500px]">
                  We don&apos;t just build for today — we build for growth. Our apps, websites, and AI tools are designed to evolve with your needs. So as you expand, your tech will be ready to scale with you. So as you expand, your tech will be ready to scale with you.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center pb-6 pt-4">
                <div className="relative w-[700px] h-64 mt-5">
                  <Image src="/figures/puzzle.png" alt="Scalable Solutions" fill className="object-contain drop-shadow-xl" sizes="384px" />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom row — 3 smaller cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Flexible Payment Plans */}
            <div className="relative rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] overflow-hidden flex flex-col" style={{ minHeight: "300px" }}>
              <div className="p-7 pb-0">
                <h3 className="text-lg font-bold text-[#0f1c3f] mb-2">Flexible Payment Plans</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We offer customized payment options to ease your financial planning. Split payments, milestone-based billing, or subscription models — you choose what works.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center pb-6 pt-4">
                <div className="relative w-56 h-44">
                  <Image src="/figures/credit card.png" alt="Flexible Payment Plans" fill className="object-contain drop-shadow-xl" sizes="176px" />
                </div>
              </div>
            </div>

            {/* Lifetime Support */}
            <div className="relative rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] overflow-hidden flex flex-col" style={{ minHeight: "300px" }}>
              <div className="p-7 pb-0">
                <h3 className="text-lg font-bold text-[#0f1c3f] mb-2">Lifetime Support</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Our relationship doesn&apos;t end at project delivery. We offer ongoing support, updates, and guidance as your product evolves. Think of us as your long-term tech partner, not just a vendor.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center pb-6 pt-4">
                <div className="relative w-56 h-44">
                  <Image src="/figures/infinity.png" alt="Lifetime Support" fill className="object-contain drop-shadow-xl" sizes="176px" />
                </div>
              </div>
            </div>

            {/* Expert Match */}
            <div className="relative rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] overflow-hidden flex flex-col" style={{ minHeight: "300px" }}>
              <div className="p-7 pb-0">
                <h3 className="text-lg font-bold text-[#0f1c3f] mb-2">Expert Match</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We match each project with the right experts from our trusted network. Every developer, designer, or strategist is carefully chosen for fit and expertise. That means higher efficiency and better results, every time.
                </p>
              </div>
              <div className="flex-1 relative mt-4" style={{ minHeight: "160px" }}>
                <Image src="/figures/plug.png" alt="Expert Match" fill className="object-contain drop-shadow-xl relative!" sizes="100%" />
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* ── PROJECTS SECTION ── */}
      <section className="bg-white py-10 overflow-hidden">
        <style>{`
          .card-effect-02 {
            clip-path: polygon(100% 0, 100% 88%, 88% 100%, 0 100%, 0 0);
            background-color: rgba(0, 72, 255, 0.06);
            transition: background 0.4s ease;
            border-radius: 16px;
          }
          .card-effect-02:hover {
            background-color: rgba(0, 72, 255, 0.14);
          }
          .proj-slider {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .proj-slider::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Header — constrained + padded */}
        <div className="max-w-[1350px] mx-auto pr-6 mb-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight mb-3">Featured Projects</h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[480px]">
                Real products we&apos;ve designed, built, and shipped — from AI communication tools to healthcare platforms.
              </p>
            </div>
            {/* Scroll arrows */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => slide("left")}
                disabled={!canSlideLeft}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0048ff]/20 bg-[#f5f8ff] text-[#0048ff] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#0048ff] hover:text-white transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </button>
              <button
                onClick={() => slide("right")}
                disabled={!canSlideRight}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0048ff]/20 bg-[#f5f8ff] text-[#0048ff] disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#0048ff] hover:text-white transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Slider track */}
        <div className="max-w-[1350px] mx-auto relative">
          {/* Right fade edge */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10"
            style={{ background: "linear-gradient(to left, white 10%, transparent)" }} />

          <div
            ref={sliderRef}
            onScroll={checkSlide}
            className="proj-slider flex gap-5 overflow-x-scroll pr-6"
          >
            {projects.map((project, i) => (
              <a
                key={project.title}
                href={`/project/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex-shrink-0 no-underline"
                style={{
                  opacity: 0,
                  animation: `fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s both`,
                }}
              >
                <div
                  className="card-effect-02 relative h-[500px] cursor-pointer"
                  style={{ width: "calc((min(100vw, 1350px) - 3rem - 2.5rem) / 3)" }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Inner clipped surface */}
                  <div
                    className="relative w-full h-full flex flex-col overflow-hidden bg-[#f5f8ff]"
                    style={{
                      clipPath: "polygon(100% 0, 100% 88%, 88% 100%, 0 100%, 0 0)",
                      borderRadius: "16px",
                    }}
                  >
                    {/* Subtle bottom fade over image */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/0 via-white/0 to-[#0f1c3f]/50 pointer-events-none" />

                    {/* Project image — bottom 58% with inset margins */}
                    <div className="absolute bottom-3 left-4 right-4 h-[54%] z-10">
                      <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        className="object-contain transition-transform duration-500 ease-out"
                        style={{ transform: hoveredCard === i ? "scale(1.06)" : "scale(1)" }}
                        sizes="33vw"
                      />
                    </div>

                    {/* Text content */}
                    <div className="relative z-20 p-7 flex flex-col h-full">
                      {/* Category pill */}
                      <span className="self-start text-[11px] font-semibold px-3 py-1 rounded-full bg-[#0048ff]/10 text-[#0048ff] border border-[#0048ff]/20 mb-4">
                        {project.category}
                      </span>

                      <p className="text-2xl font-bold text-[#0f1c3f] mb-2 leading-snug">{project.title}</p>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{project.description}</p>

                      {/* Arrow — top right corner */}
                      <div className="absolute top-6 right-7 z-30">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300"
                          style={{
                            background: hoveredCard === i ? "#0048ff" : "rgba(0,72,255,0.08)",
                            border: `1px solid ${hoveredCard === i ? "#0048ff" : "rgba(0,72,255,0.2)"}`,
                          }}
                        >
                          <svg
                            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round"
                            style={{ color: hoveredCard === i ? "white" : "#0048ff" }}
                          >
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <ComplianceCovered />
      <FAQ />
      <Contact />

    </main>
  );
}
