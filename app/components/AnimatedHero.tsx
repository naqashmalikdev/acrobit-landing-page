"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const PILL_WIDTH = 152;

/*
  dir "right": cursor stays LEFT, box grows rightward  (top-left unit)
  dir "left":  cursor stays RIGHT, box grows leftward  (bottom-right unit)
*/
const UNITS: { id: string; x: string; y: string; pill: string; delay: number; dir: "right" | "left" }[] = [
  { id: "tl", x: "13%", y: "34%", pill: "AI Agents",    delay: 0.4, dir: "right" },
  { id: "br", x: "72%", y: "58%", pill: "4.9 ★ Rating", delay: 1.0, dir: "left"  },
];

function Unit({
  x, y, pill, delay, dir,
}: {
  x: string; y: string; pill: string; delay: number; dir: "right" | "left";
}) {
  const [showBox, setShowBox]   = useState(false);
  const [ripple,  setRipple]    = useState(false);
  const [clicking, setClicking] = useState(false);
  const boxWidth = useMotionValue(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => {
      setClicking(true);
      setRipple(true);
      timers.push(setTimeout(() => setRipple(false), 400));

      timers.push(setTimeout(() => {
        setClicking(false);
        setShowBox(true);
        animate(boxWidth, PILL_WIDTH, {
          duration: 0.52,
          ease: [0.25, 0.1, 0.25, 1],
        });
      }, 220));
    }, delay * 1000));

    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  /*
    dir="right": anchor = left edge. Box grows right. Cursor tip at left edge → left:-8, top:-10, x stays 0.
    dir="left":  anchor = right edge. Box grows left (negative left offset). Cursor tip at right edge → left = boxWidth-8.
  */

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y }}>

      {/* Pill box */}
      {showBox && (
        <motion.div
          className="absolute overflow-hidden whitespace-nowrap"
          style={{
            top: 0,
            /* right-growing: left=0; left-growing: right-anchor means left = -width */
            left: dir === "right" ? 0 : undefined,
            right: dir === "left" ? 0 : undefined,
            height: 38,
            width: boxWidth,
            background: "#0048ff",
            borderRadius: 999,
            boxShadow: "0 6px 24px rgba(0,72,255,0.28)",
          }}
        >
          <div className="flex items-center justify-center gap-2 px-4 h-full">
            <span className="text-[12px] font-semibold text-white tracking-wide">{pill}</span>
          </div>
        </motion.div>
      )}

      {/* Cursor */}
      <motion.div
        className="absolute"
        style={{
          /* dir=right: tip at left edge (x=0 always)
             dir=left:  tip at right edge (x = boxWidth) */
          top: -11,
          left: dir === "right" ? -8 : undefined,
          right: dir === "left" ? -8 : undefined,
          x: dir === "left" ? boxWidth : 0,
        }}
      >
        <svg
          width="18" height="18" viewBox="0 0 20 20" fill="none"
          style={{
            filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.25))",
            transform: clicking ? "scale(0.78)" : "scale(1)",
            transition: "transform 0.12s ease",
            /* flip horizontally for left-dir so arrow points inward */
            ...(dir === "left" ? { transform: `scaleX(-1) ${clicking ? "scale(0.78)" : "scale(1)"}` } : {}),
          }}
        >
          <path d="M3 2L17 10L10 12L7 19L3 2Z" fill="#0f1c3f" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Ripple */}
      {ripple && (
        <motion.div
          className="absolute rounded-full border-2 border-[#0048ff]/40"
          style={{ top: 4, left: dir === "right" ? -2 : undefined, right: dir === "left" ? -2 : undefined, x: "-50%", y: "-50%" }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 42, height: 42, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
    </div>
  );
}

export interface AnimatedHeroProps {
  eyebrow: string;
  headingLine1: string;
  headingLine2?: string;
  headingAccent?: string;
  sub: string;
  children?: React.ReactNode;
}

export default function AnimatedHero({
  eyebrow,
  headingLine1,
  headingLine2,
  headingAccent,
  sub,
  children,
}: AnimatedHeroProps) {
  return (
    <div
      className="relative w-full overflow-hidden bg-white"
      style={{ minHeight: "clamp(480px, 60vw, 720px)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.55,
        }}
      />

      {UNITS.map((u) => <Unit key={u.id} {...u} />)}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 py-28 sm:py-36 text-center">

        <motion.p
          className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#0f1c3f]/40 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          className="font-bold text-[#0f1c3f] leading-[1.06] tracking-tight max-w-3xl mb-5"
          style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)" }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {headingLine1}
          {headingLine2 && (
            <>
              {" "}
              {headingAccent
                ? headingLine2.split(headingAccent).reduce<React.ReactNode[]>((acc, part, i, arr) => {
                    acc.push(<span key={`p${i}`}>{part}</span>);
                    if (i < arr.length - 1)
                      acc.push(
                        <span key={`a${i}`} style={{
                          background: "linear-gradient(90deg,#2563eb 0%,#0048ff 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}>{headingAccent}</span>
                      );
                    return acc;
                  }, [])
                : headingLine2}
            </>
          )}
        </motion.h1>

        <motion.p
          className="text-[#0f1c3f]/45 leading-relaxed max-w-[420px] mb-10"
          style={{ fontSize: "clamp(0.88rem, 1.2vw, 1rem)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {sub}
        </motion.p>

        {children && (
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
