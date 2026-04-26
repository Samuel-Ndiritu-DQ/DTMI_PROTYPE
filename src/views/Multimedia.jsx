import { useState, useRef } from 'react';
import { podcastEpisodes, videoEpisodes, pageMeta } from '../data/mockData';
import { Play, Pause, Headphones, Video, Clock, Users, Search, X, ChevronRight, Mic, TrendingUp, Zap } from 'lucide-react';
import { useNav } from '../context/NavContext';
import PageMeta from '../components/PageMeta';

/* ── Category accent colors ── */
const CAT_COLORS = {
  AI:             '#8b5cf6',
  Cybersecurity:  '#ef4444',
  Cloud:          '#06b6d4',
  Strategy:       '#10b981',
  DCO:            '#f59e0b',
  Workspace:      '#ec4899',
  default:        'var(--brand-orange)',
};
const catColor = (cat) => CAT_COLORS[cat] || CAT_COLORS.default;

/* ── Waveform decoration (pure CSS bars) ── */
function Waveform({ color = 'var(--brand-orange)', playing = false }) {
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 16 }}>
      {[4, 8, 12, 6, 10, 14, 8, 5, 11, 7].map((h, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: playing ? h : 3,
            background: color,
            borderRadius: 1,
            transition: `height ${0.2 + i * 0.05}s ease`,
            opacity: playing ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
}

/* ── Hero spotlight card ── */
function HeroCard({ ep, type, onPlay, isPlaying, onPause }) {
  const color = catColor(ep.category);
  const isVideo = type === 'video';
  return (
    <div
      className="relative overflow-hidden rounded-sm cursor-pointer group"
      style={{ minHeight: 340 }}
      onClick={() => isPlaying ? onPause() : onPlay(ep)}
    >
      {/* Background image */}
      <img
        src={ep.image}
        alt={ep.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="eager"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(135deg, rgba(13,27,62,0.97) 0%, rgba(13,27,62,0.75) 50%, rgba(13,27,62,0.3) 100%)`
      }} />
      {/* Color accent glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{
        background: `linear-gradient(to top, ${color}22, transparent)`
      }} />

      {/* Content */}
      <div className="relative z-10 p-6 lg:p-8 flex flex-col justify-between h-full" style={{ minHeight: 340 }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider" style={{ background: color }}>
              {isVideo ? 'Video' : 'Podcast'}
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
              {ep.category}
            </span>
            {isPlaying && (
              <span className="flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-sm" style={{ background: `${color}30`, color }}>
                <span className="live-blink w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                Now Playing
              </span>
            )}
          </div>
          {isVideo && ep.duration && (
            <span className="bg-black/70 text-white text-[11px] font-bold px-2 py-1 rounded-sm">{ep.duration}</span>
          )}
        </div>

        <div className="mt-auto">
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color }}>
            {isVideo ? 'Featured Video' : `${ep.episode || 'Latest Episode'}`}
          </p>
          <h2 className="text-white text-[22px] lg:text-[28px] font-black leading-tight mb-3 max-w-xl">
            {ep.title}
          </h2>
          <p className="text-[#94a3b8] text-[13px] leading-relaxed mb-5 max-w-lg line-clamp-2">
            {ep.description}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Play button */}
            <button
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-sm font-black text-[13px] uppercase tracking-wide text-white transition-all hover:scale-105"
              style={{ background: color, boxShadow: `0 4px 20px ${color}50` }}
            >
              {isPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" className="ml-0.5" />}
              {isPlaying ? 'Pause' : 'Play Now'}
            </button>

            {/* Meta */}
            <div className="flex items-center gap-3 text-[12px]" style={{ color: '#64748b' }}>
              {ep.host && <span className="font-semibold text-white/70">{ep.host}</span>}
              {ep.duration && <span className="flex items-center gap-1"><Clock size={10} /> {ep.duration}</span>}
              {ep.plays && <span className="flex items-center gap-1"><Headphones size={10} /> {ep.plays}</span>}
              {ep.views && <span className="flex items-center gap-1"><Users size={10} /> {ep.views} views</span>}
            </div>

            {/* Waveform for podcast */}
            {!isVideo && <Waveform color={color} playing={isPlaying} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Podcast row card (Spotify-style) ── */
function PodcastRow({ ep, index, onPlay, isPlaying }) {
  const color = catColor(ep.category);
  return (
    <div
      onClick={() => onPlay(ep)}
      className="flex items-center gap-3 px-3 py-2.5 rounded-sm cursor-pointer group transition-all"
      style={{ background: isPlaying ? `${color}15` : 'transparent' }}
      onMouseEnter={e => { if (!isPlaying) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      onMouseLeave={e => { if (!isPlaying) e.currentTarget.style.background = 'transparent'; }}
    >
      {/* Index / play indicator */}
      <div className="w-6 text-center shrink-0">
        {isPlaying
          ? <Waveform color={color} playing />
          : <span className="text-[12px] font-bold group-hover:hidden" style={{ color: '#64748b' }}>{index + 1}</span>
        }
        {!isPlaying && (
          <Play size={13} className="hidden group-hover:block mx-auto" style={{ color }} fill={color} />
        )}
      </div>

      {/* Artwork */}
      <div className="relative shrink-0 w-10 h-10 overflow-hidden rounded-sm">
        <img src={ep.image} alt={ep.title} className="w-full h-full object-cover" loading="lazy" />
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: `${color}60` }}>
            <Pause size={10} fill="white" className="text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-bold leading-none truncate" style={{ color: isPlaying ? color : 'white' }}>
          {ep.title}
        </p>
        <p className="text-[10px] mt-0.5 truncate" style={{ color: '#64748b' }}>
          {ep.host}{ep.guest ? ` · ${ep.guest}` : ''}
        </p>
      </div>

      {/* Duration */}
      <span className="text-[11px] shrink-0" style={{ color: '#64748b' }}>{ep.duration}</span>
    </div>
  );
}

/* ── Video thumbnail card (YouTube-style) ── */
function VideoThumb({ ep, onPlay, size = 'md' }) {
  const color = catColor(ep.category);
  const isLg = size === 'lg';
  return (
    <div onClick={() => onPlay(ep)} className="cursor-pointer group">
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-sm mb-2.5" style={{ aspectRatio: '16/9' }}>
        <img
          src={ep.image}
          alt={ep.title}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.35)' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-orange)', boxShadow: '0 4px 20px rgba(232,80,10,0.5)' }}>
            <Play size={18} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
        {/* Duration badge */}
        {ep.duration && (
          <span className="absolute bottom-2 right-2 bg-black/85 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
            {ep.duration}
          </span>
        )}
        {/* Category pill */}
        <span className="absolute top-2 left-2 text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider" style={{ background: color }}>
          {ep.category}
        </span>
      </div>

      {/* Meta */}
      <div className="flex gap-2.5">
        {/* Channel avatar */}
        <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-black mt-0.5" style={{ background: color }}>
          DQ
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-bold leading-snug line-clamp-2 group-hover:opacity-80 transition-opacity ${isLg ? 'text-[14px]' : 'text-[12px]'}`} style={{ color: 'white' }}>
            {ep.title}
          </h4>
          <p className="text-[10px] mt-1" style={{ color: '#64748b' }}>
            DigitalQatalyst · {ep.views || ep.plays} views · {ep.timestamp || ep.date}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Mini player bar (persistent bottom bar) ── */
function MiniPlayer({ ep, type, onExpand, onClose, isPlaying, onTogglePlay }) {
  if (!ep) return null;
  const color = catColor(ep.category);
  const progress = 35; // mock progress %

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{ background: 'rgba(13,27,62,0.97)', backdropFilter: 'blur(16px)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Progress bar */}
      <div className="h-0.5 w-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="h-full transition-all" style={{ width: `${progress}%`, background: color }} />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-2.5 flex items-center gap-4">
        {/* Artwork + info */}
        <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={onExpand}>
          <div className="relative shrink-0 w-10 h-10 overflow-hidden rounded-sm">
            <img src={ep.image} alt={ep.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: `${color}40` }}>
              {type === 'video' ? <Video size={10} className="text-white" /> : <Headphones size={10} className="text-white" />}
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-white text-[12px] font-bold truncate">{ep.title}</p>
            <p className="text-[10px] truncate" style={{ color: '#64748b' }}>{ep.host || 'DigitalQatalyst'}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <Waveform color={color} playing={isPlaying} />
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            style={{ background: color }}
          >
            {isPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" className="ml-0.5" />}
          </button>
          <span className="text-[11px] hidden sm:block" style={{ color: '#64748b' }}>{ep.duration}</span>
        </div>

        {/* Close */}
        <button onClick={onClose} className="shrink-0 p-1.5 rounded-sm transition-colors hover:bg-white/10" style={{ color: '#64748b' }}>
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

/* ── Main Multimedia page ── */
export default function Multimedia() {
  const [activeTab, setActiveTab]     = useState('All');
  const [activeCategory, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [nowPlaying, setNowPlaying]   = useState(null);
  const [nowType, setNowType]         = useState(null);
  const [isPlaying, setIsPlaying]     = useState(false);
  const { openVideo, openPodcast }    = useNav();

  const categories = ['All', 'AI', 'Cybersecurity', 'Cloud', 'Strategy', 'DCO', 'Workspace'];

  const matchItem = (ep) => {
    const catOk = activeCategory === 'All' || ep.category === activeCategory;
    if (!searchQuery) return catOk;
    const q = searchQuery.toLowerCase();
    return catOk && (
      ep.title.toLowerCase().includes(q) ||
      ep.description?.toLowerCase().includes(q) ||
      ep.host?.toLowerCase().includes(q) ||
      ep.category?.toLowerCase().includes(q)
    );
  };

  const filteredPodcasts = podcastEpisodes.filter(matchItem);
  const filteredVideos   = videoEpisodes.filter(matchItem);

  const handlePlayPodcast = (ep) => {
    setNowPlaying(ep);
    setNowType('podcast');
    setIsPlaying(true);
    openPodcast(ep);
  };

  const handlePlayVideo = (ep) => {
    setNowPlaying(ep);
    setNowType('video');
    setIsPlaying(true);
    openVideo(ep);
  };

  const showPodcasts = activeTab === 'All' || activeTab === 'Podcasts';
  const showVideos   = activeTab === 'All' || activeTab === 'Videos';

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
      <PageMeta meta={pageMeta.Multimedia} />

      {/* ── HERO HEADER ── */}
      <div className="border-b border-white/5" style={{ background: 'linear-gradient(180deg, #0d1b3e 0%, #0a0f1e 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-4 pt-8 pb-6">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ background: 'var(--brand-orange)' }}>
                  <Zap size={12} className="text-white" fill="white" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--brand-orange)' }}>DTMI Multimedia</span>
              </div>
              <h1 className="text-white text-[28px] sm:text-[36px] font-black leading-tight">
                Podcasts & Video Intelligence
              </h1>
              <p className="text-[13px] mt-1.5" style={{ color: '#64748b' }}>
                Expert conversations and video briefings on digital transformation
              </p>
            </div>
            {/* Stats */}
            <div className="flex items-center gap-5 shrink-0">
              {[
                { icon: <Mic size={13} />, value: `${podcastEpisodes.length}`, label: 'Episodes' },
                { icon: <Video size={13} />, value: `${videoEpisodes.length}`, label: 'Videos' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="flex items-center gap-1.5 justify-center mb-0.5" style={{ color: 'var(--brand-orange)' }}>
                    {s.icon}
                    <span className="text-[18px] font-black text-white">{s.value}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: '#64748b' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-6">

        {/* ── CONTROLS ROW ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          {/* Tab pills */}
          <div className="flex items-center gap-1 p-1 rounded-sm shrink-0" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {['All', 'Podcasts', 'Videos'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-sm text-[11px] font-black uppercase tracking-wide transition-all"
                style={{
                  background: activeTab === tab ? 'var(--brand-orange)' : 'transparent',
                  color: activeTab === tab ? 'white' : '#64748b',
                }}
              >
                {tab === 'Podcasts' && <Headphones size={10} />}
                {tab === 'Videos'   && <Video size={10} />}
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-sm" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Search size={13} style={{ color: '#64748b' }} className="shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search episodes, hosts, topics..."
              className="flex-1 bg-transparent text-white text-[13px] focus:outline-none placeholder-[#475569]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ color: '#64748b' }}>
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* ── CATEGORY CHIPS ── */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {categories.map(cat => {
            const color = cat === 'All' ? 'var(--brand-orange)' : catColor(cat);
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-3 py-1.5 rounded-full text-[11px] font-bold transition-all"
                style={{
                  background: active ? color : 'rgba(255,255,255,0.06)',
                  color: active ? 'white' : '#94a3b8',
                  border: `1px solid ${active ? color : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── FEATURED HERO (first item of active tab) ── */}
        {showPodcasts && filteredPodcasts.length > 0 && activeTab !== 'Videos' && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Headphones size={14} style={{ color: 'var(--brand-orange)' }} />
              <span className="text-[12px] font-black uppercase tracking-widest text-white">Featured Episode</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Hero card */}
              <div className="lg:col-span-3">
                <HeroCard
                  ep={filteredPodcasts[0]}
                  type="podcast"
                  onPlay={handlePlayPodcast}
                  isPlaying={isPlaying && nowPlaying?.id === filteredPodcasts[0].id}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
              {/* Episode list — Spotify-style */}
              <div className="lg:col-span-2 rounded-sm overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#64748b' }}>All Episodes</p>
                </div>
                <div className="py-2">
                  {filteredPodcasts.map((ep, i) => (
                    <PodcastRow
                      key={ep.id}
                      ep={ep}
                      index={i}
                      onPlay={handlePlayPodcast}
                      isPlaying={isPlaying && nowPlaying?.id === ep.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── VIDEO SECTION ── */}
        {showVideos && filteredVideos.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Video size={14} style={{ color: 'var(--brand-orange)' }} />
                <span className="text-[12px] font-black uppercase tracking-widest text-white">
                  {activeTab === 'All' ? 'Latest Videos' : 'Videos'}
                </span>
              </div>
              <button className="flex items-center gap-1 text-[11px] font-bold transition-opacity hover:opacity-70" style={{ color: 'var(--brand-orange)' }}>
                View all <ChevronRight size={12} />
              </button>
            </div>

            {/* Featured video hero */}
            {activeTab !== 'Podcasts' && filteredVideos.length > 0 && (
              <div className="mb-6">
                <HeroCard
                  ep={filteredVideos[0]}
                  type="video"
                  onPlay={handlePlayVideo}
                  isPlaying={isPlaying && nowPlaying?.id === filteredVideos[0].id}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            )}

            {/* Video grid — YouTube-style */}
            {filteredVideos.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredVideos.slice(1).map(ep => (
                  <VideoThumb key={ep.id} ep={ep} onPlay={handlePlayVideo} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {searchQuery && filteredPodcasts.length === 0 && filteredVideos.length === 0 && (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Search size={22} style={{ color: '#64748b' }} />
            </div>
            <p className="text-white text-[15px] font-bold mb-1">No results for "{searchQuery}"</p>
            <p className="text-[13px] mb-4" style={{ color: '#64748b' }}>Try a different search term or category</p>
            <button onClick={() => setSearchQuery('')} className="px-4 py-2 rounded-sm text-[12px] font-bold text-white" style={{ background: 'var(--brand-orange)' }}>
              Clear search
            </button>
          </div>
        )}

        {/* Bottom padding for mini player */}
        {nowPlaying && <div className="h-20" />}
      </div>

      {/* ── MINI PLAYER ── */}
      <MiniPlayer
        ep={nowPlaying}
        type={nowType}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(p => !p)}
        onExpand={() => nowType === 'video' ? openVideo(nowPlaying) : openPodcast(nowPlaying)}
        onClose={() => { setNowPlaying(null); setIsPlaying(false); }}
      />
    </div>
  );
}
