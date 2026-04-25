import { useState } from "react";
import { Search, Plus, Edit2, Trash2, X, Check, Eye, Ban, RefreshCw } from "lucide-react";

const USERS_SEED = [
  { id: 1,  name: "Sarah Mitchell",   email: "sarah.m@globalcorp.com",    role: "Premium",    status: "Active",    joined: "Jan 12, 2026", reads: 142, lastActive: "2 hours ago",  org: "GlobalCorp",      country: "UK" },
  { id: 2,  name: "James Okafor",     email: "j.okafor@govdigital.ng",    role: "Enterprise", status: "Active",    joined: "Feb 3, 2026",  reads: 89,  lastActive: "1 day ago",    org: "Gov Digital NG",  country: "NG" },
  { id: 3,  name: "Lena Hoffmann",    email: "lena.h@wef.int",            role: "Premium",    status: "Active",    joined: "Mar 8, 2026",  reads: 201, lastActive: "30 min ago",   org: "WEF",             country: "CH" },
  { id: 4,  name: "Marcus Webb",      email: "marcus@digitalqatalyst.com",role: "Admin",      status: "Active",    joined: "Oct 1, 2025",  reads: 512, lastActive: "Just now",     org: "DigitalQatalyst", country: "US" },
  { id: 5,  name: "Priya Nair",       email: "priya@digitalqatalyst.com", role: "Admin",      status: "Active",    joined: "Oct 1, 2025",  reads: 487, lastActive: "5 min ago",    org: "DigitalQatalyst", country: "IN" },
  { id: 6,  name: "Tom Eriksson",     email: "t.eriksson@nordic.se",      role: "Free",       status: "Active",    joined: "Apr 10, 2026", reads: 23,  lastActive: "3 days ago",   org: "Nordic Digital",  country: "SE" },
  { id: 7,  name: "Amara Diallo",     email: "a.diallo@aiethics.org",     role: "Premium",    status: "Active",    joined: "Feb 28, 2026", reads: 167, lastActive: "4 hours ago",  org: "AI Ethics Org",   country: "SN" },
  { id: 8,  name: "Chen Wei",         email: "chen.w@techasia.cn",        role: "Enterprise", status: "Inactive",  joined: "Dec 15, 2025", reads: 34,  lastActive: "2 weeks ago",  org: "TechAsia",        country: "CN" },
  { id: 9,  name: "Fatima Al-Rashid", email: "f.rashid@uae.gov",          role: "Enterprise", status: "Active",    joined: "Mar 20, 2026", reads: 98,  lastActive: "6 hours ago",  org: "UAE Government",  country: "AE" },
  { id: 10, name: "David Osei",       email: "d.osei@accra.tech",         role: "Free",       status: "Active",    joined: "Apr 18, 2026", reads: 11,  lastActive: "1 day ago",    org: "Accra Tech Hub",  country: "GH" },
  { id: 11, name: "Yuki Tanaka",      email: "y.tanaka@softbank.jp",      role: "Enterprise", status: "Active",    joined: "Jan 5, 2026",  reads: 234, lastActive: "1 hour ago",   org: "SoftBank",        country: "JP" },
  { id: 12, name: "Isabelle Moreau",  email: "i.moreau@bpifrance.fr",     role: "Premium",    status: "Suspended", joined: "Nov 20, 2025", reads: 78,  lastActive: "1 month ago",  org: "BPI France",      country: "FR" },
];

const ROLE_STYLES = {
  Admin:      { bg: "rgba(232,80,10,0.15)",  text: "#e8500a", border: "rgba(232,80,10,0.3)"   },
  Enterprise: { bg: "rgba(10,126,164,0.15)", text: "#0a7ea4", border: "rgba(10,126,164,0.3)"  },
  Premium:    { bg: "rgba(139,92,246,0.15)", text: "#8b5cf6", border: "rgba(139,92,246,0.3)"  },
  Free:       { bg: "rgba(100,116,139,0.15)",text: "#94a3b8", border: "rgba(100,116,139,0.3)" },
};

const STATUS_CFG = {
  Active:    { dot: "#10b981", label: "text-emerald-500" },
  Inactive:  { dot: "#94a3b8", label: "text-slate-400"   },
  Suspended: { dot: "#ef4444", label: "text-red-400"     },
};

const inputCls   = "w-full rounded-md px-3 py-2 text-[#0d1b3e] text-[12px] focus:outline-none";
const inputStyle = { background: "#f8fafc", border: "1px solid #e2e8f0" };
const labelCls   = "text-[#64748b] text-[10px] font-semibold uppercase tracking-wider block mb-1";

function UserModal({ user, onSave, onClose }) {
  const isNew = !user.id;
  const [form, setForm] = useState({
    name:    user.name    || "",
    email:   user.email   || "",
    role:    user.role    || "Free",
    status:  user.status  || "Active",
    org:     user.org     || "",
    country: user.country || "",
  });
  const [err, setErr] = useState("");

  const submit = () => {
    if (!form.name.trim() || !form.email.trim()) { setErr("Name and email are required."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErr("Enter a valid email."); return; }
    onSave({ ...user, ...form, id: user.id || Date.now(), joined: user.joined || "Apr 25, 2026", reads: user.reads ?? 0, lastActive: user.lastActive || "Just now" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{ background: "white" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#e2e8f0" }}>
          <div>
            <h3 className="text-[#0d1b3e] text-[14px] font-bold">{isNew ? "Add New User" : "Edit User"}</h3>
            {!isNew && <p className="text-[#64748b] text-[11px] mt-0.5">ID #{user.id}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md text-[#94a3b8] hover:text-[#0d1b3e] hover:bg-slate-100 transition-colors"><X size={16} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {err && <p className="text-red-500 text-[11px] font-semibold px-3 py-2 rounded-md" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>{err}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Full Name *</label>
              <input className={inputCls} style={inputStyle} placeholder="Full name" value={form.name} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErr(""); }} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Email Address *</label>
              <input className={inputCls} style={inputStyle} type="email" placeholder="email@domain.com" value={form.email} onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErr(""); }} />
            </div>
            <div>
              <label className={labelCls}>Organisation</label>
              <input className={inputCls} style={inputStyle} placeholder="Company / org" value={form.org} onChange={e => setForm(f => ({ ...f, org: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Country</label>
              <input className={inputCls} style={inputStyle} placeholder="e.g. US, UK, NG" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Role</label>
              <select className={inputCls} style={inputStyle} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                {["Free","Premium","Enterprise","Admin"].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select className={inputCls} style={inputStyle} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                {["Active","Inactive","Suspended"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t" style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}>
          <button onClick={onClose} className="px-4 py-2 rounded-md text-[#64748b] text-[12px] font-semibold hover:bg-slate-200 transition-colors">Cancel</button>
          <button onClick={submit} className="flex items-center gap-1.5 px-4 py-2 rounded-md text-white text-[12px] font-bold hover:opacity-90 transition-opacity" style={{ background: "var(--brand-orange)" }}>
            <Check size={13} /> {isNew ? "Add User" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function UserDrawer({ user, onClose, onEdit, onDelete, onToggleStatus }) {
  const rs = ROLE_STYLES[user.role] || ROLE_STYLES.Free;
  const ss = STATUS_CFG[user.status] || STATUS_CFG.Inactive;
  return (
    <div className="fixed inset-0 z-40 flex justify-end" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose}>
      <div className="w-full max-w-sm h-full overflow-y-auto shadow-2xl" style={{ background: "white" }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#e2e8f0" }}>
          <p className="text-[#0d1b3e] text-[13px] font-bold">User Profile</p>
          <button onClick={onClose} className="p-1.5 rounded-md text-[#94a3b8] hover:text-[#0d1b3e] hover:bg-slate-100 transition-colors"><X size={15} /></button>
        </div>
        <div className="px-5 py-6 text-center border-b" style={{ borderColor: "#e2e8f0" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-[20px] font-black mx-auto mb-3" style={{ background: "var(--brand-orange)" }}>
            {user.name.split(" ").map(n => n[0]).slice(0,2).join("")}
          </div>
          <p className="text-[#0d1b3e] text-[15px] font-bold">{user.name}</p>
          <p className="text-[#64748b] text-[12px] mt-0.5">{user.email}</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: rs.bg, color: rs.text, border: "1px solid " + rs.border }}>{user.role}</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ss.dot }} />
              <span className={"text-[11px] font-semibold " + ss.label}>{user.status}</span>
            </div>
          </div>
        </div>
        <div className="px-5 py-4 space-y-3 border-b" style={{ borderColor: "#e2e8f0" }}>
          {[
            ["Organisation", user.org     || ""],
            ["Country",      user.country || ""],
            ["Member Since", user.joined],
            ["Last Active",  user.lastActive || ""],
            ["Articles Read",user.reads],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-[#94a3b8] text-[11px]">{label}</span>
              <span className="text-[#0d1b3e] text-[11px] font-semibold">{value || "—"}</span>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 space-y-2">
          <button onClick={() => { onClose(); onEdit(user); }} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-md text-[12px] font-semibold text-white hover:opacity-90 transition-opacity" style={{ background: "var(--brand-orange)" }}>
            <Edit2 size={13} /> Edit User
          </button>
          <button
            onClick={() => onToggleStatus(user.id)}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-md text-[12px] font-semibold transition-colors"
            style={user.status === "Active"
              ? { background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }
              : { background: "rgba(16,185,129,0.08)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            {user.status === "Active"
              ? <><Ban size={13} /> Suspend User</>
              : <><RefreshCw size={13} /> Reactivate User</>}
          </button>
          <button
            onClick={() => { onDelete(user.id); onClose(); }}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-md text-[12px] font-semibold transition-colors"
            style={{ background: "rgba(239,68,68,0.06)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.15)" }}
          >
            <Trash2 size={13} /> Delete User
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsers() {
  const [users,        setUsers]        = useState(USERS_SEED);
  const [search,       setSearch]       = useState("");
  const [roleFilter,   setRoleFilter]   = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modal,        setModal]        = useState(null);
  const [drawer,       setDrawer]       = useState(null);

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.org || "").toLowerCase().includes(q);
    const matchRole   = roleFilter   === "All" || u.role   === roleFilter;
    const matchStatus = statusFilter === "All" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const saveUser = updated => {
    setUsers(prev => prev.some(u => u.id === updated.id)
      ? prev.map(u => u.id === updated.id ? updated : u)
      : [updated, ...prev]);
    setModal(null);
  };

  const deleteUser    = id => setUsers(prev => prev.filter(u => u.id !== id));
  const toggleStatus  = id => setUsers(prev => prev.map(u =>
    u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u
  ));

  const stats = [
    { label: "Total Users",  value: users.length,                                     color: "#e8500a" },
    { label: "Active",       value: users.filter(u => u.status === "Active").length,   color: "#10b981" },
    { label: "Premium+",     value: users.filter(u => u.role !== "Free").length,       color: "#8b5cf6" },
    { label: "Enterprise",   value: users.filter(u => u.role === "Enterprise").length, color: "#0a7ea4" },
  ];

  return (
    <div className="space-y-5">
      {modal && <UserModal user={modal.user} onSave={saveUser} onClose={() => setModal(null)} />}
      {drawer && (
        <UserDrawer
          user={drawer}
          onClose={() => setDrawer(null)}
          onEdit={u => setModal({ user: u })}
          onDelete={deleteUser}
          onToggleStatus={id => {
            toggleStatus(id);
            setDrawer(prev => prev ? { ...prev, status: prev.status === "Active" ? "Suspended" : "Active" } : null);
          }}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#0d1b3e] text-[16px] font-bold">User Management</h2>
          <p className="text-[#64748b] text-[11px]">{users.length} registered users</p>
        </div>
        <button
          onClick={() => setModal({ user: {} })}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-white text-[12px] font-bold hover:opacity-90 transition-opacity"
          style={{ background: "var(--brand-orange)" }}
        >
          <Plus size={14} /> Add User
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "white", border: "1px solid #e2e8f0" }}>
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[#64748b] text-[11px] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input
            className="w-full rounded-md pl-8 pr-3 py-2 text-[#0d1b3e] text-[12px] focus:outline-none"
            style={{ background: "white", border: "1px solid #e2e8f0" }}
            placeholder="Search by name, email or org..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="rounded-md px-3 py-2 text-[#475569] text-[12px] focus:outline-none" style={{ background: "white", border: "1px solid #e2e8f0" }}>
          {["All","Admin","Enterprise","Premium","Free"].map(r => <option key={r} value={r}>Role: {r}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="rounded-md px-3 py-2 text-[#475569] text-[12px] focus:outline-none" style={{ background: "white", border: "1px solid #e2e8f0" }}>
          {["All","Active","Inactive","Suspended"].map(s => <option key={s} value={s}>Status: {s}</option>)}
        </select>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "white", border: "1px solid #e2e8f0" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["User","Organisation","Role","Status","Joined","Reads",""].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#94a3b8]" style={{ background: "#f8fafc" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#94a3b8] text-[12px]">No users match your filters.</td></tr>
              )}
              {filtered.map((user, i) => {
                const rs = ROLE_STYLES[user.role] || ROLE_STYLES.Free;
                const ss = STATUS_CFG[user.status] || STATUS_CFG.Inactive;
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f1f5f9" : "none" }}
                    onClick={() => setDrawer(user)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0" style={{ background: "var(--brand-orange)" }}>
                          {user.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                        </div>
                        <div>
                          <p className="text-[#1e293b] text-[12px] font-semibold leading-none">{user.name}</p>
                          <p className="text-[#94a3b8] text-[10px] mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-[#475569] text-[11px]">{user.org || "—"}</p>
                      <p className="text-[#94a3b8] text-[10px]">{user.country || ""}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: rs.bg, color: rs.text, border: "1px solid " + rs.border }}>{user.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: ss.dot }} />
                        <span className={"text-[11px] " + ss.label}>{user.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-[#64748b] text-[11px]">{user.joined}</span></td>
                    <td className="px-4 py-3"><span className="text-[#0d1b3e] text-[11px] font-bold">{user.reads}</span></td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <button title="View profile" onClick={() => setDrawer(user)} className="p-1.5 rounded-md text-[#64748b] hover:text-[#0a7ea4] hover:bg-blue-50 transition-colors"><Eye size={13} /></button>
                        <button title="Edit user" onClick={() => setModal({ user })} className="p-1.5 rounded-md text-[#64748b] hover:text-[#e8500a] hover:bg-orange-50 transition-colors"><Edit2 size={13} /></button>
                        <button title="Delete user" onClick={() => deleteUser(user.id)} className="p-1.5 rounded-md text-[#64748b] hover:text-red-400 hover:bg-red-50 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: "#e2e8f0" }}>
          <p className="text-[#64748b] text-[11px]">Showing {filtered.length} of {users.length} users</p>
          {filtered.length < users.length && (
            <button onClick={() => { setSearch(""); setRoleFilter("All"); setStatusFilter("All"); }} className="text-[11px] font-semibold" style={{ color: "var(--brand-orange)" }}>
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
