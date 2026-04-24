function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 30.8 0 108.2 2.6 168.6 71.9zm-174.5-89.3c-27.6-35.5-65.8-61.6-109.6-61.6-5.8 0-11.6.6-17.4 1.3 1.3-6.5 1.9-13 1.9-19.5 0-68.7-44.5-141.3-110.9-179.5-41.5-23.7-85.5-29.5-127.4-29.5-5.8 0-11.6.6-17.4 1.3 1.3-6.5 1.9-13 1.9-19.5 0-68.7-44.5-141.3-110.9-179.5C78.3 5.8 34.3 0-7.6 0c-5.8 0-11.6.6-17.4 1.3" />
    </svg>
  );
}

export default function SocialAuth({ context = 'signing up or signing in' }) {
  return (
    <div className="space-y-2">
      {/* Legal disclaimer */}
      <p className="text-[11px] leading-relaxed" style={{ color: '#6b7280' }}>
        By {context}, you agree to our{' '}
        <a href="#" className="underline hover:opacity-70 font-medium" style={{ color: '#111827' }}>Terms of Use</a>
        {' '}and have read our{' '}
        <a href="#" className="underline hover:opacity-70 font-medium" style={{ color: '#111827' }}>Privacy Policy</a>.
        {' '}DTMI and its{' '}
        <a href="#" className="underline hover:opacity-70 font-medium" style={{ color: '#111827' }}>affiliates</a>
        {' '}may use your email address to send updates, ads, and offers. Opt out via{' '}
        <a href="#" className="underline hover:opacity-70 font-medium" style={{ color: '#111827' }}>Privacy Policy</a>.
      </p>

      {/* Google */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2.5 py-2 border rounded-lg text-[13px] font-medium transition-all hover:bg-gray-50 active:scale-[0.99]"
        style={{ borderColor: '#d1d5db', color: '#111827' }}
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Apple */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2.5 py-2 border rounded-lg text-[13px] font-medium transition-all hover:bg-gray-50 active:scale-[0.99]"
        style={{ borderColor: '#d1d5db', color: '#111827' }}
      >
        <AppleIcon />
        Continue with Apple
      </button>
    </div>
  );
}
