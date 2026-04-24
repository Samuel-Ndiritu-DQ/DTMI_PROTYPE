import { useState, useEffect } from 'react';
import { tickerItems } from '../data/mockData';

export default function TickerBar() {
  const [items, setItems] = useState(tickerItems);

  useEffect(() => {
    const t = setInterval(() => {
      setItems(prev => prev.map(item => {
        if (!item.change.includes('%')) return item;
        const base = parseFloat(item.change);
        const delta = (Math.random() - 0.48) * 0.2;
        const nv = parseFloat((base + delta).toFixed(1));
        return { ...item, change: `${nv > 0 ? '+' : ''}${nv}%`, up: nv > 0 };
      }));
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className="border-b overflow-hidden" style={{ background: 'var(--brand-navy2)', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="flex items-center">
        {/* Label */}
        <div className="shrink-0 flex items-center gap-2 px-3 h-8 border-r" style={{ background: 'var(--brand-orange)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <span className="live-blink w-1.5 h-1.5 rounded-full bg-white" />
          <span className="text-white text-[10px] font-black uppercase tracking-widest">Live</span>
        </div>
        {/* Scrolling track */}
        <div className="overflow-hidden flex-1">
          <div className="ticker-track">
            {doubled.map((item, i) => (
              <span key={i} className="flex items-center gap-2 px-5 h-8 border-r shrink-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                <span className="text-white text-[11px] font-semibold">{item.value}</span>
                <span className={`text-[11px] font-bold ${item.up ? 'text-emerald-400' : 'text-red-400'}`}>
                  {item.up ? '▲' : '▼'} {item.change}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
