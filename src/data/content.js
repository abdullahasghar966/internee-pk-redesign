import {
  Code2,
  Smartphone,
  Brain,
  BarChart3,
  Palette,
  Megaphone,
  Search,
  FileSignature,
  Rocket,
  Trophy,
} from 'lucide-react';

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Process', href: '#process' },
  { label: 'Stories', href: '#stories' },
  { label: 'Contact', href: '#contact' },
];

export const tracks = [
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Full-stack React, Next.js, and modern Node back ends. Ship production-grade interfaces with mentor reviews every sprint.',
    seats: '1,420 active',
    accent: 'from-violet-500/30 to-cyan-500/10',
  },
  {
    icon: Smartphone,
    title: 'Mobile Engineering',
    description:
      'Build native-feel apps with React Native and Flutter. From idea to App Store in 12 focused weeks.',
    seats: '860 active',
    accent: 'from-cyan-500/30 to-violet-500/10',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Practical LLM tooling, computer vision, and MLOps. Train, fine-tune, and deploy real models on real datasets.',
    seats: '1,180 active',
    accent: 'from-fuchsia-500/30 to-amber-500/10',
  },
  {
    icon: BarChart3,
    title: 'Data Science',
    description:
      'Python, SQL, and analytics storytelling. Build dashboards that change product decisions, not just please the eye.',
    seats: '710 active',
    accent: 'from-emerald-400/30 to-cyan-500/10',
  },
  {
    icon: Palette,
    title: 'Product Design',
    description:
      'UX research, design systems, and Figma craft. Ship UI that respects users and survives a real engineering handoff.',
    seats: '540 active',
    accent: 'from-pink-500/30 to-violet-500/10',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'SEO, performance ads, and content engines that compound. Learn the math behind growth, not just the vibes.',
    seats: '930 active',
    accent: 'from-amber-400/30 to-pink-500/10',
  },
];

export const process = [
  {
    step: '01',
    icon: Search,
    title: 'Apply',
    body:
      'Choose a track, share your goals, and complete a short skills snapshot. No fee, no fluff — we look for potential, not pedigree.',
  },
  {
    step: '02',
    icon: FileSignature,
    title: 'Onboard',
    body:
      'Get matched with a cohort and a mentor. Receive your roadmap, project briefs, and access to the live community.',
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Build',
    body:
      'Ship one real project per sprint. Weekly mentor reviews, peer critique, and code-quality benchmarks against industry teams.',
  },
  {
    step: '04',
    icon: Trophy,
    title: 'Launch',
    body:
      'Walk away with a portfolio, a verified certificate, and intros to our 500+ hiring partners across Pakistan and abroad.',
  },
];

export const stats = [
  { value: 52000, suffix: '+', label: 'Interns Launched' },
  { value: 520, suffix: '+', label: 'Hiring Partners' },
  { value: 96, suffix: '%', label: 'Completion Rate' },
  { value: 14, suffix: ' wk', label: 'Avg. Cohort' },
];

export const testimonials = [
  {
    name: 'Hira Khan',
    role: 'Frontend Intern → Engineer @ Tintash',
    quote:
      'The reviews were brutal in the best way. Three sprints in, my pull requests stopped getting redlined — and the offer came two weeks before graduation.',
    accent: '#8b5cf6',
  },
  {
    name: 'Bilal Ahmed',
    role: 'ML Track → Researcher @ NUST',
    quote:
      'I came in knowing what gradient descent was. I left with a published paper draft and a portfolio of three deployed models. The mentor matching is the secret weapon.',
    accent: '#22d3ee',
  },
  {
    name: 'Ayesha Tariq',
    role: 'Design Track → Product Designer @ Bazaar',
    quote:
      'Internee.pk taught me that taste compounds. My Figma files from week 12 look nothing like week 1 — and recruiters can see that arc on my portfolio.',
    accent: '#fbbf24',
  },
  {
    name: 'Usman Raza',
    role: 'Data Track → Analyst @ Telenor',
    quote:
      'The cohort culture is the part nobody talks about. I still ship code with five people from my batch. That network alone was worth the 14 weeks.',
    accent: '#f472b6',
  },
];

export const footerLinks = {
  Program: [
    { label: 'Tracks', href: '#tracks' },
    { label: 'How it works', href: '#process' },
    { label: 'Mentors', href: '#stories' },
    { label: 'Certification', href: '#stories' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Careers', href: '#contact' },
    { label: 'Press', href: '#contact' },
    { label: 'Partners', href: '#contact' },
  ],
  Support: [
    { label: 'Help center', href: '#contact' },
    { label: 'Community', href: '#stories' },
    { label: 'Status', href: '#' },
    { label: 'Privacy', href: '#' },
  ],
};
