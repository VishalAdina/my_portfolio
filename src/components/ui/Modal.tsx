import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'motion/react';
import { Icon } from './Icon';
import { lockScroll } from '../../lib/scroll';
import { cn } from '../../lib/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
  /** Header shown in the modal chrome. */
  eyebrow?: string;
  title?: ReactNode;
  wide?: boolean;
  /** Marks the panel as the print target (see the print stylesheet). */
  printable?: boolean;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog shell used by every modal on the site.
 *
 * Handles: portal rendering, scroll lock (via Lenis, not just overflow),
 * Escape to close, backdrop click, focus trap, focus restore, and
 * aria-modal semantics. Enter/exit is Motion's job.
 */
export function Modal({
  isOpen,
  onClose,
  label,
  children,
  eyebrow,
  title,
  wide,
  printable,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    restoreRef.current = document.activeElement as HTMLElement;
    lockScroll(true);
    document.addEventListener('keydown', handleKeyDown);

    // Move focus into the dialog once it has painted
    const raf = requestAnimationFrame(() => {
      const target =
        panelRef.current?.querySelector<HTMLElement>('[data-autofocus]') ??
        panelRef.current?.querySelector<HTMLElement>(FOCUSABLE) ??
        panelRef.current;
      target?.focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', handleKeyDown);
      lockScroll(false);
      restoreRef.current?.focus({ preventScroll: true });
    };
  }, [isOpen, handleKeyDown]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed inset-0 z-[65] flex items-start justify-center overflow-y-auto overscroll-contain p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="fixed inset-0 cursor-default bg-black/80 backdrop-blur-md"
            tabIndex={-1}
          />

          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            data-print-area={printable ? '' : undefined}
            initial={{ y: 28, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative my-auto w-full border border-line-2 bg-surface outline-none print:border-0',
              'shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]',
              wide ? 'max-w-5xl' : 'max-w-3xl',
            )}
          >
            {/* Chrome */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-surface/95 px-5 py-4 backdrop-blur-xl sm:px-7">
              <div className="min-w-0">
                {eyebrow && <div className="label text-accent">{eyebrow}</div>}
                {title && (
                  <h3 className="mt-1.5 truncate font-display text-base font-medium text-fg sm:text-lg">
                    {title}
                  </h3>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                data-cursor="link"
                className="grid size-9 shrink-0 place-items-center border border-line-2 text-fg-2 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-ink"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="px-5 py-6 sm:px-7 sm:py-8">{children}</div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
