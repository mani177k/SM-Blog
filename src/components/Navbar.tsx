import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'article';
  onNavigate: (page: 'home' | 'article') => void;
  onOpenSearch: () => void;
  onGetInTouch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onGetInTouch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 px-3 sm:px-6 lg:px-8 pt-3 pb-2 transition-all">
      {/* Floating Dark Navy Pill Container matching image.png */}
      <nav className="max-w-7xl mx-auto bg-[#081728] text-white rounded-2xl shadow-xl border border-white/10 px-5 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Brand Identity with sf monogram and Sundaram Mutual */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
        >
          {/* Monogram Box "sf" */}
          <div className="flex items-center justify-center font-bold tracking-tighter text-white font-sans text-xl sm:text-2xl leading-none">
            <span className="font-serif italic font-extrabold text-2xl mr-0.5 tracking-tighter">s</span>
            <span className="font-serif italic font-extrabold text-2xl tracking-tighter">f</span>
          </div>

          <div className="h-6 w-px bg-white/25" />

          {/* Wordmark */}
          <div className="flex flex-col leading-none">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase font-sans">
              SUNDARAM MUTUAL
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-300 font-light uppercase mt-0.5">
              — Sundaram Finance Group —
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors cursor-pointer ${
              currentPage === 'home'
                ? 'text-white font-bold tracking-wide'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('article')}
            className={`transition-colors cursor-pointer ${
              currentPage === 'article'
                ? 'text-white font-bold tracking-wide'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Mutual Funds
          </button>
          <button
            onClick={() => onNavigate('article')}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Personal Finance
          </button>
          <button
            onClick={() => onNavigate('article')}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Economy & Policy
          </button>
        </div>

        {/* Right: Search Icon + Get in Touch Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Search"
            title="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={onGetInTouch}
            className="bg-[#B83E18] hover:bg-[#D0481E] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer whitespace-nowrap active:scale-98"
          >
            Get in Touch
          </button>
        </div>
      </nav>
    </div>
  );
};
