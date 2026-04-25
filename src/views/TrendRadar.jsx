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
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-[#1a1a1a]">
          <h1 className="text-white text-2xl font-black uppercase tracking-wide mb-1">Technology Trend Radar</h1>
          <p className="text-[#666] text-[12px]">Emerging technology adoption, disruption signals, and organizational readiness — Q2 2026</p>
        </div>

        {/* Search bar */}
        <div className="w-full mb-5">
          <PageSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search technologies, quadrants, adoption rings..."
            resultCount={searchQuery ? filtered.length : undefined}
            totalCount={trendRadarItems.length}
            dark
          />
        </div>

        {/* Ring filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['All', 'Adopt', 'Trial', 'Assess', 'Hold'].map(ring => {
            const rc = trendRadarRings[ring];
            return (
              <button
                key={ring}
                onClick={() => setActiveRing(ring)}
                className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wide border transition-colors ${
                  activeRing === ring
                    ? 'text-white border-[#cc0000] bg-[#cc0000]'
                    : 'border-[#222] text-[#666] hover:text-white hover:border-[#444]'
                }`}
              >
                {ring}
                {rc && <span className="ml-1.5 w-2 h-2 rounded-full inline-block" style={{ background: rc.color }} />}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── TECH LIST ── */}
          <div className="space-y-2">
            <p className="text-[#444] text-[10px] font-black uppercase tracking-wider mb-3">
              {filtered.length} Technologies
            </p>
            {filtered.map(item => {
              const rc = trendRadarRings[item.ring];
              const isSelected = selected?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`w-full text-left p-3 border transition-all duration-150 ${
                    isSelected
                      ? 'border-[#cc0000]/60 bg-[#cc0000]/5'
                      : 'border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#333] hover:bg-[#111]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-[13px] font-bold">{item.name}</span>
                    <span
                      className="text-[10px] font-black uppercase px-2 py-0.5 rounded-sm"
                      style={{ background: rc.color + '22', color: rc.color, border: `1px solid ${rc.color}44` }}
                    >
                      {item.ring}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-[#555] mb-2">
                    <span style={{ color: item.color }}>{item.quadrant}</span>
                    <span>Adoption: {item.adoption}%</span>
                  </div>
                  {/* Adoption bar */}
                  <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.adoption}%`, background: item.color }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── DETAIL PANEL ── */}
          {selected && (
            <div className="lg:col-span-2 space-y-4">

              {/* Tech header */}
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-white text-xl font-black">{selected.name}</h2>
                    <p className="text-[#555] text-[11px] mt-0.5">{selected.quadrant}</p>
                  </div>
                  <span
                    className="text-[11px] font-black uppercase px-3 py-1 rounded-sm"
                    style={{
                      background: trendRadarRings[selected.ring].color + '22',
                      color: trendRadarRings[selected.ring].color,
                      border: `1px solid ${trendRadarRings[selected.ring].color}44`
                    }}
                  >
                    {selected.ring}
                  </span>
                </div>
                <p className="text-[#888] text-[12px] mb-4">{trendRadarRings[selected.ring].desc}</p>

                {/* 3 metric boxes */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Adoption Rate',    value: selected.adoption,   color: '#10b981' },
                    { label: 'Market Disruption',value: selected.disruption, color: '#ef4444' },
                    { label: 'Org Readiness',    value: selected.readiness,  color: '#06b6d4' },
                  ].map(m => (
                    <div key={m.label} className="bg-[#111] border border-[#1a1a1a] p-3 text-center">
                      <div className="text-2xl font-black" style={{ color: m.color }}>{m.value}%</div>
                      <div className="text-[#555] text-[10px] mt-0.5">{m.label}</div>
                      <div className="mt-2 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${m.value}%`, background: m.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Radar chart */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#444] text-[10px] uppercase tracking-wider mb-2">Capability Profile</p>
                    <ResponsiveContainer width="100%" height={180}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#1a1a1a" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#555', fontSize: 10 }} />
                        <Radar
                          name={selected.name}
                          dataKey="value"
                          stroke={selected.color}
                          fill={selected.color}
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-[#111] border border-[#1a1a1a] p-3 flex flex-col justify-center">
                    <p className="text-[#cc0000] text-[10px] font-black uppercase tracking-wider mb-2">DTMI AI Insight</p>
                    <p className="text-[#aaa] text-[12px] leading-relaxed">
                      <strong className="text-white">{selected.name}</strong> is now disrupting{' '}
                      <strong style={{ color: selected.color }}>{selected.disruption}%</strong> of industries globally.
                      {selected.ring === 'Adopt' && ' Organizations that have adopted this technology report significant competitive advantages. Broad rollout is recommended.'}
                      {selected.ring === 'Trial' && ' Early adopters are gaining valuable insights. Controlled pilots with clear success metrics are recommended.'}
                      {selected.ring === 'Assess' && ' Monitor developments closely. Investment decisions should await further market validation in the next 2 quarters.'}
                      {selected.ring === 'Hold' && ' Current ROI evidence is insufficient. Reassess in 12–18 months as the market matures.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison bar chart */}
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-4">
                <p className="text-[#444] text-[10px] uppercase tracking-wider mb-3">All Technologies — Adoption Comparison</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                    <XAxis dataKey="name" tick={{ fill: '#555', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#555', fontSize: 9 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Adoption" radius={[2, 2, 0, 0]}>
                      {barData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} opacity={trendRadarItems[i]?.id === selected.id ? 1 : 0.4} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Ring legend */}
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(trendRadarRings).map(([ring, rc]) => (
                  <div key={ring} className="bg-[#0d0d0d] border border-[#1a1a1a] p-3 flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full mt-0.5 shrink-0" style={{ background: rc.color }} />
                    <div>
                      <p className="text-white text-[11px] font-black">{ring}</p>
                      <p className="text-[#555] text-[10px]">{rc.desc}</p>
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
