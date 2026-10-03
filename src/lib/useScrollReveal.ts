import { useEffect } from 'react';
import { gsap, ScrollTrigger, media, EASE } from './gsap';

/**
 * One delegating ScrollTrigger for every `[data-reveal]` element on the page.
 *
 * A single batched trigger is far cheaper than mounting a trigger per
 * component, and it guarantees an identical reveal rhythm everywhere.
 *
 * Elements are pre-hidden by CSS (`html.motion-ready [data-reveal]:not([data-revealed])`)
 * and that class is only applied when JS is running and motion is allowed — so
 * with JS disabled or reduced-motion on, content is simply visible.
 */

let triggers: ScrollTrigger[] = [];

/** Reveal anything already inside the viewport, then batch the rest. */
function revealVisibleNow() {
  const vh = window.innerHeight;
  const inView = gsap.utils
    .toArray<HTMLElement>('[data-reveal]:not([data-revealed])')
    .filter((el) => el.getBoundingClientRect().top < vh * 0.9);

  if (!inView.length) return;
  inView.forEach((el) => el.setAttribute('data-revealed', 'true'));
  gsap.fromTo(
    inView,
    { y: 32, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.95, ease: EASE.out, stagger: 0.075, overwrite: true },
  );
}

function build() {
  triggers.forEach((t) => t.kill());
  revealVisibleNow();
  triggers = ScrollTrigger.batch('[data-reveal]:not([data-revealed])', {
    start: 'top 88%',
    once: true,
    batchMax: 6,
    onEnter: (batch) => {
      batch.forEach((el) => el.setAttribute('data-revealed', 'true'));
      gsap.fromTo(
        batch,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: EASE.out,
          stagger: 0.075,
          overwrite: true,
        },
      );
    },
  });
}

/** Call after mounting new `[data-reveal]` nodes (e.g. a filtered list). */
export function refreshReveals() {
  if (media.reduced()) return;
  build();
}

export function useScrollReveal() {
  useEffect(() => {
    if (media.reduced()) return;
    build();
    return () => {
      triggers.forEach((t) => t.kill());
      triggers = [];
    };
  }, []);
}

/**
 * Parallax for `[data-parallax]` elements.
 * `data-parallax="-12"` → travels 12% of its own height across the viewport.
 */
export function useParallax() {
  useEffect(() => {
    if (media.reduced()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const amount = Number(el.dataset.parallax ?? -10);
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('[data-parallax-scope]') ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);
}
