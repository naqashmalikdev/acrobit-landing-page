"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, useMotionValueEvent, AnimatePresence, motion } from "framer-motion";
import { useContactModal } from "@/app/components/ContactModalContext";

const servicesMenu: Record<string, { title: string; badge?: string; desc: string; href?: string }[]> = {
  "AI & Data Innovation": [
    { title: "AI Agents", badge: "NEW", desc: "Build autonomous AI agents that handle workflows, decisions, support, and operations with minimal human intervention.", href: "/services/ai-agents" },
    { title: "Gen AI Consulting & Workshops", desc: "Help teams understand, adopt, and implement generative AI through strategy sessions, consulting, and hands-on workshops.", href: "/services/gen-ai-consulting" },
    { title: "Intelligent Automations", desc: "Automate repetitive business processes using AI, integrations, APIs, and workflow orchestration.", href: "/services/intelligent-automation" },
    { title: "AI PoC & MVP Development", desc: "Rapidly build AI-powered proof of concepts and MVPs to validate ideas before full-scale investment.", href: "/services/ai-poc-mvp" },
  ],
  "Engineering": [
    { title: "UX/UI Design", desc: "Design user experiences that reduce friction, improve usability, and increase engagement.", href: "/services/ui-ux-design" },
    { title: "PoC Development", desc: "Validate technical feasibility and product direction with rapid proof-of-concept development.", href: "/services/poc-development" },
    { title: "Product Development", desc: "Build scalable web, mobile, and enterprise-grade digital products with strong architecture.", href: "/services/product-development" },
    { title: "Application Development", desc: "Develop secure, cloud-enabled applications with modern integrations and AI capabilities.", href: "/services/application-development" },
    { title: "AI Software Development", desc: "Engineer AI-powered software solutions with scalable infrastructure, clean data pipelines, and security-first practices.", href: "/services/ai-software-development" },
  ],
  "Advisory": [
    { title: "Discovery Workshops", desc: "Align stakeholders, validate assumptions, and identify risks before development begins.", href: "/services/discovery-workshops" },
    { title: "Technical Feasibility Study", desc: "Assess scalability, architecture, constraints, and implementation risks for your product idea.", href: "/services/technical-feasibility-study" },
    { title: "Product Strategy", desc: "Define product vision, roadmap, positioning, and user-focused growth strategies.", href: "/services/product-strategy" },
  ],
  "Engagement Model": [
    { title: "Dedicated Teams", badge: "NEW", desc: "Cost-effective dedicated engineering teams across AI, cloud, and product — assembled in 3–14 days with flexible scaling.", href: "/dedicated-teams" },
    { title: "Offshore Development Center", desc: "A fully managed offshore engineering center built around your product — 60% lower costs, global talent, multiple operating models.", href: "/offshore-development-center" },
    { title: "Fixed-Price Projects", desc: "Scope locked, cost agreed, delivered on time. The engagement model for teams who need full budget certainty from day one.", href: "/fixed-price-projects" },
    { title: "Hybrid Delivery Model", desc: "Fixed-price discipline where you need it, dedicated team flexibility where you don't — one continuous engagement across your entire roadmap.", href: "/hybrid-delivery-model" },
  ],
};

const companyMenu = [
  { title: "About Us", desc: "Our story, mission, and the team behind Acrobit.", href: "/about" },
  { title: "AI-First Company", desc: "How we embed AI at the core of every product and platform we build.", href: "/ai-first" },
  { title: "Careers", desc: "Join a team building software that changes industries.", href: "/careers" },
];

const techIcons = [
  { src: "/icons/next js.webp", alt: "Next.js" },
  { src: "/icons/ts.png", alt: "TypeScript" },
  { src: "/icons/node js.png", alt: "Node.js" },
  { src: "/icons/fast api.png", alt: "FastAPI" },
  { src: "/icons/open ai.webp", alt: "OpenAI" },
  { src: "/icons/supabase.webp", alt: "Supabase" },
  { src: "/icons/postgresql.webp", alt: "PostgreSQL" },
  { src: "/icons/tailwind.webp", alt: "Tailwind" },
];

type MenuKey = "services" | "company" | null;

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scaleY: 0.97 },
  visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.2, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -6, scaleY: 0.97, transition: { duration: 0.15, ease: "easeIn" as const } },
};

const panelVariants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.18, ease: "easeOut" as const } },
  exit: { opacity: 0, x: -8, transition: { duration: 0.12, ease: "easeIn" as const } },
};

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [activeCategory, setActiveCategory] = useState<keyof typeof servicesMenu>("AI & Data Innovation");
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<"services" | "company" | null>(null);
  const { openModal } = useContactModal();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setNavScrolled(y > 10));

  const toggle = (key: MenuKey) => setOpenMenu((prev) => (prev === key ? null : key));
  const close = () => setOpenMenu(null);
  const closeMobile = () => { setMobileOpen(false); setMobileExpanded(null); };

  return (
    <div className="sticky top-0 z-50">
      <nav
        className="bg-white border-b border-gray-100 transition-shadow duration-300"
        style={{ boxShadow: navScrolled ? "0 2px 24px rgba(0,0,0,0.08)" : "none" }}
      >
        <div className="max-w-[1350px] mx-auto px-4 lg:px-0 py-4 flex items-center justify-between relative">
          <Link href="/" className="no-underline select-none flex items-center">
            <Image src="/logo/dark-acrobit-word.png" alt="Acrobit" width={120} height={30} className="object-contain" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {(["services", "company"] as MenuKey[]).map((key) =>
              key === null ? null : (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer p-0 capitalize ${
                    openMenu === key ? "text-[#0048ff]" : "text-[#1a2b4a] hover:text-[#0048ff]"
                  }`}
                >
                  {key}
                  <motion.svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    animate={{ rotate: openMenu === key ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </motion.svg>
                </button>
              )
            )}
            <Link href="/customers" className="text-[#1a2b4a] text-sm font-medium no-underline hover:text-[#0048ff] transition-colors">Customers</Link>
            <Link href="/careers" className="text-[#1a2b4a] text-sm font-medium no-underline hover:text-[#0048ff] transition-colors">Careers</Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal()}
              className="btn-shimmer bg-[#0048ff] text-white px-5 py-[9px] rounded-md text-xs font-semibold hover:bg-[#0035cc] transition-colors cursor-pointer"
            >
              Let&apos;s Talk
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 bg-transparent border-none cursor-pointer p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-0.5 w-5 bg-[#0f1c3f] rounded-full origin-center"
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 w-5 bg-[#0f1c3f] rounded-full"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block h-0.5 w-5 bg-[#0f1c3f] rounded-full origin-center"
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>

          <div
            className="absolute right-0 top-0 h-full w-[340px] pointer-events-none hidden lg:block"
            style={{
              background: "radial-gradient(ellipse at right center, rgba(80,120,255,0.22) 0%, rgba(100,140,255,0.10) 50%, transparent 80%)",
              filter: "blur(12px)",
            }}
          />
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white border-b border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-1">

              {/* Services accordion */}
              <button
                onClick={() => setMobileExpanded((v) => (v === "services" ? null : "services"))}
                className="flex items-center justify-between w-full text-left text-sm font-medium text-[#1a2b4a] py-2.5 px-1 bg-transparent border-none cursor-pointer"
              >
                Services
                <motion.svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  animate={{ rotate: mobileExpanded === "services" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {mobileExpanded === "services" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-3 border-l-2 border-[#0048ff] ml-1 mb-1"
                  >
                    {Object.entries(servicesMenu).map(([cat, items]) => (
                      <div key={cat} className="mb-3">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-1 mb-1.5">{cat}</p>
                        {items.map(({ title, badge, href }) => (
                          <Link
                            key={title}
                            href={href ?? "#"}
                            onClick={closeMobile}
                            className="flex items-center gap-2 text-sm text-[#0f1c3f] py-1.5 px-1 no-underline hover:text-[#0048ff] transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-sm bg-[#0048ff] flex-shrink-0" />
                            {title}
                            {badge && <span className="text-[9px] font-bold bg-[#e8eeff] text-[#0048ff] px-1.5 py-0.5 rounded-full">{badge}</span>}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Company accordion */}
              <button
                onClick={() => setMobileExpanded((v) => (v === "company" ? null : "company"))}
                className="flex items-center justify-between w-full text-left text-sm font-medium text-[#1a2b4a] py-2.5 px-1 bg-transparent border-none cursor-pointer"
              >
                Company
                <motion.svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  animate={{ rotate: mobileExpanded === "company" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {mobileExpanded === "company" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-3 border-l-2 border-[#0048ff] ml-1 mb-1"
                  >
                    {companyMenu.map(({ title, href }) => (
                      <Link
                        key={title}
                        href={href ?? "#"}
                        onClick={closeMobile}
                        className="flex items-center gap-2 text-sm text-[#0f1c3f] py-1.5 px-1 no-underline hover:text-[#0048ff] transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#0048ff] flex-shrink-0" />
                        {title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link href="/customers" onClick={closeMobile} className="text-sm font-medium text-[#1a2b4a] no-underline hover:text-[#0048ff] transition-colors py-2.5 px-1">Customers</Link>
              <Link href="/careers" onClick={closeMobile} className="text-sm font-medium text-[#1a2b4a] no-underline hover:text-[#0048ff] transition-colors py-2.5 px-1">Careers</Link>

              <div className="pt-2 border-t border-gray-100 mt-1">
                <button
                  onClick={() => { closeMobile(); openModal(); }}
                  className="btn-shimmer block w-full text-center bg-[#0048ff] text-white px-5 py-3 rounded-md text-sm font-semibold hover:bg-[#0035cc] transition-colors cursor-pointer"
                >
                  Let&apos;s Talk
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop mega menus — rendered inside sticky wrapper so they sit below the navbar */}
      <div className="relative z-50 hidden lg:block">
        <AnimatePresence>
          {openMenu && (
            <motion.div
              key="backdrop"
              className="absolute left-0 right-0 z-0 bg-black/20 pointer-events-auto"
              style={{ top: 0, height: "100vh" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={close}
            />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {openMenu === "services" && (
            <motion.div
              key="services"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ transformOrigin: "top center" }}
              className="absolute left-0 right-0 z-10 bg-white shadow-2xl border-t border-gray-100"
            >
              <div className="max-w-[1350px] mx-auto flex" style={{ minHeight: "420px" }}>
                {/* Sidebar */}
                <div className="w-[240px] flex-shrink-0 bg-white border-r border-gray-100 py-6 flex flex-col justify-between">
                  <div>
                    {(Object.keys(servicesMenu) as (keyof typeof servicesMenu)[]).map((cat) => (
                      <button
                        key={cat}
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-6 py-3 text-sm font-medium flex items-center justify-between transition-colors cursor-pointer border-none ${
                          activeCategory === cat ? "bg-[#0048ff] text-white" : "text-[#1a2b4a] hover:bg-gray-50"
                        }`}
                      >
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
                    <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-3">Top Technologies</p>
                    <div className="flex flex-wrap items-center gap-3">
                      {techIcons.map(({ src, alt }) => (
                        <img key={alt} src={src} alt={alt} title={alt} className="h-5 w-5 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Items panel */}
                <div className="flex-1 px-10 py-8 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      variants={panelVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="grid grid-cols-2 gap-x-12 gap-y-6"
                    >
                      {servicesMenu[activeCategory].map(({ title, badge, desc, href }) => (
                        <Link key={title} href={href ?? "#"} onClick={close} className="group no-underline flex gap-3">
                          <span className="mt-1 w-3 h-3 flex-shrink-0 bg-[#0048ff] rounded-sm" />
                          <div>
                            <p className="text-sm font-semibold text-[#0f1c3f] group-hover:text-[#0048ff] transition-colors flex items-center gap-2">
                              {title}
                              {badge && <span className="text-[10px] font-bold bg-[#e8eeff] text-[#0048ff] px-2 py-0.5 rounded-full">{badge}</span>}
                            </p>
                            <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{desc}</p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Spotlight — AI Agents */}
                <div className="w-[300px] flex-shrink-0 bg-[#f0f3fa] py-7 px-5 flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(0,72,255,0.12) 0%,transparent 70%)", filter: "blur(24px)" }} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">Featured Service</span>
                      <span className="text-[9px] font-bold bg-[#0048ff] text-white px-2 py-0.5 rounded-full tracking-wider">NEW</span>
                    </div>
                    <div className="rounded-xl bg-white border border-gray-100 p-4 mb-4" style={{ boxShadow: "0 2px 16px rgba(0,72,255,0.07)" }}>
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-[#0048ff] flex items-center justify-center flex-shrink-0">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-[#0f1c3f]">SupportAgent v2</p>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-[9px] text-gray-400">Live · Processing</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-end">
                          <div className="bg-[#f5f8ff] text-[#0f1c3f] text-[10px] px-2.5 py-1.5 rounded-lg rounded-tr-sm max-w-[85%] leading-relaxed">Refund request #8821</div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-[#0048ff] text-white text-[10px] px-2.5 py-1.5 rounded-lg rounded-tl-sm max-w-[85%] leading-relaxed">Approved. $49 back in 2–3 days.</div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-[#e8eeff] text-[#0048ff] text-[10px] px-2.5 py-1.5 rounded-lg rounded-tl-sm max-w-[85%] leading-relaxed">Confirmation sent. Ticket closed ✓</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1 border-t border-gray-100 pt-3">
                        {[["1.2s", "Response"], ["99.1%", "Accuracy"], ["0", "Escalations"]].map(([v, l]) => (
                          <div key={l} className="text-center">
                            <p className="text-[11px] font-bold text-[#0048ff]">{v}</p>
                            <p className="text-[8px] text-gray-400 uppercase tracking-wider leading-tight">{l}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-bold text-[#0f1c3f] leading-snug mb-1">Autonomous AI Agents</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-4">Handle workflows, decisions & support end-to-end with minimal human intervention.</p>
                    <div className="flex items-center gap-2 mb-5">
                      {[["200+", "Deployed"], ["98%", "Accuracy"], ["<80ms", "Latency"]].map(([v, l]) => (
                        <div key={l} className="flex-1 text-center bg-white border border-gray-100 rounded-lg py-2">
                          <p className="text-xs font-bold text-[#0048ff]">{v}</p>
                          <p className="text-[8px] text-gray-400 uppercase tracking-wider">{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link href="/services/ai-agents" onClick={close}
                    className="relative z-10 flex items-center justify-between bg-[#0048ff] hover:bg-[#0035cc] transition-colors text-white text-[11px] font-semibold px-4 py-2.5 rounded-lg no-underline group">
                    Explore AI Agents
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {openMenu === "company" && (
            <motion.div
              key="company"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ transformOrigin: "top center" }}
              className="absolute left-0 right-0 z-10 bg-white shadow-2xl border-t border-gray-100"
            >
              <div className="max-w-[1350px] mx-auto px-10 py-10">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-6">Company</p>
                <div className="grid grid-cols-4 gap-x-12 gap-y-7">
                  {companyMenu.map(({ title, desc, href }) => (
                    <Link key={title} href={href ?? "#"} className="group no-underline flex gap-3">
                      <span className="mt-1 w-3 h-3 flex-shrink-0 bg-[#0048ff] rounded-sm" />
                      <div>
                        <p className="text-sm font-semibold text-[#0f1c3f] group-hover:text-[#0048ff] transition-colors">{title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
