// All landing-page sections ported from the Figma Make export.
// Source mapping:
//   - Nav, Hero, HeroOS, Ticker, About        ← script-06-d471d28d (v1)
//   - ProjMock, Projects, ChapterRow,
//     BuilderOS, Writing, Contact, Footer     ← script-07-a21252e5 (v2)
// Content is read from src/figma/content.ts (real portfolio data — see notes there).

import { useEffect, useRef, useState } from 'react'
import { CONTENT, type Project } from './content'
import { Ico } from './icons'
import { MapBackground } from './MapBackground'

// ───────── helper: scroll-reveal ─────────
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('in') },
      { threshold: 0.06 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// ───────── NAV ─────────
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="shell nav-row">
        <a href="#top" className="brand">
          <span className="brand-mark"></span>
          <span>joeolaoye<span style={{ color: 'var(--fg-3)' }}>.co</span></span>
        </a>
        <div className="nav-links">
          <a className="nav-link" href="#about">about</a>
          <a className="nav-link" href="#projects">projects</a>
          <a className="nav-link" href="#os">builder/os</a>
          <a className="nav-link" href="#writing">thoughts</a>
          <a className="nav-link" href="#contact">contact</a>
        </div>
        <a href="#contact" className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 12 }}>
          <span className="chip-dot pulse" style={{ background: 'var(--green)' }}></span>
          Available
        </a>
      </div>
    </nav>
  )
}

// ───────── HERO ─────────
export function Hero() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const ts = time.toUTCString().slice(17, 25)

  return (
    <section className="hero shell" id="top">
      <MapBackground />
      <div className="hero-status-row" style={{ position: 'relative', zIndex: 1 }}>
        {CONTENT.hero.statusChips.map((s, i) =>
          s.tone === 'live'
            ? <span key={i} className="chip live"><span className="chip-dot pulse"></span>{s.label}</span>
            : <span key={i} className="chip">{s.label}</span>,
        )}
        <span className="chip"><span className="chip-dot blue"></span>{ts} UTC</span>
      </div>

      <div className="hero-grid" style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 24 }}>{CONTENT.hero.eyebrow}</div>
          <h1 className="h-display" style={{ marginBottom: 28 }}>
            Designing the <span className="text-grad">systems</span> behind how the next billion <span style={{ color: 'var(--fg-3)' }}>buy, work, and discover online.</span>
          </h1>
          <p className="lede">{CONTENT.hero.sub}</p>

          <div className="hero-cta-row">
            <a href="#projects" className="btn btn-primary">View projects <Ico.arr /></a>
            <a href="#writing" className="btn btn-ghost">Read thoughts</a>
            <a href="#contact" className="btn btn-quiet">Contact <span className="arr">→</span></a>
          </div>

          <div className="hero-meta">
            {CONTENT.hero.stats.map((s, i) => (
              <div key={i} className="stat">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroOS />
      </div>
    </section>
  )
}

interface LogEntry { tag: string; tone: 'ok' | 'info' | 'warn'; t: string }

function HeroOS() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { tag: 'OK',   tone: 'ok',   t: 'jobs.tjoc.dev: Turnstile live on /hire/contact' },
    { tag: 'INFO', tone: 'info', t: 'wisecv: claude tailoring loop running' },
    { tag: 'AI',   tone: 'warn', t: 'wisemarket: AI ingestion 65% confidence' },
  ])

  useEffect(() => {
    const queue: LogEntry[] = [
      { tag: 'OK',   tone: 'ok',   t: 'ADR 0025 accepted (portfolio captcha)' },
      { tag: 'INFO', tone: 'info', t: '@tjoc/analytics 2.2.0 — alias() shipped' },
      { tag: 'AI',   tone: 'warn', t: 'borderless outreach drafts assist queued' },
      { tag: 'OK',   tone: 'ok',   t: 'idea logged → backlog #038' },
      { tag: 'INFO', tone: 'info', t: 'jobs.tjoc.dev: tier pricing admin live' },
    ]
    let i = 0
    const id = setInterval(() => {
      setLogs((prev) => [...prev.slice(-4), queue[i % queue.length]])
      i++
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <div className="os-panel">
        <div className="os-titlebar">
          <div className="os-dots"><span></span><span></span><span></span></div>
          <span className="os-title">builder.os — focus.session</span>
          <span className="os-title" style={{ color: 'var(--green)' }}>● recording</span>
        </div>
        <div className="os-body">
          <div className="os-line">
            <span className="os-prompt">→</span>
            <span><span className="os-tag">~/joe</span> <span className="cursor">cat focus.md</span></span>
          </div>
          <div style={{ paddingLeft: 18, marginTop: 10, marginBottom: 14 }}>
            <div><span className="os-key">infra</span> <span className="os-tag">::</span> trust + payouts for cross-border commerce</div>
            <div><span className="os-key">ai</span> <span className="os-tag">::</span> career signal, listing extraction, operator copilots</div>
            <div><span className="os-key">studio</span> <span className="os-tag">::</span> ADRs, @tjoc/* shared packages, portfolio governance</div>
          </div>

          <div className="os-line" style={{ marginTop: 6 }}>
            <span className="os-prompt">→</span>
            <span><span className="os-tag">~/joe</span> tail -f activity.log</span>
          </div>
          <div style={{ paddingLeft: 18, marginTop: 8 }}>
            {logs.map((l, i) => (
              <div key={i} style={{ opacity: 1 - (logs.length - 1 - i) * 0.12 }}>
                <span className={`os-${l.tone}`}>[{l.tag}]</span> {l.t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="float-card float" style={{ top: -22, right: -18, animationDelay: '0s' }}>
        <div style={{ color: 'var(--fg-4)', fontSize: 10, letterSpacing: '0.1em' }}>NORTH STAR</div>
        <div style={{ color: 'var(--fg)', fontSize: 14, marginTop: 4 }}>Calm systems beneath loud products</div>
      </div>
      <div className="float-card float" style={{ bottom: -28, left: -22, animationDelay: '-3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="chip-dot pulse" style={{ background: 'var(--violet)' }}></span>
          <span style={{ color: 'var(--fg)' }}>5 active experiments</span>
        </div>
      </div>
    </div>
  )
}

// ───────── TICKER ─────────
export function Ticker() {
  const items = CONTENT.ticker
  return (
    <div className="ticker">
      <div className="ticker-mask">
        <div className="marquee">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="chip-dot violet" style={{ width: 4, height: 4 }}></span>
              {t}
              <span className="ticker-sep">/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ───────── ABOUT ─────────
export function About() {
  const ref = useReveal()
  return (
    <section className="section shell" id="about">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow" style={{ marginBottom: 18 }}>01 / ABOUT</div>
          <h2 className="h-section">{CONTENT.about.title}</h2>
        </div>
      </div>

      <div ref={ref} className="reveal" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/*
            Bio prose with inline anchor links — kept here rather than in
            content.ts so Kora / Flutterwave / Korapay stay clickable without
            HTML-escaping a string field. Pulled from joeolaoye.co/blog bio
            and the portfolio brief; phrasing reviewed by operator 2026-05-18.
          */}
          <p style={{ color: 'var(--fg-2)', fontSize: 17, lineHeight: 1.65, maxWidth: '60ch' }}>
            I build and lead engineering teams that ship payments infrastructure, AI-native products, and 0→1 platforms. The work sits at the seams of trust, distribution, and AI — for emerging markets, creators, and the operators quietly rewriting how the internet runs.
          </p>
          <p style={{ color: 'var(--fg-2)', fontSize: 17, lineHeight: 1.65, maxWidth: '60ch' }}>
            I'm a product architect more than a single discipline. I prototype quickly on AWS-first stacks, ship in small loops, and fold customer signal back into the system within days. The throughline across everything I build: a calm system underneath a loud product.
          </p>
          <p style={{ color: 'var(--fg-2)', fontSize: 17, lineHeight: 1.65, maxWidth: '60ch' }}>
            Previously Director of Engineering / CTO at{' '}
            <a href="https://korahq.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg)', textDecoration: 'underline', textDecorationColor: 'var(--violet)', textUnderlineOffset: '3px' }}>Kora</a>; founding engineer on the teams that became{' '}
            <a href="https://flutterwave.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg)', textDecoration: 'underline', textDecorationColor: 'var(--violet)', textUnderlineOffset: '3px' }}>Flutterwave</a>{' '}and{' '}
            <a href="https://korapay.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg)', textDecoration: 'underline', textDecorationColor: 'var(--violet)', textUnderlineOffset: '3px' }}>Korapay</a>. Now building independently from{' '}
            <a href="https://tjoc.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg)', textDecoration: 'underline', textDecorationColor: 'var(--violet)', textUnderlineOffset: '3px' }}>tjoc.dev</a>{' '}— a small portfolio of products and infrastructure for the next billion users coming online.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <a className="btn btn-ghost" href="#contact">Work with me <Ico.arr /></a>
            <a className="btn btn-quiet" href="https://linkedin.com/in/joeolaoye" target="_blank" rel="noopener noreferrer"><Ico.ln /> LinkedIn</a>
          </div>
        </div>

        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>FOCUS AREAS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0, border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
            {CONTENT.about.pillars.map((p, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr',
                gap: 16,
                padding: '16px 18px',
                borderBottom: i < CONTENT.about.pillars.length - 1 ? '1px solid var(--line)' : 'none',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
              }}>
                <span className="mono" style={{ color: 'var(--violet)', fontSize: 11, letterSpacing: '0.1em' }}>{p.k}</span>
                <span style={{ color: 'var(--fg)', fontSize: 14 }}>{p.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ───────── Project mock ─────────
function ProjMock({ p }: { p: Project }) {
  const accents: Record<string, string> = {
    violet: 'var(--violet)',
    blue: 'var(--blue)',
    rose: 'var(--rose)',
    amber: 'var(--amber)',
    green: 'var(--green)',
  }
  const c = accents[p.tone] || 'var(--violet)'
  const headlineMetric = p.metrics[0]?.v ?? p.statusLabel.split(' · ')[0]
  const headlineKey = p.metrics[0]?.k ?? p.status.toUpperCase()
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 380, background: 'var(--bg-1)', overflow: 'hidden' }}>
      <div className="mock-stripe"></div>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 30% 30%, ${c}22, transparent 70%)` }}></div>
      <div style={{ position: 'absolute', inset: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--fg-4)' }}>{headlineKey}</div>
          <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 0.95, marginTop: 8 }}>{headlineMetric}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {p.metrics.slice(1).map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 12, paddingTop: 8, borderTop: '1px solid var(--line)' }}>
              <span style={{ color: 'var(--fg-3)' }}>{m.k}</span>
              <span style={{ color: 'var(--fg)' }}>{m.v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span className="chip-dot" style={{ background: c, boxShadow: `0 0 12px ${c}` }}></span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>{p.statusLabel}</span>
          </div>
          {p.href && (
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Ico.ext /> visit
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ───────── PROJECTS — editorial chapters ─────────
export function Projects() {
  return (
    <section className="section shell" id="projects">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow" style={{ marginBottom: 18 }}>02 / PROJECTS</div>
          <h2 className="h-section">Five chapters of the same <span className="text-grad">long thesis</span>.</h2>
        </div>
        <div className="right">
          <span className="chip"><span className="chip-dot"></span>{CONTENT.projects.length} ACTIVE</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--line)' }}>
        {CONTENT.projects.map((p, i) => <ChapterRow key={p.id} p={p} idx={i} />)}
      </div>
    </section>
  )
}

function ChapterRow({ p, idx }: { p: Project; idx: number }) {
  const ref = useReveal()
  const reverse = idx % 2 === 1
  const dotClass =
    p.status === 'live' ? '' :
    p.status === 'beta' ? 'amber' :
    p.status === 'shipped' ? 'blue' :
    'violet'
  return (
    <div ref={ref} className="reveal" style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr 1fr',
      gap: 32,
      padding: '56px 0',
      borderBottom: '1px solid var(--line)',
      alignItems: 'start',
    }}>
      <div className="mono" style={{ fontSize: 13, color: 'var(--fg-4)', letterSpacing: '0.08em', paddingTop: 6 }}>
        CH / {p.id}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, order: reverse ? 2 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span className={`chip ${p.status}`}><span className={`chip-dot ${dotClass}`}></span>{p.statusLabel}</span>
          <div className="proj-tags">{p.tags.slice(0, 3).map((t) => <span key={t} className="tag">{t}</span>)}</div>
        </div>
        <h3 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.98, margin: 0, color: 'var(--fg)' }}>
          {p.name}
        </h3>
        <p style={{ color: 'var(--fg-2)', fontSize: 18, margin: 0, lineHeight: 1.5, maxWidth: '36ch' }}>{p.tagline}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
          <div>
            <div className="mono" style={{ color: 'var(--fg-4)', fontSize: 10, letterSpacing: '0.12em', marginBottom: 6 }}>SYSTEM IT TRIES TO FIX</div>
            <div style={{ color: 'var(--fg-2)', fontSize: 14.5, lineHeight: 1.6 }}>{p.problem}</div>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--violet)', fontSize: 10, letterSpacing: '0.12em', marginBottom: 6 }}>WHY THIS WORKS</div>
            <div style={{ color: 'var(--fg)', fontSize: 14.5, lineHeight: 1.6 }}>{p.insight}</div>
          </div>
        </div>

        {p.href && (
          <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 14px' }}>
              Visit <Ico.ext />
            </a>
          </div>
        )}
      </div>

      <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)', order: reverse ? 0 : 2 }}>
        <ProjMock p={p} />
      </div>
    </div>
  )
}

// ───────── BUILDER OS ─────────
type OsTab = 'experiments' | 'backlog' | 'stack' | 'log'

export function BuilderOS() {
  const [tab, setTab] = useState<OsTab>('experiments')
  const [logs, setLogs] = useState(CONTENT.os.log.slice(0, 5))
  useEffect(() => {
    const queue = [
      { t: '08:55', m: 'jobs.tjoc.dev: ADR 0024 (sales-led) PR3 deployed' },
      { t: '09:02', m: 'wisecv: claude-haiku-4 tailoring loop p95 1.4s' },
      { t: '09:14', m: 'wisemarket: trust-recalc-worker IAM CRUD verified' },
      { t: '09:21', m: '@tjoc/analytics 2.2.0: alias() siteverified' },
    ]
    let i = 0
    const id = setInterval(() => {
      setLogs((prev) => [queue[i % queue.length], ...prev.slice(0, 6)])
      i++
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const tabs: { id: OsTab; l: string; n: string | number }[] = [
    { id: 'experiments', l: 'Experiments', n: CONTENT.os.experiments.length },
    { id: 'backlog',     l: 'Idea backlog', n: CONTENT.os.backlog.length },
    { id: 'stack',       l: 'Stack', n: CONTENT.os.stack.length },
    { id: 'log',         l: 'Activity log', n: 'live' },
  ]

  return (
    <section className="section shell" id="os">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow" style={{ marginBottom: 18 }}>03 / BUILDER · OS</div>
          <h2 className="h-section">A <span className="text-grad">control room</span> for one operator.</h2>
        </div>
      </div>

      <div className="dash-card" style={{ background: 'var(--bg-1)' }}>
        <div className="dash-card-head" style={{ padding: '12px 18px' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--bg-3)' }}></span>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--bg-3)' }}></span>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--bg-3)' }}></span>
          </div>
          <span className="title" style={{ fontFamily: 'var(--mono)' }}>builder.os — joe@lab</span>
          <span className="meta"><span className="chip-dot pulse" style={{ display: 'inline-block', width: 6, height: 6, marginRight: 6 }}></span>LIVE</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', minHeight: 460 }}>
          <div style={{ borderRight: '1px solid var(--line)', padding: '16px 8px', background: 'rgba(255,255,255,0.01)' }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.1em', padding: '0 10px 8px' }}>WORKSPACES</div>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                padding: '8px 10px', border: 'none', background: tab === t.id ? 'rgba(124,92,255,0.12)' : 'transparent',
                borderRadius: 6, color: tab === t.id ? 'var(--fg)' : 'var(--fg-2)', fontFamily: 'var(--mono)',
                fontSize: 12.5, marginBottom: 2, transition: 'all 150ms', cursor: 'pointer', textAlign: 'left',
              }}>
                <span>{t.l}</span>
                <span style={{ color: 'var(--fg-4)', fontSize: 11 }}>{t.n}</span>
              </button>
            ))}
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.1em', padding: '20px 10px 8px' }}>FILTERS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '0 10px' }}>
              <span className="chip live" style={{ fontSize: 10 }}>LIVE</span>
              <span className="chip beta" style={{ fontSize: 10 }}>BETA</span>
              <span className="chip draft" style={{ fontSize: 10 }}>DRAFT</span>
            </div>
            <div style={{ marginTop: 24, padding: 10, border: '1px solid var(--line)', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.1em' }}>VELOCITY · 14d</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--fg)', marginTop: 4 }}>+18%</div>
              <div className="spark" style={{ marginTop: 8, height: 24 }}>
                {[3, 5, 4, 6, 8, 5, 7, 10, 9, 12, 8, 11, 14, 13].map((h, i) => (
                  <div key={i} className="spark-bar" style={{ height: `${h * 6}%`, opacity: 0.4 + (i / 14) * 0.6 }}></div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: 24, fontFamily: 'var(--mono)' }}>
            {tab === 'experiments' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 12 }}>~/experiments</span>
                  <span className="mono" style={{ color: 'var(--fg-4)', fontSize: 11 }}>{CONTENT.os.experiments.length} / 12 capacity</span>
                </div>
                {CONTENT.os.experiments.map((e, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 100px 80px', gap: 14, padding: '14px 0', borderBottom: '1px dashed var(--line-soft)', alignItems: 'center' }}>
                    <span className="mono" style={{ color: 'var(--fg-4)', fontSize: 11 }}>0{i + 1}</span>
                    <div>
                      <div style={{ color: 'var(--fg)', fontSize: 14, fontFamily: 'var(--sans)', fontWeight: 500 }}>{e.name}</div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>{e.sub}</div>
                    </div>
                    <div style={{ height: 4, background: 'var(--bg-2)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${e.pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--violet), var(--blue))' }}></div>
                    </div>
                    <span className={`chip ${e.status}`} style={{ justifyContent: 'center', fontSize: 10 }}>{e.status.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === 'backlog' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 12 }}>~/backlog</span>
                  <span className="mono" style={{ color: 'var(--fg-4)', fontSize: 11 }}>{CONTENT.os.backlog.length} shown</span>
                </div>
                {CONTENT.os.backlog.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px dashed var(--line-soft)', alignItems: 'baseline' }}>
                    <span className="mono" style={{ color: 'var(--violet)', fontSize: 12, width: 50 }}>#{b.idx}</span>
                    <span style={{ color: 'var(--fg-2)', fontSize: 14.5, fontFamily: 'var(--sans)' }}>{b.t}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === 'stack' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 12 }}>~/stack</span>
                  <span className="mono" style={{ color: 'var(--fg-4)', fontSize: 11 }}>composable · boring</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {CONTENT.os.stack.map((s, i) => (
                    <div key={i} style={{ padding: 14, border: '1px solid var(--line)', borderRadius: 8 }}>
                      <div className="mono" style={{ color: 'var(--violet)', fontSize: 10, letterSpacing: '0.12em' }}>{s.k}</div>
                      <div style={{ color: 'var(--fg)', fontSize: 14, fontFamily: 'var(--sans)', marginTop: 4 }}>{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === 'log' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span className="mono" style={{ color: 'var(--fg-3)', fontSize: 12 }}>~/log -f</span>
                  <span className="mono" style={{ color: 'var(--green)', fontSize: 11 }}>● tailing</span>
                </div>
                {logs.map((l, i) => (
                  <div key={`${l.t}-${i}`} style={{ display: 'flex', gap: 14, padding: '8px 0', fontSize: 13, opacity: 1 - i * 0.07 }}>
                    <span style={{ color: 'var(--fg-4)', width: 56 }}>{l.t}</span>
                    <span style={{ color: 'var(--fg-2)' }}>{l.m}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ───────── WRITING — pulls from https://joeolaoye.co/blog/ ─────────
export function Writing() {
  const [feat, ...rest] = CONTENT.writing
  return (
    <section className="section shell" id="writing">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow" style={{ marginBottom: 18 }}>04 / THOUGHTS</div>
          <h2 className="h-section">Field notes from the <span className="text-grad">build floor</span>.</h2>
        </div>
        <div className="right">
          <a className="btn btn-quiet" href="https://joeolaoye.co/blog/posts/" target="_blank" rel="noopener noreferrer">All posts <Ico.arr /></a>
        </div>
      </div>

      <a
        href={feat.href}
        target="_blank"
        rel="noopener noreferrer"
        className="card"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 0,
          marginBottom: 32,
          overflow: 'hidden',
          cursor: 'pointer',
          color: 'inherit',
        }}
      >
        <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span className="chip live"><span className="chip-dot pulse"></span>LATEST</span>
            <span className="chip">{feat.tag}</span>
            <span className="chip">{feat.read}</span>
          </div>
          <h3 style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0, color: 'var(--fg)' }}>
            {feat.title}
          </h3>
          <p style={{ color: 'var(--fg-2)', fontSize: 16, margin: 0 }}>{feat.excerpt}</p>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 'auto', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            {feat.date} · POST #{feat.num} <Ico.ext />
          </div>
        </div>
        <div style={{ position: 'relative', minHeight: 320, background: 'linear-gradient(135deg, rgba(124,92,255,0.18), rgba(58,160,255,0.08))', borderLeft: '1px solid var(--line)', overflow: 'hidden' }}>
          <div className="mock-stripe"></div>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1, fontFamily: 'var(--display)' }}>#{feat.num}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.18em' }}>JOE / WRITING</div>
          </div>
        </div>
      </a>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, borderTop: '1px solid var(--line)' }}>
        {rest.map((w, i) => (
          <a
            key={w.num}
            href={w.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', flexDirection: 'column', gap: 14, padding: '28px 0',
              borderBottom: i < rest.length - (rest.length % 2 === 0 ? 2 : 1) ? '1px solid var(--line-soft)' : 'none',
              paddingRight: i % 2 === 0 ? 32 : 0,
              paddingLeft: i % 2 === 1 ? 32 : 0,
              borderLeft: i % 2 === 1 ? '1px solid var(--line-soft)' : 'none',
              color: 'inherit',
              transition: 'transform 200ms var(--ease)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(4px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-4)' }}>#{w.num} · {w.tag}</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-4)' }}>{w.date}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em', color: 'var(--fg)', lineHeight: 1.25 }}>
              {w.title}
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
              Read on joeolaoye.co <Ico.ext />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

// ───────── CONTACT ─────────
export function Contact() {
  const [picked, setPicked] = useState(0)
  return (
    <section className="section shell" id="contact" style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(60% 50% at 50% 50%, rgba(124,92,255,0.10), transparent 70%)',
        pointerEvents: 'none',
      }}></div>

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 920, margin: '0 auto 56px' }}>
        <div className="eyebrow" style={{ marginBottom: 18, justifyContent: 'center' }}>05 / CONTACT</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(44px, 6.4vw, 88px)', marginBottom: 24 }}>
          If you're building something that <span className="text-grad">matters</span>, we should talk.
        </h2>
        <p className="lede" style={{ margin: '0 auto', fontSize: 18, color: 'var(--fg-2)' }}>
          A small number of selected collaborations each quarter — founding-team partnerships,
          strategic advisory, co-prototyping with operators serving the next billion.
        </p>
      </div>

      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 40 }}>
        {CONTENT.collab.map((c, i) => (
          <button key={i} type="button" className={`collab-card ${picked === i ? 'selected' : ''}`} onClick={() => setPicked(i)} style={{ padding: 20, textAlign: 'left', background: 'transparent', border: 'none', font: 'inherit', color: 'inherit', cursor: 'pointer' }}>
            <div className="mono" style={{ color: picked === i ? 'var(--violet)' : 'var(--fg-4)', fontSize: 10, letterSpacing: '0.1em', marginBottom: 10 }}>0{i + 1}</div>
            <div style={{ color: 'var(--fg)', fontSize: 16, fontWeight: 500, marginBottom: 6 }}>{c.title}</div>
            <div style={{ color: 'var(--fg-3)', fontSize: 13, lineHeight: 1.5 }}>{c.sub}</div>
          </button>
        ))}
      </div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
        <a className="btn btn-primary" style={{ padding: '14px 22px' }} href={`mailto:${CONTENT.brand.email}?subject=${encodeURIComponent(CONTENT.collab[picked].title + ' — intro')}`}>
          <Ico.email /> {CONTENT.brand.email}
        </a>
        <a className="btn btn-ghost" style={{ padding: '14px 22px' }} href={`https://${CONTENT.brand.cal}`} target="_blank" rel="noopener noreferrer">Book a 30-min call <Ico.arr /></a>
      </div>

      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--line)', paddingTop: 28 }}>
        <div>
          <div className="mono" style={{ color: 'var(--fg-4)', fontSize: 10, letterSpacing: '0.12em' }}>OPERATOR'S NOTE</div>
          <p style={{ color: 'var(--fg-2)', fontSize: 14, marginTop: 10, lineHeight: 1.6, maxWidth: '36ch' }}>
            I write back to every founder mail. Be specific: what you're building, what's stuck, why now.
          </p>
        </div>
        <div>
          <div className="mono" style={{ color: 'var(--fg-4)', fontSize: 10, letterSpacing: '0.12em' }}>FIND ME</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14, flexWrap: 'wrap', fontFamily: 'var(--mono)', fontSize: 13 }}>
            <a href="https://github.com/joeolaoye" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--fg-2)' }}><Ico.github /> github</a>
            <a href="https://linkedin.com/in/joeolaoye" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--fg-2)' }}><Ico.ln /> linkedin</a>
            <a href="https://x.com/joeolaoye" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--fg-2)' }}><Ico.x /> x.com</a>
          </div>
        </div>
        <div>
          <div className="mono" style={{ color: 'var(--fg-4)', fontSize: 10, letterSpacing: '0.12em' }}>BASED IN</div>
          <div style={{ marginTop: 10, color: 'var(--fg)', fontFamily: 'var(--mono)', fontSize: 13 }}>{CONTENT.brand.location}</div>
          <div style={{ marginTop: 14 }}>
            <span className="chip live"><span className="chip-dot pulse"></span>RESPONDING WITHIN 24H</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ───────── FOOTER ─────────
export function Footer() {
  return (
    <footer className="footer shell">
      <div className="footer-row">
        <div>© {new Date().getFullYear()} JOSEPH OLAOYE · BUILDER LAB</div>
        <div>BUILT ON AWS · @TJOC/* · CALM SYSTEMS</div>
        <div>JOEOLAOYE.CO</div>
      </div>
    </footer>
  )
}
