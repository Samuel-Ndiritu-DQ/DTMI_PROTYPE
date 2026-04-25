import { useState } from 'react';
import { glossaryTerms, glossaryCategories } from '../data/glossaryData';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import PageSearch from '../components/PageSearch';

const catColors = {
  'Digital Economy': '#8b5cf6', 'DCO': '#0a7ea4', 'AI & Automation': '#10b981',
  'Cybersecurity': '#ef4444', 'Cloud': '#06b6d4', 'Technology': '#e8500a',
  'Governance': '#f59e0b', 'Future of Work': '#ec4899',
};

function TermCard({ term }) {
  const [expanded, setExpanded] = useState(false);
  const color = catColors[term.category] || 'var(--brand-orange)';
  return (
    <div className="bg-white border rounded-sm overflow-hidden card-hover" style={{ borderColor: 'var(--brand-border)' }}>
      <div className="flex items-start gap-3 p-4 cursor-pointer" onClick={() => setExpanded(e => !e)}>
        <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: color, minHeight: '20px' }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[14px] font-black leading-snug" style={{ color: 'var(--brand-navy)' }}>{term.term}</h3>
              <span className="inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm mt-1"
                style={{ background: color + '18', color }}>
                {term.category}
              </span>
            </div>
            <span className="shrink-0 mt-0.5" style={{ color: 'var(--brand-muted)' }}>
              {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </span>
          </div>
          {!expanded && (
            <p className="text-[12px] leading-relaxed mt-2 line-clamp-2" style={{ color: 'var(--brand-muted)' }}>
              {term.definition}
            </p>
          )}
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 ml-4">
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--brand-dark)' }}>{term.definition}</p>
        </div>
      )}
    </div>
  );
}

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery]       = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = glossaryTerms.filter(t => {
    const catOk    = activeCategory === 'All' || t.category === activeCategory;
    const q        = searchQuery.toLowerCase();
    const searchOk = !searchQuery ||
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return catOk && searchOk;
  });

  const grouped = filtered.reduce((acc, term) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {});
  const letters = Object.keys(grouped).sort();

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">

      {/* Hero */}
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
            DTMI Reference
          </p>
          <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
            Glossary of Digital Transformation Terms
          </h1>
          <p className="text-[14px] leading-relaxed max-w-[600px]" style={{ color: '#94a3b8' }}>
            The definitive reference for Economy 4.0, DCO, AI, cybersecurity, cloud, and digital platform terminology — curated by the DTMI Research Desk.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-[13px]" style={{ color: '#64748b' }}>
            <span className="flex items-center gap-1.5"><BookOpen size={13} /> {glossaryTerms.length} terms defined</span>
            <span>{glossaryCategories.length - 1} categories</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8">

        {/* Search */}
        <div className="w-full mb-6">
          <PageSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search terms, definitions, categories..."
            resultCount={searchQuery ? filtered.length : undefined}
            totalCount={glossaryTerms.length}
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {glossaryCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="text-[11px] font-semibold px-3 py-1.5 rounded-sm border transition-colors"
              style={{
                background: activeCategory === cat ? (catColors[cat] || 'var(--brand-navy)') : 'white',
                color: activeCategory === cat ? 'white' : 'var(--brand-muted)',
                borderColor: activeCategory === cat ? (catColors[cat] || 'var(--brand-navy)') : 'var(--brand-border)',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* A–Z letter index */}
        {!searchQuery && letters.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-8 p-4 rounded-sm border bg-white" style={{ borderColor: 'var(--brand-border)' }}>
            {letters.map(l => (
              <a key={l} href={`#letter-${l}`}
                className="w-7 h-7 flex items-center justify-center rounded-sm text-[12px] font-black transition-colors"
                style={{ background: 'var(--brand-light)', color: 'var(--brand-navy)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-orange)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--brand-light)'; e.currentTarget.style.color = 'var(--brand-navy)'; }}>
                {l}
              </a>
            ))}
          </div>
        )}

        {/* Terms grouped by letter */}
        {letters.length > 0 ? (
          <div className="space-y-10">
            {letters.map(letter => (
              <section key={letter} id={`letter-${letter}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-9 rounded-sm flex items-center justify-center text-white font-black text-[16px] shrink-0"
                    style={{ background: 'var(--brand-navy)' }}>
                    {letter}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'var(--brand-border)' }} />
                  <span className="text-[11px]" style={{ color: 'var(--brand-muted)' }}>
                    {grouped[letter].length} term{grouped[letter].length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {grouped[letter].map((term, i) => <TermCard key={i} term={term} />)}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[14px]" style={{ color: 'var(--brand-muted)' }}>
              No terms match "<strong style={{ color: 'var(--brand-navy)' }}>{searchQuery}</strong>"
            </p>
            <button onClick={() => setSearchQuery('')}
              className="mt-3 text-[13px] font-bold hover:opacity-70 transition-opacity"
              style={{ color: 'var(--brand-orange)' }}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
