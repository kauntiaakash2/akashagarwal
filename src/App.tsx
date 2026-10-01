import { useEffect, useRef, useState } from "react";
import { ContactForm } from "./ContactForm";
import {
  AnimatedText,
  Navigation,
  ProjectCard,
  usePortfolioView,
} from "./ReferenceUI";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  X,
  Check,
  Copy,
  MapPin,
} from "lucide-react";
import {
  profile,
  footerSocials,
  projects,
  experience,
  education,
  articles,
  tools,
  stats,
  marqueeTools,
  skills,
  type ResumeEntry,
} from "./content";

const sections = [
  "Home",
  "About",
  "Projects",
  "Experience",
  "Education",
  ...(articles.length ? ["Writing"] : []),
  "Contact",
];
type Detail = { type: "article"; id: string } | null;

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`spark ${className}`}
      viewBox="0 0 50 50"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M25 0C29 14 36 21 50 25C36 29 29 36 25 50C21 36 14 29 0 25C14 21 21 14 25 0Z" />
    </svg>
  );
}
function Signature() {
  // Custom hand-drawn “Akash” lettering, matching the original monoline signature.
  return (
    <svg viewBox="0 0 164 82" fill="none" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 63C16 52 26 31 36 19C42 12 42 19 40 30L35 61M17 46C25 43 34 42 44 44" />
        <path d="M44 60C49 44 52 26 59 20C68 12 64 28 58 38L49 49C55 40 63 35 66 39C69 43 58 48 51 49C58 49 57 64 67 57" />
        <path d="M86 42C81 34 72 39 69 49C64 64 77 64 84 48L88 39C84 48 80 64 90 58L95 53" />
        <path d="M109 41C105 34 93 38 96 45C98 50 108 51 104 57C101 63 94 63 91 58M104 58C109 56 113 51 117 45" />
        <path d="M111 60C116 44 120 25 126 19C136 10 132 27 125 37L117 47C123 39 130 36 133 40C137 45 126 61 136 59C140 58 143 54 146 53" />
      </g>
      <path
        d="M146 53C150 51 153 52 157 54"
        stroke="var(--text)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SectionTitle({ id, title }: { id: string; title: string }) {
  return (
    <a
      className="section-title"
      href={`#/${id}`}
      aria-label={`View ${title.toLowerCase()}`}
    >
      <h2 id={`${id}-heading`}>{title}</h2>
      <span />
      <ArrowUpRight className="section-arrow" aria-hidden="true" />
    </a>
  );
}
function ResumeGrid({ entries }: { entries: ResumeEntry[] }) {
  return (
    <div className="resume-grid">
      {entries.map((item, index) => (
        <article
          className="resume-item"
          key={item.title}
          style={{ order: index === 1 ? 2 : index === 2 ? 1 : index }}
        >
          <h3>{item.title}</h3>
          <p className="place">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.place} ↗
              </a>
            ) : (
              item.place
            )}
          </p>
          <p className="period">{item.period}</p>
          <p className="resume-description">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
export default function App() {
  const [lime, setLime] = useState(
    document.documentElement.dataset.theme === "lime",
  );
  const [view, projectId] = usePortfolioView();
  const activeView = sections.some((section) => section.toLowerCase() === view)
    ? view
    : "home";
  const [detail, setDetail] = useState<Detail>(null);
  const [copied, setCopied] = useState(false);
  const detailRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".hero-spark, .hero-description");
    if (!elements.length) return;

    const fullyVisible = new Map<Element, boolean>();
    const updateVisibility = () => {
      elements.forEach((element) => {
        element.classList.toggle(
          "is-visible",
          fullyVisible.get(element) === true && window.scrollY > 8,
        );
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          fullyVisible.set(
            entry.target,
            entry.isIntersecting && entry.intersectionRatio >= 1,
          );
        });
        updateVisibility();
      },
      { threshold: 1, rootMargin: "0px 0px -24px 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateVisibility);
      elements.forEach((element) => element.classList.remove("is-visible"));
    };
  }, [view]);

  useEffect(() => {
    document.documentElement.dataset.theme = lime ? "lime" : "blue";
    try {
      localStorage.setItem("villo-theme", lime ? "lime" : "blue");
    } catch {
      /* Theme still works when storage is unavailable. */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", "#141414");
  }, [lime]);
  useEffect(() => {
    document.body.style.overflow = detail ? "hidden" : "";
    if (detail) {
      detailRef.current?.showModal();
      detailRef.current?.scrollTo(0, 0);
    } else detailRef.current?.close();
  }, [detail]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal, .resume-item, .project-card, .section-title")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [view, projectId]);
  const project =
    view === "projects" ? projects.find((p) => p.id === projectId) : undefined;
  useEffect(() => {
    document.title =
      activeView === "home" && !project
        ? `${profile.firstName} ${profile.lastName}`
        : `${project?.name ?? activeView[0].toUpperCase() + activeView.slice(1)} — ${profile.firstName} ${profile.lastName}`;
  }, [activeView, project]);
  const article =
    detail?.type === "article"
      ? articles.find((a) => a.id === detail.id)
      : undefined;
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="header-inner">
          <Navigation sections={sections} active={activeView} />
          <a
            href="#home"
            className="signature"
            aria-label={`${profile.firstName} ${profile.lastName} — home`}
          >
            <Signature />
          </a>
          <div className="header-actions">
            <button
              className="theme-toggle"
              role="switch"
              aria-checked={lime}
              aria-label="Lime accent"
              title={lime ? "Switch to blue accent" : "Switch to lime accent"}
              onClick={() => setLime(!lime)}
            >
              <span />
            </button>
            <a className="contact-pill" href="#contact">
              Let’s talk <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>
      <main id="main" data-view={project ? "project" : activeView}>
        {activeView !== "home" && !project && (
          <div className="page-heading" key={activeView}>
            <h1 tabIndex={-1}>
              <AnimatedText text={activeView} />
            </h1>
            <Spark />
          </div>
        )}
        <section id="home" className="hero" aria-label="Introduction">
          <p className="eyebrow hero-eyebrow">{profile.tagline}</p>
          <div className="hero-name">
            <h1>
              <AnimatedText text={profile.firstName} />
              <AnimatedText text={profile.lastName} />
            </h1>
            {profile.portrait && (
              <div className="portrait">
                <img
                  src={profile.portrait}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  width="2791"
                  height="5544"
                  fetchPriority="high"
                />
              </div>
            )}
          </div>
          <Spark className="hero-spark" />
          <p className="hero-description">{profile.introduction}</p>
          <a className="scroll-cue" href="#about">
            <ArrowDown size={19} />
            <span>Scroll</span>
          </a>
        </section>
        <div className="content-width">
          <section
            id="about"
            className="section reveal"
            aria-labelledby="about-heading"
          >
            <SectionTitle id="about" title="About" />
            <div className="about-grid">
              {activeView === "about" && (
                <div className="about-portrait">
                  <img
                    src={profile.portrait}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    width="2791"
                    height="5544"
                  />
                  <div className="about-signature">
                    <Signature />
                  </div>
                  <div className="about-socials">
                    {profile.socials.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                        <ArrowUpRight size={13} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <p className="about-statement">{profile.about}</p>
              <div className="about-details">
                <p>{profile.biography}</p>
                <div className="tool-stack">
                  {tools.map((tool) => (
                    <div className="tool-card" key={tool.name}>
                      <span className="tool-symbol">{tool.symbol}</span>
                      <div>
                        <h3>{tool.name}</h3>
                        <p>{tool.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section
            id="projects"
            className="section reveal"
            aria-labelledby="projects-heading"
          >
            <SectionTitle id="projects" title="Projects" />
            <div className="project-grid">
              {projects.map((item) => (
                <ProjectCard project={item} key={item.id} />
              ))}
            </div>
          </section>
          <section
            id="experience"
            className="section reveal"
            aria-labelledby="experience-heading"
          >
            <SectionTitle id="experience" title="Experience" />
            <ResumeGrid entries={experience} />
            <div className="stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div
          className="marquee"
          aria-label={`Tools: ${marqueeTools.join(", ")}`}
        >
          <div className="marquee-line" aria-hidden="true">
            {[0, 1].map((i) => (
              <div className="marquee-group" key={i}>
                {marqueeTools.map((tool) => (
                  <span className="marquee-tool" key={tool}>
                    {tool}
                    <Spark />
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee-line reverse" aria-hidden="true">
            {[0, 1].map((i) => (
              <div className="marquee-group" key={i}>
                {[...marqueeTools.slice(2), ...marqueeTools.slice(0, 2)].map(
                  (tool) => (
                    <span className="marquee-tool" key={tool}>
                      {tool}
                      <Spark />
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="content-width">
          <section
            id="education"
            className="section reveal"
            aria-labelledby="education-heading"
          >
            <SectionTitle id="education" title="Education" />
            <ResumeGrid entries={education} />
          </section>
          {articles.length > 0 && (
            <section
              id="writing"
              className="section reveal"
              aria-labelledby="writing-heading"
            >
              <SectionTitle id="writing" title="Writing" />
              <div className="writing-list">
                {articles.map((item) => (
                  <button
                    className="writing-row"
                    key={item.id}
                    onClick={() => setDetail({ type: "article", id: item.id })}
                  >
                    <h3>{item.title}</h3>
                    <time>{item.date}</time>
                    <span className="article-category">{item.category}</span>
                    <ArrowUpRight size={20} />
                  </button>
                ))}
              </div>
            </section>
          )}
          <div className="skills-grid reveal" aria-label="Technical skills">
            {skills.map((skill) => (
              <div key={skill.name}>
                <strong>{skill.name}</strong>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
          <section
            id="contact"
            className="section contact-section reveal"
            aria-labelledby="contact-heading"
          >
            <SectionTitle id="contact" title="Contact" />
            <div className="contact-grid">
              <div>
                <h3>
                  Have something in mind?
                  <br />
                  Let’s make it happen.
                </h3>
                <p className="contact-intro">{profile.contactIntro}</p>
                <p className="contact-line">
                  <MapPin size={16} />
                  {profile.location}
                </p>
                {profile.email && (
                  <div className="email-line">
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </div>
                )}
              </div>
              <div>
                {profile.email && (
                  <ContactForm
                    recipient={profile.email}
                    firstName={profile.firstName}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
        {project && (
          <article className="project-detail content-width" key={project.id}>
            <a className="back-link" href="#/projects">
              <ArrowLeft size={17} />
              All projects
            </a>
            {project && (
              <>
                <p className="eyebrow">
                  {project.category}
                  {project.year && ` / ${project.year}`}
                </p>
                <h1 tabIndex={-1}>
                  <AnimatedText text={project.name} />
                </h1>
                <p className="detail-intro">{project.description}</p>
                <img className="detail-image" src={project.image} alt="" />
                <div className="detail-columns">
                  <div>
                    <h3>The challenge</h3>
                    <p>{project.challenge}</p>
                  </div>
                  <div>
                    <h3>The approach</h3>
                    <p>{project.approach}</p>
                  </div>
                </div>
                {project.github && (
                  <a
                    className="detail-contact"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub repository <ArrowUpRight size={18} />
                  </a>
                )}
                {project.live && (
                  <a
                    className="detail-contact"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live site <ArrowUpRight size={18} />
                  </a>
                )}
                <a className="detail-contact" href="#contact">
                  Have a project in mind? Let’s talk <ArrowUpRight size={18} />
                </a>
                <div className="related-projects">
                  <div className="related-heading">
                    <h2>Related projects</h2>
                    <a href="#/projects">
                      View all projects <ArrowUpRight size={15} />
                    </a>
                  </div>
                  <div className="project-grid">
                    {projects
                      .filter((item) => item.id !== project.id)
                      .slice(0, 2)
                      .map((item) => (
                        <ProjectCard key={item.id} project={item} />
                      ))}
                  </div>
                </div>
              </>
            )}
          </article>
        )}
        <footer>
          <div className="social-marquee" aria-label="Connect with Akash">
            <div className="social-track">
              {[0, 1].map((copy) => (
                <div
                  className="social-group"
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {footerSocials.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      aria-label={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={copy === 1 ? -1 : undefined}
                    >
                      <span>{link.shortLabel}</span>
                      <Spark />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </footer>
      </main>
      <dialog
        ref={detailRef}
        className="detail-dialog"
        onCancel={() => setDetail(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setDetail(null);
        }}
        aria-labelledby="detail-title"
      >
        <div className="detail-content">
          <button
            className="detail-close"
            onClick={() => setDetail(null)}
            aria-label="Close detail"
          >
            <X />
          </button>
          <button className="back-link" onClick={() => setDetail(null)}>
            <ArrowLeft size={17} />
            Back to writing
          </button>
          {article && (
            <>
              <p className="eyebrow">
                {article.category} / {article.date} / 2 min read
              </p>
              <h2 id="detail-title">{article.title}</h2>
              <Spark className="article-spark" />
              <div className="article-body">
                {article.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="article-author">
                Words by {profile.firstName} {profile.lastName}
              </p>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
