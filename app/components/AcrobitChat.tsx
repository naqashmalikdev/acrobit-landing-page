"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

/* ── Types ───────────────────────────────────────────────────────────────── */

type DisplayMessage = {
  id: string;
  from: "bot" | "user";
  text: string;
};

type ApiMessage = {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  tool_call_id?: string;
};

type FormValues = { name: string; email: string; phone: string };

const STORAGE_KEY = "acrobit_chat_session";

const GREETING: DisplayMessage = {
  id: "greeting",
  from: "bot",
  text: "👋 Hi! I'm **Aria**, Acrobit's AI assistant. I can tell you about our services, projects, or help you **book a free consultation** with our team. What brings you here today?",
};

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function loadSession(): { display: DisplayMessage[]; history: ApiMessage[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { display: [GREETING], history: [] };
}

function saveSession(display: DisplayMessage[], history: ApiMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ display, history }));
  } catch {}
}

function uid() {
  return Math.random().toString(36).slice(2);
}

/* ── Contact form ────────────────────────────────────────────────────────── */

function ContactForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (v: FormValues) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Partial<FormValues>>({});

  function validate() {
    const e: Partial<FormValues> = {};
    if (!values.name.trim()) e.name = "Required";
    if (!values.email.includes("@")) e.email = "Valid email required";
    return e;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSubmit(values);
  }

  const field = (
    key: keyof FormValues,
    label: string,
    type = "text",
    placeholder = "",
    required = false,
  ) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={values[key]}
        onChange={(e) => { setValues((v) => ({ ...v, [key]: e.target.value })); setErrors((er) => ({ ...er, [key]: undefined })); }}
        style={{
          border: `1.5px solid ${errors[key] ? "#ef4444" : "#e8eeff"}`,
          borderRadius: "10px",
          padding: "8px 12px",
          fontSize: "13px",
          fontFamily: "DM Sans, sans-serif",
          color: "#0f1c3f",
          background: "#f5f8ff",
          outline: "none",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#0048ff")}
        onBlur={(e) => (e.currentTarget.style.borderColor = errors[key] ? "#ef4444" : "#e8eeff")}
      />
      {errors[key] && <span style={{ fontSize: "11px", color: "#ef4444" }}>{errors[key]}</span>}
    </div>
  );

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        padding: "16px",
        boxShadow: "0 4px 20px rgba(0,72,255,0.12)",
        border: "1px solid #e8eeff",
        margin: "4px 0",
      }}
    >
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f1c3f", marginBottom: "12px", fontFamily: "Syne, sans-serif" }}>
        Tell us a bit about yourself
      </div>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {field("name", "Your Name", "text", "Jane Smith", true)}
        {field("email", "Email Address", "email", "jane@company.com", true)}
        {field("phone", "Phone (optional)", "tel", "+1 555 000 0000")}
        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "9px",
              borderRadius: "10px",
              border: "1.5px solid #e8eeff",
              background: "transparent",
              fontSize: "13px",
              color: "#6b7280",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              flex: 2,
              padding: "9px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #0048ff, #0035cc)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Continue →
          </button>
        </div>
      </form>
    </div>
  );
}

/* ── Main chat component ─────────────────────────────────────────────────── */

export default function AcrobitChat() {
  const [open, setOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [display, setDisplay] = useState<DisplayMessage[]>([GREETING]);
  const [history, setHistory] = useState<ApiMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [unread, setUnread] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeZone = useRef(Intl.DateTimeFormat().resolvedOptions().timeZone);

  /* Load session from localStorage once on mount */
  useEffect(() => {
    const session = loadSession();
    setDisplay(session.display);
    setHistory(session.history);
    setInitialized(true);
  }, []);

  /* Persist on every change */
  useEffect(() => {
    if (initialized) saveSession(display, history);
  }, [display, history, initialized]);

  /* Auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [display, loading, showForm]);

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  /* ── Send a message ── */
  const send = useCallback(
    async (text: string, extraHistory?: ApiMessage[]) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMsg: DisplayMessage = { id: uid(), from: "user", text: trimmed };
      const apiUserMsg: ApiMessage = { role: "user", content: trimmed };

      const nextHistory: ApiMessage[] = [...(extraHistory ?? history), apiUserMsg];

      setDisplay((prev) => [...prev, userMsg]);
      setHistory(nextHistory);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextHistory }),
        });

        const data = await res.json();

        if (data.showForm) setShowForm(true);

        if (data.reply) {
          const botMsg: DisplayMessage = { id: uid(), from: "bot", text: data.reply };
          setDisplay((prev) => [...prev, botMsg]);
          if (!open) setUnread((n) => n + 1);
        }

        if (data.newMessages?.length) {
          setHistory((prev) => {
            const base = [...prev];
            for (const m of data.newMessages) {
              if (m.role === "assistant" || m.role === "tool") base.push(m);
            }
            return base;
          });
        }
      } catch {
        setDisplay((prev) => [
          ...prev,
          { id: uid(), from: "bot", text: "Sorry, something went wrong. Please try again." },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [history, open],
  );

  /* ── Form submitted ── */
  async function handleFormSubmit(values: FormValues) {
    setFormValues(values);
    setShowForm(false);

    const systemMsg: ApiMessage = {
      role: "user",
      content: `[System: user details submitted] Name: ${values.name}, Email: ${values.email}, Phone: ${values.phone || "not provided"}, TimeZone: ${timeZone.current}`,
    };

    const nextHistory = [...history, systemMsg];
    setHistory(nextHistory);

    setDisplay((prev) => [
      ...prev,
      { id: uid(), from: "bot", text: `Thanks **${values.name}**! Let me pull up available consultation slots for you...` },
    ]);

    await send(`Check availability for ${timeZone.current}`, nextHistory);
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
    setDisplay([GREETING]);
    setHistory([]);
    setFormValues(null);
    setShowForm(false);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  }

  /* ── Render ── */
  return (
    <>
      {/* ── Chat window ── */}
      <div
        style={{
          position: "fixed",
          bottom: "98px",
          right: "24px",
          width: "380px",
          maxHeight: "560px",
          background: "#ffffff",
          borderRadius: "22px",
          boxShadow: "0 24px 64px rgba(0,72,255,0.18), 0 4px 16px rgba(0,0,0,0.10)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 9998,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.22s cubic-bezier(0.16,1,0.3,1), transform 0.22s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #0048ff 0%, #0035cc 100%)", padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "2px solid rgba(255,255,255,0.3)" }}>
            <Image src="/icons/robot.png" alt="Aria" width={26} height={26} style={{ objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", fontFamily: "Syne, sans-serif" }}>Aria · Acrobit AI</div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 5px #4ade80" }} />
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "11.5px" }}>Online · Replies instantly</span>
            </div>
          </div>
          <button
            onClick={clearSession}
            title="New conversation"
            style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "7px", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "12px", marginRight: "4px" }}
          >
            ↺
          </button>
          <button
            onClick={() => setOpen(false)}
            style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "7px", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: "14px" }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "10px", background: "#f5f8ff" }}>
          {display.map((msg) => (
            <div key={msg.id} style={{ display: "flex", alignItems: "flex-end", gap: "7px", flexDirection: msg.from === "bot" ? "row" : "row-reverse" }}>
              {msg.from === "bot" && (
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #0048ff, #0035cc)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Image src="/icons/robot.png" alt="bot" width={16} height={16} style={{ objectFit: "contain" }} />
                </div>
              )}
              <div
                style={{
                  maxWidth: "80%",
                  padding: "9px 13px",
                  borderRadius: msg.from === "bot" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                  background: msg.from === "bot" ? "#ffffff" : "linear-gradient(135deg, #0048ff, #0035cc)",
                  color: msg.from === "bot" ? "#0f1c3f" : "#ffffff",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  boxShadow: msg.from === "bot" ? "0 2px 8px rgba(0,72,255,0.07)" : "0 2px 12px rgba(0,72,255,0.28)",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                {msg.from === "bot" ? (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p style={{ margin: "0 0 6px 0" }}>{children}</p>,
                      ul: ({ children }) => <ul style={{ margin: "4px 0", paddingLeft: "16px" }}>{children}</ul>,
                      li: ({ children }) => <li style={{ marginBottom: "2px" }}>{children}</li>,
                      strong: ({ children }) => <strong style={{ color: "#0048ff", fontWeight: 700 }}>{children}</strong>,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {/* Contact form inline */}
          {showForm && (
            <ContactForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* Typing dots */}
          {loading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "7px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #0048ff, #0035cc)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Image src="/icons/robot.png" alt="bot" width={16} height={16} style={{ objectFit: "contain" }} />
              </div>
              <div style={{ background: "#ffffff", borderRadius: "4px 14px 14px 14px", padding: "11px 14px", display: "flex", gap: "4px", alignItems: "center", boxShadow: "0 2px 8px rgba(0,72,255,0.07)" }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0048ff", animation: "chatDot 1.2s ease-in-out infinite", animationDelay: `${i * 0.18}s` }} />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions (only when no history) */}
        {display.length === 1 && !loading && (
          <div style={{ padding: "0 14px 10px", background: "#f5f8ff", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {["What services do you offer?", "Show me your projects", "Book a consultation"].map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                style={{ fontSize: "11.5px", padding: "5px 10px", borderRadius: "20px", border: "1.5px solid #0048ff", background: "transparent", color: "#0048ff", cursor: "pointer", fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap" }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div style={{ padding: "10px 12px", background: "#ffffff", borderTop: "1px solid #e8eeff", display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about Acrobit or book a call…"
            disabled={loading || showForm}
            style={{ flex: 1, border: "1.5px solid #e8eeff", borderRadius: "11px", padding: "8px 13px", fontSize: "13px", fontFamily: "DM Sans, sans-serif", color: "#0f1c3f", background: "#f5f8ff", outline: "none", transition: "border-color 0.18s" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#0048ff")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e8eeff")}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading || showForm}
            style={{ width: "38px", height: "38px", borderRadius: "11px", background: input.trim() && !loading && !showForm ? "linear-gradient(135deg, #0048ff, #0035cc)" : "#e8eeff", border: "none", cursor: input.trim() && !loading && !showForm ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.18s, transform 0.1s" }}
            onMouseEnter={(e) => { if (input.trim() && !loading) e.currentTarget.style.transform = "scale(1.07)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke={input.trim() && !loading && !showForm ? "#fff" : "#0048ff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={input.trim() && !loading && !showForm ? "#fff" : "#0048ff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── FAB button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Acrobit AI"}
        style={{ position: "fixed", bottom: "24px", right: "24px", width: "62px", height: "62px", borderRadius: "50%", background: "linear-gradient(135deg, #0048ff 0%, #0035cc 100%)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, boxShadow: "0 8px 32px rgba(0,72,255,0.45), 0 2px 8px rgba(0,0,0,0.12)", transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,72,255,0.55), 0 4px 12px rgba(0,0,0,0.15)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,72,255,0.45), 0 2px 8px rgba(0,0,0,0.12)"; }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <Image src="/icons/robot.png" alt="Chat" width={34} height={34} style={{ objectFit: "contain" }} />
        )}
      </button>

      {/* Unread badge */}
      {!open && unread > 0 && (
        <div style={{ position: "fixed", bottom: "72px", right: "18px", width: "20px", height: "20px", borderRadius: "50%", background: "#ef4444", color: "#fff", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, boxShadow: "0 2px 8px rgba(239,68,68,0.5)" }}>
          {unread}
        </div>
      )}

      {/* Pulse ring when closed */}
      {!open && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", width: "62px", height: "62px", borderRadius: "50%", border: "2px solid #0048ff", zIndex: 9997, animation: "chatPulse 2s ease-out infinite", pointerEvents: "none" }} />
      )}

      <style>{`
        @keyframes chatDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes chatPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0; }
        }
      `}</style>
    </>
  );
}
