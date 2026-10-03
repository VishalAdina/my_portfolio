import { PORTFOLIO_INFO, EXPERIENCE_DATA, TECH_STACK } from '../../data/portfolioData';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { MagneticButton } from '../ui/MagneticButton';
import { Marquee } from '../ui/Marquee';
import { Icon, type IconName } from '../ui/Icon';
import { scrollToSection } from '../../lib/scroll';

const PILLARS: { icon: IconName; title: string; body: string; proof: string }[] = [
  {
    icon: 'layers',
    title: 'Full-stack delivery',
    body: 'React and Next.js interfaces wired to FastAPI services, with typed contracts from database to component.',
    proof: 'React · Next.js · FastAPI · PostgreSQL',
  },
  {
    icon: 'cpu',
    title: 'Agentic systems',
    body: 'LangGraph state machines with deterministic supervisors, sandboxed tool calling and checkpointer memory.',
    proof: 'LangGraph · MCP · Multi-agent',
  },
  {
    icon: 'target',
    title: 'Retrieval you can measure',
    body: 'Hybrid search and reranking shipped alongside RAGAS evaluation, tracing and guardrails — not bolted on after.',
    proof: 'RAG · RAGAS · Observability',
  },
];

const SPEC = [
  { label: 'Role', value: PORTFOLIO_INFO.role },
  { label: 'Currently', value: `${EXPERIENCE_DATA.role} @ ${EXPERIENCE_DATA.company}` },
  { label: 'Focus', value: 'RAG · Agents · Scalable backends' },
  { label: 'Education', value: PORTFOLIO_INFO.education },
  { label: 'Based in', value: PORTFOLIO_INFO.location },
  { label: 'Status', value: PORTFOLIO_INFO.availability },
];

export function AboutSection() {
  const coreSkills = TECH_STACK.filter((t) => t.core).map((t) => t.name);

  return (
    <Section id="about" marker="01" aria-label="About">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            Intelligent software systems that move from idea to{' '}
            <span className="text-accent">production.</span>
          </>
        }
      />

      <div className="mt-16 grid-12 gap-y-14">
        {/* Prose */}
        <div className="col-span-12 lg:col-span-6">
          <Reveal>
            <p className="max-w-xl font-display text-[clamp(1.15rem,2.1vw,1.6rem)] leading-snug text-fg">
              Building reliable backend systems and integrating agentic architecture — where
              retrieval, tool use and evaluation are treated as production concerns from day one.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-8 max-w-xl space-y-5 text-[0.9375rem] leading-relaxed text-fg-2">
              <p>
                I work across the whole stack: React and Next.js on the surface, FastAPI and
                PostgreSQL underneath, and a LangGraph reasoning layer in between. My projects sit
                where those three meet — a multi-agent maritime safety platform, a hybrid-retrieval
                knowledge platform with automated evaluation, and a Model Context Protocol server
                that gives agents safe access to real tools.
              </p>
              <p>
                Currently shipping AI-powered systems at {EXPERIENCE_DATA.company}, and studying
                Computer Science &amp; Information Technology at {PORTFOLIO_INFO.university}.
              </p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton
                trailingIcon="arrowDown"
                onClick={() => scrollToSection('projects')}
              >
                View my work
              </MagneticButton>
              <MagneticButton
                variant="outline"
                href={PORTFOLIO_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                icon="github"
              >
                GitHub
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* Spec sheet */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <Reveal>
            <dl className="border-t border-line">
              {SPEC.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                >
                  <dt className="label shrink-0">{row.label}</dt>
                  <dd className="text-right text-[0.8125rem] text-fg-2">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Pillars */}
      <div className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <Reveal key={pillar.title} delay={(i + 1) as 1 | 2 | 3}>
            <div className="group h-full bg-bg p-7 transition-colors duration-500 hover:bg-surface">
              <Icon
                name={pillar.icon}
                size={20}
                className="text-accent transition-transform duration-500 group-hover:-translate-y-0.5"
              />
              <h3 className="mt-6 font-display text-lg text-fg">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-2">{pillar.body}</p>
              <p className="mt-6 font-mono text-[0.625rem] tracking-[0.12em] text-fg-3 uppercase">
                {pillar.proof}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 border-y border-line">
        <Marquee items={coreSkills} duration={58} reverse />
      </Reveal>
    </Section>
  );
}
