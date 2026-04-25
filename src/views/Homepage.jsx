import HeroSection from '../components/HeroSection';
import LiveUpdatesSidebar from '../components/LiveUpdatesSidebar';
import MostRead from '../components/MostRead';
import OpinionSection from '../components/OpinionSection';
import DTMIIndexWidget from '../components/DTMIIndexWidget';
import SectionLabel from '../components/SectionLabel';
import StoryCard from '../components/StoryCard';
import { topStories, emergingTech, executiveBriefings, videoContent, insightCards } from '../data/mockData';
import { ArrowRight, Zap, BookOpen, Radio } from 'lucide-react';
import { useNav } from '../context/NavContext';

/* McKinsey-style mid-page newsletter CTA */
function NewsletterBanner() {
  return (
    <div className="rounded-sm overflow-hidden" style={{ background: 'var(--brand-navy)' }}>
      <div className="px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'var(--brand-orange)' }}>
            <Zap size={14} className="text-white" fill="white" />
          </div>
          <div>
            <p className="text-white font-black text-[14px] leading-none mb-1">The DTMI Executive Briefing</p>
            <p className="text-[12px]" style={{ color: '#94a3b8' }}>Top transformation intelligence, delivered every morning. Join 40,000+ executives.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <input
            type="email"
            placeholder="Your work email"
            className="flex-1 sm:w-52 text-white text-[12px] px-3 py-2 focus:outline-none rounded-sm"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
          />
          <button className="btn-orange px-4 py-2 text-[12px] font-black uppercase tracking-wide rounded-sm whitespace-nowrap">
            Subscribe Free
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Homepage() {
  const { openArticle } = useNav();

  /* McKinsey "Week's Highlights" — top 3 featured stories */
  const weekHighlights = [
    { ...topStories[0], label: 'EXCLUSIVE ANALYSIS' },
    { ...executiveBriefings[0], label: 'VIDEO' },
    { ...insightCards[2], headline: insightCards[2].title, label: 'REPORT' },
  ];

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ── LEFT: Main content (3 cols) ── */}
          <div className="lg:col-span-3 space-y-10">

            {/* McKINSEY: WEEK'S HIGHLIGHTS */}
            <section>
              <SectionLabel title="This Week's Highlights" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {weekHighlights.map((story, i) => (
                  <div key={story.id + '-wh-' + i} onClick={() => openArticle(story)} className="cursor-pointer">
                    <StoryCard story={story} size={i === 0 ? 'lg' : 'md'} />
                  </div>
                ))}
              </div>
            </section>

            {/* TOP STORIES */}
            <section>
              <SectionLabel title="Top Stories" count={topStories.length} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <StoryCard story={topStories[0]} size="lg" />
                <StoryCard story={topStories[1]} size="lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-sm bg-white overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
                {topStories.slice(2).map((story) => (
                  <div key={story.id} className="border-b md:odd:border-r p-4 last:border-b-0" style={{ borderColor: 'var(--brand-border)' }}>
                    <StoryCard story={story} showImage={false} />
                  </div>
                ))}
              </div>
            </section>

            {/* EXECUTIVE BRIEFINGS */}
            <section>
              <SectionLabel title="Executive Briefings" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {executiveBriefings.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </section>

            {/* McKINSEY: MID-PAGE NEWSLETTER CTA */}
            <NewsletterBanner />

            {/* OPINION */}
            <section>
              <OpinionSection />
            </section>

            {/* EMERGING TECH */}
            <section>
              <SectionLabel title="Emerging Technology" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-sm bg-white overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
                <div className="p-4 border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--brand-border)' }}>
                  <StoryCard story={emergingTech[0]} size="lg" />
                </div>
                <div>
                  {emergingTech.slice(1).map((story) => (
                    <div key={story.id} className="border-b last:border-0 p-4" style={{ borderColor: 'var(--brand-border)' }}>
                      <StoryCard story={story} horizontal />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* VIDEO & PODCASTS */}
            <section>
              <SectionLabel title="Video & Podcasts" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {videoContent.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </section>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="space-y-5">
            <LiveUpdatesSidebar />
            <DTMIIndexWidget />
            <MostRead />

            {/* CNN-style "More to Explore" quick links */}
            <div className="bg-white border rounded-sm p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[11px] font-black uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: 'var(--brand-navy)', borderColor: 'var(--brand-border)' }}>
                More to Explore
              </p>
              {[
                { label: 'Research Library', desc: '50+ reports & whitepapers', icon: <BookOpen size={13} /> },
                { label: 'DTMB Books', desc: 'Flagship research volumes', icon: <BookOpen size={13} /> },
                { label: 'Podcasts & Video', desc: 'Expert conversations', icon: <Radio size={13} /> },
                { label: 'AI Insight Engine', desc: 'Query DTMI intelligence', icon: <Zap size={13} /> },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 py-2.5 border-b last:border-0 cursor-pointer group" style={{ borderColor: 'var(--brand-border)' }}>
                  <span style={{ color: 'var(--brand-orange)' }}>{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold group-hover:opacity-70 transition-opacity" style={{ color: 'var(--brand-navy)' }}>{item.label}</p>
                    <p className="text-[10px]" style={{ color: 'var(--brand-muted)' }}>{item.desc}</p>
                  </div>
                  <ArrowRight size={12} style={{ color: 'var(--brand-muted)' }} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}
            </div>

            {/* Ad placeholder */}
            <div className="bg-white border rounded-sm p-4 text-center" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: '#d1d5db' }}>Advertisement</p>
              <div className="h-32 flex items-center justify-center rounded-sm" style={{ background: 'var(--brand-light)', border: '1px dashed var(--brand-border)' }}>
                <span className="text-[11px]" style={{ color: '#d1d5db' }}>300 × 250</span>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* ── CNN-style MORE STORIES rail ── */}
      <div className="border-t" style={{ background: 'white', borderColor: 'var(--brand-border)' }}>
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <SectionLabel title="More from DTMI" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...topStories, ...emergingTech].slice(0, 6).map((story) => (
              <StoryCard key={story.id + '-more'} story={story} size="sm" />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
