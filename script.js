// Mechanical boot transcript printed into the terminal window.
const bootLines = [
  "AKASH_OS/98 [VERSION 0.9.8-BRUTAL]",
  "COPYRIGHT (C) 2026 AKASH AGARWAL. ALL RIGHTS RESERVED.",
  "",
  "POST: CHECKING INTERFACE MEMORY .......... 64KB OK",
  "POST: LOADING MONOSPACE VIDEO DRIVER ..... OK",
  "POST: MOUNTING /portfolio ................ OK",
  "POST: REJECTING GLASSMORPHISM ............ OK",
  "",
  "SYSTEM SPECS:",
  "  NAME      : Akash Agarwal",
  "  ROLE      : Full-Stack Developer // AI/ML Enthusiast // Competitive Programmer",
  "  LOCATION  : India",
  "  STATUS    : Open to Software Engineering, AI/ML, and Full-Stack internships",
  "  SIGNAL    : build what matters; ship what works",
  "",
  "> cat ABOUT.DAT",
  "  Computer Science student with 8.71 CGPA and ML internship experience.",
  "  I build end-to-end applications across ML pipelines, backend services,",
  "  full-stack products, and cloud-facing infrastructure.",
  "",
  "> cat SKILLS.SYS",
  "  LANG  = [Python, C++, Java, JavaScript, C, SQL]",
  "  WEB   = [React, Node.js, Express, Next.js, Spring, FastAPI]",
  "  ML    = [TensorFlow, PyTorch, NLP, data analysis, model deployment]",
  "  OPS   = [Docker, Git, GitHub, AWS, CI/CD fundamentals]",
  "  CORE  = [DSA, system design, debugging, testing, product thinking]",
  "",
  "> query PROJECTS.DB --view=dense",
  "  001 CodeFlowViz                 React / Visualization / JavaScript",
  "  002 FinVerify AI                Python / AI-ML / NLP",
  "  003 SmartClassroom Timetable    Scheduling / Full-Stack / SIH",
  "  004 YouTube Summarizer          Python / NLP / Flask",
  "",
  "> execute link_to_classic_gui",
  "  TARGET = https://kauntiaakash2.github.io/akashagarwal/",
  "  Use the executable icon or command link below to open the original portfolio.",
  "",
  "BOOT COMPLETE. CURSOR ACTIVE."
];

const terminalOutput = document.getElementById("terminal-output");
const clock = document.getElementById("system-clock");
const projectsWindow = document.getElementById("projects");
const projectsPanel = document.getElementById("projects-panel");
const toggleProjects = document.getElementById("toggle-projects");
const openProjects = document.getElementById("open-projects");

let lineIndex = 0;
let charIndex = 0;

// Type one character at a time to keep the startup sequence deliberately machine-like.
function typeBootSequence() {
  if (!terminalOutput) return;

  if (lineIndex >= bootLines.length) {
    return;
  }

  const currentLine = bootLines[lineIndex];

  if (charIndex < currentLine.length) {
    terminalOutput.textContent += currentLine.charAt(charIndex);
    charIndex += 1;
    setTimeout(typeBootSequence, currentLine.startsWith(">") ? 14 : 7);
    return;
  }

  terminalOutput.textContent += "\n";
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
  lineIndex += 1;
  charIndex = 0;
  setTimeout(typeBootSequence, currentLine === "" ? 40 : 95);
}

// Keep the fake OS status bar alive in Indian Standard Time without external dependencies.
const indianTimeFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

function updateClock() {
  if (!clock) return;
  clock.textContent = `${indianTimeFormatter.format(new Date())} IST`;
}

// Projects folder behaves like a crude classic window: minimize and restore only.
function setProjectsMinimized(isMinimized) {
  if (!projectsWindow || !toggleProjects || !openProjects) return;
  projectsWindow.classList.toggle("is-minimized", isMinimized);
  toggleProjects.textContent = isMinimized ? "RESTORE" : "MINIMIZE";
  openProjects.setAttribute("aria-expanded", String(!isMinimized));

  if (!isMinimized) {
    projectsWindow.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeBootSequence();
  updateClock();
  setInterval(updateClock, 1000);

  toggleProjects?.addEventListener("click", () => {
    setProjectsMinimized(!projectsWindow.classList.contains("is-minimized"));
  });

  openProjects?.addEventListener("click", () => {
    setProjectsMinimized(false);
    projectsPanel?.focus?.();
  });
});
