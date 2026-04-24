export default function SectionLabel({ title, link = "See all", onLink }) {
  return (
    <div className="flex items-center justify-between mb-4 pb-2.5" style={{ borderBottom: '2px solid var(--brand-border)' }}>
      <h2 className="section-label font-black uppercase tracking-wide text-[13px]" style={{ color: 'var(--brand-navy)' }}>
        {title}
      </h2>
      {link && (
        <button
          onClick={onLink}
          className="text-[11px] font-bold hover:underline uppercase tracking-wide transition-colors"
          style={{ color: 'var(--brand-orange)' }}
        >
          {link} →
        </button>
      )}
    </div>
  );
}
