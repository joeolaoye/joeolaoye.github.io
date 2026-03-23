import { useEffect, useRef } from 'react';
import {
  Zap,
  Users,
  Layers,
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  ArrowRight,
} from 'lucide-react';

/* ---- Services ---- */
const SERVICES = [
  {
    icon: <Layers size={22} />,
    title: 'Technical Strategy',
    problem: 'You have a bold product vision but no clear engineering path.',
    solution: 'Architecture planning, tech-stack selection, and phased roadmap development grounded in real-world delivery experience.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Rapid Prototyping',
    problem: 'You need to validate an idea quickly without burning months of runway.',
    solution: 'Lean proof-of-concepts and fully working MVPs — shipped fast, built to evolve.',
  },
  {
    icon: <Users size={22} />,
    title: 'Team & Engineering Leadership',
    problem: 'Your engineering team needs a senior hand to level up.',
    solution: 'Code reviews, standards uplift, structured mentoring, and fractional CTO / Tech Lead engagement.',
  },
];

/* ---- Benefits ---- */
const BENEFITS = [
  'Tailored advice — no boilerplate consulting',
  'Practical solutions with measurable impact',
  'Follow-up sessions and async support',
  'Modern engineering best practices',
  'Flexible scheduling across timezones',
  'Clear documentation after every session',
];

/* ---- Availability info ---- */
const AVAIL = [
  { icon: <Clock size={15} />, text: 'Mon – Fri  |  5 PM – 9 PM WAT' },
  { icon: <Video size={15} />, text: '30-minute video call via Google Meet' },
  { icon: <Calendar size={15} />, text: 'Free initial consultation, no commitment' },
];

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
};

const ConsultingSection = () => {
  const headerRef  = useReveal(0);
  const cardsRef   = useReveal(100);
  const bottomRef  = useReveal(200);

  return (
    <section
      id="consulting"
      className="section-padding"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div className="container-max">

        {/* Section header */}
        <div ref={headerRef} className="reveal text-center mb-16">
          <span className="section-label">Consulting</span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            Expert Guidance,
            <br />
            <span className="gradient-text">Real Results</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'hsl(var(--foreground-muted))' }}
          >
            Whether you&apos;re navigating a platform rewrite, launching a fintech MVP,
            or scaling your engineering team — I bring 17+ years of hands-on experience
            to your hardest problems.
          </p>
        </div>

        {/* Service cards (problem → solution layout) */}
        <div ref={cardsRef} className="reveal reveal-delay-2 grid md:grid-cols-3 gap-5 mb-16">
          {SERVICES.map(({ icon, title, problem, solution }) => (
            <div
              key={title}
              className="portfolio-card p-6 flex flex-col gap-4"
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(262 75% 27% / 0.25), hsl(12 91% 59% / 0.15))',
                  color: 'hsl(var(--accent))',
                  border: '1px solid hsl(var(--accent) / 0.2)',
                }}
              >
                {icon}
              </div>

              {/* Title */}
              <h3
                className="text-lg font-bold"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                {title}
              </h3>

              {/* Problem */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: 'hsl(var(--foreground-subtle))' }}
                >
                  The Challenge
                </p>
                <p className="text-sm" style={{ color: 'hsl(var(--foreground-muted))' }}>
                  {problem}
                </p>
              </div>

              {/* Divider */}
              <div className="divider" />

              {/* Solution */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: 'hsl(var(--accent))' }}
                >
                  My Approach
                </p>
                <p className="text-sm" style={{ color: 'hsl(var(--foreground-muted))' }}>
                  {solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom two-column: benefits + booking */}
        <div ref={bottomRef} className="reveal reveal-delay-3 grid lg:grid-cols-2 gap-8 items-start">

          {/* Benefits list */}
          <div>
            <h3
              className="text-xl font-bold mb-6"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              What You Get
            </h3>
            <ul className="space-y-3">
              {BENEFITS.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: 'hsl(var(--accent))' }}
                  />
                  <span
                    className="text-base"
                    style={{ color: 'hsl(var(--foreground-muted))' }}
                  >
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, hsl(262 75% 20% / 0.5), hsl(262 60% 15% / 0.3))',
              border: '1px solid hsl(262 75% 40% / 0.3)',
              boxShadow: '0 20px 40px hsl(262 75% 10% / 0.5)',
            }}
          >
            {/* Card top accent */}
            <div
              className="h-1 w-full"
              style={{
                background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
              }}
            />

            <div className="p-8">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: 'hsl(var(--accent))' }}
              >
                Free Consultation
              </p>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                Book a 30-Minute Call
              </h3>
              <p
                className="text-sm mb-7"
                style={{ color: 'hsl(var(--foreground-muted))' }}
              >
                Let&apos;s talk through your challenges and map out a practical path forward.
                No sales pitch — just a direct conversation.
              </p>

              {/* Availability details */}
              <div className="space-y-3 mb-8">
                {AVAIL.map(({ icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span style={{ color: 'hsl(var(--primary-bright))' }}>{icon}</span>
                    <span
                      className="text-sm"
                      style={{ color: 'hsl(var(--foreground-muted))' }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="https://calendly.com/joeolaoye/quick-free-consult"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 group"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent-warm)))',
                  color: 'white',
                  boxShadow: '0 8px 24px hsl(12 91% 59% / 0.35)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 14px 32px hsl(12 91% 59% / 0.45)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px hsl(12 91% 59% / 0.35)';
                }}
              >
                <Calendar size={16} />
                Schedule on Calendly
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <p
                className="text-xs text-center mt-4"
                style={{ color: 'hsl(var(--foreground-subtle))' }}
              >
                No commitment required &bull; Strictly confidential
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;
