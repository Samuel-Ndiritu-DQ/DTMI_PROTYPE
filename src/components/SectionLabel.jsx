export default function SectionLabel({ title, link = "See all", onLink, count }) {
  return (
    <div className="flex items-center justify-between mb-4 pb-2.5" style={{ borderBottom: '2px solid var(--brand-orange)' }}>
      <div className="flex items-center gap-2.5">
        <h2 className="font-black uppercase tracking-wide text-[13px]" style={{ color: 'var(--brand-navy)' }}>
          {title}
        </h2>
        {count !== undefined && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm" style={{ background: 'var(--brand-light)', color: 'var(--brand-muted)', border: '1px solid var(--brand-border)' }}>
            {count}
          </span>
        )}
      </div>
      {link && (
        <button onClick={onLink} className="text-[11px] font-bold hover:opacity-70 transition-opacity uppercase tracking-wide flex items-center gap-1" style={{ color: 'var(--brand-orange)' }}>
          {link} →
        </button>
      )}
    </div>
  );
}
