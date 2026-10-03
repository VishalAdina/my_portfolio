import type { Project } from '../../types';
import { Modal } from '../ui/Modal';
import { CodeBlock } from '../ui/CodeBlock';
import { Tag } from '../ui/Tag';
import { Icon } from '../ui/Icon';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const CATEGORY_LABEL: Record<Project['category'], string> = {
  agentic: 'Agentic Systems',
  rag: 'Retrieval & Evaluation',
  fullstack: 'Full-Stack',
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Modal
      isOpen={Boolean(project)}
      onClose={onClose}
      label={project ? `${project.title} case study` : 'Project'}
      eyebrow={project ? `${CATEGORY_LABEL[project.category]} — Case study` : undefined}
      title={project?.title}
      wide
    >
      {project && (
        <article className="space-y-12">
          {/* ── Overview ──────────────────────────────────────────── */}
          <header className="grid-12 gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <h4 className="font-display text-xl leading-snug text-fg">{project.subtitle}</h4>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-fg-2">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            <dl className="col-span-12 space-y-px lg:col-span-4 lg:col-start-9">
              {project.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                >
                  <dt className="font-mono text-[0.5625rem] tracking-[0.14em] text-fg-3 uppercase">
                    {stat.sublabel}
                  </dt>
                  <dd className="font-display text-base text-fg">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </header>

          {/* ── Highlights ────────────────────────────────────────── */}
          <section>
            <h5 className="label">Engineering highlights</h5>
            <ul className="mt-6 space-y-5">
              {project.highlights.map((highlight, i) => (
                <li key={highlight} className="flex gap-5">
                  <span className="mt-0.5 font-mono text-[0.625rem] tracking-[0.14em] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="flex-1 text-[0.9375rem] leading-relaxed text-fg-2">{highlight}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Architecture ──────────────────────────────────────── */}
          <section>
            <h5 className="label">Architecture</h5>
            <p className="mt-5 border-l border-accent pl-5 font-mono text-[0.8125rem] leading-relaxed text-fg-2">
              {project.architectureDetails}
            </p>
          </section>

          {/* ── Code ──────────────────────────────────────────────── */}
          {project.codeSnippet && (
            <section>
              <h5 className="label mb-5">Implementation excerpt</h5>
              <CodeBlock
                filename={project.codeSnippet.filename}
                language={project.codeSnippet.language}
                code={project.codeSnippet.code}
              />
            </section>
          )}

          {/* ── Links ─────────────────────────────────────────────── */}
          <footer className="flex flex-wrap items-center gap-4 border-t border-line pt-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="group inline-flex items-center gap-2.5 border border-line-2 px-5 py-3 font-mono text-[0.6875rem] tracking-[0.14em] text-fg uppercase transition-colors duration-500 hover:border-accent hover:text-accent"
              >
                <Icon name="github" size={15} />
                Source
                <Icon
                  name="arrowUpRight"
                  size={13}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="group inline-flex items-center gap-2.5 border border-line-2 px-5 py-3 font-mono text-[0.6875rem] tracking-[0.14em] text-fg uppercase transition-colors duration-500 hover:border-accent hover:text-accent"
              >
                Live demo
                <Icon
                  name="arrowUpRight"
                  size={13}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
          </footer>
        </article>
      )}
    </Modal>
  );
}
