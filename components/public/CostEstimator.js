'use client';

import { useState } from 'react';
import { BASE_INDUSTRY_PRICING, ESTIMATOR_MODULES } from '../../lib/constants';
import Button from '../ui/Button';
import { Check, Clock, ArrowRight, Utensils, Sparkles } from 'lucide-react';

export default function CostEstimator({ onCommissionSpec }) {
  const [selectedIndustry, setSelectedIndustry] = useState('Habesha & Traditional Restaurant');
  const [selectedModules, setSelectedModules] = useState(['qr_menu', 'fasting_toggle', 'admin_cms']);

  const base = BASE_INDUSTRY_PRICING[selectedIndustry] || {
    basePrice: 14000,
    baseDays: 4,
    desc: 'Traditional Habesha restaurant website with cultural dishes & table booking',
  };

  const modulesCost = selectedModules.reduce((acc, modId) => {
    const found = ESTIMATOR_MODULES.find((m) => m.id === modId);
    return acc + (found ? found.price : 0);
  }, 0);

  const modulesDays = selectedModules.reduce((acc, modId) => {
    const found = ESTIMATOR_MODULES.find((m) => m.id === modId);
    return acc + (found ? found.days : 0);
  }, 0);

  const totalMinPrice = base.basePrice + modulesCost;
  const totalMaxPrice = Math.round(totalMinPrice * 1.15);
  const totalDays = base.baseDays + modulesDays;

  const toggleModule = (id) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter((m) => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const handleCommission = () => {
    const activeModuleLabels = selectedModules.map(
      (id) => ESTIMATOR_MODULES.find((m) => m.id === id)?.label || id
    );

    onCommissionSpec?.({
      type: 'restaurant-estimator',
      industry: selectedIndustry,
      estimatedPrice: `${totalMinPrice.toLocaleString()} - ${totalMaxPrice.toLocaleString()} Birr`,
      estimatedDays: `~${totalDays} Days`,
      features: activeModuleLabels,
    });
  };

  return (
    <section id="estimator" className="py-14 sm:py-20 md:py-28 bg-slate-50 dark:bg-[#070B16] border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10 sm:mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-3 flex items-center gap-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>Restaurant Cost Estimator</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Calculate Your Website Price
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Select your restaurant concept and the menu features you need to get an instant, transparent price estimate in Ethiopian Birr (ETB).
          </p>
        </div>

        {/* Estimator Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Controls: Step 1 & Step 2 */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8 bg-white dark:bg-[#0E1626] p-5 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            {/* Step 1: Restaurant Type */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-semibold">
                  1. Choose Your Restaurant Concept
                </div>
                <span className="text-[11px] font-mono text-slate-400">Step 1 of 2</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.keys(BASE_INDUSTRY_PRICING).map((cat) => {
                  const item = BASE_INDUSTRY_PRICING[cat];
                  const isSelected = selectedIndustry === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedIndustry(cat)}
                      className={`p-4 rounded-xl text-left border transition-all text-xs flex flex-col justify-between min-h-[96px] touch-manipulation cursor-pointer ${
                        isSelected
                          ? 'border-slate-900 bg-slate-100 dark:border-cyan-400 dark:bg-cyan-500/10 text-slate-950 dark:text-white font-bold ring-1 ring-slate-900 dark:ring-cyan-400 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900/40'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm sm:text-base leading-snug mb-1">{cat}</div>
                        <div className="text-xs font-normal text-slate-500 dark:text-slate-400 line-clamp-2">
                          {item.desc}
                        </div>
                      </div>
                      <div className="mt-2.5 text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold">
                        Base: {item.basePrice.toLocaleString()} Birr
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Restaurant Features */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-semibold">
                  2. Select Restaurant Features & Add-ons
                </div>
                <span className="text-[11px] font-mono text-slate-400">Step 2 of 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR_MODULES.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3.5 select-none min-h-[56px] touch-manipulation ${
                        isChecked
                          ? 'border-cyan-500/80 bg-cyan-50/50 dark:bg-cyan-500/10 dark:border-cyan-500/60 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                          isChecked
                            ? 'bg-cyan-500 border-cyan-500 text-slate-950 font-bold'
                            : 'border-slate-300 dark:border-slate-700 bg-transparent'
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                          {mod.label}
                        </div>
                        <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-medium mt-0.5">
                          +{mod.price.toLocaleString()} Birr • +{mod.days} Day
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Price Summary Breakdown Card */}
          <div className="p-5 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-5 sm:space-y-6 shadow-xl lg:sticky lg:top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
                Price Estimate
              </span>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2.5 py-1 rounded-md border border-cyan-800">
                100% Guaranteed Price
              </span>
            </div>

            {/* Total Estimated Price */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">Estimated Investment</div>
              <div className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {totalMinPrice.toLocaleString()} Birr
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Range: {totalMinPrice.toLocaleString()} - {totalMaxPrice.toLocaleString()} Birr
              </div>
            </div>

            {/* Turnaround Time */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-slate-300 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Ready for customers in ~{totalDays} business days</span>
            </div>

            {/* Specification Summary */}
            <div className="space-y-2.5 text-xs sm:text-sm font-mono text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center gap-2">
                <span>Restaurant Type:</span>
                <span className="text-slate-200 font-semibold truncate max-w-[170px] text-right">
                  {selectedIndustry}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Base Price:</span>
                <span className="text-slate-200">{base.basePrice.toLocaleString()} Birr</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Selected Add-ons:</span>
                <span className="text-slate-200">{selectedModules.length} features (+{modulesCost.toLocaleString()} Birr)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Domain & Hosting:</span>
                <span className="text-emerald-400 font-semibold">Included (1 Year Free)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Admin Page:</span>
                <span className="text-emerald-400 font-semibold">Included</span>
              </div>
            </div>

            {/* Action CTA */}
            <Button
              size="lg"
              variant="primary"
              onClick={handleCommission}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full text-base font-bold py-3.5 min-h-[48px]"
            >
              Order This Restaurant Setup
            </Button>

            <p className="text-[11px] text-slate-500 text-center font-mono">
              Pay via CBE, Telebirr, or Awash. Work begins after small deposit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
