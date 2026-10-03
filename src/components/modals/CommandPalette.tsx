import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m } from 'motion/react';
import { PORTFOLIO_INFO, PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../types';
import { Icon, type IconName } from '../ui/Icon';
import { lockScroll, scrollToSection } from '../../lib/scroll';
import { cn } from '../../lib/cn';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenResume: () => void;
}

interface Command {
  id: string;
  title: string;
  group: 'Navigate' | 'Projects' | 'Actions';
  hint: string;
  icon: IconName;
  run: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = PORTFOLIO_INFO.sections.map((section) => ({
      id: `nav-${section.id}`,
      title: `Go to ${section.label}`,
      group: 'Navigate',
      hint: section.index,
      icon: 'arrowRight',
      run: () => {
        onClose();
        window.setTimeout(() => scrollToSection(section.id), 120);
      },
    }));

    const projects: Command[] = PROJECTS.map((project) => ({
      id: `project-${project.id}`,
      title: project.title,
      group: 'Projects',
      hint: project.category.toUpperCase(),
      icon: 'layers',
      run: () => {
        onClose();
        onSelectProject(project);
      },
    }));

    const actions: Command[] = [
      {
        id: 'action-resume',
        title: 'Open résumé',
        group: 'Actions',
        hint: 'CV',
        icon: 'file',
        run: () => {
          onClose();
          onOpenResume();
        },
      },
      {
        id: 'action-email',
        title: `Copy email — ${PORTFOLIO_INFO.email}`,
        group: 'Actions',
        hint: 'COPY',
        icon: 'copy',
        run: () => {
          navigator.clipboard?.writeText(PORTFOLIO_INFO.email);
          onClose();
        },
      },
      {
        id: 'action-github',
        title: 'Open GitHub profile',
        group: 'Actions',
        hint: 'EXT',
        icon: 'github',
        run: () => {
          window.open(PORTFOLIO_INFO.github, '_blank', 'noopener');
          onClose();
        },
      },
      {
        id: 'action-linkedin',
        title: 'Open LinkedIn profile',
        group: 'Actions',
        hint: 'EXT',
        icon: 'linkedin',
        run: () => {
          window.open(PORTFOLIO_INFO.linkedin, '_blank', 'noopener');
          onClose();
        },
      },
    ];

    return [...nav, ...projects, ...actions];
  }, [onClose, onSelectProject, onOpenResume]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.title} ${c.group} ${c.hint}`.toLowerCase().includes(q));
  }, [commands, query]);

  // Reset on open
  useEffect(() => {
    if (!isOpen) return;
    setQuery('');
    setCursor(0);
    lockScroll(true);
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(raf);
      lockScroll(false);
    };
  }, [isOpen]);

  useEffect(() => setCursor(0), [query]);

  // Keep the active row in view
  useEffect(() => {
    listRef.current
      ?.querySelectorAll('li')
      [cursor]?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      results[cursor]?.run();
    }
  };

  if (typeof document === 'undefined') return null;

  let lastGroup = '';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed inset-0 z-[68] flex items-start justify-center px-3 pt-[12vh] sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            aria-label="Close command palette"
            tabIndex={-1}
            onClick={onClose}
            className="fixed inset-0 cursor-default bg-black/80 backdrop-blur-md"
          />

          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ y: -18, opacity: 0, scale: 0.99 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onKeyDown}
            className="relative w-full max-w-xl border border-line-2 bg-surface shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Icon name="search" size={16} className="shrink-0 text-fg-3" />
              <label htmlFor="command-input" className="sr-only">
                Search commands
              </label>
              <input
                id="command-input"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, projects or actions…"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-autocomplete="list"
                aria-activedescendant={results[cursor]?.id}
                className="w-full bg-transparent py-4 font-mono text-[0.8125rem] text-fg placeholder:text-fg-3 focus:outline-none"
              />
              <kbd className="shrink-0 border border-line-2 px-1.5 py-0.5 font-mono text-[0.5625rem] text-fg-3">
                ESC
              </kbd>
            </div>

            <ul
              id="command-list"
              ref={listRef}
              role="listbox"
              aria-label="Commands"
              className="max-h-[52vh] overflow-y-auto py-2"
            >
              {results.map((command, i) => {
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                return (
                  <li key={command.id} id={command.id} role="option" aria-selected={i === cursor}>
                    {showGroup && (
                      <p className="label px-5 pt-4 pb-2">{command.group}</p>
                    )}
                    <button
                      type="button"
                      onMouseEnter={() => setCursor(i)}
                      onClick={command.run}
                      className={cn(
                        'flex w-full items-center gap-3.5 px-5 py-3 text-left transition-colors duration-200',
                        i === cursor ? 'bg-surface-2 text-fg' : 'text-fg-2',
                      )}
                    >
                      <Icon
                        name={command.icon}
                        size={15}
                        className={cn('shrink-0', i === cursor ? 'text-accent' : 'text-fg-3')}
                      />
                      <span className="flex-1 truncate text-[0.8125rem]">{command.title}</span>
                      <span className="shrink-0 font-mono text-[0.5625rem] tracking-[0.14em] text-fg-3 uppercase">
                        {command.hint}
                      </span>
                    </button>
                  </li>
                );
              })}

              {!results.length && (
                <li className="px-5 py-8 text-center text-sm text-fg-3">
                  No matches for “{query}”
                </li>
              )}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-5 py-3">
              <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-fg-3 uppercase">
                ↑↓ navigate · ⏎ select
              </span>
              <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-fg-3 uppercase">
                {results.length} results
              </span>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
