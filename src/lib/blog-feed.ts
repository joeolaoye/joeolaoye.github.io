export interface BlogPost {
  num: string
  title: string
  tag: string
  date: string
  read: 'POST'
  href: string
  excerpt: string
}

const BLOG_POST_PATH = '/blog/posts/'
const DISPLAY_LIMIT = 8

function textFromHtml(html: string) {
  const document = new DOMParser().parseFromString(html, 'text/html')
  return (document.body.textContent ?? '').replace(/\s+/g, ' ').trim()
}

function excerptFrom(description: string) {
  const text = textFromHtml(description)
  if (text.length <= 220) return text
  return `${text.slice(0, 217).trimEnd()}…`
}

function postTag(item: Element) {
  const category = item.querySelector('category')?.textContent?.trim()
  return (category || 'WRITING').toUpperCase()
}

function postDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date).toUpperCase()
}

function secureBlogUrl(value: string) {
  try {
    const url = new URL(value)
    if (url.hostname === 'joeolaoye.co') url.protocol = 'https:'
    return url.toString()
  } catch {
    return value
  }
}

export function parseBlogFeed(xml: string): BlogPost[] {
  const document = new DOMParser().parseFromString(xml, 'application/xml')
  if (document.querySelector('parsererror')) {
    throw new Error('The blog feed returned invalid XML')
  }

  const items = Array.from(document.querySelectorAll('item'))
    .map((item) => ({
      title: item.querySelector('title')?.textContent?.trim() ?? '',
      href: item.querySelector('link')?.textContent?.trim() ?? '',
      published: item.querySelector('pubDate')?.textContent?.trim() ?? '',
      description: item.querySelector('description')?.textContent ?? '',
      tag: postTag(item),
    }))
    .filter((item) => item.title && item.href.includes(BLOG_POST_PATH))
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())

  return items.slice(0, DISPLAY_LIMIT).map((item, index) => ({
    num: String(items.length - index).padStart(3, '0'),
    title: item.title,
    tag: item.tag,
    date: postDate(item.published),
    read: 'POST',
    href: secureBlogUrl(item.href),
    excerpt: excerptFrom(item.description),
  }))
}

export async function fetchBlogPosts(signal?: AbortSignal) {
  const response = await fetch('/blog/posts/index.xml', {
    cache: 'no-store',
    headers: { Accept: 'application/rss+xml, application/xml;q=0.9' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`The blog feed returned ${response.status}`)
  }

  return parseBlogFeed(await response.text())
}
