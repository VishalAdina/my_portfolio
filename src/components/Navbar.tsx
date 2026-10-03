import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact, onOpenCommandPalette }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'architecture', 'projects', 'experience', 'tech-stack', 'my-project-architecture', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenCommandPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenCommandPalette]);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] py-3'
          : 'bg-transparent py-4'
      }`}
      data-purpose="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Brand Logo (Zone 1) */}
        <a
          href="#about"
          onClick={(e) => handleNavClick('about', e)}
          className="flex items-center space-x-2.5 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 transition-transform group-hover:scale-125" />
            <div className="absolute w-5 h-5 rounded-full bg-blue-500/20 animate-ping opacity-75" />
          </div>
          <span className="font-extrabold tracking-tight text-slate-900 text-sm md:text-base uppercase font-mono">
            {PORTFOLIO_INFO.name}
          </span>
        </a>

        {/* Center: Navigation Links (Zone 2) with Smooth Motion Indicator */}
        <nav className="hidden lg:flex items-center space-x-1 p-1 bg-slate-100/60 backdrop-blur-md rounded-full border border-slate-200/60 text-[13px] font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id || (link.id === 'architecture' && (activeSection === 'architecture' || activeSection === 'my-project-architecture'));
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`relative px-3.5 py-1 rounded-full transition-colors ${
                  isActive ? 'text-slate-950 font-bold' : 'hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-white rounded-full shadow-xs -z-10"
                  />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Actions (Zone 3) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Search Button (⌘K) */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/70 text-xs text-slate-600 font-medium transition-all cursor-pointer hover:border-slate-300"
            title="Press Cmd+K to search"
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="hidden md:inline">Search</span>
            <kbd className="text-[10px] font-mono px-1 py-0.2 bg-white rounded border border-slate-300 text-slate-500 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Resume Download Pill */}
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer active:scale-95"
            aria-label="View Resume"
          >
            <span>Resume</span>
            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Let's Talk Pill */}
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-950 text-white text-xs font-medium hover:bg-blue-600 hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)] transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <span>Let's Talk</span>
            <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-4 space-y-2 shadow-xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(link.id, e)}
              className={`block px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="flex-1 py-2 text-center text-xs font-semibold bg-slate-100 rounded-xl text-slate-700 flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span>Search (⌘K)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 py-2 text-center text-xs font-semibold bg-slate-900 text-white rounded-xl"
            >
              Resume
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};
