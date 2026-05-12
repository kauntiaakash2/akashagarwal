import React, { useEffect, useMemo, useRef, useState } from "react";

const CLASSIC_PORTFOLIO_LINK = "https://kauntiaakash2.github.io/akashagarwal/";

const bootLines = [
  "AKASH_OS/98 BIOS v1.0.7",
  "COPYRIGHT (C) 1998-2026 AGARWAL SYSTEMS",
  "POST: CHECKING INTERFACE MEMORY... OK",
  "POST: CHECKING REACT KERNEL... OK",
  "POST: DETECTING TAILWIND BUS... OK",
  "POST: MOUNTING /portfolio... OK",
  "POST: LOADING TERMINAL DRIVER... OK",
  "POST: INDEXING PROJECTS.DB... OK",
  "POST: SYNCING KIIT PROFILE... OK",
  "BOOT: EXECUTING AKASH_OS.EXE",
];

const initialTerminalHistory = [
  {
    type: "system",
    text: [
      "AKASH_OS/98 COMMAND TERMINAL ONLINE",
      "SPEC: React Kernel // Tailwind Renderer // Monospace CRT Driver",
      "TYPE 'help' TO LIST AVAILABLE COMMANDS.",
    ],
  },
];

const projectRows = [
  {
    id: "001",
    name: "Code Kurukshetra (KIIT FEST 9.0)",
    stack: "Competitive Coding / Event Ops / KIIT",
    output: "Built and coordinated a high-energy programming contest for festival participants.",
  },
  {
    id: "002",
    name: "CodeZen Community",
    stack: "Community / DSA / Mentorship",
    output: "Helped organize coding culture, peer learning, and developer practice sessions.",
  },
  {
    id: "003",
    name: "Social Winter of Code Season 6",
    stack: "Open Source / Collaboration / Git",
    output: "Contributed to collaborative open-source workflows and shipped maintainable updates.",
  },
];

function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    const lineTimers = bootLines.map((line, index) =>
      setTimeout(() => {
        setVisibleLines((current) => [...current, line]);
      }, index * 185),
    );

    const finishTimer = setTimeout(onComplete, 2500);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <main className="crt-lines min-h-screen bg-terminal p-4 font-mono text-sm uppercase text-phosphor sm:p-8">
      <section className="terminal-scanlines min-h-[calc(100vh-2rem)] border border-phosphor p-4 sm:min-h-[calc(100vh-4rem)] sm:p-6">
        <p className="mb-6">&gt; POWER SIGNAL DETECTED</p>
        <div className="space-y-2" aria-live="polite">
          {visibleLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2">
          <span>&gt;</span>
          <span className="h-5 w-3 animate-pulse bg-phosphor" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}

function SystemClock() {
  const [time, setTime] = useState("");

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    [],
  );

  useEffect(() => {
    const tick = () => setTime(`${formatter.format(new Date())} IST`);
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [formatter]);

  return <span className="border-l border-phosphor px-3 py-2 text-right">{time}</span>;
}

function Terminal() {
  const [history, setHistory] = useState(initialTerminalHistory);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  const getCommandOutput = (command) => {
    switch (command) {
      case "help":
        return ["AVAILABLE COMMANDS:", "help", "whoami", "skills", "projects", "clear"];
      case "whoami":
        return ["Akash Agarwal // Software Engineering Student at KIIT // AI/ML & Full-Stack Developer"];
      case "skills":
        return ["SKILLS.SYS:", "C++", "DSA", "React", "Deep Learning", "Scrum"];
      case "projects":
        return [
          "PROJECTS.DB:",
          "Code Kurukshetra (KIIT FEST 9.0) :: Coding event leadership and contest operations.",
          "CodeZen Community :: Developer community building, DSA practice, and peer mentorship.",
          "Social Winter of Code Season 6 :: Open-source collaboration and contribution workflows.",
        ];
      case "":
        return [""];
      default:
        return [`ERR: COMMAND '${command}' NOT FOUND. TYPE 'help'.`];
    }
  };

  const submitCommand = (event) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    setHistory((current) => [
      ...current,
      { type: "command", text: [`> ${input}`] },
      { type: command === "" ? "system" : "output", text: getCommandOutput(command) },
    ]);
    setInput("");
  };

  return (
    <section
      className="flex min-h-[520px] flex-col border border-phosphor bg-terminal"
      onClick={() => inputRef.current?.focus()}
      aria-labelledby="terminal-title"
    >
      <div className="flex items-center justify-between border-b border-phosphor bg-phosphor px-3 py-2 text-terminal">
        <h1 id="terminal-title" className="text-sm font-black uppercase tracking-wider">
          C:\AKASH\PORTFOLIO\COMMAND.COM
        </h1>
        <span className="text-xs font-black">READY</span>
      </div>

      <div className="terminal-scanlines flex flex-1 flex-col overflow-hidden p-3 text-sm uppercase leading-relaxed sm:p-4">
        <div id="terminal-output" className="flex-1 overflow-y-auto pr-2" aria-live="polite">
          {history.map((entry, entryIndex) => (
            <div key={`${entry.type}-${entryIndex}`} className="mb-3">
              {entry.text.map((line, lineIndex) => (
                <p key={`${line}-${lineIndex}`} className="whitespace-pre-wrap break-words">
                  {line || "\u00A0"}
                </p>
              ))}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form className="mt-3 flex items-center border-t border-phosphor pt-3" onSubmit={submitCommand}>
          <label className="mr-2" htmlFor="terminal-input">
            &gt;
          </label>
          <input
            ref={inputRef}
            id="terminal-input"
            className="min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 uppercase text-phosphor caret-transparent outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            autoFocus
            aria-label="Terminal command input"
          />
          <span className="ml-1 h-5 w-3 animate-pulse bg-phosphor" aria-hidden="true" />
        </form>
      </div>
    </section>
  );
}

function DesktopIcon({ children, href }) {
  const sharedClasses =
    "block border border-phosphor bg-panel p-3 text-center text-xs font-bold uppercase text-phosphor no-underline hover:bg-phosphor hover:text-terminal focus:bg-phosphor focus:text-terminal focus:outline-none";

  return href ? (
    <a className={sharedClasses} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <button className={`${sharedClasses} w-full cursor-pointer`} type="button">
      {children}
    </button>
  );
}

function FileGlyph({ folder = false }) {
  return (
    <span className="mx-auto mb-3 block h-14 w-12 whitespace-pre border-2 border-phosphor bg-terminal p-1 text-[10px] leading-3">
      {folder ? "DIR\nSYS" : "EXE\n101\nRUN"}
    </span>
  );
}

function MainOS() {
  return (
    <main className="crt-lines terminal-scanlines min-h-screen bg-terminal p-3 font-mono text-phosphor sm:p-5">
      <div className="grid min-h-[calc(100vh-1.5rem)] grid-cols-1 gap-3 border border-phosphor p-3 lg:grid-cols-[150px_minmax(0,1fr)_280px] lg:grid-rows-[auto_minmax(480px,1fr)_auto] sm:min-h-[calc(100vh-2.5rem)]">
        <header className="grid border border-phosphor text-xs font-black uppercase lg:col-span-3 lg:grid-cols-[auto_1fr_auto]">
          <a className="border-b border-phosphor bg-phosphor px-3 py-2 text-terminal no-underline lg:border-b-0 lg:border-r" href="#top">
            AKASH_OS/98
          </a>
          <nav className="flex overflow-x-auto border-b border-phosphor lg:border-b-0" aria-label="System tabs">
            {['ABOUT.DAT', 'SKILLS.SYS', 'PROJECTS.DB', 'CONTACT.TXT'].map((tab) => (
              <a
                key={tab}
                className="border-r border-phosphor px-3 py-2 text-phosphor no-underline hover:bg-phosphor hover:text-terminal focus:bg-phosphor focus:text-terminal focus:outline-none"
                href={`#${tab.split('.')[0].toLowerCase()}`}
              >
                {tab}
              </a>
            ))}
          </nav>
          <SystemClock />
        </header>

        <aside className="grid content-start gap-3 border border-phosphor p-3 lg:row-span-2" aria-label="Executable shortcuts">
          <h2 className="border-b border-phosphor pb-2 text-xs font-black uppercase">EXECUTABLES</h2>
          <DesktopIcon href={CLASSIC_PORTFOLIO_LINK}>
            <FileGlyph />
            Classic_<br />Portfolio.exe
          </DesktopIcon>
          <DesktopIcon>
            <FileGlyph folder />
            Projects<br />Folder
          </DesktopIcon>
          <DesktopIcon>
            <FileGlyph />
            Resume<br />Dump.dat
          </DesktopIcon>
        </aside>

        <Terminal />

        <aside id="about" className="border border-phosphor bg-panel" aria-labelledby="monitor-title">
          <div className="border-b border-phosphor bg-phosphor px-3 py-2 text-terminal">
            <h2 id="monitor-title" className="text-sm font-black uppercase">SYS_MONITOR</h2>
          </div>
          <table className="w-full border-collapse text-left text-xs uppercase">
            <tbody>
              <tr className="border-b border-phosphor">
                <th className="border-r border-phosphor p-3">Name</th>
                <td className="p-3">Akash Agarwal</td>
              </tr>
              <tr className="border-b border-phosphor">
                <th className="border-r border-phosphor p-3">Role</th>
                <td className="p-3">AI/ML + Full-Stack Developer</td>
              </tr>
              <tr className="border-b border-phosphor">
                <th className="border-r border-phosphor p-3">Status</th>
                <td className="p-3">ONLINE / BUILDING</td>
              </tr>
              <tr>
                <th className="border-r border-phosphor p-3">Base</th>
                <td className="p-3">KIIT</td>
              </tr>
            </tbody>
          </table>
        </aside>

        <section id="projects" className="border border-phosphor bg-panel lg:col-span-2" aria-labelledby="projects-title">
          <div className="border-b border-phosphor bg-phosphor px-3 py-2 text-terminal">
            <h2 id="projects-title" className="text-sm font-black uppercase">PROJECTS.DB // DATABASE_VIEW</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-xs uppercase">
              <thead>
                <tr className="border-b border-phosphor">
                  <th className="border-r border-phosphor p-3">ID</th>
                  <th className="border-r border-phosphor p-3">Project</th>
                  <th className="border-r border-phosphor p-3">Stack</th>
                  <th className="p-3">Output</th>
                </tr>
              </thead>
              <tbody>
                {projectRows.map((project) => (
                  <tr key={project.id} className="border-b border-phosphor last:border-b-0">
                    <td className="border-r border-phosphor p-3">{project.id}</td>
                    <td className="border-r border-phosphor p-3 font-black">{project.name}</td>
                    <td className="border-r border-phosphor p-3">{project.stack}</td>
                    <td className="p-3">{project.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const [isBooting, setIsBooting] = useState(true);

  return isBooting ? <BootScreen onComplete={() => setIsBooting(false)} /> : <MainOS />;
}
