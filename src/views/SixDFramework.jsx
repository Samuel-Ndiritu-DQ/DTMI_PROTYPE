import { useState } from 'react';
import { sixDFramework, severityBadge } from '../data/mockData';
import { TrendingUp, Building2, Brain, Layers, Shield, BarChart2, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { useNav } from '../context/NavContext';
import PageSearch from '../components/PageSearch';
import SectionNav from '../components/SectionNav';

const iconMap = { TrendingUp, Building2, Brain, Layers, Shield, BarChart2 };
const sevColors = { Critical: '#ef4444', High: '#f59e0b', Medium: '#06b6d4', Low: '#10b981' };

export default function SixDFramework({ onNavigate }) {
  const [activePillar, setActivePillar] = useState(sixDFramework.pillars[0]);
  const [searchQuery, setSearchQuery]   = useState('');
  const { openArticle } = useNav();

  const filteredArticles = activePillar.articles.filter(a =>
    !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">

      {/* Hero */}
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
            DTMI Intelligence Framework
          </p>
          <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
            The 6xD Framework
          </h1>
          <p className="text-[14px] leading-relaxed max-w-[600px]" style={{ color: '#94a3b8' }}>
            DTMI's six-pillar model for digital transformation â€” the strategic architecture that defines how organizations compete, operate, and lead in Economy 4.0.
          </p>
        </div>
      </div>

      {/* Section nav with Glossary link */}
      {onNavigate && <SectionNav activeKey="6xD Framework" onNavigate={onNavigate} />}

      {/* Pillar tab bar */}
      <div style={{ background: 'var(--brand-navy)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex overflow-x-auto">
            {sixDFramework.pillars.map(pillar => {
              const Icon = iconMap[pillar.icon];
              const isActive = activePillar.id === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => { setActivePillar(pillar); setSearchQuery(''); }}
                  className="flex items-center gap-2 px-5 py-4 text-[12px] font-bold whitespace-nowrap border-b-2 transition-all shrink-0"
                  style={{ borderColor: isActive ? pillar.color : 'transparent', color: isActive ? 'white' : '#64748b' }}
                >
                  {Icon && <Icon size={13} style={{ color: isActive ? pillar.color : '#64748b' }} />}
                  <span className="text-[10px] font-black uppercase tracking-wider mr-1" style={{ color: isActive ? pillar.color : '#475569' }}>{pillar.code}</span>
                  {pillar.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      {activePillar && (
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Sidebar */}
            <aside className="space-y-5">
              <div className="rounded-sm border overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
                <div className="px-5 py-5" style={{ background: activePillar.color }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center bg-white/20">
                      {(() => { const Icon = iconMap[activePillar.icon]; return Icon ? <Icon size={18} className="text-white" /> : null; })()}
                    </div>
                    <div>
                      <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">{activePillar.code}</p>
                      <h2 className="text-white text-[17px] font-black leading-tight">{activePillar.name}</h2>
                    </div>
                  </div>
                  <p className="text-white/80 text-[12px] italic">"{activePillar.tagline}"</p>
                </div>
                <div className="p-5 bg-white">
                  <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'var(--brand-muted)' }}>{activePillar.description}</p>
                  <div className="rounded-sm p-4 text-center border" style={{ background: activePillar.color + '0d', borderColor: activePillar.color + '33' }}>
                    <p className="text-[32px] font-black leading-none mb-1" style={{ color: activePillar.color }}>{activePillar.stat}</p>
                    <p className="text-[11px] font-semibold" style={{ color: 'var(--brand-muted)' }}>{activePillar.statLabel}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>All 6 Pillars</p>
                {sixDFramework.pillars.map(p => {
                  const isActive = activePillar.id === p.id;
                  return (
                    <button key={p.id} onClick={() => { setActivePillar(p); setSearchQuery(''); }}
                      className="w-full flex items-center gap-3 py-2.5 border-b last:border-0 text-left transition-colors"
                      style={{ borderColor: 'var(--brand-border)' }}>
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                      <span className="text-[10px] font-black uppercase tracking-wider w-6 shrink-0" style={{ color: p.color }}>{p.code}</span>
                      <span className="text-[12px] font-semibold flex-1" style={{ color: isActive ? 'var(--brand-navy)' : 'var(--brand-muted)' }}>{p.name}</span>
                      {isActive && <ChevronRight size={12} style={{ color: 'var(--brand-orange)' }} />}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Articles */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b-2" style={{ borderColor: activePillar.color }}>
                <h3 className="text-[15px] font-black" style={{ color: 'var(--brand-navy)' }}>
                  Latest Intelligence Â· {activePillar.name}
                </h3>
                <span className="text-[11px]" style={{ color: 'var(--brand-muted)' }}>{filteredArticles.length} articles</span>
              </div>

              <PageSearch value={searchQuery} onChange={setSearchQuery}
                placeholder={`Search ${activePillar.name} articles...`}
                resultCount={searchQuery ? filteredArticles.length : undefined}
                totalCount={activePillar.articles.length} />

              <div className="space-y-3">
                {filteredArticles.length > 0 ? filteredArticles.map((article, i) => (
                  <div key={i}
                    onClick={() => openArticle({ id: `6xd-${activePillar.id}-${i}`, headline: article.title, summary: activePillar.description, category: activePillar.name.toUpperCase(), image: '', author: 'DTMI Research', timestamp: article.timestamp, readTime: article.readTime })}
                    className="bg-white border rounded-sm p-4 cursor-pointer group card-hover" style={{ borderColor: 'var(--brand-border)' }}>
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-sm"
                            style={{ background: sevColors[article.severity] + '18', color: sevColors[article.severity], border: `1px solid ${sevColors[article.severity]}33` }}>
                            {article.severity}
                          </span>
                          <span className="text-[10px] flex items-center gap-1" style={{ color: 'var(--brand-muted)' }}>
                            <Clock size={9} /> {article.readTime} read
                          </span>
                          <span className="text-[10px]" style={{ color: 'var(--brand-muted)' }}>{article.timestamp}</span>
                        </div>
                        <h4 className="text-[14px] font-bold leading-snug group-hover:opacity-70 transition-opacity" style={{ color: 'var(--brand-navy)' }}>
                          {article.title}
                        </h4>
                      </div>
                      <ArrowRight size={15} className="shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" style={{ color: 'var(--brand-orange)' }} />
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10">
                    <p className="text-[13px]" style={{ color: 'var(--brand-muted)' }}>No articles match your search.</p>
                  </div>
                )}
              </div>

              {/* AI Insight */}
              <div className="rounded-sm border p-5" style={{ background: 'var(--brand-navy)', borderColor: 'rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-sm text-white" style={{ background: 'var(--brand-orange)' }}>AI Insight</span>
                  <span className="text-[11px]" style={{ color: '#64748b' }}>DTMI Intelligence Engine</span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: '#94a3b8' }}>
                  <span className="text-white font-semibold">{activePillar.name}</span> is a high-priority transformation pillar in Q2 2026.
                  Organizations that have fully adopted this framework report{' '}
                  <span className="font-bold" style={{ color: activePillar.color }}>{activePillar.stat}</span>{' '}
                  {activePillar.statLabel.toLowerCase()}. The DTMI AI Engine recommends prioritizing this pillar in your next executive strategy review.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

