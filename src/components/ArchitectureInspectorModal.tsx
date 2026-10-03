import React from 'react';
import { ARCHITECTURE_NODES } from '../data/portfolioData';

interface ArchitectureInspectorModalProps {
  nodeId: string | null;
  onClose: () => void;
}

export const ArchitectureInspectorModal: React.FC<ArchitectureInspectorModalProps> = ({ nodeId, onClose }) => {
  if (!nodeId) return null;
  const node = ARCHITECTURE_NODES[nodeId] || {
    id: nodeId,
    label: nodeId.toUpperCase(),
    sublabel: 'Component',
    type: 'service',
    description: 'Component architecture node in the full-stack agentic system.',
    tech: ['Python', 'FastAPI', 'React']
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                ARCHITECTURE NODE // {node.type.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-950 mt-1">{node.label}</h3>
            <span className="text-xs text-slate-500 font-medium">{node.sublabel}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs text-slate-600">
          <div>
            <span className="font-bold text-slate-900 block mb-1">Architecture Implementation:</span>
            <p className="leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {node.description}
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-900 block mb-1.5">Stack &amp; Protocols:</span>
            <div className="flex flex-wrap gap-1.5">
              {node.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium text-[11px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
