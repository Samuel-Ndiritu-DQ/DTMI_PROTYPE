import { useRef, useState, useEffect } from 'react';
import { useNav } from '../context/NavContext';
import { videoEpisodes, videoContent, topStories } from '../data/mockData';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Clock, Users, Share2, Bookmark, Link } from 'lucide-react';

// Free-to-use public domain / CC0 videos from archive.org / sample sources
const VIDEO_SOURCES = {
  'vid-1': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'vid-2': 'https://www.w3schools.com/html/movie.mp4',
  'vid-3': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'vid-4': 'https://www.w3schools.com/html/movie.mp4',
  // fallback for any other id
  default: 'https://www.w3schools.com/html/mov_bbb.mp4',
};

function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const [playing, setPlaying]   = useState(false);
  const [muted,   setMuted]     = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const handleEnded = () => setPlaying(false);

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setFullscreen(false)).catch(() => {});
    }
  };

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={containerRef} className="relative bg-black group" style={{ aspectRatio: '16/9' }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onClick={togglePlay}
        playsInline
      />

      {/* Big play button overlay when paused */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-orange)' }}>
            <Play size={26} className="text-white ml-1" fill="white" />
          </div>
        </button>
      )}

      {/* Controls bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Progress bar */}
        <div
          className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, background: 'var(--brand-orange)' }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="text-white hover:opacity-70 transition-opacity">
              {playing ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" />}
            </button>
            <button onClick={toggleMute} className="text-white hover:opacity-70 transition-opacity">
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <span className="text-white text-[11px] font-mono">
              {fmt(currentTime)} / {fmt(duration)}
            </span>
          </div>
          <button onClick={toggleFullscreen} className="text-white hover:opacity-70 transition-opacity">
            <Maximize size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function RelatedVideoCard({ ep, onOpen }) {
  return (
    <button
      onClick={() => onOpen(ep)}
      className="w-full text-left group flex gap-3 py-3 border-b last:border-0"
      style={{ borderColor: 'var(--brand-border)' }}
    >
      <div className="relative shrink-0 w-24 h-14 overflow-hidden rounded-sm">
        <img src={ep.image} alt={ep.title || ep.headline} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={14} className="text-white" fill="white" />
        </div>
        {ep.duration && (
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1 py-0.5">{ep.duration}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wider mb-0.5" style={{ color: 'var(--brand-orange)' }}>{ep.category}</p>
        <p className="text-[12px] font-bold leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--brand-navy)' }}>
          {ep.title || ep.headline}
        </p>
        {ep.views && <p className="text-[10px] mt-0.5" style={{ color: 'var(--brand-muted)' }}>{ep.views} views</p>}
      </div>
    </button>
  );
}

export default function VideoPage() {
  const { page, goBack, openVideo } = useNav();
  const [copied, setCopied] = useState(false);
  const item = page?.item;
  if (!item) return null;

  const title    = item.title || item.headline || '';
  const category = item.category || '';
  const desc     = item.description || item.summary || '';
  const host     = item.host || 'DTMI Research Desk';
  const date     = item.date || item.timestamp || 'Apr 23, 2026';
  const views    = item.views || '';
  const duration = item.duration || '';
  const label    = item.label || 'VIDEO';
  const poster   = item.image || '';
  const videoSrc = VIDEO_SOURCES[item.id] || VIDEO_SOURCES.default;

  const related = [...videoEpisodes].filter(v => v.id !== item.id).slice(0, 5);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">

      {/* â”€â”€ BACK BAR â”€â”€ */}
      <div className="border-b sticky top-0 z-40" style={{ background: 'white', borderColor: 'var(--brand-border)' }}>
        <div className="max-w-[1280px] mx-auto px-4 h-11 flex items-center justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-[#94a3b8] hover:text-white transition-colors"
          >
            <ArrowLeft size={15} /> Back
          </button>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border rounded-sm transition-colors text-[#94a3b8] hover:text-white" style={{ borderColor: '#333' }}>
              <Link size={12} /> {copied ? 'Copied!' : 'Copy link'}
            </button>
            <button className="p-1.5 border rounded-sm transition-colors text-[#94a3b8] hover:text-white" style={{ borderColor: '#333' }}>
              <Bookmark size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* â”€â”€ MAIN (2/3) â”€â”€ */}
          <div className="lg:col-span-2">

            {/* Video player */}
            <div className="rounded-sm overflow-hidden mb-5">
              <VideoPlayer src={videoSrc} poster={poster} />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm text-white" style={{ background: 'var(--brand-orange)' }}>
                {label}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--brand-orange)' }}>
                {category}
              </span>
            </div>

            <h1 className="text-white text-[22px] lg:text-[26px] font-black leading-tight mb-4">
              {title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-5 border-b" style={{ borderColor: 'var(--brand-border)' }}>
              <div className="flex items-center gap-3 text-[#64748b] text-[12px]">
                <span className="font-semibold">{host}</span>
                <span>Â·</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {date}</span>
                {duration && <><span>Â·</span><span>{duration}</span></>}
                {views && <><span>Â·</span><span className="flex items-center gap-1"><Users size={10} /> {views} views</span></>}
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border rounded-sm transition-colors text-[#0077b5] hover:bg-white/5" style={{ borderColor: '#333' }}>
                  <Share2 size={12} /> Share
                </button>
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border rounded-sm transition-colors text-[#94a3b8] hover:text-white hover:bg-white/5" style={{ borderColor: '#333' }}>
                  <Link size={12} /> {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
            </div>

            {/* Description */}
            {desc && (
              <p className="text-[#94a3b8] text-[15px] leading-relaxed mb-6">{desc}</p>
            )}

            {/* Key points */}
            <div className="border rounded-sm p-4" style={{ borderColor: 'var(--brand-border)', background: 'white' }}>
              <p className="text-[11px] font-black uppercase tracking-wider mb-3" style={{ color: 'var(--brand-orange)' }}>Key Points Covered</p>
              <ul className="space-y-2">
                {[
                  'The current state of digital transformation across global enterprises',
                  'Key frameworks and methodologies driving successful transformation',
                  'Common failure patterns and how to avoid them',
                  'Practical recommendations for executive leaders',
                  'What the data says about the next 12â€“18 months',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-[#94a3b8]">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--brand-orange)' }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* â”€â”€ SIDEBAR (1/3) â”€â”€ */}
          <aside className="space-y-5">
            <div className="border rounded-sm p-4" style={{ borderColor: 'var(--brand-border)', background: 'white' }}>
              <h3 className="text-[12px] font-black uppercase tracking-wider mb-3 pb-2 border-b text-white" style={{ borderColor: 'var(--brand-border)' }}>
                More Videos
              </h3>
              {related.map(ep => (
                <RelatedVideoCard key={ep.id} ep={ep} onOpen={openVideo} />
              ))}
            </div>

            {/* Newsletter */}
            <div className="rounded-sm p-4" style={{ background: 'var(--brand-navy)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--brand-orange)' }}>DTMI Intelligence</p>
              <h3 className="text-white text-[13px] font-bold mb-2">Get the daily briefing</h3>
              <input type="email" placeholder="Your email" className="w-full text-white text-[12px] px-3 py-2 mb-2 focus:outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} />
              <button className="btn-orange w-full text-[12px] font-black py-2 uppercase tracking-wider rounded-sm">Subscribe Free</button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
