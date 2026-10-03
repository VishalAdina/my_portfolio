import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

interface ExperienceSectionProps {
  onOpenExperienceDetails: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenExperienceDetails }) => {
  return (
    <section id="experience" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-24 border-t border-slate-200/60">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <div className="flex items-center space-x-2 text-[11px] font-semibold tracking-widest text-slate-500 uppercase font-mono">
          <span className="text-blue-600 font-bold">04</span>
          <span className="text-slate-400">—</span>
          <span>EXPERIENCE</span>
        </div>
        <button
          onClick={onOpenExperienceDetails}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors tracking-wider uppercase font-mono cursor-pointer"
        >
          <span>VIEW FULL EXPERIENCE</span>
          <span className="text-sm leading-none">→</span>
        </button>
      </div>

      {/* Experience Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Company & Role Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col justify-start space-y-4"
        >
          <div className="flex items-start gap-4">
            {/* Pynyx Blue Logo Icon */}
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(37,99,235,0.25)] text-white">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 19h16v2H4zm3-4h2v3H7zm4-7h2v10h-2zm4-4h2v14h-2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-tight">
                  {EXPERIENCE_DATA.company}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  KaliganAI
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-1">{EXPERIENCE_DATA.role}</h4>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{EXPERIENCE_DATA.period}</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-normal pt-1 max-w-sm">
            {EXPERIENCE_DATA.summary}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 my-1">
            <div>
              <div className="text-base font-black text-slate-950 font-mono">60+</div>
              <div className="text-[9px] text-slate-500 font-medium">AI Employees</div>
            </div>
            <div>
              <div className="text-base font-black text-slate-950 font-mono">&lt;350ms</div>
              <div className="text-[9px] text-slate-500 font-medium">Response Latency</div>
            </div>
            <div>
              <div className="text-base font-black text-slate-950 font-mono">Multi-tenant</div>
              <div className="text-[9px] text-slate-500 font-medium">Postgres + RAG</div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenExperienceDetails}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-xs hover:shadow-md cursor-pointer group"
            >
              <span>View Details</span>
              <span className="text-xs leading-none group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </motion.div>

        {/* Right 4 Focus Area Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPERIENCE_DATA.domains.map((domain, index) => (
            <motion.div
              key={domain.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={onOpenExperienceDetails}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div>
                <div className="text-2xl font-black text-blue-600 font-mono tracking-tight leading-none mb-3 group-hover:scale-105 transition-transform origin-left">
                  {domain.number}
                </div>
                <h5 className="text-sm font-bold text-slate-950 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                  {domain.title}
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {domain.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0 group-hover:bg-blue-500 transition-colors" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>Domain Spec</span>
                <span>↗</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
