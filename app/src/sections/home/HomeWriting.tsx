import { useState, useEffect } from 'react';

interface Post {
  title: string;
  link: string;
  cat: string;
  date: string;
  readTime: string;
  excerpt: string;
}

function extractExcerpt(html: string): string {
  // Strip tags, decode common entities, collapse whitespace
  const text = html
    .replace(/<figure[\s\S]*?<\/figure>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= 160) return text;
  const cut = text.slice(0, 160).replace(/\s+\S*$/, '');
  return cut + '…';
}

function estimateReadTime(content: string): string {
  const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const words = text.split(' ').filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function PostCard({ post }: { post: Post }) {
  return (
    <a href={post.link} target="_blank" rel="noopener noreferrer" className="pf-post-card">
      <div className="pf-post-meta">
        <span>{post.cat}</span>
        <span>{post.readTime}</span>
      </div>
      <div className="pf-post-title">{post.title}</div>
      <div className="pf-post-excerpt">{post.excerpt}</div>
      <div className="pf-post-footer">
        <span>{post.date}</span>
        <span className="pf-post-read">Read ↗</span>
      </div>
    </a>
  );
}

function SkeletonCard() {
  return (
    <div className="pf-post-card pf-post-card-skeleton" aria-hidden>
      <div className="pf-skeleton pf-skeleton-sm" />
      <div className="pf-skeleton pf-skeleton-title" />
      <div className="pf-skeleton pf-skeleton-md" />
      <div className="pf-skeleton pf-skeleton-md" style={{ width: '70%' }} />
    </div>
  );
}

const CACHE_KEY = 'pf_medium_posts';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function readCache(): Post[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, posts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return posts as Post[];
  } catch {
    return null;
  }
}

function writeCache(posts: Post[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), posts }));
  } catch {}
}

export function HomeWriting() {
  const cached = readCache();
  const [posts, setPosts] = useState<Post[]>(cached ?? []);
  const [loading, setLoading] = useState(cached === null);

  useEffect(() => {
    if (cached !== null) return; // fresh cache hit — skip fetch

    fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
        'https://medium.com/feed/@justinzhao1324',
      )}`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'ok' && Array.isArray(data.items)) {
          const parsed: Post[] = data.items.map((item: Record<string, unknown>) => ({
            title: String(item.title ?? ''),
            link: String(item.link ?? item.guid ?? '#'),
            cat: Array.isArray(item.categories) && item.categories.length > 0
              ? String(item.categories[0]).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
              : 'Notes',
            date: formatDate(String(item.pubDate ?? '')),
            readTime: estimateReadTime(String(item.content ?? item.description ?? '')),
            excerpt: extractExcerpt(String(item.description ?? item.content ?? '')),
          }));
          writeCache(parsed);
          setPosts(parsed);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="pf-writing" id="writing">
      <div className="pf-container">
        <div className="pf-section-marker reveal">
          <span className="pf-section-marker-num">04</span>
          <span>Writing</span>
          <span className="pf-section-marker-line" />
          <span className="pf-section-marker-meta">long-form notes · sporadic</span>
        </div>

        <div className="pf-writing-grid reveal-stagger">
          {loading
            ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
            : posts.map((p, i) => <PostCard key={i} post={p} />)}
        </div>

        {!loading && posts.length === 0 && null}

        <div className="reveal" style={{ marginTop: '40px' }}>
          <a
            href="https://medium.com/@justinzhao1324"
            target="_blank"
            rel="noopener noreferrer"
            className="pf-btn pf-btn-ghost"
          >
            All articles on Medium
            <span className="pf-btn-arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
