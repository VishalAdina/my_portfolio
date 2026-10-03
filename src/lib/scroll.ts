import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, media } from './gsap';

/**
 * Lenis owns the scroll, GSAP owns the clock.
 *
 * Lenis is driven by `gsap.ticker` (rather than its own rAF loop) so scroll
 * position and ScrollTrigger updates happen inside the same frame — this is
 * what keeps pinned/parallax sections from jittering.
 */

let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/** Smoothly scroll to a section. Falls back to native behaviour everywhere. */
export function scrollToSection(id: string, offset = -72) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.25 });
    return;
  }

  const y = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: y, behavior: media.reduced() ? 'auto' : 'smooth' });
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.1 });
  else window.scrollTo({ top: 0, behavior: media.reduced() ? 'auto' : 'smooth' });
}

/** Freeze the page (used by modals / preloader). */
export function lockScroll(locked: boolean) {
  if (lenis) {
    locked ? lenis.stop() : lenis.start();
  }
  document.documentElement.classList.toggle('lenis-stopped', locked);
}

export function useSmoothScroll() {
  useEffect(() => {
    if (media.reduced()) return;

    lenis = new Lenis({
      lerp: 0.095,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Fonts and images landing late can shift trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, []);
}
