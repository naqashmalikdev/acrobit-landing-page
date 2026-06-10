"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Phone, Mail, ChevronRight, Check, Search } from "lucide-react";

/* ── Country dial codes ── */
const COUNTRIES = [
  { code: "AF", dial: "+93",  flag: "🇦🇫", name: "Afghanistan" },
  { code: "AL", dial: "+355", flag: "🇦🇱", name: "Albania" },
  { code: "DZ", dial: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "AR", dial: "+54",  flag: "🇦🇷", name: "Argentina" },
  { code: "AU", dial: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "AT", dial: "+43",  flag: "🇦🇹", name: "Austria" },
  { code: "BD", dial: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "BE", dial: "+32",  flag: "🇧🇪", name: "Belgium" },
  { code: "BR", dial: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "CA", dial: "+1",   flag: "🇨🇦", name: "Canada" },
  { code: "CL", dial: "+56",  flag: "🇨🇱", name: "Chile" },
  { code: "CN", dial: "+86",  flag: "🇨🇳", name: "China" },
  { code: "CO", dial: "+57",  flag: "🇨🇴", name: "Colombia" },
  { code: "HR", dial: "+385", flag: "🇭🇷", name: "Croatia" },
  { code: "CZ", dial: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "DK", dial: "+45",  flag: "🇩🇰", name: "Denmark" },
  { code: "EG", dial: "+20",  flag: "🇪🇬", name: "Egypt" },
  { code: "FI", dial: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "FR", dial: "+33",  flag: "🇫🇷", name: "France" },
  { code: "DE", dial: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "GH", dial: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "GR", dial: "+30",  flag: "🇬🇷", name: "Greece" },
  { code: "HK", dial: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "HU", dial: "+36",  flag: "🇭🇺", name: "Hungary" },
  { code: "IN", dial: "+91",  flag: "🇮🇳", name: "India" },
  { code: "ID", dial: "+62",  flag: "🇮🇩", name: "Indonesia" },
  { code: "IR", dial: "+98",  flag: "🇮🇷", name: "Iran" },
  { code: "IQ", dial: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "IE", dial: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "IL", dial: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "IT", dial: "+39",  flag: "🇮🇹", name: "Italy" },
  { code: "JP", dial: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "JO", dial: "+962", flag: "🇯🇴", name: "Jordan" },
  { code: "KE", dial: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "KW", dial: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "LB", dial: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "MY", dial: "+60",  flag: "🇲🇾", name: "Malaysia" },
  { code: "MX", dial: "+52",  flag: "🇲🇽", name: "Mexico" },
  { code: "MA", dial: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "NL", dial: "+31",  flag: "🇳🇱", name: "Netherlands" },
  { code: "NZ", dial: "+64",  flag: "🇳🇿", name: "New Zealand" },
  { code: "NG", dial: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "NO", dial: "+47",  flag: "🇳🇴", name: "Norway" },
  { code: "OM", dial: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "PK", dial: "+92",  flag: "🇵🇰", name: "Pakistan" },
  { code: "PE", dial: "+51",  flag: "🇵🇪", name: "Peru" },
  { code: "PH", dial: "+63",  flag: "🇵🇭", name: "Philippines" },
  { code: "PL", dial: "+48",  flag: "🇵🇱", name: "Poland" },
  { code: "PT", dial: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "QA", dial: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "RO", dial: "+40",  flag: "🇷🇴", name: "Romania" },
  { code: "RU", dial: "+7",   flag: "🇷🇺", name: "Russia" },
  { code: "SA", dial: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "SG", dial: "+65",  flag: "🇸🇬", name: "Singapore" },
  { code: "ZA", dial: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "KR", dial: "+82",  flag: "🇰🇷", name: "South Korea" },
  { code: "ES", dial: "+34",  flag: "🇪🇸", name: "Spain" },
  { code: "LK", dial: "+94",  flag: "🇱🇰", name: "Sri Lanka" },
  { code: "SE", dial: "+46",  flag: "🇸🇪", name: "Sweden" },
  { code: "CH", dial: "+41",  flag: "🇨🇭", name: "Switzerland" },
  { code: "TW", dial: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "TH", dial: "+66",  flag: "🇹🇭", name: "Thailand" },
  { code: "TN", dial: "+216", flag: "🇹🇳", name: "Tunisia" },
  { code: "TR", dial: "+90",  flag: "🇹🇷", name: "Turkey" },
  { code: "UA", dial: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "GB", dial: "+44",  flag: "🇬🇧", name: "United Kingdom" },
  { code: "US", dial: "+1",   flag: "🇺🇸", name: "United States" },
  { code: "VN", dial: "+84",  flag: "🇻🇳", name: "Vietnam" },
];

const BUDGETS = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet",
];

const SERVICES = [
  "AI Agents",
  "Gen AI Consulting",
  "Intelligent Automation",
  "AI PoC & MVP",
  "Product Development",
  "AI Software Development",
  "Discovery Workshop",
  "Product Strategy",
  "Other",
];

/* ── Types ── */
type Step = 1 | 2 | 3;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  dialCode: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

async function submitContact(data: FormData, source: string) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, source }),
  });
  if (!res.ok) throw new Error("Submission failed");
}

/* ── Input helpers ── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#0f1c3f] mb-1.5 tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl px-4 py-3 text-sm outline-none border border-gray-200 bg-white text-[#0f1c3f] placeholder:text-gray-300 transition-all duration-200 focus:border-[#0048ff] focus:ring-2 focus:ring-[#0048ff]/10";

/* ── Country picker ── */
function DialPicker({
  value, onChange,
}: {
  value: string;
  onChange: (dial: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected = COUNTRIES.find((c) => c.dial === value) ?? COUNTRIES.find((c) => c.code === "US")!;
  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
  );

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:border-[#0048ff]/40 transition-colors h-full whitespace-nowrap cursor-pointer"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="font-medium">{selected.dial}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1.5 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
            style={{ width: "260px" }}
          >
            {/* Search */}
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search country or code…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-gray-200 outline-none focus:border-[#0048ff] bg-gray-50 placeholder:text-gray-300"
                />
              </div>
            </div>
            {/* List */}
            <div className="overflow-y-auto max-h-48">
              {filtered.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">No results</p>
              )}
              {filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => { onChange(c.dial); setOpen(false); setSearch(""); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#f5f8ff] transition-colors text-left cursor-pointer ${
                    c.dial === value ? "bg-[#eef2ff] text-[#0048ff]" : "text-[#0f1c3f]"
                  }`}
                >
                  <span className="text-base leading-none flex-shrink-0">{c.flag}</span>
                  <span className="flex-1 truncate text-xs">{c.name}</span>
                  <span className="text-xs font-semibold text-gray-400 flex-shrink-0">{c.dial}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Step indicator ── */
function StepDots({ step }: { step: Step }) {
  const steps = [{ n: 1, label: "You" }, { n: 2, label: "Project" }, { n: 3, label: "Done" }];
  return (
    <div className="flex items-center">
      {steps.map(({ n, label }, i) => (
        <div key={n} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              step > n ? "bg-[#0048ff] text-white" :
              step === n ? "bg-[#0048ff] text-white ring-4 ring-[#0048ff]/15" :
              "bg-gray-100 text-gray-400"
            }`}>
              {step > n ? <Check size={13} strokeWidth={3} /> : n}
            </div>
            <span className={`text-[10px] font-semibold tracking-wide ${step >= n ? "text-[#0048ff]" : "text-gray-400"}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-14 h-px mx-1 mb-4 transition-all duration-500 ${step > n ? "bg-[#0048ff]" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main modal ── */
interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [choice, setChoice] = useState<"pick" | "call" | "form">("pick");
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", dialCode: "+1", phone: "",
    service: "", budget: "", message: "",
  });

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setChoice("pick"); setStep(1); setSubmitted(false);
        setForm({ firstName: "", lastName: "", email: "", dialCode: "+1", phone: "", service: "", budget: "", message: "" });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const canNext1 = form.firstName.trim() && form.email.trim();
  const canNext2 = form.service && form.budget && form.message.trim();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitContact(form, "modal");
      setSubmitted(true);
      setStep(3);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop + scroll container — clicking outside the card closes */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-[520px] bg-white rounded-3xl overflow-hidden my-auto"
              style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)" }}
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Blue top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-[#0048ff] via-[#3b82f6] to-[#0048ff]" />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={10} strokeWidth={2.5} className="text-gray-500" />
              </button>

              <AnimatePresence mode="wait">

                {/* ── PICK ── */}
                {choice === "pick" && (
                  <motion.div key="pick"
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}
                    className="p-8"
                  >
                    <div className="mb-7">
                      <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] opacity-70 mb-2">/ Get in touch</p>
                      <h2 className="text-2xl font-semibold text-[#0f1c3f] tracking-tight leading-snug">
                        How would you like to connect?
                      </h2>
                      <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">Pick the option that works best for you.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        onClick={() => setChoice("call")}
                        className="group relative rounded-2xl border-2 border-[#0048ff]/20 bg-[#f5f8ff] p-6 text-left hover:border-[#0048ff]/60 hover:bg-[#eef2ff] transition-all duration-200 overflow-hidden cursor-pointer"
                        whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#0048ff]/06 pointer-events-none" />
                        <div className="w-10 h-10 rounded-xl bg-[#0048ff] flex items-center justify-center mb-4">
                          <Phone size={17} strokeWidth={2} className="text-white" />
                        </div>
                        <p className="text-sm font-bold text-[#0f1c3f] mb-1">Book a call</p>
                        <p className="text-xs text-gray-500 leading-relaxed">Schedule a free 20-min discovery call with our team.</p>
                        <div className="mt-4 flex items-center gap-1 text-[#0048ff] text-xs font-semibold">
                          Cal.com <ArrowUpRight size={12} strokeWidth={2.5} />
                        </div>
                      </motion.button>

                      <motion.button
                        onClick={() => setChoice("form")}
                        className="group relative rounded-2xl border-2 border-gray-200 bg-white p-6 text-left hover:border-[#0048ff]/60 hover:bg-[#f5f8ff] transition-all duration-200 overflow-hidden cursor-pointer"
                        whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gray-100 pointer-events-none" />
                        <div className="w-10 h-10 rounded-xl bg-[#0f1c3f] flex items-center justify-center mb-4">
                          <Mail size={17} strokeWidth={2} className="text-white" />
                        </div>
                        <p className="text-sm font-bold text-[#0f1c3f] mb-1">Send a query</p>
                        <p className="text-xs text-gray-500 leading-relaxed">Tell us about your project and we&apos;ll reply within 24 h.</p>
                        <div className="mt-4 flex items-center gap-1 text-[#0f1c3f] text-xs font-semibold">
                          Fill form <ChevronRight size={12} strokeWidth={2.5} />
                        </div>
                      </motion.button>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-6">No commitment — just a conversation.</p>
                  </motion.div>
                )}

                {/* ── CALL ── */}
                {choice === "call" && (
                  <motion.div key="call"
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }}
                    className="p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#0048ff] flex items-center justify-center mx-auto mb-5">
                      <Phone size={26} strokeWidth={1.8} className="text-white" />
                    </div>
                    <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] opacity-70 mb-2">/ Book a call</p>
                    <h2 className="text-xl font-semibold text-[#0f1c3f] tracking-tight mb-2">Schedule a free 20-min call</h2>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto mb-8">
                      Pick a time that works for you. We&apos;ll talk about your project, ask a few questions, and give you honest direction — no pitch, no pressure.
                    </p>
                    <a
                      href="https://cal.com/acrobit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#0048ff] text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#0035cc] transition-colors"
                      onClick={onClose}
                    >
                      Open Cal.com <ArrowUpRight size={15} strokeWidth={2.5} />
                    </a>
                    <button onClick={() => setChoice("pick")}
                      className="block mx-auto mt-4 text-xs text-gray-400 hover:text-[#0048ff] transition-colors cursor-pointer">
                      ← Go back
                    </button>
                  </motion.div>
                )}

                {/* ── FORM ── */}
                {choice === "form" && !submitted && (
                  <motion.div key="form"
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="px-8 pt-7 pb-5 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0048ff] opacity-70 mb-1">/ Send a query</p>
                          <h2 className="text-xl font-semibold text-[#0f1c3f] tracking-tight">
                            {step === 1 ? "About you" : "Your project"}
                          </h2>
                        </div>
                        <StepDots step={step} />
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="px-8 py-6">
                      <AnimatePresence mode="wait">

                        {/* Step 1 */}
                        {step === 1 && (
                          <motion.div key="s1"
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}
                            className="flex flex-col gap-4"
                          >
                            <div className="grid grid-cols-2 gap-3">
                              <Field label="First name">
                                <input type="text" placeholder="John" value={form.firstName}
                                  onChange={set("firstName")} className={inputCls} required />
                              </Field>
                              <Field label="Last name">
                                <input type="text" placeholder="Doe" value={form.lastName}
                                  onChange={set("lastName")} className={inputCls} />
                              </Field>
                            </div>

                            <Field label="Email address">
                              <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                  <Mail size={14} strokeWidth={1.8} className="text-[#0048ff]" />
                                </span>
                                <input type="email" placeholder="john@company.com" value={form.email}
                                  onChange={set("email")} className={`${inputCls} pl-10`} required />
                              </div>
                            </Field>

                            <Field label="Phone (optional)">
                              <div className="flex gap-2 items-stretch">
                                <DialPicker
                                  value={form.dialCode}
                                  onChange={(dial) => setForm((p) => ({ ...p, dialCode: dial }))}
                                />
                                <input
                                  type="tel"
                                  placeholder="Phone number"
                                  value={form.phone}
                                  onChange={set("phone")}
                                  className={inputCls}
                                />
                              </div>
                            </Field>
                          </motion.div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                          <motion.div key="s2"
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}
                            className="flex flex-col gap-4"
                          >
                            <Field label="Service you're interested in">
                              <select value={form.service} onChange={set("service")}
                                className={`${inputCls} cursor-pointer`} required>
                                <option value="">Select a service…</option>
                                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </Field>

                            <Field label="Project budget">
                              <div className="grid grid-cols-3 gap-2">
                                {BUDGETS.map((b) => (
                                  <button
                                    key={b}
                                    type="button"
                                    onClick={() => setForm((p) => ({ ...p, budget: b }))}
                                    className={`rounded-xl px-2 py-2.5 text-xs font-semibold border transition-all duration-150 text-center leading-snug cursor-pointer ${
                                      form.budget === b
                                        ? "bg-[#0048ff] text-white border-[#0048ff]"
                                        : "bg-white text-[#0f1c3f] border-gray-200 hover:border-[#0048ff]/40 hover:bg-[#f5f8ff]"
                                    }`}
                                  >
                                    {b}
                                  </button>
                                ))}
                              </div>
                            </Field>

                            <Field label="Tell us about your project">
                              <textarea
                                rows={4}
                                placeholder="Describe what you're building, the problem you're solving, or what you need help with…"
                                value={form.message}
                                onChange={set("message")}
                                className={`${inputCls} resize-none`}
                                required
                              />
                            </Field>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Nav */}
                      <div className="flex items-center justify-between mt-6">
                        <button type="button"
                          onClick={() => step === 1 ? setChoice("pick") : setStep(1)}
                          className="text-xs text-gray-400 hover:text-[#0048ff] transition-colors cursor-pointer">
                          ← {step === 1 ? "Go back" : "Previous"}
                        </button>

                        {step === 1 ? (
                          <button type="button" disabled={!canNext1} onClick={() => setStep(2)}
                            className="flex items-center gap-2 bg-[#0048ff] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#0035cc] transition-colors">
                            Next <ChevronRight size={15} strokeWidth={2.5} />
                          </button>
                        ) : (
                          <>
                            {submitError && (
                              <p className="text-xs text-red-500 mr-auto">{submitError}</p>
                            )}
                          <button type="submit" disabled={!canNext2 || submitting}
                            className="flex items-center gap-2 bg-[#0048ff] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#0035cc] transition-colors">
                            {submitting ? "Sending…" : <>Send message <ArrowUpRight size={15} strokeWidth={2.5} /></>}
                          </button>
                          </>
                        )}
                      </div>

                      {step === 2 && (
                        <p className="text-center text-[11px] text-gray-400 mt-4">
                          By submitting, you agree to our{" "}
                          <Link href="/terms" className="underline text-[#0048ff] hover:text-[#0035cc] transition-colors">Terms</Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="underline text-[#0048ff] hover:text-[#0035cc] transition-colors">Privacy Policy</Link>
                        </p>
                      )}
                    </form>
                  </motion.div>
                )}

                {/* ── SUCCESS ── */}
                {choice === "form" && submitted && (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="p-10 text-center"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-[#0048ff] flex items-center justify-center mx-auto mb-5"
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Check size={28} strokeWidth={2.5} className="text-white" />
                    </motion.div>
                    <h2 className="text-xl font-semibold text-[#0f1c3f] tracking-tight mb-2">Message sent!</h2>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto mb-8">
                      Thanks{form.firstName ? <> <strong className="text-[#0f1c3f]">{form.firstName}</strong></> : ""}. We&apos;ll review your query and get back to you within one business day.
                    </p>
                    <button onClick={onClose}
                      className="inline-flex items-center gap-2 bg-[#0048ff] text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-[#0035cc] transition-colors cursor-pointer">
                      Done
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
