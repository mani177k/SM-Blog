import React, { useState } from 'react';
import { Calculator, Coins, ShieldAlert, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

export const FinancialToolsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sip' | 'retirement' | 'risk'>('sip');

  // --- SIP Calculator State ---
  const [sipMonthly, setSipMonthly] = useState<number>(15000);
  const [sipRate, setSipRate] = useState<number>(13.5);
  const [sipYears, setSipYears] = useState<number>(15);

  const calculateSip = () => {
    const i = sipRate / 12 / 100;
    const n = sipYears * 12;
    const totalInvested = sipMonthly * n;
    const totalValue = sipMonthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const wealthGain = totalValue - totalInvested;
    return {
      invested: Math.round(totalInvested),
      wealthGain: Math.round(wealthGain),
      totalValue: Math.round(totalValue)
    };
  };
  const sipResult = calculateSip();

  // --- Retirement Calculator State ---
  const [currentAge, setCurrentAge] = useState<number>(32);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyExpense, setMonthlyExpense] = useState<number>(60000);
  const [inflation, setInflation] = useState<number>(6.0);

  const calculateRetirement = () => {
    const yearsToRetire = Math.max(retirementAge - currentAge, 1);
    const futureMonthlyExpense = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetire);
    // Approximate corpus needed for 25 post-retirement years with real return of 2%
    const corpusMultiplier = 25 * 12 * 0.85;
    const targetCorpus = futureMonthlyExpense * corpusMultiplier;
    // Monthly SIP needed at 12% CAGR
    const i = 0.12 / 12;
    const n = yearsToRetire * 12;
    const monthlySipNeeded = targetCorpus / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    return {
      futureMonthlyExpense: Math.round(futureMonthlyExpense),
      targetCorpus: Math.round(targetCorpus),
      monthlySipNeeded: Math.round(monthlySipNeeded)
    };
  };
  const retirementResult = calculateRetirement();

  // --- Risk Profiler State ---
  const [horizonScore, setHorizonScore] = useState<number>(2); // 1 = Short, 2 = Medium, 3 = Long
  const [dipReaction, setDipReaction] = useState<number>(3); // 1 = Panic/Sell, 2 = Hold, 3 = Buy more
  const [priorityGoal, setPriorityGoal] = useState<number>(3); // 1 = Capital Safety, 2 = Regular Income, 3 = Max Growth

  const getRiskProfile = () => {
    const totalScore = horizonScore + dipReaction + priorityGoal;
    if (totalScore >= 7) {
      return {
        label: 'Aggressive Growth',
        description: 'High capacity to absorb cyclical volatility for superior long-term wealth compounding.',
        equity: 80,
        debt: 15,
        gold: 5,
        color: 'text-amber-600'
      };
    } else if (totalScore >= 5) {
      return {
        label: 'Balanced Accumulator',
        description: 'Optimized risk-adjusted growth blending multi-asset stability with active equity upside.',
        equity: 55,
        debt: 35,
        gold: 10,
        color: 'text-blue-600'
      };
    } else {
      return {
        label: 'Conservative Capital Preserver',
        description: 'Prioritizing capital defense and regular accrual cashflows with minimal drawdowns.',
        equity: 25,
        debt: 65,
        gold: 10,
        color: 'text-emerald-700'
      };
    }
  };
  const profileResult = getRiskProfile();

  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section id="tools" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200/80 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E05A1B] mb-1">
              <span>Section 07</span>
              <span>·</span>
              <span>Interactive Decision Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0A192F] tracking-tight">
              Financial Planning Tools
            </h2>
          </div>

          {/* Tool Tab Switcher */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-lg">
            <button
              onClick={() => setActiveTab('sip')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'sip'
                  ? 'bg-white text-[#0A192F] shadow-xs'
                  : 'text-slate-600 hover:text-[#0A192F]'
              }`}
            >
              SIP Growth Calculator
            </button>
            <button
              onClick={() => setActiveTab('retirement')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'retirement'
                  ? 'bg-white text-[#0A192F] shadow-xs'
                  : 'text-slate-600 hover:text-[#0A192F]'
              }`}
            >
              Retirement Corpus Planner
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'risk'
                  ? 'bg-white text-[#0A192F] shadow-xs'
                  : 'text-slate-600 hover:text-[#0A192F]'
              }`}
            >
              Risk Tolerance Profiler
            </button>
          </div>
        </div>

        {/* Dynamic Tool Content */}
        {activeTab === 'sip' && (
          <div className="editorial-glass-card rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders Input Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Monthly SIP Amount</label>
                    <span className="text-base font-semibold text-[#0A192F] font-mono-num">
                      ₹{sipMonthly.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full accent-[#E05A1B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono-num">
                    <span>₹1,000</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Expected Annual Return (CAGR)</label>
                    <span className="text-base font-semibold text-[#0A192F] font-mono-num">
                      {sipRate.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="20"
                    step="0.5"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full accent-[#E05A1B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono-num">
                    <span>8% (Conservative)</span>
                    <span>14% (Historic Equity)</span>
                    <span>20% (Aggressive)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Investment Horizon</label>
                    <span className="text-base font-semibold text-[#0A192F] font-mono-num">
                      {sipYears} {sipYears === 1 ? 'Year' : 'Years'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full accent-[#E05A1B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono-num">
                    <span>1 Year</span>
                    <span>15 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Live Output Card Column */}
              <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Projected Wealth Accumulation
                  </span>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6 font-mono-num">
                    {formatINR(sipResult.totalValue)}
                  </div>

                  <div className="space-y-3 pb-6 border-b border-white/10 text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Total Amount Invested:</span>
                      <strong className="text-white font-mono-num text-sm">{formatINR(sipResult.invested)}</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Estimated Wealth Gain:</span>
                      <strong className="text-[#E05A1B] font-mono-num text-sm font-bold">
                        +{formatINR(sipResult.wealthGain)}
                      </strong>
                    </div>
                  </div>

                  {/* Compounding Visual Ratio Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Invested vs Gain Split</span>
                      <span>
                        {Math.round((sipResult.wealthGain / sipResult.totalValue) * 100)}% Gain
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden flex">
                      <div
                        className="bg-slate-400"
                        style={{ width: `${(sipResult.invested / sipResult.totalValue) * 100}%` }}
                        title="Invested"
                      />
                      <div
                        className="bg-[#E05A1B]"
                        style={{ width: `${(sipResult.wealthGain / sipResult.totalValue) * 100}%` }}
                        title="Wealth Gain"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Assumes monthly compounding cycle</span>
                  <span className="text-[#E05A1B]">Sundaram Calc</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'retirement' && (
          <div className="editorial-glass-card rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Current Age</label>
                    <input
                      type="number"
                      min="20"
                      max="55"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded font-mono-num text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Retirement Target Age</label>
                    <input
                      type="number"
                      min="50"
                      max="75"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded font-mono-num text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-slate-700">Current Monthly Living Expenses</label>
                    <span className="text-sm font-semibold text-[#0A192F] font-mono-num">
                      ₹{monthlyExpense.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="300000"
                    step="5000"
                    value={monthlyExpense}
                    onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                    className="w-full accent-[#E05A1B] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-slate-700">Assumed Annual Inflation Rate</label>
                    <span className="text-sm font-semibold text-[#0A192F] font-mono-num">
                      {inflation.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="9"
                    step="0.5"
                    value={inflation}
                    onChange={(e) => setInflation(Number(e.target.value))}
                    className="w-full accent-[#E05A1B] cursor-pointer"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Required Retirement Corpus at Age {retirementAge}
                  </span>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-[#E05A1B] mb-4 font-mono-num">
                    {formatINR(retirementResult.targetCorpus)}
                  </div>

                  <div className="space-y-3 pb-6 border-b border-white/10 text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Monthly Expense at Age {retirementAge}:</span>
                      <strong className="text-white font-mono-num">{formatINR(retirementResult.futureMonthlyExpense)}</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Recommended Monthly SIP Today:</span>
                      <strong className="text-amber-400 font-mono-num font-bold">
                        {formatINR(retirementResult.monthlySipNeeded)}/mo
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-[11px] text-slate-400">
                  Calculated based on 25-year post-retirement horizon and 12% equity growth assumption.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="editorial-glass-card rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                    1. When will you need significant portions of this capital?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { score: 1, label: '< 3 Years' },
                      { score: 2, label: '3–7 Years' },
                      { score: 3, label: '7+ Years' }
                    ].map((item) => (
                      <button
                        key={item.score}
                        onClick={() => setHorizonScore(item.score)}
                        className={`p-2.5 rounded text-xs font-medium border cursor-pointer ${
                          horizonScore === item.score
                            ? 'bg-[#0A192F] text-white border-[#0A192F]'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                    2. If markets drop 20% in a quarter, what is your instinct?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { score: 1, label: 'Exit to Cash' },
                      { score: 2, label: 'Hold & Wait' },
                      { score: 3, label: 'Invest More' }
                    ].map((item) => (
                      <button
                        key={item.score}
                        onClick={() => setDipReaction(item.score)}
                        className={`p-2.5 rounded text-xs font-medium border cursor-pointer ${
                          dipReaction === item.score
                            ? 'bg-[#0A192F] text-white border-[#0A192F]'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                    3. Your primary portfolio priority:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { score: 1, label: 'Capital Defense' },
                      { score: 2, label: 'Balanced Growth' },
                      { score: 3, label: 'Max Compounding' }
                    ].map((item) => (
                      <button
                        key={item.score}
                        onClick={() => setPriorityGoal(item.score)}
                        className={`p-2.5 rounded text-xs font-medium border cursor-pointer ${
                          priorityGoal === item.score
                            ? 'bg-[#0A192F] text-white border-[#0A192F]'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Your Tailored Investor Profile
                  </span>
                  <div className="text-2xl font-serif font-bold text-white mb-2">
                    {profileResult.label}
                  </div>
                  <p className="text-xs text-slate-300 mb-6">
                    {profileResult.description}
                  </p>

                  <div className="space-y-2 pb-6 border-b border-white/10 text-xs">
                    <span className="text-slate-400 block mb-1">Target Asset Allocation:</span>
                    <div className="flex justify-between text-slate-300">
                      <span>Equities (Alpha & Growth):</span>
                      <strong className="text-emerald-400 font-mono-num">{profileResult.equity}%</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Debt & Sovereign Bonds:</span>
                      <strong className="text-blue-400 font-mono-num">{profileResult.debt}%</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Gold & Tactical Cash:</span>
                      <strong className="text-amber-400 font-mono-num">{profileResult.gold}%</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>SEBI Suitability Matrix</span>
                  <span className="text-[#E05A1B]">Sundaram Research</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
