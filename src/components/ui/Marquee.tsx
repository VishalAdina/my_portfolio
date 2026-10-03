import { cn } from '../../lib/cn';

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
}

/**
 * CSS-driven ticker.
 *
 * The track holds two identical copies and translates by exactly -50%, so the
 * loop point is invisible (each copy carries its own trailing gap — using a
 * single flat list would mismatch by half a gap and visibly jump).
 *
 * The whole ticker is marked aria-hidden: it is pure decoration and every item
 * it shows is also available as real, readable content in the Skills section —
 * so screen-reader users hear the data once, not three times.
 *
 * Pauses on hover; frozen entirely under reduced motion.
 */
export function Marquee({ items, className, duration = 42, reverse }: MarqueeProps) {
  const copy = (key: string) => (
    <div
      key={key}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center gap-10 font-mono text-[0.8125rem] tracking-[0.12em] whitespace-nowrap text-fg-3 uppercase transition-colors duration-300 hover:text-accent"
        >
          {item}
          <span className="size-1 rounded-full bg-accent/50" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn('group edge-fade-x relative overflow-hidden py-5', className)}
      aria-hidden="true"
    >
      <div
        className="animate-marquee flex w-max group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {copy('a')}
        {copy('b')}
      </div>
    </div>
  );
}
