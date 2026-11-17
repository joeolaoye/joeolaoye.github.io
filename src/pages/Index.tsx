import { ArrowUpRight, ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { fetchBlogPosts, type BlogPost } from '@/lib/blog-feed'
import blogFallback from '@/lib/blog-fallback.json'
import { CONTENT } from '@/figma/content'

const booking = `https://${CONTENT.brand.cal}`
const services = [
  { number: '01', title: 'Find the right technical direction.', description: 'For founders turning an idea into a product, or teams facing a consequential architecture decision.', deliverable: 'Product scope, architecture review, and a practical build plan.' },
  { number: '02', title: 'Build the product. Get it into use.', description: 'For teams building payment infrastructure, AI-powered tools, or a new platform from the ground up.', deliverable: 'Hands-on prototyping, engineering, and a path to launch.' },
  { number: '03', title: 'Give your team a technical partner.', description: 'For founders who need experienced engineering judgment as the product and team grow.', deliverable: 'Technical advisory, engineering direction, and hiring support.' },
]

function CallLink({ className = '' }: { className?: string }) {
  return <a className={`call-link ${className}`} href={booking} target="_blank" rel="noopener noreferrer">Book an intro call <ArrowUpRight size={18} aria-hidden="true" /></a>
}

function LatestPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(blogFallback as BlogPost[])
  const [isLatest, setIsLatest] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetchBlogPosts(controller.signal)
      .then((latest) => {
        if (!controller.signal.aborted && latest.length) {
          setPosts(latest.slice(0, 3))
          setIsLatest(true)
        }
      })
      .catch(() => { /* Keep readable, linked posts when the feed is unavailable. */ })
    return () => controller.abort()
  }, [])

  return (
    <section className="blog-section wrap" id="writing" aria-labelledby="blog-title">
      <div className="work-heading">
        <div><p className="eyebrow">04 / From the blog</p><h2 id="blog-title">{isLatest ? 'Latest posts.' : 'From my notebook.'}</h2></div>
        <a className="text-link" href="https://joeolaoye.co/blog/">Visit the blog <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
      <div className="blog-grid">
        {posts.map(post => (
          <article className="blog-post" key={post.href}>
            <p className="post-meta">{post.date}</p>
            <h3><a href={post.href}>{post.title}</a></h3>
            <p className="post-excerpt">{post.excerpt}</p>
            <a className="text-link" href={post.href} aria-label={`Read ${post.title}`}>Read post <ArrowUpRight size={16} aria-hidden="true" /></a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="personal-site">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header wrap">
        <a className="wordmark" href="#" aria-label="Joseph Olaoye home">Joseph Olaoye<span>.</span></a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav id="main-nav" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
          <a href="#services">How I help</a><a href="#projects">Selected work</a><a href="#about">About</a><a href="https://joeolaoye.co/blog/">Blog</a><CallLink />
        </nav>
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Independent product & engineering partner</p>
            <h1 id="hero-title">From complex idea<br />to a product<br /><em>that works.</em></h1>
            <p className="hero-description">I’m Joseph. I help founders and teams turn ambitious ideas into working products — with deep experience in payments, AI, and the systems underneath.</p>
            <div className="hero-actions"><CallLink /><a className="text-link" href="#projects">Explore my work <ArrowRight size={17} aria-hidden="true" /></a></div>
            <p className="cta-note">Start with a conversation about what you’re building.</p>
          </div>
          <aside className="hero-note" aria-label="My approach">
            <span className="note-label">THE WAY I WORK</span>
            <div className="path-art" aria-hidden="true"><span /><span /><span /><i /><b /></div>
            <p>Clear thinking.<br />Hands-on building.<br /><em>Less complexity.</em></p>
            <span className="note-foot">From the first decision to the next release.</span>
          </aside>
        </section>
        <div className="experience-strip wrap"><p>Experience behind the work</p><span><strong>Kora</strong><small>Former Director of Engineering / CTO</small></span><span><strong>Flutterwave</strong><small>Founding engineering team experience</small></span><span><strong>BMONI</strong><small>Information Technology Consultant</small></span></div>
        <section className="section wrap" id="services" aria-labelledby="services-title">
          <div className="section-intro"><p className="eyebrow">01 / How I help</p><h2 id="services-title">Good ideas need<br />a clear way forward.</h2><p>Bring the problem you’re working through.<br />We’ll find the right starting point together.</p></div>
          <div className="service-list">{services.map(service => <article className="service-row" key={service.number}><span className="row-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.description}</p><p className="deliverable"><span>What we work on</span>{service.deliverable}</p></div><ArrowUpRight className="service-arrow" size={23} aria-hidden="true" /></article>)}</div>
        </section>
        <section className="work-section" id="projects" aria-labelledby="work-title"><div className="wrap">
          <div className="work-heading"><div><p className="eyebrow">02 / Selected work</p><h2 id="work-title">I build, too.</h2></div><p>A selection of my own products.<br />The same hands-on approach I bring to yours.</p></div>
          <div className="work-grid">
            <article className="work-card"><div className="work-art cv-art" aria-hidden="true"><div className="cv-sheet"><span className="mock-label">A BETTER FIRST IMPRESSION</span><strong>Your experience.<br /><em>Clearly told.</em></strong><div className="cv-lines"><i /><i /><i /></div><span className="mock-footer">WiseCV ↗</span></div><span className="art-caption">AI × CAREERS</span></div><div className="work-details"><span className="eyebrow">Product / AI</span><h3>WiseCV</h3><p>Tailoring a CV to a job shouldn’t mean starting over. WiseCV uses AI to help candidates connect their experience to the role.</p><a className="text-link" href="https://www.wisecv.co" target="_blank" rel="noopener noreferrer">Explore WiseCV <ArrowUpRight size={17} aria-hidden="true" /></a></div></article>
            <article className="work-card"><div className="work-art jobs-art" aria-hidden="true"><span className="mock-label">LESS NOISE. BETTER SIGNAL.</span><div className="signal-art"><span /><span /><span /><span /><span /><span /><span /></div><strong>Beyond<br />the résumé.</strong><span className="art-caption">HIRING × ENGINEERING</span></div><div className="work-details"><span className="eyebrow">Product / Hiring</span><h3>jobs.tjoc.dev</h3><p>A hiring platform built around practical engineering assessments, helping teams look beyond a CV to what someone can do.</p><a className="text-link" href="https://jobs.tjoc.dev" target="_blank" rel="noopener noreferrer">Explore the platform <ArrowUpRight size={17} aria-hidden="true" /></a></div></article>
          </div>
        </div></section>
        <section className="section about-section wrap" id="about" aria-labelledby="about-title"><div><p className="eyebrow">03 / The person behind the work</p><h2 id="about-title">A builder’s mindset.<br />A leader’s perspective.</h2><a className="text-link" href="https://linkedin.com/in/joeolaoye" target="_blank" rel="noopener noreferrer">More about my background <ArrowUpRight size={17} aria-hidden="true" /></a></div><div className="about-copy"><p>I’m Joseph Olaoye, a product architect and engineering leader. I’ve built and led teams working on payments infrastructure, AI products, and new platforms.</p><p>Previously, I was Director of Engineering / CTO at Kora and a founding engineer on the teams that became Flutterwave and Korapay. Today, I build independently through tjoc.dev and work with founders on the decisions and systems that move their products forward.</p><p className="personal-line">I like turning difficult problems into things people can actually use.</p><a className="writing-link" href="https://joeolaoye.co/blog/">Notes on building, technology, and the work in between <ArrowUpRight size={19} aria-hidden="true" /><span>Read my writing</span></a></div></section>
        <LatestPosts />
        <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="wrap contact-inner"><div><p className="eyebrow">Your next move</p><h2 id="contact-title">What are you<br /><em>working on?</em></h2><p>Tell me where you want to go and what’s getting in the way.<br />We’ll talk through whether I’m the right person to help.</p></div><div className="contact-actions"><CallLink /><p>Prefer to write first?</p><a href={`mailto:${CONTENT.brand.email}`}>{CONTENT.brand.email} <ArrowUpRight size={16} aria-hidden="true" /></a></div></div></section>
      </main>
      <footer className="site-footer wrap"><a className="wordmark" href="#">Joseph Olaoye<span>.</span></a><p>© {new Date().getFullYear()} Joseph Olaoye</p><div><a href="https://linkedin.com/in/joeolaoye" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com/joeolaoye" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://joeolaoye.co/blog/">Blog</a></div></footer>
    </div>
  )
}
