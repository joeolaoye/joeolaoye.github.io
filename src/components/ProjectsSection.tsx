import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

/* ---- Types ---- */
interface Project {
  id: number;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  images: string[];
  tags: string[];
  githubUrl: string | null;
  liveUrl: string;
  featured: boolean;
}

/* ---- Data ---- */
const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Rova — Mobile-First Fintech Platform',
    shortTitle: 'Rova',
    tagline: 'Live in Nigeria & the UK',
    description:
      'A mobile-first fintech platform delivering savings, investments, and financial services to users across Nigeria and the United Kingdom. Built to handle regulated financial data at scale with fault-tolerant microservices.',
    images: [
      '/img/rova/0.webp',
      '/img/rova/1.webp',
      '/img/rova/2.webp',
      '/img/rova/3.webp',
      '/img/rova/4.webp',
      '/img/rova/5.webp',
    ],
    tags: ['Flutter', 'Java', 'MongoDB', 'Spring Boot', 'AWS', 'Docker', 'Kubernetes', 'MySQL'],
    githubUrl: 'https://github.com/roava',
    liveUrl: 'https://getrova.com/',
    featured: false,
  },
  {
    id: 2,
    title: 'mKobo — Neobank & Earned Wage Access',
    shortTitle: 'mKobo',
    tagline: 'Digital bank for salary earners',
    description:
      'The digital bank of choice for Nigerian salary earners. Gives employees instant access to 50% of already-earned wages before payday at zero interest — powered by a real-time payroll integration engine.',
    images: [
      '/img/mkobo/0.webp',
      '/img/mkobo/1.webp',
      '/img/mkobo/2.webp',
      '/img/mkobo/3.webp',
      '/img/mkobo/4.webp',
      '/img/mkobo/5.webp',
    ],
    tags: ['React', 'TypeScript', 'Firebase', 'Java', 'Spring Boot'],
    githubUrl: null,
    liveUrl: 'https://mkobo.bank/',
    featured: false,
  },
  {
    id: 3,
    title: 'BMONI — Financial Platform',
    shortTitle: 'BMONI',
    tagline: 'Live across 5 continents',
    description:
      'A global financial platform launched across 5 continents, built to simplify money management and deliver financial services to users worldwide.',
    images: [
      '/img/bmoni/unnamed.webp',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'AWS'],
    githubUrl: null,
    liveUrl: 'https://bmoni.com/',
    featured: true,
  },
  {
    id: 4,
    title: 'TJOC — Technology & Consulting',
    shortTitle: 'tjoc.dev',
    tagline: 'Fractional engineering leadership',
    description:
      'My consulting practice — helping ambitious startups and scaling companies navigate complex technical challenges, build high-performing engineering teams, and ship products that matter.',
    images: [
      '/img/tjoc/tjocss.png',
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    githubUrl: null,
    liveUrl: 'https://tjoc.dev/',
    featured: false,
  },
];

/* ---- Carousel ---- */
const Carousel = ({ images, title }: { images: string[]; title: string }) => {
  const [index, setIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex(i => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="relative group overflow-hidden rounded-xl bg-black/30">
      <img
        src={images[index]}
        alt={`${title} screenshot ${index + 1}`}
        className="w-full object-cover transition-opacity duration-300"
        style={{ aspectRatio: '16/9' }}
        loading="lazy"
      />

      {/* Overlays on hover */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'hsl(240 14% 6% / 0.7)', color: 'white' }}
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'hsl(240 14% 6% / 0.7)', color: 'white' }}
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setIndex(i); }}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === index ? '18px' : '6px',
                  height: '6px',
                  background: i === index ? 'hsl(var(--accent))' : 'white',
                  opacity: i === index ? 1 : 0.5,
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ---- Reveal hook ---- */
const useReveal = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
};

/* ---- Tag colors based on category ---- */
const tagColor = (tag: string): string => {
  const frontendTags = ['React', 'TypeScript', 'Flutter', 'Next.js', 'Tailwind CSS'];
  const backendTags  = ['Java', 'Spring Boot', 'Node.js', 'Express', 'GraphQL'];
  const infraTags    = ['AWS', 'Docker', 'Kubernetes'];
  const dataTags     = ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Redis'];

  if (frontendTags.includes(tag)) return 'skill-frontend';
  if (backendTags.includes(tag))  return 'skill-backend';
  if (infraTags.includes(tag))    return 'skill-infra';
  if (dataTags.includes(tag))     return 'skill-data';
  return 'tag-badge';
};

/* ---- Featured project ---- */
const FeaturedCard = ({ project }: { project: Project }) => {
  const ref = useReveal(0);

  return (
    <div ref={ref} className="reveal mb-8">
      <div
        className="portfolio-card overflow-hidden"
        style={{ border: '1px solid hsl(262 75% 40% / 0.3)' }}
      >
        {/* Header strip */}
        <div
          className="px-6 py-3 flex items-center gap-3"
          style={{
            background: 'linear-gradient(90deg, hsl(262 75% 20% / 0.7), hsl(262 60% 15% / 0.4))',
            borderBottom: '1px solid hsl(262 75% 40% / 0.2)',
          }}
        >
          <span
            className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent-warm)))',
              color: 'white',
            }}
          >
            Featured
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: 'hsl(var(--foreground-subtle))' }}
          >
            {project.tagline}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image side */}
          <div className="p-5">
            <Carousel images={project.images} title={project.shortTitle} />
          </div>

          {/* Content side */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <h3
              className="text-2xl lg:text-3xl font-bold mb-3"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {project.shortTitle}
            </h3>

            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: 'hsl(var(--foreground-muted))' }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-7">
              {project.tags.map(tag => (
                <span key={tag} className={`skill-pill ${tagColor(tag)}`}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    background: 'hsl(var(--surface-2))',
                    color: 'hsl(var(--foreground-muted))',
                    border: '1px solid hsl(var(--border))',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground))';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'hsl(var(--border))';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground-muted))';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'hsl(var(--border))';
                  }}
                >
                  <Github size={14} />
                  Source
                </a>
              )}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent-warm)))',
                  color: 'white',
                  boxShadow: '0 4px 12px hsl(12 91% 59% / 0.3)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 20px hsl(12 91% 59% / 0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px hsl(12 91% 59% / 0.3)';
                }}
              >
                <ExternalLink size={14} />
                Visit Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---- Regular project card ---- */
const ProjectCard = ({ project, delay }: { project: Project; delay: number }) => {
  const ref = useReveal(delay);

  return (
    <div ref={ref} className="reveal h-full">
      <div className="portfolio-card h-full flex flex-col overflow-hidden">
        <Carousel images={project.images} title={project.shortTitle} />

        <div className="p-6 flex flex-col flex-1">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: 'hsl(var(--accent))' }}
          >
            {project.tagline}
          </p>
          <h3
            className="text-xl font-bold mb-3"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            {project.shortTitle}
          </h3>
          <p
            className="text-sm leading-relaxed mb-5 flex-1"
            style={{ color: 'hsl(var(--foreground-muted))' }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map(tag => (
              <span key={tag} className={`skill-pill text-xs ${tagColor(tag)}`}
                style={{ padding: '0.2rem 0.6rem' }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  background: 'hsl(var(--surface-2))',
                  color: 'hsl(var(--foreground-muted))',
                  border: '1px solid hsl(var(--border))',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground))'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground-muted))'; }}
              >
                <Github size={12} /> Code
              </a>
            )}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: 'hsl(var(--surface-3))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'hsl(var(--accent) / 0.4)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--accent))';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'hsl(var(--border))';
                (e.currentTarget as HTMLAnchorElement).style.color = 'hsl(var(--foreground))';
              }}
            >
              <ExternalLink size={12} /> Live Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---- Main section ---- */
const ProjectsSection = () => {
  const featured  = PROJECTS.find(p => p.featured)!;
  const secondary = PROJECTS.filter(p => !p.featured);

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ background: 'hsl(var(--surface-1))' }}
    >
      <div className="container-max">

        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="section-label">Work</span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            Selected Projects
          </h2>
          <p
            className="mt-4 text-lg max-w-xl mx-auto"
            style={{ color: 'hsl(var(--foreground-muted))' }}
          >
            A curated selection of platforms I&apos;ve led and shipped — from regulated
            fintech to AI tooling.
          </p>
        </div>

        {/* Featured */}
        <FeaturedCard project={featured} />

        {/* Secondary grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {secondary.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 150} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
