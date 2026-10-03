import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Hairline rule at the top of the section — the site's primary divider. */
  rule?: boolean;
  /** Section number rendered in the outer margin on wide screens. */
  marker?: string;
  'aria-label'?: string;
}

/**
 * Section shell. Owns vertical rhythm and the 12-column gutters so no
 * individual section has to re-invent spacing.
 */
export function Section({
  id,
  children,
  className,
  rule = true,
  marker,
  'aria-label': ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('relative scroll-mt-24', className)}
    >
      {rule && <hr className="rule shell" />}

      <div className="shell relative py-[clamp(4.5rem,10vw,8.5rem)]">
        {marker && (
          <span
            aria-hidden="true"
            className="label pointer-events-none absolute top-[clamp(4.5rem,10vw,8.5rem)] left-[max(0px,calc((100%-90rem)/2+clamp(1.25rem,5vw,4.5rem)))] hidden -translate-x-full pr-6 2xl:block"
          >
            {marker}
          </span>
        )}
        {children}
      </div>
    </section>
  );
}
