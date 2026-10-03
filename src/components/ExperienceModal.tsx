import React from 'react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-slate-200 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 19h16v2H4zm3-4h2v3H7zm4-7h2v10h-2zm4-4h2v14h-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-950 tracking-tight">{EXPERIENCE_DATA.company}</h3>
              <p className="text-xs sm:text-sm font-bold text-blue-600">{EXPERIENCE_DATA.role}</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{EXPERIENCE_DATA.period}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="pt-5 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2">
              Overview &amp; Product Scope
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {EXPERIENCE_DATA.summary}
            </p>
          </div>

          {/* Key Deliverables */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2">
              Core Responsibilities &amp; Achievements
            </h4>
            <ul className="space-y-2">
              {EXPERIENCE_DATA.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4 Pillars Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2">
              Domain Competencies Applied
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPERIENCE_DATA.domains.map((dom) => (
                <div key={dom.number} className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                  <div className="text-blue-600 font-mono font-bold text-xs">{dom.number}. {dom.title}</div>
                  <ul className="mt-1.5 space-y-1 text-[11px] text-slate-600">
                    {dom.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-400" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2">
              Stack Utilized
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {EXPERIENCE_DATA.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
