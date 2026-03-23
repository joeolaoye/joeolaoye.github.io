import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Twitter, FileText, MapPin } from 'lucide-react';

const TITLES = [
  'Software Leader',
  'Fullstack Engineer',
  'Fintech Consultant',
  'Cloud Architect',
];

const HeroSection = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText]   = useState('');
  const [isDeleting, setIsDeleting]     = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Typing animation */
  useEffect(() => {
    const current = TITLES[titleIndex];

    if (!isDeleting && displayText === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2200);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex(i => (i + 1) % TITLES.length);
      return;
    }

    const speed = isDeleting ? 45 : 80;
    timeoutRef.current = setTimeout(() => {
      setDisplayText(prev =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      );
    }, speed);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayText, isDeleting, titleIndex]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="noise-overlay" />

      {/* Radial purple glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(262 75% 30% / 0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Accent glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom right, hsl(12 91% 59% / 0.15) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="container-max relative z-10 py-32 px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <MapPin size={13} style={{ color: 'hsl(var(--accent))' }} />
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: 'hsl(var(--foreground-muted))' }}
              >
                Lagos, Nigeria
              </span>
            </div>

            {/* Name */}
            <h1
              className="text-5xl sm:text-6xl xl:text-7xl font-bold mb-4 text-balance"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              Joseph
              <br />
              <span className="gradient-text">Olaoye</span>
            </h1>

            {/* Animated title */}
            <div className="h-10 mb-6 flex items-center justify-center lg:justify-start">
              <span
                className="text-lg sm:text-xl font-semibold typing-cursor"
                style={{ color: 'hsl(var(--foreground-muted))' }}
              >
                {displayText}
              </span>
            </div>

            {/* Tagline */}
            <p
              className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
              style={{ color: 'hsl(var(--foreground-muted))' }}
            >
              17+ years crafting scalable fintech platforms, cloud systems, and
              engineering teams across Nigeria and the UK. Currently helping
              startups and enterprises turn ambition into production-grade software.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 group"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent-warm)))',
                  color: 'hsl(var(--accent-foreground))',
                  boxShadow: '0 8px 24px hsl(12 91% 59% / 0.3)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px hsl(12 91% 59% / 0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px hsl(12 91% 59% / 0.3)';
                }}
              >
                Let&apos;s Work Together
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: 'hsl(var(--surface-2))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'hsl(var(--surface-3))';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'hsl(var(--primary-bright) / 0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'hsl(var(--surface-2))';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'hsl(var(--border))';
                }}
              >
                View Projects
              </button>

              <a
                href="/src/assets/docs/Joseph Olaoye CV.pdf"
                download="Joseph Olaoye CV.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  color: 'hsl(var(--foreground-muted))',
                  border: '1px solid hsl(var(--border) / 0.6)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground))';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'hsl(var(--border))';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground-muted))';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'hsl(var(--border) / 0.6)';
                }}
              >
                <FileText size={14} />
                Résumé
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-3 justify-center lg:justify-start">
              <a
                href="https://github.com/joeolaoye"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="GitHub"
              >
                <Github size={17} />
              </a>
              <a
                href="https://linkedin.com/in/joeolaoye"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="https://twitter.com/joeolaoye"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Twitter / X"
              >
                <Twitter size={17} />
              </a>
              <a
                href="mailto:olaoye.joseph@gmail.com"
                className="social-btn"
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* ── Right: Profile photo ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer decorative ring */}
              <div
                className="absolute -inset-4 rounded-full opacity-30 animate-float"
                style={{
                  background: 'radial-gradient(circle, hsl(262 75% 40% / 0.4), transparent 70%)',
                  filter: 'blur(12px)',
                }}
              />

              {/* Gradient conic ring */}
              <div
                className="profile-ring"
                style={{ padding: '4px' }}
              >
                <div
                  className="rounded-full overflow-hidden"
                  style={{
                    width: '220px',
                    height: '220px',
                    background: 'hsl(var(--surface-2))',
                  }}
                >
                  <img
                    src="/img/favicon.png"
                    alt="Joseph Olaoye — Software Leader"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Experience badge */}
              <div
                className="absolute -bottom-3 -left-6 glass rounded-2xl px-4 py-2 shadow-lg"
                style={{ border: '1px solid hsl(var(--border) / 0.6)' }}
              >
                <p className="text-xs text-muted-foreground font-medium">Experience</p>
                <p className="text-xl font-bold gradient-text leading-tight">17+ yrs</p>
              </div>

              {/* Status badge */}
              <div
                className="absolute -top-2 -right-4 glass rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2"
                style={{ border: '1px solid hsl(var(--border) / 0.6)' }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: 'hsl(var(--success))',
                    boxShadow: '0 0 6px hsl(152 69% 45% / 0.6)',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <p
                  className="text-xs font-semibold whitespace-nowrap"
                  style={{ color: 'hsl(152 69% 62%)' }}
                >
                  Open to Projects
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div
            className="w-px h-10"
            style={{
              background: 'linear-gradient(to bottom, hsl(var(--foreground)), transparent)',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
          <span className="text-xs tracking-widest uppercase" style={{ color: 'hsl(var(--foreground-muted))' }}>
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
