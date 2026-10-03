import type { Project } from '../../types';
import { Icon } from './Icon';
import { cn } from '../../lib/cn';

/**
 * Per-project "specimen" panels — a stylised glimpse of what each system does.
 * Pure markup and CSS (no images, no canvas) so they cost nothing to load and
 * stay crisp at any density.
 */
export function ProjectPreview({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      className={cn(
        'relative aspect-4/3 w-full overflow-hidden border border-line-2 bg-surface',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(212,255,79,0.07),transparent_65%)]"
      />
      <div aria-hidden="true" className="bg-technical-grid absolute inset-0 opacity-40" />

      {project.id === 'mcp-server' && <McpSpecimen />}
      {project.id === 'orca' && <OrcaSpecimen />}
      {project.id === 'knowledge-os' && <RagSpecimen />}
    </div>
  );
}

function SpecimenChrome({ label, status }: { label: string; status: string }) {
  return (
    <div className="relative z-10 flex items-center justify-between border-b border-line px-5 py-3.5">
      <span className="flex items-center gap-2.5">
        <span className="size-1.5 rounded-full bg-accent" />
        <span className="font-mono text-[0.625rem] tracking-[0.14em] text-fg-2 uppercase">
          {label}
        </span>
      </span>
      <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-fg-3 uppercase">
        {status}
      </span>
    </div>
  );
}

/* ── MCP Server: tool execution log ─────────────────────────────────── */
function McpSpecimen() {
  const lines = [
    ['→', 'tools/list', 'stdio'],
    ['←', '10 schemas', '4ms'],
    ['→', 'tools/call database_query', 'pg-ro'],
    ['·', 'json schema validation', 'pass'],
    ['·', 'read-only ast guard', 'pass'],
    ['←', 'rows: 128', '12ms'],
  ] as const;

  return (
    <>
      <SpecimenChrome label="mcp_server.py" status="200 OK" />
      <div className="relative z-10 space-y-2.5 p-5 font-mono text-[0.6875rem]">
        {lines.map(([glyph, text, meta], i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-fg-3"
            style={{ animation: `fade-slide 0.5s ${0.12 * i}s both` }}
          >
            <span className="w-3 shrink-0 text-accent">{glyph}</span>
            <span className="truncate text-fg-2">{text}</span>
            <span className="ml-auto shrink-0 text-[0.5625rem] tracking-[0.1em] text-fg-3 uppercase">
              {meta}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-line px-5 py-3">
        <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-fg-3 uppercase">
          Sandbox
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[0.5625rem] tracking-[0.14em] text-accent uppercase">
          <span className="animate-pulse-dot size-1.5 rounded-full bg-accent" />
          Deterministic recovery
        </span>
      </div>
    </>
  );
}

/* ── ORCA: radar sweep + fix ────────────────────────────────────────── */
function OrcaSpecimen() {
  return (
    <>
      <SpecimenChrome label="orca_maritime_os" status="8 agents synced" />
      <div className="relative z-10 grid grid-cols-2 items-center gap-4 p-5">
        <div className="relative mx-auto aspect-square w-full max-w-[9.5rem]">
          {[100, 72, 44].map((size) => (
            <span
              key={size}
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-3"
              style={{ width: `${size}%`, height: `${size}%` }}
            />
          ))}
          <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px bg-line" />
          <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-line" />
          <span
            aria-hidden="true"
            className="animate-radar absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(212,255,79,0.28), transparent 28%, transparent 100%)',
            }}
          />
          <span className="absolute top-[38%] left-[62%] size-1.5 rounded-full bg-accent" />
        </div>

        <dl className="space-y-3 font-mono text-[0.625rem]">
          {[
            ['vector', 'COASTAL_09'],
            ['lat', '16.544° N'],
            ['lng', '81.521° E'],
            ['status', 'SAFETY NOMINAL'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="tracking-[0.14em] text-fg-3 uppercase">{k}</dt>
              <dd className="mt-0.5 text-fg-2">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}

/* ── KnowledgeOS: retrieval pipeline ────────────────────────────────── */
function RagSpecimen() {
  const stages = [
    { label: 'Dense + BM25', value: '1.2M chunks' },
    { label: 'RRF fusion', value: 'k=60' },
    { label: 'Cohere rerank', value: 'top 5' },
    { label: 'RAGAS guardrail', value: '0.94' },
  ];

  return (
    <>
      <SpecimenChrome label="knowledge_os.pipeline" status="v2.4 prod" />
      <div className="relative z-10 space-y-px p-5">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-3 py-2.5">
            <span className="label w-5 shrink-0 text-fg-3">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-mono text-[0.6875rem] text-fg-2">{stage.label}</span>
            <span className="mx-2 h-px flex-1 bg-line" />
            <span className="font-mono text-[0.625rem] text-accent">{stage.value}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 border-t border-line px-5 py-3 font-mono text-[0.625rem] text-fg-3">
        <Icon name="check" size={12} className="text-accent" />
        Grounded answer + citations · 340ms
      </div>
    </>
  );
}
