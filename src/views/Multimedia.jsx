import { useState } from 'react';
import { podcastEpisodes, videoEpisodes } from '../data/mockData';
import { Play, Headphones, Video, Clock, Users } from 'lucide-react';
import { useNav } from '../context/NavContext';
import PageSearch from '../components/PageSearch';

function PodcastCard({ ep, featured, onPlay }) {
  if (featured) {
    return (
      <div onClick={() => onPlay(ep)} className="bg-white border rounded-sm overflow-hidden card-hover cursor-pointer group" style={{ borderColor: 'var(--brand-border)' }}>
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/7' }}>
          <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-400" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm" style={{ background: 'var(--brand-orange)' }}>{ep.episode}</span>
            <span className="text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm bg-black/60">{ep.category}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Headphones size={12} style={{ color: 'var(--brand-orange)' }} />
              <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: 'var(--brand-orange)' }}>Podcast</span>
            </div>
            <h3 className="text-white text-lg font-black leading-snug mb-2">{ep.title}</h3>
            <p className="text-[#cbd5e1] text-[12px] leading-relaxed mb-3 line-clamp-2">{ep.description}</p>
            <div className="flex items-center justify-between">
              <div className="text-[#94a3b8] text-[11px]"><span className="text-white font-semibold">{ep.host}</span> · {ep.guest}</div>
              <div className="flex items-center gap-3 text-[#94a3b8] text-[11px]">
                <span className="flex items-center gap-1"><Clock size={9} /> {ep.duration}</span>
                <span className="flex items-center gap-1"><Users size={9} /> {ep.plays}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--brand-border)' }}>
          <button className="flex items-center gap-2 text-white text-[11px] font-black px-4 py-2 uppercase tracking-wide rounded-sm hover:opacity-90 transition-opacity" style={{ background: 'var(--brand-orange)' }}>
            <Play size={11} fill="white" /> Play Episode
          </button>
          <span className="text-[11px]" style={{ color: 'var(--brand-muted)' }}>{ep.date}</span>
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => onPlay(ep)} className="bg-white border rounded-sm card-hover cursor-pointer group flex gap-3 p-3" style={{ borderColor: 'var(--brand-border)' }}>
      <div className="relative shrink-0 w-20 h-20 overflow-hidden rounded-sm">
        <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={16} className="text-white" fill="white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: 'var(--brand-orange)' }}>{ep.episode}</span>
          <span style={{ color: 'var(--brand-border)' }}>·</span>
          <span className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--brand-muted)' }}>{ep.category}</span>
        </div>
        <h4 className="text-[12px] font-bold leading-snug group-hover:opacity-70 transition-opacity line-clamp-2 mb-1" style={{ color: 'var(--brand-navy)' }}>{ep.title}</h4>
        <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--brand-muted)' }}>
          <span className="flex items-center gap-1"><Clock size={8} /> {ep.duration}</span>
          <span>·</span><span>{ep.host}</span>
          <span>·</span><span className="flex items-center gap-1"><Users size={8} /> {ep.plays}</span>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ ep, featured, onPlay }) {
  if (featured) {
    return (
      <div onClick={() => onPlay(ep)} className="bg-white border rounded-sm overflow-hidden card-hover cursor-pointer group" style={{ borderColor: 'var(--brand-border)' }}>
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-400" loading="lazy" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-orange)' }}>
              <Play size={22} className="text-white ml-1" fill="white" />
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <span className="text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm" style={{ background: 'var(--brand-orange)' }}>{ep.label}</span>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">{ep.duration}</div>
        </div>
        <div className="p-4">
          <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: 'var(--brand-orange)' }}>{ep.category}</p>
          <h3 className="text-[15px] font-black leading-snug mb-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--brand-navy)' }}>{ep.title}</h3>
          <p className="text-[12px] leading-relaxed mb-3" style={{ color: 'var(--brand-muted)' }}>{ep.description}</p>
          <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--brand-muted)' }}>
            <span>{ep.host} · {ep.date}</span>
            <span className="flex items-center gap-1"><Users size={9} /> {ep.views} views</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => onPlay(ep)} className="bg-white border rounded-sm overflow-hidden card-hover cursor-pointer group" style={{ borderColor: 'var(--brand-border)' }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img src={ep.image} alt={ep.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400" loading="lazy" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-orange)' }}>
            <Play size={14} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="text-white text-[9px] font-black px-1.5 py-0.5 uppercase tracking-wider rounded-sm" style={{ background: 'var(--brand-orange)' }}>{ep.label}</span>
        </div>
        <div className="absolute bottom-1.5 right-1.5 bg-black/75 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">{ep.duration}</div>
      </div>
      <div className="p-3">
        <p className="text-[9px] font-black uppercase tracking-wider mb-1" style={{ color: 'var(--brand-orange)' }}>{ep.category}</p>
        <h4 className="text-[12px] font-bold leading-snug group-hover:opacity-70 transition-opacity line-clamp-2 mb-1" style={{ color: 'var(--brand-navy)' }}>{ep.title}</h4>
        <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--brand-muted)' }}>
          <span>{ep.date}</span><span>·</span>
          <span className="flex items-center gap-1"><Users size={8} /> {ep.views}</span>
        </div>
      </div>
    </div>
  );
}

export default function Multimedia() {
  const [activeTab, setActiveTab]     = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { openVideo, openPodcast }    = useNav();
  const tabs = ['All', 'Podcasts', 'Videos'];

  const matchItem = (ep) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return ep.title.toLowerCase().includes(q) || ep.description?.toLowerCase().includes(q) ||
      ep.host?.toLowerCase().includes(q) || ep.guest?.toLowerCase().includes(q) || ep.category?.toLowerCase().includes(q);
  };

  const filteredPodcasts = podcastEpisodes.filter(matchItem);
  const filteredVideos   = videoEpisodes.filter(matchItem);
  const totalFiltered    = filteredPodcasts.length + filteredVideos.length;
  const totalAll         = podcastEpisodes.length + videoEpisodes.length;

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>DTMI Multimedia</p>
          <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-2">Podcasts & Video</h1>
          <p className="text-[14px]" style={{ color: '#94a3b8' }}>Expert conversations, video briefings, and intelligence sessions on digital transformation.</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="flex gap-2 mb-4">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-wide border rounded-sm transition-colors"
              style={{
                background: activeTab === tab ? 'var(--brand-navy)' : 'white',
                color: activeTab === tab ? 'white' : 'var(--brand-muted)',
                borderColor: activeTab === tab ? 'var(--brand-navy)' : 'var(--brand-border)',
              }}>
              {tab === 'Podcasts' && <Headphones size={11} />}
              {tab === 'Videos'   && <Video size={11} />}
              {tab}
            </button>
          ))}
        </div>

        <div className="w-full mb-6">
          <PageSearch value={searchQuery} onChange={setSearchQuery}
            placeholder="Search episodes, hosts, guests, topics..."
            resultCount={searchQuery ? totalFiltered : undefined}
            totalCount={totalAll} />
        </div>

        {(activeTab === 'All' || activeTab === 'Podcasts') && filteredPodcasts.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2" style={{ borderColor: 'var(--brand-orange)' }}>
              <h2 className="text-[14px] font-black uppercase tracking-wide flex items-center gap-2" style={{ color: 'var(--brand-navy)' }}>
                <Headphones size={14} style={{ color: 'var(--brand-orange)' }} /> Podcasts
              </h2>
              <button className="text-[11px] font-bold hover:opacity-70" style={{ color: 'var(--brand-orange)' }}>All episodes →</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2"><PodcastCard ep={filteredPodcasts[0]} featured onPlay={openPodcast} /></div>
              <div className="space-y-2">{filteredPodcasts.slice(1).map(ep => <PodcastCard key={ep.id} ep={ep} onPlay={openPodcast} />)}</div>
            </div>
          </section>
        )}

        {(activeTab === 'All' || activeTab === 'Videos') && filteredVideos.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2" style={{ borderColor: 'var(--brand-orange)' }}>
              <h2 className="text-[14px] font-black uppercase tracking-wide flex items-center gap-2" style={{ color: 'var(--brand-navy)' }}>
                <Video size={14} style={{ color: 'var(--brand-orange)' }} /> Video
              </h2>
              <button className="text-[11px] font-bold hover:opacity-70" style={{ color: 'var(--brand-orange)' }}>All videos →</button>
            </div>
            {filteredVideos.length >= 2 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <VideoCard ep={filteredVideos[0]} featured onPlay={openVideo} />
                  <VideoCard ep={filteredVideos[1]} featured onPlay={openVideo} />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredVideos.slice(2).map(ep => <VideoCard key={ep.id} ep={ep} onPlay={openVideo} />)}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredVideos.map(ep => <VideoCard key={ep.id} ep={ep} onPlay={openVideo} />)}
              </div>
            )}
          </section>
        )}

        {searchQuery && totalFiltered === 0 && (
          <div className="text-center py-16">
            <p className="text-[14px]" style={{ color: 'var(--brand-muted)' }}>No results for "<strong style={{ color: 'var(--brand-navy)' }}>{searchQuery}</strong>"</p>
            <button onClick={() => setSearchQuery('')} className="mt-3 text-[13px] font-bold hover:opacity-70" style={{ color: 'var(--brand-orange)' }}>Clear search</button>
          </div>
        )}
      </div>
    </div>
  );
}
