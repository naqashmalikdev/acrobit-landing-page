"use client";

import Image from "next/image";

const badges = [
  { id: "hipaa",     label: "HIPAA",       icon: "/icons/hipaa.svg",     style: { top: "0%",     left: "14%" },  animClass: "float-a" },
  { id: "gdpr",      label: "GDPR",        icon: "/icons/gdpr.svg",      style: { top: "0%",     right: "14%" }, animClass: "float-b" },
  { id: "aws",       label: "AWS",         icon: "/icons/aws.svg",       style: { top: "30%",    left: "0%" },   animClass: "float-c" },
  { id: "clutch",    label: "Clutch",      icon: "/icons/clutch.svg",    style: { top: "30%",    right: "0%" },  animClass: "float-d" },
  { id: "goodfirms", label: "GoodFirms",   icon: "/icons/goodfirms.svg", style: { bottom: "30%", left: "0%" },   animClass: "float-b" },
  { id: "hl7",       label: "HL7 / FHIR",  icon: "/icons/hl7.svg",       style: { bottom: "30%", right: "0%" },  animClass: "float-a" },
  { id: "awwwards",  label: "Awwwards",    icon: "/icons/awwards'=.svg", style: { bottom: "0%",  left: "14%" },  animClass: "float-d" },
  { id: "behance",   label: "Behance",     icon: "/icons/behanc.svg",    style: { bottom: "0%",  right: "14%" }, animClass: "float-c" },
];

export default function ComplianceCovered() {
  return (
    <section className="relative w-full bg-[#f5f8ff] flex items-center justify-center overflow-hidden py-16 sm:py-24">
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-10px) rotate(1deg); }
          66%       { transform: translateY(5px) rotate(-1deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40%       { transform: translateY(8px) rotate(-1.5deg); }
          70%       { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50%       { transform: translateY(-12px) translateX(4px); }
        }
        @keyframes floatD {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50%       { transform: translateY(10px) translateX(-4px); }
        }
        .float-a { animation: floatA 5.5s ease-in-out infinite; }
        .float-b { animation: floatB 6.2s ease-in-out infinite; }
        .float-c { animation: floatC 4.8s ease-in-out infinite; }
        .float-d { animation: floatD 7s ease-in-out infinite; }
      `}</style>

      {/* Soft radial glow behind centre */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full blur-[100px] opacity-30"
          style={{ background: "radial-gradient(circle, rgba(0,72,255,0.12) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative w-full max-w-[1100px] mx-auto px-4 sm:px-8">

        {/* Centre text — mobile only (desktop uses the absolute-positioned version below) */}
        <div className="md:hidden flex flex-col items-center justify-center text-center px-4 mb-10">
          <h2
            className="font-medium leading-tight"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", color: "#0f1c3f" }}
          >
            Compliance
          </h2>
          <h2
            className="font-medium leading-tight"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", color: "#0048ff" }}
          >
            is covered
          </h2>
          <p
            className="mt-5 max-w-[520px] leading-relaxed"
            style={{ fontSize: 15, color: "#6b7280" }}
          >
            We build compliant products from day one — HIPAA, GDPR, HL7 baked
            into our architecture, not bolted on after. All third-party
            software is vetted. Everything documented.
          </p>
        </div>

        {/* Mobile badge grid */}
        <div className="md:hidden grid grid-cols-4 gap-4 mt-8">
          {badges.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center p-2.5 bg-white"
                style={{
                  border: "1px solid rgba(0,72,255,0.12)",
                  boxShadow: "0 4px 24px rgba(0,72,255,0.08)",
                }}
              >
                <Image src={badge.icon} alt={badge.label} width={28} height={28} className="object-contain" />
              </div>
              <span className="text-[10px] font-semibold text-center tracking-wide" style={{ color: "#374151" }}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop floating badges layout */}
        <div className="relative w-full hidden md:block" style={{ minHeight: 620 }}>

          {/* Centre text repeated as absolute for desktop positioning */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
            <h2
              className="font-medium leading-tight"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", color: "#0f1c3f" }}
            >
              Compliance
            </h2>
            <h2
              className="font-medium leading-tight"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", color: "#0048ff" }}
            >
              is covered
            </h2>
            <p
              className="mt-5 max-w-[600px] leading-relaxed"
              style={{ fontSize: 15, color: "#6b7280" }}
            >
              We build compliant products from day one — HIPAA, GDPR, HL7 baked
              into our architecture, not bolted on after. All third-party
              software is vetted. Everything documented.
            </p>
          </div>

          {/* Floating badges */}
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`absolute flex flex-col items-center gap-2 ${badge.animClass}`}
              style={badge.style as React.CSSProperties}
            >
              <div
                className="w-[84px] h-[84px] rounded-2xl flex items-center justify-center p-3 bg-white"
                style={{
                  border: "1px solid rgba(0,72,255,0.12)",
                  boxShadow: "0 4px 24px rgba(0,72,255,0.08), 0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <Image
                  src={badge.icon}
                  alt={badge.label}
                  width={36}
                  height={36}
                  className="object-contain"
                  style={{ width: 36, height: 36 }}
                />
              </div>
              <span
                className="text-[11px] font-semibold whitespace-nowrap tracking-wide"
                style={{ color: "#374151" }}
              >
                {badge.label}
              </span>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
