"use client";

import Link from "next/link";
import Image from "next/image";

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
    label: "Twitter / X",
    href: "https://x.com/acrobit",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L2.25 2.25h6.948l4.215 5.576 4.831-5.576z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/acrobit",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/acrobit",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-gray-100 overflow-hidden">

      {/* Subtle blue radial glow — top centre */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-[0.45]"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(0,72,255,0.10) 0%, transparent 70%)",
        }}
      />

      {/* 2 px gradient accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #0048ff 30%, #3b82f6 60%, transparent 100%)",
          opacity: 0.35,
        }}
      />

      <div className="relative max-w-[1350px] mx-auto px-4 sm:px-6">

        {/* Main grid */}
        <div className="py-12 sm:py-16 flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Brand col */}
          <div className="flex-shrink-0 lg:w-[200px]">
            <div className="mb-3">
              <Image src="/logo/dark-acrobit-word.png" alt="Acrobit" width={110} height={26} className="object-contain" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
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
                  className="text-gray-400 hover:text-[#0048ff] transition-colors duration-200"
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
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-gray-400 mb-4">{heading}</p>
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-gray-500 hover:text-[#0048ff] transition-colors duration-200 no-underline"
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
        <div className="border-t border-gray-100 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © 2026 Acrobit. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-xs text-gray-400 hover:text-[#0048ff] transition-colors duration-200"
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
