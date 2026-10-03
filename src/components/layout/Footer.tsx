import { PORTFOLIO_INFO } from '../../data/portfolioData';
import { scrollToSection, scrollToTop } from '../../lib/scroll';
import { Icon } from '../ui/Icon';

interface FooterProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
}

export function Footer({ onOpenResume, onOpenCommandPalette }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line" aria-label="Footer">
      <div className="shell py-14">
        <div className="grid-12 gap-y-10">
          {/* Identity */}
          <div className="col-span-12 lg:col-span-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-3"
              data-cursor="link"
            >
              <span className="relative grid size-8 place-items-center border border-line-2 transition-colors duration-500 group-hover:border-accent">
                <span className="font-mono text-[0.625rem] tracking-widest text-fg">AV</span>
              </span>
              <span className="font-display text-base text-fg">{PORTFOLIO_INFO.name}</span>
            </button>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-fg-3">
              Full-stack engineer building agentic systems, grounded retrieval and the backends that
              carry them.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={PORTFOLIO_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                data-cursor="link"
                className="grid size-10 place-items-center border border-line-2 text-fg-2 transition-colors duration-500 hover:border-accent hover:text-accent"
              >
                <Icon name="github" size={16} />
              </a>
              <a
                href={PORTFOLIO_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                data-cursor="link"
                className="grid size-10 place-items-center border border-line-2 text-fg-2 transition-colors duration-500 hover:border-accent hover:text-accent"
              >
                <Icon name="linkedin" size={16} />
              </a>
              <a
                href={`mailto:${PORTFOLIO_INFO.email}`}
                aria-label="Email"
                data-cursor="link"
                className="grid size-10 place-items-center border border-line-2 text-fg-2 transition-colors duration-500 hover:border-accent hover:text-accent"
              >
                <Icon name="mail" size={16} />
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <nav className="col-span-6 lg:col-span-3 lg:col-start-6" aria-label="Footer navigation">
            <p className="label">Index</p>
            <ul className="mt-5 space-y-2.5">
              {PORTFOLIO_INFO.sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    data-cursor="link"
                    className="group flex items-baseline gap-2.5 text-sm text-fg-3 transition-colors duration-300 hover:text-fg"
                  >
                    <span className="font-mono text-[0.5625rem] text-accent/60">{section.index}</span>
                    <span className="link-wipe">{section.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Utilities */}
          <div className="col-span-6 lg:col-span-3 lg:col-start-10">
            <p className="label">Utilities</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={onOpenResume}
                  data-cursor="link"
                  className="link-wipe text-sm text-fg-3 transition-colors duration-300 hover:text-fg"
                >
                  Résumé
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  data-cursor="link"
                  className="flex items-center gap-2 text-sm text-fg-3 transition-colors duration-300 hover:text-fg"
                >
                  <span className="link-wipe">Command palette</span>
                  <kbd className="border border-line-2 px-1.5 py-0.5 font-mono text-[0.5625rem] text-fg-3">
                    ⌘K
                  </kbd>
                </button>
              </li>
              <li>
                <a
                  href={PORTFOLIO_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="link-wipe text-sm text-fg-3 transition-colors duration-300 hover:text-fg"
                >
                  Source on GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.625rem] tracking-[0.12em] text-fg-3 uppercase">
            © {year} {PORTFOLIO_INFO.name} — All rights reserved
          </p>

          <div className="flex items-center gap-6">
            <p className="font-mono text-[0.625rem] tracking-[0.12em] text-fg-3 uppercase">
              React · TypeScript · GSAP · Lenis
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              data-cursor="link"
              className="group flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.12em] text-fg-2 uppercase transition-colors duration-300 hover:text-accent"
            >
              Back to top
              <Icon
                name="arrowUp"
                size={13}
                className="transition-transform duration-500 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
