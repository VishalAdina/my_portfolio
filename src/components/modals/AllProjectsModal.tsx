import { useMemo, useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../types';
import { Modal } from '../ui/Modal';
import { Tag } from '../ui/Tag';
import { Icon } from '../ui/Icon';

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export function AllProjectsModal({ isOpen, onClose, onSelectProject }: AllProjectsModalProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROJECTS;
    return PROJECTS.filter((project) =>
      [
        project.title,
        project.subtitle,
        project.description,
        project.category,
        ...project.tags,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      label="All projects"
      eyebrow="Archive"
      title="All selected projects"
      wide
    >
      <div className="space-y-8">
        <div className="relative">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Icon
            name="search"
            size={16}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-fg-3"
          />
          <input
            id="project-search"
            data-autofocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, stack or category…"
            className="w-full border border-line-2 bg-transparent py-3.5 pr-4 pl-11 font-mono text-[0.8125rem] text-fg placeholder:text-fg-3 transition-colors duration-300 focus:border-accent focus:outline-none"
          />
        </div>

        <p className="label">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </p>

        <ul className="border-t border-line">
          {results.map((project, i) => (
            <li key={project.id} className="border-b border-line">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectProject(project);
                }}
                data-cursor="view"
                data-cursor-label="Open"
                className="group grid w-full grid-cols-12 items-center gap-4 py-6 text-left"
              >
                <span className="label col-span-2 sm:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="col-span-10 sm:col-span-5">
                  <span className="block font-display text-lg text-fg transition-colors duration-500 group-hover:text-accent">
                    {project.title}
                  </span>
                  <span className="mt-1 block text-xs text-fg-3">{project.subtitle}</span>
                </span>

                <span className="col-span-10 col-start-3 flex flex-wrap gap-2 sm:col-span-5 sm:col-start-auto">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </span>

                <span className="col-span-2 hidden justify-self-end sm:flex">
                  <Icon
                    name="arrowUpRight"
                    size={16}
                    className="text-fg-3 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {!results.length && (
          <p className="py-10 text-center text-sm text-fg-3">
            Nothing matches “{query}”. Try a technology name like “LangGraph”.
          </p>
        )}
      </div>
    </Modal>
  );
}
