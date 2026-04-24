import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CreditCard, TrendingUp, Users, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';

const mrrData = [
  { month: 'Oct', mrr: 12400, churn: 3.2 },
  { month: 'Nov', mrr: 15800, churn: 2.8 },
  { month: 'Dec', mrr: 18200, churn: 2.1 },
  { month: 'Jan', mrr: 16900, churn: 3.5 },
  { month: 'Feb', mrr: 21300, churn: 1.9 },
  { month: 'Mar', mrr: 24700, churn: 1.7 },
];

const planData = [
  { plan: 'Free',       count: 1842, color: '#64748b' },
  { plan: 'Newsletter', count: 687,  color: '#0a7ea4' },
  { plan: 'Premium',    count: 248,  color: '#8b5cf6' },
  { plan: 'Enterprise', count: 70,   color: '#e8500a' },
];

const TRANSACTIONS = [
  { id: 'TXN-001', user: 'Sarah Mitchell',   plan: 'Premium',    amount: '$29/mo', status: 'Active',  date: 'Apr 23, 2026' },
  { id: 'TXN-002', user: 'James Okafor',     plan: 'Enterprise', amount: '$199/mo',status: 'Active',  date: 'Apr 22, 2026' },
  { id: 'TXN-003', user: 'Lena Hoffmann',    plan: 'Premium',    amount: '$29/mo', status: 'Active',  date: 'Apr 21, 2026' },
  { id: 'TXN-004', user: 'Chen Wei',         plan: 'Enterprise', amount: '$199/mo',status: 'Cancelled',date: 'Apr 18, 2026' },
  { id: 'TXN-005', user: 'Fatima Al-Rashid', plan: 'Enterprise', amount: '$199/mo',status: 'Active',  date: 'Apr 20, 2026' },
  { id: 'TXN-006', user: 'Amara Diallo',     plan: 'Premium',    amount: '$29/mo', status: 'Pending', date: 'Apr 24, 2026' },
];

const STATUS_STYLES = {
  Active:    { color: '#10b981', bg: 'rgba(16,185,129,0.15)',  icon: CheckCircle },
  Cancelled: { color: '#ef4444', bg: 'rgba(239,68,68,0.15)',   icon: XCircle },
  Pending:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)',  icon: Clock },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-md px-3 py-2 text-[11px]" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <p className="text-[#94a3b8] mb-1">{label}</p>
        {payload.map((p, i) => <p key={i} style={{ color: p.color }} className="font-bold">{p.name}: {p.value}</p>)}
      </div>
    );
  }
  return null;
};

export default function AdminSubscriptions() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#0d1b3e] text-[16px] font-bold">Subscriptions</h2>
          <p className="text-[#64748b] text-[11px]">Revenue, plans, and subscriber management</p>
        </div>
        <div className="flex gap-1 rounded-lg p-1" style={{ background: 'white' }}>
          {['overview', 'transactions', 'plans'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 rounded-md text-[11px] font-semibold capitalize transition-colors ${activeTab === tab ? 'text-white' : 'text-[#64748b] hover:text-white'}`} style={activeTab === tab ? { background: 'var(--brand-orange)' } : {}}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'MRR',           value: '$24,700', change: '+15.8%', icon: DollarSign, color: '#10b981' },
              { label: 'Total Subs',    value: '1,005',   change: '+12.1%', icon: Users,      color: '#0a7ea4' },
              { label: 'Churn Rate',    value: '1.7%',    change: '-0.2%',  icon: TrendingUp, color: '#e8500a' },
              { label: 'ARPU',          value: '$24.58',  change: '+3.4%',  icon: CreditCard, color: '#8b5cf6' },
            ].map(k => (
              <div key={k.label} className="rounded-xl p-4" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wider">{k.label}</p>
                  <k.icon size={15} style={{ color: k.color }} />
                </div>
                <p className="text-[#0d1b3e] text-xl font-black">{k.value}</p>
                <p className="text-emerald-400 text-[10px] font-bold mt-1">{k.change} MoM</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <h3 className="text-[#0d1b3e] text-[13px] font-bold mb-1">MRR Growth</h3>
              <p className="text-[#64748b] text-[11px] mb-4">Monthly recurring revenue trend</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={mrrData}>
                  <defs>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="mrr" name="MRR ($)" stroke="#10b981" strokeWidth={2} fill="url(#mrrGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <h3 className="text-[#0d1b3e] text-[13px] font-bold mb-1">Subscribers by Plan</h3>
              <p className="text-[#64748b] text-[11px] mb-4">Distribution across tiers</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={planData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="plan" type="category" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Subscribers" radius={[0, 4, 4, 0]}>
                    {planData.map((entry, i) => (
                      <rect key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Plan pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { plan: 'Free',       price: '$0',    features: ['5 articles/month', 'Newsletter', 'Signal layer'], color: '#64748b', count: 1842 },
              { plan: 'Newsletter', price: '$0',    features: ['Unlimited articles', 'Daily briefing', 'Signal + Insight'], color: '#0a7ea4', count: 687 },
              { plan: 'Premium',    price: '$29/mo',features: ['All content', 'Deep Analysis', 'DTMB Books', 'AI Engine'], color: '#8b5cf6', count: 248, highlight: true },
              { plan: 'Enterprise', price: '$199/mo',features: ['Everything', 'Team seats (10)', 'API access', 'Priority support'], color: '#e8500a', count: 70 },
            ].map(p => (
              <div key={p.plan} className="rounded-xl p-4" style={{ background: p.highlight ? 'rgba(139,92,246,0.1)' : '#161b27', border: `1px solid ${p.highlight ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.07)'}` }}>
                <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: p.color }}>{p.plan}</p>
                <p className="text-[#0d1b3e] text-xl font-black mb-3">{p.price}</p>
                <p className="text-[#64748b] text-[10px] mb-3">{p.count} subscribers</p>
                <ul className="space-y-1.5">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
                      <CheckCircle size={10} style={{ color: p.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'transactions' && (
        <div className="rounded-xl overflow-hidden" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {['Transaction', 'User', 'Plan', 'Amount', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#94a3b8] bg-[#f8fafc] bg-[#f8fafc]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t, i) => {
                const ss = STATUS_STYLES[t.status];
                const StatusIcon = ss.icon;
                return (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td className="px-4 py-3"><span className="text-[#64748b] text-[11px] font-mono">{t.id}</span></td>
                    <td className="px-4 py-3"><span className="text-[#1e293b] text-[12px] font-semibold">{t.user}</span></td>
                    <td className="px-4 py-3"><span className="text-[#475569] text-[11px]">{t.plan}</span></td>
                    <td className="px-4 py-3"><span className="text-[#0d1b3e] text-[12px] font-bold">{t.amount}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <StatusIcon size={11} style={{ color: ss.color }} />
                        <span className="text-[11px] font-semibold" style={{ color: ss.color }}>{t.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-[#64748b] text-[11px]">{t.date}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <h3 className="text-[#0d1b3e] text-[13px] font-bold mb-4">Plan Configuration</h3>
          <div className="space-y-3">
            {[
              { plan: 'Free',       price: '0',   desc: 'Basic access €” 5 articles/month' },
              { plan: 'Newsletter', price: '0',   desc: 'Unlimited articles + daily briefing' },
              { plan: 'Premium',    price: '29',  desc: 'Full access including Deep Analysis and DTMB Books' },
              { plan: 'Enterprise', price: '199', desc: 'Team access, API, and priority support' },
            ].map(p => (
              <div key={p.plan} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div className="flex-1">
                  <p className="text-[#0d1b3e] text-[13px] font-bold">{p.plan}</p>
                  <p className="text-[#64748b] text-[11px]">{p.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748b] text-[12px]">$</span>
                  <input defaultValue={p.price} className="w-20 rounded-md px-2 py-1.5 text-white text-[12px] text-center focus:outline-none" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }} />
                  <span className="text-[#64748b] text-[11px]">/mo</span>
                </div>
                <button className="px-3 py-1.5 rounded-md text-[#0d1b3e] text-[11px] font-bold" style={{ background: 'var(--brand-orange)' }}>Save</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}







