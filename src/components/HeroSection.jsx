import { heroStory, heroSideStories } from '../data/mockData';
import { Clock, BookOpen } from 'lucide-react';
import { useNav } from '../context/NavContext';

const sevDot = { Critical: '#dc2626', High: '#ea580c', Medium: '#d97706', Low: '#16a34a' };

export default function HeroSection() {
  const { openArticle } = useNav();
  return (
    <section style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>

          {/* ── HERO (left 2/3) ── */}
          <div className="lg:col-span-2 relative group cursor-pointer card-hover" style={{ background: 'var(--brand-navy)' }} onClick={() => openArticle(heroStory)}>
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img
                src={heroStory.image}
                alt={heroStory.headline}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
              />
              <div className="img-overlay absolute inset-0" />
              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span className="text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm" style={{ background: 'var(--brand-orange)' }}>
                  {heroStory.tag}
                </span>
              </div>
              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 pt-10">
                <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
                  {heroStory.category}
                </p>
                <h1 className="text-white text-base sm:text-xl lg:text-2xl xl:text-[28px] font-black leading-tight mb-2 drop-shadow-lg">
                  {heroStory.headline}
                </h1>
                <p className="text-[#cbd5e1] text-[13px] leading-relaxed hidden md:block mb-3 max-w-2xl">
                  {heroStory.summary}
                </p>
                <div className="flex items-center gap-3 text-[#94a3b8] text-[11px]">
                  <span className="flex items-center gap-1"><Clock size={10} /> {heroStory.timestamp}</span>
                  <span className="opacity-40">·</span>
                  <span className="flex items-center gap-1"><BookOpen size={10} /> {heroStory.readTime}</span>
                  <span className="opacity-40">·</span>
                  <span>{heroStory.author}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── SIDE STORIES (right 1/3) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {heroSideStories.map((story) => (
              <div key={story.id} className="flex gap-3 p-3 cursor-pointer group" style={{ background: 'var(--brand-navy)' }} onClick={() => openArticle({ ...story, headline: story.headline })}>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: sevDot[story.severity] || '#94a3b8' }} />
                      <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: 'var(--brand-orange)' }}>{story.category}</p>
                    </div>
                    <h3 className="text-white text-[12px] font-bold leading-snug group-hover:text-[#cbd5e1] transition-colors line-clamp-3">
                      {story.headline}
                    </h3>
                  </div>
                  <p className="text-[#64748b] text-[10px] mt-2 flex items-center gap-1">
                    <Clock size={9} /> {story.timestamp}
                  </p>
                </div>
                <div className="shrink-0 w-20 h-16 overflow-hidden rounded-sm">
                  <img
                    src={story.image}
                    alt={story.headline}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
