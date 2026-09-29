import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowUp, X, Check, Copy, Mail, MapPin } from 'lucide-react'
import { profile, projects, experience, education, articles, tools, stats, marqueeTools, skills, type ResumeEntry } from './content'

const sections = ['Home', 'About', 'Projects', 'Experience', 'Education', ...(articles.length ? ['Writing'] : []), 'Contact']
type Detail = { type: 'project' | 'article'; id: string } | null

function Spark({ className = '' }: { className?: string }) {
  return <svg className={`spark ${className}`} viewBox="0 0 50 50" fill="currentColor" aria-hidden="true"><path d="M25 0C29 14 36 21 50 25C36 29 29 36 25 50C21 36 14 29 0 25C14 21 21 14 25 0Z" /></svg>
}
function Signature() {
  // Custom hand-drawn “Akash” lettering, matching the original monoline signature.
  return <svg viewBox="0 0 164 82" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 63C16 52 26 31 36 19C42 12 42 19 40 30L35 61M17 46C25 43 34 42 44 44" />
      <path d="M44 60C49 44 52 26 59 20C68 12 64 28 58 38L49 49C55 40 63 35 66 39C69 43 58 48 51 49C58 49 57 64 67 57" />
      <path d="M86 42C81 34 72 39 69 49C64 64 77 64 84 48L88 39C84 48 80 64 90 58L95 53" />
      <path d="M109 41C105 34 93 38 96 45C98 50 108 51 104 57C101 63 94 63 91 58M104 58C109 56 113 51 117 45" />
      <path d="M111 60C116 44 120 25 126 19C136 10 132 27 125 37L117 47C123 39 130 36 133 40C137 45 126 61 136 59C140 58 143 54 146 53" />
    </g>
    <path d="M146 53C150 51 153 52 157 54" stroke="var(--text)" strokeWidth="3.4" strokeLinecap="round" />
  </svg>
}

function SectionTitle({ id, title }: { id: string; title: string }) {
  return <div className="section-title"><h2 id={`${id}-heading`}>{title}</h2><span /><span className="line-end" /></div>
}
function ResumeGrid({ entries }: { entries: ResumeEntry[] }) {
  return <div className="resume-grid">{entries.map((item, index) => <article className="resume-item" key={item.title} style={{ order: index === 1 ? 2 : index === 2 ? 1 : index }}><h3>{item.title}</h3><p className="place">{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.place} ↗</a> : item.place}</p><p className="period">{item.period}</p><p className="resume-description">{item.text}</p></article>)}</div>
}
export default function App() {
  const [dark, setDark] = useState(document.documentElement.dataset.theme === 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [detail, setDetail] = useState<Detail>(null)
  const [copied, setCopied] = useState(false)
  const [draft, setDraft] = useState<{ name: string; email: string; message: string } | null>(null)
  const menuRef = useRef<HTMLDialogElement>(null)
  const detailRef = useRef<HTMLDialogElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    try { localStorage.setItem('villo-theme', dark ? 'dark' : 'light') } catch { /* Theme still works when storage is unavailable. */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#141414' : '#f0f0f0')
  }, [dark])
  useEffect(() => {
    if (menuOpen) menuRef.current?.showModal()
    else menuRef.current?.close()
    document.body.style.overflow = menuOpen || detail ? 'hidden' : ''
  }, [menuOpen, detail])
  useEffect(() => {
    if (detail) { detailRef.current?.showModal(); detailRef.current?.scrollTo(0, 0) }
    else detailRef.current?.close()
  }, [detail])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  const navigate = () => { setMenuOpen(false); menuButton.current?.focus() }
  const project = detail?.type === 'project' ? projects.find(p => p.id === detail.id) : undefined
  const article = detail?.type === 'article' ? articles.find(a => a.id === detail.id) : undefined
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2500) }
    catch { window.location.href = `mailto:${profile.email}` }
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header">
      <div className="header-inner">
        <button ref={menuButton} className="menu-button" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="navigation-dialog" onClick={() => setMenuOpen(true)}><span /><span /><span /></button>
        <a href="#home" className="signature" aria-label={`${profile.firstName} ${profile.lastName} — home`}><Signature /></a>
        <div className="header-actions"><button className="theme-toggle" role="switch" aria-checked={dark} aria-label="Dark mode" onClick={() => setDark(!dark)}><span /></button><a className="contact-pill" href="#contact">Let’s talk <ArrowUpRight size={14} /></a></div>
      </div>
    </header>
    <dialog ref={menuRef} id="navigation-dialog" className="navigation-dialog" onCancel={() => setMenuOpen(false)}>
      <div className="menu-top"><span className="eyebrow">A little bit of everything</span><button className="icon-button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}><X /></button></div>
      <nav aria-label="Main navigation">{sections.map((section, i) => <a href={`#${section.toLowerCase()}`} onClick={navigate} key={section}><span className="nav-number">0{i + 1}</span><span>{section}</span><ArrowUpRight /></a>)}</nav>
      <div className="menu-bottom"><span>{profile.menuBio}</span><a href={profile.email ? `mailto:${profile.email}` : profile.contactUrl}>Say hello <ArrowUpRight size={16} /></a></div>
    </dialog>
    <main id="main">
      <section id="home" className="hero" aria-label="Introduction">
        <p className="eyebrow hero-eyebrow">{profile.tagline}</p>
        <div className="hero-name"><h1><span>{profile.firstName}</span><span>{profile.lastName}</span></h1>{profile.portrait && <div className="portrait"><img src={profile.portrait} alt={`${profile.firstName} ${profile.lastName}`} width="2712" height="2712" fetchPriority="high" /></div>}</div>
        <Spark className="hero-spark" />
        <p className="hero-description">{profile.introduction}</p>
        <a className="scroll-cue" href="#about"><ArrowDown size={19} /><span>Scroll</span></a>
      </section>
      <div className="content-width">
        <section id="about" className="section reveal" aria-labelledby="about-heading"><SectionTitle id="about" title="About" /><div className="about-grid"><p className="about-statement">{profile.about}</p><div className="about-details"><p>{profile.biography}</p><div className="tool-stack">{tools.map(tool => <div className="tool-card" key={tool.name}><span className="tool-symbol">{tool.symbol}</span><div><h3>{tool.name}</h3><p>{tool.desc}</p></div></div>)}</div></div></div></section>
        <section id="projects" className="section reveal" aria-labelledby="projects-heading"><SectionTitle id="projects" title="Projects" /><div className="project-grid">{projects.map((item, i) => <button className="project-card" key={item.id} onClick={() => setDetail({ type: 'project', id: item.id })} aria-label={`View ${item.name} project`}><div className="project-image"><img src={item.image} alt="" loading="lazy" width="800" height="600" /><span className="project-index">0{i + 1}</span><span className="project-arrow"><ArrowUpRight size={25} /></span><div className="project-label"><span>{item.name}</span><span>{item.category}</span></div></div></button>)}</div></section>
        <section id="experience" className="section reveal" aria-labelledby="experience-heading"><SectionTitle id="experience" title="Experience" /><ResumeGrid entries={experience} /><div className="stats">{stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></section>
      </div>
      <div className="marquee" aria-label={`Tools: ${marqueeTools.join(", ")}`}><div className="marquee-line" aria-hidden="true">{[0, 1].map(i => <div className="marquee-group" key={i}>{marqueeTools.map(tool => <span className="marquee-tool" key={tool}>{tool}<Spark /></span>)}</div>)}</div><div className="marquee-line reverse" aria-hidden="true">{[0, 1].map(i => <div className="marquee-group" key={i}>{[...marqueeTools.slice(2), ...marqueeTools.slice(0, 2)].map(tool => <span className="marquee-tool" key={tool}>{tool}<Spark /></span>)}</div>)}</div></div>
      <div className="content-width">
        <section id="education" className="section reveal" aria-labelledby="education-heading"><SectionTitle id="education" title="Education" /><ResumeGrid entries={education} /></section>
        {articles.length > 0 && <section id="writing" className="section reveal" aria-labelledby="writing-heading"><SectionTitle id="writing" title="Writing" /><div className="writing-list">{articles.map(item => <button className="writing-row" key={item.id} onClick={() => setDetail({ type: 'article', id: item.id })}><h3>{item.title}</h3><time>{item.date}</time><span className="article-category">{item.category}</span><ArrowUpRight size={20} /></button>)}</div></section>}
        <div className="skills-grid reveal" aria-label="Technical skills">{skills.map(skill => <div key={skill.name}><strong>{skill.name}</strong><p>{skill.description}</p></div>)}</div>
        <section id="contact" className="section contact-section reveal" aria-labelledby="contact-heading"><SectionTitle id="contact" title="Contact" /><div className="contact-grid"><div><h3>Have something in mind?<br />Let’s make it happen.</h3><p className="contact-intro">{profile.contactIntro}</p><p className="contact-line"><MapPin size={16} />{profile.location}</p>{profile.email && <div className="email-line"><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="copy-button" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'}>{copied ? <Check size={16} /> : <Copy size={16} />}</button><span className="copy-status" aria-live="polite">{copied ? 'Copied!' : ''}</span></div>}</div><div><div aria-label="Public profiles">{profile.socials.map(link => <a className="email-line" key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={16} /></a>)}</div>{profile.email && <form onChange={() => setDraft(null)} onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); setDraft({name: String(data.get('name')).trim(), email: String(data.get('email')).trim(), message: String(data.get('message')).trim()}) }}><div className="form-top"><label><span>Your name</span><input name="name" placeholder="Jane Smith" required maxLength={100} autoComplete="name" /></label><label><span>Email address</span><input name="email" type="email" placeholder="jane@example.com" required autoComplete="email" /></label></div><label><span>Your message</span><textarea name="message" placeholder="Tell me a little about your project…" required minLength={10} maxLength={5000} rows={5} /></label><button className="send-button" type="submit">Prepare email <ArrowUpRight size={17} /></button><p className="form-note">Opens a draft in your email app. Nothing is sent automatically.</p>{draft && <div className="draft-confirmation" role="status"><Mail size={20} /><div><strong>Your message is ready, {draft.name.split(' ')[0]}.</strong><p>Continue in your email app to send it.</p><a href={`mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${draft.name}`)}&body=${encodeURIComponent(`Hi ${profile.firstName},\n\n${draft.message}\n\n${draft.name}\n${draft.email}`)}`}>Open email draft <ArrowUpRight size={14} /></a></div></div>}</form>}</div></div></section>
      </div>
      <footer><a className="footer-cta" href={profile.email ? `mailto:${profile.email}` : profile.contactUrl}><span>Let’s talk</span><Spark /><span>Let’s talk</span><Spark /></a><div className="footer-bottom content-width"><p>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</p><span>Made with intention.</span><a href="#home">Back to top <ArrowUp size={15} /></a></div></footer>
    </main>
    <dialog ref={detailRef} className="detail-dialog" onCancel={() => setDetail(null)} onClick={event => { if (event.target === event.currentTarget) setDetail(null) }} aria-labelledby="detail-title"><div className="detail-content"><button className="detail-close" onClick={() => setDetail(null)} aria-label="Close detail"><X /></button><button className="back-link" onClick={() => setDetail(null)}><ArrowLeft size={17} />Back to {project ? 'projects' : 'writing'}</button>{project && <><p className="eyebrow">{project.category}{project.year && ` / ${project.year}`}</p><h2 id="detail-title">{project.name}</h2><p className="detail-intro">{project.description}</p><img className="detail-image" src={project.image} alt="" /><div className="detail-columns"><div><h3>The challenge</h3><p>{project.challenge}</p></div><div><h3>The approach</h3><p>{project.approach}</p></div></div>{project.github && <a className="detail-contact" href={project.github} target="_blank" rel="noopener noreferrer">GitHub repository <ArrowUpRight size={18} /></a>}{project.live && <a className="detail-contact" href={project.live} target="_blank" rel="noopener noreferrer">Live site <ArrowUpRight size={18} /></a>}<a className="detail-contact" href="#contact" onClick={() => setDetail(null)}>Have a project in mind? Let’s talk <ArrowUpRight size={18} /></a></>}{article && <><p className="eyebrow">{article.category} / {article.date} / 2 min read</p><h2 id="detail-title">{article.title}</h2><Spark className="article-spark" /><div className="article-body">{article.paragraphs.map(p => <p key={p}>{p}</p>)}</div><p className="article-author">Words by {profile.firstName} {profile.lastName}</p></>}</div></dialog>
  </>
}
