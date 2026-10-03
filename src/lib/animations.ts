import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, media, EASE, DUR } from './gsap';
import { splitLines } from './splitText';

/** SSR-safe layout effect. */
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Runs a GSAP animation inside a scoped context and reverts it on unmount.
 * Every component that touches GSAP uses this — no leaked tweens or triggers.
 */
export function useGsap(
  setup: (ctx: { self: HTMLElement }) => void,
  deps: unknown[] = [],
  scopeRef?: React.RefObject<HTMLElement | null>,
) {
  const internalRef = useRef<HTMLElement>(null);
  const scope = scopeRef ?? internalRef;

  useIsoLayoutEffect(() => {
    const self = scope.current;
    if (!self) return;
    const ctx = gsap.context(() => setup({ self }), self);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}

/**
 * Masked line-by-line reveal for headlines.
 * Waits for webfonts so line breaks are measured against final metrics,
 * and re-splits on resize (debounced).
 */
export function useSplitReveal<T extends HTMLElement = HTMLHeadingElement>(options?: {
  delay?: number;
  stagger?: number;
  /** Animate as soon as mounted instead of on scroll (hero). */
  immediate?: boolean;
  start?: string;
}) {
  const ref = useRef<T>(null);
  const { delay = 0, stagger = 0.085, immediate = false, start = 'top 88%' } = options ?? {};

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (media.reduced()) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    let split = splitLines(el);
    let tween: gsap.core.Tween | null = null;

    const build = () => {
      el.style.opacity = '1';
      // Attaching ScrollTrigger to the tween (rather than creating a bare
      // trigger) lets GSAP resolve the "already scrolled past" case for us.
      tween = gsap.fromTo(split.lines, { yPercent: 118, opacity: 0 }, {
        yPercent: 0,
        opacity: 1,
        duration: DUR.reveal,
        ease: EASE.out,
        stagger,
        delay,
        ...(immediate
          ? {}
          : { scrollTrigger: { trigger: el, start, once: true } }),
      });
    };

    const ready = document.fonts?.ready ?? Promise.resolve();
    let cancelled = false;
    ready.then(() => {
      if (cancelled) return;
      build();
    });

    // Re-split when the container width changes materially
    let lastWidth = el.offsetWidth;
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (Math.abs(el.offsetWidth - lastWidth) < 24) return;
        lastWidth = el.offsetWidth;
        tween?.kill();
        split.revert();
        split = splitLines(el);
        build();
        tween?.progress(1);
        ScrollTrigger.refresh();
      });
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      tween?.kill();
      split.revert();
    };
  }, [delay, stagger, immediate, start]);

  return ref;
}

/** Generic enter/exit presence for one-off elements. */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(onEnter: () => void) {
  const ref = useRef<T>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || media.reduced()) {
      onEnter();
      return;
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter });
    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

/** Reactive media queries for components that change markup (not just styles). */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');
export const useHasFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
