import { useState } from 'react';
import { Save, Globe, Mail, Shield, Bell, Palette, Database, Key, Users, Eye, EyeOff } from 'lucide-react';

const TABS = [
  { key: 'general',       label: 'General',       icon: Globe },
  { key: 'email',         label: 'Email',         icon: Mail },
  { key: 'security',      label: 'Security',      icon: Shield },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'appearance',    label: 'Appearance',    icon: Palette },
  { key: 'integrations',  label: 'Integrations',  icon: Database },
];

function Toggle({ label, desc, defaultChecked = false }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: '#e2e8f0' }}>
      <div>
        <p className="text-[#1e293b] text-[12px] font-semibold">{label}</p>
        {desc && <p className="text-[#64748b] text-[10px] mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => setOn(v => !v)}
        className="relative w-10 h-5 rounded-full transition-colors shrink-0"
        style={{ background: on ? 'var(--brand-orange)' : 'rgba(255,255,255,0.1)' }}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${on ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

function Field({ label, value, type = 'text', placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wider block mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={type === 'password' ? (show ? 'text' : 'password') : type}
          defaultValue={value}
          placeholder={placeholder}
          className="w-full rounded-md px-3 py-2 text-[#0d1b3e] text-[12px] focus:outline-none transition-colors"
          style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}
        />
        {type === 'password' && (
          <button onClick={() => setShow(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white transition-colors">
            {show ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#0d1b3e] text-[16px] font-bold">Settings</h2>
          <p className="text-[#64748b] text-[11px]">Platform configuration and preferences</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-md text-[#0d1b3e] text-[12px] font-bold transition-colors" style={{ background: saved ? '#10b981' : 'var(--brand-orange)' }}>
          <Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-5">
        {/* Sidebar tabs */}
        <div className="w-44 shrink-0 space-y-0.5">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-colors ${activeTab === key ? 'text-white' : 'text-[#64748b] hover:text-white hover:bg-slate-100'}`}
              style={activeTab === key ? { background: 'rgba(232,80,10,0.15)', color: 'white' } : {}}
            >
              <Icon size={14} style={activeTab === key ? { color: 'var(--brand-orange)' } : {}} />
              <span className="text-[12px] font-semibold">{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 rounded-xl p-5 space-y-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>

          {activeTab === 'general' && (
            <>
              <h3 className="text-[#0d1b3e] text-[13px] font-bold border-b pb-3" style={{ borderColor: '#e2e8f0' }}>General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Platform Name"    value="DTMI" />
                <Field label="Tagline"          value="Digital Transformation Management Intelligence" />
                <Field label="Site URL"         value="https://dtmi.digitalqatalyst.com" />
                <Field label="Admin Email"      value="admin@digitalqatalyst.com" />
                <Field label="Default Language" value="English (EN)" />
                <Field label="Timezone"         value="UTC+0" />
              </div>
              <div>
                <label className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wider block mb-1.5">Platform Description</label>
                <textarea
                  defaultValue="Real-time digital transformation insights for executives, transformation leaders, and consultants."
                  rows={3}
                  className="w-full rounded-md px-3 py-2 text-[#0d1b3e] text-[12px] focus:outline-none resize-none"
                  style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}
                />
              </div>
              <div className="space-y-0">
                <Toggle label="Maintenance Mode"    desc="Take the platform offline for maintenance" />
                <Toggle label="Allow Registration"  desc="Allow new users to register" defaultChecked />
                <Toggle label="Public Content"      desc="Make content accessible without login" defaultChecked />
              </div>
            </>
          )}

          {activeTab === 'email' && (
            <>
              <h3 className="text-[#0d1b3e] text-[13px] font-bold border-b pb-3" style={{ borderColor: '#e2e8f0' }}>Email Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="SMTP Host"     value="smtp.sendgrid.net" />
                <Field label="SMTP Port"     value="587" />
                <Field label="SMTP Username" value="apikey" />
                <Field label="SMTP Password" type="password" value="SG.xxxxxxxxxxxx" />
                <Field label="From Name"     value="DTMI Intelligence" />
                <Field label="From Email"    value="noreply@dtmi.digitalqatalyst.com" />
              </div>
              <div className="space-y-0">
                <Toggle label="Newsletter Enabled"       desc="Send daily intelligence briefings" defaultChecked />
                <Toggle label="Welcome Email"            desc="Send welcome email to new subscribers" defaultChecked />
                <Toggle label="Digest Emails"            desc="Weekly content digest for subscribers" defaultChecked />
                <Toggle label="Transactional Emails"     desc="Subscription confirmations and receipts" defaultChecked />
              </div>
            </>
          )}

          {activeTab === 'security' && (
            <>
              <h3 className="text-[#0d1b3e] text-[13px] font-bold border-b pb-3" style={{ borderColor: '#e2e8f0' }}>Security Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Admin Password"     type="password" value="€¢€¢€¢€¢€¢€¢€¢€¢€¢€¢€¢€¢" />
                <Field label="Confirm Password"   type="password" value="" placeholder="Confirm new password" />
                <Field label="Session Timeout"    value="24 hours" />
                <Field label="Max Login Attempts" value="5" />
              </div>
              <div className="space-y-0">
                <Toggle label="Two-Factor Authentication" desc="Require 2FA for admin access" defaultChecked />
                <Toggle label="Force HTTPS"               desc="Redirect all HTTP to HTTPS" defaultChecked />
                <Toggle label="Rate Limiting"             desc="Limit API requests per IP" defaultChecked />
                <Toggle label="Content Security Policy"   desc="Enable CSP headers" defaultChecked />
                <Toggle label="Audit Logging"             desc="Log all admin actions" defaultChecked />
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <h3 className="text-[#0d1b3e] text-[13px] font-bold border-b pb-3" style={{ borderColor: '#e2e8f0' }}>Notification Preferences</h3>
              <div className="space-y-0">
                <Toggle label="New Subscriber Alert"    desc="Notify when a new user subscribes" defaultChecked />
                <Toggle label="Content Published"       desc="Notify when content goes live" defaultChecked />
                <Toggle label="SEO Issues"              desc="Alert on new SEO problems detected" defaultChecked />
                <Toggle label="Traffic Spikes"          desc="Alert when traffic exceeds 2x average" defaultChecked />
                <Toggle label="Failed Payments"         desc="Alert on subscription payment failures" defaultChecked />
                <Toggle label="Security Alerts"         desc="Notify on suspicious login attempts" defaultChecked />
                <Toggle label="Weekly Report"           desc="Send weekly performance summary" defaultChecked />
                <Toggle label="Monthly Revenue Report"  desc="Send monthly revenue and growth report" defaultChecked />
              </div>
            </>
          )}

          {activeTab === 'appearance' && (
            <>
              <h3 className="text-[#0d1b3e] text-[13px] font-bold border-b pb-3" style={{ borderColor: '#e2e8f0' }}>Appearance & Branding</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Primary Color (Orange)', value: '#e8500a' },
                  { label: 'Navy Background',        value: '#0d1b3e' },
                  { label: 'Teal Accent',            value: '#0a7ea4' },
                  { label: 'Light Background',       value: '#f8f9fb' },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-3">
                    <input type="color" defaultValue={c.value} className="w-10 h-10 rounded-md cursor-pointer border-0 p-0.5" style={{ background: '#f1f5f9' }} />
                    <div>
                      <p className="text-[#1e293b] text-[12px] font-semibold">{c.label}</p>
                      <p className="text-[#64748b] text-[10px] font-mono">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-0 mt-4">
                <Toggle label="Dark Mode Default"   desc="Default new users to dark mode" />
                <Toggle label="Show Breaking Banner" desc="Display breaking news banner" defaultChecked />
                <Toggle label="Show Ticker Bar"      desc="Display live intelligence ticker" defaultChecked />
                <Toggle label="Animations Enabled"   desc="Enable page transition animations" defaultChecked />
              </div>
            </>
          )}

          {activeTab === 'integrations' && (
            <>
              <h3 className="text-[#0d1b3e] text-[13px] font-bold border-b pb-3" style={{ borderColor: '#e2e8f0' }}>Integrations & API</h3>
              <div className="space-y-3">
                {[
                  { name: 'Google Analytics',  key: 'GA-XXXXXXXXXX',    status: true  },
                  { name: 'SendGrid Email',     key: 'SG.xxxxxxxxxxxx',  status: true  },
                  { name: 'Stripe Payments',    key: 'sk_live_xxxxxxxx', status: true  },
                  { name: 'Cloudinary Media',   key: 'cloud_xxxxxxxxx',  status: false },
                  { name: 'OpenAI API',         key: 'sk-xxxxxxxxxxxxxxx',status: true },
                  { name: 'Algolia Search',     key: 'Not configured',   status: false },
                ].map(int => (
                  <div key={int.name} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${int.status ? 'bg-emerald-400' : 'bg-[#475569]'}`} />
                    <div className="flex-1">
                      <p className="text-[#1e293b] text-[12px] font-semibold">{int.name}</p>
                      <p className="text-[#64748b] text-[10px] font-mono">{int.key}</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors" style={{ background: '#f1f5f9', color: '#94a3b8' }}>
                      {int.status ? 'Configure' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wider block mb-1.5">API Key (Read-only)</label>
                <div className="flex gap-2">
                  <input readOnly value="dtmi_live_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" className="flex-1 rounded-md px-3 py-2 text-[#64748b] text-[11px] font-mono focus:outline-none" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }} />
                  <button className="px-3 py-2 rounded-md text-[11px] font-bold" style={{ background: 'var(--brand-orange)', color: 'white' }}>Regenerate</button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}







