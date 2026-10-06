import React from 'react';
import { Search, Compass, BookMarked, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
  scrollProgress: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenBookmarks,
  bookmarkCount,
  scrollProgress
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F4]/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand title, single element */}
        <a
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#0A192F] group"
        >
          <div className="w-8 h-8 rounded-sm bg-[#0A192F] flex items-center justify-center text-white relative overflow-hidden shadow-sm group-hover:bg-[#E05A1B] transition-colors">
            <span className="font-serif text-lg font-bold">S</span>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#E05A1B] rotate-45 transform group-hover:bg-white transition-colors" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-semibold tracking-wider text-[#0A192F] uppercase">Sundaram Mutual</span>
            <span className="text-[10px] tracking-widest text-[#E05A1B] font-medium uppercase mt-0.5">Insights & Journal</span>
          </div>
        </a>

        {/* Zone 2: 4-6 text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => scrollToSection('categories')}
            className="hover:text-[#0A192F] transition-colors cursor-pointer"
          >
            Categories
          </button>
          <button
            onClick={() => scrollToSection('featured')}
            className="hover:text-[#0A192F] transition-colors cursor-pointer"
          >
            Featured Insights
          </button>
          <button
            onClick={() => scrollToSection('recent')}
            className="hover:text-[#0A192F] transition-colors cursor-pointer"
          >
            Recent Dispatches
          </button>
          <button
            onClick={() => scrollToSection('discovery')}
            className="hover:text-[#0A192F] transition-colors cursor-pointer"
          >
            Discovery Engine
          </button>
          <button
            onClick={() => scrollToSection('videos')}
            className="hover:text-[#0A192F] transition-colors cursor-pointer"
          >
            Keynote Briefs
          </button>
          <button
            onClick={() => scrollToSection('tools')}
            className="hover:text-[#0A192F] transition-colors cursor-pointer"
          >
            Financial Calculators
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-600 hover:text-[#0A192F] hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
            title="Search Insights (Ctrl+K)"
            aria-label="Search insights"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>

          <button
            onClick={onOpenBookmarks}
            className="relative p-2 text-slate-600 hover:text-[#0A192F] hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
            title="Reading List"
            aria-label="Saved articles"
          >
            <BookMarked className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E05A1B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {bookmarkCount}
              </span>
            )}
          </button>

          <a
            href="#tools"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0A192F] hover:bg-[#E05A1B] rounded-md transition-all shadow-sm whitespace-nowrap"
          >
            <span>Plan Investment</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 3D Journey Progress Ribbon */}
      <div className="h-1 bg-slate-200/60 w-full relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#0A192F] via-[#E05A1B] to-[#C59B27] transition-all duration-150 ease-out"
          style={{ width: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%` }}
        />
        <div className="absolute right-3 top-[-1px] text-[9px] font-mono-num text-slate-400 font-medium select-none pointer-events-none hidden md:block">
          {scrollProgress >= 0.96 ? (
            <span className="text-[#E05A1B] font-bold">⚽ GOAL ZONE REACHED</span>
          ) : (
            <span>BALL JOURNEY: {Math.round(scrollProgress * 100)}%</span>
          )}
        </div>
      </div>
    </header>
  );
};
