import React, { useState, useMemo } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');

  const filteredArticles = useMemo(() => {
    if (!query.trim()) return articles.slice(0, 5);
    const q = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.name.toLowerCase().includes(q)
    );
  }, [query, articles]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Input Header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search market insights, SIP strategies, tax frameworks..."
            className="w-full text-base bg-transparent border-none focus:outline-hidden text-slate-900 placeholder-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-md cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-500">
              No matching research found for "{query}". Try searching "Equities", "SIP", or "Tax".
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="p-3.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200 flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-[#E05A1B] uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span>·</span>
                    <span>{article.author.name}</span>
                  </div>
                  <h4 className="text-sm font-serif font-medium text-[#0A192F] group-hover:text-[#E05A1B] transition-colors">
                    {article.title}
                  </h4>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0A192F] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between">
          <span>Press ESC to close</span>
          <span>{filteredArticles.length} matching insights</span>
        </div>
      </div>
    </div>
  );
};
