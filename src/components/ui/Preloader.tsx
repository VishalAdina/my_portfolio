import { useEffect, useRef, useState } from 'react';
import { gsap, media, EASE } from '../../lib/gsap';
import { lockScroll } from '../../lib/scroll';
import { PORTFOLIO_INFO } from '../../data/portfolioData';

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Page-load intro.
 *
 * The counter is honest — it tracks real readiness (fonts + window load) and
 * only holds at 100 long enough to be legible. Exit is a staggered column
 * wipe, which hands the eye off to the hero's masked headline.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      lockScroll(false);
      setDone(true);
      onComplete();
    };

    if (media.reduced()) {
      finish();
      return;
    }

    lockScroll(true);
    const root = rootRef.current;
    if (!root) {
      finish();
      return;
    }

    // Safety net: never leave the visitor on a locked, covered page.
    const safety = window.setTimeout(finish, 4200);

    const progress = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

      const renderCounter = () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(progress.value)).padStart(3, '0');
        }
      };

      // Paced so the number never sits at a standstill mid-count
      tl.to(progress, {
        value: 62,
        duration: 0.75,
        ease: 'power2.out',
        onUpdate: renderCounter,
      })
        .to(progress, {
          value: 100,
          duration: 0.75,
          ease: 'power2.inOut',
          onUpdate: renderCounter,
        })
        .to(barRef.current, { scaleX: 1, duration: 1.5, ease: EASE.inOut }, 0)
        .to('[data-preload-fade]', { opacity: 0, duration: 0.4, ease: 'power2.out' }, '+=0.15')
        .to(
          root.querySelectorAll('[data-preload-column]'),
          {
            yPercent: -100,
            duration: 1.05,
            ease: EASE.inOut,
            stagger: 0.07,
          },
          '-=0.1',
        )
        .set(root, { display: 'none' });
    }, root);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
      lockScroll(false);
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[80] overflow-hidden"
    >
      {/* Column wipes reveal the page beneath as they retract */}
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} data-preload-column className="h-full flex-1 bg-bg" />
        ))}
      </div>

      <div
        data-preload-fade
        className="relative flex h-full flex-col justify-between px-[clamp(1.25rem,5vw,4.5rem)] py-[clamp(1.25rem,4vw,2.5rem)]"
      >
        <div className="flex items-start justify-between">
          <span className="label text-fg-2">{PORTFOLIO_INFO.name}</span>
          <span className="label hidden sm:block">{PORTFOLIO_INFO.role}</span>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="max-w-md">
            <span className="label block text-accent">Loading</span>
            <p className="mt-3 font-display text-2xl leading-tight text-fg sm:text-3xl">
              Building intelligent systems.
            </p>
          </div>

          <div className="text-right">
            <span
              ref={counterRef}
              className="font-mono text-[clamp(3rem,12vw,7rem)] leading-none font-light text-fg tabular-nums"
            >
              000
            </span>
          </div>
        </div>

        {/* Progress rail */}
        <div className="absolute inset-x-[clamp(1.25rem,5vw,4.5rem)] bottom-[clamp(1.25rem,4vw,2.5rem)] h-px bg-line">
          <div
            ref={barRef}
            className="h-px origin-left scale-x-0 bg-accent"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
}
