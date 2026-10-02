// Content source: Akash_Agarwal_Detailed_Profile.md (September 2026).
// Missing personal assets and contact fields stay empty rather than using demo values.
export const profile = {
  firstName: "Akash",
  lastName: "Agarwal",
  email: "akashkauntia2006@gmail.com",
  portrait: {
    src: "/images/portrait-960.webp",
    srcSet: "/images/portrait-480.webp 480w, /images/portrait-960.webp 960w",
    width: 960,
    height: 1907,
  },
  location: "Bhubaneswar, Odisha, India",
  tagline: "Software engineering · Full-stack · AI/ML",
  introduction:
    "I’m Akash Agarwal — a third-year CSE student at KIIT, building full-stack applications, backend systems, and AI/ML tools.",
  about:
    "I build systems that connect useful interfaces with the engineering behind them — from code execution and financial-data verification to scheduling and LLM evaluation.",
  biography:
    "I’m pursuing a B.Tech in Computer Science & Engineering with an AI/ML specialization at KIIT. My interests include developer tools, optimization, program analysis, and concurrent backend systems. Alongside development, I’m active in open source and competitive programming, with a CodeChef 3-Star peak rating of 1614.",
  contactIntro:
    "For engineering opportunities, project collaborations, or a conversation about my work, send me a message.",
};
const socialUrls = {
  github: "https://github.com/kauntiaakash2",
  linkedin: "https://www.linkedin.com/in/kauntiakash2/",
  youtube: "https://www.youtube.com/@kauntiakash2",
  codeforces: "https://codeforces.com/profile/kauntiaakash2",
  codechef: "https://www.codechef.com/users/kauntiakash2",
  leetcode: "https://leetcode.com/u/kauntiaakash2/",
};

export const aboutSocials = [
  { label: "GitHub", url: socialUrls.github },
  { label: "LinkedIn", url: socialUrls.linkedin },
  { label: "Email", url: `mailto:${profile.email}` },
];
// Footer labels are abbreviated; full names remain available to assistive technology.
export const footerSocials = [
  {
    label: "GitHub",
    shortLabel: "GH",
    url: socialUrls.github,
  },
  {
    label: "LinkedIn",
    shortLabel: "LNKD",
    url: socialUrls.linkedin,
  },
  {
    label: "YouTube",
    shortLabel: "YT",
    url: socialUrls.youtube,
  },
  {
    label: "Codeforces",
    shortLabel: "CF",
    url: socialUrls.codeforces,
  },
  {
    label: "CodeChef",
    shortLabel: "CC",
    url: socialUrls.codechef,
  },
  {
    label: "LeetCode",
    shortLabel: "LC",
    url: socialUrls.leetcode,
  },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  year?: string;
  image: string;
  description: string;
  challenge: string;
  approach: string;
  github?: string;
  live?: string;
};
// Keep the existing four-card gallery. The chapter platform is covered in Experience.
// Existing template artwork is decorative, not a screenshot or identity for these projects.
export const projects: Project[] = [
  {
    id: "codeflowviz",
    name: "CodeFlowViz 2.0",
    category: "Developer tool",
    image: "/images/logo-design.png",
    description:
      "An interactive JavaScript execution visualizer. As lead developer, I built a workflow that turns execution events, control flow, and variable snapshots into a replayable timeline.",
    challenge:
      "Make program execution easier to understand while keeping CPU-intensive workloads off the main Node.js request thread.",
    approach:
      "A Next.js/React interface connects to an Express API, Acorn-based AST instrumentation, and a worker-thread execution service. Monaco Editor, React Flow, and Zustand support the interactive experience. Worker threads isolate execution from request handling; they are not a production-grade security sandbox.",
    github: "https://github.com/kauntiaakash2/CodeFlowViz-2.0",
    live: "https://code-flow-viz-2-0-frontend.vercel.app/",
  },
  {
    id: "finverify-ai",
    name: "FinVerify AI",
    category: "Financial verification",
    image: "/images/monogram.png",
    description:
      "A financial-claim verification application that retrieves market data, validates evidence, and returns confidence scores with source attribution. I led development of the system.",
    challenge:
      "Evaluate financial claims against multiple data sources and return structured evidence rather than an unsupported generated answer.",
    approach:
      "A React frontend connects to asynchronous Python/FastAPI workflows with yfinance, scikit-learn, caching, fallback sources, and Pydantic validation. Pytest covers API and verification behavior. Tested API responses stayed below approximately two seconds in the development/test setup.",
    // Supplied live URL https://fin-verify-ai.vercel.app returned 404 during validation.
    github: "https://github.com/kauntiaakash2/FinVerifyAI",
  },
  {
    id: "reslot",
    name: "ReSlot",
    category: "Timetable optimization",
    image: "/images/branding.png",
    description:
      "A timetable-generation and recovery system that repairs schedules after teacher absences, room closures, or blocked timeslots while minimizing changes to the published timetable.",
    challenge:
      "Preserve a valid, stable schedule when real-world constraints change. Prioritize hard-constraint validity, then schedule stability, then softer preferences.",
    approach:
      "Next.js and FastAPI connect to Google OR-Tools CP-SAT for deterministic optimization, not LLM-generated scheduling. PostgreSQL preserves immutable published baselines. Independent validation, before/after comparisons, Supabase Auth, and human approval support the repair workflow.",
    github: "https://github.com/kauntiaakash2/ReSlot",
  },
  {
    id: "smart-contract-verification",
    name: "Smart Contract Verification using LLM",
    category: "LLM benchmarking",
    year: "2026",
    image: "/images/experimental.png",
    description:
      "A controlled benchmark for LLM-based Solidity vulnerability detection, developed during the eight-week LNMIIT LUSIP 2026 research internship.",
    challenge:
      "Compare vulnerability predictions under consistent datasets, prompts, output schemas, parsing, and evaluation rules while working within hardware and VRAM constraints.",
    approach:
      "Built a Python pipeline using SmartBugs Curated and SolidiFI. Ollama ran local quantized Qwen, DeepSeek Coder, Code Llama, and Mistral models. Structured predictions, vulnerability categories, latency, and failures were normalized into reproducible JSON/CSV results.",
    github: "https://github.com/kauntiaakash2/SoliBenched",
    live: "https://solibenched.vercel.app/",
  },
];
export type ResumeEntry = {
  title: string;
  place: string;
  period: string;
  text: string;
  url?: string;
};
export const experience: ResumeEntry[] = [
  {
    title: "Machine Learning Development Intern",
    place: "Infiltrix",
    period: "December 2025 — Present",
    text: "Built asynchronous Python/FastAPI inference pipelines and backend scoring workflows. Documented REST API contracts and integrated Hugging Face models for NLP. Reduced end-to-end prediction latency by approximately 30% in the relevant implementation.",
  },
  {
    title: "Technical Lead",
    place: "AlgoZenith KIIT Chapter · Voluntary student leadership",
    period: "May 2026 — Present",
    text: "Previously Web Developer, January–May 2026. Lead development of the React/TypeScript and Node.js/Express chapter platform, with MongoDB and Firebase workflows. Review code, author algorithmic problems, and help organize programming contests.",
    url: "https://algozenithkiit.codes",
  },
  {
    title: "Research Intern · LUSIP 2026",
    place: "The LNM Institute of Information Technology (LNMIIT)",
    period: "June–July 2026 · 8 weeks",
    text: "Studied LLM-based Solidity vulnerability detection under Dr. Imran Alam. Developed reproducible evaluation workflows and adapted inference to local quantized models under hardware constraints.",
  },
  {
    title: "Project Admin · CodeFlowViz",
    place: "GirlScript Summer of Code",
    period: "May-Aug 2026",
    text: "Managed and reviewed 19+ pull requests across 22+ issues. Provided technical feedback on contributor submissions and mentored contributors in the shared CodeFlowViz codebase.",
  },
];
export const education: ResumeEntry[] = [
  {
    title: "B.Tech in Computer Science & Engineering",
    place: "Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar",
    period: "2024–2028",
    text: "Specialization in Artificial Intelligence & Machine Learning. Currently in the third year, with a CGPA of 8.74/10.",
  },
];
export const tools = [
  { name: "React", desc: "Interfaces with TypeScript & Next.js", symbol: "R" },
  { name: "FastAPI", desc: "Async inference & REST APIs", symbol: "Fa" },
  { name: "Python", desc: "ML pipelines & model benchmarking", symbol: "Py" },
];
export const stats = [
  { value: "19+", label: "Pull requests managed / reviewed" },
  { value: "22+", label: "GSSoC issues worked across" },
  { value: "250+", label: "Algorithmic problems solved" },
];
export const marqueeTools = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "C++",
  "scikit-learn",
];
// Flat skills preserve the existing six-cell layout, without unsupported proficiency scores.
export const skills = [
  { name: "C++", description: "Data Structures & Algorithms" },
  { name: "Python", description: "Machine learning & LLM evaluation" },
  { name: "TypeScript", description: "React & Next.js" },
  { name: "Node.js", description: "Express.js & REST APIs" },
  { name: "SQL", description: "PostgreSQL & MySQL" },
  { name: "Docker", description: "Git & GitHub Actions" },
];
