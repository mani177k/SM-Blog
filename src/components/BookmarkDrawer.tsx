import React from 'react';
import { X, BookMarked, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
}

export const BookmarkDrawer: React.FC<BookmarkDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-[#E05A1B]" />
            <h3 className="font-serif font-medium text-lg text-[#0A192F]">Saved Reading List</h3>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono-num font-semibold">
              {bookmarkedArticles.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer"
            aria-label="Close bookmarks"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Articles List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <BookMarked className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-700">No saved articles yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Click the bookmark icon on any research dispatch to read later.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50/50 flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-[#E05A1B] uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="text-sm font-serif font-medium text-[#0A192F] hover:text-[#E05A1B] cursor-pointer transition-colors leading-snug mb-2"
                  >
                    {article.title}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>

                  <button
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="text-[#0A192F] font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    Read Dispatch <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-center">
          Persisted locally for your current reading session.
        </div>
      </div>
    </div>
  );
};
