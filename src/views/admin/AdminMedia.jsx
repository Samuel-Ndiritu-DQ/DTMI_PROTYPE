import { useState } from 'react';
import { Upload, Search, Image, Video, Headphones, FileText, Trash2, Download, Copy, Grid, List } from 'lucide-react';

const MEDIA = [
  { id: 1,  name: 'ai-workplace-hero.jpg',     type: 'image',   size: '284 KB', dims: '1400Ã—788', date: 'Apr 23', url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=200&q=60' },
  { id: 2,  name: 'cybersecurity-cover.jpg',   type: 'image',   size: '312 KB', dims: '1400Ã—788', date: 'Apr 22', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&q=60' },
  { id: 3,  name: 'cloud-migration.jpg',       type: 'image',   size: '198 KB', dims: '1400Ã—788', date: 'Apr 22', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&q=60' },
  { id: 4,  name: 'dco-framework.jpg',         type: 'image',   size: '241 KB', dims: '1400Ã—788', date: 'Apr 21', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&q=60' },
  { id: 5,  name: 'quantum-computing.jpg',     type: 'image',   size: '356 KB', dims: '1400Ã—788', date: 'Apr 21', url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&q=60' },
  { id: 6,  name: 'economy-4-chart.jpg',       type: 'image',   size: '178 KB', dims: '1400Ã—788', date: 'Apr 20', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=60' },
  { id: 7,  name: 'ai-native-orgs.mp4',        type: 'video',   size: '48.2 MB',dims: '1920Ã—1080',date: 'Apr 22', url: '' },
  { id: 8,  name: 'dtmi-live-q1-2026.mp4',     type: 'video',   size: '62.7 MB',dims: '1920Ã—1080',date: 'Apr 20', url: '' },
  { id: 9,  name: 'govt-transformation.mp3',   type: 'audio',   size: '38.4 MB',dims: '42:18',    date: 'Apr 23', url: '' },
  { id: 10, name: 'cyber-ai-threats.mp3',      type: 'audio',   size: '29.1 MB',dims: '35:42',    date: 'Apr 21', url: '' },
  { id: 11, name: 'dtmi-whitepaper-q1.pdf',    type: 'doc',     size: '2.4 MB', dims: '48 pages', date: 'Apr 18', url: '' },
  { id: 12, name: 'dco-maturity-model.pdf',    type: 'doc',     size: '1.8 MB', dims: '32 pages', date: 'Apr 15', url: '' },
];

const TYPE_ICONS = { image: Image, video: Video, audio: Headphones, doc: FileText };
const TYPE_COLORS = { image: '#0a7ea4', video: '#8b5cf6', audio: '#e8500a', doc: '#10b981' };

export default function AdminMedia() {
  const [search,    setSearch]    = useState('');
  const [typeFilter,setTypeFilter]= useState('all');
  const [viewMode,  setViewMode]  = useState('grid');
  const [selected,  setSelected]  = useState(new Set());
  const [media,     setMedia]     = useState(MEDIA);
  const [dragging,  setDragging]  = useState(false);

  const filtered = media.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase());
    const matchType   = typeFilter === 'all' || m.type === typeFilter;
    return matchSearch && matchType;
  });

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const deleteSelected = () => {
    setMedia(prev => prev.filter(m => !selected.has(m.id)));
    setSelected(new Set());
  };

  const stats = [
    { label: 'Images', count: media.filter(m => m.type === 'image').length, color: '#0a7ea4', icon: Image },
    { label: 'Videos', count: media.filter(m => m.type === 'video').length, color: '#8b5cf6', icon: Video },
    { label: 'Audio',  count: media.filter(m => m.type === 'audio').length, color: '#e8500a', icon: Headphones },
    { label: 'Docs',   count: media.filter(m => m.type === 'doc').length,   color: '#10b981', icon: FileText },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#0d1b3e] text-[16px] font-bold">Media Library</h2>
          <p className="text-[#64748b] text-[11px]">{media.length} files · Images, videos, audio, documents</p>
        </div>
        <label className="flex items-center gap-2 px-4 py-2 rounded-md text-[#0d1b3e] text-[12px] font-bold cursor-pointer transition-colors" style={{ background: 'var(--brand-orange)' }}>
          <Upload size={14} /> Upload Files
          <input type="file" multiple className="hidden" />
        </label>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.color + '22' }}>
              <s.icon size={15} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-[#0d1b3e] text-lg font-black">{s.count}</p>
              <p className="text-[#64748b] text-[10px]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); }}
        className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-8 transition-colors"
        style={{ borderColor: dragging ? 'var(--brand-orange)' : 'rgba(255,255,255,0.1)', background: dragging ? 'rgba(232,80,10,0.05)' : 'transparent' }}
      >
        <Upload size={24} className="mb-2" style={{ color: dragging ? 'var(--brand-orange)' : '#475569' }} />
        <p className="text-[#64748b] text-[12px]">Drag & drop files here, or <span style={{ color: 'var(--brand-orange)' }} className="font-bold cursor-pointer">browse</span></p>
        <p className="text-[#475569] text-[10px] mt-1">Supports: JPG, PNG, MP4, MP3, PDF · Max 100MB</p>
      </div>

      {/* Filters + view toggle */}
      <div className="flex gap-2 flex-wrap items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input className="w-full rounded-md pl-8 pr-3 py-2 text-[#0d1b3e] text-[12px] focus:outline-none" style={{ background: 'white', border: '1px solid #e2e8f0' }} placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1 rounded-lg p-1" style={{ background: 'white' }}>
          {['all', 'image', 'video', 'audio', 'doc'].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold capitalize transition-colors ${typeFilter === t ? 'text-white' : 'text-[#64748b] hover:text-white'}`} style={typeFilter === t ? { background: 'var(--brand-orange)' } : {}}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-lg p-1" style={{ background: 'white' }}>
          <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'text-white' : 'text-[#64748b]'}`} style={viewMode === 'grid' ? { background: '#f1f5f9' } : {}}><Grid size={14} /></button>
          <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'text-white' : 'text-[#64748b]'}`} style={viewMode === 'list' ? { background: '#f1f5f9' } : {}}><List size={14} /></button>
        </div>
        {selected.size > 0 && (
          <button onClick={deleteSelected} className="flex items-center gap-1.5 px-3 py-2 rounded-md text-red-400 text-[11px] font-bold hover:bg-red-500/10 transition-colors">
            <Trash2 size={13} /> Delete ({selected.size})
          </button>
        )}
      </div>

      {/* Grid view */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {filtered.map(item => {
            const TypeIcon = TYPE_ICONS[item.type];
            const isSelected = selected.has(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleSelect(item.id)}
                className="rounded-lg overflow-hidden cursor-pointer group transition-all"
                style={{ background: 'white', border: `1px solid ${isSelected ? 'var(--brand-orange)' : 'rgba(255,255,255,0.07)'}` }}
              >
                <div className="relative aspect-square flex items-center justify-center" style={{ background: '#f1f5f9' }}>
                  {item.type === 'image' && item.url ? (
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <TypeIcon size={28} style={{ color: TYPE_COLORS[item.type] }} />
                  )}
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(232,80,10,0.4)' }}>
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <span className="text-[#e8500a] text-[10px] font-black">œ“</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-[#1e293b] text-[10px] font-semibold truncate">{item.name}</p>
                  <p className="text-[#64748b] text-[9px]">{item.size} · {item.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {['', 'Name', 'Type', 'Size', 'Dimensions', 'Date', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#94a3b8] bg-[#f8fafc] bg-[#f8fafc]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => {
                const TypeIcon = TYPE_ICONS[item.type];
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.has(item.id)} onChange={() => toggleSelect(item.id)} className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {item.type === 'image' && item.url
                          ? <img src={item.url} alt="" className="w-8 h-8 rounded object-cover" />
                          : <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: TYPE_COLORS[item.type] + '22' }}><TypeIcon size={14} style={{ color: TYPE_COLORS[item.type] }} /></div>
                        }
                        <span className="text-[#1e293b] text-[12px] font-semibold">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-[11px] capitalize" style={{ color: TYPE_COLORS[item.type] }}>{item.type}</span></td>
                    <td className="px-4 py-3"><span className="text-[#475569] text-[11px]">{item.size}</span></td>
                    <td className="px-4 py-3"><span className="text-[#64748b] text-[11px]">{item.dims}</span></td>
                    <td className="px-4 py-3"><span className="text-[#64748b] text-[11px]">{item.date}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-md text-[#64748b] hover:text-white hover:bg-slate-100 transition-colors"><Copy size={12} /></button>
                        <button className="p-1.5 rounded-md text-[#64748b] hover:text-white hover:bg-slate-100 transition-colors"><Download size={12} /></button>
                        <button onClick={() => setMedia(prev => prev.filter(m => m.id !== item.id))} className="p-1.5 rounded-md text-[#64748b] hover:text-red-400 hover:bg-red-500/5 transition-colors"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}







