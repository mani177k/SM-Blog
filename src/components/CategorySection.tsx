import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface CategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectArticle: (articleTitle: string) => void;
}

interface CarouselItem {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatarInitials: string;
  };
  date: string;
  readTime: string;
  category: string;
}

const CAROUSEL_ARTICLES: CarouselItem[] = [
  {
    id: 'volatility-2025',
    tag: 'MARKETS',
    title: 'Understanding Market Volatility in 2025',
    excerpt: 'Key trends, opportunities and systemic risks that will shape the financial landscape across asset cycles.',
    author: {
      name: 'Arjun N',
      avatarInitials: 'AN'
    },
    date: 'Sep 08, 2025',
    readTime: '6 min read',
    category: 'Markets'
  },
  {
    id: 'india-growth-2026',
    tag: 'ECONOMY & MACRO',
    title: "India's Growth Outlook for 2026",
    excerpt: 'Analyzing structural capital expenditures, domestic consumption resiliency, and central bank interest rate glide paths.',
    author: {
      name: 'Rohit Mathur',
      avatarInitials: 'RM'
    },
    date: 'Sep 12, 2025',
    readTime: '8 min read',
    category: 'Investing'
  },
  {
    id: 'debt-strategies-2025',
    tag: 'STRATEGY',
    title: 'Navigating Strategies in a Shifting Economy',
    excerpt: 'Building resilient multi-asset portfolios for capital preservation and sustained yield in uncertain times.',
    author: {
      name: 'Meera Chidambaram',
      avatarInitials: 'MC'
    },
    date: 'Sep 18, 2025',
    readTime: '5 min read',
    category: 'Mutual Funds'
  },
  {
    id: 'stepup-sips',
    tag: 'PERSONAL FINANCE',
    title: 'Small Steps, Big Wealth: The Power of Step-Up SIPs',
    excerpt: 'How increasing your monthly contribution by just 10% each year accelerates your wealth journey toward financial freedom.',
    author: {
      name: 'Sunil Subramaniam',
      avatarInitials: 'SS'
    },
    date: 'Oct 04, 2025',
    readTime: '7 min read',
    category: 'Personal Finance'
  }
];

const CATEGORY_PILLS = [
  { label: 'All (301)', value: 'All' },
  { label: 'Investing', value: 'Investing' },
  { label: 'Personal Finance', value: 'Personal Finance' },
  { label: 'Markets', value: 'Markets' },
  { label: 'Mutual Funds', value: 'Mutual Funds' },
  { label: 'Retirement', value: 'Retirement' },
  { label: 'Tax Planning', value: 'Tax Planning' },
  { label: 'More +', value: 'More' }
];

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectArticle
}) => {
  // Center active card index (defaults to index 1: "India's Growth Outlook for 2026" matching screenshot)
  const [activeIndex, setActiveIndex] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    // 15 seconds auto-advance cadence
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === CAROUSEL_ARTICLES.length - 1 ? 0 : prev + 1));
    }, 15000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CAROUSEL_ARTICLES.length - 1 : prev - 1));
    resetTimer();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === CAROUSEL_ARTICLES.length - 1 ? 0 : prev + 1));
    resetTimer();
  };

  const total = CAROUSEL_ARTICLES.length;

  return (
    <section id="categories" className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Centered Section Title matching image.png */}
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#081728] tracking-tight">
            Explore by Category
          </h2>
        </div>

        {/* Centered Category Pills Row matching image.png */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto mb-14">
          {CATEGORY_PILLS.map((pill) => {
            const isActive =
              (pill.value === 'All' && selectedCategory === 'All') ||
              selectedCategory === pill.value;

            return (
              <button
                key={pill.label}
                onClick={() => onSelectCategory(pill.value === 'More' ? 'All' : pill.value)}
                className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shadow-2xs ${
                  isActive
                    ? 'bg-[#0B1528] text-white shadow-md font-bold'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 hover:border-slate-400'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* 3D Depth Card Carousel matching image.png */}
        <div className="relative max-w-6xl mx-auto flex items-center justify-center min-h-[520px] px-2 sm:px-14 lg:px-20">
          {/* Left Arrow Button - Positioned with generous breathing space from cards */}
          <button
            onClick={handlePrev}
            className="absolute -left-2 sm:left-0 lg:-left-2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hover:border-slate-400"
            aria-label="Previous insight"
            title="Previous (15s auto-cycle)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button - Positioned with generous breathing space from cards */}
          <button
            onClick={handleNext}
            className="absolute -right-2 sm:right-0 lg:-right-2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hover:border-slate-400"
            aria-label="Next insight"
            title="Next (15s auto-cycle)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Carousel Cards Layering with Smooth Interpolation & Transitions */}
          <div className="relative w-full flex items-center justify-center min-h-[480px]">
            {CAROUSEL_ARTICLES.map((article, idx) => {
              // Calculate relative offset from activeIndex: -1 (prev), 0 (active), +1 (next)
              let diff = idx - activeIndex;
              if (diff < -1) diff += total;
              if (diff > total - 2) diff -= total;

              const isCenter = diff === 0;
              const isLeft = diff === -1 || (activeIndex === 0 && idx === total - 1);
              const isRight = diff === 1 || (activeIndex === total - 1 && idx === 0);
              const isVisible = isCenter || isLeft || isRight;

              // Compute smooth transform styles
              let transformClass = 'opacity-0 pointer-events-none scale-75 z-0 translate-x-0';
              if (isCenter) {
                transformClass = 'opacity-100 z-20 scale-100 translate-x-0 shadow-2xl pointer-events-auto';
              } else if (isLeft) {
                transformClass =
                  'hidden md:block opacity-55 hover:opacity-80 z-10 scale-90 -translate-x-64 lg:-translate-x-76 shadow-md pointer-events-auto cursor-pointer';
              } else if (isRight) {
                transformClass =
                  'hidden md:block opacity-55 hover:opacity-80 z-10 scale-90 translate-x-64 lg:translate-x-76 shadow-md pointer-events-auto cursor-pointer';
              }

              if (!isVisible) return null;

              return (
                <div
                  key={article.id}
                  onClick={() => {
                    if (isCenter) {
                      onSelectArticle(article.title);
                    } else if (isLeft) {
                      handlePrev();
                    } else if (isRight) {
                      handleNext();
                    }
                  }}
                  className={`absolute w-full max-w-sm sm:max-w-md bg-white rounded-2xl border border-slate-200/90 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${transformClass}`}
                >
                  {/* Header Visual Banner: Calm Sunset Water Horizon matching image.png */}
                  <div className="h-48 sm:h-54 w-full relative overflow-hidden bg-gradient-to-b from-[#FDE68A] via-[#FB923C] to-[#0284C7] transition-all duration-700">
                    <svg className="w-full h-full object-cover" viewBox="0 0 500 240" preserveAspectRatio="none">
                      <defs>
                        <radialGradient id={`sun-glow-${article.id}`} cx="50%" cy="45%" r="60%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                          <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.85" />
                          <stop offset="55%" stopColor="#FB923C" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#0369A1" stopOpacity="0.4" />
                        </radialGradient>
                        <linearGradient id={`water-${article.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                          <stop offset="30%" stopColor="#0F172A" stopOpacity="0.75" />
                          <stop offset="100%" stopColor="#020617" stopOpacity="0.9" />
                        </linearGradient>
                      </defs>

                      {/* Sky field */}
                      <rect width="500" height="240" fill={`url(#sun-glow-${article.id})`} />

                      {/* Golden Sun disk on horizon */}
                      <circle cx="250" cy="115" r="22" fill="#FFFFFF" opacity="0.95" />
                      <ellipse cx="250" cy="115" rx="55" ry="12" fill="#FFFBEB" opacity="0.7" />

                      {/* Horizon Line and Serene Water plane */}
                      <line x1="0" y1="118" x2="500" y2="118" stroke="#FDE047" strokeWidth="1.5" opacity="0.8" />
                      <rect y="118" width="500" height="122" fill={`url(#water-${article.id})`} />

                      {/* Calm horizontal water ripples & sun reflection path */}
                      <polygon points="250,118 220,240 280,240" fill="#FEF08A" opacity="0.25" />
                      <ellipse cx="250" cy="130" rx="35" ry="3" fill="#FFFFFF" opacity="0.5" />
                      <ellipse cx="250" cy="150" rx="50" ry="4" fill="#FEF08A" opacity="0.4" />
                      <ellipse cx="250" cy="175" rx="65" ry="5" fill="#FDBA74" opacity="0.3" />
                      <ellipse cx="250" cy="205" rx="85" ry="6" fill="#FDBA74" opacity="0.2" />
                    </svg>

                    {/* Subtle soft lens flare */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-20 bg-amber-200/30 blur-2xl rounded-full pointer-events-none" />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    {/* Category Kicker */}
                    <span className="text-xs font-bold uppercase tracking-widest text-[#B83E18] block mb-2 font-sans">
                      {article.tag}
                    </span>

                    {/* Main Article Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#081728] leading-tight mb-3 hover:text-[#B83E18] transition-colors">
                      {article.title}
                    </h3>

                    {/* Article Excerpt */}
                    <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Card Footer: Author + Orange Circular Action Button */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Author Avatar */}
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-800 font-bold text-xs shadow-2xs">
                          {article.author.avatarInitials}
                        </div>

                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {article.author.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {article.date} • {article.readTime}
                          </div>
                        </div>
                      </div>

                      {/* Circular Terracotta/Rust Arrow Button */}
                      <div className="w-10 h-10 rounded-full bg-[#B83E18] hover:bg-[#D0481E] text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-md">
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom 4 Indicator Dots with Auto-play Progress matching image.png */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-2">
            {CAROUSEL_ARTICLES.map((_, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    resetTimer();
                  }}
                  className={`transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'w-7 h-1.5 rounded-full bg-[#B83E18]'
                      : 'w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Auto-advancing every 15 seconds
          </span>
        </div>
      </div>
    </section>
  );
};
