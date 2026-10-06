import React, { useState } from 'react';
import { Play, Clock, Eye, Video, X, Volume2, UserCheck } from 'lucide-react';
import { VIDEO_INSIGHTS } from '../data/mockData';
import { VideoInsight } from '../types';

export const FeaturedVideoSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoInsight | null>(null);
  const featured = VIDEO_INSIGHTS[0];
  const secondaryVideos = VIDEO_INSIGHTS.slice(1);

  return (
    <section id="videos" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200/80 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E05A1B] mb-1">
              <span>Section 06</span>
              <span>·</span>
              <span>Keynote & Audio-Visual Briefings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0A192F] tracking-tight">
              Featured Video & Keynotes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Direct executive insights from Sundaram fund managers. The 3D ball glides in deep perspective behind this presentation stage.
          </p>
        </div>

        {/* Video Layout: Large Featured Video + Trending Side Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Keynote Player Card (8 cols) */}
          <div className="lg:col-span-8 editorial-glass-dark text-white rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between border border-white/10 group">
            {/* Visual Screen Poster */}
            <div
              onClick={() => setActiveVideo(featured)}
              className="relative aspect-video w-full bg-slate-900 cursor-pointer overflow-hidden flex items-center justify-center group"
            >
              {/* Elegant Architectural Keynote Vector Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#061224] via-[#0A192F] to-[#1E293B] opacity-90" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-black/60" />

              {/* Graphic Stage Lighting Elements */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-96 h-96 rounded-full border border-white/20 animate-ping duration-1000" />
                <div className="w-64 h-64 rounded-full border border-[#E05A1B]/40" />
              </div>

              {/* Speaker Silhouette & Keynote Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10 pointer-events-none">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E05A1B] bg-black/60 px-2 py-1 rounded backdrop-blur-xs">
                    Sundaram Macro Outlook
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-white mt-2 leading-tight">
                    {featured.title}
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featured.duration}</span>
                </div>
              </div>

              {/* Play Button Center Affordance */}
              <div className="relative z-20 w-18 h-18 rounded-full bg-[#E05A1B] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#F97316] transition-all">
                <Play className="w-7 h-7 fill-white ml-1" />
              </div>
            </div>

            {/* Video Description & Metadata Footer */}
            <div className="p-6 sm:p-8 bg-[#0A192F]/90 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                  <span className="font-semibold text-white">{featured.speaker}</span>
                  <span>—</span>
                  <span className="text-slate-400">{featured.role}</span>
                </div>
                <p className="text-xs text-slate-300 max-w-xl line-clamp-2">
                  {featured.summary}
                </p>
              </div>

              <button
                onClick={() => setActiveVideo(featured)}
                className="px-4 py-2.5 bg-white text-[#0A192F] text-xs font-semibold uppercase tracking-wider rounded hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                Watch Keynote
              </button>
            </div>
          </div>

          {/* Trending Video Thumbnails (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200">
              <span>Trending Presentations</span>
              <span className="text-[#E05A1B]">Audio / Video</span>
            </div>

            {secondaryVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="editorial-glass-card rounded-xl p-5 hover:border-[#0A192F] transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-[#0A192F] uppercase tracking-wider">
                      {video.category}
                    </span>
                    <span className="flex items-center gap-1 font-mono-num text-[11px]">
                      <Clock className="w-3 h-3" /> {video.duration}
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-medium text-[#0A192F] leading-snug mb-2 group-hover:text-[#E05A1B] transition-colors">
                    {video.title}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {video.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <span>{video.speaker}</span>
                  <span className="text-[#0A192F] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Play <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0A192F] text-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/10 relative">
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E05A1B]">
                  {activeVideo.category} · {activeVideo.duration}
                </span>
                <h3 className="text-lg font-serif font-medium text-white">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Clean Video Player */}
            <div className="relative aspect-video w-full bg-black flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E05A1B] text-white flex items-center justify-center mb-4 shadow-lg animate-pulse">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
              <h4 className="text-xl font-serif text-white max-w-lg mb-2">{activeVideo.title}</h4>
              <p className="text-xs text-slate-400 max-w-md mb-6">{activeVideo.summary}</p>
              <div className="flex items-center gap-4 text-xs text-slate-300 bg-white/10 px-4 py-2 rounded-full">
                <span>Presenter: <strong>{activeVideo.speaker}</strong></span>
                <span>·</span>
                <span>Role: {activeVideo.role}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
              <span>Streaming in 1080p institutional quality</span>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-white hover:underline cursor-pointer"
              >
                Close Briefing
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
