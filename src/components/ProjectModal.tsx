import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'code'>('overview');
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (!project.codeSnippet) return;
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-slate-200/90"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {project.category.toUpperCase()} SYSTEM
              </span>
              <span className="text-xs text-slate-400 font-mono">Production Grade</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">{project.title}</h3>
            <h4 className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">{project.subtitle}</h4>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 pt-4 pb-2 border-b border-slate-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Overview &amp; Highlights
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            System Architecture
          </button>
          {project.codeSnippet && (
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Code Implementation
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="py-5 space-y-6">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {project.description}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                {project.stats.map((stat, idx) => (
                  <div key={idx} className="text-center sm:text-left">
                    <div className="text-base font-black text-slate-900 leading-tight font-mono">{stat.label}</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">{stat.sublabel}</div>
                  </div>
                ))}
              </div>

              {/* Key Highlights */}
              <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 font-mono">
                  Key Engineering Highlights
                </h5>
                <ul className="space-y-2">
                  {project.highlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Tags */}
              <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 font-mono">
                  Stack &amp; Ecosystem
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-100 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'architecture' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-mono font-bold text-blue-600 uppercase block mb-1.5">
                  Architectural Blueprint
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {project.architectureDetails}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2 text-xs text-slate-600">
                <span className="font-bold text-slate-900 block font-mono">Production Guarantees:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="font-bold text-slate-800 block">Deterministic Routing</span>
                    <span>State transitions strictly constrained with fallback recovery.</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="font-bold text-slate-800 block">Observability</span>
                    <span>OpenTelemetry tracing on every agent tool invocation.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'code' && project.codeSnippet && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-600 font-bold">
                  {project.codeSnippet.filename}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-mono text-slate-700 transition-colors cursor-pointer"
                >
                  {copied ? '✓ Copied' : 'Copy Snippet'}
                </button>
              </div>
              <pre className="p-4 bg-slate-950 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </motion.div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-100">
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
              >
                <span>GitHub Repository</span>
                <span className="text-xs">↗</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
