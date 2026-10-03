import { Project, ExperienceRole, Achievement, ArchitectureNode } from '../types';

export const PORTFOLIO_INFO = {
  name: 'Adina Vishal',
  role: 'Full-Stack Agentic AI Engineer',
  education: "SRKR'29 | CSIT",
  university: 'SRKR Engineering College',
  degree: 'B.Tech in Computer Science and Information Technology',
  email: 'adinavishal59@gmail.com',
  github: 'https://github.com/adinavishal',
  linkedin: 'https://linkedin.com/in/adinavishal',
  tagline: 'I build full-stack applications and intelligent systems with a focus on RAG, AI agents, and scalable backend architecture.',
  headline: 'I BUILD INTELLIGENT SOFTWARE SYSTEMS THAT MOVE FROM IDEAS TO PRODUCTION.',
  availability: 'Open to internships',
  currentRole: 'AI-powered systems @ Pynyx',
  portraitUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGw9EW5kjn1wjH9Ftr5YRApSuG25bmdsYPD9FJBlZXbw0BLVCpizEC-6okcaeBN19GywnjANp0OT1y5DHGUV10rvfTF1IbacLgJB6uP2XtQDko1eq5E61iCBhb_OfHrD9MiHdOu6zqd9WuDSJ5AZbrFoF-4E1TkoFV0VeMMhhz84LO9fBIxnKnHhi29dmD-7LhGhd0tw1fOzGUgM4J54xvKPrJr7y3tlwiepG6-JgN0JEPXfJ9huBJNcBpmg14S2N-H4M'
};

export const PROJECTS: Project[] = [
  {
    id: 'mcp-server',
    title: 'MCP Server',
    subtitle: 'Model Context Protocol Server',
    description: 'A modular MCP server enabling AI agents to securely connect with real-world tools, APIs and internal data sources.',
    category: 'agentic',
    tags: ['FastAPI', 'A2A', 'APIs', 'MCP', 'Tools', 'Memory'],
    stats: [
      { label: '10+', sublabel: 'MCP Tools' },
      { label: 'Tool Integrations', sublabel: 'APIs & Services' },
      { label: 'Production Ready', sublabel: 'Modular Architecture' }
    ],
    githubUrl: 'https://github.com/adinavishal/mcp-server',
    demoUrl: '#',
    highlights: [
      'Standardized Model Context Protocol (MCP) server implementation for bidirectional agent tool execution',
      'Sandboxed tool execution environment with rate limiting and deterministic error recovery',
      'Dynamic schema generation allowing LLMs to discover tools on the fly without prompt bloat',
      'Integrated stateful memory buffer for context retention across multi-turn agent execution loops'
    ],
    architectureDetails: 'FastAPI microservice communicating over standard stdio and SSE transport protocols. Features dynamic tool registry, JSONSchema contract validation, and asynchronous execution worker pool.',
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
        return ToolResult.success(data=serialize_rows(records))`
    }
  },
  {
    id: 'orca',
    title: 'ORCA',
    subtitle: 'Marine Ecosystem Reasoning with Collaborative Agents',
    description: 'Multi-agent platform for fishermen, researchers and coastal authorities with real-time data and safety reasoning.',
    category: 'agentic',
    tags: ['React', 'FastAPI', 'LangGraph', 'PostGIS', 'Gemini', 'Groq'],
    stats: [
      { label: '8', sublabel: 'Specialist Agents' },
      { label: 'Real-time', sublabel: 'Data Orchestration' },
      { label: 'Deterministic', sublabel: 'Safety Reasoning' }
    ],
    githubUrl: 'https://github.com/adinavishal/orca-marine-os',
    demoUrl: '#',
    highlights: [
      'Orchestrated 8 specialist autonomous agents (Weather, Bathymetry, Navigation, Hazard, Fish Zones, SOS, Regulatory, Fuel)',
      'Sub-second inference using Groq LPU and Gemini 1.5/2.0 Flash for multi-modal radar and satellite image analysis',
      'Geospatial boundary indexing using PostGIS to prevent trawling into marine protected sanctuaries and territorial borders',
      'Offline-first progressive sync for maritime vessels with high latency satellite data links'
    ],
    architectureDetails: 'LangGraph hierarchical state graph with deterministic supervisor routing. Integrates Copernicus satellite streams, OpenWeather APIs, and real-time vessel telemetry over WebSockets.',
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
app = workflow.compile(checkpointer=MemorySaver())`
    }
  },
  {
    id: 'knowledge-os',
    title: 'KnowledgeOS',
    subtitle: 'Production-Grade Agentic RAG Platform',
    description: 'End-to-end RAG system with hybrid retrieval, reranking, evaluation and agentic workflows for private knowledge bases.',
    category: 'rag',
    tags: ['FastAPI', 'Qdrant DB', 'RAGAS', 'Observability', 'Guardrails'],
    stats: [
      { label: 'Hybrid', sublabel: 'Retrieval' },
      { label: 'Agentic', sublabel: 'Workflows' },
      { label: 'Evaluation', sublabel: 'Pipeline' }
    ],
    githubUrl: 'https://github.com/adinavishal/knowledge-os',
    demoUrl: '#',
    highlights: [
      'Dense + Sparse hybrid search combining Qdrant vector embeddings with BM25 keyword matching via Reciprocal Rank Fusion (RRF)',
      'Cohere v3 cross-encoder reranking stage reducing context hallucination by 42% on complex corporate manuals',
      'Automated RAGAS evaluation pipeline tracking Faithfulness, Answer Relevance, and Context Precision on every commit',
      'Self-corrective agentic loop: retrieves, critiques draft answer, and re-queries if confidence threshold < 0.85'
    ],
    architectureDetails: 'Modular ingestion pipeline (Unstructured, LangChain) into Qdrant collection with payload filtering. FastAPI query engine with OpenTelemetry tracing and streaming SSE output.',
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
    return await cohere_reranker.rerank(query=query, docs=fused_docs[:15], top_n=top_k)`
    }
  }
];

export const EXPERIENCE_DATA: ExperienceRole = {
  company: 'Pynyx',
  role: 'Software Development Engineer Intern',
  period: '2026 (3 months · Remote)',
  location: 'Remote',
  summary: 'Worked on KaliganAI — an enterprise AI employee platform supporting 60+ AI employees across chat and voice workflows.',
  details: [
    'Architected core multi-tenant backend infrastructure powering 60+ autonomous corporate agents.',
    'Engineered low-latency document processing and vector ingestion pipelines using pgvector and PostgreSQL.',
    'Implemented function calling and tool-use orchestrations connecting agents to internal ERPs, Slack, and email.',
    'Developed high-fidelity React interactive dashboards with role-based access control and real-time streaming chat.'
  ],
  domains: [
    {
      number: '01',
      title: 'Backend Engineering',
      points: [
        'Multi-tenant architecture',
        'PostgreSQL + Prisma',
        'Modular APIs'
      ]
    },
    {
      number: '02',
      title: 'RAG Systems',
      points: [
        'Knowledge base pipelines',
        'pgvector',
        'Retrieval & chunking'
      ]
    },
    {
      number: '03',
      title: 'AI Agents',
      points: [
        'Agent orchestration',
        'Tool calling',
        'Enterprise integrations'
      ]
    },
    {
      number: '04',
      title: 'Product Engineering',
      points: [
        'React frontend',
        'Authentication',
        'API integrations'
      ]
    }
  ],
  techStack: ['FastAPI', 'PostgreSQL', 'Prisma', 'pgvector', 'React', 'TypeScript', 'LangChain', 'Redis']
};

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'uobhav-2k25',
    title: '03rd Prize',
    organization: 'UOBHAV 2K25 Hackathon',
    icon: '🏆',
    isPrize: true,
    date: '2025',
    description: 'Awarded 3rd prize among 120+ teams for building an autonomous crisis management agent network.'
  },
  {
    id: 'sih-2026',
    title: 'Participant',
    organization: 'Smart India Hackathon 2026',
    icon: 'verified',
    date: '2026',
    description: 'Selected for national-level innovation solving real-time marine safety challenges.'
  },
  {
    id: 'hackerrank-js',
    title: 'Certified JavaScript',
    organization: 'HackerRank',
    icon: 'star',
    date: '2025',
    description: 'Demonstrated advanced mastery of asynchronous execution, event loops, and modern ES2022+ standards.'
  },
  {
    id: 'certifications',
    title: 'Certifications',
    organization: 'NPTEL · GFG · Others',
    icon: 'description',
    date: '2024 - 2026',
    description: 'Completed verified coursework in Data Structures, Algorithms, Database Systems, and Deep Learning.'
  }
];

export const ARCHITECTURE_NODES: Record<string, ArchitectureNode> = {
  user: {
    id: 'user',
    label: 'User',
    sublabel: '(Web / Mobile)',
    type: 'client',
    description: 'Client clients accessing through high-performance web browser or progressive mobile interface with responsive streaming UI.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Vite', 'SSE / WebSockets']
  },
  frontend: {
    id: 'frontend',
    label: 'Frontend',
    sublabel: '(Next.js / React)',
    type: 'client',
    description: 'Modern SPA/SSR user interface rendering streaming chat tokens, interactive vector plots, and real-time state synchronizations.',
    tech: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Lucide']
  },
  backend: {
    id: 'backend',
    label: 'Backend',
    sublabel: '(FastAPI / APIs)',
    type: 'service',
    description: 'High-throughput asynchronous Python API gateway handling authentication, request validation, rate limiting, and agent task dispatch.',
    tech: ['FastAPI', 'Pydantic v2', 'Python 3.12', 'JWT Auth', 'Uvicorn']
  },
  agentic: {
    id: 'agentic',
    label: 'Agentic AI Layer',
    sublabel: '(LangGraph / Multi-Agent)',
    type: 'ai',
    description: 'Core cognitive reasoning engine implementing cyclical LangGraph workflows, intent triage, planning, and tool evaluation.',
    tech: ['LangGraph', 'LangChain', 'Deterministic State Graphs', 'Self-Critique Loops']
  },
  llms: {
    id: 'llms',
    label: 'LLMs',
    sublabel: '(Gemini / Groq)',
    type: 'ai',
    description: 'Foundation model orchestration layer utilizing Google Gemini for multi-modal reasoning and Groq LPUs for ultra-fast conversational latency.',
    tech: ['Gemini 2.5 Flash', 'Gemini Pro', 'Groq LPU', 'Llama 3.3 70B']
  },
  tools: {
    id: 'tools',
    label: 'Tools',
    sublabel: '(APIs / Integrations)',
    type: 'service',
    description: 'Sandboxed tool calling interface via Model Context Protocol (MCP) enabling safe database queries, web scraping, and REST invocations.',
    tech: ['MCP Core', 'HTTPX', 'JSONSchema Validation', 'Execution Sandbox']
  },
  memory: {
    id: 'memory',
    label: 'Memory',
    sublabel: '(Vector DB)',
    type: 'storage',
    description: 'Episodic and long-term memory engine providing user profile recollection, entity graphs, and past conversation summaries.',
    tech: ['Qdrant', 'pgvector', 'Redis JSON', 'Cosine Similarity']
  },
  knowledge: {
    id: 'knowledge',
    label: 'Knowledge Base',
    sublabel: '(RAG)',
    type: 'storage',
    description: 'High-density hybrid retrieval pipeline indexing corporate documents, technical manuals, and domain PDFs with neural rerankers.',
    tech: ['Qdrant Hybrid Search', 'BM25', 'Cohere Rerank v3', 'RAGAS']
  },
  database: {
    id: 'database',
    label: 'Database',
    sublabel: '(PostgreSQL)',
    type: 'storage',
    description: 'Primary relational storage for user accounts, role-based permissions, execution logs, and structured business entities.',
    tech: ['PostgreSQL 16', 'Prisma ORM', 'SQLAlchemy', 'PostGIS']
  },
  cache: {
    id: 'cache',
    label: 'Cache',
    sublabel: '(Redis)',
    type: 'storage',
    description: 'In-memory data store for semantic cache matching, ephemeral session state, and rate-limit token bucket tracking.',
    tech: ['Redis 7.2', 'Semantic Caching', 'Pub/Sub', 'TTL Invalidation']
  },
  microservices: {
    id: 'microservices',
    label: 'Microservices',
    sublabel: '(Celery)',
    type: 'service',
    description: 'Distributed background job processing queue executing long-running file chunking, embedding generation, and report exports.',
    tech: ['Celery', 'RabbitMQ', 'Redis Broker', 'Async Workers']
  },
  external: {
    id: 'external',
    label: 'External Services',
    sublabel: '(3rd Party APIs)',
    type: 'external',
    description: 'Integration connectors to third-party ecosystems including GitHub, Slack, weather buoys, satellite feeds, and CRM databases.',
    tech: ['REST Webhooks', 'OAuth 2.0', 'OpenAPI Specs', 'Copernicus API']
  }
};
