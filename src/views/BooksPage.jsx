import { useState } from 'react';
import { dtmbBooks } from '../data/booksData';
import { BookOpen, Clock, ChevronRight, Lock, ArrowLeft, Users, Star, ExternalLink, BarChart2 } from 'lucide-react';
import PageSearch from '../components/PageSearch';
import PageMeta from '../components/PageMeta';
import { pageMeta } from '../data/mockData';

/* ── CSS book cover — renders like a real physical book ── */
function BookCover({ book, size = 'md' }) {
  const w = size === 'lg' ? 160 : size === 'sm' ? 90 : 120;
  const h = Math.round(w * 1.5);

  // Pattern SVG backgrounds
  const patterns = {
    circuit: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'%3E%3Cpath d='M10 0v10h20V0M10 40v-10h20v10M0 10h10v20H0M40 10h-10v20h10'/%3E%3Ccircle cx='10' cy='10' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='30' cy='10' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='10' cy='30' r='2' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='30' cy='30' r='2' fill='rgba(255,255,255,0.1)'/%3E%3C/g%3E%3C/svg%3E")`,
    grid: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'%3E%3Cpath d='M0 0h20v20H0z'/%3E%3C/g%3E%3C/svg%3E")`,
    dots: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='1.5' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`,
    wave: `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6 Q10 0 20 6 Q30 12 40 6' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1.5'/%3E%3C/svg%3E")`,
    neural: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1'%3E%3Ccircle cx='10' cy='10' r='3'/%3E%3Ccircle cx='40' cy='10' r='3'/%3E%3Ccircle cx='25' cy='30' r='3'/%3E%3Cline x1='10' y1='10' x2='40' y2='10'/%3E%3Cline x1='10' y1='10' x2='25' y2='30'/%3E%3Cline x1='40' y1='10' x2='25' y2='30'/%3E%3C/g%3E%3C/svg%3E")`,
    fire: `url("data:image/svg+xml,%3Csvg width='30' height='40' viewBox='0 0 30 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0 Q20 10 15 15 Q25 10 20 25 Q15 35 10 40 Q5 30 10 20 Q5 25 8 15 Q10 5 15 0Z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E")`,
    economy: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1'%3E%3Cpolyline points='0,30 10,20 20,25 30,10 40,15'/%3E%3C/g%3E%3C/svg%3E")`,
    network: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1'%3E%3Ccircle cx='10' cy='30' r='4'/%3E%3Ccircle cx='30' cy='10' r='4'/%3E%3Ccircle cx='50' cy='30' r='4'/%3E%3Ccircle cx='30' cy='50' r='4'/%3E%3Cline x1='14' y1='30' x2='26' y2='14'/%3E%3Cline x1='34' y1='10' x2='46' y2='26'/%3E%3Cline x1='50' y1='34' x2='34' y2='46'/%3E%3Cline x1='26' y1='50' x2='14' y2='34'/%3E%3C/g%3E%3C/svg%3E")`,
  };

  const isDTMB = book.type === 'dtmb';

  return (
    <div
      className="relative shrink-0 rounded-sm overflow-hidden shadow-lg"
      style={{
        width: w,
        height: h,
        background: book.coverBg,
        backgroundImage: patterns[book.coverPattern] || patterns.grid,
      }}
    >
      {/* Spine shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: 'rgba(0,0,0,0.4)' }} />
      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.15)' }} />

      {/* Accent bar */}
      <div className="absolute top-0 right-0 bottom-0 w-1" style={{ background: book.coverAccent }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-3">
        {/* Top: publisher badge */}
        <div>
          {isDTMB ? (
            <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm" style={{ background: book.coverAccent, color: 'white' }}>
              DTMB
            </span>
          ) : (
            <span className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {book.publisher?.split('/')[0]?.trim()}
            </span>
          )}
        </div>

        {/* Middle: accent line */}
        <div className="w-8 h-0.5 rounded-full" style={{ background: book.coverAccent }} />

        {/* Bottom: title + author */}
        <div>
          <p
            className="font-black leading-tight mb-1"
            style={{
              color: 'white',
              fontSize: size === 'lg' ? '13px' : size === 'sm' ? '8px' : '10px',
              lineHeight: 1.2,
            }}
          >
            {book.title}
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: size === 'lg' ? '9px' : '7px',
            }}
          >
            {book.author.split(',')[0].split('&')[0].trim()}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Star rating display ── */
function Stars({ rating }) {
  if (!rating) return null;
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1,2,3,4,5].map(i => (
          <span key={i} style={{ color: i <= full ? '#f59e0b' : i === full + 1 && half ? '#f59e0b' : '#d1d5db', fontSize: '12px' }}>
            {i <= full ? '★' : i === full + 1 && half ? '½' : '☆'}
          </span>
        ))}
      </div>
      <span className="text-[12px] font-semibold" style={{ color: '#f59e0b' }}>{rating}</span>
    </div>
  );
}
/* ── Content block renderer ── */
function Block({ block }) {
  switch (block.type) {
    case 'lead':
      return <p className="text-[17px] leading-relaxed font-medium mb-5" style={{ color: '#1e293b' }}>{block.text}</p>;
    case 'h2':
      return <h2 className="text-[20px] font-black mt-8 mb-3" style={{ color: 'var(--brand-navy)' }}>{block.text}</h2>;
    case 'p':
      return <p className="text-[15px] leading-[1.85] mb-5" style={{ color: '#374151' }}>{block.text}</p>;
    case 'quote':
      return (
        <blockquote className="my-7 pl-5 border-l-4" style={{ borderColor: 'var(--brand-orange)' }}>
          <p className="text-[17px] font-semibold italic leading-relaxed mb-2" style={{ color: 'var(--brand-navy)' }}>"{block.text}"</p>
          {block.author && <cite className="text-[12px] not-italic font-bold" style={{ color: 'var(--brand-orange)' }}>— {block.author}</cite>}
        </blockquote>
      );
    default: return null;
  }
}

/* ── Paywall gate ── */
function PaywallGate({ book, onSignIn }) {
  return (
    <div className="relative mt-8">
      {/* Faded text teaser */}
      <div className="pointer-events-none select-none" style={{ maxHeight: '110px', overflow: 'hidden', maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}>
        <p className="text-[15px] leading-[1.85]" style={{ color: '#374151' }}>
          This chapter examines the deeper strategic implications of the framework, drawing on case studies from organizations that have successfully navigated the transition. The analysis reveals patterns that challenge conventional wisdom about sequencing and investment priorities across industries...
        </p>
      </div>

      {/* Gate card */}
      <div className="mt-6 rounded-sm overflow-hidden border" style={{ borderColor: 'var(--brand-border)' }}>
        {/* Header stripe */}
        <div className="px-6 py-5 text-center" style={{ background: 'var(--brand-navy)' }}>
          <div className="w-10 h-10 rounded-sm flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--brand-orange)' }}>
            <Lock size={18} className="text-white" />
          </div>
          <h3 className="text-white font-black text-[17px] mb-1">Continue reading this volume</h3>
          <p className="text-[13px]" style={{ color: '#94a3b8' }}>
            {book.chapters.filter(c => !c.preview).length} chapters remaining · Subscribe to read
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 bg-white text-center">
          <p className="text-[14px] leading-relaxed mb-2 max-w-[420px] mx-auto" style={{ color: 'var(--brand-muted)' }}>
            Subscribe to DTMI Intelligence to unlock the full volume, including all {book.pages} pages and every chapter.
          </p>

          {/* Locked chapters preview */}
          <div className="text-left rounded-sm border p-4 mb-6 max-w-[420px] mx-auto" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand-border)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: 'var(--brand-muted)' }}>Locked chapters</p>
            {book.chapters.filter(c => !c.preview).map(ch => (
              <div key={ch.num} className="flex items-center gap-2 py-1.5 text-[12px]" style={{ color: '#94a3b8' }}>
                <Lock size={10} style={{ color: 'var(--brand-orange)' }} className="shrink-0" />
                Chapter {ch.num}: {ch.title}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-[360px] mx-auto">
            <button className="flex-1 py-3 rounded-sm text-white font-black text-[13px] uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ background: 'var(--brand-orange)' }}>
              Subscribe to Unlock
            </button>
            <button onClick={onSignIn} className="flex-1 py-3 rounded-sm font-black text-[13px] uppercase tracking-wide border-2 hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--brand-navy)', color: 'var(--brand-navy)' }}>
              Sign In
            </button>
          </div>
          <p className="text-[11px] mt-4" style={{ color: '#c0c8d8' }}>
            Already a subscriber? Sign in above to continue reading.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Book reader — renders as normal page content (TopBar/Footer come from App) ── */
function BookReader({ book, onClose, onSignIn }) {
  return (
    <div style={{ background: 'var(--brand-light)', minHeight: '100vh' }}>
      <PageMeta title={book.title} description={book.hook || book.subtitle} />
      {/* Slim breadcrumb bar */}
      <div className="bg-white border-b" style={{ borderColor: 'var(--brand-border)' }}>
        <div className="max-w-[960px] mx-auto px-4 h-11 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide hover:opacity-70 transition-opacity" style={{ color: 'var(--brand-navy)' }}>
            <ArrowLeft size={14} /> Back to Books
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ background: book.coverAccent, color: 'white' }}>
              {book.type === 'dtmb' ? 'DTMB Exclusive' : book.category}
            </span>
            <span className="text-[11px] hidden sm:block" style={{ color: 'var(--brand-muted)' }}>Free Preview</span>
          </div>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ── Main reading area ── */}
          <article className="lg:col-span-3">
            {/* Book header — Amazon product page style */}
            <div className="flex gap-6 mb-8 pb-6 border-b" style={{ borderColor: 'var(--brand-border)' }}>
              <div className="shrink-0">
                <BookCover book={book} size="lg" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm" style={{ background: '#f1f5f9', color: '#475569' }}>{book.category}</span>
                  {book.type === 'dtmb' && <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm text-white" style={{ background: 'var(--brand-orange)' }}>DTMB Exclusive</span>}
                </div>
                <h1 className="text-[22px] sm:text-[26px] font-black leading-tight mb-1" style={{ color: 'var(--brand-navy)' }}>{book.title}</h1>
                <p className="text-[14px] mb-3" style={{ color: 'var(--brand-muted)' }}>{book.subtitle}</p>
                <p className="text-[13px] mb-2" style={{ color: '#475569' }}>
                  by <span className="font-semibold" style={{ color: 'var(--brand-navy)' }}>{book.author}</span>
                </p>
                {book.rating && (
                  <div className="flex items-center gap-2 mb-3">
                    <Stars rating={book.rating} />
                    {book.reviews && <span className="text-[12px]" style={{ color: 'var(--brand-muted)' }}>({book.reviews.toLocaleString()} ratings)</span>}
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-4 text-[12px] mb-3" style={{ color: 'var(--brand-muted)' }}>
                  <span className="flex items-center gap-1.5"><BookOpen size={12} /> {book.pages} pages</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {book.readTime}</span>
                  <span>{book.publishDate}</span>
                  {book.publisher && <span>{book.publisher}</span>}
                </div>
                {/* Stats */}
                <div className="flex flex-wrap gap-3">
                  {book.stats.map(s => (
                    <div key={s.label} className="rounded-sm border px-3 py-1.5 text-center" style={{ borderColor: 'var(--brand-border)', background: 'white' }}>
                      <p className="text-[14px] font-black leading-none" style={{ color: book.coverAccent }}>{s.value}</p>
                      <p className="text-[9px] font-semibold uppercase tracking-wide mt-0.5" style={{ color: 'var(--brand-muted)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: 'var(--brand-border)' }} />
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: '#dcfce7', color: '#16a34a' }}>Free Preview</span>
              <div className="flex-1 h-px" style={{ background: 'var(--brand-border)' }} />
            </div>

            {/* Preview content */}
            <div className="max-w-[660px]">
              {book.previewContent.map((block, i) => <Block key={i} block={block} />)}
            </div>

            {/* Paywall */}
            <PaywallGate book={book} onSignIn={onSignIn} />
          </article>

          {/* ── Sidebar ── */}
          <aside className="space-y-5">
            {/* Chapter list */}
            <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>Table of Contents</p>
              <div className="space-y-1">
                {book.chapters.map(ch => (
                  <div key={ch.num} className="flex items-center gap-2.5 px-2 py-2 rounded-sm text-[12px]"
                    style={{ background: ch.preview ? '#f8fafc' : 'transparent', color: ch.preview ? 'var(--brand-dark)' : '#94a3b8' }}>
                    {ch.preview ? <BookOpen size={11} className="shrink-0" style={{ color: book.coverAccent }} /> : <Lock size={11} className="shrink-0" />}
                    <span className="leading-snug">{ch.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {book.tags.map(tag => (
                  <span key={tag} className="text-[11px] px-2 py-0.5 rounded-sm border" style={{ borderColor: 'var(--brand-border)', color: 'var(--brand-muted)' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Subscribe CTA */}
            <div className="rounded-sm p-4" style={{ background: 'var(--brand-navy)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--brand-orange)' }}>DTMI Intelligence</p>
              <p className="text-white font-black text-[13px] mb-2">Get full access</p>
              <p className="text-[12px] mb-3" style={{ color: '#94a3b8' }}>Subscribe to unlock every book, research report, and intelligence feed.</p>
              <button className="w-full py-2.5 rounded-sm text-white font-black text-[12px] uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ background: 'var(--brand-orange)' }}>
                Subscribe Now
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ── Amazon-style book listing card ── */
function BookCard({ book, onOpen }) {
  const isDTMB = book.type === 'dtmb';
  return (
    <div
      onClick={() => onOpen(book)}
      className="group cursor-pointer bg-white border rounded-sm card-hover flex gap-5 p-5"
      style={{ borderColor: 'var(--brand-border)' }}
    >
      {/* Book cover */}
      <div className="shrink-0">
        <BookCover book={book} size="md" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {isDTMB && (
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm text-white" style={{ background: 'var(--brand-orange)' }}>
              DTMB Exclusive
            </span>
          )}
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm" style={{ background: '#f1f5f9', color: '#475569' }}>
            {book.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-black leading-snug mb-0.5 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--brand-navy)' }}>
          {book.title}
        </h3>
        <p className="text-[12px] mb-1.5 line-clamp-1" style={{ color: 'var(--brand-muted)' }}>{book.subtitle}</p>

        {/* Author + publisher */}
        <p className="text-[12px] mb-2" style={{ color: '#475569' }}>
          by <span className="font-semibold">{book.author}</span>
          {book.publisher && <span style={{ color: '#94a3b8' }}> · {book.publisher}</span>}
        </p>

        {/* Rating */}
        {book.rating && (
          <div className="flex items-center gap-2 mb-2">
            <Stars rating={book.rating} />
            {book.reviews && <span className="text-[11px]" style={{ color: 'var(--brand-muted)' }}>({book.reviews.toLocaleString()} reviews)</span>}
          </div>
        )}

        {/* Hook */}
        <p className="text-[12px] leading-relaxed mb-3 line-clamp-2 flex-1" style={{ color: 'var(--brand-muted)' }}>
          {book.hook}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-[11px]" style={{ color: '#94a3b8' }}>
          <span className="flex items-center gap-1"><BookOpen size={10} /> {book.pages} pages</span>
          <span className="flex items-center gap-1"><Clock size={10} /> {book.readTime}</span>
          <span>{book.publishDate}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {book.tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-sm border" style={{ borderColor: 'var(--brand-border)', color: '#64748b' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right CTA */}
      <div className="shrink-0 flex flex-col items-end justify-between">
        <span className="text-[11px] font-semibold px-2 py-1 rounded-sm" style={{ background: isDTMB ? '#fff7ed' : '#f0fdf4', color: isDTMB ? 'var(--brand-orange)' : '#16a34a' }}>
          {isDTMB ? 'Subscribers only' : 'Free preview'}
        </span>
        <span className="text-[12px] font-black flex items-center gap-1 group-hover:gap-2 transition-all mt-auto" style={{ color: 'var(--brand-orange)' }}>
          Read <ChevronRight size={13} />
        </span>
      </div>
    </div>
  );
}

/* ── Main BooksPage ── */
export default function BooksPage({ onSignIn }) {
  const [openBook, setOpenBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const validBooks    = dtmbBooks.filter(b => b.coverBg);
  const externalBooks = validBooks.filter(b => b.type === 'external');
  const dtmbOnly      = validBooks.filter(b => b.type === 'dtmb');

  const matchBook = (book) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.subtitle?.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.category.toLowerCase().includes(q) ||
      book.hook?.toLowerCase().includes(q) ||
      book.tags?.some(t => t.toLowerCase().includes(q))
    );
  };

  const filteredExternal = externalBooks.filter(matchBook);
  const filteredDtmb     = dtmbOnly.filter(matchBook);
  const totalFiltered    = filteredExternal.length + filteredDtmb.length;

  if (openBook) {
    return <BookReader book={openBook} onClose={() => setOpenBook(null)} onSignIn={onSignIn} />;
  }

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
      <PageMeta meta={pageMeta.Books} />
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-[580px]">
              <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
                DTMI Book Library
              </p>
              <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
                The essential reading list for digital transformation leaders
              </h1>
              <p className="text-[14px] leading-relaxed" style={{ color: '#94a3b8' }}>
                Curated books from the world's leading thinkers on digital strategy, AI, and organizational transformation — plus exclusive DTMB research volumes from DigitalQatalyst.
              </p>
            </div>
            {/* Cover stack preview */}
            <div className="flex items-end gap-2 shrink-0">
              {validBooks.slice(0, 5).map((b, i) => (
                <div key={b.id} onClick={() => setOpenBook(b)} className="cursor-pointer hover:scale-105 transition-transform" style={{ transform: `rotate(${(i - 2) * 3}deg)`, zIndex: i }}>
                  <BookCover book={b} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8 space-y-10">

        {/* ── Search bar ── */}
        <div className="w-full">
          <PageSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by title, author, topic, tag..."
            resultCount={searchQuery ? totalFiltered : undefined}
            totalCount={validBooks.length}
          />
        </div>

        {/* ── DTMB Exclusive volumes ── */}
        {filteredDtmb.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div>
                <h2 className="text-[17px] font-black" style={{ color: 'var(--brand-navy)' }}>DTMB Exclusive Research Volumes</h2>
                <p className="text-[12px] mt-0.5" style={{ color: 'var(--brand-muted)' }}>Proprietary research from DigitalQatalyst</p>
              </div>
              <div className="flex-1 h-px ml-4" style={{ background: 'var(--brand-border)' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDtmb.map(book => <BookCard key={book.id} book={book} onOpen={setOpenBook} />)}
            </div>
          </section>
        )}

        {/* ── Recommended reading ── */}
        {filteredExternal.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div>
                <h2 className="text-[17px] font-black" style={{ color: 'var(--brand-navy)' }}>Recommended Reading</h2>
                <p className="text-[12px] mt-0.5" style={{ color: 'var(--brand-muted)' }}>Essential books curated by the DTMI research team</p>
              </div>
              <div className="flex-1 h-px ml-4" style={{ background: 'var(--brand-border)' }} />
              <span className="text-[12px] shrink-0" style={{ color: 'var(--brand-muted)' }}>{filteredExternal.length} books</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExternal.map(book => <BookCard key={book.id} book={book} onOpen={setOpenBook} />)}
            </div>
          </section>
        )}

        {/* ── Subscribe banner ── */}
        <div className="rounded-sm overflow-hidden border" style={{ borderColor: 'var(--brand-border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 p-8" style={{ background: 'var(--brand-navy)' }}>
              <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>DTMI Intelligence Subscription</p>
              <h3 className="text-white text-[20px] font-black mb-2">Unlock every DTMB volume and research report</h3>
              <p className="text-[14px] leading-relaxed mb-5" style={{ color: '#94a3b8' }}>
                Subscribe to DTMI Intelligence for full access to all DTMB exclusive volumes, 50+ research reports, the Intelligence Feed, and the AI Insight Engine.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 rounded-sm text-white font-black text-[13px] uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ background: 'var(--brand-orange)' }}>
                  Subscribe Now
                </button>
                <button onClick={onSignIn} className="px-6 py-3 rounded-sm font-black text-[13px] uppercase tracking-wide border border-white/20 text-white hover:bg-white/5 transition-colors">
                  Sign In
                </button>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center gap-3" style={{ background: '#0a1628' }}>
              {['All DTMB exclusive volumes', '50+ research reports & whitepapers', 'Real-time Intelligence Feed', 'AI Insight Engine access', 'Weekly executive briefing'].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-[13px]" style={{ color: '#e2e8f0' }}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[9px] font-black text-white" style={{ background: 'var(--brand-orange)' }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
