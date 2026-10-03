import { useEffect, useRef } from 'react';
import { gsap, media } from './gsap';

/**
 * Magnetic attraction: the element drifts toward the pointer while it is
 * within a padded radius, then springs home. Pointer-fine devices only, and
 * silently inert under prefers-reduced-motion.
 *
 * Apply to a wrapper — never to the same node that handles CSS hover
 * transforms, or the two will fight over `transform`.
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(strength = 0.35, radius = 90) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!media.finePointer() || media.reduced()) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });

    let active = false;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const within =
        Math.abs(dx) < rect.width / 2 + radius && Math.abs(dy) < rect.height / 2 + radius;

      if (within) {
        active = true;
        xTo(dx * strength);
        yTo(dy * strength);
      } else if (active) {
        active = false;
        xTo(0);
        yTo(0);
      }
    };

    const reset = () => {
      active = false;
      xTo(0);
      yTo(0);
    };

    // Listen on the window so the element keeps tracking while the pointer is
    // still approaching, and always resets when it exits the viewport.
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', reset, { passive: true });
    el.addEventListener('pointerleave', reset);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', reset);
      el.removeEventListener('pointerleave', reset);
      gsap.killTweensOf(el);
    };
  }, [strength, radius]);

  return ref;
}
