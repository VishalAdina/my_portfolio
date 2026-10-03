import { EXPERIENCE_DATA, EXPERIENCE_METRICS } from '../../data/portfolioData';
import { Modal } from '../ui/Modal';
import { Tag } from '../ui/Tag';
import { Icon } from '../ui/Icon';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExperienceModal({ isOpen, onClose }: ExperienceModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      label={`${EXPERIENCE_DATA.company} case study`}
      eyebrow={EXPERIENCE_DATA.period}
      title={`${EXPERIENCE_DATA.company} — KaliganAI`}
      wide
    >
      <article className="space-y-12">
        <header className="grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <h4 className="font-display text-xl text-fg">{EXPERIENCE_DATA.role}</h4>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-fg-2">
              {EXPERIENCE_DATA.summary}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {EXPERIENCE_DATA.techStack.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>

          <dl className="col-span-12 space-y-px lg:col-span-4 lg:col-start-9">
            {EXPERIENCE_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
              >
                <dt className="font-mono text-[0.5625rem] tracking-[0.14em] text-fg-3 uppercase">
                  {metric.label}
                </dt>
                <dd className="font-display text-base text-fg">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <section>
          <h5 className="label">What I worked on</h5>
          <ul className="mt-6 space-y-5">
            {EXPERIENCE_DATA.details.map((detail, i) => (
              <li key={detail} className="flex gap-5">
                <span className="mt-0.5 font-mono text-[0.625rem] tracking-[0.14em] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="flex-1 text-[0.9375rem] leading-relaxed text-fg-2">{detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h5 className="label">Domains</h5>
          <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
            {EXPERIENCE_DATA.domains.map((domain) => (
              <div key={domain.number} className="bg-surface p-6">
                <span className="label text-accent">
                  {domain.number} — {domain.title}
                </span>
                <ul className="mt-5 space-y-2.5">
                  {domain.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-fg-2">
                      <Icon name="check" size={13} className="shrink-0 text-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </article>
    </Modal>
  );
}
