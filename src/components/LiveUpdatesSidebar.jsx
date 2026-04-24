import { useState, useEffect } from 'react';
import { liveUpdates } from '../data/mockData';
import { Clock, RefreshCw } from 'lucide-react';

export default function LiveUpdatesSidebar() {
  const [updates, setUpdates] = useState(liveUpdates);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    const pool = [
      { id: 100, time: "Just now", text: "DTMI AI Engine detects new transformation risk cluster in APAC region", hot: true },
      { id: 101, time: "Just now", text: "Cloud adoption velocity index reaches 3-year high across G20 nations", hot: true },
      { id: 102, time: "Just now", text: "New DCO compliance framework published — 47-page executive guide available", hot: true },
    ];
    let i = 0;
    const t = setInterval(() => {
      if (i < pool.length) {
        setUpdates(prev => [pool[i], ...prev.slice(0, 7)]);
        setLastRefresh(new Date());
        i++;
      }
    }, 12000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-white border rounded-sm overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
      <div className="flex items-center justify-between px-3 py-2.5 border-b" style={{ background: 'var(--brand-navy)', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2">
          <span className="live-blink w-2 h-2 rounded-full" style={{ background: 'var(--brand-orange)' }} />
          <span className="text-white text-[11px] font-black uppercase tracking-wider">Live Updates</span>
        </div>
        <div className="flex items-center gap-1 text-[#64748b] text-[10px]">
          <RefreshCw size={9} />
          <span>{lastRefresh.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
      <div className="divide-y" style={{ divideColor: 'var(--brand-border)' }}>
        {updates.map((item, i) => (
          <div key={`${item.id}-${i}`} className="px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-2">
              {item.hot && (
                <span className="shrink-0 mt-0.5 text-white text-[9px] font-black px-1 py-0.5 rounded-sm uppercase" style={{ background: 'var(--brand-orange)' }}>
                  New
                </span>
              )}
              <p className="text-[12px] leading-snug flex-1" style={{ color: 'var(--brand-navy)' }}>{item.text}</p>
            </div>
            <p className="text-[10px] mt-1 flex items-center gap-1" style={{ color: 'var(--brand-muted)' }}>
              <Clock size={8} /> {item.time}
            </p>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 border-t" style={{ borderColor: 'var(--brand-border)' }}>
        <button className="text-[11px] font-bold hover:underline" style={{ color: 'var(--brand-orange)' }}>
          See all live updates →
        </button>
      </div>
    </div>
  );
}
