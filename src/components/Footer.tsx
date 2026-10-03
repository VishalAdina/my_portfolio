import React from 'react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-10 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left: Brand */}
      <div className="flex items-center space-x-2.5">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
        <a href="#about" className="font-extrabold tracking-tight text-slate-900 text-sm uppercase font-mono">
          {PORTFOLIO_INFO.name}
        </a>
      </div>

      {/* Center: Tagline & Status */}
      <div className="text-center space-y-1">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Building intelligent systems for a better tomorrow.
        </p>
        <p className="text-[11px] text-slate-400 font-mono">
          Designed with minimal Awwwards SaaS aesthetics · React 19 &amp; Tailwind CSS
        </p>
      </div>

      {/* Right: Navigation Links & Back to Top */}
      <div className="flex items-center space-x-6 text-xs font-semibold text-slate-600">
        <a
          href={PORTFOLIO_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={PORTFOLIO_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors"
        >
          GitHub
        </a>
        <button
          onClick={onOpenResume}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Resume
        </button>
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="w-8 h-8 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-2xs ml-2 cursor-pointer"
        >
          <span className="text-sm leading-none font-bold">↑</span>
        </button>
      </div>
    </footer>
  );
};
