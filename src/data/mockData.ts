import { Article, VideoInsight, PersonaGuide, MarketIndex } from '../types';

export const MARKET_INDICES: MarketIndex[] = [
  { name: 'NIFTY 50', value: '25,482.60', change: '+0.64%', isPositive: true },
  { name: 'S&P BSE SENSEX', value: '83,210.45', change: '+0.58%', isPositive: true },
  { name: 'NIFTY MIDCAP 150', value: '21,940.10', change: '+1.12%', isPositive: true },
  { name: '10Y G-SEC YIELD', value: '6.78%', change: '-0.04%', isPositive: false },
  { name: 'GOLD (10g / INR)', value: '₹77,450', change: '+0.32%', isPositive: true },
];

export const CATEGORIES = [
  'All',
  'Equities',
  'Mutual Funds',
  'Retirement',
  'Debt & Fixed Income',
  'Market Insights',
  'Personal Finance',
  'Tax Planning',
  'ESG'
] as const;

export const ARTICLES: Article[] = [
  {
    id: 'compounding-horizon',
    title: 'The Compounding Horizon: Why Long-Term Equity Patience Outperforms Market Timing',
    excerpt: 'Examining 25 years of rolling returns in Indian equity markets: why 82% of outperformance stems from staying invested during brief recovery windows rather than anticipating corrections.',
    content: `When investors examine the history of Indian equities over the last quarter century, one empirical reality emerges with unambiguous clarity: the penalty for missing the market's best single trading days far exceeds the benefit of dodging its sharpest contractions.

In a longitudinal study conducted across BSE Sensex data from 2000 through 2025, an initial investment of ₹10,00,000 held continuously delivered an annualized return of roughly 14.2%. However, if an investor stepped out of equities and missed merely the 10 best trading days across that 25-year span, the overall return plummeted by nearly 42%.

Compounding is not simply a mathematical progression; it is psychological endurance. In times of elevated volatility, retail capital frequently migrates to cash at precisely the wrong inflection points. By maintaining systematic discipline—anchored in quality mutual fund portfolios with disciplined asset allocation—investors harness the structural growth of Indian enterprise while neutralizing emotional friction.`,
    category: 'Equities',
    author: {
      name: 'Sunil Subramaniam',
      role: 'Chief Investment Strategist',
      avatarInitials: 'SS'
    },
    readTime: '6 min read',
    date: 'March 28, 2026',
    featured: true,
    highlightStat: '14.2%',
    highlightLabel: '25-Yr Rolling CAGR in Active Disciplined Equities'
  },
  {
    id: 'debt-yield-curves',
    title: 'Navigating Debt Yield Curves: Duration Play in a Shifting Interest Rate Regime',
    excerpt: 'How sovereign debt maturities and corporate credit spreads present tactical accrual opportunities as central banks balance liquidity and structural inflation.',
    content: `Fixed income portfolio construction demands a dual lens: assessing sovereign policy trajectory while managing reinvestment risk. In current domestic debt markets, the yield curve exhibits subtle flattening at the 5-to-7 year segment, presenting compelling risk-adjusted accrual prospects for institutional and retail treasuries alike.

For conservative allocations, target maturity strategies and dynamic bond funds provide optimal agility without forcing unwarranted credit risk exposure. Investors should calibrate portfolio duration against expected rate inflection points, prioritizing liquidity cushions while securing sovereign-backed yields.`,
    category: 'Debt & Fixed Income',
    author: {
      name: 'Dwijendra Srivastava',
      role: 'Chief Investment Officer – Debt',
      avatarInitials: 'DS'
    },
    readTime: '5 min read',
    date: 'March 24, 2026',
    featured: true,
    highlightStat: '6.78%',
    highlightLabel: 'Benchmark 10-Yr Sovereign Yield Anchor'
  },
  {
    id: 'smallcap-dispersion',
    title: 'Small Cap Dispersion vs Large Cap Resilience: Allocation Strategies for 2026',
    excerpt: 'Valuation multiples in broader markets require rigorous bottom-up stock selection. Why institutional capital is bifurcating between high-ROCE compounders and speculative momentum.',
    content: `The divergence between headline index multiples and individual enterprise fundamentals is reaching cyclical peaks. While broad small-cap indices reflect heightened sentiment, individual balance sheets tell a nuanced tale: capital-efficient manufacturing and domestic consumption champions continue to generate resilient return on invested capital.

A balanced multi-cap framework—allocating 50% to large-cap stability, 30% to mid-cap scale, and 20% to high-conviction small-caps—safeguards capital while preserving upside participation in India's structural capex expansion.`,
    category: 'Mutual Funds',
    author: {
      name: 'R. Ravi',
      role: 'Head of Equity Research',
      avatarInitials: 'RR'
    },
    readTime: '7 min read',
    date: 'March 20, 2026',
    featured: true,
    highlightStat: '3.4x',
    highlightLabel: 'Earnings Dispersion across Mid & Small Cap Spheres'
  },
  {
    id: 'sip-rupee-cost-averaging',
    title: 'Systematic Investment Plans: The Mathematical Grace of Rupee Cost Averaging',
    excerpt: 'Deconstructing how monthly automated investments convert interim market drawdowns into higher unit accumulations, dramatically enhancing final IRR.',
    content: `Volatile sideways markets are historically the greatest wealth creation phases for SIP participants. When asset prices correct, each automated installment acquires a higher volume of fund units. When valuation multiples mean-revert, the entire accumulated unit base expands exponentially.

Examining a 10-year rolling SIP spanning high-volatility cycles reveals an average upside premium of 280 basis points over static lump-sum entry points with identical starting capital.`,
    category: 'Personal Finance',
    author: {
      name: 'Meera Chidambaram',
      role: 'VP – Wealth Advisory',
      avatarInitials: 'MC'
    },
    readTime: '4 min read',
    date: 'March 18, 2026'
  },
  {
    id: 'retirement-readiness-index',
    title: 'Closing the Longevity Gap: Why Traditional 60-Year Retirement Math Is Broken',
    excerpt: 'Rising life expectancies and medical inflation mean your post-retirement corpus must outlive a 35-year horizon. Structural frameworks for asset decumulation.',
    content: `Retirement planning in the 21st century is no longer a static preservation exercise. With average lifespans expanding well past 85 years and healthcare expenses compounding at 8-10% annually, a purely fixed-income retirement portfolio suffers catastrophic purchasing power depletion within its second decade.

A modern retirement blueprint requires an active equity allocation of at least 30-40% well into the decumulation phase, combined with systematic withdrawal plans (SWPs) engineered for tax-efficient cash flow continuity.`,
    category: 'Retirement',
    author: {
      name: 'Arunachalam Natarajan',
      role: 'Principal Retirement Strategist',
      avatarInitials: 'AN'
    },
    readTime: '8 min read',
    date: 'March 15, 2026'
  },
  {
    id: 'tax-harvesting-strategies',
    title: 'Tax Harvesting Strategies: Optimizing Capital Gains Legally and Methodically',
    excerpt: 'Actionable blueprints for utilizing annual exempt thresholds and offsetting short-term volatility against long-term liability under current finance regulations.',
    content: `Tax drag is one of the most insidious detractors of compounded net worth. By strategically rebalancing equity mutual fund portfolios each fiscal year before March 31, investors can utilize the ₹1,25,000 annual exemption limit on long-term capital gains (LTCG) without altering their underlying asset allocation.

Pairing tax harvesting with systematic transfer plans (STPs) into equity funds allows investors to maximize real, post-tax net compounding.`,
    category: 'Tax Planning',
    author: {
      name: 'K. Seshadri',
      role: 'Senior Tax & Estate Counsel',
      avatarInitials: 'KS'
    },
    readTime: '5 min read',
    date: 'March 12, 2026'
  },
  {
    id: 'behavioral-biases-bull-runs',
    title: 'Behavioral Biases in Bull Markets: Mastering the Psychology of Restraint',
    excerpt: 'Why recency bias and FOMO lead to late-cycle over-leverage, and how pre-committed rebalancing rules protect wealth from euphoric trapdoors.',
    content: `The greatest enemy of an investor is rarely market mechanics, but psychological overconfidence during prolonged bull runs. When portfolios show double-digit gains for consecutive years, investors naturally conflate market momentum with personal acumen, leading to aggressive risk dilution.

Disciplined institutional investors install rigid rebalancing rules: when equity allocations expand beyond prescribed risk bands (e.g. 70% exceeding an 80% ceiling), profits are methodically harvested and reallocated into high-grade fixed income instruments regardless of market excitement.`,
    category: 'Market Insights',
    author: {
      name: 'Dr. Priya Ramaswamy',
      role: 'Behavioral Finance Lead',
      avatarInitials: 'PR'
    },
    readTime: '6 min read',
    date: 'March 08, 2026'
  },
  {
    id: 'esg-capital-governance',
    title: 'Sustainable Governance: How ESG Metrics Enhance Balance Sheet Longevity',
    excerpt: 'Evaluating environmental accountability, human capital retention, and board transparency as fundamental risk mitigation filters in active fund management.',
    content: `Far from being a philanthropic luxury, robust Environmental, Social, and Governance (ESG) standards represent a core defense mechanism against sudden regulatory penalties, operational litigation, and corporate reputational collapse.

At Sundaram Mutual, sustainability screening filters ensure enterprise valuations are grounded in long-term regulatory compliance, water and energy stewardship, and independent board oversight.`,
    category: 'ESG',
    author: {
      name: 'Vikram Sundar',
      role: 'Senior ESG Research Analyst',
      avatarInitials: 'VS'
    },
    readTime: '6 min read',
    date: 'March 04, 2026'
  }
];

export const VIDEO_INSIGHTS: VideoInsight[] = [
  {
    id: 'macro-keynote-2026',
    title: 'Quarterly Macro Outlook: Managing Tail Risk in Global Uncertainty',
    speaker: 'Sunil Subramaniam',
    role: 'Chief Investment Strategist',
    duration: '18:42',
    views: '42.8k views',
    category: 'Macroeconomics',
    summary: 'A deep-dive institutional presentation analyzing crude price volatility, supply chain nearshoring, and sovereign credit cycles impacting Indian capital markets.',
    embedId: 'macro-q1'
  },
  {
    id: 'sip-15-15-15',
    title: 'The Mathematics of 15-15-15: Compounding ₹1 Crore Through Disciplined SIPs',
    speaker: 'Meera Chidambaram',
    role: 'VP – Wealth Advisory',
    duration: '12:15',
    views: '98.4k views',
    category: 'Wealth Strategies',
    summary: 'Breaking down the classic investment guideline: ₹15,000 monthly for 15 years at an expected 15% CAGR to build a corpus of ₹1 Crore with practical risk scenarios.',
    embedId: 'sip-math'
  },
  {
    id: 'debt-curve-pivots',
    title: 'Decoding Yield Curves: Fixed Income Strategies During RBI Rate Pauses',
    speaker: 'Dwijendra Srivastava',
    role: 'CIO – Debt',
    duration: '14:30',
    views: '24.1k views',
    category: 'Fixed Income',
    summary: 'How treasury desks manage spread risk and duration across 3-year vs 10-year paper as central bank policy trajectories stabilize.',
    embedId: 'debt-pivots'
  }
];

export const PERSONA_GUIDES: PersonaGuide[] = [
  {
    id: 'first-time-investor',
    title: 'First-Time Investor',
    subtitle: 'Starting your wealth journey with clarity and automated discipline',
    horizon: '10+ Years',
    riskProfile: 'Moderate Growth',
    recommendedAllocation: '70% Large & Flexi Cap Equities · 30% Short Duration Debt',
    topStrategy: 'Automated monthly SIP initiated right on salary day with a 10% annual Step-Up.',
    recommendedArticleIds: ['sip-rupee-cost-averaging', 'compounding-horizon']
  },
  {
    id: 'wealth-builder',
    title: 'Wealth Accumulator',
    subtitle: 'Maximizing compounding velocity in prime earning years',
    horizon: '7–15 Years',
    riskProfile: 'Aggressive / High Growth',
    recommendedAllocation: '40% Large Cap · 35% Mid & Small Cap · 15% Thematic/ESG · 10% Gold/Arbitrage',
    topStrategy: 'Core-and-satellite portfolio structure pairing large-cap stability with high-alpha research.',
    recommendedArticleIds: ['compounding-horizon', 'smallcap-dispersion', 'behavioral-biases-bull-runs']
  },
  {
    id: 'pre-retiree',
    title: 'Pre-Retiree & Capital Preserver',
    subtitle: 'Protecting accumulated wealth while structuring dependable post-career cashflows',
    horizon: '3–7 Years',
    riskProfile: 'Conservative Growth',
    recommendedAllocation: '35% Hybrid Equity · 50% High-Grade Sovereign Debt · 15% Cash/Arbitrage',
    topStrategy: 'Transitioning equity windfalls into systematic withdrawal plans (SWP) with healthcare buffers.',
    recommendedArticleIds: ['retirement-readiness-index', 'debt-yield-curves', 'tax-harvesting-strategies']
  },
  {
    id: 'tax-optimizer',
    title: 'Tax & Estate Optimizer',
    subtitle: 'Eliminating portfolio drag through legally vetted capital harvesting frameworks',
    horizon: '3–10 Years',
    riskProfile: 'Balanced',
    recommendedAllocation: '50% ELSS / Equity · 30% Arbitrage/Debt · 20% Sovereign Gold Bonds',
    topStrategy: 'Systematic annual capital gains harvesting to utilize Section 112A exemptions continuously.',
    recommendedArticleIds: ['tax-harvesting-strategies', 'sip-rupee-cost-averaging']
  }
];
