import React from 'react';
import { ArrowDown, ArrowRight, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';
import { MARKET_INDICES } from '../data/mockData';

interface HeroSectionProps {
  onExploreClick: () => void;
  onToolsClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onToolsClick }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Hero Editorial Typography with High-Contrast Legibility */}
        <div className="lg:col-span-8 z-10">
          {/* Eyebrow kicker */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-0.5 w-8 bg-[#B83E18]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#B83E18]">
              Sundaram Mutual · Institutional Perspectives
            </span>
            <span className="text-xs text-slate-600 font-serif italic">Est. 1996</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#081728] leading-[1.08] mb-6 text-balance">
            INSIGHTS <span className="font-serif italic font-normal text-slate-800">THAT</span> MATTER
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl font-serif italic text-slate-900 font-normal mb-5 max-w-2xl">
            "Ideas for a brighter financial tomorrow."
          </p>

          {/* Supporting Text - High contrast dark slate */}
          <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed mb-8 max-w-2xl">
            Curated macroeconomic analysis, disciplined wealth compounding frameworks, and actionable investment philosophies from India's premier fund management research desks.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#081728] hover:bg-[#B83E18] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md group cursor-pointer"
            >
              <span>EXPLORE ALL ARTICLES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onToolsClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-slate-800 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-xs cursor-pointer"
            >
              <span>Calculate Your SIP Journey</span>
            </button>
          </div>

          {/* Journey Cue Hint */}
          <div className="mt-10 flex items-center gap-3 text-xs text-slate-700 font-medium">
            <div className="w-2.5 h-2.5 rounded-full bg-[#B83E18] animate-pulse" />
            <span className="font-bold text-slate-900">3D Interactive Journey:</span>
            <span>Scroll down to Section 2 where the 3D football emerges to begin its journey to the goal.</span>
          </div>
        </div>

        {/* Right Column: Solid high-contrast informational card */}
        <div className="lg:col-span-4 relative flex flex-col justify-center items-end pointer-events-none">
          <div className="w-full max-w-sm rounded-xl border border-slate-300 bg-white/95 backdrop-blur-md p-6 shadow-md hidden sm:block pointer-events-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Editorial Dispatch Vol. 28
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#B83E18] font-bold">
                <Sparkles className="w-3 h-3" /> Live Edition
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#081728] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-800 leading-snug">
                  Over <strong className="font-bold text-slate-900">₹62,000+ Crores</strong> in managed investor trust across Indian equities and fixed income.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <TrendingUp className="w-4 h-4 text-[#B83E18] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-800 leading-snug">
                  Research-driven alpha grounded in bottom-up fundamental scrutiny and ESG criteria.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 font-medium">
              <span>Scroll down to navigate</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#B83E18] animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Live Market Indicators Ribbon with High Contrast */}
      <div className="max-w-7xl mx-auto w-full mt-8 pt-4 border-t border-slate-300">
        <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-600">
          <span>Market Pulse</span>
          <span>·</span>
          <span>End of Day Benchmark Settlement</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {MARKET_INDICES.map((idx) => (
            <div
              key={idx.name}
              className="bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 flex flex-col justify-between shadow-xs hover:border-slate-800 transition-colors"
            >
              <span className="text-[11px] font-bold text-slate-600 truncate">{idx.name}</span>
              <div className="flex items-baseline justify-between gap-1 mt-1">
                <span className="text-sm font-bold text-[#081728] font-mono-num">{idx.value}</span>
                <span
                  className={`text-xs font-bold font-mono-num ${
                    idx.isPositive ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {idx.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
