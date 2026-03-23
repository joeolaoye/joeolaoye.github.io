import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'home',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'projects',   label: 'Projects' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'contact',    label: 'Contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen]           = useState(false);
  const [activeSection, setActive]    = useState('home');
  const [scrolled, setScrolled]       = useState(false);

  /* Track scroll position for nav background opacity */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const position = window.scrollY + 120;
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && position >= el.offsetTop && position < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* ── Desktop / Sticky nav bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-strong shadow-lg'
            : 'bg-transparent'
        }`}
        style={{
          borderBottom: scrolled ? '1px solid hsl(var(--border) / 0.5)' : 'none',
        }}
      >
        <div className="container-max px-5 md:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => scrollTo('home')}
              className="flex items-center gap-2 group focus-visible:outline-none"
              aria-label="Back to top"
            >
              <span
                className="text-lg font-bold tracking-tight"
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--foreground)), hsl(var(--foreground-muted)))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Joseph<span style={{ WebkitTextFillColor: 'hsl(var(--accent))' }}> Olaoye</span>
              </span>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    activeSection === id
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {activeSection === id && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'hsl(var(--surface-2))' }}
                    />
                  )}
                  <span className="relative">{label}</span>
                  {activeSection === id && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: 'hsl(var(--accent))' }}
                    />
                  )}
                </button>
              ))}

              <a
                href="https://joeolaoye.co/blog/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-mid)))',
                  color: 'hsl(var(--primary-foreground))',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                }}
              >
                Blog
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden social-btn"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen drawer ── */}
      <div
        className={`mobile-drawer ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <span
            className="text-xl font-bold"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--foreground)), hsl(var(--foreground-muted)))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Joseph<span style={{ WebkitTextFillColor: 'hsl(var(--accent))' }}> Olaoye</span>
          </span>
          <button
            className="social-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map(({ id, label }, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-left px-5 py-4 rounded-xl text-xl font-semibold transition-all duration-200 ${
                activeSection === id
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
              style={
                activeSection === id
                  ? {
                      background: 'hsl(var(--surface-2))',
                      borderLeft: '3px solid hsl(var(--accent))',
                    }
                  : {}
              }
            >
              <span className="text-xs text-muted-foreground font-normal mr-3">
                {String(i + 1).padStart(2, '0')}
              </span>
              {label}
            </button>
          ))}
        </nav>

        {/* Footer of drawer */}
        <div
          className="mt-auto pt-6"
          style={{ borderTop: '1px solid hsl(var(--border))' }}
        >
          <p className="text-sm text-muted-foreground">
            Based in Lagos, Nigeria
          </p>
          <a
            href="mailto:olaoye.joseph@gmail.com"
            className="text-sm font-medium mt-1 block"
            style={{ color: 'hsl(var(--accent))' }}
          >
            olaoye.joseph@gmail.com
          </a>
        </div>
      </div>

      {/* Backdrop for drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navigation;
