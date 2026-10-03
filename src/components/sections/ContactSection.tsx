import { useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { PORTFOLIO_INFO, CONTACT_CHANNELS, CONTACT_SUBJECTS } from '../../data/portfolioData';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { MagneticButton } from '../ui/MagneticButton';
import { Icon } from '../ui/Icon';
import { useSplitReveal } from '../../lib/animations';

const EMPTY = { name: '', email: '', subject: CONTACT_SUBJECTS[0], message: '' };

/**
 * Split-text headings mutate their own DOM, so the headline is deliberately
 * isolated in a component that never re-renders when form state changes.
 */
function ContactHeadline() {
  const ref = useSplitReveal<HTMLHeadingElement>({ stagger: 0.09 });
  return (
    <h2 ref={ref} className="mt-7 max-w-[20ch] font-display text-h1 font-semibold text-fg opacity-0">
      Got a hard <span className="text-accent">problem to solve?</span>
    </h2>
  );
}

export function ContactSection() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const field =
    'w-full border border-line-2 bg-transparent px-4 py-3 font-mono text-[0.8125rem] text-fg placeholder:text-fg-3 transition-colors duration-300 focus:border-accent focus:outline-none';

  return (
    <Section id="contact" marker="08" aria-label="Contact">
      {/* ── Statement ───────────────────────────────────────────────── */}
      <div className="grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-8">
          <Reveal className="flex items-center gap-4">
            <span className="label text-accent">08</span>
            <span className="h-px w-8 bg-line-2" />
            <span className="label">Let&apos;s connect</span>
          </Reveal>

          <ContactHeadline />

          <Reveal delay={2}>
            <p className="mt-8 max-w-lg text-[0.9375rem] leading-relaxed text-fg-2">
              Open to internship opportunities, collaborative research, and production AI
              engineering. The fastest route is email — I reply to everything.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:pt-24">
          <Reveal delay={3}>
            <a
              href={`mailto:${PORTFOLIO_INFO.email}`}
              data-cursor="view"
              data-cursor-label="Email"
              className="group block border-t border-line py-6"
            >
              <span className="label">Direct</span>
              <span className="mt-3 flex items-center gap-3 font-display text-lg text-fg transition-colors duration-500 group-hover:text-accent">
                <span className="break-all">{PORTFOLIO_INFO.email}</span>
                <Icon name="arrowUpRight" size={16} className="shrink-0" />
              </span>
            </a>

            <ul className="border-t border-line">
              {CONTACT_CHANNELS.filter((c) => c.id !== 'email').map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="group flex items-center justify-between border-b border-line py-4"
                  >
                    <span className="label">{channel.label}</span>
                    <span className="flex items-center gap-2 font-mono text-[0.75rem] text-fg-2 transition-colors duration-300 group-hover:text-accent">
                      {channel.value}
                      <Icon
                        name="arrowUpRight"
                        size={13}
                        className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <MagneticButton
                variant={open ? 'outline' : 'solid'}
                trailingIcon={open ? 'close' : 'arrowRight'}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="w-full"
              >
                {open ? 'Close' : 'Send a message'}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Form ────────────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-16 border-t border-line pt-10">
              {sent ? (
                <div className="flex flex-col items-start gap-4" role="status">
                  <span className="grid size-12 place-items-center border border-accent text-accent">
                    <Icon name="check" size={20} />
                  </span>
                  <h3 className="font-display text-2xl text-fg">Message queued.</h3>
                  <p className="max-w-md text-sm text-fg-2">
                    Thanks {form.name || 'there'} — your note about “{form.subject}” is ready. Your
                    mail client is the last hop, or reach me directly at{' '}
                    <a className="link-wipe text-accent" href={`mailto:${PORTFOLIO_INFO.email}`}>
                      {PORTFOLIO_INFO.email}
                    </a>
                    .
                  </p>
                  <div className="flex gap-3">
                    <MagneticButton
                      href={`mailto:${PORTFOLIO_INFO.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`}
                      icon="mail"
                    >
                      Open mail client
                    </MagneticButton>
                    <MagneticButton
                      variant="outline"
                      onClick={() => {
                        setSent(false);
                        setForm(EMPTY);
                      }}
                    >
                      Write another
                    </MagneticButton>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="grid-12 gap-y-6">
                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="contact-name" className="label">
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ada Lovelace"
                      className={`mt-3 ${field}`}
                    />
                  </div>

                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="contact-email" className="label">
                      Your email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className={`mt-3 ${field}`}
                    />
                  </div>

                  <div className="col-span-12">
                    <label htmlFor="contact-subject" className="label">
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={`mt-3 ${field}`}
                    >
                      {CONTACT_SUBJECTS.map((subject) => (
                        <option key={subject} value={subject} className="bg-surface">
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-12">
                    <div className="flex items-baseline justify-between">
                      <label htmlFor="contact-message" className="label">
                        Message
                      </label>
                      <span className="font-mono text-[0.625rem] text-fg-3">
                        {form.message.length}/500
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      maxLength={500}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What are you building, and where could I help?"
                      className={`mt-3 resize-none ${field}`}
                    />
                  </div>

                  <div className="col-span-12 flex flex-wrap items-center gap-4">
                    <MagneticButton type="submit" trailingIcon="arrowRight">
                      Send message
                    </MagneticButton>
                    <p className="font-mono text-[0.625rem] tracking-[0.1em] text-fg-3 uppercase">
                      Opens in your mail client · no data stored
                    </p>
                  </div>
                </form>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
