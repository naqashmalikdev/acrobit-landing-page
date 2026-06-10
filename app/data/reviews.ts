export type Review = {
  name: string;
  role: string;
  company: string;
  logo: string;
  avatar: string;
  rating: number;
  date: string;
  review: string;
};

export const reviews: Review[] = [
  {
    name: "Michael Torres",
    role: "VP of Engineering",
    company: "SoFi",
    logo: "/customers%20logos/sofi-logo.svg",
    avatar: "/people/men1.png",
    rating: 5.0,
    date: "14 Mar, 2024",
    review: "Acrobit elevated our entire frontend experience. Their Next.js architecture reduced our page load times dramatically and the TypeScript discipline they brought has made our codebase significantly easier to maintain at scale. A genuinely world-class team.",
  },
  {
    name: "Isabella Ruiz",
    role: "Head of Product",
    company: "Domestika",
    logo: "/customers%20logos/domestika.png",
    avatar: "/people/women1.png",
    rating: 4.9,
    date: "22 Nov, 2023",
    review: "The component library they built for us has scaled to millions of users across dozens of languages without a single visual regression. They understood both our design standards and our engineering constraints from day one — that combination is extremely rare.",
  },
  {
    name: "Dr. Sarah Chen",
    role: "Chief Technology Officer",
    company: "HealthTap",
    logo: "/customers%20logos/healthtap.svg",
    avatar: "/people/women2.png",
    rating: 5.0,
    date: "09 Jan, 2024",
    review: "Building patient-facing healthcare interfaces requires a level of precision and care most dev shops simply don't have. Acrobit delivered WCAG-compliant, HIPAA-aware UI that our clinical team adopted instantly. Exceptional attention to detail throughout.",
  },
  {
    name: "James Mitchell",
    role: "Engineering Lead",
    company: "Depop",
    logo: "/customers%20logos/depop.webp",
    avatar: "/people/men2.png",
    rating: 4.9,
    date: "03 Apr, 2024",
    review: "Scroll performance in a marketplace with millions of image-heavy listings is genuinely hard. Acrobit solved it. The virtualised React Native feeds they built are silky smooth even on mid-range devices — something our previous team could never crack.",
  },
  {
    name: "Marco Ferretti",
    role: "Founder",
    company: "Overcast",
    logo: "/customers%20logos/overcast.webp",
    avatar: "/people/men3.png",
    rating: 4.9,
    date: "17 Feb, 2024",
    review: "The Flutter UI they delivered has the polish of a native app — smooth playback controls, seamless episode queuing, no jank. And the Go backend handles concurrent feed parsing without breaking a sweat. I couldn't be more satisfied with the outcome.",
  },
  {
    name: "Dr. Rachel Kim",
    role: "Director of Product",
    company: "Doxy.me",
    logo: "/customers%20logos/doxy.svg",
    avatar: "/people/men4.png",
    rating: 5.0,
    date: "28 Jun, 2024",
    review: "Deploying HIPAA-compliant telehealth at scale is not simple. Acrobit containerised our entire stack, optimised our MongoDB layer, and integrated an NLP intake chatbot — all while maintaining 99.9% session uptime. An exceptional engineering partner.",
  },
  {
    name: "Alex Peterson",
    role: "Chief Executive Officer",
    company: "SoloLearn",
    logo: "/customers%20logos/sololearn.webp",
    avatar: "/people/men5.png",
    rating: 4.8,
    date: "11 May, 2024",
    review: "Our coding lesson modules needed to feel native, engaging, and responsive across hundreds of device sizes. Acrobit nailed every requirement. The interactive React Native components they built have contributed directly to a measurable uplift in daily active learners.",
  },
  {
    name: "Lars Andersen",
    role: "Chief Technology Officer",
    company: "Radio Garden",
    logo: "/customers%20logos/radio%20garden.webp",
    avatar: "/people/men6.png",
    rating: 4.9,
    date: "30 Aug, 2023",
    review: "Managing live streams from thousands of global radio stations under concurrent load is a serious backend challenge. Acrobit architected a Django solution with the right caching strategy that handles our peak traffic without degradation. Brilliant technical execution.",
  },
];
