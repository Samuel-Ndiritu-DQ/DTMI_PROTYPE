import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NavProvider, useNav } from './context/NavContext';

import TopBar from './components/TopBar';
import BreakingBanner from './components/BreakingBanner';
import TickerBar from './components/TickerBar';
import Footer from './components/Footer';

import Homepage         from './views/Homepage';
import InsightCards     from './views/InsightCards';
import TrendRadar       from './views/TrendRadar';
import AIEngine         from './views/AIEngine';
import SixDFramework    from './views/SixDFramework';
import Multimedia       from './views/Multimedia';
import About            from './views/About';
import ArticlePage      from './views/ArticlePage';
import VideoPage        from './views/VideoPage';
import PodcastPage      from './views/PodcastPage';
import BooksPage        from './views/BooksPage';
import ResearchPage     from './views/ResearchPage';
import GlossaryPage     from './views/GlossaryPage';
import AdminDashboard   from './views/admin/AdminDashboard';
import LoginPage        from './views/LoginPage';
import RegisterPage     from './views/RegisterPage';
import ForgotPasswordPage from './views/ForgotPasswordPage';

import { topStories, emergingTech, executiveBriefings, videoContent, insightCards } from './data/mockData';
import { pageMeta as sitePageMeta, getContentMeta } from './data/mockData';
import SectionLabel from './components/SectionLabel';
import StoryCard from './components/StoryCard';
import PageSearch from './components/PageSearch';
import PageMeta from './components/PageMeta';

function GenericPage({ title, subtitle, stories }) {
  const { openArticle } = useNav();
  const [searchQuery, setSearchQuery] = useState('');

  const pool    = stories.length > 0 ? stories : [...topStories, ...emergingTech].slice(0, 6);
  const display = pool.filter(story => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (story.headline || story.title || '').toLowerCase().includes(q) ||
      (story.summary  || '').toLowerCase().includes(q) ||
      (story.category || '').toLowerCase().includes(q) ||
      (story.author   || '').toLowerCase().includes(q) ||
      (story.tags     || []).some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
      <PageMeta
        title={sitePageMeta[title]?.title || title}
        description={sitePageMeta[title]?.description || subtitle || `DTMI intelligence on ${title}`}
      />
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-6 pb-4 border-b" style={{ borderColor: 'var(--brand-border)' }}>
          <p className="text-[11px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--brand-orange)' }}>DTMI Intelligence</p>
          <h1 className="text-2xl font-black" style={{ color: 'var(--brand-navy)' }}>{title}</h1>
          {subtitle && <p className="text-[13px] mt-1" style={{ color: 'var(--brand-muted)' }}>{subtitle}</p>}
        </div>

        {/* Search bar */}
        <div className="w-full mb-6">
          <PageSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Search ${title} articles, topics, authors...`}
            resultCount={searchQuery ? display.length : undefined}
            totalCount={pool.length}
          />
        </div>

        {/* Results */}
        {display.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {display.map(story => (
              <div key={story.id} onClick={() => openArticle(story)} className="cursor-pointer">
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[14px]" style={{ color: 'var(--brand-muted)' }}>
              No results for "<strong style={{ color: 'var(--brand-navy)' }}>{searchQuery}</strong>"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-[13px] font-bold hover:opacity-70 transition-opacity"
              style={{ color: 'var(--brand-orange)' }}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function IntelligenceLayerPage({ layer }) {
  const { openArticle } = useNav();
  const layerConfig = {
    Signal:         { title: 'Signal',        subtitle: 'Early signals & trend alerts', filter: c => c.severity === 'High' || c.severity === 'Critical' },
    Insight:        { title: 'Insight',       subtitle: 'Analysis & framework explainers', filter: c => c.severity === 'Medium' || c.severity === 'Low' },
    'Deep Analysis':{ title: 'Deep Analysis', subtitle: 'Whitepapers, essays & research', filter: () => true },
    Books:          { title: 'DTMB Books',    subtitle: 'Flagship research volumes', filter: () => false },
  };
  const cfg = layerConfig[layer] || layerConfig.Signal;
  const stories = insightCards.filter(cfg.filter).map(c => ({
    id: c.id, category: c.category.toUpperCase(), headline: c.title,
    summary: c.summary, timestamp: c.timestamp, readTime: c.readTime, image: c.image,
    author: c.author, tags: c.tags, type: c.type,
  }));

  if (layer === 'Books') {
    return <BooksPage onSignIn={() => window.dispatchEvent(new CustomEvent('dtmi:signin'))} />;
  }
  
  // Custom rendering for Signal page with BooksPage-style hero
  if (layer === 'Signal') {
    const [searchQuery, setSearchQuery] = useState('');
    const pool = stories.length > 0 ? stories : [...topStories, ...emergingTech].slice(0, 6);
    const display = pool.filter(story => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        (story.headline || story.title || '').toLowerCase().includes(q) ||
        (story.summary  || '').toLowerCase().includes(q) ||
        (story.category || '').toLowerCase().includes(q) ||
        (story.author   || '').toLowerCase().includes(q) ||
        (story.tags     || []).some(t => t.toLowerCase().includes(q))
      );
    });

    return (
      <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
        {/* Hero section inspired by BooksPage */}
        <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
          <div className="max-w-[1280px] mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-[580px]">
                <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
                  DTMI Signal Intelligence
                </p>
                <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
                  Early signals & trend alerts for digital leaders
                </h1>
                <p className="text-[14px] leading-relaxed" style={{ color: '#94a3b8' }}>
                  Real-time executive awareness, urgent alerts, and frontier monitoring to help you stay ahead of emerging risks and opportunities in the digital landscape.
                </p>
              </div>
              {/* Signal page - waveform visualization */}
              <div className="relative w-1/2 h-40 rounded-xl overflow-hidden shadow-2xl mx-auto" style={{
                background: 'linear-gradient(135deg, rgba(10, 22, 40, 0) 0%, rgba(10, 22, 40, 0) 100%)'
              }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="100%" height="100%" viewBox="0 0 800 160" preserveAspectRatio="none" style={{ filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))' }}>
                    {/* Waveform path */}
                    <defs>
                      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(6, 182, 212, 0.2)', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Main waveform */}
                    <path
                      d="M 0 80 Q 50 40 100 80 T 200 80 T 300 80 T 400 80 T 500 80 T 600 80 T 700 80 T 800 80"
                      fill="none"
                      stroke="url(#waveGradient)"
                      strokeWidth="3"
                      opacity="0.9"
                    />
                    
                    {/* Secondary waveform lines */}
                    <path
                      d="M 0 80 Q 50 50 100 80 T 200 80 T 300 80 T 400 80 T 500 80 T 600 80 T 700 80 T 800 80"
                      fill="none"
                      stroke="rgba(6, 182, 212, 0.4)"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                    
                    <path
                      d="M 0 80 Q 50 60 100 80 T 200 80 T 300 80 T 400 80 T 500 80 T 600 80 T 700 80 T 800 80"
                      fill="none"
                      stroke="rgba(6, 182, 212, 0.2)"
                      strokeWidth="1.5"
                      opacity="0.4"
                    />
                    
                    {/* Glow effect */}
                    <ellipse cx="400" cy="80" rx="300" ry="50" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="2" opacity="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 py-8">
          {/* Search bar */}
          <div className="w-full mb-6">
            <PageSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Signal articles, topics, authors..."
              resultCount={searchQuery ? display.length : undefined}
              totalCount={pool.length}
            />
          </div>

          {/* Results */}
          {display.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {display.map(story => (
                <div key={story.id} onClick={() => openArticle(story)} className="cursor-pointer">
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[14px]" style={{ color: 'var(--brand-muted)' }}>
                No results for "<strong style={{ color: 'var(--brand-navy)' }}>{searchQuery}</strong>"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-[13px] font-bold hover:opacity-70 transition-opacity"
                style={{ color: 'var(--brand-orange)' }}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Custom rendering for Insight page with BooksPage-style hero
  if (layer === 'Insight') {
    const [searchQuery, setSearchQuery] = useState('');
    const pool = stories.length > 0 ? stories : [...topStories, ...emergingTech].slice(0, 6);
    const display = pool.filter(story => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        (story.headline || story.title || '').toLowerCase().includes(q) ||
        (story.summary  || '').toLowerCase().includes(q) ||
        (story.category || '').toLowerCase().includes(q) ||
        (story.author   || '').toLowerCase().includes(q) ||
        (story.tags     || []).some(t => t.toLowerCase().includes(q))
      );
    });

    return (
      <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
        {/* Hero section inspired by BooksPage */}
        <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
          <div className="max-w-[1280px] mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-[580px]">
                <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
                  DTMI Insight Intelligence
                </p>
                <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
                  Analysis & framework explainers for digital leaders
                </h1>
                <p className="text-[14px] leading-relaxed" style={{ color: '#94a3b8' }}>
                  Structured analysis, conceptual frameworks, and expert perspectives to help you understand complex digital transformation concepts and make informed strategic decisions.
                </p>
              </div>
              {/* Insight page - analysis line chart visualization */}
              <div className="relative w-1/2 h-40 rounded-xl overflow-hidden shadow-2xl mx-auto" style={{
                background: 'linear-gradient(135deg, rgba(10, 22, 40, 0) 0%, rgba(10, 22, 40, 0) 100%)'
              }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid meet" style={{ filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.3))' }}>
                    {/* Grid lines */}
                    <defs>
                      <linearGradient id="analysisGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.1 }} />
                        <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.4 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Horizontal grid lines */}
                    <line x1="20" y1="40" x2="380" y2="40" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1"/>
                    <line x1="20" y1="80" x2="380" y2="80" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1"/>
                    <line x1="20" y1="120" x2="380" y2="120" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1"/>
                    
                    {/* Area under curve */}
                    <path
                      d="M 20 100 L 80 60 L 140 50 L 200 70 L 260 40 L 320 55 L 380 35 L 380 140 L 20 140 Z"
                      fill="url(#analysisGradient)"
                      opacity="0.6"
                    />
                    
                    {/* Main analysis line */}
                    <polyline
                      points="20,100 80,60 140,50 200,70 260,40 320,55 380,35"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                      opacity="0.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Data points */}
                    <circle cx="20" cy="100" r="3.5" fill="#06b6d4" opacity="0.8"/>
                    <circle cx="80" cy="60" r="3.5" fill="#06b6d4" opacity="0.8"/>
                    <circle cx="140" cy="50" r="3.5" fill="#06b6d4" opacity="0.8"/>
                    <circle cx="200" cy="70" r="3.5" fill="#06b6d4" opacity="0.8"/>
                    <circle cx="260" cy="40" r="3.5" fill="#06b6d4" opacity="0.8"/>
                    <circle cx="320" cy="55" r="3.5" fill="#06b6d4" opacity="0.8"/>
                    <circle cx="380" cy="35" r="3.5" fill="#06b6d4" opacity="0.8"/>
                    
                    {/* Axis lines */}
                    <line x1="20" y1="140" x2="380" y2="140" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5"/>
                    <line x1="20" y1="20" x2="20" y2="140" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 py-8">
          {/* Search bar */}
          <div className="w-full mb-6">
            <PageSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Insight articles, topics, authors..."
              resultCount={searchQuery ? display.length : undefined}
              totalCount={pool.length}
            />
          </div>

          {/* Results */}
          {display.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {display.map(story => (
                <div key={story.id} onClick={() => openArticle(story)} className="cursor-pointer">
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[14px]" style={{ color: 'var(--brand-muted)' }}>
                No results for "<strong style={{ color: 'var(--brand-navy)' }}>{searchQuery}</strong>"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-[13px] font-bold hover:opacity-70 transition-opacity"
                style={{ color: 'var(--brand-orange)' }}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Custom rendering for Deep Analysis page with BooksPage-style hero
  if (layer === 'Deep Analysis') {
    const [searchQuery, setSearchQuery] = useState('');
    const pool = stories.length > 0 ? stories : [...topStories, ...emergingTech].slice(0, 6);
    const display = pool.filter(story => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        (story.headline || story.title || '').toLowerCase().includes(q) ||
        (story.summary  || '').toLowerCase().includes(q) ||
        (story.category || '').toLowerCase().includes(q) ||
        (story.author   || '').toLowerCase().includes(q) ||
        (story.tags     || []).some(t => t.toLowerCase().includes(q))
      );
    });

    return (
      <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
        {/* Hero section inspired by BooksPage */}
        <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
          <div className="max-w-[1280px] mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-[580px]">
                <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
                  DTMI Deep Analysis Intelligence
                </p>
                <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
                  Whitepapers, essays & research for digital leaders
                </h1>
                <p className="text-[14px] leading-relaxed" style={{ color: '#94a3b8' }}>
                  Comprehensive research, strategic depth, and long-form analysis to provide you with the deep insights needed for complex decision-making in the digital age.
                </p>
              </div>
              {/* Deep Analysis page - research bar chart visualization */}
              <div className="relative w-1/2 h-40 rounded-xl overflow-hidden shadow-2xl mx-auto" style={{
                background: 'linear-gradient(135deg, rgba(10, 22, 40, 0) 0%, rgba(10, 22, 40, 0) 100%)'
              }}>
                <div className="absolute inset-0 flex items-end justify-center gap-3 p-6">
                  {[70, 55, 85, 45, 90, 60, 75].map((height, i) => (
                    <div
                      key={i}
                      className="rounded-t-sm transition-all hover:opacity-80"
                      style={{
                        width: '14px',
                        height: `${height}%`,
                        background: i % 2 === 0 
                          ? 'linear-gradient(180deg, rgb(245, 158, 11) 0%, rgba(245, 158, 11, 0.6) 100%)'
                          : 'linear-gradient(180deg, rgba(245, 158, 11, 0.8) 0%, rgba(245, 158, 11, 0.4) 100%)',
                        boxShadow: `0 -2px 8px rgba(245, 158, 11, ${0.3 + i * 0.08})`,
                        borderRadius: '2px 2px 0 0'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 py-8">
          {/* Search bar */}
          <div className="w-full mb-6">
            <PageSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Deep Analysis articles, topics, authors..."
              resultCount={searchQuery ? display.length : undefined}
              totalCount={pool.length}
            />
          </div>

          {/* Results */}
          {display.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {display.map(story => (
                <div key={story.id} onClick={() => openArticle(story)} className="cursor-pointer">
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[14px]" style={{ color: 'var(--brand-muted)' }}>
                No results for "<strong style={{ color: 'var(--brand-navy)' }}>{searchQuery}</strong>"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-[13px] font-bold hover:opacity-70 transition-opacity"
                style={{ color: 'var(--brand-orange)' }}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Fallback for any other layer
  return <GenericPage title={cfg.title} subtitle={cfg.subtitle} stories={stories} />;
}

function DomainPage({ domain }) {
  const domains = {
    D1: { title: 'D1 – Digital Economy',              subtitle: 'Economy 4.0 & platform models' },
    D2: { title: 'D2 – Digital Cognitive Organizations', subtitle: 'DCO framework, adoption, and maturity' },
    D3: { title: 'D3 – Digital Business Platforms',   subtitle: 'DBP architecture, ecosystems, and deployment' },
    D4: { title: 'D4 – Digital Transformation 2.0',   subtitle: 'DT2.0 strategy, execution, and measurement' },
    D5: { title: 'D5 – Digital Worker & Workspace',   subtitle: 'Future of work, digital talent, and workspace psychology' },
    D6: { title: 'D6 – Digital Accelerators',         subtitle: 'AI, automation, and emerging technology accelerators' },
  };
  const cfg = domains[domain] || { title: domain, subtitle: '' };
  return <GenericPage title={cfg.title} subtitle={cfg.subtitle} stories={[]} />;
}

const SECTION_ROUTES = {
  'Latest':            (p) => <Homepage />,
  'intelligence':      (p) => <IntelligenceLayerPage layer="Signal" />,
  '6xd':               (p) => <DomainPage domain="D1" />,
  '6xD Framework':     (p) => <SixDFramework onNavigate={p.onNavigate} />,
  'sectors':           (p) => <GenericPage title="Economy 4.0" subtitle="Platform economies, digital value chains, and the $4.2T GDP opportunity" stories={[]} />,
  'Sectors':           (p) => <GenericPage title="Economy 4.0" subtitle="Platform economies, digital value chains, and the $4.2T GDP opportunity" stories={[]} />,
  'technology':        (p) => <GenericPage title="Digital Channels" subtitle="DXP - Digital Experience Platform" stories={[]} />,
  'Technology':        (p) => <GenericPage title="Digital Channels" subtitle="DXP - Digital Experience Platform" stories={[]} />,
  'Multimedia':        (p) => <Multimedia />,
  'About':             (p) => <About />,
  'Signal':            (p) => <IntelligenceLayerPage layer="Signal" />,
  'Insight':           (p) => <IntelligenceLayerPage layer="Insight" />,
  'Deep Analysis':     (p) => <IntelligenceLayerPage layer="Deep Analysis" />,
  'Books':             (p) => <BooksPage onSignIn={p.onSignIn} />,
  'Research':          (p) => <ResearchPage onSignIn={p.onSignIn} />,
  'Glossary':          (p) => <GlossaryPage />,
  'Insight Cards':     (p) => <InsightCards />,
  'Trend Radar':       (p) => <TrendRadar />,
  'AI Engine':         (p) => <AIEngine />,
  'D1': (p) => <DomainPage domain="D1" />,
  'D2': (p) => <DomainPage domain="D2" />,
  'D3': (p) => <DomainPage domain="D3" />,
  'D4': (p) => <DomainPage domain="D4" />,
  'D5': (p) => <DomainPage domain="D5" />,
  'D6': (p) => <DomainPage domain="D6" />,
  'Economy 4.0':        (p) => <GenericPage title="Economy 4.0"         subtitle="Platform economies, digital value chains, and the $4.2T GDP opportunity" stories={[]} />,
  'Experience 4.0':     (p) => <GenericPage title="Experience 4.0"      subtitle="Digital customer experience, CX transformation, and experience-led growth" stories={[]} />,
  'Intelligence 4.0':   (p) => <GenericPage title="Intelligence 4.0"    subtitle="AI-driven intelligence, data strategy, and analytics transformation" stories={[]} />,
  'Workspace 4.0':      (p) => <GenericPage title="Workspace 4.0"       subtitle="Digital workspace transformation, hybrid work, and the future of the office" stories={[]} />,
  'Mining 4.0':         (p) => <GenericPage title="Mining 4.0"          subtitle="Digital transformation in mining, Industry 4.0 adoption, and smart extraction" stories={[]} />,
  'Farming 4.0':        (p) => <GenericPage title="Farming 4.0"         subtitle="AgriTech, precision farming, and digital agriculture transformation" stories={[]} />,
  'Plant 4.0':          (p) => <GenericPage title="Plant 4.0"           subtitle="Smart manufacturing, industrial IoT, and plant digitization" stories={[]} />,
  'Logistics 4.0':      (p) => <GenericPage title="Logistics 4.0"       subtitle="Supply chain digitization, smart logistics, and last-mile innovation" stories={[]} />,
  'Infrastructure 4.0': (p) => <GenericPage title="Infrastructure 4.0"  subtitle="Digital infrastructure, smart cities, and connected systems" stories={[]} />,
  'Government 4.0':     (p) => <GenericPage title="Government 4.0"      subtitle="Digital government transformation, public sector AI, and e-governance" stories={[]} />,
  'Services 4.0':       (p) => <GenericPage title="Services 4.0"        subtitle="Digital services transformation, platform-based service delivery" stories={[]} />,
  'Retail 4.0':         (p) => <GenericPage title="Retail 4.0"          subtitle="Digital retail transformation, omnichannel strategy, and commerce innovation" stories={[]} />,
  'Hospitality 4.0':    (p) => <GenericPage title="Hospitality 4.0"     subtitle="Digital hospitality, smart hotels, and guest experience transformation" stories={[]} />,
  'Wellness 4.0':       (p) => <GenericPage title="Wellness 4.0"        subtitle="Digital health transformation, AI in healthcare, and wellness technology" stories={[]} />,
  'DXP-Channels':    (p) => <GenericPage title="Digital Channels"         subtitle="DXP Platform - Digital Experience Platform channels and touchpoints" stories={[]} />,
  'DXP-Experience':  (p) => <GenericPage title="Digital Experience"       subtitle="DXP Platform - Customer experience design and delivery" stories={[]} />,
  'DXP-Services':    (p) => <GenericPage title="Digital Services"         subtitle="DXP Platform - Digital service architecture and APIs" stories={[]} />,
  'DXP-MarCom':      (p) => <GenericPage title="Digital MarCom"           subtitle="DXP Platform - Marketing communications and digital campaigns" stories={[]} />,
  'DWS-Workspace':   (p) => <GenericPage title="Digital Workspace"        subtitle="DWS Platform - Collaborative workspace and productivity tools" stories={[]} />,
  'DWS-Core':        (p) => <GenericPage title="Digital Core (ERP)"       subtitle="DWS Platform - Enterprise resource planning and core systems" stories={[]} />,
  'DWS-GPRC':        (p) => <GenericPage title="Digital GPRC"             subtitle="DWS Platform - Governance, performance, risk, and compliance" stories={[]} />,
  'DWS-BackOffice':  (p) => <GenericPage title="Digital Back Office"      subtitle="DWS Platform - Back-office automation and operations" stories={[]} />,
  'DIA-Analytics':   (p) => <GenericPage title="Digital Analytics"        subtitle="DIA Platform - Data analytics, BI, and performance intelligence" stories={[]} />,
  'DIA-AI':          (p) => <GenericPage title="Digital Intelligence (AI)" subtitle="DIA Platform - AI, machine learning, and cognitive automation" stories={[]} />,
  'SDO-IT':          (p) => <GenericPage title="Digital IT (Cloud)"       subtitle="SDO Platform - Cloud infrastructure, DevOps, and IT modernization" stories={[]} />,
  'SDO-Interop':     (p) => <GenericPage title="Digital Interoperability"  subtitle="SDO Platform - Integration, APIs, and system interoperability" stories={[]} />,
  'SDO-Security':    (p) => <GenericPage title="Digital Security"         subtitle="SDO Platform - Cybersecurity, zero-trust, and digital risk management" stories={[]} />,
};

// auth modal states
const AUTH_NONE     = null;
const AUTH_LOGIN    = 'login';
const AUTH_REGISTER = 'register';
const AUTH_FORGOT   = 'forgot';

function AppInner() {
  const [activeSection, setActiveSection] = useState('Latest');
  const [showAdmin, setShowAdmin] = useState(false);
  const [authModal, setAuthModal] = useState(AUTH_NONE);
  const { page, goBack } = useNav();

  const closeAuth = () => setAuthModal(AUTH_NONE);

  // Effect to handle admin class on body
  useEffect(() => {
    if (showAdmin) {
      document.body.classList.add('admin-active');
    } else {
      document.body.classList.remove('admin-active');
    }
    return () => { document.body.classList.remove('admin-active'); };
  }, [showAdmin]);

  // Listen for footer/external navigation events
  useEffect(() => {
    const handler = (e) => {
      const key = e.detail?.key;
      if (key) setActiveSection(key);
    };
    window.addEventListener('dtmi:navigate', handler);
    return () => window.removeEventListener('dtmi:navigate', handler);
  }, []);

  // Admin dashboard Ã¢â‚¬â€ full screen, no nav/footer
  if (showAdmin) {
    return <AdminDashboard onExit={() => setShowAdmin(false)} />;
  }

  // FABs Ã¢â‚¬â€ shown on all pages except admin
  // On AI Engine page: hide the AI FAB (already there), show multimedia FAB
  // On Multimedia page: hide multimedia FAB (already there), show AI FAB
  const Fabs = (
    <div style={{ position: 'fixed', bottom: 28, right: 24, zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      {/* Multimedia FAB Ã¢â‚¬â€ hidden when already on Multimedia */}
      {activeSection !== 'Multimedia' && (
        <button
          onClick={() => { setActiveSection('Multimedia'); }}
          title="Open Multimedia"
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(124,58,237,0.7)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.5)'; }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12a9 9 0 0 1 18 0" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <rect x="2" y="12" width="4" height="6" rx="2" fill="white" fillOpacity="0.9"/>
            <rect x="18" y="12" width="4" height="6" rx="2" fill="white" fillOpacity="0.9"/>
            <path d="M10 9.5l5 3-5 3V9.5z" fill="white" fillOpacity="0.7"/>
          </svg>
        </button>
      )}

      {/* AI FAB Ã¢â‚¬â€ hidden when already on AI Engine */}
      {activeSection !== 'AI Engine' && (
        <button
          onClick={() => setActiveSection('AI Engine')}
          title="Open DTMI AI Assistant"
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--brand-orange), #ff6b35)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(232,80,10,0.45)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(232,80,10,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(232,80,10,0.45)'; }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4C10.48 4 6 8.48 6 14c0 2.2.76 4.22 2.02 5.82L7 25l5.4-1.42A9.93 9.93 0 0 0 16 24c5.52 0 10-4.48 10-10S21.52 4 16 4z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.4"/>
            <line x1="11" y1="13" x2="15" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="17" y1="13" x2="21" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="13" y1="17" x2="19" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="11" cy="13" r="1.5" fill="white"/>
            <circle cx="21" cy="13" r="1.5" fill="white"/>
            <circle cx="16" cy="13" r="1.5" fill="white"/>
            <circle cx="13" cy="17" r="1.5" fill="white" fillOpacity="0.8"/>
            <circle cx="19" cy="17" r="1.5" fill="white" fillOpacity="0.8"/>
            <path d="M24 6l1 2.5L27 9l-2 1-1 2.5-1-2.5-2-1 2-1z" fill="white" fillOpacity="0.9"/>
          </svg>
        </button>
      )}
    </div>
  );
  // AI Engine Ã¢â‚¬â€ self-contained with its own TopBar and Footer
  if (activeSection === 'AI Engine') {
    return (
      <>
        <AIEngine activeSection={activeSection} setActiveSection={setActiveSection} onAdmin={() => setShowAdmin(true)} onSignIn={() => setAuthModal(AUTH_LOGIN)} />
        {Fabs}
      </>
    );
  }

  // If a content page is open, render it instead of the section
  if (page?.type === 'article') return (
    <>
      <TopBar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onAdmin={() => setShowAdmin(true)} 
        onSignIn={() => setAuthModal(AUTH_LOGIN)}
        showBackButton={false}
        onBack={goBack}
      />
      <ArticlePage />
      <Footer />
      {authModal === AUTH_LOGIN    && <LoginPage        onClose={closeAuth} onGoRegister={() => setAuthModal(AUTH_REGISTER)} onGoForgot={() => setAuthModal(AUTH_FORGOT)} />}
      {authModal === AUTH_REGISTER && <RegisterPage     onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
      {authModal === AUTH_FORGOT   && <ForgotPasswordPage onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
      {Fabs}
    </>
  );
  if (page?.type === 'video') return (
    <>
      <TopBar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onAdmin={() => setShowAdmin(true)} 
        onSignIn={() => setAuthModal(AUTH_LOGIN)}
        showBackButton={false}
        onBack={goBack}
      />
      <VideoPage />
      <Footer />
      {authModal === AUTH_LOGIN    && <LoginPage        onClose={closeAuth} onGoRegister={() => setAuthModal(AUTH_REGISTER)} onGoForgot={() => setAuthModal(AUTH_FORGOT)} />}
      {authModal === AUTH_REGISTER && <RegisterPage     onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
      {authModal === AUTH_FORGOT   && <ForgotPasswordPage onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
      {Fabs}
    </>
  );
  if (page?.type === 'podcast') return (
    <>
      <TopBar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onAdmin={() => setShowAdmin(true)} 
        onSignIn={() => setAuthModal(AUTH_LOGIN)}
        showBackButton={false}
        onBack={goBack}
      />
      <PodcastPage />
      <Footer />
      {authModal === AUTH_LOGIN    && <LoginPage        onClose={closeAuth} onGoRegister={() => setAuthModal(AUTH_REGISTER)} onGoForgot={() => setAuthModal(AUTH_FORGOT)} />}
      {authModal === AUTH_REGISTER && <RegisterPage     onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
      {authModal === AUTH_FORGOT   && <ForgotPasswordPage onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
      {Fabs}
    </>
  );

  const renderSection = () => {
    const route = SECTION_ROUTES[activeSection];
    if (route) return route({ onSignIn: () => setAuthModal(AUTH_LOGIN), onNavigate: setActiveSection });
    return (
      <GenericPage
        title={activeSection}
        subtitle={`Latest DTMI intelligence on ${activeSection}`}
        stories={[]}
      />
    );
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--brand-light)' }}>
      <TopBar activeSection={activeSection} setActiveSection={setActiveSection} onAdmin={() => setShowAdmin(true)} onSignIn={() => setAuthModal(AUTH_LOGIN)} />
      <BreakingBanner />
      <TickerBar />
      {renderSection()}
      <Footer />

      {/* Auth modals */}
      {authModal === AUTH_LOGIN    && <LoginPage        onClose={closeAuth} onGoRegister={() => setAuthModal(AUTH_REGISTER)} onGoForgot={() => setAuthModal(AUTH_FORGOT)} />}
      {authModal === AUTH_REGISTER && <RegisterPage     onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
      {authModal === AUTH_FORGOT   && <ForgotPasswordPage onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
      {Fabs}
    </div>
  );
}

export default function App() {
  return (
    <NavProvider>
      <AppInner />
    </NavProvider>
  );
}
