import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { PORTFOLIO_INFO } from '../../data/portfolioData';
import { useActiveSection, resolveActiveId } from '../../lib/useActiveSection';
import { scrollToSection, scrollToTop, lockScroll } from '../../lib/scroll';
import { media } from '../../lib/gsap';
import { MagneticButton } from '../ui/MagneticButton';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/cn';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenResume, onOpenCommandPalette }: NavbarProps) {
  const sections = PORTFOLIO_INFO.sections;
  const ids = useMemo(
    () => sections.flatMap((s) => [s.id, ...(s.aliases ?? [])]),
    [sections],
  );

  const rawActive = useActiveSection(ids);
  const active = resolveActiveId(rawActive, sections);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Condense the bar once the hero is behind us
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ⌘K / Ctrl+K anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenCommandPalette();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOpenCommandPalette]);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Let the overlay start closing before the scroll kicks in
    window.setTimeout(() => scrollToSection(id), media.reduced() ? 0 : 120);
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500',
          scrolled
            ? 'border-b border-line bg-bg/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div
          className={cn(
            'shell flex items-center justify-between transition-[height] duration-500',
            scrolled ? 'h-16' : 'h-20',
          )}
        >
          {/* Identity */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="group flex items-center gap-3"
            aria-label={`${PORTFOLIO_INFO.name} — back to top`}
            data-cursor="link"
          >
            <span className="relative grid size-8 place-items-center border border-line-2 transition-colors duration-500 group-hover:border-accent">
              <span className="font-mono text-[0.625rem] tracking-widest text-fg">AV</span>
              <span className="absolute -right-px -bottom-px size-1.5 bg-accent" />
            </span>
            <span className="hidden font-mono text-[0.6875rem] tracking-[0.18em] text-fg-2 uppercase transition-colors duration-300 group-hover:text-fg sm:block">
              {PORTFOLIO_INFO.name}
            </span>
          </a>

          {/* Primary navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {sections.map((section) => {
                const isActive = active === section.id;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(section.id);
                      }}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'group relative flex items-baseline gap-1.5 px-3 py-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors duration-300',
                        isActive ? 'text-fg' : 'text-fg-3 hover:text-fg-2',
                      )}
                    >
                      <span className="text-[0.5625rem] text-accent/70">{section.index}</span>
                      <span>{section.label}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-2 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                          isActive ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Utilities */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="hidden size-9 place-items-center border border-line-2 text-fg-2 transition-colors duration-300 hover:border-line-3 hover:text-fg sm:grid"
              aria-label="Search — open command palette"
              data-cursor="link"
            >
              <Icon name="search" size={15} />
            </button>

            <button
              type="button"
              onClick={onOpenResume}
              className="hidden font-mono text-[0.6875rem] tracking-[0.14em] text-fg-3 uppercase transition-colors duration-300 hover:text-accent md:block"
              data-cursor="link"
            >
              Resume
            </button>

            <div className="hidden lg:block">
              <MagneticButton size="md" trailingIcon="arrowUpRight" onClick={() => go('contact')}>
                Let&apos;s talk
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center border border-line-2 text-fg lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Icon name="menu" size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-[60] bg-bg lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-full flex-col px-[clamp(1.25rem,5vw,4.5rem)] py-6">
              <div className="flex items-center justify-between">
                <span className="label">{PORTFOLIO_INFO.name}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center border border-line-2 text-fg"
                  aria-label="Close menu"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-10 flex-1 overflow-y-auto">
                <ul>
                  {sections.map((section, i) => (
                    <m.li
                      key={section.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.045, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-line"
                    >
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          go(section.id);
                        }}
                        className="flex items-baseline justify-between py-4"
                      >
                        <span className="font-display text-3xl text-fg">{section.label}</span>
                        <span className="label text-accent">{section.index}</span>
                      </a>
                    </m.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 flex flex-col gap-3">
                <MagneticButton
                  className="w-full"
                  trailingIcon="arrowUpRight"
                  onClick={() => {
                    setOpen(false);
                    onOpenResume();
                  }}
                >
                  View Résumé
                </MagneticButton>
                <a
                  href={`mailto:${PORTFOLIO_INFO.email}`}
                  className="label py-2 text-center text-fg-2"
                >
                  {PORTFOLIO_INFO.email}
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
