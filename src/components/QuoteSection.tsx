import React from 'react';
import { Quote as QuoteIcon, Sparkles } from 'lucide-react';

export const QuoteSection: React.FC = () => {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Layered Architectural & Mountain Editorial Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-gradient-to-b from-[#F3F0EA] via-[#EAE5D9] to-[#DFD8C8] p-8 sm:p-16 lg:p-20 text-center">
          {/* Stylized Mountain Panorama Vector Illustration Behind Quote */}
          <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden" aria-hidden="true">
            {/* Distant Mountain Peak Layer */}
            <svg
              className="absolute bottom-0 left-0 right-0 w-full h-64 text-[#A8A29E]"
              preserveAspectRatio="none"
              viewBox="0 0 1200 400"
              fill="currentColor"
            >
              <path d="M0,400 L0,220 L180,110 L340,240 L520,70 L720,260 L900,90 L1100,210 L1200,160 L1200,400 Z" opacity="0.4" />
            </svg>

            {/* Midground Ridge Layer */}
            <svg
              className="absolute bottom-0 left-0 right-0 w-full h-48 text-[#78716C]"
              preserveAspectRatio="none"
              viewBox="0 0 1200 300"
              fill="currentColor"
            >
              <path d="M0,300 L0,180 L220,90 L420,210 L600,120 L840,230 L1020,110 L1200,190 L1200,300 Z" opacity="0.6" />
            </svg>

            {/* Foreground Slope with Subtle Golden Dawn Rim */}
            <svg
              className="absolute bottom-0 left-0 right-0 w-full h-32 text-[#57534E]"
              preserveAspectRatio="none"
              viewBox="0 0 1200 200"
              fill="currentColor"
            >
              <path d="M0,200 L0,130 L300,60 L600,140 L900,50 L1200,120 L1200,200 Z" opacity="0.8" />
            </svg>

            {/* Golden Horizon Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
          </div>

          {/* Quote Typography in Foreground (z-10) */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#0A192F] text-[#E05A1B] flex items-center justify-center mb-6 shadow-md">
              <QuoteIcon className="w-5 h-5 fill-current" />
            </div>

            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[#0A192F] leading-snug tracking-tight mb-8 text-balance font-normal">
              "The greatest wealth is not what you accumulate in haste, but what you compound through patience, discipline, and vision."
            </blockquote>

            <div className="flex flex-col items-center">
              <div className="h-px w-16 bg-[#E05A1B] mb-3" />
              <cite className="not-italic text-sm font-semibold tracking-wider uppercase text-[#0A192F]">
                Sundaram Investment Philosophy
              </cite>
              <span className="text-xs text-slate-500 font-serif italic mt-0.5">
                Three Decades of Fiduciary Stewardship · Est. 1996
              </span>
            </div>

            {/* Ball corridor notice */}
            <div className="mt-10 inline-flex items-center gap-2 text-xs text-slate-600 bg-white/70 backdrop-blur-xs px-4 py-1.5 rounded-full border border-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-[#E05A1B]" />
              <span>Approaching the Final Destination: Goal Post Ahead</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
