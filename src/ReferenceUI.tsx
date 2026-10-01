import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ArrowUpRight, X } from "lucide-react";
import { type Project } from "./content";

export function AnimatedText({ text }: { text: string }) {
  let letterIndex = 0;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="animated-text">
        {text.split(" ").map((word, wordIndex) => (
          <span className="animated-word" key={wordIndex}>
            {wordIndex > 0 && <span className="word-space"> </span>}
            {Array.from(word).map((letter, index) => (
              <span
                className="animated-letter"
                key={index}
                style={
                  { "--letter": Math.min(letterIndex++, 12) } as CSSProperties
                }
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </span>
    </>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className="project-card"
      href={`#/projects/${project.id}`}
      aria-label={`View ${project.name} project`}
    >
      <div className="project-image">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          width="800"
          height="600"
        />
        <span className="project-label">
          <span>{project.name}</span>
          <ArrowUpRight size={16} />
        </span>
      </div>
    </a>
  );
}

export function Navigation({
  sections,
  active,
}: {
  sections: string[];
  active: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <div
      className="navigation"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={button}
        className="menu-button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X size={26} />
        ) : (
          <>
            <span />
            <span />
            <span />
          </>
        )}
      </button>
      <nav
        id="main-navigation"
        className="navigation-dropdown"
        aria-label="Main navigation"
        hidden={!open}
      >
        {sections.map((section) => {
          const id = section.toLowerCase();
          return (
            <a
              key={id}
              href={id === "home" ? "#home" : `#/${id}`}
              aria-current={active === id ? "page" : undefined}
              onClick={() => {
                setOpen(false);
                button.current?.focus();
              }}
            >
              {section}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

// Hash views preserve the original anchor URLs and work on static hosting.
export function usePortfolioView() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const restoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const change = () => setHash(window.location.hash);
    window.addEventListener("hashchange", change);
    return () => {
      history.scrollRestoration = restoration;
      window.removeEventListener("hashchange", change);
    };
  }, []);
  useLayoutEffect(() => {
    if (hash.startsWith("#/")) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document
        .querySelector<HTMLElement>(".page-heading h1, .project-detail h1")
        ?.focus({ preventScroll: true });
    } else if (hash) {
      const frame = requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
      return () => cancelAnimationFrame(frame);
    }
  }, [hash]);
  return hash.startsWith("#/") ? hash.slice(2).split("/") : ["home"];
}
