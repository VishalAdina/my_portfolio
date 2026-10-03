/**
 * Single GSAP entry point.
 * Registers plugins exactly once and exposes the shared easing vocabulary.
 *
 * Split of duties across the codebase:
 *   GSAP + ScrollTrigger → anything driven by scroll position
 *   Motion (motion/react) → component enter/exit state (modals, drawers)
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Guarded so the module can be imported in a non-browser environment
// (SSR builds, tests) without touching `document`.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Long, expo-style glides read as "expensive" motion. Nothing bounces.
export const EASE = {
  out: 'expo.out',
  inOut: 'expo.inOut',
  soft: 'power3.out',
  quick: 'power2.out',
} as const;

export const DUR = {
  fast: 0.45,
  base: 0.8,
  slow: 1.2,
  reveal: 1.1,
} as const;

/** Matches media queries without leaking GSAP concerns into components. */
export const MQ = {
  reduced: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
  desktop: '(min-width: 768px)',
  tablet: '(min-width: 1024px)',
} as const;

export const media = {
  reduced: () => typeof window !== 'undefined' && window.matchMedia(MQ.reduced).matches,
  finePointer: () => typeof window !== 'undefined' && window.matchMedia(MQ.finePointer).matches,
  desktop: () => typeof window !== 'undefined' && window.matchMedia(MQ.desktop).matches,
  tablet: () => typeof window !== 'undefined' && window.matchMedia(MQ.tablet).matches,
};

export { gsap, ScrollTrigger };
