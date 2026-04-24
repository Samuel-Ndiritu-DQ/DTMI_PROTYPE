import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Users, Eye, FileText, TrendingUp, TrendingDown,
  ArrowUpRight, ArrowDownRight, Clock, Globe,
  CreditCard, AlertCircle, CheckCircle, Activity
} from 'lucide-react';

// ”€”€ Mock data ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
const trafficData = [
  { day: 'Mon', visitors: 4200, pageviews: 11800, sessions: 5100 },
  { day: 'Tue', visitors: 5800, pageviews: 15200, sessions: 6900 },
  { day: 'Wed', visitors: 5100, pageviews: 13400, sessions: 6200 },
  { day: 'Thu', visitors: 7200, pageviews: 19800, sessions: 8700 },
  { day: 'Fri', visitors: 6800, pageviews: 18100, sessions: 8100 },
  { day: 'Sat', visitors: 4100, pageviews: 10900, sessions: 4900 },
  { day: 'Sun', visitors: 3800, pageviews: 9800,  sessions: 4500 },
];

const revenueData = [
  { month: 'Oct', revenue: 12400, subscriptions: 89 },
  { month: 'Nov', revenue: 15800, subscriptions: 112 },
  { month: 'Dec', revenue: 18200, subscriptions: 134 },
  { month: 'Jan', revenue: 16900, subscriptions: 121 },
  { month: 'Feb', revenue: 21300, subscriptions: 158 },
  { month: 'Mar', revenue: 24700, subscriptions: 187 },
];

const contentByType = [
  { name: 'Articles',  value: 48, color: '#e8500a' },
  { name: 'Videos',    value: 18, color: '#0a7ea4' },
  { name: 'Podcasts',  value: 14, color: '#8b5cf6' },
  { name: 'Reports',   value: 9,  color: '#10b981' },
  { name: 'Books',     value: 3,  color: '#f59e0b' },
];

const topArticles = [
  { title: 'AI adoption accelerates by 15% in Q1 2026', views: '12.4K', readTime: '8 min', category: 'AI' },
  { title: 'EU AI Act: compliance checklist for executives', views: '9.8K', readTime: '9 min', category: 'Governance' },
  { title: 'Zero-trust architecture: 2026 implementation guide', views: '8.2K', readTime: '6 min', category: 'Cybersecurity' },
  { title: 'Economy 4.0: the $4.2T opportunity', views: '7.1K', readTime: '4 min', category: 'Digital Economy' },
  { title: 'DCO framework: new benchmark set', views: '6.5K', readTime: '8 min', category: 'DCO' },
];

const recentActivity = [
  { type: 'publish', text: 'Article published: "AI Integration in the Digital Workplace"', time: '2 min ago', icon: CheckCircle, color: '#10b981' },
  { type: 'user',    text: 'New subscriber: enterprise@globalcorp.com', time: '8 min ago', icon: Users, color: '#0a7ea4' },
  { type: 'alert',   text: 'SEO alert: 3 pages with missing meta descriptions', time: '15 min ago', icon: AlertCircle, color: '#f59e0b' },
  { type: 'publish', text: 'Podcast uploaded: "Cybersecurity in the Age of AI"', time: '1 hr ago', icon: CheckCircle, color: '#10b981' },
  { type: 'user',    text: '14 new newsletter signups today', time: '2 hr ago', icon: Users, color: '#0a7ea4' },
  { type: 'alert',   text: 'Video: "Building AI-Native Organizations" reached 10K views', time: '3 hr ago', icon: Activity, color: '#e8500a' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-md px-3 py-2 text-[11px] shadow-xl" style={{ background: '#f8fafc', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-[#94a3b8] mb-1 font-semibold">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-bold">{p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

// ”€”€ Stat Card ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
function StatCard({ title, value, change, up, icon: Icon, color, sub }) {
  return (
    <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
      <div className="flex items-center justify-between">
        <p className="text-[#64748b] text-[11px] font-semibold uppercase tracking-wider">{title}</p>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: color + '22' }}>
          <Icon size={15} style={{ color }} />
        </div>
      </div>
      <div>
        <p className="text-[#0d1b3e] text-2xl font-black">{value}</p>
        {sub && <p className="text-[#64748b] text-[10px] mt-0.5">{sub}</p>}
      </div>
      <div className={`flex items-center gap-1 text-[11px] font-semibold ${up ? 'text-emerald-400' : 'text-red-400'}`}>
        {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
        <span>{change} vs last month</span>
      </div>
    </div>
  );
}

export default function AdminOverview() {
  const [liveVisitors, setLiveVisitors] = useState(247);

  useEffect(() => {
    const t = setInterval(() => {
      setLiveVisitors(v => Math.max(180, Math.min(400, v + Math.floor((Math.random() - 0.45) * 12))));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-6">

      {/* ”€”€ KPI CARDS ”€”€ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Monthly Readers"   value="84.2K"  change="+18.4%"  up icon={Eye}        color="#e8500a" sub="Target: 100K" />
        <StatCard title="Total Subscribers" value="2,847"  change="+12.1%"  up icon={Users}      color="#0a7ea4" sub="Newsletter + Premium" />
        <StatCard title="MRR"               value="$24,700" change="+15.8%" up icon={CreditCard}  color="#10b981" sub="Monthly Recurring Revenue" />
        <StatCard title="Published Content" value="92"     change="+8 this month" up icon={FileText} color="#8b5cf6" sub="Articles, videos, podcasts" />
      </div>

      {/* ”€”€ LIVE + QUICK STATS ”€”€ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Live Visitors',    value: liveVisitors, live: true,  color: '#10b981' },
          { label: 'Avg Read Time',    value: '4m 38s',     live: false, color: '#0a7ea4' },
          { label: 'Bounce Rate',      value: '38.2%',      live: false, color: '#f59e0b' },
          { label: 'Newsletter Opens', value: '41.7%',      live: false, color: '#e8500a' },
        ].map(item => (
          <div key={item.label} className="rounded-xl p-4 flex items-center justify-between" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
            <div>
              <p className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-[#0d1b3e] text-xl font-black">{item.value}</p>
            </div>
            <div className="flex items-center gap-1.5">
              {item.live && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
              <Globe size={18} style={{ color: item.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* ”€”€ CHARTS ROW 1 ”€”€ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Traffic chart */}
        <div className="lg:col-span-2 rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white text-[13px] font-bold">Weekly Traffic</h3>
              <p className="text-[#64748b] text-[11px]">Visitors, pageviews & sessions</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded-md" style={{ background: 'rgba(232,80,10,0.15)', color: 'var(--brand-orange)' }}>
              This Week
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="gVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#e8500a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#e8500a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gPageviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0a7ea4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0a7ea4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
              <Area type="monotone" dataKey="visitors"  name="Visitors"  stroke="#e8500a" strokeWidth={2} fill="url(#gVisitors)"  dot={false} />
              <Area type="monotone" dataKey="pageviews" name="Pageviews" stroke="#0a7ea4" strokeWidth={2} fill="url(#gPageviews)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Content breakdown */}
        <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <h3 className="text-[#0d1b3e] text-[13px] font-bold mb-1">Content Breakdown</h3>
          <p className="text-[#64748b] text-[11px] mb-4">By content type</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={contentByType} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                {contentByType.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {contentByType.map(item => (
              <div key={item.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-[#94a3b8]">{item.name}</span>
                </div>
                <span className="text-white font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ”€”€ CHARTS ROW 2 ”€”€ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Revenue */}
        <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white text-[13px] font-bold">Revenue & Subscriptions</h3>
              <p className="text-[#64748b] text-[11px]">6-month trend</p>
            </div>
            <div className="text-right">
              <p className="text-white text-[15px] font-black">$24,700</p>
              <p className="text-emerald-400 text-[10px] font-bold">+15.8% MoM</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="Revenue ($)" fill="#e8500a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top articles */}
        <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <h3 className="text-[#0d1b3e] text-[13px] font-bold mb-1">Top Performing Content</h3>
          <p className="text-[#64748b] text-[11px] mb-4">By views this month</p>
          <div className="space-y-0">
            {topArticles.map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-[13px] font-black w-5 text-center shrink-0" style={{ color: i === 0 ? 'var(--brand-orange)' : '#475569' }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#0d1b3e] text-[12px] font-semibold leading-snug truncate">{a.title}</p>
                  <p className="text-[#64748b] text-[10px] mt-0.5">{a.category} · {a.readTime} read</p>
                </div>
                <span className="text-[11px] font-bold shrink-0" style={{ color: 'var(--brand-orange)' }}>{a.views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ”€”€ RECENT ACTIVITY ”€”€ */}
      <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
        <h3 className="text-[#0d1b3e] text-[13px] font-bold mb-4">Recent Activity</h3>
        <div className="space-y-0">
          {recentActivity.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: item.color + '22' }}>
                  <Icon size={13} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#94a3b8] text-[12px] leading-snug">{item.text}</p>
                </div>
                <span className="text-[#475569] text-[10px] shrink-0 mt-0.5">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}






