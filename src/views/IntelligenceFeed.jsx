import { useState, useEffect, useRef } from 'react';
import { intelligenceFeedItems, severityBadge, tickerItems } from '../data/mockData';
import { Clock, Pause, Play, Filter } from 'lucide-react';
import PageSearch from '../components/PageSearch';

const SEV_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 };

function SeverityPill({ level }) {
  const s = severityBadge[level];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-wider border"
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.text }} />
      {level}
    </span>
  );
}

function FeedRow({ item, isNew }) {
  return (
    <div
      className={`flex items-start gap-4 px-4 py-3 border-b border-[#1a1a1a] hover:bg-[#111] transition-colors cursor-pointer group ${isNew ? 'fade-in' : ''}`}
    >
      <div className="shrink-0 pt-0.5">
        <SeverityPill level={item.severity} />
      </div>
      <div className="shrink-0">
        <span className="text-[#cc0000] text-[10px] font-black uppercase tracking-wider">{item.category}</span>
      </div>
      <p className="flex-1 text-[#ccc] text-[13px] leading-snug group-hover:text-white transition-colors">
        {item.text}
      </p>
      <div className="shrink-0 flex items-center gap-1 text-[#444] text-[10px]">
        <Clock size={9} />
        <span>Live</span>
      </div>
    </div>
  );
}

export default function IntelligenceFeed() {
  const [feed, setFeed] = useState([...intelligenceFeedItems].sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity]));
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newIds, setNewIds] = useState(new Set());
  const [indices, setIndices] = useState(tickerItems);
  const counterRef = useRef(20);

  // Simulate new items arriving
  useEffect(() => {
    if (paused) return;
    const pool = [
      { text: "DTMI AI Engine detects new transformation risk cluster in APAC region", severity: "High",     category: "AI" },
      { text: "Cloud adoption velocity index reaches 3-year high across G20 nations",  severity: "Medium",   category: "Cloud" },
      { text: "New zero-day vulnerability disclosed - patch available, deployment lagging", severity: "Critical", category: "Cybersecurity" },
      { text: "Digital Business Platforms market cap surpasses $180B for first time",   severity: "Low",      category: "Digital Economy" },
      { text: "DCO compliance framework v3.0 published - 47-page executive guide live", severity: "Medium",   category: "DCO" },
    ];
    const t = setInterval(() => {
      const item = pool[Math.floor(Math.random() * pool.length)];
      const newItem = { ...item, id: counterRef.current++ };
      setFeed(prev => [newItem, ...prev.slice(0, 29)]);
      setNewIds(prev => new Set([...prev, newItem.id]));
      setTimeout(() => setNewIds(prev => { const n = new Set(prev); n.delete(newItem.id); return n; }), 2000);
    }, 7000);
    return () => clearInterval(t);
  }, [paused]);

  // Live index fluctuation
  useEffect(() => {
    const t = setInterval(() => {
      setIndices(prev => prev.map(item => {
        if (!item.change.includes('%')) return item;
        const base = parseFloat(item.change);
        const delta = (Math.random() - 0.48) * 0.25;
        const nv = parseFloat((base + delta).toFixed(1));
        return { ...item, change: `${nv > 0 ? '+' : ''}${nv}%`, up: nv > 0 };
      }));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const categories = ['All', 'AI', 'Cloud', 'Cybersecurity', 'Governance', 'DCO', 'Digital Economy', 'Emerging Tech'];
  const filtered = feed.filter(i => {
    const catOk    = filter === 'All' || i.category === filter;
    const q        = searchQuery.toLowerCase();
    const searchOk = !searchQuery || i.text.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
    return catOk && searchOk;
  });

  const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  feed.forEach(i => counts[i.severity]++);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 py-6">

        {/* Page header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1a1a1a]">
          <div>
            <h1 className="text-white text-2xl font-black uppercase tracking-wide">
              <span className="text-[#cc0000]">●</span> Live Intelligence Feed
            </h1>
            <p className="text-[#666] text-[12px] mt-1">Real-time digital transformation signals - auto-updating every 7 seconds</p>
          </div>
          <button
            onClick={() => setPaused(p => !p)}
            className={`flex items-center gap-2 px-4 py-2 border text-[12px] font-bold uppercase tracking-wide transition-colors ${
              paused
                ? 'border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000]/10'
                : 'border-[#333] text-[#888] hover:text-white hover:border-[#555]'
            }`}
          >
            {paused ? <><Play size={13} /> Resume</> : <><Pause size={13} /> Pause Feed</>}
          </button>
        </div>

        {/* Search bar */}
        <div className="w-full mb-6">
          <PageSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search signals, categories, topics..."
            resultCount={searchQuery ? filtered.length : undefined}
            totalCount={feed.length}
            dark
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ── MAIN FEED ── */}
          <div className="lg:col-span-3">

            {/* Severity summary bar */}
            <div className="grid grid-cols-4 gap-px bg-[#1a1a1a] mb-4">
              {Object.entries(counts).map(([level, count]) => {
                const s = severityBadge[level];
                return (
                  <div key={level} className="bg-[#0d0d0d] px-4 py-3 text-center">
                    <div className="text-2xl font-black" style={{ color: s.text }}>{count}</div>
                    <div className="text-[#555] text-[10px] uppercase tracking-wider mt-0.5">{level}</div>
                  </div>
                );
              })}
            </div>

            {/* Category filter */}
            <div className="flex gap-1.5 flex-wrap mb-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wide border transition-colors ${
                    filter === cat
                      ? 'bg-[#cc0000] border-[#cc0000] text-white'
                      : 'border-[#222] text-[#666] hover:text-white hover:border-[#444]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Feed list */}
            <div className="border border-[#1a1a1a]">
              <div className="flex items-center gap-3 px-4 py-2 bg-[#111] border-b border-[#1a1a1a]">
                <span className="live-blink w-2 h-2 rounded-full bg-[#cc0000]" />
                <span className="text-white text-[11px] font-black uppercase tracking-wider">
                  {filtered.length} signals - {paused ? 'Paused' : 'Live'}
                </span>
                <span className="ml-auto text-[#444] text-[10px]">Sorted by severity</span>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {filtered.map(item => (
                  <FeedRow key={item.id} item={item} isNew={newIds.has(item.id)} />
                ))}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="space-y-5">

            {/* Live Transformation Index */}
            <div className="border border-[#1a1a1a] bg-[#0d0d0d]">
              <div className="px-3 py-2.5 border-b border-[#1a1a1a] bg-[#111] flex items-center gap-2">
                <span className="live-blink w-1.5 h-1.5 rounded-full bg-[#cc0000]" />
                <span className="text-white text-[11px] font-black uppercase tracking-wider">Transformation Index</span>
              </div>
              <div className="divide-y divide-[#111]">
                {indices.map(idx => (
                  <div key={idx.label} className="px-3 py-2.5 flex items-center justify-between">
                    <div>
                      <p className="text-[#666] text-[10px] uppercase tracking-wide">{idx.label}</p>
                      <p className="text-white text-[13px] font-bold">{idx.value}</p>
                    </div>
                    <span className={`text-[12px] font-black ${idx.up ? 'text-[#00c853]' : 'text-[#ff3d00]'}`}>
                      {idx.up ? '▲' : '▼'} {idx.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Severity legend */}
            <div className="border border-[#1a1a1a] bg-[#0d0d0d] p-4">
              <p className="text-white text-[11px] font-black uppercase tracking-wider mb-3">Severity Guide</p>
              {Object.entries(severityBadge).map(([level, s]) => (
                <div key={level} className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.text }} />
                  <span className="text-[#888] text-[11px] font-semibold">{level}</span>
                  <span className="text-[#444] text-[10px] ml-auto">
                    {level === 'Critical' && 'Immediate action required'}
                    {level === 'High'     && 'Executive attention needed'}
                    {level === 'Medium'   && 'Monitor and plan response'}
                    {level === 'Low'      && 'Informational - track trend'}
                  </span>
                </div>
              ))}
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
