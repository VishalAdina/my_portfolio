import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const AllProjectsModal: React.FC<AllProjectsModalProps> = ({ isOpen, onClose, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'agentic' | 'rag' | 'fullstack'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = PROJECTS.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-slate-200 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-semibold tracking-widest text-slate-500 uppercase font-mono">
              <span>PROJECT CATALOG</span>
            </div>
            <h3 className="text-2xl font-black text-slate-950 tracking-tight mt-1">All Selected Projects</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Filters & Search */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium w-full sm:w-auto">
            {(['all', 'agentic', 'rag'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer capitalize ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Projects' : cat === 'agentic' ? 'Agentic AI' : 'RAG Platforms'}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by tool or tag (e.g. FastAPI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Project Grid */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                onClose();
                onSelectProject(proj);
              }}
              className="p-5 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer bg-slate-50/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-base text-slate-950">{proj.title}</h4>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    {proj.category.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{proj.subtitle}</p>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{proj.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {proj.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] text-slate-500 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-blue-600">View Deep Dive →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
