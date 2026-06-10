"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactButton from "@/app/components/ContactButton";
import { ArrowUpRight } from "lucide-react";

function Reveal({ children, delay = 0, className = "", y = 24 }: {
  children: React.ReactNode; delay?: number; className?: string; y?: number;
}) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="rounded-2xl border overflow-hidden transition-all duration-200"
      style={{ border: isOpen ? "1.5px solid rgba(0,72,255,0.25)" : "1.5px solid #e5e7eb", background: isOpen ? "rgba(0,72,255,0.03)" : "#fff" }}>
      <button onClick={onClick} className="w-full flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 text-left gap-4 bg-transparent border-none cursor-pointer">
        <span className="text-sm sm:text-[15px] font-semibold leading-snug text-[#0f1c3f]">{q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f1c3f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div style={{ maxHeight: isOpen ? 500 : 0, overflow: "hidden", transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <p className="px-5 sm:px-7 pb-5 sm:pb-6 text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

const categories = [
  {
    label: "Engagement Models",
    slug: "engagement",
    faqs: [
      { q: "What is a fixed-price engagement model?", a: "A fixed-price engagement means scope, deliverables, timeline, and total cost are agreed upfront. The project is delivered for that set price — giving you clarity and full budget predictability." },
      { q: "When does fixed-price make sense?", a: "Fixed-price works best when requirements are well-defined and unlikely to change significantly. If you have a clear brief, stable scope, and need cost certainty, this is typically the right model." },
      { q: "What happens if requirements change mid-project?", a: "Changes outside the agreed scope are handled through a formal change request process. Any additions are assessed for impact on cost and timeline before being approved — keeping everything transparent." },
      { q: "Who bears the risk of overruns — cost or timeline?", a: "Under a fixed-price model, we absorb the risk of cost overruns on work within the agreed scope. Timeline extensions caused by changes you introduce are handled through change requests." },
      { q: "What kind of projects are best suited for fixed-price?", a: "Feature builds, UI/UX redesigns, MVP development, module builds, maintenance packages, and contained web or mobile applications. Essentially any project with a stable, well-documented scope." },
      { q: "Can we transition to another model after a fixed-price project?", a: "Absolutely. Many clients use a fixed-price engagement to validate direction, then transition into a dedicated team or ODC model for ongoing development. We make that transition seamless." },
      { q: "What is the hybrid delivery model?", a: "The hybrid model blends fixed-price, dedicated team, and on-demand engagement modes within a single continuous partnership. You get cost certainty where scope is defined, and flexibility where it isn't — all through one team with no re-onboarding." },
      { q: "How quickly can a dedicated team be assembled?", a: "Typically 3–14 days, depending on the skills required. We maintain a pre-vetted pool of engineers, designers, QA specialists, and product managers ready to be matched to your stack and goals." },
      { q: "What is an Offshore Development Center (ODC)?", a: "An ODC is a fully managed offshore engineering unit built around your product. Acrobit sets up, operates, and — if required — transfers ownership of a dedicated team that works exclusively on your systems at 60% lower operating cost than comparable onshore capacity." },
    ],
  },
  {
    label: "Working With Us",
    slug: "working",
    faqs: [
      { q: "Will I have full cost and schedule visibility before work starts?", a: "Yes. Before a single line of code is written, you receive a detailed project plan mapping deliverables, timelines, costs, and milestones. Nothing starts without your sign-off." },
      { q: "How do you ensure quality and delivery?", a: "Through milestone-gated QA, structured code reviews, automated testing pipelines, and defined acceptance criteria agreed at project start. Every deliverable is validated before sign-off." },
      { q: "Does fixed-price simplify project management for me?", a: "Significantly. A stable roadmap means fewer decisions, less overhead, and minimal oversight from your side. You review milestones and approve deliverables — we handle the execution." },
      { q: "Are there drawbacks to fixed-price I should consider?", a: "The model is less suited for exploratory work or rapidly evolving requirements. If your scope is likely to shift, a time-and-material or dedicated team model may serve you better." },
      { q: "How do you handle communication across time zones?", a: "We design communication rhythms, sprint cadences, and escalation paths before kickoff — not after. Shared dashboards, structured standups, and a nearshore coordination layer keep all time zones in sync." },
      { q: "Do you sign NDAs?", a: "Yes. NDA signing is a standard part of every engagement. All our processes comply with ISO 27001 security standards, ensuring your code, data, and IP are protected throughout." },
    ],
  },
  {
    label: "AI & Technology",
    slug: "ai",
    faqs: [
      { q: "Are your engineers trained on AI tooling?", a: "Yes. Every engineer placed through Acrobit uses modern AI tooling as a core part of how they work — not as a gimmick. This means more output per sprint, cleaner code, and faster turnaround on reviews and testing." },
      { q: "What technologies does Acrobit specialize in?", a: "We work across React, Next.js, TypeScript, Node.js, FastAPI, Python, PostgreSQL, Supabase, OpenAI, AWS, Docker, and more. Our teams are matched to your stack specifically — not assigned generically." },
      { q: "Can you build AI agents and automation workflows?", a: "Yes. AI agents and intelligent automation are a core service. We build autonomous systems that handle workflows, decisions, customer support, and operational tasks with minimal human intervention." },
      { q: "Do you offer AI strategy and consulting alongside development?", a: "Yes. Through our Gen AI Consulting & Workshops service, we help teams understand, adopt, and implement generative AI — from strategy sessions and readiness assessments to hands-on implementation." },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({});
  const [activeCategory, setActiveCategory] = useState(categories[0].slug);

  const toggle = (slug: string, i: number) =>
    setOpenItems((prev) => ({ ...prev, [slug]: prev[slug] === i ? null : i }));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100 py-20 sm:py-28 px-4 sm:px-6">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #c0ccee 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.45 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, #ffffff 40%, transparent 100%)" }} />
        <div className="relative max-w-[1350px] mx-auto text-center">
          <motion.p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#0048ff] mb-4"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            / Frequently Asked Questions
          </motion.p>
          <motion.h1 className="font-black text-[#0f1c3f] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.07 }}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
            Everything you need to know<br />
            <span style={{ color: "#0048ff" }}>before we start building.</span>
          </motion.h1>
          <motion.p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}>
            Answers to the most common questions about our engagement models, delivery process, and technology.
          </motion.p>
        </div>
      </section>

      {/* FAQ body */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Sidebar */}
          <div className="lg:w-[240px] flex-shrink-0">
            <div className="sticky top-24 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map(({ label, slug }) => (
                <button
                  key={slug}
                  onClick={() => setActiveCategory(slug)}
                  className="text-left text-sm font-medium px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap border-none cursor-pointer flex-shrink-0"
                  style={{
                    background: activeCategory === slug ? "#0048ff" : "#f5f8ff",
                    color: activeCategory === slug ? "#fff" : "#1a2b4a",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className="flex-1">
            {categories.map(({ label, slug, faqs }) => (
              <div key={slug} className={activeCategory === slug ? "block" : "hidden"}>
                <Reveal className="mb-8">
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-2">/ {label}</p>
                  <h2 className="text-2xl font-medium text-[#0f1c3f] tracking-tight">{label}</h2>
                </Reveal>
                <div className="flex flex-col gap-3">
                  {faqs.map((faq, i) => (
                    <Reveal key={faq.q} delay={i * 0.03}>
                      <FAQItem
                        q={faq.q}
                        a={faq.a}
                        isOpen={openItems[slug] === i}
                        onClick={() => toggle(slug, i)}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f5f8ff] py-14 sm:py-20 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-[1350px] mx-auto">
          <Reveal>
            <motion.div
              className="rounded-3xl border border-[#0048ff]/20 bg-white px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 text-center overflow-hidden relative"
              whileHover={{ boxShadow: "0 0 0 2px rgba(0,72,255,0.25), 0 24px 48px rgba(0,72,255,0.07)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,72,255,0.06) 0%, transparent 60%)" }} />
              <div className="relative">
                <Reveal delay={0}>
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-5">/ Still have questions?</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="font-medium text-[#0f1c3f] tracking-tight max-w-2xl mx-auto mb-5" style={{ fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)", lineHeight: 1.1 }}>
                    We&apos;re happy to walk you through anything.
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto mb-8 sm:mb-9">
                    Talk to us directly — we&apos;ll answer your specific questions and help you find the right engagement model for what you&apos;re building.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <ContactButton className="inline-flex items-center gap-2 bg-[#0048ff] text-white text-sm font-semibold px-7 py-3.5 sm:px-8 sm:py-4 rounded-full hover:bg-[#0035cc] transition-colors">
                        Start the conversation
                        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <ArrowUpRight size={13} strokeWidth={2.5} />
                        </span>
                      </ContactButton>
                    </motion.div>
                    <p className="text-xs text-gray-400 w-full mt-1">Reply within 4 business hours · No spam, ever</p>
                  </div>
                </Reveal>
                <Reveal delay={0.24}>
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-8 pt-7 border-t border-gray-100 w-full">
                    <span className="text-xs text-gray-400">Explore our services:</span>
                    <Link href="/services/ai-software-development" className="text-xs font-semibold text-[#0048ff] hover:underline">AI Development</Link>
                    <span className="text-gray-200 hidden sm:inline">·</span>
                    <Link href="/fixed-price-projects" className="text-xs font-semibold text-[#0048ff] hover:underline">Fixed-Price Projects</Link>
                    <span className="text-gray-200 hidden sm:inline">·</span>
                    <Link href="/dedicated-teams" className="text-xs font-semibold text-[#0048ff] hover:underline">Dedicated Teams</Link>
                    <span className="text-gray-200 hidden sm:inline">·</span>
                    <Link href="/about" className="text-xs font-semibold text-[#0048ff] hover:underline">About Us</Link>
                  </div>
                </Reveal>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
