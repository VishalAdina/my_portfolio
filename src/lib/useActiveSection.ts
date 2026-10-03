import { useEffect, useState } from 'react';
import { ScrollTrigger } from './gsap';

/**
 * Scroll-spy built on ScrollTrigger so it stays in lockstep with Lenis and
 * never re-measures the document on every frame.
 */
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const triggers = sectionIds
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActive(id);
          },
        });
      })
      .filter(Boolean) as ScrollTrigger[];

    return () => triggers.forEach((t) => t.kill());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join('|')]);

  return active;
}

/** Normalises an active section id onto its owning nav entry. */
export function resolveActiveId(
  active: string,
  sections: { id: string; aliases?: string[] }[],
): string {
  const match = sections.find((s) => s.id === active || s.aliases?.includes(active));
  return match?.id ?? active;
}
