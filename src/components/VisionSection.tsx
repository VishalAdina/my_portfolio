import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface VisionSectionProps {
  onScrollToProjects: () => void;
  onInspectNode: (nodeId: string) => void;
}

export const VisionSection: React.FC<VisionSectionProps> = ({ onScrollToProjects, onInspectNode }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section id="architecture" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-24 border-t border-slate-200/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline, Description & Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-center space-y-6"
        >
          {/* Section Identifier */}
          <div className="flex items-center space-x-2 text-[11px] font-semibold tracking-widest text-slate-500 uppercase font-mono">
            <span className="text-blue-600 font-bold">02</span>
            <span className="text-slate-400">—</span>
            <span>FULL-STACK AGENTIC AI ENGINEER</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-[1.08] uppercase">
            I BUILD INTELLIGENT SOFTWARE SYSTEMS THAT MOVE FROM <span className="text-blue-600">IDEAS TO PRODUCTION.</span>
          </h2>

          {/* Subtitle Description */}
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal max-w-md">
            Building reliable backend systems and integrating agentic architecture.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onScrollToProjects}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-950 text-white text-xs md:text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
            >
              <span>View My Work</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href={PORTFOLIO_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs md:text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </div>

          {/* Quick interactive hint */}
          <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Interactive Diagram: click any component to inspect implementation</span>
          </div>
        </motion.div>

        {/* Right Column: Interactive / High-Fidelity Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 w-full overflow-x-auto pb-4"
        >
          <div className="relative min-w-[580px] p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)]">
            {/* Dynamic SVG Connector Overlay with Animated Pulse Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563EB" />
                </marker>
                <marker id="arrow-blue-muted" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#60A5FA" />
                </marker>
              </defs>

              {/* User to Backend line */}
              <path d="M 235 90 L 235 130" fill="none" stroke="#2563EB" strokeWidth="1.75" markerEnd="url(#arrow-blue)" />
              {/* User to Frontend line */}
              <path d="M 235 105 L 125 105 L 125 130" fill="none" stroke="#2563EB" strokeWidth="1.75" markerEnd="url(#arrow-blue)" />

              {/* Frontend to Backend */}
              <path d="M 175 178 L 195 178" fill="none" stroke="#2563EB" strokeWidth="1.75" markerEnd="url(#arrow-blue)" />

              {/* Backend to Agentic AI Layer */}
              <path d="M 285 178 L 305 178" fill="none" stroke="#2563EB" strokeWidth="1.75" markerEnd="url(#arrow-blue)" />

              {/* Agentic Layer to Right Stack (LLMs, Tools, Memory, RAG) with animated flow */}
              <path d="M 395 160 L 440 160" fill="none" stroke="#3b82f6" strokeWidth="1.75" strokeDasharray="4 4" className="animate-flow-dash" markerEnd="url(#arrow-blue-muted)" />
              <path d="M 395 170 L 415 170 L 415 95 L 440 95" fill="none" stroke="#3b82f6" strokeWidth="1.75" strokeDasharray="4 4" className="animate-flow-dash" markerEnd="url(#arrow-blue-muted)" />
              <path d="M 395 180 L 415 180 L 415 228 L 440 228" fill="none" stroke="#3b82f6" strokeWidth="1.75" strokeDasharray="4 4" className="animate-flow-dash" markerEnd="url(#arrow-blue-muted)" />
              <path d="M 395 190 L 405 190 L 405 295 L 440 295" fill="none" stroke="#3b82f6" strokeWidth="1.75" strokeDasharray="4 4" className="animate-flow-dash" markerEnd="url(#arrow-blue-muted)" />

              {/* Backend to Database & Cache */}
              <path d="M 235 220 L 235 250 L 125 250 L 125 272" fill="none" stroke="#2563EB" strokeWidth="1.75" markerEnd="url(#arrow-blue)" />
              <path d="M 235 220 L 235 272" fill="none" stroke="#2563EB" strokeWidth="1.75" markerEnd="url(#arrow-blue)" />

              {/* Agentic AI Layer to Microservices & External Services */}
              <path d="M 345 225 L 345 272" fill="none" stroke="#2563EB" strokeWidth="1.75" markerEnd="url(#arrow-blue)" />
              <path d="M 360 225 L 360 250 L 450 250 L 450 272" fill="none" stroke="#2563EB" strokeWidth="1.75" markerEnd="url(#arrow-blue)" />
            </svg>

            <div className="relative z-10 flex flex-col space-y-6">
              {/* Top Layer: User Node */}
              <div className="flex justify-start pl-36">
                <button
                  onClick={() => onInspectNode('user')}
                  onMouseEnter={() => setHoveredNode('user')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer text-left group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-none group-hover:text-blue-600 transition-colors">User</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-none mt-1">(Web / Mobile)</div>
                  </div>
                </button>
              </div>

              {/* Middle Main Row: Frontend -> Backend -> Agentic AI Layer -> Vertical Side Stack */}
              <div className="flex items-center justify-between gap-3">
                {/* Frontend Card */}
                <button
                  onClick={() => onInspectNode('frontend')}
                  onMouseEnter={() => setHoveredNode('frontend')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="w-24 h-22 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center p-2 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-blue-600 text-xl group-hover:scale-110 transition-transform">web</span>
                  <span className="text-[11px] font-bold text-slate-900 mt-1 leading-tight group-hover:text-blue-600">Frontend</span>
                  <span className="text-[9px] text-slate-500 font-medium">(Next.js / React)</span>
                </button>

                {/* Backend Card */}
                <button
                  onClick={() => onInspectNode('backend')}
                  onMouseEnter={() => setHoveredNode('backend')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="w-24 h-22 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center p-2 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-blue-600 text-xl group-hover:scale-110 transition-transform">terminal</span>
                  <span className="text-[11px] font-bold text-slate-900 mt-1 leading-tight group-hover:text-blue-600">Backend</span>
                  <span className="text-[9px] text-slate-500 font-medium">(FastAPI / APIs)</span>
                </button>

                {/* Agentic AI Layer Card (Prominent Center Piece) */}
                <button
                  onClick={() => onInspectNode('agentic')}
                  onMouseEnter={() => setHoveredNode('agentic')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="relative w-28 h-26 rounded-2xl bg-white border-2 border-blue-400 shadow-[0_4px_20px_rgba(37,99,235,0.15)] flex flex-col items-center justify-center text-center p-2.5 bg-gradient-to-b from-white to-blue-50/70 hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(37,99,235,0.22)] transition-all cursor-pointer group"
                >
                  <div className="absolute -top-2.5 px-2 py-0.5 bg-blue-600 text-white text-[8px] font-mono font-bold rounded-full uppercase tracking-wider shadow-2xs">
                    Core Engine
                  </div>
                  <span className="material-symbols-outlined text-blue-600 text-2xl group-hover:rotate-12 transition-transform">auto_awesome</span>
                  <span className="text-xs font-black text-slate-950 mt-1 leading-snug">Agentic AI Layer</span>
                  <span className="text-[8px] text-blue-600 font-semibold mt-0.5 font-mono">inspect →</span>
                </button>

                {/* Vertical Stack (LLMs, Tools, Memory, RAG) */}
                <div className="flex flex-col space-y-2 min-w-[145px]">
                  {/* LLMs */}
                  <button
                    onClick={() => onInspectNode('llms')}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-xs hover:-translate-x-0.5 transition-all cursor-pointer text-left group"
                  >
                    <span className="material-symbols-outlined text-blue-600 text-lg group-hover:scale-110 transition-transform">cloud</span>
                    <div className="text-left leading-tight">
                      <span className="text-[11px] font-bold text-slate-900 block group-hover:text-blue-600">LLMs</span>
                      <span className="text-[9px] text-slate-500 block">(Gemini / Groq)</span>
                    </div>
                  </button>
                  {/* Tools */}
                  <button
                    onClick={() => onInspectNode('tools')}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-xs hover:-translate-x-0.5 transition-all cursor-pointer text-left group"
                  >
                    <span className="material-symbols-outlined text-blue-600 text-lg group-hover:scale-110 transition-transform">build_circle</span>
                    <div className="text-left leading-tight">
                      <span className="text-[11px] font-bold text-slate-900 block group-hover:text-blue-600">Tools</span>
                      <span className="text-[9px] text-slate-500 block">(APIs / MCP)</span>
                    </div>
                  </button>
                  {/* Memory */}
                  <button
                    onClick={() => onInspectNode('memory')}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-xs hover:-translate-x-0.5 transition-all cursor-pointer text-left group"
                  >
                    <span className="material-symbols-outlined text-blue-600 text-lg group-hover:scale-110 transition-transform">dataset</span>
                    <div className="text-left leading-tight">
                      <span className="text-[11px] font-bold text-slate-900 block group-hover:text-blue-600">Memory</span>
                      <span className="text-[9px] text-slate-500 block">(Vector DB)</span>
                    </div>
                  </button>
                  {/* Knowledge Base */}
                  <button
                    onClick={() => onInspectNode('knowledge')}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-xs hover:-translate-x-0.5 transition-all cursor-pointer text-left group"
                  >
                    <span className="material-symbols-outlined text-blue-600 text-lg group-hover:scale-110 transition-transform">menu_book</span>
                    <div className="text-left leading-tight">
                      <span className="text-[11px] font-bold text-slate-900 block group-hover:text-blue-600">Knowledge Base</span>
                      <span className="text-[9px] text-slate-500 block">(RAG)</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Bottom Row: Infrastructure & Services */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                {/* Database */}
                <button
                  onClick={() => onInspectNode('database')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer text-left group"
                >
                  <span className="material-symbols-outlined text-blue-600 text-lg flex-shrink-0 group-hover:scale-110 transition-transform">database</span>
                  <div className="text-left leading-tight truncate">
                    <span className="text-[11px] font-bold text-slate-900 block truncate group-hover:text-blue-600">Database</span>
                    <span className="text-[9px] text-slate-500 block truncate">(PostgreSQL)</span>
                  </div>
                </button>

                {/* Cache */}
                <button
                  onClick={() => onInspectNode('cache')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer text-left group"
                >
                  <span className="material-symbols-outlined text-blue-600 text-lg flex-shrink-0 group-hover:scale-110 transition-transform">layers</span>
                  <div className="text-left leading-tight truncate">
                    <span className="text-[11px] font-bold text-slate-900 block truncate group-hover:text-blue-600">Cache</span>
                    <span className="text-[9px] text-slate-500 block truncate">(Redis)</span>
                  </div>
                </button>

                {/* Microservices */}
                <button
                  onClick={() => onInspectNode('microservices')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer text-left group"
                >
                  <span className="material-symbols-outlined text-blue-600 text-lg flex-shrink-0 group-hover:scale-110 transition-transform">hub</span>
                  <div className="text-left leading-tight truncate">
                    <span className="text-[11px] font-bold text-slate-900 block truncate group-hover:text-blue-600">Microservices</span>
                    <span className="text-[9px] text-slate-500 block truncate">(Celery)</span>
                  </div>
                </button>

                {/* External Services */}
                <button
                  onClick={() => onInspectNode('external')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer text-left group"
                >
                  <span className="material-symbols-outlined text-blue-600 text-lg flex-shrink-0 group-hover:scale-110 transition-transform">link</span>
                  <div className="text-left leading-tight truncate">
                    <span className="text-[11px] font-bold text-slate-900 block truncate group-hover:text-blue-600">External</span>
                    <span className="text-[9px] text-slate-500 block truncate">(3rd Party APIs)</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
