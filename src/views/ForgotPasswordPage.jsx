import { useState } from 'react';
import { Zap, CheckCircle, X } from 'lucide-react';

export default function ForgotPasswordPage({ onClose, onGoLogin }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

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
            Reset your password
          </h1>
          <p className="text-[12px] mt-1 text-center" style={{ color: 'var(--brand-muted)' }}>
            Enter your email and we'll send a reset link
          </p>
        </div>

        {sent ? (
          <div className="text-center py-2 fade-in">
            <CheckCircle size={40} className="mx-auto mb-3" style={{ color: '#16a34a' }} />
            <p className="font-black text-[15px] mb-1.5" style={{ color: 'var(--brand-dark)' }}>Check your inbox</p>
            <p className="text-[12px] mb-5 leading-relaxed" style={{ color: 'var(--brand-muted)' }}>
              A reset link was sent to{' '}
              <span className="font-semibold" style={{ color: 'var(--brand-dark)' }}>{email}</span>.
              Check your spam folder if you don't see it.
            </p>
            <button onClick={onGoLogin}
              className="w-full py-2.5 rounded-lg text-[13px] font-bold text-white hover:opacity-90 transition-opacity"
              style={{ background: 'var(--brand-navy)' }}>
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="email" required placeholder="Email address"
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-[13px] border rounded-lg focus:outline-none transition-colors placeholder-[#9ca3af]"
              style={{ borderColor: '#d1d5db', color: 'var(--brand-dark)' }}
              onFocus={e => e.target.style.borderColor = 'var(--brand-navy)'}
              onBlur={e => e.target.style.borderColor = '#d1d5db'}
            />

            <button type="submit"
              className="w-full py-2.5 rounded-lg text-[13px] font-bold text-white hover:opacity-90 transition-opacity"
              style={{ background: 'var(--brand-navy)' }}>
              Send reset link
            </button>

            <p className="text-center text-[12px] pt-1" style={{ color: 'var(--brand-muted)' }}>
              Remembered it?{' '}
              <button type="button" onClick={onGoLogin}
                className="font-semibold underline hover:opacity-70 transition-opacity"
                style={{ color: 'var(--brand-dark)' }}>
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
