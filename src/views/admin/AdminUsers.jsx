import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Shield, User, Mail, Calendar, MoreVertical } from 'lucide-react';

const USERS = [
  { id: 1,  name: 'Sarah Mitchell',    email: 'sarah.m@globalcorp.com',    role: 'Premium',     status: 'Active',   joined: 'Jan 12, 2026', reads: 142 },
  { id: 2,  name: 'James Okafor',      email: 'j.okafor@govdigital.ng',    role: 'Enterprise',  status: 'Active',   joined: 'Feb 3, 2026',  reads: 89  },
  { id: 3,  name: 'Lena Hoffmann',     email: 'lena.h@wef.int',            role: 'Premium',     status: 'Active',   joined: 'Mar 8, 2026',  reads: 201 },
  { id: 4,  name: 'Marcus Webb',       email: 'marcus@digitalqatalyst.com',role: 'Admin',       status: 'Active',   joined: 'Oct 1, 2025',  reads: 512 },
  { id: 5,  name: 'Priya Nair',        email: 'priya@digitalqatalyst.com', role: 'Admin',       status: 'Active',   joined: 'Oct 1, 2025',  reads: 487 },
  { id: 6,  name: 'Tom Eriksson',      email: 't.eriksson@nordic.se',      role: 'Free',        status: 'Active',   joined: 'Apr 10, 2026', reads: 23  },
  { id: 7,  name: 'Amara Diallo',      email: 'a.diallo@aiethics.org',     role: 'Premium',     status: 'Active',   joined: 'Feb 28, 2026', reads: 167 },
  { id: 8,  name: 'Chen Wei',          email: 'chen.w@techasia.cn',        role: 'Enterprise',  status: 'Inactive', joined: 'Dec 15, 2025', reads: 34  },
  { id: 9,  name: 'Fatima Al-Rashid',  email: 'f.rashid@uae.gov',          role: 'Enterprise',  status: 'Active',   joined: 'Mar 20, 2026', reads: 98  },
  { id: 10, name: 'David Osei',        email: 'd.osei@accra.tech',         role: 'Free',        status: 'Active',   joined: 'Apr 18, 2026', reads: 11  },
];

const ROLE_STYLES = {
  Admin:      { bg: 'rgba(232,80,10,0.15)',  text: '#e8500a',  border: 'rgba(232,80,10,0.3)'  },
  Enterprise: { bg: 'rgba(10,126,164,0.15)', text: '#0a7ea4',  border: 'rgba(10,126,164,0.3)' },
  Premium:    { bg: 'rgba(139,92,246,0.15)', text: '#8b5cf6',  border: 'rgba(139,92,246,0.3)' },
  Free:       { bg: 'rgba(100,116,139,0.15)',text: '#94a3b8',  border: 'rgba(100,116,139,0.3)' },
};

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [users, setUsers] = useState(USERS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'Free' });

  const filtered = users.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter === 'All' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    setUsers(prev => [{ id: Date.now(), ...form, status: 'Active', joined: 'Apr 24, 2026', reads: 0 }, ...prev]);
    setForm({ name: '', email: '', role: 'Free' });
    setShowForm(false);
  };

  const inputCls = "w-full rounded-md px-3 py-2 text-[#0d1b3e] text-[12px] focus:outline-none";
  const inputStyle = { background: '#f1f5f9', border: '1px solid #e2e8f0' };

  const stats = [
    { label: 'Total Users',    value: users.length,                                    color: '#e8500a' },
    { label: 'Active',         value: users.filter(u => u.status === 'Active').length,  color: '#10b981' },
    { label: 'Premium+',       value: users.filter(u => u.role !== 'Free').length,      color: '#8b5cf6' },
    { label: 'Enterprise',     value: users.filter(u => u.role === 'Enterprise').length,color: '#0a7ea4' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#0d1b3e] text-[16px] font-bold">User Management</h2>
          <p className="text-[#64748b] text-[11px]">{users.length} registered users</p>
        </div>
        <button onClick={() => setShowForm(s => !s)} className="flex items-center gap-2 px-4 py-2 rounded-md text-[#0d1b3e] text-[12px] font-bold" style={{ background: 'var(--brand-orange)' }}>
          <Plus size={14} /> Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[#64748b] text-[11px] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="rounded-xl p-5 space-y-4" style={{ background: 'white', border: '1px solid rgba(232,80,10,0.3)' }}>
          <h3 className="text-[#0d1b3e] text-[13px] font-bold">Add New User</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wider block mb-1">Full Name *</label>
              <input className={inputCls} style={inputStyle} placeholder="Full name..." value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wider block mb-1">Email *</label>
              <input className={inputCls} style={inputStyle} placeholder="email@domain.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wider block mb-1">Role</label>
              <select className={inputCls} style={inputStyle} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                {['Free', 'Premium', 'Enterprise', 'Admin'].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="px-4 py-2 rounded-md text-[#0d1b3e] text-[12px] font-bold" style={{ background: 'var(--brand-orange)' }}>Add User</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-md text-[#94a3b8] text-[12px] font-bold hover:text-white transition-colors" style={{ background: '#f1f5f9' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input className="w-full rounded-md pl-8 pr-3 py-2 text-[#0d1b3e] text-[12px] focus:outline-none" style={{ background: 'white', border: '1px solid #e2e8f0' }} placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="rounded-md px-3 py-2 text-[#475569] text-[12px] focus:outline-none" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          {['All', 'Admin', 'Enterprise', 'Premium', 'Free'].map(r => <option key={r} value={r}>Role: {r}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {['User', 'Email', 'Role', 'Status', 'Joined', 'Articles Read', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#94a3b8] bg-[#f8fafc] bg-[#f8fafc]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => {
                const rs = ROLE_STYLES[user.role];
                return (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#1e293b] text-[10px] font-black shrink-0" style={{ background: 'var(--brand-orange)' }}>
                          {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <span className="text-[#1e293b] text-[12px] font-semibold">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-[#475569] text-[11px]">{user.email}</span></td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: rs.bg, color: rs.text, border: `1px solid ${rs.border}` }}>{user.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-400' : 'bg-[#475569]'}`} />
                        <span className={`text-[11px] ${user.status === 'Active' ? 'text-emerald-400' : 'text-[#64748b]'}`}>{user.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-[#64748b] text-[11px]">{user.joined}</span></td>
                    <td className="px-4 py-3"><span className="text-[#0d1b3e] text-[11px] font-bold">{user.reads}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-md text-[#64748b] hover:text-white hover:bg-slate-100 transition-colors"><Edit2 size={13} /></button>
                        <button onClick={() => setUsers(prev => prev.filter(u => u.id !== user.id))} className="p-1.5 rounded-md text-[#64748b] hover:text-red-400 hover:bg-red-500/5 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t" style={{ borderColor: '#e2e8f0' }}>
          <p className="text-[#64748b] text-[11px]">Showing {filtered.length} of {users.length} users</p>
        </div>
      </div>
    </div>
  );
}








