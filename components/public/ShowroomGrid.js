'use client';

import { useState } from 'react';
import { INDUSTRY_CATEGORIES } from '../../lib/constants';
import DeviceViewportFrame from './DeviceViewportFrame';
import Button from '../ui/Button';
import { ArrowUpRight, X, Clock, Check } from 'lucide-react';

export default function ShowroomGrid({ projects = [], onSelectProjectForQuote }) {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filtered =
    activeCategory === 'All Projects'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="showroom" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-3">
            Website Showroom
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Pick a Sample Website
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Click any sample to test how it looks and works on phone, tablet, and computer screens.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {INDUSTRY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500/50 font-semibold shadow-sm'
                  : 'bg-white dark:bg-[#0E1626] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
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
                className="group flex flex-col justify-between bg-white dark:bg-[#0E1626] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 overflow-hidden"
              >
                {/* Visual Preview Header */}
                <div
                  onClick={() => setActiveModalProject(p)}
                  className="cursor-pointer relative aspect-[16/10] bg-slate-100 dark:bg-[#070B16] border-b border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <img
                    src={p.mockups?.desktop || p.image || '/projects/aura_desktop.svg'}
                    alt={p.title}
                    className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-mono bg-slate-900/90 text-white px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-md">
                      Test on Screen <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
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
                      className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2 cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {p.tagline || p.description}
                    </p>

                    {/* Deliverables Checklist - Clean modern list, no pill tags */}
                    {p.deliverables && p.deliverables.length > 0 && (
                      <ul className="space-y-2 mb-5 pt-1">
                        {p.deliverables.slice(0, 3).map((item, idx) => (
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

                  {/* Clean Footer & Single Primary Button */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                    {(showPrice || showTurnaround) && (
                      <div className="flex items-center justify-between text-xs font-mono">
                        {showPrice && (
                          <div className="text-slate-900 dark:text-white font-bold">
                            From {specs.startingPrice}
                          </div>
                        )}
                        {showTurnaround && (
                          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                            <Clock className="w-3 h-3 text-cyan-500" />
                            <span>{specs.turnaroundDays} Days</span>
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => onSelectProjectForQuote?.(p)}
                      className="w-full text-xs font-semibold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#070B16] w-full max-w-5xl max-h-[92vh] rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:px-6 bg-[#0E1626] border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  {activeModalProject.category} Sample
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
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
                    <div className="text-xs font-mono text-slate-400">Price</div>
                    <div className="text-2xl font-extrabold text-white">
                      {activeModalProject.specs?.startingPrice || 'Custom Quote'}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      Ready in ~{activeModalProject.specs?.turnaroundDays || '5'} Days
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
