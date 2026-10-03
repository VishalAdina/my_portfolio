import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_INFO, PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume,
  onOpenContact,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const navigationItems = [
    { id: 'nav-about', title: 'Go to About Me', category: 'Navigation', shortcut: '01', action: () => scrollTo('about') },
    { id: 'nav-arch-vision', title: 'Go to Production Architecture', category: 'Navigation', shortcut: '02', action: () => scrollTo('architecture') },
    { id: 'nav-projects', title: 'Go to Selected Work', category: 'Navigation', shortcut: '03', action: () => scrollTo('projects') },
    { id: 'nav-experience', title: 'Go to Experience (Pynyx)', category: 'Navigation', shortcut: '04', action: () => scrollTo('experience') },
    { id: 'nav-tech', title: 'Go to Tech Stack', category: 'Navigation', shortcut: '05', action: () => scrollTo('tech-stack') },
    { id: 'nav-pipeline', title: 'Go to Project Architecture (Query Pipeline)', category: 'Navigation', shortcut: '06', action: () => scrollTo('my-project-architecture') },
    { id: 'nav-achievements', title: 'Go to Achievements', category: 'Navigation', shortcut: '07', action: () => scrollTo('achievements') },
    { id: 'nav-contact', title: 'Go to Contact / Let’s Connect', category: 'Navigation', shortcut: '08', action: () => scrollTo('contact') },
  ];

  const projectItems = PROJECTS.map((p) => ({
    id: `proj-${p.id}`,
    title: `View Project: ${p.title} (${p.subtitle})`,
    category: 'Projects',
    shortcut: p.category.toUpperCase(),
    action: () => {
      onClose();
      onSelectProject(p);
    },
  }));

  const actionItems = [
    {
      id: 'act-resume',
      title: 'Open Official Resume (View / Print PDF)',
      category: 'Actions',
      shortcut: 'CV',
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'act-email',
      title: `Copy Email (${PORTFOLIO_INFO.email})`,
      category: 'Actions',
      shortcut: 'COPY',
      action: () => {
        navigator.clipboard.writeText(PORTFOLIO_INFO.email);
        onClose();
      },
    },
    {
      id: 'act-contact',
      title: 'Open Direct Message Form',
      category: 'Actions',
      shortcut: 'MSG',
      action: () => {
        onClose();
        onOpenContact();
      },
    },
    {
      id: 'act-github',
      title: 'Open GitHub Profile (@adinavishal)',
      category: 'Actions',
      shortcut: 'EXT',
      action: () => {
        window.open(PORTFOLIO_INFO.github, '_blank');
        onClose();
      },
    },
  ];

  const allItems = [...navigationItems, ...projectItems, ...actionItems];

  const filteredItems = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const scrollTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-10"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100">
              <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search (e.g., ORCA, Resume, Experience)..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden"
              />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No matching commands or projects found.
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="font-medium truncate">{item.title}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono ml-2 flex-shrink-0 ${
                          isSelected ? 'text-white/80' : 'text-slate-400'
                        }`}
                      >
                        {item.shortcut}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <span>Adina Vishal · Agentic AI Portfolio</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
