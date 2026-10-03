import { cn } from '../../lib/cn';

interface TagProps {
  children: string;
  className?: string;
  accent?: boolean;
}

/** Mono capsule used for tech tags and meta labels. */
export function Tag({ children, className, accent }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.1em] uppercase transition-colors duration-300',
        accent
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-line-2 text-fg-3 hover:border-line-3 hover:text-fg-2',
        className,
      )}
    >
      {children}
    </span>
  );
}
