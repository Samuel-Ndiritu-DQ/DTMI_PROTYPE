import { useState } from 'react';
import { insightCards, insightCategories, severityBadge } from '../data/mockData';
import { Search, Clock, Tag, Bookmark, ExternalLink, Star } from 'lucide-react';
import { useNav } from '../context/NavContext';

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
      className="bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#cc0000]/40 transition-all duration-200 cursor-pointer group flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 flex gap-1.5">
          <SeverityPill level={card.severity} />
          {card.recommended && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-[#cc0000] text-white rounded-sm">
              <Star size={7} fill="white" /> Recommended
            </span>
          )}
        </div>
        <button className="absolute top-2 right-2 p-1 bg-black/60 text-[#888] hover:text-white rounded-sm transition-colors">
          <Bookmark size={11} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-black uppercase tracking-wider ${cc}`}>{card.category}</span>
        </div>
        <h3 className="text-white text-[13px] font-bold leading-snug group-hover:text-[#ccc] transition-colors line-clamp-2">
          {card.title}
        </h3>
        <p className="text-[#666] text-[11px] leading-relaxed line-clamp-2 flex-1">{card.summary}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {card.tags.map(tag => (
            <span key={tag} className="flex items-center gap-0.5 text-[9px] text-[#555] bg-[#111] border border-[#1a1a1a] px-1.5 py-0.5 rounded-sm">
              <Tag size={7} /> {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-2 text-[#444] text-[10px]">
            <span className="flex items-center gap-1"><Clock size={8} /> {card.timestamp}</span>
            <span>· {card.readTime}</span>
          </div>
          <button className="text-[#444] hover:text-[#cc0000] transition-colors">
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
    const matchCat  = activeCategory === 'All' || card.category === activeCategory;
    const matchSearch = !searchQuery ||
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRec  = !showRecommended || card.recommended;
    return matchCat && matchSearch && matchRec;
  });

  const sevOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  const sorted = [...filtered].sort((a, b) =>
    sortBy === 'severity' ? sevOrder[a.severity] - sevOrder[b.severity] : 0
  );

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-[#1a1a1a]">
          <h1 className="text-white text-2xl font-black uppercase tracking-wide mb-1">Insight Cards</h1>
          <p className="text-[#666] text-[12px]">Curated intelligence — filtered, personalized, and severity-ranked</p>
        </div>

        {/* AI Personalization Banner */}
        <div className="bg-[#0d0d0d] border border-[#cc0000]/30 p-4 mb-6 flex items-start gap-3">
          <div className="shrink-0 bg-[#cc0000] text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider rounded-sm mt-0.5">
            AI
          </div>
          <div>
            <p className="text-white text-[13px] font-bold mb-0.5">Personalized for You</p>
            <p className="text-[#888] text-[12px]">
              Based on your recent interest in AI-driven transformations, we recommend reading:{' '}
              <button className="text-[#cc0000] font-bold hover:underline">
                "AI Integration in the Digital Workplace"
              </button>
              {' '}and{' '}
              <button className="text-[#cc0000] font-bold hover:underline">
                "AI's Role in Shaping the Future of Work"
              </button>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
            <input
              type="text"
              placeholder="Search insights..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-[#222] text-white text-[12px] pl-8 pr-4 py-2 focus:outline-none focus:border-[#cc0000] transition-colors placeholder-[#444]"
            />
          </div>
          {/* Recommended toggle */}
          <button
            onClick={() => setShowRecommended(r => !r)}
            className={`flex items-center gap-2 px-3 py-2 border text-[11px] font-bold uppercase tracking-wide transition-colors ${
              showRecommended
                ? 'bg-[#cc0000] border-[#cc0000] text-white'
                : 'border-[#222] text-[#666] hover:text-white hover:border-[#444]'
            }`}
          >
            <Star size={12} /> Recommended Only
          </button>
          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-[#111] border border-[#222] text-[#888] text-[11px] px-3 py-2 focus:outline-none focus:border-[#cc0000] transition-colors"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="severity">Sort: Severity</option>
          </select>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1.5 flex-wrap mb-6">
          {insightCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wide border transition-colors ${
                activeCategory === cat
                  ? 'bg-[#cc0000] border-[#cc0000] text-white'
                  : 'border-[#222] text-[#666] hover:text-white hover:border-[#444]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-[#444] text-[11px] mb-4">{sorted.length} insights found</p>

        {/* Cards grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sorted.map((card, i) => (
              <InsightCard key={card.id} card={card} delay={i * 50} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#333]">
            <Search size={36} className="mx-auto mb-3 opacity-30" />
            <p className="text-[13px]">No insights match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
