import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  initialOpenForm?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [showForm, setShowForm] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Internship Opportunity', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowForm(false);
      setFormData({ name: '', email: '', subject: 'Internship Opportunity', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-24 border-t border-slate-200/60 overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center space-x-2 text-[11px] font-semibold tracking-widest text-slate-500 uppercase font-mono mb-8 md:mb-12">
        <span className="text-blue-600 font-bold">08</span>
        <span className="text-slate-400">—</span>
        <span>LET'S CONNECT</span>
      </div>

      {/* Banner Grid Container */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Decorative Radar Background Lines on the Right */}
        <div aria-hidden="true" className="absolute -right-20 -top-20 w-[480px] h-[480px] pointer-events-none hidden lg:block opacity-35">
          <div className="absolute inset-0 border border-slate-300 rounded-full" />
          <div className="absolute inset-12 border border-slate-200 rounded-full" />
          <div className="absolute inset-24 border border-slate-200 rounded-full" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-200" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-200" />
          <div className="absolute right-12 top-1/2 w-2.5 h-2.5 rounded-full bg-blue-600 -translate-y-1/2 shadow-xs" />
        </div>

        {/* Left Column: Display Headline */}
        <div className="lg:col-span-5 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            Have an interesting<br />
            <span className="text-blue-600">problem to solve?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal mt-4 leading-relaxed max-w-sm">
            Reach out directly for internships, agentic systems consulting, or open-source research collaborations.
          </p>

          {/* Quick copy email pill */}
          <div className="mt-4 pt-1">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-xs font-mono text-slate-700 border border-slate-200/80 transition-all cursor-pointer"
            >
              <span>{PORTFOLIO_INFO.email}</span>
              <span className="text-[10px] font-bold text-blue-600">
                {copiedEmail ? '✓ Copied' : 'Copy'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Pitch & Action Buttons */}
        <div className="lg:col-span-7 relative z-10 lg:pl-6">
          <h3 className="text-base sm:text-xl font-extrabold text-slate-950 leading-snug">
            Let's build something extraordinary.
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 mb-6 leading-relaxed max-w-lg">
            Open to internship opportunities, collaborative research, and production AI engineering.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 text-white text-xs md:text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
            >
              <span>{showForm ? 'Hide Message Form' : 'Send a Message'}</span>
              <span className="text-xs leading-none group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <a
              href={PORTFOLIO_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs md:text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-2xs hover:-translate-y-0.5"
            >
              <span>LinkedIn</span>
              <span className="text-xs leading-none">↗</span>
            </a>

            <a
              href={PORTFOLIO_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs md:text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-2xs hover:-translate-y-0.5"
            >
              <span>GitHub</span>
              <span className="text-xs leading-none">↗</span>
            </a>
          </div>

          {/* Interactive In-App Contact Message Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="mt-8 p-6 sm:p-7 bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-xl max-w-lg"
              >
                {isSubmitted ? (
                  <div className="py-6 text-center text-slate-900">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl shadow-2xs">
                      ✓
                    </div>
                    <h4 className="font-bold text-base">Note Sent!</h4>
                    <p className="text-xs text-slate-500 mt-1">Thank you {formData.name}, I will reply to {formData.email} promptly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1 font-mono">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Chen"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1 font-mono">Your Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1 font-mono">Subject / Topic</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white transition-all"
                      >
                        <option value="Internship Opportunity">Internship Opportunity (Summer / Fall)</option>
                        <option value="Agentic AI Collaboration">Agentic AI Collaboration</option>
                        <option value="Full-Stack Engineering Role">Full-Stack Engineering Role</option>
                        <option value="General Inquiries">General Inquiries / Coffee Chat</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-slate-700 font-mono">Message</label>
                        <span className="text-[10px] font-mono text-slate-400">{formData.message.length}/500</span>
                      </div>
                      <textarea
                        required
                        rows={3}
                        maxLength={500}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hi Adina, I'm reaching out regarding an internship opportunity in Agentic AI..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={`mailto:${PORTFOLIO_INFO.email}?subject=${encodeURIComponent(formData.subject)}`}
                        className="text-[11px] text-blue-600 hover:underline font-mono"
                      >
                        Open mail client ↗
                      </a>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
