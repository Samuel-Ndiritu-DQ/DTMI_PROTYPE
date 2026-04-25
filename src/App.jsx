import { useState } from 'react';
import { NavProvider, useNav } from './context/NavContext';

import TopBar from './components/TopBar';
import BreakingBanner from './components/BreakingBanner';
import TickerBar from './components/TickerBar';
import Footer from './components/Footer';

import Homepage         from './views/Homepage';
import IntelligenceFeed from './views/IntelligenceFeed';
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
import AdminDashboard   from './views/admin/AdminDashboard';
import LoginPage        from './views/LoginPage';
import RegisterPage     from './views/RegisterPage';
import ForgotPasswordPage from './views/ForgotPasswordPage';

import { topStories, emergingTech, executiveBriefings, videoContent, insightCards } from './data/mockData';
import SectionLabel from './components/SectionLabel';
import StoryCard from './components/StoryCard';
import PageSearch from './components/PageSearch';

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
    author: c.author, tags: c.tags,
  }));

  if (layer === 'Books') {
    return <BooksPage onSignIn={() => window.dispatchEvent(new CustomEvent('dtmi:signin'))} />;
  }
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
  'Intelligence Feed': (p) => <IntelligenceFeed />,
  'Insight Cards':     (p) => <InsightCards />,
  'Trend Radar':       (p) => <TrendRadar />,
  'AI Engine':         (p) => <AIEngine />,
  '6xD Framework':     (p) => <SixDFramework />,
  'Multimedia':        (p) => <Multimedia />,
  'About':             (p) => <About />,
  'Signal':            (p) => <IntelligenceLayerPage layer="Signal" />,
  'Insight':           (p) => <IntelligenceLayerPage layer="Insight" />,
  'Deep Analysis':     (p) => <IntelligenceLayerPage layer="Deep Analysis" />,
  'Books':             (p) => <BooksPage onSignIn={p.onSignIn} />,
  'Research':          (p) => <ResearchPage onSignIn={p.onSignIn} />,
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
  const { page } = useNav();

  const closeAuth = () => setAuthModal(AUTH_NONE);

  // Admin dashboard — full screen, no nav/footer
  if (showAdmin) {
    return <AdminDashboard onExit={() => setShowAdmin(false)} />;
  }

  // If a content page is open, render it instead of the section
  if (page?.type === 'article') return (
    <>
      <TopBar activeSection={activeSection} setActiveSection={setActiveSection} onAdmin={() => setShowAdmin(true)} onSignIn={() => setAuthModal(AUTH_LOGIN)} />
      <ArticlePage />
      <Footer />
      {authModal === AUTH_LOGIN    && <LoginPage        onClose={closeAuth} onGoRegister={() => setAuthModal(AUTH_REGISTER)} onGoForgot={() => setAuthModal(AUTH_FORGOT)} />}
      {authModal === AUTH_REGISTER && <RegisterPage     onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
      {authModal === AUTH_FORGOT   && <ForgotPasswordPage onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
    </>
  );
  if (page?.type === 'video') return (
    <>
      <TopBar activeSection={activeSection} setActiveSection={setActiveSection} onAdmin={() => setShowAdmin(true)} onSignIn={() => setAuthModal(AUTH_LOGIN)} />
      <VideoPage />
      <Footer />
      {authModal === AUTH_LOGIN    && <LoginPage        onClose={closeAuth} onGoRegister={() => setAuthModal(AUTH_REGISTER)} onGoForgot={() => setAuthModal(AUTH_FORGOT)} />}
      {authModal === AUTH_REGISTER && <RegisterPage     onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
      {authModal === AUTH_FORGOT   && <ForgotPasswordPage onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
    </>
  );
  if (page?.type === 'podcast') return (
    <>
      <TopBar activeSection={activeSection} setActiveSection={setActiveSection} onAdmin={() => setShowAdmin(true)} onSignIn={() => setAuthModal(AUTH_LOGIN)} />
      <PodcastPage />
      <Footer />
      {authModal === AUTH_LOGIN    && <LoginPage        onClose={closeAuth} onGoRegister={() => setAuthModal(AUTH_REGISTER)} onGoForgot={() => setAuthModal(AUTH_FORGOT)} />}
      {authModal === AUTH_REGISTER && <RegisterPage     onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
      {authModal === AUTH_FORGOT   && <ForgotPasswordPage onClose={closeAuth} onGoLogin={() => setAuthModal(AUTH_LOGIN)} />}
    </>
  );

  const renderSection = () => {
    const route = SECTION_ROUTES[activeSection];
    if (route) return route({ onSignIn: () => setAuthModal(AUTH_LOGIN) });
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
