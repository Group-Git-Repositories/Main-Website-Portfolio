'use client';

import { useState } from 'react';
import { INDUSTRY_CATEGORIES } from '../../lib/constants';
import DeviceViewportFrame from './DeviceViewportFrame';
import Button from '../ui/Button';
import { ExternalLink, Layers, ArrowUpRight, X, Clock, DollarSign, Check } from 'lucide-react';

export default function ShowroomGrid({ projects = [], onSelectProjectForQuote }) {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filtered =
    activeCategory === 'All Projects'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="showroom" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/20 text-violet-400 text-xs font-mono font-medium mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Workshop Showroom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Browse Our Digital Showroom of Real Websites
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Select any industry below to inspect real architectures. Test each build in desktop, tablet, and mobile frames, and commission your custom site directly.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {INDUSTRY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono px-4 py-2 rounded-lg whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 font-semibold'
                  : 'bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => {
            const specs = p.specs || {};
            const showPrice = specs.showPrice && specs.startingPrice;
            const showTurnaround = specs.showTurnaround && specs.turnaroundDays;

            return (
              <div
                key={p.id}
                className="group flex flex-col justify-between bg-white dark:bg-[#0E1626] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Visual Preview Header */}
                <div
                  onClick={() => setActiveModalProject(p)}
                  className="cursor-pointer relative aspect-[16/10] bg-[#070B16] border-b border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <img
                    src={p.mockups?.desktop || p.image || '/projects/aura_desktop.svg'}
                    alt={p.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B16]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1">
                      Open Multi-Device Viewport <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
                        {p.category}
                      </span>
                      {p.featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/30">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {p.tagline || p.description}
                    </p>

                    {/* Deliverables Pills */}
                    {p.deliverables && p.deliverables.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {p.deliverables.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                          >
                            <Check className="w-2.5 h-2.5 text-cyan-500" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Commercial Footer & CTAs */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                    {(showPrice || showTurnaround) && (
                      <div className="flex items-center justify-between text-xs font-mono">
                        {showPrice && (
                          <div className="flex items-center gap-1 text-slate-900 dark:text-white font-bold">
                            <DollarSign className="w-3.5 h-3.5 text-cyan-500" />
                            <span>From {specs.startingPrice}</span>
                          </div>
                        )}
                        {showTurnaround && (
                          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                            <Clock className="w-3 h-3 text-violet-400" />
                            <span>{specs.turnaroundDays} Days</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setActiveModalProject(p)}
                        className="text-xs"
                      >
                        Inspect Devices
                      </Button>

                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => onSelectProjectForQuote?.(p)}
                        className="text-xs"
                      >
                        Order Site
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Showroom Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-[#070B16] w-full max-w-5xl max-h-[92vh] rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:px-6 bg-[#0E1626] border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  {activeModalProject.category} Showroom Model
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Device Simulator */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              <DeviceViewportFrame project={activeModalProject} />

              {/* Specs & Description */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0E1626] p-6 rounded-xl border border-slate-800">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-sm font-mono text-cyan-400 uppercase font-semibold">
                    Architecture & Scope Overview
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeModalProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeModalProject.deliverables?.map((del, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 md:border-l md:border-slate-800 md:pl-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-slate-400">Estimated Investment</div>
                    <div className="text-2xl font-extrabold text-white">
                      {activeModalProject.specs?.startingPrice || 'Custom Quote'}
                    </div>
                    <div className="text-xs font-mono text-violet-400">
                      Typical Turnaround: {activeModalProject.specs?.turnaroundDays || '5-7'} Business Days
                    </div>
                  </div>

                  <Button
                    size="md"
                    variant="primary"
                    onClick={() => {
                      const p = activeModalProject;
                      setActiveModalProject(null);
                      onSelectProjectForQuote?.(p);
                    }}
                    className="w-full"
                  >
                    Order Similar Build
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
