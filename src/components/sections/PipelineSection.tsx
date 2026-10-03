import { useEffect, useRef, useState } from 'react';
import { m } from 'motion/react';
import { PIPELINE_SCENARIOS } from '../../data/portfolioData';
import { media } from '../../lib/gsap';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { MagneticButton } from '../ui/MagneticButton';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/cn';

const STEP_DELAY = 720;

export function PipelineSection() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);

  const scenario = PIPELINE_SCENARIOS[scenarioIndex];

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  // Switching scenario resets the trace
  useEffect(() => {
    clearTimers();
    setRunning(false);
    setStep(media.reduced() ? scenario.steps.length : 0);
  }, [scenario]);

  const run = () => {
    clearTimers();
    setStep(0);
    setRunning(true);

    if (media.reduced()) {
      setStep(scenario.steps.length);
      setRunning(false);
      return;
    }

    scenario.steps.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setStep(i + 1);
          if (i === scenario.steps.length - 1) setRunning(false);
        }, STEP_DELAY * (i + 1)),
      );
    });
  };

  const progress = (step / scenario.steps.length) * 100;

  return (
    <Section id="my-project-architecture" marker="06" aria-label="Execution pipeline">
      <SectionHeading
        index="06"
        eyebrow="Execution Pipeline"
        title={
          <>
            From query to <span className="text-accent">actionable results.</span>
          </>
        }
        aside={
          <p>
            A production-grade agentic RAG pipeline integrating full-stack, retrieval and
            real-world tools. Pick a scenario and watch a request travel through it.
          </p>
        }
      />

      <div className="mt-16 grid-12 gap-y-12">
        {/* ── Controls ──────────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-5">
          <Reveal className="flex items-center gap-4">
            <span className="label text-fg-2">Scenario</span>
            <span className="h-px flex-1 bg-line" />
          </Reveal>

          <ul className="mt-6">
            {PIPELINE_SCENARIOS.map((item, i) => {
              const isActive = i === scenarioIndex;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setScenarioIndex(i)}
                    aria-pressed={isActive}
                    data-cursor="link"
                    className={cn(
                      'group flex w-full items-center gap-4 border-b border-line py-5 text-left transition-colors duration-500',
                      isActive ? 'text-fg' : 'text-fg-3 hover:text-fg-2',
                    )}
                  >
                    <span
                      className={cn(
                        'font-mono text-[0.625rem] tracking-[0.14em] transition-colors duration-500',
                        isActive ? 'text-accent' : 'text-fg-3',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-base">{item.title}</span>
                      <span className="mt-1 block font-mono text-[0.5625rem] tracking-[0.14em] text-fg-3 uppercase">
                        {item.project}
                      </span>
                    </span>
                    <Icon
                      name="arrowRight"
                      size={15}
                      className={cn(
                        'shrink-0 transition-all duration-500',
                        isActive ? 'translate-x-0 text-accent' : '-translate-x-1 opacity-0',
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <Reveal delay={2} className="mt-8">
            <p className="label">Input</p>
            <p className="mt-3 border-l border-accent pl-4 font-mono text-[0.8125rem] leading-relaxed text-fg-2">
              “{scenario.query}”
            </p>
          </Reveal>

          <Reveal delay={3} className="mt-8">
            <MagneticButton
              onClick={run}
              icon={running ? undefined : 'bolt'}
              trailingIcon={running ? undefined : 'arrowRight'}
              aria-busy={running}
            >
              {running ? 'Executing…' : step === scenario.steps.length ? 'Run again' : 'Run trace'}
            </MagneticButton>
          </Reveal>
        </div>

        {/* ── Trace ─────────────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="border border-line bg-surface/40">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <span className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'size-1.5 rounded-full',
                    running ? 'animate-pulse-dot bg-accent' : 'bg-fg-3',
                  )}
                />
                <span className="font-mono text-[0.625rem] tracking-[0.14em] text-fg-2 uppercase">
                  trace · {scenario.project}
                </span>
              </span>
              <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-fg-3 uppercase">
                {step}/{scenario.steps.length} steps
              </span>
            </div>

            {/* Progress rail */}
            <div className="h-px w-full bg-line">
              <m.div
                className="h-px bg-accent"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <ol
              className="divide-y divide-line"
              aria-live="polite"
              aria-label="Execution trace steps"
            >
              {scenario.steps.map((text, i) => {
                const visible = i < step;
                const isCurrent = i === step - 1 && running;
                return (
                  <li
                    key={text}
                    className={cn(
                      'flex gap-4 px-5 py-4 transition-all duration-700',
                      visible ? 'opacity-100' : 'opacity-25',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 grid size-5 shrink-0 place-items-center border font-mono text-[0.5625rem] transition-colors duration-500',
                        visible
                          ? 'border-accent/60 text-accent'
                          : 'border-line-2 text-fg-3',
                      )}
                    >
                      {visible ? <Icon name="check" size={11} /> : String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-[0.75rem] leading-relaxed transition-transform duration-700',
                        visible ? 'translate-x-0 text-fg-2' : 'translate-x-1 text-fg-3',
                        isCurrent && 'text-fg',
                      )}
                    >
                      {text}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="flex items-center justify-between border-t border-line px-5 py-3.5">
              <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-fg-3 uppercase">
                SSE stream
              </span>
              <span
                className={cn(
                  'font-mono text-[0.5625rem] tracking-[0.14em] uppercase transition-colors duration-500',
                  step === scenario.steps.length ? 'text-accent' : 'text-fg-3',
                )}
              >
                {step === scenario.steps.length ? 'Complete' : 'Standby'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
