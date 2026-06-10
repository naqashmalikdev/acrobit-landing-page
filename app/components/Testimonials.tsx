"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { reviews } from "@/app/data/reviews";

const BASE = reviews;
const N = BASE.length;
const RADIUS = 280;
const WHEEL_SIZE = RADIUS * 2;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [totalRotation, setTotalRotation] = useState(0);
  const [reviewVisible, setReviewVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advanceTo = (nextActive: number, currentRotation: number) => {
    const currentActive = ((Math.round(-currentRotation / (360 / N)) % N) + N) % N;
    let steps = (nextActive - currentActive + N) % N;
    if (steps === 0) return currentRotation;
    return currentRotation - steps * (360 / N);
  };

  const step = () => {
    setTotalRotation((prev) => {
      const next = prev - 360 / N;
      const nextActive = ((Math.round(-next / (360 / N)) % N) + N) % N;
      setReviewVisible(false);
      setTimeout(() => {
        setActive(nextActive);
        setReviewVisible(true);
      }, 300);
      return next;
    });
  };

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(step, 3200);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current!);
  }, []);

  const handleClickItem = (i: number) => {
    clearInterval(intervalRef.current!);
    setTotalRotation((prev) => {
      const next = advanceTo(i, prev);
      setReviewVisible(false);
      setTimeout(() => {
        setActive(i);
        setReviewVisible(true);
      }, 300);
      return next;
    });
    setTimeout(startAuto, 400);
  };

  const review = BASE[active];
  const degreesPerItem = 360 / N;

  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-[1350px] mx-auto">

        {/* Heading */}
        <div className="mb-10 sm:mb-16">
          <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight mb-3">What Our Clients Say</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[440px]">
            Real stories from real clients. Here&apos;s how we&apos;ve made a difference.
          </p>
        </div>

        {/* ── Mobile: quote card only ── */}
        <div className="lg:hidden">
          <div
            style={{
              opacity: reviewVisible ? 1 : 0,
              transform: reviewVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.32s ease, transform 0.32s ease",
            }}
          >
            {/* Avatar + name + company logo */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                style={{ border: "2.5px solid #0048ff", boxShadow: "0 0 0 3px rgba(0,72,255,0.12)" }}
              >
                <Image src={review.avatar} alt={review.name} fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f1c3f" }}>{review.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>{review.role}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 3 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#22c55e">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#0f1c3f" }}>{review.rating}</span>
                  <span style={{ fontSize: 10, color: "#9ca3af" }}>· {review.date}</span>
                </div>
              </div>
              {/* Company logo */}
              <div
                className="ml-auto flex items-center justify-center flex-shrink-0 rounded-lg bg-[#f5f8ff] px-3"
                style={{ height: 36, minWidth: 60 }}
              >
                <img
                  src={review.logo}
                  alt={review.company}
                  style={{ height: 18, width: "auto", maxWidth: 80, objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Quote */}
            <div style={{ fontSize: 64, lineHeight: 0.75, color: "#0048ff", opacity: 0.12, fontFamily: "Georgia, serif", marginBottom: 12, userSelect: "none" }}>
              &ldquo;
            </div>
            <p style={{ fontSize: "clamp(1rem, 4vw, 1.15rem)", fontStyle: "italic", color: "#1a2b4a", lineHeight: 1.8, fontFamily: "Georgia, serif" }}>
              {review.review}
            </p>

            {/* Dots */}
            <div style={{ display: "flex", gap: 6, marginTop: 28 }}>
              {BASE.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleClickItem(i)}
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === active ? "#0048ff" : "#e2e8f0",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Desktop: spinning wheel + quote ── */}
        <div className="hidden lg:flex items-center gap-16 justify-start">

          {/* ── LEFT: spinning wheel ── */}
          <div
            className="relative flex-shrink-0"
            style={{ width: RADIUS + 160, height: WHEEL_SIZE + 80, overflow: "hidden" }}
          >
            <div style={{ position: "absolute", left: 0, top: "50%", width: 0, height: 0 }}>
              <div
                style={{
                  position: "absolute",
                  left: -RADIUS,
                  top: -RADIUS,
                  width: WHEEL_SIZE,
                  height: WHEEL_SIZE,
                  transform: `rotate(${totalRotation}deg)`,
                  transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Dashed guide circle */}
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px dashed rgba(0,72,255,0.12)" }} />

                {BASE.map((t, i) => {
                  const angleDeg = i * degreesPerItem;
                  const angleRad = (angleDeg * Math.PI) / 180;
                  const bx = RADIUS * Math.cos(angleRad);
                  const by = RADIUS * Math.sin(angleRad);
                  const blockRotation = -totalRotation;
                  const normalised = ((Math.round(-totalRotation / degreesPerItem) % N) + N) % N;
                  const isActive = i === normalised;
                  const dist = Math.min(((i - normalised + N) % N), ((normalised - i + N) % N));
                  const rightHalf = dist <= 2;
                  const itemOpacity = isActive ? 1 : dist === 1 ? 0.65 : dist === 2 ? 0.3 : 0;

                  return (
                    <button
                      key={i}
                      onClick={() => handleClickItem(i)}
                      style={{
                        position: "absolute",
                        left: RADIUS + bx,
                        top: RADIUS + by,
                        transform: `translate(-50%, -50%) rotate(${blockRotation}deg)`,
                        transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
                        opacity: itemOpacity,
                        pointerEvents: rightHalf ? "auto" : "none",
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        zIndex: isActive ? 10 : 1,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 14px",
                          borderRadius: 14,
                          width: 210,
                          transition: "background 0.4s ease",
                        }}
                      >
                        {/* Person avatar */}
                        <div
                          style={{
                            width: isActive ? 48 : 38,
                            height: isActive ? 48 : 38,
                            borderRadius: "50%",
                            overflow: "hidden",
                            flexShrink: 0,
                            border: isActive ? "2.5px solid #0048ff" : "2px solid #e2e8f0",
                            boxShadow: isActive ? "0 0 0 3px rgba(0,72,255,0.12)" : "none",
                            position: "relative",
                            transition: "width 0.4s ease, height 0.4s ease, border 0.4s ease",
                          }}
                        >
                          <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="48px" />
                        </div>

                        {/* Name + role + company logo */}
                        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                          <p style={{
                            margin: 0,
                            fontSize: isActive ? 13 : 12,
                            fontWeight: 700,
                            color: "#0f1c3f",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}>
                            {t.name}
                          </p>
                          <p style={{ margin: "1px 0 4px", fontSize: 10, color: "#6b7280", whiteSpace: "nowrap" }}>
                            {t.role}
                          </p>
                          {/* Company logo */}
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#f5f8ff",
                              borderRadius: 6,
                              padding: "3px 7px",
                            }}
                          >
                            <img
                              src={t.logo}
                              alt={t.company}
                              style={{ height: 13, width: "auto", maxWidth: 70, objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT: review quote ── */}
          <div
            style={{
              maxWidth: 720,
              flexShrink: 0,
              paddingLeft: 150,
              opacity: reviewVisible ? 1 : 0,
              transform: reviewVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.32s ease, transform 0.32s ease",
            }}
          >
            {/* Company logo pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f5f8ff",
                borderRadius: 10,
                padding: "8px 18px",
                marginBottom: 24,
              }}
            >
              <img
                src={review.logo}
                alt={review.company}
                style={{ height: 22, width: "auto", maxWidth: 120, objectFit: "contain" }}
              />
            </div>

            <div style={{ fontSize: 88, lineHeight: 0.75, color: "#0048ff", opacity: 0.12, fontFamily: "Georgia, serif", marginBottom: 16, userSelect: "none" }}>
              &ldquo;
            </div>

            <p style={{
              fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)",
              fontStyle: "italic",
              color: "#1a2b4a",
              lineHeight: 1.8,
              fontFamily: "Georgia, serif",
              maxWidth: "100%",
              margin: 0,
            }}>
              {review.review}
            </p>

            <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 36, height: 2, background: "#0048ff", borderRadius: 2 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", position: "relative", flexShrink: 0, border: "2px solid #e2e8f0" }}>
                  <Image src={review.avatar} alt={review.name} fill className="object-cover" sizes="36px" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f1c3f" }}>{review.name}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>{review.role}, {review.company}</p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 6, marginTop: 28 }}>
              {BASE.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleClickItem(i)}
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === active ? "#0048ff" : "#e2e8f0",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
