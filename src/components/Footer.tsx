import React from 'react';
import { ArrowUp, Twitter, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onNavigateHome }) => {
  return (
    <footer className="relative bg-[#081728] text-white pt-16 pb-10 px-4 sm:px-6 lg:px-8 border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Left Column: Brand & Descriptor */}
          <div className="lg:col-span-5 space-y-4">
            <div
              onClick={onNavigateHome}
              className="flex items-center gap-3.5 cursor-pointer group select-none"
            >
              <div className="flex items-center justify-center font-bold tracking-tighter text-white font-sans text-2xl leading-none">
                <span className="font-serif italic font-extrabold text-2xl mr-0.5 tracking-tighter">s</span>
                <span className="font-serif italic font-extrabold text-2xl tracking-tighter">f</span>
              </div>
              <div className="h-6 w-px bg-white/25" />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold tracking-wider text-white uppercase font-sans">
                  SUNDARAM MUTUAL
                </span>
                <span className="text-[10px] tracking-widest text-slate-300 font-light uppercase mt-0.5">
                  — Sundaram Finance Group —
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Explore smart perspectives on business, investing, and the future of smart financial decisions.
            </p>

            <div className="pt-2">
              <button
                onClick={onScrollToTop}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-[#B83E18] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border border-white/10"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Columns: Links matching Article.png */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            {/* Explore Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                EXPLORE
              </h4>
              <ul className="space-y-2.5 text-slate-400">
                <li>
                  <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
                    All Articles
                  </button>
                </li>
                <li>
                  <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
                    Latest Insights
                  </button>
                </li>
                <li>
                  <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
                    Popular Topics
                  </button>
                </li>
                <li>
                  <a href="#tools" className="hover:text-white transition-colors">
                    SIP & Retirement Tools
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                COMPANY
              </h4>
              <ul className="space-y-2.5 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investor Relations</a></li>
              </ul>
            </div>

            {/* Follow Us Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-3 text-slate-400">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B83E18] hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B83E18] hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B83E18] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Risk Notice */}
        <div className="py-4 text-[11px] text-slate-400 leading-relaxed border-b border-white/5 space-y-1">
          <p>
            Mutual Fund investments are subject to market risks, read all scheme related documents carefully. Past performance is not indicative of future returns.
          </p>
          <p className="text-slate-400">
            Sundaram Asset Management Company Limited • Corporate Office: Chennai, India. SEBI Reg No: MF/034/96/2.
          </p>
        </div>

        {/* Bottom Bar matching Article.png */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} Sundaram Mutual Insights. All rights reserved.</p>
          <p className="text-slate-400">Building better financial futures, together.</p>
        </div>
      </div>
    </footer>
  );
};
