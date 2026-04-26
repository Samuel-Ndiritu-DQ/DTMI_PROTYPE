import { useState } from 'react';
import { trendRadarItems, trendRadarRings } from '../data/mockData';
import { TrendingUp, BarChart2, ChevronRight, Info } from 'lucide-react';

const rings = ['Adopt', 'Trial', 'Assess', 'Hold'];

export default function TrendRadar() {
  const [selected, setSelected] = useState(trendRadarItems[0]);
  const [activeRing, setActiveRing] = useState(null);

  const displayed = activeRing
    ? trendRadarItems.filter(t => t.ring === activeRing)
    : trendRadarItems;

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">

      {/* Hero */}
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
            DTMI Intelligence
          </p>
          <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
            Technology Trend Radar
          </h1>
          <p className="text-[14px] leading-relaxed max-w-[600px]" style={{ color: '#94a3b8' }}>
            Emerging technology adoption, disruption signals, and organizational readiness — Q2 2026
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8">

        {/* Ring filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveRing(null)}
            className="px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all border"
            style={{
              background: !activeRing ? 'var(--brand-navy)' : 'white',
              color: !activeRing ? 'white' : 'var(--brand-muted)',
              borderColor: !activeRing ? 'var(--brand-navy)' : 'var(--brand-border)',
            }}
          >
            All Technologies
          </button>
          {rings.map(ring => {
            const r = trendRadarRings[ring];
            const isActive = activeRing === ring;
            return (
              <button
                key={ring}
                onClick={() => setActiveRing(isActive ? null : ring)}
                className="px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all border"
                style={{
                  background: isActive ? r.color : 'white',
                  color: isActive ? 'white' : r.color,
                  borderColor: r.color,
                }}
              >
                {ring}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Tech list */}
          <div className="lg:col-span-2 space-y-3">
            {displayed.map(tech => {
              const ring = trendRadarRings[tech.ring];
              const isSelected = selected?.id === tech.id;
              return (
                <div
                  key={tech.id}
                  onClick={() => setSelected(tech)}
                  className="bg-white border rounded-sm p-4 cursor-pointer transition-all"
                  style={{
                    borderColor: isSelected ? tech.color : 'var(--brand-border)',
                    borderLeftWidth: isSelected ? '4px' : '1px',
                    boxShadow: isSelected ? `0 2px 12px ${tech.color}22` : 'none',
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ background: tech.color }} />
                      <div className="min-w-0">
                        <p className="text-[14px] font-bold" style={{ color: 'var(--brand-navy)' }}>{tech.name}</p>
                        <p className="text-[11px]" style={{ color: 'var(--brand-muted)' }}>{tech.quadrant}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full"
                        style={{ background: ring.color + '18', color: ring.color, border: `1px solid ${ring.color}44` }}
                      >
                        {tech.ring}
                      </span>
                      <ChevronRight size={14} style={{ color: isSelected ? tech.color : 'var(--brand-muted)' }} />
                    </div>
                  </div>

                  {/* Bars */}
                  <div className="mt-4 space-y-2">
                    {[
                      { label: 'Adoption', value: tech.adoption },
                      { label: 'Disruption', value: tech.disruption },
                      { label: 'Readiness', value: tech.readiness },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="text-[10px] w-16 shrink-0" style={{ color: 'var(--brand-muted)' }}>{label}</span>
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--brand-border)' }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${value}%`, background: tech.color }}
                          />
                        </div>
                        <span className="text-[10px] font-bold w-8 text-right" style={{ color: 'var(--brand-navy)' }}>{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          <aside className="space-y-5">
            {selected && (() => {
              const ring = trendRadarRings[selected.ring];
              return (
                <>
                  <div className="rounded-sm border overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
                    <div className="px-5 py-5" style={{ background: selected.color }}>
                      <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">{selected.quadrant}</p>
                      <h2 className="text-white text-[20px] font-black leading-tight">{selected.name}</h2>
                      <span
                        className="inline-block mt-2 text-[10px] font-black uppercase px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                      >
                        {selected.ring} — {ring.description}
                      </span>
                    </div>
                    <div className="p-5 bg-white space-y-4">
                      {[
                        { label: 'Adoption Rate', value: selected.adoption, desc: 'Enterprise adoption' },
                        { label: 'Disruption Score', value: selected.disruption, desc: 'Industry impact potential' },
                        { label: 'Readiness Index', value: selected.readiness, desc: 'Org readiness level' },
                      ].map(({ label, value, desc }) => (
                        <div key={label}>
                          <div className="flex justify-between mb-1">
                            <span className="text-[11px] font-bold" style={{ color: 'var(--brand-navy)' }}>{label}</span>
                            <span className="text-[11px] font-black" style={{ color: selected.color }}>{value}%</span>
                          </div>
                          <div className="h-2 rounded-full" style={{ background: 'var(--brand-border)' }}>
                            <div className="h-full rounded-full" style={{ width: `${value}%`, background: selected.color }} />
                          </div>
                          <p className="text-[10px] mt-0.5" style={{ color: 'var(--brand-muted)' }}>{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DTMI recommendation */}
                  <div className="rounded-sm border p-4" style={{ background: 'var(--brand-navy)', borderColor: 'rgba(255,255,255,0.07)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Info size={12} style={{ color: 'var(--brand-orange)' }} />
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--brand-orange)' }}>DTMI Recommendation</span>
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: '#94a3b8' }}>
                      {selected.ring === 'Adopt' && 'Broad rollout is recommended — early adopters report significant competitive advantages.'}
                      {selected.ring === 'Trial' && 'Evaluate for specific use cases. Run controlled pilots before full commitment.'}
                      {selected.ring === 'Assess' && 'Monitor closely. Understand potential impact before committing resources.'}
                      {selected.ring === 'Hold' && `Reassess in 12–18 months as the market matures.`}
                    </p>
                  </div>
                </>
              );
            })()}

            {/* Ring legend */}
            <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>Ring Legend</p>
              {rings.map(ring => {
                const r = trendRadarRings[ring];
                return (
                  <div key={ring} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: 'var(--brand-border)' }}>
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: r.color }} />
                    <div>
                      <p className="text-[12px] font-bold" style={{ color: 'var(--brand-navy)' }}>{r.label}</p>
                      <p className="text-[10px]" style={{ color: 'var(--brand-muted)' }}>{r.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Adoption comparison */}
            <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>All Technologies — Adoption</p>
              {trendRadarItems.map(t => (
                <div key={t.id} className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] w-28 truncate shrink-0" style={{ color: 'var(--brand-navy)' }}>{t.name}</span>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--brand-border)' }}>
                    <div className="h-full rounded-full" style={{ width: `${t.adoption}%`, background: t.color }} />
                  </div>
                  <span className="text-[10px] font-bold w-7 text-right shrink-0" style={{ color: 'var(--brand-navy)' }}>{t.adoption}%</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
