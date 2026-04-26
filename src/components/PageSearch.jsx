import { Search, X } from 'lucide-react';

/**
 * Reusable inline search bar - 70% wide, centred.
 * Props:
 *   value        – current query string
 *   onChange     – (string) => void
 *   placeholder  – input placeholder text
 *   resultCount  – number of results (shown when query is active)
 *   totalCount   – total items
 *   dark         – true = dark navy theme
 */
export default function PageSearch({
  value,
  onChange,
  placeholder = 'Search...',
  resultCount,
  totalCount,
  dark = false,
}) {
  const bg           = dark ? 'rgba(255,255,255,0.07)' : 'white';
  const borderIdle   = dark ? 'rgba(255,255,255,0.15)' : 'var(--brand-border)';
  const textColor    = dark ? 'white'                  : 'var(--brand-dark)';
  const iconColor    = dark ? '#64748b'                : '#94a3b8';
  const phClass      = dark ? 'placeholder-[#475569]'  : 'placeholder-[#94a3b8]';
  const countColor   = dark ? '#64748b'                : 'var(--brand-muted)';

  return (
    <div className="w-full flex flex-col items-stretch gap-2">
      {/* Input - Full width with professional styling */}
      <div
        className="flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all border-2"
        style={{
          background: bg,
          borderColor: borderIdle,
        }}
        onFocusCapture={e => (e.currentTarget.style.borderColor = 'var(--brand-orange)')}
        onBlurCapture={e  => (e.currentTarget.style.borderColor = borderIdle)}
      >
        <Search
          size={18}
          className="shrink-0"
          style={{ color: value ? 'var(--brand-orange)' : iconColor }}
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent text-[15px] font-medium focus:outline-none ${phClass}`}
          style={{ color: textColor }}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="shrink-0 hover:opacity-70 transition-opacity"
            style={{ color: iconColor }}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Result count - below input */}
      {value && resultCount !== undefined && (
        <p className="text-[12px] px-4" style={{ color: countColor }}>
          {resultCount === 0
            ? `No results for "${value}"`
            : `${resultCount}${totalCount !== undefined ? ` of ${totalCount}` : ''} result${resultCount !== 1 ? 's' : ''}`}
        </p>
      )}
    </div>
  );
}
