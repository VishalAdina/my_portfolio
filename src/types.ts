/**
 * Shared domain types for the portfolio.
 * Shape of the data contract between `src/data/portfolioData.ts` and the UI.
 */

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
  /** Display name — also the key used to look up `TECH_NOTES`. */
  name: string;
  category: TechCategoryId;
  /** Short monogram shown in the index column (e.g. "PY", "LG"). */
  abbr: string;
  /** Highlighted as a core competency in the UI. */
  core?: boolean;
}

export type TechCategoryId = 'languages' | 'frontend' | 'backend' | 'agentic' | 'rag' | 'infra';

export interface TechCategory {
  id: TechCategoryId;
  label: string;
  /** Editorial descriptor rendered next to the category name. */
  caption: string;
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

export interface EducationEntry {
  institution: string;
  degree: string;
  short: string;
  period: string;
  location: string;
  focus: string[];
  note: string;
}

export interface NavSection {
  id: string;
  label: string;
  index: string;
  /** Anchor ids that should also mark this nav item as active. */
  aliases?: string[];
}
