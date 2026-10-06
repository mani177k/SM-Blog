/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { FeaturedArticles } from './components/FeaturedArticles';
import { RecentArticles } from './components/RecentArticles';
import { DiscoveryEngine } from './components/DiscoveryEngine';
import { FeaturedVideoSection } from './components/FeaturedVideoSection';
import { FinancialToolsSection } from './components/FinancialToolsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { QuoteSection } from './components/QuoteSection';
import { GoalCelebrationOverlay } from './components/GoalCelebrationOverlay';
import { Footer } from './components/Footer';
import { ArticlePage } from './components/ArticlePage';
import { ArticleModal } from './components/ArticleModal';
import { SearchModal } from './components/SearchModal';
import { BookmarkDrawer } from './components/BookmarkDrawer';
import { GetInTouchModal } from './components/GetInTouchModal';
import { ARTICLES } from './data/mockData';
import { Article } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'article'>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isGoalScored, setIsGoalScored] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modals & Drawers state
  const [activeArticleModal, setActiveArticleModal] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState<boolean>(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => new Set(['compounding-horizon']));

  // Scroll Progress Listener (Single Source of Truth for 3D Football on BOTH pages)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = Math.max(docHeight - winHeight, 1);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  // Goal milestone notification callback from ThreeCanvas
  const handleGoalProgress = useCallback((progress: number, isGoal: boolean) => {
    setIsGoalScored(isGoal);
  }, []);

  // Bookmark toggle
  const toggleBookmark = useCallback((articleId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(articleId)) {
        next.delete(articleId);
      } else {
        next.add(articleId);
      }
      return next;
    });
  }, []);

  // Scroll to top helper
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateTo = (page: 'home' | 'article') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticle = (article: Article | string) => {
    // Navigate to full dedicated Article page
    setCurrentPage('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bookmarkedArticles = ARTICLES.filter((a) => bookmarkedIds.has(a.id));

  return (
    <div className="relative min-h-screen bg-[#F8F7F4] text-[#0F172A] selection:bg-[#B83E18]/20 selection:text-[#081728]">
      {/* LAYER 1: 3D WORLD CANVAS (Fixed, z-index: 0, pointer-events: none) */}
      {/* Active ONLY on the Homepage; removed from Article page for pure editorial focus */}
      {currentPage === 'home' && (
        <ThreeCanvas
          scrollProgress={scrollProgress}
          onGoalProgress={handleGoalProgress}
        />
      )}

      {/* LAYER 2: WEBSITE CONTENT (Relative, z-index: 10) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Floating Dark Navy Navbar matching image.png */}
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenSearch={() => setIsSearchOpen(true)}
          onGetInTouch={() => setIsGetInTouchOpen(true)}
        />

        {/* Dynamic Page Views */}
        {currentPage === 'home' ? (
          /* HOMEPAGE STORYTELLING JOURNEY (with 3D football emerging from Section 2 to Goal) */
          <main className="flex-1">
            {/* 1. HERO SECTION */}
            <HeroSection
              onExploreClick={() => scrollToSection('categories')}
              onToolsClick={() => scrollToSection('tools')}
            />

            {/* 2. CATEGORY SECTION (Matches image.png with 3D coverflow carousel) */}
            <CategorySection
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectArticle={handleOpenArticle}
            />

            {/* 3. FEATURED ARTICLES */}
            <FeaturedArticles
              articles={ARTICLES}
              onSelectArticle={handleOpenArticle}
              onToggleBookmark={toggleBookmark}
              bookmarkedIds={bookmarkedIds}
            />

            {/* 4. RECENT ARTICLES */}
            <RecentArticles
              articles={ARTICLES}
              selectedCategory={selectedCategory}
              onSelectArticle={handleOpenArticle}
              onToggleBookmark={toggleBookmark}
              bookmarkedIds={bookmarkedIds}
            />

            {/* 5. DISCOVERY ENGINE */}
            <DiscoveryEngine
              onSelectArticle={handleOpenArticle}
            />

            {/* 6. FEATURED VIDEO */}
            <FeaturedVideoSection />

            {/* 7. FINANCIAL TOOLS */}
            <FinancialToolsSection />

            {/* 8. CTA / NEWSLETTER */}
            <NewsletterSection />

            {/* 9. QUOTE SECTION */}
            <QuoteSection />

            {/* 10. GOAL CELEBRATION MILESTONE */}
            <GoalCelebrationOverlay
              isGoal={isGoalScored}
              scrollProgress={scrollProgress}
              onScrollToTop={scrollToTop}
            />
          </main>
        ) : (
          /* ARTICLE PAGE (Pure Editorial Reading Experience Using Brand Theme - No 3D ball animation) */
          <main className="flex-1">
            <ArticlePage
              onBackToHome={() => navigateTo('home')}
              onOpenArticle={(title) => window.scrollTo({ top: 0, behavior: 'smooth' })}
              onGetInTouch={() => setIsGetInTouchOpen(true)}
            />
          </main>
        )}

        {/* FOOTER matching Article.png */}
        <Footer
          onScrollToTop={scrollToTop}
          onNavigateHome={() => navigateTo('home')}
        />
      </div>

      {/* Modals & Overlays */}
      <ArticleModal
        article={activeArticleModal}
        onClose={() => setActiveArticleModal(null)}
        isBookmarked={activeArticleModal ? bookmarkedIds.has(activeArticleModal.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={(article) => {
          handleOpenArticle(article);
          setIsSearchOpen(false);
        }}
      />

      <BookmarkDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onSelectArticle={(article) => {
          handleOpenArticle(article);
          setIsBookmarksOpen(false);
        }}
        onRemoveBookmark={toggleBookmark}
      />

      <GetInTouchModal
        isOpen={isGetInTouchOpen}
        onClose={() => setIsGetInTouchOpen(false)}
      />
    </div>
  );
}
