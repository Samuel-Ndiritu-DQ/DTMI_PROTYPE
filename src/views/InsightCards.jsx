import { useState } from 'react';
import { insightCards, insightCategories, severityBadge } from '../data/mockData';
import { Clock, Tag, Bookmark, ExternalLink, Star } from 'lucide-react';
import PageSearch from '../components/PageSearch';

const catColor = {
  AI:               'text-violet-400',
  Cloud:            'text-sky-400',
  Cybersecurity:    'text-red-400',
  'Digital Economy':'text-emerald-400',
  DCO:              'text-cyan-400',
  Governance:       'text-amber-400',
  'Emerging Tech':  'text-pink-400',
};

function SeverityPill({ level }) {
  const s = severityBadge[level];
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider border rounded-sm"
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
    >
      {level}
    </span>
  );
}

function InsightCard({ card, delay }) {
  const { openArticle } = useNav();
  const cc = catColor[card.category] || 'text-slate-400';
  return (
    <div
      onClick={() => openArticle({ ...card, headline: card.title })}
      className="bg-white border rounded-sm overflow-hidden card-hover cursor-pointer group flex flex-col"
      style={{ borderColor: 'var(--brand-border)' }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400" loading="lazy" />
        <div className="absolute top-2 left-2 flex gap-1.5">
          <SeverityPill level={card.severity} />
          {card.recommended && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-sm text-white" style={{ background: 'var(--brand-orange)' }}>
              <Star size={7} fill="white" /> Recommended
            </span>
          )}
        </div>
        <button className="absolute top-2 right-2 p-1 bg-black/50 rounded-sm transition-colors hover:bg-black/70" style={{ color: 'white' }}>
          <Bookmark size={11} />
        </button>
      </div>
      <div className="p-3 flex flex-col flex-1 gap-2">
        <span className={`text-[10px] font-black uppercase tracking-wider ${cc}`}>{card.category}</span>
        <h3 className="text-[13px] font-bold leading-snug group-hover:opacity-70 transition-opacity line-clamp-2" style={{ color: 'var(--brand-navy)' }}>
          {card.title}
        </h3>
        <p className="text-[11px] leading-relaxed line-clamp-2 flex-1" style={{ color: 'var(--brand-muted)' }}>{card.summary}</p>
        <div className="flex flex-wrap gap-1">
          {card.tags.map(tag => (
            <span key={tag} className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-sm border" style={{ color: 'var(--brand-muted)', borderColor: 'var(--brand-border)' }}>
              <Tag size={7} /> {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--brand-border)' }}>
          <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--brand-muted)' }}>
            <span className="flex items-center gap-1"><Clock size={8} /> {card.timestamp}</span>
            <span>· {card.readTime}</span>
          </div>
          <button className="hover:opacity-70 transition-opacity" style={{ color: 'var(--brand-muted)' }}>
            <ExternalLink size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InsightCards() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery]       = useState('');
  const [showRecommended, setShowRecommended] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const filtered = insightCards.filter(card => {
    const matchCat    = activeCategory === 'All' || card.category === activeCategory;
    const q           = searchQuery.toLowerCase();
    const matchSearch = !searchQuery ||
      card.title.toLowerCase().includes(q) ||
      card.summary.toLowerCase().includes(q) ||
      card.category.toLowerCase().includes(q) ||
      card.tags?.some(t => t.toLowerCase().includes(q));
    const matchRec    = !showRecommended || card.recommended;
    return matchCat && matchSearch && matchRec;
  });

  const sevOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  const sorted = [...filtered].sort((a, b) =>
    sortBy === 'severity' ? sevOrder[a.severity] - sevOrder[b.severity] : 0
  );

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>DTMI Intelligence</p>
          <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-2">Insight Cards</h1>
          <p className="text-[14px]" style={{ color: '#94a3b8' }}>Curated intelligence - filtered, personalized, and severity-ranked</p>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 py-6">

        {/* AI Personalization Banner */}
        <div className="border rounded-sm p-4 mb-6 flex items-start gap-3" style={{ background: '#fff7ed', borderColor: 'var(--brand-orange)' }}>
          <div className="shrink-0 text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider rounded-sm mt-0.5" style={{ background: 'var(--brand-orange)' }}>
            AI
          </div>
          <div>
            <p className="text-[13px] font-bold mb-0.5" style={{ color: 'var(--brand-navy)' }}>Personalized for You</p>
            <p className="text-[12px]" style={{ color: 'var(--brand-muted)' }}>
              Based on your recent interest in AI-driven transformations, we recommend:{' '}
              <button className="font-bold hover:underline" style={{ color: 'var(--brand-orange)' }}>
                "AI Integration in the Digital Workplace"
              </button>
              {' '}and{' '}
              <button className="font-bold hover:underline" style={{ color: 'var(--brand-orange)' }}>
                "AI's Role in Shaping the Future of Work"
              </button>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 mb-4">
          {/* Search bar - 70% wide, centred */}
          <PageSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search insights, topics, tags..."
            resultCount={searchQuery ? sorted.length : undefined}
            totalCount={insightCards.length}
          />
          {/* Recommended + Sort row */}
          <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setShowRecommended(r => !r)}
            className="flex items-center gap-2 px-3 py-2 border rounded-sm text-[11px] font-bold uppercase tracking-wide transition-colors"
            style={{
              background: showRecommended ? 'var(--brand-orange)' : 'white',
              borderColor: showRecommended ? 'var(--brand-orange)' : 'var(--brand-border)',
              color: showRecommended ? 'white' : 'var(--brand-muted)',
            }}
          >
            <Star size={12} /> Recommended Only
          </button>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border rounded-sm text-[11px] px-3 py-2 focus:outline-none transition-colors"
            style={{ background: 'white', borderColor: 'var(--brand-border)', color: 'var(--brand-muted)' }}
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="severity">Sort: Severity</option>
          </select>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1.5 flex-wrap mb-6">
          {insightCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide border rounded-sm transition-colors"
              style={{
                background: activeCategory === cat ? 'var(--brand-navy)' : 'white',
                color: activeCategory === cat ? 'white' : 'var(--brand-muted)',
                borderColor: activeCategory === cat ? 'var(--brand-navy)' : 'var(--brand-border)',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-[11px] mb-4" style={{ color: 'var(--brand-muted)' }}>{sorted.length} insights found</p>

        {/* Cards grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sorted.map((card, i) => (
              <InsightCard key={card.id} card={card} delay={i * 50} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20" style={{ color: 'var(--brand-muted)' }}>
            <p className="text-[13px]">No insights match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useNav } from '../context/NavContext';
