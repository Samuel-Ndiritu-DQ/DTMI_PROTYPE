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
import AdminDashboard   from './views/admin/AdminDashboard';
import LoginPage        from './views/LoginPage';
import RegisterPage     from './views/RegisterPage';
import ForgotPasswordPage from './views/ForgotPasswordPage';

import { topStories, emergingTech, executiveBriefings, videoContent, insightCards } from './data/mockData';
import SectionLabel from './components/SectionLabel';
import StoryCard from './components/StoryCard';

function GenericPage({ title, subtitle, stories }) {
  const { openArticle } = useNav();
  const display = stories.length > 0 ? stories : [...topStories, ...emergingTech].slice(0, 6);
  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="mb-6 pb-4 border-b" style={{ borderColor: 'var(--brand-border)' }}>
          <p className="text-[11px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--brand-orange)' }}>DTMI Intelligence</p>
          <h1 className="text-2xl font-black" style={{ color: 'var(--brand-navy)' }}>{title}</h1>
          {subtitle && <p className="text-[13px] mt-1" style={{ color: 'var(--brand-muted)' }}>{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {display.map(story => (
            <div key={story.id} onClick={() => openArticle(story)} className="cursor-pointer">
              <StoryCard story={story} />
            </div>
          ))}
        </div>
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
    return (
      <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <div className="mb-8 pb-4 border-b" style={{ borderColor: 'var(--brand-border)' }}>
            <p className="text-[11px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--brand-orange)' }}>DTMB Books</p>
            <h1 className="text-2xl font-black" style={{ color: 'var(--brand-navy)' }}>Flagship Research Volumes</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'book-1', title: "Economy 4.0: The New Economic Paradigm", vol: "Vol. 1", color: "#8b5cf6", summary: "A comprehensive exploration of the Economy 4.0 paradigm — how digital technologies are reshaping value creation, labor markets, and competitive dynamics across all sectors." },
              { id: 'book-2', title: "Digital Cognitive Organizations: A Framework for the Future", vol: "Vol. 2", color: "var(--brand-teal)", summary: "The definitive guide to building Digital Cognitive Organizations — from maturity assessment to full DCO alignment across the six strategic domains." },
              { id: 'book-3', title: "Digital Business Platforms: Architecture & Strategy", vol: "Vol. 3", color: "var(--brand-orange)", summary: "How to design, build, and scale Digital Business Platforms — covering DXP, DWS, DIA, and SDO platform layers in depth." },
            ].map(book => (
              <div
                key={book.vol}
                onClick={() => openArticle({ id: book.id, headline: book.title, summary: book.summary, category: 'DTMB BOOKS', image: '', author: 'DigitalQatalyst Research', timestamp: 'Apr 2026', readTime: '45 min' })}
                className="bg-white border rounded-sm overflow-hidden card-hover cursor-pointer"
                style={{ borderColor: 'var(--brand-border)' }}
              >
                <div className="h-40 flex items-center justify-center" style={{ background: book.color }}>
                  <div className="text-center px-6">
                    <p className="text-white/60 text-[11px] font-black uppercase tracking-widest mb-2">DTMB · {book.vol}</p>
                    <p className="text-white text-[15px] font-black leading-snug">{book.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: 'var(--brand-orange)' }}>DigitalQatalyst Research</p>
                  <p className="text-[12px]" style={{ color: 'var(--brand-muted)' }}>{book.summary}</p>
                  <p className="mt-3 text-[11px] font-bold" style={{ color: 'var(--brand-orange)' }}>Read Volume →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
  'Latest':            () => <Homepage />,
  'Intelligence Feed': () => <IntelligenceFeed />,
  'Insight Cards':     () => <InsightCards />,
  'Trend Radar':       () => <TrendRadar />,
  'AI Engine':         () => <AIEngine />,
  '6xD Framework':     () => <SixDFramework />,
  'Multimedia':        () => <Multimedia />,
  'About':             () => <About />,
  'Signal':            () => <IntelligenceLayerPage layer="Signal" />,
  'Insight':           () => <IntelligenceLayerPage layer="Insight" />,
  'Deep Analysis':     () => <IntelligenceLayerPage layer="Deep Analysis" />,
  'Books':             () => <IntelligenceLayerPage layer="Books" />,
  'D1': () => <DomainPage domain="D1" />,
  'D2': () => <DomainPage domain="D2" />,
  'D3': () => <DomainPage domain="D3" />,
  'D4': () => <DomainPage domain="D4" />,
  'D5': () => <DomainPage domain="D5" />,
  'D6': () => <DomainPage domain="D6" />,
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
    if (route) return route();
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
