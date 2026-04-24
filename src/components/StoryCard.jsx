import { Clock, Play } from 'lucide-react';
import { useNav } from '../context/NavContext';

export default function StoryCard({ story, size = 'md', showImage = true, horizontal = false }) {
  const { openArticle, openVideo } = useNav();

  const isVideo = story.label === 'VIDEO' || (story.duration && story.views);

  const handleClick = () => {
    if (isVideo) openVideo(story);
    else openArticle(story);
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
          <h3 className={`font-bold leading-snug transition-colors line-clamp-2 ${size === 'sm' ? 'text-[11px]' : 'text-[12px]'}`} style={{ color: 'var(--brand-navy)' }}>
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
          {story.label && (
            <div className="absolute top-2 left-2">
              <span
                className="text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm"
                style={{ background: story.label === 'VIDEO' ? 'rgba(0,0,0,0.75)' : 'var(--brand-orange)' }}
              >
                {story.label === 'VIDEO' && <Play size={8} className="inline mr-1" fill="white" />}
                {story.label}
              </span>
            </div>
          )}
          {story.duration && (
            <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
              {story.duration}
            </div>
          )}
          {/* Play overlay for videos */}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-orange)' }}>
                <Play size={16} className="text-white ml-0.5" fill="white" />
              </div>
            </div>
          )}
        </div>
      )}
      <div>
        {story.category && (
          <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: 'var(--brand-orange)' }}>{story.category}</p>
        )}
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
