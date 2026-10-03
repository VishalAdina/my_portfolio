import type { ReactNode } from 'react';
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';

/**
 * Ships only the Motion features this site actually uses.
 *
 * Importing the eager `motion` component pulls every feature — drag, pan,
 * layout projection — into the initial bundle. This site only needs
 * animations, variants, exit transitions and hover/tap gestures, which is
 * exactly `domAnimation`: 30 kB gzipped instead of 43 kB.
 *
 * `strict` throws in development if a `motion.*` component is ever introduced
 * again, which would silently re-add the full feature set.
 *
 * `MotionConfig reducedMotion="user"` makes Motion itself stand down when the
 * visitor has asked for reduced motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
