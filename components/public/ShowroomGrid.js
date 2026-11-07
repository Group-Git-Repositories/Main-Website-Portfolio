'use client';

import { useState, useEffect } from 'react';
import DeviceViewportFrame from './DeviceViewportFrame';
import Button from '../ui/Button';
import { ArrowUpRight, X, Clock, Check, Eye } from 'lucide-react';

export default function ShowroomGrid({ projects = [], onSelectProjectForQuote }) {
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };
    if (activeModalProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeModalProject]);

  return (
    <section id="showroom" className="py-14 sm:py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-3">
            Website Showroom
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Pick a Sample Website
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Tap any sample to test how your restaurant menu or website looks and responds across smartphone, tablet, and widescreen desktop monitors.
          </p>
        </div>

        {/* Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((p) => {
            const specs = p.specs || {};
            const showPrice = specs.showPrice && specs.startingPrice;
            const showTurnaround = specs.turnaroundDays;
            const isMobileOptimized = Boolean(p.bestViewedOnMobile || p.id === 'proj-rest-06');

            return (
              <div
                key={p.id}
                className="group flex flex-col justify-between bg-white dark:bg-[#0E1626] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Visual Preview Header - Tap to open simulator */}
                <div
                  onClick={() => setActiveModalProject(p)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalProject(p);
                    }
                  }}
                  className="cursor-pointer relative aspect-[16/10] bg-slate-100 dark:bg-[#070B16] border-b border-slate-200 dark:border-slate-800 overflow-hidden touch-manipulation"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open interactive simulator for ${p.title}`}
                >
                  <img
                    src={p.mockups?.desktop || p.image || '/projects/lumina_desktop.svg'}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Best Viewed on Mobile Badge Overlay */}
                  {isMobileOptimized && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] font-mono font-semibold bg-slate-950/85 text-amber-300 px-2.5 py-1 rounded-md border border-amber-500/40 shadow-sm backdrop-blur-sm flex items-center gap-1">
                        📱 Best on Mobile
                      </span>
                    </div>
                  )}

                  {/* Desktop hover overlay */}
                  <div className="hidden sm:flex absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center backdrop-blur-[2px]">
                    <span className="text-xs font-mono bg-slate-900/95 text-white px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-2 shadow-lg">
                      Preview Interactive Simulator <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                    </span>
                  </div>

                  {/* Mobile-visible Simulator Pill */}
                  <div className="sm:hidden absolute bottom-3 right-3 z-10">
                    <span className="text-[11px] font-mono bg-slate-900/90 text-cyan-300 px-2.5 py-1.5 rounded-lg border border-slate-700/80 flex items-center gap-1.5 shadow-md backdrop-blur-sm">
                      <Eye className="w-3 h-3 text-cyan-400" />
                      <span>Test Simulator</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-semibold truncate">
                        {p.category}
                      </div>
                      {isMobileOptimized && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 shrink-0">
                          📱 Mobile-First
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => setActiveModalProject(p)}
                      className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveModalProject(p);
                        }
                      }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-5">
                      {p.tagline || p.description}
                    </p>

                    {/* Deliverables Checklist */}
                    {p.deliverables && p.deliverables.length > 0 && (
                      <ul className="space-y-2 mb-6 pt-1">
                        {p.deliverables.slice(0, 4).map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300"
                          >
                            <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 stroke-[2.5]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Footer & Action Button */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                    {(showPrice || showTurnaround) && (
                      <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                        {showPrice && (
                          <div className="text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                            From {specs.startingPrice}
                          </div>
                        )}
                        {showTurnaround && (
                          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                            <Clock className="w-4 h-4 text-cyan-500" />
                            <span>{specs.turnaroundDays} Days</span>
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      size="md"
                      variant="primary"
                      onClick={() => onSelectProjectForQuote?.(p)}
                      className="w-full text-sm font-semibold py-3 min-h-[48px]"
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

      {/* Full-Screen Showroom Modal - Responsive across phones & tablets */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveModalProject(null);
            }
          }}
        >
          <div className="bg-[#070B16] w-full max-w-5xl h-full sm:h-auto sm:max-h-[94vh] rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-3.5 sm:px-6 bg-[#0E1626] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                    {activeModalProject.category} Sample
                  </div>
                  {(activeModalProject.bestViewedOnMobile || activeModalProject.id === 'proj-rest-06') && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                      Best View on Mobile
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors touch-manipulation cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Device Simulator */}
            <div className="p-3 sm:p-6 overflow-y-auto space-y-6 flex-1">
              <DeviceViewportFrame project={activeModalProject} />

              {/* Description & Action */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-[#0E1626] p-4 sm:p-6 rounded-2xl border border-slate-800">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                    About This Website
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {activeModalProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeModalProject.deliverables?.map((del, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 md:border-l md:border-slate-800 md:pl-6 flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
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
                    className="w-full text-sm font-semibold min-h-[48px]"
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
