import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { TECH_CATEGORIES, TECH_STACK, TECH_NOTES } from '../../data/portfolioData';
import type { TechCategoryId } from '../../types';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { cn } from '../../lib/cn';

type Filter = 'all' | TechCategoryId;

const ALL: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  ...TECH_CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.label })),
];

export function SkillsSection() {
  const [filter, setFilter] = useState<Filter>('all');
  const [inspected, setInspected] = useState<string>('LangGraph');

  const visibleCategories = useMemo(
    () => (filter === 'all' ? TECH_CATEGORIES : TECH_CATEGORIES.filter((c) => c.id === filter)),
    [filter],
  );

  const activeNote = TECH_NOTES[inspected];

  return (
    <Section id="tech-stack" marker="04" aria-label="Skills and technology stack">
      <SectionHeading
        index="04"
        eyebrow="Capabilities"
        title={
          <>
            The stack I <span className="text-accent">reach for.</span>
          </>
        }
        aside={
          <p>
            Grouped by what each tool is genuinely for — from language fundamentals to evaluation
            and observability for AI systems.
          </p>
        }
      />

      {/* ── Filter ──────────────────────────────────────────────────── */}
      <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap items-center gap-2">
        {ALL.map((item) => {
          const isActive = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={isActive}
              data-cursor="link"
              className={cn(
                'relative border px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors duration-300',
                isActive
                  ? 'border-accent text-accent-ink'
                  : 'border-line-2 text-fg-3 hover:border-line-3 hover:text-fg-2',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
                )}
              />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
        </div>

        <span className="flex items-center gap-2.5">
          <span className="size-1.5 bg-accent" />
          <span className="label">Core competency</span>
        </span>
      </Reveal>

      {/* ── Readout ─────────────────────────────────────────────────── */}
      <div className="mt-8 flex min-h-[5.5rem] items-center gap-5 border-y border-line py-6">
        <span className="hidden size-9 shrink-0 place-items-center border border-line-2 sm:grid">
          <span className="animate-pulse-dot size-1.5 rounded-full bg-accent" />
        </span>
        <AnimatePresence mode="wait">
          <m.div
            key={inspected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
          >
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">
              {inspected}
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fg-2">{activeNote}</p>
          </m.div>
        </AnimatePresence>
      </div>

      {/* ── Grid ────────────────────────────────────────────────────── */}
      <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCategories.map((category, ci) => {
          const items = TECH_STACK.filter((t) => t.category === category.id);
          return (
            <Reveal key={category.id} delay={((ci % 3) + 1) as 1 | 2 | 3}>
              <div>
                <div className="flex items-baseline justify-between border-b border-line-2 pb-3">
                  <h3 className="font-display text-base text-fg">{category.label}</h3>
                  <span className="label">{String(items.length).padStart(2, '0')}</span>
                </div>
                <p className="mt-3 font-mono text-[0.625rem] tracking-[0.12em] text-fg-3 uppercase">
                  {category.caption}
                </p>

                <ul className="mt-5">
                  {items.map((tech) => {
                    const isActive = inspected === tech.name;
                    return (
                      <li key={tech.name}>
                        <button
                          type="button"
                          onMouseEnter={() => setInspected(tech.name)}
                          onFocus={() => setInspected(tech.name)}
                          onClick={() => setInspected(tech.name)}
                          data-cursor="link"
                          className="group flex w-full items-center gap-3.5 border-b border-line py-3.5 text-left transition-colors duration-300"
                        >
                          <span
                            className={cn(
                              'w-7 shrink-0 font-mono text-[0.625rem] tracking-wider transition-colors duration-300',
                              isActive ? 'text-accent' : 'text-fg-3',
                            )}
                          >
                            {tech.abbr}
                          </span>
                          <span
                            className={cn(
                              'flex-1 text-[0.8125rem] transition-all duration-500',
                              isActive
                                ? 'translate-x-1 text-fg'
                                : 'translate-x-0 text-fg-2 group-hover:translate-x-1 group-hover:text-fg',
                            )}
                          >
                            {tech.name}
                          </span>
                          {tech.core && (
                            <span
                              aria-hidden="true"
                              className={cn(
                                'size-1.5 shrink-0 bg-accent transition-opacity duration-300',
                                isActive ? 'opacity-100' : 'opacity-35',
                              )}
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

    </Section>
  );
}
