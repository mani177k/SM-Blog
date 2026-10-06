import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Clock, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface FeaturedArticlesProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  bookmarkedIds: Set<string>;
}

export const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({
  articles,
  onSelectArticle,
  onToggleBookmark,
  bookmarkedIds
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredList = articles.slice(0, 3);
  if (featuredList.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? featuredList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === featuredList.length - 1 ? 0 : prev + 1));
  };

  const activeArticle = featuredList[activeIndex];

  return (
    <section id="featured" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-300 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B83E18] mb-1">
              <span>Section 03</span>
              <span>·</span>
              <span>Lead Editorial Perspectives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#081728] tracking-tight">
              Featured Articles
            </h2>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-700 font-mono-num font-bold">
              {activeIndex + 1} of {featuredList.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-slate-400 hover:border-slate-900 bg-white hover:bg-slate-50 text-slate-900 transition-colors cursor-pointer"
                aria-label="Previous article"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-slate-400 hover:border-slate-900 bg-white hover:bg-slate-50 text-slate-900 transition-colors cursor-pointer"
                aria-label="Next article"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3-Card Carousel Container with Active Center Elevation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Active Center Lead Story */}
          <div className="lg:col-span-8 bg-white border border-slate-300 rounded-2xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-sm group">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#081728] via-[#B83E18] to-amber-500" />

            <div>
              {/* Unboxed metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 font-medium mb-4">
                <span className="font-bold text-[#B83E18] uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                  {activeArticle.readTime}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded">
                  <Sparkles className="w-3 h-3" /> Lead Analysis
                </span>
              </div>

              {/* Title */}
              <h3
                onClick={() => onSelectArticle(activeArticle)}
                className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#081728] leading-tight mb-4 hover:text-[#B83E18] transition-colors cursor-pointer text-balance"
              >
                {activeArticle.title}
              </h3>

              {/* Excerpt */}
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed mb-6 font-normal">
                {activeArticle.excerpt}
              </p>

              {/* Key Stat Callout */}
              {activeArticle.highlightStat && (
                <div className="bg-slate-50 border border-slate-300 rounded-lg p-4 mb-6 flex items-center gap-4">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-[#081728] font-mono-num">
                    {activeArticle.highlightStat}
                  </div>
                  <div className="text-xs text-slate-800 font-semibold">
                    {activeArticle.highlightLabel}
                  </div>
                </div>
              )}
            </div>

            {/* Author Footer & Actions */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#081728] text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs">
                  {activeArticle.author.avatarInitials}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#081728]">
                    {activeArticle.author.name}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {activeArticle.author.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleBookmark(activeArticle.id)}
                  className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                    bookmarkedIds.has(activeArticle.id)
                      ? 'bg-[#B83E18] text-white border-[#B83E18]'
                      : 'border-slate-300 hover:border-slate-800 text-slate-700 bg-white'
                  }`}
                  aria-label="Bookmark article"
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectArticle(activeArticle)}
                  className="px-5 py-2.5 bg-[#081728] hover:bg-[#B83E18] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xs cursor-pointer"
                >
                  Read Full Dispatch
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Secondary Companion Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {featuredList
              .map((article, idx) => ({ article, idx }))
              .filter(({ idx }) => idx !== activeIndex)
              .map(({ article, idx }) => (
                <div
                  key={article.id}
                  onClick={() => setActiveIndex(idx)}
                  className="bg-white border border-slate-300 rounded-xl p-5 hover:border-[#081728] transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium mb-2">
                      <span className="font-bold text-slate-900 uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h4 className="text-lg font-serif font-bold text-[#081728] leading-snug mb-2 group-hover:text-[#B83E18] transition-colors">
                      {article.title}
                    </h4>

                    <p className="text-xs text-slate-700 line-clamp-2 mb-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-3 border-t border-slate-200">
                    <span>By {article.author.name}</span>
                    <span className="text-[#081728] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Switch to view <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
