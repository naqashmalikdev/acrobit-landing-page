"use client";

import { useState } from "react";
import Link from "next/link";

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

const BUDGETS = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet",
];

const COUNTRIES = [
  { code: "US", dial: "+1",   flag: "🇺🇸", name: "United States" },
  { code: "GB", dial: "+44",  flag: "🇬🇧", name: "United Kingdom" },
  { code: "CA", dial: "+1",   flag: "🇨🇦", name: "Canada" },
  { code: "AU", dial: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "IN", dial: "+91",  flag: "🇮🇳", name: "India" },
  { code: "PK", dial: "+92",  flag: "🇵🇰", name: "Pakistan" },
  { code: "DE", dial: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial: "+33",  flag: "🇫🇷", name: "France" },
  { code: "SG", dial: "+65",  flag: "🇸🇬", name: "Singapore" },
  { code: "SA", dial: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "QA", dial: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "NG", dial: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "ZA", dial: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "BR", dial: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "MX", dial: "+52",  flag: "🇲🇽", name: "Mexico" },
  { code: "NL", dial: "+31",  flag: "🇳🇱", name: "Netherlands" },
  { code: "SE", dial: "+46",  flag: "🇸🇪", name: "Sweden" },
  { code: "NO", dial: "+47",  flag: "🇳🇴", name: "Norway" },
  { code: "JP", dial: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "KR", dial: "+82",  flag: "🇰🇷", name: "South Korea" },
];

const inputCls =
  "w-full rounded-lg px-4 py-3 text-sm outline-none border border-gray-200 bg-white text-[#0f1c3f] placeholder:text-gray-300 transition-all duration-200 focus:border-[#0048ff] focus:ring-2 focus:ring-[#0048ff]/10";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    dialCode: "+1", phone: "",
    service: "", budget: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [field]: e.target.value }));

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "landing-page" }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-[#f5f8ff] py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-[1350px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT — info */}
          <div>
            <h2 className="font-medium text-4xl leading-[1.1] tracking-tight text-[#0f1c3f] mb-5">
              Get in Touch
            </h2>
            <p className="text-base leading-relaxed text-gray-500 mb-8 sm:mb-12">
              You can reach us anytime. Tell us about your project and we&apos;ll
              respond within one business day.
            </p>

            <div className="flex flex-col gap-5 mb-10 sm:mb-14">
              <a href="mailto:hello@acrobit.com" className="flex items-center gap-4 group no-underline">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#e8eeff] transition-colors duration-200 group-hover:bg-[#0048ff]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0048ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                    className="group-hover:stroke-white transition-colors duration-200">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-500 group-hover:text-[#0048ff] transition-colors duration-200">
                  hello@acrobit.com
                </span>
              </a>

              <a href="tel:+13212211231" className="flex items-center gap-4 group no-underline">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#e8eeff] transition-colors duration-200 group-hover:bg-[#0048ff]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0048ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                    className="group-hover:stroke-white transition-colors duration-200">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 3.24 2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-500 group-hover:text-[#0048ff] transition-colors duration-200">
                  +1 321-221-1231
                </span>
              </a>
            </div>

            <div className="flex flex-col gap-7">
              {[
                { title: "Customer Support", body: "Our support team is available around the clock to address any concerns or queries you may have." },
                { title: "Feedback and Suggestions", body: "We value your feedback and are continuously working to improve. Your input is crucial in shaping our future." },
                { title: "Media Inquiries", body: "For media-related questions or press inquiries, please contact us at media@acrobit.com." },
              ].map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-semibold text-[#0f1c3f] mb-1">{item.title}</p>
                  <p className="text-sm leading-relaxed text-gray-500">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form card */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#0048ff] flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0f1c3f] mb-2">Message sent!</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                  Thanks{form.firstName ? `, ${form.firstName}` : ""}. We&apos;ll get back to you within one business day.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-medium text-2xl text-[#0f1c3f] mb-1">Send a Message</h3>
                <p className="text-sm text-gray-500 mb-8">Fill in the details below and we&apos;ll be in touch shortly.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">First name</label>
                      <input type="text" placeholder="John" value={form.firstName} onChange={set("firstName")}
                        className={inputCls} required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">Last name</label>
                      <input type="text" placeholder="Doe" value={form.lastName} onChange={set("lastName")}
                        className={inputCls} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">Your email</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0048ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
                        </svg>
                      </span>
                      <input type="email" placeholder="john@company.com" value={form.email} onChange={set("email")}
                        className={`${inputCls} pl-10`} required />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">Phone number (optional)</label>
                    <div className="flex gap-2 items-stretch">
                      <select
                        value={form.dialCode}
                        onChange={set("dialCode")}
                        className="rounded-lg px-2 py-3 text-sm outline-none border border-gray-200 bg-white text-gray-600 cursor-pointer focus:border-[#0048ff] focus:ring-2 focus:ring-[#0048ff]/10 transition-all flex-shrink-0"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.dial}>
                            {c.flag} {c.dial}
                          </option>
                        ))}
                      </select>
                      <input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={set("phone")}
                        className={`${inputCls} flex-1`} />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">Service you&apos;re interested in</label>
                    <select value={form.service} onChange={set("service")} className={`${inputCls} cursor-pointer`}>
                      <option value="">Select a service…</option>
                      {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">Project budget</label>
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
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">How can we help?</label>
                    <textarea rows={4} placeholder="Tell us about your project..." value={form.message}
                      onChange={set("message")} className={`${inputCls} resize-none`} required />
                  </div>

                  {error && <p className="text-xs text-red-500">{error}</p>}

                  <button type="submit" disabled={submitting}
                    className="w-full py-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 bg-[#0048ff] hover:bg-[#0035cc] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]">
                    {submitting ? "Sending…" : "Send Message"}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    By contacting us, you agree to our{" "}
                    <Link href="/terms" className="underline text-[#0048ff] hover:text-[#0035cc] transition-colors">Terms of Service</Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline text-[#0048ff] hover:text-[#0035cc] transition-colors">Privacy Policy</Link>
                  </p>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
