import {
  Project,
  ExperienceRole,
  Achievement,
  ArchitectureNode,
  TechItem,
  TechCategory,
  EducationEntry,
  NavSection,
} from '../types';

/* ============================================================================
   IDENTITY
   ========================================================================= */

export const PORTFOLIO_INFO = {
  name: 'Adina Vishal',
  shortName: 'Adina',
  role: 'Full-Stack Agentic AI Engineer',
  education: "SRKR'29 | CSIT",
  university: 'SRKR Engineering College',
  degree: 'B.Tech in Computer Science and Information Technology',
  email: 'adinavishal59@gmail.com',
  github: 'https://github.com/adinavishal',
  linkedin: 'https://linkedin.com/in/adinavishal',
  tagline:
    'I build full-stack applications and intelligent systems with a focus on RAG, AI agents, and scalable backend architecture.',
  headline: 'I BUILD INTELLIGENT SOFTWARE SYSTEMS THAT MOVE FROM IDEAS TO PRODUCTION.',
  availability: 'Open to internships',
  currentRole: 'AI-powered systems @ Pynyx',
  location: 'India',
  /**
   * Portrait resolution order. Drop `public/portrait.jpg` into the repo and it
   * is picked up automatically — no code change required. If every source
   * fails, a designed typographic monogram is rendered instead.
   */
  portraitSources: [
    '/portrait.jpg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDGw9EW5kjn1wjH9Ftr5YRApSuG25bmdsYPD9FJBlZXbw0BLVCpizEC-6okcaeBN19GywnjANp0OT1y5DHGUV10rvfTF1IbacLgJB6uP2XtQDko1eq5E61iCBhb_OfHrD9MiHdOu6zqd9WuDSJ5AZbrFoF-4E1TkoFV0VeMMhhz84LO9fBIxnKnHhi29dmD-7LhGhd0tw1fOzGUgM4J54xvKPrJr7y3tlwiepG6-JgN0JEPXfJ9huBJNcBpmg14S2N-H4M',
  ],
  /** Ordered sections — drives the navbar and the scroll-spy. */
  sections: [
    { id: 'about', label: 'About', index: '01' },
    { id: 'projects', label: 'Projects', index: '02' },
    { id: 'experience', label: 'Experience', index: '03' },
    { id: 'tech-stack', label: 'Skills', index: '04' },
    { id: 'architecture', label: 'Architecture', index: '05', aliases: ['my-project-architecture'] },
    { id: 'achievements', label: 'Achievements', index: '06' },
    { id: 'contact', label: 'Contact', index: '07' },
  ] satisfies NavSection[],
};

/* ============================================================================
   PROJECTS
   ========================================================================= */

export const PROJECTS: Project[] = [
  {
    id: 'mcp-server',
    title: 'MCP Server',
    subtitle: 'Model Context Protocol Server',
    description:
      'A modular MCP server enabling AI agents to securely connect with real-world tools, APIs and internal data sources.',
    category: 'agentic',
    tags: ['FastAPI', 'A2A', 'APIs', 'MCP', 'Tools', 'Memory'],
    stats: [
      { label: '10+', sublabel: 'MCP Tools' },
      { label: 'Tool Integrations', sublabel: 'APIs & Services' },
      { label: 'Production Ready', sublabel: 'Modular Architecture' },
    ],
    githubUrl: 'https://github.com/adinavishal/mcp-server',
    demoUrl: '#',
    highlights: [
      'Standardized Model Context Protocol (MCP) server implementation for bidirectional agent tool execution',
      'Sandboxed tool execution environment with rate limiting and deterministic error recovery',
      'Dynamic schema generation allowing LLMs to discover tools on the fly without prompt bloat',
      'Integrated stateful memory buffer for context retention across multi-turn agent execution loops',
    ],
    architectureDetails:
      'FastAPI microservice communicating over standard stdio and SSE transport protocols. Features dynamic tool registry, JSONSchema contract validation, and asynchronous execution worker pool.',
    codeSnippet: {
      filename: 'mcp_server.py',
      language: 'python',
      code: `@server.tool(name="database_query", description="Execute read-only SQL queries on operational DB")
async def execute_query(sql: str, ctx: Context) -> ToolResult:
    """Safe analytical query tool with automatic EXPLAIN guardrail"""
    if not is_read_only(sql):
        return ToolResult.error("Forbidden: Write statements disallowed")
    
    async with db_pool.acquire() as conn:
        records = await conn.fetch(sql)
        return ToolResult.success(data=serialize_rows(records))`,
    },
  },
  {
    id: 'orca',
    title: 'ORCA',
    subtitle: 'Marine Ecosystem Reasoning with Collaborative Agents',
    description:
      'Multi-agent platform for fishermen, researchers and coastal authorities with real-time data and safety reasoning.',
    category: 'agentic',
    tags: ['React', 'FastAPI', 'LangGraph', 'PostGIS', 'Gemini', 'Groq'],
    stats: [
      { label: '8', sublabel: 'Specialist Agents' },
      { label: 'Real-time', sublabel: 'Data Orchestration' },
      { label: 'Deterministic', sublabel: 'Safety Reasoning' },
    ],
    githubUrl: 'https://github.com/adinavishal/orca-marine-os',
    demoUrl: '#',
    highlights: [
      'Orchestrated 8 specialist autonomous agents (Weather, Bathymetry, Navigation, Hazard, Fish Zones, SOS, Regulatory, Fuel)',
      'Sub-second inference using Groq LPU and Gemini 1.5/2.0 Flash for multi-modal radar and satellite image analysis',
      'Geospatial boundary indexing using PostGIS to prevent trawling into marine protected sanctuaries and territorial borders',
      'Offline-first progressive sync for maritime vessels with high latency satellite data links',
    ],
    architectureDetails:
      'LangGraph hierarchical state graph with deterministic supervisor routing. Integrates Copernicus satellite streams, OpenWeather APIs, and real-time vessel telemetry over WebSockets.',
    codeSnippet: {
      filename: 'supervisor_graph.py',
      language: 'python',
      code: `class MarineState(TypedDict):
    coordinates: Tuple[float, float]
    vessel_id: str
    telemetry: VesselTelemetry
    hazard_alerts: List[Hazard]
    plan_route: Optional[Route]

workflow = StateGraph(MarineState)
workflow.add_node("weather_agent", analyze_weather)
workflow.add_node("hazard_detector", scan_maritime_hazards)
workflow.add_node("route_optimizer", calculate_optimal_path)
workflow.add_edge("weather_agent", "hazard_detector")
app = workflow.compile(checkpointer=MemorySaver())`,
    },
  },
  {
    id: 'knowledge-os',
    title: 'KnowledgeOS',
    subtitle: 'Production-Grade Agentic RAG Platform',
    description:
      'End-to-end RAG system with hybrid retrieval, reranking, evaluation and agentic workflows for private knowledge bases.',
    category: 'rag',
    tags: ['FastAPI', 'Qdrant DB', 'RAGAS', 'Observability', 'Guardrails'],
    stats: [
      { label: 'Hybrid', sublabel: 'Retrieval' },
      { label: 'Agentic', sublabel: 'Workflows' },
      { label: 'Evaluation', sublabel: 'Pipeline' },
    ],
    githubUrl: 'https://github.com/adinavishal/knowledge-os',
    demoUrl: '#',
    highlights: [
      'Dense + Sparse hybrid search combining Qdrant vector embeddings with BM25 keyword matching via Reciprocal Rank Fusion (RRF)',
      'Cohere v3 cross-encoder reranking stage reducing context hallucination by 42% on complex corporate manuals',
      'Automated RAGAS evaluation pipeline tracking Faithfulness, Answer Relevance, and Context Precision on every commit',
      'Self-corrective agentic loop: retrieves, critiques draft answer, and re-queries if confidence threshold < 0.85',
    ],
    architectureDetails:
      'Modular ingestion pipeline (Unstructured, LangChain) into Qdrant collection with payload filtering. FastAPI query engine with OpenTelemetry tracing and streaming SSE output.',
    codeSnippet: {
      filename: 'hybrid_retriever.py',
      language: 'python',
      code: `async def hybrid_retrieve(query: str, top_k: int = 5) -> List[Document]:
    # Parallel retrieval across dense and sparse indexes
    dense_task = qdrant.search_dense(query, limit=20)
    sparse_task = qdrant.search_sparse_bm25(query, limit=20)
    dense_hits, sparse_hits = await asyncio.gather(dense_task, sparse_task)
    
    # Reciprocal Rank Fusion
    fused_docs = rrf_merge(dense_hits, sparse_hits, k=60)
    
    # Cross-encoder neural rerank
    return await cohere_reranker.rerank(query=query, docs=fused_docs[:15], top_n=top_k)`,
    },
  },
];

/* ============================================================================
   EXPERIENCE + EDUCATION
   ========================================================================= */

export const EXPERIENCE_DATA: ExperienceRole = {
  company: 'Pynyx',
  role: 'Software Development Engineer Intern',
  period: '2026 (3 months · Remote)',
  location: 'Remote',
  summary:
    'Worked on KaliganAI — an enterprise AI employee platform supporting 60+ AI employees across chat and voice workflows.',
  details: [
    'Architected core multi-tenant backend infrastructure powering 60+ autonomous corporate agents.',
    'Engineered low-latency document processing and vector ingestion pipelines using pgvector and PostgreSQL.',
    'Implemented function calling and tool-use orchestrations connecting agents to internal ERPs, Slack, and email.',
    'Developed high-fidelity React interactive dashboards with role-based access control and real-time streaming chat.',
  ],
  domains: [
    {
      number: '01',
      title: 'Backend Engineering',
      points: ['Multi-tenant architecture', 'PostgreSQL + Prisma', 'Modular APIs'],
    },
    {
      number: '02',
      title: 'RAG Systems',
      points: ['Knowledge base pipelines', 'pgvector', 'Retrieval & chunking'],
    },
    {
      number: '03',
      title: 'AI Agents',
      points: ['Agent orchestration', 'Tool calling', 'Enterprise integrations'],
    },
    {
      number: '04',
      title: 'Product Engineering',
      points: ['React frontend', 'Authentication', 'API integrations'],
    },
  ],
  techStack: ['FastAPI', 'PostgreSQL', 'Prisma', 'pgvector', 'React', 'TypeScript', 'LangChain', 'Redis'],
};

export const EDUCATION_DATA: EducationEntry = {
  institution: PORTFOLIO_INFO.university,
  degree: PORTFOLIO_INFO.degree,
  short: PORTFOLIO_INFO.education,
  period: '2025 — 2029 (Expected)',
  location: 'Andhra Pradesh, India',
  focus: ['Data Structures & Algorithms', 'Database Systems', 'Deep Learning', 'Distributed Systems'],
  note: 'Coursework in Data Structures, Algorithms, Database Systems and Deep Learning, applied directly to production-grade agentic AI builds.',
};

export const EXPERIENCE_METRICS = [
  { value: '60+', label: 'AI Employees', sub: 'Shipped to production' },
  { value: '<350ms', label: 'Response Latency', sub: 'Streaming chat path' },
  { value: 'Multi-tenant', label: 'Postgres + RAG', sub: 'Tenant isolation' },
];

/* ============================================================================
   ACHIEVEMENTS
   ========================================================================= */

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'uobhav-2k25',
    title: '03rd Prize',
    organization: 'UOBHAV 2K25 Hackathon',
    icon: '🏆',
    isPrize: true,
    date: '2025',
    description:
      'Awarded 3rd prize among 120+ teams for building an autonomous crisis management agent network.',
  },
  {
    id: 'sih-2026',
    title: 'Participant',
    organization: 'Smart India Hackathon 2026',
    icon: 'verified',
    date: '2026',
    description: 'Selected for national-level innovation solving real-time marine safety challenges.',
  },
  {
    id: 'hackerrank-js',
    title: 'Certified JavaScript',
    organization: 'HackerRank',
    icon: 'star',
    date: '2025',
    description:
      'Demonstrated advanced mastery of asynchronous execution, event loops, and modern ES2022+ standards.',
  },
  {
    id: 'certifications',
    title: 'Certifications',
    organization: 'NPTEL · GFG · Others',
    icon: 'description',
    date: '2024 - 2026',
    description:
      'Completed verified coursework in Data Structures, Algorithms, Database Systems, and Deep Learning.',
  },
];

/* ============================================================================
   SKILLS — categories, index and per-technology notes
   ========================================================================= */

export const TECH_CATEGORIES: TechCategory[] = [
  { id: 'languages', label: 'Languages', caption: 'Core CS foundations' },
  { id: 'frontend', label: 'Frontend', caption: 'Interface engineering' },
  { id: 'backend', label: 'Backend & APIs', caption: 'Services that scale' },
  { id: 'agentic', label: 'Agentic AI', caption: 'Autonomous systems' },
  { id: 'rag', label: 'RAG & Evals', caption: 'Grounded, measured, safe' },
  { id: 'infra', label: 'Infra & Tooling', caption: 'Ship and operate' },
];

export const TECH_STACK: TechItem[] = [
  // Languages
  { name: 'Python', category: 'languages', abbr: 'PY', core: true },
  { name: 'TypeScript', category: 'languages', abbr: 'TS', core: true },
  { name: 'JavaScript', category: 'languages', abbr: 'JS', core: true },
  { name: 'SQL', category: 'languages', abbr: 'SQL' },
  { name: 'C', category: 'languages', abbr: 'C' },
  { name: 'Java', category: 'languages', abbr: 'JV' },

  // Frontend
  { name: 'React', category: 'frontend', abbr: 'RE', core: true },
  { name: 'Next.js', category: 'frontend', abbr: 'NX', core: true },
  { name: 'Tailwind CSS', category: 'frontend', abbr: 'TW', core: true },
  { name: 'Vite', category: 'frontend', abbr: 'VT' },
  { name: 'HTML5', category: 'frontend', abbr: 'H5' },
  { name: 'CSS3', category: 'frontend', abbr: 'C3' },

  // Backend & APIs
  { name: 'FastAPI', category: 'backend', abbr: 'FA', core: true },
  { name: 'REST APIs', category: 'backend', abbr: 'AP', core: true },
  { name: 'Celery', category: 'backend', abbr: 'CE', core: true },
  { name: 'SQLAlchemy', category: 'backend', abbr: 'SA' },
  { name: 'Prisma', category: 'backend', abbr: 'PR' },
  { name: 'Spring Boot', category: 'backend', abbr: 'SB' },

  // Agentic AI
  { name: 'LangGraph', category: 'agentic', abbr: 'LG', core: true },
  { name: 'LangChain', category: 'agentic', abbr: 'LC', core: true },
  { name: 'Agentic AI', category: 'agentic', abbr: 'AI', core: true },
  { name: 'Multi-Agent Systems', category: 'agentic', abbr: 'MA', core: true },
  { name: 'MCP Protocol', category: 'agentic', abbr: 'MC' },
  { name: 'Tool Calling', category: 'agentic', abbr: 'TC' },

  // RAG & Evals
  { name: 'RAG', category: 'rag', abbr: 'RG', core: true },
  { name: 'pgvector', category: 'rag', abbr: 'PV', core: true },
  { name: 'Qdrant', category: 'rag', abbr: 'QD' },
  { name: 'RAGAS Evals', category: 'rag', abbr: 'RA' },
  { name: 'Observability', category: 'rag', abbr: 'OB' },
  { name: 'Guardrails', category: 'rag', abbr: 'GR' },
  { name: 'AI Gateways', category: 'rag', abbr: 'GW' },

  // Infra & Tooling
  { name: 'PostgreSQL', category: 'infra', abbr: 'PG', core: true },
  { name: 'MySQL', category: 'infra', abbr: 'MY' },
  { name: 'Redis', category: 'infra', abbr: 'RD' },
  { name: 'Docker', category: 'infra', abbr: 'DK' },
  { name: 'Git & GitHub', category: 'infra', abbr: 'GT', core: true },
  { name: 'Postman', category: 'infra', abbr: 'PM' },
  { name: 'Vercel', category: 'infra', abbr: 'VC' },
  { name: 'Render', category: 'infra', abbr: 'RN' },
];

export const TECH_NOTES: Record<string, string> = {
  Python: 'Primary language for AI agents, RAG pipelines, FastAPI services, and LangGraph multi-agent supervisors.',
  TypeScript: 'Strict type safety across Next.js frontends, React UI components, and API client contracts.',
  JavaScript: 'Async execution, event loops, and modern ES2022+ language features.',
  SQL: 'Analytical and transactional query design, indexing strategy and query plan review.',
  C: 'Memory-level reasoning, pointers and algorithmic fundamentals.',
  Java: 'Enterprise object-oriented design and distributed algorithms foundations.',
  React: 'Modern component architecture, custom hooks, real-time SSE streaming listeners, and virtualized lists.',
  'Next.js': 'App Router, SSR, edge caching, and enterprise SaaS customer portals.',
  'Tailwind CSS': 'Utility-first clean design system adhering to strict typography and spacing scale.',
  Vite: 'Fast ESM dev server and optimized production bundling for React frontends.',
  HTML5: 'Semantic, accessible document structure as the base of every interface.',
  CSS3: 'Layout systems, container queries, and GPU-friendly motion.',
  FastAPI: 'High-throughput async endpoints, Pydantic v2 data validation, and OpenAPI documentation.',
  'REST APIs': 'Resource-oriented contract design, versioning, pagination and idempotency.',
  Celery: 'Distributed asynchronous task queues for document ingestion and heavy model inferencing.',
  SQLAlchemy: 'Typed ORM models and async sessions over PostgreSQL.',
  Prisma: 'Schema-first data modelling with generated, type-safe clients.',
  'Spring Boot': 'Java service scaffolding and dependency-injected application structure.',
  LangGraph: 'Stateful multi-agent cycles with deterministic supervisor decision nodes and memory checkpoints.',
  LangChain: 'Composable chains, retrievers, tools and structured output parsers.',
  'Agentic AI': 'Planning, tool use, self-critique and deterministic control flow wrapped around LLM reasoning.',
  'Multi-Agent Systems': 'Supervisor/worker topologies, hand-off contracts and shared state across specialist agents.',
  'MCP Protocol': 'Standardized Model Context Protocol servers exposing tools, resources and prompts to any agent.',
  'Tool Calling': 'JSONSchema-validated function calling with sandboxing, retries and permission scoping.',
  RAG: 'Hybrid dense + sparse retrieval, reranking and grounded generation over private knowledge bases.',
  pgvector: 'Vector similarity search directly inside PostgreSQL databases with IVFFlat and HNSW indexes.',
  Qdrant: 'Distributed vector database powering hybrid dense/sparse search and payload filtering.',
  'RAGAS Evals': 'Faithfulness, answer relevance and context precision scored on every pipeline change.',
  Observability: 'OpenTelemetry traces and spans across retrieval, tool calls and generation latency.',
  Guardrails: 'Input/output validation, PII redaction and confidence thresholds before anything ships.',
  'AI Gateways': 'Centralized routing, caching, rate limiting and budget control across model providers.',
  PostgreSQL: 'Primary transactional database for multi-tenant SaaS, Prisma models, and execution audits.',
  MySQL: 'Relational storage for structured application data and reporting workloads.',
  Redis: 'Sub-millisecond semantic caching and Celery message broking.',
  Docker: 'Reproducible container images for API, worker and vector service parity.',
  'Git & GitHub': 'Version control, automated CI/CD actions, and open-source contributions.',
  Postman: 'API collections, environment-driven testing and contract documentation.',
  Vercel: 'Continuous integration and edge deployment for responsive web frontends.',
  Render: 'Managed deployment for Python APIs and background workers.',
};

/** Flat list for the hero ticker. */
export const TECH_MARQUEE: string[] = TECH_STACK.filter((t) => t.core).map((t) => t.name);

/* ============================================================================
   SYSTEM ARCHITECTURE — inspectable nodes
   ========================================================================= */

export const ARCHITECTURE_NODES: Record<string, ArchitectureNode> = {
  user: {
    id: 'user',
    label: 'User',
    sublabel: '(Web / Mobile)',
    type: 'client',
    description:
      'Client clients accessing through high-performance web browser or progressive mobile interface with responsive streaming UI.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Vite', 'SSE / WebSockets'],
  },
  frontend: {
    id: 'frontend',
    label: 'Frontend',
    sublabel: '(Next.js / React)',
    type: 'client',
    description:
      'Modern SPA/SSR user interface rendering streaming chat tokens, interactive vector plots, and real-time state synchronizations.',
    tech: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  backend: {
    id: 'backend',
    label: 'Backend',
    sublabel: '(FastAPI / APIs)',
    type: 'service',
    description:
      'High-throughput asynchronous Python API gateway handling authentication, request validation, rate limiting, and agent task dispatch.',
    tech: ['FastAPI', 'Pydantic v2', 'Python 3.12', 'JWT Auth', 'Uvicorn'],
  },
  agentic: {
    id: 'agentic',
    label: 'Agentic AI Layer',
    sublabel: '(LangGraph / Multi-Agent)',
    type: 'ai',
    description:
      'Core cognitive reasoning engine implementing cyclical LangGraph workflows, intent triage, planning, and tool evaluation.',
    tech: ['LangGraph', 'LangChain', 'Deterministic State Graphs', 'Self-Critique Loops'],
  },
  llms: {
    id: 'llms',
    label: 'LLMs',
    sublabel: '(Gemini / Groq)',
    type: 'ai',
    description:
      'Foundation model orchestration layer utilizing Google Gemini for multi-modal reasoning and Groq LPUs for ultra-fast conversational latency.',
    tech: ['Gemini 2.5 Flash', 'Gemini Pro', 'Groq LPU', 'Llama 3.3 70B'],
  },
  tools: {
    id: 'tools',
    label: 'Tools',
    sublabel: '(APIs / Integrations)',
    type: 'service',
    description:
      'Sandboxed tool calling interface via Model Context Protocol (MCP) enabling safe database queries, web scraping, and REST invocations.',
    tech: ['MCP Core', 'HTTPX', 'JSONSchema Validation', 'Execution Sandbox'],
  },
  memory: {
    id: 'memory',
    label: 'Memory',
    sublabel: '(Vector DB)',
    type: 'storage',
    description:
      'Episodic and long-term memory engine providing user profile recollection, entity graphs, and past conversation summaries.',
    tech: ['Qdrant', 'pgvector', 'Redis JSON', 'Cosine Similarity'],
  },
  knowledge: {
    id: 'knowledge',
    label: 'Knowledge Base',
    sublabel: '(RAG)',
    type: 'storage',
    description:
      'High-density hybrid retrieval pipeline indexing corporate documents, technical manuals, and domain PDFs with neural rerankers.',
    tech: ['Qdrant Hybrid Search', 'BM25', 'Cohere Rerank v3', 'RAGAS'],
  },
  database: {
    id: 'database',
    label: 'Database',
    sublabel: '(PostgreSQL)',
    type: 'storage',
    description:
      'Primary relational storage for user accounts, role-based permissions, execution logs, and structured business entities.',
    tech: ['PostgreSQL 16', 'Prisma ORM', 'SQLAlchemy', 'PostGIS'],
  },
  cache: {
    id: 'cache',
    label: 'Cache',
    sublabel: '(Redis)',
    type: 'storage',
    description:
      'In-memory data store for semantic cache matching, ephemeral session state, and rate-limit token bucket tracking.',
    tech: ['Redis 7.2', 'Semantic Caching', 'Pub/Sub', 'TTL Invalidation'],
  },
  microservices: {
    id: 'microservices',
    label: 'Microservices',
    sublabel: '(Celery)',
    type: 'service',
    description:
      'Distributed background job processing queue executing long-running file chunking, embedding generation, and report exports.',
    tech: ['Celery', 'RabbitMQ', 'Redis Broker', 'Async Workers'],
  },
  external: {
    id: 'external',
    label: 'External Services',
    sublabel: '(3rd Party APIs)',
    type: 'external',
    description:
      'Integration connectors to third-party ecosystems including GitHub, Slack, weather buoys, satellite feeds, and CRM databases.',
    tech: ['REST Webhooks', 'OAuth 2.0', 'OpenAPI Specs', 'Copernicus API'],
  },
};

/** Left-to-right request path used by the architecture diagram. */
export const ARCHITECTURE_FLOW = ['user', 'frontend', 'backend', 'agentic'] as const;
/** Branch column hanging off the agentic layer. */
export const ARCHITECTURE_BRANCHES = ['llms', 'tools', 'knowledge', 'memory'] as const;
/** Persistence row beneath the flow. */
export const ARCHITECTURE_STORAGE = ['database', 'cache', 'microservices', 'external'] as const;

export const ARCHITECTURE_COPY = {
  eyebrow: 'Production Architecture',
  headline: 'One request. Every layer accounted for.',
  body: 'A production-grade agentic RAG pipeline connecting full-stack delivery, retrieval and real-world tool use. Select any component to inspect the implementation.',
};

/* ============================================================================
   PIPELINE SIMULATOR — narrated execution traces
   ========================================================================= */

export interface PipelineScenario {
  title: string;
  project: string;
  query: string;
  steps: string[];
}

export const PIPELINE_SCENARIOS: PipelineScenario[] = [
  {
    title: 'Maritime Hazard Scan',
    project: 'ORCA',
    query: 'Scan coastal vector 09 for maritime hazards and compute safe trajectory',
    steps: [
      'Client dispatches signed geospatial coordinates (16.544° N, 81.521° E)...',
      'FastAPI API Gateway validates token & assigns task ID #orch-8891...',
      'LangGraph Supervisor receives telemetry & awakens Hazard + Bathymetry agents...',
      'Agents query PostGIS geospatial boundaries & satellite weather vectors in parallel...',
      'Groq LPU evaluates trajectory in 18ms; Celery registers audit log to PostgreSQL...',
      'Deterministic clearance granted: "SAFETY NOMINAL" streamed back via SSE!',
    ],
  },
  {
    title: 'Hybrid Knowledge Retrieval',
    project: 'KnowledgeOS',
    query: 'What are the fault tolerance invariants for distributed consensus nodes?',
    steps: [
      'User query enters Next.js streaming interface with session authentication...',
      'Backend generates dense embedding via text-embedding-3 & sparse BM25 tokens...',
      'Qdrant performs reciprocal rank fusion across 1.2M vector chunks...',
      'Cohere v3 cross-encoder neural reranker filters top 5 grounded contexts...',
      'RAGAS guardrail computes 0.94 faithfulness score; checks context hallucination...',
      'Verified answer with citation links delivered in 340ms to client!',
    ],
  },
  {
    title: 'MCP Tool Execution',
    project: 'MCP Server',
    query: 'Execute read-only SQL analysis on active user transactions pool',
    steps: [
      'AI agent issues Model Context Protocol tool execution request: "database_query"...',
      'FastAPI MCP Server checks JSONSchema contract and execution permissions...',
      'Tool sandbox enforces EXPLAIN plan & read-only AST parser verification...',
      'Async connection pool acquires PostgreSQL replica lock & executes query...',
      'Result rows serialized into clean JSON payload with schema headers...',
      'Tool response returned to agent reasoning loop (HTTP 200 OK, 12ms)!',
    ],
  },
];

/* ============================================================================
   CONTACT
   ========================================================================= */

export const CONTACT_CHANNELS = [
  { id: 'email', label: 'Email', value: PORTFOLIO_INFO.email, href: `mailto:${PORTFOLIO_INFO.email}` },
  { id: 'github', label: 'GitHub', value: '@adinavishal', href: PORTFOLIO_INFO.github },
  { id: 'linkedin', label: 'LinkedIn', value: 'in/adinavishal', href: PORTFOLIO_INFO.linkedin },
];

export const CONTACT_SUBJECTS = [
  'Internship Opportunity',
  'Agentic AI Collaboration',
  'Full-Stack Engineering Role',
  'General Inquiries',
];

export const RESUME_SUMMARY =
  'Full-Stack Engineer with specialization in Agentic AI, LangGraph multi-agent workflows, and production RAG pipelines. Experienced building resilient backend systems with FastAPI and PostgreSQL, and intuitive streaming React interfaces. Passionate about shipping autonomous AI systems from prototype to production.';
