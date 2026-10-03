import { useEffect, useRef, useState } from 'react';
import { gsap, media } from '../../lib/gsap';

type CursorState = 'default' | 'link' | 'view' | 'text' | 'hide';

/**
 * Two-layer custom cursor.
 *
 * The dot tracks the pointer almost exactly; the ring lags behind it, which is
 * what makes the motion feel weighted. Everything is written straight to the
 * DOM through `gsap.quickTo` so React never re-renders on pointer movement.
 *
 * Enabled only for fine pointers with motion allowed. Over form fields the
 * native caret is restored, because fighting a user's text cursor is hostile.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!media.finePointer() || media.reduced()) return;
    setEnabled(true);
    document.documentElement.classList.add('cursor-custom');
    return () => document.documentElement.classList.remove('cursor-custom');
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Centre the layers with xPercent/yPercent so GSAP's x/y stay free for
    // pointer tracking (an inline `translate()` would be overwritten).
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.14, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.14, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

    let shown = false;
    const show = (visible: boolean) => {
      if (shown === visible) return;
      shown = visible;
      gsap.to([dot, ring], { autoAlpha: visible ? 1 : 0, duration: 0.25, overwrite: true });
    };

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      if (!shown) show(true);

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor], a, button, input, textarea, select, [role="button"]',
      );

      if (!target) {
        setState('default');
        return;
      }

      const tag = target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        setState('text');
        return;
      }

      const explicit = target.dataset.cursor as CursorState | undefined;
      if (explicit) {
        setState(explicit);
        setLabel(target.dataset.cursorLabel ?? '');
        return;
      }

      setState('link');
    };

    const onDown = () => gsap.to(ring, { scale: 0.82, duration: 0.2, ease: 'power2.out' });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power3.out' });
    const onLeave = () => show(false);
    const onEnter = () => show(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  const isView = state === 'view';
  const isText = state === 'text';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] hidden lg:block">
      {/* Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 opacity-0 will-change-transform"
      >
        <div
          className="rounded-full bg-accent transition-[width,height,opacity] duration-300"
          style={{
            width: isView ? 0 : 5,
            height: isView ? 0 : 5,
            opacity: isText ? 0 : 1,
          }}
        />
      </div>

      {/* Ring / label */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 opacity-0 will-change-transform"
      >
        <div
          className="flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color,color] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: isView ? 92 : isText ? 2 : state === 'link' ? 46 : 30,
            height: isView ? 92 : isText ? 26 : state === 'link' ? 46 : 30,
            borderRadius: isText ? 2 : 9999,
            backgroundColor: isView ? 'var(--color-accent)' : 'transparent',
            borderColor: isView
              ? 'transparent'
              : state === 'link'
                ? 'var(--color-accent)'
                : 'rgba(255,255,255,0.35)',
          }}
        >
          <span
            className="font-mono text-[10px] tracking-[0.16em] text-accent-ink uppercase transition-opacity duration-200"
            style={{ opacity: isView && label ? 1 : 0 }}
          >
            {isView ? label : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
