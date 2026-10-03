import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
  onViewAllProjects: () => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  const [filter, setFilter] = useState<'all' | 'agentic' | 'rag'>('all');
  const [mcpExecuted, setMcpExecuted] = useState(false);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const handleTestMcp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMcpExecuted(true);
    setTimeout(() => setMcpExecuted(false), 2200);
  };

  return (
    <section id="projects" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-24 border-t border-slate-200/60">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
        <div className="flex items-center space-x-2 text-[11px] font-semibold tracking-widest text-slate-500 uppercase font-mono">
          <span className="text-blue-600 font-bold">03</span>
          <span className="text-slate-400">—</span>
          <span>SELECTED WORK</span>
        </div>

        {/* Filter controls + View All Link */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl text-xs font-medium border border-slate-200/60">
            {(['all', 'agentic', 'rag'] as const).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setFilter(tabKey)}
                className={`relative px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                  filter === tabKey
                    ? 'text-slate-950 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter === tabKey && (
                  <motion.div
                    layoutId="projectTab"
                    className="absolute inset-0 bg-white rounded-lg shadow-2xs -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span>{tabKey === 'all' ? 'All Projects' : tabKey === 'agentic' ? 'Agentic Systems' : 'RAG & Data'}</span>
              </button>
            ))}
          </div>

          <button
            onClick={onViewAllProjects}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors tracking-wider uppercase font-mono cursor-pointer ml-2"
          >
            <span>VIEW ALL</span>
            <span className="text-sm leading-none">→</span>
          </button>
        </div>
      </div>

      {/* 3 Project Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectProject(project)}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.08)] hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div>
                {/* Card Preview Visual */}
                <div className="p-3.5 pb-0">
                  {/* Card 1: MCP Server Mockup */}
                  {project.id === 'mcp-server' && (
                    <div className="w-full h-48 rounded-2xl bg-gradient-to-tr from-sky-100 via-blue-50 to-indigo-100 border border-slate-200/60 overflow-hidden relative p-3 flex flex-col justify-between shadow-inner">
                      {/* Mockup Header */}
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 bg-white/85 backdrop-blur-xs rounded-t-xl px-2.5 py-1.5 shadow-2xs">
                        <div className="flex items-center space-x-1.5">
                          <div className="w-2 h-2 rounded-full bg-slate-300" />
                          <div className="w-2 h-2 rounded-full bg-slate-200" />
                          <div className="w-2 h-2 rounded-full bg-slate-200" />
                          <span className="text-[9px] font-mono font-bold text-slate-700 ml-1.5">mcp-server-core</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-emerald-50 text-emerald-600 border border-emerald-200 font-semibold">
                          active
                        </span>
                      </div>

                      {/* Mockup Body */}
                      <div className="grid grid-cols-12 gap-2 mt-2 flex-1">
                        <div className="col-span-4 bg-white/90 rounded-lg p-2 space-y-1.5 shadow-2xs border border-slate-100 text-[8px] font-mono text-slate-500">
                          <div className="font-bold text-blue-600">TOOLS</div>
                          <div className="h-1.5 w-12 bg-blue-500 rounded" />
                          <div className="h-1.5 w-9 bg-slate-200 rounded" />
                          <div className="h-1.5 w-11 bg-slate-200 rounded" />
                        </div>
                        <div className="col-span-8 bg-white/95 rounded-lg p-2 space-y-2 shadow-2xs border border-slate-100 flex flex-col justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] font-mono font-bold text-slate-700">EXECUTION POOL</span>
                              <span className="text-[8px] font-mono text-emerald-600 font-bold">READY</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded" />
                            <div className="h-1.5 w-4/5 bg-slate-100 rounded" />
                          </div>

                          <div
                            onClick={handleTestMcp}
                            className={`rounded-lg p-1.5 flex items-center justify-between text-[8px] font-mono font-semibold transition-all cursor-pointer ${
                              mcpExecuted ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            <span>{mcpExecuted ? '✓ Tool Executed (14ms)' : 'POST /tools/execute'}</span>
                            <span>{mcpExecuted ? '200 OK' : 'EXECUTE'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card 2: ORCA Maritime OS Mockup */}
                  {project.id === 'orca' && (
                    <div className="w-full h-48 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative p-3 flex flex-col justify-between shadow-inner">
                      {/* Glowing Ocean Grid Effect */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/60 via-slate-950 to-slate-950" />
                      
                      {/* Rotating Radar Sweep */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                        <div className="w-36 h-36 rounded-full border border-teal-500/30 relative animate-radar">
                          <div className="absolute top-1/2 left-1/2 w-18 h-[1px] bg-gradient-to-r from-teal-400 to-transparent origin-left" />
                        </div>
                      </div>

                      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid-orca-modern" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#14b8a6" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-orca-modern)" />
                        <circle cx="150" cy="75" r="4" fill="#2dd4bf" className="animate-ping" />
                        <circle cx="150" cy="75" r="3" fill="#2dd4bf" />
                      </svg>

                      {/* Mockup Header */}
                      <div className="relative z-10 flex items-center justify-between border-b border-teal-500/20 pb-2 px-1">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                          <span className="text-[9px] font-mono font-bold text-teal-300">ORCA Maritime OS</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-teal-950 text-teal-400 border border-teal-800 font-semibold">
                          8 AGENTS SYNC
                        </span>
                      </div>

                      {/* Radar / Vector Data Overlay */}
                      <div className="relative z-10 flex items-end justify-between mt-4 text-[8px] font-mono text-slate-300">
                        <div className="bg-slate-900/90 backdrop-blur-xs p-1.5 rounded-lg border border-teal-500/30 space-y-0.5">
                          <div className="text-teal-400 font-bold">COASTAL_VECTOR_09</div>
                          <div>LAT: 16.544° N | LNG: 81.521° E</div>
                        </div>
                        <div className="bg-teal-500/20 text-teal-300 px-2 py-1 rounded-lg border border-teal-400/40 font-bold">
                          SAFETY: NOMINAL
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card 3: KnowledgeOS Mockup */}
                  {project.id === 'knowledge-os' && (
                    <div className="w-full h-48 rounded-2xl bg-gradient-to-tr from-slate-100 via-sky-50 to-blue-100 border border-slate-200/60 overflow-hidden relative p-3 flex flex-col justify-between shadow-inner">
                      {/* Dashboard Pipeline View */}
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 bg-white/85 backdrop-blur-xs rounded-t-xl px-2.5 py-1.5 shadow-2xs">
                        <div className="flex items-center space-x-1.5">
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                          <span className="text-[9px] font-mono font-bold text-slate-800">KnowledgeOS // RAG Platform</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                          v2.4 Prod
                        </span>
                      </div>

                      {/* RAG Pipeline Nodes */}
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="bg-white/95 rounded-lg p-1.5 text-center border border-slate-200/60 shadow-2xs">
                          <div className="text-[8px] font-mono text-slate-500">HYBRID SEARCH</div>
                          <div className="text-[10px] font-bold text-blue-600 mt-0.5 font-mono">98.4% Acc</div>
                        </div>
                        <div className="bg-white/95 rounded-lg p-1.5 text-center border border-slate-200/60 shadow-2xs">
                          <div className="text-[8px] font-mono text-slate-500">RERANKING</div>
                          <div className="text-[10px] font-bold text-emerald-600 mt-0.5 font-mono">Cohere v3</div>
                        </div>
                        <div className="bg-white/95 rounded-lg p-1.5 text-center border border-slate-200/60 shadow-2xs">
                          <div className="text-[8px] font-mono text-slate-500">EVALUATION</div>
                          <div className="text-[10px] font-bold text-indigo-600 mt-0.5 font-mono">Ragas 0.92</div>
                        </div>
                      </div>

                      {/* Bottom Terminal bar */}
                      <div className="bg-slate-900 text-white rounded-lg p-1.5 text-[8px] font-mono flex items-center justify-between mt-1">
                        <span className="text-emerald-400">✓ Qdrant Hybrid Index synced</span>
                        <span className="text-slate-400">18ms</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Header Info */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <h4 className="text-xs font-semibold text-slate-800 mt-0.5 leading-snug">
                        {project.subtitle}
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:rotate-45">
                      <span className="text-sm leading-none font-bold">↗</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium text-blue-700 bg-blue-50/80 border border-blue-100/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="px-6 py-4 border-t border-slate-100 grid grid-cols-3 gap-2 bg-slate-50/60">
                {project.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-sm font-bold text-slate-900 leading-tight font-mono">{stat.label}</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                      {stat.sublabel}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
