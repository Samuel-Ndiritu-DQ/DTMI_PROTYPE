import { useNav } from '../context/NavContext';
import { getArticleBody } from '../data/articleContent';
import { topStories, emergingTech, insightCards } from '../data/mockData';
import { ArrowLeft, Clock, BookOpen, Share2, Bookmark, Link } from 'lucide-react';
import { useState } from 'react';

// Render a single body block
function Block({ block }) {
  switch (block.type) {
    case 'lead':
      return (
        <p className="text-[18px] leading-relaxed font-medium mb-6" style={{ color: '#1e293b' }}>
          {block.text}
        </p>
      );
    case 'h2':
      return (
        <h2 className="text-[20px] font-black mt-8 mb-3" style={{ color: 'var(--brand-navy)' }}>
          {block.text}
        </h2>
      );
    case 'p':
      return (
        <p className="text-[16px] leading-[1.8] mb-5" style={{ color: '#374151' }}>
          {block.text}
        </p>
      );
    case 'quote':
      return (
        <blockquote className="my-8 pl-5 border-l-4" style={{ borderColor: 'var(--brand-orange)' }}>
          <p className="text-[18px] font-semibold italic leading-relaxed mb-2" style={{ color: 'var(--brand-navy)' }}>
            "{block.text}"
          </p>
          {block.author && (
            <cite className="text-[13px] not-italic font-bold" style={{ color: 'var(--brand-orange)' }}>
              — {block.author}
            </cite>
          )}
        </blockquote>
      );
    case 'bullets':
      return (
        <ul className="my-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: '#374151' }}>
              <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--brand-orange)' }} />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

// Related story mini card
function RelatedCard({ story, onOpen }) {
  return (
    <button
      onClick={() => onOpen(story)}
      className="w-full text-left group flex gap-3 py-3 border-b last:border-0"
      style={{ borderColor: 'var(--brand-border)' }}
    >
      {story.image && (
        <div className="shrink-0 w-20 h-14 overflow-hidden rounded-sm">
          <img src={story.image} alt={story.headline || story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: 'var(--brand-orange)' }}>
          {story.category}
        </p>
        <p className="text-[12px] font-bold leading-snug group-hover:opacity-70 transition-opacity line-clamp-2" style={{ color: 'var(--brand-navy)' }}>
          {story.headline || story.title}
        </p>
      </div>
    </button>
  );
}

export default function ArticlePage() {
  const { page, goBack, openArticle } = useNav();
  const [copied, setCopied] = useState(false);
  const item = page?.item;
  if (!item) return null;

  const headline = item.headline || item.title || '';
  const summary  = item.summary || '';
  const category = item.category || '';
  const image    = item.image || '';
  const author   = item.author || 'DTMI Research Desk';
  const timestamp = item.timestamp || item.date || 'Apr 23, 2026';
  const readTime  = item.readTime || '6 min';
  const tags      = item.tags || [];

  const body = getArticleBody(item.id, headline, summary, category);

  // Related stories — pick 4 from pool excluding current
  const pool = [...topStories, ...emergingTech, ...insightCards].filter(s => s.id !== item.id);
  const related = pool.slice(0, 4);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">

      {/* ── BACK BAR ── */}
      <div className="border-b sticky top-0 z-40 bg-white" style={{ borderColor: 'var(--brand-border)' }}>
        <div className="max-w-[1280px] mx-auto px-4 h-11 flex items-center justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide transition-colors hover:opacity-70"
            style={{ color: 'var(--brand-navy)' }}
          >
            <ArrowLeft size={15} /> Back
          </button>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border rounded-sm transition-colors hover:bg-gray-50" style={{ borderColor: 'var(--brand-border)', color: 'var(--brand-muted)' }}>
              <Link size={12} /> {copied ? 'Copied!' : 'Copy link'}
            </button>
            <button className="p-1.5 border rounded-sm hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--brand-border)', color: 'var(--brand-muted)' }}>
              <Bookmark size={14} />
            </button>
            <button className="p-1.5 border rounded-sm hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--brand-border)', color: '#0077b5' }}>
              <Share2 size={14} />
            </button>
            <button className="p-1.5 border rounded-sm hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--brand-border)', color: '#1da1f2' }}>
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── HERO IMAGE ── */}
      {image && (
        <div className="w-full" style={{ maxHeight: '520px', overflow: 'hidden' }}>
          <img
            src={image.replace('w=600', 'w=1400').replace('w=400', 'w=1400')}
            alt={headline}
            className="w-full object-cover"
            style={{ maxHeight: '520px' }}
            loading="eager"
          />
        </div>
      )}

      {/* ── CONTENT ── */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── ARTICLE BODY (2/3) ── */}
          <article className="lg:col-span-2">

            {/* Category + tags */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-[11px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm text-white" style={{ background: 'var(--brand-orange)' }}>
                {category}
              </span>
              {tags.map(tag => (
                <span key={tag} className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-sm border" style={{ borderColor: 'var(--brand-border)', color: 'var(--brand-muted)' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Headline */}
            <h1 className="text-[28px] lg:text-[34px] font-black leading-tight mb-5" style={{ color: 'var(--brand-navy)' }}>
              {headline}
            </h1>

            {/* Byline */}
            <div className="flex items-center gap-4 pb-5 mb-6 border-b" style={{ borderColor: 'var(--brand-border)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-black shrink-0" style={{ background: 'var(--brand-navy)' }}>
                {author.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="text-[13px] font-bold" style={{ color: 'var(--brand-navy)' }}>{author}</p>
                <div className="flex items-center gap-3 text-[11px]" style={{ color: 'var(--brand-muted)' }}>
                  <span className="flex items-center gap-1"><Clock size={10} /> {timestamp}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><BookOpen size={10} /> {readTime} read</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="max-w-[680px]">
              {body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

            {/* Bottom share */}
            <div className="mt-10 pt-6 border-t flex items-center justify-between flex-wrap gap-3" style={{ borderColor: 'var(--brand-border)' }}>
              <div>
                <p className="text-[12px] font-bold mb-1" style={{ color: 'var(--brand-navy)' }}>Share this article</p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border rounded-sm hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--brand-border)', color: '#0077b5' }}>
                    <Share2 size={12} /> Share
                  </button>
                  <button className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border rounded-sm hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--brand-border)', color: '#1da1f2' }}>
                    <Share2 size={12} /> Share
                  </button>
                  <button onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border rounded-sm hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--brand-border)', color: 'var(--brand-muted)' }}>
                    <Link size={12} /> {copied ? 'Copied!' : 'Copy link'}
                  </button>
                </div>
              </div>
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide transition-colors hover:opacity-70"
                style={{ color: 'var(--brand-orange)' }}
              >
                <ArrowLeft size={13} /> Back to DTMI
              </button>
            </div>
          </article>

          {/* ── SIDEBAR (1/3) ── */}
          <aside className="space-y-6">

            {/* Related stories */}
            <div className="bg-white border rounded-sm p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <h3 className="text-[12px] font-black uppercase tracking-wider mb-3 pb-2 border-b" style={{ color: 'var(--brand-navy)', borderColor: 'var(--brand-border)' }}>
                Related Stories
              </h3>
              {related.map(story => (
                <RelatedCard
                  key={story.id}
                  story={story}
                  onOpen={(s) => openArticle({ ...s, headline: s.headline || s.title })}
                />
              ))}
            </div>

            {/* Newsletter */}
            <div className="rounded-sm p-4" style={{ background: 'var(--brand-navy)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--brand-orange)' }}>DTMI Intelligence</p>
              <h3 className="text-white text-[14px] font-bold mb-2">Get the daily briefing</h3>
              <p className="text-[#64748b] text-[11px] mb-3">Top transformation insights every morning.</p>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full text-white text-[12px] px-3 py-2 mb-2 focus:outline-none transition-colors placeholder-[#475569]"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button className="btn-orange w-full text-[12px] font-black py-2 uppercase tracking-wider rounded-sm">
                Subscribe Free
              </button>
            </div>

            {/* About DTMI */}
            <div className="bg-white border rounded-sm p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>About DTMI</p>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
                DTMI is the primary knowledge platform of DigitalQatalyst — a global think-tank examining how organizations are adapting to the Digital Economy.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
