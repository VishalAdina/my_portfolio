import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VisionSection } from './components/VisionSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TechStackSection } from './components/TechStackSection';
import { PipelineArchitectureSection } from './components/PipelineArchitectureSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ArchitectureInspectorModal } from './components/ArchitectureInspectorModal';
import { ExperienceModal } from './components/ExperienceModal';
import { AllProjectsModal } from './components/AllProjectsModal';
import { CommandPalette } from './components/CommandPalette';

import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inspectedNodeId, setInspectedNodeId] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [allProjectsOpen, setAllProjectsOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] bg-dot-grid text-slate-800 antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Primary Navigation Header */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={scrollToContact}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section 01: Hero / About */}
        <HeroSection
          onScrollToProjects={scrollToProjects}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Section 02: Vision / Full-Stack Agentic AI Engineer */}
        <VisionSection
          onScrollToProjects={scrollToProjects}
          onInspectNode={(nodeId) => setInspectedNodeId(nodeId)}
        />

        {/* Section 03: Selected Work */}
        <SelectedWorkSection
          onSelectProject={(project) => setSelectedProject(project)}
          onViewAllProjects={() => setAllProjectsOpen(true)}
        />

        {/* Section 04: Experience */}
        <ExperienceSection
          onOpenExperienceDetails={() => setExperienceOpen(true)}
        />

        {/* Section 05: Tech Stack */}
        <TechStackSection />

        {/* Section 06: Project Architecture (Pipeline) */}
        <PipelineArchitectureSection
          onInspectNode={(nodeId) => setInspectedNodeId(nodeId)}
        />

        {/* Section 07: Achievements */}
        <AchievementsSection />

        {/* Section 08: Let's Connect */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setResumeOpen(true)} />

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={scrollToContact}
      />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <ArchitectureInspectorModal
        nodeId={inspectedNodeId}
        onClose={() => setInspectedNodeId(null)}
      />

      <ExperienceModal
        isOpen={experienceOpen}
        onClose={() => setExperienceOpen(false)}
      />

      <AllProjectsModal
        isOpen={allProjectsOpen}
        onClose={() => setAllProjectsOpen(false)}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />
    </div>
  );
}
