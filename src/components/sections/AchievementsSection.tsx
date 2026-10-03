import { useState } from 'react';
import { ACHIEVEMENTS_DATA } from '../../data/portfolioData';
import type { Achievement } from '../../types';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Modal } from '../ui/Modal';
import { Icon, type IconName } from '../ui/Icon';

const ICON_MAP: Record<string, IconName> = {
  verified: 'shield',
  star: 'star',
  description: 'file',
};

export function AchievementsSection() {
  const [selected, setSelected] = useState<Achievement | null>(null);

  return (
    <Section id="achievements" marker="07" aria-label="Achievements and certifications">
      <SectionHeading
        index="07"
        eyebrow="Recognition"
        title={
          <>
            Proof, not <span className="text-accent">promises.</span>
          </>
        }
        aside={<p>Hackathon results, national selections and verified certifications.</p>}
      />

      <ul className="mt-16 border-t border-line">
        {ACHIEVEMENTS_DATA.map((item, i) => (
          <li key={item.id} className="border-b border-line">
            <Reveal delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <button
                type="button"
                onClick={() => setSelected(item)}
                data-cursor="view"
                data-cursor-label="Read"
                aria-label={`Read more about ${item.title} — ${item.organization}`}
                className="group grid w-full grid-cols-12 items-center gap-4 py-7 text-left"
              >
                <span className="label col-span-2 sm:col-span-1">{item.date}</span>

                <span className="col-span-10 sm:col-span-5">
                  <span className="flex items-center gap-3">
                    <span className="text-fg-3 transition-colors duration-500 group-hover:text-accent">
                      <Icon
                        name={item.isPrize ? 'trophy' : (ICON_MAP[item.icon] ?? 'award')}
                        size={17}
                      />
                    </span>
                    <span className="font-display text-[clamp(1.15rem,2.4vw,1.75rem)] leading-none font-semibold text-fg-2 transition-colors duration-500 group-hover:text-fg">
                      {item.title}
                    </span>
                  </span>
                </span>

                <span className="col-span-10 col-start-3 text-sm text-fg-3 transition-colors duration-500 group-hover:text-fg-2 sm:col-span-4 sm:col-start-auto">
                  {item.organization}
                </span>

                <span className="col-span-2 hidden justify-self-end sm:flex">
                  <Icon
                    name="arrowUpRight"
                    size={16}
                    className="text-fg-3 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                  />
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        label={selected ? `${selected.title} — ${selected.organization}` : 'Achievement'}
        eyebrow={selected?.date}
        title={selected?.title}
      >
        {selected && (
          <div className="space-y-6">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">
              {selected.organization}
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-fg-2">{selected.description}</p>
            {selected.credentialUrl && (
              <a
                href={selected.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-wipe inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-fg uppercase"
              >
                View credential <Icon name="arrowUpRight" size={14} className="text-accent" />
              </a>
            )}
          </div>
        )}
      </Modal>
    </Section>
  );
}
