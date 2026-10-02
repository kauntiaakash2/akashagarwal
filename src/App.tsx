import { useEffect, useState } from "react";
import { Spark, Signature } from "./BrandMarks";
import { PortfolioSections } from "./PortfolioSections";
import { ProjectDetail } from "./ProjectDetail";
import { AnimatedText, Navigation } from "./ReferenceUI";
import { usePortfolioView } from "./usePortfolioView";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { profile, footerSocials, projects } from "./content";

const sections = [
  "Home",
  "About",
  "Projects",
  "Experience",
  "Education",
  "Contact",
];

export default function App() {
  const [lime, setLime] = useState(
    document.documentElement.dataset.theme === "lime",
  );
  const [view, projectId, ...extraSegments] = usePortfolioView();
  const activeView = sections.some((section) => section.toLowerCase() === view)
    ? view
    : "not-found";
  const project =
    view === "projects" ? projects.find((item) => item.id === projectId) : undefined;
  const invalidPath = location.pathname !== "/" && location.pathname !== "/index.html";
  const notFound =
    invalidPath ||
    activeView === "not-found" ||
    extraSegments.length > 0 ||
    (Boolean(projectId) && view !== "projects") ||
    (view === "projects" && Boolean(projectId) && !project);

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
  useEffect(() => {
    document.title =
      notFound
        ? `Page not found — ${profile.firstName} ${profile.lastName}`
        : activeView === "home" && !project
        ? `${profile.firstName} ${profile.lastName} — Software & AI Engineer`
        : `${project?.name ?? activeView[0].toUpperCase() + activeView.slice(1)} — ${profile.firstName} ${profile.lastName}`;
  }, [activeView, notFound, project]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="header-inner">
          <Navigation
            sections={sections}
            active={notFound ? "" : activeView}
            rootPath={invalidPath}
          />
          <a
            href={invalidPath ? "/#home" : "#home"}
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
            <a className="contact-pill" href={invalidPath ? "/#contact" : "#contact"}>
              Let’s talk <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>
      <main id="main" data-view={notFound ? "not-found" : project ? "project" : activeView}>
        {activeView !== "home" && !project && !notFound && (
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
            <h1 aria-label={`${profile.firstName} ${profile.lastName}`}>
              <AnimatedText text={profile.firstName} screenReaderText={false} />
              <AnimatedText text={profile.lastName} screenReaderText={false} />
            </h1>
            {profile.portrait && (
              <div className="portrait">
                <img
                  src={profile.portrait.src}
                  srcSet={profile.portrait.srcSet}
                  sizes="(min-width: 1600px) 220px, (max-width: 640px) 23vw, (max-width: 1000px) 162px, 176px"
                  alt={`${profile.firstName} ${profile.lastName}`}
                  width={profile.portrait.width}
                  height={profile.portrait.height}
                  loading={activeView === "home" ? "eager" : "lazy"}
                  fetchPriority={activeView === "home" ? "high" : "auto"}
                  decoding="async"
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
        <PortfolioSections activeView={activeView} />
        {notFound && (
          <article className="project-detail content-width">
            <h1 tabIndex={-1}>Page not found</h1>
            <p className="detail-intro">That page isn’t part of this portfolio.</p>
            <a className="detail-contact" href="/">
              Back to home <ArrowUpRight size={18} />
            </a>
          </article>
        )}
        {project && !notFound && <ProjectDetail key={project.id} project={project} />}
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
    </>
  );
}
