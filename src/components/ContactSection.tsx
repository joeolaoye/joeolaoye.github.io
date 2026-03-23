import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/* ---- Reveal hook ---- */
const useReveal = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => el.classList.add('visible'), delay);
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
};

const ContactSection = () => {
  const [form, setForm]           = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setSubmit] = useState(false);
  const { toast }                 = useToast();

  const formRef    = useReveal(0);
  const sidebarRef = useReveal(150);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const res = await fetch('https://formspree.io/f/xblkawyl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast({ title: 'Message sent!', description: "I'll get back to you shortly." });
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error('Send failed');
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Please try again or email me directly.',
        variant: 'destructive',
      });
    } finally {
      setSubmit(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={16} />,
      label: 'Email',
      value: 'olaoye.joseph@gmail.com',
      href: 'mailto:olaoye.joseph@gmail.com',
    },
    {
      icon: <Phone size={16} />,
      label: 'Phone',
      value: '+234 806 702 8442',
      href: 'tel:+2348067028442',
    },
    {
      icon: <MapPin size={16} />,
      label: 'Location',
      value: 'Lagos, Nigeria',
      href: null,
    },
  ];

  const socials = [
    { icon: <Github size={17} />,   href: 'https://github.com/joeolaoye',        label: 'GitHub'   },
    { icon: <Linkedin size={17} />, href: 'https://linkedin.com/in/joeolaoye',   label: 'LinkedIn' },
    { icon: <Twitter size={17} />,  href: 'https://twitter.com/joeolaoye',       label: 'Twitter'  },
  ];

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: 'hsl(var(--surface-1))' }}
    >
      <div className="container-max">

        {/* Section header */}
        <div className="text-center mb-14">
          <span className="section-label">Contact</span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            Get in Touch
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'hsl(var(--foreground-muted))' }}
          >
            Have a project in mind or want to explore working together?
            I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Form (3/5) ── */}
          <div ref={formRef} className="reveal lg:col-span-3">
            <div className="portfolio-card p-8">
              <h3
                className="text-xl font-bold mb-7"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot */}
                <input
                  type="text"
                  name="bot-field"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'hsl(var(--foreground-muted))' }}
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full rounded-xl border-0 ring-1"
                      style={{
                        background: 'hsl(var(--surface-2))',
                        ringColor: 'hsl(var(--border))',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'hsl(var(--foreground-muted))' }}
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border-0 ring-1"
                      style={{ background: 'hsl(var(--surface-2))' }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'hsl(var(--foreground-muted))' }}
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and goals..."
                    rows={6}
                    className="w-full rounded-xl resize-none border-0 ring-1"
                    style={{ background: 'hsl(var(--surface-2))' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-mid)))',
                    color: 'white',
                    boxShadow: '0 6px 20px hsl(262 75% 27% / 0.4)',
                  }}
                  onMouseEnter={e => {
                    if (!isSubmitting) {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 28px hsl(262 75% 27% / 0.5)';
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px hsl(262 75% 27% / 0.4)';
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ── Sidebar (2/5) ── */}
          <div ref={sidebarRef} className="reveal reveal-delay-2 lg:col-span-2 space-y-5">

            {/* Contact info card */}
            <div className="portfolio-card p-6 space-y-5">
              <h3
                className="text-base font-semibold"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                Contact Details
              </h3>

              {contactInfo.map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: 'hsl(var(--accent) / 0.12)',
                      color: 'hsl(var(--accent))',
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p
                      className="text-xs font-medium uppercase tracking-wider mb-0.5"
                      style={{ color: 'hsl(var(--foreground-subtle))' }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium transition-colors duration-150"
                        style={{ color: 'hsl(var(--foreground-muted))' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--accent))'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground-muted))'; }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: 'hsl(var(--foreground-muted))' }}>
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Response time card */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, hsl(262 75% 18% / 0.5), hsl(248 60% 14% / 0.3))',
                border: '1px solid hsl(262 75% 35% / 0.25)',
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: 'hsl(var(--primary-bright))' }}
              >
                Response Time
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'hsl(var(--foreground-muted))' }}
              >
                I typically respond within 24 hours. For urgent matters, reach
                out by phone or{' '}
                <a
                  href="https://calendly.com/joeolaoye/quick-free-consult"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'hsl(var(--accent))' }}
                >
                  book a call directly
                </a>.
              </p>
            </div>

            {/* Social links */}
            <div className="portfolio-card p-5">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'hsl(var(--foreground-subtle))' }}
              >
                Find Me On
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="social-btn"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
