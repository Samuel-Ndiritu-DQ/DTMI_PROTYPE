import React, { useState, useEffect } from 'react';
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
              {/* Signal page image - executive monitoring emerging trends */}
              <div className="relative w-64 h-40 rounded-lg overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-cover bg-center" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80)',
                }}>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.7) 0%, rgba(10, 22, 40, 0.4) 100%)'
                  }}></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div>
                      <div className="inline-flex items-center gap-1 mb-2 px-2 py-1 rounded-sm" style={{ 
                        background: 'rgba(255,107,53,0.2)', 
                        backdropFilter: 'blur(4px)'
                      }}>
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--brand-orange)' }}>Early Detection</span>
                      </div>
                      <h3 className="text-white text-[14px] font-bold leading-snug">Executive monitoring emerging digital signals</h3>
                    </div>
                  </div>
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
              {/* Insight page image - expert analysis and frameworks */}
              <div className="relative w-64 h-40 rounded-lg overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-cover bg-center" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80)',
                }}>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.7) 0%, rgba(10, 22, 40, 0.4) 100%)'
                  }}></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div>
                      <div className="inline-flex items-center gap-1 mb-2 px-2 py-1 rounded-sm" style={{ 
                        background: 'rgba(6, 182, 212, 0.2)', 
                        backdropFilter: 'blur(4px)'
                      }}>
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#06b6d4' }}>Strategic Framework</span>
                      </div>
                      <h3 className="text-white text-[14px] font-bold leading-snug">Expert analysis shaping digital transformation</h3>
                    </div>
                  </div>
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
              {/* Visual element for Deep Analysis page */}
              <div className="flex items-end gap-2 shrink-0">
                <div className="w-24 h-32 rounded-sm flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <span className="text-white text-[12px] font-bold">RESEARCH</span>
                </div>
                <div className="w-20 h-28 rounded-sm flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <span className="text-white text-[10px] font-bold">WHITEPAPER</span>
                </div>
                <div className="w-16 h-24 rounded-sm flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="text-white text-[9px] font-bold">ESSAY</span>
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
    D1: { title: 'D1 — Digital Economy',              subtitle: 'Economy 4.0 & platform models' },
    D2: { title: 'D2 — Digital Cognitive Organizations', subtitle: 'DCO framework, adoption, and maturity' },
    D3: { title: 'D3 — Digital Business Platforms',   subtitle: 'DBP architecture, ecosystems, and deployment' },
    D4: { title: 'D4 — Digital Transformation 2.0',   subtitle: 'DT2.0 strategy, execution, and measurement' },
    D5: { title: 'D5 — Digital Worker & Workspace',   subtitle: 'Future of work, digital talent, and workspace psychology' },
    D6: { title: 'D6 — Digital Accelerators',         subtitle: 'AI, automation, and emerging technology accelerators' },
  };
  const cfg = domains[domain] || { title: domain, subtitle: '' };
  return <GenericPage title={cfg.title} subtitle={cfg.subtitle} stories={[]} />;
}

const SECTION_ROUTES = {
  'Latest':            (p) => <Homepage />,
  // Intelligence parent → defaults to Signal
  'intelligence':      (p) => <IntelligenceLayerPage layer="Signal" />,
  // 6xD parent → defaults to D1
  '6xd':               (p) => <DomainPage domain="D1" />,
  '6xD Framework':     (p) => <SixDFramework onNavigate={p.onNavigate} />,
  // Sectors parent → defaults to Economy 4.0 (GenericPage)
  'sectors':           (p) => <GenericPage title="Economy 4.0" subtitle="Platform economies, digital value chains, and the $4.2T GDP opportunity" stories={[]} />,
  'Sectors':           (p) => <GenericPage title="Economy 4.0" subtitle="Platform economies, digital value chains, and the $4.2T GDP opportunity" stories={[]} />,
  // Technology parent → defaults to DXP-Channels (GenericPage)
  'technology':        (p) => <GenericPage title="Digital Channels" subtitle="DXP · Digital Experience Platform" stories={[]} />,
  'Technology':        (p) => <GenericPage title="Digital Channels" subtitle="DXP · Digital Experience Platform" stories={[]} />,
  'Multimedia':        (p) => <Multimedia />,
  'About':             (p) => <About />,
  // Intelligence sub-pages
  'Signal':            (p) => <IntelligenceLayerPage layer="Signal" />,
  'Insight':           (p) => <IntelligenceLayerPage layer="Insight" />,
  'Deep Analysis':     (p) => <IntelligenceLayerPage layer="Deep Analysis" />,
  'Books':             (p) => <BooksPage onSignIn={p.onSignIn} />,
  'Research':          (p) => <ResearchPage onSignIn={p.onSignIn} />,
  'Glossary':          (p) => <GlossaryPage />,
  'Insight Cards':     (p) => <InsightCards />,
  'Trend Radar':       (p) => <TrendRadar />,
  'AI Engine':         (p) => <AIEngine />,
  // 6xD domain sub-pages
  'D1': (p) => <DomainPage domain="D1" />,
  'D2': (p) => <DomainPage domain="D2" />,
  'D3': (p) => <DomainPage domain="D3" />,
  'D4': (p) => <DomainPage domain="D4" />,
  'D5': (p) => <DomainPage domain="D5" />,
  'D6': (p) => <DomainPage domain="D6" />,
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
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('admin-active');
    };
  }, [showAdmin]);

  // Admin dashboard — full screen, no nav/footer
  if (showAdmin) {
    return <AdminDashboard onExit={() => setShowAdmin(false)} />;
  }

  const AIFab = activeSection !== 'AI Engine' && (
    <div style={{ position: 'fixed', bottom: 28, right: 24, zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      {/* Multimedia FAB */}
      <button
        onClick={() => setActiveSection('Multimedia')}
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
          {/* Headphones */}
          <path d="M3 12a9 9 0 0 1 18 0" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
          <rect x="2" y="12" width="4" height="6" rx="2" fill="white" fillOpacity="0.9"/>
          <rect x="18" y="12" width="4" height="6" rx="2" fill="white" fillOpacity="0.9"/>
          {/* Play triangle */}
          <path d="M10 9.5l5 3-5 3V9.5z" fill="white" fillOpacity="0.7"/>
        </svg>
      </button>

      {/* AI FAB */}
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
    </div>
  );

  // AI Engine — self-contained with its own TopBar and Footer
  if (activeSection === 'AI Engine') {
    return (
      <AIEngine activeSection={activeSection} setActiveSection={setActiveSection} onAdmin={() => setShowAdmin(true)} onSignIn={() => setAuthModal(AUTH_LOGIN)} />
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
      {AIFab}
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
      {AIFab}
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
      {AIFab}
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
      {AIFab}
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
