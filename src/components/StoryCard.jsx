import { Clock, Play, BarChart2, Mic } from 'lucide-react';
import { useNav } from '../context/NavContext';

/* CNN-style content type badge */
function ContentTypeBadge({ label, isVideo, isPodcast }) {
  if (!label && !isVideo && !isPodcast) return null;
  const type = label || (isVideo ? 'VIDEO' : isPodcast ? 'PODCAST' : null);
  if (!type) return null;

  const styles = {
    VIDEO:     { bg: 'rgba(0,0,0,0.75)', icon: <Play size={8} className="inline mr-0.5" fill="white" /> },
    ANALYSIS:  { bg: '#1d4ed8', icon: <BarChart2 size={8} className="inline mr-0.5" /> },
    PODCAST:   { bg: '#7c3aed', icon: <Mic size={8} className="inline mr-0.5" /> },
    EXCLUSIVE: { bg: 'var(--brand-orange)', icon: null },
    'MUST READ':{ bg: 'var(--brand-orange)', icon: null },
  };
  const s = styles[type.toUpperCase()] || { bg: 'var(--brand-orange)', icon: null };

  return (
    <span className="text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm inline-flex items-center" style={{ background: s.bg }}>
      {s.icon}{type}
    </span>
  );
}

export default function StoryCard({ story, size = 'md', showImage = true, horizontal = false }) {
  const { openArticle, openVideo, openPodcast } = useNav();

  const isVideo   = story.label === 'VIDEO'   || (story.duration && story.views);
  const isPodcast = story.label === 'PODCAST' || (story.duration && story.plays);

  const handleClick = () => {
    if (isVideo)        openVideo(story);
    else if (isPodcast) openPodcast(story);
    else                openArticle(story);
  };

  if (horizontal) {
    return (
      <div onClick={handleClick} className="flex gap-3 cursor-pointer card-hover group py-3 border-b last:border-0" style={{ borderColor: 'var(--brand-border)' }}>
        {showImage && story.image && (
          <div className="shrink-0 w-24 h-16 overflow-hidden rounded-sm">
            <img src={story.image} alt={story.headline} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {story.category && (
            <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: 'var(--brand-orange)' }}>{story.category}</p>
          )}
          <h3 className={`font-bold leading-snug transition-colors line-clamp-2 group-hover:opacity-70 ${size === 'sm' ? 'text-[11px]' : 'text-[12px]'}`} style={{ color: 'var(--brand-navy)' }}>
            {story.headline}
          </h3>
          {story.timestamp && (
            <p className="text-[10px] mt-1 flex items-center gap-1" style={{ color: 'var(--brand-muted)' }}>
              <Clock size={8} /> {story.timestamp}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div onClick={handleClick} className="cursor-pointer card-hover group">
      {showImage && story.image && (
        <div className="relative overflow-hidden rounded-sm mb-2.5" style={{ aspectRatio: '16/9' }}>
          <img
            src={story.image}
            alt={story.headline}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
            loading="lazy"
          />
          {/* CNN-style content type badge top-left */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <ContentTypeBadge label={isVideo ? 'VIDEO' : isPodcast ? 'PODCAST' : null} isVideo={isVideo} isPodcast={isPodcast} />
            {story.tag && !story.label && (
              <span className="text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm" style={{ background: 'var(--brand-orange)' }}>
                {story.tag}
              </span>
            )}
          </div>
          {story.duration && (
            <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
              {story.duration}
            </div>
          )}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-orange)' }}>
                <Play size={16} className="text-white ml-0.5" fill="white" />
              </div>
            </div>
          )}
          {isPodcast && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#7c3aed' }}>
                <Mic size={14} className="text-white" />
              </div>
            </div>
          )}
        </div>
      )}
      <div>
        {/* Category + content type inline - McKinsey style */}
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {story.category && (
            <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: 'var(--brand-orange)' }}>{story.category}</p>
          )}
          {story.label && story.label !== 'VIDEO' && !showImage && (
            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-sm" style={{ background: '#fff7ed', color: 'var(--brand-orange)' }}>
              {story.label}
            </span>
          )}
        </div>
        <h3
          className={`font-bold leading-snug group-hover:opacity-70 transition-opacity ${
            size === 'lg' ? 'text-[15px]' : size === 'sm' ? 'text-[11px]' : 'text-[13px]'
          }`}
          style={{ color: 'var(--brand-navy)' }}
        >
          {story.headline}
        </h3>
        {story.summary && size !== 'sm' && (
          <p className="text-[12px] leading-relaxed mt-1.5 line-clamp-2" style={{ color: 'var(--brand-muted)' }}>{story.summary}</p>
        )}
        <div className="flex items-center gap-2 mt-1.5 text-[10px]" style={{ color: '#9ca3af' }}>
          {story.timestamp && <span className="flex items-center gap-1"><Clock size={8} /> {story.timestamp}</span>}
          {story.readTime && <><span>·</span><span>{story.readTime} read</span></>}
          {story.views && <><span>·</span><span>{story.views} views</span></>}
        </div>
      </div>
    </div>
  );
}
