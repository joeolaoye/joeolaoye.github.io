// Single source of truth for the landing page content.
// Ported from the Figma Make placeholder; rewritten with real portfolio data —
// only what is actually live or in active development, no fabricated metrics.

export type ProjectStatus = 'live' | 'beta' | 'shipped' | 'draft'
export type ProjectTone = 'violet' | 'blue' | 'rose' | 'amber' | 'green'

export interface Metric { k: string; v: string }
export interface Project {
  id: string
  name: string
  status: ProjectStatus
  statusLabel: string
  tagline: string
  problem: string
  insight: string
  tags: string[]
  metrics: Metric[]
  tone: ProjectTone
  href?: string
}

export const CONTENT = {
  brand: {
    name: 'Joseph Olaoye',
    handle: 'joeolaoye',
    role: 'Founder · Product Architect · Systems Builder',
    location: 'Lagos · New York · London',
    email: 'hello@tjoc.dev',
    cal: 'cal.com/joeolaoye',
  },

  hero: {
    eyebrow: 'CURRENTLY BUILDING — MAY 2026',
    headline:
      'Designing the systems behind how the next billion buy, work, and discover online.',
    sub:
      'I build product infrastructure at the seams of trust, distribution, and AI — for emerging markets, creators, and the operators quietly rewriting how the internet runs.',
    stats: [
      { num: '04', label: 'live products' },
      { num: '06', label: 'in build' },
      { num: '∞', label: 'idea backlog' },
    ],
    statusChips: [
      { label: 'AVAILABLE FOR SELECTED COLLABS', tone: 'live' as const },
      { label: 'LAGOS · NEW YORK · LONDON', tone: 'mono' as const },
    ],
  },

  ticker: [
    'WiseCV — AI-tailored CVs',
    'jobs.tjoc.dev — sales-led hiring',
    'WiseMarket — Nigerian social commerce',
    'star.club — career development',
    'Borderless — stablecoin infra',
    'conchpay — Africa-first payments',
    'sensie — micro-influencer ads',
    '@tjoc/* — shared platform packages',
    'tjoc-automate — n8n on AWS',
  ],

  about: {
    title: 'I build infrastructure for the parts of the internet that everyone forgot.',
    // paras is rendered inline in src/figma/Sections.tsx (About component) so
    // we can hyperlink Kora / Flutterwave / Korapay without escaping HTML.
    paras: [],
    pillars: [
      { k: 'INFRA',     v: 'AWS-first stacks for emerging-market commerce' },
      { k: 'TRUST',     v: 'KYC, reputation, identity, audit rails' },
      { k: 'AI',        v: 'Career, news, and operator-facing tooling' },
      { k: 'PAYMENTS',  v: 'Stablecoin + NUBAN + card rails, one ledger' },
      { k: 'CREATOR',   v: 'Performance-based campaign marketplaces' },
      { k: 'STUDIO',    v: 'Portfolio coordination + shared packages' },
    ],
  },

  projects: [
    {
      id: '01',
      name: 'WiseCV',
      status: 'live',
      statusLabel: 'LIVE · MVP',
      tagline: 'AI-tailored CVs for the way recruiters actually read.',
      problem:
        "Generic CVs lose to ATS keyword scoring. Job seekers — especially outside the US/UK — get filtered out before a human sees them, even when they're a strong fit.",
      insight:
        'Treat a CV as a graph. Tailor per job description with Claude, score against the same ATS shadows recruiters use, surface the gaps as actions the candidate can take.',
      tags: ['React', 'Hono', 'DynamoDB', 'Claude', 'Stripe'],
      metrics: [],
      tone: 'violet',
      href: 'https://www.wisecv.co',
    },
    {
      id: '02',
      name: 'jobs.tjoc.dev',
      status: 'live',
      statusLabel: 'LIVE · BETA',
      tagline: 'Hiring infrastructure that respects engineering teams.',
      problem:
        "Job boards optimize for volume, not signal. Recruiters drown in unqualified CVs, candidates burn time on shadow funnels, and 'first interview' is mostly screening for the basics.",
      insight:
        'GitHub-hosted take-home assessments before any conversation. Sales-led client onboarding. Tier-priced. The platform sells signal, not seats.',
      tags: ['React', 'Hono', 'SAM', 'Cognito', 'Stripe'],
      metrics: [],
      tone: 'blue',
      href: 'https://jobs.tjoc.dev',
    },
    {
      id: '03',
      name: 'WiseMarket',
      status: 'beta',
      statusLabel: 'BUILD · BETA',
      tagline: 'Nigerian social commerce with trust rails underneath.',
      problem:
        'Sellers transact on Instagram and WhatsApp without verified-seller signal. Buyers have no recourse, sellers have no compounding reputation, and the marketplace is a DM.',
      insight:
        'Deterministic trust score (KYC + verified channel + buyer reviews), deep-linked WhatsApp/IG inquiries with audit trail, AI listing ingestion that turns IG posts into listings.',
      tags: ['Next.js', 'Hono', 'DynamoDB', 'conchpay', 'Claude'],
      metrics: [],
      tone: 'rose',
    },
    {
      id: '04',
      name: 'Borderless',
      status: 'draft',
      statusLabel: 'DESIGN · DRAFT',
      tagline: 'Embeddable B2B stablecoin payments for fintechs and remittance.',
      problem:
        'Every fintech that wants cross-border stablecoin rails currently has to build identity, escrow, off-ramp, and compliance from scratch.',
      insight:
        'Ship the rails as a single layer that operators compose like a primitive — KYB, escrow, multi-corridor off-ramp, MTL/EMI compliance bundled.',
      tags: ['Stablecoin', 'KYB', 'Off-ramp', 'API', 'AWS'],
      metrics: [],
      tone: 'amber',
    },
    {
      id: '05',
      name: 'conchpay',
      status: 'beta',
      statusLabel: 'BUILD · MVP',
      tagline: 'Africa-first payment processor — NUBAN bank rail + stablecoin.',
      problem:
        'African merchants are squeezed between expensive card processors and slow bank settlement, with stablecoin acceptance bolted on by anyone who tries.',
      insight:
        'One ledger, two settlement rails (NUBAN bank transfer, stablecoin), KYC/KYT/AML in-line, two-vendor redundancy on the bank side so an outage degrades but does not stop.',
      tags: ['Fastify', 'ECS', 'CDK', 'Yellow Card', 'Squad'],
      metrics: [],
      tone: 'green',
      href: 'https://useconch.com',
    },
  ] as Project[],

  os: {
    experiments: [
      { name: 'Sales-led onboarding (jobs.tjoc.dev)', sub: 'Leads + tier pricing + Stripe Invoices', status: 'live', pct: 100 },
      { name: 'Cloudflare Turnstile rollout',         sub: 'Captcha standard across public forms',    status: 'beta', pct: 25 },
      { name: 'WiseMarket AI listing ingestion',      sub: 'Claude → ListingDraft schema',            status: 'beta', pct: 65 },
      { name: 'Borderless investor outreach',         sub: 'n8n + Sheets + drafts assist',            status: 'beta', pct: 40 },
      { name: '@tjoc/* shared platform packages',     sub: 'auth, types, audit, analytics, ai-core',  status: 'live', pct: 90 },
    ],
    log: [
      { t: '08:42', m: 'jobs.tjoc.dev: Turnstile live on /hire/contact' },
      { t: '08:11', m: '@tjoc/analytics 2.2.0 published — alias() shipped' },
      { t: '07:55', m: 'tjoc-studio: ADR 0025 (portfolio captcha) accepted' },
      { t: '07:14', m: 'WiseMarket: trust-recalc-worker IAM gap fixed' },
      { t: '06:48', m: 'jobs.tjoc.dev: tier pricing admin surface live' },
      { t: '06:02', m: 'jobs.tjoc.dev: USD switchover cleared GBP drift' },
      { t: '05:30', m: 'tjoc-automate: borderless investor outreach Phase 1' },
    ],
    backlog: [
      { idx: '038', t: 'Tier-aware referral payout (jobs.tjoc.dev)' },
      { idx: '037', t: 'WiseMarket OpenSearch swap from DynamoDB token index' },
      { idx: '036', t: '@tjoc/captcha shared package (after 2nd consumer)' },
      { idx: '035', t: 'curator — gamified news daily-digest MVP' },
      { idx: '034', t: 'Cross-product Cognito federation revisit (post ADR 0017)' },
      { idx: '033', t: 'AWS account isolation for conchpay (deferred to 2027)' },
    ],
    stack: [
      { k: 'INFRA',     v: 'AWS · Lambda · SAM · CDK (conchpay)' },
      { k: 'DATA',      v: 'DynamoDB · S3 · ElastiCache' },
      { k: 'AI',        v: 'Claude · @tjoc/ai-core' },
      { k: 'IDENTITY',  v: 'Cognito (siloed per ADR 0017) · @tjoc/auth' },
      { k: 'PAYMENTS',  v: 'Stripe · Paystack · conchpay (NUBAN + USDC)' },
      { k: 'OBS',       v: '@tjoc/audit · @tjoc/analytics · CloudWatch' },
    ],
  },

  // Recent posts from https://joeolaoye.co/blog/ — fetched live during the
  // redesign and inlined here. Newest first. The featured-card excerpt below
  // mirrors the opening line of each post on the blog.
  writing: [
    {
      num: '008',
      title: 'Building Borderless: an OS for money movement',
      tag: 'PAYMENTS',
      date: 'APR 2026',
      read: 'POST',
      href: 'https://joeolaoye.co/blog/posts/borderless/',
      excerpt: 'A few years ago I sat in an office in Lagos, watching a support queue fill up with the same message in different words: did it go through?',
    },
    {
      num: '007',
      title: 'From UUIDs to Snowflakes: how IDs grow up with your infrastructure',
      tag: 'INFRA',
      date: 'APR 2026',
      read: 'POST',
      href: 'https://joeolaoye.co/blog/posts/snowflake-ids/',
      excerpt: 'The first time you pick an ID strategy for a new service, it does not feel like a decision. You reach for whatever the framework gives you.',
    },
    {
      num: '006',
      title: 'Production security: attack surfaces, and the cost of being overlooked',
      tag: 'SECURITY',
      date: 'JAN 2026',
      read: 'POST',
      href: 'https://joeolaoye.co/blog/posts/security/',
      excerpt: 'Most production security problems do not start with elite hackers or clever zero-day exploits. They start with boring stuff — a debug endpoint that never got turned off.',
    },
    {
      num: '005',
      title: '2025: Foundations, Lessons, and Looking Ahead',
      tag: 'REFLECTION',
      date: 'DEC 2025',
      read: 'POST',
      href: 'https://joeolaoye.co/blog/posts/byebye2025/',
      excerpt: '2025 was one of those years that quietly redraws the map of your life. I got the chance to work with a $6B company on AI and AI agents.',
    },
    {
      num: '004',
      title: '2025: The year of the AI agent',
      tag: 'AI',
      date: 'NOV 2025',
      read: 'POST',
      href: 'https://joeolaoye.co/blog/posts/2025/',
      excerpt: 'AI agents came into their own this year. What does that mean for the future?',
    },
    {
      num: '003',
      title: 'AGENTS.md — Giving Coding Agents What They Need for Success',
      tag: 'AI',
      date: 'SEP 2025',
      read: 'POST',
      href: 'https://joeolaoye.co/blog/posts/agent/',
      excerpt: 'AGENTS.md is a simple open format for guiding AI coding agents. Here is what it is, why it is valuable, and how to adopt it in your projects.',
    },
    {
      num: '002',
      title: 'Why Every Web Product Owner Should Care About Progressive Web Apps',
      tag: 'PRODUCT',
      date: 'SEP 2025',
      read: 'POST',
      href: 'https://joeolaoye.co/blog/posts/pwa/',
      excerpt: 'PWAs combine the reach of the web with the experience of native apps. Here is why every product owner should consider adopting them.',
    },
    {
      num: '001',
      title: 'The App Is Not the Business',
      tag: 'PRODUCT',
      date: 'SEP 2025',
      read: 'POST',
      href: 'https://joeolaoye.co/blog/posts/app/',
      excerpt: 'Building a mobile or web app is not the same as building a business. Founders need to focus on fundamentals, unit economics, and customer value — not just code.',
    },
  ],

  collab: [
    { title: 'Founding-team partner', sub: '0→1 product, infra, hiring' },
    { title: 'Strategic advisor',     sub: 'Product, growth, distribution' },
    { title: 'Investor intro',        sub: 'Pre-seed → Series A in EM' },
    { title: 'Build with me',         sub: 'Co-prototype, white-label, OEM' },
  ],
} as const

export type Content = typeof CONTENT
