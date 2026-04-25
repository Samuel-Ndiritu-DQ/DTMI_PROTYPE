import { useRef, useState, useEffect } from 'react';
import { useNav } from '../context/NavContext';
import { podcastEpisodes } from '../data/mockData';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Clock, Users, Headphones, Link, Bookmark, Share2 } from 'lucide-react';

// Free sample audio files (public domain)
const AUDIO_SOURCES = {
  'pod-1': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'pod-2': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'pod-3': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'pod-4': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  default: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
};

function PodcastPlayer({ src, title, host, image }) {
  const audioRef = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [volume,      setVolume]      = useState(1);

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

  const handleLoadedMetadata = () => {
    const a = audioRef.current;
    if (a) setDuration(a.duration);
  };

  const handleSeek = (e) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * a.duration;
  };

  const skip = (secs) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + secs));
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    setMuted(v === 0);
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const handleEnded = () => setPlaying(false);

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-sm overflow-hidden" style={{ background: 'var(--brand-navy)' }}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Top section with artwork */}
      <div className="flex gap-5 p-6 border-b border-white/8">
        <div className="shrink-0 w-28 h-28 rounded-sm overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Headphones size={12} style={{ color: 'var(--brand-orange)' }} />
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--brand-orange)' }}>Podcast</span>
          </div>
          <h2 className="text-white text-[16px] font-black leading-snug mb-1">{title}</h2>
          <p className="text-[#64748b] text-[12px]">{host}</p>
        </div>
      </div>

      {/* Player controls */}
      <div className="px-6 py-5">
        {/* Progress bar */}
        <div
          className="w-full h-1.5 rounded-full mb-2 cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          onClick={handleSeek}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, background: 'var(--brand-orange)' }}
          />
        </div>
        <div className="flex items-center justify-between text-[#64748b] text-[11px] font-mono mb-4">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-5 mb-4">
          <button onClick={() => skip(-15)} className="text-[#94a3b8] hover:text-white transition-colors flex flex-col items-center gap-0.5">
            <SkipBack size={20} />
            <span className="text-[9px]">15s</span>
          </button>
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white transition-colors"
            style={{ background: 'var(--brand-orange)' }}
          >
            {playing
              ? <Pause size={22} fill="white" />
              : <Play  size={22} fill="white" className="ml-1" />
            }
          </button>
          <button onClick={() => skip(30)} className="text-[#94a3b8] hover:text-white transition-colors flex flex-col items-center gap-0.5">
            <SkipForward size={20} />
            <span className="text-[9px]">30s</span>
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <button onClick={toggleMute} className="text-[#64748b] hover:text-white transition-colors shrink-0">
            {muted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            onChange={handleVolume}
            className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: 'var(--brand-orange)' }}
          />
        </div>
      </div>
    </div>
  );
}

function RelatedEpisodeCard({ ep, onOpen }) {
  return (
    <button
      onClick={() => onOpen(ep)}
      className="w-full text-left group flex gap-3 py-3 border-b last:border-0"
      style={{ borderColor: 'var(--brand-border)' }}
    >
      <div className="relative shrink-0 w-16 h-16 overflow-hidden rounded-sm">
        <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-black uppercase tracking-wider mb-0.5" style={{ color: 'var(--brand-orange)' }}>{ep.episode} Â· {ep.category}</p>
        <p className="text-[12px] font-bold leading-snug line-clamp-2 text-white group-hover:text-[#ccc] transition-colors">{ep.title}</p>
        <p className="text-[10px] mt-0.5 text-[#64748b] flex items-center gap-1"><Clock size={8} /> {ep.duration} Â· {ep.plays} plays</p>
      </div>
    </button>
  );
}

export default function PodcastPage() {
  const { page, goBack, openPodcast } = useNav();
  const [copied, setCopied] = useState(false);
  const item = page?.item;
  if (!item) return null;

  const audioSrc = AUDIO_SOURCES[item.id] || AUDIO_SOURCES.default;
  const related  = podcastEpisodes.filter(e => e.id !== item.id);

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
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border rounded-sm text-[#94a3b8] hover:text-white transition-colors" style={{ borderColor: '#333' }}>
              <Link size={12} /> {copied ? 'Copied!' : 'Copy link'}
            </button>
            <button className="p-1.5 border rounded-sm text-[#94a3b8] hover:text-white transition-colors" style={{ borderColor: '#333' }}>
              <Bookmark size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* â”€â”€ MAIN (2/3) â”€â”€ */}
          <div className="lg:col-span-2 space-y-6">

            {/* Player */}
            <PodcastPlayer
              src={audioSrc}
              title={item.title}
              host={item.host}
              image={item.image}
            />

            {/* Meta */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm text-white" style={{ background: 'var(--brand-orange)' }}>
                  {item.episode}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--brand-orange)' }}>
                  {item.category}
                </span>
              </div>

              <h1 className="text-white text-[22px] lg:text-[26px] font-black leading-tight mb-4">
                {item.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-5 border-b" style={{ borderColor: 'var(--brand-border)' }}>
                <div className="flex items-center gap-3 text-[#64748b] text-[12px]">
                  <span className="text-white font-semibold">{item.host}</span>
                  <span>Â·</span>
                  <span>Guest: {item.guest}</span>
                  <span>Â·</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {item.duration}</span>
                  <span>Â·</span>
                  <span className="flex items-center gap-1"><Users size={10} /> {item.plays} plays</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border rounded-sm text-[#0077b5] hover:bg-white/5 transition-colors" style={{ borderColor: '#333' }}>
                    <Share2 size={12} /> Share
                  </button>
                  <button onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border rounded-sm text-[#94a3b8] hover:text-white hover:bg-white/5 transition-colors" style={{ borderColor: '#333' }}>
                    <Link size={12} /> {copied ? 'Copied!' : 'Copy link'}
                  </button>
                </div>
              </div>

              <p className="text-[#94a3b8] text-[15px] leading-relaxed mb-6">{item.description}</p>
            </div>

            {/* Episode notes */}
            <div className="border rounded-sm p-5" style={{ borderColor: 'var(--brand-border)', background: 'white' }}>
              <p className="text-[11px] font-black uppercase tracking-wider mb-4" style={{ color: 'var(--brand-orange)' }}>Episode Notes</p>
              <div className="space-y-4 text-[#94a3b8] text-[14px] leading-relaxed">
                <p>In this episode, {item.host} sits down with {item.guest} to explore the most pressing questions facing digital transformation leaders today.</p>
                <p>The conversation covers the current state of digital adoption across sectors, the governance frameworks that are proving most effective, and the common failure patterns that continue to derail transformation programs.</p>
                <p>Key topics discussed:</p>
                <ul className="space-y-2 ml-4">
                  {[
                    `The current state of ${item.category} transformation globally`,
                    'What separates digital leaders from laggards in 2026',
                    'Practical frameworks for executive decision-making',
                    'The role of governance in sustainable transformation',
                    'Predictions for the next 12â€“18 months',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--brand-orange)' }} />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="text-[12px] text-[#64748b]">Published: {item.date} Â· Duration: {item.duration}</p>
              </div>
            </div>
          </div>

          {/* â”€â”€ SIDEBAR (1/3) â”€â”€ */}
          <aside className="space-y-5">
            <div className="border rounded-sm p-4" style={{ borderColor: 'var(--brand-border)', background: 'white' }}>
              <h3 className="text-[12px] font-black uppercase tracking-wider mb-3 pb-2 border-b text-white" style={{ borderColor: 'var(--brand-border)' }}>
                More Episodes
              </h3>
              {related.map(ep => (
                <RelatedEpisodeCard key={ep.id} ep={ep} onOpen={openPodcast} />
              ))}
            </div>

            {/* Subscribe */}
            <div className="rounded-sm p-4" style={{ background: 'var(--brand-navy)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--brand-orange)' }}>DTMI Podcast</p>
              <h3 className="text-white text-[13px] font-bold mb-2">Subscribe to the show</h3>
              <p className="text-[#64748b] text-[11px] mb-3">New episodes every week on digital transformation, AI, and the future of organizations.</p>
              <button className="btn-orange w-full text-[12px] font-black py-2 uppercase tracking-wider rounded-sm">
                Subscribe Free
              </button>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
