import React from 'react';
import { Clock, ArrowRight, Bookmark } from 'lucide-react';
import { Article } from '../types';

interface RecentArticlesProps {
  articles: Article[];
  selectedCategory: string;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  bookmarkedIds: Set<string>;
}

export const RecentArticles: React.FC<RecentArticlesProps> = ({
  articles,
  selectedCategory,
  onSelectArticle,
  onToggleBookmark,
  bookmarkedIds
}) => {
  const filtered = selectedCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  return (
    <section id="recent" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-300 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B83E18] mb-1">
              <span>Section 04</span>
              <span>·</span>
              <span>Chronological Research</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#081728] tracking-tight">
              Recent Articles
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 font-medium">
            Showing <strong className="text-slate-900 font-bold">{filtered.length}</strong> dispatches · Clear gaps allow 3D trajectory tracking
          </div>
        </div>

        {/* 3-Column Editorial Grid with High Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((article) => {
            const isBookmarked = bookmarkedIds.has(article.id);
            return (
              <article
                key={article.id}
                className="bg-white rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group border border-slate-300 relative shadow-xs"
              >
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-3 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#081728] uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-slate-700">
                        <Clock className="w-3.5 h-3.5" /> {article.readTime}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(article.id);
                      }}
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
                        isBookmarked ? 'text-[#B83E18]' : 'text-slate-400 hover:text-slate-800'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                      aria-label="Bookmark"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectArticle(article)}
                    className="text-xl sm:text-2xl font-serif font-bold text-[#081728] leading-snug mb-3 group-hover:text-[#B83E18] transition-colors cursor-pointer"
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-700 line-clamp-3 leading-relaxed mb-6 font-normal">
                    {article.excerpt}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#081728] text-white flex items-center justify-center font-serif text-xs font-bold shadow-xs">
                      {article.author.avatarInitials}
                    </div>
                    <span className="text-xs font-semibold text-slate-800">
                      {article.author.name}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectArticle(article)}
                    className="text-xs font-bold text-[#081728] group-hover:text-[#B83E18] inline-flex items-center gap-1 cursor-pointer"
                  >
                    Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
