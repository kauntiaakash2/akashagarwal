import React from "react";
import profilePortrait from "../assets/profile.png";

const navItems = ["Home", "About", "Experience", "Projects", "Contact"];

const stats = [
  { value: "8.71", label: "CGPA" },
  { value: "200+", label: "DSA Problems Solved" },
  { value: "2-Star", label: "CodeChef Rating" },
  { value: "SSoC'25", label: "Open Source Contributor" },
];

const projects = [
  {
    eyebrow: "Interactive Developer Tool",
    title: "FinVerify AI",
    description:
      "React & FastAPI multi-source data pipeline leveraging yfinance, achieving a response time of under 2 seconds and 57% verification accuracy.",
    github: "https://github.com/kauntiaakash2/FinVerifyAI",
    demo: "https://fin-verify-ai.vercel.app/",
  },
  {
    eyebrow: "Coding Environment",
    title: "CodeZen 2.0",
    description:
      "Interactive coding environment and flow visualizer designed to make algorithms feel tactile, explorable, and easier to reason about.",
    github: "https://github.com/kauntiaakash2/CodeFlowViz-2.0",
    demo: "https://code-flow-viz-2-0.vercel.app/",
  },
];

const experiences = [
  {
    role: "Machine Learning Development Intern",
    organization: "Infiltrix",
    detail:
      "Built production-grade systems reducing prediction latency by 30% using FastAPI and Scikit-learn.",
  },
  {
    role: "Web Dev Team Member",
    organization: "AlgoZenith KIIT Chapter",
    detail:
      "Organized programming contests, authored 20+ algorithmic problems, and built responsive interfaces for 100+ users.",
  },
];

const skillGroups = [
  {
    title: "Programming & Web",
    skills: ["Python", "C++", "React.js", "Next.js", "Node.js", "Express", "Flask"],
  },
  {
    title: "Core Concepts & ML",
    skills: ["Data Structures & Algorithms", "OOP", "Machine Learning"],
  },
  {
    title: "Database & Cloud",
    skills: ["MongoDB", "PostgreSQL", "Firebase", "AWS"],
  },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/akash-agarwal" },
  { label: "GitHub", href: "https://github.com/kauntiaakash2" },
  { label: "CodeChef", href: "https://www.codechef.com/users/kauntiaakash2" },
  { label: "Codeforces", href: "https://codeforces.com/profile/kauntiaakash2" },
];

function PortraitCard() {
  return (
    <figure className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-royal/10 bg-white shadow-editorial">
      <img
        src={profilePortrait}
        alt="Professional portrait of Akash Agarwal"
        className="h-full w-full object-cover object-[50%_26%]"
      />
    </figure>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.35em] ${light ? "text-[#F4D2BD]" : "text-rust"}`}>
      {children}
    </p>
  );
}

function ProjectImagePlaceholder({ title }) {
  return (
    <div className="relative min-h-64 overflow-hidden rounded-2xl bg-royal p-6 text-white shadow-soft">
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-white/20" />
      <div className="absolute bottom-8 left-8 right-8 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.28em] text-[#F4D2BD]">Case Study Visual</p>
        <p className="mt-3 font-serif text-4xl">{title}</p>
      </div>
      <div className="absolute left-8 top-8 flex gap-2">
        <span className="h-3 w-3 rounded-full bg-rust" />
        <span className="h-3 w-3 rounded-full bg-white/50" />
        <span className="h-3 w-3 rounded-full bg-white/30" />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-royal/10 bg-cream/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <a href="#home" className="font-serif text-2xl font-bold tracking-tight text-royal">
            Aa
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-[0.25em] text-rust transition hover:text-royal">
                {item}
              </a>
            ))}
          </nav>
          <a href="mailto:akashagarwal@example.com" className="rounded-full border border-rust px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-rust transition hover:bg-rust hover:text-white">
            Email
          </a>
        </div>
      </header>

      <main id="home" className="pt-24">
        <section className="bg-cream px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <SectionLabel>Hey, I am</SectionLabel>
              <h1 className="mt-6 max-w-5xl font-serif text-[clamp(4.4rem,12vw,11rem)] font-black uppercase leading-[0.82] tracking-[-0.08em] text-royal">
                Akash Agarwal
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-8 text-ink/75 sm:text-2xl sm:leading-9">
                B.Tech AI/ML Student & Full-Stack Developer creating scalable, user-centric applications and intelligent systems.
              </p>
            </div>
            <PortraitCard />
          </div>
        </section>

        <section id="about" className="bg-cream px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>About & Stats</SectionLabel>
            <p className="mt-6 max-w-6xl font-serif text-4xl leading-tight tracking-[-0.03em] text-royal sm:text-5xl lg:text-6xl">
              I am a Computer Science student at KIIT specializing in Python, C++, and modern web technologies like Next.js. I blend a strong foundation in Data Structures and Algorithms with a deep interest in Machine Learning to build performant, real-world solutions.
            </p>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <article key={stat.label} className="rounded-xl border border-royal/15 bg-white/40 p-7 shadow-soft">
                  <p className="font-serif text-5xl font-bold text-royal">{stat.value}</p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-rust">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="bg-royal px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionLabel light>Selected Projects</SectionLabel>
            <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-none tracking-[-0.04em] sm:text-7xl">
              Intelligent products with editorial restraint.
            </h2>
            <div className="mt-14 space-y-8">
              {projects.map((project) => (
                <article key={project.title} className="grid gap-8 rounded-xl bg-white p-6 text-ink shadow-editorial lg:grid-cols-[0.92fr_1.08fr] lg:p-8">
                  <div className="flex flex-col justify-between py-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-rust">{project.eyebrow}</p>
                      <h3 className="mt-5 font-serif text-4xl font-bold tracking-[-0.03em] text-royal sm:text-5xl">{project.title}</h3>
                      <p className="mt-6 text-lg leading-8 text-ink/72">{project.description}</p>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a href={project.demo} target="_blank" rel="noreferrer" className="rounded-xl bg-royal px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-rust">
                        Live Demo
                      </a>
                      <a href={project.github} target="_blank" rel="noreferrer" className="rounded-xl border border-royal/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-royal transition hover:border-rust hover:text-rust">
                        GitHub
                      </a>
                    </div>
                  </div>
                  <ProjectImagePlaceholder title={project.title} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="bg-cream px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Work Experience</SectionLabel>
            <div className="mt-8 grid gap-10 lg:grid-cols-[0.55fr_1fr]">
              <h2 className="font-serif text-5xl leading-none tracking-[-0.04em] text-royal sm:text-7xl">Practice shaped by shipping.</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {experiences.map((experience, index) => (
                  <article key={experience.role} className={`${index === 1 ? "md:mt-16" : ""} rounded-xl border border-royal/15 bg-white/55 p-8 shadow-soft`}>
                    <p className="font-serif text-6xl text-rust/35">0{index + 1}</p>
                    <h3 className="mt-8 font-serif text-3xl font-bold text-royal">{experience.role}</h3>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.22em] text-rust">{experience.organization}</p>
                    <p className="mt-6 text-lg leading-8 text-ink/72">{experience.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream px-5 pb-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl border-t border-royal/15 pt-16">
            <SectionLabel>Technical Arsenal</SectionLabel>
            <div className="mt-8 divide-y divide-royal/15 rounded-xl border border-royal/15 bg-white/45 shadow-soft">
              {skillGroups.map((group, index) => (
                <details key={group.title} className="group p-6 open:bg-white/55" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-3xl font-bold text-royal">
                    {group.title}
                    <span className="text-rust transition group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {group.skills.map((skill) => (
                      <span key={skill} className="rounded-xl border border-royal/15 bg-cream px-4 py-2 text-sm font-semibold text-ink/75">
                        {skill}
                      </span>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="overflow-hidden bg-royal px-5 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-5">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-[0.25em] text-[#F4D2BD] transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-12 font-serif text-[clamp(4rem,15vw,13rem)] font-black uppercase leading-[0.78] tracking-[-0.08em] text-white">
            Akash Agarwal
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
