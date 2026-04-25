import { useState } from 'react';
import { sixDFramework, severityBadge } from '../data/mockData';
import { TrendingUp, Building2, Brain, Layers, Shield, BarChart2, Clock, ArrowRight } from 'lucide-react';
import { useNav } from '../context/NavContext';
import PageSearch from '../components/PageSearch';

const iconMap = { TrendingUp, Building2, Brain, Layers, Shield, BarChart2 };

function SeverityDot({ level }) {
  const s = severityBadge[level];
  return <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.text }} />;
}

export default function SixDFramework() {
  const [activePillar, setActivePillar] = useState(sixDFramework.pillars[0]);
  const [searchQuery, setSearchQuery]   = useState('');
  const { openArticle } = useNav();

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-[#1a1a1a]">
          <h1 className="text-white text-2xl font-black uppercase tracking-wide mb-1">6xD Framework</h1>
          <p className="text-[#666] text-[12px]">
            DTMI's six-pillar model for digital transformation — Economy 4.0, DCO, AI-Driven Organizations, Digital Business Platforms, Cyber Resilience, and Data & Intelligence
          </p>
        </div>

        {/* Pillar selector — horizontal cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {sixDFramework.pillars.map(pillar => {
            const Icon = iconMap[pillar.icon];
            const isActive = activePillar.id === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => { setActivePillar(pillar); setSearchQuery(''); }}
                className={`p-3 border text-left transition-all duration-150 group ${
                  isActive
                    ? 'border-[#cc0000]/60 bg-[#cc0000]/5'
                    : 'border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#333]'
                }`}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-sm mb-2"
                  style={{ background: pillar.color + '22', border: `1px solid ${pillar.color}44` }}
                >
                  {Icon && <Icon size={15} style={{ color: pillar.color }} />}
                </div>
                <p className="text-[#555] text-[9px] font-black uppercase tracking-wider">{pillar.code}</p>
                <p className={`text-[12px] font-black leading-tight mt-0.5 ${isActive ? 'text-white' : 'text-[#888] group-hover:text-white'} transition-colors`}>
                  {pillar.name}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active pillar detail */}
        {activePillar && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left: pillar info */}
            <div className="space-y-4">
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-5">
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-sm"
                    style={{ background: activePillar.color + '22', border: `1px solid ${activePillar.color}44` }}
                  >
                    {iconMap[activePillar.icon] && (() => {
                      const Icon = iconMap[activePillar.icon];
                      return <Icon size={18} style={{ color: activePillar.color }} />;
                    })()}
                  </div>
                  <div>
                    <p className="text-[#555] text-[10px] font-black uppercase tracking-wider">{activePillar.code}</p>
                    <h2 className="text-white text-[16px] font-black">{activePillar.name}</h2>
                  </div>
                </div>

                <p className="text-[#cc0000] text-[11px] font-bold italic mb-3">"{activePillar.tagline}"</p>
                <p className="text-[#888] text-[12px] leading-relaxed mb-4">{activePillar.description}</p>

                {/* Key stat */}
                <div
                  className="p-3 border text-center"
                  style={{ borderColor: activePillar.color + '44', background: activePillar.color + '11' }}
                >
                  <div className="text-3xl font-black" style={{ color: activePillar.color }}>
                    {activePillar.stat}
                  </div>
                  <div className="text-[#666] text-[10px] mt-1">{activePillar.statLabel}</div>
                </div>
              </div>

              {/* All pillars quick nav */}
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-4">
                <p className="text-[#444] text-[10px] font-black uppercase tracking-wider mb-3">All Pillars</p>
                {sixDFramework.pillars.map(p => {
                  const Icon = iconMap[p.icon];
                  return (
                    <button
                      key={p.id}
                      onClick={() => { setActivePillar(p); setSearchQuery(''); }}
                      className={`w-full flex items-center gap-2 py-2 border-b border-[#111] last:border-0 text-left transition-colors ${
                        activePillar.id === p.id ? 'text-white' : 'text-[#555] hover:text-white'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.color }} />
                      <span className="text-[10px] font-black">{p.code}</span>
                      <span className="text-[11px]">{p.name}</span>
                      {activePillar.id === p.id && <ArrowRight size={10} className="ml-auto text-[#cc0000]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: articles */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#1a1a1a]">
                <h3 className="text-white text-[13px] font-black uppercase tracking-wide">
                  Latest: {activePillar.name}
                </h3>
                <button className="text-[#cc0000] text-[11px] font-bold hover:underline">See all →</button>
              </div>

              {/* Search bar */}
              <PageSearch
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={`Search ${activePillar.name} articles...`}
                resultCount={searchQuery ? activePillar.articles.filter(a =>
                  a.title.toLowerCase().includes(searchQuery.toLowerCase())
                ).length : undefined}
                totalCount={activePillar.articles.length}
                dark
              />

              {activePillar.articles
                .filter(article => !searchQuery || article.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((article, i) => {
                const s = severityBadge[article.severity];
                return (
                  <div
                    key={i}
                    onClick={() => openArticle({ id: `6xd-${activePillar.id}-${i}`, headline: article.title, summary: activePillar.description, category: activePillar.name.toUpperCase(), image: '', author: 'DTMI Research', timestamp: article.timestamp, readTime: article.readTime })}
                    className="bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#cc0000]/30 transition-colors cursor-pointer group p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <SeverityDot level={article.severity} />
                          <span
                            className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-sm"
                            style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
                          >
                            {article.severity}
                          </span>
                          <span className="text-[#444] text-[10px]">{article.readTime} read</span>
                        </div>
                        <h4 className="text-white text-[14px] font-bold leading-snug group-hover:text-[#ccc] transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-[#444] text-[10px]">
                          <Clock size={9} />
                          <span>{article.timestamp}</span>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-[#333] group-hover:text-[#cc0000] transition-colors shrink-0 mt-1" />
                    </div>
                  </div>
                );
              })}

              {/* DTMI AI insight for this pillar */}
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#cc0000] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    AI Insight
                  </span>
                </div>
                <p className="text-[#aaa] text-[12px] leading-relaxed">
                  <strong className="text-white">{activePillar.name}</strong> is one of the highest-priority transformation pillars in Q2 2026.
                  Organizations that have fully adopted this framework report{' '}
                  <strong style={{ color: activePillar.color }}>{activePillar.stat}</strong> {activePillar.statLabel.toLowerCase()}.
                  {' '}The DTMI AI Engine recommends prioritizing this pillar in your next executive strategy review.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
