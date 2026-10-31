'use client';

import { useState } from 'react';
import DeviceViewportFrame from './DeviceViewportFrame';
import Button from '../ui/Button';
import { ArrowUpRight, X, Clock, Check } from 'lucide-react';

export default function ShowroomGrid({ projects = [], onSelectProjectForQuote }) {
  const [activeModalProject, setActiveModalProject] = useState(null);

  return (
    <section id="showroom" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-3">
            Website Showroom
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Pick a Sample Website
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Click any sample to test how your restaurant menu or website looks and responds across smartphone, tablet, and widescreen desktop monitors.
          </p>
        </div>

        {/* Showcase Cards Grid - No Filter, All Visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((p) => {
            const specs = p.specs || {};
            const showPrice = specs.showPrice && specs.startingPrice;
            const showTurnaround = specs.showTurnaround && specs.turnaroundDays;

            return (
              <div
                key={p.id}
                className="group flex flex-col justify-between bg-white dark:bg-[#0E1626] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Visual Preview Header */}
                <div
                  onClick={() => setActiveModalProject(p)}
                  className="cursor-pointer relative aspect-[16/10] bg-slate-100 dark:bg-[#070B16] border-b border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <img
                    src={p.mockups?.desktop || p.image || '/projects/lumina_desktop.svg'}
                    alt={p.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="text-xs font-mono bg-slate-900/95 text-white px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-2 shadow-lg">
                      Preview Interactive Simulator <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-semibold mb-2">
                      {p.category}
                    </div>

                    <h3
                      onClick={() => setActiveModalProject(p)}
                      className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-5">
                      {p.tagline || p.description}
                    </p>

                    {/* Deliverables Checklist */}
                    {p.deliverables && p.deliverables.length > 0 && (
                      <ul className="space-y-2 mb-6 pt-1">
                        {p.deliverables.slice(0, 4).map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                          >
                            <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 stroke-[2.5]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Clean Footer & Action Button */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                    {(showPrice || showTurnaround) && (
                      <div className="flex items-center justify-between text-xs font-mono">
                        {showPrice && (
                          <div className="text-slate-900 dark:text-white font-bold text-sm">
                            From {specs.startingPrice}
                          </div>
                        )}
                        {showTurnaround && (
                          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                            <Clock className="w-3.5 h-3.5 text-cyan-500" />
                            <span>{specs.turnaroundDays} Days</span>
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => onSelectProjectForQuote?.(p)}
                      className="w-full text-xs font-semibold py-2.5"
                    >
                      Order This Website
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Showroom Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-[#070B16] w-full max-w-5xl max-h-[94vh] rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:px-6 bg-[#0E1626] border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  {activeModalProject.category} Sample
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Device Simulator */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              <DeviceViewportFrame project={activeModalProject} />

              {/* Description & Action */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0E1626] p-6 rounded-xl border border-slate-800">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                    About This Website
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
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-slate-400">Starting Price</div>
                    <div className="text-2xl font-extrabold text-white">
                      {activeModalProject.specs?.startingPrice || 'Custom Quote'}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      Ready in ~{activeModalProject.specs?.turnaroundDays || '4'} Days
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
                    className="w-full text-xs font-semibold"
                  >
                    Order This Website
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
