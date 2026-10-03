import { EXPERIENCE_DATA, EXPERIENCE_METRICS, EDUCATION_DATA } from '../../data/portfolioData';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Tag } from '../ui/Tag';
import { MagneticButton } from '../ui/MagneticButton';
import { Icon } from '../ui/Icon';

interface ExperienceProps {
  onOpenExperienceDetails: () => void;
}

export function ExperienceSection({ onOpenExperienceDetails }: ExperienceProps) {
  return (
    <Section id="experience" marker="03" aria-label="Experience and education">
      <SectionHeading
        index="03"
        eyebrow="Experience & Education"
        title={
          <>
            Where the work <span className="text-accent">actually shipped.</span>
          </>
        }
        aside={
          <p>
            One internship, four engineering domains, and a degree in progress — each one feeding
            directly into the systems above.
          </p>
        }
      />

      {/* ── Role ────────────────────────────────────────────────────── */}
      <article className="mt-16 grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-6">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <h3 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-none font-semibold text-fg">
                {EXPERIENCE_DATA.company}
              </h3>
              <span className="label text-accent">KaliganAI</span>
            </div>

            <p className="mt-4 font-mono text-[0.75rem] tracking-[0.12em] text-fg-2 uppercase">
              {EXPERIENCE_DATA.role}
            </p>
            <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-fg-3 uppercase">
              {EXPERIENCE_DATA.period} · {EXPERIENCE_DATA.location}
            </p>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-8 max-w-lg text-[0.9375rem] leading-relaxed text-fg-2">
              {EXPERIENCE_DATA.summary}
            </p>
          </Reveal>

          <Reveal delay={3}>
            <ul className="mt-8 space-y-4">
              {EXPERIENCE_DATA.details.map((detail) => (
                <li key={detail} className="flex gap-4 text-sm leading-relaxed text-fg-2">
                  <Icon name="arrowRight" size={15} className="mt-1 shrink-0 text-accent" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton trailingIcon="arrowRight" onClick={onOpenExperienceDetails}>
                Full case study
              </MagneticButton>
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_DATA.techStack.slice(0, 5).map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Metrics + domains */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <Reveal>
            <dl className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-1">
              {EXPERIENCE_METRICS.map((metric) => (
                <div key={metric.label} className="bg-bg px-5 py-5">
                  <dt className="label">{metric.label}</dt>
                  <dd className="mt-2 font-display text-2xl text-fg">{metric.value}</dd>
                  <dd className="mt-1 font-mono text-[0.625rem] tracking-[0.1em] text-fg-3 uppercase">
                    {metric.sub}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </article>

      {/* ── Domains ─────────────────────────────────────────────────── */}
      <div className="mt-20">
        <Reveal className="flex items-center gap-4">
          <span className="label">Domains</span>
          <span className="h-px flex-1 bg-line" />
        </Reveal>

        <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCE_DATA.domains.map((domain, i) => (
            <Reveal key={domain.number} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <button
                type="button"
                onClick={onOpenExperienceDetails}
                data-cursor="link"
                className="group flex h-full w-full flex-col justify-between bg-bg p-6 text-left transition-colors duration-500 hover:bg-surface"
              >
                <span className="label text-accent">{domain.number}</span>
                <div className="mt-8">
                  <h4 className="font-display text-base text-fg">{domain.title}</h4>
                  <ul className="mt-4 space-y-2">
                    {domain.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2.5 font-mono text-[0.6875rem] text-fg-3"
                      >
                        <span className="size-1 shrink-0 bg-accent/60" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <Icon
                  name="arrowUpRight"
                  size={16}
                  className="mt-8 text-fg-3 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Education ───────────────────────────────────────────────── */}
      <div id="education" className="mt-20 scroll-mt-24">
        <Reveal className="flex items-center gap-4">
          <span className="label">Education</span>
          <span className="h-px flex-1 bg-line" />
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-8 grid-12 items-start gap-y-8">
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-semibold text-fg">
                {EDUCATION_DATA.institution}
              </h3>
              <p className="mt-4 font-mono text-[0.6875rem] tracking-[0.12em] text-fg-3 uppercase">
                {EDUCATION_DATA.period} · {EDUCATION_DATA.location}
              </p>
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <p className="text-[0.9375rem] text-fg-2">{EDUCATION_DATA.degree}</p>
              <p className="mt-4 text-sm leading-relaxed text-fg-3">{EDUCATION_DATA.note}</p>
            </div>

            <ul className="col-span-12 flex flex-wrap gap-2 lg:col-span-4">
              {EDUCATION_DATA.focus.map((area) => (
                <li key={area}>
                  <Tag>{area}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
