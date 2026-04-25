import { useState } from 'react';
import { insightCards, emergingTech, topStories } from '../data/mockData';
import { ChevronRight } from 'lucide-react';
import { useNav } from '../context/NavContext';
import StoryCard from '../components/StoryCard';
import PageSearch from '../components/PageSearch';
import SectionLabel from '../components/SectionLabel';
import SectionNav from '../components/SectionNav';

const SECTORS = {
  'Cross-Sector': {
    color: '#8b5cf6',
    desc: 'Transformation themes that cut across all industries — from AI adoption to digital governance.',
    items: [
      { key: 'Economy 4.0',      label: 'Economy 4.0',      desc: 'Platform economies, digital value chains, and the $4.2T GDP opportunity', keywords: ['economy', 'platform', 'gdp', 'digital economy', 'value chain'] },
      { key: 'Experience 4.0',   label: 'Experience 4.0',   desc: 'Customer and employee experience in the digital age', keywords: ['experience', 'customer', 'employee', 'cx', 'ux'] },
      { key: 'Intelligence 4.0', label: 'Intelligence 4.0', desc: 'AI-driven decision intelligence across the enterprise', keywords: ['ai', 'intelligence', 'analytics', 'data', 'automation'] },
      { key: 'Workspace 4.0',    label: 'Workspace 4.0',    desc: 'The future of work, digital talent, and hybrid collaboration', keywords: ['workspace', 'worker', 'talent', 'workforce', 'hybrid', 'future of work'] },
    ],
  },
  'Primary & Secondary': {
    color: '#10b981',
    desc: 'Digital transformation in resource extraction, agriculture, manufacturing, and logistics.',
    items: [
      { key: 'Mining 4.0',         label: 'Mining 4.0',         desc: 'Autonomous operations, predictive maintenance, and digital twins in mining', keywords: ['mining', 'autonomous', 'predictive', 'ot', 'industrial'] },
      { key: 'Farming 4.0',        label: 'Farming 4.0',        desc: 'Precision agriculture, IoT sensors, and AI-driven crop management', keywords: ['farming', 'agriculture', 'iot', 'precision', 'crop'] },
      { key: 'Plant 4.0',          label: 'Plant 4.0',          desc: 'Smart manufacturing, Industry 4.0, and connected factory floors', keywords: ['manufacturing', 'plant', 'factory', 'industry 4.0', 'smart'] },
      { key: 'Logistics 4.0',      label: 'Logistics 4.0',      desc: 'Supply chain digitization, autonomous delivery, and real-time visibility', keywords: ['logistics', 'supply chain', 'delivery', 'transport', 'visibility'] },
      { key: 'Infrastructure 4.0', label: 'Infrastructure 4.0', desc: 'Smart infrastructure, digital twins of cities, and connected utilities', keywords: ['infrastructure', 'smart city', 'utilities', 'digital twin', 'edge'] },
    ],
  },
  'Tertiary & Quaternary': {
    color: '#0a7ea4',
    desc: 'Digital transformation in services, government, retail, hospitality, and knowledge industries.',
    items: [
      { key: 'Government 4.0',  label: 'Government 4.0',  desc: 'Digital public services, e-governance, and DCO adoption in the public sector', keywords: ['government', 'public', 'governance', 'dco', 'policy', 'regulation'] },
      { key: 'Services 4.0',    label: 'Services 4.0',    desc: 'Financial services, professional services, and platform-based service delivery', keywords: ['services', 'financial', 'fintech', 'banking', 'professional'] },
      { key: 'Retail 4.0',      label: 'Retail 4.0',      desc: 'Omnichannel commerce, AI personalization, and the future of physical retail', keywords: ['retail', 'commerce', 'omnichannel', 'ecommerce', 'consumer'] },
      { key: 'Hospitality 4.0', label: 'Hospitality 4.0', desc: 'Smart hotels, contactless experiences, and AI-driven guest personalization', keywords: ['hospitality', 'hotel', 'travel', 'tourism', 'guest'] },
      { key: 'Wellness 4.0',    label: 'Wellness 4.0',    desc: 'Digital health, telemedicine, and AI-powered wellness platforms', keywords: ['health', 'wellness', 'telemedicine', 'medical', 'healthcare'] },
    ],
  },
};

const ALL_CONTENT = [...topStories, ...emergingTech, ...insightCards.map(c => ({
  ...c, headline: c.title, image: c.image || '',
}))];

function getStoriesForSector(sector, query) {
  const kw = sector.keywords || [];
  return ALL_CONTENT.filter(s => {
    const text = `${s.headline || s.title || ''} ${s.category || ''} ${s.summary || ''}`.toLowerCase();
    const matchesSector = kw.some(k => text.includes(k));
    if (!query) return matchesSector;
    const q = query.toLowerCase();
    return matchesSector && text.includes(q);
  }).slice(0, 6);
}

export default function SectorsPage({ onNavigate }) {
  const [activeGroup, setActiveGroup]   = useState('Cross-Sector');
  const [activeSector, setActiveSector] = useState(SECTORS['Cross-Sector'].items[0]);
  const [searchQuery, setSearchQuery]   = useState('');
  const { openArticle } = useNav();

  const group   = SECTORS[activeGroup];
  const stories = getStoriesForSector(activeSector, searchQuery);
  const totalForSector = getStoriesForSector(activeSector, '').length;

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">

      {/* Hero */}
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
            DTMI Sector Intelligence
          </p>
          <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
            Sectors
          </h1>
          <p className="text-[14px] leading-relaxed max-w-[600px]" style={{ color: '#94a3b8' }}>
            How digital transformation is reshaping every industry — from mining floors to government ministries. Explore sector-specific intelligence, trends, and strategic frameworks.
          </p>
        </div>
      </div>

      {/* Section nav with Glossary link */}
      {onNavigate && <SectionNav activeKey="Sectors" onNavigate={onNavigate} />}

      {/* Group tab bar */}
      <div style={{ background: 'var(--brand-navy)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex overflow-x-auto">
            {Object.keys(SECTORS).map(grp => (
              <button key={grp}
                onClick={() => { setActiveGroup(grp); setActiveSector(SECTORS[grp].items[0]); setSearchQuery(''); }}
                className="px-5 py-4 text-[12px] font-bold whitespace-nowrap border-b-2 transition-all shrink-0"
                style={{
                  borderColor: activeGroup === grp ? SECTORS[grp].color : 'transparent',
                  color: activeGroup === grp ? 'white' : '#64748b',
                }}>
                {grp}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar — sector list */}
          <aside className="space-y-4">
            <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: group.color }}>{activeGroup}</p>
              <p className="text-[12px] leading-relaxed mb-4" style={{ color: 'var(--brand-muted)' }}>{group.desc}</p>
              {group.items.map(item => (
                <button key={item.key}
                  onClick={() => { setActiveSector(item); setSearchQuery(''); }}
                  className="w-full text-left flex items-start gap-3 py-3 border-b last:border-0 transition-colors group"
                  style={{ borderColor: 'var(--brand-border)' }}>
                  <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: activeSector.key === item.key ? group.color : '#d1d5db' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold leading-snug" style={{ color: activeSector.key === item.key ? 'var(--brand-navy)' : 'var(--brand-muted)' }}>
                      {item.label}
                    </p>
                    <p className="text-[11px] leading-snug mt-0.5 line-clamp-2" style={{ color: '#94a3b8' }}>{item.desc}</p>
                  </div>
                  {activeSector.key === item.key && <ChevronRight size={13} className="shrink-0 mt-1" style={{ color: group.color }} />}
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Active sector header */}
            <div className="rounded-sm border overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
              <div className="px-6 py-5" style={{ background: group.color }}>
                <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">{activeGroup}</p>
                <h2 className="text-white text-[22px] font-black">{activeSector.label}</h2>
                <p className="text-white/80 text-[13px] mt-1">{activeSector.desc}</p>
              </div>
            </div>

            {/* Search */}
            <PageSearch value={searchQuery} onChange={setSearchQuery}
              placeholder={`Search ${activeSector.label} intelligence...`}
              resultCount={searchQuery ? stories.length : undefined}
              totalCount={totalForSector} />

            {/* Stories */}
            <div>
              <SectionLabel title={`Latest: ${activeSector.label}`} count={stories.length} />
              {stories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {stories.map(story => (
                    <div key={story.id} onClick={() => openArticle(story)} className="cursor-pointer">
                      <StoryCard story={story} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-sm border" style={{ borderColor: 'var(--brand-border)' }}>
                  <p className="text-[13px]" style={{ color: 'var(--brand-muted)' }}>
                    {searchQuery ? `No results for "${searchQuery}"` : `No articles yet for ${activeSector.label}`}
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
