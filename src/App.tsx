import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import type { Project } from './types';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Cursor } from './components/ui/Cursor';
import { Preloader } from './components/ui/Preloader';

import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ArchitectureSection } from './components/sections/ArchitectureSection';
import { PipelineSection } from './components/sections/PipelineSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { ContactSection } from './components/sections/ContactSection';

import { useSmoothScroll } from './lib/scroll';
import { useScrollReveal } from './lib/useScrollReveal';

/**
 * Modals are code-split: the first paint never pays for the case-study,
 * résumé or command-palette bundles. Each one is fetched lazily the first
 * time it is opened (and warmed up during idle time afterwards).
 */
const ProjectModal = lazy(() =>
  import('./components/modals/ProjectModal').then((m) => ({ default: m.ProjectModal })),
);
const ResumeModal = lazy(() =>
  import('./components/modals/ResumeModal').then((m) => ({ default: m.ResumeModal })),
);
const ExperienceModal = lazy(() =>
  import('./components/modals/ExperienceModal').then((m) => ({ default: m.ExperienceModal })),
);
const AllProjectsModal = lazy(() =>
  import('./components/modals/AllProjectsModal').then((m) => ({ default: m.AllProjectsModal })),
);
const ArchitectureInspectorModal = lazy(() =>
  import('./components/modals/ArchitectureInspectorModal').then((m) => ({
    default: m.ArchitectureInspectorModal,
  })),
);
const CommandPalette = lazy(() =>
  import('./components/modals/CommandPalette').then((m) => ({ default: m.CommandPalette })),
);

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inspectedNodeId, setInspectedNodeId] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [allProjectsOpen, setAllProjectsOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useSmoothScroll();
  useScrollReveal();

  const handleIntroComplete = useCallback(() => setIntroDone(true), []);

  // Warm the lazy chunks once the page is idle — no one waits on a modal again
  useEffect(() => {
    const warm = () => {
      void import('./components/modals/ProjectModal');
      void import('./components/modals/ResumeModal');
      void import('./components/modals/CommandPalette');
    };
    const idle = window.requestIdleCallback?.(warm, { timeout: 4000 });
    const timer = idle ? undefined : window.setTimeout(warm, 2500);
    return () => {
      if (idle) window.cancelIdleCallback?.(idle);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="grain relative min-h-screen bg-bg">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:border focus:border-accent focus:bg-bg focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-fg"
      >
        Skip to content
      </a>

      <Preloader onComplete={handleIntroComplete} />
      <Cursor />
      <Navbar onOpenResume={() => setResumeOpen(true)} onOpenCommandPalette={() => setPaletteOpen(true)} />

      <main>
        <HeroSection introDone={introDone} onOpenResume={() => setResumeOpen(true)} />
        <AboutSection />
        <ProjectsSection
          onSelectProject={setSelectedProject}
          onViewAllProjects={() => setAllProjectsOpen(true)}
        />
        <ExperienceSection onOpenExperienceDetails={() => setExperienceOpen(true)} />
        <SkillsSection />
        <ArchitectureSection onInspectNode={setInspectedNodeId} />
        <PipelineSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      <Footer
        onOpenResume={() => setResumeOpen(true)}
        onOpenCommandPalette={() => setPaletteOpen(true)}
      />

      <Suspense fallback={null}>
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

        <ArchitectureInspectorModal
          nodeId={inspectedNodeId}
          onClose={() => setInspectedNodeId(null)}
        />

        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

        <ExperienceModal isOpen={experienceOpen} onClose={() => setExperienceOpen(false)} />

        <AllProjectsModal
          isOpen={allProjectsOpen}
          onClose={() => setAllProjectsOpen(false)}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <CommandPalette
          isOpen={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenResume={() => setResumeOpen(true)}
        />
      </Suspense>
    </div>
  );
}
