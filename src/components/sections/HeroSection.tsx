import { useRef } from 'react';
import { PORTFOLIO_INFO, TECH_MARQUEE, PROJECTS } from '../../data/portfolioData';
import { useGsap } from '../../lib/animations';
import { gsap, media, EASE } from '../../lib/gsap';
import { scrollToSection } from '../../lib/scroll';
import { MagneticButton } from '../ui/MagneticButton';
import { Portrait } from '../ui/Portrait';
import { Marquee } from '../ui/Marquee';
import { Icon } from '../ui/Icon';

interface HeroProps {
  /** Flips true when the preloader finishes — the hero waits for it. */
  introDone: boolean;
  onOpenResume: () => void;
}

const METRICS = [
  { value: String(PROJECTS.length).padStart(2, '0'), label: 'Production systems' },
  { value: '60+', label: 'AI employees shipped' },
  { value: '08', label: 'Agents orchestrated' },
];

export function HeroSection({ introDone, onOpenResume }: HeroProps) {
  const scope = useRef<HTMLElement>(null);

  useGsap(
    () => {
      if (media.reduced()) {
        gsap.set('[data-hero-intro], [data-hero-line], [data-hero-foot], [data-hero-portrait]', {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });

     tl.fromTo('[data-hero-line]', { yPercent: 118 }, { yPercent: 0, duration: 1.35, stagger: 0.1 })
        .to('[data-hero-intro]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 }, '-=0.95')
        .to('[data-hero-portrait]', { opacity: 1, y: 0, duration: 1.2 }, '-=1.05')
        .to('[data-hero-foot]', { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 }, '-=0.85');
    },
    [introDone],
    scope,
  );

  return (
    <section
      id="top"
      ref={scope}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 lg:pt-32"
    >
      {/* ── Ambient layers ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="bg-technical-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(90%_60%_at_50%_0%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(212,255,79,0.10),transparent_65%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-line lg:block"
      />

      <div className="shell relative flex flex-1 flex-col justify-between gap-12">
        {/* ── Meta rail ─────────────────────────────────────────────── */}
        <div
          data-hero-intro
          className="flex flex-wrap items-center justify-between gap-4 py-4 opacity-0"
        >
          <span className="flex items-center gap-2.5">
            <span className="relative grid size-2 place-items-center">
              <span className="animate-ping-ring absolute inset-0 rounded-full bg-accent" />
              <span className="size-2 rounded-full bg-accent" />
            </span>
            <span className="label text-fg-2">{PORTFOLIO_INFO.availability}</span>
          </span>
          <span className="label hidden sm:block">{PORTFOLIO_INFO.currentRole}</span>
          <span className="label">
            {PORTFOLIO_INFO.location} · IST
          </span>
        </div>

        {/* ── Type + portrait ───────────────────────────────────────── */}
        <div className="grid-12 items-end gap-y-10">
          <h1 className="col-span-12 lg:col-span-7">
            <span className="mask">
              <span data-hero-line className="block font-display text-display font-semibold text-fg">
                Adina
              </span>
            </span>
            <span className="mask">
              <span data-hero-line className="block font-display text-display font-semibold text-fg">
                Vishal<span className="text-accent">.</span>
              </span>
            </span>
            <span className="mask mt-2">
              <span
                data-hero-line
                className="block font-mono text-[clamp(0.75rem,1.6vw,1rem)] tracking-[0.22em] text-fg-2 uppercase"
              >
                Full-Stack Agentic AI Engineer
              </span>
            </span>
          </h1>

          <div
            data-hero-portrait
            className="col-span-8 col-start-1 max-w-[19rem] translate-y-6 opacity-0 sm:col-span-6 lg:col-span-4 lg:col-start-9 lg:max-w-none"
          >
            <Portrait />
          </div>
        </div>

        {/* ── Foot: pitch + actions ─────────────────────────────────── */}
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <p
              data-hero-foot
              className="max-w-lg translate-y-4 text-[0.9375rem] leading-relaxed text-fg-2 opacity-0"
            >
              {PORTFOLIO_INFO.tagline}
            </p>

            <div
              data-hero-foot
              className="mt-8 flex translate-y-4 flex-wrap items-center gap-3 opacity-0"
            >
              <MagneticButton
                size="lg"
                trailingIcon="arrowDown"
                onClick={() => scrollToSection('projects')}
              >
                Selected work
              </MagneticButton>
              <MagneticButton size="lg" variant="outline" icon="file" onClick={onOpenResume}>
                Résumé
              </MagneticButton>
              <a
                href={PORTFOLIO_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                data-cursor="link"
                className="grid size-14 place-items-center border border-line-2 text-fg-2 transition-colors duration-500 hover:border-accent hover:text-accent"
              >
                <Icon name="github" size={18} />
              </a>
            </div>
          </div>

          {/* Credibility rail — every figure is traceable to the data file */}
          <dl className="col-span-12 grid grid-cols-3 gap-4 lg:col-span-5 lg:col-start-8">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                data-hero-foot
                className="translate-y-4 border-t border-line pt-4 opacity-0"
              >
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="block font-display text-2xl text-fg">{metric.value}</span>
                  <span className="mt-1 block font-mono text-[0.625rem] leading-tight tracking-[0.12em] text-fg-3 uppercase">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── Stack ticker ────────────────────────────────────────────── */}
      <div data-hero-foot className="relative mt-10 border-y border-line opacity-0">
        <div className="shell">
          <Marquee items={TECH_MARQUEE} duration={52} />
        </div>
      </div>
    </section>
  );
}
