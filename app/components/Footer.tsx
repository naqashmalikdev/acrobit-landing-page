"use client";

import Link from "next/link";
import Image from "next/image";

// Acrobit brand colors
// #050B1C — Midnight Background
// #071536 — Deep Navy
// #004AFC — Electric Blue
// #FFFFFF — White
// #69728E — Muted Slate

const LEGAL = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
];

const FOOTER_LINKS = [
  {
    heading: "AI & Data",
    links: [
      { label: "AI Agents",                href: "/services/ai-agents" },
      { label: "Gen AI Consulting",         href: "/services/gen-ai-consulting" },
      { label: "Intelligent Automations",   href: "/services/intelligent-automation" },
      { label: "AI PoC & MVP",              href: "/services/ai-poc-mvp" },
    ],
  },
  {
    heading: "Engineering",
    links: [
      { label: "UX/UI Design",             href: "/services/ui-ux-design" },
      { label: "Product Development",      href: "/services/product-development" },
      { label: "Application Development",  href: "/services/application-development" },
      { label: "AI Software Development",  href: "/services/ai-software-development" },
      { label: "PoC Development",          href: "/services/poc-development" },
    ],
  },
  {
    heading: "Advisory",
    links: [
      { label: "Discovery Workshops",        href: "/services/discovery-workshops" },
      { label: "Technical Feasibility",      href: "/services/technical-feasibility-study" },
      { label: "Product Strategy",           href: "/services/product-strategy" },
    ],
  },
  {
    heading: "Engagement",
    links: [
      { label: "Dedicated Teams",            href: "/dedicated-teams" },
      { label: "Offshore Dev Center",        href: "/offshore-development-center" },
      { label: "Fixed-Price Projects",       href: "/fixed-price-projects" },
      { label: "Hybrid Delivery Model",      href: "/hybrid-delivery-model" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",     href: "/about" },
      { label: "AI-First",     href: "/ai-first" },
      { label: "Customers",    href: "/customers" },
      { label: "Careers",      href: "/careers" },
    ],
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/acrobitdotco",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#050B1C" }}
    >
      {/* Electric blue accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #004AFC 30%, #3b82f6 60%, transparent 100%)",
          opacity: 0.6,
        }}
      />

      <div className="relative max-w-[1350px] mx-auto px-4 sm:px-6">

        {/* Main grid */}
        <div className="py-14 sm:py-18 flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Brand column */}
          <div className="flex-shrink-0 lg:w-[210px]">
            {/* Logo — dark-acrobit-word is white text, suited for dark bg */}
            <div className="mb-4">
              <Image
                src="/logo/light-acrobit-word.png"
                alt="Acrobit"
                width={120}
                height={28}
                className="object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#FFFFFF" }}>
              We design, build &amp; ship software that actually works.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={{ color: "#FFFFFF" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#004AFC")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF")
                  }
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {FOOTER_LINKS.map(({ heading, links }) => (
              <div key={heading}>
                <p
                  className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4"
                  style={{ color: "#FFFFFF", opacity: 0.5 }}
                >
                  {heading}
                </p>
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm no-underline transition-colors duration-200"
                        style={{ color: "#FFFFFF" }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "#004AFC")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "#69728E")
                        }
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(105,114,142,0.15)" }}
        >
          <p className="text-xs" style={{ color: "#FFFFFF" }}>
            © 2026 Acrobit. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-xs no-underline transition-colors duration-200"
                style={{ color: "#FFFFFF" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#004AFC")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF")
                }
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
