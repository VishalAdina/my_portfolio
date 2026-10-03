import {
  PORTFOLIO_INFO,
  EXPERIENCE_DATA,
  PROJECTS,
  ACHIEVEMENTS_DATA,
  EDUCATION_DATA,
  RESUME_SUMMARY,
} from '../../data/portfolioData';
import { Modal } from '../ui/Modal';
import { Icon } from '../ui/Icon';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMPETENCIES = [
  { label: 'Languages', value: 'Python, TypeScript, JavaScript, Java, C, SQL' },
  { label: 'AI & Agents', value: 'LangGraph, LangChain, MCP Protocol, RAGAS, pgvector, Qdrant' },
  { label: 'Frameworks', value: 'FastAPI, React, Next.js, Tailwind CSS, Celery, Prisma' },
  { label: 'Data & Infra', value: 'PostgreSQL, MySQL, Redis, Docker, Vercel, Render, GitHub Actions' },
];

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="border-b border-line pb-2 font-mono text-[0.625rem] tracking-[0.18em] text-fg-3 uppercase">
      {children}
    </h3>
  );
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      label="Résumé"
      eyebrow="Curriculum vitae"
      title={PORTFOLIO_INFO.name}
      wide
      printable
    >
      <div className="space-y-10 text-fg-2">
        {/* Actions */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 border border-line bg-surface/60 px-5 py-4">
          <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-fg-3 uppercase">
            Print or save as PDF — A4 optimised
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            data-cursor="link"
            className="group inline-flex items-center gap-2.5 border border-line-2 px-4 py-2.5 font-mono text-[0.6875rem] tracking-[0.14em] text-fg uppercase transition-colors duration-500 hover:border-accent hover:text-accent"
          >
            <Icon name="print" size={14} />
            Print / Save PDF
          </button>
        </div>

        {/* Header */}
        <header className="border-b border-line pb-6">
          <h2 className="font-display text-3xl font-semibold text-fg">{PORTFOLIO_INFO.name}</h2>
          <p className="mt-2 font-mono text-[0.8125rem] tracking-[0.1em] text-accent uppercase">
            {PORTFOLIO_INFO.role} · CSIT Student
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6875rem] text-fg-3">
            <a href={`mailto:${PORTFOLIO_INFO.email}`} className="link-wipe">
              {PORTFOLIO_INFO.email}
            </a>
            <a
              href={PORTFOLIO_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="link-wipe"
            >
              github.com/adinavishal
            </a>
            <a
              href={PORTFOLIO_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-wipe"
            >
              linkedin.com/in/adinavishal
            </a>
          </div>
        </header>

        {/* Summary */}
        <section>
          <SectionTitle>Professional summary</SectionTitle>
          <p className="mt-4 text-[0.9375rem] leading-relaxed">{RESUME_SUMMARY}</p>
        </section>

        {/* Experience */}
        <section>
          <SectionTitle>Work experience</SectionTitle>
          <div className="mt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-display text-lg text-fg">
                {EXPERIENCE_DATA.company}
                <span className="ml-3 font-mono text-[0.625rem] tracking-[0.14em] text-fg-3 uppercase">
                  KaliganAI
                </span>
              </h4>
              <span className="font-mono text-[0.6875rem] text-fg-3">{EXPERIENCE_DATA.period}</span>
            </div>
            <p className="mt-1 font-mono text-[0.75rem] tracking-[0.08em] text-accent uppercase">
              {EXPERIENCE_DATA.role}
            </p>
            <ul className="mt-4 space-y-3">
              {EXPERIENCE_DATA.details.map((detail) => (
                <li key={detail} className="flex gap-4 text-sm leading-relaxed">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-accent" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section>
          <SectionTitle>Key projects</SectionTitle>
          <div className="mt-5 space-y-5">
            {PROJECTS.map((project) => (
              <div key={project.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-base text-fg">{project.title}</h4>
                  <span className="font-mono text-[0.625rem] tracking-[0.08em] text-fg-3">
                    {project.tags.slice(0, 4).join(' · ')}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionTitle>Education</SectionTitle>
          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h4 className="font-display text-base text-fg">{EDUCATION_DATA.institution}</h4>
              <p className="mt-1 text-sm">{EDUCATION_DATA.degree}</p>
            </div>
            <span className="font-mono text-[0.6875rem] text-fg-3">{EDUCATION_DATA.period}</span>
          </div>
        </section>

        {/* Competencies */}
        <section>
          <SectionTitle>Technical competencies</SectionTitle>
          <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {COMPETENCIES.map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-[0.625rem] tracking-[0.14em] text-fg-3 uppercase">
                  {row.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Recognition */}
        <section>
          <SectionTitle>Honours &amp; certifications</SectionTitle>
          <ul className="mt-5 space-y-3">
            {ACHIEVEMENTS_DATA.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-4 text-sm">
                <span>
                  <span className="text-fg">{item.title}</span>
                  <span className="text-fg-3"> — {item.organization}</span>
                </span>
                <span className="font-mono text-[0.6875rem] text-fg-3">{item.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Modal>
  );
}
