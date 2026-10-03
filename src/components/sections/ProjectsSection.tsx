import { useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../types';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectPreview } from '../ui/ProjectPreview';
import { Tag } from '../ui/Tag';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { cn } from '../../lib/cn';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  onViewAllProjects: () => void;
}

const CATEGORY_LABEL: Record<Project['category'], string> = {
  agentic: 'Agentic Systems',
  rag: 'Retrieval & Evaluation',
  fullstack: 'Full-Stack',
};

export function ProjectsSection({ onSelectProject, onViewAllProjects }: ProjectsProps) {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const active = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];

  return (
    <Section id="projects" marker="02" aria-label="Selected work">
      <SectionHeading
        index="02"
        eyebrow="Selected Work"
        title={
          <>
            Systems built to <span className="text-accent">survive production.</span>
          </>
        }
        aside={
          <div className="space-y-5">
            <p>
              Three flagship builds spanning multi-agent orchestration, grounded retrieval and
              standardized tool infrastructure.
            </p>
            <button
              type="button"
              onClick={onViewAllProjects}
              data-cursor="link"
              className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-fg uppercase"
            >
              <span className="link-wipe">All projects</span>
              <Icon
                name="arrowRight"
                size={14}
                className="text-accent transition-transform duration-500 group-hover:translate-x-1"
              />
            </button>
          </div>
        }
      />

      <div className="mt-16 grid-12 gap-y-12">
        {/* Rows */}
        <ul className="col-span-12 lg:col-span-7">
          {PROJECTS.map((project, i) => {
            const isActive = project.id === activeId;
            return (
              <li key={project.id} className="border-t border-line last:border-b">
                <Reveal>
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    onMouseEnter={() => setActiveId(project.id)}
                    onFocus={() => setActiveId(project.id)}
                    data-cursor="view"
                    data-cursor-label="Open"
                    aria-label={`Open case study for ${project.title}`}
                    className="group block w-full py-8 text-left sm:py-10"
                  >
                    <div className="flex items-start gap-5 sm:gap-8">
                      <span
                        className={cn(
                          'mt-2 font-mono text-[0.6875rem] tracking-[0.14em] transition-colors duration-500',
                          isActive ? 'text-accent' : 'text-fg-3',
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-6">
                          <h3
                            className={cn(
                              'font-display text-[clamp(1.75rem,5vw,3.25rem)] leading-none font-semibold tracking-[-0.03em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                              isActive
                                ? 'translate-x-2 text-fg'
                                : 'translate-x-0 text-fg-2',
                            )}
                          >
                            {project.title}
                          </h3>
                          <Icon
                            name="arrowUpRight"
                            size={22}
                            className={cn(
                              'mt-1 shrink-0 transition-all duration-500',
                              isActive
                                ? 'translate-x-0 text-accent opacity-100'
                                : '-translate-x-2 text-fg-3 opacity-0',
                            )}
                          />
                        </div>

                        <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-3">
                          {project.subtitle}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-2">
                          <Tag accent>{CATEGORY_LABEL[project.category]}</Tag>
                          {project.tags.slice(0, 4).map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </div>

                        {/* Mobile / tablet: the specimen lives inline */}
                        <div className="mt-6 lg:hidden">
                          <ProjectPreview project={project} />
                        </div>
                      </div>
                    </div>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Sticky specimen — desktop only */}
        <div className="col-span-12 hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="sticky top-28">
            <AnimatePresence mode="wait">
              <m.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectPreview project={active} />
              </m.div>
            </AnimatePresence>

            <div className="mt-6 space-y-4">
              <p className="text-sm leading-relaxed text-fg-2">{active.description}</p>

              <dl className="grid grid-cols-3 gap-3 border-t border-line pt-5">
                {active.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-display text-base text-fg">{stat.label}</dt>
                    <dd className="mt-1 font-mono text-[0.5625rem] leading-tight tracking-[0.1em] text-fg-3 uppercase">
                      {stat.sublabel}
                    </dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={() => onSelectProject(active)}
                data-cursor="link"
                className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-fg uppercase"
              >
                <span className="link-wipe">Read the case study</span>
                <Icon
                  name="arrowRight"
                  size={14}
                  className="text-accent transition-transform duration-500 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
