import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onScrollToProjects: () => void;
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToProjects }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // 3D Tilt calculation
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((centerY - y) / 18);
    setRotateY((x - centerX) / 18);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-16 lg:py-16">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Concentric Rings Decorative Background Graphic */}
      <div aria-hidden="true" className="concentric-rings hidden lg:block pointer-events-none">
        <div className="ring w-[220px] h-[220px]" />
        <div className="ring w-[380px] h-[380px]" />
        <div className="ring w-[540px] h-[540px]" />
        <div className="ring w-[700px] h-[700px]" />
        {/* Subtle angled tangent line */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[850px] h-[1px] bg-slate-200/80 rotate-[-28deg] origin-center" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Column 1: Intro Text & Action Buttons (Left) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-center space-y-6"
          data-purpose="intro-column"
        >
          {/* Section Tracker Tag with live status */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center space-x-2 text-[11px] font-semibold tracking-widest text-slate-500 uppercase font-mono">
              <span className="text-blue-600 font-bold">01</span>
              <span className="text-slate-400">—</span>
              <span>ABOUT ME</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Hire</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            Hi, I’m<br />
            <span className="text-slate-950 font-black tracking-tight">{PORTFOLIO_INFO.name},</span><br />
            <span className="text-slate-900 font-bold text-3xl md:text-4xl lg:text-[38px]">a CSIT student &amp;</span><br />
            <span className="text-slate-900 font-bold text-3xl md:text-4xl lg:text-[38px]">
              Full-Stack <span className="text-blue-600 inline-block transition-transform hover:scale-105 duration-200">Agentic AI</span> Engineer.
            </span>
          </h1>

          {/* Subheading Paragraph */}
          <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md font-normal">
            {PORTFOLIO_INFO.tagline}
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* View My Work */}
            <button
              onClick={onScrollToProjects}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-950 text-white text-xs md:text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
            >
              <span>View My Work</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* GitHub Link Button */}
            <a
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs md:text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0"
              href={PORTFOLIO_INFO.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>

        {/* Column 2: Center Portrait Showcase with 3D Tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex justify-center items-center py-4"
          data-purpose="portrait-showcase"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="relative w-full max-w-[310px] aspect-[4/5] rounded-[28px] overflow-hidden border border-blue-100/80 shadow-[0_12px_36px_-6px_rgba(37,99,235,0.15)] bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#93c5fd] flex items-end justify-center group cursor-pointer"
          >
            {/* Ambient Background Wave & Sphere Highlights */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/45 blur-xl" />
              <div className="absolute top-1/4 right-0 w-36 h-36 rounded-full bg-blue-300/60 blur-lg" />
              <svg className="absolute inset-0 w-full h-full object-cover opacity-70" preserveAspectRatio="none" viewBox="0 0 320 400">
                <path d="M-20,150 C70,90 130,220 230,130 C270,90 310,110 340,150 L340,400 L-20,400 Z" fill="#60a5fa" opacity="0.6" />
                <path d="M-20,240 C50,190 150,290 230,210 C270,170 310,230 340,270 L340,400 L-20,400 Z" fill="#38bdf8" opacity="0.4" />
              </svg>
            </div>

            {/* Adina Vishal Portrait Image */}
            {!imageError ? (
              <img
                alt="Adina Vishal portrait"
                className={`relative z-10 w-full h-full object-cover object-[50%_15%] translate-y-2 scale-[1.08] drop-shadow-md transition-transform duration-500 group-hover:scale-[1.12] ${
                  imageLoaded ? 'opacity-100' : 'opacity-90'
                }`}
                src={PORTFOLIO_INFO.portraitUrl}
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6 text-slate-800">
                <div className="w-20 h-20 rounded-full bg-white/80 shadow-md flex items-center justify-center text-blue-600 mb-3">
                  <span className="material-symbols-outlined text-4xl">person</span>
                </div>
                <div className="font-extrabold text-xl text-slate-900">{PORTFOLIO_INFO.name}</div>
                <div className="text-xs text-blue-700 font-semibold mt-1">Full-Stack Agentic AI Engineer</div>
              </div>
            )}

            {/* Subtle floating watermark pill at bottom */}
            <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/85 backdrop-blur-md py-1.5 px-3 rounded-xl border border-white/60 shadow-sm flex items-center justify-between text-[10px] font-mono text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>IST · Active Online</span>
              </span>
              <span className="font-semibold text-blue-600">SRKR CSIT</span>
            </div>
          </div>
        </motion.div>

        {/* Column 3: Status Cards Stack (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3 flex flex-col space-y-3 lg:pl-2"
          data-purpose="badges-stack"
        >
          {/* Badge 1: Role */}
          <div
            onMouseEnter={() => setActiveTooltip('role')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="relative flex items-center space-x-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-[0_8px_20px_-4px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 transition-all cursor-default group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs font-bold text-slate-900 tracking-tight">
              Full-Stack Agentic AI Engineer
            </span>
            {activeTooltip === 'role' && (
              <div className="absolute left-0 -top-8 bg-slate-900 text-white text-[10px] font-mono px-2.5 py-1 rounded shadow-md whitespace-nowrap z-30 animate-fadeIn">
                Multi-Agent &amp; RAG Systems Specialist
              </div>
            )}
          </div>

          {/* Badge 2: Education */}
          <div
            onMouseEnter={() => setActiveTooltip('edu')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="relative flex items-center space-x-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-[0_8px_20px_-4px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 transition-all cursor-default group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-800 tracking-tight">
              {PORTFOLIO_INFO.education}
            </span>
            {activeTooltip === 'edu' && (
              <div className="absolute left-0 -top-8 bg-slate-900 text-white text-[10px] font-mono px-2.5 py-1 rounded shadow-md whitespace-nowrap z-30 animate-fadeIn">
                S.R.K.R. Engineering College (CSIT, 2025–2029)
              </div>
            )}
          </div>

          {/* Badge 3: Availability */}
          <div
            onMouseEnter={() => setActiveTooltip('avail')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="relative flex items-center space-x-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-emerald-300 hover:shadow-[0_8px_20px_-4px_rgba(16,185,129,0.12)] hover:-translate-y-0.5 transition-all cursor-default group"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-800 tracking-tight">
              {PORTFOLIO_INFO.availability}
            </span>
            {activeTooltip === 'avail' && (
              <div className="absolute left-0 -top-8 bg-slate-900 text-white text-[10px] font-mono px-2.5 py-1 rounded shadow-md whitespace-nowrap z-30 animate-fadeIn">
                Ready for Summer / Fall Internships &amp; Remote Roles
              </div>
            )}
          </div>

          {/* Badge 4: Mindset */}
          <div
            onMouseEnter={() => setActiveTooltip('mindset')}
            onMouseLeave={() => setActiveTooltip(null)}
            className="relative flex items-center space-x-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-[0_8px_20px_-4px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 transition-all cursor-default group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" fill="currentColor" r="1.5" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-800 tracking-tight">
              Always building &amp; learning
            </span>
          </div>

          {/* Badge 5: Currently Building Card */}
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-emerald-300 hover:shadow-[0_8px_20px_-4px_rgba(16,185,129,0.12)] hover:-translate-y-0.5 transition-all">
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-medium text-slate-500 font-mono">Currently building</span>
            </div>
            <p className="text-xs font-bold text-slate-900 leading-snug">
              AI-powered systems <span className="font-normal text-slate-500">@ Pynyx</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
