import React from "react";
import profilePortrait from "../assets/profile.png";

const navItems = ["Home", "About", "Experience", "Projects", "Badges", "Contact"];

const stats = [
  { value: "8.71", label: "CGPA" },
  { value: "200+", label: "DSA Problems Solved" },
  { value: "2-Star", label: "CodeChef Rating" },
  { value: "SSoC'25", label: "Open Source Contributor" },
];

const projects = [
  {
    eyebrow: "Community Platform",
    title: "AlgoZenith Website",
    description:
      "Official chapter website experience for AlgoZenith, designed to showcase events, resources, and community initiatives with a modern, responsive interface.",
    github: "https://github.com/kauntiaakash2/AlgoZenith-Website",
    demo: "https://algozenithkiit.codes/",
  },
  {
    eyebrow: "Coding Environment",
    title: "CodeFlowViz 2.0",
    description:
      "Interactive coding environment and flow visualizer designed to make algorithms feel tactile, explorable, and easier to reason about.",
    github: "https://github.com/kauntiaakash2/CodeFlowViz-2.0",
    demo: "https://code-flow-viz-2-0-frontend.vercel.app/",
  },
  {
    eyebrow: "Interactive Developer Tool",
    title: "FinVerify AI",
    description:
      "React & FastAPI multi-source data pipeline leveraging yfinance, achieving a response time of under 2 seconds and 57% verification accuracy.",
    github: "https://github.com/kauntiaakash2/FinVerifyAI",
    demo: "https://fin-verify-ai.vercel.app/",
  },
];

const digitalBadges = [
  {
    title: "GSSoC 2026",
    role: "Project Admin",
    issuer: "GS Labs by GirlScript Foundation",
    accent: "#4fe0ca",
    icon: "⚙️",
  },
  {
    title: "SSoC 2025",
    role: "Open Source Contributor",
    issuer: "Social Summer of Code",
    accent: "#f4a261",
    icon: "</>",
  },
  {
    title: "CodeChef",
    role: "2-Star Programmer",
    issuer: "Competitive Programming",
    accent: "#7c5cff",
    icon: "★",
  },
  {
    title: "AlgoZenith KIIT",
    role: "Technical Lead",
    issuer: "Chapter Leadership",
    accent: "#c05621",
    icon: "AZ",
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
    role: "Technical Lead",
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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kauntiakash2/" },
  { label: "GitHub", href: "https://github.com/kauntiaakash2" },
  { label: "CodeChef", href: "https://www.codechef.com/users/kauntiakash2" },
  { label: "Codeforces", href: "https://codeforces.com/profile/kauntiaakash2" },
];

const keyboardRows = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Back"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
  ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
  ["Ctrl", "Alt", "Space", "Alt", "Ctrl"],
];

const loadingSteps = [
  { type: "command", prompt: "garage@portfolio:~$", text: "sudo su Akash Agarwal" },
  { type: "output", text: "[sudo] password for Akash:" },
  { type: "password", prompt: "password:", text: "Welcome to the Garage Builder" },
  { type: "output", text: "Access granted. Opening the workshop..." },
];

const getKeyLabel = (character) => {
  if (!character) return "";
  if (character === " ") return "Space";
  return character.toUpperCase();
};

function LoadingScreen({ onComplete }) {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [typedText, setTypedText] = React.useState("");
  const [activeKey, setActiveKey] = React.useState("");

  React.useEffect(() => {
    const currentStep = loadingSteps[stepIndex];

    if (!currentStep) {
      const completeTimer = window.setTimeout(onComplete, 650);
      return () => window.clearTimeout(completeTimer);
    }

    if (currentStep.type === "output") {
      setActiveKey("");
      const outputTimer = window.setTimeout(() => {
        setTypedText("");
        setStepIndex((current) => current + 1);
      }, 850);
      return () => window.clearTimeout(outputTimer);
    }

    if (typedText.length < currentStep.text.length) {
      const nextCharacter = currentStep.text[typedText.length];
      const typingTimer = window.setTimeout(() => {
        setTypedText((current) => current + nextCharacter);
        setActiveKey(getKeyLabel(nextCharacter));
      }, currentStep.type === "password" ? 62 : 52);
      return () => window.clearTimeout(typingTimer);
    }

    setActiveKey("Enter");
    const nextStepTimer = window.setTimeout(() => {
      setTypedText("");
      setStepIndex((current) => current + 1);
    }, 650);
    return () => window.clearTimeout(nextStepTimer);
  }, [onComplete, stepIndex, typedText]);

  const completedSteps = loadingSteps.slice(0, stepIndex);
  const currentStep = loadingSteps[stepIndex];
  const displayText = currentStep?.type === "password" ? "•".repeat(typedText.length) : typedText;

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#05070d] px-4 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(192,86,33,0.24),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(79,224,202,0.16),transparent_30%),linear-gradient(135deg,rgba(10,42,94,0.35),rgba(5,7,13,0.95))]" />
      <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:42px_42px]" />

      <section className="relative grid w-full max-w-6xl gap-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_35px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:p-8 lg:grid-cols-[0.9fr_1.1fr]" aria-label="Portfolio loading screen">
        <div className="flex flex-col justify-between rounded-[1.5rem] border border-white/10 bg-black/55 p-5 font-mono shadow-2xl">
          <div>
            <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs uppercase tracking-[0.25em] text-white/45">garage shell</span>
            </div>

            <div className="min-h-64 space-y-4 text-sm leading-7 sm:text-base">
              {completedSteps.map((step, index) => (
                <p key={`${step.text}-${index}`} className={step.type === "output" ? "text-emerald-300" : "text-white"}>
                  {step.prompt ? <span className="mr-2 text-[#f4a261]">{step.prompt}</span> : null}
                  <span>{step.type === "password" ? "•".repeat(step.text.length) : step.text}</span>
                </p>
              ))}

              {currentStep ? (
                <p className={currentStep.type === "output" ? "text-emerald-300" : "text-white"}>
                  {currentStep.prompt ? <span className="mr-2 text-[#f4a261]">{currentStep.prompt}</span> : null}
                  <span>{currentStep.type === "output" ? currentStep.text : displayText}</span>
                  {currentStep.type !== "output" ? <span className="ml-1 inline-block h-5 w-2 translate-y-1 animate-pulse bg-[#4fe0ca]" /> : null}
                </p>
              ) : (
                <p className="text-emerald-300">Launching portfolio...</p>
              )}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#4fe0ca]/30 bg-[#4fe0ca]/10 p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[#4fe0ca]">Password phrase</p>
            <p className="mt-2 font-serif text-2xl text-white">Welcome to the Garage Builder</p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f4a261]">Booting portfolio</p>
            <h2 className="mt-4 font-serif text-5xl font-black uppercase leading-none tracking-[-0.06em] sm:text-7xl">
              Akash Garage
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              A keyboard-driven intro signs in as Akash Agarwal, unlocks the garage, and rolls into the portfolio.
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-[#111827]/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.35)] sm:p-5">
            <div className="mb-4 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 font-mono text-sm text-[#4fe0ca]">
              Preview key: <span className="text-white">{activeKey || "waiting"}</span>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="min-w-max space-y-2">
                {keyboardRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1.5 sm:gap-2">
                  {row.map((key, keyIndex) => {
                    const isWide = ["Back", "Tab", "Caps", "Enter", "Shift", "Space"].includes(key);
                    const isActive = activeKey === key;
                    return (
                      <span
                        key={`${key}-${keyIndex}`}
                        className={`flex h-9 items-center justify-center rounded-lg border text-[0.62rem] font-bold uppercase tracking-[0.08em] transition duration-150 sm:h-11 sm:text-xs ${
                          isWide ? (key === "Space" ? "w-32 sm:w-56" : "w-14 sm:w-20") : "w-8 sm:w-11"
                        } ${isActive ? "-translate-y-1 border-[#4fe0ca] bg-[#4fe0ca] text-[#07111f] shadow-[0_10px_28px_rgba(79,224,202,0.45)]" : "border-white/10 bg-white/[0.08] text-white/70 shadow-[0_5px_0_rgba(0,0,0,0.35)]"}`}
                      >
                        {key}
                      </span>
                    );
                  })}
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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
  const [theme, setTheme] = React.useState("light");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (nextTheme) => {
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      setTheme(nextTheme);
    };

    if (storedTheme === "light" || storedTheme === "dark") {
      applyTheme(storedTheme);
    } else {
      applyTheme(mediaQuery.matches ? "dark" : "light");
    }

    const handlePreferenceChange = (event) => {
      if (!window.localStorage.getItem("theme")) {
        applyTheme(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handlePreferenceChange);
    return () => mediaQuery.removeEventListener("change", handlePreferenceChange);
  }, []);

  const handleLoadingComplete = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <>
      {isLoading ? <LoadingScreen onComplete={handleLoadingComplete} /> : null}
      <div className={`min-h-screen bg-cream text-ink transition-opacity duration-700 ${isLoading ? "pointer-events-none opacity-0" : "opacity-100"}`} aria-hidden={isLoading}>
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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-rust px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-rust transition hover:bg-rust hover:text-white"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <a href="https://drive.google.com/file/d/1Omf8lkj2MndUt0o8TqtI1dP7dURLlfaH/view?usp=sharing" target="_blank" 
    rel="noopener noreferrer" className="rounded-full border border-rust px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-rust transition hover:bg-rust hover:text-white">
              Resume
            </a>
          </div>
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
                        Live View
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

        <section id="badges" className="bg-cream px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:items-end">
              <div>
                <SectionLabel>Digital Badges</SectionLabel>
                <h2 className="mt-5 font-serif text-5xl leading-none tracking-[-0.04em] text-royal sm:text-7xl">
                  Proof of practice, contribution, and community.
                </h2>
              </div>
              <p className="max-w-3xl text-lg leading-8 text-ink/72 lg:justify-self-end">
                A living collection of recognitions from open-source programs, leadership work, and competitive programming milestones. More verified badges can be added here as they come in.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {digitalBadges.map((badge) => (
                <article key={badge.title} className="group relative overflow-hidden rounded-3xl border border-royal/15 bg-white/55 p-6 shadow-soft transition duration-300 hover:-translate-y-2 hover:shadow-editorial">
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-20 blur-2xl" style={{ backgroundColor: badge.accent }} />
                  <div className="relative mx-auto flex aspect-square max-w-[13rem] items-center justify-center rounded-full bg-[#11182f] p-4 text-white shadow-editorial">
                    <div className="absolute inset-3 rounded-full border-2 border-[#627dff]" />
                    <div className="absolute inset-0 rounded-[42%] bg-[#253153] opacity-80 transition duration-300 group-hover:rotate-12" />
                    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-full border border-white/10 bg-[#1f2949] text-center">
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/65">{badge.issuer}</span>
                      <span className="mt-4 font-serif text-3xl font-black leading-none text-white">{badge.title}</span>
                      <span className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-white bg-white/95 text-lg font-black text-royal shadow-soft" style={{ color: badge.accent }}>
                        {badge.icon}
                      </span>
                    </div>
                  </div>
                  <div className="relative mt-7 border-t border-royal/15 pt-5 text-center">
                    <h3 className="font-serif text-2xl font-bold text-royal">{badge.role}</h3>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.24em] text-rust">{badge.title}</p>
                  </div>
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
    </>
  );
}

export default App;
