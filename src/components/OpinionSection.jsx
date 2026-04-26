import { opinionPieces } from '../data/mockData';
import SectionLabel from './SectionLabel';

export default function OpinionSection() {
  return (
    <div>
      <SectionLabel title="Opinion & Analysis" subtitle="Expert perspectives from DTMI's research team" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {opinionPieces.map((piece) => (
          <div
            key={piece.id}
            className="cursor-pointer card-hover group flex flex-col bg-white border rounded-sm overflow-hidden"
            style={{ borderColor: 'var(--brand-border)' }}
          >
            {/* Colored top accent bar */}
            <div className="h-1 w-full" style={{ background: 'var(--brand-orange)' }} />

            <div className="p-4 flex flex-col gap-3 flex-1">
              {/* Label */}
              <span className="inline-block text-[9px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm w-fit" style={{ background: 'var(--brand-orange)', color: 'white' }}>
                {piece.label}
              </span>

              {/* Pull-quote style headline */}
              <h3 className="text-[13px] font-bold leading-snug group-hover:opacity-70 transition-opacity flex-1" style={{ color: 'var(--brand-navy)' }}>
                <span className="text-[22px] font-black leading-none mr-1 align-top" style={{ color: 'var(--brand-orange)', lineHeight: 1 }}>"</span>{piece.headline}
              </h3>

              {/* Author row */}
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--brand-border)' }}>
                <img
                  src={piece.image}
                  alt={piece.author}
                  className="w-9 h-9 rounded-full object-cover border-2 shrink-0"
                  style={{ borderColor: 'var(--brand-orange)' }}
                  loading="lazy"
                />
                <div>
                  <p className="text-[12px] font-bold leading-none" style={{ color: 'var(--brand-navy)' }}>{piece.author}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--brand-muted)' }}>{piece.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
