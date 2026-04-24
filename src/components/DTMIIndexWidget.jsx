import { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const generateSparkline = (base, points = 12) =>
  Array.from({ length: points }, (_, i) => ({
    i,
    v: parseFloat((base + (Math.random() - 0.45) * base * 0.08).toFixed(1)),
  }));

const indices = [
  { name: 'DTI Global',   value: 4821, change: +2.5, base: 4821 },
  { name: 'AI Adoption',  value: 61,   change: +4.1, base: 61,   unit: '%' },
  { name: 'Cloud Index',  value: 3102, change: +1.8, base: 3102 },
  { name: 'Cyber Risk',   value: 892,  change: -1.2, base: 892  },
];

export default function DTMIIndexWidget() {
  const [data, setData] = useState(indices.map(idx => ({ ...idx, sparkline: generateSparkline(idx.base) })));

  useEffect(() => {
    const t = setInterval(() => {
      setData(prev => prev.map(idx => {
        const delta = (Math.random() - 0.48) * 0.3;
        const newChange = parseFloat((idx.change + delta).toFixed(2));
        const newSparkline = [...idx.sparkline.slice(1), { i: idx.sparkline.length, v: idx.value + delta * 10 }];
        return { ...idx, change: newChange, sparkline: newSparkline };
      }));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-white border rounded-sm p-4" style={{ borderColor: 'var(--brand-border)' }}>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b" style={{ borderColor: 'var(--brand-border)' }}>
        <TrendingUp size={13} style={{ color: 'var(--brand-orange)' }} />
        <span className="text-[12px] font-black uppercase tracking-wider" style={{ color: 'var(--brand-navy)' }}>DTMI Indices</span>
        <span className="ml-auto text-[10px]" style={{ color: 'var(--brand-muted)' }}>Live</span>
      </div>
      <div className="space-y-3">
        {data.map((idx) => (
          <div key={idx.name} className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wide truncate" style={{ color: 'var(--brand-muted)' }}>{idx.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold" style={{ color: 'var(--brand-navy)' }}>
                  {idx.value.toLocaleString()}{idx.unit || ''}
                </span>
                <span className={`text-[11px] font-bold ${idx.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {idx.change >= 0 ? '▲' : '▼'} {Math.abs(idx.change).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="w-16 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={idx.sparkline}>
                  <defs>
                    <linearGradient id={`g-${idx.name.replace(/\s/g,'')}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={idx.change >= 0 ? '#16a34a' : '#dc2626'} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={idx.change >= 0 ? '#16a34a' : '#dc2626'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke={idx.change >= 0 ? '#16a34a' : '#dc2626'} strokeWidth={1.5} fill={`url(#g-${idx.name.replace(/\s/g,'')})`} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
