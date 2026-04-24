import { useState } from 'react';
import { podcastEpisodes, videoEpisodes } from '../data/mockData';
import { Play, Headphones, Video, Clock, Users } from 'lucide-react';
import { useNav } from '../context/NavContext';

function PodcastCard({ ep, featured, onPlay }) {
  if (featured) {
    return (
      <div onClick={() => onPlay(ep)} className="bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#cc0000]/30 transition-colors cursor-pointer group">
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/7' }}>
          <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-400" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-[#cc0000] text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider">
              {ep.episode}
            </span>
            <span className="bg-black/70 text-[#888] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-[#333]">
              {ep.category}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Headphones size={12} className="text-[#cc0000]" />
              <span className="text-[#cc0000] text-[10px] font-black uppercase tracking-wider">Podcast</span>
            </div>
            <h3 className="text-white text-lg font-black leading-snug mb-2">{ep.title}</h3>
            <p className="text-[#aaa] text-[12px] leading-relaxed mb-3 line-clamp-2">{ep.description}</p>
            <div className="flex items-center justify-between">
              <div className="text-[#666] text-[11px]">
                <span className="text-white font-semibold">{ep.host}</span> · {ep.guest}
              </div>
              <div className="flex items-center gap-3 text-[#666] text-[11px]">
                <span className="flex items-center gap-1"><Clock size={9} /> {ep.duration}</span>
                <span className="flex items-center gap-1"><Users size={9} /> {ep.plays}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 border-t border-[#1a1a1a] flex items-center justify-between">
          <button onClick={() => onPlay(ep)} className="flex items-center gap-2 bg-[#cc0000] text-white text-[11px] font-black px-4 py-2 uppercase tracking-wide hover:bg-[#aa0000] transition-colors">
            <Play size={11} fill="white" /> Play Episode
          </button>
          <span className="text-[#444] text-[11px]">{ep.date}</span>
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => onPlay(ep)} className="bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#cc0000]/30 transition-colors cursor-pointer group flex gap-3 p-3">
      <div className="relative shrink-0 w-20 h-20 overflow-hidden rounded-sm">
        <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={16} className="text-white" fill="white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[#cc0000] text-[9px] font-black uppercase tracking-wider">{ep.episode}</span>
          <span className="text-[#333]">·</span>
          <span className="text-[#555] text-[9px] uppercase tracking-wider">{ep.category}</span>
        </div>
        <h4 className="text-white text-[12px] font-bold leading-snug group-hover:text-[#ccc] transition-colors line-clamp-2 mb-1">
          {ep.title}
        </h4>
        <div className="flex items-center gap-2 text-[#444] text-[10px]">
          <span className="flex items-center gap-1"><Clock size={8} /> {ep.duration}</span>
          <span>·</span>
          <span>{ep.host}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Users size={8} /> {ep.plays}</span>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ ep, featured, onPlay }) {
  if (featured) {
    return (
      <div onClick={() => onPlay(ep)} className="bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#cc0000]/30 transition-colors cursor-pointer group">
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-400" loading="lazy" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-[#cc0000]/90 flex items-center justify-center">
              <Play size={22} className="text-white ml-1" fill="white" />
            </div>
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-[#cc0000] text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider">
              {ep.label}
            </span>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5">
            {ep.duration}
          </div>
        </div>
        <div className="p-4">
          <p className="text-[#cc0000] text-[10px] font-black uppercase tracking-wider mb-1">{ep.category}</p>
          <h3 className="text-white text-[15px] font-black leading-snug mb-2 group-hover:text-[#ccc] transition-colors">
            {ep.title}
          </h3>
          <p className="text-[#666] text-[12px] leading-relaxed mb-3">{ep.description}</p>
          <div className="flex items-center justify-between text-[#444] text-[11px]">
            <span>{ep.host} · {ep.date}</span>
            <span className="flex items-center gap-1"><Users size={9} /> {ep.views} views</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => onPlay(ep)} className="bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#cc0000]/30 transition-colors cursor-pointer group">
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400" loading="lazy" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-[#cc0000]/90 flex items-center justify-center">
            <Play size={14} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="bg-[#cc0000] text-white text-[9px] font-black px-1.5 py-0.5 uppercase tracking-wider">{ep.label}</span>
        </div>
        <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5">
          {ep.duration}
        </div>
      </div>
      <div className="p-3">
        <p className="text-[#cc0000] text-[9px] font-black uppercase tracking-wider mb-1">{ep.category}</p>
        <h4 className="text-white text-[12px] font-bold leading-snug group-hover:text-[#ccc] transition-colors line-clamp-2 mb-1">
          {ep.title}
        </h4>
        <div className="flex items-center gap-2 text-[#444] text-[10px]">
          <span>{ep.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Users size={8} /> {ep.views}</span>
        </div>
      </div>
    </div>
  );
}

export default function Multimedia() {
  const [activeTab, setActiveTab] = useState('All');
  const { openVideo, openPodcast } = useNav();
  const tabs = ['All', 'Podcasts', 'Videos'];

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-[#1a1a1a]">
          <h1 className="text-white text-2xl font-black uppercase tracking-wide mb-1">Multimedia Intelligence</h1>
          <p className="text-[#666] text-[12px]">Podcasts, video briefings, and expert conversations on digital transformation</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-wide border transition-colors ${
                activeTab === tab
                  ? 'bg-[#cc0000] border-[#cc0000] text-white'
                  : 'border-[#222] text-[#666] hover:text-white hover:border-[#444]'
              }`}
            >
              {tab === 'Podcasts' && <Headphones size={11} />}
              {tab === 'Videos'   && <Video size={11} />}
              {tab}
            </button>
          ))}
        </div>

        {/* PODCASTS */}
        {(activeTab === 'All' || activeTab === 'Podcasts') && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1a1a1a]">
              <h2 className="text-white text-[14px] font-black uppercase tracking-wide flex items-center gap-2">
                <Headphones size={14} className="text-[#cc0000]" /> Podcasts
              </h2>
              <button className="text-[#cc0000] text-[11px] font-bold hover:underline">All episodes →</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <PodcastCard ep={podcastEpisodes[0]} featured onPlay={openPodcast} />
              </div>
              <div className="space-y-2">
                {podcastEpisodes.slice(1).map(ep => (
                  <PodcastCard key={ep.id} ep={ep} onPlay={openPodcast} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* VIDEOS */}
        {(activeTab === 'All' || activeTab === 'Videos') && (
          <section>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1a1a1a]">
              <h2 className="text-white text-[14px] font-black uppercase tracking-wide flex items-center gap-2">
                <Video size={14} className="text-[#cc0000]" /> Video
              </h2>
              <button className="text-[#cc0000] text-[11px] font-bold hover:underline">All videos →</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <VideoCard ep={videoEpisodes[0]} featured onPlay={openVideo} />
              <VideoCard ep={videoEpisodes[1]} featured onPlay={openVideo} />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {videoEpisodes.slice(2).map(ep => (
                <VideoCard key={ep.id} ep={ep} onPlay={openVideo} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
