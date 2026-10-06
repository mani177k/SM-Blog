import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowUp, Sparkles, CheckCircle, Trophy, ArrowRight } from 'lucide-react';

interface GoalCelebrationOverlayProps {
  isGoal: boolean;
  scrollProgress: number;
  onScrollToTop: () => void;
}

export const GoalCelebrationOverlay: React.FC<GoalCelebrationOverlayProps> = ({
  isGoal,
  scrollProgress,
  onScrollToTop
}) => {
  const firedRef = useRef(false);

  useEffect(() => {
    if (isGoal && !firedRef.current) {
      firedRef.current = true;
      // Elegant subtle gold & orange celebration burst
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#E05A1B', '#C59B27', '#0A192F', '#F8F7F4'],
        disableForReducedMotion: true
      });
    } else if (!isGoal && firedRef.current) {
      firedRef.current = false;
    }
  }, [isGoal]);

  return (
    <div
      className={`transition-all duration-700 ease-out max-w-4xl mx-auto mb-16 px-4 ${
        isGoal
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-40 translate-y-4 scale-98 pointer-events-none'
      }`}
    >
      <div className="editorial-glass-dark text-white rounded-3xl p-8 sm:p-12 text-center border-2 border-[#E05A1B] shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-radial from-[#E05A1B]/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Trophy Badge */}
          <div className="w-14 h-14 rounded-full bg-[#E05A1B] text-white flex items-center justify-center mb-4 shadow-lg animate-bounce">
            <Trophy className="w-7 h-7" />
          </div>

          {/* Goal Typography */}
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-300 mb-1">
            FINAL DESTINATION REACHED
          </span>

          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-black tracking-tight text-white mb-2 leading-none">
            GOAL.
          </h2>

          <p className="text-xl sm:text-2xl font-serif italic text-slate-200 mb-6 font-normal max-w-xl">
            "Every journey starts with one shot."
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-8 leading-relaxed">
            The 3D storytelling ball has navigated the entire economic landscape—from macro theories to personalized SIP compounding—and successfully reached the net.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E05A1B] hover:bg-[#F97316] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer"
            >
              <span>Begin Your Financial Journey</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onScrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-all border border-white/20 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Scroll Back to Hero (Rewind Journey)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
