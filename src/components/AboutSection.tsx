import { useEffect, useRef } from 'react';
import { Download, Linkedin, Briefcase, Code2, Server, Database } from 'lucide-react';

/* ---- Skill categories ---- */
const SKILLS = {
  frontend: {
    label: 'Frontend',
    icon: <Code2 size={13} />,
    cssClass: 'skill-frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  backend: {
    label: 'Backend',
    icon: <Server size={13} />,
    cssClass: 'skill-backend',
    items: ['Node.js', 'Java', 'Spring Boot', 'GraphQL'],
  },
  infra: {
    label: 'Infrastructure',
    icon: <Briefcase size={13} />,
    cssClass: 'skill-infra',
    items: ['AWS', 'Docker', 'Kubernetes', 'Redis'],
  },
  data: {
    label: 'Data',
    icon: <Database size={13} />,
    cssClass: 'skill-data',
    items: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
};

/* ---- Timeline ---- */
const TIMELINE = [
  { role: 'Fintech Consultant & Independent Advisor',       company: 'Independent'   },
  { role: 'Senior Software Engineering Lead',                company: 'Rova / Roava'  },
  { role: 'Lead Engineer',                                   company: 'mKobo'         },
  { role: 'Fullstack Engineer → Tech Lead',                  company: 'Various'       },
];

/* ---- Intersection observer hook ---- */
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const AboutSection = () => {
  const leftRef   = useReveal();
  const rightRef  = useReveal();
  const timeRef   = useReveal();

  const downloadCV = () => {
    const a = document.createElement('a');
    a.href = '/src/assets/docs/Joseph Olaoye CV.pdf';
    a.download = 'Joseph Olaoye CV.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section
      id="about"
      className="section-padding"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div className="container-max">

        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="section-label">About</span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            Who I Am
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">

          {/* ── Left: Narrative ── */}
          <div ref={leftRef} className="reveal space-y-6">
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'hsl(var(--foreground-muted))' }}
            >
              I&apos;m a software leader and fullstack engineer with over{' '}
              <strong style={{ color: 'hsl(var(--foreground))' }}>17 years</strong> of experience
              building systems that move money, serve millions, and survive production.
              My work sits at the intersection of product thinking and engineering excellence.
            </p>

            <p
              className="text-lg leading-relaxed"
              style={{ color: 'hsl(var(--foreground-muted))' }}
            >
              I&apos;ve led teams and shipped platforms across Nigeria and the UK — from mobile-first
              neobanks and earned wage access products to AI-powered developer tools. I thrive in
              environments that demand both strategic clarity and hands-on craftsmanship.
            </p>

            <p
              className="text-lg leading-relaxed"
              style={{ color: 'hsl(var(--foreground-muted))' }}
            >
              Today I offer consulting and fractional engineering leadership to ambitious startups
              and scaling companies. When I&apos;m not deep in architecture reviews, I&apos;m mentoring
              engineers and exploring what&apos;s next in AI-assisted development.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={downloadCV}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-mid)))',
                  color: 'hsl(var(--primary-foreground))',
                  boxShadow: '0 4px 16px hsl(262 75% 27% / 0.4)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px hsl(262 75% 27% / 0.5)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px hsl(262 75% 27% / 0.4)';
                }}
              >
                <Download size={15} />
                Download Résumé
              </button>

              <a
                href="https://www.linkedin.com/in/joeolaoye/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: 'hsl(var(--surface-2))',
                  color: 'hsl(var(--foreground-muted))',
                  border: '1px solid hsl(var(--border))',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground))';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'hsl(var(--primary-bright) / 0.35)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground-muted))';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'hsl(var(--border))';
                }}
              >
                <Linkedin size={15} />
                View LinkedIn
              </a>
            </div>
          </div>

          {/* ── Right: Skills grid ── */}
          <div ref={rightRef} className="reveal reveal-delay-2 space-y-5">
            <h3
              className="text-xl font-bold mb-6"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              Skills &amp; Technologies
            </h3>

            {Object.values(SKILLS).map(({ label, icon, cssClass, items }) => (
              <div key={label}>
                <div
                  className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: 'hsl(var(--foreground-subtle))' }}
                >
                  {icon}
                  {label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span key={skill} className={`skill-pill ${cssClass}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div ref={timeRef} className="reveal reveal-delay-3">
          <div className="divider mb-10" />

          <h3
            className="text-lg font-semibold mb-8 text-center"
            style={{ color: 'hsl(var(--foreground-subtle))' }}
          >
            Career Highlights
          </h3>

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Connector line (desktop) */}
            <div
              className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--border)), transparent)' }}
            />

            {TIMELINE.map(({ role, company }, i) => (
              <div
                key={i}
                className="portfolio-card p-5 relative text-center"
              >
                {/* Dot on connector */}
                <div
                  className="hidden lg:flex absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 items-center justify-center"
                  style={{
                    background: 'hsl(var(--surface-1))',
                    borderColor: i === 0 ? 'hsl(var(--accent))' : 'hsl(var(--border))',
                  }}
                >
                  {i === 0 && (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: 'hsl(var(--accent))' }}
                    />
                  )}
                </div>

                <p
                  className="text-sm font-semibold leading-snug mb-1"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  {role}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'hsl(var(--foreground-subtle))' }}
                >
                  {company}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
