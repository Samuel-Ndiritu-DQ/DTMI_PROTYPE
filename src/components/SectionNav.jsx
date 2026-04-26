/**
 * SectionNav - a secondary nav bar shown on 6xD, Sectors, and Technology pages.
 * Provides quick links between related sections and always shows a Glossary link.
 */
export default function SectionNav({ activeKey, onNavigate }) {
  const links = [
    { key: '6xD Framework', label: '6xD Framework' },
    { key: 'Sectors',       label: 'Sectors' },
    { key: 'Technology',    label: 'Technology' },
    { key: 'Glossary',      label: 'Glossary of Terms' },
  ];

  return (
    <div className="border-b" style={{ background: 'white', borderColor: 'var(--brand-border)' }}>
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-center overflow-x-auto gap-0">
          {links.map(link => {
            const isActive = activeKey === link.key;
            return (
              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                className="px-4 py-3 text-[12px] font-semibold whitespace-nowrap border-b-2 transition-all shrink-0"
                style={{
                  borderColor: isActive ? 'var(--brand-orange)' : 'transparent',
                  color: isActive ? 'var(--brand-navy)' : 'var(--brand-muted)',
                }}
              >
                {link.label}
                {link.key === 'Glossary' && (
                  <span
                    className="ml-1.5 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-sm"
                    style={{ background: '#fff7ed', color: 'var(--brand-orange)' }}
                  >
                    A–Z
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
