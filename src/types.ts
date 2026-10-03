export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: 'agentic' | 'rag' | 'fullstack';
  stats: {
    label: string;
    sublabel: string;
  }[];
  githubUrl?: string;
  demoUrl?: string;
  highlights: string[];
  architectureDetails: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface ExperienceRole {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  details: string[];
  domains: {
    number: string;
    title: string;
    points: string[];
  }[];
  techStack: string[];
}

export interface TechItem {
  name: string;
  category: string;
  iconType: 'svg' | 'material' | 'custom';
  iconValue?: string;
  color?: string;
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  icon: string;
  isPrize?: boolean;
  date?: string;
  description?: string;
  credentialUrl?: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  type: 'client' | 'service' | 'ai' | 'storage' | 'external';
  description: string;
  tech: string[];
}
