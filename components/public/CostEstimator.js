'use client';

import { useState } from 'react';
import { BASE_INDUSTRY_PRICING, ESTIMATOR_MODULES } from '../../lib/constants';
import Button from '../ui/Button';
import { Check, Clock, ArrowRight } from 'lucide-react';

export default function CostEstimator({ onCommissionSpec }) {
  const [selectedIndustry, setSelectedIndustry] = useState('Corporate & B2B');
  const [selectedModules, setSelectedModules] = useState(['cms', 'whatsapp']);

  const base = BASE_INDUSTRY_PRICING[selectedIndustry] || { basePrice: 18000, baseDays: 5 };

  const modulesCost = selectedModules.reduce((acc, modId) => {
    const found = ESTIMATOR_MODULES.find((m) => m.id === modId);
    return acc + (found ? found.price : 0);
  }, 0);

  const modulesDays = selectedModules.reduce((acc, modId) => {
    const found = ESTIMATOR_MODULES.find((m) => m.id === modId);
    return acc + (found ? found.days : 0);
  }, 0);

  const totalMinPrice = base.basePrice + modulesCost;
  const totalMaxPrice = Math.round(totalMinPrice * 1.2);
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
      type: 'estimator',
      industry: selectedIndustry,
      estimatedPrice: `${totalMinPrice.toLocaleString()} - ${totalMaxPrice.toLocaleString()} Birr`,
      estimatedDays: `~${totalDays} Days`,
      features: activeModuleLabels,
    });
  };

  return (
    <section id="estimator" className="py-20 md:py-28 bg-slate-50 dark:bg-[#070B16] border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-3">
            Price Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Calculate Your Website Price
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Choose your business type and features to get an immediate estimated price in Birr.
          </p>
        </div>

        {/* Estimator Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Controls: Step 1 & Step 2 */}
          <div className="lg:col-span-2 space-y-8 bg-white dark:bg-[#0E1626] p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
            {/* Step 1: Industry Type */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-semibold mb-3">
                1. Choose Business Type
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.keys(BASE_INDUSTRY_PRICING).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedIndustry(cat)}
                    className={`p-3 rounded-xl text-left border transition-all text-xs font-medium ${
                      selectedIndustry === cat
                        ? 'border-slate-900 bg-slate-50 dark:border-cyan-500 dark:bg-cyan-500/10 text-slate-950 dark:text-white font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Modules */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-semibold mb-3">
                2. Select Features You Need
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR_MODULES.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-slate-900 bg-slate-50 dark:border-cyan-500 dark:bg-cyan-500/10 text-slate-950 dark:text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                            isChecked
                              ? 'bg-slate-900 border-slate-900 text-white dark:bg-cyan-400 dark:border-cyan-400 dark:text-slate-950 font-bold'
                              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-transparent'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{mod.label}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0 font-medium">
                        +{mod.price.toLocaleString()} Birr
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Summary Card */}
          <div className="bg-white dark:bg-[#0E1626] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 sticky top-28">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-semibold">
              Estimated Total
            </div>

            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
                Type
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white">
                {selectedIndustry}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div>
                <div className="text-xs font-mono text-slate-400 mb-1">
                  Estimated Price
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {totalMinPrice.toLocaleString()} – {totalMaxPrice.toLocaleString()} Birr
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Includes full design, free hosting setup, and simple text editor.
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Estimated Time</span>
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  ~{totalDays} Days
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button
                size="md"
                variant="primary"
                onClick={handleCommission}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full text-xs font-semibold"
              >
                Order With This Estimate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
