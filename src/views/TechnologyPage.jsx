import { useState } from 'react';
import { insightCards, emergingTech, topStories } from '../data/mockData';
import { Layers, Monitor, Users, BarChart2, Shield, ChevronRight } from 'lucide-react';
import { useNav } from '../context/NavContext';
import StoryCard from '../components/StoryCard';
import PageSearch from '../components/PageSearch';
import SectionLabel from '../components/SectionLabel';
import SectionNav from '../components/SectionNav';

const PLATFORMS = [
  {
    code: 'DXP', name: 'Digital Experience Platform', color: '#8b5cf6', icon: Monitor,
    tagline: 'Every touchpoint. Every channel. One platform.',
    desc: 'The DXP layer manages all customer and employee-facing digital interactions - web, mobile, IoT, and beyond. It powers personalization, content delivery, and omnichannel experience orchestration.',
    stat: '$180B', statLabel: 'Global DBP market 2026',
    capabilities: ['Digital Channels', 'Digital Experience', 'Digital Services', 'Digital MarCom'],
    keywords: ['experience', 'channel', 'digital', 'customer', 'marcom', 'personalization', 'omnichannel'],
  },
  {
    code: 'DWS', name: 'Digital Workspace Platform', color: '#0a7ea4', icon: Users,
    tagline: 'The operating system of the modern enterprise.',
    desc: 'The DWS layer powers internal operations, collaboration, and productivity - including ERP, HRMS, collaboration tools, and back-office systems.',
    stat: '67%', statLabel: 'Fortune 500 cloud migration complete',
    capabilities: ['Digital Workspace', 'Digital Core (ERP)', 'Digital GPRC', 'Digital Back Office'],
    keywords: ['workspace', 'erp', 'workforce', 'worker', 'talent', 'collaboration', 'productivity', 'cloud'],
  },
  {
    code: 'DIA', name: 'Digital Intelligence & Analytics', color: '#10b981', icon: BarChart2,
    tagline: 'From data lakes to decision engines.',
    desc: 'The DIA layer transforms raw data into actionable intelligence - covering data architecture, advanced analytics, AI/ML models, and real-time decision engines.',
    stat: '61%', statLabel: 'Enterprise AI adoption rate Q1 2026',
    capabilities: ['Digital Analytics', 'Digital Intelligence (AI)'],
    keywords: ['ai', 'analytics', 'data', 'intelligence', 'automation', 'machine', 'generative', 'adoption'],
  },
  {
    code: 'SDO', name: 'Secure Digital Operations', color: '#ef4444', icon: Shield,
    tagline: 'Security, cloud, and interoperability as infrastructure.',
    desc: 'The SDO layer provides the foundational cloud infrastructure, cybersecurity, and interoperability services that underpin all other platform layers.',
    stat: '74%', statLabel: 'Enterprises requiring zero-trust',
    capabilities: ['Digital IT (Cloud)', 'Digital Interoperability', 'Digital Security'],
    keywords: ['security', 'cyber', 'cloud', 'zero-trust', 'infrastructure', 'ransomware', 'breach', 'finops'],
  },
];

// All available content pool
const ALL_CONTENT = [...topStories, ...emergingTech, ...insightCards.map(c => ({
  ...c, headline: c.title, image: c.image || '',
}))];

function getStoriesForPlatform(platform, query) {
  const kw = platform.keywords;
  return ALL_CONTENT.filter(s => {
    const text = `${s.headline || s.title || ''} ${s.category || ''} ${s.summary || ''}`.toLowerCase();
    const matchesPlatform = kw.some(k => text.includes(k));
    if (!query) return matchesPlatform;
    const q = query.toLowerCase();
    return matchesPlatform && text.includes(q);
  }).slice(0, 6);
}

export default function TechnologyPage({ onNavigate }) {
  const [activePlatform, setActivePlatform] = useState(PLATFORMS[0]);
  const [searchQuery, setSearchQuery]       = useState('');
  const { openArticle } = useNav();

  const stories = getStoriesForPlatform(activePlatform, searchQuery);
  const totalForPlatform = getStoriesForPlatform(activePlatform, '').length;
  const Icon = activePlatform.icon;

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">

      {/* Hero */}
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
            DTMI Technology Intelligence
          </p>
          <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
            Digital Business Platforms
          </h1>
          <p className="text-[14px] leading-relaxed max-w-[600px]" style={{ color: '#94a3b8' }}>
            The four-platform architecture model that powers Economy 4.0 organizations - DXP, DWS, DIA, and SDO. Each layer is distinct, composable, and designed for enterprise scale.
          </p>
        </div>
      </div>

      {/* Section nav with Glossary link */}
      {onNavigate && <SectionNav activeKey="Technology" onNavigate={onNavigate} />}

      {/* Platform tab bar */}
      <div style={{ background: 'var(--brand-navy)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex overflow-x-auto">
            {PLATFORMS.map(p => {
              const PIcon = p.icon;
              const isActive = activePlatform.code === p.code;
              return (
                <button key={p.code}
                  onClick={() => { setActivePlatform(p); setSearchQuery(''); }}
                  className="flex items-center gap-2 px-5 py-4 text-[12px] font-bold whitespace-nowrap border-b-2 transition-all shrink-0"
                  style={{ borderColor: isActive ? p.color : 'transparent', color: isActive ? 'white' : '#64748b' }}>
                  <PIcon size={13} style={{ color: isActive ? p.color : '#64748b' }} />
                  <span className="text-[10px] font-black uppercase tracking-wider mr-1" style={{ color: isActive ? p.color : '#475569' }}>{p.code}</span>
                  <span className="hidden sm:inline">{p.name.split(' ').slice(0, 2).join(' ')}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Platform card */}
            <div className="rounded-sm border overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
              <div className="px-5 py-5" style={{ background: activePlatform.color }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center bg-white/20">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">Platform · {activePlatform.code}</p>
                    <h2 className="text-white text-[15px] font-black leading-tight">{activePlatform.name}</h2>
                  </div>
                </div>
                <p className="text-white/80 text-[12px] italic">"{activePlatform.tagline}"</p>
              </div>
              <div className="p-5 bg-white">
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'var(--brand-muted)' }}>{activePlatform.desc}</p>
                <div className="rounded-sm p-4 text-center border" style={{ background: activePlatform.color + '0d', borderColor: activePlatform.color + '33' }}>
                  <p className="text-[32px] font-black leading-none mb-1" style={{ color: activePlatform.color }}>{activePlatform.stat}</p>
                  <p className="text-[11px] font-semibold" style={{ color: 'var(--brand-muted)' }}>{activePlatform.statLabel}</p>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>
                {activePlatform.code} Capabilities
              </p>
              {activePlatform.capabilities.map((cap, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-0" style={{ borderColor: 'var(--brand-border)' }}>
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: activePlatform.color }} />
                  <span className="text-[12px] font-semibold" style={{ color: 'var(--brand-navy)' }}>{cap}</span>
                </div>
              ))}
            </div>

            {/* All platforms nav */}
            <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>All Platforms</p>
              {PLATFORMS.map(p => {
                const PIcon = p.icon;
                const isActive = activePlatform.code === p.code;
                return (
                  <button key={p.code} onClick={() => { setActivePlatform(p); setSearchQuery(''); }}
                    className="w-full flex items-center gap-3 py-2.5 border-b last:border-0 text-left transition-colors"
                    style={{ borderColor: 'var(--brand-border)' }}>
                    <PIcon size={13} style={{ color: p.color }} className="shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-wider w-8 shrink-0" style={{ color: p.color }}>{p.code}</span>
                    <span className="text-[12px] font-semibold flex-1" style={{ color: isActive ? 'var(--brand-navy)' : 'var(--brand-muted)' }}>{p.name}</span>
                    {isActive && <ChevronRight size={12} style={{ color: 'var(--brand-orange)' }} />}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <PageSearch value={searchQuery} onChange={setSearchQuery}
              placeholder={`Search ${activePlatform.code} intelligence...`}
              resultCount={searchQuery ? stories.length : undefined}
              totalCount={totalForPlatform} />

            <div>
              <SectionLabel title={`Latest: ${activePlatform.name}`} count={stories.length} />
              {stories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {stories.map(story => (
                    <div key={story.id} onClick={() => openArticle(story)} className="cursor-pointer">
                      <StoryCard story={story} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-sm border" style={{ borderColor: 'var(--brand-border)' }}>
                  <p className="text-[13px]" style={{ color: 'var(--brand-muted)' }}>
                    {searchQuery ? `No results for "${searchQuery}"` : `No articles yet for ${activePlatform.name}`}
                  </p>
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="mt-2 text-[12px] font-bold" style={{ color: 'var(--brand-orange)' }}>Clear search</button>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
