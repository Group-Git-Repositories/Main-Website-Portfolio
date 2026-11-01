'use client';

import React from 'react';
import { Compass, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export default function VisionMission({ company = {} }) {
  const visionText =
    company?.vision ||
    'To shape a future where innovation has no boundaries, where every business, big or small, is built, run, and grown on world-class software crafted by Ethiopians.';

  const missionText =
    company?.mission ||
    'To design and develop modern, fast, and affordable websites and web applications that give businesses a strong online presence, connect them with more customers, and turn their ideas into working digital products.';

  return (
    <section
      id="about"
      className="py-14 sm:py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#070B16] tech-grid-bg relative overflow-hidden"
    >
      <div id="vision-mission" className="absolute -top-24 pointer-events-none" />

      {/* Subtle Ambient Glow for Dark Mode */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>ራዕይ እና ተልዕኮ • Vision & Mission</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-4">
            Our Purpose & Commitment
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Crafted in Ethiopia, built for modern growth. Here is the vision and mission driving everything we engineer.
          </p>
        </div>

        {/* Vision & Mission Cards Grid - Stacks vertically on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Vision Card */}
          <div className="flex flex-col justify-between p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-50/80 dark:bg-gradient-to-b dark:from-[#0E1626] dark:to-[#0A101D] border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-xl dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_8px_32px_rgba(6,182,212,0.12)] transition-all duration-300 relative group overflow-hidden">
            {/* Top accent shimmer line */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

            {/* Corner ambient glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-all duration-500" />

            {/* Background watermark icon */}
            <Compass className="w-24 sm:w-32 h-24 sm:h-32 absolute -bottom-4 -right-4 text-slate-200/50 dark:text-slate-800/20 pointer-events-none stroke-[1] group-hover:text-cyan-500/10 transition-colors" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200/80 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-sm dark:shadow-cyan-500/10">
                  <Compass className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 uppercase tracking-wider">
                  ራዕያችን • The Vision
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-4">
                Our Vision
              </h3>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                {visionText}
              </p>
            </div>

            <div className="relative z-10 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-cyan-800 dark:text-cyan-300">
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#070B16] border border-slate-200 dark:border-slate-800/90 text-slate-700 dark:text-slate-300 min-h-[44px]">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>Borderless Innovation</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#070B16] border border-slate-200 dark:border-slate-800/90 text-slate-700 dark:text-slate-300 min-h-[44px]">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>Crafted by Ethiopians</span>
                </span>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="flex flex-col justify-between p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-50/80 dark:bg-gradient-to-b dark:from-[#0E1626] dark:to-[#0A101D] border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-blue-500/50 shadow-sm hover:shadow-xl dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)] transition-all duration-300 relative group overflow-hidden">
            {/* Top accent shimmer line */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

            {/* Corner ambient glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/25 transition-all duration-500" />

            {/* Background watermark icon */}
            <Target className="w-24 sm:w-32 h-24 sm:h-32 absolute -bottom-4 -right-4 text-slate-200/50 dark:text-slate-800/20 pointer-events-none stroke-[1] group-hover:text-blue-500/10 transition-colors" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm dark:shadow-blue-500/10">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 uppercase tracking-wider">
                  ተልዕኳችን • The Mission
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-4">
                Our Mission
              </h3>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                {missionText}
              </p>
            </div>

            <div className="relative z-10 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-blue-800 dark:text-blue-300">
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#070B16] border border-slate-200 dark:border-slate-800/90 text-slate-700 dark:text-slate-300 min-h-[44px]">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Modern, Fast & Affordable</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#070B16] border border-slate-200 dark:border-slate-800/90 text-slate-700 dark:text-slate-300 min-h-[44px]">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Working Digital Products</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
