import { forwardRef, type ReactNode } from 'react';
import { useMagnetic } from '../../lib/useMagnetic';
import { Icon, type IconName } from './Icon';
import { cn } from '../../lib/cn';

type Variant = 'solid' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  /** Trailing icon slides on hover — the classic "go" affordance. */
  trailingIcon?: IconName;
  className?: string;
  magnetic?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  solid: 'bg-accent text-accent-ink border border-accent hover:text-accent-ink',
  outline:
    'border border-line-3 text-fg hover:border-accent hover:text-accent-ink bg-transparent',
  ghost: 'border border-transparent text-fg-2 hover:text-fg',
};

const SIZES: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.8125rem]',
  lg: 'h-14 px-7 text-sm',
};

/**
 * Button with an accent wash that wipes up from the bottom on hover.
 * The wipe lives on a pseudo-element-free inner span so it never fights the
 * magnetic transform owned by GSAP on the outer wrapper.
 */
export const MagneticButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  BaseProps & {
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
    type?: 'button' | 'submit';
    'aria-label'?: string;
  }
>(function MagneticButton(
  {
    children,
    variant = 'solid',
    size = 'md',
    icon,
    trailingIcon,
    className,
    magnetic = true,
    href,
    target,
    rel,
    type = 'button',
    onClick,
    ...rest
  },
  forwardedRef,
) {
  const magnetRef = useMagnetic<HTMLDivElement>(magnetic ? 0.28 : 0);
  const hasWipe = variant !== 'ghost';

  const inner = (
    <>
      {hasWipe && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100',
            variant === 'solid' ? 'bg-fg' : 'bg-accent',
          )}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5 whitespace-nowrap">
        {icon && <Icon name={icon} size={16} />}
        <span>{children}</span>
        {trailingIcon && (
          <Icon
            name={trailingIcon}
            size={16}
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          />
        )}
      </span>
    </>
  );

  const classes = cn(
    'group relative inline-flex items-center justify-center overflow-hidden font-mono uppercase tracking-[0.14em] transition-colors duration-500',
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  return (
    <div ref={magnetRef} className="inline-flex will-change-transform">
      {href ? (
        <a
          ref={forwardedRef as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={classes}
          data-cursor="link"
          {...rest}
        >
          {inner}
        </a>
      ) : (
        <button
          ref={forwardedRef as React.Ref<HTMLButtonElement>}
          type={type}
          onClick={onClick}
          className={classes}
          data-cursor="link"
          {...rest}
        >
          {inner}
        </button>
      )}
    </div>
  );
});
