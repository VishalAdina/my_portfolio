import { useState } from 'react';
import { PORTFOLIO_INFO } from '../../data/portfolioData';
import { cn } from '../../lib/cn';

interface PortraitProps {
  className?: string;
}

/**
 * Portrait with a graceful resolution cascade.
 *
 * Tries each configured source in order (a local `/portrait.jpg` wins, so the
 * owner can drop a file into /public and be done), and if none resolve it
 * renders a designed typographic monogram rather than a broken image.
 *
 * The frame — hairline border, corner ticks, caption rail — carries the
 * composition on its own, so the block reads as intentional with or without
 * a photograph.
 */
export function Portrait({ className }: PortraitProps) {
  const sources = PORTFOLIO_INFO.portraitSources;
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const exhausted = index >= sources.length;

  return (
    <div className={cn('relative', className)}>
      <div className="group relative aspect-4/5 w-full overflow-hidden border border-line-2 bg-surface">
        {/* Ambient wash behind the subject */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(212,255,79,0.09),transparent_60%)]"
        />

        {!exhausted ? (
          <img
            key={sources[index]}
            src={sources[index]}
            alt={`${PORTFOLIO_INFO.name} — ${PORTFOLIO_INFO.role}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => {
              setLoaded(false);
              setIndex((i) => i + 1);
            }}
            className={cn(
              'absolute inset-0 size-full object-cover object-[50%_18%] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
              'grayscale-[0.55] contrast-[1.05] group-hover:scale-[1.04] group-hover:grayscale-0',
              loaded ? 'opacity-100' : 'opacity-0',
            )}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <span
              className="font-display text-[clamp(4.5rem,11vw,7rem)] leading-[0.8] font-semibold text-fg"
              aria-hidden="true"
            >
              AV
            </span>
            <div>
              <p className="font-display text-lg text-fg">{PORTFOLIO_INFO.name}</p>
              <p className="label mt-1.5">{PORTFOLIO_INFO.role}</p>
            </div>
          </div>
        )}

        {/* Corner ticks — technical framing detail */}
        <span aria-hidden="true" className="absolute top-3 left-3 size-3 border-t border-l border-accent" />
        <span aria-hidden="true" className="absolute top-3 right-3 size-3 border-t border-r border-accent" />
        <span aria-hidden="true" className="absolute bottom-3 left-3 size-3 border-b border-l border-accent" />
        <span aria-hidden="true" className="absolute right-3 bottom-3 size-3 border-r border-b border-accent" />

        {/* Bottom scrim keeps the caption legible over any photo */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/90 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 py-4">
          <span className="label text-fg-2">{PORTFOLIO_INFO.education}</span>
          <span className="flex items-center gap-2 text-right">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-accent" />
            <span className="label text-fg">{PORTFOLIO_INFO.availability}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
