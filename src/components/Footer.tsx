import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

const SOCIALS = [
  { icon: <Github size={16} />,   href: 'https://github.com/joeolaoye',       label: 'GitHub'   },
  { icon: <Linkedin size={16} />, href: 'https://linkedin.com/in/joeolaoye',  label: 'LinkedIn' },
  { icon: <Twitter size={16} />,  href: 'https://twitter.com/joeolaoye',      label: 'Twitter'  },
  { icon: <Mail size={16} />,     href: 'mailto:olaoye.joseph@gmail.com',     label: 'Email'    },
];

const NAV_LINKS = [
  { label: 'About',      id: 'about'      },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Consulting', id: 'consulting' },
  { label: 'Contact',    id: 'contact'    },
];

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      style={{
        background: 'hsl(var(--surface-1))',
        borderTop: '1px solid hsl(var(--border) / 0.5)',
      }}
    >
      <div className="container-max px-5 md:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <p
              className="text-lg font-bold mb-1"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              Joseph Olaoye
            </p>
            <p
              className="text-sm"
              style={{ color: 'hsl(var(--foreground-subtle))' }}
            >
              Software Leader &middot; Fintech Consultant
              <br />
              Lagos, Nigeria
            </p>
          </div>

          {/* Quick nav */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'hsl(var(--foreground-subtle))' }}
            >
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'hsl(var(--foreground-muted))' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'hsl(var(--foreground))'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'hsl(var(--foreground-muted))'; }}
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://joeolaoye.co/blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors duration-150"
                  style={{ color: 'hsl(var(--foreground-muted))' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground))'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground-muted))'; }}
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'hsl(var(--foreground-subtle))' }}
            >
              Connect
            </p>
            <div className="flex gap-2 flex-wrap">
              {SOCIALS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-btn"
                  style={{ width: '38px', height: '38px' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid hsl(var(--border) / 0.4)' }}
        >
          <p
            className="text-xs text-center sm:text-left"
            style={{ color: 'hsl(var(--foreground-subtle))' }}
          >
            &copy; {year} Joseph Olaoye. All rights reserved.
          </p>

          <button
            onClick={scrollTop}
            className="inline-flex items-center gap-2 text-xs font-medium transition-all duration-150 group"
            style={{ color: 'hsl(var(--foreground-subtle))' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'hsl(var(--foreground))'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'hsl(var(--foreground-subtle))'; }}
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp
              size={13}
              className="group-hover:-translate-y-1 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
