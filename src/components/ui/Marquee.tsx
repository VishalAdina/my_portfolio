import { cn } from '../../lib/cn';

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
}

/**
 * CSS-driven ticker. Duplicated track is aria-hidden so assistive tech reads
 * the list exactly once; pauses on hover; frozen under reduced-motion.
 */
export function Marquee({ items, className, duration = 42, reverse }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn('group edge-fade-x relative overflow-hidden py-5', className)}
      aria-label={items.join(', ')}
    >
      <div
        className="animate-marquee flex w-max items-center gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-[0.8125rem] tracking-[0.12em] whitespace-nowrap text-fg-3 uppercase transition-colors duration-300 hover:text-accent"
          >
            {item}
            <span aria-hidden="true" className="size-1 rounded-full bg-accent/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
