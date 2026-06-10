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
    title: "What Are Cookies?",
    body: "Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, understand how you use the site, and improve your experience. Cookies can be 'session' cookies (deleted when you close the browser) or 'persistent' cookies (stored until they expire or you delete them).",
  },
  {
    num: "02",
    title: "Essential Cookies",
    body: "These cookies are strictly necessary for the website to function and cannot be switched off. They are set in response to actions you take, such as setting your privacy preferences or navigating the site. You can set your browser to block these cookies, but some parts of the site may not work properly as a result.",
  },
  {
    num: "03",
    title: "Analytics & Performance Cookies",
    body: "We use analytics cookies (including Google Analytics) to understand how visitors interact with our website — which pages are visited most, where visitors come from, and how long they stay. This data is aggregated and anonymous. It helps us improve site performance and content. You can opt out of Google Analytics at any time via your browser settings or Google's opt-out tool.",
  },
  {
    num: "04",
    title: "Functional Cookies",
    body: "Functional cookies remember choices you make to improve your experience — such as your preferred language or region. They may also be used to provide services you have requested. These cookies do not track your browsing activity on other websites and do not gather information for advertising purposes.",
  },
  {
    num: "05",
    title: "Marketing & Targeting Cookies",
    body: "We may use marketing cookies to track visitors across websites to display relevant advertisements. These are set by our advertising partners and may be used to build a profile of your interests. We do not use aggressive retargeting and we do not share your personal information with ad networks. You can opt out through your browser or industry opt-out tools like the NAI opt-out.",
  },
  {
    num: "06",
    title: "Third-Party Cookies",
    body: "Some cookies on our site are set by third-party services embedded into our pages, such as Cal.com (scheduling), Vercel Analytics (performance), and Spline (3D viewer). These third parties have their own privacy and cookie policies. We do not control the cookies placed by third parties, and we recommend reviewing their policies directly.",
  },
  {
    num: "07",
    title: "Managing Your Cookie Preferences",
    body: "You can control and delete cookies through your browser settings. Most browsers allow you to refuse new cookies, delete existing cookies, and be notified when a new cookie is placed. Note that disabling certain cookies may affect the functionality of our site. For more detailed guidance, visit allaboutcookies.org or your browser's help documentation.",
  },
  {
    num: "08",
    title: "Policy Updates",
    body: "We may update this Cookie Policy from time to time to reflect changes in technology, law, or our practices. The date at the top of this page shows when the policy was last revised. Continued use of our website after any changes constitutes acceptance. If the changes are material, we will notify you via a prominent notice on our website.",
  },
];

const cookieTypes = [
  { label: "Essential", color: "#059669", desc: "Always active — required for the site to work" },
  { label: "Analytics", color: "#0048ff", desc: "Help us improve by understanding usage patterns" },
  { label: "Functional", color: "#7c3aed", desc: "Remember your preferences and choices" },
  { label: "Marketing", color: "#f59e0b", desc: "Used for relevant advertising (opt-out available)" },
];

function CookiesHero() {
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
          <span className="text-xs font-bold text-white whitespace-nowrap">Cookie Policy</span>
        </div>
        <svg id="cursor-left" width="26" height="26" viewBox="0 0 24 24" fill="#0f1c3f" stroke="white" strokeWidth="1.5" strokeLinejoin="round" className="absolute -bottom-5 right-2" style={{ opacity: 0 }}>
          <path d="M4 2l16 9-9 1-4 8z" />
        </svg>
      </div>

      <div ref={rightScope} className="absolute hidden sm:block select-none z-20" style={{ right: "clamp(20px, 6vw, 100px)", top: "clamp(130px, 18vw, 220px)" }}>
        <div id="ripple-right" className="absolute rounded-full bg-[#0048ff]/40 pointer-events-none" style={{ width: 14, height: 14, bottom: -10, left: 6, opacity: 0, transform: "scale(0.4)" }} />
        <div id="pill-right" className="flex items-center gap-2 bg-[#e8eeff] border border-[#0048ff]/20 rounded-full px-4 py-2.5" style={{ boxShadow: "0 4px 24px rgba(0,72,255,0.12)", opacity: 0 }}>
          <span className="w-2 h-2 rounded-full bg-[#0048ff] flex-shrink-0" />
          <span className="text-xs font-bold text-[#0048ff] whitespace-nowrap">Opt-out available</span>
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
          Cookies We Use<br />
          <span style={{ color: "#0048ff" }}>& Why.</span>
        </motion.h1>

        <motion.p className="text-[#6b7280] leading-relaxed max-w-md mb-7" style={{ fontSize: "clamp(0.88rem, 1.2vw, 1rem)" }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
          We use cookies to keep the site working, understand how it&apos;s used, and improve your experience. You can opt out of non-essential cookies at any time.
        </motion.p>

        <motion.div className="flex items-center gap-4 flex-wrap justify-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}>
          <Link href="/privacy" className="inline-flex items-center gap-2 bg-[#f5f8ff] border border-[#0048ff]/20 text-[#0048ff] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#e8eeff] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="inline-flex items-center gap-2 bg-[#f5f8ff] border border-[#0048ff]/20 text-[#0048ff] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#e8eeff] transition-colors">
            Terms of Service
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <CookiesHero />

      {/* Cookie types overview */}
      <section className="bg-[#f5f8ff] border-y border-gray-100 py-8 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cookieTypes.map(({ label, color, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl p-4 border border-gray-100"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs font-bold text-[#0f1c3f]">{label}</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie sections */}
      <section className="bg-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal className="mb-8 sm:mb-12">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#0048ff] mb-3">
              / Cookie Policy
            </p>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight max-w-xl">
              No surprises, just transparency.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[520px] mt-3">
              Here&apos;s exactly what cookies we use, what they do, and how you can control them.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {sections.map(({ num, title, body }, i) => (
              <motion.div
                key={num}
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

      {/* Blue accent — opt-out info */}
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6" style={{ background: "#0048ff" }}>
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)" }} />

        <div className="relative max-w-[1350px] mx-auto flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">
          <div className="lg:w-[480px] flex-shrink-0">
            <Reveal>
              <h2 className="text-white font-medium leading-[1.08] tracking-tight mb-6 sm:mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}>
                You&apos;re{" "}
                <span className="relative inline-block" style={{ borderBottom: "3px solid rgba(255,255,255,0.5)", paddingBottom: "2px" }}>
                  always in control
                </span>
                .
              </h2>
              <ContactButton className="inline-flex items-center gap-3 bg-white text-[#0048ff] text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
                Contact us about cookies
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </ContactButton>
            </Reveal>
          </div>

          <div className="flex-1 flex flex-col gap-5 sm:gap-6">
            {[
              "Go to your browser settings and block or delete all cookies at any time.",
              "Use Google's opt-out browser add-on to prevent Google Analytics tracking.",
              "Visit optout.networkadvertising.org to opt out of interest-based advertising.",
              "Email us at privacy@acrobit.com to request deletion of any data we hold.",
              "Essential cookies cannot be disabled without affecting site functionality.",
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-white/80 text-[15px] leading-relaxed">{item}</p>
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
                    Want to know exactly what we track?
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto mb-8 sm:mb-9">
                    Email <a href="mailto:privacy@acrobit.com" className="text-[#0048ff] underline">privacy@acrobit.com</a> and we&apos;ll send you a full list of every cookie and third-party service active on your session.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <ContactButton className="inline-flex items-center gap-2 bg-[#0048ff] text-white text-sm font-semibold px-7 py-3.5 sm:px-8 sm:py-4 rounded-full hover:bg-[#0035cc] transition-colors">
                      Get in touch
                      <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <ArrowUpRight size={13} strokeWidth={2.5} />
                      </span>
                    </ContactButton>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <Link href="/privacy" className="text-xs text-gray-400 hover:text-[#0048ff] transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="text-xs text-gray-400 hover:text-[#0048ff] transition-colors">Terms of Service</Link>
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
