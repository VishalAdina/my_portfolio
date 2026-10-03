import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useSplitReveal } from '../../lib/animations';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  /** Headline. Keep it short — it is split into masked lines. */
  title: ReactNode;
  /** Plain-text version of the title, used for the a11y label when split. */
  className?: string;
  size?: 'h1' | 'h2';
  align?: 'left' | 'right';
  aside?: ReactNode;
}

/**
 * Editorial section header: numbered mono eyebrow + oversized masked headline.
 * The mono index is the site's wayfinding device and replaces decorative art.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  className,
  size = 'h2',
  align = 'left',
  aside,
}: SectionHeadingProps) {
  const ref = useSplitReveal<HTMLHeadingElement>({ stagger: 0.09 });

  return (
    <div className={cn('relative', className)}>
      <Reveal className="flex items-center gap-4">
        <span className="label text-accent">{index}</span>
        <span className="h-px w-8 bg-line-2" aria-hidden="true" />
        <span className="label">{eyebrow}</span>
      </Reveal>

      <div
        className={cn(
          'mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between',
          align === 'right' && 'lg:flex-row-reverse',
        )}
      >
        <h2
          ref={ref}
          className={cn(
            'max-w-[22ch] font-display text-fg opacity-0',
            size === 'h1' ? 'text-h1' : 'text-h2',
          )}
        >
          {title}
        </h2>
        {aside && <div className="max-w-sm shrink-0 text-sm text-fg-2">{aside}</div>}
      </div>
    </div>
  );
}
