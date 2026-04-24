import HeroSection from '../components/HeroSection';
import LiveUpdatesSidebar from '../components/LiveUpdatesSidebar';
import MostRead from '../components/MostRead';
import OpinionSection from '../components/OpinionSection';
import DTMIIndexWidget from '../components/DTMIIndexWidget';
import SectionLabel from '../components/SectionLabel';
import StoryCard from '../components/StoryCard';
import { topStories, emergingTech, executiveBriefings, videoContent } from '../data/mockData';

export default function Homepage() {
  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ── LEFT: Main content (3 cols) ── */}
          <div className="lg:col-span-3 space-y-10">

            {/* TOP STORIES */}
            <section>
              <SectionLabel title="Top Stories" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <StoryCard story={topStories[0]} size="lg" />
                <StoryCard story={topStories[1]} size="lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-sm bg-white" style={{ borderColor: 'var(--brand-border)' }}>
                {topStories.slice(2).map((story) => (
                  <div key={story.id} className="border-b md:border-r last:border-b-0 p-4" style={{ borderColor: 'var(--brand-border)' }}>
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

            {/* OPINION */}
            <section>
              <OpinionSection />
            </section>

            {/* EMERGING TECH */}
            <section>
              <SectionLabel title="Emerging Technology" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-sm bg-white" style={{ borderColor: 'var(--brand-border)' }}>
                <div className="border-r p-4" style={{ borderColor: 'var(--brand-border)' }}>
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

            {/* VIDEO */}
            <section>
              <SectionLabel title="Video" />
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

            {/* Newsletter CTA */}
            <div className="rounded-sm p-4 border" style={{ background: 'var(--brand-navy)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: 'var(--brand-orange)' }}>DTMI Intelligence</p>
              <h3 className="text-white text-[13px] font-bold mb-2">Get the daily executive briefing</h3>
              <p className="text-[#64748b] text-[11px] mb-3">Top transformation insights delivered to your inbox every morning.</p>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full text-white text-[12px] px-3 py-2 mb-2 focus:outline-none transition-colors placeholder-[#475569]"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button className="btn-orange w-full text-[12px] font-black py-2 uppercase tracking-wider rounded-sm">
                Subscribe Free
              </button>
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

      {/* ── MORE STORIES ── */}
      <div className="border-t" style={{ background: 'white', borderColor: 'var(--brand-border)' }}>
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <SectionLabel title="More from DTMI" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...topStories, ...emergingTech].slice(0, 6).map((story) => (
              <StoryCard key={story.id + '-more'} story={story} size="sm" />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
