import React, { useEffect, useState, useRef } from 'react';

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: 'work', href: '#experience' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
  { label: 'certs', href: '#certifications' },
];

const TEST_LINES = [
  { status: 'pass', group: 'LLM accuracy', label: 'hallucination rate below threshold', time: '12ms' },
  { status: 'pass', group: 'API integrity', label: 'all 200+ endpoints return valid schema', time: '38ms' },
  { status: 'pass', group: 'Load test', label: '5,000 concurrent users — no degradation', time: '4.2s' },
  { status: 'pass', group: 'Prompt injection', label: '200 adversarial inputs — all blocked', time: '91ms' },
  { status: 'pass', group: 'Source attribution', label: '90% accuracy confirmed', time: '7ms' },
  { status: 'fail', group: 'Regression', label: '40 discrepancies logged → patched', time: '213ms' },
];

const SKILLS = [
  { category: 'AI / LLM Testing', tools: 'Accuracy · Hallucination · Prompt Injection · Bias Detection · Intent Validation' },
  { category: 'API & Integration', tools: 'Postman · REST · Microservices · Schema Validation · Error Handling' },
  { category: 'Automation', tools: 'Cypress · Selenium · Keyword-Driven · Data-Driven · CI/CD' },
  { category: 'Performance & Security', tools: 'JMeter · OWASP ZAP · Burp Suite · Load Testing · Stress Testing' },
  { category: 'Database', tools: 'SQL · Query Optimization · Data Validation · Data Integrity' },
  { category: 'Tools & Tracking', tools: 'Jira · Git · GitHub · Docker · AWS · Grafana · Lens' },
];

const PROJECTS = [
  { name: 'Moving Place', role: 'Lead QA', desc: 'A ChatGPT extension AI that helps users find, book, and coordinate home-shifting services. Testing MCP server and LLM model integration.', tags: ['AI/LLM', 'MCP Server', 'Accuracy Testing'], link: null, ongoing: true },
  { name: 'Pairavi.ai', role: 'Lead QA', desc: 'AI-powered legal consultation platform. Designed 200+ test scenarios covering prompt injection, bias detection, and hallucination checks. Achieved 90% accuracy in source attribution.', tags: ['Domain LLM', 'Prompt Injection', 'Validation'], link: 'https://pairavi.ai', ongoing: true },
  { name: 'ACDM — TIA Flight Management', role: 'QA Engineer', desc: 'Flight management system for Nepal\'s Tribhuvan International Airport, funded by JICA. Led QA for flight plan calculation logic and real-time data integrity.', tags: ['Data Validation', 'Real-time', 'Logic Testing'], link: 'https://acdm.tiairport.com.np/auth/login' },
  { name: 'Career Service Lab', role: 'Lead QA & Assoc. PM', desc: 'Scalable LMS with 50,000+ registered users and 2,000+ active users. Oversaw E2E quality assurance, managed development coordination and client communication.', tags: ['E2E', 'LMS', '13 Roles'], link: 'https://careerservicelab.com', ongoing: true },
  { name: 'NGO Open Book', role: 'QA Engineer', desc: 'Multi-language public transparency platform for 50+ Belgian NGOs. Validated data integrity across NGO profiles, sectors, and financial data.', tags: ['Multi-language', 'Data Integrity', 'Transparency'], link: 'https://ngo-openbook.be' },
  { name: 'ENS Resource Hub', role: 'Lead QA', desc: 'Internal knowledge platform for the World Bank. Validated OCR and Elasticsearch-based document indexing and full-text search functionality.', tags: ['OCR', 'Elasticsearch', 'World Bank'], link: null, nda: true },
  { name: 'NPBMIS', role: 'Lead QA', desc: 'Nepal Government data inventory for evidence-based assessment, prioritization, and planning across ministries and development agencies.', tags: ['Gov Data', 'Security', 'Planning'], link: 'https://npbmis.npc.gov.np', ongoing: true },
];

const EXPERIENCE = [
  {
    period: '2023 — Present',
    company: 'Young Innovations',
    role: 'Quality Assurance Engineer',
    bullets: [
      'Performed LLM and AI model testing for accuracy, hallucination detection, intent validation, and response structure.',
      'Conducted comprehensive API testing to validate functionality, data integrity, and error handling of RESTful services.',
      'Developed detailed test plans covering objectives, scope, resources, and schedules for systematic coverage.',
      'Executed database testing for large data projects using SQL queries.',
      'Built and executed test cases for manual and automated testing, improving coverage across diverse scenarios.',
      'Conducted load testing with JMeter to assess system performance under varying traffic levels.',
      'Worked across diverse project domains: AI/LLM, OCR-based systems, Flight Management, CMS, CRM, and Aid Management.',
      'Trained and mentored 3 junior QA interns.',
    ],
  },
  {
    period: '3 months',
    company: 'WebX',
    role: 'Quality Assurance Engineer (Intern)',
    bullets: [
      'Performed automation testing using Selenium on CMS, CRM, and e-commerce platforms.',
      'Conducted comprehensive API testing to validate RESTful service functionality and data integrity.',
      'Developed test plans and executed manual and automated test cases.',
      'Collaborated with cross-functional teams to report and track defects through resolution.',
    ],
  },
];

const CERTIFICATIONS = [
  { name: 'Generative AI in Testing', issuer: 'Udemy' },
  { name: 'Programming with Python', issuer: 'Coursera' },
  { name: 'API Testing Using Postman', issuer: 'Test Automation University' },
  { name: 'Tools and Techniques for Performance & Load Testing', issuer: 'Test Automation University' },
  { name: 'Selenium with Python', issuer: 'Test Automation University' },
];

/* ═══════════════════════════════════════════════════
   TEST RUNNER COMPONENT
   ═══════════════════════════════════════════════════ */

function TestRunner() {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = containerRef.current?.querySelectorAll('.runner-line');
    const summary = containerRef.current?.querySelector('.runner-summary');

    if (prefersReduced) {
      lines?.forEach(l => l.classList.add('visible'));
      summary?.classList.add('visible');
      return;
    }

    lines?.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
        if (i === lines.length - 1 && summary) {
          setTimeout(() => summary.classList.add('visible'), 400);
        }
      }, 400 + i * 320);
    });
  }, []);

  return (
    <div ref={containerRef} role="img" aria-label="Animated test suite runner showing QA test results: 5 passed, 1 caught" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', maxWidth: 680 }}>
      {/* Title bar */}
      <div style={{ background: 'var(--bg-bar)', borderBottom: '1px solid var(--border)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6 }} aria-hidden="true">
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-red)' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-yellow)' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-cyan)' }}></span>
        </div>
        <span className="font-mono" style={{ fontSize: 11, color: 'var(--text-dim)' }}>test_suite — sujit_nepal_qa.spec.ts</span>
      </div>

      {/* Test lines */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {TEST_LINES.map((line, i) => (
          <div key={i} className="runner-line font-mono" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, padding: '8px 0', borderBottom: i < TEST_LINES.length - 1 ? '1px solid #111827' : 'none', fontSize: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', minWidth: 0, flex: 1 }}>
              <span style={{ color: line.status === 'pass' ? 'var(--accent-cyan)' : 'var(--accent-red)', fontWeight: 600, flexShrink: 0 }} aria-hidden="true">{line.status === 'pass' ? '✓' : '✗'}</span>
              <span style={{ color: '#C8D8E8', fontWeight: 500, flexShrink: 0 }}>{line.group}</span>
              <span style={{ color: '#5A7090' }}>›</span>
              <span style={{ color: '#5A7090', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{line.label}</span>
            </div>
            <span style={{ color: 'var(--text-ghost)', flexShrink: 0, fontSize: 11 }}>{line.time}</span>
          </div>
        ))}

        {/* Summary */}
        <div className="runner-summary font-mono" style={{ display: 'flex', gap: 24, paddingTop: 14, marginTop: 6, borderTop: '1px solid var(--border)', fontSize: 12, flexWrap: 'wrap' }}>
          <span><span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>✓ 5 passed</span></span>
          <span><span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>✗ 1 caught</span></span>
          <span style={{ color: 'var(--text-dim)' }}>Test suite: 4.6s</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION LABEL COMPONENT
   ═══════════════════════════════════════════════════ */

function SectionLabel({ id, text }) {
  return <h2 id={id} className="section-label">// {text}</h2>;
}

/* ═══════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <h2 className="sr-only">Sujit Nepal — Quality Assurance Engineer portfolio showcasing AI/LLM testing, automation, and API testing expertise.</h2>

      {/* ─── NAV ─── */}
      <nav aria-label="Main navigation" style={{ position: 'sticky', top: 0, zIndex: 100, background: scrolled ? 'rgba(10,15,30,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(8px)' : 'none', borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent', transition: 'all 0.3s ease' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 var(--space-xl)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <a href="#" className="font-mono" style={{ fontSize: 13, color: 'var(--accent-cyan)', textDecoration: 'none' }} aria-label="Go to top">sujit@qa:~$</a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="nav-desktop">
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href} className="font-mono" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>{link.label}</a>
            ))}
            <a href="mailto:sujitnepal21@gmail.com" className="font-mono" style={{ fontSize: 12, color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)', borderRadius: 'var(--radius-sm)', padding: '6px 14px', textDecoration: 'none', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,217,255,0.08)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'} aria-label="Contact Sujit Nepal via email">hire me ↗</a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 8 }} className="nav-mobile-btn">
            <i className={menuOpen ? 'ti ti-x' : 'ti ti-menu-2'} style={{ fontSize: 22 }}></i>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ padding: '12px var(--space-xl) 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', gap: 16 }} className="nav-mobile-menu">
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="font-mono" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>{link.label}</a>
            ))}
            <a href="mailto:sujitnepal21@gmail.com" onClick={() => setMenuOpen(false)} className="font-mono" style={{ fontSize: 12, color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)', borderRadius: 'var(--radius-sm)', padding: '8px 14px', textDecoration: 'none', textAlign: 'center' }}>hire me ↗</a>
          </div>
        )}
      </nav>

      {/* ─── MAIN CONTENT ─── */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '0 var(--space-xl)' }}>

        {/* ─── HERO ─── */}
        <section id="hero" aria-labelledby="hero-name" style={{ paddingTop: 'var(--space-2xl)', paddingBottom: 'var(--space-2xl)' }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ width: 24, height: 1, background: 'var(--accent-cyan)' }} aria-hidden="true"></span>
            <span className="font-mono" style={{ fontSize: 12, color: 'var(--accent-cyan)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Quality Assurance Engineer</span>
          </div>

          {/* Name */}
          <h1 id="hero-name" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 16px' }}>
            Sujit <span style={{ color: 'var(--accent-cyan)' }}>Nepal</span>
          </h1>

          {/* Title line */}
          <p className="font-mono" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: '#5A7090', margin: '0 0 24px' }}>AI · LLM · Automation · API · Performance</p>

          {/* Bio */}
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: 560, margin: '0 0 28px' }}>
            Detail-oriented QA Engineer with expertise in manual, AI/LLM, and automation testing. I ensure software quality through functional, regression, integration, API, and security testing. Experienced in Agile/Scrum environments across AI, OCR, flight management, and government data platforms.
          </p>

          {/* Pill links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 'var(--space-2xl)' }}>
            {[
              { icon: 'ti-world', label: 'Website', href: 'https://www.sujitnepal.com.np' },
              { icon: 'ti-brand-github', label: 'GitHub', href: 'https://github.com/SujitNepal1000' },
              { icon: 'ti-brand-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sujit-n-b01a35216/' },
              { icon: 'ti-mail', label: 'Email', href: 'mailto:sujitnepal21@gmail.com' },
            ].map(pill => (
              <a key={pill.label} href={pill.href} target={pill.href.startsWith('mailto') ? undefined : '_blank'} rel={pill.href.startsWith('mailto') ? undefined : 'noreferrer'} className="font-mono" aria-label={pill.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-pill)', padding: '6px 14px', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.color = 'var(--accent-cyan)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                <i className={`ti ${pill.icon}`} aria-hidden="true" style={{ fontSize: 14 }}></i>
                {pill.label}
              </a>
            ))}
          </div>

          {/* Test Runner */}
          <TestRunner />
        </section>

        {/* ─── SKILLS ─── */}
        <section id="skills" aria-labelledby="skills-label" style={{ paddingBottom: 'var(--space-2xl)' }}>
          <SectionLabel id="skills-label" text="skills" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-sm)' }}>
            {SKILLS.map((skill, i) => (
              <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#2A3D5C'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div className="font-mono" style={{ fontSize: 10, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, fontWeight: 500 }}>{skill.category}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{skill.tools}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section id="projects" aria-labelledby="projects-label" style={{ paddingBottom: 'var(--space-2xl)' }}>
          <SectionLabel id="projects-label" text="projects" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
            {PROJECTS.map((project, i) => (
              <article key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: 10, transition: 'border-color 0.2s, transform 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>{project.name}</h3>
                  <span className="font-mono" style={{ fontSize: 10, color: 'var(--accent-cyan)', background: 'rgba(0,217,255,0.08)', border: '1px solid rgba(0,217,255,0.2)', borderRadius: 'var(--radius-pill)', padding: '3px 8px', whiteSpace: 'nowrap' }}>{project.role}</span>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0, flex: 1 }}>{project.desc}</p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }} aria-label={`Technologies: ${project.tags.join(', ')}`}>
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono" style={{ fontSize: 10, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '2px 8px', color: 'var(--text-dim)' }}>{tag}</span>
                  ))}
                </div>

                {/* Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono"
                    aria-label={`Visit ${project.name} live site`}
                    style={{
                      marginTop: 'auto',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--accent-cyan)',
                      textDecoration: 'none',
                      border: '1px solid rgba(0,217,255,0.3)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '5px 12px',
                      background: 'rgba(0,217,255,0.05)',
                      transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
                      alignSelf: 'flex-start',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(0,217,255,0.12)';
                      e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(0,217,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(0,217,255,0.3)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <i className="ti ti-external-link" aria-hidden="true" style={{ fontSize: 12 }}></i>
                    Visit Site
                    <span style={{ marginLeft: 2 }}>→</span>
                  </a>
                )}
                {project.nda && (
                  <span
                    className="font-mono"
                    style={{
                      marginTop: 'auto',
                      alignSelf: 'flex-start',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 11,
                      color: 'var(--text-dim)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '5px 12px',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <i className="ti ti-lock" aria-hidden="true" style={{ fontSize: 12 }}></i>
                    NDA — URL Restricted
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ─── EXPERIENCE ─── */}
        <section id="experience" aria-labelledby="experience-label" style={{ paddingBottom: 'var(--space-2xl)' }}>
          <SectionLabel id="experience-label" text="experience" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {EXPERIENCE.map((job, i) => (
              <article key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 'var(--space-xl)', paddingBottom: 'var(--space-xl)', borderBottom: i < EXPERIENCE.length - 1 ? '1px solid var(--border)' : 'none' }} className="experience-item">
                <div className="font-mono" style={{ fontSize: 12, color: 'var(--text-dim)', paddingTop: 3 }}>{job.period}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>{job.company}</h3>
                  <div className="font-mono" style={{ fontSize: 12, color: 'var(--accent-cyan)', marginBottom: 16 }}>{job.role}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {job.bullets.map((bullet, bi) => (
                      <li key={bi} style={{ position: 'relative', paddingLeft: 18, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        <span style={{ position: 'absolute', left: 0, top: 2, fontSize: 10, color: 'var(--border)' }} aria-hidden="true">▸</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── CERTIFICATIONS ─── */}
        <section id="certifications" aria-labelledby="certs-label" style={{ paddingBottom: 'var(--space-2xl)' }}>
          <SectionLabel id="certs-label" text="certifications" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <i className="ti ti-certificate" aria-hidden="true" style={{ fontSize: 16, color: 'var(--accent-cyan)', flexShrink: 0 }}></i>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', flex: 1 }}>{cert.name}</span>
                <span className="font-mono" style={{ fontSize: 11, color: 'var(--text-dim)', flexShrink: 0, textAlign: 'right' }}>{cert.issuer}</span>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: '1px solid var(--border)', maxWidth: 900, margin: '0 auto', padding: 'var(--space-xl)' }}>
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--text-ghost)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            <span>Sujit Nepal</span>
            <span>Kirtipur, Kathmandu</span>
            <a href="mailto:sujitnepal21@gmail.com" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>sujitnepal21@gmail.com</a>
            <a href="tel:+9779813882720" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>+977-9813882720</a>
          </div>
          <span>BSc CSIT · Trinity Intl. College · 2019–2024</span>
        </div>
      </footer>

      {/* ─── RESPONSIVE STYLES ─── */}
      <style>{`
        .nav-mobile-btn { display: none !important; }
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .experience-item {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}