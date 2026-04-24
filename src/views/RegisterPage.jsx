import { useState } from 'react';
import { Eye, EyeOff, Zap, X } from 'lucide-react';
import SocialAuth from '../components/SocialAuth';

export default function RegisterPage({ onClose, onGoLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const fieldCls = "w-full px-3 py-2 text-[13px] border rounded-lg focus:outline-none transition-colors placeholder-[#9ca3af]";
  const fieldSty = { borderColor: '#d1d5db', color: 'var(--brand-dark)' };
  const onFocus  = e => (e.target.style.borderColor = 'var(--brand-navy)');
  const onBlur   = e => (e.target.style.borderColor = '#d1d5db');

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto py-6"
      style={{ background: 'rgba(13,27,62,0.82)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[360px] mx-4 bg-white rounded-2xl shadow-2xl px-7 py-7 fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1 rounded-full hover:bg-gray-100 transition-colors"
          style={{ color: '#9ca3af' }}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Logo + title */}
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg mb-2.5" style={{ background: 'var(--brand-navy)' }}>
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <h1 className="text-[17px] font-black text-center" style={{ color: 'var(--brand-dark)' }}>
            Create your DTMI account
          </h1>
          <p className="text-[12px] mt-1 text-center" style={{ color: 'var(--brand-muted)' }}>
            Already have an account?{' '}
            <button type="button" onClick={onGoLogin}
              className="font-semibold underline hover:opacity-70 transition-opacity"
              style={{ color: 'var(--brand-dark)' }}>
              Sign in
            </button>
          </p>
        </div>

        {/* Fields */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <input type="text" required placeholder="Full name"
            value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })}
            className={fieldCls} style={fieldSty} onFocus={onFocus} onBlur={onBlur} />

          <input type="email" required placeholder="Email address"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            className={fieldCls} style={fieldSty} onFocus={onFocus} onBlur={onBlur} />

          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} required placeholder="Password (min. 8 characters)"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className={`${fieldCls} pr-9`} style={fieldSty} onFocus={onFocus} onBlur={onBlur} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#9ca3af' }}>
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          <input type="password" required placeholder="Confirm password"
            value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })}
            className={fieldCls} style={fieldSty} onFocus={onFocus} onBlur={onBlur} />

          <button type="submit"
            className="w-full py-2.5 rounded-lg text-[13px] font-bold text-white hover:opacity-90 transition-opacity mt-1"
            style={{ background: 'var(--brand-navy)' }}>
            Create account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[11px]" style={{ color: 'var(--brand-muted)' }}>or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <SocialAuth context="signing up or signing in" />
      </div>
    </div>
  );
}
