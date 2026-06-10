"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, useAnimate } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ContactButton from "@/app/components/ContactButton";
import { ArrowUpRight } from "lucide-react";

function Reveal({
  children, delay = 0, className = "", y = 24,
}: {
  children: React.ReactNode; delay?: number; className?: string; y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const sections = [
  {
    num: "01",
    title: "Agreement to Terms",
    body: "By accessing our website or engaging Acrobit for services, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with any part of these terms, you may not use our services. These terms apply to all clients, visitors, and anyone who accesses or uses our services.",
  },
  {
    num: "02",
    title: "Services We Provide",
    body: "Acrobit provides software development, AI consulting, product strategy, and related technology services as described in individual project agreements and statements of work. The scope, timeline, and deliverables for each engagement are defined in a separate contract. These terms govern the general relationship; specific engagements are governed by their respective agreements.",
  },
  {
    num: "03",
    title: "Intellectual Property",
    body: "Upon full payment, clients receive ownership of all custom deliverables created specifically for their project. Acrobit retains ownership of pre-existing tools, frameworks, methodologies, and general-purpose code libraries developed independently. Open-source components remain subject to their respective licences. Portfolio rights (to reference the project publicly) are retained by Acrobit unless explicitly waived in writing.",
  },
  {
    num: "04",
    title: "Client Responsibilities",
    body: "Clients are responsible for providing accurate and complete information needed for project execution, timely feedback and approvals within agreed review windows, proper licensing for any third-party assets or tools provided to Acrobit, and compliance with all applicable laws in their jurisdiction. Delays caused by late client input may affect timelines without constituting a breach by Acrobit.",
  },
  {
    num: "05",
    title: "Payment Terms",
    body: "Payment schedules are defined in individual project agreements. Invoices are due within 14 days of issue unless otherwise agreed. Late payments may incur a 1.5% monthly interest charge. Acrobit reserves the right to pause work on overdue accounts. Disputes about invoices must be raised in writing within 7 days of receipt.",
  },
  {
    num: "06",
    title: "Confidentiality",
    body: "Both parties agree to keep confidential all non-public information shared during the engagement, including business strategies, technical specifications, and client data. This obligation survives termination of the project agreement for a period of 3 years. Acrobit will not disclose your project details without written consent, except as required by law.",
  },
  {
    num: "07",
    title: "Disclaimers & Limitation of Liability",
    body: "Acrobit provides services on an 'as-is' basis and does not guarantee specific business outcomes. Our total liability for any claim arising from an engagement shall not exceed the total fees paid by the client in the preceding 3 months. We are not liable for indirect, consequential, or incidental damages. These limitations apply to the fullest extent permitted by law.",
  },
  {
    num: "08",
    title: "Termination & Governing Law",
    body: "Either party may terminate an engagement with 14 days' written notice. Upon termination, the client owes payment for all work completed to date. These Terms of Service are governed by the laws of the State of Florida, USA. Any disputes shall be resolved through binding arbitration in Orange County, Florida, before pursuing litigation.",
  },
];

function TermsHero() {
  const [leftScope, animateLeft] = useAnimate();
  const [rightScope, animateRight] = useAnimate();

  useEffect(() => {
    async function runLeft() {
      await animateLeft("#cursor-left", { x: -40, y: 40, opacity: 0 }, { duration: 0 });
      await animateLeft("#pill-left", { opacity: 0, scale: 0.6 }, { duration: 0 });
      await animateLeft("#ripple-left", { opacity: 0, scale: 0.4 }, { duration: 0 });
      await animateLeft("#cursor-left", { x: 0, y: 0, opacity: 1 }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
      await animateLeft("#cursor-left", { scale: 0.72 }, { duration: 0.12, ease: "easeIn" });
      animateLeft("#cursor-left", { scale: 1 }, { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
      animateLeft("#pill-left", { opacity: 1, scale: 1 }, { duration: 0.35, ease: [0.16, 1, 0.3, 1] });
      await animateLeft("#ripple-left", { opacity: [0.7, 0], scale: [0.4, 1] }, { duration: 0.35, ease: "easeOut" });
      animateLeft("#cursor-left", { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut" });
      animateLeft("#pill-left", { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut" });
    }
    async function runRight() {
      await animateRight("#cursor-right", { x: 40, y: 40, opacity: 0 }, { duration: 0 });
      await animateRight("#pill-right", { opacity: 0, scale: 0.6 }, { duration: 0 });
      await animateRight("#ripple-right", { opacity: 0, scale: 0.4 }, { duration: 0 });
      await new Promise(r => setTimeout(r, 300));
      await animateRight("#cursor-right", { x: 0, y: 0, opacity: 1 }, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
      await animateRight("#cursor-right", { scale: 0.72 }, { duration: 0.12, ease: "easeIn" });
      animateRight("#cursor-right", { scale: 1 }, { duration: 0.22, ease: [0.16, 1, 0.3, 1] });
      animateRight("#pill-right", { opacity: 1, scale: 1 }, { duration: 0.35, ease: [0.16, 1, 0.3, 1] });
      await animateRight("#ripple-right", { opacity: [0.7, 0], scale: [0.4, 1] }, { duration: 0.35, ease: "easeOut" });
      animateRight("#cursor-right", { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 });
      animateRight("#pill-right", { y: [0, -10, 0] }, { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 });
    }
    runLeft();
    runRight();
  }, [animateLeft, animateRight]);

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #c0ccee 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.6 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 72% 55% at 50% 38%, #ffffff 38%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[28%] pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)" }} />

      <div ref={leftScope} className="absolute hidden sm:block select-none z-20" style={{ left: "clamp(20px, 6vw, 100px)", top: "clamp(160px, 22vw, 260px)" }}>
        <div id="ripple-left" className="absolute rounded-full bg-[#0048ff]/40 pointer-events-none" style={{ width: 14, height: 14, bottom: -10, right: 4, opacity: 0, transform: "scale(0.4)" }} />
        <div id="pill-left" className="flex items-center gap-2 bg-[#0048ff] rounded-full px-4 py-2.5" style={{ boxShadow: "0 4px 24px rgba(0,72,255,0.35)", opacity: 0 }}>
          <span className="text-xs font-bold text-white whitespace-nowrap">Terms of Service</span>
        </div>
        <svg id="cursor-left" width="26" height="26" viewBox="0 0 24 24" fill="#0f1c3f" stroke="white" strokeWidth="1.5" strokeLinejoin="round" className="absolute -bottom-5 right-2" style={{ opacity: 0 }}>
          <path d="M4 2l16 9-9 1-4 8z" />
        </svg>
      </div>

      <div ref={rightScope} className="absolute hidden sm:block select-none z-20" style={{ right: "clamp(20px, 6vw, 100px)", top: "clamp(130px, 18vw, 220px)" }}>
        <div id="ripple-right" className="absolute rounded-full bg-[#0048ff]/40 pointer-events-none" style={{ width: 14, height: 14, bottom: -10, left: 6, opacity: 0, transform: "scale(0.4)" }} />
        <div id="pill-right" className="flex items-center gap-2 bg-[#e8eeff] border border-[#0048ff]/20 rounded-full px-4 py-2.5" style={{ boxShadow: "0 4px 24px rgba(0,72,255,0.12)", opacity: 0 }}>
          <span className="w-2 h-2 rounded-full bg-[#0048ff] flex-shrink-0" />
          <span className="text-xs font-bold text-[#0048ff] whitespace-nowrap">Effective: May 2026</span>
        </div>
        <svg id="cursor-right" width="26" height="26" viewBox="0 0 24 24" fill="#0f1c3f" stroke="white" strokeWidth="1.5" strokeLinejoin="round" className="absolute -bottom-5 left-3" style={{ opacity: 0 }}>
          <path d="M4 2l16 9-9 1-4 8z" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 pt-20 pb-14 text-center">
        <motion.p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#0048ff] mb-3" style={{ opacity: 0.7 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 0.7, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          / Legal
        </motion.p>

        <motion.h1 className="font-black text-[#0f1c3f] leading-[1.07] tracking-tight max-w-3xl mb-5" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.09, ease: [0.16, 1, 0.3, 1] }}>
          Clear Rules,<br />
          <span style={{ color: "#0048ff" }}>No Surprises.</span>
        </motion.h1>

        <motion.p className="text-[#6b7280] leading-relaxed max-w-md mb-7" style={{ fontSize: "clamp(0.88rem, 1.2vw, 1rem)" }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
          Our terms are written to protect both sides fairly. Read them before you engage — and reach out if anything is unclear.
        </motion.p>

        <motion.div className="flex items-center gap-4 flex-wrap justify-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}>
          <Link href="/privacy" className="inline-flex items-center gap-2 bg-[#f5f8ff] border border-[#0048ff]/20 text-[#0048ff] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#e8eeff] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/cookies" className="inline-flex items-center gap-2 bg-[#f5f8ff] border border-[#0048ff]/20 text-[#0048ff] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#e8eeff] transition-colors">
            Cookie Policy
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <TermsHero />

      {/* Quick nav */}
      <section className="bg-[#f5f8ff] border-y border-gray-100 py-5 px-4 sm:px-6 overflow-x-auto">
        <div className="max-w-[1350px] mx-auto flex items-center gap-2 flex-nowrap">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 flex-shrink-0 mr-3">Jump to:</span>
          {sections.map((s) => (
            <a
              key={s.num}
              href={`#section-${s.num}`}
              className="flex-shrink-0 text-xs font-semibold text-gray-500 hover:text-[#0048ff] px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#0048ff]/30 bg-white transition-colors duration-200 whitespace-nowrap"
            >
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* Terms sections */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">
              / Terms of Service
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">
              Honest terms for real partnerships.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[520px] mt-3">
              We&apos;ve written these to be fair to both sides. If something seems off, ask us before signing.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {sections.map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                id={`section-${num}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#0048ff]/20 bg-[#f5f8ff] p-6 sm:p-8"
                whileHover={{ y: -4, boxShadow: "0 0 0 2px rgba(0,72,255,0.3), 0 12px 32px rgba(0,72,255,0.08)" }}
              >
                <span className="text-[10px] font-bold tracking-widest text-[#0048ff] uppercase opacity-60 block mb-4">
                  {num}
                </span>
                <h3 className="text-[17px] sm:text-[18px] font-medium text-[#0f1c3f] tracking-tight leading-snug mb-3">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue accent — key commitments */}
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6" style={{ background: "#0048ff" }}>
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)" }} />

        <div className="relative max-w-[1350px] mx-auto flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">
          <div className="lg:w-[480px] flex-shrink-0">
            <Reveal>
              <h2 className="text-white font-medium leading-[1.08] tracking-tight mb-6 sm:mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}>
                Our commitment{" "}
                <span className="relative inline-block" style={{ borderBottom: "3px solid rgba(255,255,255,0.5)", paddingBottom: "2px" }}>
                  to you
                </span>
                .
              </h2>
              <ContactButton className="inline-flex items-center gap-3 bg-white text-[#0048ff] text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
                Talk to us about a project
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </ContactButton>
            </Reveal>
          </div>

          <div className="flex-1 flex flex-col gap-5 sm:gap-6">
            {[
              "We scope projects honestly — no padding, no hidden scope creep.",
              "We flag problems the moment we see them, with a proposed path forward.",
              "You own everything you paid us to build, full stop.",
              "We keep your project confidential and treat your data with care.",
              "If we can't deliver what we promised, we'll tell you immediately.",
            ].map((commitment, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-white/80 text-[15px] leading-relaxed">{commitment}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal>
            <motion.div
              className="rounded-3xl border border-[#0048ff]/20 bg-[#f5f8ff] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 text-center overflow-hidden relative"
              whileHover={{ boxShadow: "0 0 0 2px rgba(0,72,255,0.25), 0 24px 48px rgba(0,72,255,0.07)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,72,255,0.06) 0%, transparent 60%)" }} />
              <div className="relative">
                <Reveal delay={0}>
                  <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-5">/ Questions?</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="font-medium text-[#0f1c3f] tracking-tight max-w-2xl mx-auto mb-5" style={{ fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)", lineHeight: 1.1 }}>
                    Something unclear in these terms?
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto mb-8 sm:mb-9">
                    Email us at <a href="mailto:legal@acrobit.com" className="text-[#0048ff] underline">legal@acrobit.com</a>. We&apos;d rather explain something upfront than have a misunderstanding later.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <ContactButton className="inline-flex items-center gap-2 bg-[#0048ff] text-white text-sm font-semibold px-7 py-3.5 sm:px-8 sm:py-4 rounded-full hover:bg-[#0035cc] transition-colors">
                      Start a conversation
                      <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <ArrowUpRight size={13} strokeWidth={2.5} />
                      </span>
                    </ContactButton>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <Link href="/privacy" className="text-xs text-gray-400 hover:text-[#0048ff] transition-colors">Privacy Policy</Link>
                    <Link href="/cookies" className="text-xs text-gray-400 hover:text-[#0048ff] transition-colors">Cookie Policy</Link>
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
