import { useState, useEffect } from 'react';
import { breakingNews } from '../data/mockData';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function BreakingBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % breakingNews.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: 'var(--brand-orange)' }} className="text-white">
      <div className="max-w-[1280px] mx-auto px-4 flex items-center gap-3 h-9">
        <span className="shrink-0 bg-white text-[11px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider" style={{ color: 'var(--brand-orange)' }}>
          Breaking
        </span>
        <div className="flex-1 overflow-hidden">
          <p key={index} className="text-[12px] font-semibold truncate fade-in">
            {breakingNews[index]}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setIndex(i => (i - 1 + breakingNews.length) % breakingNews.length)} className="p-0.5 hover:bg-white/20 rounded transition-colors">
            <ChevronLeft size={14} />
          </button>
          <span className="text-[11px] opacity-70">{index + 1}/{breakingNews.length}</span>
          <button onClick={() => setIndex(i => (i + 1) % breakingNews.length)} className="p-0.5 hover:bg-white/20 rounded transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
