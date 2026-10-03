import React from 'react';
import { PORTFOLIO_INFO, EXPERIENCE_DATA, PROJECTS, ACHIEVEMENTS_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-slate-200 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-semibold text-slate-600">Resume Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="pt-6 space-y-6 text-slate-800">
          {/* Header */}
          <div className="text-center sm:text-left border-b border-slate-100 pb-5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
              {PORTFOLIO_INFO.name}
            </h1>
            <p className="text-sm font-bold text-blue-600 mt-0.5">
              Full-Stack Agentic AI Engineer &amp; CSIT Student
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 font-mono">
              <span>{PORTFOLIO_INFO.email}</span>
              <span>·</span>
              <a href={PORTFOLIO_INFO.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                GitHub: adinavishal
              </a>
              <span>·</span>
              <a href={PORTFOLIO_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                LinkedIn: adinavishal
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2 font-mono">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              Full-Stack Engineer with specialization in Agentic AI, LangGraph multi-agent workflows, and production RAG pipelines.
              Experienced building resilient backend systems with FastAPI and PostgreSQL, and intuitive streaming React interfaces.
              Passionate about shipping autonomous AI systems from prototype to production.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3 font-mono">
              Work Experience
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{EXPERIENCE_DATA.company}</h3>
                    <p className="text-xs font-semibold text-slate-700">{EXPERIENCE_DATA.role}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{EXPERIENCE_DATA.period}</span>
                </div>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                  {EXPERIENCE_DATA.details.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3 font-mono">
              Key Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-slate-900">{proj.title}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{proj.tags.slice(0, 3).join(', ')}</span>
                  </div>
                  <p className="text-slate-600 mt-0.5">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2 font-mono">
              Education
            </h2>
            <div className="flex items-start justify-between text-xs">
              <div>
                <h3 className="font-bold text-slate-900">{PORTFOLIO_INFO.university}</h3>
                <p className="text-slate-600">{PORTFOLIO_INFO.degree}</p>
              </div>
              <span className="font-mono text-slate-500">2025 - 2029 (Expected)</span>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2 font-mono">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900">Languages:</span> Python, TypeScript, JavaScript, Java, C#, SQL
              </div>
              <div>
                <span className="font-bold text-slate-900">AI &amp; Agents:</span> LangGraph, LangChain, MCP Protocol, RAGAS, pgvector, Qdrant
              </div>
              <div>
                <span className="font-bold text-slate-900">Frameworks:</span> FastAPI, React, Next.js, Tailwind CSS, Express
              </div>
              <div>
                <span className="font-bold text-slate-900">Databases &amp; Infra:</span> PostgreSQL, Redis, Celery, Docker, Vercel, GitHub Actions
              </div>
            </div>
          </div>

          {/* Honors & Achievements */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2 font-mono">
              Honors &amp; Certifications
            </h2>
            <ul className="space-y-1 text-xs text-slate-600">
              {ACHIEVEMENTS_DATA.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">{item.title} — {item.organization}</span>
                  <span className="font-mono text-slate-500">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
