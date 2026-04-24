import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';

const dailyTraffic = [
  { date: 'Apr 17', visitors: 3800, pageviews: 9800,  sessions: 4500, bounceRate: 41 },
  { date: 'Apr 18', visitors: 4200, pageviews: 11800, sessions: 5100, bounceRate: 38 },
  { date: 'Apr 19', visitors: 5800, pageviews: 15200, sessions: 6900, bounceRate: 36 },
  { date: 'Apr 20', visitors: 5100, pageviews: 13400, sessions: 6200, bounceRate: 39 },
  { date: 'Apr 21', visitors: 7200, pageviews: 19800, sessions: 8700, bounceRate: 34 },
  { date: 'Apr 22', visitors: 6800, pageviews: 18100, sessions: 8100, bounceRate: 35 },
  { date: 'Apr 23', visitors: 8400, pageviews: 22600, sessions: 9800, bounceRate: 32 },
];

const trafficSources = [
  { source: 'Organic Search', value: 42, color: '#10b981' },
  { source: 'Direct',         value: 28, color: '#0a7ea4' },
  { source: 'Social Media',   value: 18, color: '#8b5cf6' },
  { source: 'Email',          value: 8,  color: '#e8500a' },
  { source: 'Referral',       value: 4,  color: '#f59e0b' },
];

const geoData = [
  { country: 'United States', sessions: 18400, pct: '22%' },
  { country: 'United Kingdom', sessions: 12100, pct: '14%' },
  { country: 'Nigeria',        sessions: 9800,  pct: '12%' },
  { country: 'Germany',        sessions: 7200,  pct: '9%'  },
  { country: 'UAE',            sessions: 6100,  pct: '7%'  },
  { country: 'Singapore',      sessions: 5400,  pct: '6%'  },
  { country: 'South Africa',   sessions: 4800,  pct: '6%'  },
  { country: 'Other',          sessions: 20200, pct: '24%' },
];

const contentPerformance = [
  { subject: 'AI',             views: 85, engagement: 78, shares: 72 },
  { subject: 'Cybersecurity',  views: 72, engagement: 68, shares: 65 },
  { subject: 'Cloud',          views: 65, engagement: 60, shares: 58 },
  { subject: 'DCO',            views: 58, engagement: 72, shares: 55 },
  { subject: 'Governance',     views: 62, engagement: 65, shares: 60 },
  { subject: 'Digital Economy',views: 70, engagement: 74, shares: 68 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-md px-3 py-2 text-[11px]" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <p className="text-[#94a3b8] mb-1">{label}</p>
        {payload.map((p, i) => <p key={i} style={{ color: p.color }} className="font-bold">{p.name}: {p.value?.toLocaleString()}</p>)}
      </div>
    );
  }
  return null;
};

export default function AdminAnalytics() {
  const [range, setRange] = useState('7d');

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#0d1b3e] text-[16px] font-bold">Analytics</h2>
          <p className="text-[#64748b] text-[11px]">Traffic, engagement, and content performance</p>
        </div>
        <div className="flex gap-1 rounded-lg p-1" style={{ background: 'white' }}>
          {['7d', '30d', '90d', '1y'].map(r => (
            <button key={r} onClick={() => setRange(r)} className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-colors ${range === r ? 'text-white' : 'text-[#64748b] hover:text-white'}`} style={range === r ? { background: 'var(--brand-orange)' } : {}}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: 'Total Visitors',  value: '41.3K', change: '+18%',  color: '#e8500a' },
          { label: 'Pageviews',       value: '110.7K',change: '+22%',  color: '#0a7ea4' },
          { label: 'Avg Session',     value: '4m 38s',change: '+0:24', color: '#10b981' },
          { label: 'Bounce Rate',     value: '38.2%', change: '-2.1%', color: '#f59e0b' },
          { label: 'New vs Returning',value: '62/38', change: '',      color: '#8b5cf6' },
        ].map(k => (
          <div key={k.label} className="rounded-xl p-4" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
            <p className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wider mb-2">{k.label}</p>
            <p className="text-[#0d1b3e] text-[18px] font-black">{k.value}</p>
            {k.change && <p className="text-emerald-400 text-[10px] font-bold mt-0.5">{k.change}</p>}
          </div>
        ))}
      </div>

      {/* Traffic chart */}
      <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
        <h3 className="text-[#0d1b3e] text-[13px] font-bold mb-1">Traffic Overview</h3>
        <p className="text-[#64748b] text-[11px] mb-4">Daily visitors and pageviews</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={dailyTraffic}>
            <defs>
              <linearGradient id="aVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#e8500a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#e8500a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="aPageviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#0a7ea4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0a7ea4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
            <Area type="monotone" dataKey="visitors"  name="Visitors"  stroke="#e8500a" strokeWidth={2} fill="url(#aVisitors)"  dot={false} />
            <Area type="monotone" dataKey="pageviews" name="Pageviews" stroke="#0a7ea4" strokeWidth={2} fill="url(#aPageviews)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Traffic sources */}
        <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <h3 className="text-[#0d1b3e] text-[13px] font-bold mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            {trafficSources.map(s => (
              <div key={s.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#475569] text-[11px]">{s.source}</span>
                  <span className="text-[#0d1b3e] text-[11px] font-bold">{s.value}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: '#f1f5f9' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${s.value}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geo */}
        <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <h3 className="text-[#0d1b3e] text-[13px] font-bold mb-4">Top Countries</h3>
          <div className="space-y-2">
            {geoData.map((g, i) => (
              <div key={g.country} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: '#e2e8f0' }}>
                <div className="flex items-center gap-2">
                  <span className="text-[#475569] text-[11px] w-4">{i + 1}</span>
                  <span className="text-[#475569] text-[11px]">{g.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#0d1b3e] text-[11px] font-bold">{g.sessions.toLocaleString()}</span>
                  <span className="text-[#64748b] text-[10px]">{g.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content radar */}
        <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <h3 className="text-[#0d1b3e] text-[13px] font-bold mb-1">Content Performance</h3>
          <p className="text-[#64748b] text-[11px] mb-2">By category</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={contentPerformance}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9 }} />
              <Radar name="Views" dataKey="views" stroke="#e8500a" fill="#e8500a" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Engagement" dataKey="engagement" stroke="#0a7ea4" fill="#0a7ea4" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}







