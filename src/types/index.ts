export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Equities' | 'Mutual Funds' | 'Retirement' | 'Debt & Fixed Income' | 'Market Insights' | 'Personal Finance' | 'Tax Planning' | 'ESG';
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  readTime: string;
  date: string;
  featured?: boolean;
  highlightStat?: string;
  highlightLabel?: string;
}

export interface VideoInsight {
  id: string;
  title: string;
  speaker: string;
  role: string;
  duration: string;
  views: string;
  category: string;
  summary: string;
  embedId: string;
}

export interface PersonaGuide {
  id: string;
  title: string;
  subtitle: string;
  horizon: string;
  riskProfile: string;
  recommendedAllocation: string;
  topStrategy: string;
  recommendedArticleIds: string[];
}

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}
