import { useState } from 'react';
import {
  ARCHITECTURE_NODES,
  ARCHITECTURE_COPY,
  ARCHITECTURE_FLOW,
  ARCHITECTURE_BRANCHES,
  ARCHITECTURE_STORAGE,
} from '../../data/portfolioData';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Icon, type IconName } from '../ui/Icon';
import { cn } from '../../lib/cn';

interface ArchitectureProps {
  onInspectNode: (nodeId: string) => void;
}

const TYPE_ICON: Record<string, IconName> = {
  client: 'monitor',
  service: 'server',
  ai: 'cpu',
  storage: 'database',
  external: 'cloud',
};

export function ArchitectureSection({ onInspectNode }: ArchitectureProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Section id="architecture" marker="05" aria-label="Production architecture">
      <SectionHeading
        index="05"
        eyebrow={ARCHITECTURE_COPY.eyebrow}
        title={
          <>
            One request. Every layer <span className="text-accent">accounted for.</span>
          </>
        }
        aside={
          <div className="space-y-4">
            <p>{ARCHITECTURE_COPY.body}</p>
            <p className="flex items-center gap-2.5">
              <Icon name="target" size={14} className="text-accent" />
              <span className="label">Select any component to inspect it</span>
            </p>
          </div>
        }
      />

      <div className="mt-16 grid-12 gap-y-14">
        {/* ── Request path ──────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-6">
          <Reveal className="flex items-center gap-4">
            <span className="label text-fg-2">Request path</span>
            <span className="h-px flex-1 bg-line" />
          </Reveal>

          <ol className="mt-8">
            {ARCHITECTURE_FLOW.map((id, i) => {
              const node = ARCHITECTURE_NODES[id];
              const isLast = i === ARCHITECTURE_FLOW.length - 1;
              return (
                <li key={id}>
                  <Reveal delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                    <button
                      type="button"
                      onClick={() => onInspectNode(id)}
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(id)}
                      onBlur={() => setHovered(null)}
                      data-cursor="link"
                      className={cn(
                        'group flex w-full items-center gap-5 border border-line p-5 text-left transition-colors duration-500',
                        hovered === id ? 'border-accent/50 bg-surface' : 'bg-transparent hover:bg-surface',
                      )}
                    >
                      <span className="grid size-10 shrink-0 place-items-center border border-line-2 text-accent">
                        <Icon name={TYPE_ICON[node.type]} size={17} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-2">
                          <span className="font-display text-lg text-fg">{node.label}</span>
                          <span className="font-mono text-[0.625rem] tracking-[0.1em] text-fg-3">
                            {node.sublabel}
                          </span>
                        </span>
                        <span className="mt-1.5 block truncate font-mono text-[0.625rem] tracking-[0.1em] text-fg-3 uppercase">
                          {node.tech.slice(0, 3).join(' · ')}
                        </span>
                      </span>

                      <Icon
                        name="arrowRight"
                        size={16}
                        className="shrink-0 text-fg-3 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent"
                      />
                    </button>
                  </Reveal>

                  {!isLast && (
                    <div aria-hidden="true" className="relative mx-auto h-8 w-px overflow-hidden bg-line">
                      <span className="animate-sweep absolute inset-x-0 h-3 bg-accent" />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* ── Reasoning + persistence ───────────────────────────────── */}
        <div className="col-span-12 space-y-12 lg:col-span-5 lg:col-start-8">
          <Group
            title="Reasoning & retrieval"
            caption="What the agentic layer reaches for"
            ids={ARCHITECTURE_BRANCHES}
            hovered={hovered}
            onHover={setHovered}
            onInspect={onInspectNode}
          />
          <Group
            title="Persistence & integrations"
            caption="What keeps state and reaches outside"
            ids={ARCHITECTURE_STORAGE}
            hovered={hovered}
            onHover={setHovered}
            onInspect={onInspectNode}
          />
        </div>
      </div>
    </Section>
  );
}

function Group({
  title,
  caption,
  ids,
  hovered,
  onHover,
  onInspect,
}: {
  title: string;
  caption: string;
  ids: readonly string[];
  hovered: string | null;
  onHover: (id: string | null) => void;
  onInspect: (id: string) => void;
}) {
  return (
    <div>
      <Reveal className="flex items-center gap-4">
        <span className="label text-fg-2">{title}</span>
        <span className="h-px flex-1 bg-line" />
        <span className="label hidden sm:block">{caption}</span>
      </Reveal>

      <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
        {ids.map((id) => {
          const node = ARCHITECTURE_NODES[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => onInspect(id)}
              onMouseEnter={() => onHover(id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(id)}
              onBlur={() => onHover(null)}
              data-cursor="link"
              className={cn(
                'group flex h-full flex-col justify-between p-5 text-left transition-colors duration-500',
                hovered === id ? 'bg-surface-2' : 'bg-bg hover:bg-surface',
              )}
            >
              <span className="flex items-center justify-between">
                <Icon name={TYPE_ICON[node.type]} size={16} className="text-accent" />
                <Icon
                  name="arrowUpRight"
                  size={14}
                  className="text-fg-3 opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </span>
              <span className="mt-8">
                <span className="block font-display text-sm text-fg">{node.label}</span>
                <span className="mt-1.5 block font-mono text-[0.5625rem] tracking-[0.1em] text-fg-3 uppercase">
                  {node.sublabel}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
