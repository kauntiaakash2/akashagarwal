import { ArrowUpRight, MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { Spark, Signature } from "./BrandMarks";
import { ProjectCard } from "./ReferenceUI";
import {
  aboutSocials,
  education,
  experience,
  marqueeTools,
  profile,
  projects,
  skills,
  stats,
  tools,
  type ResumeEntry,
} from "./content";

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

function ResumeGrid({
  entries,
  standalone = false,
}: {
  entries: ResumeEntry[];
  standalone?: boolean;
}) {
  const Heading = standalone ? "h2" : "h3";
  return (
    <div className="resume-grid">
      {entries.map((item, index) => (
        <article
          className="resume-item"
          key={item.title}
          style={{ order: index === 1 ? 2 : index === 2 ? 1 : index }}
        >
          <Heading>{item.title}</Heading>
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

function MarqueeLine({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className={`marquee-line${reverse ? " reverse" : ""}`} aria-hidden="true">
      {[0, 1].map((copy) => (
        <div className="marquee-group" key={copy}>
          {items.map((tool) => (
            <span className="marquee-tool" key={tool}>
              {tool}
              <Spark />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function PortfolioSections({ activeView }: { activeView: string }) {
  const ContentHeading = activeView === "home" ? "h3" : "h2";
  return (
    <>
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
                    src={profile.portrait.src}
                    srcSet={profile.portrait.srcSet}
                    sizes="(max-width: 640px) min(350px, calc(100vw - 62px)), (min-width: 1600px) 505px, (max-width: 1000px) 340px, 380px"
                    alt={`${profile.firstName} ${profile.lastName}`}
                    width={profile.portrait.width}
                    height={profile.portrait.height}
                    decoding="async"
                />
                <div className="about-signature">
                  <Signature />
                </div>
                <div className="about-socials">
                  {aboutSocials.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
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
                        <ContentHeading>{tool.name}</ContentHeading>
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
          <ResumeGrid entries={experience} standalone={activeView !== "home"} />
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
        <MarqueeLine items={marqueeTools} />
        <MarqueeLine
          items={[...marqueeTools.slice(2), ...marqueeTools.slice(0, 2)]}
          reverse
        />
      </div>
      <div className="content-width">
        <section
          id="education"
          className="section reveal"
          aria-labelledby="education-heading"
        >
          <SectionTitle id="education" title="Education" />
          <ResumeGrid entries={education} standalone={activeView !== "home"} />
        </section>
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
            <ContentHeading>
              Have something in mind?
              <br />
              Let’s make it happen.
            </ContentHeading>
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
    </>
  );
}
