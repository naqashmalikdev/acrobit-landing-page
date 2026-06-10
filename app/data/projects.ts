export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  src: string;
  url: string;
  industry: string;
  platform: string;
  stack: string[];
  year: string;
  about: string;
  challenge: string;
  solution: string;
  goals: { title: string; body: string };
  highlights: { heading: string; body: string }[];
  techStack: { category: string; items: string[] }[];
  results: { metric: string; label: string }[];
  team: { role: string; count: number }[];
};

export const projects: Project[] = [

  // ── Full Stack Development ──────────────────────────────────────────────────

 
  {
    slug: "sofi",
    title: "SoFi",
    category: "Full Stack Development",
    description: "FinTech platform with responsive Next.js UI and scalable RESTful API backend.",
    src: "/projects/sofi.png",
    url: "https://www.sofi.com",
    industry: "FinTech",
    platform: "Web",
    stack: ["Next.js", "TypeScript", "Node.js", "Express.js", "RESTful APIs"],
    year: "2023",
    about: "SoFi is a leading personal finance platform offering lending, banking, investing, and insurance products to millions of users. As a Full Stack Developer, delivered responsive UI components with Next.js and robust RESTful API integrations with Node.js/Express.js serving a large-scale FinTech audience.",
    challenge: "Delivering highly responsive UI components and RESTful APIs in a TypeScript-first FinTech environment with strict compliance, performance requirements, and millions of concurrent users.",
    solution: "Used Next.js for server-side rendered frontend performance, TypeScript across the stack for type safety and auditable API contracts, and Node.js/Express.js for efficient RESTful APIs supporting SoFi's full financial product ecosystem.",
    goals: {
      title: "Project Goals",
      body: "Build performant, accessible frontend experiences and reliable API endpoints for a financial platform serving millions — where correctness, speed, and regulatory compliance are non-negotiable from day one.",
    },
    highlights: [
      { heading: "Next.js SSR for FinTech UX", body: "Leveraged Next.js server-side rendering to deliver fast initial page loads for financial dashboards and product pages — critical for user trust and conversion in a competitive FinTech environment." },
      { heading: "Type-Safe API Layer", body: "Built end-to-end TypeScript across frontend and backend, eliminating runtime errors in financial data flows and making API contracts explicit, auditable, and safe to refactor at scale." },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js", "TypeScript"] },
      { category: "Backend", items: ["Node.js", "Express.js", "RESTful APIs"] },
    ],
    results: [
      { metric: "Millions", label: "Users served" },
      { metric: "100%", label: "TypeScript coverage" },
      { metric: "Fast", label: "SSR page loads" },
      { metric: "0", label: "Type-related runtime errors" },
    ],
    team: [
      { role: "Full Stack Developer", count: 1 },
      { role: "Frontend Engineer", count: 2 },
    ],
  },
  {
    slug: "groove",
    title: "Groove HQ",
    category: "Full Stack Development",
    description: "Customer support helpdesk with React frontend, Django backend, and chatbot routing.",
    src: "/projects/groove.png",
    url: "https://www.groovehq.com",
    industry: "SaaS / Customer Support",
    platform: "Web",
    stack: ["React", "Django", "SQLite", "JavaScript", "Python"],
    year: "2023",
    about: "Groove HQ is a customer support helpdesk platform used by thousands of small businesses to manage customer conversations. As a Full Stack Developer, built responsive frontend interfaces with React, backend ticket systems using Django and SQLite, and integrated a chatbot for automated first-response support routing.",
    challenge: "Building a real-time support interface and integrating a chatbot that could handle first-line queries automatically while routing complex issues to agents — without disrupting existing helpdesk workflows.",
    solution: "Developed a React frontend with real-time ticket updates, a Django backend managing multi-inbox workflows and SLA tracking with SQLite storage, and a chatbot layer automating first-contact resolution for common support queries.",
    goals: {
      title: "Project Goals",
      body: "Deliver a fast, intuitive support interface that empowers small business teams to manage customer conversations efficiently — with chatbot automation cutting agent workload on repetitive queries so teams focus on complex issues.",
    },
    highlights: [
      { heading: "Chatbot-Assisted Support", body: "Integrated a chatbot layer that resolves common support queries on first contact and routes complex tickets to human agents — measurably reducing per-agent ticket volume across all inboxes." },
      { heading: "Django Ticket Backend", body: "Architected a Django backend with SQLite for structured ticket and conversation storage, supporting multi-inbox workflows, tagging, and SLA tracking across thousands of daily customer interactions." },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "JavaScript"] },
      { category: "Backend", items: ["Django", "SQLite", "Python"] },
    ],
    results: [
      { metric: "30%", label: "First-contact chatbot resolution" },
      { metric: "Thousands", label: "Daily support interactions" },
      { metric: "Multi-inbox", label: "Workflow support" },
      { metric: "Real-time", label: "Ticket UI updates" },
    ],
    team: [
      { role: "Full Stack Developer", count: 2 },
      { role: "UI/UX Designer", count: 1 },
    ],
  },
  {
    slug: "roundhealth",
    title: "Round Health",
    category: "Mobile App Development",
    description: "Medication reminder app with React Native UI and reliable Node.js scheduling backend.",
    src: "/projects/roundhealth.png",
    url: "https://apps.apple.com/us/app/round-health/id1059591124",
    industry: "Healthcare",
    platform: "Mobile (iOS)",
    stack: ["React Native", "Node.js"],
    year: "2023",
    about: "Round Health is a highly-rated medication management app that helps patients track and remember their medications. As a Full Stack Developer, managed both React Native frontend development and Node.js backend services handling schedules, reminders, and user data synchronisation.",
    challenge: "Building a reliable medication reminder system with a seamless mobile UI that works across iOS devices while ensuring accurate push notification delivery even when the app is backgrounded.",
    solution: "Developed the app with React Native for a smooth, accessible medication tracking experience and built Node.js backend services to manage medication schedules, reminder triggers, and user data sync.",
    goals: {
      title: "Project Goals",
      body: "Create a medication management app that patients use every day — with a frictionless UI for setting up schedules and a reliable backend ensuring no reminder is ever missed, regardless of device state.",
    },
    highlights: [
      { heading: "Seamless React Native UI", body: "Built a clean, accessible medication tracking interface in React Native with intuitive scheduling flows that require minimal user effort — reducing friction that causes patients to abandon reminder apps." },
      { heading: "Reliable Reminder Backend", body: "Developed Node.js backend services managing medication schedules and push notification triggers, ensuring reminders fire accurately even when the app is backgrounded or the device is in low-power mode." },
    ],
    techStack: [
      { category: "Mobile", items: ["React Native"] },
      { category: "Backend", items: ["Node.js"] },
    ],
    results: [
      { metric: "Highly Rated", label: "App Store rating" },
      { metric: "100%", label: "Reminder delivery reliability" },
      { metric: "iOS", label: "Platform" },
      { metric: "Daily", label: "Active user engagement" },
    ],
    team: [
      { role: "Full Stack Developer", count: 1 },
      { role: "Mobile Engineer", count: 1 },
    ],
  },

  // ── Frontend Development ────────────────────────────────────────────────────

  {
    slug: "veeps",
    title: "Veeps",
    category: "Frontend Development",
    description: "Live music streaming platform with Next.js/TypeScript responsive UI and Tailwind.",
    src: "/projects/veeps.png",
    url: "https://veeps.com",
    industry: "Entertainment / Live Streaming",
    platform: "Web",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
    year: "2023",
    about: "Veeps is a live music streaming platform that connects artists directly with fans for paid live concerts and events. As a Frontend Developer, built responsive user interfaces using Next.js with TypeScript and Tailwind CSS — delivering a premium streaming experience under high-traffic live event conditions.",
    challenge: "Delivering a visually polished, highly responsive streaming UI that performs flawlessly during high-traffic live event windows when thousands of fans hit the same URL simultaneously.",
    solution: "Used Next.js with TypeScript for a type-safe, performant frontend architecture with SSR ensuring fast event page loads, and Tailwind CSS for a consistent, fully responsive design system across all device sizes.",
    goals: {
      title: "Project Goals",
      body: "Build a live streaming UI that feels as premium as the events it hosts — responsive across all devices, performant under peak concurrent load, and intuitive enough that fans stay focused on the music.",
    },
    highlights: [
      { heading: "Next.js Performance Architecture", body: "Leveraged Next.js SSR and static generation so event pages load instantly when thousands of fans hit the same URL at show time — no blank screens, no spinners on drop night." },
      { heading: "Responsive Design System", body: "Built a Tailwind CSS design system that adapts the streaming interface seamlessly from 4K desktop to mobile, maintaining the visual premium of live events on every screen size." },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS"] },
    ],
    results: [
      { metric: "Thousands", label: "Concurrent viewers" },
      { metric: "100%", label: "Responsive across devices" },
      { metric: "Fast", label: "SSR event page loads" },
      { metric: "TypeScript", label: "Type-safe codebase" },
    ],
    team: [
      { role: "Frontend Developer", count: 2 },
      { role: "UI/UX Designer", count: 1 },
    ],
  },
  {
    slug: "domestika",
    title: "Domestika",
    category: "Frontend Development",
    description: "Global creative learning platform with React component library and Bootstrap layouts.",
    src: "/projects/domestika.png",
    url: "https://www.domestika.org",
    industry: "EdTech / E-Learning",
    platform: "Web",
    stack: ["TypeScript", "React", "JavaScript", "CSS", "Bootstrap"],
    year: "2023",
    about: "Domestika is one of the world's largest creative learning communities with millions of students across dozens of languages. As a Frontend Developer, built user-friendly interfaces and responsive layouts using JavaScript, React, TypeScript, and Bootstrap — delivering pixel-perfect components at global scale.",
    challenge: "Delivering accessible, pixel-perfect UI components in a large-scale platform serving millions of creative learners across different languages and devices without breaking responsiveness or visual consistency.",
    solution: "Developed reusable React components with TypeScript for type safety, used Bootstrap for consistent responsive grids, and applied CSS custom properties for theme consistency across the entire platform.",
    goals: {
      title: "Project Goals",
      body: "Build accessible, visually consistent UI components for a global creative learning platform — components that scale across millions of users in dozens of languages without breaking responsiveness or accessibility.",
    },
    highlights: [
      { heading: "Reusable React Component Library", body: "Built a library of TypeScript-typed React components enabling faster feature development across the platform while enforcing visual consistency at the scale of millions of learners." },
      { heading: "Responsive Bootstrap Layouts", body: "Applied Bootstrap's grid system with CSS custom overrides to create fluid, responsive course and profile layouts that adapt naturally from mobile to widescreen without layout shifts." },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "JavaScript", "CSS", "Bootstrap"] },
    ],
    results: [
      { metric: "Millions", label: "Users served" },
      { metric: "100%", label: "Responsive layouts" },
      { metric: "Reusable", label: "Component architecture" },
      { metric: "Fast", label: "Feature delivery" },
    ],
    team: [
      { role: "Frontend Developer", count: 2 },
      { role: "UI/UX Designer", count: 1 },
    ],
  },
  {
    slug: "temboo",
    title: "Temboo",
    category: "Frontend Development",
    description: "IoT integration platform with performant React/Bootstrap UI focused on developer experience.",
    src: "/projects/temboo.png",
    url: "https://temboo.com",
    industry: "IoT / Technology",
    platform: "Web",
    stack: ["JavaScript", "React", "Bootstrap", "HTML", "CSS"],
    year: "2022",
    about: "Temboo is an IoT integration platform that simplifies connecting devices, data, and cloud services. As a Frontend Developer, built user interfaces using JavaScript and React with Bootstrap, focusing on performance optimisation and responsive design across the developer-facing product.",
    challenge: "Building performant, responsive interfaces for a technical IoT platform that needs to communicate complex device data flows clearly to both developers and non-technical users without overwhelming either.",
    solution: "Developed optimised React components with memoisation and lazy loading to keep dashboards snappy under live IoT data, using a Bootstrap foundation for consistent responsive grids and clear data display patterns.",
    goals: {
      title: "Project Goals",
      body: "Build a developer-friendly UI that makes IoT integration approachable — clear, performant interfaces that help users connect devices and visualise data flows without requiring deep technical knowledge of the underlying infrastructure.",
    },
    highlights: [
      { heading: "Performance-Focused React UI", body: "Optimised React components with memoisation and lazy loading to keep the dashboard responsive even when displaying live IoT device data streams with frequent update cycles." },
      { heading: "Responsive Bootstrap Grid", body: "Applied Bootstrap's responsive grid to ensure the IoT dashboard adapts cleanly from desktop monitoring setups to tablet views used by teams working in the field." },
    ],
    techStack: [
      { category: "Frontend", items: ["JavaScript", "React", "Bootstrap", "HTML", "CSS"] },
    ],
    results: [
      { metric: "Fast", label: "Dashboard performance" },
      { metric: "100%", label: "Responsive across devices" },
      { metric: "Intuitive", label: "IoT workflow UI" },
      { metric: "Optimised", label: "Component rendering" },
    ],
    team: [
      { role: "Frontend Developer", count: 2 },
      { role: "UI/UX Designer", count: 1 },
    ],
  },
  {
    slug: "healthtap",
    title: "HealthTap",
    category: "Frontend Development",
    description: "AI-powered virtual healthcare platform with Next.js/TypeScript accessible UI.",
    src: "/projects/healthtap.png",
    url: "https://www.healthtap.com",
    industry: "Healthcare / Telehealth",
    platform: "Web",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
    year: "2023",
    about: "HealthTap is an AI-powered virtual care platform connecting patients with doctors for online consultations. As a Frontend Developer, built performant, accessible user interfaces using Next.js with TypeScript and Tailwind CSS — delivering reliable, fast-loading experiences where patient trust is paramount.",
    challenge: "Building accessible, HIPAA-aware frontend interfaces for a telehealth platform where patient trust, fast load times, and cross-device reliability are all critical success factors.",
    solution: "Used Next.js with TypeScript for a type-safe, server-rendered frontend and Tailwind CSS for a consistent, accessible design system — delivering fast, WCAG-compliant UI across all devices and connection speeds.",
    goals: {
      title: "Project Goals",
      body: "Build a telehealth UI that patients trust from first impression — accessible, fast-loading, and responsive across every device, with TypeScript keeping the codebase reliable as the platform grows.",
    },
    highlights: [
      { heading: "Type-Safe Next.js Frontend", body: "Built with Next.js and TypeScript for a robust, server-rendered frontend — type safety eliminates runtime errors in patient-facing flows where reliability is directly tied to patient safety." },
      { heading: "Accessible Tailwind Design System", body: "Applied a Tailwind CSS design system for consistent, WCAG-compliant components across the platform — maintaining visual coherence from consultation booking to patient dashboards at every screen size." },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS"] },
    ],
    results: [
      { metric: "TypeScript", label: "Type-safe UI" },
      { metric: "100%", label: "Responsive across devices" },
      { metric: "Fast", label: "Server-rendered loads" },
      { metric: "WCAG", label: "Accessibility compliant" },
    ],
    team: [
      { role: "Frontend Developer", count: 2 },
      { role: "UI/UX Designer", count: 1 },
    ],
  },

   {
    slug: "doxy",
    title: "Doxy",
    category: "Full Stack Development",
    description: "HIPAA-compliant telehealth video platform with NLP chatbot for patient intake.",
    src: "/projects/doxy.png",
    url: "https://doxy.me",
    industry: "Healthcare / Telehealth",
    platform: "Web",
    stack: ["React", "Next.js", "MongoDB", "Node.js", "Express.js", "Docker", "Git"],
    year: "2023",
    about: "Doxy.me is a HIPAA-compliant telehealth platform enabling seamless video consultations between healthcare providers and patients. Delivered an optimised React frontend backed by Node.js/Express.js APIs with MongoDB, containerised via Docker, and integrated NLP-powered chatbots to automate patient intake and scheduling.",
    challenge: "Building a HIPAA-compliant video consultation platform that could handle concurrent sessions at scale while integrating NLP chatbots for patient intake without adding noticeable latency to the user experience.",
    solution: "Rebuilt the Node.js/Express.js API layer with connection pooling and query optimisation on MongoDB, containerised the full stack with Docker for consistent deployments, and integrated an NLP chatbot handling symptom collection, appointment booking, and pre-consultation questionnaires.",
    goals: {
      title: "Project Goals",
      body: "Create a reliable, HIPAA-compliant telehealth platform that simplifies consultations for providers and patients alike — with an intelligent chatbot reducing administrative burden on clinical staff so they can focus on care.",
    },
    highlights: [
      { heading: "Optimised Full Stack Architecture", body: "Rebuilt Node.js/Express.js APIs with connection pooling and MongoDB query optimisation, reducing average API response time and supporting thousands of concurrent video sessions without degradation." },
      { heading: "NLP Chatbot Integration", body: "Integrated an NLP-powered chatbot automating patient intake — collecting symptoms, scheduling appointments, and running pre-consultation questionnaires — reducing manual admin work for clinical staff significantly." },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Next.js"] },
      { category: "Backend", items: ["Node.js", "Express.js", "MongoDB"] },
      { category: "DevOps", items: ["Docker", "Git"] },
    ],
    results: [
      { metric: "HIPAA", label: "Compliant platform" },
      { metric: "40%", label: "Reduction in admin work" },
      { metric: "99.9%", label: "Session uptime" },
      { metric: "Thousands", label: "Concurrent sessions" },
    ],
    team: [
      { role: "Full Stack Engineer", count: 2 },
      { role: "DevOps Engineer", count: 1 },
      { role: "AI/NLP Engineer", count: 1 },
    ],
  },
  
  // ── Backend Development ─────────────────────────────────────────────────────

  {
    slug: "oportun",
    title: "Oportun",
    category: "Backend Development",
    description: "FinTech app with secure Nest.js APIs for loan management and payment processing.",
    src: "/projects/oportun.png",
    url: "https://apps.apple.com/us/app/oportun-finances-made-simple/id1011935076",
    industry: "FinTech",
    platform: "Mobile (iOS & Android)",
    stack: ["React Native", "Nest.js"],
    year: "2023",
    about: "Oportun is a mission-driven financial services company providing affordable loans and savings products to underserved communities. As a Backend Developer, built secure Nest.js APIs handling loan management, payment processing, and user authentication — all built with strict data validation and audit logging.",
    challenge: "Building secure, compliant backend APIs for financial services — loan origination, payment processing, and user authentication — where correctness and regulatory compliance are absolute requirements with no room for error.",
    solution: "Developed modular RESTful APIs using Nest.js for loan management, payment processing pipelines, and JWT-based authentication — with strict input validation, idempotency handling, and audit logging throughout.",
    goals: {
      title: "Project Goals",
      body: "Build a secure, reliable API foundation for a financial services app serving underserved communities — handling sensitive financial data with the correctness, auditability, and compliance that FinTech demands.",
    },
    highlights: [
      { heading: "Secure Loan Management APIs", body: "Built Nest.js API modules for loan origination, status tracking, and repayment management with strict input validation, role-based access control, and audit logging on all financial transactions." },
      { heading: "Payment Processing Pipeline", body: "Developed a reliable payment processing API layer with idempotency handling and retry logic — ensuring no payment is ever double-processed or silently lost regardless of network conditions." },
    ],
    techStack: [
      { category: "Mobile", items: ["React Native"] },
      { category: "Backend", items: ["Nest.js"] },
    ],
    results: [
      { metric: "Secure", label: "Financial data APIs" },
      { metric: "0", label: "Payment processing errors" },
      { metric: "Compliant", label: "FinTech API standards" },
      { metric: "Auditable", label: "All financial transactions" },
    ],
    team: [
      { role: "Backend Developer", count: 2 },
      { role: "Mobile Engineer", count: 1 },
    ],
  },
  {
    slug: "shopventory",
    title: "Shopventory",
    category: "Backend Development",
    description: "Inventory management platform with Next.js RESTful APIs and MongoDB integration.",
    src: "/projects/shopventory.png",
    url: "https://shopventory.com",
    industry: "Retail / E-Commerce",
    platform: "Web",
    stack: ["Next.js", "MongoDB", "RESTful API"],
    year: "2023",
    about: "Shopventory is an inventory management platform that connects with POS systems and e-commerce platforms to give retailers unified inventory visibility. As a Backend Developer, developed RESTful APIs and MongoDB database integration facilitating reliable data transactions across multiple retail integrations.",
    challenge: "Building a RESTful API layer that could reliably sync inventory data across multiple POS and e-commerce integrations simultaneously while maintaining data consistency under concurrent reads and writes.",
    solution: "Developed clean RESTful API endpoints in Next.js for inventory sync, stock adjustments, and multi-location queries, with MongoDB schemas and indexing strategies optimised for high-frequency inventory operations.",
    goals: {
      title: "Project Goals",
      body: "Build a reliable API backend that keeps inventory data consistent across multiple retail integrations — where a stock discrepancy translates directly to lost sales, over-selling, or damaged customer trust.",
    },
    highlights: [
      { heading: "RESTful Inventory APIs", body: "Built clean Next.js RESTful API endpoints handling inventory sync, stock adjustments, and multi-location queries — with request validation ensuring data integrity on every write across all POS integrations." },
      { heading: "Optimised MongoDB Data Layer", body: "Designed MongoDB schemas with indexing strategies optimised for Shopventory's read-heavy inventory queries, keeping response times fast even as product catalogues and retailer counts scale." },
    ],
    techStack: [
      { category: "Backend", items: ["Next.js", "MongoDB", "RESTful API"] },
    ],
    results: [
      { metric: "Fast", label: "Inventory query performance" },
      { metric: "100%", label: "Data consistency" },
      { metric: "Scalable", label: "MongoDB schema design" },
      { metric: "Reliable", label: "Multi-integration sync" },
    ],
    team: [
      { role: "Backend Developer", count: 2 },
      { role: "Database Engineer", count: 1 },
    ],
  },

  // ── Mobile App Development ──────────────────────────────────────────────────

  {
    slug: "sololearn",
    title: "SoloLearn",
    category: "Mobile App Development",
    description: "Coding education app with interactive React Native lesson modules for millions of learners.",
    src: "/projects/sololearn.png",
    url: "https://play.google.com/store/apps/details?id=com.sololearn",
    industry: "EdTech",
    platform: "Mobile (iOS & Android)",
    stack: ["React Native", "Node.js"],
    year: "2023",
    about: "SoloLearn is a popular coding education app with millions of active learners worldwide. As a Frontend Developer and Mobile Application Developer, designed interactive coding modules with React Native, focusing on responsive layouts and engaging learning interfaces that keep users progressing through lessons daily.",
    challenge: "Building interactive coding lesson modules and exercises in React Native that feel as engaging as native apps, with responsive layouts working across hundreds of different Android and iOS device sizes.",
    solution: "Designed and developed interactive code editor and quiz components in React Native, optimised for touch interaction and small screen readability — creating an engaging lesson flow with immediate feedback that encourages daily return.",
    goals: {
      title: "Project Goals",
      body: "Build mobile coding lesson interfaces that make learning to code genuinely enjoyable — interactive, responsive, and engaging enough that learners return to the app daily across millions of installs.",
    },
    highlights: [
      { heading: "Interactive Coding Modules", body: "Developed interactive code editor and quiz components in React Native with immediate feedback loops — designed so the learning experience feels responsive and rewarding on a small mobile screen." },
      { heading: "Responsive Mobile Layouts", body: "Built responsive lesson layouts adapting to diverse screen sizes and orientations, ensuring a consistent, frustration-free learning experience across the full range of Android and iOS devices." },
    ],
    techStack: [
      { category: "Mobile", items: ["React Native"] },
      { category: "Backend", items: ["Node.js"] },
    ],
    results: [
      { metric: "Millions", label: "Active learners" },
      { metric: "Engaging", label: "Interactive lesson modules" },
      { metric: "100%", label: "Responsive across devices" },
      { metric: "Daily", label: "User return rate" },
    ],
    team: [
      { role: "Mobile Developer", count: 2 },
      { role: "UI/UX Designer", count: 1 },
    ],
  },
  {
    slug: "shuteye",
    title: "Shut Eye",
    category: "Mobile App Development",
    description: "Sleep tracking app with Python ML algorithms analysing patterns for personalised insights.",
    src: "/projects/shuteye.png",
    url: "https://play.google.com/store/apps/details?id=health.sleep.sounds.tracker.alarm.calm",
    industry: "Health & Wellness",
    platform: "Mobile (iOS & Android)",
    stack: ["Flutter", "Python"],
    year: "2023",
    about: "Shut Eye is a comprehensive sleep tracking and improvement app with millions of downloads. As a Backend Developer, developed machine learning algorithms using Python to analyse sleep patterns and improve tracking accuracy — delivering personalised sleep stage insights to users each morning.",
    challenge: "Developing ML algorithms accurate enough to classify sleep stages from device sensor data, while keeping inference efficient enough to not impact device battery life or interrupt the sleep experience.",
    solution: "Built Python machine learning models for sleep stage classification using accelerometer and audio signal inputs, optimised for inference efficiency and deployed as a backend service delivering results to the Flutter frontend.",
    goals: {
      title: "Project Goals",
      body: "Build ML-powered sleep analysis that gives users genuinely accurate, actionable insights about their sleep — not generic advice, but personalised analysis grounded in each night's real sensor data.",
    },
    highlights: [
      { heading: "ML Sleep Stage Classification", body: "Developed Python machine learning algorithms that classify deep, light, and REM sleep stages from sensor inputs with high accuracy — giving users detailed, personalised breakdowns each morning." },
      { heading: "Efficient Inference Pipeline", body: "Optimised the ML inference pipeline to run as a lightweight backend service, delivering sleep analysis results quickly without requiring heavy on-device computation that would drain battery during the night." },
    ],
    techStack: [
      { category: "Mobile", items: ["Flutter"] },
      { category: "Backend / ML", items: ["Python"] },
    ],
    results: [
      { metric: "Accurate", label: "Sleep stage classification" },
      { metric: "Millions", label: "App downloads" },
      { metric: "Personalised", label: "Nightly sleep insights" },
      { metric: "Efficient", label: "ML inference performance" },
    ],
    team: [
      { role: "ML Engineer", count: 1 },
      { role: "Backend Developer", count: 1 },
      { role: "Mobile Developer", count: 1 },
    ],
  },
  {
    slug: "radiogarden",
    title: "Radio Garden",
    category: "Mobile App Development",
    description: "Global live radio streaming app with scalable Django backend and Flutter globe UI.",
    src: "/projects/radiogarden.png",
    url: "https://play.google.com/store/search?q=Radio+Garden&c=apps",
    industry: "Media / Entertainment",
    platform: "Mobile (iOS & Android)",
    stack: ["Flutter", "Django"],
    year: "2023",
    about: "Radio Garden lets users explore live radio stations from around the world via an interactive globe interface. As a Mobile and Backend Developer, built scalable Django APIs managing live radio feeds and station metadata, connected to a Flutter frontend delivering smooth globe navigation and instant stream switching.",
    challenge: "Building a scalable backend capable of managing thousands of live radio feed connections simultaneously while keeping stream latency low and the Flutter globe interface smooth and responsive.",
    solution: "Developed Django backend APIs managing live radio station catalogues and stream connections for thousands of global stations, with caching layers for concurrent listeners, connected to a Flutter frontend with smooth globe navigation.",
    goals: {
      title: "Project Goals",
      body: "Build a scalable backend serving live radio from thousands of global stations reliably — connected to a Flutter frontend that makes discovering and listening to world radio genuinely delightful.",
    },
    highlights: [
      { heading: "Scalable Django Radio APIs", body: "Built Django APIs managing live station catalogues and stream connections for thousands of global stations, with caching layers handling concurrent listeners without performance degradation under load." },
      { heading: "Flutter Globe Interface", body: "Connected Django backend data to a Flutter frontend with smooth, interactive globe navigation — letting users spin the globe to instantly discover and tune into local radio stations from anywhere in the world." },
    ],
    techStack: [
      { category: "Mobile", items: ["Flutter"] },
      { category: "Backend", items: ["Django"] },
    ],
    results: [
      { metric: "Thousands", label: "Global stations" },
      { metric: "Low", label: "Stream switch latency" },
      { metric: "Scalable", label: "Concurrent listener support" },
      { metric: "Global", label: "Radio coverage" },
    ],
    team: [
      { role: "Mobile Developer", count: 1 },
      { role: "Backend Developer", count: 1 },
    ],
  },
  {
    slug: "peanut",
    title: "Peanut",
    category: "Mobile App Development",
    description: "Social networking app for mothers with polished React Native UI and Node.js backend.",
    src: "/projects/peanut.png",
    url: "https://play.google.com/store/apps/details?id=com.teampeanut.peanut",
    industry: "Social / Parenting",
    platform: "Mobile (iOS & Android)",
    stack: ["React Native", "Node.js"],
    year: "2023",
    about: "Peanut is a social networking app designed to connect mothers, making it easier to find friendship and community during a life stage that can feel isolating. As a Mobile Application Developer, developed mobile screens with React Native and built backend services using Node.js for real-time messaging, user matching, and community features.",
    challenge: "Building a social app in React Native that feels warm, native, and fluid while the Node.js backend reliably handles real-time messaging, user matching algorithms, and community data at scale.",
    solution: "Developed React Native screens for community, matching, messaging, and profile features with smooth animations and navigation flows, backed by Node.js APIs handling real-time data, matching logic, and user relationship management.",
    goals: {
      title: "Project Goals",
      body: "Build a social networking experience that feels as polished and native as apps from major platforms — where the UI warmth and responsiveness are as important as the community features they surface.",
    },
    highlights: [
      { heading: "Polished React Native Screens", body: "Developed community, profile, and messaging screens in React Native with smooth navigation and warm animations — creating an approachable social experience that reflects the brand's supportive identity." },
      { heading: "Node.js Community Backend", body: "Built Node.js backend services handling user matching, community data, and real-time messaging — providing the reliable foundation for users to build genuine friendships through the app." },
    ],
    techStack: [
      { category: "Mobile", items: ["React Native"] },
      { category: "Backend", items: ["Node.js"] },
    ],
    results: [
      { metric: "Fluid", label: "React Native UI" },
      { metric: "Real-time", label: "Messaging & community" },
      { metric: "Reliable", label: "User matching backend" },
      { metric: "Warm", label: "User experience" },
    ],
    team: [
      { role: "Mobile Developer", count: 2 },
      { role: "Backend Developer", count: 1 },
    ],
  },
  {
    slug: "overcast",
    title: "Overcast",
    category: "Mobile App Development",
    description: "Award-winning podcast player with Flutter frontend and high-performance Go backend.",
    src: "/projects/overcast.png",
    url: "https://apps.apple.com/us/app/overcast/id888422857",
    industry: "Media / Podcasting",
    platform: "Mobile (iOS)",
    stack: ["Flutter", "Go"],
    year: "2023",
    about: "Overcast is a highly regarded podcast player known for its audio quality features and smart playback controls. As a Full Stack Developer, developed both the Flutter frontend delivering the podcast listening experience and backend services in Go managing feed parsing, episode data, and recommendation logic.",
    challenge: "Building a performant podcast player frontend in Flutter while the Go backend handles concurrent RSS feed parsing, audio metadata management, and smart playlist recommendations without latency.",
    solution: "Developed the Flutter frontend with smooth playback controls, episode queuing, and audio settings, while Go backend services leveraged native concurrency to parse multiple podcast feeds simultaneously and serve episode data with minimal latency.",
    goals: {
      title: "Project Goals",
      body: "Build a podcast player that earns its quality reputation — a Flutter frontend delivering a seamless listening experience paired with a Go backend handling feed management and episode data with the efficiency the format demands.",
    },
    highlights: [
      { heading: "Flutter Podcast Player UI", body: "Developed the podcast listening interface in Flutter with smooth playback controls, episode queuing, and audio settings — delivering the polished, responsive experience Overcast's discerning users expect." },
      { heading: "Concurrent Go Feed Parsing", body: "Built Go backend services for high-performance RSS feed management, leveraging Go's concurrency model to parse multiple podcast feeds in parallel without blocking — keeping episode libraries fresh and fast to load." },
    ],
    techStack: [
      { category: "Mobile", items: ["Flutter"] },
      { category: "Backend", items: ["Go"] },
    ],
    results: [
      { metric: "Smooth", label: "Flutter playback UI" },
      { metric: "Fast", label: "Concurrent feed parsing" },
      { metric: "Parallel", label: "Multi-feed processing" },
      { metric: "Reliable", label: "Episode management" },
    ],
    team: [
      { role: "Full Stack Developer", count: 1 },
      { role: "Mobile Developer", count: 1 },
    ],
  },
  {
    slug: "depop",
    title: "Depop",
    category: "Mobile App Development",
    description: "Fashion marketplace app with performant React Native UI and Django backend.",
    src: "/projects/depop.png",
    url: "https://play.google.com/store/apps/details?id=com.depop",
    industry: "E-Commerce / Fashion",
    platform: "Mobile (iOS & Android)",
    stack: ["React Native", "Django"],
    year: "2023",
    about: "Depop is a social fashion marketplace with tens of millions of users buying and selling vintage and secondhand clothing. Developed interactive mobile interfaces using React Native with a Django backend — building performant product browsing experiences for a highly visual, image-heavy marketplace.",
    challenge: "Building responsive product browsing and listing interfaces in React Native that handle high volumes of image-heavy fashion listings without impacting scroll performance or load times.",
    solution: "Developed React Native screens for product browsing, listing creation, and checkout with optimised image loading and virtualised lists for smooth scrolling, backed by Django APIs for product management, search, and transactions.",
    goals: {
      title: "Project Goals",
      body: "Build a fashion marketplace mobile experience that makes discovering and buying secondhand fashion enjoyable — smooth, visual, and fast even when loading pages of image-heavy listings in a busy marketplace feed.",
    },
    highlights: [
      { heading: "Performant Product Feed", body: "Developed React Native product browsing screens with virtualised lists and optimised image loading — keeping scroll performance smooth even when displaying hundreds of image-heavy fashion listings at once." },
      { heading: "Django Marketplace Backend", body: "Built Django APIs for product listings, search, transactions, and user profiles — the reliable data layer behind a fast-moving social fashion marketplace with tens of millions of active users." },
    ],
    techStack: [
      { category: "Mobile", items: ["React Native"] },
      { category: "Backend", items: ["Django"] },
    ],
    results: [
      { metric: "Smooth", label: "Scroll performance" },
      { metric: "Fast", label: "Image-heavy listing loads" },
      { metric: "Reliable", label: "Transaction APIs" },
      { metric: "Millions", label: "Active marketplace users" },
    ],
    team: [
      { role: "Mobile Developer", count: 2 },
      { role: "Backend Developer", count: 1 },
    ],
  },
];
