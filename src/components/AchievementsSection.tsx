import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { Achievement } from '../types';

export const AchievementsSection: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  return (
    <section id="achievements" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-20 border-t border-slate-200/60">
      {/* Section Header */}
      <div className="flex items-center space-x-2 text-[11px] font-semibold tracking-widest text-slate-500 uppercase font-mono mb-6 md:mb-8">
        <span className="text-blue-600 font-bold">07</span>
        <span className="text-slate-400">—</span>
        <span>ACHIEVEMENTS</span>
      </div>

      {/* 4-Card Horizontal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ACHIEVEMENTS_DATA.map((ach, idx) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedAchievement(ach)}
            className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-3.5 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            {ach.isPrize ? (
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center flex-shrink-0 text-amber-500 text-xl group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-2xs">
                🏆
              </div>
            ) : (
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-2xs">
                <span className="material-symbols-outlined text-[22px]">{ach.icon}</span>
              </div>
            )}
            <div className="leading-tight">
              <h4 className={`text-sm font-bold ${ach.id === 'certifications' ? 'text-slate-900' : 'text-blue-600 group-hover:text-blue-700'}`}>
                {ach.title}
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{ach.organization}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                  {selectedAchievement.isPrize ? '🏆' : <span className="material-symbols-outlined">{selectedAchievement.icon}</span>}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedAchievement.title}</h3>
                  <p className="text-xs text-slate-500 font-mono">{selectedAchievement.organization}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {selectedAchievement.description}
            </p>

            {selectedAchievement.date && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Verification &amp; Year:</span>
                <span className="font-bold text-slate-800">{selectedAchievement.date}</span>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedAchievement(null)}
                className="px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
