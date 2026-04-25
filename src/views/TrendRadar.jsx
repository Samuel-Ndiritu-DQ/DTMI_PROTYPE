import { useState } from 'react';
import { trendRadarItems, trendRadarRings } from '../data/mockData';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';
import PageSearch from '../components/PageSearch';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#111] border border-[#333] px-3 py-2 text-[11px]">
        <p className="text-[#888] mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-bold">{p.name}: {p.value}%</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrendRadar() {
  const [selected, setSelected] = useState(trendRadarItems[0]);
  const [activeRing, setActiveRing] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = trendRadarItems.filter(i => {
    const ringOk   = activeRing === 'All' || i.ring === activeRing;
    const q        = searchQuery.toLowerCase();
    const searchOk = !searchQuery ||
      i.name.toLowerCase().includes(q) ||
      i.quadrant.toLowerCase().includes(q) ||
      i.ring.toLowerCase().includes(q);
    return ringOk && searchOk;
  });

  const radarData = selected ? [
    { subject: 'Adoption',     value: selected.adoption    },
    { subject: 'Disruption',   value: selected.disruption  },
    { subject: 'Readiness',    value: selected.readiness   },
    { subject: 'Market Impact',value: Math.round((selected.adoption + selected.disruption) / 2) },
    { subject: 'Org Fit',      value: Math.round((selected.readiness + selected.adoption) / 2)  },
  ] : [];

  const barData = trendRadarItems.map(i => ({
    name: i.name.split(' ')[0],
    Adoption: i.adoption,
    Disruption: i.disruption,
    Readiness: i.readiness,
    color: i.color,
  }));

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>DTMI Intelligence</p>
          <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-2">Technology Trend Radar</h1>
          <p className="text-[14px]" style={{ color: '#94a3b8' }}>Emerging technology adoption, disruption signals, and organizational readiness â€” Q2 2026</p>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 py-6">

        {/* Search bar */}
        <div className="w-full mb-5">
          <PageSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search technologies, quadrants, adoption rings..."
            resultCount={searchQuery ? filtered.length : undefined}
            totalCount={trendRadarItems.length}
          />
        </div>

        {/* Ring filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['All', 'Adopt', 'Trial', 'Assess', 'Hold'].map(ring => {
            const rc = trendRadarRings[ring];
            return (
              <button key={ring} onClick={() => setActiveRing(ring)}
                className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide border rounded-sm transition-colors"
                style={{
                  background: activeRing === ring ? 'var(--brand-navy)' : 'white',
                  color: activeRing === ring ? 'white' : 'var(--brand-muted)',
                  borderColor: activeRing === ring ? 'var(--brand-navy)' : 'var(--brand-border)',
                }}>
                {ring}
                {rc && <span className="ml-1.5 w-2 h-2 rounded-full inline-block" style={{ background: rc.color }} />}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Tech list */}
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-wider mb-3" style={{ color: 'var(--brand-muted)' }}>
              {filtered.length} Technologies
            </p>
            {filtered.map(item => {
              const rc = trendRadarRings[item.ring];
              const isSelected = selected?.id === item.id;
              return (
                <button key={item.id} onClick={() => setSelected(item)}
                  className="w-full text-left p-3 border rounded-sm transition-all duration-150"
                  style={{
                    background: isSelected ? item.color + '0d' : 'white',
                    borderColor: isSelected ? item.color : 'var(--brand-border)',
                  }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-bold" style={{ color: 'var(--brand-navy)' }}>{item.name}</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-sm"
                      style={{ background: rc.color + '18', color: rc.color, border: `1px solid ${rc.color}33` }}>
                      {item.ring}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] mb-2" style={{ color: 'var(--brand-muted)' }}>
                    <span style={{ color: item.color }}>{item.quadrant}</span>
                    <span>Adoption: {item.adoption}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--brand-border)' }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.adoption}%`, background: item.color }} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border rounded-sm p-5" style={{ borderColor: 'var(--brand-border)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-black" style={{ color: 'var(--brand-navy)' }}>{selected.name}</h2>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--brand-muted)' }}>{selected.quadrant}</p>
                  </div>
                  <span className="text-[11px] font-black uppercase px-3 py-1 rounded-sm"
                    style={{ background: trendRadarRings[selected.ring].color + '18', color: trendRadarRings[selected.ring].color, border: `1px solid ${trendRadarRings[selected.ring].color}33` }}>
                    {selected.ring}
                  </span>
                </div>
                <p className="text-[12px] mb-4" style={{ color: 'var(--brand-muted)' }}>{trendRadarRings[selected.ring].desc}</p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Adoption Rate',    value: selected.adoption,   color: '#10b981' },
                    { label: 'Market Disruption',value: selected.disruption, color: '#ef4444' },
                    { label: 'Org Readiness',    value: selected.readiness,  color: '#06b6d4' },
                  ].map(m => (
                    <div key={m.label} className="border rounded-sm p-3 text-center" style={{ borderColor: 'var(--brand-border)', background: 'var(--brand-light)' }}>
                      <div className="text-2xl font-black" style={{ color: m.color }}>{m.value}%</div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'var(--brand-muted)' }}>{m.label}</div>
                      <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'var(--brand-border)' }}>
                        <div className="h-full rounded-full" style={{ width: `${m.value}%`, background: m.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'var(--brand-muted)' }}>Capability Profile</p>
                    <ResponsiveContainer width="100%" height={180}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="var(--brand-border)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <Radar name={selected.name} dataKey="value" stroke={selected.color} fill={selected.color} fillOpacity={0.2} strokeWidth={2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="rounded-sm border p-4 flex flex-col justify-center" style={{ background: 'var(--brand-navy)', borderColor: 'rgba(255,255,255,0.07)' }}>
                    <p className="text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: 'var(--brand-orange)' }}>DTMI AI Insight</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: '#94a3b8' }}>
                      <strong className="text-white">{selected.name}</strong> is disrupting{' '}
                      <strong style={{ color: selected.color }}>{selected.disruption}%</strong> of industries globally.
                      {selected.ring === 'Adopt' && ' Broad rollout is recommended â€” early adopters report significant competitive advantages.'}
                      {selected.ring === 'Trial' && ' Controlled pilots with clear success metrics are recommended.'}
                      {selected.ring === 'Assess' && ' Monitor closely. Await further market validation before major investment.'}
                      {selected.ring === 'Hold' && ' Reassess in 12â€“18 months as the market matures.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-sm p-4" style={{ borderColor: 'var(--brand-border)' }}>
                <p className="text-[10px] uppercase tracking-wider mb-3" style={{ color: 'var(--brand-muted)' }}>All Technologies â€” Adoption Comparison</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--brand-border)" />
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Adoption" radius={[2, 2, 0, 0]}>
                      {barData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} opacity={trendRadarItems[i]?.id === selected.id ? 1 : 0.35} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(trendRadarRings).map(([ring, rc]) => (
                  <div key={ring} className="bg-white border rounded-sm p-3 flex items-start gap-2" style={{ borderColor: 'var(--brand-border)' }}>
                    <span className="w-2 h-2 rounded-full mt-0.5 shrink-0" style={{ background: rc.color }} />
                    <div>
                      <p className="text-[11px] font-black" style={{ color: 'var(--brand-navy)' }}>{ring}</p>
                      <p className="text-[10px]" style={{ color: 'var(--brand-muted)' }}>{rc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
