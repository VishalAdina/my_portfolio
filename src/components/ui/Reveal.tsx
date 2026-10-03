import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplied into a small delay by the batch trigger. */
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: ElementType;
}

/**
 * Marks a block for the global scroll-reveal pass (see `useScrollReveal`).
 * Renders nothing extra to the DOM — just the data attribute the batched
 * ScrollTrigger looks for, plus an optional CSS-only stagger.
 */
export function Reveal({ children, className, delay, as: Tag = 'div' }: RevealProps) {
  return (
    <Tag
      data-reveal=""
      className={cn(className)}
      style={delay ? { transitionDelay: `${(delay - 1) * 80}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
