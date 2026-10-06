import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  Headphones,
  Bookmark,
  Share2,
  Link2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
  CheckCircle2,
  HelpCircle,
  Send,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Key
} from 'lucide-react';
import { Article } from '../types';

interface ArticlePageProps {
  onBackToHome: () => void;
  onOpenArticle: (title: string) => void;
  onGetInTouch: () => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  onBackToHome,
  onOpenArticle,
  onGetInTouch
}) => {
  // Interactive reading mode tab
  const [readingMode, setReadingMode] = useState<'30s' | 'takeaways' | 'impact' | 'plain'>('30s');

  // Audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(24);

  // Bookmark state
  const [isBookmarked, setIsBookmarked] = useState(false);

  // AI Assistant Q&A state
  const [aiQuestion, setAiQuestion] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ q: string; a: string }>>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Newsletter memo state
  const [memoEmail, setMemoEmail] = useState('');
  const [memoSubscribed, setMemoSubscribed] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAskAi = (prompt?: string) => {
    const query = prompt || aiQuestion;
    if (!query.trim()) return;

    setIsAiLoading(true);
    setTimeout(() => {
      let answer = '';
      const qLower = query.toLowerCase();
      if (qLower.includes('sip') || qLower.includes('monthly')) {
        answer =
          'Continue your automated SIPs without interruption. Historical data demonstrates that monthly installments deployed during volatile sideways markets acquire fund units at lower NAVs, unlocking superior compound returns when markets mean-revert.';
      } else if (qLower.includes('conservative') || qLower.includes('risk')) {
        answer =
          'Conservative investors should tilt toward high-credit Dynamic Bond funds and Multi-Asset allocation funds, maintaining 20-30% in high-dividend Large Caps while holding 15% in sovereign debt accruals for downside shielding.';
      } else if (qLower.includes('rupee cost') || qLower.includes('averaging')) {
        answer =
          'Rupee Cost Averaging neutralizes the need to time market tops and troughs. By investing a fixed sum periodically, you automatically purchase more units when prices fall and fewer when prices rise, mathematically lowering your weighted unit acquisition cost.';
      } else {
        answer =
          'Based on Sundaram AMC research, the 2025 volatility cycle is primarily valuation-driven rather than structural. We recommend maintaining a 40:25:20:15 multi-asset posture and utilizing temporary index corrections to top up high-conviction equity schemes.';
      }

      setChatLog((prev) => [...prev, { q: query, a: answer }]);
      setAiQuestion('');
      setIsAiLoading(false);
    }, 500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#081728] text-white text-xs px-4 py-2.5 rounded-lg shadow-xl border border-white/20 animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <button
          onClick={onBackToHome}
          className="hover:text-[#081728] font-medium transition-colors cursor-pointer"
        >
          Insights Home
        </button>
        <span>/</span>
        <span>Mutual Funds</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate">Market Volatility 2025</span>
      </div>

      {/* Article Header Metadata */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mb-4">
          <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded text-[11px] uppercase tracking-wider">
            MARKETS
          </span>
          <span className="flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" /> 6 min read
          </span>
          <span>·</span>
          <span>Published Sep 08, 2025</span>
          <span>·</span>
          <span className="text-slate-500">Updated Oct 12, 2025</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#081728] leading-[1.18] mb-5 tracking-tight text-balance">
          Understanding Market Volatility in 2025: Strategic Navigation Across Asset Cycles
        </h1>

        {/* Subhead Deck */}
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-4xl">
          Why regime shifts in monetary policy, resilient domestic retail inflows, and structural sector rotation present compelling entry points for disciplined long-term mutual fund investors.
        </p>
      </div>

      {/* Author Card & Audio Action Strip */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          {/* Author Details */}
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Photo Avatar with professional styling */}
              <div className="w-14 h-14 rounded-full bg-[#081728] overflow-hidden border-2 border-slate-200 flex items-center justify-center text-white font-serif text-lg font-bold shadow-xs">
                <span>AN</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base">Arjun N</span>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200">
                  CFA
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Chief Investment Strategist • 18+ Years Analytical Track Record
              </p>
            </div>
          </div>

          {/* Action Tools: Listen, Bookmark, Share */}
          <div className="flex items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-[#B83E18] text-white border-[#B83E18]'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Playing • 7:12 min</span>
                </>
              ) : (
                <>
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Listen to article • 7:12 min</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsBookmarked(!isBookmarked);
                showToast(isBookmarked ? 'Article removed from bookmarks' : 'Article saved to bookmarks');
              }}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-600 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
              title="Bookmark"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Article link copied to clipboard!');
              }}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-slate-400 transition-colors cursor-pointer"
              title="Copy Link"
            >
              <Link2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Audio playback bar if active */}
        {isPlayingAudio && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3">
            <span className="text-[11px] font-mono-num text-slate-500">01:42</span>
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#B83E18]" style={{ width: '24%' }} />
            </div>
            <span className="text-[11px] font-mono-num text-slate-500">07:12</span>
          </div>
        )}
      </div>

      {/* Main 2-Column Grid: Article Left, Sticky Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Article Narrative & Analytical Exhibits */}
        <div className="lg:col-span-8 space-y-10">
          {/* Executive Summary & Key Takeaways Box */}
          <div className="bg-[#FFF9F5] border-l-4 border-[#B83E18] rounded-r-xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B83E18] mb-4">
              <Key className="w-4 h-4" />
              <span>Executive Summary & Key Takeaways</span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B83E18] mt-2 shrink-0" />
                <span>
                  <strong className="font-semibold text-slate-900">Structural Retail Liquidity Anchor:</strong> Systematic Investment Plans (SIPs) averaging over ₹23,000 crore monthly continue to act as a resilient shock-absorber against volatile Foreign Portfolio Investment (FPI) outflows.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B83E18] mt-2 shrink-0" />
                <span>
                  <strong className="font-semibold text-slate-900">Valuation Decoupling:</strong> While headline indices trade marginally above 10-year historical means, earnings delivery in private capex, banking, and energy efficiency continues to justify selective equity allocations.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B83E18] mt-2 shrink-0" />
                <span>
                  <strong className="font-semibold text-slate-900">Actionable Multi-Asset Posture:</strong> Current volatility rewards a barbell allocation: overweighting high-quality Large Caps for defensive yield while tactically accumulating Mid/Small Cap leaders via disciplined SIP intervals.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 1: Anatomy of 2025 Volatility */}
          <section id="section-1" className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#081728] tracking-tight">
              The Anatomy of 2025 Volatility: Domestic Resilience vs Global Headwinds
            </h2>

            <div className="prose prose-slate max-w-none text-slate-800 text-base leading-relaxed space-y-4">
              <p>
                <span className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#081728]">
                  A
                </span>
                s global capital markets recalibrate expectations around central bank rate trajectories, geopolitical friction points, and foreign currency swings, Indian equities have entered a distinctive regime. Unlike past cycles of synchronized market corrections, the current turbulence is characterized by profound asset-level dispersion rather than broad-based systemic distress.
              </p>
              <p>
                However, resilience does not imply immunity. High nominal interest rates across Western economies have exerted episodic downward pressure on emerging market multiples. Investors navigating this terrain must recognize that volatility is not a defect of modern capitalism; it is the exact mechanism that prices risk and creates compounding opportunities for thoughtful asset allocators.
              </p>
            </div>

            {/* Editorial Pull Quote */}
            <div className="my-8 p-6 sm:p-8 bg-slate-50 border-l-4 border-slate-800 rounded-r-xl">
              <blockquote className="text-lg sm:text-xl font-serif italic text-slate-900 leading-snug mb-3">
                “In periods of transient turbulence, rupee cost averaging through systematic investment plans turns market dispersion into long-term compounding alpha.”
              </blockquote>
              <div className="text-xs font-semibold text-slate-600">
                — Arjun N <span className="font-normal text-slate-500">— Chief Investment Strategist, Sundaram Mutual</span>
              </div>
            </div>
          </section>

          {/* Section 2: Historical Market Drawdowns Table */}
          <section id="section-2" className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#081728] tracking-tight">
              Historical Market Drawdowns & Subsequent 3-Year CAGR (2008–2024)
            </h2>

            <p className="text-sm text-slate-700 leading-relaxed">
              To contextualize today's short-term fluctuations, historical empirical evidence provides unambiguous guidance. When broader indices experience sentiment-driven drawdowns exceeding 10%, the subsequent multi-year horizon has consistently rewarded long-term capital allocators:
            </p>

            {/* High Contrast Data Table matching Article.png */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Nifty 50 Drawdowns vs 3-Year Subsequent Compounding
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Historical Alpha
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100/60 text-slate-600 border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider">
                      <th className="py-3 px-4">Market Episode</th>
                      <th className="py-3 px-4">Max Drawdown</th>
                      <th className="py-3 px-4">Trough Date</th>
                      <th className="py-3 px-4">Subsequent 1Y Return</th>
                      <th className="py-3 px-4">Subsequent 3Y CAGR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-medium text-slate-900">Global Financial Crisis</td>
                      <td className="py-3 px-4 font-mono-num font-semibold text-rose-600">-59.9%</td>
                      <td className="py-3 px-4 text-slate-500">Oct 2008</td>
                      <td className="py-3 px-4 font-mono-num font-semibold text-emerald-600">+91.2%</td>
                      <td className="py-3 px-4 font-mono-num font-bold text-emerald-700">+22.4%</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-medium text-slate-900">Taper Tantrum & Currency Crisis</td>
                      <td className="py-3 px-4 font-mono-num font-semibold text-rose-600">-12.8%</td>
                      <td className="py-3 px-4 text-slate-500">Aug 2013</td>
                      <td className="py-3 px-4 font-mono-num font-semibold text-emerald-600">+41.5%</td>
                      <td className="py-3 px-4 font-mono-num font-bold text-emerald-700">+18.7%</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-medium text-slate-900">China Devaluation & Banking NPAs</td>
                      <td className="py-3 px-4 font-mono-num font-semibold text-rose-600">-22.5%</td>
                      <td className="py-3 px-4 text-slate-500">Feb 2016</td>
                      <td className="py-3 px-4 font-mono-num font-semibold text-emerald-600">+28.3%</td>
                      <td className="py-3 px-4 font-mono-num font-bold text-emerald-700">+15.2%</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-medium text-slate-900">Pandemic Liquidity Shock</td>
                      <td className="py-3 px-4 font-mono-num font-semibold text-rose-600">-38.4%</td>
                      <td className="py-3 px-4 text-slate-500">Mar 2020</td>
                      <td className="py-3 px-4 font-mono-num font-semibold text-emerald-600">+72.5%</td>
                      <td className="py-3 px-4 font-mono-num font-bold text-emerald-700">+25.8%</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-medium text-slate-900">Global Inflation & Rate Hikes</td>
                      <td className="py-3 px-4 font-mono-num font-semibold text-rose-600">-15.1%</td>
                      <td className="py-3 px-4 text-slate-500">Jun 2022</td>
                      <td className="py-3 px-4 font-mono-num font-semibold text-emerald-600">+22.8%</td>
                      <td className="py-3 px-4 font-mono-num font-bold text-emerald-700">+16.9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 italic">
                *Source: Sundaram AMC Research, NSE indices historical total return series. Past performance is not indicative of future returns.
              </div>
            </div>
          </section>

          {/* Section 3: Recommended Allocation Matrix */}
          <section id="section-3" className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#081728] tracking-tight">
              Recommended Allocation for Moderate Risk Profiles
            </h2>

            <p className="text-sm text-slate-700 leading-relaxed">
              In environments where volatility is driven by macro sentiment rather than deteriorating fundamental earnings, prudent asset allocation remains an investor's first line of defense. Below is our institutional recommendation framework for a 3-to-5 year investment horizon:
            </p>

            {/* Target Multi-Asset Blend Container */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Target Multi-Asset Blend (2025–2026)
                  </h4>
                  <span className="text-xs text-slate-500">Calibrated for capital appreciation with downside volatility dampening</span>
                </div>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded">
                  MODERATE RISK
                </span>
              </div>

              {/* Segmented Progress Bar */}
              <div className="h-3 w-full rounded-full overflow-hidden flex shadow-inner">
                <div className="bg-[#081728]" style={{ width: '40%' }} title="Large Cap Equities (40%)" />
                <div className="bg-emerald-600" style={{ width: '25%' }} title="Mid & Small Cap (25%)" />
                <div className="bg-[#B83E18]" style={{ width: '20%' }} title="Dynamic Bond & Debt (20%)" />
                <div className="bg-amber-500" style={{ width: '15%' }} title="Gold & Arbitrage (15%)" />
              </div>

              {/* 4 Multi-Asset Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#081728]" />
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Large Cap Equities</span>
                    </div>
                    <p className="text-xs text-slate-600">Focus on balance-sheet leaders and compounding cash flows</p>
                  </div>
                  <span className="text-xl font-bold font-mono-num text-[#081728] ml-2">40%</span>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Mid & Small Cap Equities</span>
                    </div>
                    <p className="text-xs text-slate-600">Accumulate structural themes via disciplined monthly SIPs</p>
                  </div>
                  <span className="text-xl font-bold font-mono-num text-emerald-600 ml-2">25%</span>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#B83E18]" />
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Dynamic Bond & Debt</span>
                    </div>
                    <p className="text-xs text-slate-600">Capture yield curve duration play as central banks ease</p>
                  </div>
                  <span className="text-xl font-bold font-mono-num text-[#B83E18] ml-2">20%</span>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Gold & Arbitrage</span>
                    </div>
                    <p className="text-xs text-slate-600">Geopolitical shock hedge and tactical tax-efficient liquidity</p>
                  </div>
                  <span className="text-xl font-bold font-mono-num text-amber-600 ml-2">15%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Sundaram AI Research Assistant (Interactive Component) */}
          <section id="section-4" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#081728] text-white flex items-center justify-center font-serif font-bold text-sm">
                  S
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#081728]">Sundaram AI Research Assistant</span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      REAL-TIME ENGINE
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">Context-aware synthesis calibrated on Sundaram AMC research corpus</span>
                </div>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> AMFI COMPLIANT INSIGHT
              </span>
            </div>

            {/* Reading Mode Segmented Controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Select Reading Mode:
                </span>
                <span className="text-xs text-slate-400">Switch modes instantly</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: '30s', label: '⚡ 30s Fast' },
                  { id: 'takeaways', label: '📋 Key Takeaways' },
                  { id: 'impact', label: '📊 Portfolio Impact' },
                  { id: 'plain', label: '🗣️ Plain English Explainer' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setReadingMode(tab.id as any)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      readingMode === tab.id
                        ? 'bg-[#081728] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Mode Content Callout */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#B83E18]" />
                  {readingMode === '30s' && '30-Second Executive Summary'}
                  {readingMode === 'takeaways' && 'Structured Key Takeaways'}
                  {readingMode === 'impact' && 'Portfolio & Asset Allocation Impact'}
                  {readingMode === 'plain' && 'Simple Terms Explainer for Everyday Investors'}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {readingMode === '30s' &&
                  'The 2025 market volatility reflects global interest rate adjustments and foreign fund rebalancing, not fundamental domestic distress. High domestic retail SIP inflows (₹23,000+ Cr/month) offer a robust stabilizing floor. Investors should maintain disciplined SIP commitments, use pullbacks to build quality mid-cap exposure, and maintain a 40:25:20:15 multi-asset framework.'}
                {readingMode === 'takeaways' &&
                  '1. Foreign outflows are offset by record domestic SIP inflows. 2. Large Caps offer valuation safety, while selective Mid Caps present structural earnings alpha. 3. Fixed income provides duration gains as rate cycles peak. 4. Never pause SIPs during sideways corrections.'}
                {readingMode === 'impact' &&
                  'Investors with high equity concentration should rebalance 20% into dynamic debt funds to lock in prevailing sovereign yields. Moderate portfolios benefit from tactical 5% gold allocations as a hedge against geopolitical currency fluctuations.'}
                {readingMode === 'plain' &&
                  'Think of market volatility like monsoon rain on fertile land. Short-term travel might slow down, but the crops grow richer. When stock prices drop temporarily, your regular monthly SIP automatically buys more shares for the same money. When sunshine returns, your portfolio blooms.'}
              </p>

              <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                <span>Reading time: 32 seconds</span>
                <span>•</span>
                <span>Risk tolerance: Moderate to Growth</span>
              </div>
            </div>

            {/* Interactive Q&A Box */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-[#B83E18]" /> Ask AI About This Article
                </span>
                <span className="text-[11px] text-slate-400">Interactive Q&A</span>
              </div>

              {/* Sample Prompt Chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  'What does this mean for my monthly SIP?',
                  'How should conservative investors react?',
                  'Explain Rupee Cost Averaging'
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleAskAi(chip)}
                    className="text-[11px] px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    💬 {chip}
                  </button>
                ))}
              </div>

              {/* Chat Thread */}
              {chatLog.length > 0 && (
                <div className="space-y-3 pt-2">
                  {chatLog.map((chat, idx) => (
                    <div key={idx} className="space-y-1.5 text-xs">
                      <div className="p-2.5 bg-slate-100 rounded-lg text-slate-900 font-semibold">
                        Q: {chat.q}
                      </div>
                      <div className="p-3 bg-white border border-slate-200 rounded-lg text-slate-700 leading-relaxed">
                        <strong className="text-[#081728]">Sundaram Research:</strong> {chat.a}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Question Input Form */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                  placeholder="Ask any question regarding this market dispatch..."
                  className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-[#B83E18] focus:bg-white"
                />
                <button
                  onClick={() => handleAskAi()}
                  disabled={isAiLoading || !aiQuestion.trim()}
                  className="px-4 py-2.5 bg-[#B83E18] hover:bg-[#D0481E] disabled:bg-slate-300 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
                >
                  <span>{isAiLoading ? 'Synthesizing...' : 'Ask AI'}</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar (4 cols): Sticky Navigation, Spotlight, Newsletter & Download */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Article Navigation Table of Contents */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span>📋</span> Article Navigation
            </h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => scrollToSection('section-1')}
                className="w-full text-left p-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#081728] flex items-center justify-between cursor-pointer group"
              >
                <span>1. Anatomy of 2025 Volatility</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('section-2')}
                className="w-full text-left p-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#081728] flex items-center justify-between cursor-pointer group"
              >
                <span>2. Historical Drawdowns & 3Y CAGR</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('section-3')}
                className="w-full text-left p-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#081728] flex items-center justify-between cursor-pointer group"
              >
                <span>3. Target Asset Allocation Matrix</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('section-4')}
                className="w-full text-left p-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#081728] flex items-center justify-between cursor-pointer group"
              >
                <span>4. AI Research Synthesis</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Scheme Spotlight Card matching Article.png */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                SCHEME SPOTLIGHT
              </span>
              <span className="text-[10px] text-slate-500 font-medium">GROWTH OPTION</span>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                Sundaram Large & Mid Cap Fund
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Balancing large-cap market stability with high-conviction mid-cap growth enterprises.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold">CURRENT NAV</span>
                <div className="text-lg font-bold text-slate-900 font-mono-num">₹84.20</div>
                <span className="text-[10px] text-emerald-600 font-semibold">+1.24% today</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 font-semibold">3Y ANNUALIZED CAGR</span>
                <div className="text-lg font-bold text-emerald-700 font-mono-num">18.4%</div>
                <span className="text-[10px] text-slate-500">TER: 0.88% (Direct)</span>
              </div>
            </div>

            <button
              onClick={onGetInTouch}
              className="w-full py-2.5 bg-[#081728] hover:bg-[#B83E18] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Explore Scheme Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Newsletter Box: Arjun's Macro Memo */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B83E18]">
              <span>✉️</span> Arjun's Macro Memo
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive weekly concise market intelligence and institutional asset allocation shifts every Monday morning.
            </p>

            {memoSubscribed ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg text-center font-medium">
                ✓ Subscribed successfully with {memoEmail}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (memoEmail) setMemoSubscribed(true);
                }}
                className="space-y-2"
              >
                <input
                  type="email"
                  required
                  value={memoEmail}
                  onChange={(e) => setMemoEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#B83E18]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#B83E18] hover:bg-[#D0481E] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Subscribe Free
                </button>
                <span className="text-[10px] text-slate-400 block text-center">
                  Unsubscribe anytime. Zero spam commitment.
                </span>
              </form>
            )}
          </div>

          {/* Download Tearsheet */}
          <div
            onClick={() => showToast('Downloading Institutional Tearsheet PDF (1.4 MB)...')}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between hover:border-slate-400 transition-colors cursor-pointer group"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#B83E18] transition-colors">
                Download Article Tearsheet
              </div>
              <span className="text-[11px] text-slate-500">Includes full charts & tables (PDF • 1.4 MB)</span>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-[#081728] transition-colors shrink-0 ml-2" />
          </div>
        </div>
      </div>

      {/* Recommended Insights & Market Perspectives (Continue Reading) */}
      <div className="mt-20 pt-10 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B83E18]">
              CONTINUE READING
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#081728] tracking-tight">
              Recommended Insights & Market Perspectives
            </h3>
          </div>
          <button
            onClick={onBackToHome}
            className="text-xs font-bold text-[#081728] hover:text-[#B83E18] inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Market Editorial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Companion Cards matching Article.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => onOpenArticle('Small Steps, Big Wealth: The Power of Step-Up SIPs')}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                <span className="font-bold text-[#081728] uppercase tracking-wider">
                  PERSONAL FINANCE
                </span>
                <span>5 min read · Oct 04, 2025</span>
              </div>
              <h4 className="text-lg font-serif font-bold text-[#081728] group-hover:text-[#B83E18] transition-colors leading-snug mb-2">
                Small Steps, Big Wealth: The Power of Step-Up SIPs
              </h4>
              <p className="text-xs text-slate-600 line-clamp-3 mb-4">
                How increasing your monthly contribution by just 10% each year accelerates your journey toward financial freedom exponentially.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Editorial Desk</span>
              <span className="text-[#081728] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Story <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div
            onClick={() => onOpenArticle("India's Growth Outlook for 2026: The Manufacturing Renaissance")}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                <span className="font-bold text-[#081728] uppercase tracking-wider">
                  ECONOMY & POLICY
                </span>
                <span>6 min read · Sep 28, 2025</span>
              </div>
              <h4 className="text-lg font-serif font-bold text-[#081728] group-hover:text-[#B83E18] transition-colors leading-snug mb-2">
                India's Growth Outlook for 2026: The Manufacturing Renaissance
              </h4>
              <p className="text-xs text-slate-600 line-clamp-3 mb-4">
                Evaluating the capital expenditure cycle across semiconductors, defence corridors, and green hydrogen infrastructure.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Macro Research Team</span>
              <span className="text-[#081728] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Story <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div
            onClick={() => onOpenArticle('Smart Tax Saving Strategies Under the New Regime')}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                <span className="font-bold text-[#081728] uppercase tracking-wider">
                  TAX PLANNING
                </span>
                <span>5 min read · Sep 20, 2025</span>
              </div>
              <h4 className="text-lg font-serif font-bold text-[#081728] group-hover:text-[#B83E18] transition-colors leading-snug mb-2">
                Smart Tax Saving Strategies Under the New Regime
              </h4>
              <p className="text-xs text-slate-600 line-clamp-3 mb-4">
                Navigating Section 80C changes, long-term capital gains adjustments, and optimizing post-tax mutual fund returns.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Wealth Advisory Desk</span>
              <span className="text-[#081728] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Story <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
