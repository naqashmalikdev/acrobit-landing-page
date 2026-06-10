import type { Metadata } from "next";

const BASE_URL = "https://acrobit.io";
const PAGE_URL = `${BASE_URL}/faq`;
const TITLE = "FAQ — Acrobit Software & AI Development";
const DESCRIPTION =
  "Answers to common questions about Acrobit's process, pricing, timelines, and technology stack.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Acrobit FAQ",
    "software agency questions",
    "how we work",
    "software development pricing",
    "fixed price project FAQ",
    "AI development questions",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the 12-month bug-free warranty cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any bug or defect that arises from code we wrote is fixed at no extra cost within 12 months of delivery. This covers functional issues, performance regressions, and integration failures — not scope changes or new feature requests.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle fixed-price projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We scope the project thoroughly upfront, agree on deliverables, timeline, and price — then lock it in. You won't receive surprise invoices. If scope changes, we discuss and agree before any additional work begins.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies does your team work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our team covers the full stack — Next.js, React, Node.js, Python, FastAPI, PostgreSQL, MongoDB, AWS, and more. For AI projects we work with OpenAI, Groq, LangChain, and custom ML pipelines depending on the use case.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MVPs typically ship in 6–10 weeks. Larger full-cycle builds range from 3 to 6 months. After scoping we give you a concrete timeline with milestones so you always know what's coming next.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer post-launch support and maintenance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — beyond the warranty we offer ongoing retainer plans for monitoring, updates, feature additions, and infrastructure management. You can scale support up or down as your product evolves.",
      },
    },
    {
      "@type": "Question",
      name: "Can you work with our existing codebase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We regularly onboard into existing projects — whether that's a legacy system needing modernisation, a partially built product, or an in-house codebase that needs extra hands.",
      },
    },
    {
      "@type": "Question",
      name: "How do payments and billing work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer milestone-based billing so you pay as work is completed and verified. We also support split payment and monthly retainer structures depending on the engagement type.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Acrobit different from other agencies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Guaranteed outcomes, fixed price, and a senior-level team on every project — not juniors. We take full ownership of delivery rather than billing hourly and hoping for the best. Our clients stay because it works.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
