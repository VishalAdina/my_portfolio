import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PipelineArchitectureSectionProps {
  onInspectNode: (nodeId: string) => void;
}

export const PipelineArchitectureSection: React.FC<PipelineArchitectureSectionProps> = ({ onInspectNode }) => {
  const [simulationStep, setSimulationStep] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedSample, setSelectedSample] = useState(0);

  const sampleQueries = [
    {
      title: 'Maritime Hazard Scan (ORCA)',
      query: 'Scan coastal vector 09 for maritime hazards and compute safe trajectory',
      steps: [
        'Client dispatches signed geospatial coordinates (16.544° N, 81.521° E)...',
        'FastAPI API Gateway validates token & assigns task ID #orch-8891...',
        'LangGraph Supervisor receives telemetry & awakens Hazard + Bathymetry agents...',
        'Agents query PostGIS geospatial boundaries & satellite weather vectors in parallel...',
        'Groq LPU evaluates trajectory in 18ms; Celery registers audit log to PostgreSQL...',
        'Deterministic clearance granted: "SAFETY NOMINAL" streamed back via SSE!'
      ]
    },
    {
      title: 'Hybrid Knowledge Retrieval (KnowledgeOS)',
      query: 'What are the fault tolerance invariants for distributed consensus nodes?',
      steps: [
        'User query enters Next.js streaming interface with session authentication...',
        'Backend generates dense embedding via text-embedding-3 & sparse BM25 tokens...',
        'Qdrant performs reciprocal rank fusion across 1.2M vector chunks...',
        'Cohere v3 cross-encoder neural reranker filters top 5 grounded contexts...',
        'RAGAS guardrail computes 0.94 faithfulness score; checks context hallucination...',
        'Verified answer with citation links delivered in 340ms to client!'
      ]
    },
    {
      title: 'Tool Execution via MCP Protocol (MCP Server)',
      query: 'Execute read-only SQL analysis on active user transactions pool',
      steps: [
        'AI agent issues Model Context Protocol tool execution request: "database_query"...',
        'FastAPI MCP Server checks JSONSchema contract and execution permissions...',
        'Tool sandbox enforces EXPLAIN plan & read-only AST parser verification...',
        'Async connection pool acquires PostgreSQL replica lock & executes query...',
        'Result rows serialized into clean JSON payload with schema headers...',
        'Tool response returned to agent reasoning loop (HTTP 200 OK, 12ms)!'
      ]
    }
  ];

  const currentSample = sampleQueries[selectedSample];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);

    const delays = [700, 1400, 2100, 2900, 3700];
    delays.forEach((delay, index) => {
      setTimeout(() => {
        setSimulationStep(index + 1);
        if (index === delays.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setSimulationStep(null);
          }, 2200);
        }
      }, delay);
    });
  };

  return (
    <section id="my-project-architecture" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-24 border-t border-slate-200/60">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
        <div className="flex items-center space-x-2 text-[11px] font-semibold tracking-widest text-slate-500 uppercase font-mono">
          <span className="text-blue-600 font-bold">06</span>
          <span className="text-slate-400">—</span>
          <span>MY PROJECT ARCHITECTURE</span>
        </div>
        <div className="text-xs font-semibold tracking-widest text-slate-500 uppercase font-mono">
          AGENTIC RAG + FULL-STACK ARCHITECTURE
        </div>
      </div>

      {/* Section Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.08]">
            From Query<br />
            to Actionable<br />
            <span className="text-blue-600">Results.</span>
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal max-w-sm">
            A production-grade agentic RAG pipeline integrating full-stack, RAG and real-world tools.
          </p>

          {/* Scenario Selector */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
              Select Execution Pipeline Scenario:
            </span>
            <div className="flex flex-col gap-1.5">
              {sampleQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedSample(idx);
                    setSimulationStep(null);
                    setIsSimulating(false);
                  }}
                  className={`text-left text-xs p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedSample === idx
                      ? 'bg-blue-50/80 border-blue-400 text-blue-900 font-bold shadow-2xs'
                      : 'bg-white border-slate-200/80 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="truncate">{item.title}</span>
                  <span className="text-[10px] font-mono text-slate-400 ml-2">Trace ⚡</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Button & Status */}
          <div className="pt-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-xs md:text-sm shadow-md transition-all cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${
                isSimulating
                  ? 'bg-blue-600 text-white animate-pulse'
                  : 'bg-slate-950 text-white hover:bg-slate-800'
              }`}
            >
              <span>{isSimulating ? 'Simulating Pipeline Steps...' : 'Simulate Query Flow'}</span>
              <span className="text-xs">⚡</span>
            </button>
          </div>

          {/* Real-time Step Feedback Console */}
          <AnimatePresence>
            {simulationStep !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-4 rounded-2xl bg-slate-950 text-white shadow-xl border border-slate-800 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    STEP 0{simulationStep + 1} OF 06
                  </span>
                  <span>{simulationStep < 5 ? 'PROCESSING' : 'COMPLETED'}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {currentSample.steps[simulationStep]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Architecture Pipeline Visual Flow */}
        <div className="lg:col-span-7 w-full overflow-x-auto pb-4">
          <div className="relative min-w-[700px] p-7 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)]">
            {/* Dynamic SVG Connector Overlay with Animated Pulse Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="flow-blue-arrow-modern" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 2 L 7 5 L 0 8 z" fill="#2563EB" />
                </marker>
              </defs>

              {/* User to Frontend */}
              <path
                d="M 108 100 L 140 100"
                fill="none"
                stroke={simulationStep === 0 ? '#2563EB' : '#93C5FD'}
                strokeWidth={simulationStep === 0 ? '3' : '1.75'}
                strokeDasharray="4 4"
                className={simulationStep === 0 ? 'animate-flow-dash' : ''}
                markerEnd="url(#flow-blue-arrow-modern)"
              />

              {/* Frontend to Backend */}
              <path
                d="M 235 100 L 260 100"
                fill="none"
                stroke={simulationStep === 1 ? '#2563EB' : '#3B82F6'}
                strokeWidth={simulationStep === 1 ? '3' : '1.75'}
                markerEnd="url(#flow-blue-arrow-modern)"
              />

              {/* Backend to Agentic AI Layer (Branches Up) */}
              <path
                d="M 300 70 L 300 38 Q 300 38 322 38"
                fill="none"
                stroke={simulationStep === 2 ? '#2563EB' : '#3B82F6'}
                strokeWidth={simulationStep === 2 ? '3' : '1.75'}
                markerEnd="url(#flow-blue-arrow-modern)"
              />

              {/* Backend to Data Layer (Branches Down) */}
              <path
                d="M 300 130 L 300 160 Q 300 160 322 160"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1.75"
                markerEnd="url(#flow-blue-arrow-modern)"
              />

              {/* Agentic Layer to Backend (Two-way interaction line) */}
              <path
                d="M 405 68 L 405 100 L 348 100"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1.75"
                markerEnd="url(#flow-blue-arrow-modern)"
              />
              <path d="M 405 100 L 405 132" fill="none" stroke="#3B82F6" strokeWidth="1.75" />

              {/* Agentic AI Layer to Tools & Integrations */}
              <path
                d="M 470 38 L 498 38"
                fill="none"
                stroke={simulationStep === 3 ? '#2563EB' : '#60A5FA'}
                strokeWidth={simulationStep === 3 ? '3' : '1.5'}
                strokeDasharray="4 4"
                className={simulationStep === 3 ? 'animate-flow-dash' : ''}
              />
            </svg>

            {/* Flow Nodes Grid Container */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              {/* Node 1: User */}
              <button
                onClick={() => onInspectNode('user')}
                className={`flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white border shadow-2xs w-24 h-28 flex-shrink-0 transition-all cursor-pointer ${
                  simulationStep === 0
                    ? 'border-blue-500 ring-4 ring-blue-200/80 scale-105 shadow-md'
                    : 'border-slate-200/90 hover:border-blue-400 hover:shadow-xs'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-1">
                  <span className="material-symbols-outlined text-[24px]">person</span>
                </div>
                <span className="text-xs font-bold text-slate-900 leading-tight">User</span>
                <span className="text-[9px] text-slate-500 font-medium leading-tight mt-0.5">(Web / Mobile)</span>
              </button>

              {/* Node 2: Frontend */}
              <button
                onClick={() => onInspectNode('frontend')}
                className={`flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white border shadow-2xs w-24 h-20 flex-shrink-0 transition-all cursor-pointer ${
                  simulationStep === 1
                    ? 'border-blue-500 ring-4 ring-blue-200/80 scale-105 shadow-md'
                    : 'border-slate-200/90 hover:border-blue-400 hover:shadow-xs'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 leading-tight">Frontend</span>
                <span className="text-[9px] text-slate-500 font-medium leading-tight mt-1">(Next.js / React)</span>
              </button>

              {/* Node 3: Backend */}
              <button
                onClick={() => onInspectNode('backend')}
                className={`flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white border shadow-2xs w-24 h-20 flex-shrink-0 transition-all cursor-pointer ${
                  simulationStep === 2 || simulationStep === 5
                    ? 'border-blue-500 ring-4 ring-blue-200/80 scale-105 shadow-md'
                    : 'border-slate-200/90 hover:border-blue-400 hover:shadow-xs'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 leading-tight">Backend</span>
                <span className="text-[9px] text-slate-500 font-medium leading-tight mt-1">(FastAPI)</span>
              </button>

              {/* Middle Vertical Stack: Agentic AI Layer & Data Layer */}
              <div className="flex flex-col space-y-4 flex-shrink-0 w-36">
                {/* Node 4: Agentic AI Layer */}
                <button
                  onClick={() => onInspectNode('agentic')}
                  className={`flex items-center gap-2 p-2.5 rounded-2xl bg-white border shadow-2xs transition-all cursor-pointer ${
                    simulationStep === 2 || simulationStep === 3
                      ? 'border-blue-500 ring-4 ring-blue-200/80 scale-105 shadow-md bg-blue-50/50'
                      : 'border-slate-200/90 hover:border-blue-400 hover:shadow-xs'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">flare</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 leading-tight">Agentic AI Layer</span>
                </button>

                {/* Node 5: Data Layer */}
                <button
                  onClick={() => onInspectNode('database')}
                  className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">database</span>
                  </div>
                  <div className="text-left leading-tight truncate">
                    <span className="text-[11px] font-bold text-slate-900 block">Data Layer</span>
                    <span className="text-[8px] text-slate-500 block truncate">(PostgreSQL / Vector DB)</span>
                  </div>
                </button>
              </div>

              {/* Right Panels: Tools & Integrations & Microservices */}
              <div className="flex flex-col space-y-3 flex-1 min-w-[210px]">
                {/* Container 1: Tools & Integrations */}
                <div
                  className={`bg-white rounded-2xl border p-3 shadow-2xs transition-all ${
                    simulationStep === 3
                      ? 'border-blue-500 ring-4 ring-blue-200/80 shadow-md'
                      : 'border-slate-200/80'
                  }`}
                >
                  <span className="text-[10px] font-bold text-slate-900 block mb-2 font-mono">Tools &amp; Integrations</span>
                  <div className="flex items-center justify-between gap-1">
                    {/* LLMs */}
                    <button
                      onClick={() => onInspectNode('llms')}
                      className="flex flex-col items-center justify-center text-center flex-1 hover:text-blue-600 cursor-pointer group"
                    >
                      <span className="material-symbols-outlined text-blue-600 text-lg group-hover:scale-110 transition-transform">auto_awesome</span>
                      <span className="text-[9px] font-semibold text-slate-700 mt-1">LLMs</span>
                    </button>
                    {/* Memory */}
                    <button
                      onClick={() => onInspectNode('memory')}
                      className="flex flex-col items-center justify-center text-center flex-1 hover:text-blue-600 cursor-pointer group"
                    >
                      <span className="material-symbols-outlined text-blue-600 text-lg group-hover:scale-110 transition-transform">cloud</span>
                      <span className="text-[9px] font-semibold text-slate-700 mt-1">Memory</span>
                    </button>
                    {/* Knowledge Base */}
                    <button
                      onClick={() => onInspectNode('knowledge')}
                      className="flex flex-col items-center justify-center text-center flex-1 hover:text-blue-600 cursor-pointer group"
                    >
                      <span className="material-symbols-outlined text-blue-600 text-lg group-hover:scale-110 transition-transform">layers</span>
                      <span className="text-[9px] font-semibold text-slate-700 mt-1 leading-tight">Knowledge Base</span>
                    </button>
                  </div>
                </div>

                {/* Container 2: Microservices & External APIs */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-2xs flex items-center justify-between gap-2">
                  {/* Microservices (Celery) */}
                  <button
                    onClick={() => onInspectNode('microservices')}
                    className="flex items-center gap-2 flex-1 hover:opacity-80 transition-opacity cursor-pointer text-left"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold font-mono text-xs">
                      p
                    </div>
                    <div className="text-left leading-tight truncate">
                      <span className="text-[10px] font-bold text-slate-900 block truncate">Microservices</span>
                      <span className="text-[8px] text-slate-500 block truncate">(Celery)</span>
                    </div>
                  </button>

                  {/* External APIs */}
                  <button
                    onClick={() => onInspectNode('external')}
                    className="flex items-center gap-2 flex-1 justify-end hover:opacity-80 transition-opacity cursor-pointer text-right"
                  >
                    <span className="material-symbols-outlined text-blue-600 text-lg flex-shrink-0">api</span>
                    <div className="text-left leading-tight truncate">
                      <span className="text-[10px] font-bold text-slate-900 block truncate">External APIs</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
