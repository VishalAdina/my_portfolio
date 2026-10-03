import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const TechStackSection: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const techNotes: Record<string, string> = {
    Python: 'Primary language for AI agents, RAG pipelines, FastAPI services, and LangGraph multi-agent supervisors.',
    TypeScript: 'Strict type safety across Next.js frontends, React UI components, and API client contracts.',
    React: 'Modern component architecture, custom hooks, real-time SSE streaming listeners, and virtualized lists.',
    'Next.js': 'App Router, SSR, edge caching, and enterprise SaaS customer portals.',
    'Tailwind CSS': 'Utility-first clean design system adhering to strict typography and spacing scale.',
    FastAPI: 'High-throughput async endpoints, Pydantic v2 data validation, and OpenAPI documentation.',
    LangGraph: 'Stateful multi-agent cycles with deterministic supervisor decision nodes and memory checkpoints.',
    pgvector: 'Vector similarity search directly inside PostgreSQL databases with IVFFlat and HNSW indexes.',
    Qdrant: 'Distributed vector database powering hybrid dense/sparse search and payload filtering.',
    PostgreSQL: 'Primary transactional database for multi-tenant SaaS, Prisma models, and execution audits.',
    Redis: 'Sub-millisecond semantic caching and Celery message broking.',
    Celery: 'Distributed asynchronous task queues for document ingestion and heavy model inferencing.',
    Java: 'Enterprise object-oriented design and distributed algorithms foundations.',
    Vercel: 'Continuous integration and edge deployment for responsive web frontends.',
    GitHub: 'Version control, automated CI/CD actions, and open-source contributions.'
  };

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI Engineering' },
    { id: 'infra', label: 'Infrastructure' }
  ];

  return (
    <section id="tech-stack" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-24 border-t border-slate-200/60">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
        <div className="flex items-center space-x-2 text-[11px] font-semibold tracking-widest text-slate-500 uppercase font-mono">
          <span className="text-blue-600 font-bold">05</span>
          <span className="text-slate-400">—</span>
          <span>TECH STACK</span>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100/80 rounded-xl text-xs font-medium border border-slate-200/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'text-slate-950 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="techCatTab"
                  className="absolute inset-0 bg-white rounded-lg shadow-2xs -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tech Note Banner (Interactive Feedback) */}
      <AnimatePresence>
        {selectedTech && techNotes[selectedTech] && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-4 rounded-2xl bg-blue-50/90 border border-blue-200 shadow-sm flex items-center justify-between text-xs text-blue-950 backdrop-blur-xs"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping flex-shrink-0" />
              <div>
                <span className="font-extrabold text-blue-700 font-mono text-sm">{selectedTech}</span>
                <span className="text-slate-700 ml-2 font-medium">{techNotes[selectedTech]}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedTech(null)}
              className="text-slate-400 hover:text-slate-700 font-bold px-2 py-1 rounded-md hover:bg-white/60 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5 Column Grid of Tech Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Languages */}
        {(activeCategory === 'all' || activeCategory === 'languages') && (
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm md:text-base font-bold text-slate-900">Languages</h3>
                <span className="text-[10px] font-mono text-slate-400">6 tools</span>
              </div>
              <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                {/* Java */}
                <div
                  onClick={() => setSelectedTech('Java')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M8.6 17.2c-.8.2-1.3.5-1.3.8 0 .6 2 .9 4.7.9 2.6 0 4.7-.3 4.7-.9 0-.4-.5-.7-1.3-.8" stroke="#EA2D2E" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M9.5 14.5c-1.2.3-2 .7-2 1.2 0 .9 2.9 1.4 6.5 1.4 3.6 0 6.5-.5 6.5-1.4 0-.5-.8-.9-2-1.2" stroke="#EA2D2E" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M13 3c1 1.5 0 3-1 4.5s1 2.5 2 4c.8-1.5.5-2.8-.5-3.8 1.5.5 2-1 1-2.5-.5-.8-.5-1.5-1.5-2.2z" fill="#007396" />
                      <path d="M10.5 5.5c.8 1.2 0 2.4-.8 3.6s.8 2 1.6 3.2c.6-1.2.4-2.2-.4-3 1.2.4 1.6-.8.8-2-.4-.6-.4-1.2-1.2-1.8z" fill="#EA2D2E" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Java</span>
                </div>

                {/* Python */}
                <div
                  onClick={() => setSelectedTech('Python')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-6 h-6" viewBox="0 0 128 128">
                      <path fill="#387EB8" d="M63.5 4.2c-15.6 0-25.2 6.8-25.2 19.8v14.5h25.8v3.6H25.3C11.5 42.1 0 51.5 0 68.3s10 26.2 23.3 26.2h7.9v-11.7c0-15.2 13-25.5 28.5-25.5h25.2V42.1c0-13.6-11.8-24.1-25.2-24.1H64c.2-.2.3-.4.3-.6-.6-7.8-7.3-13.2-14.8-13.2h14zM47.7 15.3c2.9 0 5.2 2.3 5.2 5.2s-2.3 5.2-5.2 5.2-5.2-2.3-5.2-5.2 2.3-5.2 5.2-5.2z" />
                      <path fill="#FFE052" d="M64.5 123.8c15.6 0 25.2-6.8 25.2-19.8V89.5H63.9v-3.6h38.8c13.8 0 25.3-9.4 25.3-26.2s-10-26.2-23.3-26.2h-7.9v11.7c0 15.2-13 25.5-28.5 25.5H43.1v15.2c0 13.6 11.8 24.1 25.2 24.1H64c-.2.2-.3.4-.3.6.6 7.8 7.3 13.2 14.8 13.2h-14zm15.8-11.1c-2.9 0-5.2-2.3-5.2-5.2s2.3-5.2 5.2-5.2 5.2 2.3 5.2 5.2-2.3 5.2-5.2 5.2z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Python</span>
                </div>

                {/* JavaScript */}
                <div
                  onClick={() => setSelectedTech('JavaScript')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 bg-[#F7DF1E] rounded-md flex items-end justify-end p-0.5 shadow-2xs">
                      <span className="font-black text-slate-900 text-[10px] leading-none tracking-tighter">JS</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">JavaScript</span>
                </div>

                {/* TypeScript */}
                <div
                  onClick={() => setSelectedTech('TypeScript')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 bg-[#3178C6] rounded-md flex items-end justify-end p-0.5 shadow-2xs">
                      <span className="font-bold text-white text-[10px] leading-none tracking-tighter">TS</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">TypeScript</span>
                </div>

                {/* C# */}
                <div
                  onClick={() => setSelectedTech('C#')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded-full bg-[#178600] flex items-center justify-center text-white shadow-2xs">
                      <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none">
                        <path d="M16 3L27.25 9.5V22.5L16 29L4.75 22.5V9.5L16 3Z" fill="#178600" stroke="#239120" strokeWidth="1.5" />
                        <path d="M14.5 12.5C13.5 13.5 13 14.7 13 16s.5 2.5 1.5 3.5l1.2-1.2c-.6-.6-.9-1.4-.9-2.3s.3-1.7.9-2.3l-1.2-1.2z" fill="white" />
                        <path d="M18 13.5h1.2v1.5H18v1.5h1.2v1.5H18V20h-1v-2H15.5v2h-1v-2H13.2v-1.5H14.5v-1.5H13.2v-1.5H14.5V12h1v1.5H17V12h1v1.5z" fill="white" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">C#</span>
                </div>

                {/* SQL */}
                <div
                  onClick={() => setSelectedTech('SQL')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold text-xs shadow-2xs">
                      SQL
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">SQL</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card 2: Frontend */}
        {(activeCategory === 'all' || activeCategory === 'frontend') && (
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm md:text-base font-bold text-slate-900">Frontend</h3>
                <span className="text-[10px] font-mono text-slate-400">6 tools</span>
              </div>
              <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                {/* React */}
                <div
                  onClick={() => setSelectedTech('React')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-7 h-7 text-[#00D8FF] animate-spin" style={{ animationDuration: '14s' }} viewBox="0 0 115 102" fill="none">
                      <ellipse cx="57.5" cy="51" rx="16" ry="48" stroke="currentColor" strokeWidth="6" transform="rotate(30 57.5 51)" />
                      <ellipse cx="57.5" cy="51" rx="16" ry="48" stroke="currentColor" strokeWidth="6" transform="rotate(90 57.5 51)" />
                      <ellipse cx="57.5" cy="51" rx="16" ry="48" stroke="currentColor" strokeWidth="6" transform="rotate(150 57.5 51)" />
                      <circle cx="57.5" cy="51" r="9" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">React</span>
                </div>

                {/* Next.js */}
                <div
                  onClick={() => setSelectedTech('Next.js')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center font-black text-xs shadow-2xs">
                      N
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Next.js</span>
                </div>

                {/* Tailwind CSS */}
                <div
                  onClick={() => setSelectedTech('Tailwind CSS')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-7 h-7" viewBox="0 0 48 48" fill="none">
                      <path d="M24 16c-4.4 0-7.2 2.2-8.4 6.6 1.8-2.2 4-3 6.6-2.4 1.5.3 2.6 1.4 3.8 2.6C28 24.8 30.4 27.2 36 27.2c4.4 0 7.2-2.2 8.4-6.6-1.8 2.2-4 3-6.6 2.4-1.5-.3-2.6-1.4-3.8-2.6C32 18.4 29.6 16 24 16zm-12 11.2c-4.4 0-7.2 2.2-8.4 6.6 1.8-2.2 4-3 6.6-2.4 1.5.3 2.6 1.4 3.8 2.6C16 36 18.4 38.4 24 38.4c4.4 0 7.2-2.2 8.4-6.6-1.8 2.2-4 3-6.6 2.4-1.5-.3-2.6-1.4-3.8-2.6C20 29.6 17.6 27.2 12 27.2z" fill="#38BDF8" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Tailwind CSS</span>
                </div>

                {/* Vite */}
                <div
                  onClick={() => setSelectedTech('Vite')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
                      <path d="M29.5 5.5L16.5 28.5 3.5 5.5l14 2 12-2z" fill="url(#vite-grad-modern)" />
                      <path d="M17 3l-6 12h4.5l-2.5 8 9-14H17.5L20 3z" fill="#FFD62E" />
                      <defs>
                        <linearGradient id="vite-grad-modern" x1="3.5" y1="5.5" x2="29.5" y2="28.5" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#41D1FF" />
                          <stop offset="1" stopColor="#BD34FE" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Vite</span>
                </div>

                {/* HTML */}
                <div className="flex flex-col items-center justify-center text-center cursor-pointer group">
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded bg-[#E34F26] text-white flex items-center justify-center font-black text-[9px] shadow-2xs">
                      HTML
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">HTML</span>
                </div>

                {/* CSS */}
                <div className="flex flex-col items-center justify-center text-center cursor-pointer group">
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded bg-[#1572B6] text-white flex items-center justify-center font-black text-[9px] shadow-2xs">
                      CSS
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">CSS</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card 3: Backend */}
        {(activeCategory === 'all' || activeCategory === 'backend') && (
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm md:text-base font-bold text-slate-900">Backend</h3>
                <span className="text-[10px] font-mono text-slate-400">6 tools</span>
              </div>
              <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                {/* FastAPI */}
                <div
                  onClick={() => setSelectedTech('FastAPI')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded-full bg-[#059669] flex items-center justify-center text-white shadow-2xs">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2L3 13.5h7V22l9-11.5h-7L12 2z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">FastAPI</span>
                </div>

                {/* SQLAlchemy */}
                <div
                  onClick={() => setSelectedTech('SQLAlchemy')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded-full bg-[#0288D1] flex items-center justify-center text-white font-bold text-xs shadow-2xs relative overflow-hidden">
                      <span className="font-black text-sm tracking-tighter">Q</span>
                      <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-[#D71F00] rounded-full" />
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">SQLAlchemy</span>
                </div>

                {/* Celery */}
                <div
                  onClick={() => setSelectedTech('Celery')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded-full bg-[#37814A] flex items-center justify-center text-white shadow-2xs">
                      <span className="w-3.5 h-3.5 border-2 border-white rounded-full block" />
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Celery</span>
                </div>

                {/* REST APIs */}
                <div className="flex flex-col items-center justify-center text-center cursor-pointer group">
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded-lg border-2 border-slate-900 flex items-center justify-center font-bold text-slate-900 shadow-2xs">
                      <span className="material-symbols-outlined text-[16px]">search</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">REST APIs</span>
                </div>

                {/* Prisma */}
                <div
                  onClick={() => setSelectedTech('Prisma')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L4 18h14L12 2z" stroke="#1B222D" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M12 2l6 16 2-5L12 2z" fill="#1B222D" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Prisma</span>
                </div>

                {/* Spring Boot */}
                <div
                  onClick={() => setSelectedTech('Spring Boot')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded-full bg-[#6DB33F] flex items-center justify-center text-white shadow-2xs">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Spring Boot</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card 4: AI Engineering */}
        {(activeCategory === 'all' || activeCategory === 'ai') && (
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm md:text-base font-bold text-slate-900">AI Engineering</h3>
                <span className="text-[10px] font-mono text-slate-400">5 tools</span>
              </div>
              <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                {/* LangChain */}
                <div
                  onClick={() => setSelectedTech('LangGraph')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 flex items-center justify-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <path d="M7 16c-2.5 0-4-1.5-4-4s1.5-4 4-4c1.8 0 3.2.9 3.8 2.2L12 9l1.2 1.2C13.8 8.9 15.2 8 17 8c2.5 0 4 1.5 4 4s-1.5 4-4 4c-1.8 0-3.2-.9-3.8-2.2L12 15l-1.2-1.2C10.2 15.1 8.8 16 7 16z" fill="#687028" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">LangChain</span>
                </div>

                {/* Agentic AI */}
                <div
                  onClick={() => setSelectedTech('LangGraph')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-emerald-600 group-hover:scale-125 transition-transform duration-200">
                    <span className="material-symbols-outlined text-[20px]">all_inclusive</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Agentic AI</span>
                </div>

                {/* RAG */}
                <div
                  onClick={() => setSelectedTech('Qdrant')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-blue-600 group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm0 2.2l5.7 3.2L12 10.6 6.3 7.4 12 4.2zM6 9.4l5 2.8v6.2l-5-2.8V9.4zm7 9v-6.2l5-2.8v6.2l-5 2.8z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">RAG</span>
                </div>

                {/* pgvector */}
                <div
                  onClick={() => setSelectedTech('pgvector')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-2xs">
                      <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">pgvector</span>
                </div>

                {/* Evaluations */}
                <div className="flex flex-col items-center justify-center text-center cursor-pointer group">
                  <div className="w-8 h-8 flex items-center justify-center text-purple-600 group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3L2 8l10 5 10-5-10-5zm-8 7.3l8 4 8-4v2.5l-8 4-8-4v-2.5zm0 4.5l8 4 8-4v2.5l-8 4-8-4v-2.5z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Evaluations</span>
                </div>

                {/* Placeholder slot to maintain balance */}
                <div className="flex flex-col items-center justify-center text-center opacity-0 pointer-events-none">
                  <div className="w-8 h-8" />
                  <span className="text-[11px] mt-2">-</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card 5: Infrastructure */}
        {(activeCategory === 'all' || activeCategory === 'infra') && (
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm md:text-base font-bold text-slate-900">Infrastructure</h3>
                <span className="text-[10px] font-mono text-slate-400">5 tools</span>
              </div>
              <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                {/* PostgreSQL */}
                <div
                  onClick={() => setSelectedTech('PostgreSQL')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-7 h-7 rounded-md bg-[#008BB9] flex items-center justify-center text-white shadow-2xs">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c2.76 0 5 2.24 5 5 0 1.25-.46 2.4-1.22 3.28l1.43 1.43-1.41 1.41-1.43-1.43C13.49 15.46 12.8 16 12 16c-2.76 0-5-2.24-5-5s2.24-5 5-5z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">PostgreSQL</span>
                </div>

                {/* Redis */}
                <div
                  onClick={() => setSelectedTech('Redis')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-[#D82C20] group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm0 2.2l5.7 3.2L12 10.6 6.3 7.4 12 4.2zM6 9.4l5 2.8v6.2l-5-2.8V9.4zm7 9v-6.2l5-2.8v6.2l-5 2.8z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Redis</span>
                </div>

                {/* Placeholder */}
                <div className="flex flex-col items-center justify-center text-center opacity-0 pointer-events-none">
                  <div className="w-8 h-8" />
                  <span className="text-[11px] mt-2">-</span>
                </div>

                {/* Vercel */}
                <div
                  onClick={() => setSelectedTech('Vercel')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-6 h-6 fill-current text-slate-900" viewBox="0 0 116 100">
                      <path d="M57.5 0L115 100H0L57.5 0z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Vercel</span>
                </div>

                {/* Render */}
                <div className="flex flex-col items-center justify-center text-center cursor-pointer group">
                  <div className="w-8 h-8 flex items-center justify-center text-[#46E3B7] group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-6 h-6 fill-current text-blue-500" viewBox="0 0 24 24">
                      <path d="M12 2l2.4 5.2 5.6.8-4 4.1.9 5.7-4.9-2.7-4.9 2.7.9-5.7-4-4.1 5.6-.8L12 2z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">Render</span>
                </div>

                {/* GitHub */}
                <div
                  onClick={() => setSelectedTech('GitHub')}
                  className="flex flex-col items-center justify-center text-center cursor-pointer group"
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <svg className="w-6 h-6 fill-current text-slate-900" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-2 group-hover:text-blue-600 transition-colors">GitHub</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
