"use client";

import { useState } from "react";
import ContactButton from "@/app/components/ContactButton";

const faqs = [
  {
    q: "What does the 12-month bug-free warranty cover?",
    a: "Any bug or defect that arises from code we wrote is fixed at no extra cost within 12 months of delivery. This covers functional issues, performance regressions, and integration failures — not scope changes or new feature requests.",
  },
  {
    q: "How do you handle fixed-price projects?",
    a: "We scope the project thoroughly upfront, agree on deliverables, timeline, and price — then lock it in. You won't receive surprise invoices. If scope changes, we discuss and agree before any additional work begins.",
  },
  {
    q: "What technologies does your team work with?",
    a: "Our team covers the full stack — Next.js, React, Node.js, Python, FastAPI, PostgreSQL, MongoDB, AWS, and more. For AI projects we work with OpenAI, Groq, LangChain, and custom ML pipelines depending on the use case.",
  },
  {
    q: "How long does a typical project take?",
    a: "MVPs typically ship in 6–10 weeks. Larger full-cycle builds range from 3 to 6 months. After scoping we give you a concrete timeline with milestones so you always know what's coming next.",
  },
  {
    q: "Do you offer post-launch support and maintenance?",
    a: "Yes — beyond the warranty we offer ongoing retainer plans for monitoring, updates, feature additions, and infrastructure management. You can scale support up or down as your product evolves.",
  },
  {
    q: "Can you work with our existing codebase?",
    a: "Absolutely. We regularly onboard into existing projects — whether that's a legacy system needing modernisation, a partially built product, or an in-house codebase that needs extra hands.",
  },
  {
    q: "How do payments and billing work?",
    a: "We offer milestone-based billing so you pay as work is completed and verified. We also support split payment and monthly retainer structures depending on the engagement type.",
  },
  {
    q: "What makes Acrobit different from other agencies?",
    a: "Guaranteed outcomes, fixed price, and a senior-level team on every project — not juniors. We take full ownership of delivery rather than billing hourly and hoping for the best. Our clients stay because it works.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-[1350px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <h2 className="text-4xl font-medium text-[#0f1c3f] tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[480px]">
              Everything you need to know before we start building together.
            </p>
          </div>
          <ContactButton
            className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold text-[#0f1c3f] hover:underline"
          >
            Still have questions? Contact us
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </ContactButton>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-2xl border overflow-hidden transition-all duration-200"
                style={{
                  border: isOpen ? "1.5px solid rgba(0,72,255,0.25)" : "1.5px solid #e5e7eb",
                  background: isOpen ? "rgba(0,72,255,0.03)" : "#fff",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-4 sm:px-7 py-4 sm:py-5 text-left gap-4 cursor-pointer"
                >
                  <span
                    className="text-sm sm:text-[15px] font-semibold leading-snug"
                    style={{ color: "#0f1c3f" }}
                  >
                    {faq.q}
                  </span>

                  {/* chevron */}
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#0f1c3f"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="flex-shrink-0"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Answer — animated height via max-height */}
                <div
                  style={{
                    maxHeight: isOpen ? 300 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <p className="px-4 sm:px-7 pb-5 sm:pb-6 text-sm text-gray-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
