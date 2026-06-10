"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Testimonials from "@/app/components/Testimonials";
import ComplianceCovered from "@/app/components/ComplianceCovered";
import FAQ from "@/app/components/FAQ";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import { projects as allProjects } from "@/app/data/projects";
import { useContactModal } from "@/app/components/ContactModalContext";

/* ── Reusable scroll-reveal wrapper ── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * to));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}


const reviewers = [
  {
    src: "/people/men1.png",
    name: "Michael Torres",
    role: "VP of Engineering, SoFi",
    quote: "Acrobit elevated our entire frontend. A genuinely world-class team.",
  },
  {
    src: "/people/women2.png",
    name: "Dr. Sarah Chen",
    role: "CTO, HealthTap",
    quote: "Exceptional precision on healthcare compliance. The platform is rock solid.",
  },
  {
    src: "/people/men3.png",
    name: "Marco Ferretti",
    role: "Founder, Overcast",
    quote: "Flutter UI with the polish of a native app. Couldn't be more satisfied.",
  },
];

function ReviewCard() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((p) => (p + 1) % reviewers.length),
      3200
    );
    return () => clearInterval(t);
  }, []);

  /* ordered so active avatar is always first (leftmost / top z) */
  const order = [
    active,
    (active + 1) % reviewers.length,
    (active + 2) % reviewers.length,
  ];

  return (
    <div
      className="absolute flex items-center bg-white rounded-2xl px-4 py-3 sm:px-5 sm:py-4 overflow-hidden"
      style={{
        bottom: "0px",
        right: "24px",
        width: "min(calc(28% - 24px), 320px)",
        minWidth: "220px",
        boxShadow: "0 12px 48px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {/* Avatars — cycle order so front avatar is always "active" */}
      <div
        className="flex items-center flex-shrink-0"
        style={{ width: "105px" }}
      >
        {order.map((idx, pos) => (
          <motion.div
            key={reviewers[idx].src}
            layout
            className="relative rounded-full overflow-hidden border-[3px] border-white flex-shrink-0"
            style={{
              width: "44px",
              height: "44px",
              marginLeft: pos === 0 ? 0 : "-12px",
              zIndex: 3 - pos,
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={reviewers[idx].src}
              alt={reviewers[idx].name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </motion.div>
        ))}
      </div>

      {/* Text — fades on change */}
      <div className="flex-1 min-w-0 ml-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <p className="text-gray-500 text-[11px] leading-snug mb-1 line-clamp-2">
              &ldquo;{reviewers[active].quote}&rdquo;
            </p>
            <p className="text-gray-900 text-xs font-bold leading-none">
              {reviewers[active].name}
            </p>
            <p className="text-gray-400 text-[10px] mt-0.5">
              {reviewers[active].role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES — Interactive hover-link rows
   Inspired by kinetic-team-hybrid + interactive-hover-links
   ═══════════════════════════════════════════════ */

const SERVICES = [
  {
    id: 0,
    title: "Artificial Intelligence",
    category: "AI & Machine Learning",
    year: "2024",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
    bgColor: "#0f1c3f",
    href: "/services/ai-software-development",
  },
  {
    id: 1,
    title: "App Development",
    category: "iOS · Android · Cross-platform",
    year: "2024",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",
    bgColor: "#0a1628",
    href: "/services/application-development",
  },
  {
    id: 2,
    title: "Web Development",
    category: "Full-stack · E-commerce · CMS",
    year: "2024",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
    bgColor: "#0d1f45",
    href: "/services/product-development",
  },
  {
    id: 3,
    title: "Cloud & Infrastructure",
    category: "AWS · DevOps · MLOps",
    year: "2024",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80",
    bgColor: "#0f2050",
    href: "/services/intelligent-automation",
  },
];

/* ── Mobile card ── */
function ServiceCard({ svc }: { svc: (typeof SERVICES)[0] }) {
  return (
    <Link href={svc.href} className="no-underline">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl cursor-pointer group"
        style={{ background: svc.bgColor, minHeight: "280px" }}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={svc.img}
          alt={svc.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c3f]/90 via-[#0f1c3f]/30 to-transparent" />
        <div
          className="relative z-10 flex flex-col justify-between h-full p-5"
          style={{ minHeight: "280px" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/60 border border-white/20 rounded-full px-3 py-1">
              {svc.category}
            </span>
            <span className="text-[10px] text-white/40">{svc.year}</span>
          </div>
          <h3 className="text-xl font-semibold text-white leading-tight">
            {svc.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}

/* ── Desktop row ── */
const ServiceRow = React.forwardRef<
  HTMLDivElement,
  {
    svc: (typeof SERVICES)[0];
    index: number;
    isActive: boolean;
    isAnyActive: boolean;
  }
>(({ svc, index, isActive, isAnyActive }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group border-t border-gray-100 last:border-b cursor-pointer"
    >
      <Link href={svc.href} className="no-underline block">
        <div className="flex items-center justify-between py-10 px-2 transition-all duration-300 group-hover:pl-6">
          <div className="flex items-baseline gap-8">
            <span className="font-mono text-[11px] text-gray-300 w-6 flex-shrink-0 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className="text-4xl font-light tracking-tight transition-colors duration-300 xl:text-5xl"
              style={{
                color: isActive ? "rgba(15,28,63,0.18)" : "#0f1c3f",
              }}
            >
              {svc.title}
            </h3>
          </div>
          <div className="flex items-center gap-8">
            <span
              className="hidden text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 lg:block"
              style={{
                color: isActive ? "rgba(107,114,128,0.25)" : "#6b7280",
              }}
            >
              {svc.category}
            </span>
            <span
              className="hidden text-[11px] tabular-nums transition-colors duration-300 md:block"
              style={{ color: isActive ? "rgba(209,213,219,0.25)" : "#d1d5db" }}
            >
              {svc.year}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});
ServiceRow.displayName = "ServiceRow";

/* ── Main component ── */
function ServicesHoverList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageScrollRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const imagePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const isInContainerRef = useRef(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getActiveRowIndex = useCallback(() => {
    for (let i = 0; i < rowRefs.current.length; i++) {
      const row = rowRefs.current[i];
      if (row) {
        const rect = row.getBoundingClientRect();
        if (
          mousePos.current.y >= rect.top &&
          mousePos.current.y <= rect.bottom &&
          mousePos.current.x >= rect.left &&
          mousePos.current.x <= rect.right
        ) {
          return i;
        }
      }
    }
    return null;
  }, []);

  const checkIsInContainer = useCallback(() => {
    const container = containerRef.current;
    if (!container) return false;
    const rect = container.getBoundingClientRect();
    return (
      mousePos.current.x >= rect.left &&
      mousePos.current.x <= rect.right &&
      mousePos.current.y >= rect.top &&
      mousePos.current.y <= rect.bottom
    );
  }, []);

  /* Global mouse tracking (desktop only) */
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      const isInside = checkIsInContainer();
      const wasInside = isInContainerRef.current;
      isInContainerRef.current = isInside;

      if (isInside) {
        setActiveIndex(getActiveRowIndex());
      } else if (wasInside) {
        setActiveIndex(null);
      }
    };

    const handleScroll = () => {
      const isInside = checkIsInContainer();
      isInContainerRef.current = isInside;
      setActiveIndex(isInside ? getActiveRowIndex() : null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDesktop, checkIsInContainer, getActiveRowIndex]);

  /* RAF lerp loop — image follows cursor slowly */
  useEffect(() => {
    if (!isDesktop) return;
    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;

    const animate = () => {
      const dx = mousePos.current.x - imagePos.current.x;
      const dy = mousePos.current.y - imagePos.current.y;
      imagePos.current.x += dx * 0.06;
      imagePos.current.y += dy * 0.06;
      imageContainer.style.transform = `translate(calc(${imagePos.current.x}px - 50%), calc(${imagePos.current.y}px - 50%))`;
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isDesktop]);

  /* Show/hide image container based on active state */
  useEffect(() => {
    if (!isDesktop) return;
    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;

    if (activeIndex !== null) {
      imageContainer.style.opacity = "1";
      imageContainer.style.scale = "1";
    } else {
      imageContainer.style.opacity = "0";
      imageContainer.style.scale = "0.88";
    }
  }, [activeIndex, isDesktop]);

  /* Scroll image strip to active index */
  useEffect(() => {
    if (!isDesktop || activeIndex === null) return;
    const scrollContainer = imageScrollRef.current;
    if (!scrollContainer) return;
    const targetY = -(activeIndex * 260);
    scrollContainer.style.transform = `translateY(${targetY}px)`;
  }, [activeIndex, isDesktop]);

  /* ── Mobile/tablet card grid ── */
  if (!isDesktop) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SERVICES.map((svc) => (
          <ServiceCard key={svc.id} svc={svc} />
        ))}
      </div>
    );
  }

  /* ── Desktop list + floating image panel ── */
  return (
    <div>
      <div ref={containerRef} className="relative border-b border-gray-100">
        {SERVICES.map((svc, i) => (
          <ServiceRow
            key={svc.id}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            svc={svc}
            index={i}
            isActive={activeIndex === i}
            isAnyActive={activeIndex !== null}
          />
        ))}
      </div>

      {/* Floating image panel — fixed, follows cursor with lerp */}
      <div
        ref={imageContainerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
        style={{
          opacity: 0,
          scale: "0.88",
          transition:
            "opacity 0.45s cubic-bezier(0.16,1,0.3,1), scale 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          className="overflow-hidden rounded-2xl shadow-2xl"
          style={{ width: "340px", height: "260px" }}
        >
          {/* Scrolling strip — translateY animates on activeIndex change */}
          <div
            ref={imageScrollRef}
            className="will-change-transform"
            style={{
              transition: "transform 0.75s cubic-bezier(0.33,1,0.68,1)",
            }}
          >
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="relative flex items-center justify-center"
                style={{
                  width: "340px",
                  height: "260px",
                  background: svc.bgColor,
                }}
              >
                <img
                  src={svc.img}
                  alt={svc.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c3f]/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60 mb-1">
                    {svc.category}
                  </p>
                  <p className="text-white font-semibold text-lg leading-snug">
                    {svc.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   BENEFITS — Animated slideshow (hover list + image reveal)
   Inspired by animated-slideshow
   ═══════════════════════════════════════════════ */

const BENEFITS = [
  {
    id: 0,
    title: "Affordable Pricing",
    sub: "Transparent, competitive, and tailored to your goals.",
    img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  },
  {
    id: 1,
    title: "Scalable Solutions",
    sub: "Built to grow with your business from day one.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: 2,
    title: "Flexible Payments",
    sub: "Milestone billing, split payments, or retainers — you choose.",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: 3,
    title: "Lifetime Support",
    sub: "Ongoing updates, monitoring, and guidance beyond launch.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
  },
  {
    id: 4,
    title: "Expert Match",
    sub: "Senior engineers and designers chosen specifically for your project.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
];

function BenefitsSlideshow() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
      {/* Left — list */}
      <div className="flex flex-col flex-1">
        {BENEFITS.map((b) => {
          const isActive = active === b.id;
          return (
            <motion.div
              key={b.id}
              onMouseEnter={() => setActive(b.id)}
              onClick={() => setActive(b.id)}
              className="group cursor-pointer border-t border-gray-200 last:border-b py-6 flex items-start gap-6"
              animate={{ opacity: isActive ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-mono text-[11px] text-gray-400 mt-1 flex-shrink-0">
                0{b.id + 1}
              </span>
              <div>
                <h3 className="text-xl font-medium text-[#0f1c3f] tracking-tight mb-1 transition-colors">
                  {b.title.split("").map((ch, i) => (
                    <span
                      key={i}
                      className="relative inline-block overflow-hidden"
                    >
                      <MotionConfig
                        transition={{
                          delay: i * 0.015,
                          duration: 0.25,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <motion.span
                          className="inline-block"
                          initial={{ y: "0%" }}
                          animate={isActive ? { y: "-110%" } : { y: "0%" }}
                        >
                          {ch === " " ? " " : ch}
                        </motion.span>
                        <motion.span
                          className="absolute left-0 top-0 inline-block text-[#0048ff]"
                          initial={{ y: "110%" }}
                          animate={isActive ? { y: "0%" } : { y: "110%" }}
                        >
                          {ch === " " ? " " : ch}
                        </motion.span>
                      </MotionConfig>
                    </span>
                  ))}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{b.sub}</p>
              </div>
              <motion.div
                animate={{ x: isActive ? 0 : -8, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-auto flex-shrink-0 text-[#0048ff] self-center"
              >
                <ArrowUpRight size={20} strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Right — stacked image reveal */}
      <div className="hidden md:block w-[420px] flex-shrink-0 sticky top-28">
        <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
          {BENEFITS.map((b) => (
            <motion.div
              key={b.id}
              className="absolute inset-0 overflow-hidden rounded-2xl"
              variants={{
                visible: {
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  opacity: 1,
                },
                hidden: {
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                  opacity: 0,
                },
              }}
              animate={active === b.id ? "visible" : "hidden"}
              transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.7 }}
            >
              <img
                src={b.img}
                alt={b.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c3f]/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70 mb-1">
                  / {String(b.id + 1).padStart(2, "0")}
                </p>
                <p className="text-white font-semibold text-base">{b.title}</p>
              </div>
            </motion.div>
          ))}
          {/* Blue glow */}
          <div className="pointer-events-none absolute -bottom-6 -right-6 w-40 h-40 rounded-full blur-3xl bg-[#0048ff]/20" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   BENTO — "More Than Just Services"
   5 cards: animated chat, scrolling experts, project timeline,
   milestone billing, and lifetime support ring.
   ═══════════════════════════════════════════════ */

/* ── Card 1: Transparent Pricing — rich animated chat ── */

const CHAT_SCRIPT: {
  from: "client" | "team";
  text: string;
  delay: number; // ms after previous message lands before this one starts typing
  typingMs: number; // how long the typing indicator shows
}[] = [
  { from: "client", text: "What's included in the fixed price?",          delay: 400,  typingMs: 0   },
  { from: "team",   text: "Everything — design, dev, QA & launch. 🚀",   delay: 700,  typingMs: 900 },
  { from: "client", text: "Any hidden fees?",                              delay: 500,  typingMs: 0   },
  { from: "team",   text: "Zero. One number, locked in writing.",          delay: 600,  typingMs: 750 },
  { from: "client", text: "Can we pay in milestones?",                     delay: 500,  typingMs: 0   },
  { from: "team",   text: "Yes — milestone, monthly or upfront. You pick.",delay: 800,  typingMs: 950 },
];

const CHAT_CLIENT = {
  name: "Alex",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
};
const CHAT_TEAM = {
  name: "Acrobit",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
};

function TypingDots() {
  return (
    <div className="flex items-center gap-[3px] px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gray-400"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ChatBubble({
  msg,
  showAvatar,
  isRead,
}: {
  msg: (typeof CHAT_SCRIPT)[0];
  showAvatar: boolean;
  isRead: boolean;
}) {
  const isTeam = msg.from === "team";
  const person = isTeam ? CHAT_TEAM : CHAT_CLIENT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-1.5 ${isTeam ? "justify-end" : "justify-start"}`}
    >
      {/* Avatar left side */}
      {!isTeam && (
        <div className="flex-shrink-0 self-end mb-0.5">
          {showAvatar ? (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={person.avatar}
              alt={person.name}
              className="w-6 h-6 rounded-full object-cover border border-white shadow-sm"
            />
          ) : (
            <div className="w-6" />
          )}
        </div>
      )}

      <div className={`flex flex-col gap-0.5 ${isTeam ? "items-end" : "items-start"}`}>
        {showAvatar && (
          <span className="text-[9px] text-gray-400 px-1">{person.name}</span>
        )}
        <div
          className={`relative max-w-[200px] rounded-2xl px-3 py-2 text-[11px] leading-snug shadow-sm ${
            isTeam
              ? "bg-[#0048ff] text-white rounded-br-sm"
              : "bg-white text-[#0f1c3f] border border-gray-100 rounded-bl-sm"
          }`}
        >
          {msg.text}
        </div>
        {/* Read receipt — only on last team message */}
        {isTeam && isRead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-1 pr-1"
          >
            <svg width="12" height="8" viewBox="0 0 16 10" fill="none">
              <path d="M1 5l4 4L15 1" stroke="#0048ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 5l4 4" stroke="#0048ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
            </svg>
            <span className="text-[8px] text-[#0048ff]/70">Read</span>
          </motion.div>
        )}
      </div>

      {/* Avatar right side */}
      {isTeam && (
        <div className="flex-shrink-0 self-end mb-0.5">
          {showAvatar ? (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={person.avatar}
              alt={person.name}
              className="w-6 h-6 rounded-full object-cover border-2 border-[#0048ff]/20 shadow-sm"
            />
          ) : (
            <div className="w-6" />
          )}
        </div>
      )}
    </motion.div>
  );
}

function AnimatedChat() {
  // phase: index into CHAT_SCRIPT of the message currently being typed (-1 = none)
  const [landed, setLanded] = useState<number[]>([]);
  const [typing, setTyping] = useState<"client" | "team" | null>(null);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLanded([]);
    setTyping(null);

    async function play() {
      for (let i = 0; i < CHAT_SCRIPT.length; i++) {
        if (cancelled) return;
        const msg = CHAT_SCRIPT[i];

        // pause before typing starts
        await new Promise((r) => setTimeout(r, msg.delay));
        if (cancelled) return;

        // show typing indicator if team message
        if (msg.typingMs > 0) {
          setTyping(msg.from);
          await new Promise((r) => setTimeout(r, msg.typingMs));
          if (cancelled) return;
          setTyping(null);
          await new Promise((r) => setTimeout(r, 80));
          if (cancelled) return;
        }

        setLanded((prev) => [...prev, i]);
      }

      // loop after pause
      await new Promise((r) => setTimeout(r, 2200));
      if (!cancelled) setCycle((c) => c + 1);
    }

    play();
    return () => { cancelled = true; };
  }, [cycle]);

  return (
    <div className="w-full flex flex-col" style={{ maxWidth: 300 }}>
      {/* Chat header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 mb-2">
        <div className="relative">
          <img src={CHAT_TEAM.avatar} alt="Acrobit" className="w-7 h-7 rounded-full object-cover" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#0f1c3f] leading-none">Acrobit</p>
          <p className="text-[9px] text-green-500 leading-none mt-0.5">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2 px-2 overflow-hidden">
        <AnimatePresence mode="sync">
          {landed.map((idx) => {
            const msg = CHAT_SCRIPT[idx];
            const prevMsg = idx > 0 ? CHAT_SCRIPT[idx - 1] : null;
            const showAvatar = !prevMsg || prevMsg.from !== msg.from;
            const isLastTeam =
              msg.from === "team" &&
              (idx === landed[landed.length - 1]) &&
              typing === null;
            return (
              <ChatBubble
                key={`${cycle}-${idx}`}
                msg={msg}
                showAvatar={showAvatar}
                isRead={isLastTeam}
              />
            );
          })}

          {/* Typing indicator */}
          {typing !== null && (
            <motion.div
              key={`typing-${cycle}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-end gap-1.5 ${typing === "team" ? "justify-end" : "justify-start"}`}
            >
              {typing === "client" && <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0" />}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
                <TypingDots />
              </div>
              {typing === "team" && (
                <img src={CHAT_TEAM.avatar} alt="" className="w-6 h-6 rounded-full object-cover border-2 border-[#0048ff]/20 flex-shrink-0" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Card 2: Fast Structured Delivery — animated Kanban board ── */

type KanbanCol = "To Do" | "In Progress" | "Done";

const KANBAN_TASKS: { id: number; label: string; tag: string; tagColor: string; startCol: KanbanCol }[] = [
  { id: 1, label: "Wireframes",       tag: "Design",   tagColor: "#7c3aed", startCol: "Done"        },
  { id: 2, label: "API integration",  tag: "Dev",      tagColor: "#0048ff", startCol: "Done"        },
  { id: 3, label: "Component library",tag: "Design",   tagColor: "#7c3aed", startCol: "Done"        },
  { id: 4, label: "Auth flow",        tag: "Dev",      tagColor: "#0048ff", startCol: "In Progress" },
  { id: 5, label: "Dashboard UI",     tag: "Design",   tagColor: "#7c3aed", startCol: "In Progress" },
  { id: 6, label: "Deployment setup", tag: "DevOps",   tagColor: "#059669", startCol: "To Do"       },
  { id: 7, label: "QA pass",          tag: "QA",       tagColor: "#d97706", startCol: "To Do"       },
];

const COL_ORDER: KanbanCol[] = ["To Do", "In Progress", "Done"];

const COL_STYLE: Record<KanbanCol, { header: string; dot: string }> = {
  "To Do":       { header: "text-gray-400",   dot: "bg-gray-300"   },
  "In Progress": { header: "text-[#0048ff]",  dot: "bg-[#0048ff]"  },
  "Done":        { header: "text-emerald-500", dot: "bg-emerald-400" },
};

/* Sequence of moves: [taskId, fromCol, toCol] */
const MOVE_SEQUENCE: [number, KanbanCol, KanbanCol][] = [
  [6, "To Do",       "In Progress"],
  [4, "In Progress", "Done"       ],
  [5, "In Progress", "Done"       ],
  [7, "To Do",       "In Progress"],
];

function makeInitialCols(): Record<KanbanCol, number[]> {
  const map: Record<KanbanCol, number[]> = { "To Do": [], "In Progress": [], "Done": [] };
  KANBAN_TASKS.forEach((t) => map[t.startCol].push(t.id));
  return map;
}

function KanbanBoard() {
  const [cols, setCols] = useState<Record<KanbanCol, number[]>>(makeInitialCols);
  const [moving, setMoving] = useState<number | null>(null);

  const taskMap = Object.fromEntries(KANBAN_TASKS.map((t) => [t.id, t]));

  useEffect(() => {
    let cancelled = false;

    async function play() {
      // small gap before first move
      await new Promise((r) => setTimeout(r, 800));

      for (const [taskId, from, to] of MOVE_SEQUENCE) {
        if (cancelled) return;

        // highlight
        setMoving(taskId);
        await new Promise((r) => setTimeout(r, 900));
        if (cancelled) return;

        // move
        setCols((prev) => ({
          ...prev,
          [from]: prev[from].filter((id) => id !== taskId),
          [to]: [...prev[to], taskId],
        }));
        setMoving(null);

        // gap between moves
        await new Promise((r) => setTimeout(r, 700));
        if (cancelled) return;
      }

      // pause at end, then reset
      await new Promise((r) => setTimeout(r, 2000));
      if (cancelled) return;
      setCols(makeInitialCols());
      setMoving(null);

      // tiny gap so reset renders before next loop starts
      await new Promise((r) => setTimeout(r, 400));
      if (!cancelled) play();
    }

    play();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col gap-0 px-1 pt-1">
      {/* Board header row — always visible above the mask */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {COL_ORDER.map((col) => (
          <div key={col} className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${COL_STYLE[col].dot}`} />
            <span className={`text-[9px] font-semibold tracking-wide uppercase ${COL_STYLE[col].header}`}>
              {col}
            </span>
            <span className="ml-auto text-[9px] text-gray-300 font-mono tabular-nums">
              {cols[col].length}
            </span>
          </div>
        ))}
      </div>

      {/* Scrollable card area — mask only bottom edge */}
      <div
        className="grid grid-cols-3 gap-2"
        style={{
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      >
        {COL_ORDER.map((col) => (
          <div key={col} className="flex flex-col gap-1.5 min-h-[160px]">
            <AnimatePresence mode="popLayout">
              {cols[col].map((id) => {
                const task = taskMap[id];
                const isMoving = moving === id;
                return (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: -6 }}
                    animate={{
                      opacity: 1,
                      scale: isMoving ? 1.04 : 1,
                      y: 0,
                      boxShadow: isMoving
                        ? "0 4px 16px rgba(0,72,255,0.18)"
                        : "0 1px 3px rgba(0,0,0,0.06)",
                      borderColor: isMoving
                        ? "rgba(0,72,255,0.4)"
                        : "rgba(0,0,0,0.06)",
                    }}
                    exit={{ opacity: 0, scale: 0.88, y: 6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white border rounded-lg p-2 cursor-default"
                  >
                    <p className="text-[10px] font-medium text-[#0f1c3f] leading-snug mb-1.5">
                      {task.label}
                    </p>
                    <span
                      className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: `${task.tagColor}18`, color: task.tagColor }}
                    >
                      {task.tag}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Card 3: Expert Match — team assembly UI ── */

const ROSTER: {
  name: string;
  role: string;
  avatar: string;
  tz: string;
  skills: string[];
  color: string;
}[] = [
  {
    name: "Sarah K.",
    role: "AI Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    tz: "UTC+1",
    skills: ["Python", "LLMs", "MLOps"],
    color: "#7c3aed",
  },
  {
    name: "James R.",
    role: "Full-stack Dev",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&q=80",
    tz: "UTC−5",
    skills: ["React", "Node", "AWS"],
    color: "#0048ff",
  },
  {
    name: "Priya M.",
    role: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80",
    tz: "UTC+5:30",
    skills: ["Figma", "Design Sys", "Research"],
    color: "#ec4899",
  },
  {
    name: "Alex T.",
    role: "DevOps Lead",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
    tz: "UTC+0",
    skills: ["K8s", "CI/CD", "Terraform"],
    color: "#059669",
  },
];

function ExpertMatch() {
  // which experts have been added to the team so far
  const [team, setTeam] = useState<number[]>([]);
  // which card is currently "active" (being shown in the spotlight)
  const [activeIdx, setActiveIdx] = useState(0);
  const [adding, setAdding] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function play() {
      setTeam([]);
      setActiveIdx(0);
      setAdding(false);

      for (let i = 0; i < ROSTER.length; i++) {
        if (cancelled) return;
        setActiveIdx(i);

        // pause on profile
        await new Promise((r) => setTimeout(r, 1100));
        if (cancelled) return;

        // flash the "adding" state
        setAdding(true);
        await new Promise((r) => setTimeout(r, 500));
        if (cancelled) return;

        setTeam((t) => [...t, i]);
        setAdding(false);

        await new Promise((r) => setTimeout(r, 500));
      }

      // hold completed team
      await new Promise((r) => setTimeout(r, 2000));
      if (!cancelled) setCycle((c) => c + 1);
    }
    play();
    return () => { cancelled = true; };
  }, [cycle]);

  const expert = ROSTER[activeIdx];

  return (
    <div className="w-full flex flex-col gap-3 px-1">

      {/* Active profile card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${cycle}-${activeIdx}`}
          initial={{ opacity: 0, x: 16, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -16, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm"
        >
          <div className="flex items-center gap-3">
            {/* Avatar with role-color ring */}
            <div
              className="relative flex-shrink-0 rounded-xl p-0.5"
              style={{ background: `${expert.color}22` }}
            >
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-11 h-11 rounded-[10px] object-cover"
              />
              {/* Online dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-[#0f1c3f] leading-none">{expert.name}</p>
                <span className="text-[8px] text-gray-400 font-mono">{expert.tz}</span>
              </div>
              <p className="text-[10px] mt-0.5 font-medium" style={{ color: expert.color }}>{expert.role}</p>
              {/* Skill tags */}
              <div className="flex gap-1 mt-1.5 flex-wrap">
                {expert.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[8px] font-medium px-1.5 py-0.5 rounded-full border"
                    style={{
                      background: `${expert.color}10`,
                      color: expert.color,
                      borderColor: `${expert.color}25`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Add to team button state */}
          <motion.div
            className="mt-2.5 w-full rounded-lg py-1.5 flex items-center justify-center gap-1.5 text-[10px] font-semibold"
            animate={
              team.includes(activeIdx)
                ? { background: "#f0fdf4", color: "#10b981", borderColor: "#bbf7d0" }
                : adding
                ? { background: "#0048ff", color: "#ffffff", borderColor: "#0048ff" }
                : { background: "#f5f8ff", color: "#0048ff", borderColor: "#dbeafe" }
            }
            transition={{ duration: 0.22 }}
            style={{ border: "1px solid" }}
          >
            {team.includes(activeIdx) ? (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added to team
              </>
            ) : adding ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                  className="w-2.5 h-2.5 border border-white border-t-transparent rounded-full"
                />
                Adding…
              </>
            ) : (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add to team
              </>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Team roster being built */}
      <div className="flex flex-col gap-0">
        <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wide mb-1.5">
          Your team · {team.length}/{ROSTER.length}
        </p>
        <div className="flex items-center gap-1.5">
          <AnimatePresence>
            {team.map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="relative"
                title={ROSTER[idx].name}
              >
                <img
                  src={ROSTER[idx].avatar}
                  alt={ROSTER[idx].name}
                  className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white"
                  style={{ background: ROSTER[idx].color }}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty slots */}
          {Array.from({ length: ROSTER.length - team.length }).map((_, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full border-2 border-dashed border-gray-200 bg-gray-50"
            />
          ))}

          {team.length > 0 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-1 text-[9px] text-gray-400"
            >
              {team.length === ROSTER.length ? "Team ready 🎉" : "Building…"}
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Card 4: Flexible Billing — animated milestone invoice ── */

const INVOICE_LINES = [
  { phase: "Discovery & Planning",  pct: 15, amount: 2250  },
  { phase: "Design & Prototyping",  pct: 20, amount: 3000  },
  { phase: "Development — Phase 1", pct: 30, amount: 4500  },
  { phase: "Development — Phase 2", pct: 25, amount: 3750  },
  { phase: "QA, Launch & Handover", pct: 10, amount: 1500  },
];
const INVOICE_TOTAL = INVOICE_LINES.reduce((s, l) => s + l.amount, 0);

function AnimatedCount({ to, prefix = "" }: { to: number; prefix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const dur = 900;
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to]);
  return <>{prefix}{val.toLocaleString()}</>;
}

function FlexibleBilling() {
  const [paid, setPaid] = useState(0); // how many milestones are paid
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function play() {
      setPaid(0);
      for (let i = 1; i <= INVOICE_LINES.length; i++) {
        await new Promise((r) => setTimeout(r, 1100));
        if (cancelled) return;
        setPaid(i);
      }
      await new Promise((r) => setTimeout(r, 2200));
      if (!cancelled) setCycle((c) => c + 1);
    }
    play();
    return () => { cancelled = true; };
  }, [cycle]);

  const paidTotal = INVOICE_LINES.slice(0, paid).reduce((s, l) => s + l.amount, 0);
  const progress = (paidTotal / INVOICE_TOTAL) * 100;

  return (
    <div className="w-full flex flex-col gap-2.5 px-1">
      {/* Invoice header */}
      <div className="flex items-center justify-between mb-0.5">
        <div>
          <p className="text-[10px] font-bold text-[#0f1c3f] leading-none">Project Invoice</p>
          <p className="text-[9px] text-gray-400 mt-0.5">INV-2024-0042 · Milestone billing</p>
        </div>
        <span className="text-[9px] font-semibold text-[#0048ff] bg-[#0048ff]/08 px-2 py-0.5 rounded-full border border-[#0048ff]/15">
          {paid === INVOICE_LINES.length ? "Paid ✓" : "In progress"}
        </span>
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-1">
        {INVOICE_LINES.map((line, i) => {
          const isPaid = i < paid;
          const isCurrent = i === paid;
          return (
            <motion.div
              key={line.phase}
              animate={{
                opacity: i > paid ? 0.38 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              {/* Status dot */}
              <motion.div
                animate={{
                  background: isPaid ? "#10b981" : isCurrent ? "#0048ff" : "#e5e7eb",
                  scale: isCurrent ? 1.2 : 1,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-2 h-2 rounded-full flex-shrink-0"
              />

              {/* Phase label */}
              <p className="flex-1 text-[10px] text-[#0f1c3f] leading-none truncate">{line.phase}</p>

              {/* Percent pill */}
              <span className="text-[8px] text-gray-400 tabular-nums w-6 text-right flex-shrink-0">
                {line.pct}%
              </span>

              {/* Amount */}
              <motion.span
                animate={{ color: isPaid ? "#10b981" : isCurrent ? "#0048ff" : "#9ca3af" }}
                transition={{ duration: 0.3 }}
                className="text-[10px] font-semibold tabular-nums w-14 text-right flex-shrink-0"
              >
                ${line.amount.toLocaleString()}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
        <div className="flex-1 mr-3">
          {/* Progress bar */}
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#0048ff] rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <p className="text-[8px] text-gray-400 mt-1">{paid} of {INVOICE_LINES.length} milestones paid</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[8px] text-gray-400 leading-none">Paid so far</p>
          <p className="text-[13px] font-bold text-[#0f1c3f] leading-tight tabular-nums">
            <AnimatedCount key={`${cycle}-${paid}`} to={paidTotal} prefix="$" />
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Card 5: Lifetime Support — animated ticket resolution flow ── */

type TicketStatus = "Open" | "In Review" | "Fix Deployed" | "Resolved";

const TICKETS: { id: string; title: string; priority: "High" | "Medium" | "Low"; tag: string }[] = [
  { id: "ACR-041", title: "Login redirect loop on Safari", priority: "High",   tag: "Bug"     },
  { id: "ACR-042", title: "Dashboard chart not loading",   priority: "Medium", tag: "Bug"     },
  { id: "ACR-043", title: "Add CSV export to reports",     priority: "Low",    tag: "Feature" },
];

const STATUS_FLOW: TicketStatus[] = ["Open", "In Review", "Fix Deployed", "Resolved"];

const PRIORITY_COLOR: Record<string, string> = {
  High:   "#ef4444",
  Medium: "#f59e0b",
  Low:    "#10b981",
};

const STATUS_COLOR: Record<TicketStatus, { bg: string; text: string }> = {
  "Open":         { bg: "rgba(239,68,68,0.1)",   text: "#ef4444"  },
  "In Review":    { bg: "rgba(0,72,255,0.08)",    text: "#0048ff"  },
  "Fix Deployed": { bg: "rgba(245,158,11,0.1)",   text: "#f59e0b"  },
  "Resolved":     { bg: "rgba(16,185,129,0.1)",   text: "#10b981"  },
};

function LifetimeSupport() {
  const [ticketIdx, setTicketIdx] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [cycle, setCycle] = useState(0);

  const ticket = TICKETS[ticketIdx];
  const status = STATUS_FLOW[statusIdx];

  useEffect(() => {
    let cancelled = false;
    async function play() {
      setStatusIdx(0);
      for (let s = 1; s < STATUS_FLOW.length; s++) {
        await new Promise((r) => setTimeout(r, 1200));
        if (cancelled) return;
        setStatusIdx(s);
      }
      await new Promise((r) => setTimeout(r, 1800));
      if (cancelled) return;
      setTicketIdx((idx) => (idx + 1) % TICKETS.length);
      setCycle((c) => c + 1);
    }
    play();
    return () => { cancelled = true; };
  }, [cycle]);

  return (
    <div className="w-full flex flex-col gap-2.5 px-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-[#0f1c3f]">Support Tickets</p>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-500 font-medium">Live</span>
        </div>
      </div>

      {/* Active ticket card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${cycle}-${ticketIdx}`}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm"
        >
          {/* Ticket meta */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[9px] font-mono text-gray-300">{ticket.id}</span>
                <span
                  className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: `${PRIORITY_COLOR[ticket.priority]}15`, color: PRIORITY_COLOR[ticket.priority] }}
                >
                  {ticket.priority}
                </span>
                <span className="text-[8px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                  {ticket.tag}
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#0f1c3f] leading-snug">{ticket.title}</p>
            </div>
            {/* Status badge */}
            <motion.span
              key={status}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="text-[8px] font-semibold px-2 py-1 rounded-full flex-shrink-0"
              style={{ background: STATUS_COLOR[status].bg, color: STATUS_COLOR[status].text }}
            >
              {status}
            </motion.span>
          </div>

          {/* Status progress trail */}
          <div className="flex items-center gap-1 mt-2.5">
            {STATUS_FLOW.map((s, i) => {
              const done = i <= statusIdx;
              const isCur = i === statusIdx;
              return (
                <React.Fragment key={s}>
                  <motion.div
                    animate={{
                      background: done ? STATUS_COLOR[s].text : "#e5e7eb",
                      scale: isCur ? 1.25 : 1,
                    }}
                    transition={{ duration: 0.35 }}
                    className="w-2 h-2 rounded-full flex-shrink-0"
                  />
                  {i < STATUS_FLOW.length - 1 && (
                    <motion.div
                      animate={{ background: i < statusIdx ? "#10b981" : "#e5e7eb" }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 h-px"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="flex justify-between mt-1">
            {STATUS_FLOW.map((s) => (
              <span key={s} className="text-[7px] text-gray-300 leading-none">{s.split(" ")[0]}</span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Queue — other tickets dimmed */}
      <div className="flex flex-col gap-1.5">
        {TICKETS.filter((_, i) => i !== ticketIdx).map((t) => (
          <div key={t.id} className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-2.5 py-1.5 opacity-40">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: PRIORITY_COLOR[t.priority] }}
            />
            <span className="text-[9px] font-mono text-gray-400">{t.id}</span>
            <span className="text-[9px] text-gray-500 truncate flex-1">{t.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Bento card wrapper */
function BentoCard({
  title,
  desc,
  children,
  className = "",
  delay = 0,
  widgetHeight = "h-52",
  maskTop = true,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  widgetHeight?: string;
  maskTop?: boolean;
}) {
  const mask = maskTop
    ? "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)"
    : "linear-gradient(to bottom, black 70%, transparent 100%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border border-gray-100 bg-[#f5f8ff] p-5 flex flex-col gap-4 overflow-hidden ${className}`}
    >
      {/* Widget area */}
      <div
        className={`relative ${widgetHeight} overflow-hidden flex items-start justify-center`}
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {children}
      </div>
      {/* Text */}
      <div>
        <h3 className="text-base font-semibold text-[#0f1c3f] tracking-tight">{title}</h3>
        <p className="mt-1 text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function BentoSection() {
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <style>{`
        @keyframes marqueeRev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
      <div className="max-w-[1350px] mx-auto">
        <Reveal>
          <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight mb-3">
            More Than Just Services
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[500px] mb-10 sm:mb-14">
            We go beyond delivery — transparent pricing, expert matching, flexible billing,
            and a 12-month warranty. Built to last, long after launch.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1: chat (wide) + timeline */}
          <BentoCard
            title="Transparent Pricing"
            desc="No hidden fees. Fixed price from day one — design, dev, QA and launch all included."
            className="md:col-span-2"
            delay={0}
          >
            <div className="w-full max-w-xs mx-auto">
              <AnimatedChat />
            </div>
          </BentoCard>

          <BentoCard
            title="Fast, Structured Delivery"
            desc="Every project follows a clear milestone plan so you always know what's next."
            delay={0.08}
            widgetHeight="h-64"
            maskTop={false}
          >
            <KanbanBoard />
          </BentoCard>

          {/* Row 2: experts + billing + support (wide) */}
          <BentoCard
            title="Expert Match"
            desc="We handpick senior engineers, designers and strategists specifically for your project."
            delay={0.14}
          >
            <ExpertMatch />
          </BentoCard>

          <BentoCard
            title="Flexible Billing"
            desc="Milestone-based payments tied to delivery — you only pay when work is done and approved."
            delay={0.2}
            widgetHeight="h-64"
            maskTop={false}
          >
            <FlexibleBilling />
          </BentoCard>

          <BentoCard
            title="Lifetime Support"
            desc="12-month bug-free warranty. Every issue raised, triaged and resolved — long after launch."
            delay={0.26}
            widgetHeight="h-64"
            maskTop={false}
          >
            <LifetimeSupport />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════════ */

const FEATURED = allProjects.slice(0, 3);

// Polaroid card dimensions
const POL_W = 440;
const POL_PAD = 14;
const POL_TAB = 72;
const POL_IMG_W = POL_W - POL_PAD * 2;          // 412
const POL_IMG_H = Math.round(POL_IMG_W * 0.75); // 309
const POL_H = POL_PAD + POL_IMG_H + POL_TAB;    // 395

// z-index per active index: [card0z, card1z, card2z]
const ZMAP = [
  [3, 2, 1], // active 0 → card0 front
  [1, 3, 2], // active 1 → card1 front
  [2, 1, 3], // active 2 → card2 front
] as const;

function ProjectCarousel({
  scrollProgress,
  active,
}: {
  scrollProgress: MotionValue<number>;
  active: number;
}) {
  // Each card travels front(0) → left-back(0.5) → right-back(1),
  // right-back(0) → front(0.5) → left-back(1), or
  // left-back(0) → right-back(0.5) → front(1).
  // x/y/scale/rotate keyframes at progress [0, 0.5, 1]:
  const c0x  = useTransform(scrollProgress, [0, 0.5, 1], [0,   -72,  80]);
  const c0y  = useTransform(scrollProgress, [0, 0.5, 1], [0,    24, -20]);
  const c0sc = useTransform(scrollProgress, [0, 0.5, 1], [1,  0.82, 0.91]);
  const c0ro = useTransform(scrollProgress, [0, 0.5, 1], [-1.5, -12,   9]);
  const c0sh = useTransform(c0sc,
    [0.82, 0.91, 1],
    ["0px 4px 20px rgba(0,0,0,0.10), 0px 1px 4px rgba(0,0,0,0.06)",
     "0px 12px 40px rgba(0,0,0,0.14), 0px 2px 8px rgba(0,0,0,0.07)",
     "0px 36px 80px rgba(0,0,0,0.26), 0px 10px 28px rgba(0,0,0,0.12)"],
  );

  const c1x  = useTransform(scrollProgress, [0, 0.5, 1], [80,     0,  -72]);
  const c1y  = useTransform(scrollProgress, [0, 0.5, 1], [-20,    0,   24]);
  const c1sc = useTransform(scrollProgress, [0, 0.5, 1], [0.91,   1, 0.82]);
  const c1ro = useTransform(scrollProgress, [0, 0.5, 1], [9,   -1.5,  -12]);
  const c1sh = useTransform(c1sc,
    [0.82, 0.91, 1],
    ["0px 4px 20px rgba(0,0,0,0.10), 0px 1px 4px rgba(0,0,0,0.06)",
     "0px 12px 40px rgba(0,0,0,0.14), 0px 2px 8px rgba(0,0,0,0.07)",
     "0px 36px 80px rgba(0,0,0,0.26), 0px 10px 28px rgba(0,0,0,0.12)"],
  );

  const c2x  = useTransform(scrollProgress, [0, 0.5, 1], [-72,   80,    0]);
  const c2y  = useTransform(scrollProgress, [0, 0.5, 1], [24,   -20,    0]);
  const c2sc = useTransform(scrollProgress, [0, 0.5, 1], [0.82, 0.91,   1]);
  const c2ro = useTransform(scrollProgress, [0, 0.5, 1], [-12,    9, -1.5]);
  const c2sh = useTransform(c2sc,
    [0.82, 0.91, 1],
    ["0px 4px 20px rgba(0,0,0,0.10), 0px 1px 4px rgba(0,0,0,0.06)",
     "0px 12px 40px rgba(0,0,0,0.14), 0px 2px 8px rgba(0,0,0,0.07)",
     "0px 36px 80px rgba(0,0,0,0.26), 0px 10px 28px rgba(0,0,0,0.12)"],
  );

  const cards = [
    { x: c0x, y: c0y, scale: c0sc, rotate: c0ro, boxShadow: c0sh },
    { x: c1x, y: c1y, scale: c1sc, rotate: c1ro, boxShadow: c1sh },
    { x: c2x, y: c2y, scale: c2sc, rotate: c2ro, boxShadow: c2sh },
  ];

  return (
    <div className="relative w-full" style={{ height: POL_H + 150 }}>
      {FEATURED.map((p, i) => (
        <motion.div
          key={p.slug}
          className="absolute"
          style={{
            width: POL_W,
            left: "50%",
            top: "50%",
            marginLeft: -(POL_W / 2),
            marginTop: -(POL_H / 2),
            zIndex: ZMAP[active][i],
            x: cards[i].x,
            y: cards[i].y,
            scale: cards[i].scale,
            rotate: cards[i].rotate,
          }}
        >
          <motion.div
            style={{
              background: "#fdfcfb",
              padding: `${POL_PAD}px ${POL_PAD}px 0`,
              borderRadius: 3,
              boxShadow: cards[i].boxShadow,
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{ width: POL_IMG_W, height: POL_IMG_H, background: "#f1f0ef" }}
            >
              <Image
                src={p.src}
                alt={p.title}
                fill
                className="object-contain p-2"
                sizes="240px"
                priority={i === 0}
              />
            </div>
            <div className="flex items-center justify-center" style={{ height: POL_TAB }}>
              <span
                className="text-[10px] tracking-widest font-medium text-gray-400 uppercase"
                style={{ fontFamily: "ui-monospace, 'Courier New', monospace" }}
              >
                {p.title}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectInfo({ active }: { active: number }) {
  const p = FEATURED[active];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={p.slug}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col"
      >
        {/* Counter + category */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[11px] text-gray-300 tracking-widest">
            {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(FEATURED.length).padStart(2, "0")}
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#0048ff]">
            {p.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-4xl font-semibold text-[#0f1c3f] tracking-tight leading-[1.1] mb-4">
          {p.title}
        </h3>

        {/* Description */}
        <p className="text-[15px] text-gray-400 leading-relaxed mb-8">
          {p.description}
        </p>

        {/* Key results — plain numbers, no boxes */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-8">
          {p.results.slice(0, 4).map((r) => (
            <div key={r.label}>
              <p className="text-2xl font-bold text-[#0f1c3f] leading-none mb-1">{r.metric}</p>
              <p className="text-[11px] text-gray-400 tracking-wide">{r.label}</p>
            </div>
          ))}
        </div>

        {/* Stack — icon badges, at least 5 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {p.stack.slice(0, 6).map((tech) => {
            const icon = TECH_ICON_MAP[tech.toLowerCase()];
            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#f5f8ff] border border-gray-100 text-[10px] font-semibold text-gray-500 tracking-wide"
              >
                {icon && (
                  <img src={icon} alt={tech} style={{ width: 13, height: 13, objectFit: "contain", flexShrink: 0 }} />
                )}
                {tech}
              </span>
            );
          })}
        </div>

        {/* CTA */}
        <Link
          href={`/projects/${p.slug}`}
          className="inline-flex items-center gap-3 text-sm font-semibold text-[#0f1c3f] hover:text-[#0048ff] transition-colors duration-200 group w-fit"
        >
          View case study
          <span className="w-7 h-7 rounded-full bg-[#0f1c3f] group-hover:bg-[#0048ff] flex items-center justify-center transition-colors duration-200">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}

const PROJ_NAVBAR_H = 64;

const TECH_ICON_MAP: Record<string, string> = {
  // ── Local icons ─────────────────────────────────────────────────────────────
  "react":           "/icons/react.svg",
  "react native":    "/icons/react.svg",
  "next.js":         "/icons/next js.webp",
  "node.js":         "/icons/node js.png",
  "typescript":      "/icons/typescript.svg",
  "tailwind css":    "/icons/tailwind.webp",
  "tailwind":        "/icons/tailwind.webp",
  "mongodb":         "/icons/mongo.svg",
  "postgresql":      "/icons/postgresql.webp",
  "docker":          "/icons/Docker.svg",
  "aws":             "/icons/aws.svg",
  "python":          "/icons/python.svg",
  "flutter":         "/icons/Flutter.svg",
  "go":              "/icons/go.svg",
  "git":             "/icons/github.png",
  "github":          "/icons/github.png",
  "redis":           "/icons/redis.svg",
  "fastapi":         "/icons/fast api.png",
  "fast api":        "/icons/fast api.png",
  "socket.io":       "/icons/Socket.io.png",
  "openai":          "/icons/open ai.webp",
  "openai api":      "/icons/open ai.webp",
  "tensorflow":      "/icons/tensorflow.svg",
  "supabase":        "/icons/supabase.webp",
  "vercel":          "/icons/vercel.png",
  "figma":           "/icons/figma.png",
  "vue":             "/icons/vue.svg",
  "vue.js":          "/icons/vue.svg",
  "angular":         "/icons/angular.svg",
  "mysql":           "/icons/MySQL.svg",
  "kubernetes":      "/icons/Kubernetes.svg",
  "terraform":       "/icons/HashiCorp-Terraform.svg",
  "redux":           "/icons/redux.svg",
  "langchain":       "/icons/langchain.webp",
  "azure":           "/icons/azure.svg",
  "kafka":           "/icons/Apache-Kafka.png",
  "elasticsearch":   "/icons/Elastic-Search.png",
  "bun":             "/icons/bun.svg",
  // ── CDN fallbacks ────────────────────────────────────────────────────────────
  "javascript":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "express.js":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "express":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "django":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  "nest.js":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
  "nestjs":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
  "sqlite":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  "bootstrap":    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "html":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "css":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "graphql":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  "firebase":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "prisma":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  "stripe":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg",
};

// Minimum viewport height needed for the polaroid stack to fit comfortably
const MIN_VIEWPORT_H = 600;

function LegacyProjectsSection() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [isTooShort, setIsTooShort] = useState(false);
  const total = FEATURED.length;

  // Height check — runs on mount + resize
  useEffect(() => {
    const check = () => setIsTooShort(window.innerHeight < MIN_VIEWPORT_H);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll progress for the polaroid animation
  useEffect(() => {
    const outer = desktopRef.current;
    if (!outer) return;
    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const panelH = window.innerHeight - PROJ_NAVBAR_H;
      const scrollable = outer.offsetHeight - panelH;
      const scrolled = Math.max(0, -(rect.top - PROJ_NAVBAR_H));
      const raw = Math.min(1, scrolled / scrollable);
      scrollProgress.set(raw);
      setActive(Math.min(total - 1, Math.round(raw * (total - 1))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollProgress, total]);

  // ── Simple stacked layout (mobile + short-height screens) ──────────────
  const SimpleLayout = () => (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-[1350px] mx-auto">
   
        <div className="flex items-end justify-between mb-12 gap-4">
          <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight leading-[1.05]">
            Work that speaks for itself.
          </h2>
          <Link href="/projects" className="text-sm font-medium text-[#0048ff] shrink-0 inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
            View all
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-pointer"
            >
              <Link href={`/projects/${p.slug}`} className="no-underline block group">
                <div className="rounded-2xl overflow-hidden bg-[#f5f8ff] border border-gray-100 mb-4 relative" style={{ aspectRatio: "4/3" }}>
                  <Image src={p.src} alt={p.title} fill className="object-contain p-6 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="font-mono text-[10px] text-gray-300">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#0048ff]">{p.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#0f1c3f] leading-snug mb-1.5">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((tech) => {
                    const icon = TECH_ICON_MAP[tech.toLowerCase()];
                    return (
                      <span key={tech} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#f5f8ff] border border-gray-100 text-[10px] font-semibold text-gray-500">
                        {icon && <img src={icon} alt={tech} style={{ width: 11, height: 11, objectFit: "contain" }} />}
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Short screens → simple layout everywhere
  if (isTooShort) return <SimpleLayout />;

  return (
    <>
      {/* ── Desktop tall screens: scroll-locked polaroid stack ── */}
      <div
        ref={desktopRef}
        className="hidden lg:block relative"
        style={{ height: `calc(${total * 90}vh)` }}
      >
        <div
          className="sticky bg-white"
          style={{ top: PROJ_NAVBAR_H, height: `calc(100vh - ${PROJ_NAVBAR_H}px)` }}
        >
          <div
            className="h-full flex flex-col max-w-[1350px] mx-auto w-full px-6 xl:px-10"
            style={{
              paddingTop: "clamp(32px, 4vh, 52px)",
              paddingBottom: "clamp(20px, 2.5vh, 36px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between flex-shrink-0 mb-8">
              <div>
             
                <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight leading-[1.05]">
                  Work that speaks for itself.
                </h2>
              </div>
              <Link
                href="/customers"
                className="inline-flex items-center gap-2.5 text-sm font-medium text-[#0f1c3f] hover:text-[#0048ff] transition-colors group"
              >
                View all projects
                <span className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#0048ff] group-hover:bg-[#0048ff] transition-all duration-200">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-white transition-colors duration-200">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Two-column body */}
            <div
              className="flex-1 grid gap-12 xl:gap-16 min-h-0 items-center"
              style={{ gridTemplateColumns: "1fr 1fr" }}
            >
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <ProjectCarousel scrollProgress={scrollProgress} active={active} />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <ProjectInfo active={active} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile (narrow screens, tall or short): simple grid ── */}
      <div className="lg:hidden">
        <SimpleLayout />
      </div>
    </>
  );
}

const SHOWCASE_SLUGS = ["sofi", "domestika", "depop", "healthtap", "sololearn", "overcast", "doxy", "radiogarden"];
const SHOWCASE_PROJECTS = SHOWCASE_SLUGS.map((s) => allProjects.find((p) => p.slug === s)!).filter(Boolean);

const PROJECT_ICON_MAP: Record<string, string> = {
  "next.js": "/icons/next js.webp",
  react: "/icons/react.svg",
  "node.js": "/icons/node js.png",
  typescript: "/icons/typescript.svg",
  "tailwind css": "/icons/tailwind.webp",
  tailwind: "/icons/tailwind.webp",
  postgresql: "/icons/postgresql.webp",
  mongodb: "/icons/mongo.svg",
  redis: "/icons/redis.svg",
  aws: "/icons/aws.svg",
  "aws lambda": "/icons/Lambda.png",
  cdn: "/icons/cdn.png",
  docker: "/icons/Docker.svg",
  terraform: "/icons/HashiCorp-Terraform.svg",
  fastapi: "/icons/fast api.png",
  openai: "/icons/open ai.webp",
  "openai api": "/icons/open ai.webp",
  "openai whisper": "/icons/open ai whisper.png",
  whisper: "/icons/open ai whisper.png",
  "gpt-4": "/icons/gpt4.png",
  "openai gpt-4": "/icons/gpt4.png",
  langchain: "/icons/langchain.webp",
  supabase: "/icons/supabase.webp",
  vercel: "/icons/vercel.png",
  "socket.io": "/icons/Socket.io.png",
  "hl7 fhir": "/icons/hl7.svg",
  python: "/icons/python.svg",
  "chart.js": "/icons/chartjs.svg",
  "stripe connect": "/icons/stripeconnect.jpeg",
  mux: "/icons/mux.jpeg",
  "framer motion": "/icons/framer-motion.png",
  pinecone: "/icons/pinecone.svg",
  "groq api": "/icons/grok.svg",
  websockets: "/icons/sockets.png",
  webrtc: "/icons/webrtc.png",
  hls: "/icons/hls.svg",
  appwrite: "/icons/appwrite.svg",
  "appwrite storage": "/icons/appwrite.svg",
  "appwrite auth": "/icons/appwrite.svg",
};

function normalizeTechName(name: string) {
  return name.trim().toLowerCase();
}

function getProjectTechIcons(project: (typeof SHOWCASE_PROJECTS)[number]) {
  const names = project.techStack.flatMap((group) => group.items);
  const seen = new Set<string>();

  return names.reduce<{ name: string; src: string }[]>((icons, name) => {
    const src = PROJECT_ICON_MAP[normalizeTechName(name)];
    if (!src || seen.has(src)) return icons;
    seen.add(src);
    icons.push({ name, src });
    return icons;
  }, []);
}

function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [isProjectPaused, setIsProjectPaused] = useState(false);
  const total = SHOWCASE_PROJECTS.length;

  useEffect(() => {
    if (isProjectPaused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [isProjectPaused, total]);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
             
              <h2 className="text-4xl font-medium tracking-tight text-[#0f1c3f] sm:text-5xl">
                Work that speaks for itself.
              </h2>
              <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-gray-500">
                A rotating archive of products we have shipped across AI, healthcare, FinTech, SaaS, and cloud platforms.
              </p>
            </div>
            <Link
              href="/customers"
              className="group inline-flex w-fit items-center gap-2.5 text-sm font-medium text-[#0f1c3f] transition-colors hover:text-[#0048ff]"
            >
              View all projects
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 transition-all duration-200 group-hover:border-[#0048ff] group-hover:bg-[#0048ff] group-hover:text-white">
                <ArrowUpRight size={14} strokeWidth={2.4} />
              </span>
            </Link>
          </div>
        </Reveal>

    
        <div className="border-t border-gray-300">
          {SHOWCASE_PROJECTS.map((project, index) => {
            const isActive = index === active;
            const techIcons = getProjectTechIcons(project);
            return (
              <div
                key={project.slug}
                className="border-b border-gray-300"
                onMouseEnter={() => {
                  if (isActive) setIsProjectPaused(true);
                }}
                onMouseLeave={() => {
                  if (isActive) setIsProjectPaused(false);
                }}
                onFocus={() => {
                  if (isActive) setIsProjectPaused(true);
                }}
                onBlur={() => {
                  if (isActive) setIsProjectPaused(false);
                }}
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className="group flex w-full items-center justify-between gap-5 py-6 text-left sm:py-7 cursor-pointer"
                  aria-expanded={isActive}
                >
                  <h3 className="text-2xl font-semibold uppercase leading-tight tracking-tight text-[#0f1c3f] sm:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-colors group-hover:border-[#0048ff] group-hover:text-[#0048ff]">
                    {isActive ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key={`${project.slug}-panel`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-7 pb-8 lg:grid-cols-[0.9fr_1.8fr_0.8fr] lg:gap-10 lg:pb-10">
                        <div className="flex flex-col justify-between gap-7">
                          <div>
                            <div className="mb-6 flex items-center gap-2 text-[11px] font-medium text-[#0f1c3f]">
                              <span className="h-2.5 w-2.5 rounded-full bg-[#0048ff]" />
                              {project.industry} / {project.platform}
                            </div>
                            <div className="space-y-3 border-y border-gray-200 py-4">
                              {project.results.slice(0, 3).map((result) => (
                                <div key={result.label} className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                                  <span className="text-[11px] text-gray-500">{result.label}</span>
                                  <span className="text-[12px] font-bold text-[#0f1c3f]">{result.metric}</span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-6">
                              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                                Core technologies
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {techIcons.slice(0, 8).map((tech) => (
                                  <span
                                    key={`${project.slug}-${tech.src}`}
                                    className="group/tech inline-flex items-center gap-2 border border-gray-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-500 transition-colors hover:border-[#0048ff]/25 hover:text-[#0f1c3f]"
                                  >
                                    <span className="relative h-4 w-4 overflow-hidden">
                                      <Image
                                        src={tech.src}
                                        alt={tech.name}
                                        fill
                                        className="object-contain"
                                        sizes="16px"
                                      />
                                    </span>
                                    {tech.name.replace("Appwrite Storage", "Appwrite").replace("Appwrite Auth", "Appwrite")}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                        </div>

                        <Link
                          href={`/projects/${project.slug}`}
                          className="relative block min-h-[260px] overflow-hidden bg-[#f5f8ff] lg:min-h-[430px]"
                        >
                          <Image
                            src={project.src}
                            alt={project.title}
                            fill
                            className="object-contain p-2 sm:p-4"
                            sizes="(max-width: 1024px) 100vw, 1200px"
                            quality={100}
                            priority={index === 0}
                          />
                        </Link>

                        <div className="lg:block">
                          <div className="relative hidden h-28 overflow-hidden bg-[#f5f8ff] lg:mb-9 lg:block">
                            <Image
                              src={project.src}
                              alt={`${project.title} detail`}
                              fill
                              className="object-contain p-1"
                              sizes="220px"
                              quality={100}
                            />
                          </div>

                          <div>
                            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f1c3f]">
                              About project:
                            </p>
                            <p className="mb-5 text-sm leading-relaxed text-gray-600">
                              {project.about}
                            </p>
                            <Link
                              href={`/projects/${project.slug}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f1c3f] transition-colors hover:text-[#0048ff]"
                            >
                              View case study
                              <ArrowUpRight size={14} strokeWidth={2.4} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { openModal } = useContactModal();

  return (
    <main className="min-h-screen bg-white">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .card-effect-02 {
          clip-path: polygon(100% 0, 100% 88%, 88% 100%, 0 100%, 0 0);
          background-color: rgba(0,72,255,0.06);
          transition: background 0.4s ease;
          border-radius: 16px;
        }
        .card-effect-02:hover { background-color: rgba(0,72,255,0.14); }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <div className="flex items-center justify-center px-3 sm:px-4 pb-4 pt-4">
        <div className="w-full max-w-[1350px] relative">
          <div
            className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{ minHeight: "clamp(420px, 55vw, 600px)" }}
          >
            <Image
              src="/bg-2.png"
              alt="Hero background"
              fill
              className="object-cover object-center"
              priority
              // sizes="(max-width: 768px) 100vw, 1350px"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
              }}
            />

            {/* Hero text — responsive padding and max-width */}
            <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-[560px]">
              <motion.h1
                className="text-white leading-[1.1] tracking-tight mb-3 sm:mb-4"
                style={{ fontSize: "clamp(1.45rem, 3.2vw, 2.8rem)" }}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                We Design, Build &amp; Ship
                <br />
                Software That Actually Works.
              </motion.h1>
              <motion.p
                className="text-white/70 leading-relaxed mb-5 sm:mb-7"
                style={{ fontSize: "clamp(0.78rem, 1.1vw, 0.95rem)" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                From idea to production — our senior team delivers full-cycle
                software with a guaranteed outcome, fixed price, and a 12-month
                bug-free warranty.
              </motion.p>
              <motion.button
                onClick={openModal}
                className="btn-shimmer flex items-center gap-3 bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full hover:bg-gray-100 transition-colors w-fit cursor-pointer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get in contact
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0048ff] text-white flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </motion.button>
            </div>
          </div>

          {/* White cutout + ReviewCard — hidden on small screens, visible sm+ */}
          <div
            className="hidden sm:block absolute bottom-0 right-0 bg-white"
            style={{
              width: "28%",
              height: "42%",
              maxHeight: "110px",
              borderRadius: "16px 0 0 0",
            }}
          />
          <div className="hidden sm:block">
            <ReviewCard />
          </div>
        </div>
      </div>

      {/* ── SOCIAL PROOF MARQUEE ── */}
      <section className="bg-white border-y border-gray-100 py-12 overflow-hidden">
        <div className="max-w-[1350px] mx-auto">
          <p className="text-center text-xs font-semibold tracking-[0.18em] uppercase text-gray-400 mb-8">
            Trusted by innovative companies worldwide
          </p>
        </div>
        <div className="relative flex overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, white, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, white, transparent)" }}
          />
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center flex-shrink-0"
              style={{ animation: "marquee 40s linear infinite", paddingRight: "4rem" }}
            >
              {[
                { name: "SoFi",         src: "/customers%20logos/sofi-logo.svg",            showName: false },
                { name: "Domestika",    src: "/customers%20logos/domestika.png",             showName: false },
                { name: "Depop",        src: "/customers%20logos/depop.webp",                showName: true  },
                { name: "HealthTap",    src: "/customers%20logos/healthtap.svg",             showName: false },
                { name: "SoloLearn",    src: "/customers%20logos/sololearn.webp",            showName: true  },
                { name: "Overcast",     src: "/customers%20logos/overcast.webp",             showName: true  },
                { name: "Doxy.me",      src: "/customers%20logos/doxy.svg",                  showName: false },
                { name: "Radio Garden", src: "/customers%20logos/radio%20garden.webp",       showName: true  },
                { name: "Groove HQ",    src: "/customers%20logos/groove.webp",               showName: false },
                { name: "Veeps",        src: "/customers%20logos/veeps.png",                 showName: false, height: 18 },
                { name: "Oportun",      src: "/customers%20logos/opportun.webp",             showName: true  },
                { name: "Shopventory",  src: "/customers%20logos/shopventory.svg",           showName: false },
                { name: "Round Health", src: "/customers%20logos/all%20round%20health.webp", showName: true  },
                { name: "Peanut",       src: "/customers%20logos/peanut.webp",               showName: true  },
                { name: "Shut Eye",     src: "/customers%20logos/shuteye.webp",              showName: true  },
                { name: "Temboo",       src: "/customers%20logos/temboo.png",                showName: false },
                { name: "Realvolve",    src: "/customers%20logos/realvolve.svg",             showName: false },
              ].map(({ name, src, showName, height }) => (
                <div
                  key={name}
                  className="flex items-center gap-2.5 justify-center flex-shrink-0 px-10 opacity-40 grayscale hover:opacity-90 hover:grayscale-0 transition-all duration-300 cursor-default"
                >
                  <img
                    src={src}
                    alt={name}
                    style={{ height: `${height ?? 28}px`, width: "auto", maxWidth: "130px", objectFit: "contain" }}
                  />
                  {showName && (
                    <span className="text-sm font-semibold text-[#0f1c3f] whitespace-nowrap tracking-tight">
                      {name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-[#f5f8ff] border-y border-gray-100 py-14 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y-[1px] md:divide-y-0 md:divide-x-[1px] divide-gray-200">
            {[
              { value: 200, suffix: "+", label: "Projects Delivered",   sub: "Across 18+ industries globally"              },
              { value: 98,  suffix: "%", label: "Client Satisfaction",  sub: "Based on post-launch reviews"                },
              { value: 12,  suffix: "+", label: "Years of Experience",  sub: "Building production software since 2012"     },
              { value: 50,  suffix: "+", label: "Expert Engineers",     sub: "Senior-only, no juniors on your project"     },
            ].map(({ value, suffix, label, sub }, i) => (
              <Reveal key={label} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center px-6 py-8 md:py-2 gap-3">
                  <p className="text-4xl sm:text-5xl font-bold text-[#0f1c3f] leading-none tracking-tight">
                    <Counter to={value} suffix={suffix} />
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-[#0f1c3f] leading-none">{label}</p>
                    <p className="text-[11px] text-gray-400 mt-1.5 leading-snug max-w-[160px] mx-auto">{sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-[1350px] mx-auto">
          <Reveal>
          
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight mb-3">
              Our Services
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[480px] mb-8 sm:mb-12">
              We craft bold digital solutions that drive growth. From concept to
              launch, solving real-world problems with precision and creativity.
            </p>
          </Reveal>
          <ServicesHoverList />
        </div>
      </section>

      {/* ── MORE THAN JUST SERVICES — Acernity-style bento ── */}
      <BentoSection />

      {/* ── PROJECTS ── */}
      <ProjectsSection />

      <Testimonials />
      <ComplianceCovered />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
