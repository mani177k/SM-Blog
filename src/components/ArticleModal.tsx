import React from 'react';
import { X, Clock, Bookmark, Share2, ArrowLeft, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="bg-[#F8F7F4] text-[#1E293B] rounded-2xl max-w-3xl w-full my-auto overflow-hidden shadow-2xl border border-slate-300 relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Control Bar */}
        <div className="sticky top-0 bg-[#F8F7F4]/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0A192F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dispatch</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-md border text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#E05A1B] text-white border-[#E05A1B]'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-800'
              }`}
              title="Bookmark article"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isBookmarked ? 'Bookmarked' : 'Save'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="px-6 sm:px-12 py-8 max-h-[80vh] overflow-y-auto">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <span className="font-semibold text-[#E05A1B] uppercase tracking-wider">
              {article.category}
            </span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-[#0A192F] leading-tight mb-6">
            {article.title}
          </h1>

          {/* Author Byline */}
          <div className="flex items-center gap-3 pb-6 mb-8 border-b border-slate-200">
            <div className="w-10 h-10 rounded-full bg-[#0A192F] text-white flex items-center justify-center font-serif text-sm font-semibold">
              {article.author.avatarInitials}
            </div>
            <div>
              <div className="text-sm font-semibold text-[#0A192F]">{article.author.name}</div>
              <div className="text-xs text-slate-500">{article.author.role} · Sundaram AMC</div>
            </div>
          </div>

          {/* Highlight stat if present */}
          {article.highlightStat && (
            <div className="bg-white border-l-4 border-[#E05A1B] rounded-r-lg p-5 mb-8 shadow-xs">
              <div className="text-2xl font-serif font-bold text-[#0A192F] font-mono-num mb-1">
                {article.highlightStat}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {article.highlightLabel}
              </div>
            </div>
          )}

          {/* Narrative Body */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-base font-normal">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#0A192F] text-lg leading-relaxed'
                    : 'text-base leading-relaxed'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Regulatory End Note */}
          <div className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500 italic">
            Disclaimer: Opinions expressed belong to the Sundaram research desk. This analytical essay does not constitute an explicit scheme recommendation.
          </div>
        </div>
      </div>
    </div>
  );
};
