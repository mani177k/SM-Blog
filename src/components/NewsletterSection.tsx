import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Macro Outlook',
    'Equity Research'
  ]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="editorial-glass-dark text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle architectural ambient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A192F] via-[#E05A1B] to-[#C59B27]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Briefing Copy */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E05A1B] mb-2">
                <span>Institutional Briefing</span>
                <span>·</span>
                <span>Every Sunday Morning</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight mb-4 leading-tight">
                Stay Ahead of the Market Curve
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-6">
                Receive weekly institutional-grade market commentary, fund manager interviews, and actionable asset allocation notes delivered straight to your inbox.
              </p>

              {/* Topic Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['Macro Outlook', 'Equity Research', 'Fixed Income Accrual', 'Tax Efficiency'].map((topic) => {
                  const checked = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                        checked
                          ? 'bg-[#E05A1B] border-[#E05A1B] text-white font-medium'
                          : 'border-white/20 text-slate-300 hover:border-white/40'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#E05A1B]" />
                <span>Zero promotional noise. Strict institutional fiduciary privacy.</span>
              </div>
            </div>

            {/* Right Column: Submission Form */}
            <div className="lg:col-span-5">
              {isSubmitted ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-400/30">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-white mb-1">
                    Subscription Confirmed
                  </h3>
                  <p className="text-xs text-slate-300">
                    Your first Sunday morning briefing will arrive this weekend at <strong>{email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="newsletter-email" className="text-xs text-slate-300 block mb-1">
                      Professional / Personal Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="investor@domain.com"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-[#E05A1B] focus:ring-1 focus:ring-[#E05A1B] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 bg-[#E05A1B] hover:bg-[#F97316] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Subscribe to Weekly Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Join 140,000+ Indian investors and financial advisors.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
