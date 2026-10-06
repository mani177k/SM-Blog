import React, { useState } from 'react';
import { Target, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PERSONA_GUIDES, ARTICLES } from '../data/mockData';
import { Article } from '../types';

interface DiscoveryEngineProps {
  onSelectArticle: (article: Article | string) => void;
}

export const DiscoveryEngine: React.FC<DiscoveryEngineProps> = ({ onSelectArticle }) => {
  const [activePersonaId, setActivePersonaId] = useState<string>(PERSONA_GUIDES[0].id);

  const activePersona = PERSONA_GUIDES.find((p) => p.id === activePersonaId) || PERSONA_GUIDES[0];
  const recommendedArticles = ARTICLES.filter((a) =>
    activePersona.recommendedArticleIds.includes(a.id)
  );

  return (
    <section id="discovery" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-300 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B83E18] mb-1">
              <span>Section 05</span>
              <span>·</span>
              <span>Personalized Advisory Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#081728] tracking-tight">
              Find Your Next Insight in 60 Seconds
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 max-w-md font-medium">
            Select your wealth life stage. Our algorithmic curation highlights high-conviction allocation frameworks and tailored literature.
          </p>
        </div>

        {/* 4 Persona Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {PERSONA_GUIDES.map((persona) => {
            const isSelected = persona.id === activePersonaId;
            return (
              <button
                key={persona.id}
                onClick={() => setActivePersonaId(persona.id)}
                className={`text-left p-5 rounded-xl transition-all duration-200 cursor-pointer border relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#081728] text-white border-transparent shadow-xl ring-2 ring-[#B83E18]'
                    : 'bg-white text-slate-900 border-slate-300 hover:border-slate-800 shadow-xs'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                    <div className="w-12 h-12 bg-[#B83E18] rotate-45 transform translate-x-6 -translate-y-6" />
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-white/10 text-amber-400' : 'bg-[#081728]/10 text-[#081728]'
                    }`}
                  >
                    <Target className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isSelected ? 'text-amber-300' : 'text-slate-600'
                    }`}
                  >
                    {persona.horizon}
                  </span>
                </div>

                <h3 className={`text-lg font-serif font-bold mb-1 ${isSelected ? 'text-white' : 'text-[#081728]'}`}>
                  {persona.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-700'}`}>
                  {persona.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Recommendation Panel */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-300 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Blueprint */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B83E18]">
                <Compass className="w-4 h-4" />
                <span>Tailored Allocation Blueprint for: {activePersona.title}</span>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-300 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">Risk Profile:</span>
                  <span className="font-bold text-[#081728] text-sm">{activePersona.riskProfile}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-600 block mb-1 font-medium">Recommended Distribution:</span>
                  <span className="text-sm font-bold text-[#081728] font-mono-num">
                    {activePersona.recommendedAllocation}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-600 block mb-1 font-medium">Prime Tactical Rule:</span>
                  <p className="text-xs text-slate-800 italic font-medium">
                    "{activePersona.topStrategy}"
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Matched Articles */}
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                Mandatory Reading for this Horizon
              </span>
              <div className="space-y-3">
                {recommendedArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => onSelectArticle(article)}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-300 hover:border-[#081728] hover:bg-white transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B83E18] block mb-1">
                        {article.category} · {article.readTime}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-[#081728] group-hover:text-[#B83E18] transition-colors leading-snug">
                        {article.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#081728] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
