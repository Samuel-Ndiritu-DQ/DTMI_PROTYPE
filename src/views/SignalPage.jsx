import { useState } from 'react';
import { insightCards } from '../data/mockData';
import { CONTENT_CATEGORIES } from '../data/contentTypes';
import { Clock, Zap, AlertTriangle, TrendingUp, Radio, ChevronRight, Filter, Eye, FileWarning, MessageSquare } from 'lucide-react';
import { useNav } from '../context/NavContext';
import PageSearch from '../components/PageSearch';
import FilterDropdown from '../components/FilterDropdown';

const SEV_META = {
  Critical: { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', icon: AlertTriangle, label: 'CRITICAL' },
  High:     { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', icon: TrendingUp,    label: 'HIGH' },
  Medium:   { color: '#06b6d4', bg: '#f0f9ff', border: '#bae6fd', icon: Radio,         label: 'MEDIUM' },
  Low:      { color: '#10b981', bg: '#f0fdf4', border: '#bbf7d0', icon: Zap,           label: 'LOW' },
};

const SEV_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 };

function SignalRow({ item, onOpen }) {
  const s = SEV_META[item.severity] || SEV_META.Medium;
  const Icon = s.icon;
  return (
    <div
      onClick={() => onOpen({ ...item, headline: item.title })}
      className="flex items-start gap-4 px-5 py-4 border-b cursor-pointer group transition-all hover:bg-white/5"
      style={{ 
        borderColor: 'rgba(255,255,255,0.05)', 
        borderLeft: `4px solid ${s.color}`,
        background: 'rgba(255,255,255,0.02)'
      }}
    >
      {/* Severity indicator */}
      <div className="shrink-0 flex items-center gap-1.5 pt-0.5">
        <div className="relative">
          <div className="absolute inset-0 rounded-full animate-pulse" style={{ 
            background: s.color,
            opacity: 0.2,
            filter: 'blur(4px)'
          }} />
          <span
            className="relative text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm border whitespace-nowrap z-10"
            style={{ background: s.bg, color: s.color, borderColor: s.border }}
          >
            <Icon size={9} className="inline mr-1" />
            {s.label}
          </span>
        </div>
      </div>

      {/* Category */}
      <div className="shrink-0 w-28 hidden sm:block">
        <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm font-mono" style={{ 
          background: 'rgba(255,255,255,0.05)', 
          color: '#06b6d4',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {item.category}
        </span>
      </div>

      {/* Headline */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold leading-snug group-hover:opacity-80 transition-opacity line-clamp-2 font-mono" style={{ 
          color: '#ffffff'
        }}>
          {item.title}
        </p>
        <p className="text-[12px] mt-1.5 line-clamp-1 hidden md:block font-mono" style={{ 
          color: '#94a3b8'
        }}>
          {item.summary}
        </p>
      </div>

      {/* Meta */}
      <div className="shrink-0 flex items-center gap-3 text-[11px] font-mono" style={{ 
        color: '#64748b'
      }}>
        <span className="flex items-center gap-1 whitespace-nowrap">
          <Clock size={10} style={{ color: s.color }} /> 
          <span style={{ color: s.color }}>{item.timestamp}</span>
        </span>
        <span className="hidden sm:block whitespace-nowrap" style={{ color: s.color }}>{item.readTime}</span>
        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" style={{ color: s.color }} />
      </div>
    </div>
  );
}

export default function SignalPage() {
  const [searchQuery, setSearchQuery]   = useState('');
  const [activeSev, setActiveSev]       = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTypes, setActiveTypes] = useState([]);
  const { openArticle } = useNav();

  const signals = insightCards
    .filter(c => c.severity === 'High' || c.severity === 'Critical')
    .concat(insightCards.filter(c => c.severity === 'Medium' || c.severity === 'Low'))
    .sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity]);

  const categories = ['All', ...new Set(signals.map(s => s.category))];

  const typeMapping = {
    'executive-briefs': ['Executive Brief'],
    'frontier-watch': ['Frontier Watch'],
    'frontier-brief': ['Frontier Brief'],
    'rapid-insights': ['Rapid Insight'],
    'trend-alerts': ['Trend Alert']
  };

  const filtered = signals.filter(item => {
    const sevOk = activeSev === 'All' || item.severity === activeSev;
    const catOk = activeCategory === 'All' || item.category === activeCategory;
    
    // If no types selected, show all
    let typeOk = activeTypes.length === 0;
    
    // If types are selected, match them using the mapping
    if (activeTypes.length > 0 && item.type) {
      typeOk = activeTypes.some(typeId => {
        const mappedTypes = typeMapping[typeId] || [];
        return mappedTypes.includes(item.type);
      });
    }
    
    const q     = searchQuery.toLowerCase();
    const searchOk = !searchQuery ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return sevOk && catOk && typeOk && searchOk;
  });

  const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  signals.forEach(s => counts[s.severity]++);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
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
                Curated books from the world's leading thinkers on digital strategy, AI, and organizational transformation - plus exclusive DTMB research volumes from DigitalQatalyst.
              </p>
            </div>
            {/* Cover stack preview */}
            <div className="flex items-end gap-2 shrink-0">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="cursor-pointer hover:scale-105 transition-transform" 
                  style={{ 
                    transform: `rotate(${(i - 2) * 3}deg)`, 
                    zIndex: i 
                  }}
                >
                  <div className="relative rounded-lg overflow-hidden border" style={{
                    width: '60px',
                    height: '80px',
                    background: i % 2 === 0 ? 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>
                    {/* Book icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {i % 2 === 0 ? (
                        <Zap size={20} className="text-white/80" />
                      ) : (
                        <AlertTriangle size={20} className="text-white/80" />
                      )}
                    </div>
                    {/* Book label */}
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/90">
                        {i % 2 === 0 ? 'BOOK' : 'VOLUME'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8 space-y-10">

        {/* ── Search + Filter bar ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-6">
          {/* Content Type Filter */}
          <div className="lg:w-72">
            <ContentFilterV2
              activeTypes={activeTypes}
              onTypeChange={setActiveTypes}
              showContentTypeFilter={true}
              showCategoryFilter={false}
              filterCategory="executive"
            />
          </div>
          
          {/* Search Bar */}
          <div className="flex-1">
            <PageSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Scan signals, categories, topics..."
              resultCount={searchQuery ? filtered.length : undefined}
              totalCount={signals.length}
            />
          </div>
        </div>

        {/* Signal feed */}
        <div className="border rounded-lg overflow-hidden bg-white" style={{ 
          borderColor: '#e2e6ef',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div className="flex items-center justify-between px-5 py-3.5 border-b bg-gray-50" style={{ 
            borderColor: '#e2e6ef'
          }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ef4444' }} />
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#f59e0b' }} />
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#06b6d4' }} />
              </div>
              <p className="text-gray-800 text-[13px] font-black uppercase tracking-wide font-mono">
                {filtered.length} ACTIVE SIGNAL{filtered.length !== 1 ? 'S' : ''}
              </p>
            </div>
            <p className="text-[11px] font-mono text-gray-500">
              SORTED BY SEVERITY · UPDATED LIVE
            </p>
          </div>
          {filtered.length > 0 ? (
            filtered.map(item => <SignalRow key={item.id} item={item} onOpen={openArticle} />)
          ) : (
            <div className="text-center py-16">
              <p className="text-[14px] font-mono text-gray-600">
                NO SIGNALS MATCH FILTERS
              </p>
              <button onClick={() => { setSearchQuery(''); setActiveSev('All'); setActiveCategory('All'); }}
                className="mt-3 text-[13px] font-bold hover:opacity-70 transition-opacity font-mono" style={{ 
                  color: 'var(--brand-orange)'
                }}>
                CLEAR FILTERS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}