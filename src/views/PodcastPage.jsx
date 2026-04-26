import { useRef, useState, useEffect } from 'react';
import PageMeta from '../components/PageMeta';
import { useNav } from '../context/NavContext';
import { podcastEpisodes } from '../data/mockData';
import {
  ArrowLeft, Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Clock, Users, Headphones,
  Link, Bookmark, Share2, ChevronRight, Mic
} from 'lucide-react';

const AUDIO_SOURCES = {
  'pod-1': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'pod-2': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'pod-3': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'pod-4': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  default: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
};

const CAT_COLORS = {
  AI: '#8b5cf6', Cybersecurity: '#ef4444', Cloud: '#06b6d4',
  Strategy: '#10b981', DCO: '#f59e0b', Workspace: '#ec4899',
  default: 'var(--brand-orange)',
};
const catColor = (cat) => CAT_COLORS[cat] || CAT_COLORS.default;

/* Animated waveform bars */
function Waveform({ color, playing }) {
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 20 }}>
      {[5, 10, 15, 8, 12, 18, 10, 6, 14, 9, 16, 7].map((h, i) => (
        <div key={i} style={{
          width: 2.5, height: playing ? h : 3,
          background: color, borderRadius: 2,
          transition: `height ${0.15 + i * 0.04}s ease`,
          opacity: playing ? 1 : 0.35,
        }} />
      ))}
    </div>
  );
}

/* Seekable progress bar with hover scrubbing */
function ProgressBar({ progress, onSeek, color }) {
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
      className="relative w-full cursor-pointer group"
      style={{ height: hovering ? 6 : 4, transition: 'height 0.15s ease' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
      onClick={onSeek}
    >
      {/* Track */}
      <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
      {/* Buffered (mock) */}
      <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.min(progress + 15, 100)}%`, background: 'rgba(255,255,255,0.08)' }} />
      {/* Played */}
      <div className="absolute inset-y-0 left-0 rounded-full transition-all" style={{ width: `${progress}%`, background: color }} />
      {/* Scrub thumb */}
      {hovering && (
        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-lg" style={{ left: `${hoverPct}%`, transform: 'translate(-50%, -50%)', background: color }} />
      )}
    </div>
  );
}

/* Full podcast player */
function PodcastPlayer({ src, item, color }) {
  const audioRef = useRef(null);
  const [playing, setPlaying]   = useState(false);
  const [muted,   setMuted]     = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [volume,      setVolume]      = useState(1);
  const [speed,       setSpeed]       = useState(1);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); }
    else          { a.pause(); setPlaying(false); }
  };
  const handleTimeUpdate = () => {
    const a = audioRef.current;
    if (!a) return;
    setCurrentTime(a.currentTime);
    setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
  };
  const handleLoadedMetadata = () => { if (audioRef.current) setDuration(audioRef.current.duration); };
  const handleSeek = (e) => {
    const a = audioRef.current;
    if (!a?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * a.duration;
  };
  const skip = (s) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + s));
  };
  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v); setMuted(v === 0);
    if (audioRef.current) audioRef.current.volume = v;
  };
  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted; setMuted(a.muted);
  };
  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };
  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <audio ref={audioRef} src={src}
        onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)} preload="metadata" />

      {/* Artwork + info hero */}
      <div className="relative overflow-hidden">
        {/* Blurred background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'blur(40px) brightness(0.3)', transform: 'scale(1.2)'
        }} />
        <div className="absolute inset-0" style={{ background: 'rgba(10,15,30,0.7)' }} />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 p-6 pb-8">
          {/* Album art */}
          <div className="shrink-0 relative">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden shadow-2xl" style={{ boxShadow: `0 20px 60px ${color}40` }}>
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            {playing && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <Waveform color={color} playing />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <Headphones size={11} style={{ color }} />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>Podcast</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${color}20`, color }}>
                {item.category}
              </span>
            </div>
            <h2 className="text-white text-[20px] sm:text-[24px] font-black leading-tight mb-1">{item.title}</h2>
            <p className="text-[13px] mb-1" style={{ color: '#94a3b8' }}>{item.host}</p>
            {item.guest && <p className="text-[12px]" style={{ color: '#64748b' }}>with {item.guest}</p>}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-5">
        {/* Progress */}
        <ProgressBar progress={progress} onSeek={handleSeek} color={color} />
        <div className="flex items-center justify-between mt-2 mb-5 text-[11px] font-mono" style={{ color: '#64748b' }}>
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>

        {/* Main controls */}
        <div className="flex items-center justify-center gap-6 mb-5">
          <button onClick={() => skip(-15)} className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-70" style={{ color: '#94a3b8' }}>
            <SkipBack size={22} />
            <span className="text-[9px] font-bold">15s</span>
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: color, boxShadow: `0 8px 30px ${color}60` }}
          >
            {playing ? <Pause size={26} fill="white" /> : <Play size={26} fill="white" className="ml-1" />}
          </button>

          <button onClick={() => skip(30)} className="flex flex-col items-center gap-0.5 transition-opacity hover:opacity-70" style={{ color: '#94a3b8' }}>
            <SkipForward size={22} />
            <span className="text-[9px] font-bold">30s</span>
          </button>
        </div>

        {/* Secondary controls */}
        <div className="flex items-center gap-4">
          {/* Speed */}
          <button onClick={cycleSpeed} className="text-[11px] font-black px-2.5 py-1 rounded-full transition-all hover:opacity-80" style={{ background: `${color}20`, color }}>
            {speed}×
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2 flex-1">
            <button onClick={toggleMute} className="shrink-0 transition-opacity hover:opacity-70" style={{ color: '#64748b' }}>
              {muted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <input type="range" min="0" max="1" step="0.05"
              value={muted ? 0 : volume} onChange={handleVolume}
              className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: color }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Related episode row */
function EpisodeRow({ ep, index, onPlay, active }) {
  const color = catColor(ep.category);
  return (
    <button
      onClick={() => onPlay(ep)}
      className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group"
      style={{ background: active ? `${color}15` : 'transparent' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      {/* Index */}
      <span className="w-5 text-center text-[12px] shrink-0" style={{ color: active ? color : '#64748b' }}>
        {active ? <Waveform color={color} playing /> : index + 1}
      </span>
      {/* Art */}
      <div className="relative shrink-0 w-10 h-10 rounded-lg overflow-hidden">
        <img src={ep.image} alt={ep.title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-bold truncate" style={{ color: active ? color : 'white' }}>{ep.title}</p>
        <p className="text-[10px] truncate" style={{ color: '#64748b' }}>{ep.host} · {ep.duration}</p>
      </div>
      {/* Duration */}
      <span className="text-[10px] shrink-0" style={{ color: '#64748b' }}>{ep.plays}</span>
    </button>
  );
}

export default function PodcastPage() {
  const { page, goBack, openPodcast } = useNav();
  const [copied, setCopied] = useState(false);
  const item = page?.item;
  if (!item) return null;

  const color    = catColor(item.category);
  const audioSrc = AUDIO_SOURCES[item.id] || AUDIO_SOURCES.default;
  const related  = podcastEpisodes.filter(e => e.id !== item.id);
  // Normalise fields - items can come from executiveBriefings (headline) or podcastEpisodes (title)
  const title    = item.title || item.headline || '';
  const host     = item.host  || 'DTMI Research Desk';
  const desc     = item.description || item.summary || '';

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
        <div className="max-w-[1280px] mx-auto px-4 h-12 flex items-center justify-between">
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

      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: Player + notes ── */}
          <div className="lg:col-span-2 space-y-6">
            <PodcastPlayer src={audioSrc} item={{ ...item, title, host, description: desc }} color={color} />

            {/* Episode info */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {item.episode && (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: `${color}20`, color }}>
                    {item.episode}
                  </span>
                )}
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}>
                  {item.category}
                </span>
              </div>

              <h1 className="text-white text-[24px] lg:text-[30px] font-black leading-tight mb-3">{title}</h1>

              <div className="flex items-center gap-3 flex-wrap mb-4 text-[12px]" style={{ color: '#64748b' }}>
                <span className="font-semibold" style={{ color: '#94a3b8' }}>{host}</span>
                {item.guest && <><span>·</span><span>with {item.guest}</span></>}
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {item.duration}</span>
                {item.plays && <><span>·</span><span className="flex items-center gap-1"><Headphones size={10} /> {item.plays}</span></>}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mb-5">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold transition-opacity hover:opacity-80" style={{ background: color, color: 'white' }}>
                  <Share2 size={12} /> Share
                </button>
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold transition-opacity hover:opacity-80" style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                  <Link size={12} /> {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>

              {desc && (
                <p className="text-[14px] leading-relaxed" style={{ color: '#94a3b8' }}>{desc}</p>
              )}
            </div>

            {/* Episode notes */}
            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-[11px] font-black uppercase tracking-widest mb-4" style={{ color }}>Episode Notes</p>
              <div className="space-y-3 text-[14px] leading-relaxed" style={{ color: '#94a3b8' }}>
                <p>In this episode, <span className="text-white font-semibold">{host}</span>{item.guest ? ` sits down with ${item.guest}` : ''} to explore the most pressing questions facing digital transformation leaders today.</p>
                <p>The conversation covers the current state of digital adoption across sectors, the governance frameworks proving most effective, and the failure patterns that continue to derail transformation programs.</p>
                <div className="pt-2">
                  <p className="text-white font-bold mb-3 text-[13px]">Topics covered:</p>
                  <ul className="space-y-2">
                    {[
                      `The current state of ${item.category} transformation globally`,
                      'What separates digital leaders from laggards in 2026',
                      'Practical frameworks for executive decision-making',
                      'The role of governance in sustainable transformation',
                      'Predictions for the next 12–18 months',
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-[11px] pt-2 border-t border-white/5" style={{ color: '#475569' }}>
                  Published: {item.date || item.timestamp} · Duration: {item.duration}
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Queue + subscribe ── */}
          <aside className="space-y-5">
            {/* Up next queue */}
            <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <p className="text-[11px] font-black uppercase tracking-widest text-white">Up Next</p>
                <span className="text-[10px]" style={{ color: '#64748b' }}>{related.length} episodes</span>
              </div>
              <div className="py-2 px-1">
                {related.map((ep, i) => (
                  <EpisodeRow key={ep.id} ep={ep} index={i} onPlay={openPodcast} active={false} />
                ))}
              </div>
            </div>

            {/* Subscribe CTA */}
            <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}20 0%, rgba(13,27,62,0.9) 100%)`, border: `1px solid ${color}30` }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: color, filter: 'blur(30px)', transform: 'translate(30%, -30%)' }} />
              <Mic size={20} className="mb-3" style={{ color }} />
              <p className="text-white font-black text-[14px] mb-1">Never miss an episode</p>
              <p className="text-[12px] mb-4" style={{ color: '#64748b' }}>New episodes every week on digital transformation, AI, and the future of organizations.</p>
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
