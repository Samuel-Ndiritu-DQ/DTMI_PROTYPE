import { useRef, useState, useEffect } from 'react';
import { useNav } from '../context/NavContext';
import { videoEpisodes } from '../data/mockData';
import {
  ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  Clock, Users, Share2, Bookmark, Link, ChevronRight, Video as VideoIcon
} from 'lucide-react';
import PageMeta from '../components/PageMeta';

const VIDEO_SOURCES = {
  'vid-1': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'vid-2': 'https://www.w3schools.com/html/movie.mp4',
  'vid-3': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'vid-4': 'https://www.w3schools.com/html/movie.mp4',
  default: 'https://www.w3schools.com/html/mov_bbb.mp4',
};

const CAT_COLORS = {
  AI: '#8b5cf6', Cybersecurity: '#ef4444', Cloud: '#06b6d4',
  Strategy: '#10b981', DCO: '#f59e0b', Workspace: '#ec4899',
  default: 'var(--brand-orange)',
};
const catColor = (cat) => CAT_COLORS[cat] || CAT_COLORS.default;

/* Seekable progress bar */
function ProgressBar({ progress, onSeek, color, buffered = 0 }) {
  const [hovering, setHovering] = useState(false);
  const [hoverPct, setHoverPct] = useState(0);
  const barRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = barRef.current?.getBoundingClientRect();
    if (!rect) return;
    setHoverPct(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * 100);
  };

  return (
    <div
      ref={barRef}
      className="relative w-full cursor-pointer"
      style={{ height: hovering ? 6 : 4, transition: 'height 0.15s ease' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
      onClick={onSeek}
    >
      <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
      <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${buffered}%`, background: 'rgba(255,255,255,0.1)' }} />
      <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${progress}%`, background: color }} />
      {hovering && (
        <div className="absolute top-1/2 w-3 h-3 rounded-full shadow-lg" style={{ left: `${hoverPct}%`, transform: 'translate(-50%, -50%)', background: color }} />
      )}
    </div>
  );
}

/* Full-featured video player */
function VideoPlayer({ src, poster, color }) {
  const videoRef    = useRef(null);
  const containerRef = useRef(null);
  const [playing,     setPlaying]     = useState(false);
  const [muted,       setMuted]       = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [buffered,    setBuffered]    = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume,      setVolume]      = useState(1);
  const [fullscreen,  setFullscreen]  = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [speed,       setSpeed]       = useState(1);
  const hideTimer = useRef(null);

  const showCtrl = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    if (playing) hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); hideTimer.current = setTimeout(() => setShowControls(false), 3000); }
    else          { v.pause(); setPlaying(false); setShowControls(true); clearTimeout(hideTimer.current); }
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
  };
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    if (v.buffered.length) setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
  };
  const handleLoadedMetadata = () => { if (videoRef.current) setDuration(videoRef.current.duration); };
  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };
  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val); setMuted(val === 0);
    if (videoRef.current) videoRef.current.volume = val;
  };
  const cycleSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
  };
  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen().then(() => setFullscreen(true)).catch(() => {});
    else document.exitFullscreen().then(() => setFullscreen(false)).catch(() => {});
  };
  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-black rounded-xl overflow-hidden group"
      style={{ aspectRatio: '16/9' }}
      onMouseMove={showCtrl}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => { setPlaying(false); setShowControls(true); }}
        onClick={togglePlay}
        playsInline
      />

      {/* Center play/pause flash */}
      {!playing && (
        <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: `${color}cc`, boxShadow: `0 8px 40px ${color}80` }}>
            <Play size={32} className="text-white ml-1" fill="white" />
          </div>
        </button>
      )}

      {/* Controls overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end transition-opacity duration-300"
        style={{ opacity: showControls ? 1 : 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)' }}
      >
        {/* Progress */}
        <div className="px-4 pb-1">
          <ProgressBar progress={progress} buffered={buffered} onSeek={handleSeek} color={color} />
          <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-white/60">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* Buttons row */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="text-white transition-opacity hover:opacity-70">
              {playing ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
            </button>
            <button onClick={toggleMute} className="text-white transition-opacity hover:opacity-70">
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <input type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume}
              onChange={handleVolume}
              className="w-20 h-1 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: color }} />
            <span className="text-white text-[11px] font-mono">{fmt(currentTime)} / {fmt(duration)}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={cycleSpeed} className="text-[11px] font-black px-2 py-0.5 rounded-sm text-white" style={{ background: 'rgba(255,255,255,0.15)' }}>
              {speed}×
            </button>
            <button onClick={toggleFullscreen} className="text-white transition-opacity hover:opacity-70">
              {fullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Related video card - YouTube-style */
function RelatedCard({ ep, onOpen, active }) {
  const color = catColor(ep.category);
  return (
    <button
      onClick={() => onOpen(ep)}
      className="w-full text-left flex gap-3 rounded-lg p-2 transition-all group"
      style={{ background: active ? `${color}15` : 'transparent' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      {/* Thumbnail */}
      <div className="relative shrink-0 w-28 h-16 overflow-hidden rounded-lg">
        <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <Play size={14} className="text-white" fill="white" />
        </div>
        {ep.duration && (
          <span className="absolute bottom-1 right-1 bg-black/85 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">{ep.duration}</span>
        )}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold leading-snug line-clamp-2 mb-1" style={{ color: active ? color : 'white' }}>
          {ep.title || ep.headline}
        </p>
        <p className="text-[10px]" style={{ color: '#64748b' }}>DigitalQatalyst</p>
        <p className="text-[10px]" style={{ color: '#64748b' }}>{ep.views || ep.plays} views · {ep.timestamp || ep.date}</p>
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
  const host     = item.host || 'DigitalQatalyst';
  const date     = item.date || item.timestamp || 'Apr 23, 2026';
  const views    = item.views || '';
  const duration = item.duration || '';
  const poster   = item.image || '';
  const color    = catColor(category);
  const videoSrc = VIDEO_SOURCES[item.id] || VIDEO_SOURCES.default;
  const related  = videoEpisodes.filter(v => v.id !== item.id).slice(0, 6);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
      <PageMeta title={title} description={desc} />

      {/* ── TOP BAR ── */}
      <div className="sticky top-0 z-40 border-b" style={{ background: 'rgba(10,15,30,0.92)', backdropFilter: 'blur(16px)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1440px] mx-auto px-4 h-12 flex items-center justify-between">
          <button onClick={goBack} className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide transition-opacity hover:opacity-70" style={{ color: '#94a3b8' }}>
            <ArrowLeft size={15} /> Back
          </button>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-sm transition-opacity hover:opacity-70" style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}>
              <Link size={11} /> {copied ? 'Copied!' : 'Copy link'}
            </button>
            <button className="p-2 rounded-sm transition-opacity hover:opacity-70" style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}>
              <Bookmark size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── LEFT: Player + info (2/3) ── */}
          <div className="xl:col-span-2 space-y-5">

            {/* Player */}
            <VideoPlayer src={videoSrc} poster={poster} color={color} />

            {/* Title + meta */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: `${color}20`, color }}>
                  {category}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}>
                  Video
                </span>
              </div>

              <h1 className="text-white text-[22px] lg:text-[28px] font-black leading-tight mb-3">{title}</h1>

              {/* Stats + actions row */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-4 border-b border-white/8">
                <div className="flex items-center gap-3 text-[12px]" style={{ color: '#64748b' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-black" style={{ background: color }}>DQ</div>
                    <span className="font-semibold" style={{ color: '#94a3b8' }}>{host}</span>
                  </div>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {date}</span>
                  {duration && <><span>·</span><span>{duration}</span></>}
                  {views && <><span>·</span><span className="flex items-center gap-1"><Users size={10} /> {views} views</span></>}
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold transition-opacity hover:opacity-80" style={{ background: color, color: 'white' }}>
                    <Share2 size={12} /> Share
                  </button>
                  <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold transition-opacity hover:opacity-80" style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                    <Link size={12} /> {copied ? 'Copied!' : 'Copy link'}
                  </button>
                </div>
              </div>

              {/* Description */}
              {desc && <p className="text-[14px] leading-relaxed mb-5" style={{ color: '#94a3b8' }}>{desc}</p>}

              {/* Key points */}
              <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-[11px] font-black uppercase tracking-widest mb-4" style={{ color }}>Key Points Covered</p>
                <ul className="space-y-2.5">
                  {[
                    'The current state of digital transformation across global enterprises',
                    'Key frameworks and methodologies driving successful transformation',
                    'Common failure patterns and how to avoid them',
                    'Practical recommendations for executive leaders',
                    'What the data says about the next 12–18 months',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-[13px]" style={{ color: '#94a3b8' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Up next sidebar ── */}
          <aside className="space-y-5">
            {/* Up next */}
            <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <p className="text-[11px] font-black uppercase tracking-widest text-white">Up Next</p>
                <span className="text-[10px]" style={{ color: '#64748b' }}>{related.length} videos</span>
              </div>
              <div className="py-2 px-1 space-y-1">
                {related.map(ep => (
                  <RelatedCard key={ep.id} ep={ep} onOpen={openVideo} active={false} />
                ))}
              </div>
            </div>

            {/* Subscribe CTA */}
            <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}20 0%, rgba(13,27,62,0.9) 100%)`, border: `1px solid ${color}30` }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: color, filter: 'blur(30px)', transform: 'translate(30%, -30%)' }} />
              <VideoIcon size={20} className="mb-3" style={{ color }} />
              <p className="text-white font-black text-[14px] mb-1">Get the daily briefing</p>
              <p className="text-[12px] mb-4" style={{ color: '#64748b' }}>New video intelligence every week on digital transformation, AI, and the future of organizations.</p>
              <input type="email" placeholder="Your work email"
                className="w-full text-white text-[12px] px-3 py-2 mb-2 rounded-lg focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
              <button className="w-full py-2.5 rounded-lg text-white font-black text-[12px] uppercase tracking-wide transition-all hover:opacity-90" style={{ background: color }}>
                Subscribe Free
              </button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
